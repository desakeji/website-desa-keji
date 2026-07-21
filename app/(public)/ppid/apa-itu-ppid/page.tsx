// app/(public)/ppid/apa-itu-ppid/page.tsx

import Link from 'next/link';

import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  ClipboardCheck,
  ExternalLink,
  Eye,
  FileCheck2,
  FileSearch,
  Info,
  Landmark,
  Network,
  Scale,
  ShieldCheck,
  Users,
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

interface InformasiCard {
  title: string;
  description: string;
  icon: LucideIcon;
}

const tujuanPPID:
  InformasiCard[] = [
    {
      title:
        'Menjamin Hak Informasi',
      description:
        'Memberikan akses kepada masyarakat untuk memperoleh informasi publik yang berada dalam penguasaan Pemerintah Desa.',
      icon: Eye,
    },
    {
      title:
        'Meningkatkan Transparansi',
      description:
        'Mendorong keterbukaan dalam penyelenggaraan pemerintahan, pelayanan publik, dan pembangunan desa.',
      icon: FileSearch,
    },
    {
      title:
        'Meningkatkan Partisipasi',
      description:
        'Membantu masyarakat memahami kebijakan desa sehingga dapat berpartisipasi dalam pembangunan.',
      icon: Users,
    },
    {
      title:
        'Mewujudkan Akuntabilitas',
      description:
        'Mendorong pengelolaan pemerintahan desa yang tertib, dapat dipertanggungjawabkan, dan dipercaya masyarakat.',
      icon: ShieldCheck,
    },
  ];

const tugasPPID = [
  'Menghimpun dan mengoordinasikan informasi serta dokumentasi dari setiap bagian Pemerintah Desa.',
  'Menyimpan, mendokumentasikan, menyediakan, dan memberikan pelayanan informasi publik.',
  'Melakukan verifikasi terhadap informasi yang akan diberikan atau diumumkan kepada masyarakat.',
  'Memutakhirkan daftar informasi publik secara berkala.',
  'Menentukan informasi yang dapat dibuka dan informasi yang dikecualikan sesuai ketentuan.',
  'Mencatat dan mengelola permohonan informasi publik serta pengajuan keberatan.',
  'Menyusun laporan pelaksanaan pelayanan informasi publik.',
];

const prinsipLayanan:
  InformasiCard[] = [
    {
      title:
        'Mudah dan Sederhana',
      description:
        'Prosedur pelayanan dibuat jelas dan mudah dipahami oleh masyarakat.',
      icon: CheckCircle2,
    },
    {
      title:
        'Cepat dan Tepat Waktu',
      description:
        'Permohonan informasi diproses sesuai jangka waktu yang berlaku.',
      icon: ClipboardCheck,
    },
    {
      title:
        'Biaya Ringan',
      description:
        'Akses informasi tidak dipungut biaya, kecuali biaya penggandaan atau pengiriman dokumen.',
      icon: FileCheck2,
    },
    {
      title:
        'Akurat dan Bertanggung Jawab',
      description:
        'Informasi yang diberikan harus benar, dapat diverifikasi, dan tidak menyesatkan.',
      icon: BookOpenCheck,
    },
  ];

const dasarHukum = [
  {
    title:
      'Undang-Undang Nomor 14 Tahun 2008',
    description:
      'Tentang Keterbukaan Informasi Publik.',
    href:
      'https://peraturan.bpk.go.id/Details/39047/uu-no-14-tahun-2008',
  },
  {
    title:
      'Peraturan Pemerintah Nomor 61 Tahun 2010',
    description:
      'Tentang pelaksanaan Undang-Undang Nomor 14 Tahun 2008.',
    href:
      'https://peraturan.bpk.go.id/Details/5084/pp-no-61-tahun-2010',
  },
  {
    title:
      'Peraturan Komisi Informasi Nomor 1 Tahun 2021',
    description:
      'Tentang Standar Layanan Informasi Publik.',
    href:
      'https://komisiinformasi.go.id/pdf/20230306111128-Perki-1-2021.pdf',
  },
  {
    title:
      'Peraturan Menteri Dalam Negeri Nomor 2 Tahun 2026',
    description:
      'Tentang Pengelolaan Layanan Informasi Publik di Kementerian Dalam Negeri, Pemerintah Daerah, dan Pemerintah Desa.',
    href:
      'https://peraturan.bpk.go.id/Details/345979/permendagri-no-2-tahun-2026',
  },
];

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
      'Gagal mengambil daftar layanan pada halaman PPID:',
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

