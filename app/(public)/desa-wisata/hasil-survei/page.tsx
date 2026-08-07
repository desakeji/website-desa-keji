// app/(public)/desa-wisata/hasil-survei/page.tsx

import type {
  Metadata,
} from 'next';

import {
  PieChart,
} from 'lucide-react';

import DashboardSurveiWisata from '@/components/desa-wisata/DashboardSurveiWisata';

import SidebarInformasiWisata from '@/components/desa-wisata/SidebarInformasiWisata';

import {
  supabaseAdmin,
} from '@/lib/supabase-admin';

import {
  hitungDashboardSurvei,
  normalizeSurveiRow,
  type SurveiRespon,
} from '@/lib/desa-wisata-survei';

export const metadata:
  Metadata = {
  title:
    'Hasil Survei Wisatawan Desa Keji | SIJI',

  description:
    'Dashboard hasil survei kepuasan wisatawan Desa Wisata Keji.',
};

export const dynamic =
  'force-dynamic';

export const revalidate =
  0;

export default async function HasilSurveiPage() {
  const [
    settingsResult,
    responsesResult,
  ] =
    await Promise.all([
      supabaseAdmin
        .from(
          'desa_wisata_survei_settings'
        )
        .select(
          'hasil_survei_aktif'
        )
        .eq(
          'setting_key',
          'utama'
        )
        .maybeSingle(),

      supabaseAdmin
        .from(
          'desa_wisata_survei_respon'
        )
        .select(`
          id,
          email,
          nama,
          tanggal_kunjungan,
          asal,
          jenis_kunjungan,
          jenis_kunjungan_lainnya,
          kunjungan_pertama,
          paket_aktivitas,
          paket_lainnya,
          kebersihan,
          keramahan,
          fasilitas,
          kesesuaian_ekspektasi,
          kepuasan_keseluruhan,
          merekomendasikan,
          paling_disukai,
          saran,
          boleh_dihubungi,
          nomor_wa,
          valid,
          created_at
        `)
        .eq(
          'valid',
          true
        )
        .order(
          'tanggal_kunjungan',
          {
            ascending:
              true,
          }
        ),
    ]);

  if (
    settingsResult.error
  ) {
    console.error(
      'Gagal mengambil settings hasil survei:',
      settingsResult.error
    );
  }

  if (
    responsesResult.error
  ) {
    console.error(
      'Gagal mengambil hasil survei:',
      responsesResult.error
    );
  }

  const hasilAktif =
    settingsResult.data
      ?.hasil_survei_aktif ===
      undefined ||
    settingsResult.data
      ?.hasil_survei_aktif ===
      null
      ? true
      : Boolean(
          settingsResult.data
            .hasil_survei_aktif
        );

  const responses:
    SurveiRespon[] =
    (
      responsesResult.data ??
      []
    )
      .map(
        normalizeSurveiRow
      )
      .filter(
        (
          item
        ): item is SurveiRespon =>
          item !== null
      );

  const dashboard =
    hitungDashboardSurvei(
      responses
    );

  return (
    <div className="min-h-screen bg-[#f5f2e8]">
      <div className="mx-auto max-w-[1600px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          {/* Sidebar */}

          <aside>
            <div className="lg:sticky lg:top-24">
              <SidebarInformasiWisata
                activePath="/desa-wisata/hasil-survei"
              />
            </div>
          </aside>

          {/* Content */}

          <main className="min-w-0">
            {!hasilAktif ? (
              <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
                <PieChart
                  size={44}
                  className="mx-auto text-slate-300"
                />

                <h1 className="mt-5 text-xl font-black text-slate-800">
                  Hasil survei belum
                  dipublikasikan
                </h1>

                <p className="mx-auto mt-2 max-w-xl text-sm font-medium leading-7 text-slate-500">
                  Dashboard hasil
                  survei wisatawan
                  sedang tidak
                  ditampilkan untuk
                  publik.
                </p>
              </div>
            ) : (
              <DashboardSurveiWisata
                dashboard={
                  dashboard
                }
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}