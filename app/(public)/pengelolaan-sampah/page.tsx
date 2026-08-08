// app/(public)/pengelolaan-sampah/page.tsx

import type {
  CSSProperties,
} from 'react';

import type {
  Metadata,
} from 'next';

import Link from 'next/link';

import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Info,
  Leaf,
  MapPinned,
  MapPin,
  Navigation,
  PackageOpen,
  Recycle,
  ShieldCheck,
  Trash2,
  TreePine,
  UsersRound,
  type LucideIcon,
} from 'lucide-react';

import {
  supabaseAdmin,
} from '@/lib/supabase-admin';

/* =========================================================
   METADATA
========================================================= */

export const metadata:
  Metadata = {
  title:
    'Pengelolaan Sampah Desa Keji | SIJI',

  description:
    'Informasi persebaran TPS, pengepul, serta pengelolaan sampah di Desa Keji.',
};

export const dynamic =
  'force-dynamic';

export const revalidate =
  0;

/* =========================================================
   CONFIG
========================================================= */

const MAP_IMAGE =
  '/Peta%20Persebaran%20TPS%20dan%20Pengepul%20Desa%20Keji.jpeg';

/* =========================================================
   TYPES
========================================================= */

type LokasiKode =
  | 'pengepul-keji'
  | 'pengepul-suruhan-1'
  | 'pengepul-suruhan-2'
  | 'tps-keji'
  | 'tps-suruhan';

type JenisLokasi =
  | 'TPS'
  | 'Pengepul';

interface LokasiSampah {
  id:
    | string
    | null;

  kode:
    LokasiKode;

  nama:
    string;

  jenis:
    JenisLokasi;

  mapsUrl:
    | string
    | null;

  keterangan:
    | string
    | null;

  aktif:
    boolean;

  urutan:
    number;
}

interface ProgramItem {
  title:
    string;

  description:
    string;

  icon:
    LucideIcon;
}

interface MapArea {
  kode:
    LokasiKode;

  style:
    CSSProperties;
}

/* =========================================================
   KODE YANG VALID
========================================================= */

const LOKASI_CODES:
  LokasiKode[] = [
    'pengepul-keji',
    'pengepul-suruhan-1',
    'pengepul-suruhan-2',
    'tps-keji',
    'tps-suruhan',
  ];

/* =========================================================
   FALLBACK

   Dipakai jika data DB belum tersedia.
   Link Google Maps tetap null.
========================================================= */

const FALLBACK_LOCATIONS:
  LokasiSampah[] = [
    {
      id:
        null,

      kode:
        'pengepul-keji',

      nama:
        'Pengepul Keji',

      jenis:
        'Pengepul',

      mapsUrl:
        null,

      keterangan:
        'Lokasi pengepul yang berada di wilayah Keji.',

      aktif:
        true,

      urutan:
        1,
    },

    {
      id:
        null,

      kode:
        'pengepul-suruhan-1',

      nama:
        'Pengepul Suruhan 1',

      jenis:
        'Pengepul',

      mapsUrl:
        null,

      keterangan:
        'Lokasi pengepul pertama yang berada di wilayah Dusun Suruhan.',

      aktif:
        true,

      urutan:
        2,
    },

    {
      id:
        null,

      kode:
        'pengepul-suruhan-2',

      nama:
        'Pengepul Suruhan 2',

      jenis:
        'Pengepul',

      mapsUrl:
        null,

      keterangan:
        'Lokasi pengepul kedua yang berada di wilayah Dusun Suruhan.',

      aktif:
        true,

      urutan:
        3,
    },

    {
      id:
        null,

      kode:
        'tps-keji',

      nama:
        'TPS Keji',

      jenis:
        'TPS',

      mapsUrl:
        null,

      keterangan:
        'Tempat Penampungan Sementara yang berada di wilayah Keji.',

      aktif:
        true,

      urutan:
        4,
    },

    {
      id:
        null,

      kode:
        'tps-suruhan',

      nama:
        'TPS Suruhan',

      jenis:
        'TPS',

      mapsUrl:
        null,

      keterangan:
        'Tempat Penampungan Sementara yang berada di wilayah Dusun Suruhan.',

      aktif:
        true,

      urutan:
        5,
    },
  ];

