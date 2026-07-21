// app/(public)/data-desa/galeri/[slug]/page.tsx

import Link from 'next/link';

import {
  ArrowLeft,
  CalendarDays,
  Images,
  MapPin,
} from 'lucide-react';

import {
  notFound,
} from 'next/navigation';

import {
  supabaseAdmin,
} from '@/lib/supabase-admin';

export const dynamic =
  'force-dynamic';

export const revalidate = 0;

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface FotoRow {
  id: string;
  url_foto: string;

  caption:
    | string
    | null;

  alt_text:
    | string
    | null;

  urutan: number;
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

export default async function DetailAlbumPage({
  params,
}: PageProps) {
  const {
    slug,
  } = await params;

  const {
    data: album,
    error: albumError,
  } = await supabaseAdmin
    .from('album_galeri')
    .select(`
      id,
      judul,
      slug,
      deskripsi,
      kategori,
      tanggal_kegiatan,
      lokasi,
      foto_sampul_url
    `)
    .eq('slug', slug)
    .eq('aktif', true)
    .maybeSingle();

  if (
    albumError ||
    !album
  ) {
    notFound();
  }

  const {
    data: fotoData,
    error: fotoError,
  } = await supabaseAdmin
    .from('foto_galeri')
    .select(`
      id,
      url_foto,
      caption,
      alt_text,
      urutan
    `)
    .eq(
      'album_id',
      album.id
    )
    .order('urutan', {
      ascending: true,
    });

  if (fotoError) {
    console.error(
      'Gagal mengambil foto album:',
      fotoError.message
    );
  }

  const daftarFoto =
    (fotoData ??
      []) as FotoRow[];

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/data-desa/galeri"
          className="mb-6 inline-flex items-center gap-2 text-sm font-extrabold text-emerald-700 transition hover:text-emerald-900"
        >
          <ArrowLeft size={17} />
          Kembali ke Galeri
        </Link>

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="relative aspect-[21/8] min-h-[280px] overflow-hidden bg-slate-200">
            {album.foto_sampul_url && (
              <img
                src={
                  album.foto_sampul_url
                }
                alt={album.judul}
                className="h-full w-full object-cover"
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
              <span className="rounded-full bg-emerald-600 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-widest">
                {album.kategori}
              </span>

              <h1 className="mt-4 text-3xl font-black md:text-4xl">
                {album.judul}
              </h1>

              <div className="mt-4 flex flex-wrap gap-4 text-xs font-semibold text-white/80">
                <span className="flex items-center gap-2">
                  <CalendarDays
                    size={15}
                  />

                  {formatTanggal(
                    album.tanggal_kegiatan
                  )}
                </span>

                <span className="flex items-center gap-2">
                  <MapPin
                    size={15}
                  />

                  {album.lokasi ??
                    'Desa Keji'}
                </span>

                <span className="flex items-center gap-2">
                  <Images
                    size={15}
                  />

                  {daftarFoto.length} foto
                </span>
              </div>
            </div>
          </div>

          {album.deskripsi && (
            <div className="border-b border-slate-100 p-6 md:p-8">
              <p className="whitespace-pre-line text-sm font-medium leading-8 text-slate-600">
                {album.deskripsi}
              </p>
            </div>
          )}

          <div className="p-5 md:p-8">
            <h2 className="text-xl font-black text-slate-900">
              Dokumentasi Foto
            </h2>

            {daftarFoto.length === 0 ? (
              <div className="mt-6 rounded-2xl bg-slate-50 p-10 text-center">
                <Images
                  size={40}
                  className="mx-auto text-slate-300"
                />

                <p className="mt-3 text-sm font-semibold text-slate-500">
                  Belum ada foto tambahan pada album ini.
                </p>
              </div>
            ) : (
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {daftarFoto.map(
                  (foto) => (
                    <a
                      key={foto.id}
                      href={foto.url_foto}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group overflow-hidden rounded-2xl border border-slate-200 bg-slate-100"
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={foto.url_foto}
                          alt={
                            foto.alt_text ??
                            album.judul
                          }
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>

                      {foto.caption && (
                        <p className="bg-white p-3 text-xs font-semibold text-slate-600">
                          {foto.caption}
                        </p>
                      )}
                    </a>
                  )
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}