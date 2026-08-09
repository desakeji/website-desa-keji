// app/(public)/peta/page.tsx

import {
  Download,
  ExternalLink,
  Info,
  Map,
  MapPin,
  Mountain,
  ZoomIn,
} from 'lucide-react';

import {
  PETA_DESA_DEFAULTS,
} from '@/lib/peta-defaults';

import {
  supabaseAdmin,
} from '@/lib/supabase-admin';

import type {
  PetaDesaData,
} from '@/types/peta';

export const dynamic =
  'force-dynamic';

export const revalidate =
  0;

const PETA_KEY =
  'utama';

const PETA_TOPOGRAFI =
  '/Peta%20Topografi%20Desa%20Keji.png';

/* =========================================================
   PAGE
========================================================= */

export default async function PetaDesaPage() {
  const {
    data,
    error,
  } =
    await supabaseAdmin
      .from(
        'peta_desa'
      )
      .select(`
        peta_key,
        label_seksi,
        judul_halaman,
        deskripsi,
        tombol_label,
        maps_link_url,
        maps_embed_url,
        iframe_title,
        tinggi_peta,
        updated_at
      `)
      .eq(
        'peta_key',
        PETA_KEY
      )
      .maybeSingle();

  if (error) {
    console.error(
      'Gagal mengambil peta desa:',
      {
        message:
          error.message,

        code:
          error.code,

        details:
          error.details,

        hint:
          error.hint,
      }
    );
  }

  const peta:
    PetaDesaData = {
    ...PETA_DESA_DEFAULTS,
    ...(data ?? {}),
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ===================================================
            HEADER
        =================================================== */}

        <header className="mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-emerald-700 sm:text-xs">
            <Map
              size={15}
            />

            {peta.label_seksi}
          </div>

          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
            {peta.judul_halaman}
          </h1>

          <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-slate-500 md:text-base">
            {peta.deskripsi}
            {' '}
            Halaman ini juga
            menyediakan peta
            topografi untuk melihat
            gambaran variasi
            ketinggian wilayah Desa
            Keji.
          </p>

          {/* TAB INFO */}

          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href="#peta-interaktif"
              className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-emerald-700 px-4 text-xs font-extrabold text-white transition hover:bg-emerald-800"
            >
              <MapPin
                size={15}
              />

              Peta Wilayah
            </a>

            <a
              href="#peta-topografi"
              className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 text-xs font-extrabold text-emerald-700 transition hover:bg-emerald-50"
            >
              <Mountain
                size={15}
              />

              Peta Topografi
            </a>
          </div>
        </header>

        {/* ===================================================
            SECTION 01
            PETA BIASA / GOOGLE MAPS
        =================================================== */}

        <section
          id="peta-interaktif"
          className="scroll-mt-28 overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.08)]"
        >
          {/* HEADER */}

          <div className="flex flex-col gap-5 border-b border-emerald-50 bg-gradient-to-r from-emerald-50/80 to-white p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-lg shadow-emerald-900/20">
                <MapPin
                  size={27}
                  strokeWidth={2.4}
                />
              </div>

              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-emerald-700">
                  Peta Wilayah
                </p>

                <h2 className="mt-1 text-xl font-black text-slate-900 md:text-2xl">
                  Peta Interaktif Desa
                  Keji
                </h2>

                <p className="mt-2 max-w-xl text-sm font-medium leading-6 text-slate-500">
                  Jelajahi lokasi Desa
                  Keji dan wilayah di
                  sekitarnya melalui
                  Google Maps.
                </p>
              </div>
            </div>

            <a
              href={
                peta.maps_link_url
              }
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 text-sm font-extrabold text-white shadow-lg shadow-emerald-900/15 transition hover:-translate-y-0.5 hover:bg-emerald-800"
            >
              {peta.tombol_label}

              <ExternalLink
                size={16}
              />
            </a>
          </div>

          {/* MAP */}

          <div className="p-4 sm:p-6 md:p-8">
            <div
              className="relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 shadow-inner"
              style={{
                height:
                  `${peta.tinggi_peta}px`,
              }}
            >
              <iframe
                src={
                  peta.maps_embed_url
                }
                className="absolute inset-0 h-full w-full"
                style={{
                  border:
                    0,
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={
                  peta.iframe_title
                }
              />
            </div>

            {/* INFO */}

            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4">
              <Info
                size={18}
                className="mt-0.5 shrink-0 text-blue-600"
              />

              <p className="text-xs font-semibold leading-6 text-blue-800 sm:text-sm">
                Gunakan peta
                interaktif untuk
                melihat lokasi,
                akses jalan, dan
                wilayah sekitar Desa
                Keji secara langsung.
              </p>
            </div>
          </div>
        </section>

        {/* ===================================================
            PEMISAH
        =================================================== */}

        <div className="my-8 flex items-center gap-4 sm:my-10">
          <div className="h-px flex-1 bg-slate-200" />

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-emerald-200 bg-white text-emerald-700">
            <Mountain
              size={18}
            />
          </div>

          <div className="h-px flex-1 bg-slate-200" />
        </div>

        {/* ===================================================
            SECTION 02
            PETA TOPOGRAFI
        =================================================== */}

        <section
          id="peta-topografi"
          className="scroll-mt-28 overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.08)]"
        >
          {/* HEADER */}

          <div className="relative overflow-hidden border-b border-emerald-100 bg-gradient-to-br from-emerald-950 via-emerald-800 to-teal-700 p-6 text-white md:p-8">
            {/* PATTERN */}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  'radial-gradient(circle, rgba(255,255,255,.55) 1px, transparent 1px)',

                backgroundSize:
                  '24px 24px',
              }}
            />

            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border-[52px] border-white/[0.04]" />

            <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white backdrop-blur">
                  <Mountain
                    size={27}
                  />
                </div>

                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-emerald-200">
                    Peta Topografi
                  </p>

                  <h2 className="mt-1 text-xl font-black md:text-2xl">
                    Topografi Desa Keji
                  </h2>

                  <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-emerald-50/80">
                    Peta topografi
                    memberikan
                    informasi
                    mengenai variasi
                    ketinggian wilayah
                    Desa Keji,
                    Kecamatan Ungaran
                    Barat, Kabupaten
                    Semarang.
                  </p>
                </div>
              </div>

              {/* BUTTON */}

              <div className="flex flex-col gap-2 sm:flex-row">
                <a
                  href={
                    PETA_TOPOGRAFI
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white px-5 text-xs font-extrabold text-emerald-900 transition hover:bg-emerald-50"
                >
                  <ZoomIn
                    size={16}
                  />

                  Lihat Ukuran Penuh
                </a>

                <a
                  href={
                    PETA_TOPOGRAFI
                  }
                  download="Peta Topografi Desa Keji.png"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 text-xs font-extrabold text-white transition hover:bg-white/15"
                >
                  <Download
                    size={16}
                  />

                  Unduh Peta
                </a>
              </div>
            </div>
          </div>

          {/* =================================================
              IMAGE
          ================================================= */}

          <div className="p-4 sm:p-6 md:p-8">
            <a
              href={
                PETA_TOPOGRAFI
              }
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
              aria-label="Buka Peta Topografi Desa Keji dalam ukuran penuh"
            >
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-inner">
                <img
                  src={
                    PETA_TOPOGRAFI
                  }
                  alt="Peta Topografi Desa Keji Kecamatan Ungaran Barat Kabupaten Semarang"
                  loading="lazy"
                  className="h-auto w-full object-contain transition duration-500 group-hover:scale-[1.01]"
                />

                {/* HOVER */}

                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition duration-300 group-hover:bg-black/10 group-hover:opacity-100">
                  <div className="flex items-center gap-2 rounded-xl bg-slate-950/80 px-4 py-3 text-xs font-extrabold text-white shadow-xl backdrop-blur">
                    <ZoomIn
                      size={16}
                    />

                    Buka Ukuran Penuh
                  </div>
                </div>
              </div>
            </a>

            {/* =================================================
                KETERANGAN
            ================================================= */}

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <InfoTopografi
                label="Wilayah"
                value="Desa Keji"
              />

              <InfoTopografi
                label="Kecamatan"
                value="Ungaran Barat"
              />

              <InfoTopografi
                label="Skala Peta"
                value="1 : 14.000"
              />
            </div>

            {/* DESCRIPTION */}

            <div className="mt-5 rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-white p-5">
              <div className="flex items-start gap-3">
                <Mountain
                  size={20}
                  className="mt-0.5 shrink-0 text-emerald-700"
                />

                <div>
                  <h3 className="text-sm font-black text-slate-900">
                    Informasi
                    Topografi
                  </h3>

                  <p className="mt-2 text-sm font-medium leading-7 text-slate-600">
                    Peta ini
                    menggambarkan
                    variasi elevasi
                    wilayah Desa Keji
                    melalui gradasi
                    warna. Informasi
                    topografi dapat
                    digunakan untuk
                    memberikan
                    gambaran kondisi
                    ketinggian dan
                    karakter wilayah
                    desa.
                  </p>
                </div>
              </div>
            </div>

            {/* SOURCE */}

            <div className="mt-4 flex flex-col gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold leading-5 text-slate-500 sm:flex-row sm:items-center sm:justify-between">
              <span>
                Peta Topografi Desa
                Keji
              </span>

              <span>
                KKN Tematik 123
                Universitas
                Diponegoro · 2026
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

/* =========================================================
   INFO TOPOGRAFI
========================================================= */

function InfoTopografi({
  label,
  value,
}: {
  label:
    string;

  value:
    string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-[10px] font-extrabold uppercase tracking-[0.13em] text-slate-400">
        {label}
      </p>

      <p className="mt-1.5 text-sm font-black text-slate-800">
        {value}
      </p>
    </div>
  );
}