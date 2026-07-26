// app/(public)/desa-anti-korupsi/partisipasi-masyarakat/page.tsx

import {
  Fragment,
} from 'react';

import {
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  ExternalLink,
  FileText,
  Handshake,
  MessageSquareText,
  ShieldCheck,
  UsersRound,
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

interface DokumenAkses {
  label: string;
  href?: string;
  external?: boolean;
}

interface BuktiPartisipasi {
  no: number;
  kelompok?: string;
  nama: string;
  dokumen: DokumenAkses[];
}

interface IndikatorPartisipasi {
  kode: string;
  judul: string;
  deskripsi: string;
  icon: LucideIcon;
  bukti: BuktiPartisipasi[];
}

/*
 * Tambahkan href ketika dokumen sudah tersedia.
 *
 * Contoh dokumen lokal:
 *
 * {
 *   label: 'Undangan Musdus 2025',
 *   href: '/documents/anti-korupsi/partisipasi-masyarakat/undangan-musdus-2025.pdf',
 * }
 *
 * Contoh Google Drive:
 *
 * {
 *   label: 'Notulensi Musdus 2025',
 *   href: 'https://drive.google.com/file/d/ID_FILE/view',
 *   external: true,
 * }
 */

const indikatorPartisipasi:
  IndikatorPartisipasi[] = [
    {
      kode: 'IV.1',

      judul:
        'Partisipasi dan Keterlibatan Masyarakat dalam Penyusunan RKP Desa',

      deskripsi:
        'Penyusunan Rencana Kerja Pemerintah Desa dilaksanakan dengan melibatkan masyarakat melalui musyawarah dusun, musyawarah kelompok, dan musyawarah desa agar perencanaan pembangunan sesuai dengan kebutuhan masyarakat.',

      icon: UsersRound,

      bukti: [
        {
          no: 1,

          kelompok:
            'Musyawarah Pemangku Kepentingan Dusun atau Kelompok',

          nama:
            'Undangan kepada masyarakat dusun atau kelompok untuk mengikuti kegiatan musyawarah',

          dokumen: [
            {
              label:
                'Undangan Musdus 2025',
            },
          ],
        },
        {
          no: 2,

          kelompok:
            'Musyawarah Pemangku Kepentingan Dusun atau Kelompok',

          nama:
            'Notulensi kegiatan yang memuat judul, waktu pelaksanaan, keterwakilan masyarakat, daftar usulan yang diajukan, serta hasil usulan yang disepakati atau belum disepakati',

          dokumen: [
            {
              label:
                'Notulensi Musdus 2025',
            },
          ],
        },
        {
          no: 3,

          kelompok:
            'Musyawarah Pemangku Kepentingan Dusun atau Kelompok',

          nama:
            'Daftar hadir peserta musyawarah dusun atau kelompok',

          dokumen: [
            {
              label:
                'Daftar Hadir Musdus 2024',
            },
            {
              label:
                'Daftar Hadir Musdus 2025',
            },
          ],
        },
        {
          no: 4,

          kelompok:
            'Musyawarah Pemangku Kepentingan Dusun atau Kelompok',

          nama:
            'Dokumentasi pelaksanaan musyawarah dusun atau kelompok',

          dokumen: [
            {
              label:
                'Foto Musdus 2024',
            },
            {
              label:
                'Foto Musdus 2025',
            },
          ],
        },
        {
          no: 5,

          kelompok:
            'Musyawarah Desa',

          nama:
            'Undangan kepada masyarakat desa untuk mengikuti Musyawarah Desa atau Musrenbangdes',

          dokumen: [
            {
              label:
                'Undangan Musrenbang RPJMDes',
            },
            {
              label:
                'Undangan Musrenbangdes 2025',
            },
          ],
        },
        {
          no: 6,

          kelompok:
            'Musyawarah Desa',

          nama:
            'Notulensi atau berita acara yang memuat judul, waktu kegiatan, keterwakilan masyarakat, daftar usulan dan biaya, serta hasil kesepakatan musyawarah',

          dokumen: [
            {
              label:
                'Berita Acara Musrenbangdes 2024',
            },
            {
              label:
                'Berita Acara Musrenbangdes 2025',
            },
          ],
        },
        {
          no: 7,

          kelompok:
            'Musyawarah Desa',

          nama:
            'Daftar hadir peserta Musyawarah Desa atau Musrenbangdes',

          dokumen: [
            {
              label:
                'Daftar Hadir Musrenbangdes 2024',
            },
            {
              label:
                'Daftar Hadir Musrenbangdes 2025',
            },
          ],
        },
        {
          no: 8,

          kelompok:
            'Musyawarah Desa',

          nama:
            'Dokumentasi pelaksanaan Musyawarah Desa dalam penyusunan RKP Desa',

          dokumen: [
            {
              label:
                'Dokumentasi Musdes RKPDes 2024',
            },
            {
              label:
                'Dokumentasi Musdes RKPDes 2025',
            },
          ],
        },
        {
          no: 9,

          kelompok:
            'Musyawarah Desa',

          nama:
            'Surat Keputusan Tim Penyusun RKP Desa',

          dokumen: [
            {
              label:
                'RKPDes 2024',
            },
            {
              label:
                'RKPDes 2025',
            },
          ],
        },
      ],
    },
    {
      kode: 'IV.2',

      judul:
        'Kesadaran Masyarakat dalam Mencegah Gratifikasi, Suap, dan Konflik Kepentingan',

      deskripsi:
        'Pemerintah Desa mendorong kesadaran masyarakat untuk tidak memberikan gratifikasi atau suap, menghindari konflik kepentingan, serta memahami dan menerapkan sembilan nilai antikorupsi dalam kehidupan bermasyarakat.',

      icon: ShieldCheck,

      bukti: [
        {
          no: 1,

          nama:
            'Survei perilaku masyarakat secara konvensional maupun digital mengenai gratifikasi, suap, konflik kepentingan, dan penerapan sembilan nilai antikorupsi',

          dokumen: [
            {
              label:
                'Survei Perilaku Masyarakat',
            },
            {
              label:
                'Survei Konflik Kepentingan',
            },
            {
              label:
                'Survei Implementasi 9 Nilai Antikorupsi',
            },
          ],
        },
        {
          no: 2,

          nama:
            'Hasil rekapitulasi, analisis, dan tindak lanjut Survei Perilaku Antikorupsi Masyarakat',

          dokumen: [
            {
              label:
                'Banner Survei Perilaku Masyarakat',
            },
            {
              label:
                'Survei Perilaku Masyarakat melalui Website',
            },
            {
              label:
                'Banner Survei di Kantor Desa',
            },
            {
              label:
                'Hasil Survei Perilaku Antikorupsi',
            },
          ],
        },
        {
          no: 3,

          nama:
            'Surat edaran mengenai pencegahan gratifikasi, suap, dan konflik kepentingan',

          dokumen: [
            {
              label:
                'Surat Edaran Antikorupsi',
            },
          ],
        },
        {
          no: 4,

          kelompok:
            'Sosialisasi kepada Masyarakat',

          nama:
            'Undangan pelaksanaan sosialisasi pencegahan gratifikasi, suap, dan konflik kepentingan',

          dokumen: [
            {
              label:
                'Undangan Sosialisasi',
            },
          ],
        },
        {
          no: 5,

          kelompok:
            'Sosialisasi kepada Masyarakat',

          nama:
            'Daftar hadir peserta kegiatan sosialisasi',

          dokumen: [
            {
              label:
                'Daftar Hadir Sosialisasi',
            },
          ],
        },
        {
          no: 6,

          kelompok:
            'Sosialisasi kepada Masyarakat',

          nama:
            'Notulensi pelaksanaan kegiatan sosialisasi',

          dokumen: [
            {
              label:
                'Notulensi Sosialisasi',
            },
          ],
        },
        {
          no: 7,

          kelompok:
            'Sosialisasi kepada Masyarakat',

          nama:
            'Dokumentasi pelaksanaan kegiatan sosialisasi',

          dokumen: [
            {
              label:
                'Dokumentasi Sosialisasi',
            },
          ],
        },
        {
          no: 8,

          kelompok:
            'Sosialisasi kepada Masyarakat',

          nama:
            'Digitalisasi sosialisasi melalui video atau testimoni masyarakat penerima pelayanan',

          dokumen: [
            {
              label:
                'Testimoni Masyarakat 1',
            },
            {
              label:
                'Testimoni Masyarakat 2',
            },
            {
              label:
                'Testimoni Masyarakat 3',
            },
          ],
        },
        {
          no: 9,

          nama:
            'Deklarasi konflik kepentingan yang telah diisi aparatur desa dan dipublikasikan kepada masyarakat',

          dokumen: [
            {
              label:
                'Deklarasi Benturan Kepentingan',
            },
          ],
        },
      ],
    },
    {
      kode: 'IV.3',

      judul:
        'Keterlibatan Lembaga Kemasyarakatan dalam Pelaksanaan Pembangunan Desa',

      deskripsi:
        'Lembaga kemasyarakatan dan masyarakat dilibatkan dalam tahapan persiapan, pelaksanaan, pengawasan, serta pertanggungjawaban kegiatan pembangunan desa.',

      icon: Handshake,

      bukti: [
        {
          no: 1,

          nama:
            'Undangan atau pengumuman kepada masyarakat sebelum dan setelah pelaksanaan pekerjaan pembangunan',

          dokumen: [
            {
              label:
                'Undangan Pra-Pekerjaan',
            },
            {
              label:
                'Undangan Pasca-Pekerjaan',
            },
          ],
        },
        {
          no: 2,

          nama:
            'Notulensi atau berita acara kegiatan yang memuat waktu pelaksanaan, keterwakilan masyarakat, dan tanda tangan Pemerintah Desa serta perwakilan masyarakat',

          dokumen: [
            {
              label:
                'Notulensi Pra-Pekerjaan',
            },
            {
              label:
                'Notulensi Pasca-Pekerjaan',
            },
          ],
        },
        {
          no: 3,

          nama:
            'Tanda terima pembayaran upah atau daftar hadir masyarakat yang terlibat dalam pekerjaan pembangunan',

          dokumen: [
            {
              label:
                'Tanda Terima Pembayaran Upah',
            },
            {
              label:
                'Daftar Hadir Pekerja',
            },
          ],
        },
        {
          no: 4,

          nama:
            'Laporan pertanggungjawaban pelaksanaan pembangunan desa beserta dokumentasi kegiatan',

          dokumen: [
            {
              label:
                'LPJ Kegiatan Pembangunan',
            },
            {
              label:
                'Foto Kegiatan Pembangunan',
            },
          ],
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
      'Gagal mengambil layanan pada halaman Partisipasi Masyarakat:',
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

export default async function PartisipasiMasyarakatPage() {
  const daftarLayanan =
    await getDaftarLayanan();

  const jumlahBukti =
    indikatorPartisipasi.reduce(
      (
        total,
        indikator
      ) =>
        total +
        indikator.bukti
          .length,
      0
    );

  const jumlahDokumen =
    indikatorPartisipasi.reduce(
      (
        total,
        indikator
      ) =>
        total +
        indikator.bukti.reduce(
          (
            subtotal,
            bukti
          ) =>
            subtotal +
            bukti.dokumen
              .length,
          0
        ),
      0
    );

  const jumlahTautanAktif =
    indikatorPartisipasi.reduce(
      (
        total,
        indikator
      ) =>
        total +
        indikator.bukti.reduce(
          (
            subtotal,
            bukti
          ) =>
            subtotal +
            bukti.dokumen.filter(
              (dokumen) =>
                Boolean(
                  dokumen.href
                )
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
          {/* Header halaman */}
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
                  Penguatan Partisipasi
                  Masyarakat
                </h1>

                <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-500 md:text-base">
                  Informasi mengenai
                  keterlibatan masyarakat
                  dalam penyusunan RKP
                  Desa, pencegahan
                  gratifikasi dan suap,
                  serta pelaksanaan
                  pembangunan Desa Keji.
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
                    <MessageSquareText
                      size={28}
                    />
                  </div>

                  <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-100 print:text-emerald-700">
                    Pemerintah Desa
                    Keji
                  </p>

                  <h2 className="mt-3 max-w-3xl text-2xl font-black leading-tight md:text-3xl">
                    Masyarakat terlibat
                    dalam perencanaan,
                    pengawasan, dan
                    pembangunan desa
                  </h2>

                  <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-emerald-50/90 print:text-slate-600">
                    Partisipasi
                    masyarakat menjadi
                    unsur penting dalam
                    mewujudkan tata
                    kelola pemerintahan
                    desa yang
                    transparan,
                    akuntabel, dan
                    sesuai dengan
                    kebutuhan warga.
                  </p>
                </div>
              </section>

              {/* Statistik */}
              <section className="grid gap-4 sm:grid-cols-3">
                <StatistikCard
                  label="Indikator"
                  value={
                    indikatorPartisipasi.length
                  }
                  icon={
                    ClipboardCheck
                  }
                />

                <StatistikCard
                  label="Jenis Bukti"
                  value={
                    jumlahBukti
                  }
                  icon={FileText}
                />

                <StatistikCard
                  label="Tautan Aktif"
                  value={
                    jumlahTautanAktif
                  }
                  icon={
                    CheckCircle2
                  }
                  description={`${jumlahDokumen} dokumen tercatat`}
                />
              </section>

              {/* Daftar indikator */}
              <section className="space-y-6">
                {indikatorPartisipasi.map(
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
                      Pembaruan Dokumen
                    </h2>

                    <p className="mt-2 text-sm font-semibold leading-7 text-amber-800">
                      Dokumen partisipasi
                      masyarakat akan
                      diperbarui secara
                      berkala sesuai
                      pelaksanaan
                      musyawarah,
                      sosialisasi,
                      survei, dan
                      kegiatan
                      pembangunan Desa
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
  indikator: IndikatorPartisipasi;
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
        <table className="print-table w-full min-w-[820px] border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-xs font-extrabold uppercase tracking-wider text-slate-500">
              <th className="w-16 px-5 py-4">
                No.
              </th>

              <th className="px-5 py-4">
                Bukti / Evidence /
                Dokumen
              </th>

              <th className="w-64 px-5 py-4">
                Link Akses
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {indikator.bukti.map(
              (
                bukti,
                index
              ) => {
                const kelompokSebelumnya =
                  index > 0
                    ? indikator
                        .bukti[
                          index -
                            1
                        ]
                        .kelompok
                    : null;

                const tampilkanKelompok =
                  Boolean(
                    bukti.kelompok
                  ) &&
                  bukti.kelompok !==
                    kelompokSebelumnya;

                return (
                  <Fragment
                    key={`${indikator.kode}-${bukti.no}`}
                  >
                    {tampilkanKelompok && (
                      <tr className="bg-emerald-50/70">
                        <td
                          colSpan={
                            3
                          }
                          className="px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-emerald-700"
                        >
                          {
                            bukti.kelompok
                          }
                        </td>
                      </tr>
                    )}

                    <tr className="align-top transition hover:bg-slate-50">
                      <td className="px-5 py-4 text-sm font-black text-slate-500">
                        {
                          bukti.no
                        }
                      </td>

                      <td className="px-5 py-4 text-sm font-semibold leading-6 text-slate-700">
                        {
                          bukti.nama
                        }
                      </td>

                      <td className="px-5 py-4">
                        <DaftarDokumen
                          dokumen={
                            bukti.dokumen
                          }
                        />
                      </td>
                    </tr>
                  </Fragment>
                );
              }
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
  if (
    dokumen.length === 0
  ) {
    return (
      <span className="text-sm font-semibold text-slate-400">
        —
      </span>
    );
  }

  return (
    <div className="flex flex-col items-start gap-2">
      {dokumen.map(
        (
          item,
          index
        ) =>
          item.href ? (
            <a
              key={`${item.label}-${index}`}
              href={
                item.href
              }
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
              {
                item.label
              }

              <ExternalLink
                size={13}
              />
            </a>
          ) : (
            <div
              key={`${item.label}-${index}`}
              className="flex flex-col items-start gap-1"
            >
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-2 text-xs font-extrabold text-slate-600">
                <FileText
                  size={13}
                />

                {
                  item.label
                }
              </span>

              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 print:hidden">
                <Clock3
                  size={11}
                />

                Tautan belum
                ditambahkan
              </span>
            </div>
          )
      )}
    </div>
  );
}