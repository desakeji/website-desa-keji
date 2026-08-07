// app/(public)/desa-wisata/agenda/page.tsx

import type {
  Metadata,
} from 'next';

import Link from 'next/link';

import {
  ArrowRight,
  CalendarDays,
  Camera,
  Clock3,
  HeartHandshake,
  Info,
  Landmark,
  MapPin,
  Megaphone,
  Music,
  Sparkles,
  Store,
  UsersRound,
  type LucideIcon,
} from 'lucide-react';

/* =========================================================
   METADATA
========================================================= */

export const metadata:
  Metadata = {
  title:
    'Agenda Wisata Desa Keji | SIJI',

  description:
    'Temukan informasi kegiatan budaya, kesenian, Pasar Leginan, kegiatan masyarakat, dan agenda wisata Desa Keji.',
};

/* =========================================================
   TYPES
========================================================= */

interface AgendaItem {
  title: string;

  description: string;

  category: string;

  icon: LucideIcon;
}

interface InfoAgenda {
  title: string;

  description: string;

  icon: LucideIcon;
}

/* =========================================================
   DATA AGENDA
========================================================= */

const agendaDesa:
  AgendaItem[] = [
    {
      title:
        'Pasar Leginan',

      description:
        'Kegiatan yang menjadi ruang bagi masyarakat untuk memperkenalkan kuliner, produk UMKM, potensi lokal, dan berbagai aktivitas ekonomi kreatif Desa Keji.',

      category:
        'Ekonomi Kreatif',

      icon:
        Store,
    },

    {
      title:
        'Kegiatan Budaya dan Tradisi',

      description:
        'Berbagai tradisi masyarakat Desa Keji menjadi bagian dari kehidupan desa sekaligus potensi pengalaman budaya bagi pengunjung.',

      category:
        'Budaya Desa',

      icon:
        Landmark,
    },

    {
      title:
        'Pertunjukan Kesenian',

      description:
        'Kegiatan kesenian masyarakat menjadi ruang pelestarian budaya sekaligus sarana hiburan dan kebersamaan warga Desa Keji.',

      category:
        'Seni Pertunjukan',

      icon:
        Music,
    },

    {
      title:
        'Kegiatan Masyarakat',

      description:
        'Berbagai kegiatan sosial, gotong royong, pertemuan warga, dan aktivitas bersama menjadi bagian dari dinamika kehidupan masyarakat desa.',

      category:
        'Kegiatan Warga',

      icon:
        UsersRound,
    },

    {
      title:
        'Kegiatan Keagamaan',

      description:
        'Kegiatan keagamaan masyarakat merupakan bagian dari kehidupan sosial Desa Keji dan menjadi salah satu bentuk kebersamaan antarwarga.',

      category:
        'Kegiatan Sosial',

      icon:
        HeartHandshake,
    },

    {
      title:
        'Festival dan Kegiatan Khusus',

      description:
        'Kegiatan khusus, perayaan, maupun program kolaboratif dapat diselenggarakan sebagai bagian dari promosi dan pengembangan Desa Wisata Keji.',

      category:
        'Agenda Khusus',

      icon:
        Sparkles,
    },
  ];

/* =========================================================
   INFORMASI AGENDA
========================================================= */

const informasiAgenda:
  InfoAgenda[] = [
    {
      title:
        'Jadwal Kegiatan',

      description:
        'Waktu pelaksanaan setiap kegiatan dapat berubah mengikuti agenda masyarakat dan penyelenggara.',

      icon:
        CalendarDays,
    },

    {
      title:
        'Lokasi Kegiatan',

      description:
        'Kegiatan dapat berlangsung di berbagai wilayah Desa Keji sesuai dengan jenis dan penyelenggaranya.',

      icon:
        MapPin,
    },

    {
      title:
        'Informasi Terbaru',

      description:
        'Pengunjung disarankan memeriksa informasi terbaru sebelum datang agar jadwal kunjungan dapat dipersiapkan dengan baik.',

      icon:
        Megaphone,
    },
  ];

/* =========================================================
   PAGE
========================================================= */

