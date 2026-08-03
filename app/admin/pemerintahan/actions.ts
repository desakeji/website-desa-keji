// app/admin/pemerintahan/actions.ts

'use server';

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

import {
  KELOMPOK_PERANGKAT,
  type KelompokPerangkat,
  type PemerintahanActionState,
} from '@/types/pemerintahan';

const PEMERINTAHAN_KEY = 'utama';

async function requireAdmin() {
  const supabase =
    await createClient();

  const {
    data: {
      user,
    },
    error,
  } = await supabase.auth.getUser();

  if (
    error ||
    !user
  ) {
    redirect('/login');
  }

  return user;
}

function getString(
  formData: FormData,
  key: string
) {
  return String(
    formData.get(key) ?? ''
  ).trim();
}

function getNumber(
  formData: FormData,
  key: string
) {
  return Number(
    getString(
      formData,
      key
    )
  );
}

function isValidImagePath(
  value: string
) {
  return (
    value === '' ||
    value.startsWith('/') ||
    value.startsWith('https://') ||
    value.startsWith('http://')
  );
}

function revalidatePemerintahan() {
  revalidatePath(
    '/admin/pemerintahan'
  );

  revalidatePath(
    '/pemerintahan'
  );

  revalidatePath(
    '/api/pemerintahan'
  );

  revalidatePath('/admin');
}

export async function simpanInformasiPemerintahanAction(
  previousState:
    PemerintahanActionState,
  formData: FormData
): Promise<PemerintahanActionState> {
  void previousState;

  await requireAdmin();

  const sekilasInfo =
    getString(
      formData,
      'sekilas_info'
    );

  const judulHalaman =
    getString(
      formData,
      'judul_halaman'
    );

  const judulSotk =
    getString(
      formData,
      'judul_sotk'
    );

  const lokasiPemerintahan =
    getString(
      formData,
      'lokasi_pemerintahan'
    );

  const tanggalPublikasi =
    getString(
      formData,
      'tanggal_publikasi'
    );

  const penulis =
    getString(
      formData,
      'penulis'
    );

  const deskripsiKepalaDesa =
    getString(
      formData,
      'deskripsi_kepala_desa'
    );

  const deskripsiPerangkat =
    getString(
      formData,
      'deskripsi_perangkat'
    );

  const catatan =
    getString(
      formData,
      'catatan'
    );

  const requiredValues = [
    sekilasInfo,
    judulHalaman,
    judulSotk,
    lokasiPemerintahan,
    tanggalPublikasi,
    penulis,
    deskripsiKepalaDesa,
    deskripsiPerangkat,
  ];

  if (
    requiredValues.some(
      (value) => !value
    )
  ) {
    return {
      success: false,
      message:
        'Semua kolom wajib harus diisi.',
    };
  }

  if (
    sekilasInfo.length > 500
  ) {
    return {
      success: false,
      message:
        'Sekilas informasi maksimal 500 karakter.',
    };
  }

  if (
    deskripsiKepalaDesa.length >
    2000
  ) {
    return {
      success: false,
      message:
        'Deskripsi Kepala Desa maksimal 2.000 karakter.',
    };
  }

  if (
    deskripsiPerangkat.length >
    2000
  ) {
    return {
      success: false,
      message:
        'Deskripsi perangkat maksimal 2.000 karakter.',
    };
  }

  if (
    catatan.length > 2000
  ) {
    return {
      success: false,
      message:
        'Catatan maksimal 2.000 karakter.',
    };
  }

  const {
    error,
  } = await supabaseAdmin
    .from('pemerintahan_desa')
    .upsert(
      {
        pemerintahan_key:
          PEMERINTAHAN_KEY,

        sekilas_info:
          sekilasInfo,

        judul_halaman:
          judulHalaman,

        judul_sotk:
          judulSotk,

        lokasi_pemerintahan:
          lokasiPemerintahan,

        tanggal_publikasi:
          tanggalPublikasi,

        penulis,

        deskripsi_kepala_desa:
          deskripsiKepalaDesa,

        deskripsi_perangkat:
          deskripsiPerangkat,

        catatan:
          catatan || '',

        updated_at:
          new Date().toISOString(),
      },
      {
        onConflict:
          'pemerintahan_key',
      }
    );

  if (error) {
    console.error(
      'Gagal menyimpan informasi pemerintahan:',
      {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      }
    );

    return {
      success: false,
      message:
        error.message ||
        'Informasi pemerintahan gagal disimpan.',
    };
  }

  revalidatePemerintahan();

  return {
    success: true,
    message:
      'Informasi pemerintahan berhasil diperbarui.',
  };
}

interface PerangkatInput {
  nama: string;
  jabatan: string;
  kelompok: string;

  fotoUrl: string;
  nip: string;
  nomorTelepon: string;
  deskripsi: string;

  urutan: number;
  aktif: boolean;
}

function parsePerangkat(
  formData: FormData
): PerangkatInput {
  return {
    nama:
      getString(
        formData,
        'nama'
      ),

    jabatan:
      getString(
        formData,
        'jabatan'
      ),

    kelompok:
      getString(
        formData,
        'kelompok'
      ),

    fotoUrl:
      getString(
        formData,
        'foto_url'
      ),

    nip:
      getString(
        formData,
        'nip'
      ),

    nomorTelepon:
      getString(
        formData,
        'nomor_telepon'
      ),

    deskripsi:
      getString(
        formData,
        'deskripsi'
      ),

    urutan:
      getNumber(
        formData,
        'urutan'
      ),

    aktif:
      getString(
        formData,
        'aktif'
      ) === 'true',
  };
}

