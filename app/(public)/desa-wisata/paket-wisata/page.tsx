// app/(public)/desa-wisata/paket-wisata/page.tsx

import type {
  Metadata,
} from 'next';

import Image from 'next/image';
import Link from 'next/link';

import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Compass,
  ExternalLink,
  Globe,
  Info,
  Link2,
  MapPinned,
  MessageCircle,
  Sparkles,
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
    'Paket Wisata Desa Keji | SIJI',

  description:
    'Temukan informasi paket wisata Desa Keji dalam satu halaman yang mudah diakses.',
};

export const dynamic =
  'force-dynamic';

export const revalidate =
  0;

/* =========================================================
   CONFIG
========================================================= */

const PAKET_WISATA_IMAGE =
  '/desa-wisata/paket%20wisata.png';

const PAKET_WISATA_URL =
  'https://desawisatakeji.carrd.co/';

/* =========================================================
   TYPES
========================================================= */

interface PaketWisataSettings {
  judul:
    string;

  subjudul:
    string;

  deskripsi:
    string;

  linktree_url:
    | string
    | null;

  tombol_label:
    string;

  aktif:
    boolean;
}

/* =========================================================
   FALLBACK
========================================================= */

const fallbackSettings:
  PaketWisataSettings = {
  judul:
    'Paket Wisata Desa Keji',

  subjudul:
    'Temukan pengalaman wisata, budaya, dan suasana khas pedesaan di Desa Keji.',

  deskripsi:
    'Akses seluruh informasi paket wisata Desa Keji melalui satu tautan yang mudah digunakan untuk membantu merencanakan kunjungan Anda.',

  linktree_url:
    PAKET_WISATA_URL,

  tombol_label:
    'Lihat Paket Wisata',

  aktif:
    true,
};

/* =========================================================
   HELPERS
========================================================= */

function safeString(
  value: unknown
) {
  return String(
    value ?? ''
  ).trim();
}

function normalizeExternalUrl(
  value: unknown
): string | null {
  const text =
    safeString(
      value
    );

  if (!text) {
    return null;
  }

  try {
    const url =
      new URL(
        text
      );

    if (
      url.protocol !==
        'https:' &&
      url.protocol !==
        'http:'
    ) {
      return null;
    }

    return url.toString();
  } catch {
    return null;
  }
}

function normalizeSettings(
  value: unknown
): PaketWisataSettings {
  if (
    !value ||
    typeof value !==
      'object' ||
    Array.isArray(
      value
    )
  ) {
    return fallbackSettings;
  }

  const row =
    value as Record<
      string,
      unknown
    >;

  return {
    judul:
      safeString(
        row.judul
      ) ||
      fallbackSettings
        .judul,

    subjudul:
      safeString(
        row.subjudul
      ) ||
      fallbackSettings
        .subjudul,

    deskripsi:
      safeString(
        row.deskripsi
      ) ||
      fallbackSettings
        .deskripsi,

    linktree_url:
      normalizeExternalUrl(
        row.linktree_url
      ) ||
      PAKET_WISATA_URL,

    tombol_label:
      safeString(
        row.tombol_label
      ) ||
      fallbackSettings
        .tombol_label,

    aktif:
      row.aktif ===
        undefined ||
      row.aktif ===
        null
        ? true
        : Boolean(
            row.aktif
          ),
  };
}

/* =========================================================
   PAGE
========================================================= */