/* =========================================================
   AREA FOTO PADA PETA

   Persentase dihitung berdasarkan posisi 5 foto
   pada file peta final.

   Karena memakai persen, posisi akan mengikuti ukuran
   gambar secara responsif.
========================================================= */

const MAP_AREAS:
  MapArea[] = [
    {
      kode:
        'pengepul-suruhan-1',

      style: {
        left:
          '4.5%',

        top:
          '22.2%',

        width:
          '16.3%',

        height:
          '17.3%',
      },
    },

    {
      kode:
        'pengepul-keji',

      style: {
        left:
          '22.4%',

        top:
          '11.3%',

        width:
          '15.4%',

        height:
          '15.7%',
      },
    },

    {
      kode:
        'tps-keji',

      style: {
        left:
          '49.4%',

        top:
          '8.9%',

        width:
          '12.9%',

        height:
          '14.8%',
      },
    },

    {
      kode:
        'tps-suruhan',

      style: {
        left:
          '48%',

        top:
          '45.2%',

        width:
          '12.4%',

        height:
          '15.8%',
      },
    },

    {
      kode:
        'pengepul-suruhan-2',

      style: {
        left:
          '36.9%',

        top:
          '72.6%',

        width:
          '15.6%',

        height:
          '17.9%',
      },
    },
  ];

/* =========================================================
   CONTENT
========================================================= */

const pengelolaanSampah:
  ProgramItem[] = [
    {
      title:
        'Pemilahan Sampah',

      description:
        'Pemilahan sampah berdasarkan jenisnya membantu proses pengumpulan dan pengelolaan sampah menjadi lebih terarah.',

      icon:
        Recycle,
    },

    {
      title:
        'Pengurangan Sampah',

      description:
        'Pengurangan penggunaan barang sekali pakai dapat membantu mengurangi timbulan sampah dari sumbernya.',

      icon:
        PackageOpen,
    },

    {
      title:
        'Kebersihan Lingkungan',

      description:
        'Pengelolaan sampah yang baik turut mendukung terciptanya lingkungan permukiman dan fasilitas umum yang lebih bersih.',

      icon:
        TreePine,
    },

    {
      title:
        'Partisipasi Masyarakat',

      description:
        'Peran masyarakat menjadi bagian penting dalam menjaga kebersihan dan keberlanjutan pengelolaan lingkungan desa.',

      icon:
        UsersRound,
    },
  ];

/* =========================================================
   HELPERS
========================================================= */

function safeString(
  value: unknown
) {
  return String(
    value ??
      ''
  ).trim();
}

function nullableString(
  value: unknown
) {
  const valueString =
    safeString(
      value
    );

  return (
    valueString ||
    null
  );
}

function isLokasiKode(
  value: string
): value is LokasiKode {
  return (
    LOKASI_CODES as readonly string[]
  ).includes(
    value
  );
}

function isJenisLokasi(
  value: string
): value is JenisLokasi {
  return (
    value ===
      'TPS' ||
    value ===
      'Pengepul'
  );
}

function normalizeLokasi(
  value: unknown
): LokasiSampah | null {
  if (
    !value ||
    typeof value !==
      'object' ||
    Array.isArray(
      value
    )
  ) {
    return null;
  }

  const row =
    value as Record<
      string,
      unknown
    >;

  const id =
    safeString(
      row.id
    );

  const kode =
    safeString(
      row.kode
    );

  const nama =
    safeString(
      row.nama
    );

  const jenis =
    safeString(
      row.jenis
    );

  const urutan =
    Number(
      row.urutan ??
        0
    );

  if (
    !id ||
    !isLokasiKode(
      kode
    ) ||
    !nama ||
    !isJenisLokasi(
      jenis
    )
  ) {
    return null;
  }

  return {
    id,

    kode,

    nama,

    jenis,

    mapsUrl:
      nullableString(
        row.maps_url
      ),

    keterangan:
      nullableString(
        row.keterangan
      ),

    aktif:
      Boolean(
        row.aktif
      ),

    urutan:
      Number.isFinite(
        urutan
      )
        ? urutan
        : 0,
  };
}

