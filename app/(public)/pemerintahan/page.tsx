import {
  Building2,
  Calendar,
  ChevronRight,
  Eye,
  Landmark,
  MapPin,
  ShieldCheck,
  User,
  UsersRound,
} from 'lucide-react';

import SidebarLayanan from '@/components/SidebarLayanan';

const kelompokPerangkat = [
  {
    judul: 'Unsur Sekretariat Desa',
    deskripsi:
      'Membantu Kepala Desa dalam penyelenggaraan administrasi pemerintahan desa.',
    ikon: Building2,
    jabatan: [
      'Sekretaris Desa',
      'Kaur Tata Usaha dan Umum',
      'Kaur Keuangan',
      'Kaur Perencanaan',
    ],
  },
  {
    judul: 'Pelaksana Teknis',
    deskripsi:
      'Menjalankan tugas operasional sesuai bidang pelayanan pemerintahan desa.',
    ikon: ShieldCheck,
    jabatan: [
      'Kasi Pemerintahan',
      'Kasi Kesejahteraan',
      'Kasi Pelayanan',
    ],
  },
  {
    judul: 'Pelaksana Kewilayahan',
    deskripsi:
      'Mendukung penyelenggaraan pemerintahan dan pelayanan masyarakat di setiap dusun.',
    ikon: MapPin,
    jabatan: [
      'Kepala Dusun Keji',
      'Kepala Dusun Suruhan',
      'Kepala Dusun Sitoyo',
    ],
  },
];

export default function PemerintahanDesaPage() {
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
                @keyframes scrolling-pemerintahan {
                  0% {
                    transform: translateX(100%);
                  }

                  100% {
                    transform: translateX(-100%);
                  }
                }

                .animate-scrolling-pemerintahan {
                  display: inline-block;
                  animation: scrolling-pemerintahan 20s linear infinite;
                  white-space: nowrap;
                }
              `,
            }}
          />

          <div className="w-full flex-1 overflow-hidden">
            <div className="animate-scrolling-pemerintahan">
              Struktur Organisasi dan Tata Kerja Pemerintah Desa Keji,
              Kecamatan Ungaran Barat, Kabupaten Semarang.
            </div>
          </div>
        </div>

        {/* Layout dua kolom */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">

          {/* Kolom kiri */}
          <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8 lg:w-2/3">
            <h1 className="mb-4 text-2xl font-extrabold leading-tight text-gray-800 md:text-3xl">
              Pemerintah Desa Keji
            </h1>

            {/* Metadata */}
            <div className="mb-7 flex flex-wrap gap-4 border-b border-gray-100 pb-4 text-xs font-semibold text-gray-500">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-emerald-500" />
                10 Juli 2026
              </span>

              <span className="flex items-center gap-1.5">
                <User size={14} className="text-emerald-500" />
                Admin Desa
              </span>

              <span className="flex items-center gap-1.5">
                <Eye size={14} className="text-emerald-500" />
                Informasi Pemerintahan
              </span>
            </div>

            {/* Header SOTK */}
            <section className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-700 via-emerald-700 to-emerald-900 px-5 py-8 text-center text-white shadow-md md:px-8">
              <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full border-[18px] border-white/5" />
              <div className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-amber-400/10" />

              <Landmark
                size={38}
                className="relative z-10 mx-auto mb-3 text-amber-300"
              />

              <p className="relative z-10 mb-2 text-xs font-extrabold uppercase tracking-[0.22em] text-emerald-100">
                Struktur Organisasi dan Tata Kerja
              </p>

              <h2 className="relative z-10 text-xl font-black leading-snug md:text-2xl">
                Pemerintah Desa Keji
              </h2>

              <p className="relative z-10 mt-2 text-sm font-medium text-emerald-100">
                Kecamatan Ungaran Barat, Kabupaten Semarang
              </p>
            </section>

            {/* Kepala Desa */}
            <section className="mb-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <UsersRound size={23} />
                </div>

                <div>
                  <p className="text-xs font-extrabold uppercase tracking-wider text-emerald-600">
                    Unsur Pimpinan
                  </p>

                  <h2 className="text-xl font-extrabold text-gray-800">
                    Kepala Desa
                  </h2>
                </div>
              </div>

              <div className="mx-auto max-w-md rounded-xl border-2 border-emerald-500 bg-emerald-50 p-5 text-center shadow-sm">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-700 text-white shadow-md ring-4 ring-emerald-100">
                  <Landmark size={27} />
                </div>

                <h3 className="text-lg font-black uppercase text-emerald-900">
                  Kepala Desa Keji
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  Memimpin penyelenggaraan pemerintahan, pembangunan,
                  pembinaan kemasyarakatan, dan pemberdayaan masyarakat desa.
                </p>
              </div>
            </section>

            {/* Susunan Perangkat Desa */}
            <section>
              <div className="mb-5 border-b-2 border-emerald-100 pb-3">
                <h2 className="text-xl font-extrabold text-gray-800 md:text-2xl">
                  Susunan Perangkat Desa
                </h2>

                <p className="mt-1 text-sm leading-relaxed text-gray-500">
                  Perangkat desa membantu Kepala Desa sesuai bidang tugas dan
                  wilayah kerjanya.
                </p>
              </div>

              <div className="space-y-5">
                {kelompokPerangkat.map((kelompok, index) => {
                  const Icon = kelompok.ikon;

                  return (
                    <div
                      key={kelompok.judul}
                      className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
                    >
                      <div className="flex items-start gap-4 border-b border-gray-100 p-5">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-lg font-black text-white shadow-sm">
                          {index + 1}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="mb-1 flex items-center gap-2">
                            <Icon
                              size={19}
                              className="shrink-0 text-emerald-600"
                            />

                            <h3 className="font-extrabold uppercase text-emerald-800">
                              {kelompok.judul}
                            </h3>
                          </div>

                          <p className="text-sm leading-relaxed text-gray-600">
                            {kelompok.deskripsi}
                          </p>
                        </div>
                      </div>

                      <ul className="grid gap-x-6 gap-y-3 bg-emerald-50/60 p-5 sm:grid-cols-2">
                        {kelompok.jabatan.map((jabatan) => (
                          <li
                            key={jabatan}
                            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                          >
                            <ChevronRight
                              size={16}
                              className="shrink-0 text-emerald-500"
                            />

                            <span>{jabatan}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Catatan */}
            <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
              Informasi nama dan profil perangkat desa dapat ditambahkan setelah
              data resmi terbaru selesai diverifikasi oleh Pemerintah Desa Keji.
            </div>
          </article>

          {/* Kolom kanan */}
          <aside className="lg:w-1/3">
            <SidebarLayanan />
          </aside>
        </div>
      </div>
    </div>
  );
}