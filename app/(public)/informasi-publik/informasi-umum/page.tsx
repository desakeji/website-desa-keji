// app/(public)/informasi-publik/informasi-umum/page.tsx

import Link from 'next/link';

import {
  Download,
  Eye,
  FileSearch,
  FileText,
  Filter,
  Info,
  Search,
} from 'lucide-react';

import SidebarLayanan from '@/components/SidebarLayanan';

import {
  supabaseAdmin,
} from '@/lib/supabase-admin';

import type {
  InformasiUmumItem,
} from '@/types/informasi-publik';

import type {
  PilihanLayanan,
} from '@/types/layanan';

export const dynamic =
  'force-dynamic';

export const revalidate = 0;

interface PageProps {
  searchParams: Promise<{
    q?: string;
    kategori?: string;
    tahun?: string;
    page?: string;
  }>;
}

interface LayananRow {
  id: number;
  nama: string;
  slug: string;
}

const LIMIT = 10;

function sanitizeSearch(
  value: string
) {
  return value
    .normalize('NFKC')
    .replace(
      /[^\p{L}\p{N}\s\-/]/gu,
      ' '
    )
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 100);
}

function parsePage(
  value: string | undefined
) {
  const number =
    Number(value);

  return Number.isInteger(
    number
  ) &&
    number > 0
    ? number
    : 1;
}

function buildUrl({
  q,
  kategori,
  tahun,
  page,
}: {
  q: string;
  kategori: string;
  tahun: string;
  page: number;
}) {
  const params =
    new URLSearchParams();

  if (q) {
    params.set('q', q);
  }

  if (kategori) {
    params.set(
      'kategori',
      kategori
    );
  }

  if (tahun) {
    params.set(
      'tahun',
      tahun
    );
  }

  params.set(
    'page',
    String(page)
  );

  return `/informasi-publik/informasi-umum?${params.toString()}`;
}

