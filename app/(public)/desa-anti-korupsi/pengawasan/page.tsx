// app/(public)/desa-anti-korupsi/pengawasan/page.tsx

import {
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  ExternalLink,
  FileSearch,
  FileText,
  Landmark,
  SearchCheck,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';

import CetakPdfButton from '@/components/anti-korupsi/CetakPdfButton';
import SidebarLayanan from '@/components/SidebarLayanan';

import { supabaseAdmin } from '@/lib/supabase-admin';

import type { PilihanLayanan } from '@/types/layanan';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface LayananRow {
  id: number;
  nama: string;
  slug: string;
}

interface DokumenAkses {
  label: string;
  href?: string;
  external?: boolean;
}

interface BuktiPengawasan {
  no: number;
  nama: string;
  dokumen2024: DokumenAkses[];
  dokumen2025: DokumenAkses[];
}

interface IndikatorPengawasan {
  kode: string;
  judul: string;
  deskripsi: string;
  icon: LucideIcon;
  bukti: BuktiPengawasan[];
}

/*
 * Tambahkan properti href ketika file sudah tersedia.
 *
 * Contoh dokumen lokal:
 * {
 *   label: 'Undangan',
 *   href: '/documents/anti-korupsi/pengawasan/undangan.pdf',
 * }
 *
 * Contoh Google Drive:
 * {
 *   label: 'Undangan',
 *   href: 'https://drive.google.com/...',
 *   external: true,
 * }
 */
const indikatorPengawasan: IndikatorPengawasan[] = [
  {
    kode: 'II.1',

    judul:
      'Kegiatan Pengawasan dan Evaluasi Kinerja Perangkat Desa',

    deskripsi:
      'Pelaksanaan kegiatan pengawasan dan evaluasi terhadap kinerja perangkat desa sebagai upaya memastikan pelaksanaan tugas, fungsi, dan tanggung jawab berjalan sesuai ketentuan.',

    icon: ClipboardCheck,

    bukti: [
      {
        no: 1,

        nama:
          'Undangan kegiatan pengawasan dan evaluasi kepada seluruh perangkat desa dan aparatur desa',

        dokumen2024: [
          {
            label: 'Undangan',
          },
        ],

        dokumen2025: [
          {
            label: 'Undangan',
          },
        ],
      },
      {
        no: 2,

        nama:
          'Notulensi kegiatan pengawasan dan evaluasi',

        dokumen2024: [
          {
            label: 'Notulensi',
          },
        ],

        dokumen2025: [
          {
            label: 'Notulensi',
          },
        ],
      },
      {
        no: 3,

        nama:
          'Daftar hadir kegiatan pengawasan dan evaluasi',

        dokumen2024: [
          {
            label: 'Daftar Hadir',
          },
        ],

        dokumen2025: [
          {
            label: 'Daftar Hadir',
          },
        ],
      },
      {
        no: 4,

        nama:
          'Dokumentasi pelaksanaan kegiatan pengawasan dan evaluasi',

        dokumen2024: [
          {
            label: 'Dokumentasi',
          },
        ],

        dokumen2025: [
          {
            label: 'Dokumentasi',
          },
        ],
      },
      {
        no: 5,

        nama:
          'Formulir pengawasan dan evaluasi yang memuat tugas pokok dan fungsi perangkat desa, dokumen pendukung, kriteria penilaian, serta catatan hasil evaluasi',

        dokumen2024: [
          {
            label: 'Absensi',
          },
        ],

        dokumen2025: [
          {
            label: 'Absensi',
          },
          {
            label: 'Deklarasi',
          },
        ],
      },
    ],
  },
  {
    kode: 'II.2',

    judul:
      'Tindak Lanjut Hasil Pembinaan, Arahan, Pengawasan, dan Pemeriksaan',

    deskripsi:
      'Ketersediaan arsip serta bukti tindak lanjut atas hasil pembinaan, petunjuk, arahan, pengawasan, dan pemeriksaan yang dilakukan oleh Pemerintah Pusat maupun Pemerintah Daerah.',

    icon: SearchCheck,

    bukti: [
      {
        no: 1,

        nama:
          'Arsip atau dokumen hasil pembinaan, petunjuk, arahan, pengawasan, dan pemeriksaan dari Pemerintah Pusat atau Pemerintah Daerah',

        dokumen2024: [
          {
            label: 'Surat Perintah',
          },
        ],

        dokumen2025: [
          {
            label: 'Surat Perintah',
          },
        ],
      },
      {
        no: 2,

        nama:
          'Surat keterangan atau penjelasan terhadap hasil pembinaan, arahan, pengawasan, dan pemeriksaan yang belum dapat diselesaikan dalam tahun berjalan',

        dokumen2024: [
          {
            label: 'LHP Tahap I',
          },
          {
            label: 'LHP Tahap II',
          },
        ],

        dokumen2025: [
          {
            label: 'LHP Tahap I',
          },
          {
            label: 'LHP Tahap II',
          },
          {
            label:
              'LHP Pendampingan Pengelolaan Keuangan Desa',
          },
        ],
      },
      {
        no: 3,

        nama:
          'Surat penyelesaian atau berita acara tindak lanjut atas hasil pembinaan, arahan, pengawasan, pemeriksaan, dan temuan dengan dilengkapi bukti pendukung',

        dokumen2024: [
          {
            label: 'Tindak Lanjut',
          },
        ],

        dokumen2025: [
          {
            label: 'Tindak Lanjut',
          },
        ],
      },
    ],
  },
  {
    kode: 'II.3',

    judul:
      'Tidak Adanya Aparatur Desa yang Terjerat Tindak Pidana Korupsi',

    deskripsi:
      'Pemerintah Desa menyediakan dokumen pendukung yang menunjukkan bahwa dalam tiga tahun terakhir tidak terdapat aparatur Desa Keji yang terjerat tindak pidana korupsi.',

    icon: ShieldCheck,

    bukti: [
      {
        no: 1,

        nama:
          'Surat pernyataan Kepala Desa bersama Inspektorat Kabupaten dan Dinas Pemberdayaan Masyarakat dan Desa Kabupaten',

        dokumen2024: [
          {
            label: 'Surat Pernyataan',
          },
          {
            label: 'Pakta Integritas',
          },
        ],

        dokumen2025: [
          {
            label: 'Surat Pernyataan',
          },
          {
            label: 'Pakta Integritas',
          },
        ],
      },
      {
        no: 2,

        nama:
          'Surat keterangan dari aparat penegak hukum berdasarkan surat permohonan Pemerintah Kabupaten',

        dokumen2024: [
          {
            label: 'Surat Polres',
          },
          {
            label: 'Surat Inspektorat',
          },
        ],

        dokumen2025: [
          {
            label: 'Surat Polres',
          },
          {
            label: 'Surat Inspektorat',
          },
        ],
      },
      {
        no: 3,

        nama:
          'Tangkapan layar hasil penelusuran informasi atau pemberitaan yang menunjukkan tidak ditemukan kasus tindak pidana korupsi di desa',

        dokumen2024: [
          {
            label: 'Hasil Penelusuran',
          },
        ],

        dokumen2025: [
          {
            label: 'Hasil Penelusuran Desa Anti Korupsi',
          },
        ],
      },
      {
        no: 4,

        nama:
          'Bukti publikasi surat pernyataan melalui website resmi desa',

        dokumen2024: [
          {
            label: 'Bukti Publikasi Website',
          },
        ],

        dokumen2025: [
          {
            label: 'Bukti Publikasi Website',
          },
        ],
      },
    ],
  },
];

async function getDaftarLayanan(): Promise<PilihanLayanan[]> {
  const { data, error } = await supabaseAdmin
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
      'Gagal mengambil layanan pada halaman Pengawasan:',
      {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      }
    );

    return [];
  }

  return ((data ?? []) as LayananRow[])
    .map((item) => ({
      id: Number(item.id),
      nama: String(item.nama ?? '').trim(),
      slug: String(item.slug ?? '').trim(),
    }))
    .filter(
      (item) =>
        Number.isFinite(item.id) &&
        item.id > 0 &&
        item.nama.length > 0 &&
        item.slug.length > 0
    );
}

