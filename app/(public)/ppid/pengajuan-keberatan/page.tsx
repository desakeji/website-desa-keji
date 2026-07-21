// app/(public)/ppid/pengajuan-keberatan/page.tsx

import Image from 'next/image';
import Link from 'next/link';

import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Download,
  FileCheck2,
  FileDown,
  FilePenLine,
  FileText,
  Gavel,
  Info,
  Landmark,
  MailCheck,
  MapPin,
  Scale,
  Send,
  ShieldCheck,
  ThumbsDown,
  ThumbsUp,
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

const langkahKeberatan = [
  {
    number: '01',
    title:
      'Datang ke Layanan PPID',
    description:
      'Pemohon datang ke meja layanan informasi di Ruang Sekretariat Desa atau PPID Desa Keji.',
    icon: MapPin,
  },
  {
    number: '02',
    title:
      'Melengkapi Identitas',
    description:
      'Pemohon membawa identitas diri berupa KTP. Pemohon yang mewakili badan publik atau organisasi melampirkan dokumen pendukung sesuai persyaratan.',
    icon: UserCheck,
  },
  {
    number: '03',
    title:
      'Mengajukan Keberatan',
    description:
      'Pemohon menyampaikan keberatan secara tertulis yang ditujukan kepada Atasan PPID Desa Keji.',
    icon: Send,
  },
  {
    number: '04',
    title:
      'Mengisi Formulir Keberatan',
    description:
      'Pemohon mengisi Formulir Pernyataan Keberatan Atas Permohonan Informasi secara lengkap dan benar.',
    icon: FilePenLine,
  },
  {
    number: '05',
    title:
      'Menerima Tanda Terima',
    description:
      'Pemohon menerima salinan formulir sebagai bukti bahwa pengajuan keberatan telah diterima oleh petugas PPID.',
    icon: MailCheck,
  },
  {
    number: '06',
    title:
      'Menerima Tanggapan',
    description:
      'Pemohon menerima tanggapan dan keputusan tertulis dari Atasan PPID atas keberatan yang diajukan.',
    icon: FileCheck2,
  },
];

const alasanKeberatan = [
  'Permohonan informasi ditolak.',
  'Informasi berkala tidak disediakan.',
  'Permohonan informasi tidak ditanggapi.',
  'Permohonan informasi ditanggapi tidak sesuai dengan yang diminta.',
  'Permohonan informasi tidak dipenuhi.',
  'Biaya yang dikenakan tidak wajar.',
  'Penyampaian informasi melebihi jangka waktu yang ditentukan.',
];

