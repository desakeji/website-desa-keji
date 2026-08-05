// app/(public)/desa-wisata/panduan-pelayanan/page.tsx

import type {
  Metadata,
} from 'next';

import Link from 'next/link';

import {
  ArrowLeft,
  BookOpen,
  Download,
  ExternalLink,
  FileText,
  Leaf,
  UsersRound,
} from 'lucide-react';

import { supabaseAdmin } from '@/lib/supabase-admin';

export const metadata: Metadata = {
  title:
    'Panduan Pelayanan Wisata Desa Keji | SIJI',

  description:
    'Hospitality Pocket Book sebagai panduan pelayanan wisata bagi pelaku dan pengelola Desa Wisata Keji.',
};

export const dynamic =
  'force-dynamic';

export const revalidate = 0;

const JENIS_DOKUMEN =
  'hospitality-pocket-book';

interface PanduanPelayananPublik {
  id: string;
  judul: string;
  deskripsi: string;
  penyusun: string;
  tahun: number | null;
  jumlah_halaman: number | null;
  file_url: string;
  cover_url: string | null;
  urutan: number;
}

function safeString(
  value: unknown
) {
  return String(
    value ?? ''
  ).trim();
}

function normalizePanduan(
  value: unknown
): PanduanPelayananPublik | null {
  if (
    !value ||
    typeof value !== 'object' ||
    Array.isArray(value)
  ) {
    return null;
  }

  const row =
    value as Record<
      string,
      unknown
    >;

  const id =
    safeString(row.id);

  const judul =
    safeString(row.judul);

  const deskripsi =
    safeString(
      row.deskripsi
    );

  const penyusun =
    safeString(
      row.penyusun
    );

  const fileUrl =
    safeString(
      row.file_url
    );

  const tahun =
    row.tahun === null ||
    row.tahun === undefined
      ? null
      : Number(row.tahun);

  const jumlahHalaman =
    row.jumlah_halaman === null ||
    row.jumlah_halaman ===
      undefined
      ? null
      : Number(
          row.jumlah_halaman
        );

  const urutan =
    Number(
      row.urutan ?? 0
    );

  if (
    !id ||
    !judul ||
    !deskripsi ||
    !penyusun ||
    !fileUrl ||
    !Number.isInteger(urutan)
  ) {
    return null;
  }

  const coverUrl =
    safeString(
      row.cover_url
    );

  return {
    id,
    judul,
    deskripsi,
    penyusun,

    tahun:
      tahun !== null &&
      Number.isInteger(tahun)
        ? tahun
        : null,

    jumlah_halaman:
      jumlahHalaman !== null &&
      Number.isInteger(
        jumlahHalaman
      )
        ? jumlahHalaman
        : null,

    file_url: fileUrl,

    cover_url:
      coverUrl || null,

    urutan,
  };
}

async function getPanduanPelayanan():
  Promise<
    PanduanPelayananPublik[]
  > {
  const { data, error } =
    await supabaseAdmin
      .from(
        'desa_wisata_dokumen'
      )
      .select(`
        id,
        judul,
        deskripsi,
        penyusun,
        tahun,
        jumlah_halaman,
        file_url,
        cover_url,
        urutan
      `)
      .eq(
        'jenis',
        JENIS_DOKUMEN
      )
      .eq('aktif', true)
      .order('urutan', {
        ascending: true,
      })
      .order('tahun', {
        ascending: false,
        nullsFirst: false,
      });

  if (error) {
    console.error(
      'Gagal mengambil Hospitality Pocket Book:',
      {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      }
    );

    return [];
  }

  return (
    data ?? []
  )
    .map(normalizePanduan)
    .filter(
      (
        item
      ): item is PanduanPelayananPublik =>
        item !== null
    );
}