export default async function PaketWisataPage() {
  const {
    data,
    error,
  } =
    await supabaseAdmin
      .from(
        'desa_wisata_paket_settings'
      )
      .select(`
        judul,
        subjudul,
        deskripsi,
        linktree_url,
        tombol_label,
        aktif
      `)
      .eq(
        'setting_key',
        'utama'
      )
      .maybeSingle();

  if (error) {
    console.error(
      'Gagal mengambil pengaturan Paket Wisata:',
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

  const settings =
    normalizeSettings(
      data
    );

  /*
   * Apabila admin belum memasukkan URL,
   * otomatis menggunakan Carrd Desa Wisata Keji.
   */
  const linktreeUrl =
    settings.aktif
      ? settings.linktree_url ||
        PAKET_WISATA_URL
      : null;

  return (
    <div className="relative min-h-screen overflow-hidden bg-emerald-950">
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center opacity-[0.10]"
        style={{
          backgroundImage:
            `url("${PAKET_WISATA_IMAGE}")`,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-br from-[#032e25] via-emerald-950/95 to-[#075f4d]/95" />

      {/* Pattern */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.65) 1px, transparent 1px)',

          backgroundSize:
            '29px 29px',
        }}
      />

      {/* Glow */}

      <div className="pointer-events-none absolute -left-44 -top-44 h-[520px] w-[520px] rounded-full bg-emerald-300/10 blur-[120px]" />

      <div className="pointer-events-none absolute -bottom-52 right-0 h-[560px] w-[560px] rounded-full bg-teal-300/10 blur-[130px]" />

      <div className="pointer-events-none absolute -right-36 -top-36 h-[430px] w-[430px] rounded-full border-[70px] border-white/[0.025]" />

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="relative mx-auto flex min-h-screen max-w-7xl items-center px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto w-full">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_460px] lg:items-center xl:gap-16">
            {/* =================================================
                INFORMASI KIRI
            ================================================= */}

            <section className="mx-auto w-full max-w-3xl lg:mx-0">
              {/* Label */}

              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-emerald-100 shadow-lg backdrop-blur-md sm:text-xs">
                <MapPinned
                  size={15}
                />

                Desa Wisata Keji
              </div>

              <p className="mt-8 text-xs font-extrabold uppercase tracking-[0.22em] text-emerald-300">
                Jelajah • Budaya •
                Pengalaman Lokal
              </p>

              {/* Heading */}

              <h1 className="mt-4 max-w-3xl text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
                {
                  settings.judul
                }
              </h1>

              {/* Subjudul */}

              <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-emerald-50/90 sm:text-lg">
                {
                  settings.subjudul
                }
              </p>

              {/* Deskripsi */}

              <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-emerald-100/70 sm:text-base">
                {
                  settings.deskripsi
                }
              </p>

              {/* Badge */}

              <div className="mt-8 flex flex-wrap gap-3">
                <InfoBadge text="Informasi Terpusat" />

                <InfoBadge text="Mudah Diakses" />

                <InfoBadge text="Paket Wisata Desa" />
              </div>

              {/* Informasi */}

              <div className="mt-8 grid max-w-2xl gap-3">
                <InfoRow
                  icon={
                    Compass
                  }
                  title="Jelajahi Desa Keji"
                  text="Temukan berbagai informasi wisata, pengalaman lokal, dan potensi menarik di Desa Keji."
                />

                <InfoRow
                  icon={
                    Sparkles
                  }
                  title="Informasi dalam Satu Tautan"
                  text="Seluruh informasi Paket Wisata Desa Keji dapat diakses melalui satu halaman yang praktis."
                />

                <InfoRow
                  icon={
                    Info
                  }
                  title="Informasi Selalu Diperbarui"
                  text="Tautan Paket Wisata dapat diperbarui melalui administrator website tanpa mengubah halaman ini."
                />
              </div>

              {/* CTA Desktop */}

              {linktreeUrl && (
                <div className="mt-9">
                  <a
                    href={
                      linktreeUrl
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-emerald-300 px-7 text-sm font-black text-emerald-950 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:bg-emerald-200"
                  >
                    <Link2
                      size={19}
                    />

                    {
                      settings
                        .tombol_label
                    }

                    <ArrowUpRight
                      size={18}
                      className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </div>
              )}
            </section>

            {/* =================================================
                CARD DESA WISATA
            ================================================= */}

            <section className="relative mx-auto w-full max-w-[460px] lg:ml-auto">
              {/* Glow card */}

              <div className="pointer-events-none absolute -inset-6 rounded-[3rem] bg-emerald-300/10 blur-3xl" />

              <div className="relative overflow-hidden rounded-[2.4rem] border border-white/20 bg-[#f8faf8] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.32)] sm:p-6">
                {/* =================================================
                    HEADER CARD
                ================================================= */}

                <div className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                    <MapPinned
                      size={23}
                    />
                  </div>

                  <p className="mt-5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-emerald-700">
                    Desa Wisata
                  </p>

                  <h2 className="mt-2 text-3xl font-black tracking-tight text-emerald-950 sm:text-4xl">
                    Keji
                  </h2>

                  <div className="mx-auto mt-4 h-1 w-10 rounded-full bg-emerald-600" />
                </div>

                {/* =================================================
                    POSTER
                ================================================= */}

                <a
                  href={
                    linktreeUrl ||
                    PAKET_WISATA_URL
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Buka Paket Wisata Desa Keji"
                  className="group relative mt-7 block overflow-hidden rounded-[1.75rem] border border-emerald-100 bg-emerald-50 p-2.5 shadow-sm transition duration-300 hover:border-emerald-300 hover:shadow-xl"
                >
                  <div className="relative overflow-hidden rounded-[1.25rem]">
                    <Image
                      src={
                        PAKET_WISATA_IMAGE
                      }
                      alt="Paket Wisata Desa Keji"
                      width={
                        1000
                      }
                      height={
                        1400
                      }
                      priority
                      className="h-auto w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                    />

                    {/* Gradient hover */}

                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-emerald-950/0 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

                    {/* Hover action */}

                    <div className="absolute inset-x-4 bottom-4 flex justify-center translate-y-3 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <span className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-extrabold text-emerald-800 shadow-xl">
                        Lihat Paket Wisata

                        <ArrowUpRight
                          size={15}
                        />
                      </span>
                    </div>
                  </div>
                </a>

                {/* =================================================
                    CARD DESCRIPTION
                ================================================= */}

                <div className="mt-6 text-center">
                  <p className="text-sm font-semibold leading-7 text-slate-600">
                    {
                      settings.subjudul
                    }
                  </p>

                  <div className="mx-auto mt-5 inline-flex items-start gap-2 rounded-2xl bg-emerald-50 px-4 py-3 text-emerald-800">
                    <MapPinned
                      size={16}
                      className="mt-0.5 shrink-0"
                    />

                    <p className="text-xs font-bold leading-5">
                      Desa Keji,
                      Kecamatan Ungaran
                      Barat, Kabupaten
                      Semarang, Jawa
                      Tengah
                    </p>
                  </div>
                </div>

                {/* =================================================
                    ACTION LINKS
                ================================================= */}

                <div className="mt-7 space-y-3">
                  {/* PAKET WISATA */}

                  {linktreeUrl ? (
                    <a
                      href={
                        linktreeUrl
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex min-h-[60px] w-full items-center justify-between rounded-2xl bg-emerald-700 px-5 text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-xl"
                    >
                      <span className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
                          <Link2
                            size={18}
                          />
                        </span>

                        <span className="text-left">
                          <span className="block text-[9px] font-extrabold uppercase tracking-[0.14em] text-emerald-200">
                            Informasi
                            Wisata
                          </span>

                          <span className="mt-0.5 block text-sm font-black">
                            {
                              settings
                                .tombol_label
                            }
                          </span>
                        </span>
                      </span>

                      <ArrowUpRight
                        size={18}
                        className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                  ) : (
                    <div className="flex min-h-[60px] w-full items-center gap-3 rounded-2xl border border-slate-200 bg-slate-100 px-5 text-slate-400">
                      <Link2
                        size={18}
                      />

                      <span className="text-sm font-extrabold">
                        Paket wisata
                        belum tersedia
                      </span>
                    </div>
                  )}

                  {/* JELAJAH DESA */}

                  <ActionLink
                    href="/desa-wisata"
                    icon={
                      Globe
                    }
                    eyebrow="Desa Wisata"
                    label="Jelajahi Desa Keji"
                  />

                  {/* KONTAK */}

                  <ActionLink
                    href="/kontak"
                    icon={
                      MessageCircle
                    }
                    eyebrow="Informasi"
                    label="Hubungi Desa Keji"
                  />
                </div>

                {/* Footer */}

                <div className="mt-7 border-t border-emerald-100 pt-5 text-center">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-emerald-700">
                    Desa Keji
                  </p>

                  <p className="mt-1 text-[10px] font-semibold text-slate-400">
                    Sistem Informasi
                    Desa Keji
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

/* =========================================================
   INFO BADGE
========================================================= */

function InfoBadge({
  text,
}: {
  text:
    string;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.1em] text-emerald-100 backdrop-blur">
      <BadgeCheck
        size={13}
        className="text-emerald-300"
      />

      {text}
    </span>
  );
}

/* =========================================================
   INFO ROW
========================================================= */

function InfoRow({
  icon: Icon,
  title,
  text,
}: {
  icon:
    LucideIcon;

  title:
    string;

  text:
    string;
}) {
  return (
    <article className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur-sm transition hover:bg-white/[0.10]">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-300/15 text-emerald-200">
        <Icon
          size={19}
        />
      </div>

      <div>
        <h2 className="text-sm font-black text-white">
          {title}
        </h2>

        <p className="mt-1 text-xs font-medium leading-6 text-emerald-50/70">
          {text}
        </p>
      </div>
    </article>
  );
}

/* =========================================================
   INTERNAL ACTION LINK
========================================================= */

function ActionLink({
  href,
  icon: Icon,
  eyebrow,
  label,
}: {
  href:
    string;

  icon:
    LucideIcon;

  eyebrow:
    string;

  label:
    string;
}) {
  return (
    <Link
      href={
        href
      }
      className="group flex min-h-[60px] w-full items-center justify-between rounded-2xl border border-emerald-100 bg-emerald-50 px-5 text-emerald-900 transition duration-300 hover:border-emerald-200 hover:bg-emerald-100"
    >
      <span className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm">
          <Icon
            size={18}
          />
        </span>

        <span className="text-left">
          <span className="block text-[9px] font-extrabold uppercase tracking-[0.13em] text-emerald-600">
            {eyebrow}
          </span>

          <span className="mt-0.5 block text-sm font-black">
            {label}
          </span>
        </span>
      </span>

      <ArrowRight
        size={17}
        className="text-emerald-500 transition group-hover:translate-x-1"
      />
    </Link>
  );
}