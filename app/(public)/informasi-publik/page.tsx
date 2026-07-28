// app/(public)/informasi-publik/page.tsx

import Link from 'next/link';

import {
  ArrowRight,
  CalendarDays,
  FileText,
  Info,
  Landmark,
  Scale,
  ShieldCheck,
  Wallet,
  type LucideIcon,
} from 'lucide-react';

export const metadata = {
  title: 'Informasi Publik | SIJI Desa Keji',
  description:
    'Pusat informasi publik Pemerintah Desa Keji yang memuat produk hukum, informasi umum, dan realisasi APBDes.',
};

interface MenuInformasi {
  title: string;
  description: string;
  href: string;
  label: string;
  icon: LucideIcon;
}

interface ApbdesItem {
  tahun: number;
  description: string;
  href: string;
}

const menuInformasi: MenuInformasi[] = [
  {
    title: 'Produk Hukum',
    description:
      'Dokumen peraturan desa, peraturan kepala desa, keputusan kepala desa, dan produk hukum lainnya yang berlaku di Desa Keji.',
    href: '/informasi-publik/produk-hukum',
    label: 'Dokumen Resmi',
    icon: Scale,
  },
  {
    title: 'Informasi Umum',
    description:
      'Kumpulan dokumen dan informasi umum mengenai pemerintahan, pembangunan, pelayanan, serta kegiatan Desa Keji.',
    href: '/informasi-publik/informasi-umum',
    label: 'Informasi Desa',
    icon: Info,
  },
];

const daftarApbdes: ApbdesItem[] = [
  {
    tahun: 2024,
    description:
      'Informasi anggaran pendapatan, belanja, pembiayaan, serta realisasi APBDes Desa Keji Tahun 2024.',
    href: '/informasi-publik/apbdes/2024',
  },
  {
    tahun: 2025,
    description:
      'Informasi anggaran pendapatan, belanja, pembiayaan, serta realisasi APBDes Desa Keji Tahun 2025.',
    href: '/informasi-publik/apbdes/2025',
  },
  {
    tahun: 2026,
    description:
      'Informasi anggaran pendapatan, belanja, pembiayaan, serta realisasi APBDes Desa Keji Tahun 2026.',
    href: '/informasi-publik/apbdes/2026',
  },
];

export default function InformasiPublikPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-emerald-950 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="pointer-events-none absolute -right-28 -top-28 h-96 w-96 rounded-full border-[64px] border-white/[0.04]" />

        <div className="pointer-events-none absolute -bottom-44 -left-32 h-96 w-96 rounded-full bg-emerald-400/[0.08] blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.17em] text-emerald-100 backdrop-blur">
              <ShieldCheck size={15} />
              Transparansi Desa
            </div>

            <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-300">
              Sistem Informasi Keji
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
              Informasi Publik
            </h1>

            <p className="mt-6 max-w-3xl text-sm font-medium leading-7 text-emerald-50/85 md:text-base md:leading-8">
              Pusat keterbukaan informasi Pemerintah Desa Keji yang
              menyediakan produk hukum, informasi umum, serta informasi
              anggaran dan realisasi APBDes secara mudah dan transparan.
            </p>
          </div>
        </div>
      </section>

      {/* Ringkasan */}
      <section className="relative z-10 -mt-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10 sm:grid-cols-3">
            <SummaryItem
              icon={FileText}
              value="Dokumen"
              label="Informasi Resmi"
            />

            <SummaryItem
              icon={Landmark}
              value="Terbuka"
              label="Akses Masyarakat"
            />

            <SummaryItem
              icon={CalendarDays}
              value="2024–2026"
              label="Data APBDes"
            />
          </div>
        </div>
      </section>

      {/* Menu utama */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Dokumen dan informasi desa"
            title="Akses informasi resmi Desa Keji"
            description="Pilih kategori informasi yang ingin dilihat. Seluruh dokumen disusun untuk mendukung keterbukaan, akuntabilitas, dan kemudahan akses informasi masyarakat."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {menuInformasi.map((item) => (
              <InformasiCard
                key={item.title}
                item={item}
              />
            ))}
          </div>
        </div>
      </section>

      {/* APBDes */}
      <section className="border-y border-slate-200 bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Transparansi anggaran"
              title="Realisasi APBDes Desa Keji"
              description="Informasi mengenai pendapatan, belanja, pembiayaan, dan realisasi Anggaran Pendapatan dan Belanja Desa Keji."
              compact
            />

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <Wallet size={27} />
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {daftarApbdes.map((item) => (
              <ApbdesCard
                key={item.tahun}
                item={item}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Prinsip keterbukaan */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-950 via-emerald-800 to-teal-700 p-7 text-white shadow-xl md:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.18]"
              style={{
                backgroundImage:
                  'radial-gradient(circle, rgba(255,255,255,0.35) 1px, transparent 1px)',
                backgroundSize: '26px 26px',
              }}
            />

            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border-[50px] border-white/[0.05]" />

            <div className="relative grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-200">
                  Komitmen Pemerintah Desa
                </p>

                <h2 className="mt-3 text-3xl font-black leading-tight md:text-4xl">
                  Informasi desa yang transparan, akurat, dan mudah diakses
                </h2>

                <p className="mt-5 max-w-2xl text-sm font-medium leading-7 text-emerald-50/85 md:text-base">
                  Pemerintah Desa Keji berkomitmen menyediakan informasi
                  publik sebagai bentuk keterbukaan penyelenggaraan
                  pemerintahan dan pertanggungjawaban kepada masyarakat.
                </p>
              </div>

              <div className="grid gap-3">
                <CommitmentItem
                  title="Transparan"
                  description="Informasi disampaikan secara terbuka kepada masyarakat."
                />

                <CommitmentItem
                  title="Akuntabel"
                  description="Dokumen dapat dipertanggungjawabkan sesuai kewenangan desa."
                />

                <CommitmentItem
                  title="Mudah Diakses"
                  description="Informasi dapat diakses melalui SIJI kapan pun diperlukan."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Penutup */}
      <section className="border-t border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
            <FileText size={27} />
          </div>

          <h2 className="mt-5 text-2xl font-black text-slate-900 md:text-3xl">
            Memerlukan informasi lainnya?
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-500">
            Permohonan informasi publik dapat diajukan melalui layanan PPID
            Desa Keji.
          </p>

          <Link
            href="/ppid/permohonan-informasi"
            className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 text-sm font-extrabold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-emerald-800"
          >
            Ajukan Permohonan Informasi
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </div>
  );
}

