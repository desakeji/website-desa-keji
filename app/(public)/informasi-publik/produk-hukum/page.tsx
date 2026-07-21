// app/(public)/informasi-publik/produk-hukum/page.tsx

import Link from 'next/link';

import {
  Download,
  Eye,
  FileSearch,
  FileText,
  Filter,
  Scale,
  Search,
} from 'lucide-react';

import SidebarLayanan from '@/components/SidebarLayanan';

import {
  supabaseAdmin,
} from '@/lib/supabase-admin';

import type {
  PilihanLayanan,
} from '@/types/layanan';

import type {
  ProdukHukum,
} from '@/types/produk-hukum';

export const dynamic =
  'force-dynamic';

export const revalidate = 0;

interface PageProps {
  searchParams: Promise<{
    q?: string;
    tahun?: string;
    jenis?: string;
    page?: string;
    limit?: string;
  }>;
}

interface ProdukHukumMetadata {
  tahun: number;
  jenis: string;
}

interface LayananRow {
  id: number;
  nama: string;
  slug: string;
}

const DEFAULT_LIMIT = 10;

const ALLOWED_LIMITS = [
  5,
  10,
  20,
  50,
];

function sanitizeSearch(
  value: string
) {
  return value
    .normalize('NFKC')
    .replace(
      /[^\p{L}\p{N}\s\-/]/gu,
      ' '
    )
    .replace(
      /\s+/g,
      ' '
    )
    .trim()
    .slice(0, 100);
}

function parsePositiveInteger(
  value: string | undefined,
  fallback: number
) {
  const number =
    Number(value);

  if (
    !Number.isInteger(number) ||
    number < 1
  ) {
    return fallback;
  }

  return number;
}

function formatTanggal(
  value:
    | string
    | null
) {
  if (!value) {
    return '-';
  }

  const date =
    new Date(
      `${value}T00:00:00`
    );

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return '-';
  }

  return new Intl.DateTimeFormat(
    'id-ID',
    {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      timeZone:
        'Asia/Jakarta',
    }
  ).format(date);
}

function buildPageUrl({
  q,
  tahun,
  jenis,
  limit,
  page,
}: {
  q: string;
  tahun: string;
  jenis: string;
  limit: number;
  page: number;
}) {
  const params =
    new URLSearchParams();

  if (q) {
    params.set('q', q);
  }

  if (tahun) {
    params.set(
      'tahun',
      tahun
    );
  }

  if (jenis) {
    params.set(
      'jenis',
      jenis
    );
  }

  params.set(
    'limit',
    String(limit)
  );

  params.set(
    'page',
    String(page)
  );

  return `/informasi-publik/produk-hukum?${params.toString()}`;
}

