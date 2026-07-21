// app/(public)/data-desa/penduduk/page.tsx

import {
  Database,
  Info,
  Mars,
  MapPinned,
  Users,
  Venus,
} from 'lucide-react';

import SidebarLayanan from '@/components/SidebarLayanan';

import DataPendudukCharts, {
  type StatistikDusun,
} from '@/components/public/DataPendudukCharts';

import {
  supabaseAdmin,
} from '@/lib/supabase-admin';

import type {
  PilihanLayanan,
} from '@/types/layanan';

export const dynamic =
  'force-dynamic';

export const revalidate = 0;

interface WargaPendudukRow {
  dusun: string | null;

  no_kk_hash:
    | string
    | null;

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

async function getAllWargaPenduduk(): Promise<
  WargaPendudukRow[]
> {
  const result:
    WargaPendudukRow[] = [];

  const pageSize = 1000;
  let from = 0;

  while (true) {
    const {
      data,
      error,
    } = await supabaseAdmin
      .from('warga')
      .select(`
        dusun,
        no_kk_hash,
        jenis_kelamin
      `)
      .eq('aktif', true)
      .range(
        from,
        from + pageSize - 1
      );

    if (error) {
      console.error(
        'Gagal mengambil data penduduk:',
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
        []) as WargaPendudukRow[];

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

function hitungJumlahKk(
  rows: WargaPendudukRow[]
) {
  return new Set(
    rows
      .map(
        (row) =>
          row.no_kk_hash
      )
      .filter(
        (
          noKk
        ): noKk is string =>
          Boolean(noKk)
      )
  ).size;
}

function formatAngka(
  value: number
) {
  return new Intl.NumberFormat(
    'id-ID'
  ).format(value);
}

export default async function DataPendudukPage() {
  const [
    wargaRows,
    layananResult,
    profilResult,
  ] = await Promise.all([
    getAllWargaPenduduk(),

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

  const totalKk =
    hitungJumlahKk(
      wargaRows
    );

  const lakiLaki =
    wargaRows.filter(
      (row) =>
        row.jenis_kelamin ===
        'L'
    ).length;

  const perempuan =
    wargaRows.filter(
      (row) =>
        row.jenis_kelamin ===
        'P'
    ).length;

  const belumDiisi =
    wargaRows.filter(
      (row) =>
        row.jenis_kelamin !==
          'L' &&
        row.jenis_kelamin !==
          'P'
    ).length;

  const statistikDusun:
    StatistikDusun[] =
    URUTAN_DUSUN.map(
      (dusun) => {
        const wargaDusun =
          wargaRows.filter(
            (row) =>
              row.dusun ===
              dusun
          );

        const jumlahLakiLaki =
          wargaDusun.filter(
            (row) =>
              row.jenis_kelamin ===
              'L'
          ).length;

        const jumlahPerempuan =
          wargaDusun.filter(
            (row) =>
              row.jenis_kelamin ===
              'P'
          ).length;

        return {
          dusun,

          jumlahKk:
            hitungJumlahKk(
              wargaDusun
            ),

          jumlahPenduduk:
            wargaDusun.length,

          lakiLaki:
            jumlahLakiLaki,

          perempuan:
            jumlahPerempuan,

          belumDiisi:
            wargaDusun.length -
            jumlahLakiLaki -
            jumlahPerempuan,
        };
      }
    );

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-cyan-700">
            <Database
              size={16}
            />

            Data Desa
          </div>

          <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
            Data Penduduk Desa
          </h1>

          <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-500 md:text-base">
            Informasi jumlah
            penduduk dan keluarga
            Desa Keji berdasarkan
            data warga aktif yang
            dikelola oleh
            Pemerintah Desa Keji.
          </p>
        </header>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* Konten Utama */}
          <main className="min-w-0 space-y-6 lg:w-2/3">
            {/* Kartu Statistik */}
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatistikCard
                label="Total Penduduk"
                value={
                  totalPenduduk
                }
                suffix="Jiwa"
                icon={Users}
              />

              <StatistikCard
                label="Jumlah Keluarga"
                value={totalKk}
                suffix="KK"
                icon={Database}
              />

              <StatistikCard
                label="Laki-laki"
                value={lakiLaki}
                suffix="Jiwa"
                icon={Mars}
              />

              <StatistikCard
                label="Perempuan"
                value={perempuan}
                suffix="Jiwa"
                icon={Venus}
              />
            </section>

            {/* Informasi Integrasi */}
            <section className="rounded-2xl border border-cyan-200 bg-cyan-50 p-5">
              <div className="flex items-start gap-3">
                <Info
                  size={21}
                  className="mt-0.5 shrink-0 text-cyan-700"
                />

                <div>
                  <h2 className="font-extrabold text-cyan-900">
                    Data Terintegrasi
                  </h2>

                  <p className="mt-1 text-sm font-medium leading-relaxed text-cyan-800">
                    Data pada halaman
                    ini dihitung
                    otomatis dari
                    database warga
                    aktif yang
                    dimasukkan melalui
                    halaman admin.
                    Perubahan data
                    warga akan langsung
                    memengaruhi grafik
                    dan tabel
                    penduduk.
                  </p>
                </div>
              </div>
            </section>

            {/* Grafik dan Tabel */}
            <DataPendudukCharts
              tahunData={tahunData}
              totalPenduduk={
                totalPenduduk
              }
              lakiLaki={
                lakiLaki
              }
              perempuan={
                perempuan
              }
              belumDiisi={
                belumDiisi
              }
              statistikDusun={
                statistikDusun
              }
            />

            {/* Sumber Data */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <MapPinned
                  size={21}
                  className="mt-0.5 shrink-0 text-emerald-700"
                />

                <div>
                  <h2 className="font-extrabold text-slate-800">
                    Sumber Data
                  </h2>

                  <p className="mt-1 text-sm font-medium leading-relaxed text-slate-500">
                    Data bersumber
                    dari database
                    administrasi warga
                    Desa Keji tahun{' '}
                    {tahunData}.
                    Informasi pribadi
                    seperti NIK, nomor
                    KK, nama, alamat,
                    dan nomor WhatsApp
                    tidak ditampilkan
                    pada halaman
                    publik.
                  </p>
                </div>
              </div>
            </section>
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
  suffix,
  icon: Icon,
}: {
  label: string;
  value: number;
  suffix: string;
  icon: typeof Users;
}) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-cyan-100 bg-white p-5 shadow-sm">
      <div className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-cyan-50" />

      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
            {label}
          </p>

          <p className="mt-3 text-3xl font-black text-slate-900">
            {formatAngka(
              value
            )}
          </p>

          <p className="mt-1 text-xs font-bold text-cyan-700">
            {suffix}
          </p>
        </div>

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700">
          <Icon
            size={21}
            strokeWidth={2}
          />
        </div>
      </div>
    </article>
  );
}