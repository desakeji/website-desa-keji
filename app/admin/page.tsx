import Link from 'next/link';

import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  CircleEllipsis,
  Clock3,
  FileText,
  MessageCircle,
  Newspaper,
  RefreshCw,
  Users,
} from 'lucide-react';

import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabase-admin';

export const dynamic = 'force-dynamic';

interface PermohonanDatabase {
  id: number;
  warga_nik: string | null;
  layanan_id: number | null;
  no_wa: string | null;
  status: string;
  created_at: string;
}

interface PermohonanDashboard {
  id: number;
  nik: string;
  namaPemohon: string;
  layanan: string;
  noWa: string;
  status: string;
  createdAt: string;
}

interface DashboardData {
  totalPenduduk: number;
  totalPermohonan: number;
  totalBerita: number;
  permohonanTerbaru: PermohonanDashboard[];
}

async function getDashboardData(): Promise<DashboardData> {
  const [
    pendudukResult,
    permohonanCountResult,
    beritaResult,
    permohonanResult,
  ] = await Promise.all([
    supabaseAdmin
      .from('warga')
      .select('*', {
        count: 'exact',
        head: true,
      })
      .eq('status_aktif', true),

    supabaseAdmin
      .from('permohonan')
      .select('*', {
        count: 'exact',
        head: true,
      }),

    supabaseAdmin
      .from('berita')
      .select('*', {
        count: 'exact',
        head: true,
      }),

    supabaseAdmin
      .from('permohonan')
      .select(`
        id,
        warga_nik,
        layanan_id,
        no_wa,
        status,
        created_at
      `)
      .order('created_at', {
        ascending: false,
      })
      .limit(5),
  ]);

  if (pendudukResult.error) {
    console.error(
      'Gagal mengambil jumlah penduduk:',
      pendudukResult.error
    );
  }

  if (permohonanCountResult.error) {
    console.error(
      'Gagal mengambil jumlah permohonan:',
      permohonanCountResult.error
    );
  }

  if (beritaResult.error) {
    console.error(
      'Gagal mengambil jumlah berita:',
      beritaResult.error
    );
  }

  if (permohonanResult.error) {
    console.error(
      'Gagal mengambil permohonan terbaru:',
      permohonanResult.error
    );
  }

  const permohonanRows =
    (permohonanResult.data ??
      []) as PermohonanDatabase[];

  const daftarNik = [
    ...new Set(
      permohonanRows
        .map((item) => item.warga_nik)
        .filter(
          (nik): nik is string =>
            typeof nik === 'string' &&
            nik.length > 0
        )
    ),
  ];

  const daftarLayananId = [
    ...new Set(
      permohonanRows
        .map((item) => item.layanan_id)
        .filter(
          (id): id is number =>
            typeof id === 'number'
        )
    ),
  ];

  let wargaData: {
    nik: string;
    nama_lengkap: string;
  }[] = [];

  let layananData: {
    id: number;
    nama: string;
  }[] = [];

  if (daftarNik.length > 0) {
    const { data, error } = await supabaseAdmin
      .from('warga')
      .select('nik, nama_lengkap')
      .in('nik', daftarNik);

    if (error) {
      console.error(
        'Gagal mengambil data warga:',
        error
      );
    } else {
      wargaData = data ?? [];
    }
  }

  if (daftarLayananId.length > 0) {
    const { data, error } = await supabaseAdmin
      .from('layanan')
      .select('id, nama')
      .in('id', daftarLayananId);

    if (error) {
      console.error(
        'Gagal mengambil data layanan:',
        error
      );
    } else {
      layananData = data ?? [];
    }
  }

  const wargaMap = new Map(
    wargaData.map((warga) => [
      warga.nik,
      warga.nama_lengkap,
    ])
  );

  const layananMap = new Map(
    layananData.map((layanan) => [
      layanan.id,
      layanan.nama,
    ])
  );

  const permohonanTerbaru =
    permohonanRows.map((item) => ({
      id: item.id,
      nik: item.warga_nik ?? '-',

      namaPemohon:
        item.warga_nik &&
        wargaMap.has(item.warga_nik)
          ? wargaMap.get(item.warga_nik)!
          : 'Data warga tidak ditemukan',

      layanan:
        item.layanan_id &&
        layananMap.has(item.layanan_id)
          ? layananMap.get(item.layanan_id)!
          : 'Layanan tidak ditemukan',

      noWa: item.no_wa ?? '-',
      status: item.status || 'Menunggu',
      createdAt: item.created_at,
    }));

  return {
    totalPenduduk:
      pendudukResult.count ?? 0,

    totalPermohonan:
      permohonanCountResult.count ?? 0,

    totalBerita:
      beritaResult.count ?? 0,

    permohonanTerbaru,
  };
}

async function refreshDashboard() {
  'use server';

  revalidatePath('/admin');
}

function formatTanggal(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '-';
  }

  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

function formatNik(nik: string) {
  if (nik.length !== 16) {
    return nik;
  }

  return `${nik.slice(0, 4)}********${nik.slice(-4)}`;
}

function formatNomorWhatsApp(noWa: string) {
  const nomor = noWa.replace(/\D/g, '');

  if (nomor.startsWith('0')) {
    return `62${nomor.slice(1)}`;
  }

  if (nomor.startsWith('62')) {
    return nomor;
  }

  return nomor;
}

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const normalizedStatus =
    status.toLowerCase();

  if (normalizedStatus === 'selesai') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-100 px-3 py-1.5 text-xs font-extrabold text-emerald-800">
        <CheckCircle2 size={13} />
        Selesai
      </span>
    );
  }

  if (
    normalizedStatus === 'diproses' ||
    normalizedStatus === 'proses'
  ) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-extrabold text-emerald-700">
        <CircleEllipsis size={13} />
        Diproses
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-extrabold text-emerald-600">
      <Clock3 size={13} />
      Menunggu
    </span>
  );
}

