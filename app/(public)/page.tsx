// app/(public)/page.tsx

'use client';

import Link from 'next/link';

import {
  TypeAnimation,
} from 'react-type-animation';

import {
  Archive,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  Calendar,
  Clock,
  ExternalLink,
  Hammer,
  Image as ImageIcon,
  Info,
  Map,
  MapPin,
  Megaphone,
  Moon,
  Navigation,
  PieChart,
  Quote,
  Scale,
  ShoppingCart,
  Sun,
  Sunrise,
  Sunset,
} from 'lucide-react';

import BeritaTerbaru from '@/components/public/BeritaTerbaru';
import StatistikPenduduk from '@/components/public/StatistikPenduduk';
import WaktuRealtime from '@/components/public/WaktuRealtime';

import {
  useBerandaPublic,
} from '@/hooks/useBerandaPublic';

export default function HomePage() {
  const {
    data: beranda,
  } = useBerandaPublic();

  const quickLinks = [
    {
      name: 'Peta Desa',
      icon: Map,
      href: '/peta',
    },
    {
      name: 'Produk Hukum',
      icon: Scale,
      href:
        '/informasi-publik/produk-hukum',
    },
    {
      name: 'Informasi Publik',
      icon: Info,
      href:
        '/informasi-publik',
    },
    {
      name: 'Lapak UMKM',
      icon: ShoppingCart,
      href: '/umkm',
    },
    {
      name: 'Arsip Berita',
      icon: Archive,
      href: '/berita',
    },
    {
      name: 'Album Galeri',
      icon: ImageIcon,
      href:
        '/data-desa/galeri',
    },
    {
      name: 'Pengaduan',
      icon: Megaphone,
      href: '/pengaduan',
    },
    {
      name: 'Pembangunan',
      icon: Hammer,
      href: '/pembangunan',
    },
    {
      name: 'Status IDM',
      icon: PieChart,
      href: '/idm',
    },
  ];

  const jadwalSholat = [
    {
      name: 'Subuh',
      time:
        beranda.sholat_subuh,
      icon: Moon,
    },
    {
      name: 'Dzuhur',
      time:
        beranda.sholat_dzuhur,
      icon: Sun,
    },
    {
      name: 'Ashar',
      time:
        beranda.sholat_ashar,
      icon: Sunrise,
    },
    {
      name: 'Maghrib',
      time:
        beranda.sholat_maghrib,
      icon: Sunset,
    },
    {
      name: 'Isya',
      time:
        beranda.sholat_isya,
      icon: Moon,
    },
  ];

  const informasiBerjalan = [
    beranda.informasi_1,
    beranda.informasi_2,
    beranda.informasi_3,
    beranda.informasi_4,
  ].filter(
    (value) =>
      value.trim().length > 0
  );

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 pb-12">
      {/* Hero */}
      <section
        className="
          relative
          flex
          min-h-[calc(100svh-108px)]
          flex-col
          items-center
          justify-center
          overflow-hidden
          bg-cover
          bg-center
          bg-no-repeat
          bg-scroll
          pb-28
          pt-20
          md:bg-fixed
        "
        style={{
          backgroundImage:
            `url("${beranda.background_url}")`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-emerald-950/75" />

        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-emerald-400/10 blur-[100px]" />

        <WaktuRealtime />

        <div className="relative z-10 w-full max-w-4xl px-4 text-center">
          <div className="mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-2xl border border-white/20 bg-white/10 p-3 shadow-2xl backdrop-blur-md">
            <img
              src={
                beranda.logo_url
              }
              alt="Logo Desa Keji"
              className="h-full w-full object-contain drop-shadow-lg"
            />
          </div>

          <div className="mb-3 flex min-h-[90px] items-center justify-center md:min-h-[70px]">
            <TypeAnimation
              sequence={[
                beranda.hero_teks_1,
                2000,
                beranda.hero_teks_2,
                2000,
                beranda.hero_teks_3,
                2000,
              ]}
              wrapper="h1"
              speed={50}
              deletionSpeed={50}
              className="text-3xl font-black leading-tight tracking-tight text-white drop-shadow-xl sm:text-4xl md:text-5xl lg:text-6xl"
              repeat={Infinity}
            />
          </div>

          <p className="mb-9 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-50/90 drop-shadow-md sm:text-base md:text-lg">
            {beranda.hero_lokasi}
          </p>

          <div className="mx-auto flex w-full max-w-2xl items-center rounded-2xl border border-white/20 bg-white/95 p-1.5 shadow-2xl shadow-black/20 backdrop-blur-xl transition duration-300 focus-within:ring-4 focus-within:ring-emerald-300/25">
            <input
              type="search"
              placeholder={
                beranda.hero_placeholder
              }
              className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400 sm:px-5"
            />

            <button
              type="button"
              className="shrink-0 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-extrabold text-white shadow-md transition hover:bg-emerald-800 sm:px-8"
            >
              Cari
            </button>
          </div>
        </div>

        <div className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/70 sm:flex">
          <span className="text-[9px] font-bold uppercase tracking-[0.25em]">
            Jelajahi
          </span>

          <div className="flex h-8 w-5 justify-center rounded-full border border-white/40 pt-1.5">
            <span className="h-1.5 w-1 animate-bounce rounded-full bg-white/80" />
          </div>
        </div>
      </section>

      {/* Menu pintasan */}
      <section className="relative z-30 mx-auto -mt-16 w-full max-w-[95rem] px-4 sm:px-6 lg:px-8">
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .hide-scroll-bar {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }

              .hide-scroll-bar::-webkit-scrollbar {
                display: none;
              }
            `,
          }}
        />

        <div className="hide-scroll-bar flex snap-x gap-4 overflow-x-auto pb-8 pt-2 xl:justify-center">
          {quickLinks.map(
            (link) => {
              const Icon =
                link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex h-32 w-32 shrink-0 snap-start flex-col items-center justify-center gap-3 rounded-2xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-emerald-200/50"
                >
                  <div className="rounded-full bg-emerald-50 p-3 transition-colors group-hover:bg-emerald-100">
                    <Icon
                      size={28}
                      className="text-emerald-600"
                    />
                  </div>

                  <span className="px-2 text-center text-xs font-bold text-gray-700 group-hover:text-emerald-700">
                    {link.name}
                  </span>
                </Link>
              );
            }
          )}
        </div>
      </section>

      {/* Sambutan dan statistik */}
      <section className="mx-auto mt-3 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-12">
          <article className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#064e3b] via-[#047857] to-[#065f46] shadow-[0_24px_60px_rgba(6,78,59,0.18)] lg:col-span-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.13]"
              style={{
                backgroundImage: `
                  radial-gradient(
                    ellipse 18px 28px at 50% 0%,
                    transparent 0 13px,
                    rgba(255,255,255,0.7) 14px 15px,
                    transparent 16px
                  ),
                  radial-gradient(
                    ellipse 18px 28px at 50% 100%,
                    transparent 0 13px,
                    rgba(255,255,255,0.7) 14px 15px,
                    transparent 16px
                  ),
                  radial-gradient(
                    ellipse 28px 18px at 0% 50%,
                    transparent 0 13px,
                    rgba(255,255,255,0.7) 14px 15px,
                    transparent 16px
                  ),
                  radial-gradient(
                    ellipse 28px 18px at 100% 50%,
                    transparent 0 13px,
                    rgba(255,255,255,0.7) 14px 15px,
                    transparent 16px
                  )
                `,
                backgroundSize:
                  '62px 62px',
              }}
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border-[48px] border-white/[0.05]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-emerald-300/10 blur-3xl"
            />

            <div className="relative grid min-h-full gap-8 p-6 sm:p-8 md:grid-cols-[180px_minmax(0,1fr)] lg:p-10">
              <div className="mx-auto w-full max-w-[180px] md:mx-0">
                <div className="relative overflow-hidden rounded-[24px] border border-white/20 bg-white/10 p-2 shadow-2xl backdrop-blur-md">
                  <div className="aspect-[4/5] overflow-hidden rounded-[18px] bg-emerald-950">
                    <img
                      src={
                        beranda.foto_kepala_desa_url
                      }
                      alt={`${beranda.nama_kepala_desa}, ${beranda.jabatan_kepala_desa}`}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>

                  <div className="absolute inset-x-4 bottom-4 rounded-xl border border-white/20 bg-emerald-950/75 px-3 py-2 text-center backdrop-blur-md">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-white">
                      {
                        beranda.nama_kepala_desa
                      }
                    </p>

                    <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-200">
                      {
                        beranda.jabatan_kepala_desa
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.15em] text-emerald-50 backdrop-blur-md">
                    <Building2
                      size={14}
                    />

                    Sambutan Kepala Desa
                  </span>

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/20 bg-emerald-300/10 px-3 py-1.5 text-[11px] font-bold text-emerald-100">
                    <BadgeCheck
                      size={14}
                    />

                    Pemerintah Desa Keji
                  </span>
                </div>

                <Quote
                  size={42}
                  strokeWidth={1.6}
                  className="mb-4 text-emerald-200/70"
                />

                <blockquote className="max-w-2xl whitespace-pre-line text-base font-medium leading-8 text-white/90 sm:text-lg">
                  {
                    beranda.sambutan_kepala_desa
                  }
                </blockquote>

                <div className="mt-7 flex items-center gap-4 border-t border-white/10 pt-5">
                  <div className="h-px w-10 bg-emerald-300" />

                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.16em] text-white">
                      {
                        beranda.nama_kepala_desa
                      }
                    </p>

                    <p className="mt-1 text-xs font-medium text-emerald-200">
                      {
                        beranda.jabatan_kepala_desa
                      }
                      , Ungaran Barat
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <StatistikPenduduk />
        </div>
      </section>

      {/* Informasi berjalan */}
      <section className="mx-auto mt-7 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <style>{`
          @keyframes public-info-marquee {
            from {
              transform: translateX(0);
            }

            to {
              transform: translateX(-50%);
            }
          }

          .public-info-marquee-track {
            width: max-content;
            animation:
              public-info-marquee
              34s linear infinite;
          }

          .public-info-marquee-wrapper:hover
          .public-info-marquee-track {
            animation-play-state:
              paused;
          }

          @media (
            prefers-reduced-motion:
            reduce
          ) {
            .public-info-marquee-track {
              animation: none;
            }
          }
        `}</style>

        <div className="relative flex min-h-[58px] items-stretch overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
          <div className="relative z-20 flex shrink-0 items-center gap-3 bg-gradient-to-r from-emerald-800 to-emerald-700 px-5 text-white sm:px-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/15 bg-white/10">
              <Megaphone
                size={16}
              />
            </div>

            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-200">
                Informasi
              </p>

              <p className="text-xs font-black uppercase tracking-[0.12em]">
                Sekilas Desa
              </p>
            </div>
          </div>

          <div className="public-info-marquee-wrapper relative flex min-w-0 flex-1 items-center overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent" />

            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent" />

            <div className="public-info-marquee-track flex items-center">
              {[false, true].map(
                (duplicate) => (
                  <div
                    key={
                      duplicate
                        ? 'duplicate'
                        : 'primary'
                    }
                    aria-hidden={
                      duplicate
                    }
                    className="flex shrink-0 items-center gap-6 px-8"
                  >
                    {informasiBerjalan.map(
                      (
                        informasi,
                        index
                      ) => (
                        <div
                          key={`${duplicate}-${index}-${informasi}`}
                          className="contents"
                        >
                          <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-slate-600">
                            {
                              informasi
                            }
                          </span>

                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        </div>
                      )
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Informasi harian */}
      <section className="mx-auto mt-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-emerald-600">
              Informasi Harian
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900 md:text-3xl">
              Akses Informasi Desa
            </h2>

            <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-slate-500">
              Informasi lokasi kantor, waktu
              ibadah, dan jadwal pelayanan
              Pemerintah Desa Keji.
            </p>
          </div>

          <Link
            href="/layanan"
            className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.12em] text-emerald-700 hover:text-emerald-900"
          >
            Lihat layanan desa

            <ArrowUpRight
              size={15}
            />
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <article className="group relative min-h-[560px] overflow-hidden rounded-[28px] border border-emerald-100 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.08)] lg:col-span-7">
            <div className="absolute inset-0">
              <iframe
                src={
                  beranda.maps_embed_url
                }
                title="Lokasi Kantor Desa Keji"
                className="h-full w-full grayscale-[15%] transition duration-500 group-hover:grayscale-0"
                style={{
                  border: 0,
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>

            <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-emerald-950/80 via-emerald-950/30 to-transparent" />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-emerald-950 via-emerald-950/80 to-transparent" />

            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />

            <div className="pointer-events-none absolute left-6 top-6 rounded-2xl border border-white/15 bg-emerald-950/70 p-3 text-white shadow-xl backdrop-blur-md">
              <MapPin size={22} />
            </div>

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <div className="max-w-xl">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-emerald-300">
                  Kantor Pemerintah Desa
                </p>

                <h3 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                  Kantor Desa Keji
                </h3>

                <p className="mt-3 max-w-lg whitespace-pre-line text-sm font-medium leading-6 text-emerald-50/80">
                  {
                    beranda.alamat_kantor
                  }
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={
                      beranda.maps_link_url
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-emerald-800 shadow-lg transition hover:-translate-y-0.5 hover:bg-emerald-50"
                  >
                    <Navigation
                      size={17}
                    />

                    Buka Google Maps

                    <ExternalLink
                      size={14}
                    />
                  </a>

                  <Link
                    href="/peta"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-extrabold text-white backdrop-blur-md transition hover:bg-white/20"
                  >
                    <Map size={17} />

                    Peta Desa
                  </Link>
                </div>
              </div>
            </div>
          </article>

          <div className="grid gap-6 lg:col-span-5">
            {/* Jadwal salat */}
            <article className="overflow-hidden rounded-[28px] border border-emerald-100 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.07)]">
              <div className="flex items-start justify-between gap-4 border-b border-emerald-50 p-6">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-emerald-600">
                    Waktu Setempat
                  </p>

                  <h3 className="mt-1.5 text-xl font-black text-slate-900">
                    Jadwal Salat
                  </h3>

                  <p className="mt-1 text-xs font-medium text-slate-400">
                    Kabupaten Semarang
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-lg shadow-emerald-900/20">
                  <Clock size={20} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 p-5 sm:grid-cols-5 lg:grid-cols-2 xl:grid-cols-5">
                {jadwalSholat.map(
                  (item) => {
                    const PrayerIcon =
                      item.icon;

                    return (
                      <div
                        key={
                          item.name
                        }
                        className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-3 text-center transition hover:-translate-y-0.5 hover:bg-emerald-50"
                      >
                        <PrayerIcon
                          size={17}
                          className="mx-auto text-emerald-600"
                        />

                        <p className="mt-2 text-[9px] font-extrabold uppercase tracking-[0.13em] text-slate-500">
                          {
                            item.name
                          }
                        </p>

                        <p className="mt-1 text-sm font-black text-slate-900">
                          {
                            item.time
                          }
                        </p>
                      </div>
                    );
                  }
                )}
              </div>
            </article>

            {/* Jam pelayanan */}
            <article className="overflow-hidden rounded-[28px] border border-emerald-100 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.07)]">
              <div className="flex items-start justify-between gap-4 border-b border-emerald-50 p-6">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-emerald-600">
                    Pelayanan Publik
                  </p>

                  <h3 className="mt-1.5 text-xl font-black text-slate-900">
                    Jam Kerja Kantor
                  </h3>

                  <p className="mt-1 text-xs font-medium text-slate-400">
                    Pemerintah Desa Keji
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-lg shadow-emerald-900/20">
                  <Calendar
                    size={20}
                  />
                </div>
              </div>

              <div className="space-y-3 p-5">
                <div className="flex items-center justify-between gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4">
                  <div>
                    <p className="text-sm font-extrabold text-slate-800">
                      Senin – Kamis
                    </p>

                    <p className="mt-1 text-xs font-medium text-slate-400">
                      Pelayanan administrasi
                    </p>
                  </div>

                  <span className="shrink-0 rounded-xl bg-white px-3 py-2 text-xs font-black text-emerald-700 shadow-sm">
                    {
                      beranda.jam_senin_kamis
                    }
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4">
                  <div>
                    <p className="text-sm font-extrabold text-slate-800">
                      Jumat
                    </p>

                    <p className="mt-1 text-xs font-medium text-slate-400">
                      Pelayanan administrasi
                    </p>
                  </div>

                  <span className="shrink-0 rounded-xl bg-white px-3 py-2 text-xs font-black text-emerald-700 shadow-sm">
                    {
                      beranda.jam_jumat
                    }
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <div>
                    <p className="text-sm font-extrabold text-slate-700">
                      Sabtu – Minggu
                    </p>

                    <p className="mt-1 text-xs font-medium text-slate-400">
                      Kantor tidak beroperasi
                    </p>
                  </div>

                  <span className="shrink-0 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-black uppercase tracking-wider text-slate-500">
                    {
                      beranda.jam_akhir_pekan
                    }
                  </span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <BeritaTerbaru />
    </div>
  );
}