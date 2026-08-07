// app/(public)/desa-wisata/budaya-tradisi/page.tsx

import type {
  Metadata,
} from 'next';

import Link from 'next/link';

import {
  ArrowRight,
  BookOpen,
  Camera,
  Coffee,
  HeartHandshake,
  Landmark,
  Leaf,
  MapPin,
  Sparkles,
  Store,
  UsersRound,
  UtensilsCrossed,
  type LucideIcon,
} from 'lucide-react';

/* =========================================================
   METADATA
========================================================= */

export const metadata:
  Metadata = {
  title:
    'Budaya dan Tradisi Desa Keji | SIJI',

  description:
    'Mengenal budaya, tradisi, kuliner lokal, kesenian, serta kehidupan sosial masyarakat Desa Keji.',
};

/* =========================================================
   TYPES
========================================================= */

interface BudayaItem {
  title: string;

  description: string;

  category: string;

  icon: LucideIcon;
}

interface NilaiBudayaItem {
  title: string;

  description: string;

  icon: LucideIcon;
}

/* =========================================================
   DATA BUDAYA
========================================================= */

const budayaDesa:
  BudayaItem[] = [
    {
      title:
        'Tethek Melek',

      description:
        'Tethek Melek merupakan salah satu pangan lokal yang menjadi bagian dari kekayaan kuliner dan identitas masyarakat Desa Keji.',

      category:
        'Kuliner Tradisional',

      icon:
        Coffee,
    },

    {
      title:
        'Tradisi Wajik',

      description:
        'Tradisi pembuatan dan pembagian wajik menjadi bagian dari kegiatan masyarakat yang memperlihatkan kebersamaan serta nilai sosial yang tumbuh di Desa Keji.',

      category:
        'Tradisi Masyarakat',

      icon:
        UtensilsCrossed,
    },

    {
      title:
        'Kesenian Tradisional',

      description:
        'Kegiatan kesenian menjadi ruang bagi masyarakat untuk berekspresi sekaligus menjaga keberlanjutan warisan budaya dari generasi ke generasi.',

      category:
        'Seni Pertunjukan',

      icon:
        Sparkles,
    },

    {
      title:
        'Kegiatan Sosial Masyarakat',

      description:
        'Berbagai kegiatan sosial dan kebersamaan warga menjadi bagian penting dari kehidupan masyarakat serta memperkuat hubungan antarwarga Desa Keji.',

      category:
        'Kehidupan Sosial',

      icon:
        UsersRound,
    },

    {
      title:
        'Gotong Royong',

      description:
        'Semangat bekerja bersama dan saling membantu masih menjadi nilai penting dalam berbagai kegiatan lingkungan maupun kehidupan masyarakat desa.',

      category:
        'Nilai Masyarakat',

      icon:
        HeartHandshake,
    },

    {
      title:
        'Pasar dan Produk Lokal',

      description:
        'Produk lokal, kuliner, dan kegiatan ekonomi masyarakat menjadi bagian dari perkembangan budaya sekaligus kreativitas warga Desa Keji.',

      category:
        'Ekonomi Kreatif',

      icon:
        Store,
    },
  ];

/* =========================================================
   NILAI BUDAYA
========================================================= */

const nilaiBudaya:
  NilaiBudayaItem[] = [
    {
      title:
        'Kebersamaan',

      description:
        'Kegiatan masyarakat menjadi ruang untuk mempererat hubungan dan rasa kebersamaan antarwarga.',

      icon:
        UsersRound,
    },

    {
      title:
        'Pelestarian',

      description:
        'Tradisi dan budaya lokal terus diperkenalkan agar dapat dikenal dan diwariskan kepada generasi berikutnya.',

      icon:
        Landmark,
    },

    {
      title:
        'Gotong Royong',

      description:
        'Semangat saling membantu menjadi salah satu nilai yang tetap hidup dalam kehidupan masyarakat Desa Keji.',

      icon:
        HeartHandshake,
    },
  ];

/* =========================================================
   PAGE
========================================================= */

