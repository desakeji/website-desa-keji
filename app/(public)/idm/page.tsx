// app/(public)/idm/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';

import {
  Activity,
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  Building2,
  CalendarDays,
  CheckCircle2,
  CircleHelp,
  Database,
  FileSearch,
  Gauge,
  HeartPulse,
  Leaf,
  LineChart,
  MapPin,
  ShieldCheck,
  TrendingUp,
  UsersRound,
  WalletCards,
  type LucideIcon,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Status IDM Desa Keji | SIJI',
  description:
    'Informasi status, dimensi, indikator, dan perkembangan Indeks Desa Membangun Desa Keji.',
};

interface DimensiIdm {
  nama: string;
  deskripsi: string;
  icon: LucideIcon;
  indikator: string[];
}

interface RiwayatIdm {
  tahun: number;
  nilai: number;
  status: string;
}

/*
 * Isi data resmi IDM pada bagian ini setelah tersedia.
 *
 * Contoh:
 *
 * const statusIdmTerbaru = {
 *   tahun: 2026,
 *   nilai: 0.8123,
 *   status: 'Mandiri',
 * };
 */
const statusIdmTerbaru: {
  tahun: number;
  nilai: number;
  status: string;
} | null = null;

/*
 * Tambahkan riwayat nilai IDM resmi di sini.
 *
 * Contoh:
 *
 * const riwayatIdm: RiwayatIdm[] = [
 *   {
 *     tahun: 2024,
 *     nilai: 0.7421,
 *     status: 'Maju',
 *   },
 * ];
 */
const riwayatIdm: RiwayatIdm[] = [];

const dimensiIdm: DimensiIdm[] = [
  {
    nama: 'Ketahanan Sosial',
    deskripsi:
      'Menggambarkan kemampuan desa dalam menyediakan layanan dasar dan membangun kualitas kehidupan masyarakat.',
    icon: UsersRound,
    indikator: [
      'Pelayanan kesehatan',
      'Akses pendidikan',
      'Modal sosial masyarakat',
      'Permukiman dan layanan dasar',
    ],
  },
  {
    nama: 'Ketahanan Ekonomi',
    deskripsi:
      'Menggambarkan kemampuan ekonomi lokal, keragaman usaha, akses distribusi, serta dukungan layanan ekonomi.',
    icon: TrendingUp,
    indikator: [
      'Keragaman produksi masyarakat',
      'Akses pusat perdagangan',
      'Akses distribusi dan logistik',
      'Layanan keuangan dan ekonomi',
    ],
  },
  {
    nama: 'Ketahanan Lingkungan',
    deskripsi:
      'Menggambarkan kualitas lingkungan hidup, kesiapsiagaan, dan kemampuan desa menghadapi risiko bencana.',
    icon: Leaf,
    indikator: [
      'Kualitas lingkungan',
      'Potensi pencemaran',
      'Risiko bencana',
      'Kesiapsiagaan masyarakat',
    ],
  },
];

const kategoriStatus = [
  {
    nama: 'Sangat Tertinggal',
    keterangan: 'Kondisi pembangunan desa masih memerlukan intervensi dasar.',
  },
  {
    nama: 'Tertinggal',
    keterangan:
      'Desa masih memerlukan penguatan layanan dasar dan kapasitas pembangunan.',
  },
  {
    nama: 'Berkembang',
    keterangan:
      'Desa menunjukkan perkembangan, tetapi masih memerlukan penguatan pada beberapa dimensi.',
  },
  {
    nama: 'Maju',
    keterangan:
      'Desa memiliki ketahanan sosial, ekonomi, dan lingkungan yang relatif kuat.',
  },
  {
    nama: 'Mandiri',
    keterangan:
      'Desa memiliki kemampuan tinggi dalam mengelola pembangunan secara berkelanjutan.',
  },
];

function formatNilai(value: number) {
  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  }).format(value);
}

