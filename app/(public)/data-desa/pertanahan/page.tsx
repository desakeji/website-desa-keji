// app/(public)/data-desa/pertanahan/page.tsx

import type {
  Metadata,
} from 'next';

import Link from 'next/link';

import {
  ArrowRight,
  BarChart3,
  Building2,
  ClipboardList,
  Database,
  ExternalLink,
  FolderOpen,
  Landmark,
  MapPin,
  Route,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';

/* =========================================================
   METADATA
========================================================= */

export const metadata:
  Metadata = {
  title:
    'Data Pertanahan Desa Keji | SIJI',

  description:
    'Informasi pertanahan, penggunaan lahan, status tanah, administrasi pertanahan, dan dokumen pertanahan Desa Keji.',
};

/* =========================================================
   CONFIG
========================================================= */

const GOOGLE_DRIVE_URL =
  'https://drive.google.com/drive/folders/1jmyHiMfPyiBCl7vOxenvI4AsZvPaWYbx?hl=ID';

/* =========================================================
   TYPES
========================================================= */

interface InformasiPertanahan {
  title:
    string;

  description:
    string;

  icon:
    LucideIcon;
}

/* =========================================================
   DATA
========================================================= */

const informasiPertanahan:
  InformasiPertanahan[] = [
    {
      title:
        'Penggunaan Lahan',

      description:
        'Informasi pemanfaatan lahan untuk permukiman, pertanian, fasilitas umum, dan penggunaan lainnya di wilayah Desa Keji.',

      icon:
        BarChart3,
    },

    {
      title:
        'Status Pertanahan',

      description:
        'Informasi umum mengenai status dan administrasi pertanahan yang tersedia pada Pemerintah Desa Keji.',

      icon:
        ShieldCheck,
    },

    {
      title:
        'Persebaran Wilayah',

      description:
        'Gambaran persebaran penggunaan dan pemanfaatan tanah pada wilayah Desa Keji.',

      icon:
        MapPin,
    },

    {
      title:
        'Administrasi Pertanahan',

      description:
        'Informasi administrasi dan pencatatan data pertanahan yang dikelola oleh Pemerintah Desa Keji.',

      icon:
        ClipboardList,
    },
  ];

/* =========================================================
   PAGE
========================================================= */

export default function PertanahanPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-slate-50">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative isolate overflow-hidden bg-emerald-950 text-white">
        {/* Background */}

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/background.png')",
          }}
        />

        {/* Overlay */}

        <div className="absolute inset-0 bg-gradient-to-r from-[#021b16] via-emerald-950/95 to-emerald-800/65" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#021b16] via-transparent to-black/20" />

        {/* Pattern */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.13]"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.55) 1px, transparent 1px)',

            backgroundSize:
              '28px 28px',
          }}
        />

        {/* Decoration */}

        <div className="pointer-events-none absolute -right-36 -top-36 h-[500px] w-[500px] rounded-full border-[80px] border-white/[0.04]" />

        <div className="pointer-events-none absolute -bottom-36 left-1/4 h-[420px] w-[420px] rounded-full bg-emerald-300/[0.07] blur-[110px]" />

        {/* Content */}

        <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 md:pb-28 md:pt-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            {/* LEFT */}

            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.17em] text-emerald-100 backdrop-blur">
                <Database
                  size={15}
                />

                Data Desa Keji
              </div>

              <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.22em] text-emerald-300">
                Informasi Wilayah
              </p>

              <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
                Data Pertanahan
              </h1>

              <p className="mt-6 max-w-3xl text-sm font-medium leading-7 text-emerald-50/85 md:text-base md:leading-8">
                Informasi mengenai
                penggunaan lahan,
                administrasi
                pertanahan, status
                tanah, serta
                pemanfaatan wilayah
                Desa Keji.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-xs font-bold backdrop-blur">
                  <MapPin
                    size={16}
                  />

                  Desa Keji
                </span>

                <span className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-xs font-bold backdrop-blur">
                  <Landmark
                    size={16}
                  />

                  Ungaran Barat
                </span>

                <span className="inline-flex items-center gap-2 rounded-xl border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-xs font-bold text-emerald-100 backdrop-blur">
                  <FolderOpen
                    size={16}
                  />

                  Dokumen Digital
                </span>
              </div>

              {/* CTA */}

              <div className="mt-8">
                <a
                  href={
                    GOOGLE_DRIVE_URL
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl bg-emerald-300 px-6 text-sm font-black text-emerald-950 shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-emerald-200"
                >
                  <FolderOpen
                    size={18}
                  />

                  Buka Data Pertanahan

                  <ExternalLink
                    size={15}
                  />
                </a>
              </div>
            </div>

            {/* RIGHT */}

            <aside className="rounded-[2rem] border border-white/15 bg-black/25 p-6 shadow-2xl backdrop-blur-xl md:p-7">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-emerald-300">
                    Akses Sementara
                  </p>

                  <h2 className="mt-2 text-2xl font-black">
                    Dokumen Pertanahan
                    Desa
                  </h2>
                </div>

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-emerald-200">
                  <FolderOpen
                    size={26}
                  />
                </div>
              </div>

              <p className="mt-5 text-sm font-medium leading-7 text-emerald-50/75">
                Untuk sementara,
                dokumen pertanahan
                Desa Keji dapat
                diakses melalui
                penyimpanan Google
                Drive yang telah
                disediakan.
              </p>

              <div className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-200/15 bg-emerald-300/10 p-4">
                <ShieldCheck
                  size={19}
                  className="mt-0.5 shrink-0 text-emerald-200"
                />

                <p className="text-xs font-semibold leading-5 text-emerald-50/75">
                  Pengembangan
                  berikutnya dapat
                  mengintegrasikan
                  data pertanahan
                  secara langsung ke
                  dalam SIJI.
                </p>
              </div>

              <a
                href={
                  GOOGLE_DRIVE_URL
                }
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-extrabold text-emerald-900 transition hover:bg-emerald-50"
              >
                <FolderOpen
                  size={16}
                />

                Akses Google Drive

                <ExternalLink
                  size={14}
                />
              </a>
            </aside>
          </div>
        </div>
      </section>

      {/* =====================================================
          FLOATING INFO
      ===================================================== */}

      <section className="relative z-20 -mt-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 sm:grid-cols-2 lg:grid-cols-4">
            <QuickStat
              label="Wilayah"
              value="Desa Keji"
              icon={
                MapPin
              }
              primary
            />

            <QuickStat
              label="Kecamatan"
              value="Ungaran Barat"
              icon={
                Landmark
              }
            />

            <QuickStat
              label="Jenis Data"
              value="Pertanahan"
              icon={
                Database
              }
            />

            <QuickStat
              label="Akses"
              value="Google Drive"
              icon={
                FolderOpen
              }
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <main className="mx-auto max-w-7xl px-4 pb-20 pt-14 sm:px-6 lg:px-8">
        {/* ===================================================
            PENGANTAR
        =================================================== */}

        <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
            {/* LEFT */}

            <div className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-800 to-teal-700 p-7 text-white md:p-9">
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.13]"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, rgba(255,255,255,0.45) 1px, transparent 1px)',

                  backgroundSize:
                    '24px 24px',
                }}
              />

              <div className="relative">
                <div className="flex h-13 w-13 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
                  <Building2
                    size={24}
                  />
                </div>

                <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-200">
                  Tentang Data
                  Pertanahan
                </p>

                <h2 className="mt-3 text-2xl font-black leading-tight md:text-3xl">
                  Informasi tanah dan
                  pemanfaatan wilayah
                  Desa Keji
                </h2>
              </div>
            </div>

            {/* RIGHT */}

            <div className="p-7 md:p-9">
              <p className="text-sm font-medium leading-8 text-slate-600">
                Data pertanahan
                merupakan bagian dari
                informasi kewilayahan
                desa yang dapat
                digunakan untuk
                mengetahui gambaran
                penggunaan dan
                pemanfaatan tanah,
                administrasi
                pertanahan, serta
                perkembangan wilayah.
              </p>

              <p className="mt-4 text-sm font-medium leading-8 text-slate-600">
                Pada tahap awal,
                dokumen pertanahan
                masih disediakan
                melalui Google Drive.
                Selanjutnya data dapat
                dikembangkan agar
                tersaji secara lebih
                terstruktur dan
                terintegrasi langsung
                pada website SIJI.
              </p>
            </div>
          </div>
        </section>

        {/* ===================================================
            AKSES DOKUMEN
        =================================================== */}

        <section className="relative mt-12 overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-950 via-emerald-800 to-teal-700 text-white shadow-xl">
          {/* Pattern */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(255,255,255,0.55) 1px, transparent 1px)',

              backgroundSize:
                '25px 25px',
            }}
          />

          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border-[42px] border-white/[0.04]" />

          <div className="relative grid gap-8 p-7 md:p-9 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center">
            {/* ICON */}

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-emerald-700 shadow-lg">
              <FolderOpen
                size={31}
              />
            </div>

            {/* TEXT */}

            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-200">
                Arsip Digital
              </p>

              <h2 className="mt-2 text-2xl font-black md:text-3xl">
                Data Pertanahan
                Desa Keji
              </h2>

              <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-emerald-50/80">
                Dokumen data
                pertanahan untuk
                sementara tersedia
                melalui folder Google
                Drive. Gunakan tombol
                di samping untuk
                membuka seluruh
                dokumen yang tersedia.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-100">
                  Data Digital
                </span>

                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-100">
                  Google Drive
                </span>

                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-100">
                  Desa Keji
                </span>
              </div>
            </div>

            {/* BUTTON */}

            <a
              href={
                GOOGLE_DRIVE_URL
              }
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-13 shrink-0 items-center justify-center gap-2 rounded-2xl bg-emerald-300 px-6 text-sm font-black text-emerald-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-emerald-200"
            >
              <FolderOpen
                size={18}
              />

              Buka Dokumen

              <ExternalLink
                size={15}
              />
            </a>
          </div>
        </section>

        {/* ===================================================
            KATEGORI
        =================================================== */}

        <section className="mt-12">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.17em] text-emerald-700">
              Informasi Pertanahan
            </p>

            <h2 className="mt-2 text-2xl font-black text-slate-900 md:text-3xl">
              Ruang Lingkup Data
              Pertanahan
            </h2>

            <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-slate-500">
              Informasi pertanahan
              dapat mencakup beberapa
              aspek data wilayah dan
              administrasi tanah.
            </p>
          </div>

          <div className="mt-7 grid gap-5 md:grid-cols-2">
            {informasiPertanahan.map(
              (
                item,
                index
              ) => (
                <InformasiCard
                  key={
                    item.title
                  }
                  item={
                    item
                  }
                  index={
                    index
                  }
                />
              )
            )}
          </div>
        </section>

        {/* ===================================================
            STATISTIK
        =================================================== */}

        <section className="mt-12 overflow-hidden rounded-[2rem] border border-emerald-100 bg-white shadow-sm">
          <div className="border-b border-emerald-100 bg-gradient-to-r from-emerald-50 via-white to-white p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-700 text-white">
                <BarChart3
                  size={23}
                />
              </div>

              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-700">
                  Statistik Pertanahan
                </p>

                <h2 className="mt-2 text-2xl font-black text-slate-900">
                  Data Penggunaan
                  Lahan
                </h2>

                <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-slate-500">
                  Statistik akan
                  ditampilkan secara
                  langsung melalui
                  SIJI pada
                  pengembangan
                  berikutnya.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="rounded-3xl border border-dashed border-emerald-200 bg-emerald-50/50 px-6 py-14 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-emerald-700 shadow-sm">
                <Database
                  size={29}
                />
              </div>

              <h3 className="mt-5 text-lg font-black text-slate-800">
                Statistik sedang
                dikembangkan
              </h3>

              <p className="mx-auto mt-3 max-w-xl text-sm font-medium leading-7 text-slate-500">
                Untuk sementara,
                informasi dan dokumen
                pertanahan dapat
                dilihat melalui
                folder Google Drive
                yang tersedia.
              </p>

              <a
                href={
                  GOOGLE_DRIVE_URL
                }
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 text-sm font-extrabold text-white transition hover:bg-emerald-800"
              >
                <FolderOpen
                  size={16}
                />

                Lihat Data

                <ExternalLink
                  size={13}
                />
              </a>
            </div>
          </div>
        </section>

        {/* ===================================================
            PETA
        =================================================== */}

        <section className="mt-12 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
            <div className="p-7 md:p-9">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <Route
                  size={23}
                />
              </div>

              <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.17em] text-emerald-700">
                Informasi Spasial
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-900">
                Persebaran Data
                Pertanahan
              </h2>

              <p className="mt-4 text-sm font-medium leading-7 text-slate-500">
                Pada pengembangan
                berikutnya, bagian ini
                dapat digunakan untuk
                menampilkan peta
                pertanahan atau
                persebaran penggunaan
                lahan Desa Keji secara
                lebih interaktif.
              </p>
            </div>

            <div className="relative flex min-h-[310px] items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-800 to-teal-700 p-8 text-white">
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.12]"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, rgba(255,255,255,.5) 1px, transparent 1px)',

                  backgroundSize:
                    '24px 24px',
                }}
              />

              <div className="relative text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
                  <MapPin
                    size={30}
                  />
                </div>

                <h3 className="mt-5 text-lg font-black">
                  Peta Pertanahan
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-sm font-medium leading-7 text-emerald-50/75">
                  Visualisasi peta
                  pertanahan akan
                  dikembangkan setelah
                  data spasial siap
                  untuk ditampilkan.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            CATATAN
        =================================================== */}

        <section className="relative mt-12 overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-950 via-emerald-800 to-teal-700 p-7 text-white shadow-xl md:p-9">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(255,255,255,0.55) 1px, transparent 1px)',

              backgroundSize:
                '25px 25px',
            }}
          />

          <div className="relative grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
                <ShieldCheck
                  size={23}
                />
              </div>

              <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-200">
                Pengembangan SIJI
              </p>

              <h2 className="mt-2 text-2xl font-black md:text-3xl">
                Integrasi data
                pertanahan secara
                bertahap
              </h2>

              <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-emerald-50/80">
                Saat ini SIJI
                menyediakan akses
                menuju dokumen
                pertanahan melalui
                Google Drive.
                Selanjutnya data
                tersebut dapat
                dikembangkan menjadi
                informasi statistik
                dan visualisasi yang
                terintegrasi langsung
                pada website.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href={
                  GOOGLE_DRIVE_URL
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-extrabold text-emerald-900 transition hover:bg-emerald-50"
              >
                <FolderOpen
                  size={16}
                />

                Data Pertanahan

                <ExternalLink
                  size={13}
                />
              </a>

              <Link
                href="/pemerintahan"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-5 text-sm font-extrabold text-white transition hover:bg-white/15"
              >
                Pemerintahan Desa

                <ArrowRight
                  size={16}
                />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

/* =========================================================
   QUICK STAT
========================================================= */

function QuickStat({
  label,
  value,
  icon:
    Icon,
  primary =
    false,
}: {
  label:
    string;

  value:
    string;

  icon:
    LucideIcon;

  primary?:
    boolean;
}) {
  return (
    <article
      className={`min-h-[150px] p-6 ${
        primary
          ? 'bg-emerald-800 text-white'
          : 'bg-white text-slate-900'
      }`}
    >
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl ${
          primary
            ? 'bg-white/10 text-emerald-100'
            : 'bg-emerald-100 text-emerald-700'
        }`}
      >
        <Icon
          size={21}
        />
      </div>

      <p
        className={`mt-5 text-[10px] font-extrabold uppercase tracking-[0.15em] ${
          primary
            ? 'text-emerald-200'
            : 'text-slate-400'
        }`}
      >
        {label}
      </p>

      <p className="mt-2 break-words text-lg font-black">
        {value}
      </p>
    </article>
  );
}

/* =========================================================
   INFORMATION CARD
========================================================= */

function InformasiCard({
  item,
  index,
}: {
  item:
    InformasiPertanahan;

  index:
    number;
}) {
  const Icon =
    item.icon;

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md">
      <div className="pointer-events-none absolute -right-10 -top-10 text-[90px] font-black text-emerald-950/[0.035]">
        {String(
          index +
            1
        ).padStart(
          2,
          '0'
        )}
      </div>

      <div className="relative flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 transition group-hover:bg-emerald-700 group-hover:text-white">
          <Icon
            size={22}
          />
        </div>

        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-emerald-700">
            Data Pertanahan
          </p>

          <h3 className="mt-2 text-lg font-black text-slate-900">
            {
              item.title
            }
          </h3>

          <p className="mt-2 text-sm font-medium leading-7 text-slate-500">
            {
              item.description
            }
          </p>
        </div>
      </div>
    </article>
  );
}