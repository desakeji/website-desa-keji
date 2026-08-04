import Link from 'next/link';

import {
  ArrowRight,
  BarChart3,
  BookOpen,
  GraduationCap,
  HeartPulse,
  Home,
  Landmark,
  Users,
  type LucideIcon,
} from 'lucide-react';

import {
  KATEGORI_DESA_CANTIK,
  TAHUN_DESA_CANTIK,
  type KategoriDesaCantik,
} from '@/types/desa-cantik';

const ikonKategori: Record<KategoriDesaCantik, LucideIcon> = {
  penduduk: Users,
  pendidikan: GraduationCap,
  kesehatan: HeartPulse,
  perumahan: Home,
  perekonomian: Landmark,
};

export default function DesaCantikPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-8 md:py-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 px-6 py-10 text-white shadow-xl md:px-10 md:py-14">
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10" />
          <div className="absolute -bottom-24 right-24 h-64 w-64 rounded-full bg-emerald-400/20" />

          <div className="relative z-10 max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] backdrop-blur-sm">
              <BarChart3 size={16} />
              Data Statistik Desa
            </div>

            <h1 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
              Desa Cantik Desa Keji
            </h1>

            <p className="mt-5 max-w-2xl text-sm font-medium leading-7 text-emerald-50 sm:text-base">
              Pusat data statistik Desa Keji yang menyajikan informasi
              kependudukan, pendidikan, kesehatan, perumahan, dan perekonomian
              secara ringkas dan mudah dipahami.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {TAHUN_DESA_CANTIK.map((tahun) => (
                <Link
                  key={tahun}
                  href={`/desa-cantik/penduduk/${tahun}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-extrabold text-emerald-800 shadow-sm transition hover:bg-emerald-50"
                >
                  <BookOpen size={17} />
                  Data Tahun {tahun}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-700">
              Kategori Data
            </p>

            <h2 className="mt-2 text-2xl font-black text-slate-900 md:text-3xl">
              Jelajahi Data Desa Keji
            </h2>

            <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-600">
              Pilih kategori dan tahun data yang ingin ditampilkan.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {KATEGORI_DESA_CANTIK.map((kategori) => {
              const Icon = ikonKategori[kategori.slug];

              return (
                <article
                  key={kategori.slug}
                  className="group flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 transition group-hover:bg-emerald-700 group-hover:text-white">
                      <Icon size={25} />
                    </div>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-extrabold text-slate-600">
                      {TAHUN_DESA_CANTIK.length} Tahun
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-black text-slate-900">
                    {kategori.nama}
                  </h3>

                  <p className="mt-2 flex-1 text-sm font-medium leading-6 text-slate-600">
                    {kategori.deskripsi}
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {TAHUN_DESA_CANTIK.map((tahun) => (
                      <Link
                        key={tahun}
                        href={`/desa-cantik/${kategori.slug}/${tahun}`}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm font-extrabold text-emerald-800 transition hover:border-emerald-700 hover:bg-emerald-700 hover:text-white"
                      >
                        {tahun}
                        <ArrowRight size={15} />
                      </Link>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}