export default async function ApaItuPpidPage() {
  const daftarLayanan =
    await getDaftarLayanan();

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header halaman */}
        <header className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-700">
            <Landmark size={16} />

            Pejabat Pengelola Informasi
            dan Dokumentasi
          </div>

          <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
            Apa itu PPID?
          </h1>

          <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-500 md:text-base">
            Mengenal peran PPID dalam
            memberikan pelayanan
            informasi publik yang
            terbuka, mudah, dan dapat
            dipertanggungjawabkan.
          </p>
        </header>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* Konten utama */}
          <main className="min-w-0 space-y-6 lg:w-2/3">
            {/* Hero */}
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-700 p-6 text-white shadow-xl shadow-emerald-950/10 md:p-8">
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
                        0.24
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
                  <Info size={31} />
                </div>

                <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-100">
                  Pengertian PPID
                </p>

                <h2 className="mt-3 text-2xl font-black leading-tight md:text-3xl">
                  Pejabat Pengelola
                  Informasi dan
                  Dokumentasi
                </h2>

                <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-emerald-50/90 md:text-base md:leading-8">
                  PPID adalah pejabat yang
                  bertanggung jawab dalam
                  penyimpanan,
                  pendokumentasian,
                  penyediaan, dan pelayanan
                  informasi publik di
                  lingkungan badan publik.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                    <p className="text-xs font-extrabold uppercase tracking-wider text-emerald-100">
                      Fokus Pelayanan
                    </p>

                    <p className="mt-2 text-sm font-bold leading-relaxed text-white">
                      Informasi pemerintahan,
                      pelayanan, pembangunan,
                      dan kebijakan desa.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                    <p className="text-xs font-extrabold uppercase tracking-wider text-emerald-100">
                      Sasaran Pelayanan
                    </p>

                    <p className="mt-2 text-sm font-bold leading-relaxed text-white">
                      Masyarakat, kelompok,
                      organisasi, serta badan
                      hukum pemohon informasi.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Penjelasan */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <Network size={23} />
                </div>

                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-600">
                    PPID Desa Keji
                  </p>

                  <h2 className="mt-2 text-xl font-black text-slate-900 md:text-2xl">
                    Pengelolaan Informasi
                    Publik di Tingkat Desa
                  </h2>

                  <div className="mt-4 space-y-4 text-sm font-medium leading-7 text-slate-600">
                    <p>
                      PPID Desa Keji menjadi
                      bagian dari Pemerintah
                      Desa yang bertugas
                      mengelola dan
                      memberikan pelayanan
                      informasi kepada
                      masyarakat.
                    </p>

                    <p>
                      Melalui PPID,
                      masyarakat dapat
                      memperoleh informasi
                      mengenai profil desa,
                      program pembangunan,
                      pelayanan
                      administrasi,
                      penggunaan anggaran,
                      produk hukum, dan
                      informasi publik
                      lainnya.
                    </p>

                    <p>
                      Tidak seluruh informasi
                      dapat diberikan secara
                      terbuka. Informasi yang
                      berkaitan dengan data
                      pribadi, keamanan, atau
                      informasi lain yang
                      dikecualikan tetap
                      dilindungi berdasarkan
                      ketentuan yang berlaku.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Tujuan */}
            <section>
              <div className="mb-5">
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-600">
                  Tujuan
                </p>

                <h2 className="mt-2 text-2xl font-black text-slate-900">
                  Tujuan Pembentukan PPID
                </h2>

                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">
                  PPID dibentuk untuk
                  mendukung keterbukaan
                  informasi dan tata kelola
                  pemerintahan desa.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {tujuanPPID.map(
                  (item) => (
                    <InfoCard
                      key={item.title}
                      item={item}
                    />
                  )
                )}
              </div>
            </section>

            {/* Tugas PPID */}
            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-white p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-md">
                    <ClipboardCheck
                      size={23}
                    />
                  </div>

                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-600">
                      Tugas dan Tanggung
                      Jawab
                    </p>

                    <h2 className="mt-2 text-xl font-black text-slate-900 md:text-2xl">
                      Tugas Utama PPID
                    </h2>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <ul className="grid gap-3">
                  {tugasPPID.map(
                    (
                      tugas,
                      index
                    ) => (
                      <li
                        key={tugas}
                        className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-xs font-black text-emerald-700">
                          {index + 1}
                        </span>

                        <p className="pt-1 text-sm font-semibold leading-6 text-slate-600">
                          {tugas}
                        </p>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </section>

            {/* Prinsip layanan */}
            <section>
              <div className="mb-5">
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-600">
                  Prinsip Pelayanan
                </p>

                <h2 className="mt-2 text-2xl font-black text-slate-900">
                  Standar Pelayanan
                  Informasi
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {prinsipLayanan.map(
                  (item) => (
                    <InfoCard
                      key={item.title}
                      item={item}
                    />
                  )
                )}
              </div>
            </section>

            {/* Alur layanan */}
            <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-700 text-white">
                  <FileSearch
                    size={23}
                  />
                </div>

                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-600">
                    Alur Pelayanan
                  </p>

                  <h2 className="mt-2 text-xl font-black text-emerald-950 md:text-2xl">
                    Cara Memperoleh
                    Informasi Publik
                  </h2>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <AlurCard
                  number="01"
                  title="Cari Informasi"
                  description="Periksa informasi yang telah tersedia pada website Desa Keji."
                />

                <AlurCard
                  number="02"
                  title="Ajukan Permohonan"
                  description="Isi formulir permohonan apabila informasi belum tersedia."
                />

                <AlurCard
                  number="03"
                  title="Verifikasi Permohonan"
                  description="Petugas PPID memeriksa identitas dan informasi yang diminta."
                />

                <AlurCard
                  number="04"
                  title="Terima Tanggapan"
                  description="Pemohon menerima informasi, pemberitahuan, atau alasan penolakan."
                />
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/ppid/permohonan-informasi"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-emerald-800"
                >
                  Ajukan Permohonan

                  <ArrowRight size={17} />
                </Link>

                <Link
                  href="/ppid/klasifikasi-informasi"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-300 bg-white px-5 py-3 text-sm font-extrabold text-emerald-700 transition hover:border-emerald-500 hover:bg-emerald-100"
                >
                  Lihat Klasifikasi
                  Informasi
                </Link>
              </div>
            </section>

            {/* Dasar hukum */}
            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-start gap-4 border-b border-slate-100 p-6 md:p-8">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-800 text-white">
                  <Scale size={23} />
                </div>

                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-600">
                    Landasan Pelaksanaan
                  </p>

                  <h2 className="mt-2 text-xl font-black text-slate-900 md:text-2xl">
                    Dasar Hukum PPID
                  </h2>
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                {dasarHukum.map(
                  (
                    item,
                    index
                  ) => (
                    <a
                      key={item.title}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-4 p-5 transition hover:bg-emerald-50 md:px-8"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xs font-black text-slate-600 transition group-hover:bg-emerald-100 group-hover:text-emerald-700">
                        {index + 1}
                      </span>

                      <div className="min-w-0 flex-1">
                        <h3 className="font-extrabold leading-relaxed text-slate-800 transition group-hover:text-emerald-800">
                          {item.title}
                        </h3>

                        <p className="mt-1 text-sm font-medium leading-6 text-slate-500">
                          {item.description}
                        </p>
                      </div>

                      <ExternalLink
                        size={17}
                        className="mt-1 shrink-0 text-slate-300 transition group-hover:text-emerald-600"
                      />
                    </a>
                  )
                )}
              </div>
            </section>

            {/* CTA */}
            <section className="rounded-3xl bg-slate-900 p-6 text-white md:p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-300">
                    Layanan PPID
                  </p>

                  <h2 className="mt-2 text-xl font-black md:text-2xl">
                    Informasi yang Anda
                    cari belum tersedia?
                  </h2>

                  <p className="mt-2 max-w-xl text-sm font-medium leading-6 text-slate-300">
                    Ajukan permohonan
                    informasi publik melalui
                    layanan PPID Desa Keji.
                  </p>
                </div>

                <Link
                  href="/ppid/permohonan-informasi"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-emerald-500"
                >
                  Permohonan Informasi

                  <ArrowRight size={17} />
                </Link>
              </div>
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

function InfoCard({
  item,
}: {
  item: InformasiCard;
}) {
  const Icon =
    item.icon;

  return (
    <article className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 transition group-hover:bg-emerald-700 group-hover:text-white">
        <Icon size={23} />
      </div>

      <h3 className="mt-4 text-base font-black text-slate-900">
        {item.title}
      </h3>

      <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
        {item.description}
      </p>
    </article>
  );
}

function AlurCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-emerald-200 bg-white p-5">
      <span className="absolute -right-2 -top-4 text-6xl font-black text-emerald-50">
        {number}
      </span>

      <div className="relative">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-xs font-black text-emerald-700">
          {number}
        </span>

        <h3 className="mt-4 font-black text-slate-900">
          {title}
        </h3>

        <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
          {description}
        </p>
      </div>
    </article>
  );
}