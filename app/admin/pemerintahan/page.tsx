// app/admin/pemerintahan/page.tsx

import Link from 'next/link';

import {
  CheckCircle2,
  ExternalLink,
  Landmark,
  UsersRound,
} from 'lucide-react';

import FormInformasiPemerintahan from '@/components/admin/FormInformasiPemerintahan';
import KelolaPerangkatDesa from '@/components/admin/KelolaPerangkatDesa';

import {
  supabaseAdmin,
} from '@/lib/supabase-admin';

import type {
  PemerintahanDesaData,
  PerangkatDesaData,
} from '@/types/pemerintahan';

export const dynamic =
  'force-dynamic';

export const revalidate = 0;

const PEMERINTAHAN_KEY = 'utama';

interface PageProps {
  searchParams: Promise<{
    status?: string;
  }>;
}

const defaultPemerintahan:
  PemerintahanDesaData = {
  pemerintahan_key:
    PEMERINTAHAN_KEY,

  sekilas_info:
    'Struktur Organisasi dan Tata Kerja Pemerintah Desa Keji, Kecamatan Ungaran Barat, Kabupaten Semarang.',

  judul_halaman:
    'Pemerintah Desa Keji',

  judul_sotk:
    'Struktur Organisasi dan Tata Kerja',

  lokasi_pemerintahan:
    'Kecamatan Ungaran Barat, Kabupaten Semarang',

  tanggal_publikasi:
    new Date()
      .toISOString()
      .slice(0, 10),

  penulis:
    'Admin Desa',

  deskripsi_kepala_desa:
    'Memimpin penyelenggaraan pemerintahan, pembangunan, pembinaan kemasyarakatan, dan pemberdayaan masyarakat desa.',

  deskripsi_perangkat:
    'Perangkat desa membantu Kepala Desa sesuai bidang tugas dan wilayah kerjanya.',

  catatan:
    'Informasi nama dan profil perangkat desa dapat ditambahkan setelah data resmi terbaru selesai diverifikasi oleh Pemerintah Desa Keji.',

  updated_at: '',
};

export default async function AdminPemerintahanPage({
  searchParams,
}: PageProps) {
  const params =
    await searchParams;

  const [
    pemerintahanResult,
    perangkatResult,
  ] = await Promise.all([
    supabaseAdmin
      .from(
        'pemerintahan_desa'
      )
      .select(`
        pemerintahan_key,
        sekilas_info,
        judul_halaman,
        judul_sotk,
        lokasi_pemerintahan,
        tanggal_publikasi,
        penulis,
        deskripsi_kepala_desa,
        deskripsi_perangkat,
        catatan,
        updated_at
      `)
      .eq(
        'pemerintahan_key',
        PEMERINTAHAN_KEY
      )
      .maybeSingle(),

    supabaseAdmin
      .from('perangkat_desa')
      .select(`
        id,
        nama,
        jabatan,
        kelompok,
        foto_url,
        nip,
        nomor_telepon,
        deskripsi,
        urutan,
        aktif,
        created_at,
        updated_at
      `)
      .order(
        'urutan',
        {
          ascending: true,
        }
      )
      .order(
        'nama',
        {
          ascending: true,
        }
      ),
  ]);

  if (
    pemerintahanResult.error
  ) {
    console.error(
      'Gagal mengambil informasi pemerintahan:',
      pemerintahanResult.error
    );
  }

  if (
    perangkatResult.error
  ) {
    console.error(
      'Gagal mengambil perangkat desa:',
      perangkatResult.error
    );
  }

  const pemerintahan:
    PemerintahanDesaData = {
    ...defaultPemerintahan,
    ...(pemerintahanResult.data ??
      {}),
  };

  const perangkat =
    (
      perangkatResult.data ??
      []
    ) as PerangkatDesaData[];

  const totalAktif =
    perangkat.filter(
      (item) => item.aktif
    ).length;

  const totalKelompok =
    new Set(
      perangkat.map(
        (item) =>
          item.kelompok
      )
    ).size;

  const successMessage =
    params.status === 'created'
      ? 'Perangkat desa berhasil ditambahkan.'
      : params.status === 'updated'
        ? 'Data perangkat desa berhasil diperbarui.'
        : '';

  return (
    <div className="mx-auto max-w-[1500px] space-y-7">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#064e3b] via-[#065f46] to-[#047857] px-6 py-7 text-white shadow-xl sm:px-8 sm:py-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.13) 1.5px, transparent 1.5px)',

            backgroundSize:
              '26px 26px',
          }}
        />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
              <Landmark size={27} />
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-200">
                Data dan Pemerintahan
              </p>

              <h1 className="mt-2 text-2xl font-black sm:text-3xl">
                Pemerintahan Desa
              </h1>

              <p className="mt-2 max-w-3xl text-sm font-medium leading-7 text-emerald-50/80">
                Kelola informasi SOTK, identitas,
                jabatan, foto, urutan, dan status
                perangkat Desa Keji.
              </p>
            </div>
          </div>

          <Link
            href="/pemerintahan"
            target="_blank"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 text-sm font-extrabold text-white transition hover:bg-white/15"
          >
            Lihat Halaman Publik

            <ExternalLink size={16} />
          </Link>
        </div>
      </section>

      {successMessage && (
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
          <CheckCircle2
            size={20}
            className="mt-0.5 shrink-0"
          />

          <p className="text-sm font-semibold">
            {successMessage}
          </p>
        </div>
      )}

      <section className="grid gap-5 sm:grid-cols-3">
        <StatCard
          label="Total Perangkat"
          value={perangkat.length}
        />

        <StatCard
          label="Perangkat Aktif"
          value={totalAktif}
        />

        <StatCard
          label="Kelompok Jabatan"
          value={totalKelompok}
        />
      </section>

      <FormInformasiPemerintahan
        initialData={
          pemerintahan
        }
      />

      <KelolaPerangkatDesa
        perangkat={
          perangkat
        }
      />
    </div>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <article className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">
            {label}
          </p>

          <p className="mt-4 text-4xl font-black text-slate-900">
            {value.toLocaleString(
              'id-ID'
            )}
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
          <UsersRound size={22} />
        </div>
      </div>
    </article>
  );
}