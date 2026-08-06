// app/(public)/desa-cantik/[kategori]/[tahun]/page.tsx

import Link from 'next/link';
import { notFound } from 'next/navigation';

import {
  ArrowLeft,
  BarChart3,
  Clock3,
  GraduationCap,
  HeartPulse,
  Home,
  Landmark,
  Users,
  type LucideIcon,
} from 'lucide-react';

import DesaCantikInfografisPopup from '@/components/public/DesaCantikInfografisPopup';
import DesaCantikKesehatan from '@/components/public/DesaCantikKesehatan';
import DesaCantikPendidikan from '@/components/public/DesaCantikPendidikan';
import DesaCantikPenduduk from '@/components/public/DesaCantikPenduduk';
import DesaCantikPenduduk2026 from '@/components/public/DesaCantikPenduduk2026';
import DesaCantikPerekonomian from '@/components/public/DesaCantikPerekonomian';
import DesaCantikPerumahan from '@/components/public/DesaCantikPerumahan';

import {
  getDataPenduduk,
  getKategoriDesaCantik,
  isKategoriDesaCantik,
  isTahunDesaCantik,
  SUMBER_DATA_PENDUDUK_2025,
} from '@/lib/desa-cantik';

import {
  getDataKesehatan,
  SUMBER_DATA_KESEHATAN_2025,
  SUMBER_DATA_KESEHATAN_2026,
} from '@/lib/desa-cantik-kesehatan';

import {
  getDataPendidikan,
  SUMBER_DATA_PENDIDIKAN_2025,
  SUMBER_DATA_PENDIDIKAN_2026,
} from '@/lib/desa-cantik-pendidikan';

import {
  getDataPenduduk2026,
  SUMBER_DATA_PENDUDUK_2026,
} from '@/lib/desa-cantik-penduduk-2026';

import {
  getDataPerekonomian,
  SUMBER_DATA_PEREKONOMIAN_2025,
  SUMBER_DATA_PEREKONOMIAN_2026,
} from '@/lib/desa-cantik-perekonomian';

import {
  getDataPerumahan,
  SUMBER_DATA_PERUMAHAN_2025,
  SUMBER_DATA_PERUMAHAN_2026,
} from '@/lib/desa-cantik-perumahan';

import {
  KATEGORI_DESA_CANTIK,
  TAHUN_DESA_CANTIK,
  type KategoriDesaCantik,
} from '@/types/desa-cantik';

interface DesaCantikDetailPageProps {
  params: Promise<{
    kategori: string;
    tahun: string;
  }>;
}

const ikonKategori: Record<KategoriDesaCantik, LucideIcon> = {
  penduduk: Users,
  pendidikan: GraduationCap,
  kesehatan: HeartPulse,
  perumahan: Home,
  perekonomian: Landmark,
};

/*
 * Pemetaan infografis berdasarkan kategori dan tahun.
 * Semua file disimpan dalam public/desa-cantik.
 */
const INFOGRAFIS_DESA_CANTIK: Record<
  KategoriDesaCantik,
  Record<number, string>
> = {
  penduduk: {
    2025: '/desa-cantik/penduduk%202025.png',
    2026: '/desa-cantik/penduduk%202026.png',
  },

  pendidikan: {
    2025: '/desa-cantik/pendidikan%202025.png',
    2026: '/desa-cantik/pendidikan%202026.png',
  },

  kesehatan: {
    2025: '/desa-cantik/kesehatan%202025.png',
    2026: '/desa-cantik/kesehatan%202026.png',
  },

  perumahan: {
    2025: '/desa-cantik/perumahan%202025.png',
    2026: '/desa-cantik/perumahan%202026.png',
  },

  perekonomian: {
    2025: '/desa-cantik/perekonomian%202025.png',
    2026: '/desa-cantik/perekonomian%202026.png',
  },
};

export function generateStaticParams() {
  return KATEGORI_DESA_CANTIK.flatMap((kategori) =>
    TAHUN_DESA_CANTIK.map((tahun) => ({
      kategori: kategori.slug,
      tahun: String(tahun),
    })),
  );
}

