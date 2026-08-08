// app/admin/pertanahan/page.tsx

import Link from 'next/link';

import {
  BarChart3,
  CheckCircle2,
  Database,
  ExternalLink,
  Map,
  MapPin,
  Pencil,
  Plus,
  Save,
  Trash2,
} from 'lucide-react';

import {
  hapusPertanahanAction,
  simpanPertanahanSettingsAction,
  tambahPertanahanAction,
  ubahPertanahanAction,
} from '@/app/admin/pertanahan/actions';

import {
  supabaseAdmin,
} from '@/lib/supabase-admin';

import type {
  PertanahanData,
  PertanahanSettings,
} from '@/types/pertanahan';

export const dynamic =
  'force-dynamic';

export const revalidate =
  0;

interface PageProps {
  searchParams:
    Promise<{
      success?: string;

      error?: string;
    }>;
}

/* =========================================================
   FALLBACK
========================================================= */

const fallbackSettings:
  PertanahanSettings = {
  setting_key:
    'utama',

  judul:
    'Data Pertanahan',

  deskripsi:
    'Informasi penggunaan lahan, administrasi pertanahan, dan pemanfaatan wilayah Desa Keji.',

  tahun_data:
    2026,

  sumber_data:
    'Pemerintah Desa Keji',

  catatan:
    'Data ditampilkan dalam bentuk agregat dan tidak menampilkan identitas pribadi pemilik tanah.',

  peta_url:
    null,

  aktif:
    true,

  updated_at:
    '',
};

/* =========================================================
   PAGE
========================================================= */

