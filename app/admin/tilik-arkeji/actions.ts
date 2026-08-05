// app/admin/tilik-arkeji/actions.ts

'use server';

import { randomUUID } from 'node:crypto';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/lib/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

const BUCKET_NAME = 'tilik-arkeji';

const ADMIN_PATH =
  '/admin/tilik-arkeji';

const PUBLIC_PATH =
  '/profil/tilik-arkeji';

const MAX_IMAGE_SIZE =
  5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
] as const;

type NamaTabel =
  | 'tilik_arkeji_mantan_kades'
  | 'tilik_arkeji_penghargaan';

interface HasilUpload {
  path: string;
  url: string;
  error: string | null;
}

interface ArsipLama {
  id: string;
  foto_path: string | null;
  foto_url: string | null;
}

interface MantanKadesInput {
  nama: string;
  periodeMulai: number;
  periodeSelesai: number | null;
  biografi: string;
  urutan: number;
  aktif: boolean;
}

interface PenghargaanInput {
  namaPenghargaan: string;
  tahun: number;
  tingkat: string;
  penyelenggara: string;
  deskripsi: string;
  urutan: number;
  aktif: boolean;
}

async function requireAdmin() {
  const supabase =
    await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

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
    getString(formData, key) ===
    'true'
  );
}

function getInteger(
  formData: FormData,
  key: string
) {
  return Number(
    getString(formData, key)
  );
}

function getOptionalInteger(
  formData: FormData,
  key: string
) {
  const value =
    getString(formData, key);

  if (!value) {
    return null;
  }

  return Number(value);
}

function getFile(
  formData: FormData,
  key: string
): File | null {
  const value =
    formData.get(key);

  if (
    !(value instanceof File) ||
    value.size === 0
  ) {
    return null;
  }

  return value;
}

function slugify(value: string) {
  const slug = value
    .normalize('NFKD')
    .replace(
      /[\u0300-\u036f]/g,
      ''
    )
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');

  return slug || 'arsip';
}

function getImageExtension(
  mimeType: string
) {
  switch (mimeType) {
    case 'image/jpeg':
      return 'jpg';

    case 'image/png':
      return 'png';

    case 'image/webp':
      return 'webp';

    default:
      return null;
  }
}

function validateImage(
  file: File
) {
  if (
    !ALLOWED_IMAGE_TYPES.includes(
      file.type as
        (typeof ALLOWED_IMAGE_TYPES)[number]
    )
  ) {
    return 'Foto harus berformat JPG, PNG, atau WebP.';
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return 'Ukuran foto maksimal 5 MB.';
  }

  return null;
}

function buildAdminUrl(
  type: 'success' | 'error',
  message: string,
  section: string
) {
  const params =
    new URLSearchParams({
      [type]: message,
    });

  return `${ADMIN_PATH}?${params.toString()}#${section}`;
}

function revalidateTilikArkeji() {
  revalidatePath(ADMIN_PATH);
  revalidatePath(PUBLIC_PATH);
  revalidatePath('/profil/sejarah');
  revalidatePath('/profil/data');
  revalidatePath('/admin');
}

async function uploadImage(
  file: File,
  folder: string,
  nama: string
): Promise<HasilUpload> {
  const extension =
    getImageExtension(
      file.type
    );

  if (!extension) {
    return {
      path: '',
      url: '',
      error:
        'Format foto tidak didukung.',
    };
  }

  const path =
    `${folder}/` +
    `${slugify(nama)}-` +
    `${Date.now()}-` +
    `${randomUUID()}.` +
    extension;

  const fileBuffer =
    new Uint8Array(
      await file.arrayBuffer()
    );

  const { error } =
    await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .upload(
        path,
        fileBuffer,
        {
          contentType: file.type,
          cacheControl: '3600',
          upsert: false,
        }
      );

  if (error) {
    return {
      path: '',
      url: '',
      error: error.message,
    };
  }

  const { data } =
    supabaseAdmin.storage
      .from(BUCKET_NAME)
      .getPublicUrl(path);

  return {
    path,
    url: data.publicUrl,
    error: null,
  };
}

