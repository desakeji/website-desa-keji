// app/admin/pertanahan/actions.ts

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

/* =========================================================
   CONFIG
========================================================= */

const ADMIN_PATH =
  '/admin/pertanahan';

const SETTINGS_KEY =
  'utama';

/* =========================================================
   AUTH
========================================================= */

async function requireAdmin() {
  const supabase =
    await createClient();

  const {
    data: {
      user,
    },
    error,
  } =
    await supabase.auth.getUser();

  if (
    error ||
    !user
  ) {
    redirect(
      '/login'
    );
  }
}

/* =========================================================
   HELPERS
========================================================= */

function getString(
  formData: FormData,
  key: string
) {
  return String(
    formData.get(key) ??
      ''
  ).trim();
}

function getBoolean(
  formData: FormData,
  key: string
) {
  return (
    getString(
      formData,
      key
    ) === 'true'
  );
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

function nullableNumber(
  formData: FormData,
  key: string
) {
  const value =
    getString(
      formData,
      key
    );

  if (!value) {
    return null;
  }

  const number =
    Number(value);

  return Number.isFinite(
    number
  )
    ? number
    : null;
}

function nullableString(
  value: string
) {
  return value || null;
}

function isValidUrl(
  value: string
) {
  if (!value) {
    return true;
  }

  try {
    const url =
      new URL(value);

    return (
      url.protocol ===
        'https:' ||
      url.protocol ===
        'http:'
    );
  } catch {
    return false;
  }
}

function isValidColor(
  value: string
) {
  return /^#[0-9a-f]{6}$/i.test(
    value
  );
}

function buildUrl(
  type:
    | 'success'
    | 'error',
  message: string
) {
  const params =
    new URLSearchParams({
      [type]:
        message,
    });

  return `${ADMIN_PATH}?${params.toString()}`;
}

function revalidatePertanahan() {
  revalidatePath(
    '/admin/pertanahan'
  );

  revalidatePath(
    '/data-desa/pertanahan'
  );

  revalidatePath(
    '/admin'
  );

  revalidatePath(
    '/data-desa'
  );
}

/* =========================================================
   SETTINGS
========================================================= */

export async function simpanPertanahanSettingsAction(
  formData: FormData
) {
  await requireAdmin();

  const judul =
    getString(
      formData,
      'judul'
    );

  const deskripsi =
    getString(
      formData,
      'deskripsi'
    );

  const tahunData =
    nullableNumber(
      formData,
      'tahun_data'
    );

  const sumberData =
    getString(
      formData,
      'sumber_data'
    );

  const catatan =
    getString(
      formData,
      'catatan'
    );

  const petaUrl =
    getString(
      formData,
      'peta_url'
    );

  const aktif =
    getBoolean(
      formData,
      'aktif'
    );

  if (
    judul.length <
      3 ||
    deskripsi.length <
      10
  ) {
    redirect(
      buildUrl(
        'error',
        'Judul dan deskripsi wajib diisi.'
      )
    );
  }

  if (
    tahunData !==
      null &&
    (
      !Number.isInteger(
        tahunData
      ) ||
      tahunData <
        1900 ||
      tahunData >
        2200
    )
  ) {
    redirect(
      buildUrl(
        'error',
        'Tahun data tidak valid.'
      )
    );
  }

  if (
    !isValidUrl(
      petaUrl
    )
  ) {
    redirect(
      buildUrl(
        'error',
        'URL peta tidak valid.'
      )
    );
  }

  const {
    error,
  } =
    await supabaseAdmin
      .from(
        'pertanahan_settings'
      )
      .upsert(
        {
          setting_key:
            SETTINGS_KEY,

          judul,

          deskripsi,

          tahun_data:
            tahunData,

          sumber_data:
            nullableString(
              sumberData
            ),

          catatan:
            nullableString(
              catatan
            ),

          peta_url:
            nullableString(
              petaUrl
            ),

          aktif,

          updated_at:
            new Date()
              .toISOString(),
        },
        {
          onConflict:
            'setting_key',
        }
      );

  if (error) {
    redirect(
      buildUrl(
        'error',
        error.message
      )
    );
  }

  revalidatePertanahan();

  redirect(
    buildUrl(
      'success',
      'Informasi pertanahan berhasil diperbarui.'
    )
  );
}

/* =========================================================
   CREATE DATA
========================================================= */

