// app/admin/page.tsx

import Link from 'next/link';

import {
  ArrowUpRight,
  CalendarDays,
  CircleAlert,
  FileText,
  Newspaper,
  RefreshCw,
  Users,
} from 'lucide-react';

import {
  revalidatePath,
} from 'next/cache';

import {
  supabaseAdmin,
} from '@/lib/supabase-admin';

export const dynamic =
  'force-dynamic';

export const revalidate = 0;

interface DashboardData {
  totalPenduduk: number;
  totalPermohonan: number;
  totalBerita: number;
}

interface StatistikDashboard {
  title: string;
  value: string;
  description: string;
  href: string;
  icon: typeof Users;
}

async function getDashboardData(): Promise<DashboardData> {
  /*
   * Pada tahap pertama, dashboard baru mengambil:
   * 1. Jumlah warga aktif dari tabel warga.
   * 2. Jumlah seluruh berita.
   *
   * Data permohonan akan diaktifkan pada tahap 3
   * setelah tabel permohonan_layanan dibuat.
   */
  const [
    pendudukResult,
    beritaResult,
  ] = await Promise.all([
    supabaseAdmin
      .from('warga')
      .select('id', {
        count: 'exact',
        head: true,
      })
      .eq('aktif', true),

    supabaseAdmin
      .from('berita')
      .select('id', {
        count: 'exact',
        head: true,
      }),
  ]);

  if (pendudukResult.error) {
    console.error(
      'Gagal mengambil jumlah warga aktif:',
      {
        message:
          pendudukResult.error.message,
        code:
          pendudukResult.error.code,
        details:
          pendudukResult.error.details,
        hint:
          pendudukResult.error.hint,
      }
    );
  }

  if (beritaResult.error) {
    console.error(
      'Gagal mengambil jumlah berita:',
      {
        message:
          beritaResult.error.message,
        code:
          beritaResult.error.code,
        details:
          beritaResult.error.details,
        hint:
          beritaResult.error.hint,
      }
    );
  }

  return {
    totalPenduduk:
      pendudukResult.error
        ? 0
        : pendudukResult.count ?? 0,

    /*
     * Masih 0 karena tabel permohonan_layanan
     * belum dibuat pada tahap pertama.
     */
    totalPermohonan: 0,

    totalBerita:
      beritaResult.error
        ? 0
        : beritaResult.count ?? 0,
  };
}

async function refreshDashboard() {
  'use server';

  revalidatePath('/admin');
}

export default async function AdminDashboardPage() {
  const dashboard =
    await getDashboardData();

  const statistik:
    StatistikDashboard[] = [
    {
      title: 'Warga Terdaftar',
      value:
        dashboard.totalPenduduk.toLocaleString(
          'id-ID'
        ),
      description:
        'Warga aktif dalam database',
      href: '/admin/warga',
      icon: Users,
    },
    {
      title: 'Permohonan Masuk',
      value:
        dashboard.totalPermohonan.toLocaleString(
          'id-ID'
        ),
      description:
        'Aktif setelah modul permohonan dibuat',
      href: '/admin',
      icon: FileText,
    },
    {
      title: 'Total Berita',
      value:
        dashboard.totalBerita.toLocaleString(
          'id-ID'
        ),
      description:
        'Seluruh artikel dalam sistem',
      href: '/admin/berita',
      icon: Newspaper,
    },
  ];

  return (
    <div className="mx-auto max-w-[1500px] space-y-7">
      {/* Header Dashboard */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#064e3b] via-[#065f46] to-[#047857] px-6 py-7 text-white shadow-xl shadow-emerald-950/10 sm:px-8 sm:py-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              radial-gradient(
                circle,
                rgba(255,255,255,0.13) 1.5px,
                transparent 1.5px
              )
            `,
            backgroundSize:
              '26px 26px',
          }}
        />

        <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full border-[40px] border-white/[0.04]" />

        <div className="pointer-events-none absolute -bottom-24 right-32 h-52 w-52 rounded-full bg-emerald-300/10 blur-3xl" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold text-emerald-50 backdrop-blur-md">
              <CalendarDays
                size={14}
              />

              Ringkasan administrasi desa
            </div>

            <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
              Dashboard Admin
            </h1>

            <p className="mt-2 max-w-xl text-sm font-medium leading-relaxed text-emerald-50/80 sm:text-base">
              Selamat datang kembali,
              Admin. Kelola database
              warga, permohonan layanan,
              dan publikasi Desa Keji
              melalui halaman ini.
            </p>
          </div>

          <form
            action={refreshDashboard}
          >
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white px-4 py-3 text-sm font-extrabold text-emerald-800 shadow-lg transition hover:-translate-y-0.5 hover:bg-emerald-50"
            >
              <RefreshCw
                size={17}
              />

              Segarkan Data
            </button>
          </form>
        </div>
      </section>

      {/* Statistik */}
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {statistik.map(
          (item) => {
            const Icon =
              item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className="group relative overflow-hidden rounded-3xl border border-emerald-100 bg-white p-6 shadow-[0_12px_35px_rgba(6,78,59,0.07)] transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_18px_45px_rgba(6,78,59,0.12)]"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-emerald-600 to-emerald-800" />

                <div className="pointer-events-none absolute -bottom-10 -right-10 h-28 w-28 rounded-full bg-emerald-50" />

                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">
                      {item.title}
                    </p>

                    <p className="mt-4 text-4xl font-black tracking-tight text-slate-900">
                      {item.value}
                    </p>
                  </div>

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 transition group-hover:bg-emerald-600 group-hover:text-white">
                    <Icon
                      size={23}
                      strokeWidth={2.1}
                    />
                  </div>
                </div>

                <div className="relative mt-5 flex items-center justify-between border-t border-emerald-50 pt-4">
                  <p className="text-sm font-medium text-slate-500">
                    {
                      item.description
                    }
                  </p>

                  <ArrowUpRight
                    size={17}
                    className="shrink-0 text-emerald-300 transition group-hover:text-emerald-700"
                  />
                </div>
              </Link>
            );
          }
        )}
      </section>

      {/* Status Modul Permohonan */}
      <section className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-[0_12px_35px_rgba(6,78,59,0.07)]">
        <div className="border-b border-emerald-50 px-6 py-5 sm:px-7">
          <h2 className="text-lg font-black text-slate-900 sm:text-xl">
            Permohonan Layanan
          </h2>

          <p className="mt-1 text-sm font-medium text-slate-500">
            Daftar permohonan warga
            akan ditampilkan setelah
            modul permohonan selesai
            dibuat.
          </p>
        </div>

        <div className="flex min-h-[280px] flex-col items-center justify-center px-6 py-14 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-500 ring-1 ring-amber-100">
            <CircleAlert
              size={28}
            />
          </div>

          <h3 className="mt-5 text-base font-extrabold text-slate-800">
            Modul belum diaktifkan
          </h3>

          <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-500">
            Saat ini sistem baru berada
            pada tahap pengelolaan
            database warga. Modul
            permohonan akan dihubungkan
            setelah tabel
            permohonan_layanan dan API
            permohonan dibuat.
          </p>

          <Link
            href="/admin/warga"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-extrabold text-white shadow-md transition hover:bg-emerald-800"
          >
            <Users size={17} />

            Kelola Data Warga
          </Link>
        </div>
      </section>
    </div>
  );
}