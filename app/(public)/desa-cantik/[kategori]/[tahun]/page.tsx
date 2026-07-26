import Link from 'next/link';

import {
  ArrowLeft,
  BookOpenCheck,
  CalendarDays,
  DatabaseZap,
  HeartPulse,
  House,
  Sparkles,
  TrendingUp,
  UsersRound,
  type LucideIcon,
} from 'lucide-react';

import { notFound } from 'next/navigation';

import SidebarLayanan from '@/components/SidebarLayanan';
import DesaCantikPenduduk from '@/components/public/DesaCantikPenduduk';

import {
  getDataPenduduk,
  getKategoriDesaCantik,
  isKategoriDesaCantik,
  isTahunDesaCantik,
  SUMBER_DATA_PENDUDUK_2025,
} from '@/lib/desa-cantik';

import {
  KATEGORI_DESA_CANTIK,
  TAHUN_DESA_CANTIK,
  type KategoriDesaCantik,
} from '@/types/desa-cantik';

import type { PilihanLayanan } from '@/types/layanan';

interface PageProps {
  params: Promise<{
    kategori: string;
    tahun: string;
  }>;
}

const daftarLayanan: PilihanLayanan[] = [
  {
    id: 1,
    nama: 'Surat Pengantar KTP / KK Baru',
    slug: 'surat-pengantar-ktp-kk',
  },
  {
    id: 2,
    nama: 'Surat Keterangan Usaha (SKU)',
    slug: 'surat-keterangan-usaha',
  },
  {
    id: 3,
    nama: 'Surat Keterangan Tidak Mampu (SKTM)',
    slug: 'surat-keterangan-tidak-mampu',
  },
];

const ikonKategori: Record<KategoriDesaCantik, LucideIcon> = {
  penduduk: UsersRound,
  pendidikan: BookOpenCheck,
  kesehatan: HeartPulse,
  perumahan: House,
  perekonomian: TrendingUp,
};

export function generateStaticParams() {
  return KATEGORI_DESA_CANTIK.flatMap((kategori) =>
    TAHUN_DESA_CANTIK.map((tahun) => ({
      kategori: kategori.slug,
      tahun: String(tahun),
    })),
  );
}

export default async function DesaCantikDataPage({ params }: PageProps) {
  const {
    kategori: kategoriParam,
    tahun: tahunParam,
  } = await params;

  const tahun = Number(tahunParam);

  if (
    !isKategoriDesaCantik(kategoriParam) ||
    !isTahunDesaCantik(tahun)
  ) {
    notFound();
  }

  const kategori = getKategoriDesaCantik(kategoriParam);

  if (!kategori) {
    notFound();
  }
  
  const kategoriAktif =
  kategoriParam as KategoriDesaCantik;

  const Icon = ikonKategori[kategoriAktif];

  const dataPenduduk = getDataPenduduk(kategoriParam, tahun);
  const hasData = dataPenduduk.length > 0;

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/desa-cantik"
          className="mb-5 inline-flex items-center gap-2 text-sm font-extrabold text-slate-500 transition hover:text-emerald-700"
        >
          <ArrowLeft size={16} />
          Kembali ke Desa Cantik
        </Link>

        <header className="mb-7 rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-lg">
              <Icon size={31} />
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-700">
                <Sparkles size={14} />
                Desa Cinta Statistik
              </div>

              <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                Data {kategori.nama} Desa Keji
              </h1>

              <p className="mt-2 max-w-3xl text-sm font-medium leading-relaxed text-slate-500">
                {kategori.deskripsi}
              </p>
            </div>
          </div>
        </header>

        <section className="mb-6 space-y-4">
          <div>
            <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.16em] text-slate-400">
              Pilih Kategori
            </p>

            <nav className="flex gap-2 overflow-x-auto pb-2">
              {KATEGORI_DESA_CANTIK.map((item) => (
                <Link
                  key={item.slug}
                  href={`/desa-cantik/${item.slug}/${tahun}`}
                  className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-extrabold transition ${
                    item.slug === kategoriParam
                      ? 'bg-emerald-700 text-white shadow-md'
                      : 'border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-700'
                  }`}
                >
                  {item.nama}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.16em] text-slate-400">
              Pilih Tahun
            </p>

            <nav className="flex flex-wrap gap-2">
              {TAHUN_DESA_CANTIK.map((item) => (
                <Link
                  key={item}
                  href={`/desa-cantik/${kategoriParam}/${item}`}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-extrabold transition ${
                    item === tahun
                      ? 'bg-emerald-700 text-white shadow-md'
                      : 'border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-700'
                  }`}
                >
                  <CalendarDays size={16} />
                  Tahun {item}
                </Link>
              ))}
            </nav>
          </div>
        </section>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <main className="min-w-0 lg:w-2/3">
            {hasData && kategoriParam === 'penduduk' ? (
              <DesaCantikPenduduk
                rows={dataPenduduk}
                tahun={tahun}
                sumber={SUMBER_DATA_PENDUDUK_2025}
              />
            ) : (
              <section className="rounded-3xl border border-amber-200 bg-amber-50 px-6 py-14 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                  <DatabaseZap size={31} />
                </div>

                <h2 className="mt-5 text-2xl font-black text-amber-950">
                  Data {kategori.nama} Tahun {tahun} belum tersedia
                </h2>

                <p className="mx-auto mt-3 max-w-lg text-sm font-medium leading-relaxed text-amber-800">
                  Struktur halaman telah disiapkan. Tabel akan tampil di sini
                  setelah data diverifikasi dan dipublikasikan melalui panel
                  admin.
                </p>

                {tahun === 2026 && (
                  <Link
                    href={`/desa-cantik/${kategoriParam}/2025`}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-700 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-amber-800"
                  >
                    Lihat Data 2025
                  </Link>
                )}
              </section>
            )}
          </main>

          <aside className="min-w-0 lg:w-1/3">
            <SidebarLayanan daftarLayanan={daftarLayanan} />
          </aside>
        </div>
      </div>
    </div>
  );
}