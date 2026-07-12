import {
  Calendar,
  CheckCircle2,
  Clock3,
  Database,
  Eye,
  FileText,
  MessagesSquare,
  Scale,
  Search,
  ShieldCheck,
  User,
} from 'lucide-react';

import SidebarLayanan from '@/components/SidebarLayanan';

const daftarLayanan = [
  {
    id: 1,
    slug: 'surat-pengantar-ktp-kk',
    nama: 'Surat Pengantar KTP / KK Baru',
    deskripsi:
      'Digunakan untuk perekaman KTP baru atau pembuatan Kartu Keluarga.',
    syarat: [
      'Surat Pengantar RT / RW',
      'Fotokopi KK Lama',
      'Fotokopi Akta Kelahiran',
    ],
  },
  {
    id: 2,
    slug: 'surat-keterangan-usaha',
    nama: 'Surat Keterangan Usaha (SKU)',
    deskripsi:
      'Digunakan untuk keperluan administrasi usaha dan pengajuan bantuan UMKM.',
    syarat: [
      'Surat Pengantar RT / RW',
      'Fotokopi KTP Pemohon',
      'Fotokopi KK Pemohon',
    ],
  },
  {
    id: 3,
    slug: 'surat-keterangan-tidak-mampu',
    nama: 'Surat Keterangan Tidak Mampu (SKTM)',
    deskripsi:
      'Digunakan untuk pengajuan bantuan sosial, beasiswa, atau keringanan biaya.',
    syarat: [
      'Surat Pengantar RT / RW',
      'Fotokopi KTP dan KK',
      'Surat Pernyataan Tidak Mampu',
    ],
  },
];

const dasarHukum = [
  {
    nomor: '01',
    judul: 'Undang-Undang Nomor 14 Tahun 2008',
    keterangan: 'Tentang Keterbukaan Informasi Publik.',
  },
  {
    nomor: '02',
    judul: 'Peraturan Pemerintah Nomor 61 Tahun 2010',
    keterangan:
      'Tentang pelaksanaan Undang-Undang Nomor 14 Tahun 2008 tentang Keterbukaan Informasi Publik.',
  },
  {
    nomor: '03',
    judul: 'Peraturan Komisi Informasi Nomor 1 Tahun 2018',
    keterangan: 'Tentang Standar Layanan Informasi Publik Desa.',
  },
  {
    nomor: '04',
    judul: 'Peraturan Komisi Informasi Nomor 1 Tahun 2021',
    keterangan: 'Tentang Standar Layanan Informasi Publik.',
  },
];

const tugasPPID = [
  'Menyediakan, menyimpan, mendokumentasikan, dan mengamankan informasi publik desa.',
  'Memberikan pelayanan informasi publik secara cepat, tepat, dan sederhana.',
  'Melakukan verifikasi terhadap bahan informasi publik sebelum disampaikan kepada masyarakat.',
  'Menetapkan dan memperbarui Daftar Informasi Publik Pemerintah Desa Keji.',
  'Mengelompokkan informasi publik berdasarkan klasifikasi yang berlaku.',
  'Mengoordinasikan penyelesaian permohonan informasi dan pengajuan keberatan.',
  'Melakukan pemutakhiran informasi dan dokumentasi secara berkala.',
];

const hakMasyarakat = [
  'Melihat dan mengetahui informasi publik yang tersedia.',
  'Memperoleh salinan informasi publik sesuai ketentuan.',
  'Mengajukan permohonan informasi publik kepada Pemerintah Desa.',
  'Mengajukan keberatan apabila permohonan informasi tidak mendapatkan tanggapan yang sesuai.',
];

