// app/(public)/ppid/permohonan-informasi/page.tsx

import Image from 'next/image';
import Link from 'next/link';

import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Download,
  FileCheck2,
  FileDown,
  FileText,
  Info,
  Landmark,
  Mail,
  MapPin,
  SearchCheck,
  Send,
  ShieldCheck,
  UserCheck,
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

const langkahPermohonan = [
  {
    number: '01',
    title: 'Mengajukan Permohonan',
    description:
      'Pemohon informasi publik mengajukan permohonan kepada PPID Desa Keji secara langsung, melalui surat, atau surat elektronik.',
    icon: Send,
  },
  {
    number: '02',
    title: 'Mengisi Formulir',
    description:
      'Pemohon mengisi formulir dengan mencantumkan identitas, alamat, nomor telepon, informasi yang diminta, bentuk informasi, dan cara penyampaiannya.',
    icon: FileText,
  },
  {
    number: '03',
    title: 'Pemeriksaan Permohonan',
    description:
      'Petugas PPID menerima dan memeriksa kelengkapan permohonan serta memastikan informasi yang diminta bukan termasuk informasi yang dikecualikan.',
    icon: SearchCheck,
  },
  {
    number: '04',
    title: 'Penyampaian Informasi',
    description:
      'Petugas PPID menyampaikan informasi kepada pemohon sesuai dengan permohonan dan ketentuan pelayanan informasi publik.',
    icon: UserCheck,
  },
];

