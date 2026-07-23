// app/(public)/desa-anti-korupsi/page.tsx

import Link from 'next/link';

import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Building2,
  CheckCircle2,
  FileSearch,
  HandCoins,
  Landmark,
  Megaphone,
  Scale,
  ShieldCheck,
  Siren,
  Users,
  WalletCards,
  type LucideIcon,
} from 'lucide-react';

import SidebarLayanan from '@/components/SidebarLayanan';

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
  id: number;
  nama: string;
  slug: string;
}

interface RincianAnggaran {
  nama: string;
  nominal: number;
}

interface BidangBelanja {
  nama: string;
  nominal: number;
  icon: LucideIcon;
  rincian: RincianAnggaran[];
}

const TOTAL_PENDAPATAN =
  1_727_081_000;

const TOTAL_BELANJA =
  1_810_178_246;

const DEFISIT =
  83_097_246;

const TOTAL_PEMBIAYAAN =
  83_097_246;

const pendapatanDesa = [
  {
    nama:
      'Pendapatan Asli Desa',
    nominal:
      172_790_000,
    rincian: [],
  },
  {
    nama:
      'Pendapatan Transfer',
    nominal:
      1_554_291_000,
    rincian: [
      {
        nama: 'Dana Desa',
        nominal:
          373_456_000,
      },
      {
        nama:
          'Bagi Hasil Pajak dan Retribusi',
        nominal:
          196_059_000,
      },
      {
        nama:
          'Alokasi Dana Desa',
        nominal:
          419_776_000,
      },
      {
        nama:
          'Bantuan Keuangan Provinsi',
        nominal:
          500_000_000,
      },
      {
        nama:
          'Bantuan Keuangan Kabupaten/Kota',
        nominal:
          65_000_000,
      },
    ],
  },
];

const bidangBelanja:
  BidangBelanja[] = [
    {
      nama:
        'Penyelenggaraan Pemerintahan Desa',

      nominal:
        787_286_316,

      icon: Building2,

      rincian: [
        {
          nama:
            'Penyelenggaraan Belanja Siltap, Tunjangan, dan Operasional Pemerintah Desa',

          nominal:
            742_836_316,
        },
        {
          nama:
            'Pengelolaan Administrasi Kependudukan, Pencatatan Sipil, Statistik, dan Kearsipan',

          nominal:
            5_000_000,
        },
        {
          nama:
            'Penyelenggaraan Tata Praja Pemerintahan, Perencanaan, Keuangan, dan Pelaporan',

          nominal:
            39_450_000,
        },
      ],
    },
    {
      nama:
        'Pelaksanaan Pembangunan Desa',

      nominal:
        677_650_965,

      icon: Landmark,

      rincian: [
        {
          nama:
            'Subbidang Pendidikan',

          nominal:
            15_150_965,
        },
        {
          nama:
            'Subbidang Kesehatan',

          nominal:
            97_500_000,
        },
        {
          nama:
            'Subbidang Pekerjaan Umum dan Penataan Ruang',

          nominal:
            560_000_000,
        },
        {
          nama:
            'Subbidang Kawasan Permukiman',

          nominal:
            5_000_000,
        },
      ],
    },
    {
      nama:
        'Pembinaan Kemasyarakatan',

      nominal:
        237_483_378,

      icon: Users,

      rincian: [
        {
          nama:
            'Subbidang Ketenteraman, Ketertiban Umum, dan Perlindungan Masyarakat',

          nominal:
            10_000_000,
        },
        {
          nama:
            'Subbidang Kebudayaan dan Keagamaan',

          nominal:
            35_000_000,
        },
        {
          nama:
            'Subbidang Kepemudaan dan Olahraga',

          nominal:
            152_483_378,
        },
        {
          nama:
            'Subbidang Kelembagaan Masyarakat',

          nominal:
            40_000_000,
        },
      ],
    },
    {
      nama:
        'Pemberdayaan Masyarakat',

      nominal:
        59_557_587,

      icon: HandCoins,

      rincian: [
        {
          nama:
            'Subbidang Peningkatan Kapasitas Aparatur Desa',

          nominal:
            50_107_587,
        },
        {
          nama:
            'Subbidang Koperasi, Usaha Mikro Kecil dan Menengah (UMKM)',

          nominal:
            9_450_000,
        },
      ],
    },
    {
      nama:
        'Penanggulangan Bencana, Darurat, dan Mendesak',

      nominal:
        48_200_000,

      icon: Siren,

      rincian: [
        {
          nama:
            'Subbidang Penanggulangan Bencana',

          nominal:
            5_000_000,
        },
        {
          nama:
            'Subbidang Keadaan Mendesak',

          nominal:
            43_200_000,
        },
      ],
    },
  ];