export default async function AdminPertanahanPage({
  searchParams,
}: PageProps) {
  const params =
    await searchParams;

  const [
    settingsResult,
    dataResult,
  ] =
    await Promise.all([
      supabaseAdmin
        .from(
          'pertanahan_settings'
        )
        .select(`
          setting_key,
          judul,
          deskripsi,
          tahun_data,
          sumber_data,
          catatan,
          peta_url,
          aktif,
          created_at,
          updated_at
        `)
        .eq(
          'setting_key',
          'utama'
        )
        .maybeSingle(),

      supabaseAdmin
        .from(
          'pertanahan_data'
        )
        .select(`
          id,
          nama,
          kategori,
          luas_hektar,
          jumlah_bidang,
          keterangan,
          warna,
          aktif,
          urutan,
          created_at,
          updated_at
        `)
        .order(
          'urutan',
          {
            ascending:
              true,
          }
        )
        .order(
          'created_at',
          {
            ascending:
              true,
          }
        ),
    ]);

  if (
    settingsResult.error
  ) {
    console.error(
      'Gagal mengambil settings pertanahan:',
      settingsResult.error
    );
  }

  if (
    dataResult.error
  ) {
    console.error(
      'Gagal mengambil data pertanahan:',
      dataResult.error
    );
  }

  const settings =
    {
      ...fallbackSettings,

      ...(settingsResult.data ??
        {}),
    } as PertanahanSettings;

  const data =
    (
      dataResult.data ??
      []
    ).map(
      (
        item
      ) => ({
        ...item,

        luas_hektar:
          Number(
            item.luas_hektar ??
              0
          ),

        jumlah_bidang:
          item.jumlah_bidang ===
          null
            ? null
            : Number(
                item.jumlah_bidang
              ),
      })
    ) as PertanahanData[];

  const dataAktif =
    data.filter(
      (
        item
      ) =>
        item.aktif
    );

  const totalLuas =
    dataAktif.reduce(
      (
        total,
        item
      ) =>
        total +
        item.luas_hektar,
      0
    );

  const totalBidang =
    dataAktif.reduce(
      (
        total,
        item
      ) =>
        total +
        (
          item.jumlah_bidang ??
          0
        ),
      0
    );

  return (
    <div className="mx-auto max-w-[1500px] space-y-7">
      {/* ===================================================
          HEADER
      =================================================== */}

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-800 to-teal-700 px-6 py-8 text-white shadow-xl">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,.55) 1px, transparent 1px)',

            backgroundSize:
              '25px 25px',
          }}
        />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
              <Map
                size={27}
              />
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.17em] text-emerald-200">
                Data Desa
              </p>

              <h1 className="mt-2 text-2xl font-black sm:text-3xl">
                Data Pertanahan
              </h1>

              <p className="mt-2 max-w-3xl text-sm font-medium leading-7 text-emerald-50/80">
                Kelola informasi
                penggunaan lahan,
                luas wilayah, jumlah
                bidang, sumber data,
                dan informasi
                pertanahan Desa Keji.
              </p>
            </div>
          </div>

          <Link
            href="/data-desa/pertanahan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 text-sm font-extrabold text-white transition hover:bg-white/15"
          >
            Lihat Halaman Publik

            <ExternalLink
              size={16}
            />
          </Link>
        </div>
      </section>

      {/* ===================================================
          MESSAGE
      =================================================== */}

      {params.success && (
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
          <CheckCircle2
            size={19}
            className="mt-0.5 shrink-0"
          />

          <p className="text-sm font-semibold">
            {params.success}
          </p>
        </div>
      )}

      {params.error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
          {params.error}
        </div>
      )}

      {/* ===================================================
          STATS
      =================================================== */}

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Data Pertanahan"
          value={String(
            data.length
          )}
        />

        <StatCard
          label="Data Aktif"
          value={String(
            dataAktif.length
          )}
        />

        <StatCard
          label="Total Luas"
          value={`${formatNumber(
            totalLuas
          )} ha`}
        />

        <StatCard
          label="Jumlah Bidang"
          value={totalBidang.toLocaleString(
            'id-ID'
          )}
        />
      </section>

      {/* ===================================================
          SETTINGS
      =================================================== */}

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-white p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-700 text-white">
              <Database
                size={22}
              />
            </div>

            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-emerald-700">
                Informasi Umum
              </p>

              <h2 className="mt-1 text-xl font-black text-slate-900">
                Pengaturan Data
                Pertanahan
              </h2>
            </div>
          </div>
        </div>

        <form
          action={
            simpanPertanahanSettingsAction
          }
          className="grid gap-5 p-6 md:grid-cols-2"
        >
          <Input
            label="Judul"
            name="judul"
            value={
              settings.judul
            }
          />

          <Input
            label="Tahun Data"
            name="tahun_data"
            type="number"
            value={
              settings.tahun_data
                ? String(
                    settings.tahun_data
                  )
                : ''
            }
            required={
              false
            }
          />

          <div className="md:col-span-2">
            <Textarea
              label="Deskripsi"
              name="deskripsi"
              value={
                settings.deskripsi
              }
            />
          </div>

          <Input
            label="Sumber Data"
            name="sumber_data"
            value={
              settings.sumber_data ??
              ''
            }
            required={
              false
            }
          />

          <Input
            label="URL Peta"
            name="peta_url"
            value={
              settings.peta_url ??
              ''
            }
            required={
              false
            }
            placeholder="https://..."
          />

          <div className="md:col-span-2">
            <Textarea
              label="Catatan"
              name="catatan"
              value={
                settings.catatan ??
                ''
              }
              required={
                false
              }
            />
          </div>

          <div className="md:col-span-2">
            <ActiveField
              defaultChecked={
                settings.aktif
              }
            />
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-emerald-700 px-6 text-sm font-extrabold text-white transition hover:bg-emerald-800"
            >
              <Save
                size={16}
              />

              Simpan Pengaturan
            </button>
          </div>
        </form>
      </section>

      {/* ===================================================
          TAMBAH
      =================================================== */}

      <section className="overflow-hidden rounded-3xl border border-emerald-200 bg-emerald-50 shadow-sm">
        <details>
          <summary className="flex cursor-pointer list-none items-center gap-3 p-6 text-sm font-extrabold text-emerald-800">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-700 text-white">
              <Plus
                size={18}
              />
            </div>

            Tambah Data Pertanahan
          </summary>

          <form
            action={
              tambahPertanahanAction
            }
            className="grid gap-5 border-t border-emerald-100 bg-white p-6 md:grid-cols-2"
          >
            <PertanahanFields />

            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-emerald-700 px-6 text-sm font-extrabold text-white"
              >
                <Plus
                  size={16}
                />

                Tambah Data
              </button>
            </div>
          </form>
        </details>
      </section>

      {/* ===================================================
          LIST
      =================================================== */}

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-6">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-emerald-700">
            Data Agregat
          </p>

          <h2 className="mt-1 text-xl font-black text-slate-900">
            Daftar Data Pertanahan
          </h2>
        </div>

        {data.length ===
        0 ? (
          <div className="px-6 py-16 text-center">
            <MapPin
              size={42}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-4 font-black text-slate-700">
              Belum ada data
              pertanahan
            </h3>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {data.map(
              (
                item
              ) => (
                <article
                  key={
                    item.id
                  }
                  className="p-6"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className="h-4 w-4 rounded-full"
                          style={{
                            backgroundColor:
                              item.warna,
                          }}
                        />

                        <h3 className="text-lg font-black text-slate-900">
                          {
                            item.nama
                          }
                        </h3>

                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-[9px] font-extrabold uppercase text-emerald-700">
                          {
                            item.kategori
                          }
                        </span>

                        {!item.aktif && (
                          <span className="rounded-full bg-slate-200 px-3 py-1 text-[9px] font-extrabold uppercase text-slate-500">
                            Nonaktif
                          </span>
                        )}
                      </div>

                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <MiniStat
                          label="Luas"
                          value={`${formatNumber(
                            item.luas_hektar
                          )} ha`}
                        />

                        <MiniStat
                          label="Jumlah Bidang"
                          value={
                            item.jumlah_bidang ===
                            null
                              ? '-'
                              : item.jumlah_bidang.toLocaleString(
                                  'id-ID'
                                )
                          }
                        />
                      </div>

                      {item.keterangan && (
                        <p className="mt-4 text-sm font-medium leading-7 text-slate-500">
                          {
                            item.keterangan
                          }
                        </p>
                      )}

                      <details className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                        <summary className="flex cursor-pointer list-none items-center gap-2 p-4 text-xs font-extrabold text-emerald-700">
                          <Pencil
                            size={15}
                          />

                          Edit Data
                        </summary>

                        <form
                          action={ubahPertanahanAction.bind(
                            null,
                            item.id
                          )}
                          className="grid gap-5 border-t border-slate-200 bg-white p-5 md:grid-cols-2"
                        >
                          <PertanahanFields
                            item={
                              item
                            }
                          />

                          <div className="md:col-span-2 flex justify-end">
                            <button
                              type="submit"
                              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-emerald-700 px-5 text-xs font-extrabold text-white"
                            >
                              <Save
                                size={15}
                              />

                              Simpan
                              Perubahan
                            </button>
                          </div>
                        </form>
                      </details>
                    </div>

                    <form
                      action={
                        hapusPertanahanAction
                      }
                    >
                      <input
                        type="hidden"
                        name="id"
                        value={
                          item.id
                        }
                      />

                      <button
                        type="submit"
                        className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 text-xs font-extrabold text-red-700 transition hover:bg-red-100"
                      >
                        <Trash2
                          size={15}
                        />

                        Hapus
                      </button>
                    </form>
                  </div>
                </article>
              )
            )}
          </div>
        )}
      </section>
    </div>
  );
}