function validatePerangkat(
  input: PerangkatInput
) {
  if (
    input.nama.length < 2
  ) {
    return 'Nama perangkat minimal terdiri dari 2 karakter.';
  }

  if (
    input.nama.length > 150
  ) {
    return 'Nama perangkat maksimal 150 karakter.';
  }

  if (
    input.jabatan.length < 2
  ) {
    return 'Jabatan minimal terdiri dari 2 karakter.';
  }

  if (
    input.jabatan.length > 150
  ) {
    return 'Jabatan maksimal 150 karakter.';
  }

  if (
    !(
      KELOMPOK_PERANGKAT as readonly string[]
    ).includes(
      input.kelompok
    )
  ) {
    return 'Kelompok perangkat tidak valid.';
  }

  if (
    !Number.isInteger(
      input.urutan
    ) ||
    input.urutan < 1
  ) {
    return 'Nomor urutan harus berupa angka minimal 1.';
  }

  if (
    !isValidImagePath(
      input.fotoUrl
    )
  ) {
    return 'Path foto harus diawali /, http://, atau https://.';
  }

  if (
    input.nip.length > 50
  ) {
    return 'NIP maksimal 50 karakter.';
  }

  if (
    input.nomorTelepon.length >
    30
  ) {
    return 'Nomor telepon maksimal 30 karakter.';
  }

  if (
    input.deskripsi.length >
    2000
  ) {
    return 'Deskripsi perangkat maksimal 2.000 karakter.';
  }

  return null;
}

function perangkatPayload(
  input: PerangkatInput
) {
  return {
    nama:
      input.nama,

    jabatan:
      input.jabatan,

    kelompok:
      input.kelompok as
        KelompokPerangkat,

    foto_url:
      input.fotoUrl || null,

    nip:
      input.nip || null,

    nomor_telepon:
      input.nomorTelepon ||
      null,

    deskripsi:
      input.deskripsi || null,

    urutan:
      input.urutan,

    aktif:
      input.aktif,

    updated_at:
      new Date().toISOString(),
  };
}

export async function tambahPerangkatAction(
  previousState:
    PemerintahanActionState,
  formData: FormData
): Promise<PemerintahanActionState> {
  void previousState;

  await requireAdmin();

  const input =
    parsePerangkat(
      formData
    );

  const validationError =
    validatePerangkat(input);

  if (validationError) {
    return {
      success: false,
      message:
        validationError,
    };
  }

  const {
    error,
  } = await supabaseAdmin
    .from('perangkat_desa')
    .insert(
      perangkatPayload(input)
    );

  if (error) {
    console.error(
      'Gagal menambahkan perangkat desa:',
      {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      }
    );

    return {
      success: false,
      message:
        error.message ||
        'Perangkat desa gagal ditambahkan.',
    };
  }

  revalidatePemerintahan();

  redirect(
    '/admin/pemerintahan?status=created'
  );
}

export async function ubahPerangkatAction(
  id: number,
  previousState:
    PemerintahanActionState,
  formData: FormData
): Promise<PemerintahanActionState> {
  void previousState;

  await requireAdmin();

  if (
    !Number.isInteger(id) ||
    id <= 0
  ) {
    return {
      success: false,
      message:
        'ID perangkat tidak valid.',
    };
  }

  const input =
    parsePerangkat(
      formData
    );

  const validationError =
    validatePerangkat(input);

  if (validationError) {
    return {
      success: false,
      message:
        validationError,
    };
  }

  const {
    error,
  } = await supabaseAdmin
    .from('perangkat_desa')
    .update(
      perangkatPayload(input)
    )
    .eq('id', id);

  if (error) {
    console.error(
      'Gagal memperbarui perangkat desa:',
      {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      }
    );

    return {
      success: false,
      message:
        error.message ||
        'Perangkat desa gagal diperbarui.',
    };
  }

  revalidatePemerintahan();

  redirect(
    '/admin/pemerintahan?status=updated'
  );
}

export async function togglePerangkatAction(
  formData: FormData
) {
  await requireAdmin();

  const id =
    Number(
      formData.get('id')
    );

  const aktif =
    String(
      formData.get('aktif') ??
        ''
    ) === 'true';

  if (
    !Number.isInteger(id) ||
    id <= 0
  ) {
    throw new Error(
      'ID perangkat tidak valid.'
    );
  }

  const {
    error,
  } = await supabaseAdmin
    .from('perangkat_desa')
    .update({
      aktif,

      updated_at:
        new Date().toISOString(),
    })
    .eq('id', id);

  if (error) {
    console.error(
      'Gagal mengubah status perangkat:',
      error
    );

    throw new Error(
      'Status perangkat gagal diperbarui.'
    );
  }

  revalidatePemerintahan();
}

export async function hapusPerangkatAction(
  formData: FormData
) {
  await requireAdmin();

  const id =
    Number(
      formData.get('id')
    );

  if (
    !Number.isInteger(id) ||
    id <= 0
  ) {
    throw new Error(
      'ID perangkat tidak valid.'
    );
  }

  const {
    error,
  } = await supabaseAdmin
    .from('perangkat_desa')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(
      'Gagal menghapus perangkat desa:',
      error
    );

    throw new Error(
      'Perangkat desa gagal dihapus.'
    );
  }

  revalidatePemerintahan();
}