const pembiayaanDesa = [
  {
    nama:
      'Penerimaan Pembiayaan',

    nominal:
      123_097_246,
  },
  {
    nama:
      'Pengeluaran Pembiayaan',

    nominal:
      40_000_000,
  },
];

const prinsipAntiKorupsi = [
  {
    title:
      'Transparansi Anggaran',

    description:
      'Informasi pendapatan, belanja, pembiayaan, dan realisasi anggaran disampaikan secara terbuka.',

    icon: FileSearch,
  },
  {
    title:
      'Pelayanan Tanpa Pungutan',

    description:
      'Pelayanan administrasi desa diberikan sesuai ketentuan dan tidak dipungut biaya.',

    icon: BadgeCheck,
  },
  {
    title:
      'Akuntabilitas Pemerintahan',

    description:
      'Pengelolaan program dan anggaran desa harus dapat dipertanggungjawabkan kepada masyarakat.',

    icon: Scale,
  },
  {
    title:
      'Kanal Pengaduan Terbuka',

    description:
      'Masyarakat dapat menyampaikan laporan, kritik, dan pengaduan melalui saluran resmi Desa Keji.',

    icon: Megaphone,
  },
];

function formatRupiah(
  value: number
) {
  return new Intl.NumberFormat(
    'id-ID',
    {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }
  ).format(value);
}

function formatPersentase(
  nominal: number,
  total: number
) {
  if (total <= 0) {
    return '0%';
  }

  return new Intl.NumberFormat(
    'id-ID',
    {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }
  ).format(
    (nominal / total) * 100
  ) + '%';
}

function getBarWidth(
  nominal: number,
  total: number
) {
  if (total <= 0) {
    return 0;
  }

  return Math.min(
    Math.max(
      (nominal / total) * 100,
      0
    ),
    100
  );
}

async function getDaftarLayanan():
  Promise<PilihanLayanan[]> {
  const {
    data,
    error,
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
    });

  if (error) {
    console.error(
      'Gagal mengambil layanan pada halaman Desa Anti Korupsi:',
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

    return [];
  }

  return (
    (data ?? []) as LayananRow[]
  )
    .map((item) => ({
      id:
        Number(item.id),

      nama:
        String(
          item.nama ?? ''
        ).trim(),

      slug:
        String(
          item.slug ?? ''
        ).trim(),
    }))
    .filter(
      (item) =>
        Number.isFinite(
          item.id
        ) &&
        item.id > 0 &&
        item.nama.length > 0 &&
        item.slug.length > 0
    );
}

