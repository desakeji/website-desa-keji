// app/(public)/profil/data/page.tsx

import {
  AtSign,
  Building2,
  Calendar,
  Compass,
  Eye,
  Globe,
  Mail,
  Map as MapIcon,
  MapPin,
  Phone,
  Share2,
  User,
  Users,
} from 'lucide-react';

import SidebarLayanan from '@/components/SidebarLayanan';
import { supabaseAdmin } from '@/lib/supabase-admin';

import type {
  PilihanLayanan,
} from '@/types/layanan';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface ProfilDesaDatabase {
  jumlah_laki_laki: number | null;
  jumlah_perempuan: number | null;
  jumlah_dusun: number | null;
  jumlah_rw: number | null;
  jumlah_rt: number | null;
  tahun_data: number | null;
  updated_at: string | null;
}

interface ProfilDesaData {
  jumlah_laki_laki: number;
  jumlah_perempuan: number;
  jumlah_dusun: number;
  jumlah_rw: number;
  jumlah_rt: number;
  tahun_data: number;
  updated_at: string;
}

interface LayananDatabase {
  id: number | string | null;
  nama: string | null;
  slug: string | null;
}

const PROFIL_KEY = 'utama';

const fallbackProfil: ProfilDesaData = {
  jumlah_laki_laki: 0,
  jumlah_perempuan: 0,
  jumlah_dusun: 0,
  jumlah_rw: 0,
  jumlah_rt: 0,
  tahun_data: new Date().getFullYear(),
  updated_at: '',
};

function formatAngka(value: number) {
  return new Intl.NumberFormat(
    'id-ID'
  ).format(value);
}

function formatTanggal(value: string) {
  if (!value) {
    return 'Belum diperbarui';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 'Belum diperbarui';
  }

  return new Intl.DateTimeFormat(
    'id-ID',
    {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      timeZone: 'Asia/Jakarta',
    }
  ).format(date);
}

