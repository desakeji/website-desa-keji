// app/(public)/desa-wisata/destinasi/page.tsx

import type {
  Metadata,
} from 'next';

import Link from 'next/link';

import {
  ArrowRight,
  Camera,
  Compass,
  HeartHandshake,
  Landmark,
  Leaf,
  MapPin,
  Route,
  Sparkles,
  Store,
  TreePine,
  UsersRound,
  type LucideIcon,
} from 'lucide-react';

/* =========================================================
   METADATA
========================================================= */

export const metadata:
  Metadata = {
  title:
    'Destinasi dan Potensi Desa Wisata Keji | SIJI',

  description:
    'Jelajahi berbagai potensi wisata, budaya, kehidupan masyarakat, kuliner, dan daya tarik Desa Keji.',
};

/* =========================================================
   TYPES
========================================================= */

interface PotensiItem {
  title: string;

  description: string;

  icon: LucideIcon;

  label: string;
}

interface DayaTarikItem {
  title: string;

  description: string;

  icon: LucideIcon;
}

/* =========================================================
   POTENSI
========================================================= */

const potensiDesa:
  PotensiItem[] = [
    {
      title:
        'Budaya dan Tradisi',

      description:
        'Desa Keji memiliki berbagai tradisi dan kegiatan masyarakat yang masih dijaga sebagai bagian dari identitas serta kehidupan sosial desa.',

      icon:
        Landmark,

      label:
        'Warisan Lokal',
    },

    {
      title:
        'Kesenian Masyarakat',

      description:
        'Berbagai bentuk kesenian tradisional menjadi ruang kreativitas masyarakat sekaligus bagian dari upaya pelestarian budaya lokal.',

      icon:
        Sparkles,

      label:
        'Seni Desa',
    },

    {
      title:
        'Kuliner Lokal',

      description:
        'Kuliner khas dan produk olahan masyarakat memiliki potensi sebagai bagian dari pengalaman wisata sekaligus pengembangan ekonomi lokal.',

      icon:
        Store,

      label:
        'Produk Lokal',
    },

    {
      title:
        'Kehidupan Pedesaan',

      description:
        'Suasana kehidupan masyarakat, kegiatan sehari-hari, serta lingkungan desa memberikan pengalaman yang dekat dengan karakter pedesaan.',

      icon:
        TreePine,

      label:
        'Suasana Desa',
    },

    {
      title:
        'Kegiatan Masyarakat',

      description:
        'Kegiatan sosial, keagamaan, gotong royong, dan aktivitas warga menjadi bagian penting dari karakter serta kehidupan Desa Keji.',

      icon:
        UsersRound,

      label:
        'Masyarakat',
    },

    {
      title:
        'UMKM dan Ekonomi Kreatif',

      description:
        'Produk UMKM, kuliner, dan berbagai kegiatan usaha masyarakat memiliki potensi untuk berkembang sebagai pendukung aktivitas Desa Wisata Keji.',

      icon:
        HeartHandshake,

      label:
        'Ekonomi Desa',
    },
  ];

/* =========================================================
   DAYA TARIK
========================================================= */

const dayaTarik:
  DayaTarikItem[] = [
    {
      title:
        'Pengalaman Lokal',

      description:
        'Wisatawan dapat mengenal kehidupan masyarakat dan berbagai aktivitas lokal secara lebih dekat.',

      icon:
        Leaf,
    },

    {
      title:
        'Budaya yang Hidup',

      description:
        'Tradisi, kesenian, dan kegiatan masyarakat menjadi bagian dari daya tarik yang terus berkembang.',

      icon:
        Landmark,
    },

    {
      title:
        'Potensi yang Beragam',

      description:
        'Wisata, budaya, UMKM, kuliner, dan kehidupan desa dapat dikembangkan menjadi pengalaman yang saling terhubung.',

      icon:
        Compass,
    },
  ];

/* =========================================================
   PAGE
========================================================= */

