// app/(public)/umkm/page.tsx

import LapakDesaClient from '@/components/umkm/LapakDesaClient';

import { supabaseAdmin } from '@/lib/supabase-admin';

import type { ProdukUmkm } from '@/types/umkm';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface EcatalogDatabase {
  ecatalog_judul: string | null;
  ecatalog_deskripsi: string | null;
  ecatalog_url: string | null;
  ecatalog_aktif: boolean | null;
}

interface EcatalogUmkm {
  judul: string;
  deskripsi: string;
  url: string;
}

function safeString(value: unknown) {
  return String(value ?? '').trim();
}

function normalizeExternalUrl(
  value: unknown
): string | null {
  const rawUrl = safeString(value);

  if (!rawUrl) {
    return null;
  }

  try {
    const url = new URL(rawUrl);

    if (
      url.protocol !== 'https:' &&
      url.protocol !== 'http:'
    ) {
      return null;
    }

    return url.toString();
  } catch {
    return null;
  }
}

function normalizeProduk(
  row: Record<string, unknown>
): ProdukUmkm {
  return {
    id: String(row.id ?? ''),

    nama_produk: String(
      row.nama_produk ?? ''
    ).trim(),

    slug: String(
      row.slug ?? ''
    ).trim(),

    kategori: String(
      row.kategori ?? 'Lainnya'
    ).trim(),

    harga: Number(
      row.harga ?? 0
    ),

    satuan: String(
      row.satuan ?? 'pcs'
    ).trim(),

    deskripsi: row.deskripsi
      ? String(row.deskripsi)
      : null,

    nama_penjual: String(
      row.nama_penjual ?? ''
    ).trim(),

    nomor_whatsapp: row.nomor_whatsapp
      ? String(row.nomor_whatsapp)
      : null,

    alamat: row.alamat
      ? String(row.alamat)
      : null,

    lokasi_url: row.lokasi_url
      ? String(row.lokasi_url)
      : null,

    gambar_url: row.gambar_url
      ? String(row.gambar_url)
      : null,

    terverifikasi: Boolean(
      row.terverifikasi
    ),

    aktif: Boolean(row.aktif),

    urutan: Number(
      row.urutan ?? 0
    ),

    created_at: String(
      row.created_at ?? ''
    ),

    updated_at: String(
      row.updated_at ?? ''
    ),
  };
}

function normalizeEcatalog(
  value: EcatalogDatabase | null
): EcatalogUmkm | null {
  if (
    !value ||
    value.ecatalog_aktif !== true
  ) {
    return null;
  }

  const url = normalizeExternalUrl(
    value.ecatalog_url
  );

  if (!url) {
    return null;
  }

  return {
    judul:
      safeString(
        value.ecatalog_judul
      ) ||
      'E-Catalog Produk UMKM Desa Keji',

    deskripsi:
      safeString(
        value.ecatalog_deskripsi
      ) ||
      'Akses katalog digital produk UMKM Desa Keji.',

    url,
  };
}

export default async function UmkmPage() {
  const [
    produkResult,
    settingsResult,
  ] = await Promise.all([
    supabaseAdmin
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
      }),

    supabaseAdmin
      .from('paket_wisata_settings')
      .select(`
        ecatalog_judul,
        ecatalog_deskripsi,
        ecatalog_url,
        ecatalog_aktif
      `)
      .eq('setting_key', 'utama')
      .maybeSingle(),
  ]);

  if (produkResult.error) {
    console.error(
      'Gagal mengambil produk UMKM:',
      {
        message:
          produkResult.error.message,

        code:
          produkResult.error.code,

        details:
          produkResult.error.details,

        hint:
          produkResult.error.hint,
      }
    );
  }

  if (settingsResult.error) {
    console.error(
      'Gagal mengambil pengaturan E-Catalog UMKM:',
      {
        message:
          settingsResult.error.message,

        code:
          settingsResult.error.code,

        details:
          settingsResult.error.details,

        hint:
          settingsResult.error.hint,
      }
    );
  }

  const produk = (
    (produkResult.data ??
      []) as Record<
      string,
      unknown
    >[]
  )
    .map(normalizeProduk)
    .filter(
      (item) =>
        item.id.length > 0 &&
        item.nama_produk.length > 0 &&
        item.nama_penjual.length > 0
    );

  const kategori = Array.from(
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

  const ecatalog =
    normalizeEcatalog(
      settingsResult.data as
        | EcatalogDatabase
        | null
    );

  return (
    <LapakDesaClient
      produk={produk}
      kategori={kategori}
      ecatalog={ecatalog}
    />
  );
}