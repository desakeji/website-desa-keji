// app/admin/warga/actions.ts

'use server';

import {
  createHmac,
} from 'node:crypto';

import {
  revalidatePath,
} from 'next/cache';

import {
  redirect,
} from 'next/navigation';

import {
  createClient,
} from '@/lib/server';

import {
  supabaseAdmin,
} from '@/lib/supabase-admin';

import type {
  WargaActionState,
} from '@/types/warga';

function getNikHashSecret() {
  const secret =
    process.env.NIK_HASH_SECRET;

  if (!secret) {
    throw new Error(
      'NIK_HASH_SECRET belum dikonfigurasi di .env.local.'
    );
  }

  if (secret.length < 32) {
    throw new Error(
      'NIK_HASH_SECRET harus memiliki panjang minimal 32 karakter.'
    );
  }

  return secret;
}

async function requireAdmin() {
  const supabase =
    await createClient();

  const {
    data: {
      user,
    },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/login');
  }

  return user;
}

function getFormString(
  formData: FormData,
  key: string
) {
  return String(
    formData.get(key) ?? ''
  ).trim();
}

function normalizeNik(
  value: string
) {
  return value.replace(/\D/g, '');
}

function normalizeNomorWhatsApp(
  value: string
) {
  return value.replace(/\D/g, '');
}

function normalizeNomorWilayah(
  value: string
) {
  const result =
    value.replace(/\D/g, '');

  if (!result) {
    return null;
  }

  return result
    .slice(0, 3)
    .padStart(3, '0');
}

function hashNik(
  nik: string
) {
  return createHmac(
    'sha256',
    getNikHashSecret()
  )
    .update(nik)
    .digest('hex');
}

function validateWargaData(
  nik: string,
  namaLengkap: string,
  nomorWhatsApp: string
) {
  if (!/^\d{16}$/.test(nik)) {
    throw new Error(
      'NIK harus terdiri dari tepat 16 angka.'
    );
  }

  if (namaLengkap.length < 3) {
    throw new Error(
      'Nama lengkap minimal terdiri dari 3 karakter.'
    );
  }

  if (namaLengkap.length > 150) {
    throw new Error(
      'Nama lengkap maksimal terdiri dari 150 karakter.'
    );
  }

  if (
    nomorWhatsApp &&
    !/^\d{10,15}$/.test(
      nomorWhatsApp
    )
  ) {
    throw new Error(
      'Nomor WhatsApp harus terdiri dari 10 sampai 15 angka.'
    );
  }
}

export async function createWargaAction(
  _previousState: WargaActionState,
  formData: FormData
): Promise<WargaActionState> {
  await requireAdmin();

  try {
    const nik =
      normalizeNik(
        getFormString(
          formData,
          'nik'
        )
      );

    const namaLengkap =
      getFormString(
        formData,
        'nama_lengkap'
      );

    const dusun =
      getFormString(
        formData,
        'dusun'
      );

    const rw =
      normalizeNomorWilayah(
        getFormString(
          formData,
          'rw'
        )
      );

    const rt =
      normalizeNomorWilayah(
        getFormString(
          formData,
          'rt'
        )
      );

    const alamat =
      getFormString(
        formData,
        'alamat'
      );

    const nomorWhatsApp =
      normalizeNomorWhatsApp(
        getFormString(
          formData,
          'nomor_whatsapp'
        )
      );

    validateWargaData(
      nik,
      namaLengkap,
      nomorWhatsApp
    );

    const nikHash =
      hashNik(nik);

    const nikEmpatTerakhir =
      nik.slice(-4);

    const {
      error,
    } = await supabaseAdmin
      .from('warga')
      .insert({
        nik_hash:
          nikHash,

        nik_empat_terakhir:
          nikEmpatTerakhir,

        nama_lengkap:
          namaLengkap,

        dusun:
          dusun || null,

        rw,
        rt,

        alamat:
          alamat || null,

        nomor_whatsapp:
          nomorWhatsApp || null,

        aktif:
          true,
      });

    if (error) {
      if (
        error.code ===
        '23505'
      ) {
        return {
          error:
            'NIK tersebut sudah terdaftar dalam database warga.',
          success: null,
        };
      }

      throw new Error(
        `Data warga gagal disimpan: ${error.message}`
      );
    }

    revalidatePath(
      '/admin/warga'
    );

    return {
      error: null,
      success:
        'Data warga berhasil ditambahkan.',
    };
  } catch (error) {
    console.error(
      'Create warga error:',
      error
    );

    return {
      error:
        error instanceof Error
          ? error.message
          : 'Data warga gagal disimpan.',

      success: null,
    };
  }
}

export async function toggleStatusWargaAction(
  formData: FormData
) {
  await requireAdmin();

  const id =
    getFormString(
      formData,
      'id'
    );

  const aktif =
    getFormString(
      formData,
      'aktif'
    ) === 'true';

  if (!id) {
    throw new Error(
      'ID warga tidak valid.'
    );
  }

  const {
    error,
  } = await supabaseAdmin
    .from('warga')
    .update({
      aktif: !aktif,
    })
    .eq('id', id);

  if (error) {
    throw new Error(
      `Status warga gagal diperbarui: ${error.message}`
    );
  }

  revalidatePath(
    '/admin/warga'
  );
}