export default function ApaItuPPIDPage() {
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
                @keyframes scrolling-ppid {
                  0% {
                    transform: translateX(100%);
                  }

                  100% {
                    transform: translateX(-100%);
                  }
                }

                .animate-scrolling-ppid {
                  display: inline-block;
                  animation: scrolling-ppid 22s linear infinite;
                  white-space: nowrap;
                }
              `,
            }}
          />

          <div className="w-full flex-1 overflow-hidden">
            <div className="animate-scrolling-ppid">
              PPID Pemerintah Desa Keji berkomitmen memberikan pelayanan
              informasi publik secara terbuka, cepat, tepat, dan mudah kepada
              seluruh masyarakat.
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
              Apa Itu PPID?
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
                Informasi PPID
              </span>
            </div>

            {/* Banner PPID */}
            <section className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-700 via-emerald-700 to-emerald-900 px-6 py-9 text-white shadow-md md:px-10">
              <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full border-[22px] border-white/5" />

              <div className="absolute -bottom-14 -left-10 h-40 w-40 rounded-full bg-amber-400/10" />

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

                  <p className="mt-3 text-sm font-medium text-emerald-100">
                    Keterbukaan informasi merupakan bagian dari pelayanan
                    publik yang transparan dan bertanggung jawab.
                  </p>
                </div>
              </div>
            </section>

            {/* Pengertian PPID */}
            <section className="mb-9">
              <div className="mb-4 flex items-center gap-3 border-b-2 border-emerald-100 pb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <FileText size={21} />
                </div>

                <h2 className="text-xl font-extrabold text-gray-800">
                  Pengertian PPID
                </h2>
              </div>

              <div className="space-y-4 text-sm leading-7 text-gray-700 md:text-base">
                <p>
                  PPID adalah singkatan dari Pejabat Pengelola Informasi dan
                  Dokumentasi. PPID merupakan pejabat yang bertanggung jawab
                  dalam penyimpanan, pendokumentasian, penyediaan, dan
                  pelayanan informasi publik pada suatu badan publik.
                </p>

                <p>
                  Dalam lingkungan Pemerintah Desa Keji, PPID menjadi
                  penghubung antara pemerintah desa dengan masyarakat yang
                  membutuhkan informasi mengenai penyelenggaraan
                  pemerintahan, pembangunan, pelayanan publik, serta
                  pengelolaan program desa.
                </p>

                <div className="rounded-xl border-l-4 border-emerald-500 bg-emerald-50 p-4 text-emerald-900">
                  <p className="font-semibold">
                    Keberadaan PPID bertujuan memastikan masyarakat dapat
                    memperoleh informasi publik secara mudah, cepat, tepat,
                    dan dapat dipertanggungjawabkan.
                  </p>
                </div>
              </div>
            </section>

            {/* Peran utama */}
            <section className="mb-9">
              <div className="mb-5">
                <h2 className="text-xl font-extrabold text-gray-800">
                  Peran Utama PPID Desa
                </h2>

                <p className="mt-1 text-sm leading-relaxed text-gray-500">
                  PPID menjalankan pengelolaan dan pelayanan informasi publik
                  di lingkungan Pemerintah Desa Keji.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-5">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
                    <Database size={22} />
                  </div>

                  <h3 className="mb-2 font-extrabold text-emerald-900">
                    Mengelola Informasi
                  </h3>

                  <p className="text-sm leading-relaxed text-gray-600">
                    Menyimpan, mengelola, dan memperbarui informasi serta
                    dokumentasi milik pemerintah desa.
                  </p>
                </div>

                <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-5">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                    <Search size={22} />
                  </div>

                  <h3 className="mb-2 font-extrabold text-blue-900">
                    Melayani Permohonan
                  </h3>

                  <p className="text-sm leading-relaxed text-gray-600">
                    Memproses permohonan informasi yang disampaikan oleh
                    masyarakat.
                  </p>
                </div>

                <div className="rounded-xl border border-amber-100 bg-amber-50/70 p-5">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500 text-white shadow-sm">
                    <MessagesSquare size={22} />
                  </div>

                  <h3 className="mb-2 font-extrabold text-amber-900">
                    Menangani Keberatan
                  </h3>

                  <p className="text-sm leading-relaxed text-gray-600">
                    Mengoordinasikan pengajuan keberatan atas pelayanan
                    informasi publik.
                  </p>
                </div>
              </div>
            </section>

            {/* Dasar hukum */}
            <section className="mb-9">
              <div className="mb-5 flex items-center gap-3 border-b-2 border-emerald-100 pb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <Scale size={21} />
                </div>

                <div>
                  <h2 className="text-xl font-extrabold text-gray-800">
                    Dasar Hukum PPID
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Pelayanan informasi publik dilaksanakan berdasarkan
                    peraturan yang berlaku.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {dasarHukum.map((item) => (
                  <div
                    key={item.nomor}
                    className="flex items-start gap-4 rounded-xl border border-gray-200 p-4 transition-colors hover:border-emerald-300 hover:bg-emerald-50/40"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-black text-white">
                      {item.nomor}
                    </div>

                    <div>
                      <h3 className="font-extrabold text-gray-800">
                        {item.judul}
                      </h3>

                      <p className="mt-1 text-sm leading-relaxed text-gray-600">
                        {item.keterangan}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Tugas PPID */}
            <section className="mb-9">
              <div className="mb-5 flex items-center gap-3 border-b-2 border-emerald-100 pb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <Clock3 size={21} />
                </div>

                <h2 className="text-xl font-extrabold text-gray-800">
                  Tugas dan Tanggung Jawab PPID
                </h2>
              </div>

              <ul className="space-y-3">
                {tugasPPID.map((tugas) => (
                  <li
                    key={tugas}
                    className="flex items-start gap-3 rounded-lg bg-slate-50 px-4 py-3 text-sm leading-relaxed text-gray-700"
                  >
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-emerald-500"
                    />

                    <span>{tugas}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Hak masyarakat */}
            <section className="overflow-hidden rounded-2xl border border-emerald-200">
              <div className="bg-emerald-700 px-5 py-4 text-white">
                <h2 className="text-lg font-extrabold">
                  Hak Masyarakat atas Informasi Publik
                </h2>

                <p className="mt-1 text-sm text-emerald-100">
                  Setiap masyarakat memiliki hak untuk memperoleh informasi
                  publik sesuai ketentuan yang berlaku.
                </p>
              </div>

              <div className="grid gap-3 bg-emerald-50/60 p-5 sm:grid-cols-2">
                {hakMasyarakat.map((hak) => (
                  <div
                    key={hak}
                    className="flex items-start gap-3 rounded-lg bg-white p-4 text-sm leading-relaxed text-gray-700 shadow-sm"
                  >
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-emerald-500"
                    />

                    <span>{hak}</span>
                  </div>
                ))}
              </div>
            </section>
          </article>

          {/* Kolom kanan */}
        <aside className="lg:w-1/3">
        <SidebarLayanan daftarLayanan={daftarLayanan} />
        </aside>
        </div>
      </div>
    </div>
  );
}