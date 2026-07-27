// app/(public)/desa-anti-korupsi/pelayanan-publik/page.tsx

import {
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  ExternalLink,
  FileText,
  Globe2,
  Megaphone,
  MessageSquare,
  ScrollText,
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

interface BuktiPelayananPublik {
  no: number;
  nama: string;
  dokumen2024: DokumenAkses[];
  dokumen2025: DokumenAkses[];
}

interface IndikatorPelayananPublik {
  kode: string;
  judul: string;
  deskripsi: string;
  icon: LucideIcon;
  bukti: BuktiPelayananPublik[];
}

/*
 * Tambahkan href saat dokumen sudah tersedia.
 *
 * Dokumen lokal:
 * {
 *   label: 'Banner Alur Pengaduan',
 *   href: '/documents/anti-korupsi/pelayanan-publik/banner-alur-pengaduan.pdf',
 * }
 *
 * Google Drive:
 * {
 *   label: 'Questionnaire SKM',
 *   href: 'https://drive.google.com/file/d/ID_FILE/view',
 *   external: true,
 * }
 */

const indikatorPelayananPublik: IndikatorPelayananPublik[] = [
  {
    kode: 'III.1',

    judul:
      'Adanya Layanan Pengaduan bagi Masyarakat',

    deskripsi:
      'Pemerintah Desa menyediakan prosedur, saluran, dan media informasi pengaduan yang mudah diakses oleh masyarakat serta dilengkapi mekanisme penerimaan, penanganan, dan tindak lanjut pengaduan.',

    icon: MessageSquare,

    bukti: [
      {
        no: 1,

        nama:
          'Prosedur baku penerimaan, penanganan, dan tindak lanjut pengaduan masyarakat',

        dokumen2024: [
          {
            label:
              'Pengelolaan Pengaduan Pelayanan Publik',
          },
          {
            label:
              'Banner Alur Pengaduan',
          },
        ],

        dokumen2025: [
          {
            label:
              'Pengelolaan Pengaduan Pelayanan Publik',
          },
          {
            label:
              'Banner Alur Pengaduan',
          },
        ],
      },
      {
        no: 2,

        nama:
          'Saluran penerimaan pengaduan secara digital dan konvensional',

        dokumen2024: [
          {
            label:
              'Saluran Aduan Email',
          },
          {
            label:
              'Saluran Aduan Website',
          },
          {
            label:
              'Saluran Aduan Konvensional',
          },
          {
            label:
              'Saluran Aduan Instagram',
          },
        ],

        dokumen2025: [
          {
            label:
              'Saluran Aduan Email',
          },
          {
            label:
              'Saluran Aduan Website',
            href: '/kontak',
          },
          {
            label:
              'Saluran Aduan Konvensional',
          },
          {
            label:
              'Saluran Aduan Instagram',
          },
        ],
      },
      {
        no: 3,

        nama:
          'Publikasi prosedur baku dan saluran pengaduan kepada masyarakat',

        dokumen2024: [
          {
            label:
              'Publikasi Prosedur Pengaduan',
          },
        ],

        dokumen2025: [
          {
            label:
              'Publikasi Prosedur Pengaduan',
          },
        ],
      },
      {
        no: 4,

        nama:
          'Media informasi terkait prosedur dan saluran pengaduan',

        dokumen2024: [
          {
            label:
              'Media Informasi Pengaduan',
          },
        ],

        dokumen2025: [
          {
            label:
              'Media Informasi Pengaduan',
          },
        ],
      },
    ],
  },
  {
    kode: 'III.2',

    judul:
      'Adanya Survei Kepuasan Masyarakat terhadap Layanan Pemerintah Desa',

    deskripsi:
      'Pemerintah Desa melaksanakan Survei Kepuasan Masyarakat sebagai bahan evaluasi terhadap kualitas layanan yang diberikan kepada masyarakat.',

    icon: BarChart3,

    bukti: [
      {
        no: 1,

        nama:
          'Survei kepuasan masyarakat berdasarkan pelayanan yang diberikan oleh Pemerintah Desa',

        dokumen2024: [
          {
            label:
              'Kuesioner SKM',
          },
          {
            label:
              'Banner Kuesioner SKM',
          },
        ],

        dokumen2025: [
          {
            label:
              'Kuesioner SKM',
          },
          {
            label:
              'Banner Kuesioner SKM',
          },
        ],
      },
      {
        no: 2,

        nama:
          'Pelaksanaan survei berdasarkan pedoman penyusunan Survei Kepuasan Masyarakat yang berlaku',

        dokumen2024: [
          {
            label:
              'Survei Pelayanan Masyarakat',
          },
          {
            label:
              'Publikasi Hasil Survei SKM',
          },
        ],

        dokumen2025: [
          {
            label:
              'Survei Pelayanan Masyarakat',
          },
          {
            label:
              'Publikasi Hasil Survei SKM',
          },
        ],
      },
    ],
  },
  {
    kode: 'III.3',

    judul:
      'Keterbukaan dan Akses Masyarakat terhadap Informasi Layanan Pemerintah Desa',

    deskripsi:
      'Masyarakat memperoleh akses terhadap informasi pelayanan kesehatan, pendidikan, sosial, lingkungan, ketenteraman dan perlindungan masyarakat, pekerjaan umum, pembangunan, kependudukan, keuangan, serta pelayanan desa lainnya.',

    icon: Globe2,

    bukti: [
      {
        no: 1,

        nama:
          'Informasi Standar Pelayanan Minimal Desa sesuai dengan ketentuan yang berlaku',

        dokumen2024: [
          {
            label:
              'SK SPM Desa',
          },
          {
            label:
              'SPM Ruang Pelayanan',
          },
          {
            label:
              'SPM Website',
          },
          {
            label:
              'Banner SPM',
          },
        ],

        dokumen2025: [
          {
            label:
              'SK SPM Desa',
          },
          {
            label:
              'SPM Ruang Pelayanan',
          },
          {
            label:
              'SPM Website',
            href: '/layanan',
          },
          {
            label:
              'Banner SPM',
          },
        ],
      },
      {
        no: 2,

        nama:
          'Media informasi pelayanan berupa poster, banner, media sosial, dan website desa',

        dokumen2024: [
          {
            label:
              'Website Desa',
          },
          {
            label:
              'Data Website',
          },
          {
            label:
              'YouTube Desa',
          },
          {
            label:
              'Instagram Desa',
          },
          {
            label:
              'Banner Pelayanan',
          },
        ],

        dokumen2025: [
          {
            label:
              'Website Desa',
            href:
              'https://keji-ungaranbarat.semarangkab.go.id/',
            external: true,
          },
          {
            label:
              'Data Website',
            href: '/data-desa',
          },
          {
            label:
              'YouTube Desa',
          },
          {
            label:
              'Instagram Desa',
          },
          {
            label:
              'Banner Pelayanan',
          },
        ],
      },
    ],
  },
  {
    kode: 'III.4',

    judul:
      'Adanya Media Informasi APBDes yang Mudah Diakses Masyarakat',

    deskripsi:
      'Pemerintah Desa mempublikasikan informasi APBDes melalui baliho, poster, website, media sosial, dan lokasi strategis lainnya sebagai bentuk transparansi pengelolaan keuangan desa.',

    icon: FileText,

    bukti: [
      {
        no: 1,

        nama:
          'Baliho atau poster APBDes yang memuat sumber pendapatan, prioritas penggunaan Dana Desa, alokasi belanja, dan kontak pengaduan',

        dokumen2024: [
          {
            label:
              'Infografis Realisasi APBDes 2024',
            href:
              '/informasi-publik/apbdes/2024',
          },
          {
            label:
              'Dokumentasi Infografis di Balai Desa',
          },
        ],

        dokumen2025: [
          {
            label:
              'Infografis APBDes 2025',
            href:
              '/informasi-publik/apbdes/2025',
          },
          {
            label:
              'Dokumentasi Infografis di Balai Desa',
          },
        ],
      },
      {
        no: 2,

        nama:
          'Dokumentasi lokasi pemasangan media APBDes di kantor desa, dusun, website, media sosial, dan lokasi strategis lainnya',

        dokumen2024: [
          {
            label:
              'Infografis Dusun Keji',
          },
          {
            label:
              'Infografis Dusun Suruhan',
          },
          {
            label:
              'Infografis Dusun Sitoyo',
          },
          {
            label:
              'Publikasi Website',
            href:
              '/informasi-publik/apbdes/2024',
          },
          {
            label:
              'Publikasi Media Sosial',
          },
        ],

        dokumen2025: [
          {
            label:
              'Infografis Dusun Keji',
          },
          {
            label:
              'Infografis Dusun Suruhan',
          },
          {
            label:
              'Infografis Dusun Sitoyo',
          },
          {
            label:
              'Publikasi Website',
            href:
              '/informasi-publik/apbdes/2025',
          },
          {
            label:
              'Publikasi Media Sosial',
          },
        ],
      },
    ],
  },
  {
    kode: 'III.5',

    judul:
      'Adanya Maklumat Pelayanan',

    deskripsi:
      'Maklumat pelayanan merupakan pernyataan komitmen Pemerintah Desa dalam memberikan pelayanan sesuai standar, bertanggung jawab, dan siap menerima konsekuensi apabila pelayanan tidak dilaksanakan sebagaimana mestinya.',

    icon: ScrollText,

    bukti: [
      {
        no: 1,

        nama:
          'Isi Maklumat Pelayanan sesuai dengan ketentuan pelayanan publik yang berlaku',

        dokumen2024: [
          {
            label:
              'Maklumat Pelayanan di Website',
          },
          {
            label:
              'Video Maklumat Pemerintah Desa',
          },
        ],

        dokumen2025: [
          {
            label:
              'Maklumat Pelayanan di Website',
          },
          {
            label:
              'Video Maklumat Pemerintah Desa',
          },
        ],
      },
      {
        no: 2,

        nama:
          'Maklumat pelayanan memuat komitmen aparatur desa, konsekuensi hukum, serta ditandatangani oleh Kepala Desa',

        dokumen2024: [
          {
            label:
              'Dokumen Maklumat Pelayanan',
          },
          {
            label:
              'Maklumat Ditandatangani Kepala Desa',
          },
        ],

        dokumen2025: [
          {
            label:
              'Dokumen Maklumat Pelayanan',
          },
          {
            label:
              'Maklumat Ditandatangani Kepala Desa',
          },
        ],
      },
      {
        no: 3,

        nama:
          'Maklumat pelayanan dicetak dan dipasang di kantor desa, dusun, serta dipublikasikan melalui website dan media sosial',

        dokumen2024: [
          {
            label:
              'Maklumat Dusun Keji',
          },
          {
            label:
              'Maklumat Dusun Suruhan',
          },
          {
            label:
              'Maklumat Dusun Sitoyo',
          },
          {
            label:
              'Publikasi Website dan Media Sosial',
          },
        ],

        dokumen2025: [
          {
            label:
              'Maklumat Dusun Keji',
          },
          {
            label:
              'Maklumat Dusun Suruhan',
          },
          {
            label:
              'Maklumat Dusun Sitoyo',
          },
          {
            label:
              'Publikasi Website dan Media Sosial',
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
      'Gagal mengambil layanan pada halaman Pelayanan Publik:',
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

export default async function PelayananPublikPage() {
  const daftarLayanan =
    await getDaftarLayanan();

  const jumlahBukti =
    indikatorPelayananPublik.reduce(
      (total, indikator) =>
        total + indikator.bukti.length,
      0
    );

  const jumlahDokumen =
    indikatorPelayananPublik.reduce(
      (total, indikator) =>
        total +
        indikator.bukti.reduce(
          (subtotal, bukti) =>
            subtotal +
            bukti.dokumen2024.length +
            bukti.dokumen2025.length,
          0
        ),
      0
    );

  const jumlahTautanAktif =
    indikatorPelayananPublik.reduce(
      (total, indikator) =>
        total +
        indikator.bukti.reduce(
          (subtotal, bukti) =>
            subtotal +
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
            font-size: 8pt !important;
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
                  Penguatan Pelayanan Publik
                </h1>

                <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-500 md:text-base">
                  Informasi mengenai layanan
                  pengaduan, Survei Kepuasan
                  Masyarakat, keterbukaan informasi,
                  publikasi APBDes, dan Maklumat
                  Pelayanan Pemerintah Desa Keji.
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
                    <Megaphone size={28} />
                  </div>

                  <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-100 print:text-emerald-700">
                    Pemerintah Desa Keji
                  </p>

                  <h2 className="mt-3 max-w-3xl text-2xl font-black leading-tight md:text-3xl">
                    Pelayanan yang terbuka, mudah
                    diakses, dan berorientasi pada
                    kepuasan masyarakat
                  </h2>

                  <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-emerald-50/90 print:text-slate-600">
                    Penguatan pelayanan publik
                    dilaksanakan melalui penyediaan
                    kanal pengaduan, evaluasi
                    kepuasan masyarakat,
                    keterbukaan informasi,
                    transparansi APBDes, dan
                    penerapan Maklumat Pelayanan.
                  </p>
                </div>
              </section>

              {/* Statistik */}
              <section className="grid gap-4 sm:grid-cols-3">
                <StatistikCard
                  label="Indikator"
                  value={
                    indikatorPelayananPublik.length
                  }
                  icon={ClipboardCheck}
                />

                <StatistikCard
                  label="Jenis Bukti"
                  value={jumlahBukti}
                  icon={FileText}
                />

                <StatistikCard
                  label="Tautan Aktif"
                  value={jumlahTautanAktif}
                  icon={CheckCircle2}
                  description={`${jumlahDokumen} dokumen tercatat`}
                />
              </section>

              {/* Daftar indikator */}
              <section className="space-y-6">
                {indikatorPelayananPublik.map(
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
                      Pembaruan Dokumen Pelayanan
                    </h2>

                    <p className="mt-2 text-sm font-semibold leading-7 text-amber-800">
                      Dokumen pelayanan publik akan
                      diperbarui secara berkala
                      sesuai pelaksanaan kegiatan,
                      hasil survei, perkembangan
                      layanan, publikasi informasi,
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
  indikator: IndikatorPelayananPublik;
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
        <table className="print-table w-full min-w-[900px] border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-xs font-extrabold uppercase tracking-wider text-slate-500">
              <th className="w-16 px-5 py-4">
                No.
              </th>

              <th className="px-5 py-4">
                Bukti / Evidence / Dokumen
              </th>

              <th className="w-52 px-5 py-4">
                Link Akses 2024
              </th>

              <th className="w-52 px-5 py-4">
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
                      dokumen={
                        bukti.dokumen2024
                      }
                    />
                  </td>

                  <td className="px-5 py-4">
                    <DaftarDokumen
                      dokumen={
                        bukti.dokumen2025
                      }
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