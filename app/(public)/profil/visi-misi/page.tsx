// app/(public)/profil/visi-misi/page.tsx

import {
  Calendar,
  ChevronRight,
  Eye,
  ListChecks,
  Target,
  User,
} from 'lucide-react';

import SidebarLayanan from '@/components/SidebarLayanan';
import SidebarTilikArkeji from '@/components/SidebarTilikArkeji';

import { supabaseAdmin } from '@/lib/supabase-admin';

import type { PilihanLayanan } from '@/types/layanan';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface LayananDatabase {
  id: number | string | null;
  nama: string | null;
  slug: string | null;
}

interface MisiDanTujuan {
  id: number;
  bidang: string;
  tujuan: string;
  poin: string[];
}

const misiDanTujuan: MisiDanTujuan[] = [
  {
    id: 1,
    bidang: 'PEMBERDAYAAN',
    tujuan:
      'Memberdayakan semua potensi yang ada di masyarakat yang meliputi:',
    poin: [
      'Pemberdayaan sumber daya manusia (SDM)',
      'Pemberdayaan sumber daya alam (SDA)',
      'Pemberdayaan ekonomi masyarakat',
      'Pemberdayaan pemuda, agama, seni budaya, dan olahraga',
    ],
  },
  {
    id: 2,
    bidang: 'PEMBINAAN',
    tujuan:
      'Menciptakan kondisi masyarakat Desa Keji yang aman, tertib, guyup, dan rukun dalam kehidupan bermasyarakat, yang meliputi:',
    poin: [
      'Pembinaan pendidikan dan keagamaan',
      'Pembinaan kelembagaan masyarakat desa',
      'Pembinaan kewilayahan (tilik dusun)',
    ],
  },
  {
    id: 3,
    bidang: 'PEMERINTAHAN',
    tujuan:
      'Optimalisasi penyelenggaraan Pemerintah Desa Keji, yang meliputi:',
    poin: [
      'Penyelenggaraan pemerintahan yang transparan dan akuntabel',
      'Pelayanan kepada masyarakat yang prima, yaitu cepat, tepat, dan benar',
      'Pelaksanaan pembangunan yang berkesinambungan dan mengedepankan partisipasi serta gotong royong masyarakat',
    ],
  },
  {
    id: 4,
    bidang: 'PEMBANGUNAN',
    tujuan:
      'Bekerja sama dengan Pemerintah Daerah Kabupaten, Provinsi, dan Pusat dalam mewujudkan pembangunan infrastruktur di Desa Keji yang meliputi:',
    poin: [
      'Bankeu Kabupaten (Aspirasi APBD Kabupaten Semarang)',
      'Bankeu Provinsi (Aspirasi APBD Provinsi Jawa Tengah)',
      'Bankeu Pusat (Aspirasi APBN)',
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
    })
    .order('nama', {
      ascending: true,
    });

  if (error) {
    console.error('Gagal mengambil daftar layanan pada halaman visi misi:', {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });

    return [];
  }

  const layananDatabase = (data ?? []) as LayananDatabase[];

  return layananDatabase
    .map((layanan) => ({
      id: Number(layanan.id),

      nama: String(layanan.nama ?? '').trim(),

      slug: String(layanan.slug ?? '').trim(),
    }))
    .filter(
      (layanan) =>
        Number.isInteger(layanan.id) &&
        layanan.id > 0 &&
        layanan.nama.length > 0 &&
        layanan.slug.length > 0
    );
}