function SummaryItem({
  icon: Icon,
  value,
  label,
}: {
  icon: LucideIcon;
  value: string;
  label: string;
}) {
  return (
    <article className="flex items-center gap-4 border-b border-slate-200 p-6 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
        <Icon size={23} />
      </div>

      <div>
        <p className="text-lg font-black text-slate-900">
          {value}
        </p>

        <p className="mt-1 text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">
          {label}
        </p>
      </div>
    </article>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  compact = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  compact?: boolean;
}) {
  return (
    <div className={compact ? 'max-w-3xl' : 'max-w-4xl'}>
      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-700">
        {eyebrow}
      </p>

      <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
        {title}
      </h2>

      <p className="mt-4 text-sm font-medium leading-7 text-slate-500 md:text-base">
        {description}
      </p>
    </div>
  );
}

function InformasiCard({
  item,
}: {
  item: MenuInformasi;
}) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl md:p-7"
    >
      <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-emerald-100 opacity-60 transition duration-300 group-hover:scale-125" />

      <div className="relative">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 transition group-hover:bg-emerald-700 group-hover:text-white">
          <Icon size={26} />
        </div>

        <p className="mt-6 text-[10px] font-extrabold uppercase tracking-[0.16em] text-emerald-600">
          {item.label}
        </p>

        <h3 className="mt-2 text-2xl font-black text-slate-900">
          {item.title}
        </h3>

        <p className="mt-4 text-sm font-medium leading-7 text-slate-500">
          {item.description}
        </p>

        <span className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-emerald-700">
          Lihat informasi
          <ArrowRight
            size={17}
            className="transition group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}

function ApbdesCard({
  item,
}: {
  item: ApbdesItem;
}) {
  return (
    <Link
      href={item.href}
      className="group overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:bg-white hover:shadow-xl"
    >
      <div className="border-b border-slate-200 bg-gradient-to-br from-emerald-900 to-emerald-700 p-6 text-white">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
            <Wallet size={23} />
          </div>

          <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-emerald-100">
            APBDes
          </span>
        </div>

        <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-200">
          Tahun Anggaran
        </p>

        <h3 className="mt-1 text-4xl font-black">
          {item.tahun}
        </h3>
      </div>

      <div className="p-6">
        <p className="text-sm font-medium leading-7 text-slate-500">
          {item.description}
        </p>

        <span className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-emerald-700">
          Lihat realisasi
          <ArrowRight
            size={16}
            className="transition group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}

function CommitmentItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <article className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
      <div className="flex items-start gap-4">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-emerald-200">
          <ShieldCheck size={18} />
        </div>

        <div>
          <h3 className="font-black text-white">
            {title}
          </h3>

          <p className="mt-1 text-xs font-medium leading-6 text-emerald-50/75">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}