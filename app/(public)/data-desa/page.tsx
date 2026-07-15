// app/(public)/data-desa/page.tsx

import Link from 'next/link';

import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  Database,
  FileText,
  Images,
  Map as MapIcon,
  Target,
  UserCheck,
  UserRound,
  Users,
} from 'lucide-react';

import SidebarLayanan from '@/components/SidebarLayanan';
import { supabaseAdmin } from '@/lib/supabase-admin';

import type {
  PilihanLayanan,
} from '@/types/layanan';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface ProfilDesaRow {
  jumlah_laki_laki: number | null;
  jumlah_perempuan: number | null;
  jumlah_dusun: number | null;
  jumlah_rw: number | null;
  jumlah_rt: number | null;
  tahun_data: number | null;
  updated_at: string | null;
}

interface LayananRow {
  id: number;
  nama: string;
  slug: string;
}

const PROFIL_KEY = 'utama';

const menuDataDesa = [
  {
    title: 'Populasi per Wilayah',
    description:
      'Menampilkan persebaran jumlah penduduk berdasarkan dusun, RW, dan wilayah administrasi Desa Keji.',
    href: '/data-desa/populasi-wilayah',
    icon: MapIcon,
  },
  {
    title: 'Data Penduduk Desa',
    description:
      'Ringkasan jumlah penduduk Desa Keji beserta informasi kependudukan secara umum.',
    href: '/data-desa/penduduk',
    icon: Users,
  },
  {
    title: 'Data Rentang Umur',
    description:
      'Menampilkan persebaran penduduk berdasarkan rentang usia yang telah ditentukan.',
    href: '/data-desa/rentang-umur',
    icon: CalendarDays,
  },
  {
    title: 'Kategori Umur',
    description:
      'Informasi kelompok umur penduduk mulai dari anak-anak, remaja, dewasa, hingga lansia.',
    href: '/data-desa/kategori-umur',
    icon: BarChart3,
  },
  {
    title: 'Status Penduduk',
    description:
      'Menampilkan data penduduk berdasarkan status kependudukan yang tercatat di Desa Keji.',
    href: '/data-desa/status-penduduk',
    icon: UserCheck,
  },
  {
    title: 'Jenis Kelamin',
    description:
      'Perbandingan jumlah penduduk laki-laki dan perempuan berdasarkan data terbaru.',
    href: '/data-desa/jenis-kelamin',
    icon: UserRound,
  },
  {
    title: 'Galeri Desa',
    description:
      'Dokumentasi kegiatan, potensi wilayah, budaya, dan kehidupan masyarakat Desa Keji.',
    href: '/data-desa/galeri',
    icon: Images,
  },
  {
    title: 'SDGs Desa',
    description:
      'Informasi capaian dan arah pembangunan berkelanjutan atau Sustainable Development Goals Desa.',
    href: '/data-desa/sdgs',
    icon: Target,
  },
];

function formatAngka(
  value: number
) {
  return new Intl.NumberFormat(
    'id-ID'
  ).format(value);
}

function formatTanggal(
  value: string
) {
  if (!value) {
    return 'Belum diperbarui';
  }

  const date = new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return 'Belum diperbarui';
  }

  return new Intl.DateTimeFormat(
    'id-ID',
    {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      timeZone: 'Asia/Jakarta',
    }
  ).format(date);
}