export default async function PengawasanPage() {
  const daftarLayanan =
    await getDaftarLayanan();

  const jumlahDokumen =
    indikatorPengawasan.reduce(
      (total, indikator) =>
        total +
        indikator.bukti.length,
      0
    );

  const jumlahAkses =
    indikatorPengawasan.reduce(
      (total, indikator) =>
        total +
        indikator.bukti.reduce(
          (jumlah, bukti) =>
            jumlah +
            bukti.dokumen2024.length +
            bukti.dokumen2025.length,
          0
        ),
      0
    );

  const jumlahDokumenAktif =
    indikatorPengawasan.reduce(
      (total, indikator) =>
        total +
        indikator.bukti.reduce(
          (jumlah, bukti) =>
            jumlah +
            bukti.dokumen2024.filter(
              (dokumen) =>
                Boolean(dokumen.href)
            ).length +
            bukti.dokumen2025.filter(
              (dokumen) =>
                Boolean(dokumen.href)
            ).length,
          0
        ),
      0
    );

  return (
    <>
      <style>{`
        @media print {
          @page {
            size: A4 landscape;
            margin: 12mm;
          }

          body {
            background: white !important;
          }

          header.sticky,
          footer,
          .print-hide {
            display: none !important;
          }

          .print-container {
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          .print-main {
            width: 100% !important;
          }

          .print-card {
            box-shadow: none !important;
            break-inside: avoid;
          }

          .print-table {
            width: 100% !important;
            min-width: 0 !important;
            font-size: 8.5pt !important;
          }

          .print-table th,
          .print-table td {
            padding: 7px !important;
          }

          .print-table tr {
            break-inside: avoid;
          }

          a {
            color: black !important;
            text-decoration: none !important;
          }
        }
      `}</style>

      <div className="min-h-screen bg-slate-50 py-8 print:bg-white print:py-0">
        <div className="print-container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="mb-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-700">
                  <ShieldCheck size={16} />

                  Desa Anti Korupsi
                </div>

                <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                  Penguatan Pengawasan
                </h1>

                <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-500 md:text-base">
                  Informasi mengenai pelaksanaan
                  pengawasan, evaluasi kinerja,
                  tindak lanjut hasil pemeriksaan,
                  dan pencegahan tindak pidana
                  korupsi di lingkungan Pemerintah
                  Desa Keji.
                </p>
              </div>

              <CetakPdfButton />
            </div>
          </header>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
            <main className="print-main min-w-0 space-y-8 lg:w-2/3">
              {/* Hero */}
              <section className="print-card relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-800 to-teal-700 p-6 text-white shadow-xl md:p-8 print:border print:border-slate-300 print:bg-white print:text-slate-900">
                <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border-[52px] border-white/[0.06] print:hidden" />

                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 print:border-slate-300 print:bg-slate-100">
                    <FileSearch size={28} />
                  </div>

                  <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-100 print:text-emerald-700">
                    Pemerintah Desa Keji
                  </p>

                  <h2 className="mt-3 max-w-3xl text-2xl font-black leading-tight md:text-3xl">
                    Pengawasan yang terbuka,
                    objektif, dan dapat
                    dipertanggungjawabkan
                  </h2>

                  <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-emerald-50/90 print:text-slate-600">
                    Penguatan pengawasan dilakukan
                    melalui evaluasi kinerja
                    perangkat desa, tindak lanjut
                    hasil pembinaan dan pemeriksaan,
                    serta penyediaan bukti bahwa
                    penyelenggaraan pemerintahan
                    desa terbebas dari praktik
                    tindak pidana korupsi.
                  </p>
                </div>
              </section>

              {/* Statistik */}
              <section className="grid gap-4 sm:grid-cols-3">
                <StatistikCard
                  label="Indikator Pengawasan"
                  value={indikatorPengawasan.length}
                  icon={SearchCheck}
                />

                <StatistikCard
                  label="Jenis Bukti"
                  value={jumlahDokumen}
                  icon={FileText}
                />

                <StatistikCard
                  label="Tautan Aktif"
                  value={jumlahDokumenAktif}
                  icon={CheckCircle2}
                  description={`${jumlahAkses} dokumen tercatat`}
                />
              </section>

              {/* Daftar indikator */}
              <section className="space-y-6">
                {indikatorPengawasan.map(
                  (indikator) => (
                    <IndikatorCard
                      key={indikator.kode}
                      indikator={indikator}
                    />
                  )
                )}
              </section>

              {/* Catatan */}
              <section className="print-card rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                    <Clock3 size={21} />
                  </div>

                  <div>
                    <h2 className="font-black text-amber-950">
                      Pembaruan Dokumen Pengawasan
                    </h2>

                    <p className="mt-2 text-sm font-semibold leading-7 text-amber-800">
                      Dokumen pengawasan dan evaluasi
                      akan diperbarui secara berkala
                      sesuai dengan pelaksanaan
                      kegiatan, hasil pembinaan,
                      pemeriksaan, tindak lanjut,
                      serta kelengkapan administrasi
                      Pemerintah Desa Keji.
                    </p>
                  </div>
                </div>
              </section>
            </main>

            {/* Sidebar */}
            <aside className="print-hide min-w-0 lg:w-1/3">
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
    </>
  );
}