function mergeWithFallback(
  databaseItems:
    LokasiSampah[]
) {
  const databaseMap =
    new Map(
      databaseItems.map(
        (item) => [
          item.kode,
          item,
        ]
      )
    );

  return FALLBACK_LOCATIONS.map(
    (fallback) =>
      databaseMap.get(
        fallback.kode
      ) ??
      fallback
  ).sort(
    (
      first,
      second
    ) =>
      first.urutan -
      second.urutan
  );
}

/* =========================================================
   PAGE
========================================================= */

export default async function PengelolaanSampahPage() {
  const {
    data,
    error,
  } =
    await supabaseAdmin
      .from(
        'pengelolaan_sampah_lokasi'
      )
      .select(`
        id,
        kode,
        nama,
        jenis,
        maps_url,
        keterangan,
        aktif,
        urutan
      `)
      .order(
        'urutan',
        {
          ascending:
            true,
        }
      );

  if (error) {
    console.error(
      'Gagal mengambil data lokasi pengelolaan sampah:',
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

  const databaseItems =
    (
      data ??
      []
    )
      .map(
        normalizeLokasi
      )
      .filter(
        (
          item
        ): item is LokasiSampah =>
          item !==
          null
      );

  const seluruhLokasi =
    mergeWithFallback(
      databaseItems
    );

  const lokasiAktif =
    seluruhLokasi.filter(
      (item) =>
        item.aktif
    );

  const lokasiByKode =
    new Map(
      seluruhLokasi.map(
        (item) => [
          item.kode,
          item,
        ]
      )
    );

  const jumlahTps =
    lokasiAktif.filter(
      (item) =>
        item.jenis ===
        'TPS'
    ).length;

  const jumlahPengepul =
    lokasiAktif.filter(
      (item) =>
        item.jenis ===
        'Pengepul'
    ).length;

  return (
    <div className="min-h-screen overflow-x-clip bg-slate-50">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative isolate overflow-hidden bg-emerald-950 text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/background.png')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#021b16] via-emerald-950/95 to-emerald-800/65" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#021b16] via-transparent to-black/20" />

        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,.55) 1px, transparent 1px)',

            backgroundSize:
              '28px 28px',
          }}
        />

        <div className="relative mx-auto flex min-h-[520px] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur">
              <Recycle
                size={28}
              />
            </div>

            <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-300">
              Lingkungan Desa Keji
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Pengelolaan Sampah
            </h1>

            <p className="mt-6 max-w-3xl text-sm font-medium leading-8 text-emerald-50/85 sm:text-base">
              Informasi persebaran
              Tempat Penampungan
              Sementara (TPS),
              pengepul, serta upaya
              pengelolaan sampah
              untuk mendukung
              lingkungan Desa Keji
              yang lebih bersih dan
              tertata.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          SUMMARY
      ===================================================== */}

      <section className="relative z-10 -mt-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid overflow-hidden rounded-[2rem] border border-emerald-100 bg-white shadow-2xl sm:grid-cols-3">
            <SummaryCard
              icon={
                MapPinned
              }
              value={String(
                lokasiAktif.length
              )}
              label="Titik Terdata"
              primary
            />

            <SummaryCard
              icon={
                Trash2
              }
              value={String(
                jumlahTps
              )}
              label="TPS"
            />

            <SummaryCard
              icon={
                Recycle
              }
              value={String(
                jumlahPengepul
              )}
              label="Pengepul"
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          INTRO
      ===================================================== */}

      <main className="mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-6 lg:px-8">
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-700 text-white">
              <Leaf
                size={23}
              />
            </div>

            <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.17em] text-emerald-700">
              Pengelolaan Lingkungan
            </p>

            <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
              Pengelolaan sampah
              berbasis lokasi dan
              partisipasi masyarakat
            </h2>

            <p className="mt-5 text-sm font-medium leading-8 text-slate-600">
              Informasi persebaran
              TPS dan pengepul dapat
              membantu masyarakat
              mengetahui titik
              pengelolaan sampah yang
              berada di wilayah Desa
              Keji.
            </p>

            <p className="mt-4 text-sm font-medium leading-8 text-slate-600">
              Peta berikut memuat
              titik TPS dan pengepul
              yang tersebar di
              wilayah Keji dan
              Suruhan. Dokumentasi
              foto pada peta dapat
              digunakan sebagai
              pintasan menuju Google
              Maps apabila tautan
              lokasi telah tersedia.
            </p>
          </article>

          <aside className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-7 sm:p-8">
            <ShieldCheck
              size={30}
              className="text-emerald-700"
            />

            <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.17em] text-emerald-700">
              Cara Menggunakan Peta
            </p>

            <h2 className="mt-2 text-xl font-black text-emerald-950">
              Klik foto lokasi untuk
              membuka Google Maps
            </h2>

            <div className="mt-6 space-y-3">
              <InfoItem>
                Cari foto TPS atau
                pengepul pada peta.
              </InfoItem>

              <InfoItem>
                Arahkan kursor atau
                sentuh foto lokasi.
              </InfoItem>

              <InfoItem>
                Klik untuk membuka
                Google Maps apabila
                tautan telah tersedia.
              </InfoItem>
            </div>
          </aside>
        </section>

        {/* ===================================================
            PETA
        =================================================== */}

        <section className="mt-12 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          {/* HEADER */}

          <div className="border-b border-slate-100 bg-gradient-to-r from-emerald-50 via-white to-white p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-700 text-white">
                <MapPinned
                  size={23}
                />
              </div>

              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-700">
                  Peta Persebaran
                </p>

                <h2 className="mt-2 text-2xl font-black text-slate-900">
                  TPS dan Pengepul
                  Desa Keji
                </h2>

                <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-slate-500">
                  Klik pada foto
                  lokasi di dalam
                  peta untuk membuka
                  titik Google Maps.
                </p>
              </div>
            </div>
          </div>

          {/* MOBILE INFORMATION */}

          <div className="border-b border-amber-100 bg-amber-50 px-6 py-3 text-xs font-semibold text-amber-800 md:hidden">
            Pada layar kecil, geser
            peta ke kanan atau kiri
            untuk melihat seluruh
            bagian.
          </div>

          {/* MAP */}

          <div className="overflow-x-auto bg-slate-100 p-3 sm:p-5 lg:p-7">
            <div className="relative mx-auto min-w-[900px] max-w-[1450px] overflow-hidden rounded-2xl bg-white shadow-lg">
              <img
                src={
                  MAP_IMAGE
                }
                alt="Peta Persebaran TPS dan Pengepul Desa Keji"
                className="block h-auto w-full select-none"
                draggable={
                  false
                }
              />

              {/* CLICKABLE PHOTO AREAS */}

              {MAP_AREAS.map(
                (
                  area
                ) => {
                  const lokasi =
                    lokasiByKode.get(
                      area.kode
                    );

                  if (
                    !lokasi ||
                    !lokasi.aktif
                  ) {
                    return null;
                  }

                  return (
                    <MapPhotoArea
                      key={
                        area.kode
                      }
                      lokasi={
                        lokasi
                      }
                      style={
                        area.style
                      }
                    />
                  );
                }
              )}
            </div>
          </div>

          {/* LEGEND */}

          <div className="border-t border-slate-100 p-5 md:p-6">
            <div className="flex flex-wrap gap-3">
              <LegendBadge
                label="TPS"
                dotClass="bg-red-500"
              />

              <LegendBadge
                label="Pengepul"
                dotClass="bg-emerald-600"
              />

              <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-[10px] font-extrabold text-slate-500">
                <Navigation
                  size={13}
                />

                Foto dengan tautan
                dapat diklik
              </span>
            </div>
          </div>
        </section>

        {/* ===================================================
            DAFTAR TITIK
        =================================================== */}

        <section className="mt-12">
          <div className="max-w-3xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.17em] text-emerald-700">
              Titik Pengelolaan
            </p>

            <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
              Daftar TPS dan
              Pengepul
            </h2>

            <p className="mt-3 text-sm font-medium leading-7 text-slate-500">
              Tautan Google Maps akan
              tersedia setelah lokasi
              diperbarui melalui
              administrator website.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {lokasiAktif.map(
              (
                item
              ) => (
                <LocationCard
                  key={
                    item.kode
                  }
                  item={
                    item
                  }
                />
              )
            )}
          </div>
        </section>

        {/* ===================================================
            PENGELOLAAN
        =================================================== */}

        <section className="mt-14">
          <div className="max-w-3xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.17em] text-emerald-700">
              Lingkungan Bersih
            </p>

            <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
              Upaya Pengelolaan
              Sampah
            </h2>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {pengelolaanSampah.map(
              (
                item
              ) => (
                <ProgramCard
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
        </section>

        {/* ===================================================
            3R
        =================================================== */}

        <section className="mt-12 overflow-hidden rounded-[2rem] bg-slate-900 text-white">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
            <div className="relative overflow-hidden bg-emerald-800 p-8 sm:p-10">
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.1]"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, rgba(255,255,255,.5) 1px, transparent 1px)',

                  backgroundSize:
                    '23px 23px',
                }}
              />

              <div className="relative">
                <Recycle
                  size={38}
                  className="text-emerald-200"
                />

                <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.19em] text-emerald-200">
                  Prinsip 3R
                </p>

                <h2 className="mt-2 text-3xl font-black">
                  Reduce, Reuse,
                  Recycle
                </h2>

                <p className="mt-4 text-sm font-medium leading-7 text-emerald-50/80">
                  Pendekatan untuk
                  mengurangi timbulan
                  sampah dan
                  meningkatkan
                  pemanfaatan kembali
                  material.
                </p>
              </div>
            </div>

            <div className="grid gap-px bg-white/10 sm:grid-cols-3">
              <ThreeRCard
                number="01"
                title="Reduce"
                description="Mengurangi penggunaan barang yang berpotensi menjadi sampah."
              />

              <ThreeRCard
                number="02"
                title="Reuse"
                description="Menggunakan kembali barang yang masih dapat dimanfaatkan."
              />

              <ThreeRCard
                number="03"
                title="Recycle"
                description="Mengolah kembali material agar memiliki nilai guna."
              />
            </div>
          </div>
        </section>

        {/* ===================================================
            CTA
        =================================================== */}

        <section className="relative mt-12 overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-950 via-emerald-800 to-teal-700 p-8 text-white sm:p-10">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(255,255,255,.55) 1px, transparent 1px)',

              backgroundSize:
                '25px 25px',
            }}
          />

          <div className="relative grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <Leaf
                size={28}
                className="text-emerald-300"
              />

              <h2 className="mt-5 text-2xl font-black sm:text-3xl">
                Jaga Desa Keji tetap
                bersih dan nyaman
              </h2>

              <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-emerald-50/80">
                Pengelolaan lingkungan
                merupakan bagian dari
                pembangunan desa yang
                membutuhkan
                partisipasi bersama.
              </p>
            </div>

            <Link
              href="/pembangunan"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-extrabold text-emerald-900 transition hover:bg-emerald-50"
            >
              Pembangunan Desa

              <ArrowRight
                size={16}
              />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

