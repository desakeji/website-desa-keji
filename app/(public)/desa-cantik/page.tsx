import Link from 'next/link';

import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  CalendarDays,
  Database,
  HeartPulse,
  House,
  Sparkles,
  TrendingUp,
  UsersRound,
  type LucideIcon,
} from 'lucide-react';

import SidebarLayanan from '@/components/SidebarLayanan';

import {
  KATEGORI_DESA_CANTIK,
  TAHUN_DESA_CANTIK,
  type KategoriDesaCantik,
} from '@/types/desa-cantik';

import type { PilihanLayanan } from '@/types/layanan';

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

export default function DesaCantikPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-700 px-6 py-10 text-white shadow-xl md:px-10 md:py-12">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border-[48px] border-white/[0.05]" />

          <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-amber-300/[0.06]" />

          <div className="relative max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-50 backdrop-blur">
              <Sparkles size={15} />
              Desa Cinta Statistik
            </div>

            <h1 className="text-3xl font-black tracking-tight md:text-5xl">
              Desa Cantik Desa Keji
            </h1>

            <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-emerald-50/85 md:text-base">
              Pusat data statistik Desa Keji yang disusun per kategori dan per
              tahun untuk mendukung informasi publik, perencanaan, serta
              pembangunan desa berbasis data.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/desa-cantik/penduduk/2025"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-emerald-800 shadow-lg transition hover:-translate-y-0.5 hover:bg-emerald-50"
              >
                <BarChart3 size={18} />
                Lihat Data 2025
              </Link>

              <Link
                href="/desa-cantik/penduduk/2026"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-extrabold text-white backdrop-blur transition hover:bg-white/20"
              >
                <CalendarDays size={18} />
                Buka Tahun 2026
              </Link>
            </div>
          </div>
        </header>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <main className="min-w-0 space-y-7 lg:w-2/3">
            <section>
              <div className="mb-5">
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-700">
                  Kategori Statistik
                </p>

                <h2 className="mt-2 text-2xl font-black text-slate-900">
                  Jelajahi Data Desa Keji
                </h2>

                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">
                  Pilih kategori untuk melihat tabel, visualisasi, sumber data,
                  dan arsip statistik berdasarkan tahun.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {KATEGORI_DESA_CANTIK.map((kategori, index) => {
                  const Icon = ikonKategori[kategori.slug];
                  const isPenduduk = kategori.slug === 'penduduk';

                  return (
                    <Link
                      key={kategori.slug}
                      href={`/desa-cantik/${kategori.slug}/2025`}
                      className={`group rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg ${
                        index === KATEGORI_DESA_CANTIK.length - 1
                          ? 'sm:col-span-2'
                          : ''
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 transition group-hover:bg-emerald-700 group-hover:text-white">
                          <Icon size={23} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h3 className="text-lg font-black text-slate-900">
                              {kategori.nama}
                            </h3>

                            <span
                              className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider ${
                                isPenduduk
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : 'bg-amber-100 text-amber-700'
                              }`}
                            >
                              {isPenduduk ? 'Data tersedia' : 'Segera hadir'}
                            </span>
                          </div>

                          <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">
                            {kategori.deskripsi}
                          </p>

                          <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-700">
                            Lihat data

                            <ArrowRight
                              size={14}
                              className="transition-transform group-hover:translate-x-1"
                            />
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-700 text-white">
                  <Database size={23} />
                </div>

                <div>
                  <h2 className="text-xl font-black text-slate-900">
                    Arsip Data per Tahun
                  </h2>

                  <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">
                    Setiap kategori dipisahkan berdasarkan tahun agar data lama
                    tetap tersimpan dan dapat dibandingkan dengan pembaruan
                    berikutnya.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {TAHUN_DESA_CANTIK.map((tahun) => (
                  <Link
                    key={tahun}
                    href={`/desa-cantik/penduduk/${tahun}`}
                    className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-emerald-300 hover:bg-emerald-50"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-slate-400">
                          Tahun Data
                        </p>

                        <p className="mt-1 text-3xl font-black text-slate-900">
                          {tahun}
                        </p>
                      </div>

                      <CalendarDays
                        size={30}
                        className="text-emerald-600"
                      />
                    </div>

                    <p className="mt-4 text-xs font-bold text-slate-500">
                      {tahun === 2025
                        ? 'Data penduduk telah tersedia.'
                        : 'Halaman siap untuk publikasi data terbaru.'}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          </main>

          <aside className="min-w-0 lg:w-1/3">
            <SidebarLayanan daftarLayanan={daftarLayanan} />
          </aside>
        </div>
      </div>
    </div>
  );
}