async function deleteStorageFiles(
  paths: Array<
    string | null | undefined
  >
) {
  const cleanPaths = [
    ...new Set(
      paths.filter(
        (
          path
        ): path is string =>
          Boolean(path)
      )
    ),
  ];

  if (cleanPaths.length === 0) {
    return;
  }

  const { error } =
    await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .remove(cleanPaths);

  if (error) {
    console.error(
      'Gagal menghapus foto Tilik Arkeji:',
      {
        message: error.message,
        paths: cleanPaths,
      }
    );
  }
}

async function getArsipLama(
  table: NamaTabel,
  id: string
): Promise<{
  data: ArsipLama | null;
  error: string | null;
}> {
  const { data, error } =
    await supabaseAdmin
      .from(table)
      .select(`
        id,
        foto_path,
        foto_url
      `)
      .eq('id', id)
      .maybeSingle();

  if (error) {
    return {
      data: null,
      error: error.message,
    };
  }

  if (!data) {
    return {
      data: null,
      error:
        'Data arsip tidak ditemukan.',
    };
  }

  return {
    data: {
      id: String(data.id),

      foto_path:
        data.foto_path
          ? String(data.foto_path)
          : null,

      foto_url:
        data.foto_url
          ? String(data.foto_url)
          : null,
    },

    error: null,
  };
}

/* =========================================================
   MANTAN KEPALA DESA
========================================================= */

function parseMantanKadesInput(
  formData: FormData
): MantanKadesInput {
  return {
    nama: getString(
      formData,
      'nama'
    ),

    periodeMulai: getInteger(
      formData,
      'periode_mulai'
    ),

    periodeSelesai:
      getOptionalInteger(
        formData,
        'periode_selesai'
      ),

    biografi: getString(
      formData,
      'biografi'
    ),

    urutan: getInteger(
      formData,
      'urutan'
    ),

    aktif: getBoolean(
      formData,
      'aktif'
    ),
  };
}