/* =========================================================
   FIELDS
========================================================= */

function PertanahanFields({
  item,
}: {
  item?:
    PertanahanData;
}) {
  return (
    <>
      <Input
        label="Nama Data"
        name="nama"
        value={
          item?.nama ??
          ''
        }
        placeholder="Contoh: Sawah"
      />

      <Input
        label="Kategori"
        name="kategori"
        value={
          item?.kategori ??
          ''
        }
        placeholder="Contoh: Pertanian"
      />

      <Input
        label="Luas (Hektar)"
        name="luas_hektar"
        type="number"
        step="0.0001"
        min="0"
        value={String(
          item?.luas_hektar ??
            0
        )}
      />

      <Input
        label="Jumlah Bidang"
        name="jumlah_bidang"
        type="number"
        min="0"
        value={
          item?.jumlah_bidang ===
          null ||
          item?.jumlah_bidang ===
          undefined
            ? ''
            : String(
                item.jumlah_bidang
              )
        }
        required={
          false
        }
      />

      <Input
        label="Warna"
        name="warna"
        type="color"
        value={
          item?.warna ??
          '#047857'
        }
      />

      <Input
        label="Urutan"
        name="urutan"
        type="number"
        min="0"
        value={String(
          item?.urutan ??
            0
        )}
      />

      <div className="md:col-span-2">
        <Textarea
          label="Keterangan"
          name="keterangan"
          value={
            item?.keterangan ??
            ''
          }
          required={
            false
          }
        />
      </div>

      <div className="md:col-span-2">
        <ActiveField
          defaultChecked={
            item
              ? item.aktif
              : true
          }
        />
      </div>
    </>
  );
}