export default async function ProfilWilayahPage() {
  const [
    profilResult,
    layananResult,
  ] = await Promise.all([
    supabaseAdmin
      .from('profil_desa')
      .select(`
        jumlah_laki_laki,
        jumlah_perempuan,
        jumlah_dusun,
        jumlah_rw,
        jumlah_rt,
        tahun_data,
        updated_at
      `)
      .eq(
        'profil_key',
        PROFIL_KEY
      )
      .maybeSingle(),

    supabaseAdmin
      .from('layanan')
      .select(`
        id,
        nama,
        slug
      `)
      .order('nama', {
        ascending: true,
      }),
  ]);

  if (profilResult.error) {
    console.error(
      'Gagal mengambil data profil desa:',
      profilResult.error.message
    );
  }

  if (layananResult.error) {
    console.error(
      'Gagal mengambil daftar layanan:',
      layananResult.error.message
    );
  }

  const profilDatabase =
    profilResult.data as
      | ProfilDesaDatabase
      | null;

  const profilDesa: ProfilDesaData =
    profilDatabase
      ? {
          jumlah_laki_laki:
            Number(
              profilDatabase
                .jumlah_laki_laki ?? 0
            ),

          jumlah_perempuan:
            Number(
              profilDatabase
                .jumlah_perempuan ?? 0
            ),

          jumlah_dusun:
            Number(
              profilDatabase
                .jumlah_dusun ?? 0
            ),

          jumlah_rw:
            Number(
              profilDatabase
                .jumlah_rw ?? 0
            ),

          jumlah_rt:
            Number(
              profilDatabase
                .jumlah_rt ?? 0
            ),

          tahun_data:
            Number(
              profilDatabase
                .tahun_data ??
                new Date().getFullYear()
            ),

          updated_at:
            String(
              profilDatabase
                .updated_at ?? ''
            ),
        }
      : fallbackProfil;

  const layananDatabase =
    (layananResult.data ??
      []) as LayananDatabase[];

  const daftarLayanan:
    PilihanLayanan[] =
    layananDatabase
      .map((layanan) => ({
        id: Number(
          layanan.id
        ),

        nama: String(
          layanan.nama ?? ''
        ).trim(),

        slug: String(
          layanan.slug ?? ''
        ).trim(),
      }))
      .filter(
        (layanan) =>
          Number.isInteger(
            layanan.id
          ) &&
          layanan.id > 0 &&
          layanan.nama.length > 0 &&
          layanan.slug.length > 0
      );

  const totalPenduduk =
    profilDesa.jumlah_laki_laki +
    profilDesa.jumlah_perempuan;

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
                @keyframes scrolling-profile-info {
                  0% {
                    transform: translateX(100%);
                  }

                  100% {
                    transform: translateX(-100%);
                  }
                }

                .animate-scrolling-profile-info {
                  display: inline-block;
                  white-space: nowrap;
                  animation: scrolling-profile-info 24s linear infinite;
                }

                @media (prefers-reduced-motion: reduce) {
                  .animate-scrolling-profile-info {
                    animation: none;
                  }
                }
              `,
            }}
          />

          <div className="min-w-0 flex-1 overflow-hidden">
            <div className="animate-scrolling-profile-info">
              Untuk permohonan informasi
              silakan masuk ke menu PPID
              website ini. *** Profil Wilayah
              dan Demografi Desa Keji,
              Kecamatan Ungaran Barat,
              Kabupaten Semarang ***
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Konten Utama */}
          <main className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8 lg:w-2/3">
            <h1 className="mb-4 text-2xl font-extrabold leading-tight text-gray-800 md:text-3xl">
              Profil Desa Keji
            </h1>

            {/* Metadata */}
            <div className="mb-8 flex flex-wrap gap-4 border-b border-gray-100 pb-4 text-xs font-semibold text-gray-500">
              <span className="flex items-center gap-1.5">
                <Calendar
                  size={14}
                  className="text-emerald-500"
                />

                Diperbarui{' '}
                {formatTanggal(
                  profilDesa.updated_at
                )}
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

            {/* Informasi Pemerintahan */}
            <section className="mb-10 rounded-2xl border border-emerald-100 bg-emerald-50 p-6 shadow-sm">
              <div className="mb-5 flex items-start gap-4">
                <div className="shrink-0 rounded-xl bg-emerald-600 p-3 text-white shadow-md">
                  <Building2 size={24} />
                </div>

                <div>
                  <h2 className="text-lg font-extrabold text-emerald-900">
                    Pemerintah Desa Keji
                  </h2>

                  <p className="mt-2 text-justify text-sm leading-relaxed text-gray-700">
                    Pemerintah Desa Keji
                    berperan aktif dalam
                    memberikan pelayanan publik
                    secara profesional,
                    transparan, dan mudah diakses
                    oleh seluruh masyarakat Desa
                    Keji.
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 border-t border-emerald-200/60 pt-4 md:grid-cols-2">
                <div className="flex items-start gap-3">
                  <MapPin
                    size={18}
                    className="mt-0.5 shrink-0 text-emerald-600"
                  />

                  <div>
                    <p className="text-xs font-bold uppercase text-emerald-800">
                      Alamat Kantor
                    </p>

                    <p className="text-sm font-medium text-gray-700">
                      Jl. Bima Sakti Raya
                      No. 12
                      <br />
                      Desa Keji
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <Phone
                      size={18}
                      className="shrink-0 text-emerald-600"
                    />

                    <p className="text-sm font-medium text-gray-700">
                      024-76914580
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail
                      size={18}
                      className="shrink-0 text-emerald-600"
                    />

                    <p className="break-all text-sm font-medium text-gray-700">
                      desakeji01@gmail.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="https://keji-ungaranbarat.semarangkab.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-white px-3 py-1.5 text-xs font-bold text-emerald-700 transition-colors hover:bg-emerald-600 hover:text-white"
                >
                  <Globe size={14} />
                  Website Resmi
                </a>

                <span className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-white px-3 py-1.5 text-xs font-bold text-emerald-700">
                  <AtSign size={14} />
                  @desakeji
                </span>

                <span className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-white px-3 py-1.5 text-xs font-bold text-emerald-700">
                  <Share2 size={14} />
                  Desa Keji
                </span>
              </div>
            </section>

            {/* Kondisi Geografis */}
            <section className="mb-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-emerald-100 p-2 text-emerald-600">
                  <MapPin
                    size={24}
                    strokeWidth={2.5}
                  />
                </div>

                <h2 className="text-xl font-bold text-gray-800">
                  Kondisi Geografis
                </h2>
              </div>

              <p className="mb-4 text-justify leading-relaxed text-gray-700">
                Secara geografis, Desa Keji
                terletak di wilayah dataran
                tinggi lereng Gunung Ungaran
                dengan suhu rata-rata yang
                sejuk. Sebagian besar lahan
                diperuntukkan sebagai
                permukiman, area Kampoeng
                Seni, serta lahan pertanian
                dan perkebunan.
              </p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <BoundaryCard
                  title="Sebelah Utara"
                  description="Berbatasan dengan Kelurahan Bandarjo"
                />

                <BoundaryCard
                  title="Sebelah Selatan"
                  description="Berbatasan dengan Desa Lerep"
                />

                <BoundaryCard
                  title="Sebelah Timur"
                  description="Berbatasan dengan Kelurahan Ungaran"
                />

                <BoundaryCard
                  title="Sebelah Barat"
                  description="Berbatasan dengan Desa Kalisidi"
                />
              </div>
            </section>

            {/* Statistik Penduduk */}
            <section className="mb-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-emerald-100 p-2 text-emerald-600">
                  <Users
                    size={24}
                    strokeWidth={2.5}
                  />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Statistik Penduduk
                  </h2>

                  <p className="mt-0.5 text-xs font-medium text-gray-500">
                    Data kependudukan tahun{' '}
                    {profilDesa.tahun_data}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-gradient-to-br from-emerald-700 to-emerald-900 p-5 text-white shadow-md">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-200">
                    Total Penduduk
                  </p>

                  <p className="mt-3 text-3xl font-black">
                    {formatAngka(
                      totalPenduduk
                    )}
                  </p>

                  <p className="mt-1 text-xs text-emerald-100/70">
                    Jiwa
                  </p>
                </div>

                <PopulationCard
                  label="Laki-laki"
                  value={
                    profilDesa
                      .jumlah_laki_laki
                  }
                />

                <PopulationCard
                  label="Perempuan"
                  value={
                    profilDesa
                      .jumlah_perempuan
                  }
                />
              </div>
            </section>

            {/* Wilayah Administrasi */}
            <section className="mb-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-emerald-100 p-2 text-emerald-600">
                  <MapIcon
                    size={24}
                    strokeWidth={2.5}
                  />
                </div>

                <h2 className="text-xl font-bold text-gray-800">
                  Wilayah Administrasi
                </h2>
              </div>

              <div className="grid gap-4 rounded-2xl border border-emerald-100 bg-white p-5 text-center shadow-sm sm:grid-cols-3">
                <AdministrationCard
                  value={
                    profilDesa.jumlah_dusun
                  }
                  label="Dusun"
                />

                <AdministrationCard
                  value={
                    profilDesa.jumlah_rw
                  }
                  label="Rukun Warga (RW)"
                />

                <AdministrationCard
                  value={
                    profilDesa.jumlah_rt
                  }
                  label="Rukun Tetangga (RT)"
                />
              </div>
            </section>
          </main>

          {/* Sidebar Layanan */}
          <aside className="lg:w-1/3">
            <SidebarLayanan
              daftarLayanan={
                daftarLayanan
              }
            />
          </aside>
        </div>
      </div>
    </div>
  );
}

interface BoundaryCardProps {
  title: string;
  description: string;
}

function BoundaryCard({
  title,
  description,
}: BoundaryCardProps) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-gray-100 bg-slate-50 p-4">
      <Compass
        className="mt-1 shrink-0 text-emerald-500"
        size={24}
      />

      <div>
        <h3 className="mb-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
          {title}
        </h3>

        <p className="font-medium text-gray-700">
          {description}
        </p>
      </div>
    </div>
  );
}

interface PopulationCardProps {
  label: string;
  value: number;
}

function PopulationCard({
  label,
  value,
}: PopulationCardProps) {
  return (
    <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-700">
        {label}
      </p>

      <p className="mt-3 text-3xl font-black text-slate-900">
        {formatAngka(value)}
      </p>

      <p className="mt-1 text-xs text-slate-500">
        Jiwa
      </p>
    </div>
  );
}

interface AdministrationCardProps {
  value: number;
  label: string;
}

function AdministrationCard({
  value,
  label,
}: AdministrationCardProps) {
  return (
    <div className="flex flex-col items-center rounded-xl bg-emerald-50/50 p-4">
      <span className="text-4xl font-black text-emerald-600">
        {formatAngka(value)}
      </span>

      <span className="mt-2 text-sm font-bold uppercase tracking-wide text-gray-500">
        {label}
      </span>
    </div>
  );
}