function validateMantanKadesInput(
  input: MantanKadesInput
) {
  if (input.nama.length < 3) {
    return 'Nama mantan kepala desa minimal terdiri dari 3 karakter.';
  }

  if (
    !Number.isInteger(
      input.periodeMulai
    ) ||
    input.periodeMulai < 1900 ||
    input.periodeMulai > 2200
  ) {
    return 'Tahun awal masa jabatan tidak valid.';
  }

  if (
    input.periodeSelesai !== null &&
    (
      !Number.isInteger(
        input.periodeSelesai
      ) ||
      input.periodeSelesai <
        input.periodeMulai ||
      input.periodeSelesai > 2200
    )
  ) {
    return 'Tahun akhir masa jabatan tidak valid.';
  }

  if (input.biografi.length < 20) {
    return 'Biografi minimal terdiri dari 20 karakter.';
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

export async function tambahMantanKadesAction(
  formData: FormData
) {
  await requireAdmin();

  const input =
    parseMantanKadesInput(
      formData
    );

  const validationError =
    validateMantanKadesInput(
      input
    );

  if (validationError) {
    redirect(
      buildAdminUrl(
        'error',
        validationError,
        'tambah-mantan-kades'
      )
    );
  }

  const foto =
    getFile(
      formData,
      'foto'
    );

  if (foto) {
    const imageError =
      validateImage(foto);

    if (imageError) {
      redirect(
        buildAdminUrl(
          'error',
          imageError,
          'tambah-mantan-kades'
        )
      );
    }
  }

  let hasilFoto:
    HasilUpload | null = null;

  if (foto) {
    hasilFoto =
      await uploadImage(
        foto,
        'mantan-kades',
        input.nama
      );

    if (
      hasilFoto.error ||
      !hasilFoto.path ||
      !hasilFoto.url
    ) {
      redirect(
        buildAdminUrl(
          'error',
          hasilFoto.error ??
            'Foto gagal diunggah.',
          'tambah-mantan-kades'
        )
      );
    }
  }

  const { error } =
    await supabaseAdmin
      .from(
        'tilik_arkeji_mantan_kades'
      )
      .insert({
        nama: input.nama,

        periode_mulai:
          input.periodeMulai,

        periode_selesai:
          input.periodeSelesai,

        biografi:
          input.biografi,

        foto_url:
          hasilFoto?.url ?? null,

        foto_path:
          hasilFoto?.path ?? null,

        urutan: input.urutan,
        aktif: input.aktif,

        created_at:
          new Date().toISOString(),

        updated_at:
          new Date().toISOString(),
      });

  if (error) {
    await deleteStorageFiles([
      hasilFoto?.path,
    ]);

    redirect(
      buildAdminUrl(
        'error',
        error.code === '23505'
          ? 'Nama dan periode mantan kepala desa tersebut sudah tersedia.'
          : error.message,
        'tambah-mantan-kades'
      )
    );
  }

  revalidateTilikArkeji();

  redirect(
    buildAdminUrl(
      'success',
      'Biografi mantan kepala desa berhasil ditambahkan.',
      'daftar-mantan-kades'
    )
  );
}

export async function ubahMantanKadesAction(
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
        'ID mantan kepala desa tidak valid.',
        'daftar-mantan-kades'
      )
    );
  }

  const arsipLamaResult =
    await getArsipLama(
      'tilik_arkeji_mantan_kades',
      id
    );

  if (
    arsipLamaResult.error ||
    !arsipLamaResult.data
  ) {
    redirect(
      buildAdminUrl(
        'error',
        arsipLamaResult.error ??
          'Data tidak ditemukan.',
        'daftar-mantan-kades'
      )
    );
  }

  const arsipLama =
    arsipLamaResult.data;

  const input =
    parseMantanKadesInput(
      formData
    );

  const validationError =
    validateMantanKadesInput(
      input
    );

  if (validationError) {
    redirect(
      buildAdminUrl(
        'error',
        validationError,
        'daftar-mantan-kades'
      )
    );
  }

  const fotoBaru =
    getFile(
      formData,
      'foto'
    );

  const hapusFoto =
    getBoolean(
      formData,
      'hapus_foto'
    );

  if (fotoBaru) {
    const imageError =
      validateImage(
        fotoBaru
      );

    if (imageError) {
      redirect(
        buildAdminUrl(
          'error',
          imageError,
          'daftar-mantan-kades'
        )
      );
    }
  }

  let fotoPath =
    arsipLama.foto_path;

  let fotoUrl =
    arsipLama.foto_url;

  let hasilFotoBaru:
    HasilUpload | null = null;

  if (fotoBaru) {
    hasilFotoBaru =
      await uploadImage(
        fotoBaru,
        'mantan-kades',
        input.nama
      );

    if (
      hasilFotoBaru.error ||
      !hasilFotoBaru.path ||
      !hasilFotoBaru.url
    ) {
      redirect(
        buildAdminUrl(
          'error',
          hasilFotoBaru.error ??
            'Foto baru gagal diunggah.',
          'daftar-mantan-kades'
        )
      );
    }

    fotoPath =
      hasilFotoBaru.path;

    fotoUrl =
      hasilFotoBaru.url;
  } else if (hapusFoto) {
    fotoPath = null;
    fotoUrl = null;
  }

  const { error } =
    await supabaseAdmin
      .from(
        'tilik_arkeji_mantan_kades'
      )
      .update({
        nama: input.nama,

        periode_mulai:
          input.periodeMulai,

        periode_selesai:
          input.periodeSelesai,

        biografi:
          input.biografi,

        foto_url: fotoUrl,
        foto_path: fotoPath,

        urutan: input.urutan,
        aktif: input.aktif,

        updated_at:
          new Date().toISOString(),
      })
      .eq('id', id);

  if (error) {
    await deleteStorageFiles([
      hasilFotoBaru?.path,
    ]);

    redirect(
      buildAdminUrl(
        'error',
        error.code === '23505'
          ? 'Nama dan periode tersebut sudah digunakan.'
          : error.message,
        'daftar-mantan-kades'
      )
    );
  }

  if (hasilFotoBaru) {
    await deleteStorageFiles([
      arsipLama.foto_path,
    ]);
  } else if (hapusFoto) {
    await deleteStorageFiles([
      arsipLama.foto_path,
    ]);
  }

  revalidateTilikArkeji();

  redirect(
    buildAdminUrl(
      'success',
      'Biografi mantan kepala desa berhasil diperbarui.',
      'daftar-mantan-kades'
    )
  );
}

