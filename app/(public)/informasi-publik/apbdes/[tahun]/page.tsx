// app/(public)/informasi-publik/apbdes/[tahun]/page.tsx

import Link from 'next/link';

import {
  ArrowRight,
  BarChart3,
  Download,
  FileText,
  Landmark,
  PieChart,
  WalletCards,
} from 'lucide-react';

import {
  notFound,
} from 'next/navigation';

import SidebarLayanan from '@/components/SidebarLayanan';

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
  id: number;
  nama: string;
  slug: string;
}

function formatRupiah(
  value: number
) {
  return new Intl.NumberFormat(
    'id-ID',
    {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }
  ).format(value);
}

function formatPersentase(
  realisasi: number,
  anggaran: number
) {
  if (anggaran <= 0) {
    return 0;
  }

  return (
    realisasi /
    anggaran
  ) * 100;
}

function normalizeApbdes(
  row: Record<
    string,
    unknown
  >
): ApbdesRealisasi {
  return {
    id:
      String(row.id),

    tahun:
      Number(
        row.tahun
      ) as TahunApbdes,

    judul:
      String(
        row.judul
      ),

    deskripsi:
      row.deskripsi
        ? String(
            row.deskripsi
          )
        : null,

    anggaran_pendapatan:
      Number(
        row.anggaran_pendapatan ??
          0
      ),

    realisasi_pendapatan:
      Number(
        row.realisasi_pendapatan ??
          0
      ),

    anggaran_belanja:
      Number(
        row.anggaran_belanja ??
          0
      ),

    realisasi_belanja:
      Number(
        row.realisasi_belanja ??
          0
      ),

    anggaran_pembiayaan:
      Number(
        row.anggaran_pembiayaan ??
          0
      ),

    realisasi_pembiayaan:
      Number(
        row.realisasi_pembiayaan ??
          0
      ),

    dokumen_url:
      row.dokumen_url
        ? String(
            row.dokumen_url
          )
        : null,

    dokumen_path:
      row.dokumen_path
        ? String(
            row.dokumen_path
          )
        : null,

    infografis_url:
      row.infografis_url
        ? String(
            row.infografis_url
          )
        : null,

    infografis_path:
      row.infografis_path
        ? String(
            row.infografis_path
          )
        : null,

    aktif:
      Boolean(
        row.aktif
      ),

    created_at:
      String(
        row.created_at ?? ''
      ),

    updated_at:
      String(
        row.updated_at ?? ''
      ),
  };
}

