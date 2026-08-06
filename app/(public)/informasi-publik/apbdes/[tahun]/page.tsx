// app/(public)/informasi-publik/apbdes/[tahun]/page.tsx

import type {
  Metadata,
} from 'next';

import Link from 'next/link';

import {
  ArrowRight,
  BarChart3,
  CircleAlert,
  Download,
  FileText,
  Landmark,
  PieChart,
  ShieldCheck,
  WalletCards,
  type LucideIcon,
} from 'lucide-react';

import {
  notFound,
} from 'next/navigation';

import SidebarLayanan from '@/components/SidebarLayanan';
import SidebarTilikArkeji from '@/components/SidebarTilikArkeji';

import {
  supabaseAdmin,
} from '@/lib/supabase-admin';

import {
  TAHUN_APBDES,
} from '@/types/apbdes';

import type {
  ApbdesRealisasi,
  TahunApbdes,
} from '@/types/apbdes';

import type {
  PilihanLayanan,
} from '@/types/layanan';

export const dynamic =
  'force-dynamic';

export const revalidate = 0;

interface PageProps {
  params: Promise<{
    tahun: string;
  }>;
}

interface LayananRow {
  id:
    | number
    | string
    | null;

  nama:
    | string
    | null;

  slug:
    | string
    | null;
}

interface TahunApbdesRow {
  tahun:
    | number
    | string
    | null;
}

function safeString(
  value: unknown
) {
  return String(
    value ?? ''
  ).trim();
}

function safeNumber(
  value: unknown,
  fallback = 0
) {
  const number =
    Number(value);

  return Number.isFinite(
    number
  )
    ? number
    : fallback;
}

function isValidTahun(
  value: number
) {
  return (
    Number.isInteger(
      value
    ) &&
    value >= 1900 &&
    value <= 2100
  );
}

function getSafePublicUrl(
  value: unknown
) {
  const url =
    safeString(value);

  if (!url) {
    return null;
  }

  if (
    url.startsWith('/') &&
    !url.startsWith('//')
  ) {
    return url;
  }

  try {
    const parsedUrl =
      new URL(url);

    if (
      parsedUrl.protocol !==
        'https:' &&
      parsedUrl.protocol !==
        'http:'
    ) {
      return null;
    }

    return parsedUrl.toString();
  } catch {
    return null;
  }
}

function formatRupiah(
  value: number
) {
  return new Intl.NumberFormat(
    'id-ID',
    {
      style: 'currency',

      currency: 'IDR',

      minimumFractionDigits:
        0,

      maximumFractionDigits:
        0,
    }
  ).format(
    Number.isFinite(value)
      ? value
      : 0
  );
}

function formatAngka(
  value: number
) {
  return new Intl.NumberFormat(
    'id-ID'
  ).format(
    Number.isFinite(value)
      ? value
      : 0
  );
}

function formatDesimal(
  value: number
) {
  return new Intl.NumberFormat(
    'id-ID',
    {
      minimumFractionDigits:
        0,

      maximumFractionDigits:
        2,
    }
  ).format(
    Number.isFinite(value)
      ? value
      : 0
  );
}

function hitungPersentase(
  realisasi: number,
  anggaran: number
) {
  if (
    !Number.isFinite(
      realisasi
    ) ||
    !Number.isFinite(
      anggaran
    ) ||
    anggaran <= 0
  ) {
    return 0;
  }

  return (
    realisasi /
    anggaran
  ) * 100;
}

