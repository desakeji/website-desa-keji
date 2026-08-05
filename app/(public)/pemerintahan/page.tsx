// app/(public)/pemerintahan/page.tsx

import Link from 'next/link';

import {
  Archive,
  ArrowRight,
  Building2,
  Calendar,
  ChevronRight,
  Eye,
  Landmark,
  MapPin,
  ShieldCheck,
  User,
  UsersRound,
  type LucideIcon,
} from 'lucide-react';

import SidebarLayanan from '@/components/SidebarLayanan';
import SidebarTilikArkeji from '@/components/SidebarTilikArkeji';

import {
  supabaseAdmin,
} from '@/lib/supabase-admin';

import type {
  PilihanLayanan,
} from '@/types/layanan';

export const dynamic =
  'force-dynamic';

export const revalidate = 0;

interface LayananRow {
  id:
    | number
    | string
    | null;

  nama:
    string | null;

  slug:
    string | null;
}

interface KelompokPerangkat {
  judul: string;
  deskripsi: string;
  ikon: LucideIcon;
  jabatan: string[];
}

const kelompokPerangkat:
  KelompokPerangkat[] = [
  {
    judul:
      'Unsur Sekretariat Desa',

    deskripsi:
      'Membantu Kepala Desa dalam penyelenggaraan administrasi pemerintahan desa.',

    ikon: Building2,

    jabatan: [
      'Sekretaris Desa',
      'Kaur Tata Usaha dan Umum',
      'Kaur Keuangan',
      'Kaur Perencanaan',
    ],
  },

  {
    judul:
      'Pelaksana Teknis',

    deskripsi:
      'Menjalankan tugas operasional sesuai bidang pelayanan pemerintahan desa.',

    ikon: ShieldCheck,

    jabatan: [
      'Kasi Pemerintahan',
      'Kasi Kesejahteraan',
      'Kasi Pelayanan',
    ],
  },

  {
    judul:
      'Pelaksana Kewilayahan',

    deskripsi:
      'Mendukung penyelenggaraan pemerintahan dan pelayanan masyarakat di setiap dusun.',

    ikon: MapPin,

    jabatan: [
      'Kepala Dusun Keji',
      'Kepala Dusun Suruhan',
      'Kepala Dusun Sitoyo',
    ],
  },
];

function safeString(
  value: unknown
) {
  return String(
    value ?? ''
  ).trim();
}