export async function toggleMantanKadesAction(
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
        'ID data tidak valid.',
        'daftar-mantan-kades'
      )
    );
  }

  const { error } =
    await supabaseAdmin
      .from(
        'tilik_arkeji_mantan_kades'
      )
      .update({
        aktif,

        updated_at:
          new Date().toISOString(),
      })
      .eq('id', id);

  if (error) {
    redirect(
      buildAdminUrl(
        'error',
        error.message,
        'daftar-mantan-kades'
      )
    );
  }

  revalidateTilikArkeji();

  redirect(
    buildAdminUrl(
      'success',
      aktif
        ? 'Biografi berhasil dipublikasikan.'
        : 'Biografi berhasil disembunyikan.',
      'daftar-mantan-kades'
    )
  );
}

export async function hapusMantanKadesAction(
  formData: FormData
) {
  await requireAdmin();

  const id =
    getString(
      formData,
      'id'
    );

  const arsipLamaResult =
    await getArsipLama(
      'tilik_arkeji_mantan_kades',
      id
    );

  if (
    arsipLamaResult.error ||
    !arsipLamaResult.data
  ) {
    redirect(
      buildAdminUrl(
        'error',
        arsipLamaResult.error ??
          'Data tidak ditemukan.',
        'daftar-mantan-kades'
      )
    );
  }

  const { error } =
    await supabaseAdmin
      .from(
        'tilik_arkeji_mantan_kades'
      )
      .delete()
      .eq('id', id);

  if (error) {
    redirect(
      buildAdminUrl(
        'error',
        error.message,
        'daftar-mantan-kades'
      )
    );
  }

  await deleteStorageFiles([
    arsipLamaResult.data
      .foto_path,
  ]);

  revalidateTilikArkeji();

  redirect(
    buildAdminUrl(
      'success',
      'Biografi mantan kepala desa berhasil dihapus.',
      'daftar-mantan-kades'
    )
  );
}

/* =========================================================
   PENGHARGAAN DESA
========================================================= */

function parsePenghargaanInput(
  formData: FormData
): PenghargaanInput {
  return {
    namaPenghargaan:
      getString(
        formData,
        'nama_penghargaan'
      ),

    tahun: getInteger(
      formData,
      'tahun'
    ),

    tingkat: getString(
      formData,
      'tingkat'
    ),

    penyelenggara:
      getString(
        formData,
        'penyelenggara'
      ),

    deskripsi: getString(
      formData,
      'deskripsi'
    ),

    urutan: getInteger(
      formData,
      'urutan'
    ),

    aktif: getBoolean(
      formData,
      'aktif'
    ),
  };
}