export default function DestinasiWisataPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative isolate overflow-hidden bg-emerald-950 text-white">
        {/* Background */}

        <div
          className="absolute inset-0 bg-cover bg-center opacity-45"
          style={{
            backgroundImage:
              "url('/background.png')",
          }}
        />

        {/* Overlay */}

        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/90 to-emerald-900/65" />

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

        <div className="pointer-events-none absolute -right-32 -top-32 h-[440px] w-[440px] rounded-full border-[75px] border-white/[0.04]" />

        {/* Content */}

        <div className="relative mx-auto flex min-h-[560px] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur">
              <Compass
                size={27}
              />
            </div>

            <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-300">
              Desa Wisata Keji
            </p>

            <h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Destinasi dan Potensi
              <span className="block text-emerald-300">
                Desa Keji
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-sm font-medium leading-8 text-emerald-50/85 sm:text-base">
              Jelajahi berbagai potensi
              budaya, kehidupan
              masyarakat, kuliner,
              kesenian, UMKM, serta
              suasana pedesaan yang
              menjadi bagian dari
              karakter Desa Keji.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/desa-wisata/informasi-kunjungan"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-400 px-6 text-sm font-extrabold text-emerald-950 transition hover:bg-emerald-300"
              >
                <Route
                  size={17}
                />

                Informasi Kunjungan
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
                  <MapPin
                    size={30}
                    className="text-emerald-300"
                  />

                  <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-300">
                    Tentang Desa Keji
                  </p>

                  <h2 className="mt-3 text-2xl font-black leading-tight sm:text-3xl">
                    Potensi wisata yang
                    tumbuh bersama
                    masyarakat
                  </h2>

                  <p className="mt-5 text-sm font-medium leading-7 text-emerald-50/80">
                    Pengembangan Desa
                    Wisata Keji tidak
                    hanya berorientasi
                    pada lokasi wisata,
                    tetapi juga pada
                    budaya, aktivitas
                    masyarakat,
                    ekonomi lokal, dan
                    pengalaman
                    kehidupan desa.
                  </p>
                </div>
              </div>

              {/* Right */}

              <div className="grid gap-px bg-slate-100 sm:grid-cols-3">
                {dayaTarik.map(
                  (
                    item
                  ) => (
                    <DayaTarikCard
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
          POTENSI DESA
      ===================================================== */}

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Heading */}

          <div className="max-w-4xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-700">
              Jelajahi Potensi
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Beragam potensi yang
              membentuk pengalaman
              Desa Keji
            </h2>

            <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-slate-500 sm:text-base">
              Desa Keji memiliki
              berbagai potensi yang
              dapat dikembangkan
              secara berkelanjutan
              sebagai bagian dari
              pengalaman wisata
              berbasis masyarakat.
            </p>
          </div>

          {/* Cards */}

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {potensiDesa.map(
              (
                item,
                index
              ) => (
                <PotensiCard
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
          DESA BERBASIS MASYARAKAT
      ===================================================== */}

      <section className="bg-slate-900 py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            {/* Text */}

            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-400">
                Wisata Berbasis
                Masyarakat
              </p>

              <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight sm:text-4xl">
                Masyarakat menjadi
                bagian utama dalam
                pengembangan Desa
                Wisata Keji
              </h2>

              <p className="mt-5 max-w-3xl text-sm font-medium leading-7 text-slate-300 sm:text-base">
                Pengembangan potensi
                desa diarahkan agar
                dapat melibatkan
                masyarakat secara
                langsung, memperkuat
                ekonomi lokal,
                melestarikan budaya,
                serta memberikan
                pengalaman yang
                berkesan bagi
                wisatawan.
              </p>

              <Link
                href="/desa-wisata/budaya-tradisi"
                className="mt-8 inline-flex items-center gap-2 text-sm font-extrabold text-emerald-400 transition hover:text-emerald-300"
              >
                Jelajahi Budaya &
                Tradisi

                <ArrowRight
                  size={17}
                />
              </Link>
            </div>

            {/* Features */}

            <div className="space-y-3">
              <FeatureDark
                icon={
                  UsersRound
                }
                title="Melibatkan Masyarakat"
                description="Pengembangan wisata diarahkan agar dapat memberikan ruang partisipasi bagi masyarakat desa."
              />

              <FeatureDark
                icon={
                  HeartHandshake
                }
                title="Mendukung Ekonomi Lokal"
                description="Produk UMKM, kuliner, dan usaha masyarakat menjadi bagian dari pengembangan potensi desa."
              />

              <FeatureDark
                icon={
                  Leaf
                }
                title="Menjaga Identitas Desa"
                description="Budaya, tradisi, dan karakter lingkungan tetap menjadi dasar pengembangan Desa Wisata Keji."
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-950 via-emerald-800 to-teal-700 p-7 text-white shadow-2xl sm:p-9 lg:p-12">
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

            <div className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full border-[55px] border-white/[0.04]" />

            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-200">
                  Rencanakan Kunjungan
                </p>

                <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight sm:text-4xl">
                  Kenali Desa Keji
                  secara lebih dekat
                </h2>

                <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-emerald-50/80">
                  Temukan paket wisata,
                  informasi kunjungan,
                  budaya, kuliner, dan
                  berbagai pengalaman
                  yang dapat dinikmati
                  ketika berkunjung ke
                  Desa Keji.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link
                  href="/desa-wisata/paket-wisata"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-extrabold text-emerald-900 transition hover:bg-emerald-50"
                >
                  Lihat Paket Wisata

                  <ArrowRight
                    size={16}
                  />
                </Link>

                <Link
                  href="/desa-wisata/informasi-kunjungan"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 text-sm font-extrabold text-white transition hover:bg-white/15"
                >
                  <MapPin
                    size={16}
                  />

                  Informasi Kunjungan
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
   DAYA TARIK CARD
========================================================= */

function DayaTarikCard({
  item,
}: {
  item:
    DayaTarikItem;
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
   POTENSI CARD
========================================================= */

function PotensiCard({
  item,
  index,
}: {
  item:
    PotensiItem;

  index:
    number;
}) {
  const Icon =
    item.icon;

  return (
    <article className="group relative flex min-h-[280px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl">
      {/* Decoration */}

      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-emerald-100/70 transition duration-500 group-hover:scale-125" />

      {/* Header */}

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 transition group-hover:bg-emerald-700 group-hover:text-white">
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
            item.label
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