const persyaratan = [
  'Formulir permohonan informasi publik yang telah diisi.',
  'Salinan kartu identitas pemohon yang masih berlaku.',
  'Informasi yang diminta dituliskan secara jelas dan spesifik.',
  'Mencantumkan bentuk informasi yang diinginkan.',
  'Mencantumkan cara penerimaan informasi.',
  'Nomor telepon atau alamat kontak yang dapat dihubungi.',
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
      'Gagal mengambil daftar layanan pada halaman permohonan informasi:',
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

export default async function PermohonanInformasiPage() {
  const daftarLayanan =
    await getDaftarLayanan();

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-700">
            <Landmark size={16} />

            Pejabat Pengelola Informasi
            dan Dokumentasi
          </div>

          <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
            Permohonan Informasi Publik
          </h1>

          <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-500 md:text-base">
            Prosedur untuk memperoleh
            informasi publik yang
            dikelola oleh Pemerintah
            Desa Keji melalui PPID.
          </p>
        </header>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* Konten utama */}
          <main className="min-w-0 space-y-8 lg:w-2/3">
            {/* Hero */}
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-700 p-6 text-white shadow-xl shadow-emerald-950/10 md:p-8">
              <div
                className="pointer-events-none absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                    radial-gradient(
                      circle,
                      rgba(255,255,255,0.24) 1.5px,
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
                  <FileCheck2
                    size={31}
                  />
                </div>

                <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-100">
                  Layanan PPID Desa Keji
                </p>

                <h2 className="mt-3 max-w-2xl text-2xl font-black leading-tight md:text-3xl">
                  Ajukan informasi yang
                  belum tersedia pada
                  website Desa Keji
                </h2>

                <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-emerald-50/90 md:text-base md:leading-8">
                  Masyarakat dapat
                  mengajukan permohonan
                  apabila informasi yang
                  dibutuhkan belum
                  dipublikasikan pada
                  halaman Informasi Publik
                  atau halaman PPID.
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                    <Mail
                      size={20}
                      className="text-emerald-100"
                    />

                    <p className="mt-3 text-xs font-extrabold uppercase tracking-wider text-emerald-100">
                      Pengajuan Tidak
                      Langsung
                    </p>

                    <p className="mt-2 text-sm font-bold leading-relaxed">
                      Melalui surat,
                      surat elektronik,
                      atau saluran resmi
                      Pemerintah Desa.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                    <MapPin
                      size={20}
                      className="text-emerald-100"
                    />

                    <p className="mt-3 text-xs font-extrabold uppercase tracking-wider text-emerald-100">
                      Pengajuan Langsung
                    </p>

                    <p className="mt-2 text-sm font-bold leading-relaxed">
                      Datang ke Kantor
                      Pemerintah Desa Keji
                      dengan membawa
                      persyaratan.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Poster */}
            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-start gap-4 border-b border-slate-100 p-6 md:p-8">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <ClipboardCheck
                    size={23}
                  />
                </div>

                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-600">
                    Infografis
                  </p>

                  <h2 className="mt-2 text-xl font-black text-slate-900 md:text-2xl">
                    Alur Permohonan
                    Informasi
                  </h2>

                  <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">
                    Perhatikan tahapan dan
                    persyaratan sebelum
                    mengajukan permohonan
                    informasi publik.
                  </p>
                </div>
              </div>

              <div className="bg-slate-100 p-3 sm:p-5">
                <a
                  href="/images/ppid/Permohonan-Informasi.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block overflow-hidden rounded-2xl bg-white"
                >
                  <Image
                    src="/images/ppid/Permohonan-Informasi.png"
                    alt="Poster alur permohonan informasi PPID Desa Keji"
                    width={1055}
                    height={1491}
                    priority
                    className="h-auto w-full object-contain"
                  />
                </a>
              </div>

              <div className="border-t border-slate-100 p-5">
                <a
                  href="/images/ppid/Permohonan-Informasi.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-extrabold text-emerald-700 transition hover:text-emerald-800"
                >
                  Lihat poster ukuran penuh

                  <ArrowRight size={16} />
                </a>
              </div>
            </section>

            {/* Tahapan */}
            <section>
              <div className="mb-5">
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-600">
                  Prosedur Pelayanan
                </p>

                <h2 className="mt-2 text-2xl font-black text-slate-900">
                  Langkah Permohonan
                  Informasi Publik
                </h2>

                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">
                  Permohonan diproses
                  melalui empat tahapan
                  utama.
                </p>
              </div>

              <div className="space-y-4">
                {langkahPermohonan.map(
                  (item) => {
                    const Icon =
                      item.icon;

                    return (
                      <article
                        key={
                          item.number
                        }
                        className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-200 hover:shadow-md md:p-6"
                      >
                        <span className="pointer-events-none absolute -right-2 -top-6 text-8xl font-black text-emerald-50">
                          {item.number}
                        </span>

                        <div className="relative flex items-start gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 transition group-hover:bg-emerald-700 group-hover:text-white">
                            <Icon size={23} />
                          </div>

                          <div>
                            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-600">
                              Langkah{' '}
                              {Number(
                                item.number
                              )}
                            </p>

                            <h3 className="mt-2 text-lg font-black text-slate-900">
                              {item.title}
                            </h3>

                            <p className="mt-2 text-sm font-medium leading-7 text-slate-600">
                              {
                                item.description
                              }
                            </p>
                          </div>
                        </div>
                      </article>
                    );
                  }
                )}
              </div>
            </section>

            {/* Persyaratan */}
            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-white p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-md">
                    <ShieldCheck
                      size={23}
                    />
                  </div>

                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-600">
                      Kelengkapan
                      Permohonan
                    </p>

                    <h2 className="mt-2 text-xl font-black text-slate-900 md:text-2xl">
                      Persyaratan yang
                      Perlu Disiapkan
                    </h2>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 p-5 md:grid-cols-2 md:p-8">
                {persyaratan.map(
                  (
                    item,
                    index
                  ) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-xs font-black text-emerald-700">
                        {index + 1}
                      </span>

                      <p className="pt-1 text-sm font-semibold leading-6 text-slate-600">
                        {item}
                      </p>
                    </div>
                  )
                )}
              </div>
            </section>

            {/* Catatan */}
            <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500 text-white">
                  <Info size={23} />
                </div>

                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-amber-700">
                    Perhatian
                  </p>

                  <h2 className="mt-2 text-xl font-black text-amber-950">
                    Ketentuan Permohonan
                    Informasi
                  </h2>

                  <div className="mt-4 space-y-3">
                    <CatatanItem text="Formulir harus diisi secara lengkap, benar, dan dapat dipertanggungjawabkan." />

                    <CatatanItem text="Petugas PPID dapat menghubungi pemohon apabila terdapat data atau persyaratan yang belum lengkap." />

                    <CatatanItem text="Informasi yang termasuk dalam kategori informasi dikecualikan tidak dapat diberikan kepada pemohon." />

                    <CatatanItem text="Data identitas pemohon hanya digunakan untuk proses pelayanan informasi publik." />
                  </div>
                </div>
              </div>
            </section>

            {/* Download dokumen */}
            <section className="overflow-hidden rounded-3xl border border-cyan-200 bg-white shadow-sm">
              <div className="border-l-4 border-cyan-600 bg-slate-100 p-6 md:p-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700">
                      <FileDown size={24} />
                    </div>

                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-cyan-700">
                        Dokumen Lampiran
                      </p>

                      <h2 className="mt-2 text-xl font-black text-slate-900">
                        Formulir Permohonan
                        Informasi Publik
                      </h2>

                      <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">
                        Unduh formulir,
                        lengkapi data
                        pemohon, kemudian
                        serahkan kepada
                        petugas PPID Desa
                        Keji.
                      </p>
                    </div>
                  </div>

                  <a
                    href="/documents/FORMAT_FORMULIR_PERMOHONAN_INFORMASI_PUBLIK.docx"
                    download
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-cyan-700 px-5 py-3 text-sm font-extrabold text-white shadow-md transition hover:bg-cyan-800"
                  >
                    <Download size={18} />
                    Unduh Formulir
                  </a>
                </div>
              </div>
            </section>

            {/* Akses informasi */}
            <section className="rounded-3xl bg-slate-900 p-6 text-white shadow-xl md:p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-300">
                    Sebelum Mengajukan
                  </p>

                  <h2 className="mt-2 text-xl font-black md:text-2xl">
                    Periksa informasi yang
                    telah tersedia
                  </h2>

                  <p className="mt-2 max-w-xl text-sm font-medium leading-6 text-slate-300">
                    Informasi yang Anda
                    butuhkan mungkin sudah
                    tersedia pada halaman
                    Informasi Umum, Produk
                    Hukum, atau APBDes.
                  </p>
                </div>

                <div className="flex shrink-0 flex-col gap-2">
                  <Link
                    href="/informasi-publik/informasi-umum"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-emerald-500"
                  >
                    Informasi Umum

                    <ArrowRight size={17} />
                  </Link>

                  <Link
                    href="/ppid/pengajuan-keberatan"
                    className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-white/10"
                  >
                    Pengajuan Keberatan
                  </Link>
                </div>
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

function CatatanItem({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle2
        size={18}
        className="mt-0.5 shrink-0 text-amber-600"
      />

      <p className="text-sm font-semibold leading-6 text-amber-900">
        {text}
      </p>
    </div>
  );
}