export default async function DataDesaPage() {
  const [
    profilResult,
    layananResult,
  ] = await Promise.all([
    supabaseAdmin
      .from('profil_desa')
      .select(`
        jumlah_laki_laki,
        jumlah_perempuan,
        jumlah_dusun,
        jumlah_rw,
        jumlah_rt,
        tahun_data,
        updated_at
      `)
      .eq(
        'profil_key',
        PROFIL_KEY
      )
      .maybeSingle(),

    supabaseAdmin
      .from('layanan')
      .select(`
        id,
        nama,
        slug
      `)
      .eq('aktif', true)
      .order('urutan', {
        ascending: true,
      }),
  ]);

  if (profilResult.error) {
    console.error(
      'Gagal mengambil data profil desa:',
      {
        message:
          profilResult.error.message,
        code:
          profilResult.error.code,
        details:
          profilResult.error.details,
        hint:
          profilResult.error.hint,
      }
    );
  }

  if (layananResult.error) {
    console.error(
      'Gagal mengambil daftar layanan:',
      {
        message:
          layananResult.error.message,
        code:
          layananResult.error.code,
        details:
          layananResult.error.details,
        hint:
          layananResult.error.hint,
      }
    );
  }

  const profil =
    profilResult.data as
      | ProfilDesaRow
      | null;

  const jumlahLakiLaki = Number(
    profil?.jumlah_laki_laki ?? 0
  );

  const jumlahPerempuan = Number(
    profil?.jumlah_perempuan ?? 0
  );

  const totalPenduduk =
    jumlahLakiLaki +
    jumlahPerempuan;

  const jumlahDusun = Number(
    profil?.jumlah_dusun ?? 3
  );

  const jumlahRw = Number(
    profil?.jumlah_rw ?? 0
  );

  const jumlahRt = Number(
    profil?.jumlah_rt ?? 0
  );

  const tahunData = Number(
    profil?.tahun_data ??
      new Date().getFullYear()
  );

  const updatedAt =
    profil?.updated_at ?? '';

  const daftarLayanan: PilihanLayanan[] =
    (
      (layananResult.data ??
        []) as LayananRow[]
    )
      .map((layanan) => ({
        id: Number(layanan.id),
        nama: String(
          layanan.nama ?? ''
        ).trim(),
        slug: String(
          layanan.slug ?? ''
        ).trim(),
      }))
      .filter(
        (layanan) =>
          Number.isFinite(
            layanan.id
          ) &&
          layanan.id > 0 &&
          layanan.nama.length > 0 &&
          layanan.slug.length > 0
      );

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Judul Halaman */}
        <header className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-700">
            <Database size={16} />

            Informasi Desa
          </div>

          <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
            Data Desa Keji
          </h1>

          <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-500 md:text-base">
            Pusat informasi data
            kependudukan, wilayah,
            demografi, galeri, dan
            pembangunan berkelanjutan
            Desa Keji.
          </p>
        </header>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* Kolom Kiri */}
          <main className="min-w-0 space-y-6 lg:w-2/3">
            {/* Hero Data Desa */}
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-700 p-6 text-white shadow-xl shadow-emerald-950/10 md:p-8">
              <div
                className="pointer-events-none absolute inset-0 opacity-25"
                style={{
                  backgroundImage: `
                    radial-gradient(
                      circle,
                      rgba(255, 255, 255, 0.18) 1.5px,
                      transparent 1.5px
                    )
                  `,
                  backgroundSize:
                    '25px 25px',
                }}
              />

              <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full border-[40px] border-white/[0.05]" />

              <div className="pointer-events-none absolute -bottom-24 right-24 h-52 w-52 rounded-full bg-emerald-300/10 blur-3xl" />

              <div className="relative">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 shadow-lg backdrop-blur">
                  <Database
                    size={28}
                    strokeWidth={2}
                  />
                </div>

                <h2 className="text-2xl font-black tracking-tight md:text-3xl">
                  Informasi Data Desa
                </h2>

                <p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed text-emerald-50/85 md:text-base">
                  Data pada halaman ini
                  digunakan untuk
                  memberikan gambaran
                  mengenai kondisi
                  penduduk, wilayah, dan
                  perkembangan Desa
                  Keji.
                </p>

                <div className="mt-5 flex flex-wrap gap-3 text-xs font-bold">
                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5">
                    Tahun Data{' '}
                    {tahunData}
                  </span>

                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5">
                    Diperbarui{' '}
                    {formatTanggal(
                      updatedAt
                    )}
                  </span>
                </div>
              </div>
            </section>

            {/* Ringkasan Statistik */}
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatistikCard
                label="Total Penduduk"
                value={totalPenduduk}
                suffix="Jiwa"
                icon={Users}
              />

              <StatistikCard
                label="Jumlah Dusun"
                value={jumlahDusun}
                suffix="Dusun"
                icon={MapIcon}
              />

              <StatistikCard
                label="Jumlah RW"
                value={jumlahRw}
                suffix="RW"
                icon={Database}
              />

              <StatistikCard
                label="Jumlah RT"
                value={jumlahRt}
                suffix="RT"
                icon={FileText}
              />
            </section>

            {/* Informasi */}
            <section className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0 rounded-xl bg-emerald-600 p-3 text-white shadow-sm">
                  <BarChart3 size={22} />
                </div>

                <div>
                  <h2 className="font-extrabold text-emerald-900">
                    Penyajian Data Desa
                  </h2>

                  <p className="mt-2 text-sm font-medium leading-relaxed text-emerald-800/80">
                    Pilih kategori data
                    untuk melihat
                    informasi secara
                    lebih rinci. Data
                    diperbarui oleh
                    Pemerintah Desa Keji
                    sesuai dengan data
                    administrasi yang
                    tersedia.
                  </p>
                </div>
              </div>
            </section>

            {/* Daftar Menu Data Desa */}
            <section>
              <div className="mb-5">
                <h2 className="text-xl font-black text-slate-900 md:text-2xl">
                  Kategori Data Desa
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Pilih informasi yang
                  ingin ditampilkan.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {menuDataDesa.map(
                  (item) => {
                    const Icon =
                      item.icon;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg"
                      >
                        <div className="pointer-events-none absolute -bottom-10 -right-10 h-28 w-28 rounded-full bg-emerald-50 transition-transform duration-300 group-hover:scale-125" />

                        <div className="relative">
                          <div className="mb-4 flex items-start justify-between gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 transition group-hover:bg-emerald-700 group-hover:text-white">
                              <Icon
                                size={23}
                                strokeWidth={2}
                              />
                            </div>

                            <ArrowRight
                              size={19}
                              className="-translate-x-1 text-slate-300 opacity-0 transition-all group-hover:translate-x-0 group-hover:text-emerald-600 group-hover:opacity-100"
                            />
                          </div>

                          <h3 className="text-base font-extrabold text-slate-800 transition group-hover:text-emerald-800">
                            {item.title}
                          </h3>

                          <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">
                            {
                              item.description
                            }
                          </p>

                          <div className="mt-4 inline-flex items-center gap-2 text-xs font-extrabold text-emerald-700">
                            Lihat Data

                            <ArrowRight
                              size={14}
                            />
                          </div>
                        </div>
                      </Link>
                    );
                  }
                )}
              </div>
            </section>
          </main>

          {/* Kolom Kanan */}
          <aside className="min-w-0 lg:w-1/3">
            <SidebarLayanan
              daftarLayanan={
                daftarLayanan
              }
            />
          </aside>
        </div>
      </div>
    </div>
  );
}

interface StatistikCardProps {
  label: string;
  value: number;
  suffix: string;
  icon: typeof Users;
}

function StatistikCard({
  label,
  value,
  suffix,
  icon: Icon,
}: StatistikCardProps) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
      <div className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-emerald-50" />

      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
            {label}
          </p>

          <p className="mt-3 text-3xl font-black tracking-tight text-slate-900">
            {formatAngka(value)}
          </p>

          <p className="mt-1 text-xs font-bold text-emerald-700">
            {suffix}
          </p>
        </div>

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
          <Icon
            size={21}
            strokeWidth={2}
          />
        </div>
      </div>
    </article>
  );
}