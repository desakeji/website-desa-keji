// app/admin/pengaturan/actions.ts

'use server';

import { randomUUID } from 'node:crypto';

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
  ProfilDesaActionState,
} from '@/types/profil-desa';

const PROFIL_KEY = 'utama';

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

function getRequiredInteger(
  formData: FormData,
  fieldName: string,
  fieldLabel: string,
  options?: {
    min?: number;
    max?: number;
  }
) {
  const rawValue = String(
    formData.get(fieldName) ?? ''
  ).trim();

  if (!rawValue) {
    throw new Error(
      `${fieldLabel} wajib diisi.`
    );
  }

  const value = Number(rawValue);

  if (!Number.isInteger(value)) {
    throw new Error(
      `${fieldLabel} harus berupa angka bulat.`
    );
  }

  const minimum =
    options?.min ?? 0;

  if (value < minimum) {
    throw new Error(
      `${fieldLabel} minimal ${minimum}.`
    );
  }

  if (
    options?.max !== undefined &&
    value > options.max
  ) {
    throw new Error(
      `${fieldLabel} maksimal ${options.max}.`
    );
  }

  return value;
}

function revalidateProfilDesa() {
  revalidatePath('/');
  revalidatePath('/profil/data');
  revalidatePath('/admin');
  revalidatePath('/admin/pengaturan');
  revalidatePath('/api/profil-desa');
}

export async function updateProfilDesaAction(
  _previousState: ProfilDesaActionState,
  formData: FormData
): Promise<ProfilDesaActionState> {
  await requireAdmin();

  try {
    const jumlahLakiLaki =
      getRequiredInteger(
        formData,
        'jumlah_laki_laki',
        'Jumlah penduduk laki-laki'
      );

    const jumlahPerempuan =
      getRequiredInteger(
        formData,
        'jumlah_perempuan',
        'Jumlah penduduk perempuan'
      );

    const jumlahDusun =
      getRequiredInteger(
        formData,
        'jumlah_dusun',
        'Jumlah dusun'
      );

    const jumlahRw =
      getRequiredInteger(
        formData,
        'jumlah_rw',
        'Jumlah RW'
      );

    const jumlahRt =
      getRequiredInteger(
        formData,
        'jumlah_rt',
        'Jumlah RT'
      );

    const tahunData =
      getRequiredInteger(
        formData,
        'tahun_data',
        'Tahun data',
        {
          min: 2000,
          max: 2100,
        }
      );

    const updatedAt =
      new Date().toISOString();

    /*
     * ID tetap dibuat dalam bentuk UUID.
     *
     * Jika profil_key "utama" sudah ada,
     * Supabase hanya memperbarui kolom datanya.
     *
     * Jika belum ada, UUID baru digunakan
     * untuk membuat baris profil desa.
     */
    const {
      data,
      error: upsertError,
    } = await supabaseAdmin
      .from('profil_desa')
      .upsert(
        {
          id: randomUUID(),
          profil_key: PROFIL_KEY,
          jumlah_laki_laki:
            jumlahLakiLaki,
          jumlah_perempuan:
            jumlahPerempuan,
          jumlah_dusun:
            jumlahDusun,
          jumlah_rw:
            jumlahRw,
          jumlah_rt:
            jumlahRt,
          tahun_data:
            tahunData,
          updated_at:
            updatedAt,
        },
        {
          onConflict: 'profil_key',
          ignoreDuplicates: false,
        }
      )
      .select(`
        id,
        profil_key,
        jumlah_laki_laki,
        jumlah_perempuan,
        jumlah_dusun,
        jumlah_rw,
        jumlah_rt,
        tahun_data,
        updated_at
      `)
      .single();

    if (upsertError) {
      console.error(
        'Gagal memperbarui profil desa:',
        upsertError
      );

      throw new Error(
        upsertError.message
      );
    }

    if (!data) {
      throw new Error(
        'Data profil desa tidak berhasil disimpan.'
      );
    }

    revalidateProfilDesa();

    return {
      error: null,
      success:
        'Data profil desa berhasil diperbarui.',
    };
  } catch (error) {
    console.error(
      'Update profil desa error:',
      error
    );

    return {
      error:
        error instanceof Error
          ? error.message
          : 'Terjadi kesalahan saat memperbarui data profil desa.',
      success: null,
    };
  }
}