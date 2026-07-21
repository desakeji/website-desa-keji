// app/(public)/data-desa/kategori-umur/page.tsx

import {
  Baby,
  CalendarDays,
  CircleAlert,
  Database,
  PieChart,
  Users,
} from 'lucide-react';

import type {
  LucideIcon,
} from 'lucide-react';

import SidebarLayanan from '@/components/SidebarLayanan';

import KategoriUmurCharts, {
  type StatistikKategoriUmur,
} from '@/components/public/KategoriUmurCharts';

import {
  supabaseAdmin,
} from '@/lib/supabase-admin';

import type {
  PilihanLayanan,
} from '@/types/layanan';

export const dynamic =
  'force-dynamic';

export const revalidate = 0;

interface WargaKategoriUmurRow {
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

interface DefinisiKategoriUmur {
  key: string;
  label: string;
  rentang: string;
  min: number;
  max: number;
}

interface TanggalSekarang {
  tahun: number;
  bulan: number;
  tanggal: number;
}

const DEFINISI_KATEGORI:
  DefinisiKategoriUmur[] = [
  {
    key: 'balita',
    label: 'Balita',
    rentang: '0–4 tahun',
    min: 0,
    max: 4,
  },
  {
    key: 'anak',
    label: 'Anak-anak',
    rentang: '5–14 tahun',
    min: 5,
    max: 14,
  },
  {
    key: 'dewasa',
    label: 'Dewasa',
    rentang: '15–44 tahun',
    min: 15,
    max: 44,
  },
  {
    key: 'pra-lansia',
    label: 'Tua / Pra-Lansia',
    rentang: '45–59 tahun',
    min: 45,
    max: 59,
  },
  {
    key: 'lansia',
    label: 'Lansia',
    rentang: '60 tahun ke atas',
    min: 60,
    max: 150,
  },
];

async function getAllWargaKategoriUmur(): Promise<
  WargaKategoriUmurRow[]
> {
  const result:
    WargaKategoriUmurRow[] = [];

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
        'Gagal mengambil data kategori umur:',
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
        []) as WargaKategoriUmurRow[];

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

function getTanggalJakarta():
  TanggalSekarang {
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

  function getValue(
    type:
      | 'year'
      | 'month'
      | 'day'
  ) {
    return Number(
      bagian.find(
        (item) =>
          item.type === type
      )?.value ?? 0
    );
  }

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
  tanggalLahir:
    | string
    | null,
  tanggalSekarang:
    TanggalSekarang
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

function kelompokkanKategoriUmur(
  wargaRows:
    WargaKategoriUmurRow[]
): StatistikKategoriUmur[] {
  const tanggalSekarang =
    getTanggalJakarta();

  const statistik =
    DEFINISI_KATEGORI.map(
      (kategori) => ({
        key:
          kategori.key,

        label:
          kategori.label,

        rentang:
          kategori.rentang,

        jumlah: 0,
        lakiLaki: 0,
        perempuan: 0,
      })
    );

  const belumMengisi:
    StatistikKategoriUmur = {
    key: 'belum-mengisi',
    label: 'Belum Mengisi',
    rentang:
      'Tanggal lahir belum tersedia',
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
        StatistikKategoriUmur;

      if (umur === null) {
        target =
          belumMengisi;
      } else {
        const index =
          DEFINISI_KATEGORI.findIndex(
            (kategori) =>
              umur >=
                kategori.min &&
              umur <=
                kategori.max
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

export default async function KategoriUmurPage() {
  const [
    wargaRows,
    layananResult,
    profilResult,
  ] = await Promise.all([
    getAllWargaKategoriUmur(),

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
    kelompokkanKategoriUmur(
      wargaRows
    );

  const totalPenduduk =
    wargaRows.length;

  const dataUmurTerisi =
    statistik
      .filter(
        (item) =>
          item.key !==
          'belum-mengisi'
      )
      .reduce(
        (total, item) =>
          total +
          item.jumlah,
        0
      );

  const belumMengisi =
    statistik.find(
      (item) =>
        item.key ===
        'belum-mengisi'
    )?.jumlah ?? 0;

  const kategoriTerbanyak =
    statistik
      .filter(
        (item) =>
          item.key !==
          'belum-mengisi'
      )
      .reduce<
        | StatistikKategoriUmur
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
            <Baby size={16} />
            Data Desa
          </div>

          <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
            Kategori Umur Penduduk
          </h1>

          <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-500 md:text-base">
            Informasi kelompok umur
            penduduk Desa Keji mulai
            dari balita, anak-anak,
            dewasa, pra-lansia,
            hingga lansia.
          </p>
        </header>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* Konten Utama */}
          <main className="min-w-0 space-y-6 lg:w-2/3">
            {/* Statistik Ringkas */}
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
                label="Data Umur Terisi"
                value={formatAngka(
                  dataUmurTerisi
                )}
                description="Tanggal lahir tersedia"
                icon={CalendarDays}
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
                label="Kategori Terbanyak"
                value={
                  kategoriTerbanyak
                    ?.label ?? '-'
                }
                description={
                  kategoriTerbanyak
                    ? `${formatAngka(
                        kategoriTerbanyak.jumlah
                      )} jiwa`
                    : 'Belum ada data'
                }
                icon={PieChart}
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
                    Perhitungan Otomatis
                  </h2>

                  <p className="mt-1 text-sm font-medium leading-relaxed text-cyan-800">
                    Kategori umur
                    dihitung otomatis
                    dari tanggal lahir
                    warga aktif yang
                    dimasukkan oleh
                    admin. Perubahan
                    data warga akan
                    langsung
                    memengaruhi grafik
                    dan tabel kategori
                    umur.
                  </p>
                </div>
              </div>
            </section>

            {/* Grafik dan Tabel */}
            <KategoriUmurCharts
              data={statistik}
              totalPenduduk={
                totalPenduduk
              }
              tahunData={tahunData}
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