function validatePenghargaanInput(
  input: PenghargaanInput
) {
  if (
    input.namaPenghargaan.length < 5
  ) {
    return 'Nama penghargaan minimal terdiri dari 5 karakter.';
  }

  if (
    !Number.isInteger(
      input.tahun
    ) ||
    input.tahun < 1900 ||
    input.tahun > 2200
  ) {
    return 'Tahun penghargaan tidak valid.';
  }

  if (input.tingkat.length < 2) {
    return 'Tingkat penghargaan minimal terdiri dari 2 karakter.';
  }

  if (
    input.penyelenggara.length < 2
  ) {
    return 'Nama penyelenggara minimal terdiri dari 2 karakter.';
  }

  if (
    input.deskripsi.length < 10
  ) {
    return 'Deskripsi penghargaan minimal terdiri dari 10 karakter.';
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

export async function tambahPenghargaanAction(
  formData: FormData
) {
  await requireAdmin();

  const input =
    parsePenghargaanInput(
      formData
    );

  const validationError =
    validatePenghargaanInput(
      input
    );

  if (validationError) {
    redirect(
      buildAdminUrl(
        'error',
        validationError,
        'tambah-penghargaan'
      )
    );
  }

  const foto =
    getFile(
      formData,
      'foto'
    );

  if (foto) {
    const imageError =
      validateImage(foto);

    if (imageError) {
      redirect(
        buildAdminUrl(
          'error',
          imageError,
          'tambah-penghargaan'
        )
      );
    }
  }

  let hasilFoto:
    HasilUpload | null = null;

  if (foto) {
    hasilFoto =
      await uploadImage(
        foto,
        'penghargaan',
        input.namaPenghargaan
      );

    if (
      hasilFoto.error ||
      !hasilFoto.path ||
      !hasilFoto.url
    ) {
      redirect(
        buildAdminUrl(
          'error',
          hasilFoto.error ??
            'Foto penghargaan gagal diunggah.',
          'tambah-penghargaan'
        )
      );
    }
  }

  const { error } =
    await supabaseAdmin
      .from(
        'tilik_arkeji_penghargaan'
      )
      .insert({
        nama_penghargaan:
          input.namaPenghargaan,

        tahun: input.tahun,
        tingkat: input.tingkat,

        penyelenggara:
          input.penyelenggara,

        deskripsi:
          input.deskripsi,

        foto_url:
          hasilFoto?.url ?? null,

        foto_path:
          hasilFoto?.path ?? null,

        urutan: input.urutan,
        aktif: input.aktif,

        created_at:
          new Date().toISOString(),

        updated_at:
          new Date().toISOString(),
      });

  if (error) {
    await deleteStorageFiles([
      hasilFoto?.path,
    ]);

    redirect(
      buildAdminUrl(
        'error',
        error.code === '23505'
          ? 'Nama dan tahun penghargaan tersebut sudah tersedia.'
          : error.message,
        'tambah-penghargaan'
      )
    );
  }

  revalidateTilikArkeji();

  redirect(
    buildAdminUrl(
      'success',
      'Penghargaan Desa Keji berhasil ditambahkan.',
      'daftar-penghargaan'
    )
  );
}

export async function ubahPenghargaanAction(
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
        'ID penghargaan tidak valid.',
        'daftar-penghargaan'
      )
    );
  }

  const arsipLamaResult =
    await getArsipLama(
      'tilik_arkeji_penghargaan',
      id
    );

  if (
    arsipLamaResult.error ||
    !arsipLamaResult.data
  ) {
    redirect(
      buildAdminUrl(
        'error',
        arsipLamaResult.error ??
          'Penghargaan tidak ditemukan.',
        'daftar-penghargaan'
      )
    );
  }

  const arsipLama =
    arsipLamaResult.data;

  const input =
    parsePenghargaanInput(
      formData
    );

  const validationError =
    validatePenghargaanInput(
      input
    );

  if (validationError) {
    redirect(
      buildAdminUrl(
        'error',
        validationError,
        'daftar-penghargaan'
      )
    );
  }

  const fotoBaru =
    getFile(
      formData,
      'foto'
    );

  const hapusFoto =
    getBoolean(
      formData,
      'hapus_foto'
    );

  if (fotoBaru) {
    const imageError =
      validateImage(
        fotoBaru
      );

    if (imageError) {
      redirect(
        buildAdminUrl(
          'error',
          imageError,
          'daftar-penghargaan'
        )
      );
    }
  }

  let fotoPath =
    arsipLama.foto_path;

  let fotoUrl =
    arsipLama.foto_url;

  let hasilFotoBaru:
    HasilUpload | null = null;

  if (fotoBaru) {
    hasilFotoBaru =
      await uploadImage(
        fotoBaru,
        'penghargaan',
        input.namaPenghargaan
      );

    if (
      hasilFotoBaru.error ||
      !hasilFotoBaru.path ||
      !hasilFotoBaru.url
    ) {
      redirect(
        buildAdminUrl(
          'error',
          hasilFotoBaru.error ??
            'Foto baru gagal diunggah.',
          'daftar-penghargaan'
        )
      );
    }

    fotoPath =
      hasilFotoBaru.path;

    fotoUrl =
      hasilFotoBaru.url;
  } else if (hapusFoto) {
    fotoPath = null;
    fotoUrl = null;
  }

  const { error } =
    await supabaseAdmin
      .from(
        'tilik_arkeji_penghargaan'
      )
      .update({
        nama_penghargaan:
          input.namaPenghargaan,

        tahun: input.tahun,
        tingkat: input.tingkat,

        penyelenggara:
          input.penyelenggara,

        deskripsi:
          input.deskripsi,

        foto_url: fotoUrl,
        foto_path: fotoPath,

        urutan: input.urutan,
        aktif: input.aktif,

        updated_at:
          new Date().toISOString(),
      })
      .eq('id', id);

  if (error) {
    await deleteStorageFiles([
      hasilFotoBaru?.path,
    ]);

    redirect(
      buildAdminUrl(
        'error',
        error.code === '23505'
          ? 'Nama dan tahun penghargaan tersebut sudah digunakan.'
          : error.message,
        'daftar-penghargaan'
      )
    );
  }

  if (hasilFotoBaru) {
    await deleteStorageFiles([
      arsipLama.foto_path,
    ]);
  } else if (hapusFoto) {
    await deleteStorageFiles([
      arsipLama.foto_path,
    ]);
  }

  revalidateTilikArkeji();

  redirect(
    buildAdminUrl(
      'success',
      'Penghargaan Desa Keji berhasil diperbarui.',
      'daftar-penghargaan'
    )
  );
}

