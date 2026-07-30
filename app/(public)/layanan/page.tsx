// app/(public)/layanan/page.tsx

import type { Metadata } from 'next';

import {
  BadgeCheck,
  Building2,
  CheckCircle2,
  CircleAlert,
  ClipboardCheck,
  Clock3,
  FileCheck,
  FileText,
  Info,
  Send,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from 'lucide-react';

import SidebarLayanan from '@/components/SidebarLayanan';
import { supabase } from '@/lib/supabase';

import type {
  LayananPublik,
  PilihanLayanan,
} from '@/types/layanan';

export const metadata: Metadata = {
  title: 'Layanan Administrasi Desa Keji | SIJI',
  description:
    'Informasi jenis pelayanan, persyaratan, prosedur, dan pengajuan layanan administrasi Desa Keji.',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface LayananRow {
  id: number;
  nama: string;
  slug: string;
  deskripsi: string | null;
  urutan: number | null;
}

interface PersyaratanRow {
  layanan_id: number;
  persyaratan: string;
  urutan: number;
}

const prosedurPelayanan = [
  {
    nomor: '01',
    title: 'Datang ke Loket',
    description:
      'Pemohon datang ke loket pelayanan Pemerintah Desa Keji.',
    icon: Building2,
  },
  {
    nomor: '02',
    title: 'Sampaikan Keperluan',
    description:
      'Pemohon menjelaskan jenis pelayanan yang dibutuhkan.',
    icon: UserCheck,
  },
  {
    nomor: '03',
    title: 'Lengkapi Dokumen',
    description:
      'Pemohon menyerahkan dokumen persyaratan yang diperlukan.',
    icon: FileText,
  },
  {
    nomor: '04',
    title: 'Verifikasi Berkas',
    description:
      'Petugas memeriksa kelengkapan dan kesesuaian dokumen.',
    icon: ClipboardCheck,
  },
  {
    nomor: '05',
    title: 'Layanan Diproses',
    description:
      'Dokumen diproses sesuai prosedur dan ketentuan pelayanan.',
    icon: Clock3,
  },
  {
    nomor: '06',
    title: 'Hasil Diterima',
    description:
      'Pemohon menerima hasil pelayanan dari petugas desa.',
    icon: CheckCircle2,
  },
];

async function getDaftarLayanan(): Promise<LayananPublik[]> {
  const {
    data: layananData,
    error: layananError,
  } = await supabase
    .from('layanan')
    .select(`
      id,
      nama,
      slug,
      deskripsi,
      urutan
    `)
    .eq('aktif', true)
    .order('urutan', {
      ascending: true,
      nullsFirst: false,
    })
    .order('nama', {
      ascending: true,
    });

  if (layananError) {
    console.error('Gagal mengambil layanan:', {
      message: layananError.message,
      code: layananError.code,
      details: layananError.details,
      hint: layananError.hint,
    });

    return [];
  }

  const layananRows =
    (layananData ?? []) as LayananRow[];

  const layananIds = layananRows.map(
    (layanan) => layanan.id
  );

  if (layananIds.length === 0) {
    return [];
  }

  const {
    data: persyaratanData,
    error: persyaratanError,
  } = await supabase
    .from('persyaratan_layanan')
    .select(`
      layanan_id,
      persyaratan,
      urutan
    `)
    .in('layanan_id', layananIds)
    .order('urutan', {
      ascending: true,
    });

  if (persyaratanError) {
    console.error(
      'Gagal mengambil persyaratan layanan:',
      {
        message: persyaratanError.message,
        code: persyaratanError.code,
        details: persyaratanError.details,
        hint: persyaratanError.hint,
      }
    );
  }

  const persyaratanRows =
    (persyaratanData ?? []) as PersyaratanRow[];

  const persyaratanMap =
    new Map<number, PersyaratanRow[]>();

  persyaratanRows.forEach((item) => {
    const daftar =
      persyaratanMap.get(item.layanan_id) ?? [];

    daftar.push(item);

    persyaratanMap.set(
      item.layanan_id,
      daftar
    );
  });

  return layananRows.map((layanan) => ({
    id: layanan.id,
    nama: layanan.nama,
    slug: layanan.slug,
    deskripsi:
      layanan.deskripsi?.trim() ||
      'Informasi pelayanan administrasi Pemerintah Desa Keji.',
    syarat:
      persyaratanMap
        .get(layanan.id)
        ?.sort(
          (a, b) =>
            a.urutan - b.urutan
        )
        .map(
          (item) =>
            item.persyaratan
        ) ?? [],
  }));
}

export default async function LayananPage() {
  const daftarLayanan =
    await getDaftarLayanan();

  const pilihanLayanan:
    PilihanLayanan[] =
    daftarLayanan.map(
      (layanan) => ({
        id: layanan.id,
        nama: layanan.nama,
        slug: layanan.slug,
      })
    );

  return (
    <div className="min-h-screen overflow-x-clip bg-slate-50">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-emerald-950 text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/background.png')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#021b16] via-emerald-950/92 to-emerald-900/55" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#021b16] via-transparent to-black/20" />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.55) 1px, transparent 1px)',
            backgroundSize:
              '28px 28px',
          }}
        />

        <div className="pointer-events-none absolute -left-32 -top-32 h-[430px] w-[430px] rounded-full bg-emerald-300/10 blur-[115px]" />

        <div className="pointer-events-none absolute -bottom-40 right-0 h-[470px] w-[470px] rounded-full bg-cyan-300/[0.07] blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 md:pb-28 md:pt-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.17em] text-emerald-100 backdrop-blur">
                <ShieldCheck size={15} />

                Pelayanan Masyarakat
              </div>

              <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.22em] text-emerald-300">
                Pemerintah Desa Keji
              </p>

              <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
                Layanan Administrasi Desa
              </h1>

              <p className="mt-6 max-w-3xl text-sm font-medium leading-7 text-emerald-50/85 md:text-base md:leading-8">
                Temukan informasi jenis pelayanan,
                persyaratan dokumen, prosedur pengajuan,
                dan kirim permohonan administrasi secara
                langsung melalui Layanan Cepat Desa Keji.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-xs font-bold backdrop-blur">
                  <BadgeCheck size={16} />

                  Pelayanan 100% Gratis
                </span>

                <span className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-xs font-bold backdrop-blur">
                  <Clock3 size={16} />

                  Senin–Jumat
                </span>

                <span className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-xs font-bold backdrop-blur">
                  <FileCheck size={16} />

                  {daftarLayanan.length} Jenis Layanan
                </span>
              </div>
            </div>

            <aside className="rounded-[2rem] border border-white/15 bg-black/25 p-6 shadow-2xl backdrop-blur-xl md:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-emerald-300">
                    Informasi Pelayanan
                  </p>

                  <h2 className="mt-2 text-2xl font-black text-white">
                    Jam Kerja Kantor
                  </h2>
                </div>

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-emerald-200">
                  <Clock3 size={26} />
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <JamPelayanan
                  hari="Senin–Kamis"
                  waktu="08.00–15.00 WIB"
                />

                <JamPelayanan
                  hari="Jumat"
                  waktu="08.00–11.30 WIB"
                />

                <JamPelayanan
                  hari="Sabtu–Minggu"
                  waktu="Libur"
                  disabled
                />
              </div>

              <div className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-200/15 bg-emerald-300/10 p-4">
                <Info
                  size={19}
                  className="mt-0.5 shrink-0 text-emerald-200"
                />

                <p className="text-xs font-semibold leading-5 text-emerald-50/75">
                  Waktu penyelesaian bergantung pada
                  kelengkapan dokumen dan jenis pelayanan
                  yang diajukan.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Ringkasan mengambang */}
      <section className="relative z-20 -mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 sm:grid-cols-2 lg:grid-cols-4">
            <RingkasanItem
              label="Jenis Pelayanan"
              value={String(
                daftarLayanan.length
              )}
              description="Layanan administrasi aktif"
              icon={FileCheck}
              primary
            />

            <RingkasanItem
              label="Biaya Pelayanan"
              value="Gratis"
              description="Tanpa pungutan pelayanan"
              icon={BadgeCheck}
            />

            <RingkasanItem
              label="Tahapan"
              value="6"
              description="Dari pengajuan hingga selesai"
              icon={ClipboardCheck}
            />

            <RingkasanItem
              label="Pengajuan"
              value="Online"
              description="Melalui Layanan Cepat"
              icon={Send}
            />
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 lg:px-8">
        {/* Prosedur pelayanan */}
        <section>
          <div className="mb-7">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-700">
              Prosedur Pelayanan
            </p>

            <h2 className="mt-2 text-2xl font-black text-slate-900 md:text-3xl">
              Tahapan Inti Pelayanan Desa
            </h2>

            <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-slate-500">
              Proses pelayanan dilakukan secara
              terarah mulai dari penyampaian kebutuhan
              hingga penyerahan hasil kepada pemohon.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {prosedurPelayanan.map(
              (item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.nomor}
                    className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
                  >
                    <div className="pointer-events-none absolute -right-5 -top-7 text-[88px] font-black text-emerald-950/[0.035]">
                      {item.nomor}
                    </div>

                    <div className="relative">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 transition group-hover:bg-emerald-700 group-hover:text-white">
                          <Icon size={23} />
                        </div>

                        <span className="text-xs font-black text-emerald-700">
                          {item.nomor}
                        </span>
                      </div>

                      <h3 className="mt-5 text-lg font-black text-slate-900">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  </article>
                );
              }
            )}
          </div>
        </section>

        {/* Informasi utama */}
        <section className="mt-12 grid gap-7 lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[minmax(0,1fr)_400px]">
          {/* Daftar layanan */}
          <div className="min-w-0 space-y-6">
            <div className="flex items-start gap-4 rounded-3xl border border-blue-200 bg-blue-50 p-5 shadow-sm">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white">
                <Info size={21} />
              </div>

              <div>
                <h2 className="font-black text-blue-950">
                  Informasi Jam Pelayanan
                </h2>

                <p className="mt-2 text-sm font-medium leading-7 text-blue-900/80">
                  Pelayanan tatap muka dibuka hari{' '}
                  <strong>
                    Senin–Kamis pukul 08.00–15.00 WIB
                  </strong>{' '}
                  dan{' '}
                  <strong>
                    Jumat pukul 08.00–11.30 WIB
                  </strong>
                  . Seluruh pelayanan administrasi
                  diberikan tanpa pungutan.
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-700">
                Jenis Pelayanan
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-900 md:text-3xl">
                Daftar Layanan Masyarakat
              </h2>

              <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-slate-500">
                Periksa persyaratan setiap layanan
                sebelum mengirim permohonan atau datang
                ke Kantor Desa Keji.
              </p>
            </div>

            {daftarLayanan.length === 0 ? (
              <div className="flex min-h-[300px] items-center justify-center rounded-3xl border border-dashed border-amber-300 bg-amber-50 p-8 text-center">
                <div>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-amber-600 shadow-sm">
                    <CircleAlert size={29} />
                  </div>

                  <h3 className="mt-5 text-lg font-black text-amber-950">
                    Layanan belum tersedia
                  </h3>

                  <p className="mx-auto mt-2 max-w-xl text-sm font-medium leading-6 text-amber-900/80">
                    Data layanan belum ditambahkan atau
                    seluruh layanan sedang dinonaktifkan
                    oleh administrator.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid gap-5">
                {daftarLayanan.map(
                  (layanan, index) => (
                    <article
                      key={layanan.id}
                      id={layanan.slug}
                      className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:border-emerald-200 hover:shadow-lg"
                    >
                      <div className="border-b border-slate-100 bg-gradient-to-r from-emerald-50 via-white to-white p-5 sm:p-6">
                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-md">
                            <span className="text-sm font-black">
                              {String(
                                index + 1
                              ).padStart(2, '0')}
                            </span>
                          </div>

                          <div className="min-w-0">
                            <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-emerald-700">
                              Pelayanan Administrasi
                            </p>

                            <h3 className="mt-2 text-lg font-black leading-7 text-slate-900 sm:text-xl">
                              {layanan.nama}
                            </h3>

                            <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
                              {layanan.deskripsi}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-5 sm:p-6">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                            <FileText size={19} />
                          </div>

                          <div>
                            <p className="text-xs font-extrabold uppercase tracking-[0.13em] text-emerald-700">
                              Persyaratan
                            </p>

                            <p className="mt-1 text-xs font-medium text-slate-400">
                              Dokumen yang perlu disiapkan
                            </p>
                          </div>
                        </div>

                        {layanan.syarat.length >
                        0 ? (
                          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                            {layanan.syarat.map(
                              (
                                syarat,
                                syaratIndex
                              ) => (
                                <li
                                  key={`${layanan.id}-${syaratIndex}-${syarat}`}
                                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                                >
                                  <CheckCircle2
                                    size={17}
                                    className="mt-0.5 shrink-0 text-emerald-600"
                                  />

                                  <span className="text-sm font-semibold leading-6 text-slate-600">
                                    {syarat}
                                  </span>
                                </li>
                              )
                            )}
                          </ul>
                        ) : (
                          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                            <CircleAlert
                              size={18}
                              className="mt-0.5 shrink-0 text-amber-600"
                            />

                            <p className="text-sm font-semibold leading-6 text-amber-900">
                              Persyaratan layanan belum
                              ditambahkan oleh administrator.
                              Hubungi Kantor Desa Keji untuk
                              informasi lebih lanjut.
                            </p>
                          </div>
                        )}
                      </div>
                    </article>
                  )
                )}
              </div>
            )}
          </div>

          {/* Layanan cepat */}
          <aside className="min-w-0">
            <SidebarLayanan
              daftarLayanan={
                pilihanLayanan
              }
            />
          </aside>
        </section>

        {/* Penutup */}
        <section className="relative mt-12 overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-950 via-emerald-800 to-teal-700 p-7 text-white shadow-xl md:p-9">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(255,255,255,0.55) 1px, transparent 1px)',
              backgroundSize:
                '25px 25px',
            }}
          />

          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex h-[52px] w-[52px] items-center justify-center rounded-2xl border border-white/15 bg-white/10">
                <Sparkles size={25} />
              </div>

              <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-200">
                Pelayanan Desa Keji
              </p>

              <h2 className="mt-2 max-w-3xl text-2xl font-black md:text-3xl">
                Siapkan dokumen sebelum mengajukan
                pelayanan
              </h2>

              <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-emerald-50/80">
                Kelengkapan dan kesesuaian dokumen
                membantu petugas menyelesaikan pelayanan
                dengan lebih cepat dan tepat.
              </p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/10 px-6 py-5 text-center backdrop-blur">
              <p className="text-3xl font-black text-white">
                100%
              </p>

              <p className="mt-1 text-xs font-extrabold uppercase tracking-[0.14em] text-emerald-200">
                Pelayanan Gratis
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function JamPelayanan({
  hari,
  waktu,
  disabled = false,
}: {
  hari: string;
  waktu: string;
  disabled?: boolean;
}) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.08] p-4">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-bold text-white">
          {hari}
        </p>

        <span
          className={`shrink-0 rounded-xl px-3 py-2 text-xs font-black ${
            disabled
              ? 'bg-white/5 text-white/50'
              : 'bg-white text-emerald-800'
          }`}
        >
          {waktu}
        </span>
      </div>
    </article>
  );
}

function RingkasanItem({
  label,
  value,
  description,
  icon: Icon,
  primary = false,
}: {
  label: string;
  value: string;
  description: string;
  icon: typeof FileCheck;
  primary?: boolean;
}) {
  return (
    <article
      className={`min-h-[170px] p-6 ${
        primary
          ? 'bg-emerald-800 text-white'
          : 'bg-white text-slate-900'
      }`}
    >
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl ${
          primary
            ? 'bg-white/10 text-emerald-100'
            : 'bg-emerald-100 text-emerald-700'
        }`}
      >
        <Icon size={21} />
      </div>

      <p
        className={`mt-5 text-[10px] font-extrabold uppercase tracking-[0.15em] ${
          primary
            ? 'text-emerald-200'
            : 'text-slate-500'
        }`}
      >
        {label}
      </p>

      <p className="mt-2 text-2xl font-black">
        {value}
      </p>

      <p
        className={`mt-2 text-xs font-semibold leading-5 ${
          primary
            ? 'text-emerald-100/75'
            : 'text-slate-500'
        }`}
      >
        {description}
      </p>
    </article>
  );
}