const persyaratan = [
  'Formulir pernyataan keberatan yang telah diisi.',
  'Salinan identitas pemohon yang masih berlaku.',
  'Salinan permohonan informasi publik sebelumnya.',
  'Salinan tanda terima permohonan informasi.',
  'Salinan tanggapan PPID apabila sudah diterima.',
  'Dokumen pendukung lain yang berkaitan dengan keberatan.',
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
      'Gagal mengambil daftar layanan pada halaman pengajuan keberatan:',
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

export default async function PengajuanKeberatanPage() {
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
            Pengajuan Keberatan
            Informasi
          </h1>

          <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-500 md:text-base">
            Prosedur pengajuan keberatan
            terhadap pelayanan atau
            tanggapan permohonan
            informasi publik dari PPID
            Desa Keji.
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
                  <Gavel size={31} />
                </div>

                <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-100">
                  Layanan PPID Desa Keji
                </p>

                <h2 className="mt-3 max-w-2xl text-2xl font-black leading-tight md:text-3xl">
                  Ajukan keberatan apabila
                  pelayanan informasi
                  belum sesuai
                </h2>

                <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-emerald-50/90 md:text-base md:leading-8">
                  Pemohon informasi dapat
                  mengajukan keberatan
                  secara tertulis kepada
                  Atasan PPID apabila
                  permohonan ditolak,
                  tidak ditanggapi, atau
                  informasi yang diberikan
                  tidak sesuai dengan
                  permohonan.
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                    <FilePenLine
                      size={20}
                      className="text-emerald-100"
                    />

                    <p className="mt-3 text-xs font-extrabold uppercase tracking-wider text-emerald-100">
                      Bentuk Pengajuan
                    </p>

                    <p className="mt-2 text-sm font-bold leading-relaxed">
                      Keberatan disampaikan
                      secara tertulis melalui
                      formulir resmi.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                    <Scale
                      size={20}
                      className="text-emerald-100"
                    />

                    <p className="mt-3 text-xs font-extrabold uppercase tracking-wider text-emerald-100">
                      Tujuan Pengajuan
                    </p>

                    <p className="mt-2 text-sm font-bold leading-relaxed">
                      Memperoleh pemeriksaan
                      dan keputusan tertulis
                      dari Atasan PPID.
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
                    Alur Pengajuan
                    Keberatan Informasi
                  </h2>

                  <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">
                    Perhatikan tahapan
                    pengajuan dan hasil
                    keputusan Atasan PPID.
                  </p>
                </div>
              </div>

              <div className="bg-slate-100 p-3 sm:p-5">
                <a
                  href="/images/ppid/Pengajuan-Keberatan.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block overflow-hidden rounded-2xl bg-white"
                >
                  <Image
                    src="/images/ppid/Pengajuan-Keberatan.png"
                    alt="Poster alur pengajuan keberatan informasi PPID Desa Keji"
                    width={1122}
                    height={1402}
                    priority
                    className="h-auto w-full object-contain"
                  />
                </a>
              </div>

              <div className="border-t border-slate-100 p-5">
                <a
                  href="/images/ppid/Pengajuan-Keberatan.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-extrabold text-emerald-700 transition hover:text-emerald-800"
                >
                  Lihat poster ukuran
                  penuh

                  <ArrowRight size={16} />
                </a>
              </div>
            </section>

            {/* Alasan keberatan */}
            <section className="overflow-hidden rounded-3xl border border-amber-200 bg-white shadow-sm">
              <div className="border-b border-amber-100 bg-gradient-to-r from-amber-50 to-white p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500 text-white">
                    <AlertTriangle
                      size={23}
                    />
                  </div>

                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-amber-700">
                      Dasar Pengajuan
                    </p>

                    <h2 className="mt-2 text-xl font-black text-slate-900 md:text-2xl">
                      Alasan Pengajuan
                      Keberatan
                    </h2>

                    <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">
                      Keberatan dapat
                      diajukan apabila
                      terjadi salah satu
                      kondisi berikut.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 p-5 md:grid-cols-2 md:p-8">
                {alasanKeberatan.map(
                  (
                    item,
                    index
                  ) => (
                    <article
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-xs font-black text-amber-700">
                        {index + 1}
                      </span>

                      <p className="pt-1 text-sm font-semibold leading-6 text-slate-600">
                        {item}
                      </p>
                    </article>
                  )
                )}
              </div>
            </section>

            {/* Tahapan */}
            <section>
              <div className="mb-5">
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-600">
                  Prosedur Pelayanan
                </p>

                <h2 className="mt-2 text-2xl font-black text-slate-900">
                  Langkah Pengajuan
                  Keberatan
                </h2>

                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">
                  Pengajuan keberatan
                  diproses melalui enam
                  tahapan utama.
                </p>
              </div>

              <div className="space-y-4">
                {langkahKeberatan.map(
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
                      Pengajuan
                    </p>

                    <h2 className="mt-2 text-xl font-black text-slate-900 md:text-2xl">
                      Dokumen yang Perlu
                      Disiapkan
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
                    <article
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-xs font-black text-emerald-700">
                        {index + 1}
                      </span>

                      <p className="pt-1 text-sm font-semibold leading-6 text-slate-600">
                        {item}
                      </p>
                    </article>
                  )
                )}
              </div>
            </section>

            {/* Hasil keputusan */}
            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 p-6 md:p-8">
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-600">
                  Keputusan Atasan PPID
                </p>

                <h2 className="mt-2 text-xl font-black text-slate-900 md:text-2xl">
                  Tindak Lanjut Hasil
                  Keberatan
                </h2>
              </div>

              <div className="grid gap-4 p-5 md:grid-cols-2 md:p-8">
                <article className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-700 text-white">
                    <ThumbsUp size={23} />
                  </div>

                  <h3 className="mt-4 text-lg font-black text-emerald-950">
                    Pemohon Puas
                  </h3>

                  <p className="mt-2 text-sm font-semibold leading-6 text-emerald-800">
                    Permohonan telah
                    diselesaikan sesuai
                    tanggapan dan keputusan
                    tertulis Atasan PPID.
                  </p>
                </article>

                <article className="rounded-3xl border border-orange-200 bg-orange-50 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-white">
                    <ThumbsDown size={23} />
                  </div>

                  <h3 className="mt-4 text-lg font-black text-orange-950">
                    Pemohon Tidak Puas
                  </h3>

                  <p className="mt-2 text-sm font-semibold leading-6 text-orange-800">
                    Pemohon dapat
                    mengajukan penyelesaian
                    sengketa informasi
                    kepada Komisi Informasi
                    sesuai ketentuan.
                  </p>
                </article>
              </div>
            </section>

            {/* Catatan */}
            <section className="rounded-3xl border border-cyan-200 bg-cyan-50 p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-700 text-white">
                  <Info size={23} />
                </div>

                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-cyan-700">
                    Catatan Pelayanan
                  </p>

                  <h2 className="mt-2 text-xl font-black text-cyan-950">
                    Pengajuan harus
                    disampaikan secara
                    tertulis
                  </h2>

                  <div className="mt-4 space-y-3">
                    <CatatanItem text="Formulir harus diisi lengkap, benar, dan dapat dipertanggungjawabkan." />

                    <CatatanItem text="Pengajuan keberatan ditujukan kepada Atasan PPID Desa Keji." />

                    <CatatanItem text="Pemohon perlu menyimpan salinan formulir dan tanda terima pengajuan." />

                    <CatatanItem text="Data identitas pemohon hanya digunakan untuk keperluan pelayanan informasi publik." />
                  </div>
                </div>
              </div>
            </section>

            {/* Download formulir */}
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
                        Formulir Pernyataan
                        Keberatan
                      </h2>

                      <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">
                        Unduh formulir,
                        isi data keberatan,
                        kemudian serahkan
                        kepada petugas PPID
                        Desa Keji.
                      </p>
                    </div>
                  </div>

                  <a
                    href="/documentss/pernyataan-keberatan-atas-permohonan-informasi.docx"
                    download
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-cyan-700 px-5 py-3 text-sm font-extrabold text-white shadow-md transition hover:bg-cyan-800"
                  >
                    <Download size={18} />
                    Unduh Formulir
                  </a>
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="rounded-3xl bg-slate-900 p-6 text-white shadow-xl md:p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-300">
                    Layanan PPID
                  </p>

                  <h2 className="mt-2 text-xl font-black md:text-2xl">
                    Belum pernah
                    mengajukan permohonan?
                  </h2>

                  <p className="mt-2 max-w-xl text-sm font-medium leading-6 text-slate-300">
                    Pengajuan keberatan
                    dilakukan setelah
                    terdapat permohonan
                    informasi publik yang
                    belum memperoleh
                    penyelesaian sesuai
                    harapan.
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

function CatatanItem({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle2
        size={18}
        className="mt-0.5 shrink-0 text-cyan-700"
      />

      <p className="text-sm font-semibold leading-6 text-cyan-950">
        {text}
      </p>
    </div>
  );
}