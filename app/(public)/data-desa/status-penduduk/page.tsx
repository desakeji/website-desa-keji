// app/(public)/data-desa/status-penduduk/page.tsx

import {
  BadgeCheck,
  CircleAlert,
  Database,
  Home,
  MapPin,
  Users,
} from 'lucide-react';

import type {
  LucideIcon,
} from 'lucide-react';

import SidebarLayanan from '@/components/SidebarLayanan';

import StatusPendudukCharts, {
  type StatistikStatusPenduduk,
} from '@/components/public/StatusPendudukCharts';

import {
  supabaseAdmin,
} from '@/lib/supabase-admin';

import type {
  PilihanLayanan,
} from '@/types/layanan';

export const dynamic =
  'force-dynamic';

export const revalidate = 0;

interface WargaStatusRow {
  status_penduduk:
    | 'TETAP'
    | 'TIDAK_TETAP'
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

async function getAllWargaStatus(): Promise<
  WargaStatusRow[]
> {
  const result:
    WargaStatusRow[] = [];

  const pageSize = 1000;
  let from = 0;

  while (true) {
    const {
      data,
      error,
    } = await supabaseAdmin
      .from('warga')
      .select(`
        status_penduduk,
        jenis_kelamin
      `)
      .eq('aktif', true)
      .range(
        from,
        from + pageSize - 1
      );

    if (error) {
      console.error(
        'Gagal mengambil data status penduduk:',
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
        []) as WargaStatusRow[];

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

function kelompokkanStatusPenduduk(
  wargaRows:
    WargaStatusRow[]
): StatistikStatusPenduduk[] {
  const statistik:
    StatistikStatusPenduduk[] = [
    {
      key: 'tetap',
      label: 'Penduduk Tetap',
      jumlah: 0,
      lakiLaki: 0,
      perempuan: 0,
    },
    {
      key: 'tidak-tetap',
      label:
        'Penduduk Tidak Tetap',
      jumlah: 0,
      lakiLaki: 0,
      perempuan: 0,
    },
    {
      key: 'belum-mengisi',
      label: 'Belum Mengisi',
      jumlah: 0,
      lakiLaki: 0,
      perempuan: 0,
    },
  ];

  wargaRows.forEach(
    (warga) => {
      let target:
        StatistikStatusPenduduk;

      if (
        warga.status_penduduk ===
        'TETAP'
      ) {
        target =
          statistik[0];
      } else if (
        warga.status_penduduk ===
        'TIDAK_TETAP'
      ) {
        target =
          statistik[1];
      } else {
        target =
          statistik[2];
      }

      target.jumlah += 1;

      if (
        warga.jenis_kelamin ===
        'L'
      ) {
        target.lakiLaki += 1;
      }

      if (
        warga.jenis_kelamin ===
        'P'
      ) {
        target.perempuan += 1;
      }
    }
  );

  return statistik;
}

function formatAngka(
  value: number
) {
  return new Intl.NumberFormat(
    'id-ID'
  ).format(value);
}

export default async function StatusPendudukPage() {
  const [
    wargaRows,
    layananResult,
    profilResult,
  ] = await Promise.all([
    getAllWargaStatus(),

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

  const statistik =
    kelompokkanStatusPenduduk(
      wargaRows
    );

  const totalPenduduk =
    wargaRows.length;

  const pendudukTetap =
    statistik[0].jumlah;

  const pendudukTidakTetap =
    statistik[1].jumlah;

  const belumMengisi =
    statistik[2].jumlah;

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-cyan-700">
            <MapPin size={16} />
            Data Desa
          </div>

          <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
            Status Penduduk
          </h1>

          <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-500 md:text-base">
            Informasi jumlah penduduk tetap dan
            penduduk tidak tetap Desa Keji
            berdasarkan data administrasi warga aktif.
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
              />

              <StatistikCard
                label="Penduduk Tetap"
                value={formatAngka(
                  pendudukTetap
                )}
                description="Berdomisili tetap"
                icon={Home}
              />

              <StatistikCard
                label="Tidak Tetap"
                value={formatAngka(
                  pendudukTidakTetap
                )}
                description="Domisili tidak tetap"
                icon={MapPin}
              />

              <StatistikCard
                label="Belum Mengisi"
                value={formatAngka(
                  belumMengisi
                )}
                description="Status belum dilengkapi"
                icon={CircleAlert}
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
                    Status penduduk dikelola melalui
                    halaman admin warga. Perubahan status
                    atau penonaktifan warga akan langsung
                    memengaruhi grafik dan tabel statistik
                    pada halaman ini.
                  </p>
                </div>
              </div>
            </section>

            {/* Penjelasan */}
            <section className="grid gap-4 sm:grid-cols-2">
              <article className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <BadgeCheck
                    size={21}
                  />
                </div>

                <h2 className="font-extrabold text-slate-800">
                  Penduduk Tetap
                </h2>

                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">
                  Warga yang tercatat dan berdomisili
                  tetap di wilayah administrasi Desa
                  Keji.
                </p>
              </article>

              <article className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                  <MapPin
                    size={21}
                  />
                </div>

                <h2 className="font-extrabold text-slate-800">
                  Penduduk Tidak Tetap
                </h2>

                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">
                  Warga yang tinggal sementara atau
                  belum berstatus sebagai penduduk tetap
                  Desa Keji.
                </p>
              </article>
            </section>

            {/* Grafik dan Tabel */}
            <StatusPendudukCharts
              data={statistik}
              totalPenduduk={
                totalPenduduk
              }
              tahunData={tahunData}
            />
          </main>

          {/* Sidebar */}
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
}: {
  label: string;
  value: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-cyan-100 bg-white p-5 shadow-sm">
      <div className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-cyan-50" />

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
            {label}
          </p>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700">
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