export default async function DesaAntiKorupsiPage() {
  const daftarLayanan =
    await getDaftarLayanan();

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-700">
            <ShieldCheck size={16} />

            Pemerintah Desa Keji
          </div>

          <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
            Desa Keji Anti Korupsi
          </h1>

          <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-500 md:text-base">
            Transparansi Anggaran
            Pendapatan dan Belanja Desa
            sebagai bentuk keterbukaan,
            akuntabilitas, dan komitmen
            Pemerintah Desa Keji dalam
            mencegah korupsi.
          </p>
        </header>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <main className="min-w-0 space-y-8 lg:w-2/3">
            {/* Hero */}
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-800 to-teal-700 p-6 text-white shadow-xl shadow-emerald-950/10 md:p-8">
              <div
                className="pointer-events-none absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                    radial-gradient(
                      circle,
                      rgba(
                        255,
                        255,
                        255,
                        0.25
                      ) 1.5px,
                      transparent 1.5px
                    )
                  `,
                  backgroundSize:
                    '25px 25px',
                }}
              />

              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border-[52px] border-white/[0.06]" />

              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/10 shadow-lg backdrop-blur">
                  <ShieldCheck
                    size={31}
                  />
                </div>

                <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-100">
                  Tahun Anggaran 2026
                </p>

                <h2 className="mt-3 max-w-3xl text-2xl font-black leading-tight md:text-3xl">
                  Keji Berani, Keji Anti
                  Korupsi, dan Menjunjung
                  Kejujuran Tinggi
                </h2>

                <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-emerald-50/90 md:text-base md:leading-8">
                  Masyarakat berhak
                  mengetahui arah
                  penggunaan anggaran
                  desa. Data berikut
                  menampilkan pendapatan,
                  belanja, defisit, dan
                  pembiayaan Desa Keji
                  Tahun Anggaran 2026.
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                    <p className="text-xs font-extrabold uppercase tracking-wider text-emerald-100">
                      Komitmen
                    </p>

                    <p className="mt-2 text-sm font-bold leading-relaxed text-white">
                      Transparan,
                      akuntabel, jujur,
                      dan melayani
                      masyarakat.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                    <p className="text-xs font-extrabold uppercase tracking-wider text-emerald-100">
                      Makarti Nyawiji
                    </p>

                    <p className="mt-2 text-sm font-bold leading-relaxed text-white">
                      Bersama membangun
                      Desa Keji yang
                      berintegritas.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Ringkasan APBDes */}
            <section>
              <div className="mb-5">
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-600">
                  Ringkasan Anggaran
                </p>

                <h2 className="mt-2 text-2xl font-black text-slate-900">
                  APBDes Desa Keji 2026
                </h2>

                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">
                  Ringkasan nilai utama
                  Anggaran Pendapatan dan
                  Belanja Desa Keji.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <SummaryCard
                  label="Pendapatan"
                  value={
                    TOTAL_PENDAPATAN
                  }
                  description="Total pendapatan desa"
                  icon={Banknote}
                  variant="emerald"
                />

                <SummaryCard
                  label="Belanja"
                  value={
                    TOTAL_BELANJA
                  }
                  description="Total belanja desa"
                  icon={WalletCards}
                  variant="slate"
                />

                <SummaryCard
                  label="Defisit"
                  value={DEFISIT}
                  description="Selisih pendapatan dan belanja"
                  icon={Scale}
                  variant="amber"
                />

                <SummaryCard
                  label="Pembiayaan Neto"
                  value={
                    TOTAL_PEMBIAYAAN
                  }
                  description="Pembiayaan untuk menutup defisit"
                  icon={HandCoins}
                  variant="cyan"
                />
              </div>
            </section>

            {/* Pendapatan */}
            <section className="overflow-hidden rounded-3xl border border-emerald-200 bg-white shadow-sm">
              <div className="border-b border-emerald-100 bg-gradient-to-r from-emerald-50 to-white p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-md">
                    <Banknote size={23} />
                  </div>

                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-600">
                      Bagian I
                    </p>

                    <h2 className="mt-2 text-xl font-black text-slate-900 md:text-2xl">
                      Pendapatan Desa
                    </h2>

                    <p className="mt-2 text-sm font-medium text-slate-500">
                      Total{' '}
                      {formatRupiah(
                        TOTAL_PENDAPATAN
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-5 p-5 md:p-8">
                {pendapatanDesa.map(
                  (item) => (
                    <article
                      key={item.nama}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="font-black text-slate-900">
                            {item.nama}
                          </h3>

                          <p className="mt-1 text-xs font-bold text-emerald-700">
                            {formatPersentase(
                              item.nominal,
                              TOTAL_PENDAPATAN
                            )}{' '}
                            dari pendapatan
                          </p>
                        </div>

                        <p className="text-lg font-black text-slate-800">
                          {formatRupiah(
                            item.nominal
                          )}
                        </p>
                      </div>

                      <BudgetBar
                        nominal={
                          item.nominal
                        }
                        total={
                          TOTAL_PENDAPATAN
                        }
                      />

                      {item.rincian.length >
                        0 && (
                        <div className="mt-5 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
                          {item.rincian.map(
                            (
                              rincian
                            ) => (
                              <RincianRow
                                key={
                                  rincian.nama
                                }
                                item={
                                  rincian
                                }
                              />
                            )
                          )}
                        </div>
                      )}
                    </article>
                  )
                )}
              </div>
            </section>

            {/* Belanja */}
            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 bg-gradient-to-r from-slate-100 to-white p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-800 text-white shadow-md">
                    <WalletCards
                      size={23}
                    />
                  </div>

                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-600">
                      Bagian II
                    </p>

                    <h2 className="mt-2 text-xl font-black text-slate-900 md:text-2xl">
                      Belanja Desa
                    </h2>

                    <p className="mt-2 text-sm font-medium text-slate-500">
                      Total{' '}
                      {formatRupiah(
                        TOTAL_BELANJA
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-5 p-5 md:p-8">
                {bidangBelanja.map(
                  (bidang) => (
                    <BelanjaCard
                      key={
                        bidang.nama
                      }
                      bidang={bidang}
                    />
                  )
                )}
              </div>
            </section>

            {/* Defisit */}
            <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6 md:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500 text-white">
                    <Scale size={23} />
                  </div>

                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-amber-700">
                      Surplus / Defisit
                    </p>

                    <h2 className="mt-2 text-xl font-black text-amber-950">
                      Defisit Anggaran
                    </h2>

                    <p className="mt-2 text-sm font-semibold leading-6 text-amber-800">
                      Belanja lebih besar
                      daripada pendapatan
                      dan ditutup melalui
                      pembiayaan neto.
                    </p>
                  </div>
                </div>

                <p className="shrink-0 text-2xl font-black text-amber-900">
                  (
                  {formatRupiah(
                    DEFISIT
                  )}
                  )
                </p>
              </div>
            </section>

            {/* Pembiayaan */}
            <section className="overflow-hidden rounded-3xl border border-cyan-200 bg-white shadow-sm">
              <div className="border-b border-cyan-100 bg-gradient-to-r from-cyan-50 to-white p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-700 text-white shadow-md">
                    <HandCoins
                      size={23}
                    />
                  </div>

                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-cyan-700">
                      Bagian III
                    </p>

                    <h2 className="mt-2 text-xl font-black text-slate-900 md:text-2xl">
                      Pembiayaan Desa
                    </h2>

                    <p className="mt-2 text-sm font-medium text-slate-500">
                      Pembiayaan neto{' '}
                      {formatRupiah(
                        TOTAL_PEMBIAYAAN
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 p-5 sm:grid-cols-2 md:p-8">
                {pembiayaanDesa.map(
                  (item) => (
                    <article
                      key={item.nama}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                    >
                      <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">
                        {item.nama}
                      </p>

                      <p className="mt-3 text-xl font-black text-slate-900">
                        {formatRupiah(
                          item.nominal
                        )}
                      </p>
                    </article>
                  )
                )}
              </div>

              <div className="border-t border-cyan-100 bg-cyan-50 p-5 md:px-8">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-black text-cyan-950">
                    Pembiayaan Neto
                  </p>

                  <p className="text-xl font-black text-cyan-800">
                    {formatRupiah(
                      TOTAL_PEMBIAYAAN
                    )}
                  </p>
                </div>
              </div>
            </section>

            {/* Prinsip anti korupsi */}
            <section>
              <div className="mb-5">
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-600">
                  Komitmen Integritas
                </p>

                <h2 className="mt-2 text-2xl font-black text-slate-900">
                  Prinsip Desa Anti
                  Korupsi
                </h2>

                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">
                  Komitmen Pemerintah
                  Desa Keji dalam
                  membangun tata kelola
                  pemerintahan yang
                  bersih.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {prinsipAntiKorupsi.map(
                  (item) => (
                    <PrinsipCard
                      key={item.title}
                      item={item}
                    />
                  )
                )}
              </div>
            </section>

            {/* Catatan */}
            <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-700 text-white">
                  <CheckCircle2
                    size={23}
                  />
                </div>

                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-700">
                    Keterbukaan Informasi
                  </p>

                  <h2 className="mt-2 text-xl font-black text-emerald-950">
                    Masyarakat dapat ikut
                    mengawasi penggunaan
                    anggaran
                  </h2>

                  <p className="mt-3 text-sm font-semibold leading-7 text-emerald-800">
                    Informasi APBDes
                    disampaikan agar
                    masyarakat memahami
                    sumber pendapatan,
                    arah belanja, dan
                    pembiayaan Desa Keji.
                    Pertanyaan dan
                    pengaduan dapat
                    disampaikan melalui
                    saluran resmi
                    Pemerintah Desa.
                  </p>
                </div>
              </div>
            </section>

            {/* Navigasi */}
            <section className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/informasi-publik/apbdes/2026"
                className="group flex items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-200 hover:shadow-md"
              >
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-emerald-600">
                    Transparansi
                  </p>

                  <h2 className="mt-2 font-black text-slate-900">
                    APBDes 2026
                  </h2>

                  <p className="mt-1 text-xs font-medium text-slate-500">
                    Lihat informasi APBDes
                    Desa Keji.
                  </p>
                </div>

                <ArrowRight
                  size={20}
                  className="shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-emerald-600"
                />
              </Link>

              <Link
                href="/kontak"
                className="group flex items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-200 hover:shadow-md"
              >
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-emerald-600">
                    Pengawasan
                  </p>

                  <h2 className="mt-2 font-black text-slate-900">
                    Layanan Aduan
                  </h2>

                  <p className="mt-1 text-xs font-medium text-slate-500">
                    Sampaikan laporan
                    melalui WhatsApp.
                  </p>
                </div>

                <ArrowRight
                  size={20}
                  className="shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-emerald-600"
                />
              </Link>
            </section>
          </main>

          {/* Sidebar */}
          <aside className="min-w-0 lg:w-1/3">
            <div className="lg:sticky lg:top-24">
              <SidebarLayanan
                daftarLayanan={
                  daftarLayanan
                }
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  description,
  icon: Icon,
  variant,
}: {
  label: string;
  value: number;
  description: string;
  icon: LucideIcon;

  variant:
    | 'emerald'
    | 'slate'
    | 'amber'
    | 'cyan';
}) {
  const styles = {
    emerald:
      'border-emerald-200 bg-emerald-50 text-emerald-700',

    slate:
      'border-slate-200 bg-white text-slate-700',

    amber:
      'border-amber-200 bg-amber-50 text-amber-700',

    cyan:
      'border-cyan-200 bg-cyan-50 text-cyan-700',
  };

  return (
    <article
      className={`relative overflow-hidden rounded-3xl border p-5 shadow-sm ${styles[variant]}`}
    >
      <div className="pointer-events-none absolute -bottom-10 -right-10 h-28 w-28 rounded-full bg-current opacity-[0.05]" />

      <div className="relative">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-current/10">
          <Icon size={23} />
        </div>

        <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.16em]">
          {label}
        </p>

        <p className="mt-2 text-xl font-black text-slate-900">
          {formatRupiah(value)}
        </p>

        <p className="mt-2 text-xs font-semibold text-slate-500">
          {description}
        </p>
      </div>
    </article>
  );
}

function BudgetBar({
  nominal,
  total,
}: {
  nominal: number;
  total: number;
}) {
  return (
    <div className="mt-4">
      <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-teal-500"
          style={{
            width:
              `${getBarWidth(
                nominal,
                total
              )}%`,
          }}
        />
      </div>
    </div>
  );
}

function RincianRow({
  item,
}: {
  item: RincianAnggaran;
}) {
  return (
    <div className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-start sm:justify-between">
      <p className="text-sm font-semibold leading-6 text-slate-600">
        {item.nama}
      </p>

      <p className="shrink-0 text-sm font-black text-slate-800">
        {formatRupiah(
          item.nominal
        )}
      </p>
    </div>
  );
}

function BelanjaCard({
  bidang,
}: {
  bidang: BidangBelanja;
}) {
  const Icon =
    bidang.icon;

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
      <div className="p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <Icon size={21} />
            </div>

            <div>
              <h3 className="font-black leading-relaxed text-slate-900">
                {bidang.nama}
              </h3>

              <p className="mt-1 text-xs font-bold text-emerald-700">
                {formatPersentase(
                  bidang.nominal,
                  TOTAL_BELANJA
                )}{' '}
                dari belanja
              </p>
            </div>
          </div>

          <p className="shrink-0 text-lg font-black text-slate-800">
            {formatRupiah(
              bidang.nominal
            )}
          </p>
        </div>

        <BudgetBar
          nominal={
            bidang.nominal
          }
          total={TOTAL_BELANJA}
        />
      </div>

      <div className="divide-y divide-slate-200 border-t border-slate-200 bg-white">
        {bidang.rincian.map(
          (item) => (
            <RincianRow
              key={item.nama}
              item={item}
            />
          )
        )}
      </div>
    </article>
  );
}

function PrinsipCard({
  item,
}: {
  item: {
    title: string;
    description: string;
    icon: LucideIcon;
  };
}) {
  const Icon =
    item.icon;

  return (
    <article className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 transition group-hover:bg-emerald-700 group-hover:text-white">
        <Icon size={23} />
      </div>

      <h3 className="mt-4 font-black text-slate-900">
        {item.title}
      </h3>

      <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
        {item.description}
      </p>
    </article>
  );
}