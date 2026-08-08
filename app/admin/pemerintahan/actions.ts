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

/* =========================================================
   CONFIG
========================================================= */

const PEMERINTAHAN_KEY =
  'utama';

const STORAGE_BUCKET =
  'pemerintahan';

const STORAGE_FOLDER =
  'perangkat-desa';

const MAX_IMAGE_SIZE =
  5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES =
  new Set([
    'image/jpeg',
    'image/png',
    'image/webp',
  ]);

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

  return user;
}

/* =========================================================
   FORM HELPERS
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

function getImageFile(
  formData: FormData
): File | null {
  const value =
    formData.get(
      'foto'
    );

  if (
    !(value instanceof File) ||
    value.size <= 0
  ) {
    return null;
  }

  return value;
}

/* =========================================================
   IMAGE
========================================================= */

function validateImage(
  file: File | null
) {
  if (!file) {
    return null;
  }

  if (
    !ALLOWED_IMAGE_TYPES.has(
      file.type
    )
  ) {
    return 'Foto harus berformat JPG, PNG, atau WEBP.';
  }

  if (
    file.size >
    MAX_IMAGE_SIZE
  ) {
    return 'Ukuran foto maksimal 5 MB.';
  }

  return null;
}

function extensionFromMime(
  mime: string
) {
  switch (mime) {
    case 'image/png':
      return 'png';

    case 'image/webp':
      return 'webp';

    default:
      return 'jpg';
  }
}

async function uploadFoto(
  file: File
) {
  const imageError =
    validateImage(
      file
    );

  if (imageError) {
    throw new Error(
      imageError
    );
  }

  const extension =
    extensionFromMime(
      file.type
    );

  const path =
    `${STORAGE_FOLDER}/${Date.now()}-${crypto.randomUUID()}.${extension}`;

  const arrayBuffer =
    await file.arrayBuffer();

  const {
    error,
  } =
    await supabaseAdmin.storage
      .from(
        STORAGE_BUCKET
      )
      .upload(
        path,
        new Uint8Array(
          arrayBuffer
        ),
        {
          contentType:
            file.type,

          cacheControl:
            '3600',

          upsert:
            false,
        }
      );

  if (error) {
    throw new Error(
      `Upload foto gagal: ${error.message}`
    );
  }

  const {
    data,
  } =
    supabaseAdmin.storage
      .from(
        STORAGE_BUCKET
      )
      .getPublicUrl(
        path
      );

  return {
    path,

    url:
      data.publicUrl,
  };
}

async function hapusFotoStorage(
  path:
    | string
    | null
    | undefined
) {
  if (!path) {
    return;
  }

  const {
    error,
  } =
    await supabaseAdmin.storage
      .from(
        STORAGE_BUCKET
      )
      .remove([
        path,
      ]);

  if (error) {
    console.error(
      'Gagal menghapus foto perangkat:',
      error
    );
  }
}

/* =========================================================
   REVALIDATE
========================================================= */

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

  revalidatePath(
    '/admin'
  );
}

/* =========================================================
   INFORMASI PEMERINTAHAN
========================================================= */

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
      (value) =>
        !value
    )
  ) {
    return {
      success:
        false,

      message:
        'Semua kolom wajib harus diisi.',
    };
  }

  if (
    sekilasInfo.length >
    500
  ) {
    return {
      success:
        false,

      message:
        'Sekilas informasi maksimal 500 karakter.',
    };
  }

  if (
    deskripsiKepalaDesa.length >
    2000
  ) {
    return {
      success:
        false,

      message:
        'Deskripsi Kepala Desa maksimal 2.000 karakter.',
    };
  }

  if (
    deskripsiPerangkat.length >
    2000
  ) {
    return {
      success:
        false,

      message:
        'Deskripsi perangkat maksimal 2.000 karakter.',
    };
  }

  if (
    catatan.length >
    2000
  ) {
    return {
      success:
        false,

      message:
        'Catatan maksimal 2.000 karakter.',
    };
  }

  const {
    error,
  } =
    await supabaseAdmin
      .from(
        'pemerintahan_desa'
      )
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
            new Date()
              .toISOString(),
        },
        {
          onConflict:
            'pemerintahan_key',
        }
      );

  if (error) {
    console.error(
      'Gagal menyimpan informasi pemerintahan:',
      error
    );

    return {
      success:
        false,

      message:
        error.message ||
        'Informasi pemerintahan gagal disimpan.',
    };
  }

  revalidatePemerintahan();

  return {
    success:
      true,

    message:
      'Informasi pemerintahan berhasil diperbarui.',
  };
}

