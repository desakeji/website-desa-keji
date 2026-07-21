// app/(public)/data-desa/jenis-kelamin/page.tsx

import {
  CircleAlert,
  Database,
  Info,
  Mars,
  Scale,
  Users,
  Venus,
} from 'lucide-react';

import type {
  LucideIcon,
} from 'lucide-react';

import SidebarLayanan from '@/components/SidebarLayanan';

import JenisKelaminCharts, {
  type StatistikDusunJenisKelamin,
} from '@/components/public/JenisKelaminCharts';

import {
  supabaseAdmin,
} from '@/lib/supabase-admin';

import type {
  PilihanLayanan,
} from '@/types/layanan';

export const dynamic =
  'force-dynamic';

export const revalidate = 0;

interface WargaJenisKelaminRow {
  id: string;
  dusun: string | null;

  jenis_kelamin:
    | 'L'
    | 'P'
    | null;
}

interface LayananRow {
  id: number;
  nama: string;
  slug: string;
}

interface ProfilDesaRow {
  tahun_data:
    | number
    | null;
}

const URUTAN_DUSUN = [
  'Dusun Keji',
  'Dusun Suruhan',
  'Dusun Sitoyo',
];

async function getAllWargaJenisKelamin(): Promise<
  WargaJenisKelaminRow[]
