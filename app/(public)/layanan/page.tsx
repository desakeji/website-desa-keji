import {
  Info,
  FileCheck,
  CheckCircle2,
  CircleAlert,
} from 'lucide-react';

import SidebarLayanan from '@/components/SidebarLayanan';
import { supabase } from '@/lib/supabase';

import type {
  LayananPublik,
  PilihanLayanan,
} from '@/types/layanan';

export const dynamic = 'force-dynamic';

interface LayananRow {
  id: number;
  nama: string;
  slug: string;
  deskripsi: string;
}

interface PersyaratanRow {
  layanan_id: number;
  persyaratan: string;
  urutan: number;
}

async function getDaftarLayanan(): Promise<LayananPublik[]> {
  const { data: layananData, error: layananError } =
    await supabase
      .from('layanan')
      .select('id, nama, slug, deskripsi')
      .eq('aktif', true)
      .order('urutan', { ascending: true });

  if (layananError) {
    console.error('Gagal mengambil layanan:', layananError);
    return [];
  }

  const layananRows = (layananData ?? []) as LayananRow[];
  const layananIds = layananRows.map((layanan) => layanan.id);

  if (layananIds.length === 0) {
    return [];
  }

  const { data: persyaratanData, error: persyaratanError } =
    await supabase
      .from('persyaratan_layanan')
      .select('layanan_id, persyaratan, urutan')
      .in('layanan_id', layananIds)
      .order('urutan', { ascending: true });

  if (persyaratanError) {
    console.error(
      'Gagal mengambil persyaratan layanan:',
      persyaratanError
    );
  }

  const persyaratanRows =
    (persyaratanData ?? []) as PersyaratanRow[];

  return layananRows.map((layanan) => ({
    id: layanan.id,
    nama: layanan.nama,
    slug: layanan.slug,
    deskripsi: layanan.deskripsi,
    syarat: persyaratanRows
      .filter((syarat) => syarat.layanan_id === layanan.id)
      .sort((a, b) => a.urutan - b.urutan)
      .map((syarat) => syarat.persyaratan),
  }));
}

export default async function LayananPage() {
  const daftarLayanan = await getDaftarLayanan();

  const pilihanLayanan: PilihanLayanan[] =
    daftarLayanan.map((layanan) => ({
      id: layanan.id,
      nama: layanan.nama,
      slug: layanan.slug,
    }));

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-gray-800 md:text-4xl">
            Layanan Administrasi Desa
          </h1>

          <p className="font-medium text-gray-500">
            Informasi persyaratan pelayanan surat-menyurat di
            Kantor Kepala Desa Keji.
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="space-y-6 lg:w-2/3">
            <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 shadow-sm">
              <Info
                size={24}
                className="mt-0.5 shrink-0 text-blue-600"
              />

              <div>
                <h4 className="text-sm font-bold text-blue-900">
                  Informasi Jam Pelayanan
                </h4>

                <p className="mt-1 text-sm text-blue-800">
                  Pelayanan tatap muka buka hari{' '}
                  <strong>
                    Senin–Kamis, pukul 08.00–15.00 WIB
                  </strong>{' '}
                  dan{' '}
                  <strong>
                    Jumat, pukul 08.00–11.30 WIB
                  </strong>
                  . Pelayanan 100% gratis.
                </p>
              </div>
            </div>

            {daftarLayanan.length === 0 ? (
              <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-5">
                <CircleAlert
                  size={22}
                  className="mt-0.5 shrink-0 text-amber-600"
                />

                <div>
                  <h3 className="font-bold text-amber-900">
                    Layanan belum tersedia
                  </h3>

                  <p className="mt-1 text-sm text-amber-800">
                    Data layanan belum ditambahkan atau sedang
                    dinonaktifkan oleh administrator.
                  </p>
                </div>
              </div>
            ) : (
              daftarLayanan.map((layanan) => (
                <div
                  key={layanan.id}
                  className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                >
                  <div className="mb-4 flex items-start gap-3 border-b border-gray-100 pb-4">
                    <div className="shrink-0 rounded-lg bg-emerald-100 p-2.5 text-emerald-600">
                      <FileCheck size={24} />
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {layanan.nama}
                      </h3>

                      <p className="mt-1 text-sm leading-relaxed text-gray-600">
                        {layanan.deskripsi}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-3 text-sm font-bold text-gray-800">
                      Syarat yang dibawa:
                    </h4>

                    {layanan.syarat.length > 0 ? (
                      <ul className="space-y-2">
                        {layanan.syarat.map((syarat) => (
                          <li
                            key={`${layanan.id}-${syarat}`}
                            className="flex items-start gap-2 text-sm font-medium text-gray-700"
                          >
                            <CheckCircle2
                              size={16}
                              className="mt-0.5 shrink-0 text-emerald-500"
                            />

                            <span>{syarat}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500">
                        Persyaratan belum ditambahkan oleh
                        administrator.
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="lg:w-1/3">
            <SidebarLayanan
              daftarLayanan={pilihanLayanan}
            />
          </div>
        </div>
      </div>
    </div>
  );
}