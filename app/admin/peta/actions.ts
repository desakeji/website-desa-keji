// app/admin/peta/actions.ts

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

import type {
  PetaActionState,
} from '@/types/peta';

const PETA_KEY = 'utama';

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
}

function getString(
  formData: FormData,
  key: string
) {
  return String(
    formData.get(key) ?? ''
  ).trim();
}

function isHttpUrl(
  value: string
) {
  try {
    const url =
      new URL(value);

    return (
      url.protocol === 'http:' ||
      url.protocol === 'https:'
    );
  } catch {
    return false;
  }
}

export async function simpanPetaDesaAction(
  previousState:
    PetaActionState,
  formData: FormData
): Promise<PetaActionState> {
  void previousState;

  await requireAdmin();

  const labelSekseksi =
    getString(
      formData,
      'label_seksi'
    );

  const judulHalaman =
    getString(
      formData,
      'judul_halaman'
    );

  const deskripsi =
    getString(
      formData,
      'deskripsi'
    );

  const tombolLabel =
    getString(
      formData,
      'tombol_label'
    );

  const mapsLinkUrl =
    getString(
      formData,
      'maps_link_url'
    );

  const mapsEmbedUrl =
    getString(
      formData,
      'maps_embed_url'
    );

  const iframeTitle =
    getString(
      formData,
      'iframe_title'
    );

  const tinggiPeta =
    Number(
      getString(
        formData,
        'tinggi_peta'
      )
    );

  const requiredValues = [
    labelSekseksi,
    judulHalaman,
    deskripsi,
    tombolLabel,
    mapsLinkUrl,
    mapsEmbedUrl,
    iframeTitle,
  ];

  if (
    requiredValues.some(
      (value) =>
        value.length === 0
    )
  ) {
    return {
      success: false,
      message:
        'Semua kolom wajib harus diisi.',
    };
  }

  if (
    labelSekseksi.length >
    100
  ) {
    return {
      success: false,
      message:
        'Label bagian maksimal 100 karakter.',
    };
  }

  if (
    judulHalaman.length >
    200
  ) {
    return {
      success: false,
      message:
        'Judul halaman maksimal 200 karakter.',
    };
  }

  if (
    deskripsi.length >
    1000
  ) {
    return {
      success: false,
      message:
        'Deskripsi maksimal 1.000 karakter.',
    };
  }

  if (
    tombolLabel.length >
    100
  ) {
    return {
      success: false,
      message:
        'Label tombol maksimal 100 karakter.',
    };
  }

  if (
    iframeTitle.length >
    200
  ) {
    return {
      success: false,
      message:
        'Judul iframe maksimal 200 karakter.',
    };
  }

  if (
    !isHttpUrl(
      mapsLinkUrl
    )
  ) {
    return {
      success: false,
      message:
        'URL aplikasi Maps tidak valid.',
    };
  }

  if (
    !isHttpUrl(
      mapsEmbedUrl
    )
  ) {
    return {
      success: false,
      message:
        'URL embed Google Maps tidak valid.',
    };
  }

  if (
    !Number.isInteger(
      tinggiPeta
    ) ||
    tinggiPeta < 300 ||
    tinggiPeta > 900
  ) {
    return {
      success: false,
      message:
        'Tinggi peta harus berupa angka antara 300 sampai 900 piksel.',
    };
  }

  try {
    const {
      error,
    } = await supabaseAdmin
      .from('peta_desa')
      .upsert(
        {
          peta_key:
            PETA_KEY,

          label_seksi:
            labelSekseksi,

          judul_halaman:
            judulHalaman,

          deskripsi,

          tombol_label:
            tombolLabel,

          maps_link_url:
            mapsLinkUrl,

          maps_embed_url:
            mapsEmbedUrl,

          iframe_title:
            iframeTitle,

          tinggi_peta:
            tinggiPeta,

          updated_at:
            new Date()
              .toISOString(),
        },
        {
          onConflict:
            'peta_key',
        }
      );

    if (error) {
      console.error(
        'Gagal menyimpan peta desa:',
        {
          message:
            error.message,

          code:
            error.code,

          details:
            error.details,

          hint:
            error.hint,
        }
      );

      return {
        success: false,
        message:
          error.message ||
          'Konfigurasi peta gagal disimpan.',
      };
    }

    revalidatePath(
      '/admin/peta'
    );

    revalidatePath(
      '/peta'
    );

    revalidatePath(
      '/admin'
    );

    return {
      success: true,
      message:
        'Konfigurasi peta desa berhasil diperbarui.',
    };
  } catch (error) {
    console.error(
      'Kesalahan menyimpan peta desa:',
      error
    );

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Terjadi kesalahan saat menyimpan peta desa.',
    };
  }
}