export default function AgendaWisataPage() {
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

        <div className="relative mx-auto flex min-h-[520px] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur">
              <CalendarDays
                size={27}
              />
            </div>

            <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-300">
              Desa Wisata Keji
            </p>

            <h1 className="mt-3 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Agenda Wisata

              <span className="block text-emerald-300">
                Desa Keji
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-sm font-medium leading-8 text-emerald-50/85 sm:text-base">
              Temukan berbagai
              kegiatan budaya,
              kesenian, ekonomi
              kreatif, serta aktivitas
              masyarakat yang menjadi
              bagian dari kehidupan
              dan pengalaman Desa
              Wisata Keji.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/desa-wisata/informasi-kunjungan"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-400 px-6 text-sm font-extrabold text-emerald-950 transition hover:bg-emerald-300"
              >
                <MapPin
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
                  <Clock3
                    size={30}
                    className="text-emerald-300"
                  />

                  <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-300">
                    Agenda Desa
                  </p>

                  <h2 className="mt-3 text-2xl font-black leading-tight sm:text-3xl">
                    Setiap kegiatan
                    memiliki cerita
                    dan pengalaman
                    yang berbeda
                  </h2>

                  <p className="mt-5 text-sm font-medium leading-7 text-emerald-50/80">
                    Agenda Desa Keji
                    tidak hanya menjadi
                    kegiatan masyarakat,
                    tetapi juga ruang
                    untuk mengenal
                    budaya, kreativitas,
                    produk lokal, dan
                    kehidupan desa
                    secara lebih dekat.
                  </p>
                </div>
              </div>

              {/* Right */}

              <div className="grid gap-px bg-slate-100 sm:grid-cols-3">
                {informasiAgenda.map(
                  (
                    item
                  ) => (
                    <InfoAgendaCard
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
          AGENDA
      ===================================================== */}

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Heading */}

          <div className="max-w-4xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-700">
              Kegiatan Desa
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Beragam kegiatan
              yang dapat ditemui
              di Desa Keji
            </h2>

            <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-slate-500 sm:text-base">
              Agenda berikut
              menggambarkan berbagai
              jenis kegiatan yang
              menjadi bagian dari
              kehidupan masyarakat
              dan pengembangan Desa
              Wisata Keji.
            </p>
          </div>

          {/* Cards */}

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {agendaDesa.map(
              (
                item,
                index
              ) => (
                <AgendaCard
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
          INFORMATION
      ===================================================== */}

      <section className="bg-slate-900 py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            {/* Text */}

            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-400">
                Sebelum Berkunjung
              </p>

              <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight sm:text-4xl">
                Periksa informasi
                kegiatan sebelum
                datang ke Desa Keji
              </h2>

              <p className="mt-5 max-w-3xl text-sm font-medium leading-7 text-slate-300 sm:text-base">
                Beberapa kegiatan
                mengikuti agenda
                masyarakat dan dapat
                mengalami perubahan
                waktu maupun lokasi.
                Pengunjung disarankan
                memastikan informasi
                terbaru sebelum
                merencanakan
                kunjungan.
              </p>

              <Link
                href="/kontak"
                className="mt-8 inline-flex items-center gap-2 text-sm font-extrabold text-emerald-400 transition hover:text-emerald-300"
              >
                Hubungi Desa Keji

                <ArrowRight
                  size={17}
                />
              </Link>
            </div>

            {/* Info Box */}

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-300">
                <Info
                  size={23}
                />
              </div>

              <h3 className="mt-6 text-xl font-black">
                Informasi Agenda
              </h3>

              <p className="mt-3 text-sm font-medium leading-7 text-slate-300">
                Jadwal kegiatan yang
                lebih detail akan
                diperbarui secara
                bertahap melalui
                Sistem Informasi Desa
                Keji.
              </p>

              <div className="mt-6 space-y-3">
                <InfoDark
                  title="Waktu"
                  description="Menyesuaikan jadwal penyelenggara dan masyarakat."
                />

                <InfoDark
                  title="Lokasi"
                  description="Dapat berlangsung di berbagai wilayah Desa Keji."
                />

                <InfoDark
                  title="Partisipasi"
                  description="Menyesuaikan jenis kegiatan dan ketentuan penyelenggara."
                />
              </div>
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

            <div className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full border-[55px] border-white/[0.04]" />

            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              {/* Text */}

              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-200">
                  Jelajahi Desa Keji
                </p>

                <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight sm:text-4xl">
                  Datang dan kenali
                  kehidupan Desa Keji
                  secara lebih dekat
                </h2>

                <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-emerald-50/80">
                  Temukan pengalaman
                  budaya, kuliner,
                  kegiatan masyarakat,
                  dan berbagai potensi
                  lokal melalui agenda
                  yang berlangsung di
                  Desa Keji.
                </p>
              </div>

              {/* Buttons */}

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
   INFO AGENDA CARD
========================================================= */

function InfoAgendaCard({
  item,
}: {
  item:
    InfoAgenda;
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
   AGENDA CARD
========================================================= */

function AgendaCard({
  item,
  index,
}: {
  item:
    AgendaItem;

  index:
    number;
}) {
  const Icon =
    item.icon;

  return (
    <article className="group relative flex min-h-[290px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl">
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

        <div className="mt-6 flex items-center gap-2 border-t border-emerald-100 pt-4 text-xs font-extrabold text-emerald-700">
          <CalendarDays
            size={15}
          />

          Jadwal menyesuaikan agenda
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   INFO DARK
========================================================= */

function InfoDark({
  title,
  description,
}: {
  title: string;

  description: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.05] p-4">
      <p className="text-xs font-black text-emerald-300">
        {title}
      </p>

      <p className="mt-1 text-xs font-medium leading-5 text-slate-300">
        {description}
      </p>
    </div>
  );
}