function StatistikCard({
  label,
  value,
  icon: Icon,
  description,
}: {
  label: string;
  value: number;
  icon: LucideIcon;
  description?: string;
}) {
  return (
    <article className="print-card rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
        <Icon size={21} />
      </div>

      <p className="mt-4 text-2xl font-black text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-xs font-extrabold uppercase tracking-[0.13em] text-slate-500">
        {label}
      </p>

      {description && (
        <p className="mt-2 text-xs font-semibold text-slate-400">
          {description}
        </p>
      )}
    </article>
  );
}

function IndikatorCard({
  indikator,
}: {
  indikator: IndikatorPengawasan;
}) {
  const Icon = indikator.icon;

  return (
    <article className="print-card overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-white p-5 md:p-6 print:bg-white">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-700 text-white print:border print:border-slate-300 print:bg-white print:text-emerald-700">
            <Icon size={23} />
          </div>

          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-700">
              Indikator {indikator.kode}
            </p>

            <h2 className="mt-2 text-xl font-black leading-tight text-slate-900">
              {indikator.judul}
            </h2>

            <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
              {indikator.deskripsi}
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="print-table w-full min-w-[850px] border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-xs font-extrabold uppercase tracking-wider text-slate-500">
              <th className="w-16 px-5 py-4">
                No.
              </th>

              <th className="px-5 py-4">
                Bukti / Evidence / Dokumen
              </th>

              <th className="w-48 px-5 py-4">
                Link Akses 2024
              </th>

              <th className="w-48 px-5 py-4">
                Link Akses 2025
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {indikator.bukti.map(
              (bukti) => (
                <tr
                  key={`${indikator.kode}-${bukti.no}`}
                  className="align-top transition hover:bg-slate-50"
                >
                  <td className="px-5 py-4 text-sm font-black text-slate-500">
                    {bukti.no}
                  </td>

                  <td className="px-5 py-4 text-sm font-semibold leading-6 text-slate-700">
                    {bukti.nama}
                  </td>

                  <td className="px-5 py-4">
                    <DaftarDokumen
                      dokumen={bukti.dokumen2024}
                    />
                  </td>

                  <td className="px-5 py-4">
                    <DaftarDokumen
                      dokumen={bukti.dokumen2025}
                    />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </article>
  );
}

function DaftarDokumen({
  dokumen,
}: {
  dokumen: DokumenAkses[];
}) {
  if (dokumen.length === 0) {
    return (
      <span className="text-sm font-semibold text-slate-400">
        —
      </span>
    );
  }

  return (
    <div className="flex flex-col items-start gap-2">
      {dokumen.map(
        (item, index) =>
          item.href ? (
            <a
              key={`${item.label}-${index}`}
              href={item.href}
              target={
                item.external
                  ? '_blank'
                  : undefined
              }
              rel={
                item.external
                  ? 'noopener noreferrer'
                  : undefined
              }
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-extrabold text-emerald-700 transition hover:bg-emerald-100 hover:text-emerald-900"
            >
              {item.label}

              <ExternalLink size={13} />
            </a>
          ) : (
            <div
              key={`${item.label}-${index}`}
              className="flex flex-col items-start gap-1"
            >
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-2 text-xs font-extrabold text-slate-600">
                <FileText size={13} />

                {item.label}
              </span>

              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 print:hidden">
                <Clock3 size={11} />

                Tautan belum ditambahkan
              </span>
            </div>
          )
      )}
    </div>
  );
}