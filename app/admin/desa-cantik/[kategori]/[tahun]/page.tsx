import Link from 'next/link';

import {
  ArrowLeft,
  ExternalLink,
} from 'lucide-react';

import {
  notFound,
} from 'next/navigation';

import DesaCantikMediaForm from '@/components/admin/desa-cantik/DesaCantikMediaForm';

import {
  getKategoriDesaCantik,
  isKategoriDesaCantik,
  isTahunDesaCantik,
} from '@/lib/desa-cantik';

import {
  supabaseAdmin,
} from '@/lib/supabase-admin';

import type {
  DesaCantikAdminRecord,
} from '@/types/desa-cantik-admin';

export const dynamic =
  'force-dynamic';

export const revalidate = 0;

interface PageProps {
  params: Promise<{
    kategori: string;
    tahun: string;
  }>;
}

export default async function AdminDesaCantikDetailPage({
  params,
}: PageProps) {
  const {
    kategori,
    tahun: tahunParam,
  } = await params;

  const tahun =
    Number(tahunParam);

  if (
    !isKategoriDesaCantik(
      kategori
    ) ||
    !isTahunDesaCantik(
      tahun
    )
  ) {
    notFound();
  }

  const kategoriInfo =
    getKategoriDesaCantik(
      kategori
    );

  if (!kategoriInfo) {
    notFound();
  }

  const {
    data,
    error,
  } = await supabaseAdmin
    .from(
      'desa_cantik_data'
    )
    .select(`
      id,
      kategori,
      tahun,
      sumber,
      data,
      infografis_url,
      infografis_path,
      aktif,
      created_at,
      updated_at
    `)
    .eq(
      'kategori',
      kategori
    )
    .eq(
      'tahun',
      tahun
    )
    .maybeSingle();

  if (error) {
    console.error(
      'Data admin Desa Cantik gagal dimuat:',
      error
    );
  }

  const record =
    data as
      | DesaCantikAdminRecord
      | null;

  return (
    <div className="space-y-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/admin/desa-cantik"
          className="inline-flex items-center gap-2 text-sm font-extrabold text-emerald-700 hover:text-emerald-900"
        >
          <ArrowLeft size={17} />
          Kembali ke Desa Cantik
        </Link>

        <a
          href={`/desa-cantik/${kategori}/${tahun}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 py-2.5 text-sm font-extrabold text-emerald-700 transition hover:bg-emerald-50"
        >
          Lihat Halaman Publik
          <ExternalLink size={15} />
        </a>
      </div>

      <section className="rounded-3xl border border-emerald-100 bg-gradient-to-r from-emerald-950 via-emerald-800 to-emerald-700 p-6 text-white shadow-lg md:p-8">
        <p className="text-xs font-extrabold uppercase tracking-[0.17em] text-emerald-200">
          Desa Cantik Tahun {tahun}
        </p>

        <h1 className="mt-3 text-3xl font-black">
          Kelola {kategoriInfo.nama}
        </h1>

        <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-emerald-50">
          Kelola sumber data, infografis, dan status publikasi kategori{' '}
          {kategoriInfo.nama.toLowerCase()} tahun {tahun}.
        </p>
      </section>

      <DesaCantikMediaForm
        kategori={kategori}
        namaKategori={
          kategoriInfo.nama
        }
        tahun={tahun}
        sumber={
          record?.sumber ??
          ''
        }
        infografisUrl={
          record?.infografis_url ??
          null
        }
        aktif={
          record?.aktif ??
          true
        }
      />

      <section className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
        <p className="text-sm font-black text-amber-900">
          Editor angka statistik
        </p>

        <p className="mt-2 text-sm font-medium leading-6 text-amber-800">
          Pada tahap ini admin baru mengelola sumber, infografis, dan
          status publikasi. Editor angka pada tabel akan ditambahkan pada
          tahap berikutnya tanpa mengubah komponen publik.
        </p>
      </section>
    </div>
  );
}