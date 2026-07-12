import {
  Building2,
  Calendar,
  CheckCircle2,
  Eye,
  FileText,
  Mail,
  MapPin,
  Scale,
  ShieldCheck,
  User,
  UsersRound,
} from 'lucide-react';

import SidebarLayanan from '@/components/SidebarLayanan';

/*
 * SidebarLayanan hanya membutuhkan:
 * id, nama, dan slug.
 */
const daftarLayanan = [
  {
    id: 1,
    nama: 'Surat Pengantar KTP / KK Baru',
    slug: 'surat-pengantar-ktp-kk',
  },
  {
    id: 2,
    nama: 'Surat Keterangan Usaha (SKU)',
    slug: 'surat-keterangan-usaha',
  },
  {
    id: 3,
    nama: 'Surat Keterangan Tidak Mampu (SKTM)',
    slug: 'surat-keterangan-tidak-mampu',
  },
];

const strukturPPID = [
  {
    nomor: '01',
    unsur: 'Kepala Desa',
    kedudukan: 'Atasan PPID',
    tugas:
      'Memberikan arahan, pembinaan, dan pengawasan terhadap pelayanan informasi publik desa.',
  },
  {
    nomor: '02',
    unsur: 'Sekretaris Desa',
    kedudukan: 'Ketua PPID',
    tugas:
      'Mengoordinasikan pengelolaan informasi dan dokumentasi di lingkungan pemerintah desa.',
  },
  {
    nomor: '03',
    unsur: 'Bidang Pelayanan Informasi',
    kedudukan: 'Pelayanan Informasi',
    tugas:
      'Menerima, mencatat, dan memproses permohonan informasi dari masyarakat.',
  },
  {
    nomor: '04',
    unsur: 'Bidang Pengelolaan Informasi',
    kedudukan: 'Pengelolaan Informasi',
    tugas:
      'Mengumpulkan, memverifikasi, dan memperbarui informasi publik desa.',
  },
  {
    nomor: '05',
    unsur: 'Bidang Dokumentasi dan Arsip',
    kedudukan: 'Dokumentasi Informasi',
    tugas:
      'Menyimpan serta mengelola dokumen dan arsip informasi publik.',
  },
  {
    nomor: '06',
    unsur: 'Bidang Pengaduan dan Keberatan',
    kedudukan: 'Penyelesaian Keberatan',
    tugas:
      'Mengoordinasikan pengajuan keberatan dan penyelesaian sengketa informasi.',
  },
];

const prinsipPelayanan = [
  {
    judul: 'Cepat',
    keterangan:
      'Permohonan informasi diproses sesuai jangka waktu yang berlaku.',
  },
  {
    judul: 'Tepat',
    keterangan:
      'Informasi yang diberikan telah diperiksa dan dapat dipertanggungjawabkan.',
  },
  {
    judul: 'Mudah',
    keterangan:
      'Masyarakat mendapatkan akses pelayanan dengan prosedur yang sederhana.',
  },
  {
    judul: 'Transparan',
    keterangan:
      'Proses pelayanan informasi dilaksanakan secara terbuka dan akuntabel.',
  },
];