> {
  const result:
    WargaJenisKelaminRow[] = [];

  const pageSize = 1000;
  let from = 0;

  while (true) {
    const {
      data,
      error,
    } = await supabaseAdmin
      .from('warga')
      .select(`
        id,
        dusun,
        jenis_kelamin
      `)
      .eq('aktif', true)
      .order('id', {
        ascending: true,
      })
      .range(
        from,
        from + pageSize - 1
      );

    if (error) {
      console.error(
        'Gagal mengambil data jenis kelamin:',
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

      return result;
    }

    const rows =
      (data ??
        []) as WargaJenisKelaminRow[];

    result.push(...rows);

    if (
      rows.length <
      pageSize
    ) {
      break;
    }

    from += pageSize;
  }

  return result;
}

function formatAngka(
  value: number
) {
  return new Intl.NumberFormat(
    'id-ID'
  ).format(value);
}

function formatPersentase(
  value: number,
  total: number
) {
  if (total === 0) {
    return '0,00%';
  }

  return `${new Intl.NumberFormat(
    'id-ID',
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  ).format(
    (value / total) * 100
  )}%`;
}

export default async function JenisKelaminPage() {
  const [
    wargaRows,
    layananResult,
    profilResult,
  ] = await Promise.all([
    getAllWargaJenisKelamin(),

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

    supabaseAdmin
      .from('profil_desa')
      .select('tahun_data')
      .eq(
        'profil_key',
        'utama'
      )
      .maybeSingle(),
  ]);

  if (
    layananResult.error
  ) {
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

  if (
    profilResult.error
  ) {
    console.error(
      'Gagal mengambil tahun data:',
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

  const daftarLayanan:
    PilihanLayanan[] = (
      (layananResult.data ??
        []) as LayananRow[]
    )
      .map((layanan) => ({
        id:
          Number(
            layanan.id
          ),

        nama:
          String(
            layanan.nama ??
              ''
          ).trim(),

        slug:
          String(
            layanan.slug ??
              ''
          ).trim(),
      }))
      .filter(
        (layanan) =>
          Number.isFinite(
            layanan.id
          ) &&
          layanan.id > 0 &&
          layanan.nama.length >
            0 &&
          layanan.slug.length >
            0
      );

  const tahunData =
    Number(
      (
        profilResult.data as
          | ProfilDesaRow
          | null
      )?.tahun_data ??
        new Date().getFullYear()
    );

  const totalPenduduk =
    wargaRows.length;

  const lakiLaki =
    wargaRows.filter(
      (warga) =>
        warga.jenis_kelamin ===
        'L'
    ).length;

  const perempuan =
    wargaRows.filter(
      (warga) =>
        warga.jenis_kelamin ===
        'P'
    ).length;

  const belumMengisi =
    wargaRows.filter(
      (warga) =>
        warga.jenis_kelamin !==
          'L' &&
        warga.jenis_kelamin !==
          'P'
    ).length;

  const statistikDusun:
    StatistikDusunJenisKelamin[] =
    URUTAN_DUSUN.map(
      (dusun) => {
        const wargaDusun =
          wargaRows.filter(
            (warga) =>
              warga.dusun ===
              dusun
          );

        const lakiLakiDusun =
          wargaDusun.filter(
            (warga) =>
              warga.jenis_kelamin ===
              'L'
          ).length;

        const perempuanDusun =
          wargaDusun.filter(
            (warga) =>
              warga.jenis_kelamin ===
              'P'
          ).length;

        return {
          dusun,
          total:
            wargaDusun.length,

          lakiLaki:
            lakiLakiDusun,

          perempuan:
            perempuanDusun,

          belumMengisi:
            wargaDusun.length -
            lakiLakiDusun -
            perempuanDusun,
        };
      }
    );

  const rasioJenisKelamin =
    perempuan > 0
      ? (
          lakiLaki /
          perempuan
        ) *
        100
      : 0;

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-cyan-700">
            <Scale size={16} />
            Data Desa
          </div>

          <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
            Data Jenis Kelamin
          </h1>

          <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-500 md:text-base">
            Informasi komposisi
            penduduk laki-laki dan
            perempuan Desa Keji
            berdasarkan data warga
            aktif yang dikelola oleh
            Pemerintah Desa Keji.
          </p>
        </header>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* Konten Utama */}
          <main className="min-w-0 space-y-6 lg:w-2/3">
            {/* Statistik */}
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatistikCard
                label="Total Penduduk"
                value={formatAngka(
                  totalPenduduk
                )}
                description="Warga aktif"
                icon={Users}
                iconClassName="bg-cyan-100 text-cyan-700"
              />

              <StatistikCard
                label="Laki-laki"
                value={formatAngka(
                  lakiLaki
                )}
                description={formatPersentase(
                  lakiLaki,
                  totalPenduduk
                )}
                icon={Mars}
                iconClassName="bg-sky-100 text-sky-700"
              />

              <StatistikCard
                label="Perempuan"
                value={formatAngka(
                  perempuan
                )}
                description={formatPersentase(
                  perempuan,
                  totalPenduduk
                )}
                icon={Venus}
                iconClassName="bg-pink-100 text-pink-700"
              />

              <StatistikCard
                label="Belum Mengisi"
                value={formatAngka(
                  belumMengisi
                )}
                description="Data perlu dilengkapi"
                icon={CircleAlert}
                iconClassName="bg-slate-100 text-slate-600"
              />
            </section>

            {/* Informasi */}
            <section className="rounded-2xl border border-cyan-200 bg-cyan-50 p-5">
              <div className="flex items-start gap-3">
                <Database
                  size={21}
                  className="mt-0.5 shrink-0 text-cyan-700"
                />

                <div>
                  <h2 className="font-extrabold text-cyan-900">
                    Data Terintegrasi
                  </h2>

                  <p className="mt-1 text-sm font-medium leading-relaxed text-cyan-800">
                    Statistik dihitung
                    otomatis dari kolom
                    jenis kelamin pada
                    database warga
                    aktif. Penambahan,
                    perubahan, atau
                    penonaktifan data
                    warga melalui
                    halaman admin akan
                    langsung
                    memengaruhi grafik
                    dan tabel ini.
                  </p>
                </div>
              </div>
            </section>

            {/* Ringkasan Rasio */}
            <section className="grid gap-4 sm:grid-cols-2">
              <article className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                    <Scale size={22} />
                  </div>

                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                      Rasio Jenis Kelamin
                    </p>

                    <p className="mt-2 text-2xl font-black text-slate-900">
                      {perempuan > 0
                        ? new Intl.NumberFormat(
                            'id-ID',
                            {
                              maximumFractionDigits: 2,
                            }
                          ).format(
                            rasioJenisKelamin
                          )
                        : '0'}
                    </p>

                    <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-500">
                      Jumlah laki-laki
                      untuk setiap 100
                      penduduk perempuan.
                    </p>
                  </div>
                </div>
              </article>

              <article className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                    <Info size={22} />
                  </div>

                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                      Kelengkapan Data
                    </p>

                    <p className="mt-2 text-2xl font-black text-slate-900">
                      {formatPersentase(
                        lakiLaki +
                          perempuan,
                        totalPenduduk
                      )}
                    </p>

                    <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-500">
                      Persentase warga
                      yang data jenis
                      kelaminnya sudah
                      terisi.
                    </p>
                  </div>
                </div>
              </article>
            </section>

            {/* Grafik dan Tabel */}
            <JenisKelaminCharts
              tahunData={tahunData}
              totalPenduduk={
                totalPenduduk
              }
              lakiLaki={lakiLaki}
              perempuan={
                perempuan
              }
              belumMengisi={
                belumMengisi
              }
              statistikDusun={
                statistikDusun
              }
            />
          </main>

          {/* Sidebar Layanan */}
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

function StatistikCard({
  label,
  value,
  description,
  icon: Icon,
  iconClassName,
}: {
  label: string;
  value: string;
  description: string;
  icon: LucideIcon;
  iconClassName: string;
}) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-cyan-100 bg-white p-5 shadow-sm">
      <div className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-cyan-50" />

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
            {label}
          </p>

          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconClassName}`}
          >
            <Icon size={20} />
          </div>
        </div>

        <p className="mt-3 text-3xl font-black text-slate-900">
          {value}
        </p>

        <p className="mt-1 text-xs font-bold text-cyan-700">
          {description}
        </p>
      </div>
    </article>
  );
}