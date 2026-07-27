// app/(public)/desa-anti-korupsi/tata-laksana/page.tsx

import {
  BadgeCheck,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  ExternalLink,
  FileCheck2,
  FileText,
  Handshake,
  Scale,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';

import CetakPdfButton from '@/components/anti-korupsi/CetakPdfButton';
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

type StatusDokumen =
  | 'Tersedia'
  | 'Perlu dilengkapi';

interface BuktiDokumen {
  no: number;
  nama: string;
  tahun: string;
  status: StatusDokumen;
  href?: string;
  external?: boolean;
}

interface IndikatorTataLaksana {
  kode: string;
  judul: string;
  deskripsi: string;
  icon: LucideIcon;
  dokumen: BuktiDokumen[];
}

/*
 * Ubah status dan href pada bagian ini
 * ketika dokumen Desa Keji sudah tersedia.
 */
const indikatorTataLaksana:
  IndikatorTataLaksana[] = [
    {
      kode: 'I.1',

      judul:
        'Perencanaan, Pelaksanaan, Penatausahaan, dan Pertanggungjawaban APBDes',

      deskripsi:
        'Ketersediaan regulasi, dokumen perencanaan, pelaksanaan, penatausahaan, pelaporan, dan pertanggungjawaban APBDes beserta bukti implementasinya.',

      icon: FileCheck2,

      dokumen: [
        {
          no: 1,
          nama:
            'Rencana Pembangunan Jangka Menengah Desa (RPJMDes)',
          tahun:
            '2020–2028',
          status:
            'Tersedia',
          href:
            'https://drive.google.com/file/d/144eXukbqxtmsCkPqBc7TxskQIQXhBw5E/view?usp=sharing',
          external: true,
        },
        {
          no: 2,
          nama:
            'Rencana Kerja Pemerintah Desa (RKPDes)',
          tahun: '2026',
          status:
            'Perlu dilengkapi',
        },
        {
          no: 3,
          nama:
            'Anggaran Pendapatan dan Belanja Desa (APBDes)',
          tahun: '2024',
          status:
            'Tersedia',
          href:
            '/informasi-publik/apbdes/2024',
        },
        {
          no: 4,
          nama:
            'Anggaran Pendapatan dan Belanja Desa (APBDes)',
          tahun: '2025',
          status:
            'Tersedia',
          href:
            '/informasi-publik/apbdes/2025',
        },
        {
          no: 5,
          nama:
            'Anggaran Pendapatan dan Belanja Desa (APBDes)',
          tahun: '2026',
          status:
            'Tersedia',
          href:
            '/informasi-publik/apbdes/2026',
        },
        {
          no: 6,
          nama:
            'Perubahan Anggaran Pendapatan dan Belanja Desa',
          tahun: '2026',
          status:
            'Perlu dilengkapi',
        },
        {
          no: 7,
          nama:
            'Laporan pertanggungjawaban pelaksanaan APBDes',
          tahun: '2025',
          status:
            'Perlu dilengkapi',
        },
        {
          no: 8,
          nama:
            'Undangan Musyawarah Desa dan Musrenbangdes',
          tahun: '2026',
          status:
            'Perlu dilengkapi',
        },
        {
          no: 9,
          nama:
            'Berita acara dan notulensi penyusunan regulasi',
          tahun: '2026',
          status:
            'Perlu dilengkapi',
        },
        {
          no: 10,
          nama:
            'Daftar hadir penyusunan regulasi',
          tahun: '2026',
          status:
            'Perlu dilengkapi',
        },
        {
          no: 11,
          nama:
            'Dokumentasi penyusunan dan penetapan regulasi',
          tahun: '2026',
          status:
            'Perlu dilengkapi',
        },
        {
          no: 12,
          nama:
            'Laporan pertanggungjawaban BUM Desa',
          tahun: '2026',
          status:
            'Perlu dilengkapi',
        },
      ],
    },
    {
      kode: 'I.2',

      judul:
        'Mekanisme Evaluasi Kinerja Perangkat Desa',

      deskripsi:
        'Ketersediaan regulasi dan pelaksanaan evaluasi kinerja perangkat desa berdasarkan struktur organisasi, tugas, fungsi, tanggung jawab, serta indikator kinerja.',

      icon: ClipboardCheck,

      dokumen: [
        {
          no: 1,
          nama:
            'Struktur Organisasi dan Tata Kerja Pemerintah Desa',
          tahun: 'Berlaku',
          status:
            'Tersedia',
          href:
            '/pemerintahan',
        },
        {
          no: 2,
          nama:
            'Peraturan atau SOP evaluasi kinerja perangkat desa',
          tahun: '2026',
          status:
            'Perlu dilengkapi',
        },
        {
          no: 3,
          nama:
            'Undangan penyusunan regulasi evaluasi kinerja',
          tahun: '2026',
          status:
            'Perlu dilengkapi',
        },
        {
          no: 4,
          nama:
            'Notulensi, daftar hadir, dan dokumentasi penyusunan regulasi',
          tahun: '2026',
          status:
            'Perlu dilengkapi',
        },
        {
          no: 5,
          nama:
            'Formulir evaluasi kinerja perangkat desa',
          tahun: '2026',
          status:
            'Perlu dilengkapi',
        },
      ],
    },
    {
      kode: 'I.3',

      judul:
        'Pengendalian Gratifikasi, Suap, dan Konflik Kepentingan',

      deskripsi:
        'Ketersediaan peraturan dan mekanisme pencegahan serta penanganan gratifikasi, suap, dan benturan kepentingan di lingkungan Pemerintah Desa Keji.',

      icon: ShieldCheck,

      dokumen: [
        {
          no: 1,
          nama:
            'Peraturan atau SOP pengendalian gratifikasi',
          tahun: '2026',
          status:
            'Perlu dilengkapi',
        },
        {
          no: 2,
          nama:
            'Peraturan atau SOP pencegahan suap',
          tahun: '2026',
          status:
            'Perlu dilengkapi',
        },
        {
          no: 3,
          nama:
            'Peraturan atau SOP penanganan konflik kepentingan',
          tahun: '2026',
          status:
            'Perlu dilengkapi',
        },
        {
          no: 4,
          nama:
            'Undangan penyusunan regulasi',
          tahun: '2026',
          status:
            'Perlu dilengkapi',
        },
        {
          no: 5,
          nama:
            'Notulensi, daftar hadir, dan dokumentasi',
          tahun: '2026',
          status:
            'Perlu dilengkapi',
        },
        {
          no: 6,
          nama:
            'Formulir deklarasi benturan kepentingan',
          tahun: '2026',
          status:
            'Perlu dilengkapi',
        },
      ],
    },
    {
      kode: 'I.4',

      judul:
        'Pengadaan Barang dan Jasa Pemerintah Desa',

      deskripsi:
        'Pelaksanaan pengadaan barang dan jasa dilaksanakan secara tertib, transparan, dapat dipertanggungjawabkan, dan dilengkapi perjanjian kerja sama dengan penyedia.',

      icon: Handshake,

      dokumen: [
        {
          no: 1,
          nama:
            'Dokumen perencanaan pengadaan barang dan jasa',
          tahun: '2026',
          status:
            'Perlu dilengkapi',
        },
        {
          no: 2,
          nama:
            'Kerangka Acuan Kerja, spesifikasi teknis, dan HPS',
          tahun: '2026',
          status:
            'Perlu dilengkapi',
        },
        {
          no: 3,
          nama:
            'Undangan Pemerintah Desa kepada penyedia',
          tahun: '2026',
          status:
            'Perlu dilengkapi',
        },
        {
          no: 4,
          nama:
            'Surat penawaran dari penyedia barang atau jasa',
          tahun: '2026',
          status:
            'Perlu dilengkapi',
        },
        {
          no: 5,
          nama:
            'Surat Keputusan Tim Pelaksana Kegiatan',
          tahun: '2026',
          status:
            'Perlu dilengkapi',
        },
        {
          no: 6,
          nama:
            'Perjanjian kerja sama dengan penyedia',
          tahun: '2026',
          status:
            'Perlu dilengkapi',
        },
        {
          no: 7,
          nama:
            'Dokumentasi pelaksanaan pengadaan barang dan jasa',
          tahun: '2026',
          status:
            'Perlu dilengkapi',
        },
      ],
    },
    {
      kode: 'I.5',

      judul:
        'Pakta Integritas Pemerintah Desa',

      deskripsi:
        'Komitmen tertulis Pemerintah Desa Keji dalam menjalankan pemerintahan secara jujur, transparan, bertanggung jawab, dan bebas dari praktik korupsi.',

      icon: Scale,

      dokumen: [
        {
          no: 1,
          nama:
            'Peraturan atau Keputusan Kepala Desa tentang Pakta Integritas',
          tahun: '2026',
          status:
            'Perlu dilengkapi',
        },
        {
          no: 2,
          nama:
            'Dokumen Pakta Integritas yang ditandatangani perangkat desa',
          tahun: '2026',
          status:
            'Perlu dilengkapi',
        },
        {
          no: 3,
          nama:
            'Undangan penyusunan Pakta Integritas',
          tahun: '2026',
          status:
            'Perlu dilengkapi',
        },
        {
          no: 4,
          nama:
            'Notulensi, daftar hadir, dan dokumentasi penyusunan',
          tahun: '2026',
          status:
            'Perlu dilengkapi',
        },
      ],
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
      'Gagal mengambil layanan pada halaman Tata Laksana:',
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
        item.nama.length >
          0 &&
        item.slug.length >
          0
    );
}

export default async function TataLaksanaPage() {
  const daftarLayanan =
    await getDaftarLayanan();

  const jumlahDokumen =
    indikatorTataLaksana.reduce(
      (
        total,
        indikator
      ) =>
        total +
        indikator.dokumen
          .length,
      0
    );

  const dokumenTersedia =
    indikatorTataLaksana.reduce(
      (
        total,
        indikator
      ) =>
        total +
        indikator.dokumen.filter(
          (dokumen) =>
            dokumen.status ===
            'Tersedia'
        ).length,
      0
    );

  return (
    <>
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 14mm;
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
            max-width: none !important;
            width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }

          .print-main {
            width: 100% !important;
          }

          .print-card {
            box-shadow: none !important;
            break-inside: avoid;
          }

          .print-table {
            font-size: 9pt !important;
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
                  <ShieldCheck
                    size={16}
                  />

                  Desa Anti Korupsi
                </div>

                <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                  Penguatan Tata
                  Laksana
                </h1>

                <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-500 md:text-base">
                  Informasi mengenai
                  regulasi, prosedur,
                  pelaksanaan, dan
                  dokumen pendukung
                  tata kelola
                  Pemerintah Desa
                  Keji dalam
                  mewujudkan
                  pemerintahan yang
                  transparan,
                  akuntabel, dan
                  berintegritas.
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
                    <BadgeCheck
                      size={28}
                    />
                  </div>

                  <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-100 print:text-emerald-700">
                    Pemerintah Desa
                    Keji
                  </p>

                  <h2 className="mt-3 max-w-3xl text-2xl font-black leading-tight md:text-3xl">
                    Tata kelola yang
                    tertib,
                    transparan, dan
                    dapat
                    dipertanggungjawabkan
                  </h2>

                  <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-emerald-50/90 print:text-slate-600">
                    Penguatan tata
                    laksana dilakukan
                    melalui
                    penyusunan
                    regulasi,
                    penerapan
                    prosedur,
                    dokumentasi
                    kegiatan, serta
                    keterbukaan akses
                    terhadap dokumen
                    pemerintahan
                    desa.
                  </p>
                </div>
              </section>

              {/* Statistik */}
              <section className="grid gap-4 sm:grid-cols-3">
                <StatistikCard
                  label="Indikator"
                  value={
                    indikatorTataLaksana.length
                  }
                  icon={
                    ClipboardCheck
                  }
                />

                <StatistikCard
                  label="Daftar Dokumen"
                  value={
                    jumlahDokumen
                  }
                  icon={FileText}
                />

                <StatistikCard
                  label="Dokumen Tersedia"
                  value={
                    dokumenTersedia
                  }
                  icon={
                    CheckCircle2
                  }
                />
              </section>

              {/* Daftar indikator */}
              <section className="space-y-6">
                {indikatorTataLaksana.map(
                  (
                    indikator
                  ) => (
                    <IndikatorCard
                      key={
                        indikator.kode
                      }
                      indikator={
                        indikator
                      }
                    />
                  )
                )}
              </section>

              {/* Catatan */}
              <section className="print-card rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                    <Clock3
                      size={21}
                    />
                  </div>

                  <div>
                    <h2 className="font-black text-amber-950">
                      Pembaruan
                      Dokumen
                    </h2>

                    <p className="mt-2 text-sm font-semibold leading-7 text-amber-800">
                      Dokumen tata
                      laksana akan
                      diperbarui secara
                      berkala sesuai
                      perkembangan
                      regulasi,
                      pelaksanaan
                      kegiatan, dan
                      kelengkapan
                      administrasi
                      Pemerintah Desa
                      Keji.
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
}: {
  label: string;
  value: number;
  icon: LucideIcon;
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
    </article>
  );
}

function IndikatorCard({
  indikator,
}: {
  indikator: IndikatorTataLaksana;
}) {
  const Icon =
    indikator.icon;

  return (
    <article className="print-card overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-white p-5 md:p-6 print:bg-white">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-700 text-white print:border print:border-slate-300 print:bg-white print:text-emerald-700">
            <Icon size={23} />
          </div>

          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-700">
              Indikator{' '}
              {indikator.kode}
            </p>

            <h2 className="mt-2 text-xl font-black leading-tight text-slate-900">
              {indikator.judul}
            </h2>

            <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
              {
                indikator.deskripsi
              }
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="print-table w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-xs font-extrabold uppercase tracking-wider text-slate-500">
              <th className="w-16 px-5 py-4">
                No.
              </th>

              <th className="px-5 py-4">
                Bukti / Evidence /
                Dokumen
              </th>

              <th className="w-28 px-5 py-4">
                Tahun
              </th>

              <th className="w-40 px-5 py-4">
                Status
              </th>

              <th className="w-36 px-5 py-4">
                Akses
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {indikator.dokumen.map(
              (dokumen) => (
                <tr
                  key={`${indikator.kode}-${dokumen.no}`}
                  className="align-top transition hover:bg-slate-50"
                >
                  <td className="px-5 py-4 text-sm font-black text-slate-500">
                    {dokumen.no}
                  </td>

                  <td className="px-5 py-4 text-sm font-semibold leading-6 text-slate-700">
                    {dokumen.nama}
                  </td>

                  <td className="px-5 py-4 text-sm font-bold text-slate-600">
                    {
                      dokumen.tahun
                    }
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge
                      status={
                        dokumen.status
                      }
                    />
                  </td>

                  <td className="px-5 py-4">
                    {dokumen.href ? (
                      <a
                        href={
                          dokumen.href
                        }
                        target={
                          dokumen.external
                            ? '_blank'
                            : undefined
                        }
                        rel={
                          dokumen.external
                            ? 'noopener noreferrer'
                            : undefined
                        }
                        className="inline-flex items-center gap-1.5 text-sm font-extrabold text-emerald-700 transition hover:text-emerald-900"
                      >
                        Buka

                        <ExternalLink
                          size={14}
                        />
                      </a>
                    ) : (
                      <span className="text-sm font-semibold text-slate-400">
                        —
                      </span>
                    )}
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

function StatusBadge({
  status,
}: {
  status: StatusDokumen;
}) {
  if (
    status ===
    'Tersedia'
  ) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-extrabold text-emerald-700">
        <CheckCircle2
          size={14}
        />

        Tersedia
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1.5 text-xs font-extrabold text-amber-700">
      <Clock3 size={14} />

      Perlu dilengkapi
    </span>
  );
}