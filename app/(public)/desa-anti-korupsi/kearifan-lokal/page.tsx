// app/(public)/desa-anti-korupsi/kearifan-lokal/page.tsx

import {
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  ExternalLink,
  FileText,
  HeartHandshake,
  Landmark,
  ShieldCheck,
  Sparkles,
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

interface BuktiKearifanLokal {
  no: number;
  nama: string;
  dokumen: DokumenAkses[];
}

interface IndikatorKearifanLokal {
  kode: string;
  judul: string;
  deskripsi: string;
  icon: LucideIcon;
  bukti: BuktiKearifanLokal[];
}

/*
 * Tambahkan href pada dokumen yang sudah tersedia.
 *
 * Dokumen lokal:
 *
 * {
 *   label: 'Artikel Tradisi Tethek Melek',
 *   href: '/documents/anti-korupsi/kearifan-lokal/tethek-melek.pdf',
 * }
 *
 * Google Drive:
 *
 * {
 *   label: 'Video Dukungan Tokoh Masyarakat',
 *   href: 'https://drive.google.com/file/d/ID_FILE/view',
 *   external: true,
 * }
 */

const indikatorKearifanLokal:
  IndikatorKearifanLokal[] = [
    {
      kode: 'V.1',

      judul:
        'Adanya Budaya Lokal atau Kearifan Lokal yang Mendorong Pencegahan Tindak Pidana Korupsi',

      deskripsi:
        'Pencegahan korupsi dilaksanakan dengan mengintegrasikan sembilan nilai antikorupsi ke dalam tradisi, kesenian, budaya, kegiatan sosial, serta nilai kehidupan masyarakat Desa Keji.',

      icon: Sparkles,

      bukti: [
        {
          no: 1,

          nama:
            'Kesenian, adat istiadat, motto, slogan, jargon, atau kegiatan masyarakat yang digunakan sebagai media sosialisasi pencegahan korupsi dengan memadukan sembilan nilai antikorupsi',

          dokumen: [
            {
              label:
                'Tradisi Tethek Melek',
            },
            {
              label:
                'Tradisi Pembuatan dan Pembagian Wajik',
            },
            {
              label:
                'Kesenian Karawitan',
            },
            {
              label:
                'Kesenian Drum Blek',
            },
            {
              label:
                'Kesenian Kuda Lumping',
            },
            {
              label:
                'Pasar Leginan Desa Keji',
            },
            {
              label:
                'Haul dan Pengajian Desa Keji',
            },
            {
              label:
                'Kegiatan Gotong Royong Masyarakat',
            },
          ],
        },
        {
          no: 2,

          nama:
            'Artikel atau video mengenai penerapan sembilan nilai antikorupsi melalui budaya dan kearifan lokal Desa Keji yang dipublikasikan melalui website atau media sosial',

          dokumen: [
            {
              label:
                'Artikel Kearifan Lokal dan Nilai Antikorupsi',
            },
            {
              label:
                'Video Sosialisasi Antikorupsi Berbasis Budaya Lokal',
            },
            {
              label:
                'Publikasi Website Desa',
            },
            {
              label:
                'Publikasi Media Sosial',
            },
          ],
        },
        {
          no: 3,

          nama:
            'Peraturan, Surat Keputusan Kepala Desa, atau Surat Edaran mengenai pelestarian kesenian, adat istiadat, dan penerapan nilai antikorupsi',

          dokumen: [
            {
              label:
                'SK Implementasi Nilai Antikorupsi',
            },
            {
              label:
                'Surat Edaran Pelestarian Kearifan Lokal',
            },
            {
              label:
                'Surat Edaran Pencegahan Korupsi',
            },
          ],
        },
        {
          no: 4,

          nama:
            'Dokumentasi pelaksanaan kegiatan budaya atau kesenian yang memuat pesan kejujuran, tanggung jawab, kepedulian, kedisiplinan, dan nilai antikorupsi lainnya',

          dokumen: [
            {
              label:
                'Dokumentasi Kegiatan Budaya',
            },
            {
              label:
                'Dokumentasi Kegiatan Kesenian',
            },
            {
              label:
                'Dokumentasi Sosialisasi Nilai Antikorupsi',
            },
          ],
        },
      ],
    },
    {
      kode: 'V.2',

      judul:
        'Adanya Tokoh Masyarakat yang Mendorong Upaya Pencegahan Tindak Pidana Korupsi',

      deskripsi:
        'Tokoh masyarakat, tokoh agama, tokoh adat, tokoh pemuda, dan kaum perempuan turut berperan dalam menanamkan nilai kejujuran, keterbukaan, tanggung jawab, serta pencegahan korupsi kepada masyarakat Desa Keji.',

      icon: UsersRound,

      bukti: [
        {
          no: 1,

          nama:
            'Surat Keputusan, deklarasi, atau surat pernyataan tokoh masyarakat, tokoh agama, tokoh adat, tokoh pemuda, dan kaum perempuan yang mendukung upaya pencegahan korupsi',

          dokumen: [
            {
              label:
                'SK Tokoh Penggerak Antikorupsi',
            },
            {
              label:
                'Deklarasi Dukungan Desa Antikorupsi',
            },
            {
              label:
                'Surat Pernyataan Dukungan Tokoh Masyarakat',
            },
          ],
        },
        {
          no: 2,

          nama:
            'Testimoni dari tokoh masyarakat, tokoh agama, tokoh adat, tokoh pemuda, dan kaum perempuan mengenai dukungan terhadap Desa Anti Korupsi',

          dokumen: [
            {
              label:
                'Video Dukungan Kepala Desa',
            },
            {
              label:
                'Video Dukungan Ketua BPD',
            },
            {
              label:
                'Video Dukungan Tokoh Agama',
            },
            {
              label:
                'Video Dukungan Tokoh Masyarakat',
            },
            {
              label:
                'Video Dukungan Karang Taruna',
            },
            {
              label:
                'Video Dukungan PKK',
            },
            {
              label:
                'Video Dukungan Kader Posyandu',
            },
            {
              label:
                'Video Dukungan Masyarakat',
            },
          ],
        },
        {
          no: 3,

          nama:
            'Bukti publikasi testimoni dan dukungan tokoh melalui website resmi desa dan media sosial',

          dokumen: [
            {
              label:
                'Bukti Publikasi Website',
            },
            {
              label:
                'Bukti Publikasi Instagram',
            },
            {
              label:
                'Bukti Publikasi Media Sosial Lainnya',
            },
          ],
        },
        {
          no: 4,

          nama:
            'Bukti aktivitas tokoh masyarakat dalam menyampaikan nilai integritas dan pencegahan korupsi kepada masyarakat',

          dokumen: [
            {
              label:
                'Sosialisasi Nilai Desa Antikorupsi',
            },
            {
              label:
                'Penyampaian Pesan Antikorupsi dalam Pertemuan Warga',
            },
            {
              label:
                'Penyampaian Pesan Antikorupsi dalam Kegiatan Keagamaan',
            },
            {
              label:
                'Dokumentasi Kegiatan Tokoh Masyarakat',
            },
          ],
        },
      ],
    },
  ];

const sembilanNilaiAntikorupsi = [
  {
    nama: 'Jujur',
    deskripsi:
      'Menyampaikan informasi dan menjalankan tugas sesuai keadaan yang sebenarnya.',
  },
  {
    nama: 'Peduli',
    deskripsi:
      'Memperhatikan kepentingan masyarakat dan lingkungan sekitar.',
  },
  {
    nama: 'Mandiri',
    deskripsi:
      'Melaksanakan tanggung jawab tanpa bergantung pada praktik yang tidak benar.',
  },
  {
    nama: 'Disiplin',
    deskripsi:
      'Mematuhi aturan, prosedur, dan waktu pelaksanaan kegiatan.',
  },
  {
    nama: 'Tanggung Jawab',
    deskripsi:
      'Siap mempertanggungjawabkan keputusan, anggaran, dan pelaksanaan kegiatan.',
  },
  {
    nama: 'Kerja Keras',
    deskripsi:
      'Berusaha secara sungguh-sungguh untuk memberikan pelayanan terbaik.',
  },
  {
    nama: 'Sederhana',
    deskripsi:
      'Mengutamakan kebutuhan dan menghindari perilaku berlebihan.',
  },
  {
    nama: 'Berani',
    deskripsi:
      'Berani menolak, melaporkan, dan mencegah tindakan korupsi.',
  },
  {
    nama: 'Adil',
    deskripsi:
      'Memberikan pelayanan dan memperlakukan masyarakat secara setara.',
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
      'Gagal mengambil layanan pada halaman Kearifan Lokal:',
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

export default async function KearifanLokalPage() {
  const daftarLayanan =
    await getDaftarLayanan();

  const jumlahBukti =
    indikatorKearifanLokal.reduce(
      (
        total,
        indikator
      ) =>
        total +
        indikator.bukti.length,
      0
    );

  const jumlahDokumen =
    indikatorKearifanLokal.reduce(
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
            bukti.dokumen.length,
          0
        ),
      0
    );

  const jumlahTautanAktif =
    indikatorKearifanLokal.reduce(
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
                  Penguatan Kearifan Lokal
                </h1>

                <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-500 md:text-base">
                  Informasi mengenai
                  pemanfaatan tradisi,
                  kesenian, budaya, dan
                  peran tokoh masyarakat
                  dalam menanamkan nilai
                  integritas serta
                  mencegah tindak pidana
                  korupsi di Desa Keji.
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
                    <Landmark
                      size={28}
                    />
                  </div>

                  <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-100 print:text-emerald-700">
                    Pemerintah Desa Keji
                  </p>

                  <h2 className="mt-3 max-w-3xl text-2xl font-black leading-tight md:text-3xl">
                    Menanamkan nilai
                    integritas melalui
                    budaya dan kearifan
                    lokal Desa Keji
                  </h2>

                  <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-emerald-50/90 print:text-slate-600">
                    Tradisi, kesenian,
                    kegiatan sosial, dan
                    keteladanan tokoh
                    masyarakat menjadi
                    sarana untuk
                    menyampaikan nilai
                    kejujuran, tanggung
                    jawab, kepedulian,
                    keberanian, dan
                    keadilan kepada
                    seluruh masyarakat.
                  </p>
                </div>
              </section>

              {/* Statistik */}
              <section className="grid gap-4 sm:grid-cols-3">
                <StatistikCard
                  label="Indikator"
                  value={
                    indikatorKearifanLokal.length
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

              {/* Sembilan nilai antikorupsi */}
              <section className="print-card rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                    <HeartHandshake
                      size={23}
                    />
                  </div>

                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-700">
                      Nilai Integritas
                    </p>

                    <h2 className="mt-2 text-xl font-black text-slate-900">
                      Sembilan Nilai
                      Antikorupsi
                    </h2>

                    <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
                      Nilai antikorupsi
                      diintegrasikan
                      dalam kegiatan
                      budaya, pelayanan,
                      pemerintahan, dan
                      kehidupan
                      masyarakat Desa
                      Keji.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {sembilanNilaiAntikorupsi.map(
                    (
                      nilai,
                      index
                    ) => (
                      <article
                        key={
                          nilai.nama
                        }
                        className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-700 text-xs font-black text-white">
                            {index +
                              1}
                          </span>

                          <h3 className="font-black text-slate-900">
                            {
                              nilai.nama
                            }
                          </h3>
                        </div>

                        <p className="mt-3 text-xs font-medium leading-5 text-slate-500">
                          {
                            nilai.deskripsi
                          }
                        </p>
                      </article>
                    )
                  )}
                </div>
              </section>

              {/* Daftar indikator */}
              <section className="space-y-6">
                {indikatorKearifanLokal.map(
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
                      Dokumen kearifan
                      lokal akan
                      diperbarui secara
                      berkala sesuai
                      pelaksanaan
                      kegiatan budaya,
                      sosialisasi,
                      publikasi,
                      testimoni, dan
                      keterlibatan tokoh
                      masyarakat Desa
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
  indikator: IndikatorKearifanLokal;
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

              <th className="w-72 px-5 py-4">
                Link Akses
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {indikator.bukti.map(
              (
                bukti
              ) => (
                <tr
                  key={`${indikator.kode}-${bukti.no}`}
                  className="align-top transition hover:bg-slate-50"
                >
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