export default function ProfilPPIDPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Sekilas Info */}
        <div className="relative mb-6 flex items-center gap-3 overflow-hidden rounded bg-emerald-800 px-4 py-2 text-sm font-medium text-white shadow-sm">
          <div className="z-10 shrink-0 rounded bg-emerald-600 px-3 py-1 text-xs font-bold shadow-md">
            Sekilas Info
          </div>

          <style
            dangerouslySetInnerHTML={{
              __html: `
                @keyframes scrolling-profil-ppid {
                  0% {
                    transform: translateX(100%);
                  }

                  100% {
                    transform: translateX(-100%);
                  }
                }

                .animate-scrolling-profil-ppid {
                  display: inline-block;
                  animation: scrolling-profil-ppid 22s linear infinite;
                  white-space: nowrap;
                }
              `,
            }}
          />

          <div className="w-full flex-1 overflow-hidden">
            <div className="animate-scrolling-profil-ppid">
              Profil Pejabat Pengelola Informasi dan Dokumentasi Pemerintah
              Desa Keji, Kecamatan Ungaran Barat, Kabupaten Semarang.
            </div>
          </div>
        </div>

        {/* Layout dua kolom */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">

          {/* Konten utama */}
          <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8 lg:w-2/3">

            {/* Label */}
            <div className="mb-3">
              <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-amber-700">
                PPID
              </span>
            </div>

            {/* Judul */}
            <h1 className="mb-4 text-2xl font-extrabold leading-tight text-gray-800 md:text-3xl">
              Profil PPID Desa Keji
            </h1>

            {/* Metadata */}
            <div className="mb-7 flex flex-wrap gap-4 border-b border-gray-100 pb-4 text-xs font-semibold text-gray-500">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-emerald-500" />
                12 Juli 2026
              </span>

              <span className="flex items-center gap-1.5">
                <User size={14} className="text-emerald-500" />
                Admin Desa
              </span>

              <span className="flex items-center gap-1.5">
                <Eye size={14} className="text-emerald-500" />
                Profil PPID
              </span>
            </div>

            {/* Banner profil */}
            <section className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-700 via-emerald-700 to-emerald-900 px-6 py-9 text-white shadow-md md:px-10">
              <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full border-[22px] border-white/5" />

              <div className="absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-amber-400/10" />

              <div className="relative z-10 flex flex-col items-center text-center sm:flex-row sm:text-left">
                <div className="mb-5 flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-amber-300 shadow-inner ring-1 ring-white/20 sm:mb-0 sm:mr-6">
                  <ShieldCheck size={43} />
                </div>

                <div>
                  <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-100">
                    Pemerintah Desa Keji
                  </p>

                  <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                    PPID
                  </h2>

                  <p className="mt-1 text-base font-bold text-emerald-100 md:text-lg">
                    Pejabat Pengelola Informasi dan Dokumentasi
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-emerald-100">
                    Mewujudkan pelayanan informasi publik desa yang terbuka,
                    mudah diakses, dan dapat dipertanggungjawabkan.
                  </p>
                </div>
              </div>
            </section>

            {/* Tentang profil PPID */}
            <section className="mb-9">
              <div className="mb-4 flex items-center gap-3 border-b-2 border-emerald-100 pb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <FileText size={21} />
                </div>

                <h2 className="text-xl font-extrabold text-gray-800">
                  Profil Singkat
                </h2>
              </div>

              <div className="space-y-4 text-sm leading-7 text-gray-700 md:text-base">
                <p>
                  PPID Pemerintah Desa Keji merupakan bagian dari pemerintah
                  desa yang bertanggung jawab dalam pengelolaan dan pelayanan
                  informasi publik kepada masyarakat.
                </p>

                <p>
                  PPID mengoordinasikan proses penyimpanan, pendokumentasian,
                  penyediaan, dan penyampaian informasi mengenai
                  penyelenggaraan pemerintahan, pembangunan, pelayanan
                  masyarakat, serta program-program Desa Keji.
                </p>

                <div className="rounded-xl border-l-4 border-emerald-500 bg-emerald-50 p-4">
                  <p className="font-semibold text-emerald-900">
                    PPID Desa Keji berkomitmen memberikan informasi publik
                    secara cepat, tepat, mudah, transparan, dan sesuai dengan
                    ketentuan yang berlaku.
                  </p>
                </div>
              </div>
            </section>

            {/* Identitas PPID */}
            <section className="mb-9">
              <div className="mb-5">
                <h2 className="text-xl font-extrabold text-gray-800">
                  Identitas PPID
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Informasi pelayanan PPID Pemerintah Desa Keji.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-4 rounded-xl border border-gray-200 p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                    <Building2 size={22} />
                  </div>

                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-wider text-gray-400">
                      Instansi
                    </p>

                    <p className="mt-1 font-bold text-gray-800">
                      Pemerintah Desa Keji
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xl border border-gray-200 p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                    <MapPin size={22} />
                  </div>

                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-wider text-gray-400">
                      Wilayah
                    </p>

                    <p className="mt-1 font-bold leading-relaxed text-gray-800">
                      Kecamatan Ungaran Barat, Kabupaten Semarang
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xl border border-gray-200 p-5 sm:col-span-2">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                    <Mail size={22} />
                  </div>

                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-wider text-gray-400">
                      Email Pelayanan
                    </p>

                    <p className="mt-1 font-bold text-gray-800">
                      desakeji01@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Dasar hukum */}
            <section className="mb-9">
              <div className="mb-4 flex items-center gap-3 border-b-2 border-emerald-100 pb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <Scale size={21} />
                </div>

                <h2 className="text-xl font-extrabold text-gray-800">
                  Dasar Hukum
                </h2>
              </div>

              <ul className="space-y-3">
                {[
                  'Undang-Undang Nomor 14 Tahun 2008 tentang Keterbukaan Informasi Publik.',
                  'Peraturan Pemerintah Nomor 61 Tahun 2010 tentang Pelaksanaan Undang-Undang Nomor 14 Tahun 2008.',
                  'Peraturan Komisi Informasi Nomor 1 Tahun 2018 tentang Standar Layanan Informasi Publik Desa.',
                  'Peraturan Komisi Informasi Nomor 1 Tahun 2021 tentang Standar Layanan Informasi Publik.',
                ].map((aturan) => (
                  <li
                    key={aturan}
                    className="flex items-start gap-3 rounded-lg bg-slate-50 px-4 py-3 text-sm leading-relaxed text-gray-700"
                  >
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-emerald-500"
                    />

                    <span>{aturan}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Susunan PPID */}
            <section className="mb-9">
              <div className="mb-5 flex items-center gap-3 border-b-2 border-emerald-100 pb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <UsersRound size={21} />
                </div>

                <div>
                  <h2 className="text-xl font-extrabold text-gray-800">
                    Susunan PPID Desa Keji
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Susunan fungsi pelayanan informasi dan dokumentasi desa.
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full min-w-[720px] text-left text-sm">
                  <thead className="bg-emerald-700 text-white">
                    <tr>
                      <th className="w-16 px-4 py-4 text-center">No.</th>
                      <th className="px-4 py-4">Unsur/Jabatan</th>
                      <th className="px-4 py-4">Kedudukan PPID</th>
                      <th className="px-4 py-4">Tugas Utama</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {strukturPPID.map((item, index) => (
                      <tr
                        key={item.nomor}
                        className={
                          index % 2 === 0
                            ? 'bg-white'
                            : 'bg-emerald-50/40'
                        }
                      >
                        <td className="px-4 py-4 text-center font-extrabold text-emerald-700">
                          {item.nomor}
                        </td>

                        <td className="px-4 py-4 font-bold text-gray-800">
                          {item.unsur}
                        </td>

                        <td className="px-4 py-4 font-semibold text-emerald-700">
                          {item.kedudukan}
                        </td>

                        <td className="px-4 py-4 leading-relaxed text-gray-600">
                          {item.tugas}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
                Nama pejabat dalam susunan PPID dapat ditambahkan setelah
                penetapan dan verifikasi data resmi Pemerintah Desa Keji.
              </div>
            </section>

            {/* Prinsip pelayanan */}
            <section>
              <div className="mb-5">
                <h2 className="text-xl font-extrabold text-gray-800">
                  Prinsip Pelayanan PPID
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Prinsip yang digunakan dalam memberikan pelayanan informasi
                  kepada masyarakat.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {prinsipPelayanan.map((prinsip, index) => (
                  <div
                    key={prinsip.judul}
                    className="flex items-start gap-4 rounded-xl border border-emerald-100 bg-emerald-50/60 p-5"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-black text-white">
                      {index + 1}
                    </div>

                    <div>
                      <h3 className="font-extrabold text-emerald-900">
                        {prinsip.judul}
                      </h3>

                      <p className="mt-1 text-sm leading-relaxed text-gray-600">
                        {prinsip.keterangan}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </article>

          {/* Layanan bagian kanan */}
          <aside className="lg:w-1/3">
            <SidebarLayanan daftarLayanan={daftarLayanan} />
          </aside>
        </div>
      </div>
    </div>
  );
}