/* =========================================================
   INPUT
========================================================= */

function Input({
  label,
  name,
  value,
  type =
    'text',
  required =
    true,
  placeholder,
  min,
  step,
}: {
  label: string;

  name: string;

  value: string;

  type?: string;

  required?: boolean;

  placeholder?: string;

  min?: string;

  step?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-extrabold uppercase tracking-wider text-slate-500">
        {label}
      </span>

      <input
        type={
          type
        }
        name={
          name
        }
        required={
          required
        }
        defaultValue={
          value
        }
        placeholder={
          placeholder
        }
        min={
          min
        }
        step={
          step
        }
        className={
          type ===
          'color'
            ? 'h-12 w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 p-2'
            : 'h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-700 outline-none focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100'
        }
      />
    </label>
  );
}

function Textarea({
  label,
  name,
  value,
  required =
    true,
}: {
  label: string;

  name: string;

  value: string;

  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-extrabold uppercase tracking-wider text-slate-500">
        {label}
      </span>

      <textarea
        name={
          name
        }
        required={
          required
        }
        defaultValue={
          value
        }
        rows={4}
        className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium leading-7 text-slate-700 outline-none focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
      />
    </label>
  );
}

function ActiveField({
  defaultChecked,
}: {
  defaultChecked: boolean;
}) {
  return (
    <label className="flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
      <input
        type="checkbox"
        name="aktif"
        value="true"
        defaultChecked={
          defaultChecked
        }
        className="mt-1 h-4 w-4 accent-emerald-700"
      />

      <span>
        <span className="block text-sm font-extrabold text-emerald-900">
          Tampilkan ke publik
        </span>

        <span className="mt-1 block text-xs font-medium text-emerald-700">
          Data aktif akan tampil pada
          halaman Data Pertanahan.
        </span>
      </span>
    </label>
  );
}

/* =========================================================
   CARDS
========================================================= */

function StatCard({
  label,
  value,
}: {
  label: string;

  value: string;
}) {
  return (
    <article className="rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm">
      <BarChart3
        size={21}
        className="text-emerald-700"
      />

      <p className="mt-4 text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-2xl font-black text-slate-900">
        {value}
      </p>
    </article>
  );
}

function MiniStat({
  label,
  value,
}: {
  label: string;

  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-2 font-black text-slate-800">
        {value}
      </p>
    </div>
  );
}

function formatNumber(
  value: number
) {
  return new Intl.NumberFormat(
    'id-ID',
    {
      maximumFractionDigits:
        4,
    }
  ).format(
    value
  );
}