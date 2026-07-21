// app/(public)/data-desa/galeri/page.tsx

import Link from 'next/link';

import {
  ArrowRight,
  CalendarDays,
  Images,
  MapPin,
} from 'lucide-react';

import SidebarLayanan from '@/components/SidebarLayanan';

import {
  supabaseAdmin,
} from '@/lib/supabase-admin';

import type {
  PilihanLayanan,
} from '@/types/layanan';

export const dynamic =
  'force-dynamic';

export const revalidate = 0;

interface AlbumPublikRow {
  id: string;
  judul: string;
  slug: string;

  deskripsi:
    | string
    | null;

  kategori: string;

  tanggal_kegiatan:
    | string
    | null;

  lokasi:
    | string
    | null;

  foto_sampul_url:
    | string
    | null;

  foto_galeri:
    | {
        count: number;
      }[];
}

interface LayananRow {
  id: number;
  nama: string;
  slug: string;
}

function formatTanggal(
  value:
    | string
    | null
) {
  if (!value) {
    return 'Tanggal belum tersedia';
  }

  return new Intl.DateTimeFormat(
    'id-ID',
    {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      timeZone:
        'Asia/Jakarta',
    }
  ).format(
    new Date(value)
  );
}

export default async function GaleriPage() {
  const [
    albumResult,
    layananResult,
  ] = await Promise.all([
    supabaseAdmin
      .from('album_galeri')
      .select(`
        id,
        judul,
        slug,
        deskripsi,
        kategori,
        tanggal_kegiatan,
        lokasi,
        foto_sampul_url,
        foto_galeri(count)
      `)
      .eq('aktif', true)
      .order('urutan', {
        ascending: true,
      })
      .order(
        'tanggal_kegiatan',
        {
          ascending: false,
          nullsFirst: false,
        }
      ),

    supabaseAdmin
      .from('layanan')
      .select(`
        id,
        nama,
        slug
      `)
      .eq('aktif', true)
      .order('urutan', {
        ascending: true,
      }),
  ]);

  if (albumResult.error) {
    console.error(
      'Gagal mengambil galeri:',
      albumResult.error.message
    );
  }

  if (layananResult.error) {
    console.error(
      'Gagal mengambil layanan:',
      layananResult.error.message
    );
  }

  const daftarAlbum =
    (albumResult.data ??
      []) as AlbumPublikRow[];

  const daftarLayanan:
    PilihanLayanan[] = (
      (layananResult.data ??
        []) as LayananRow[]
    ).map((layanan) => ({
      id:
        layanan.id,

      nama:
        layanan.nama,

      slug:
        layanan.slug,
    }));

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-700">
            <Images size={16} />
            Dokumentasi Desa
          </div>

          <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
            Galeri Desa Keji
          </h1>

          <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-500 md:text-base">
            Dokumentasi kegiatan pemerintahan,
            masyarakat, budaya, pembangunan,
            dan potensi Desa Keji.
          </p>
        </header>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <main className="min-w-0 lg:w-2/3">
            {daftarAlbum.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
                <Images
                  size={48}
                  className="mx-auto text-slate-300"
                />

                <h2 className="mt-4 font-black text-slate-700">
                  Galeri belum tersedia
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Pemerintah Desa belum mempublikasikan album.
                </p>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2">
                {daftarAlbum.map(
                  (album) => {
                    const jumlahFoto =
                      Number(
                        album
                          .foto_galeri?.[0]
                          ?.count ?? 0
                      );

                    return (
                      <Link
                        key={album.id}
                        href={`/data-desa/galeri/${album.slug}`}
                        className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                      >
                        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                          {album.foto_sampul_url ? (
                            <img
                              src={
                                album.foto_sampul_url
                              }
                              alt={
                                album.judul
                              }
                              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <Images
                                size={44}
                                className="text-slate-300"
                              />
                            </div>
                          )}

                          <span className="absolute left-4 top-4 rounded-full bg-emerald-700/90 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-white backdrop-blur">
                            {album.kategori}
                          </span>
                        </div>

                        <div className="p-5">
                          <h2 className="text-lg font-black text-slate-900 transition group-hover:text-emerald-700">
                            {album.judul}
                          </h2>

                          <p className="mt-2 line-clamp-2 text-sm font-medium leading-relaxed text-slate-500">
                            {album.deskripsi ??
                              'Dokumentasi kegiatan Desa Keji.'}
                          </p>

                          <div className="mt-4 space-y-2 text-xs font-semibold text-slate-400">
                            <p className="flex items-center gap-2">
                              <CalendarDays
                                size={14}
                              />

                              {formatTanggal(
                                album.tanggal_kegiatan
                              )}
                            </p>

                            <p className="flex items-center gap-2">
                              <MapPin
                                size={14}
                              />

                              {album.lokasi ??
                                'Desa Keji'}
                            </p>

                            <p className="flex items-center gap-2">
                              <Images
                                size={14}
                              />

                              {jumlahFoto} foto
                            </p>
                          </div>

                          <div className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-emerald-700">
                            Lihat Album

                            <ArrowRight
                              size={14}
                              className="transition group-hover:translate-x-1"
                            />
                          </div>
                        </div>
                      </Link>
                    );
                  }
                )}
              </div>
            )}
          </main>

          <aside className="min-w-0 lg:w-1/3">
            <SidebarLayanan
              daftarLayanan={
                daftarLayanan
              }
            />
          </aside>
        </div>
      </div>
    </div>
  );
}