/* =========================================================
   PERANGKAT INPUT
========================================================= */

interface PerangkatInput {
  nama: string;

  jabatan: string;

  kelompok: string;

  nip: string;

  nomorTelepon: string;

  deskripsi: string;

  urutan: number;

  aktif: boolean;

  foto:
    | File
    | null;

  hapusFoto: boolean;
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
      getBoolean(
        formData,
        'aktif'
      ),

    foto:
      getImageFile(
        formData
      ),

    hapusFoto:
      getBoolean(
        formData,
        'hapus_foto'
      ),
  };
}

/* =========================================================
   VALIDATION
========================================================= */

function validatePerangkat(
  input: PerangkatInput
) {
  if (
    input.nama.length <
    2
  ) {
    return 'Nama perangkat minimal terdiri dari 2 karakter.';
  }

  if (
    input.nama.length >
    150
  ) {
    return 'Nama perangkat maksimal 150 karakter.';
  }

  if (
    input.jabatan.length <
    2
  ) {
    return 'Jabatan minimal terdiri dari 2 karakter.';
  }

  if (
    input.jabatan.length >
    150
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
    input.urutan <
      1
  ) {
    return 'Nomor urutan harus berupa angka minimal 1.';
  }

  if (
    input.nip.length >
    50
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

  const imageError =
    validateImage(
      input.foto
    );

  if (imageError) {
    return imageError;
  }

  return null;
}

/* =========================================================
   CREATE
========================================================= */

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
    validatePerangkat(
      input
    );

  if (
    validationError
  ) {
    return {
      success:
        false,

      message:
        validationError,
    };
  }

  let uploaded:
    | {
        url: string;
        path: string;
      }
    | null = null;

  if (
    input.foto
  ) {
    try {
      uploaded =
        await uploadFoto(
          input.foto
        );
    } catch (
      error
    ) {
      return {
        success:
          false,

        message:
          error instanceof Error
            ? error.message
            : 'Upload foto gagal.',
      };
    }
  }

  const {
    error,
  } =
    await supabaseAdmin
      .from(
        'perangkat_desa'
      )
      .insert({
        nama:
          input.nama,

        jabatan:
          input.jabatan,

        kelompok:
          input.kelompok as KelompokPerangkat,

        foto_url:
          uploaded?.url ??
          null,

        foto_path:
          uploaded?.path ??
          null,

        nip:
          input.nip ||
          null,

        nomor_telepon:
          input.nomorTelepon ||
          null,

        deskripsi:
          input.deskripsi ||
          null,

        urutan:
          input.urutan,

        aktif:
          input.aktif,

        updated_at:
          new Date()
            .toISOString(),
      });

  if (error) {
    if (
      uploaded
    ) {
      await hapusFotoStorage(
        uploaded.path
      );
    }

    console.error(
      'Gagal menambahkan perangkat desa:',
      error
    );

    return {
      success:
        false,

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

/* =========================================================
   UPDATE
========================================================= */

export async function ubahPerangkatAction(
  id: number,
  previousState:
    PemerintahanActionState,
  formData: FormData
): Promise<PemerintahanActionState> {
  void previousState;

  await requireAdmin();

  if (
    !Number.isInteger(
      id
    ) ||
    id <= 0
  ) {
    return {
      success:
        false,

      message:
        'ID perangkat tidak valid.',
    };
  }

  const input =
    parsePerangkat(
      formData
    );

  const validationError =
    validatePerangkat(
      input
    );

  if (
    validationError
  ) {
    return {
      success:
        false,

      message:
        validationError,
    };
  }

  const {
    data:
      current,

    error:
      currentError,
  } =
    await supabaseAdmin
      .from(
        'perangkat_desa'
      )
      .select(`
        foto_url,
        foto_path
      `)
      .eq(
        'id',
        id
      )
      .maybeSingle();

  if (
    currentError ||
    !current
  ) {
    return {
      success:
        false,

      message:
        currentError
          ?.message ??
        'Data perangkat tidak ditemukan.',
    };
  }

  const oldUrl =
    String(
      current.foto_url ??
      ''
    ).trim() ||
    null;

  const oldPath =
    String(
      current.foto_path ??
      ''
    ).trim() ||
    null;

  let uploaded:
    | {
        url: string;
        path: string;
      }
    | null = null;

  if (
    input.foto
  ) {
    try {
      uploaded =
        await uploadFoto(
          input.foto
        );
    } catch (
      error
    ) {
      return {
        success:
          false,

        message:
          error instanceof Error
            ? error.message
            : 'Upload foto gagal.',
      };
    }
  }

  let fotoUrl =
    oldUrl;

  let fotoPath =
    oldPath;

  if (
    uploaded
  ) {
    fotoUrl =
      uploaded.url;

    fotoPath =
      uploaded.path;
  } else if (
    input.hapusFoto
  ) {
    fotoUrl =
      null;

    fotoPath =
      null;
  }

  const {
    error,
  } =
    await supabaseAdmin
      .from(
        'perangkat_desa'
      )
      .update({
        nama:
          input.nama,

        jabatan:
          input.jabatan,

        kelompok:
          input.kelompok as KelompokPerangkat,

        foto_url:
          fotoUrl,

        foto_path:
          fotoPath,

        nip:
          input.nip ||
          null,

        nomor_telepon:
          input.nomorTelepon ||
          null,

        deskripsi:
          input.deskripsi ||
          null,

        urutan:
          input.urutan,

        aktif:
          input.aktif,

        updated_at:
          new Date()
            .toISOString(),
      })
      .eq(
        'id',
        id
      );

  if (error) {
    if (
      uploaded
    ) {
      await hapusFotoStorage(
        uploaded.path
      );
    }

    return {
      success:
        false,

      message:
        error.message ||
        'Perangkat desa gagal diperbarui.',
    };
  }

  if (
    oldPath &&
    (
      uploaded ||
      input.hapusFoto
    )
  ) {
    await hapusFotoStorage(
      oldPath
    );
  }

  revalidatePemerintahan();

  redirect(
    '/admin/pemerintahan?status=updated'
  );
}

/* =========================================================
   TOGGLE
========================================================= */

export async function togglePerangkatAction(
  formData: FormData
) {
  await requireAdmin();

  const id =
    Number(
      formData.get(
        'id'
      )
    );

  const aktif =
    String(
      formData.get(
        'aktif'
      ) ??
      ''
    ) === 'true';

  if (
    !Number.isInteger(
      id
    ) ||
    id <= 0
  ) {
    throw new Error(
      'ID perangkat tidak valid.'
    );
  }

  const {
    error,
  } =
    await supabaseAdmin
      .from(
        'perangkat_desa'
      )
      .update({
        aktif,

        updated_at:
          new Date()
            .toISOString(),
      })
      .eq(
        'id',
        id
      );

  if (error) {
    throw new Error(
      'Status perangkat gagal diperbarui.'
    );
  }

  revalidatePemerintahan();
}

/* =========================================================
   DELETE
========================================================= */

export async function hapusPerangkatAction(
  formData: FormData
) {
  await requireAdmin();

  const id =
    Number(
      formData.get(
        'id'
      )
    );

  if (
    !Number.isInteger(
      id
    ) ||
    id <= 0
  ) {
    throw new Error(
      'ID perangkat tidak valid.'
    );
  }

  const {
    data:
      current,
  } =
    await supabaseAdmin
      .from(
        'perangkat_desa'
      )
      .select(
        'foto_path'
      )
      .eq(
        'id',
        id
      )
      .maybeSingle();

  const {
    error,
  } =
    await supabaseAdmin
      .from(
        'perangkat_desa'
      )
      .delete()
      .eq(
        'id',
        id
      );

  if (error) {
    throw new Error(
      'Perangkat desa gagal dihapus.'
    );
  }

  const fotoPath =
    String(
      current?.foto_path ??
      ''
    ).trim();

  if (
    fotoPath
  ) {
    await hapusFotoStorage(
      fotoPath
    );
  }

  revalidatePemerintahan();
}