export default async function ProdukHukumPage({
  searchParams,
}: PageProps) {
  const params =
    await searchParams;

  const q =
    sanitizeSearch(
      params.q ?? ''
    );

  const tahun =
    String(
      params.tahun ?? ''
    ).trim();

  const jenis =
    String(
      params.jenis ?? ''
    ).trim();

  const page =
    parsePositiveInteger(
      params.page,
      1
    );

  const requestedLimit =
    parsePositiveInteger(
      params.limit,
      DEFAULT_LIMIT
    );

  const limit =
    ALLOWED_LIMITS.includes(
      requestedLimit
    )
      ? requestedLimit
      : DEFAULT_LIMIT;

  const from =
    (page - 1) * limit;

  const to =
    from + limit - 1;

  let produkQuery =
    supabaseAdmin
      .from('produk_hukum')
      .select(
        `
          id,
          judul,
          nomor,
          jenis,
          tahun,
          tanggal_penetapan,
          deskripsi,
          file_url,
          file_path,
          aktif,
          created_at,
          updated_at
        `,
        {
          count: 'exact',
        }
      )
      .eq('aktif', true);

  if (q) {
    produkQuery =
      produkQuery.ilike(
        'judul',
        `%${q}%`
      );
  }

  if (
    tahun &&
    /^\d{4}$/.test(tahun)
  ) {
    produkQuery =
      produkQuery.eq(
        'tahun',
        Number(tahun)
      );
  }

  if (jenis) {
    produkQuery =
      produkQuery.eq(
        'jenis',
        jenis
      );
  }

  produkQuery =
    produkQuery
      .order('tahun', {
        ascending: false,
      })
      .order('created_at', {
        ascending: false,
      })
      .range(from, to);

  const [
    produkResult,
    metadataResult,
    layananResult,
  ] = await Promise.all([
    produkQuery,

    supabaseAdmin
      .from('produk_hukum')
      .select(`
        tahun,
        jenis
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

  if (produkResult.error) {
    console.error(
      'Gagal mengambil produk hukum:',
      {
        message:
          produkResult.error.message,
        code:
          produkResult.error.code,
        details:
          produkResult.error.details,
        hint:
          produkResult.error.hint,
      }
    );
  }

  if (metadataResult.error) {
    console.error(
      'Gagal mengambil filter produk hukum:',
      metadataResult.error.message
    );
  }

  if (layananResult.error) {
    console.error(
      'Gagal mengambil layanan:',
      layananResult.error.message
    );
  }

  const daftarProdukHukum =
    (produkResult.data ??
      []) as ProdukHukum[];

  const totalData =
    produkResult.count ?? 0;

  const totalPages =
    Math.max(
      Math.ceil(
        totalData / limit
      ),
      1
    );

  const metadata =
    (metadataResult.data ??
      []) as ProdukHukumMetadata[];

  const daftarTahun = [
    ...new Set(
      metadata.map(
        (item) =>
          Number(item.tahun)
      )
    ),
  ].sort(
    (a, b) =>
      b - a
  );

  const daftarJenis = [
    ...new Set(
      metadata
        .map(
          (item) =>
            String(
              item.jenis
            ).trim()
        )
        .filter(Boolean)
    ),
  ].sort(
    (a, b) =>
      a.localeCompare(
        b,
        'id-ID'
      )
  );

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
          ),

        slug:
          String(
            item.slug ?? ''
          ),
      }))
      .filter(
        (item) =>
          item.id > 0 &&
          item.nama &&
          item.slug
      );

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-700">
            <Scale size={16} />
            Informasi Publik
          </div>

          <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
            Produk Hukum
          </h1>

          <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-500 md:text-base">
            Daftar peraturan, keputusan,
            dan dokumen hukum resmi
            Pemerintah Desa Keji.
          </p>
        </header>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <main className="min-w-0 space-y-6 lg:w-2/3">
            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
                  <FileSearch
                    size={22}
                  />
                </div>

                <div>
                  <h2 className="font-black text-slate-900">
                    Dokumen Hukum Desa
                  </h2>

                  <p className="mt-1 text-sm font-medium leading-relaxed text-slate-500">
                    Gunakan filter tahun,
                    jenis dokumen, atau
                    pencarian untuk menemukan
                    produk hukum yang dibutuhkan.
                  </p>
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 p-5 md:p-6">
                <div className="mb-5 flex items-center gap-3">
                  <Filter
                    size={20}
                    className="text-emerald-700"
                  />

                  <h2 className="text-lg font-black text-slate-900">
                    Filter Produk Hukum
                  </h2>
                </div>

                <form
                  method="get"
                  action="/informasi-publik/produk-hukum"
                  className="grid gap-4 md:grid-cols-2"
                >
                  <div>
                    <label
                      htmlFor="tahun"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      Tahun
                    </label>

                    <select
                      id="tahun"
                      name="tahun"
                      defaultValue={tahun}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                    >
                      <option value="">
                        Semua Tahun
                      </option>

                      {daftarTahun.map(
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
                  </div>

                  <div>
                    <label
                      htmlFor="jenis"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      Jenis Dokumen
                    </label>

                    <select
                      id="jenis"
                      name="jenis"
                      defaultValue={jenis}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                    >
                      <option value="">
                        Semua Jenis
                      </option>

                      {daftarJenis.map(
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
                  </div>

                  <div className="md:col-span-2">
                    <label
                      htmlFor="q"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      Pencarian
                    </label>

                    <div className="relative">
                      <Search
                        size={18}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="q"
                        name="q"
                        type="search"
                        defaultValue={q}
                        placeholder="Cari judul produk hukum..."
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm font-semibold text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                      />
                    </div>
                  </div>

                  <input
                    type="hidden"
                    name="limit"
                    value={limit}
                  />

                  <div className="flex flex-col gap-2 sm:flex-row md:col-span-2">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-emerald-800"
                    >
                      <Search size={17} />
                      Terapkan Filter
                    </button>

                    <Link
                      href="/informasi-publik/produk-hukum"
                      className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-600 transition hover:border-emerald-300 hover:text-emerald-700"
                    >
                      Reset Filter
                    </Link>
                  </div>
                </form>
              </div>

              <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between md:px-6">
                <form
                  method="get"
                  className="flex items-center gap-2 text-sm text-slate-500"
                >
                  <span>
                    Tampilkan
                  </span>

                  <select
                    name="limit"
                    defaultValue={String(
                      limit
                    )}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700"
                  >
                    {ALLOWED_LIMITS.map(
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

                  <span>entri</span>

                  {q && (
                    <input
                      type="hidden"
                      name="q"
                      value={q}
                    />
                  )}

                  {tahun && (
                    <input
                      type="hidden"
                      name="tahun"
                      value={tahun}
                    />
                  )}

                  {jenis && (
                    <input
                      type="hidden"
                      name="jenis"
                      value={jenis}
                    />
                  )}

                  <button
                    type="submit"
                    className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-600"
                  >
                    Terapkan
                  </button>
                </form>

                <p className="text-xs font-semibold text-slate-400">
                  Menampilkan{' '}
                  {totalData === 0
                    ? 0
                    : from + 1}
                  –
                  {Math.min(
                    from +
                      daftarProdukHukum.length,
                    totalData
                  )}{' '}
                  dari {totalData} dokumen
                </p>
              </div>

              {daftarProdukHukum.length ===
              0 ? (
                <div className="px-6 py-14 text-center">
                  <FileText
                    size={46}
                    className="mx-auto text-slate-300"
                  />

                  <h3 className="mt-4 font-black text-slate-700">
                    Dokumen tidak ditemukan
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Belum ada produk hukum
                    yang sesuai dengan filter.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[850px] border-collapse text-left">
                    <thead>
                      <tr className="bg-slate-700 text-white">
                        <th className="w-[70px] px-4 py-4 text-center text-xs font-extrabold uppercase">
                          No
                        </th>

                        <th className="px-5 py-4 text-xs font-extrabold uppercase">
                          Judul Produk Hukum
                        </th>

                        <th className="w-[180px] px-4 py-4 text-xs font-extrabold uppercase">
                          Jenis
                        </th>

                        <th className="w-[90px] px-4 py-4 text-center text-xs font-extrabold uppercase">
                          Tahun
                        </th>

                        <th className="w-[150px] px-4 py-4 text-center text-xs font-extrabold uppercase">
                          Aksi
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-200">
                      {daftarProdukHukum.map(
                        (
                          item,
                          index
                        ) => (
                          <tr
                            key={item.id}
                            className="transition odd:bg-white even:bg-slate-50 hover:bg-emerald-50/60"
                          >
                            <td className="px-4 py-4 text-center text-sm font-semibold text-slate-600">
                              {from +
                                index +
                                1}
                            </td>

                            <td className="px-5 py-4">
                              <p className="font-bold leading-relaxed text-slate-800">
                                {item.judul}
                              </p>

                              <p className="mt-1 text-xs text-slate-400">
                                {item.nomor ??
                                  'Nomor tidak dicantumkan'}
                              </p>

                              {item.tanggal_penetapan && (
                                <p className="mt-1 text-xs text-slate-400">
                                  Ditetapkan:{' '}
                                  {formatTanggal(
                                    item.tanggal_penetapan
                                  )}
                                </p>
                              )}
                            </td>

                            <td className="px-4 py-4 text-sm font-semibold text-slate-600">
                              {item.jenis}
                            </td>

                            <td className="px-4 py-4 text-center text-sm font-bold text-slate-700">
                              {item.tahun}
                            </td>

                            <td className="px-4 py-4">
                              <div className="flex justify-center gap-2">
                                <a
                                  href={item.file_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 rounded-xl bg-cyan-700 px-3 py-2.5 text-xs font-extrabold text-white transition hover:bg-cyan-800"
                                >
                                  <Eye
                                    size={15}
                                  />
                                  Lihat
                                </a>

                                <a
                                  href={item.file_url}
                                  download
                                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-200 bg-white text-emerald-700 transition hover:bg-emerald-50"
                                  title="Unduh dokumen"
                                >
                                  <Download
                                    size={16}
                                  />
                                </a>
                              </div>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {totalPages > 1 && (
                <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between md:px-6">
                  <p className="text-xs font-semibold text-slate-400">
                    Halaman {page} dari{' '}
                    {totalPages}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {page > 1 && (
                      <Link
                        href={buildPageUrl({
                          q,
                          tahun,
                          jenis,
                          limit,
                          page:
                            page - 1,
                        })}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 transition hover:border-emerald-300 hover:text-emerald-700"
                      >
                        Sebelumnya
                      </Link>
                    )}

                    {Array.from(
                      {
                        length:
                          totalPages,
                      },
                      (_, index) =>
                        index + 1
                    )
                      .filter(
                        (item) =>
                          item === 1 ||
                          item ===
                            totalPages ||
                          Math.abs(
                            item -
                              page
                          ) <= 1
                      )
                      .map(
                        (item) => (
                          <Link
                            key={item}
                            href={buildPageUrl({
                              q,
                              tahun,
                              jenis,
                              limit,
                              page:
                                item,
                            })}
                            className={`flex h-9 min-w-9 items-center justify-center rounded-xl px-3 text-xs font-extrabold transition ${
                              item === page
                                ? 'bg-emerald-700 text-white'
                                : 'border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-700'
                            }`}
                          >
                            {item}
                          </Link>
                        )
                      )}

                    {page <
                      totalPages && (
                      <Link
                        href={buildPageUrl({
                          q,
                          tahun,
                          jenis,
                          limit,
                          page:
                            page + 1,
                        })}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 transition hover:border-emerald-300 hover:text-emerald-700"
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