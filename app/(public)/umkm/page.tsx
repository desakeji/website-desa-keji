// app/(public)/umkm/page.tsx

import LapakDesaClient from '@/components/umkm/LapakDesaClient';

import {
  supabaseAdmin,
} from '@/lib/supabase-admin';

import type {
  ProdukUmkm,
} from '@/types/umkm';

export const dynamic =
  'force-dynamic';

export const revalidate = 0;

function normalizeProduk(
  row: Record<
    string,
    unknown
  >
): ProdukUmkm {
  return {
    id:
      String(row.id ?? ''),

    nama_produk:
      String(
        row.nama_produk ??
          ''
      ).trim(),

    slug:
      String(
        row.slug ?? ''
      ).trim(),

    kategori:
      String(
        row.kategori ??
          'Lainnya'
      ).trim(),

    harga:
      Number(
        row.harga ?? 0
      ),

    satuan:
      String(
        row.satuan ??
          'pcs'
      ).trim(),

    deskripsi:
      row.deskripsi
        ? String(
            row.deskripsi
          )
        : null,

    nama_penjual:
      String(
        row.nama_penjual ??
          ''
      ).trim(),

    nomor_whatsapp:
      row.nomor_whatsapp
        ? String(
            row.nomor_whatsapp
          )
        : null,

    alamat:
      row.alamat
        ? String(row.alamat)
        : null,

    lokasi_url:
      row.lokasi_url
        ? String(
            row.lokasi_url
          )
        : null,

    gambar_url:
      row.gambar_url
        ? String(
            row.gambar_url
          )
        : null,

    terverifikasi:
      Boolean(
        row.terverifikasi
      ),

    aktif:
      Boolean(row.aktif),

    urutan:
      Number(
        row.urutan ?? 0
      ),

    created_at:
      String(
        row.created_at ??
          ''
      ),

    updated_at:
      String(
        row.updated_at ??
          ''
      ),
  };
}

export default async function UmkmPage() {
  const {
    data,
    error,
  } = await supabaseAdmin
    .from('produk_umkm')
    .select(`
      id,
      nama_produk,
      slug,
      kategori,
      harga,
      satuan,
      deskripsi,
      nama_penjual,
      nomor_whatsapp,
      alamat,
      lokasi_url,
      gambar_url,
      terverifikasi,
      aktif,
      urutan,
      created_at,
      updated_at
    `)
    .eq('aktif', true)
    .order('urutan', {
      ascending: true,
    })
    .order('created_at', {
      ascending: false,
    });

  if (error) {
    console.error(
      'Gagal mengambil produk UMKM:',
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
  }

  const produk =
    (
      (data ?? []) as Record<
        string,
        unknown
      >[]
    )
      .map(normalizeProduk)
      .filter(
        (item) =>
          item.id.length > 0 &&
          item.nama_produk
            .length > 0 &&
          item.nama_penjual
            .length > 0
      );

  const kategori =
    Array.from(
      new Set(
        produk
          .map(
            (item) =>
              item.kategori
          )
          .filter(Boolean)
      )
    ).sort((a, b) =>
      a.localeCompare(
        b,
        'id-ID'
      )
    );

  return (
    <LapakDesaClient
      produk={produk}
      kategori={kategori}
    />
  );
}