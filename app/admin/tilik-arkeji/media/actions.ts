// app/admin/tilik-arkeji/media/actions.ts

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
  isGoogleDriveFolderUrl,
  isValidHttpUrl,
} from '@/lib/google-drive';

const ADMIN_PATH =
  '/admin/tilik-arkeji/media';

const PUBLIC_PATH =
  '/profil/tilik-arkeji';

type MediaKategori =
  | 'struktur-organisasi'
  | 'galeri-desa';

async function requireAdmin() {
  const supabase =
    await createClient();

  const {
    data: { user },
    error,
  } =
    await supabase.auth.getUser();

  if (error || !user) {
    redirect('/login');
  }
}

function getString(
  formData: FormData,
  key: string
) {
  return String(
    formData.get(key) ?? ''
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

function buildAdminUrl(
  type:
    | 'success'
    | 'error',
  message: string,
  section = 'pengaturan-drive'
) {
  const params =
    new URLSearchParams({
      [type]: message,
    });

  return (
    `${ADMIN_PATH}?` +
    `${params.toString()}` +
    `#${section}`
  );
}

function revalidateTilikArkeji() {
  revalidatePath(
    ADMIN_PATH
  );

  revalidatePath(
    '/admin/tilik-arkeji'
  );

  revalidatePath(
    PUBLIC_PATH
  );

  revalidatePath(
    '/profil/sejarah'
  );

  revalidatePath(
    '/admin'
  );
}

function validateOptionalUrl(
  value: string,
  label: string
) {
  if (!value) {
    return null;
  }

  if (!isValidHttpUrl(value)) {
    return `${label} harus menggunakan URL http:// atau https:// yang valid.`;
  }

  return null;
}

function validateImageUrl(
  value: string,
  required = true
) {
  if (!value) {
    return required
      ? 'Link gambar wajib diisi.'
      : null;
  }

  if (!isValidHttpUrl(value)) {
    return 'Link gambar harus menggunakan URL http:// atau https:// yang valid.';
  }

  if (
    isGoogleDriveFolderUrl(
      value
    )
  ) {
    return 'Gunakan link file gambar Google Drive, bukan link folder.';
  }

  return null;
}

function normalizeKategori(
  value: string
): MediaKategori | null {
  if (
    value ===
      'struktur-organisasi' ||
    value ===
      'galeri-desa'
  ) {
    return value;
  }

  return null;
}

/* =========================================================
   PENGATURAN LINK FOLDER DRIVE
========================================================= */

export async function simpanPengaturanDriveAction(
  formData: FormData
) {
  await requireAdmin();

  const driveUtamaUrl =
    getString(
      formData,
      'drive_utama_url'
    );

  const strukturDriveUrl =
    getString(
      formData,
      'struktur_drive_url'
    );

  const penghargaanDriveUrl =
    getString(
      formData,
      'penghargaan_drive_url'
    );

  const galeriDriveUrl =
    getString(
      formData,
      'galeri_drive_url'
    );

  const validationErrors = [
    validateOptionalUrl(
      driveUtamaUrl,
      'Link Drive utama'
    ),

    validateOptionalUrl(
      strukturDriveUrl,
      'Link Drive struktur organisasi'
    ),

    validateOptionalUrl(
      penghargaanDriveUrl,
      'Link Drive pencapaian desa'
    ),

    validateOptionalUrl(
      galeriDriveUrl,
      'Link Drive galeri desa'
    ),
  ].filter(
    (
      error
    ): error is string =>
      Boolean(error)
  );

  if (
    validationErrors.length >
    0
  ) {
    redirect(
      buildAdminUrl(
        'error',
        validationErrors[0],
        'pengaturan-drive'
      )
    );
  }

  const { error } =
    await supabaseAdmin
      .from(
        'tilik_arkeji_settings'
      )
      .upsert(
        {
          setting_key: 'utama',

          drive_utama_url:
            driveUtamaUrl ||
            null,

          struktur_drive_url:
            strukturDriveUrl ||
            null,

          penghargaan_drive_url:
            penghargaanDriveUrl ||
            null,

          galeri_drive_url:
            galeriDriveUrl ||
            null,

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
      buildAdminUrl(
        'error',
        error.message,
        'pengaturan-drive'
      )
    );
  }

  revalidateTilikArkeji();

  redirect(
    buildAdminUrl(
      'success',
      'Pengaturan folder Google Drive berhasil disimpan.',
      'pengaturan-drive'
    )
  );
}

/* =========================================================
   FOTO KEPALA DESA
========================================================= */

export async function simpanFotoMantanKadesAction(
  formData: FormData
) {
  await requireAdmin();

  const id =
    getString(
      formData,
      'id'
    );

  const fotoUrl =
    getString(
      formData,
      'foto_url'
    );

  if (!id) {
    redirect(
      buildAdminUrl(
        'error',
        'ID kepala desa tidak valid.',
        'foto-kepala-desa'
      )
    );
  }

  const imageError =
    validateImageUrl(
      fotoUrl,
      false
    );

  if (imageError) {
    redirect(
      buildAdminUrl(
        'error',
        imageError,
        'foto-kepala-desa'
      )
    );
  }

  const { error } =
    await supabaseAdmin
      .from(
        'tilik_arkeji_mantan_kades'
      )
      .update({
        foto_url:
          fotoUrl || null,

        foto_path: null,

        updated_at:
          new Date()
            .toISOString(),
      })
      .eq('id', id);

  if (error) {
    redirect(
      buildAdminUrl(
        'error',
        error.message,
        'foto-kepala-desa'
      )
    );
  }

  revalidateTilikArkeji();

  redirect(
    buildAdminUrl(
      'success',
      'Foto kepala desa berhasil diperbarui.',
      'foto-kepala-desa'
    )
  );
}

/* =========================================================
   FOTO PENGHARGAAN
========================================================= */

export async function simpanFotoPenghargaanAction(
  formData: FormData
) {
  await requireAdmin();

  const id =
    getString(
      formData,
      'id'
    );

  const fotoUrl =
    getString(
      formData,
      'foto_url'
    );

  if (!id) {
    redirect(
      buildAdminUrl(
        'error',
        'ID penghargaan tidak valid.',
        'foto-penghargaan'
      )
    );
  }

  const imageError =
    validateImageUrl(
      fotoUrl,
      false
    );

  if (imageError) {
    redirect(
      buildAdminUrl(
        'error',
        imageError,
        'foto-penghargaan'
      )
    );
  }

  const { error } =
    await supabaseAdmin
      .from(
        'tilik_arkeji_penghargaan'
      )
      .update({
        foto_url:
          fotoUrl || null,

        foto_path: null,

        updated_at:
          new Date()
            .toISOString(),
      })
      .eq('id', id);

  if (error) {
    redirect(
      buildAdminUrl(
        'error',
        error.message,
        'foto-penghargaan'
      )
    );
  }

  revalidateTilikArkeji();

  redirect(
    buildAdminUrl(
      'success',
      'Foto penghargaan berhasil diperbarui.',
      'foto-penghargaan'
    )
  );
}

/* =========================================================
   MEDIA STRUKTUR DAN GALERI
========================================================= */

interface MediaInput {
  kategori:
    MediaKategori;
  judul: string;
  deskripsi: string;
  gambarUrl: string;
  urutan: number;
  aktif: boolean;
}

function parseMediaInput(
  formData: FormData
): MediaInput | null {
  const kategori =
    normalizeKategori(
      getString(
        formData,
        'kategori'
      )
    );

  if (!kategori) {
    return null;
  }

  return {
    kategori,

    judul:
      getString(
        formData,
        'judul'
      ),

    deskripsi:
      getString(
        formData,
        'deskripsi'
      ),

    gambarUrl:
      getString(
        formData,
        'gambar_url'
      ),

    urutan:
      getNumber(
        formData,
        'urutan'
      ),

    aktif:
      getBoolean(
        formData,
        'aktif'
      ),
  };
}

function validateMedia(
  input: MediaInput
) {
  if (
    input.judul.length < 3
  ) {
    return 'Judul media minimal terdiri dari 3 karakter.';
  }

  const imageError =
    validateImageUrl(
      input.gambarUrl
    );

  if (imageError) {
    return imageError;
  }

  if (
    !Number.isInteger(
      input.urutan
    ) ||
    input.urutan < 0
  ) {
    return 'Nomor urutan harus berupa bilangan bulat minimal 0.';
  }

  return null;
}

export async function tambahMediaTilikAction(
  formData: FormData
) {
  await requireAdmin();

  const input =
    parseMediaInput(
      formData
    );

  if (!input) {
    redirect(
      buildAdminUrl(
        'error',
        'Kategori media tidak valid.',
        'tambah-media'
      )
    );
  }

  const validationError =
    validateMedia(input);

  if (validationError) {
    redirect(
      buildAdminUrl(
        'error',
        validationError,
        'tambah-media'
      )
    );
  }

  const now =
    new Date()
      .toISOString();

  const { error } =
    await supabaseAdmin
      .from(
        'tilik_arkeji_media'
      )
      .insert({
        kategori:
          input.kategori,

        judul:
          input.judul,

        deskripsi:
          input.deskripsi ||
          null,

        gambar_url:
          input.gambarUrl,

        urutan:
          input.urutan,

        aktif:
          input.aktif,

        created_at: now,
        updated_at: now,
      });

  if (error) {
    redirect(
      buildAdminUrl(
        'error',
        error.message,
        'tambah-media'
      )
    );
  }

  revalidateTilikArkeji();

  redirect(
    buildAdminUrl(
      'success',
      'Media Tilik Arkeji berhasil ditambahkan.',
      'daftar-media'
    )
  );
}

export async function ubahMediaTilikAction(
  formData: FormData
) {
  await requireAdmin();

  const id =
    getString(
      formData,
      'id'
    );

  const input =
    parseMediaInput(
      formData
    );

  if (!id) {
    redirect(
      buildAdminUrl(
        'error',
        'ID media tidak valid.',
        'daftar-media'
      )
    );
  }

  if (!input) {
    redirect(
      buildAdminUrl(
        'error',
        'Kategori media tidak valid.',
        'daftar-media'
      )
    );
  }

  const validationError =
    validateMedia(input);

  if (validationError) {
    redirect(
      buildAdminUrl(
        'error',
        validationError,
        'daftar-media'
      )
    );
  }

  const { error } =
    await supabaseAdmin
      .from(
        'tilik_arkeji_media'
      )
      .update({
        kategori:
          input.kategori,

        judul:
          input.judul,

        deskripsi:
          input.deskripsi ||
          null,

        gambar_url:
          input.gambarUrl,

        urutan:
          input.urutan,

        aktif:
          input.aktif,

        updated_at:
          new Date()
            .toISOString(),
      })
      .eq('id', id);

  if (error) {
    redirect(
      buildAdminUrl(
        'error',
        error.message,
        'daftar-media'
      )
    );
  }

  revalidateTilikArkeji();

  redirect(
    buildAdminUrl(
      'success',
      'Media Tilik Arkeji berhasil diperbarui.',
      'daftar-media'
    )
  );
}

export async function toggleMediaTilikAction(
  formData: FormData
) {
  await requireAdmin();

  const id =
    getString(
      formData,
      'id'
    );

  const aktif =
    getBoolean(
      formData,
      'aktif'
    );

  if (!id) {
    redirect(
      buildAdminUrl(
        'error',
        'ID media tidak valid.',
        'daftar-media'
      )
    );
  }

  const { error } =
    await supabaseAdmin
      .from(
        'tilik_arkeji_media'
      )
      .update({
        aktif,

        updated_at:
          new Date()
            .toISOString(),
      })
      .eq('id', id);

  if (error) {
    redirect(
      buildAdminUrl(
        'error',
        error.message,
        'daftar-media'
      )
    );
  }

  revalidateTilikArkeji();

  redirect(
    buildAdminUrl(
      'success',
      aktif
        ? 'Media berhasil dipublikasikan.'
        : 'Media berhasil disembunyikan.',
      'daftar-media'
    )
  );
}

export async function hapusMediaTilikAction(
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
      buildAdminUrl(
        'error',
        'ID media tidak valid.',
        'daftar-media'
      )
    );
  }

  const { error } =
    await supabaseAdmin
      .from(
        'tilik_arkeji_media'
      )
      .delete()
      .eq('id', id);

  if (error) {
    redirect(
      buildAdminUrl(
        'error',
        error.message,
        'daftar-media'
      )
    );
  }

  revalidateTilikArkeji();

  redirect(
    buildAdminUrl(
      'success',
      'Media berhasil dihapus.',
      'daftar-media'
    )
  );
}