/* =========================================================
   CLICKABLE AREA
========================================================= */

function MapPhotoArea({
  lokasi,
  style,
}: {
  lokasi:
    LokasiSampah;

  style:
    CSSProperties;
}) {
  const commonClass =
    'group absolute z-10 overflow-visible rounded-lg transition duration-200';

  if (
    lokasi.mapsUrl
  ) {
    return (
      <a
        href={
          lokasi.mapsUrl
        }
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Buka lokasi ${lokasi.nama} di Google Maps`}
        title={`Buka ${lokasi.nama} di Google Maps`}
        className={`${commonClass} cursor-pointer hover:bg-emerald-400/10 hover:ring-4 hover:ring-emerald-400/90 focus:outline-none focus:ring-4 focus:ring-emerald-400`}
        style={
          style
        }
      >
        {/* MAP BUTTON */}

        <span className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-700 text-white shadow-lg ring-2 ring-white">
          <MapPin
            size={15}
          />
        </span>

        {/* TOOLTIP */}

        <span className="pointer-events-none absolute bottom-2 left-2 max-w-[calc(100%-50px)] rounded-lg bg-emerald-950/95 px-2.5 py-1.5 text-[9px] font-extrabold leading-tight text-white opacity-0 shadow-lg transition group-hover:opacity-100">
          Buka Google Maps
        </span>
      </a>
    );
  }

  return (
    <div
      title={`${lokasi.nama} — Google Maps belum tersedia`}
      className={`${commonClass} cursor-not-allowed`}
      style={
        style
      }
    >
      <span className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-700/85 text-white shadow-lg ring-2 ring-white">
        <MapPin
          size={15}
        />
      </span>
    </div>
  );
}

/* =========================================================
   LOCATION CARD
========================================================= */

function LocationCard({
  item,
}: {
  item:
    LokasiSampah;
}) {
  const isTps =
    item.jenis ===
    'TPS';

  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
            isTps
              ? 'bg-red-50 text-red-600'
              : 'bg-emerald-100 text-emerald-700'
          }`}
        >
          {isTps ? (
            <Trash2
              size={22}
            />
          ) : (
            <Recycle
              size={22}
            />
          )}
        </div>

        <span
          className={`rounded-full px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.12em] ${
            isTps
              ? 'bg-red-50 text-red-600'
              : 'bg-emerald-100 text-emerald-700'
          }`}
        >
          {item.jenis}
        </span>
      </div>

      <h3 className="mt-5 text-lg font-black text-slate-900">
        {item.nama}
      </h3>

      <p className="mt-2 flex-1 text-sm font-medium leading-7 text-slate-500">
        {item.keterangan ||
          'Informasi lokasi pengelolaan sampah Desa Keji.'}
      </p>

      <div className="mt-6 border-t border-slate-100 pt-5">
        {item.mapsUrl ? (
          <a
            href={
              item.mapsUrl
            }
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 text-xs font-extrabold text-white transition hover:bg-emerald-800"
          >
            <Navigation
              size={15}
            />

            Buka Google Maps

            <ExternalLink
              size={13}
            />
          </a>
        ) : (
          <span className="inline-flex min-h-11 w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 text-xs font-extrabold text-slate-400">
            <MapPin
              size={15}
            />

            Maps Belum Tersedia
          </span>
        )}
      </div>
    </article>
  );
}

