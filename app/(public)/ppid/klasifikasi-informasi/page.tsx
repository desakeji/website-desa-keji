// app/(public)/ppid/klasifikasi-informasi/page.tsx

import Link from 'next/link';

import {
  AlertTriangle,
  ArrowRight,
  BellRing,
  BookOpenCheck,
  CheckCircle2,
  Clock3,
  Eye,
  FileCheck2,
  FileLock2,
  FileSearch,
  Landmark,
  Megaphone,
  Scale,
  ShieldAlert,
  ShieldCheck,
  Siren,
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

interface TujuanItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface KlasifikasiItem {
  title: string;
  description?: string;
  href?: string;
}

type KlasifikasiVariant =
  | 'emerald'
  | 'amber'
  | 'cyan'
  | 'rose';

interface KlasifikasiSectionProps {
  id: string;
  label: string;
  title: string;
  description: string;
  schedule?: string;
  icon: LucideIcon;
  variant: KlasifikasiVariant;
  items: KlasifikasiItem[];
  note?: string;
}

const tujuanKlasifikasi:
  TujuanItem[] = [
    {
      title:
        'Mempermudah Akses Informasi',
      description:
        'Masyarakat dapat mengetahui jenis informasi yang tersedia dan cara memperolehnya.',
      icon: FileSearch,
    },
    {
      title:
        'Meningkatkan Transparansi',
      description:
        'Informasi pemerintahan, pembangunan, dan pelayanan desa disampaikan secara terbuka.',
      icon: Eye,
    },
    {
      title:
        'Meningkatkan Partisipasi',
      description:
        'Masyarakat dapat menggunakan informasi publik untuk berpartisipasi dalam pembangunan desa.',
      icon: Users,
    },
    {
      title:
        'Melindungi Informasi',
      description:
        'Data pribadi dan informasi yang dikecualikan tetap dilindungi sesuai ketentuan.',
      icon: ShieldCheck,
    },
  ];

const informasiBerkala:
  KlasifikasiItem[] = [
    {
      title:
        'Profil Desa Keji',
      description:
        'Informasi umum mengenai kondisi, potensi, dan karakteristik Desa Keji.',
      href:
        '/profil/data',
    },
    {
      title:
        'Visi dan Misi Desa',
      description:
        'Arah, tujuan, dan prioritas Pemerintah Desa Keji.',
      href:
        '/profil/visi-misi',
    },
    {
      title:
        'Struktur Pemerintah Desa',
      description:
        'Susunan organisasi dan tata kerja Pemerintah Desa Keji.',
      href:
        '/pemerintahan',
    },
    {
      title:
        'Program dan Kegiatan Desa',
      description:
        'Informasi mengenai rencana kerja, program pembangunan, dan kegiatan desa.',
      href:
        '/informasi-publik/informasi-umum',
    },
    {
      title:
        'Informasi APBDes',
      description:
        'Informasi anggaran dan realisasi pendapatan serta belanja Desa Keji.',
      href:
        '/informasi-publik/apbdes/2026',
    },
    {
      title:
        'Laporan Pelayanan Publik',
      description:
        'Informasi pelaksanaan pelayanan administrasi dan pelayanan masyarakat.',
      href:
        '/layanan',
    },
  ];

const informasiSertaMerta:
  KlasifikasiItem[] = [
    {
      title:
        'Informasi Bencana',
      description:
        'Informasi mengenai banjir, tanah longsor, kebakaran, angin kencang, dan keadaan darurat lainnya.',
    },
    {
      title:
        'Informasi Gangguan Pelayanan',
      description:
        'Pemberitahuan mengenai gangguan atau perubahan sementara pelayanan Pemerintah Desa.',
    },
    {
      title:
        'Informasi Kesehatan Masyarakat',
      description:
        'Peringatan mengenai wabah, risiko kesehatan, atau kondisi yang berpotensi mengganggu masyarakat.',
    },
    {
      title:
        'Informasi Keamanan dan Ketertiban',
      description:
        'Informasi mendesak yang berkaitan dengan keselamatan, keamanan, dan ketertiban warga.',
    },
    {
      title:
        'Informasi Infrastruktur Darurat',
      description:
        'Informasi mengenai jalan rusak, jembatan bermasalah, listrik, air, atau fasilitas publik yang membahayakan.',
    },
    {
      title:
        'Pengumuman Mendesak Pemerintah Desa',
      description:
        'Pengumuman yang harus diketahui masyarakat tanpa penundaan.',
      href:
        '/berita',
    },
  ];

const informasiSetiapSaat:
  KlasifikasiItem[] = [
    {
      title:
        'RPJMDes dan RKPDes',
      description:
        'Dokumen perencanaan pembangunan jangka menengah dan tahunan Desa Keji.',
      href:
        '/informasi-publik/informasi-umum',
    },
    {
      title:
        'Produk Hukum Desa',
      description:
        'Peraturan Desa, Peraturan Kepala Desa, keputusan, dan dokumen hukum lainnya.',
      href:
        '/informasi-publik/produk-hukum',
    },
    {
      title:
        'APBDes dan Realisasi Anggaran',
      description:
        'Dokumen anggaran, perubahan anggaran, serta laporan realisasi APBDes.',
      href:
        '/informasi-publik/apbdes/2026',
    },
    {
      title:
        'Daftar Inventaris dan Aset Desa',
      description:
        'Informasi mengenai barang, tanah, bangunan, dan aset yang dikelola Pemerintah Desa.',
    },
    {
      title:
        'Data Kependudukan Agregat',
      description:
        'Statistik jumlah penduduk berdasarkan wilayah, umur, dan jenis kelamin tanpa menampilkan data pribadi.',
      href:
        '/data-desa/populasi-wilayah',
    },
    {
      title:
        'Informasi Pelayanan Administrasi',
      description:
        'Daftar jenis layanan, persyaratan, prosedur, waktu pelayanan, dan biaya.',
      href:
        '/layanan',
    },
    {
      title:
        'Daftar Informasi Publik',
      description:
        'Dokumen dan informasi resmi yang telah dinyatakan terbuka untuk masyarakat.',
      href:
        '/informasi-publik/informasi-umum',
    },
    {
      title:
        'Profil dan Struktur PPID',
      description:
        'Informasi mengenai kelembagaan, tugas, kontak, dan susunan pengurus PPID Desa Keji.',
      href:
        '/ppid/profil',
    },
  ];

const informasiDikecualikan:
  KlasifikasiItem[] = [
    {
      title:
        'Informasi yang Menghambat Penegakan Hukum',
      description:
        'Informasi yang apabila dibuka dapat menghambat penyelidikan, penyidikan, atau proses hukum.',
    },
    {
      title:
        'Informasi Hak Kekayaan Intelektual',
      description:
        'Informasi yang dapat mengganggu perlindungan kekayaan intelektual atau persaingan usaha yang sehat.',
    },
    {
      title:
        'Informasi Pertahanan dan Keamanan',
      description:
        'Informasi yang apabila dibuka dapat membahayakan pertahanan atau keamanan negara.',
    },
    {
      title:
        'Informasi Kekayaan Alam Tertentu',
      description:
        'Informasi yang menurut ketentuan tidak dapat diumumkan karena berkaitan dengan perlindungan sumber daya.',
    },
    {
      title:
        'Informasi Ketahanan Ekonomi',
      description:
        'Informasi yang apabila dibuka dapat merugikan ketahanan ekonomi atau kepentingan publik yang lebih luas.',
    },
    {
      title:
        'Informasi Hubungan Luar Negeri',
      description:
        'Informasi yang dapat merugikan kepentingan hubungan luar negeri.',
    },
    {
      title:
        'Akta Otentik, Wasiat, dan Dokumen Pribadi',
      description:
        'Dokumen yang berkaitan dengan kehendak terakhir, wasiat, atau hak privat seseorang.',
    },
    {
      title:
        'Rahasia Pribadi',
      description:
        'NIK, nomor KK, data kesehatan, kondisi keuangan, alamat rinci, nomor pribadi, dan data personal lainnya.',
    },
    {
      title:
        'Memorandum atau Surat Internal',
      description:
        'Komunikasi internal yang menurut sifatnya dirahasiakan, kecuali dinyatakan terbuka berdasarkan keputusan yang sah.',
    },
    {
      title:
        'Dokumen Pertanggungjawaban Keuangan Tertentu',
      description:
        'Dokumen pendukung SPJ, perjalanan dinas, atau dokumen rinci lain yang mengandung informasi terbatas.',
    },
    {
      title:
        'Dokumen Pengadaan yang Belum Dapat Dibuka',
      description:
        'Dokumen pengadaan barang dan jasa yang masih berada dalam tahapan yang dilindungi atau mengandung informasi rahasia.',
    },
    {
      title:
        'Dokumen Pemeriksaan dan Tindak Lanjut',
      description:
        'Dokumen pemeriksaan, reviu, dan tindak lanjut hasil pemeriksaan yang belum dapat diumumkan.',
    },
    {
      title:
        'Informasi yang Dilarang Peraturan',
      description:
        'Informasi lain yang tidak boleh diungkapkan berdasarkan undang-undang atau ketentuan yang berlaku.',
    },
  ];

const variantStyles = {
  emerald: {
    section:
      'border-emerald-200',
    header:
      'from-emerald-50 to-white',
    icon:
      'bg-emerald-700 text-white',
    badge:
      'bg-emerald-100 text-emerald-700',
    number:
      'bg-emerald-100 text-emerald-700',
    hover:
      'hover:border-emerald-200 hover:bg-emerald-50/50',
    link:
      'text-emerald-700',
  },

  amber: {
    section:
      'border-amber-200',
    header:
      'from-amber-50 to-white',
    icon:
      'bg-amber-500 text-white',
    badge:
      'bg-amber-100 text-amber-700',
    number:
      'bg-amber-100 text-amber-700',
    hover:
      'hover:border-amber-200 hover:bg-amber-50/50',
    link:
      'text-amber-700',
  },

  cyan: {
    section:
      'border-cyan-200',
    header:
      'from-cyan-50 to-white',
    icon:
      'bg-cyan-700 text-white',
    badge:
      'bg-cyan-100 text-cyan-700',
    number:
      'bg-cyan-100 text-cyan-700',
    hover:
      'hover:border-cyan-200 hover:bg-cyan-50/50',
    link:
      'text-cyan-700',
  },

  rose: {
    section:
      'border-rose-200',
    header:
      'from-rose-50 to-white',
    icon:
      'bg-rose-700 text-white',
    badge:
      'bg-rose-100 text-rose-700',
    number:
      'bg-rose-100 text-rose-700',
    hover:
      'hover:border-rose-200 hover:bg-rose-50/50',
    link:
      'text-rose-700',
  },
} as const;

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
      'Gagal mengambil daftar layanan pada halaman klasifikasi informasi:',
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

export default async function KlasifikasiInformasiPage() {
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
            Klasifikasi Informasi
          </h1>

          <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-500 md:text-base">
            Pengelompokan informasi
            publik yang dikelola oleh
            Pemerintah Desa Keji
            berdasarkan sifat,
            kepentingan, dan waktu
            penyampaiannya.
          </p>
        </header>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
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
                  <BookOpenCheck
                    size={31}
                  />
                </div>

                <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-100">
                  Standar Layanan
                  Informasi Publik
                </p>

                <h2 className="mt-3 max-w-2xl text-2xl font-black leading-tight md:text-3xl">
                  Informasi publik harus
                  mudah ditemukan,
                  dipahami, dan diakses
                  masyarakat
                </h2>

                <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-emerald-50/90 md:text-base md:leading-8">
                  Informasi publik adalah
                  informasi yang
                  dihasilkan, disimpan,
                  dikelola, dikirim, atau
                  diterima oleh Pemerintah
                  Desa dalam pelaksanaan
                  pemerintahan, pelayanan,
                  pembangunan, dan
                  kepentingan masyarakat.
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                    <p className="text-xs font-extrabold uppercase tracking-wider text-emerald-100">
                      Informasi Terbuka
                    </p>

                    <p className="mt-2 text-sm font-bold leading-relaxed text-white">
                      Dapat diumumkan atau
                      diberikan kepada
                      masyarakat sesuai
                      kategori pelayanan.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                    <p className="text-xs font-extrabold uppercase tracking-wider text-emerald-100">
                      Informasi Terlindungi
                    </p>

                    <p className="mt-2 text-sm font-bold leading-relaxed text-white">
                      Tidak dapat diberikan
                      apabila mengandung data
                      pribadi atau memenuhi
                      alasan pengecualian.
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
                  Tujuan Klasifikasi
                  Informasi
                </h2>

                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">
                  Klasifikasi membantu PPID
                  menentukan cara, waktu,
                  dan batas pemberian
                  informasi kepada
                  masyarakat.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {tujuanKlasifikasi.map(
                  (item) => (
                    <TujuanCard
                      key={item.title}
                      item={item}
                    />
                  )
                )}
              </div>
            </section>

            {/* Navigasi cepat */}
            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
              <h2 className="text-lg font-black text-slate-900">
                Pilih Klasifikasi
                Informasi
              </h2>

              <p className="mt-2 text-sm font-medium text-slate-500">
                Gunakan menu berikut untuk
                menuju kategori informasi.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <QuickLink
                  href="#informasi-berkala"
                  label="Informasi Berkala"
                  description="Diumumkan secara rutin"
                  icon={Clock3}
                  variant="emerald"
                />

                <QuickLink
                  href="#informasi-serta-merta"
                  label="Informasi Serta Merta"
                  description="Diumumkan tanpa penundaan"
                  icon={Siren}
                  variant="amber"
                />

                <QuickLink
                  href="#informasi-setiap-saat"
                  label="Informasi Setiap Saat"
                  description="Tersedia ketika dibutuhkan"
                  icon={FileCheck2}
                  variant="cyan"
                />

                <QuickLink
                  href="#informasi-dikecualikan"
                  label="Informasi Dikecualikan"
                  description="Tidak dapat dibuka secara umum"
                  icon={FileLock2}
                  variant="rose"
                />
              </div>
            </section>

            {/* Informasi berkala */}
            <KlasifikasiSection
              id="informasi-berkala"
              label="Klasifikasi A"
              title="Informasi yang Wajib Disediakan dan Diumumkan Secara Berkala"
              description="Informasi yang telah dikuasai dan didokumentasikan oleh Pemerintah Desa untuk diumumkan secara teratur kepada masyarakat."
              schedule="Diumumkan secara rutin, misalnya setiap enam bulan atau satu tahun."
              icon={Clock3}
              variant="emerald"
              items={informasiBerkala}
            />

            {/* Informasi serta-merta */}
            <KlasifikasiSection
              id="informasi-serta-merta"
              label="Klasifikasi B"
              title="Informasi yang Wajib Diumumkan Secara Serta Merta"
              description="Informasi yang berkaitan dengan keselamatan, keamanan, atau kepentingan masyarakat dan harus diumumkan tanpa penundaan."
              schedule="Disampaikan segera setelah informasi terverifikasi."
              icon={BellRing}
              variant="amber"
              items={informasiSertaMerta}
              note="Informasi darurat dapat disampaikan melalui website, media sosial resmi, pengumuman desa, perangkat wilayah, atau saluran komunikasi lain yang tersedia."
            />

            {/* Informasi setiap saat */}
            <KlasifikasiSection
              id="informasi-setiap-saat"
              label="Klasifikasi C"
              title="Informasi yang Wajib Tersedia Setiap Saat"
              description="Informasi yang telah dikuasai dan didokumentasikan serta dinyatakan terbuka untuk diakses oleh masyarakat."
              schedule="Tersedia melalui website atau diberikan berdasarkan permohonan."
              icon={FileCheck2}
              variant="cyan"
              items={informasiSetiapSaat}
              note="Apabila dokumen belum tersedia pada website, masyarakat dapat mengajukan permohonan informasi kepada PPID Desa Keji."
            />

            {/* Informasi dikecualikan */}
            <KlasifikasiSection
              id="informasi-dikecualikan"
              label="Klasifikasi D"
              title="Informasi yang Dikecualikan"
              description="Informasi tertentu yang tidak dapat diberikan kepada publik karena dapat menimbulkan konsekuensi yang dilindungi oleh ketentuan peraturan."
              icon={FileLock2}
              variant="rose"
              items={informasiDikecualikan}
              note="Penetapan informasi sebagai informasi yang dikecualikan dilakukan melalui pertimbangan dan uji konsekuensi oleh PPID atau Atasan PPID. Informasi tidak boleh dikecualikan hanya karena belum dipublikasikan."
            />

            {/* Peringatan data pribadi */}
            <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500 text-white">
                  <ShieldAlert
                    size={23}
                  />
                </div>

                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-amber-700">
                    Perlindungan Data
                    Pribadi
                  </p>

                  <h2 className="mt-2 text-xl font-black text-amber-950">
                    Data warga tidak
                    ditampilkan secara
                    terbuka
                  </h2>

                  <p className="mt-3 text-sm font-medium leading-7 text-amber-800">
                    Informasi seperti NIK,
                    nomor KK, tanggal lahir
                    lengkap, alamat rinci,
                    nomor pribadi, dokumen
                    identitas, dan data
                    personal lainnya hanya
                    digunakan untuk
                    kepentingan pelayanan
                    yang sah dan tidak
                    dipublikasikan.
                  </p>
                </div>
              </div>
            </section>

            {/* Permohonan */}
            <section className="rounded-3xl bg-slate-900 p-6 text-white shadow-xl md:p-8">
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
                    informasi publik. Jika
                    tanggapan belum sesuai,
                    pemohon dapat mengajukan
                    keberatan.
                  </p>
                </div>

                <div className="flex shrink-0 flex-col gap-2">
                  <Link
                    href="/ppid/permohonan-informasi"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-emerald-500"
                  >
                    Ajukan Permohonan

                    <ArrowRight
                      size={17}
                    />
                  </Link>

                  <Link
                    href="/ppid/pengajuan-keberatan"
                    className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-white/10"
                  >
                    Ajukan Keberatan
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

function TujuanCard({
  item,
}: {
  item: TujuanItem;
}) {
  const Icon =
    item.icon;

  return (
    <article className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 transition group-hover:bg-emerald-700 group-hover:text-white">
        <Icon size={23} />
      </div>

      <h3 className="mt-4 font-black text-slate-900">
        {item.title}
      </h3>

      <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
        {item.description}
      </p>
    </article>
  );
}

function QuickLink({
  href,
  label,
  description,
  icon: Icon,
  variant,
}: {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
  variant: KlasifikasiVariant;
}) {
  const styles =
    variantStyles[variant];

  return (
    <a
      href={href}
      className={`group flex items-center gap-4 rounded-2xl border border-slate-200 p-4 transition ${styles.hover}`}
    >
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${styles.badge}`}
      >
        <Icon size={21} />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-black text-slate-800">
          {label}
        </h3>

        <p className="mt-1 text-xs font-semibold text-slate-500">
          {description}
        </p>
      </div>

      <ArrowRight
        size={17}
        className="shrink-0 text-slate-300 transition group-hover:translate-x-1"
      />
    </a>
  );
}

function KlasifikasiSection({
  id,
  label,
  title,
  description,
  schedule,
  icon: Icon,
  variant,
  items,
  note,
}: KlasifikasiSectionProps) {
  const styles =
    variantStyles[variant];

  return (
    <section
      id={id}
      className={`scroll-mt-28 overflow-hidden rounded-3xl border bg-white shadow-sm ${styles.section}`}
    >
      <div
        className={`border-b border-slate-100 bg-gradient-to-r p-6 md:p-8 ${styles.header}`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-md ${styles.icon}`}
          >
            <Icon size={23} />
          </div>

          <div>
            <span
              className={`inline-flex rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] ${styles.badge}`}
            >
              {label}
            </span>

            <h2 className="mt-3 text-xl font-black leading-tight text-slate-900 md:text-2xl">
              {title}
            </h2>

            <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
              {description}
            </p>

            {schedule && (
              <p className="mt-3 flex items-start gap-2 text-xs font-bold leading-5 text-slate-500">
                <Clock3
                  size={15}
                  className="mt-0.5 shrink-0"
                />

                {schedule}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="p-5 md:p-8">
        <div className="grid gap-3">
          {items.map(
            (
              item,
              index
            ) => {
              const content = (
                <>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-black ${styles.number}`}
                  >
                    {index + 1}
                  </span>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-extrabold leading-relaxed text-slate-800">
                      {item.title}
                    </h3>

                    {item.description && (
                      <p className="mt-1 text-sm font-medium leading-6 text-slate-500">
                        {item.description}
                      </p>
                    )}

                    {item.href && (
                      <span
                        className={`mt-2 inline-flex items-center gap-1.5 text-xs font-extrabold ${styles.link}`}
                      >
                        Buka informasi

                        <ArrowRight
                          size={13}
                        />
                      </span>
                    )}
                  </div>

                  {item.href && (
                    <ArrowRight
                      size={17}
                      className="mt-1 shrink-0 text-slate-300 transition group-hover:translate-x-1"
                    />
                  )}
                </>
              );

              if (item.href) {
                return (
                  <Link
                    key={`${item.title}-${index}`}
                    href={item.href}
                    className={`group flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 transition ${styles.hover}`}
                  >
                    {content}
                  </Link>
                );
              }

              return (
                <article
                  key={`${item.title}-${index}`}
                  className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4"
                >
                  {content}
                </article>
              );
            }
          )}
        </div>

        {note && (
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            <AlertTriangle
              size={19}
              className="mt-0.5 shrink-0 text-amber-500"
            />

            <p className="text-xs font-semibold leading-6 text-slate-600">
              {note}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}