export default async function AdminDashboardPage() {
  const dashboard = await getDashboardData();

  const statistik = [
    {
      title: 'Total Penduduk',
      value:
        dashboard.totalPenduduk.toLocaleString(
          'id-ID'
        ),
      description: 'Warga aktif terdaftar',
      icon: Users,
    },
    {
      title: 'Permohonan Masuk',
      value:
        dashboard.totalPermohonan.toLocaleString(
          'id-ID'
        ),
      description: 'Total pengajuan layanan',
      icon: FileText,
    },
    {
      title: 'Total Berita',
      value:
        dashboard.totalBerita.toLocaleString(
          'id-ID'
        ),
      description: 'Artikel yang dipublikasikan',
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
            backgroundSize: '26px 26px',
          }}
        />

        <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full border-[40px] border-white/[0.04]" />

        <div className="pointer-events-none absolute -bottom-24 right-32 h-52 w-52 rounded-full bg-emerald-300/10 blur-3xl" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold text-emerald-50 backdrop-blur-md">
              <CalendarDays size={14} />
              Ringkasan administrasi desa
            </div>

            <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
              Dashboard Admin
            </h1>

            <p className="mt-2 max-w-xl text-sm font-medium leading-relaxed text-emerald-50/80 sm:text-base">
              Selamat datang kembali, Admin. Pantau
              data warga, permohonan layanan, dan
              publikasi desa melalui halaman ini.
            </p>
          </div>

          <form action={refreshDashboard}>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white px-4 py-3 text-sm font-extrabold text-emerald-800 shadow-lg transition hover:-translate-y-0.5 hover:bg-emerald-50"
            >
              <RefreshCw size={17} />
              Segarkan Data
            </button>
          </form>
        </div>
      </section>

      {/* Statistik */}
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {statistik.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.title}
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
                  {item.description}
                </p>

                <ArrowUpRight
                  size={17}
                  className="text-emerald-300 transition group-hover:text-emerald-700"
                />
              </div>
            </article>
          );
        })}
      </section>

      {/* Permohonan Terbaru */}
      <section className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-[0_12px_35px_rgba(6,78,59,0.07)]">
        <div className="flex flex-col gap-3 border-b border-emerald-50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <div>
            <h2 className="text-lg font-black text-slate-900 sm:text-xl">
              Permohonan Layanan Terbaru
            </h2>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Lima permohonan terbaru yang masuk ke
              sistem.
            </p>
          </div>

          <Link
            href="/admin/permohonan"
            className="inline-flex items-center gap-1.5 text-sm font-extrabold text-emerald-700 transition hover:text-emerald-900"
          >
            Lihat Semua
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {dashboard.permohonanTerbaru.length ===
        0 ? (
          <div className="flex min-h-[280px] flex-col items-center justify-center px-6 py-14 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-500 ring-1 ring-emerald-100">
              <FileText size={28} />
            </div>

            <h3 className="mt-5 text-base font-extrabold text-slate-800">
              Belum ada permohonan
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
              Permohonan layanan yang dikirim warga
              akan muncul pada tabel ini.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] border-collapse">
              <thead>
                <tr className="bg-emerald-50/50">
                  <th className="px-6 py-4 text-left text-[11px] font-extrabold uppercase tracking-[0.1em] text-emerald-800">
                    Tanggal
                  </th>

                  <th className="px-6 py-4 text-left text-[11px] font-extrabold uppercase tracking-[0.1em] text-emerald-800">
                    Pemohon
                  </th>

                  <th className="px-6 py-4 text-left text-[11px] font-extrabold uppercase tracking-[0.1em] text-emerald-800">
                    Layanan
                  </th>

                  <th className="px-6 py-4 text-left text-[11px] font-extrabold uppercase tracking-[0.1em] text-emerald-800">
                    WhatsApp
                  </th>

                  <th className="px-6 py-4 text-left text-[11px] font-extrabold uppercase tracking-[0.1em] text-emerald-800">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-emerald-50">
                {dashboard.permohonanTerbaru.map(
                  (permohonan) => (
                    <tr
                      key={permohonan.id}
                      className="transition hover:bg-emerald-50/40"
                    >
                      <td className="whitespace-nowrap px-6 py-5">
                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                          <CalendarDays
                            size={16}
                            className="text-emerald-500"
                          />

                          {formatTanggal(
                            permohonan.createdAt
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-sm font-black uppercase text-emerald-700">
                            {permohonan.namaPemohon
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>
                            <p className="text-sm font-extrabold text-slate-800">
                              {
                                permohonan.namaPemohon
                              }
                            </p>

                            <p className="mt-1 text-xs font-medium text-slate-400">
                              NIK:{' '}
                              {formatNik(
                                permohonan.nik
                              )}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <p className="max-w-[260px] text-sm font-semibold leading-relaxed text-slate-700">
                          {permohonan.layanan}
                        </p>
                      </td>

                      <td className="px-6 py-5">
                        {permohonan.noWa !== '-' ? (
                          <a
                            href={`https://wa.me/${formatNomorWhatsApp(
                              permohonan.noWa
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-700 transition hover:border-emerald-300 hover:bg-emerald-100"
                          >
                            <MessageCircle size={15} />
                            {permohonan.noWa}
                          </a>
                        ) : (
                          <span className="text-sm text-slate-400">
                            Tidak tersedia
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-5">
                        <StatusBadge
                          status={
                            permohonan.status
                          }
                        />
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}