export async function tambahPertanahanAction(
  formData: FormData
) {
  await requireAdmin();

  const nama =
    getString(
      formData,
      'nama'
    );

  const kategori =
    getString(
      formData,
      'kategori'
    );

  const luasHektar =
    getNumber(
      formData,
      'luas_hektar'
    );

  const jumlahBidang =
    nullableNumber(
      formData,
      'jumlah_bidang'
    );

  const keterangan =
    getString(
      formData,
      'keterangan'
    );

  const warna =
    getString(
      formData,
      'warna'
    ) ||
    '#047857';

  const urutan =
    getNumber(
      formData,
      'urutan'
    );

  const aktif =
    getBoolean(
      formData,
      'aktif'
    );

  if (
    nama.length <
      2 ||
    kategori.length <
      2
  ) {
    redirect(
      buildUrl(
        'error',
        'Nama dan kategori wajib diisi.'
      )
    );
  }

  if (
    !Number.isFinite(
      luasHektar
    ) ||
    luasHektar <
      0
  ) {
    redirect(
      buildUrl(
        'error',
        'Luas lahan tidak valid.'
      )
    );
  }

  if (
    jumlahBidang !==
      null &&
    (
      !Number.isInteger(
        jumlahBidang
      ) ||
      jumlahBidang <
        0
    )
  ) {
    redirect(
      buildUrl(
        'error',
        'Jumlah bidang tidak valid.'
      )
    );
  }

  if (
    !Number.isInteger(
      urutan
    ) ||
    urutan <
      0
  ) {
    redirect(
      buildUrl(
        'error',
        'Urutan tidak valid.'
      )
    );
  }

  if (
    !isValidColor(
      warna
    )
  ) {
    redirect(
      buildUrl(
        'error',
        'Warna harus berupa kode HEX.'
      )
    );
  }

  const {
    error,
  } =
    await supabaseAdmin
      .from(
        'pertanahan_data'
      )
      .insert({
        nama,

        kategori,

        luas_hektar:
          luasHektar,

        jumlah_bidang:
          jumlahBidang,

        keterangan:
          nullableString(
            keterangan
          ),

        warna,

        aktif,

        urutan,
      });

  if (error) {
    redirect(
      buildUrl(
        'error',
        error.message
      )
    );
  }

  revalidatePertanahan();

  redirect(
    buildUrl(
      'success',
      'Data pertanahan berhasil ditambahkan.'
    )
  );
}

/* =========================================================
   UPDATE DATA
========================================================= */

export async function ubahPertanahanAction(
  id: string,
  formData: FormData
) {
  await requireAdmin();

  const dataId =
    String(
      id ?? ''
    ).trim();

  if (!dataId) {
    redirect(
      buildUrl(
        'error',
        'ID data pertanahan tidak valid.'
      )
    );
  }

  const nama =
    getString(
      formData,
      'nama'
    );

  const kategori =
    getString(
      formData,
      'kategori'
    );

  const luasHektar =
    getNumber(
      formData,
      'luas_hektar'
    );

  const jumlahBidang =
    nullableNumber(
      formData,
      'jumlah_bidang'
    );

  const keterangan =
    getString(
      formData,
      'keterangan'
    );

  const warna =
    getString(
      formData,
      'warna'
    ) ||
    '#047857';

  const urutan =
    getNumber(
      formData,
      'urutan'
    );

  const aktif =
    getBoolean(
      formData,
      'aktif'
    );

  if (
    !nama ||
    !kategori
  ) {
    redirect(
      buildUrl(
        'error',
        'Nama dan kategori wajib diisi.'
      )
    );
  }

  if (
    !Number.isFinite(
      luasHektar
    ) ||
    luasHektar <
      0
  ) {
    redirect(
      buildUrl(
        'error',
        'Luas lahan tidak valid.'
      )
    );
  }

  if (
    jumlahBidang !==
      null &&
    (
      !Number.isInteger(
        jumlahBidang
      ) ||
      jumlahBidang <
        0
    )
  ) {
    redirect(
      buildUrl(
        'error',
        'Jumlah bidang tidak valid.'
      )
    );
  }

  if (
    !Number.isInteger(
      urutan
    ) ||
    urutan <
      0
  ) {
    redirect(
      buildUrl(
        'error',
        'Urutan tidak valid.'
      )
    );
  }

  if (
    !isValidColor(
      warna
    )
  ) {
    redirect(
      buildUrl(
        'error',
        'Kode warna tidak valid.'
      )
    );
  }

  const {
    error,
  } =
    await supabaseAdmin
      .from(
        'pertanahan_data'
      )
      .update({
        nama,

        kategori,

        luas_hektar:
          luasHektar,

        jumlah_bidang:
          jumlahBidang,

        keterangan:
          nullableString(
            keterangan
          ),

        warna,

        urutan,

        aktif,

        updated_at:
          new Date()
            .toISOString(),
      })
      .eq(
        'id',
        dataId
      );

  if (error) {
    redirect(
      buildUrl(
        'error',
        error.message
      )
    );
  }

  revalidatePertanahan();

  redirect(
    buildUrl(
      'success',
      'Data pertanahan berhasil diperbarui.'
    )
  );
}

/* =========================================================
   DELETE
========================================================= */

export async function hapusPertanahanAction(
  formData: FormData
) {
  await requireAdmin();

  const id =
    getString(
      formData,
      'id'
    );

  if (!id) {
    redirect(
      buildUrl(
        'error',
        'ID data tidak valid.'
      )
    );
  }

  const {
    error,
  } =
    await supabaseAdmin
      .from(
        'pertanahan_data'
      )
      .delete()
      .eq(
        'id',
        id
      );

  if (error) {
    redirect(
      buildUrl(
        'error',
        error.message
      )
    );
  }

  revalidatePertanahan();

  redirect(
    buildUrl(
      'success',
      'Data pertanahan berhasil dihapus.'
    )
  );
}