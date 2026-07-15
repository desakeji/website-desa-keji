// app/(public)/data-desa/populasi-wilayah/page.tsx

import {
  Fragment,
} from 'react';

import {
  BarChart3,
  Database,
  Info,
  MapPinned,
  Mars,
  Users,
  Venus,
} from 'lucide-react';

import SidebarLayanan from '@/components/SidebarLayanan';

import {
  supabaseAdmin,
} from '@/lib/supabase-admin';

import type {
  PilihanLayanan,
} from '@/types/layanan';

export const dynamic =
  'force-dynamic';

export const revalidate = 0;

interface WargaWilayahRow {
  dusun: string | null;
  rw: string | null;
  rt: string | null;

  no_kk_hash:
    | string
    | null;

  jenis_kelamin:
    | 'L'
    | 'P'
    | null;
}

interface LayananRow {
  id: number;
  nama: string;
  slug: string;
}

interface ProfilDesaRow {
  tahun_data:
    | number
    | null;
}

interface StatistikWilayah {
  jumlahKk: number;
  jumlahPenduduk: number;
  lakiLaki: number;
  perempuan: number;
}

const URUTAN_DUSUN = [
  'Dusun Keji',
  'Dusun Suruhan',
  'Dusun Sitoyo',
];

async function getAllWargaWilayah() {
  const result:
    WargaWilayahRow[] = [];

  const pageSize = 1000;
  let from = 0;

  while (true) {
    const {
      data,
      error,
    } = await supabaseAdmin
      .from('warga')
      .select(`
        dusun,
        rw,
        rt,
        no_kk_hash,
        jenis_kelamin
      `)
      .eq('aktif', true)
      .range(
        from,
        from + pageSize - 1
      );

    if (error) {
      console.error(
        'Gagal mengambil data populasi wilayah:',
        {
          message:
            error.message,
          code:
            error.code,
          details:
            error.details,
          hint:
            error.hint,
        }
      );

      return result;
    }

    const rows =
      (data ??
        []) as WargaWilayahRow[];

    result.push(...rows);

    if (
      rows.length <
      pageSize
    ) {
      break;
    }

    from += pageSize;
  }

  return result;
}

function hitungStatistik(
  rows: WargaWilayahRow[]
): StatistikWilayah {
  const daftarKk =
    new Set<string>();

  let lakiLaki = 0;
  let perempuan = 0;

  rows.forEach((row) => {
    if (row.no_kk_hash) {
      daftarKk.add(
        row.no_kk_hash
      );
    }

    if (
      row.jenis_kelamin ===
      'L'
    ) {
      lakiLaki += 1;
    }

    if (
      row.jenis_kelamin ===
      'P'
    ) {
      perempuan += 1;
    }
  });

  return {
    jumlahKk:
      daftarKk.size,

    jumlahPenduduk:
      rows.length,

    lakiLaki,
    perempuan,
  };
}

function formatAngka(
  value: number
) {
  return new Intl.NumberFormat(
    'id-ID'
  ).format(value);
}

function formatKodeWilayah(
  value: string | null
) {
  if (!value) {
    return '-';
  }

  const number =
    Number(value);

  if (
    Number.isNaN(number)
  ) {
    return value;
  }

  return String(number);
}

function urutkanKodeWilayah(
  first: string,
  second: string
) {
  return first.localeCompare(
    second,
    'id-ID',
    {
      numeric: true,
    }
  );
}