export default async function DesaCantikDetailPage({
  params,
}: DesaCantikDetailPageProps) {
  const {
    kategori: kategoriParam,
    tahun: tahunParam,
  } = await params;

  const tahun = Number(tahunParam);

  if (
    !isKategoriDesaCantik(kategoriParam) ||
    !Number.isInteger(tahun) ||
    !isTahunDesaCantik(tahun)
  ) {
    notFound();
  }

  const kategoriAktif = getKategoriDesaCantik(kategoriParam);

  if (!kategoriAktif) {
    notFound();
  }

  const Icon = ikonKategori[kategoriParam];

  const infografisUrl =
    INFOGRAFIS_DESA_CANTIK[kategoriParam]?.[tahun] ?? null;

  const dataPenduduk = getDataPenduduk(kategoriParam, tahun);

  const dataPenduduk2026 = getDataPenduduk2026(
    kategoriParam,
    tahun,
  );

  const dataPendidikan = getDataPendidikan(
    kategoriParam,
    tahun,
  );

  const dataKesehatan = getDataKesehatan(
    kategoriParam,
    tahun,
  );

  const dataPerumahan = getDataPerumahan(
    kategoriParam,
    tahun,
  );

  const dataPerekonomian = getDataPerekonomian(
    kategoriParam,
    tahun,
  );

  const tampilkanPenduduk2026 =
    kategoriParam === 'penduduk' &&
    tahun === 2026 &&
    dataPenduduk2026.length > 0;

  const tampilkanPenduduk =
    kategoriParam === 'penduduk' &&
    dataPenduduk.length > 0;

  const tampilkanPendidikan =
    kategoriParam === 'pendidikan' &&
    dataPendidikan.length > 0;

  const tampilkanKesehatan =
    kategoriParam === 'kesehatan' &&
    dataKesehatan.length > 0;

  const tampilkanPerumahan =
    kategoriParam === 'perumahan' &&
    dataPerumahan.length > 0;

  const tampilkanPerekonomian =
    kategoriParam === 'perekonomian' &&
    dataPerekonomian.length > 0;

  return (
    <div className="min-h-screen bg-slate-50 py-8 md:py-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/desa-cantik"
          className="mb-6 inline-flex items-center gap-2 text-sm font-extrabold text-emerald-700 transition hover:text-emerald-900"
        >
          <ArrowLeft size={17} />
          Kembali ke Desa Cantik
        </Link>

        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 px-6 py-9 text-white shadow-xl md:px-10 md:py-12">
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-28 right-24 h-72 w-72 rounded-full bg-emerald-400/20"
          />

          <div className="relative z-10">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm">
                <Icon size={29} />
              </div>

              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-200">
                  Desa Cantik Tahun {tahun}
                </p>

                <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                  Data {kategoriAktif.nama}
                </h1>

                <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-emerald-50 sm:text-base">
                  {kategoriAktif.deskripsi}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Navigasi kategori */}
        <nav className="mt-6 overflow-x-auto">
          <div className="flex min-w-max gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
            {KATEGORI_DESA_CANTIK.map((kategori) => {
              const KategoriIcon = ikonKategori[kategori.slug];

              const isActive = kategori.slug === kategoriParam;

              return (
                <Link
                  key={kategori.slug}
                  href={`/desa-cantik/${kategori.slug}/${tahun}`}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-extrabold transition ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-800'
                  }`}
                >
                  <KategoriIcon size={16} />
                  {kategori.nama}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Pilihan tahun */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs font-extrabold uppercase tracking-wider text-slate-500">
            Pilih tahun:
          </span>

          {TAHUN_DESA_CANTIK.map((pilihanTahun) => (
            <Link
              key={pilihanTahun}
              href={`/desa-cantik/${kategoriParam}/${pilihanTahun}`}
              className={`rounded-xl px-4 py-2 text-sm font-extrabold transition ${
                pilihanTahun === tahun
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-800'
              }`}
            >
              {pilihanTahun}
            </Link>
          ))}
        </div>

        <main className="mt-8 min-w-0 w-full">
          {/* Popup infografis sesuai kategori dan tahun */}
          {infografisUrl ? (
            <DesaCantikInfografisPopup
              key={`${kategoriParam}-${tahun}`}
              src={infografisUrl}
              title={`Infografis ${kategoriAktif.nama} Desa Keji Tahun ${tahun}`}
              alt={`Infografis data ${kategoriAktif.nama.toLowerCase()} Desa Keji tahun ${tahun}`}
              triggerLabel={`Lihat Infografis ${kategoriAktif.nama} ${tahun}`}
              autoOpen
            />
          ) : null}

          {tampilkanPenduduk2026 ? (
            <DesaCantikPenduduk2026
              rows={dataPenduduk2026}
              tahun={tahun}
              sumber={SUMBER_DATA_PENDUDUK_2026}
            />
          ) : tampilkanPenduduk ? (
            <DesaCantikPenduduk
              rows={dataPenduduk}
              tahun={tahun}
              sumber={SUMBER_DATA_PENDUDUK_2025}
            />
          ) : tampilkanPendidikan ? (
            <DesaCantikPendidikan
              data={dataPendidikan}
              tahun={tahun}
              sumber={
                tahun === 2025
                  ? SUMBER_DATA_PENDIDIKAN_2025
                  : SUMBER_DATA_PENDIDIKAN_2026
              }
            />
          ) : tampilkanKesehatan ? (
            <DesaCantikKesehatan
              data={dataKesehatan}
              tahun={tahun}
              sumber={
                tahun === 2025
                  ? SUMBER_DATA_KESEHATAN_2025
                  : SUMBER_DATA_KESEHATAN_2026
              }
            />
          ) : tampilkanPerumahan ? (
            <DesaCantikPerumahan
              data={dataPerumahan}
              tahun={tahun}
              sumber={
                tahun === 2025
                  ? SUMBER_DATA_PERUMAHAN_2025
                  : SUMBER_DATA_PERUMAHAN_2026
              }
            />
          ) : tampilkanPerekonomian ? (
            <DesaCantikPerekonomian
              data={dataPerekonomian}
              tahun={tahun}
              sumber={
                tahun === 2025
                  ? SUMBER_DATA_PEREKONOMIAN_2025
                  : SUMBER_DATA_PEREKONOMIAN_2026
              }
            />
          ) : (
            <section className="rounded-3xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <Clock3 size={31} />
              </div>

              <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-700">
                Data Tahun {tahun}
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-900">
                Data {kategoriAktif.nama} Belum Tersedia
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-sm font-medium leading-7 text-slate-600">
                Data {kategoriAktif.nama.toLowerCase()} Desa Keji tahun{' '}
                {tahun} sedang dalam proses penyusunan dan akan
                ditampilkan setelah data selesai diverifikasi.
              </p>

              <Link
                href="/desa-cantik"
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-emerald-800"
              >
                <BarChart3 size={17} />
                Lihat Data Lainnya
              </Link>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}