export default function BudayaTradisiPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative isolate overflow-hidden bg-emerald-950 text-white">
        {/* Background */}

        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage:
              "url('/background.png')",
          }}
        />

        {/* Overlay */}

        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/90 to-emerald-800/55" />

        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-black/10" />

        {/* Pattern */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',

            backgroundSize:
              '28px 28px',
          }}
        />

        {/* Decoration */}

        <div className="pointer-events-none absolute -right-32 -top-32 h-[430px] w-[430px] rounded-full border-[72px] border-white/[0.04]" />

        {/* Content */}

        <div className="relative mx-auto flex min-h-[540px] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            {/* Icon */}

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur">
              <Landmark
                size={27}
              />
            </div>

            {/* Eyebrow */}

            <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-300">
              Desa Wisata Keji
            </p>

            {/* Title */}

            <h1 className="mt-3 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Budaya dan Tradisi

              <span className="block text-emerald-300">
                Desa Keji
              </span>
            </h1>

            {/* Description */}

            <p className="mt-6 max-w-3xl text-sm font-medium leading-8 text-emerald-50/85 sm:text-base">
              Mengenal berbagai
              tradisi, kuliner lokal,
              kesenian, kegiatan
              sosial, dan nilai
              kebersamaan yang tumbuh
              dalam kehidupan
              masyarakat Desa Keji.
            </p>

            {/* Buttons */}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/desa-wisata/agenda"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-400 px-6 text-sm font-extrabold text-emerald-950 transition hover:bg-emerald-300"
              >
                <Sparkles
                  size={17}
                />

                Lihat Agenda Budaya
              </Link>

              <Link
                href="/desa-wisata/galeri"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 text-sm font-extrabold text-white backdrop-blur transition hover:bg-white/15"
              >
                <Camera
                  size={17}
                />

                Lihat Galeri
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          INTRO
      ===================================================== */}

      <section className="relative z-10 -mt-14 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] border border-emerald-100 bg-white shadow-2xl shadow-slate-900/[0.08]">
            <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
              {/* Left */}

              <div className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-700 p-7 text-white sm:p-8 lg:p-10">
                {/* Pattern */}

                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-[0.13]"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',

                    backgroundSize:
                      '24px 24px',
                  }}
                />

                <div className="relative">
                  <BookOpen
                    size={30}
                    className="text-emerald-300"
                  />

                  <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-300">
                    Warisan Desa
                  </p>

                  <h2 className="mt-3 text-2xl font-black leading-tight sm:text-3xl">
                    Budaya yang hidup
                    bersama masyarakat
                  </h2>

                  <p className="mt-5 text-sm font-medium leading-7 text-emerald-50/80">
                    Budaya Desa Keji
                    tidak hanya hadir
                    dalam bentuk
                    pertunjukan atau
                    tradisi, tetapi juga
                    melalui makanan,
                    kegiatan sosial,
                    kebersamaan, serta
                    kehidupan sehari-hari
                    masyarakat.
                  </p>
                </div>
              </div>

              {/* Right */}

              <div className="grid gap-px bg-slate-100 sm:grid-cols-3">
                {nilaiBudaya.map(
                  (
                    item
                  ) => (
                    <NilaiBudayaCard
                      key={
                        item.title
                      }
                      item={
                        item
                      }
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          BUDAYA DESA
      ===================================================== */}

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Heading */}

          <div className="max-w-4xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-700">
              Kekayaan Budaya
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Cerita, tradisi, dan
              kehidupan masyarakat
              Desa Keji
            </h2>

            <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-slate-500 sm:text-base">
              Setiap unsur budaya
              memiliki nilai dan
              cerita yang menjadi
              bagian dari identitas
              Desa Keji sekaligus
              potensi untuk
              diperkenalkan kepada
              masyarakat yang lebih
              luas.
            </p>
          </div>

          {/* Cards */}

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {budayaDesa.map(
              (
                item,
                index
              ) => (
                <BudayaCard
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
        </div>
      </section>

      {/* =====================================================
          CULTURAL EXPERIENCE
      ===================================================== */}

      <section className="overflow-hidden bg-slate-900 py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            {/* Left */}

            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-400">
                Pengalaman Budaya
              </p>

              <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight sm:text-4xl">
                Mengenal Desa Keji
                melalui kehidupan
                masyarakatnya
              </h2>

              <p className="mt-5 max-w-3xl text-sm font-medium leading-7 text-slate-300 sm:text-base">
                Pengalaman budaya
                dapat hadir melalui
                interaksi dengan
                masyarakat, mengenal
                kuliner lokal,
                menyaksikan kegiatan
                warga, serta memahami
                nilai kebersamaan yang
                tumbuh di lingkungan
                desa.
              </p>

              <Link
                href="/desa-wisata/informasi-kunjungan"
                className="mt-8 inline-flex items-center gap-2 text-sm font-extrabold text-emerald-400 transition hover:text-emerald-300"
              >
                Informasi Kunjungan

                <ArrowRight
                  size={17}
                />
              </Link>
            </div>

            {/* Right */}

            <div className="space-y-3">
              <FeatureDark
                icon={
                  UtensilsCrossed
                }
                title="Mengenal Kuliner Lokal"
                description="Kuliner menjadi salah satu cara untuk mengenal kehidupan dan identitas masyarakat Desa Keji."
              />

              <FeatureDark
                icon={
                  Sparkles
                }
                title="Menyaksikan Kesenian"
                description="Kegiatan seni memberikan kesempatan untuk mengenal ekspresi budaya masyarakat secara lebih dekat."
              />

              <FeatureDark
                icon={
                  UsersRound
                }
                title="Berinteraksi dengan Masyarakat"
                description="Kehidupan masyarakat menjadi bagian penting dari pengalaman berkunjung ke Desa Keji."
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PELESTARIAN
      ===================================================== */}

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            {/* Icon area */}

            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-100 via-emerald-50 to-white p-8 sm:p-10">
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-35"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, rgba(6,78,59,0.15) 1px, transparent 1px)',

                  backgroundSize:
                    '22px 22px',
                }}
              />

              <div className="relative flex min-h-[280px] flex-col items-center justify-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-emerald-700 text-white shadow-lg">
                  <Landmark
                    size={36}
                  />
                </div>

                <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-700">
                  Warisan Lokal
                </p>

                <h3 className="mt-2 text-2xl font-black text-emerald-950">
                  Budaya untuk
                  generasi berikutnya
                </h3>
              </div>
            </div>

            {/* Text */}

            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-700">
                Pelestarian Budaya
              </p>

              <h2 className="mt-3 text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
                Menjaga tradisi
                sambil terus
                berkembang
              </h2>

              <p className="mt-5 text-sm font-medium leading-8 text-slate-500 sm:text-base">
                Pelestarian budaya
                merupakan bagian dari
                upaya menjaga identitas
                desa. Pengenalan
                budaya kepada generasi
                muda dan pengunjung
                diharapkan dapat
                membantu menjaga
                keberlanjutan tradisi
                masyarakat Desa Keji.
              </p>

              <div className="mt-7 space-y-3">
                <ValueRow
                  title="Mengenalkan budaya kepada generasi muda"
                />

                <ValueRow
                  title="Mendukung keberlanjutan kegiatan masyarakat"
                />

                <ValueRow
                  title="Memperkenalkan identitas Desa Keji kepada pengunjung"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-950 via-emerald-800 to-teal-700 p-7 text-white shadow-2xl sm:p-9 lg:p-12">
            {/* Pattern */}

            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.13]"
              style={{
                backgroundImage:
                  'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',

                backgroundSize:
                  '26px 26px',
              }}
            />

            {/* Decoration */}

            <div className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full border-[55px] border-white/[0.04]" />

            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              {/* Text */}

              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-200">
                  Jelajahi Desa Keji
                </p>

                <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight sm:text-4xl">
                  Temukan cerita
                  budaya Desa Keji
                  secara lebih dekat
                </h2>

                <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-emerald-50/80">
                  Jelajahi dokumentasi,
                  agenda kegiatan,
                  kuliner lokal, serta
                  berbagai pengalaman
                  lain yang menjadi
                  bagian dari Desa
                  Wisata Keji.
                </p>
              </div>

              {/* Buttons */}

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link
                  href="/desa-wisata/galeri"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-extrabold text-emerald-900 transition hover:bg-emerald-50"
                >
                  <Camera
                    size={16}
                  />

                  Lihat Galeri
                </Link>

                <Link
                  href="/desa-wisata/kuliner-umkm"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 text-sm font-extrabold text-white transition hover:bg-white/15"
                >
                  <Store
                    size={16}
                  />

                  Kuliner & UMKM
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* =========================================================
   NILAI BUDAYA CARD