export default function StatusIdmPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-slate-50">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-emerald-950 text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/background.png')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#021b16] via-emerald-950/92 to-emerald-900/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#021b16] via-transparent to-black/20" />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.55) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="pointer-events-none absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-emerald-300/10 blur-[110px]" />
        <div className="pointer-events-none absolute -bottom-36 right-0 h-[430px] w-[430px] rounded-full bg-cyan-300/[0.06] blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 md:pb-28 md:pt-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.17em] text-emerald-100 backdrop-blur">
                <BarChart3 size={15} />
                Data Pembangunan Desa
              </div>

              <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.22em] text-emerald-300">
                Indeks Desa Membangun
              </p>

              <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
                Status IDM Desa Keji
              </h1>

              <p className="mt-6 max-w-3xl text-sm font-medium leading-7 text-emerald-50/85 md:text-base md:leading-8">
                Penyajian status, dimensi, dan perkembangan pembangunan Desa
                Keji berdasarkan ketahanan sosial, ekonomi, dan lingkungan.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-xs font-bold backdrop-blur">
                  <MapPin size={16} />
                  Desa Keji
                </span>

                <span className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-xs font-bold backdrop-blur">
                  <Building2 size={16} />
                  Ungaran Barat
                </span>
              </div>
            </div>

            <aside className="rounded-[2rem] border border-white/15 bg-black/25 p-6 shadow-2xl backdrop-blur-xl md:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-emerald-300">
                    Status Terbaru
                  </p>

                  <h2 className="mt-2 text-2xl font-black text-white">
                    {statusIdmTerbaru
                      ? statusIdmTerbaru.status
                      : 'Belum Dipublikasikan'}
                  </h2>
                </div>

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-emerald-200">
                  <Gauge size={26} />
                </div>
              </div>

              {statusIdmTerbaru ? (
                <>
                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.08] p-5">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-emerald-200">
                      Nilai IDM
                    </p>

                    <p className="mt-2 text-4xl font-black tracking-tight text-white">
                      {formatNilai(statusIdmTerbaru.nilai)}
                    </p>
                  </div>

                  <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.08] p-4">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-xs font-bold text-emerald-100/75">
                        Tahun data
                      </p>

                      <p className="text-sm font-black text-white">
                        {statusIdmTerbaru.tahun}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.08] p-5">
                  <p className="text-sm font-semibold leading-7 text-emerald-50/75">
                    Nilai dan status resmi akan ditampilkan setelah data IDM
                    Desa Keji dimasukkan dan diverifikasi oleh administrator.
                  </p>
                </div>
              )}

              <div className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-200/15 bg-emerald-300/10 p-4">
                <ShieldCheck
                  size={19}
                  className="mt-0.5 shrink-0 text-emerald-200"
                />

                <p className="text-xs font-semibold leading-5 text-emerald-50/75">
                  Data pada halaman ini tidak menggunakan nilai perkiraan.
                  Hanya data resmi yang akan dipublikasikan.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Ringkasan mengambang */}
      <section className="relative z-20 -mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 sm:grid-cols-3">
            <SummaryItem
              label="Dimensi Penilaian"
              value="3"
              description="Sosial, ekonomi, dan lingkungan"
              icon={Activity}
              primary
            />

            <SummaryItem
              label="Riwayat Data"
              value={String(riwayatIdm.length)}
              description="Tahun data telah dipublikasikan"
              icon={LineChart}
            />

            <SummaryItem
              label="Status Data"
              value={statusIdmTerbaru ? 'Aktif' : 'Menunggu'}
              description="Menunggu publikasi data resmi"
              icon={Database}
            />
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 lg:px-8">
        {/* Penjelasan */}
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 bg-gradient-to-r from-emerald-50 via-white to-white p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-700 text-white">
                  <BookOpenCheck size={23} />
                </div>

                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-700">
                    Tentang IDM
                  </p>

                  <h2 className="mt-2 text-2xl font-black text-slate-900">
                    Gambaran Pembangunan Desa
                  </h2>
                </div>
              </div>
            </div>

            <div className="space-y-5 p-6 md:p-8">
              <p className="text-sm font-medium leading-7 text-slate-600">
                Indeks Desa Membangun digunakan untuk melihat kondisi
                pembangunan desa melalui tiga dimensi utama. Hasil pengukuran
                membantu pemerintah desa memahami kekuatan, kesenjangan, dan
                kebutuhan prioritas pembangunan.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <InfoCard
                  title="Bahan Evaluasi"
                  description="Membantu melihat perkembangan dan kebutuhan pembangunan desa."
                  icon={FileSearch}
                />

                <InfoCard
                  title="Dasar Perencanaan"
                  description="Mendukung penyusunan program yang lebih tepat sasaran."
                  icon={CalendarDays}
                />
              </div>
            </div>
          </article>

          <aside className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-700 text-white">
                <CheckCircle2 size={23} />
              </div>

              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-700">
                  Transparansi Data
                </p>

                <h2 className="mt-2 text-xl font-black text-emerald-950">
                  Nilai akan ditampilkan setelah diverifikasi
                </h2>

                <p className="mt-3 text-sm font-semibold leading-7 text-emerald-800">
                  Halaman ini disiapkan agar masyarakat dapat melihat status
                  terbaru, riwayat perkembangan, dan rincian dimensi secara
                  terbuka setelah data resmi tersedia.
                </p>
              </div>
            </div>
          </aside>
        </section>

        {/* Tiga dimensi */}
        <section className="mt-10">
          <div className="mb-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-700">
              Komponen Penilaian
            </p>

            <h2 className="mt-2 text-2xl font-black text-slate-900 md:text-3xl">
              Tiga Dimensi IDM
            </h2>

            <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-500">
              Setiap dimensi menggambarkan aspek penting dalam pembangunan dan
              ketahanan Desa Keji.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {dimensiIdm.map((item) => (
              <DimensiCard key={item.nama} item={item} />
            ))}
          </div>
        </section>

        {/* Riwayat */}
        <section className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white p-6 md:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-800 text-white">
                  <LineChart size={23} />
                </div>

                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-700">
                    Perkembangan Tahunan
                  </p>

                  <h2 className="mt-2 text-2xl font-black text-slate-900">
                    Riwayat Status IDM
                  </h2>

                  <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
                    Perbandingan nilai dan status Desa Keji dari tahun ke tahun.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4">
                <p className="text-2xl font-black text-emerald-700">
                  {riwayatIdm.length}
                </p>

                <p className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.13em] text-slate-500">
                  Tahun data
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {riwayatIdm.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] border-separate border-spacing-0">
                  <thead>
                    <tr>
                      <TableHead>Tahun</TableHead>
                      <TableHead>Nilai IDM</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Keterangan</TableHead>
                    </tr>
                  </thead>

                  <tbody>
                    {riwayatIdm.map((item) => (
                      <tr key={item.tahun}>
                        <TableCell>{item.tahun}</TableCell>
                        <TableCell>{formatNilai(item.nilai)}</TableCell>
                        <TableCell>
                          <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-extrabold text-emerald-700">
                            {item.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          Data resmi tahun {item.tahun}
                        </TableCell>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
                <CircleHelp size={46} className="mx-auto text-slate-300" />

                <h3 className="mt-4 text-lg font-black text-slate-900">
                  Riwayat IDM belum tersedia
                </h3>

                <p className="mx-auto mt-2 max-w-xl text-sm font-medium leading-6 text-slate-500">
                  Riwayat nilai, tahun, dan status akan ditampilkan setelah data
                  resmi dimasukkan oleh administrator.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Kategori status */}
        <section className="mt-10">
          <div className="mb-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-700">
              Klasifikasi
            </p>

            <h2 className="mt-2 text-2xl font-black text-slate-900 md:text-3xl">
              Kategori Status Desa
            </h2>

            <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-500">
              Status desa menunjukkan tingkat perkembangan berdasarkan hasil
              pengukuran indikator pembangunan.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {kategoriStatus.map((item, index) => (
              <article
                key={item.nama}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-sm font-black text-emerald-700">
                  {index + 1}
                </div>

                <h3 className="mt-4 font-black text-slate-900">
                  {item.nama}
                </h3>

                <p className="mt-2 text-xs font-medium leading-5 text-slate-500">
                  {item.keterangan}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Navigasi terkait */}
        <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <RelatedLink
            href="/data-desa/populasi-wilayah"
            title="Populasi per Wilayah"
            description="Lihat data kependudukan berdasarkan wilayah."
            icon={MapPin}
          />

          <RelatedLink
            href="/data-desa/rentang-umur"
            title="Data Rentang Umur"
            description="Lihat komposisi penduduk berdasarkan usia."
            icon={HeartPulse}
          />

          <RelatedLink
            href="/pembangunan"
            title="Pembangunan Desa"
            description="Lihat informasi program dan pembangunan Desa Keji."
            icon={WalletCards}
          />
        </section>
      </main>
    </div>
  );
}

function SummaryItem({
  label,
  value,
  description,
  icon: Icon,
  primary = false,
}: {
  label: string;
  value: string;
  description: string;
  icon: LucideIcon;
  primary?: boolean;
}) {
  return (
    <article
      className={`min-h-[165px] p-6 ${
        primary ? 'bg-emerald-800 text-white' : 'bg-white text-slate-900'
      }`}
    >
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl ${
          primary
            ? 'bg-white/10 text-emerald-100'
            : 'bg-emerald-100 text-emerald-700'
        }`}
      >
        <Icon size={21} />
      </div>

      <p
        className={`mt-5 text-[10px] font-extrabold uppercase tracking-[0.15em] ${
          primary ? 'text-emerald-200' : 'text-slate-500'
        }`}
      >
        {label}
      </p>

      <p className="mt-2 text-2xl font-black">{value}</p>

      <p
        className={`mt-2 text-xs font-semibold ${
          primary ? 'text-emerald-100/75' : 'text-slate-500'
        }`}
      >
        {description}
      </p>
    </article>
  );
}

function InfoCard({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm">
        <Icon size={19} />
      </div>

      <h3 className="mt-4 font-black text-slate-900">{title}</h3>

      <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
        {description}
      </p>
    </article>
  );
}

function DimensiCard({ item }: { item: DimensiIdm }) {
  const Icon = item.icon;

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg">
      <div className="border-b border-slate-100 bg-gradient-to-br from-emerald-50 to-white p-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-700 text-white transition group-hover:scale-105">
          <Icon size={23} />
        </div>

        <h3 className="mt-5 text-xl font-black text-slate-900">{item.nama}</h3>

        <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
          {item.deskripsi}
        </p>
      </div>

      <div className="p-6">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-emerald-700">
          Contoh indikator
        </p>

        <div className="mt-4 space-y-3">
          {item.indikator.map((indikator) => (
            <div key={indikator} className="flex items-start gap-3">
              <CheckCircle2
                size={17}
                className="mt-0.5 shrink-0 text-emerald-600"
              />

              <p className="text-sm font-semibold leading-6 text-slate-600">
                {indikator}
              </p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

function TableHead({ children }: { children: React.ReactNode }) {
  return (
    <th className="border-b border-slate-200 bg-slate-50 px-4 py-4 text-left text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-500">
      {children}
    </th>
  );
}

function TableCell({ children }: { children: React.ReactNode }) {
  return (
    <td className="border-b border-slate-100 px-4 py-4 text-sm font-semibold text-slate-600">
      {children}
    </td>
  );
}

function RelatedLink({
  href,
  title,
  description,
  icon: Icon,
}: {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"
    >
      <div className="flex min-w-0 items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 transition group-hover:bg-emerald-700 group-hover:text-white">
          <Icon size={21} />
        </div>

        <div className="min-w-0">
          <h3 className="font-black text-slate-900">{title}</h3>

          <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <ArrowRight
        size={19}
        className="shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-emerald-700"
      />
    </Link>
  );
}