export default async function PopulasiWilayahPage() {
  const [
    wargaRows,
    layananResult,
    profilResult,
  ] = await Promise.all([
    getAllWargaWilayah(),

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

    supabaseAdmin
      .from('profil_desa')
      .select('tahun_data')
      .eq(
        'profil_key',
        'utama'
      )
      .maybeSingle(),
  ]);

  if (
    layananResult.error
  ) {
    console.error(
      'Gagal mengambil layanan:',
      layananResult.error.message
    );
  }

  if (
    profilResult.error
  ) {
    console.error(
      'Gagal mengambil tahun data:',
      profilResult.error.message
    );
  }

  const daftarLayanan:
    PilihanLayanan[] = (
      (layananResult.data ??
        []) as LayananRow[]
    ).map((layanan) => ({
      id:
        layanan.id,

      nama:
        layanan.nama,

      slug:
        layanan.slug,
    }));

  const tahunData =
    Number(
      (
        profilResult.data as
          | ProfilDesaRow
          | null
      )?.tahun_data ??
        new Date().getFullYear()
    );

  const statistikDesa =
    hitungStatistik(
      wargaRows
    );

  const kelompokDusun =
    URUTAN_DUSUN.map(
      (dusun) => ({
        dusun,

        rows:
          wargaRows.filter(
            (row) =>
              row.dusun ===
              dusun
          ),
      })
    ).filter(
      (group) =>
        group.rows.length > 0
    );

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-700">
            <MapPinned
              size={16}
            />

            Data Desa
          </div>

          <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
            Populasi Per Wilayah
          </h1>

          <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-500 md:text-base">
            Informasi jumlah
            keluarga dan penduduk
            berdasarkan dusun, RW,
            dan RT di Desa Keji.
          </p>
        </header>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* Konten Utama */}
          <main className="min-w-0 space-y-6 lg:w-2/3">
            {/* Ringkasan */}
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatistikCard
                label="Kartu Keluarga"
                value={
                  statistikDesa.jumlahKk
                }
                icon={Database}
              />

              <StatistikCard
                label="Total Penduduk"
                value={
                  statistikDesa.jumlahPenduduk
                }
                icon={Users}
              />

              <StatistikCard
                label="Laki-laki"
                value={
                  statistikDesa.lakiLaki
                }
                icon={Mars}
              />

              <StatistikCard
                label="Perempuan"
                value={
                  statistikDesa.perempuan
                }
                icon={Venus}
              />
            </section>

            {/* Informasi */}
            <section className="rounded-2xl border border-cyan-200 bg-cyan-50 p-5">
              <div className="flex items-start gap-3">
                <Info
                  size={21}
                  className="mt-0.5 shrink-0 text-cyan-700"
                />

                <div>
                  <h2 className="font-extrabold text-cyan-900">
                    Demografi Berdasarkan Wilayah
                  </h2>

                  <p className="mt-1 text-sm font-medium leading-relaxed text-cyan-800">
                    Jumlah dan persentase
                    penduduk berdasarkan
                    wilayah RT di Desa Keji,
                    tahun {tahunData}.
                    Data dihitung otomatis
                    dari database warga aktif.
                  </p>
                </div>
              </div>
            </section>

            {/* Tabel */}
            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-emerald-100 p-2.5 text-emerald-700">
                    <BarChart3
                      size={21}
                    />
                  </div>

                  <div>
                    <h2 className="text-lg font-black text-slate-900">
                      Demografi Berdasarkan Wilayah
                    </h2>

                    <p className="mt-1 text-xs font-medium text-slate-500">
                      Rekap dusun, RW,
                      dan RT.
                    </p>
                  </div>
                </div>
              </div>

              {wargaRows.length ===
              0 ? (
                <div className="px-6 py-14 text-center">
                  <Users
                    size={42}
                    className="mx-auto text-slate-300"
                  />

                  <h3 className="mt-4 font-extrabold text-slate-700">
                    Data belum tersedia
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Admin belum
                    menambahkan data
                    warga yang lengkap.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px] border-collapse text-left">
                    <thead>
                      <tr className="bg-slate-700 text-white">
                        <th className="w-[70px] px-4 py-4 text-center text-xs font-extrabold uppercase tracking-wider">
                          No
                        </th>

                        <th className="px-5 py-4 text-xs font-extrabold uppercase tracking-wider">
                          Wilayah
                        </th>

                        <th className="w-[90px] px-4 py-4 text-center text-xs font-extrabold uppercase tracking-wider">
                          KK
                        </th>

                        <th className="w-[90px] px-4 py-4 text-center text-xs font-extrabold uppercase tracking-wider">
                          L+P
                        </th>

                        <th className="w-[90px] px-4 py-4 text-center text-xs font-extrabold uppercase tracking-wider">
                          L
                        </th>

                        <th className="w-[90px] px-4 py-4 text-center text-xs font-extrabold uppercase tracking-wider">
                          P
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-200">
                      {kelompokDusun.map(
                        (
                          kelompok,
                          dusunIndex
                        ) => {
                          const statistikDusun =
                            hitungStatistik(
                              kelompok.rows
                            );

                          const daftarRw = [
                            ...new Set(
                              kelompok.rows
                                .map(
                                  (row) =>
                                    row.rw
                                )
                                .filter(
                                  (
                                    rw
                                  ): rw is string =>
                                    Boolean(
                                      rw
                                    )
                                )
                            ),
                          ].sort(
                            urutkanKodeWilayah
                          );

                          return (
                            <Fragment
                              key={
                                kelompok.dusun
                              }
                            >
                              {/* Dusun */}
                              <tr className="bg-emerald-100/80">
                                <td className="px-4 py-4 text-center text-sm font-black text-emerald-900">
                                  {
                                    dusunIndex +
                                    1
                                  }
                                </td>

                                <td className="px-5 py-4 text-sm font-black uppercase text-emerald-950">
                                  {
                                    kelompok.dusun
                                  }
                                </td>

                                <DataCell
                                  value={
                                    statistikDusun.jumlahKk
                                  }
                                  bold
                                />

                                <DataCell
                                  value={
                                    statistikDusun.jumlahPenduduk
                                  }
                                  bold
                                />

                                <DataCell
                                  value={
                                    statistikDusun.lakiLaki
                                  }
                                  bold
                                />

                                <DataCell
                                  value={
                                    statistikDusun.perempuan
                                  }
                                  bold
                                />
                              </tr>

                              {daftarRw.map(
                                (
                                  rw,
                                  rwIndex
                                ) => {
                                  const rowsRw =
                                    kelompok.rows.filter(
                                      (
                                        row
                                      ) =>
                                        row.rw ===
                                        rw
                                    );

                                  const statistikRw =
                                    hitungStatistik(
                                      rowsRw
                                    );

                                  const daftarRt =
                                    [
                                      ...new Set(
                                        rowsRw
                                          .map(
                                            (
                                              row
                                            ) =>
                                              row.rt
                                          )
                                          .filter(
                                            (
                                              rt
                                            ): rt is string =>
                                              Boolean(
                                                rt
                                              )
                                          )
                                      ),
                                    ].sort(
                                      urutkanKodeWilayah
                                    );

                                  return (
                                    <Fragment
                                      key={`${kelompok.dusun}-${rw}`}
                                    >
                                      {/* RW */}
                                      <tr className="bg-slate-100">
                                        <td className="px-4 py-3.5 text-center text-sm font-bold text-slate-500">
                                          {`${dusunIndex + 1}.${rwIndex + 1}`}
                                        </td>

                                        <td className="px-5 py-3.5 pl-10 text-sm font-extrabold text-slate-700">
                                          RW{' '}
                                          {formatKodeWilayah(
                                            rw
                                          )}
                                        </td>

                                        <DataCell
                                          value={
                                            statistikRw.jumlahKk
                                          }
                                        />

                                        <DataCell
                                          value={
                                            statistikRw.jumlahPenduduk
                                          }
                                        />

                                        <DataCell
                                          value={
                                            statistikRw.lakiLaki
                                          }
                                        />

                                        <DataCell
                                          value={
                                            statistikRw.perempuan
                                          }
                                        />
                                      </tr>

                                      {daftarRt.map(
                                        (
                                          rt,
                                          rtIndex
                                        ) => {
                                          const rowsRt =
                                            rowsRw.filter(
                                              (
                                                row
                                              ) =>
                                                row.rt ===
                                                rt
                                            );

                                          const statistikRt =
                                            hitungStatistik(
                                              rowsRt
                                            );

                                          return (
                                            <tr
                                              key={`${kelompok.dusun}-${rw}-${rt}`}
                                              className="bg-white transition hover:bg-emerald-50/50"
                                            >
                                              <td className="px-4 py-3.5 text-center text-xs font-semibold text-slate-400">
                                                {`${dusunIndex + 1}.${rwIndex + 1}.${rtIndex + 1}`}
                                              </td>

                                              <td className="px-5 py-3.5 pl-16 text-sm font-semibold text-slate-600">
                                                RT{' '}
                                                {formatKodeWilayah(
                                                  rt
                                                )}
                                              </td>

                                              <DataCell
                                                value={
                                                  statistikRt.jumlahKk
                                                }
                                              />

                                              <DataCell
                                                value={
                                                  statistikRt.jumlahPenduduk
                                                }
                                              />

                                              <DataCell
                                                value={
                                                  statistikRt.lakiLaki
                                                }
                                              />

                                              <DataCell
                                                value={
                                                  statistikRt.perempuan
                                                }
                                              />
                                            </tr>
                                          );
                                        }
                                      )}
                                    </Fragment>
                                  );
                                }
                              )}
                            </Fragment>
                          );
                        }
                      )}
                    </tbody>

                    <tfoot>
                      <tr className="bg-slate-800 text-white">
                        <td
                          colSpan={2}
                          className="px-5 py-4 text-sm font-black uppercase"
                        >
                          Total Desa Keji
                        </td>

                        <DataCell
                          value={
                            statistikDesa.jumlahKk
                          }
                          footer
                        />

                        <DataCell
                          value={
                            statistikDesa.jumlahPenduduk
                          }
                          footer
                        />

                        <DataCell
                          value={
                            statistikDesa.lakiLaki
                          }
                          footer
                        />

                        <DataCell
                          value={
                            statistikDesa.perempuan
                          }
                          footer
                        />
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
            </section>
          </main>

          {/* Sidebar Kanan */}
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

function StatistikCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: typeof Users;
}) {
  return (
    <article className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
            {label}
          </p>

          <p className="mt-3 text-3xl font-black text-slate-900">
            {formatAngka(value)}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
          <Icon size={21} />
        </div>
      </div>
    </article>
  );
}

function DataCell({
  value,
  bold = false,
  footer = false,
}: {
  value: number;
  bold?: boolean;
  footer?: boolean;
}) {
  return (
    <td
      className={`px-4 py-3.5 text-center text-sm ${
        footer
          ? 'font-black text-white'
          : bold
            ? 'font-black text-emerald-950'
            : 'font-semibold text-slate-600'
      }`}
    >
      {formatAngka(value)}
    </td>
  );
}