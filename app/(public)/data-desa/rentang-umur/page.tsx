// app/(public)/data-desa/rentang-umur/page.tsx

import {
  CalendarDays,
  CircleAlert,
  Clock3,
  Database,
  UserRoundCheck,
  Users,
} from 'lucide-react';

import type {
  LucideIcon,
} from 'lucide-react';

import SidebarLayanan from '@/components/SidebarLayanan';

import RentangUmurCharts, {
  type StatistikRentangUmur,
} from '@/components/public/RentangUmurCharts';

import {
  supabaseAdmin,
} from '@/lib/supabase-admin';

import type {
  PilihanLayanan,
} from '@/types/layanan';

export const dynamic =
  'force-dynamic';

export const revalidate = 0;

interface WargaRentangUmurRow {
  tanggal_lahir:
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

interface DefinisiRentangUmur {
  key: string;
  label: string;
  min: number;
  max: number;
}

interface TanggalSekarang {
  tahun: number;
  bulan: number;
  tanggal: number;
}

const DEFINISI_RENTANG:
  DefinisiRentangUmur[] = [
  {
    key: '0-1',
    label: '0 s/d 1 Tahun',
    min: 0,
    max: 1,
  },
  {
    key: '2-4',
    label: '2 s/d 4 Tahun',
    min: 2,
    max: 4,
  },
  {
    key: '5-9',
    label: '5 s/d 9 Tahun',
    min: 5,
    max: 9,
  },
  {
    key: '10-14',
    label: '10 s/d 14 Tahun',
    min: 10,
    max: 14,
  },
  {
    key: '15-19',
    label: '15 s/d 19 Tahun',
    min: 15,
    max: 19,
  },
  {
    key: '20-24',
    label: '20 s/d 24 Tahun',
    min: 20,
    max: 24,
  },
  {
    key: '25-29',
    label: '25 s/d 29 Tahun',
    min: 25,
    max: 29,
  },
  {
    key: '30-34',
    label: '30 s/d 34 Tahun',
    min: 30,
    max: 34,
  },
  {
    key: '35-39',
    label: '35 s/d 39 Tahun',
    min: 35,
    max: 39,
  },
  {
    key: '40-44',
    label: '40 s/d 44 Tahun',
    min: 40,
    max: 44,
  },
  {
    key: '45-49',
    label: '45 s/d 49 Tahun',
    min: 45,
    max: 49,
  },
  {
    key: '50-54',
    label: '50 s/d 54 Tahun',
    min: 50,
    max: 54,
  },
  {
    key: '55-59',
    label: '55 s/d 59 Tahun',
    min: 55,
    max: 59,
  },
  {
    key: '60-64',
    label: '60 s/d 64 Tahun',
    min: 60,
    max: 64,
  },
  {
    key: '65-69',
    label: '65 s/d 69 Tahun',
    min: 65,
    max: 69,
  },
  {
    key: '70-74',
    label: '70 s/d 74 Tahun',
    min: 70,
    max: 74,
  },
  {
    key: '75-plus',
    label: '75 Tahun ke Atas',
    min: 75,
    max: 150,
  },
];

async function getAllWargaRentangUmur(): Promise<
  WargaRentangUmurRow[]
> {
  const result:
    WargaRentangUmurRow[] = [];

  const pageSize = 1000;
  let from = 0;

  while (true) {
    const {
      data,
      error,
    } = await supabaseAdmin
      .from('warga')
      .select(`
        tanggal_lahir,
        jenis_kelamin
      `)
      .eq('aktif', true)
      .range(
        from,
        from + pageSize - 1
      );

    if (error) {
      console.error(
        'Gagal mengambil data rentang umur:',
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
        []) as WargaRentangUmurRow[];

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

function getTanggalJakarta(): TanggalSekarang {
  const bagian =
    new Intl.DateTimeFormat(
      'en-US',
      {
        timeZone:
          'Asia/Jakarta',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }
    ).formatToParts(
      new Date()
    );

  const getValue = (
    type:
      | 'year'
      | 'month'
      | 'day'
  ) =>
    Number(
      bagian.find(
        (item) =>
          item.type === type
      )?.value ?? 0
    );

  return {
    tahun:
      getValue('year'),

    bulan:
      getValue('month'),

    tanggal:
      getValue('day'),
  };
}

function hitungUmur(
  tanggalLahir: string | null,
  tanggalSekarang: TanggalSekarang
) {
  if (!tanggalLahir) {
    return null;
  }

  const [
    tahunLahir,
    bulanLahir,
    hariLahir,
  ] = tanggalLahir
    .split('-')
    .map(Number);

  if (
    !tahunLahir ||
    !bulanLahir ||
    !hariLahir
  ) {
    return null;
  }

  let umur =
    tanggalSekarang.tahun -
    tahunLahir;

  const belumUlangTahun =
    tanggalSekarang.bulan <
      bulanLahir ||
    (
      tanggalSekarang.bulan ===
        bulanLahir &&
      tanggalSekarang.tanggal <
        hariLahir
    );

  if (belumUlangTahun) {
    umur -= 1;
  }

  if (
    umur < 0 ||
    umur > 150
  ) {
    return null;
  }

  return umur;
}

function kelompokkanRentangUmur(
  wargaRows:
    WargaRentangUmurRow[]
): StatistikRentangUmur[] {
  const tanggalSekarang =
    getTanggalJakarta();

  const statistik =
    DEFINISI_RENTANG.map(
      (rentang) => ({
        key: rentang.key,
        label: rentang.label,
        jumlah: 0,
        lakiLaki: 0,
        perempuan: 0,
      })
    );

  const belumMengisi:
    StatistikRentangUmur = {
    key: 'belum-mengisi',
    label: 'Belum Mengisi',
    jumlah: 0,
    lakiLaki: 0,
    perempuan: 0,
  };

  wargaRows.forEach(
    (warga) => {
      const umur =
        hitungUmur(
          warga.tanggal_lahir,
          tanggalSekarang
        );

      let target:
        StatistikRentangUmur;

      if (umur === null) {
        target =
          belumMengisi;
      } else {
        const index =
          DEFINISI_RENTANG.findIndex(
            (rentang) =>
              umur >=
                rentang.min &&
              umur <=
                rentang.max
          );

        target =
          index >= 0
            ? statistik[index]
            : belumMengisi;
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

  return [
    ...statistik,
    belumMengisi,
  ];
}

function formatAngka(
  value: number
) {
  return new Intl.NumberFormat(
    'id-ID'
  ).format(value);
}

export default async function RentangUmurPage() {
  const [
    wargaRows,
    layananResult,
    profilResult,
  ] = await Promise.all([
    getAllWargaRentangUmur(),

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
    kelompokkanRentangUmur(
      wargaRows
    );

  const totalPenduduk =
    wargaRows.length;

  const totalLakiLaki =
    wargaRows.filter(
      (warga) =>
        warga.jenis_kelamin ===
        'L'
    ).length;

  const totalPerempuan =
    wargaRows.filter(
      (warga) =>
        warga.jenis_kelamin ===
        'P'
    ).length;

  const jumlahTanggalLahirTerisi =
    wargaRows.filter(
      (warga) =>
        Boolean(
          warga.tanggal_lahir
        )
    ).length;

  const belumMengisi =
    totalPenduduk -
    jumlahTanggalLahirTerisi;

  const kelompokTerbanyak =
    statistik
      .filter(
        (item) =>
          item.key !==
          'belum-mengisi'
      )
      .reduce<
        | StatistikRentangUmur
        | null
      >(
        (
          terbesar,
          item
        ) => {
          if (
            !terbesar ||
            item.jumlah >
              terbesar.jumlah
          ) {
            return item;
          }

          return terbesar;
        },
        null
      );

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-cyan-700">
            <CalendarDays
              size={16}
            />

            Data Desa
          </div>

          <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
            Data Rentang Umur
          </h1>

          <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-500 md:text-base">
            Informasi persebaran
            umur penduduk Desa Keji
            berdasarkan tanggal lahir
            warga yang terdaftar pada
            database desa.
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
                label="Tanggal Lahir Terisi"
                value={formatAngka(
                  jumlahTanggalLahirTerisi
                )}
                description="Data lengkap"
                icon={
                  UserRoundCheck
                }
              />

              <StatistikCard
                label="Belum Mengisi"
                value={formatAngka(
                  belumMengisi
                )}
                description="Tanggal lahir kosong"
                icon={CircleAlert}
              />

              <StatistikCard
                label="Kelompok Terbanyak"
                value={
                  kelompokTerbanyak
                    ?.label ?? '-'
                }
                description={
                  kelompokTerbanyak
                    ? `${formatAngka(
                        kelompokTerbanyak.jumlah
                      )} jiwa`
                    : 'Belum ada data'
                }
                icon={Clock3}
                smallValue
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
                    Rentang umur
                    dihitung otomatis
                    dari tanggal lahir
                    warga aktif yang
                    dimasukkan melalui
                    halaman admin.
                    Umur akan berubah
                    secara otomatis
                    sesuai tanggal
                    berjalan tanpa
                    perlu diperbarui
                    secara manual.
                  </p>
                </div>
              </div>
            </section>

            {/* Grafik */}
            <RentangUmurCharts
              data={statistik}
              totalPenduduk={
                totalPenduduk
              }
              totalLakiLaki={
                totalLakiLaki
              }
              totalPerempuan={
                totalPerempuan
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
  smallValue = false,
}: {
  label: string;
  value: string;
  description: string;
  icon: LucideIcon;
  smallValue?: boolean;
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

        <p
          className={`mt-3 font-black text-slate-900 ${
            smallValue
              ? 'text-base leading-snug'
              : 'text-3xl'
          }`}
        >
          {value}
        </p>

        <p className="mt-1 text-xs font-bold text-cyan-700">
          {description}
        </p>
      </div>
    </article>
  );
}