export default async function PemerintahanDesaPage() {
  const {
    data: layananData,
    error: layananError,
  } = await supabaseAdmin
    .from('layanan')
    .select(`
      id,
      nama,
      slug
    `)
    .eq('aktif', true)
    .order('urutan', {
      ascending: true,
      nullsFirst: false,
    })
    .order('nama', {
      ascending: true,
    });

  if (layananError) {
    console.error(
      'Gagal mengambil daftar layanan pada halaman pemerintahan:',
      {
        message:
          layananError.message,

        code:
          layananError.code,

        details:
          layananError.details,

        hint:
          layananError.hint,
      }
    );
  }

  const daftarLayanan:
    PilihanLayanan[] = (
      layananData ?? []
    )
      .map((item) => {
        const layanan =
          item as LayananRow;

        const id =
          Number(layanan.id);

        const nama =
          safeString(
            layanan.nama
          );

        const slug =
          safeString(
            layanan.slug
          );

        return {
          id,
          nama,

          slug:
            slug ||
            `layanan-${id}`,
        };
      })
      .filter(
        (layanan) =>
          Number.isInteger(
            layanan.id
          ) &&
          layanan.id > 0 &&
          layanan.nama.length >
            0 &&
          layanan.slug.length >
            0
      );

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Sekilas Info */}
        <div className="relative mb-7 flex items-center gap-3 overflow-hidden rounded-xl bg-emerald-800 px-4 py-2.5 text-sm font-medium text-white shadow-sm">
          <div className="z-10 shrink-0 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-extrabold shadow-md">
            Sekilas Info
          </div>

          <style
            dangerouslySetInnerHTML={{
              __html: `
                @keyframes scrolling-pemerintahan {
                  0% {
                    transform: translateX(100%);
                  }

                  100% {
                    transform: translateX(-100%);
                  }
                }

                .animate-scrolling-pemerintahan {
                  display: inline-block;
                  white-space: nowrap;
                  animation:
                    scrolling-pemerintahan
                    24s linear infinite;
                }

                .animate-scrolling-pemerintahan:hover {
                  animation-play-state: paused;
                }

                @media (
                  prefers-reduced-motion:
                  reduce
                ) {
                  .animate-scrolling-pemerintahan {
                    animation: none;
                  }
                }
              `,
            }}
          />

          <div className="min-w-0 flex-1 overflow-hidden">
            <div className="animate-scrolling-pemerintahan">
              Struktur Organisasi dan Tata Kerja Pemerintah
              Desa Keji, Kecamatan Ungaran Barat,
              Kabupaten Semarang. *** Kenali sejarah
              kepemimpinan Desa Keji melalui menu Tilik
              Arkeji ***
            </div>
          </div>
        </div>

        {/* Layout Utama */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* Konten Utama */}
          <main className="min-w-0 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:w-2/3">
            {/* Header Halaman */}
            <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-800 to-emerald-700 px-6 py-8 text-white md:px-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-25"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)',

                  backgroundSize:
                    '25px 25px',
                }}
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border-[52px] border-white/[0.04]"
              />

              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
                  <Landmark
                    size={24}
                  />
                </div>

                <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-200">
                  Pemerintahan Desa
                </p>

                <h1 className="mt-2 text-2xl font-black leading-tight md:text-3xl">
                  Pemerintah Desa Keji
                </h1>

                <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-emerald-50/80">
                  Informasi struktur organisasi, unsur
                  pimpinan, sekretariat, pelaksana teknis,
                  dan pelaksana kewilayahan Pemerintah
                  Desa Keji.
                </p>

                {/* Metadata */}
                <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold text-emerald-50/80">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2">
                    <Calendar
                      size={14}
                    />

                    10 Juli 2026
                  </span>

                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2">
                    <User
                      size={14}
                    />

                    Admin Desa
                  </span>

                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2">
                    <Eye
                      size={14}
                    />

                    Informasi Pemerintahan
                  </span>
                </div>
              </div>
            </section>

            <div className="space-y-10 p-6 md:p-8">
              {/* SOTK */}
              <section className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white px-5 py-8 text-center shadow-sm md:px-8">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full border-[24px] border-emerald-700/[0.04]"
                />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-emerald-500/[0.05]"
                />

                <div className="relative">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-md shadow-emerald-900/10">
                    <Landmark
                      size={28}
                    />
                  </div>

                  <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-700">
                    Struktur Organisasi dan Tata Kerja
                  </p>

                  <h2 className="mt-2 text-xl font-black leading-snug text-slate-900 md:text-2xl">
                    Pemerintah Desa Keji
                  </h2>

                  <p className="mt-2 text-sm font-semibold text-slate-500">
                    Kecamatan Ungaran Barat, Kabupaten
                    Semarang
                  </p>
                </div>
              </section>

              {/* Kepala Desa */}
              <section>
                <SectionHeading
                  icon={UsersRound}
                  label="Unsur Pimpinan"
                  title="Kepala Desa"
                  description="Kepala Desa memimpin pelaksanaan pemerintahan, pembangunan, pembinaan kemasyarakatan, dan pemberdayaan masyarakat."
                />

                <div className="mt-5 rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6 text-center shadow-sm">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-lg shadow-emerald-900/10 ring-4 ring-emerald-100">
                    <Landmark
                      size={30}
                    />
                  </div>

                  <h3 className="mt-5 text-lg font-black uppercase tracking-wide text-emerald-950">
                    Kepala Desa Keji
                  </h3>

                  <p className="mx-auto mt-3 max-w-xl text-sm font-medium leading-7 text-slate-600">
                    Memimpin penyelenggaraan pemerintahan,
                    pembangunan, pembinaan kemasyarakatan,
                    dan pemberdayaan masyarakat Desa Keji.
                  </p>
                </div>
              </section>

              {/* Susunan Perangkat Desa */}
              <section>
                <SectionHeading
                  icon={Building2}
                  label="Perangkat Desa"
                  title="Susunan Perangkat Desa"
                  description="Perangkat desa membantu Kepala Desa sesuai bidang tugas dan wilayah kerjanya."
                />

                <div className="mt-6 space-y-5">
                  {kelompokPerangkat.map(
                    (
                      kelompok,
                      index
                    ) => {
                      const Icon =
                        kelompok.ikon;

                      return (
                        <article
                          key={
                            kelompok.judul
                          }
                          className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-emerald-200 hover:shadow-md"
                        >
                          <div className="flex items-start gap-4 border-b border-slate-100 p-5 sm:p-6">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-700 text-sm font-black text-white shadow-sm">
                              {String(
                                index +
                                  1
                              ).padStart(
                                2,
                                '0'
                              )}
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <Icon
                                  size={19}
                                  className="shrink-0 text-emerald-700"
                                />

                                <h3 className="font-black uppercase tracking-wide text-emerald-900">
                                  {
                                    kelompok.judul
                                  }
                                </h3>
                              </div>

                              <p className="mt-2 text-sm font-medium leading-7 text-slate-600">
                                {
                                  kelompok.deskripsi
                                }
                              </p>
                            </div>
                          </div>

                          <ul className="grid gap-3 bg-emerald-50/50 p-5 sm:grid-cols-2 sm:p-6">
                            {kelompok.jabatan.map(
                              (
                                jabatan
                              ) => (
                                <li
                                  key={
                                    jabatan
                                  }
                                  className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm font-bold text-slate-700"
                                >
                                  <ChevronRight
                                    size={16}
                                    className="shrink-0 text-emerald-600"
                                  />

                                  <span>
                                    {
                                      jabatan
                                    }
                                  </span>
                                </li>
                              )
                            )}
                          </ul>
                        </article>
                      );
                    }
                  )}
                </div>
              </section>

              {/* Tilik Arkeji */}
              <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-800 to-emerald-700 p-6 text-white shadow-lg sm:p-7">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-25"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)',

                    backgroundSize:
                      '24px 24px',
                  }}
                />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full border-[34px] border-white/[0.04]"
                />

                <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
                      <Archive
                        size={23}
                      />
                    </div>

                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-200">
                        Arsip Desa Keji
                      </p>

                      <h2 className="mt-2 text-xl font-black">
                        Tilik Arkeji
                      </h2>

                      <p className="mt-2 max-w-xl text-sm font-medium leading-7 text-emerald-50/80">
                        Telusuri biografi kepala desa,
                        struktur organisasi, pencapaian,
                        penghargaan, dan dokumentasi Desa
                        Keji dari masa ke masa.
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/profil/tilik-arkeji"
                    className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-extrabold text-emerald-900 transition hover:bg-emerald-50"
                  >
                    Buka Tilik Arkeji

                    <ArrowRight
                      size={16}
                    />
                  </Link>
                </div>
              </section>

              {/* Catatan */}
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm font-medium leading-7 text-emerald-900">
                Informasi nama dan profil perangkat desa
                dapat diperbarui setelah data resmi terbaru
                selesai diverifikasi oleh Pemerintah Desa
                Keji.
              </div>
            </div>
          </main>

          {/* Sidebar Kanan */}
          <aside className="min-w-0 lg:w-1/3">
            <div className="flex flex-col gap-8 lg:sticky lg:top-24">
              <SidebarLayanan
                daftarLayanan={
                  daftarLayanan
                }
                sticky={false}
              />

              <SidebarTilikArkeji />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function SectionHeading({
  icon: Icon,
  label,
  title,
  description,
}: {
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
        <Icon
          size={22}
          strokeWidth={2.4}
        />
      </div>

      <div>
        <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-emerald-700">
          {label}
        </p>

        <h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl">
          {title}
        </h2>

        <p className="mt-2 max-w-2xl text-sm font-medium leading-7 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}