========================================================= */

function NilaiBudayaCard({
  item,
}: {
  item:
    NilaiBudayaItem;
}) {
  const Icon =
    item.icon;

  return (
    <article className="bg-white p-6 transition hover:bg-emerald-50 sm:p-7">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
        <Icon
          size={21}
        />
      </div>

      <h3 className="mt-5 text-lg font-black text-slate-900">
        {
          item.title
        }
      </h3>

      <p className="mt-3 text-sm font-medium leading-7 text-slate-500">
        {
          item.description
        }
      </p>
    </article>
  );
}

/* =========================================================
   BUDAYA CARD
========================================================= */

function BudayaCard({
  item,
  index,
}: {
  item:
    BudayaItem;

  index:
    number;
}) {
  const Icon =
    item.icon;

  return (
    <article className="group relative flex min-h-[295px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl">
      {/* Decoration */}

      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-emerald-100/70 transition duration-500 group-hover:scale-125" />

      {/* Header */}

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 transition duration-300 group-hover:bg-emerald-700 group-hover:text-white">
          <Icon
            size={24}
          />
        </div>

        <span className="text-xs font-black text-slate-300">
          {String(
            index +
              1
          ).padStart(
            2,
            '0'
          )}
        </span>
      </div>

      {/* Content */}

      <div className="relative mt-6 flex flex-1 flex-col">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-emerald-700">
          {
            item.category
          }
        </p>

        <h3 className="mt-2 text-xl font-black leading-7 text-slate-900">
          {
            item.title
          }
        </h3>

        <p className="mt-3 flex-1 text-sm font-medium leading-7 text-slate-500">
          {
            item.description
          }
        </p>
      </div>
    </article>
  );
}

/* =========================================================
   FEATURE DARK
========================================================= */

function FeatureDark({
  icon: Icon,
  title,
  description,
}: {
  icon:
    LucideIcon;

  title:
    string;

  description:
    string;
}) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300">
          <Icon
            size={21}
          />
        </div>

        <div>
          <h3 className="font-black text-white">
            {title}
          </h3>

          <p className="mt-2 text-xs font-medium leading-6 text-slate-300">
            {
              description
            }
          </p>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   VALUE ROW
========================================================= */

function ValueRow({
  title,
}: {
  title:
    string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-700 text-white">
        <Leaf
          size={15}
        />
      </div>

      <p className="text-sm font-extrabold leading-6 text-emerald-950">
        {title}
      </p>
    </div>
  );
}