export default async function VisiMisiPage() {
  const daftarLayanan = await getDaftarLayanan();

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Teks Berjalan */}
        <div className="relative mb-6 flex items-center gap-3 overflow-hidden rounded-xl bg-emerald-800 px-4 py-2 text-sm font-medium text-white shadow-sm">
          <div className="z-10 shrink-0 rounded-lg bg-emerald-600 px-3 py-1 text-xs font-bold shadow-md">
            Sekilas Info
          </div>

          <style
            dangerouslySetInnerHTML={{
              __html: `
                @keyframes scrolling-visi-misi {
                  0% {
                    transform: translateX(100%);
                  }

                  100% {
                    transform: translateX(-100%);
                  }
                }

                .animate-scrolling-visi-misi {
                  display: inline-block;
                  white-space: nowrap;
                  animation: scrolling-visi-misi 20s linear infinite;
                }

                @media (prefers-reduced-motion: reduce) {
                  .animate-scrolling-visi-misi {
                    animation: none;
                  }
                }
              `,
            }}
          />

          <div className="min-w-0 flex-1 overflow-hidden">
            <div className="animate-scrolling-visi-misi">
              Untuk permohonan informasi silakan masuk ke menu PPID website
              ini. *** Visi dan Misi Pemerintah Desa Keji, Kecamatan Ungaran
              Barat, Kabupaten Semarang ***
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Konten Utama */}
          <main className="min-w-0 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8 lg:w-2/3">
            <h1 className="mb-4 text-2xl font-extrabold leading-tight text-gray-800 md:text-3xl">
              Visi dan Misi Pemerintah Desa
            </h1>

            {/* Metadata */}
            <div className="mb-8 flex flex-wrap gap-4 border-b border-gray-100 pb-4 text-xs font-semibold text-gray-500">
              <span className="flex items-center gap-1.5">
                <Calendar
                  size={14}
                  className="text-emerald-500"
                />

                10 Juli 2026
              </span>

              <span className="flex items-center gap-1.5">
                <User
                  size={14}
                  className="text-emerald-500"
                />

                Admin Desa
              </span>

              <span className="flex items-center gap-1.5">
                <Eye
                  size={14}
                  className="text-emerald-500"
                />

                Informasi Publik
              </span>
            </div>

            {/* Visi */}
            <section className="mb-12">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-emerald-100 p-2.5 text-emerald-600">
                  <Target
                    size={28}
                    strokeWidth={2.5}
                  />
                </div>

                <h2 className="text-2xl font-black text-gray-800">
                  Visi
                </h2>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-emerald-500 bg-gradient-to-br from-emerald-600 to-emerald-800 p-8 text-center shadow-lg">
                <div className="absolute -right-10 -top-10 text-white/10">
                  <Target
                    size={150}
                    strokeWidth={1}
                  />
                </div>

                <p className="relative z-10 text-lg font-extrabold uppercase leading-relaxed tracking-wide text-white drop-shadow-md md:text-xl">
                  &quot;Bersama membangun desa melalui tata kelola
                  pemerintahan yang bersih, transparan, akuntabel, dan
                  partisipatif menuju desa yang maju, mandiri, dan berbudaya
                  berlandaskan perilaku terpuji.&quot;
                </p>
              </div>
            </section>

            {/* Misi */}
            <section>
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-xl bg-emerald-100 p-2.5 text-emerald-600">
                  <ListChecks
                    size={28}
                    strokeWidth={2.5}
                  />
                </div>

                <h2 className="text-2xl font-black text-gray-800">
                  Misi dan Tujuan
                </h2>
              </div>

              <div className="space-y-6">
                {misiDanTujuan.map((misi) => (
                  <article
                    key={misi.id}
                    className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-sm transition-shadow hover:shadow-md"
                  >
                    {/* Header Misi */}
                    <div className="flex items-start gap-4 border-b border-gray-200 bg-white p-4 md:px-6">
                      <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-lg font-black text-white shadow-sm">
                        {misi.id}
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-lg font-extrabold uppercase tracking-wide text-emerald-800">
                          Misi Bidang {misi.bidang}
                        </h3>

                        <p className="mt-1 text-sm font-medium leading-relaxed text-gray-700">
                          {misi.tujuan}
                        </p>
                      </div>
                    </div>

                    {/* Poin Misi */}
                    <div className="bg-emerald-50/30 p-4 md:px-6">
                      <ul className="space-y-3">
                        {misi.poin.map((poinItem, index) => (
                          <li
                            key={`${misi.id}-${index}`}
                            className="flex items-start gap-3"
                          >
                            <ChevronRight
                              size={18}
                              className="mt-0.5 shrink-0 text-emerald-500"
                            />

                            <span className="text-sm font-medium leading-relaxed text-gray-700">
                              {poinItem}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </main>

          {/* Sidebar kanan */}
          <aside className="min-w-0 lg:w-1/3">
  <div className="flex flex-col gap-8 lg:sticky lg:top-24">
    <SidebarLayanan
      daftarLayanan={daftarLayanan}
      sticky={false}
    />

    <SidebarTilikArkeji />
  </div>
</aside>
        </div>
      </div>
    </div>
  );
}