export default async function ApbdesPublicPage({
  params,
}: PageProps) {
  const {
    tahun: tahunParam,
  } = await params;

  const tahun =
    Number(
      tahunParam
    );

  if (
    !TAHUN_APBDES.includes(
      tahun as TahunApbdes
    )
  ) {
    notFound();
  }

  const [
    apbdesResult,
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
      .eq('tahun', tahun)
      .eq('aktif', true)
      .maybeSingle(),

    supabaseAdmin
      .from('layanan')
      .select(`
        id,
        nama,
        slug
      `)
      .eq('aktif', true)
      .order('urutan', {
        ascending: true,
      }),
  ]);

  if (
    apbdesResult.error
  ) {
    console.error(
      'Gagal mengambil APBDes:',
      {
        message:
          apbdesResult.error.message,
        code:
          apbdesResult.error.code,
        details:
          apbdesResult.error.details,
        hint:
          apbdesResult.error.hint,
      }
    );
  }

  const daftarLayanan:
    PilihanLayanan[] = (
      (layananResult.data ??
        []) as LayananRow[]
    )
      .map((item) => ({
        id:
          Number(item.id),

        nama:
          String(
            item.nama ?? ''
          ).trim(),

        slug:
          String(
            item.slug ?? ''
          ).trim(),
      }))
      .filter(
        (item) =>
          item.id > 0 &&
          item.nama &&
          item.slug
      );

  const data =
    apbdesResult.data
      ? normalizeApbdes(
          apbdesResult.data as Record<
            string,
            unknown
          >
        )
      : null;

  const selisihRealisasi =
    data
      ? data.realisasi_pendapatan +
        data.realisasi_pembiayaan -
        data.realisasi_belanja
      : 0;

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-700">
            <Landmark size={16} />
            Informasi Publik
          </div>

          <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
            Realisasi APBDes {tahun}
          </h1>

          <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-500 md:text-base">
            Informasi transparansi anggaran dan
            realisasi Anggaran Pendapatan dan Belanja
            Desa Keji Tahun {tahun}.
          </p>
        </header>

        <nav className="mb-6 flex flex-wrap gap-2">
          {TAHUN_APBDES.map(
            (item) => (
              <Link
                key={item}
                href={`/informasi-publik/apbdes/${item}`}
                className={`rounded-xl px-4 py-2.5 text-sm font-extrabold transition ${
                  item === tahun
                    ? 'bg-emerald-700 text-white shadow-md'
                    : 'border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-700'
                }`}
              >
                APBDes {item}
              </Link>
            )
          )}
        </nav>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <main className="min-w-0 space-y-6 lg:w-2/3">
            {!data ? (
              <section className="rounded-3xl border border-amber-200 bg-amber-50 p-10 text-center">
                <FileText
                  size={44}
                  className="mx-auto text-amber-400"
                />

                <h2 className="mt-4 text-xl font-black text-amber-900">
                  Data APBDes {tahun} belum dipublikasikan
                </h2>

                <p className="mt-2 text-sm font-medium text-amber-700">
                  Pemerintah Desa Keji belum
                  mempublikasikan informasi APBDes
                  untuk tahun ini.
                </p>
              </section>
            ) : (
              <>
                <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-700 p-6 text-white shadow-xl md:p-8">
                  <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border-[48px] border-white/[0.06]" />

                  <div className="relative">
                    <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-100">
                      Transparansi Anggaran
                    </p>

                    <h2 className="mt-3 text-2xl font-black md:text-3xl">
                      {data.judul}
                    </h2>

                    <p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed text-emerald-50/85">
                      {data.deskripsi ??
                        'Informasi realisasi APBDes Desa Keji.'}
                    </p>

                    <div className="mt-6 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                      <p className="text-xs font-extrabold uppercase tracking-wider text-emerald-100">
                        Selisih Realisasi
                      </p>

                      <p className="mt-2 text-2xl font-black">
                        {formatRupiah(
                          selisihRealisasi
                        )}
                      </p>

                      <p className="mt-1 text-xs text-emerald-100/80">
                        Pendapatan + pembiayaan neto − belanja.
                      </p>
                    </div>
                  </div>
                </section>

                <section className="grid gap-5">
                  <RealisasiCard
                    title="Pendapatan Desa"
                    icon={WalletCards}
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
                </section>

                {data.infografis_url && (
                  <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-100 p-5">
                      <h2 className="text-xl font-black text-slate-900">
                        Infografis APBDes {tahun}
                      </h2>
                    </div>

                    <a
                      href={data.infografis_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-slate-100"
                    >
                      <img
                        src={data.infografis_url}
                        alt={`Infografis APBDes Desa Keji Tahun ${tahun}`}
                        className="h-auto w-full object-contain"
                      />
                    </a>
                  </section>
                )}

                {data.dokumen_url && (
                  <section className="flex flex-col gap-4 rounded-3xl border border-emerald-200 bg-emerald-50 p-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-3">
                      <div className="rounded-xl bg-emerald-700 p-3 text-white">
                        <FileText size={22} />
                      </div>

                      <div>
                        <h2 className="font-black text-emerald-900">
                          Dokumen APBDes {tahun}
                        </h2>

                        <p className="mt-1 text-sm font-medium text-emerald-700">
                          Buka dokumen resmi APBDes dalam format PDF.
                        </p>
                      </div>
                    </div>

                    <a
                      href={data.dokumen_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-emerald-800"
                    >
                      <Download size={17} />
                      Lihat Dokumen
                    </a>
                  </section>
                )}
              </>
            )}
          </main>

          <aside className="min-w-0 lg:w-1/3">
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

function RealisasiCard({
  title,
  icon: Icon,
  anggaran,
  realisasi,
}: {
  title: string;
  icon: typeof WalletCards;
  anggaran: number;
  realisasi: number;
}) {
  const percentage =
    formatPersentase(
      realisasi,
      anggaran
    );

  const width =
    Math.min(
      Math.max(
        percentage,
        0
      ),
      100
    );

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
          <Icon size={23} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                {title}
              </h2>

              <p className="mt-1 text-xs font-semibold text-slate-400">
                Anggaran dibandingkan dengan realisasi.
              </p>
            </div>

            <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-black text-emerald-700">
              {new Intl.NumberFormat(
                'id-ID',
                {
                  maximumFractionDigits: 2,
                }
              ).format(
                percentage
              )}
              %
            </span>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Anggaran
              </p>

              <p className="mt-2 text-lg font-black text-slate-800">
                {formatRupiah(
                  anggaran
                )}
              </p>
            </div>

            <div className="rounded-2xl bg-emerald-50 p-4">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600">
                Realisasi
              </p>

              <p className="mt-2 text-lg font-black text-emerald-800">
                {formatRupiah(
                  realisasi
                )}
              </p>
            </div>
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
              style={{
                width:
                  `${width}%`,
              }}
            />
          </div>

          <div className="mt-2 flex justify-between text-[10px] font-bold text-slate-400">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>
      </div>
    </article>
  );
}