export default async function PanduanPelayananPage() {
  const daftarPanduan =
    await getPanduanPelayanan();

  const totalHalaman =
    daftarPanduan.reduce(
      (total, item) =>
        total +
        (
          item.jumlah_halaman ??
          0
        ),
      0
    );

  return (
    <div className="min-h-screen overflow-x-clip bg-slate-50">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-emerald-950 text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/background.png')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#021b16] via-emerald-950/90 to-emerald-900/45" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#021b16] via-transparent to-black/20" />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.55) 1px, transparent 1px)',

            backgroundSize:
              '28px 28px',
          }}
        />

        <div className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full border-[72px] border-white/[0.035]" />

        <div className="pointer-events-none absolute -bottom-32 -left-32 h-[390px] w-[390px] rounded-full bg-emerald-300/10 blur-[110px]" />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <Link
            href="/desa-wisata"
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-100/80 transition hover:text-white"
          >
            <ArrowLeft size={15} />

            Kembali ke Desa Wisata
          </Link>

          <div className="mt-7 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.17em] text-emerald-100 backdrop-blur sm:text-xs">
                <Leaf size={15} />

                Desa Wisata Keji
              </div>

              <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-300">
                Pocket Book
              </p>

              <h1 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Panduan Pelayanan Wisata
              </h1>

              <p className="mt-5 max-w-3xl text-sm font-medium leading-7 text-emerald-50/85 sm:text-base">
                Hospitality Pocket Book
                sebagai panduan bagi
                pelaku dan pengelola
                wisata dalam menyambut,
                melayani, dan memberikan
                pengalaman kunjungan
                yang baik kepada
                wisatawan.
              </p>
            </div>

            <div className="grid shrink-0 grid-cols-2 gap-3">
              <HeroStat
                value={String(
                  daftarPanduan.length
                )}
                label="Buku Aktif"
              />

              <HeroStat
                value={
                  totalHalaman > 0
                    ? String(
                        totalHalaman
                      )
                    : '—'
                }
                label="Total Halaman"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pengantar */}
      <section className="border-b border-slate-200 bg-white py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-8">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700">
            <BookOpen size={38} />
          </div>

          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-700">
              Standar Pelayanan
            </p>

            <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              Pelayanan ramah,
              profesional, dan
              berorientasi pada
              wisatawan
            </h2>

            <p className="mt-4 max-w-4xl text-sm font-medium leading-7 text-slate-500 sm:text-base">
              Buku ini menjadi media
              pembelajaran bagi pelaku
              wisata, pengelola
              destinasi, pemandu, pelaku
              UMKM, dan masyarakat yang
              terlibat dalam pelayanan
              kunjungan ke Desa Keji.
            </p>
          </div>
        </div>
      </section>

      {/* Daftar buku */}
      <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-700">
            Dokumen Panduan
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
            Hospitality Pocket Book
          </h2>

          <p className="mt-4 text-sm font-medium leading-7 text-slate-500 sm:text-base">
            Baca langsung melalui
            browser atau unduh file PDF
            untuk digunakan sebagai
            referensi pelayanan wisata.
          </p>
        </div>

        {daftarPanduan.length >
        0 ? (
          <div className="mt-10 grid gap-7">
            {daftarPanduan.map(
              (panduan, index) => (
                <PanduanCard
                  key={panduan.id}
                  panduan={panduan}
                  nomor={index + 1}
                />
              )
            )}
          </div>
        ) : (
          <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <BookOpen
              size={50}
              className="mx-auto text-slate-300"
            />

            <h2 className="mt-5 text-xl font-black text-slate-800">
              Buku sedang disiapkan
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm font-medium leading-7 text-slate-500">
              Hospitality Pocket Book
              akan ditampilkan setelah
              file ditambahkan dan
              dipublikasikan melalui
              halaman administrator.
            </p>
          </div>
        )}
      </main>

      {/* Penutup */}
      <section className="border-t border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
            <UsersRound size={30} />
          </div>

          <h2 className="mt-6 text-2xl font-black text-slate-900 sm:text-3xl">
            Tingkatkan kualitas
            pelayanan Desa Wisata Keji
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-7 text-slate-500">
            Gunakan panduan ini sebagai
            referensi untuk menciptakan
            pelayanan yang ramah,
            tertib, informatif, dan
            memberikan kesan positif
            kepada wisatawan.
          </p>

          <Link
            href="/desa-wisata"
            className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 text-sm font-extrabold text-white transition hover:bg-emerald-800"
          >
            <ArrowLeft size={17} />

            Kembali ke Desa Wisata
          </Link>
        </div>
      </section>
    </div>
  );
}

function PanduanCard({
  panduan,
  nomor,
}: {
  panduan:
    PanduanPelayananPublik;

  nomor: number;
}) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:border-emerald-200 hover:shadow-xl">
      <div className="grid lg:grid-cols-[320px_minmax(0,1fr)]">
        <div className="relative min-h-[420px] overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-800 to-teal-700">
          {panduan.cover_url ? (
            <img
              src={panduan.cover_url}
              alt={`Cover ${panduan.judul}`}
              loading="lazy"
              className="h-full min-h-[420px] w-full object-cover"
            />
          ) : (
            <div className="flex h-full min-h-[420px] flex-col items-center justify-center p-8 text-center text-white">
              <BookOpen size={62} />

              <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-200">
                Hospitality Pocket Book
              </p>

              <p className="mt-3 text-2xl font-black leading-tight">
                Desa Wisata Keji
              </p>
            </div>
          )}

          <span className="absolute right-4 top-4 rounded-full bg-black/60 px-3 py-1.5 text-xs font-black text-white backdrop-blur">
            {String(nomor).padStart(
              2,
              '0'
            )}
          </span>
        </div>

        <div className="flex flex-col p-6 sm:p-8 lg:p-10">
          <div className="flex flex-wrap gap-2">
            {panduan.tahun && (
              <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">
                Tahun {panduan.tahun}
              </span>
            )}

            {panduan.jumlah_halaman && (
              <span className="rounded-full bg-blue-100 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-blue-700">
                {panduan.jumlah_halaman}{' '}
                halaman
              </span>
            )}
          </div>

          <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-700">
            Panduan Pelayanan Wisata
          </p>

          <h3 className="mt-3 text-2xl font-black leading-tight text-slate-900 sm:text-3xl">
            {panduan.judul}
          </h3>

          <p className="mt-3 text-sm font-extrabold text-slate-500">
            Disusun oleh{' '}
            <span className="text-emerald-700">
              {panduan.penyusun}
            </span>
          </p>

          <p className="mt-6 flex-1 text-sm font-medium leading-8 text-slate-600 sm:text-base">
            {panduan.deskripsi}
          </p>

          <div className="mt-8 flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row">
            <a
              href={panduan.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 text-sm font-extrabold text-white transition hover:bg-emerald-800"
            >
              <FileText size={17} />

              Baca Buku

              <ExternalLink
                size={14}
              />
            </a>

            <a
              href={panduan.file_url}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-6 text-sm font-extrabold text-emerald-700 transition hover:bg-emerald-100"
            >
              <Download size={17} />

              Unduh PDF
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

function HeroStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <article className="min-w-28 rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur">
      <p className="text-2xl font-black text-white">
        {value}
      </p>

      <p className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.13em] text-emerald-200">
        {label}
      </p>
    </article>
  );
}