function normalizeApbdes(
  value: unknown
): ApbdesRealisasi | null {
  if (
    !value ||
    typeof value !==
      'object' ||
    Array.isArray(value)
  ) {
    return null;
  }

  const row =
    value as Record<
      string,
      unknown
    >;

  const id =
    safeString(row.id);

  const tahun =
    safeNumber(row.tahun);

  if (
    !id ||
    !isValidTahun(tahun)
  ) {
    return null;
  }

  return {
    id,

    tahun:
      tahun as TahunApbdes,

    judul:
      safeString(
        row.judul
      ) ||
      `Realisasi APBDes Desa Keji Tahun ${tahun}`,

    deskripsi:
      safeString(
        row.deskripsi
      ) || null,

    anggaran_pendapatan:
      safeNumber(
        row.anggaran_pendapatan
      ),

    realisasi_pendapatan:
      safeNumber(
        row.realisasi_pendapatan
      ),

    anggaran_belanja:
      safeNumber(
        row.anggaran_belanja
      ),

    realisasi_belanja:
      safeNumber(
        row.realisasi_belanja
      ),

    anggaran_pembiayaan:
      safeNumber(
        row.anggaran_pembiayaan
      ),

    realisasi_pembiayaan:
      safeNumber(
        row.realisasi_pembiayaan
      ),

    dokumen_url:
      safeString(
        row.dokumen_url
      ) || null,

    dokumen_path:
      safeString(
        row.dokumen_path
      ) || null,

    infografis_url:
      safeString(
        row.infografis_url
      ) || null,

    infografis_path:
      safeString(
        row.infografis_path
      ) || null,

    aktif:
      Boolean(
        row.aktif
      ),

    created_at:
      safeString(
        row.created_at
      ),

    updated_at:
      safeString(
        row.updated_at
      ),
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const {
    tahun: tahunParam,
  } = await params;

  const tahun =
    Number(tahunParam);

  if (
    !isValidTahun(tahun)
  ) {
    return {
      title:
        'APBDes Desa Keji | SIJI',

      description:
        'Informasi transparansi APBDes Pemerintah Desa Keji.',
    };
  }

  return {
    title:
      `Realisasi APBDes ${tahun} | SIJI Desa Keji`,

    description:
      `Informasi transparansi anggaran dan realisasi APBDes Desa Keji Tahun ${tahun}.`,
  };
}

export default async function ApbdesPublicPage({
  params,
}: PageProps) {
  const {
    tahun: tahunParam,
  } = await params;

  const tahun =
    Number(tahunParam);

  if (
    !/^\d{4}$/.test(
      tahunParam
    ) ||
    !isValidTahun(tahun)
  ) {
    notFound();
  }

  const [
    apbdesResult,
    tahunResult,
    layananResult,
  ] = await Promise.all([
    supabaseAdmin
      .from(
        'apbdes_realisasi'
      )
      .select(`
        id,
        tahun,
        judul,
        deskripsi,
        anggaran_pendapatan,
        realisasi_pendapatan,
        anggaran_belanja,
        realisasi_belanja,
        anggaran_pembiayaan,
        realisasi_pembiayaan,
        dokumen_url,
        dokumen_path,
        infografis_url,
        infografis_path,
        aktif,
        created_at,
        updated_at
      `)
      .eq(
        'tahun',
        tahun
      )
      .eq(
        'aktif',
        true
      )
      .maybeSingle(),

    supabaseAdmin
      .from(
        'apbdes_realisasi'
      )
      .select(`
        tahun
      `)
      .eq(
        'aktif',
        true
      )
      .order(
        'tahun',
        {
          ascending: true,
        }
      ),

    supabaseAdmin
      .from('layanan')
      .select(`
        id,
        nama,
        slug
      `)
      .eq(
        'aktif',
        true
      )
      .order(
        'urutan',
        {
          ascending: true,
          nullsFirst: false,
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
    apbdesResult.error
  ) {
    console.error(
      'Gagal mengambil APBDes:',
      {
        message:
          apbdesResult.error
            .message,

        code:
          apbdesResult.error
            .code,

        details:
          apbdesResult.error
            .details,

        hint:
          apbdesResult.error
            .hint,
      }
    );
  }

  if (
    tahunResult.error
  ) {
    console.error(
      'Gagal mengambil daftar tahun APBDes:',
      {
        message:
          tahunResult.error
            .message,

        code:
          tahunResult.error
            .code,

        details:
          tahunResult.error
            .details,

        hint:
          tahunResult.error
            .hint,
      }
    );
  }

  if (
    layananResult.error
  ) {
    console.error(
      'Gagal mengambil layanan:',
      {
        message:
          layananResult.error
            .message,

        code:
          layananResult.error
            .code,

        details:
          layananResult.error
            .details,

        hint:
          layananResult.error
            .hint,
      }
    );
  }

  const data =
    normalizeApbdes(
      apbdesResult.data
    );

  const tahunDatabase =
    (
      (
        tahunResult.data ??
        []
      ) as TahunApbdesRow[]
    )
      .map((item) =>
        Number(
          item.tahun
        )
      )
      .filter(
        (
          item
        ): item is number =>
          isValidTahun(item)
      );

  const daftarTahun = [
    ...new Set<number>([
      ...TAHUN_APBDES.map(
        (item) =>
          Number(item)
      ).filter(
        isValidTahun
      ),

      ...tahunDatabase,

      tahun,
    ]),
  ].sort(
    (first, second) =>
      first - second
  );

  const daftarLayanan:
    PilihanLayanan[] = (
      (
        layananResult.data ??
        []
      ) as LayananRow[]
    )
      .map((item) => {
        const id =
          Number(item.id);

        const nama =
          safeString(
            item.nama
          );

        const slug =
          safeString(
            item.slug
          );

        return {
          id,
          nama,
          slug,
        };
      })
      .filter(
        (item) =>
          Number.isInteger(
            item.id
          ) &&
          item.id > 0 &&
          item.nama.length >
            0 &&
          item.slug.length >
            0
      );

  const selisihRealisasi =
    data
      ? data.realisasi_pendapatan +
        data.realisasi_pembiayaan -
        data.realisasi_belanja
      : 0;

  /*
   * APBDes 2026 menggunakan
   * infografis lokal pada folder
   * public/images/anti-korupsi.
   */
  const infografisUrl =
    getSafePublicUrl(
      tahun === 2026
        ? '/images/anti-korupsi/APBDes-2026.png'
        : data?.infografis_url
    );

  const dokumenUrl =
    getSafePublicUrl(
      data?.dokumen_url
    );

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Halaman */}
        <header className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-800 to-emerald-700 px-6 py-8 text-white shadow-lg sm:px-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)',

              backgroundSize:
                '25px 25px',
            }}
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border-[52px] border-white/[0.04]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-emerald-400/[0.06] blur-2xl"
          />

          <div className="relative">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
              <Landmark
                size={24}
              />
            </div>

            <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-200">
              Informasi Publik
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              Realisasi APBDes{' '}
              {tahun}
            </h1>

            <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-emerald-50/80 sm:text-base">
              Informasi transparansi
              anggaran dan realisasi
              Anggaran Pendapatan dan
              Belanja Desa Keji Tahun{' '}
              {tahun}.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <HeaderBadge
                label={`Tahun Anggaran ${tahun}`}
              />

              <HeaderBadge
                label={
                  data
                    ? 'Data dipublikasikan'
                    : 'Nominal belum tersedia'
                }
              />

              {infografisUrl && (
                <HeaderBadge
                  label="Infografis tersedia"
                />
              )}
            </div>
          </div>
        </header>

        {/* Navigasi Tahun */}
        <nav
          aria-label="Navigasi tahun APBDes"
          className="mb-8 flex flex-wrap gap-2"
        >
          {daftarTahun.map(
            (item) => (
              <Link
                key={item}
                href={`/informasi-publik/apbdes/${item}`}
                aria-current={
                  item === tahun
                    ? 'page'
                    : undefined
                }
                className={`rounded-xl px-4 py-2.5 text-sm font-extrabold transition ${
                  item === tahun
                    ? 'bg-emerald-700 text-white shadow-md'
                    : 'border border-emerald-200 bg-white text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                APBDes {item}
              </Link>
            )
          )}
        </nav>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* Konten Utama */}
          <main className="min-w-0 space-y-7 lg:w-2/3">
            {/* Data Belum Tersedia */}
            {!data && (
              <section className="rounded-3xl border border-dashed border-emerald-200 bg-white px-6 py-12 text-center shadow-sm sm:px-8">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-300">
                  <FileText
                    size={34}
                  />
                </div>

                <h2 className="mt-5 text-xl font-black text-slate-900">
                  Data nominal APBDes{' '}
                  {tahun} belum
                  dipublikasikan
                </h2>

                <p className="mx-auto mt-3 max-w-xl text-sm font-medium leading-7 text-slate-500">
                  Pemerintah Desa Keji
                  belum mempublikasikan
                  rincian anggaran dan
                  realisasi APBDes untuk
                  tahun ini.
                </p>

                {infografisUrl && (
                  <p className="mt-3 text-xs font-bold text-emerald-700">
                    Infografis APBDes
                    tetap tersedia pada
                    bagian berikutnya.
                  </p>
                )}
              </section>
            )}

            {/* Data APBDes */}
            {data && (
              <>
                {/* Hero Transparansi */}
                <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-800 to-emerald-700 p-6 text-white shadow-xl sm:p-8">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle, rgba(255,255,255,0.24) 1px, transparent 1px)',

                      backgroundSize:
                        '25px 25px',
                    }}
                  />

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border-[48px] border-white/[0.05]"
                  />

                  <div className="relative">
                    <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-200">
                      Transparansi
                      Anggaran
                    </p>

                    <h2 className="mt-3 text-2xl font-black leading-tight sm:text-3xl">
                      {data.judul}
                    </h2>

                    <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-emerald-50/80">
                      {data.deskripsi ??
                        'Informasi realisasi APBDes Desa Keji.'}
                    </p>

                    <div className="mt-7 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                      <p className="text-xs font-extrabold uppercase tracking-wider text-emerald-100">
                        Selisih Realisasi
                      </p>

                      <p className="mt-2 break-words text-2xl font-black sm:text-3xl">
                        {formatRupiah(
                          selisihRealisasi
                        )}
                      </p>

                      <p className="mt-2 text-xs font-medium leading-6 text-emerald-100/80">
                        Realisasi
                        pendapatan ditambah
                        realisasi
                        pembiayaan, kemudian
                        dikurangi realisasi
                        belanja.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Ringkasan Anggaran */}
                <section>
                  <div className="mb-6 flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-700 text-white">
                      <BarChart3
                        size={21}
                      />
                    </div>

                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-emerald-700">
                        Ringkasan Anggaran
                      </p>

                      <h2 className="mt-1 text-2xl font-black text-slate-900">
                        Anggaran dan
                        Realisasi
                      </h2>

                      <p className="mt-2 text-sm font-medium leading-7 text-slate-500">
                        Perbandingan nilai
                        anggaran dengan
                        realisasi setiap
                        komponen APBDes.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-5">
                    <RealisasiCard
                      title="Pendapatan Desa"
                      icon={
                        WalletCards
                      }
                      anggaran={
                        data.anggaran_pendapatan
                      }
                      realisasi={
                        data.realisasi_pendapatan
                      }
                    />

                    <RealisasiCard
                      title="Belanja Desa"
                      icon={BarChart3}
                      anggaran={
                        data.anggaran_belanja
                      }
                      realisasi={
                        data.realisasi_belanja
                      }
                    />

                    <RealisasiCard
                      title="Pembiayaan Neto"
                      icon={PieChart}
                      anggaran={
                        data.anggaran_pembiayaan
                      }
                      realisasi={
                        data.realisasi_pembiayaan
                      }
                    />
                  </div>
                </section>
              </>
            )}

            {/* Infografis */}
            {infografisUrl && (
              <section className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm">
                <div className="border-b border-emerald-100 p-5 sm:p-6">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-emerald-700">
                    Transparansi
                    Anggaran
                  </p>

                  <h2 className="mt-2 text-xl font-black text-slate-900 sm:text-2xl">
                    Infografis APBDes
                    Desa Keji Tahun{' '}
                    {tahun}
                  </h2>

                  <p className="mt-2 text-sm font-medium leading-7 text-slate-500">
                    Ringkasan visual
                    Anggaran Pendapatan
                    dan Belanja Desa
                    Keji Tahun Anggaran{' '}
                    {tahun}.
                  </p>
                </div>

                <div className="bg-emerald-50 p-3 sm:p-5">
                  <a
                    href={
                      infografisUrl
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block overflow-hidden rounded-2xl bg-white shadow-sm"
                  >
                    <img
                      src={
                        infografisUrl
                      }
                      alt={`Infografis APBDes Desa Keji Tahun ${tahun}`}
                      loading="lazy"
                      className="h-auto w-full object-contain"
                    />
                  </a>
                </div>

                <div className="border-t border-emerald-100 p-5">
                  <a
                    href={
                      infografisUrl
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-extrabold text-emerald-700 transition hover:text-emerald-900"
                  >
                    Lihat infografis
                    ukuran penuh

                    <ArrowRight
                      size={16}
                    />
                  </a>
                </div>
              </section>
            )}

            {/* Dokumen PDF */}
            {dokumenUrl && (
              <section className="flex flex-col gap-5 rounded-3xl border border-emerald-200 bg-emerald-50 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-700 text-white">
                    <FileText
                      size={21}
                    />
                  </div>

                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-emerald-700">
                      Dokumen Resmi
                    </p>

                    <h2 className="mt-1 font-black text-emerald-950">
                      Dokumen APBDes{' '}
                      {tahun}
                    </h2>

                    <p className="mt-2 text-sm font-medium leading-7 text-emerald-800">
                      Buka dokumen resmi
                      APBDes dalam format
                      digital.
                    </p>
                  </div>
                </div>

                <a
                  href={
                    dokumenUrl
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 text-sm font-extrabold text-white transition hover:bg-emerald-800"
                >
                  <Download
                    size={17}
                  />

                  Lihat Dokumen
                </a>
              </section>
            )}

            {/* Dokumen Tidak Tersedia */}
            {data &&
              !dokumenUrl && (
                <section className="rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                      <CircleAlert
                        size={21}
                      />
                    </div>

                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-emerald-700">
                        Dokumen APBDes
                      </p>

                      <h2 className="mt-1 font-black text-slate-900">
                        File Dokumen Belum
                        Tersedia
                      </h2>

                      <p className="mt-2 text-sm font-medium leading-7 text-slate-500">
                        Data nominal telah
                        dipublikasikan, tetapi
                        file dokumen resmi
                        belum ditambahkan oleh
                        administrator.
                      </p>
                    </div>
                  </div>
                </section>
              )}

            {/* Sumber Informasi */}
            <section className="rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <ShieldCheck
                    size={21}
                  />
                </div>

                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-emerald-700">
                    Transparansi Desa
                  </p>

                  <h2 className="mt-1 font-black text-slate-900">
                    Informasi Anggaran
                    Pemerintah Desa Keji
                  </h2>

                  <p className="mt-2 text-sm font-medium leading-7 text-slate-500">
                    Data yang ditampilkan
                    merupakan informasi
                    APBDes yang telah
                    diaktifkan dan
                    dipublikasikan melalui
                    halaman administrator
                    website Desa Keji.
                  </p>
                </div>
              </div>
            </section>
          </main>

          {/* Sidebar Kanan */}
          <aside className="min-w-0 lg:w-1/3">
            <div className="flex flex-col gap-8 lg:sticky lg:top-24">
              <SidebarLayanan
                daftarLayanan={
                  daftarLayanan
                }
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

function HeaderBadge({
  label,
}: {
  label: string;
}) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-bold text-emerald-50 backdrop-blur">
      {label}
    </span>
  );
}

function RealisasiCard({
  title,
  icon: Icon,
  anggaran,
  realisasi,
}: {
  title: string;
  icon: LucideIcon;
  anggaran: number;
  realisasi: number;
}) {
  const persentase =
    hitungPersentase(
      realisasi,
      anggaran
    );

  const progressWidth =
    Math.min(
      Math.max(
        persentase,
        0
      ),
      100
    );

  const selisih =
    anggaran -
    realisasi;

  return (
    <article className="group rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm transition hover:border-emerald-300 hover:shadow-md sm:p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 transition group-hover:bg-emerald-700 group-hover:text-white">
          <Icon
            size={23}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-900">
                {title}
              </h3>

              <p className="mt-1 text-xs font-semibold text-slate-400">
                Anggaran dibandingkan
                dengan realisasi.
              </p>
            </div>

            <span className="w-fit rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-black text-emerald-700">
              {formatDesimal(
                persentase
              )}
              %
            </span>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Anggaran
              </p>

              <p className="mt-2 break-words text-lg font-black text-slate-800">
                {formatRupiah(
                  anggaran
                )}
              </p>
            </div>

            <div className="rounded-2xl bg-emerald-50 p-4">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600">
                Realisasi
              </p>

              <p className="mt-2 break-words text-lg font-black text-emerald-800">
                {formatRupiah(
                  realisasi
                )}
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-emerald-100 bg-white p-4">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Selisih Anggaran
              </p>

              <p className="text-sm font-black text-slate-800">
                {formatRupiah(
                  selisih
                )}
              </p>
            </div>
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-700 transition-all duration-700"
              style={{
                width:
                  `${progressWidth}%`,
              }}
            />
          </div>

          <div className="mt-2 flex justify-between text-[10px] font-bold text-slate-400">
            <span>0%</span>

            <span>
              {persentase > 100
                ? `${formatDesimal(
                    persentase
                  )}%`
                : '100%'}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}