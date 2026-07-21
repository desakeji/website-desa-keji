// app/(public)/informasi-publik/informasi-umum/page.tsx

import Link from 'next/link';

import {
  CalendarDays,
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
  InformasiUmum,
} from '@/types/informasi-umum';

import type {
  PilihanLayanan,
} from '@/types/layanan';

export const dynamic =
  'force-dynamic';

export const revalidate = 0;

interface PageProps {
  searchParams: Promise<{
    q?: string;
    tahun?: string;
    kategori?: string;
    page?: string;
    limit?: string;
  }>;
}

interface InformasiMetadata {
  tahun: number;
  kategori: string;
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
    value.length === 10
      ? new Date(
          `${value}T00:00:00+07:00`
        )
      : new Date(value);

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
      month: 'short',
      year: 'numeric',
      timeZone:
        'Asia/Jakarta',
    }
  ).format(date);
}

function buildPageUrl({
  q,
  tahun,
  kategori,
  limit,
  page,
}: {
  q: string;
  tahun: string;
  kategori: string;
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

  if (kategori) {
    params.set(
      'kategori',
      kategori
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

  return `/informasi-publik/informasi-umum?${params.toString()}`;
}

export default async function InformasiUmumPage({
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

  const kategori =
    String(
      params.kategori ?? ''
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

  let informasiQuery =
    supabaseAdmin
      .from('informasi_umum')
      .select(
        `
          id,
          judul,
          kategori,
          tahun,
          tanggal_dokumen,
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
    informasiQuery =
      informasiQuery.or(
        `judul.ilike.%${q}%,deskripsi.ilike.%${q}%`
      );
  }

  if (
    tahun &&
    /^\d{4}$/.test(tahun)
  ) {
    informasiQuery =
      informasiQuery.eq(
        'tahun',
        Number(tahun)
      );
  }

  if (kategori) {
    informasiQuery =
      informasiQuery.eq(
        'kategori',
        kategori
      );
  }

  informasiQuery =
    informasiQuery
      .order('tahun', {
        ascending: false,
      })
      .order('created_at', {
        ascending: false,
      })
      .range(from, to);

  const [
    informasiResult,
    metadataResult,
    layananResult,
  ] = await Promise.all([
    informasiQuery,

    supabaseAdmin
      .from('informasi_umum')
      .select(`
        tahun,
        kategori
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

  if (
    informasiResult.error
  ) {
    console.error(
      'Gagal mengambil informasi umum:',
      {
        message:
          informasiResult.error.message,
        code:
          informasiResult.error.code,
        details:
          informasiResult.error.details,
        hint:
          informasiResult.error.hint,
      }
    );
  }

  if (
    metadataResult.error
  ) {
    console.error(
      'Gagal mengambil metadata informasi:',
      {
        message:
          metadataResult.error.message,
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
          layananResult.error.message,
      }
    );
  }

  const daftarInformasi =
    (informasiResult.data ??
      []) as InformasiUmum[];

  const totalData =
    informasiResult.count ?? 0;

  const totalPages =
    Math.max(
      Math.ceil(
        totalData / limit
      ),
      1
    );

  const metadata =
    (metadataResult.data ??
      []) as InformasiMetadata[];

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

  const daftarKategori = [
    ...new Set(
      metadata
        .map(
          (item) =>
            String(
              item.kategori
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

  const pageNumbers =
    Array.from(
      new Set([
        1,
        page - 1,
        page,
        page + 1,
        totalPages,
      ])
    )
      .filter(
        (item) =>
          item >= 1 &&
          item <= totalPages
      )
      .sort(
        (a, b) =>
          a - b
      );

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-700">
            <Info size={16} />
            Informasi Publik
          </div>

          <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
            Informasi Umum
          </h1>

          <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-500 md:text-base">
            Informasi resmi Pemerintah
            Desa Keji yang dapat diakses
            oleh masyarakat secara
            terbuka dan transparan.
          </p>
        </header>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <main className="min-w-0 space-y-6 lg:w-2/3">
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-700 p-6 text-white shadow-xl md:p-8">
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border-[45px] border-white/[0.06]" />

              <div className="relative flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
                  <FileSearch
                    size={27}
                  />
                </div>

                <div>
                  <h2 className="text-xl font-black md:text-2xl">
                    Keterbukaan Informasi Desa
                  </h2>

                  <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-emerald-50/85">
                    Gunakan pencarian dan
                    filter untuk menemukan
                    dokumen informasi publik
                    berdasarkan judul,
                    kategori, maupun tahun
                    penerbitan.
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
                    Filter Informasi
                  </h2>
                </div>

                <form
                  method="get"
                  action="/informasi-publik/informasi-umum"
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
                      htmlFor="kategori"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      Kategori
                    </label>

                    <select
                      id="kategori"
                      name="kategori"
                      defaultValue={kategori}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                    >
                      <option value="">
                        Semua Kategori
                      </option>

                      {daftarKategori.map(
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
                        placeholder="Cari judul atau isi informasi..."
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
                      href="/informasi-publik/informasi-umum"
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

                  {kategori && (
                    <input
                      type="hidden"
                      name="kategori"
                      value={kategori}
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
                      daftarInformasi.length,
                    totalData
                  )}{' '}
                  dari {totalData} informasi
                </p>
              </div>

              {daftarInformasi.length === 0 ? (
                <div className="px-6 py-14 text-center">
                  <FileText
                    size={46}
                    className="mx-auto text-slate-300"
                  />

                  <h3 className="mt-4 font-black text-slate-700">
                    Informasi tidak ditemukan
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Belum ada informasi yang
                    sesuai dengan filter.
                  </p>
                </div>
              ) : (
                <>
                  <div className="hidden overflow-x-auto md:block">
                    <table className="w-full min-w-[850px] border-collapse text-left">
                      <thead>
                        <tr className="bg-slate-700 text-white">
                          <th className="w-[70px] px-4 py-4 text-center text-xs font-extrabold uppercase">
                            No
                          </th>

                          <th className="px-5 py-4 text-xs font-extrabold uppercase">
                            Judul Informasi
                          </th>

                          <th className="w-[90px] px-4 py-4 text-center text-xs font-extrabold uppercase">
                            Tahun
                          </th>

                          <th className="w-[180px] px-4 py-4 text-xs font-extrabold uppercase">
                            Kategori
                          </th>

                          <th className="w-[130px] px-4 py-4 text-center text-xs font-extrabold uppercase">
                            Tanggal Upload
                          </th>

                          <th className="w-[110px] px-4 py-4 text-center text-xs font-extrabold uppercase">
                            Aksi
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-slate-200">
                        {daftarInformasi.map(
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

                                {item.deskripsi && (
                                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-400">
                                    {item.deskripsi}
                                  </p>
                                )}

                                {item.tanggal_dokumen && (
                                  <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                                    <CalendarDays
                                      size={13}
                                    />

                                    Dokumen:{' '}
                                    {formatTanggal(
                                      item.tanggal_dokumen
                                    )}
                                  </p>
                                )}
                              </td>

                              <td className="px-4 py-4 text-center text-sm font-bold text-slate-700">
                                {item.tahun}
                              </td>

                              <td className="px-4 py-4">
                                <span className="inline-flex rounded-full bg-cyan-100 px-3 py-1.5 text-[10px] font-extrabold text-cyan-700">
                                  {item.kategori}
                                </span>
                              </td>

                              <td className="px-4 py-4 text-center text-xs font-semibold text-slate-500">
                                {formatTanggal(
                                  item.created_at
                                )}
                              </td>

                              <td className="px-4 py-4">
                                <a
                                  href={item.file_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="mx-auto inline-flex items-center gap-2 rounded-xl bg-cyan-700 px-3 py-2.5 text-xs font-extrabold text-white transition hover:bg-cyan-800"
                                >
                                  <Eye
                                    size={15}
                                  />
                                  Lihat
                                </a>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="grid gap-4 p-4 md:hidden">
                    {daftarInformasi.map(
                      (item) => (
                        <article
                          key={item.id}
                          className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <span className="rounded-full bg-cyan-100 px-3 py-1 text-[10px] font-extrabold text-cyan-700">
                              {item.kategori}
                            </span>

                            <span className="text-xs font-black text-slate-500">
                              {item.tahun}
                            </span>
                          </div>

                          <h2 className="mt-3 font-black leading-relaxed text-slate-800">
                            {item.judul}
                          </h2>

                          {item.deskripsi && (
                            <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-slate-500">
                              {item.deskripsi}
                            </p>
                          )}

                          <p className="mt-3 text-xs font-semibold text-slate-400">
                            Diunggah:{' '}
                            {formatTanggal(
                              item.created_at
                            )}
                          </p>

                          <a
                            href={item.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-700 px-4 py-3 text-xs font-extrabold text-white"
                          >
                            <Eye size={15} />
                            Lihat Dokumen
                          </a>
                        </article>
                      )
                    )}
                  </div>
                </>
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
                          kategori,
                          limit,
                          page:
                            page - 1,
                        })}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 transition hover:border-emerald-300 hover:text-emerald-700"
                      >
                        Sebelumnya
                      </Link>
                    )}

                    {pageNumbers.map(
                      (item) => (
                        <Link
                          key={item}
                          href={buildPageUrl({
                            q,
                            tahun,
                            kategori,
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
                          kategori,
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