/* =========================================================
   SUMMARY CARD
========================================================= */

function SummaryCard({
  icon: Icon,
  value,
  label,
  primary = false,
}: {
  icon:
    LucideIcon;

  value:
    string;

  label:
    string;

  primary?:
    boolean;
}) {
  return (
    <article
      className={`min-h-[170px] p-6 ${
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

      <p className="mt-5 text-3xl font-black">
        {value}
      </p>

      <p
        className={`mt-1 text-xs font-extrabold ${
          primary
            ? 'text-emerald-100'
            : 'text-slate-500'
        }`}
      >
        {label}
      </p>
    </article>
  );
}

/* =========================================================
   INFO ITEM
========================================================= */

function InfoItem({
  children,
}: {
  children:
    React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-white/70 p-4">
      <CheckCircle2
        size={17}
        className="mt-0.5 shrink-0 text-emerald-700"
      />

      <p className="text-sm font-semibold leading-6 text-emerald-900">
        {children}
      </p>
    </div>
  );
}

/* =========================================================
   PROGRAM CARD
========================================================= */

function ProgramCard({
  item,
}: {
  item:
    ProgramItem;
}) {
  const Icon =
    item.icon;

  return (
    <article className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 transition group-hover:bg-emerald-700 group-hover:text-white">
        <Icon
          size={22}
        />
      </div>

      <h3 className="mt-5 text-lg font-black text-slate-900">
        {item.title}
      </h3>

      <p className="mt-2 text-sm font-medium leading-7 text-slate-500">
        {item.description}
      </p>
    </article>
  );
}

/* =========================================================
   3R
========================================================= */

function ThreeRCard({
  number,
  title,
  description,
}: {
  number:
    string;

  title:
    string;

  description:
    string;
}) {
  return (
    <article className="bg-slate-900 p-7">
      <span className="text-xs font-black text-emerald-400">
        {number}
      </span>

      <h3 className="mt-4 text-xl font-black">
        {title}
      </h3>

      <p className="mt-3 text-xs font-medium leading-6 text-slate-400">
        {description}
      </p>
    </article>
  );
}

/* =========================================================
   LEGEND
========================================================= */

function LegendBadge({
  label,
  dotClass,
}: {
  label:
    string;

  dotClass:
    string;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-[10px] font-extrabold text-slate-600">
      <span
        className={`h-2.5 w-2.5 rounded-full ${dotClass}`}
      />

      {label}
    </span>
  );
}