export default async function InformasiUmumPage({
  searchParams,
}: PageProps) {
  const params =
    await searchParams;

  const q =
    sanitizeSearch(
      params.q ??
        ''
    );

  const kategori =
    String(
      params.kategori ??
        ''
    ).trim();

  const tahun =
    String(
      params.tahun ??
        ''
    ).trim();

  const page =
    parsePage(
      params.page
    );

  const from =
    (page - 1) *
    LIMIT;

  const to =
    from +
    LIMIT -
    1;

  let query =
    supabaseAdmin
      .from(
        'informasi_umum'
      )
      .select(
        '*',
        {
          count: 'exact',
        }
      )
      .eq('aktif', true);

  if (q) {
    query =
      query.ilike(
        'judul',
        `%${q}%`
      );
  }

  if (kategori) {
    query =
      query.eq(
        'kategori',
        kategori
      );
  }

  if (
    /^\d{4}$/.test(
      tahun
    )
  ) {
    query =
      query.eq(
        'tahun',
        Number(tahun)
      );
  }

  query =
    query
      .order('urutan', {
        ascending: true,
      })
      .order('tahun', {
        ascending: false,
      })
      .range(from, to);

  const [
    informasiResult,
    metadataResult,
    layananResult,
  ] = await Promise.all([
    query,

    supabaseAdmin
      .from(
        'informasi_umum'
      )
      .select(`
        kategori,
        tahun
      `)
      .eq('aktif', true),

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

  const daftarInformasi =
    (
      informasiResult.data ??
      []
    ) as InformasiUmumItem[];

  const totalData =
    informasiResult.count ??
    0;

  const totalPages =
    Math.max(
      Math.ceil(
        totalData /
        LIMIT
      ),
      1
    );

  const metadata =
    metadataResult.data ??
    [];

  const kategoriList = [
    ...new Set(
      metadata.map(
        (item) =>
          String(
            item.kategori
          )
      )
    ),
  ].sort();

  const tahunList = [
    ...new Set(
      metadata.map(
        (item) =>
          Number(
            item.tahun
          )
      )
    ),
  ].sort(
    (a, b) =>
      b - a
  );

  const daftarLayanan:
    PilihanLayanan[] = (
      (layananResult.data ??
        []) as LayananRow[]
    ).map(
      (item) => ({
        id:
          Number(item.id),

        nama:
          String(item.nama),

        slug:
          String(item.slug),
      })
    );

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-700">
            <Info size={16} />
            Informasi Publik
          </div>

          <h1 className="text-3xl font-black text-slate-900 md:text-4xl">
            Informasi Umum
          </h1>

          <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-slate-500">
            Dokumen pemerintahan, pembangunan,
            pelayanan, dan informasi umum Desa Keji.
          </p>
        </header>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <main className="min-w-0 space-y-6 lg:w-2/3">
            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
                  <FileSearch size={22} />
                </div>

                <div>
                  <h2 className="font-black text-slate-900">
                    Dokumen Informasi Desa
                  </h2>

                  <p className="mt-1 text-sm font-medium text-slate-500">
                    Gunakan pencarian dan filter untuk
                    menemukan dokumen yang dibutuhkan.
                  </p>
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 p-5">
                <div className="mb-5 flex items-center gap-3">
                  <Filter
                    size={20}
                    className="text-emerald-700"
                  />

                  <h2 className="font-black text-slate-900">
                    Filter Informasi
                  </h2>
                </div>

                <form
                  method="get"
                  className="grid gap-4 md:grid-cols-2"
                >
                  <select
                    name="kategori"
                    defaultValue={
                      kategori
                    }
                    className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold"
                  >
                    <option value="">
                      Semua Kategori
                    </option>

                    {kategoriList.map(
                      (item) => (
                        <option
                          key={item}
                          value={item}
                        >
                          {item}
                        </option>
                      )
                    )}
                  </select>

                  <select
                    name="tahun"
                    defaultValue={tahun}
                    className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold"
                  >
                    <option value="">
                      Semua Tahun
                    </option>

                    {tahunList.map(
                      (item) => (
                        <option
                          key={item}
                          value={item}
                        >
                          {item}
                        </option>
                      )
                    )}
                  </select>

                  <div className="relative md:col-span-2">
                    <Search
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      name="q"
                      defaultValue={q}
                      placeholder="Cari informasi..."
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-semibold"
                    />
                  </div>

                  <div className="flex gap-2 md:col-span-2">
                    <button className="rounded-xl bg-emerald-700 px-5 py-3 text-sm font-extrabold text-white">
                      Terapkan Filter
                    </button>

                    <Link
                      href="/informasi-publik/informasi-umum"
                      className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600"
                    >
                      Reset
                    </Link>
                  </div>
                </form>
              </div>

              {daftarInformasi.length ===
              0 ? (
                <div className="px-6 py-14 text-center">
                  <FileText
                    size={46}
                    className="mx-auto text-slate-300"
                  />

                  <h3 className="mt-4 font-black text-slate-700">
                    Dokumen tidak ditemukan
                  </h3>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {daftarInformasi.map(
                    (item) => (
                      <article
                        key={item.id}
                        className="p-5 md:p-6"
                      >
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0">
                            <div className="flex flex-wrap gap-2">
                              <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-extrabold text-emerald-700">
                                {item.kategori}
                              </span>

                              <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-extrabold text-slate-500">
                                {item.tahun}
                              </span>
                            </div>

                            <h2 className="mt-3 text-lg font-black text-slate-900">
                              {item.judul}
                            </h2>

                            <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
                              {item.deskripsi}
                            </p>
                          </div>

                          <div className="flex shrink-0 gap-2">
                            <a
                              href={
                                item.file_url
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex h-10 items-center gap-2 rounded-xl bg-cyan-700 px-4 text-xs font-extrabold text-white"
                            >
                              <Eye size={15} />
                              Lihat
                            </a>

                            <a
                              href={
                                item.file_url
                              }
                              download
                              className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-200 text-emerald-700"
                            >
                              <Download
                                size={16}
                              />
                            </a>
                          </div>
                        </div>
                      </article>
                    )
                  )}
                </div>
              )}

              {totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-slate-100 p-5">
                  <p className="text-xs font-semibold text-slate-400">
                    Halaman {page} dari{' '}
                    {totalPages}
                  </p>

                  <div className="flex gap-2">
                    {page > 1 && (
                      <Link
                        href={buildUrl({
                          q,
                          kategori,
                          tahun,
                          page:
                            page - 1,
                        })}
                        className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold"
                      >
                        Sebelumnya
                      </Link>
                    )}

                    {page <
                      totalPages && (
                      <Link
                        href={buildUrl({
                          q,
                          kategori,
                          tahun,
                          page:
                            page + 1,
                        })}
                        className="rounded-xl bg-emerald-700 px-4 py-2 text-xs font-bold text-white"
                      >
                        Selanjutnya
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </section>
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