export async function togglePenghargaanAction(
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
        'ID penghargaan tidak valid.',
        'daftar-penghargaan'
      )
    );
  }

  const { error } =
    await supabaseAdmin
      .from(
        'tilik_arkeji_penghargaan'
      )
      .update({
        aktif,

        updated_at:
          new Date().toISOString(),
      })
      .eq('id', id);

  if (error) {
    redirect(
      buildAdminUrl(
        'error',
        error.message,
        'daftar-penghargaan'
      )
    );
  }

  revalidateTilikArkeji();

  redirect(
    buildAdminUrl(
      'success',
      aktif
        ? 'Penghargaan berhasil dipublikasikan.'
        : 'Penghargaan berhasil disembunyikan.',
      'daftar-penghargaan'
    )
  );
}

export async function hapusPenghargaanAction(
  formData: FormData
) {
  await requireAdmin();

  const id =
    getString(
      formData,
      'id'
    );

  const arsipLamaResult =
    await getArsipLama(
      'tilik_arkeji_penghargaan',
      id
    );

  if (
    arsipLamaResult.error ||
    !arsipLamaResult.data
  ) {
    redirect(
      buildAdminUrl(
        'error',
        arsipLamaResult.error ??
          'Penghargaan tidak ditemukan.',
        'daftar-penghargaan'
      )
    );
  }

  const { error } =
    await supabaseAdmin
      .from(
        'tilik_arkeji_penghargaan'
      )
      .delete()
      .eq('id', id);

  if (error) {
    redirect(
      buildAdminUrl(
        'error',
        error.message,
        'daftar-penghargaan'
      )
    );
  }

  await deleteStorageFiles([
    arsipLamaResult.data
      .foto_path,
  ]);

  revalidateTilikArkeji();

  redirect(
    buildAdminUrl(
      'success',
      'Penghargaan Desa Keji berhasil dihapus.',
      'daftar-penghargaan'
    )
  );
}