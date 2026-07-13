// app/admin/warga/page.tsx

import {
  ShieldCheck,
  ToggleLeft,
  ToggleRight,
  UserRound,
  Users,
} from 'lucide-react';

import WargaForm from '@/components/admin/WargaForm';

import {
  toggleStatusWargaAction,
} from './actions';

import {
  supabaseAdmin,
} from '@/lib/supabase-admin';

import type {
  Warga,
} from '@/types/warga';

export const dynamic =
  'force-dynamic';

export const revalidate = 0;

function formatTanggal(
  value: string
) {
  const date =
    new Date(value);

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

function maskNik(
  lastFourDigits: string
) {
  return `************${lastFourDigits}`;
}

export default async function AdminWargaPage() {
  const {
    data,
    error,
  } = await supabaseAdmin
    .from('warga')
    .select(`
      id,
      nik_empat_terakhir,
      nama_lengkap,
      dusun,
      rw,
      rt,
      alamat,
      nomor_whatsapp,
      aktif,
      created_at,
      updated_at
    `)
    .order('created_at', {
      ascending: false,
    });

  if (error) {
    console.error(
      'Gagal mengambil data warga:',
      error.message
    );
  }

  const daftarWarga =
    (data ?? []) as Warga[];

  const jumlahAktif =
    daftarWarga.filter(
      (warga) =>
        warga.aktif
    ).length;

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-600">
          Administrasi Warga
        </p>

        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
          Database Warga Desa
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">
          Kelola data warga yang
          diperbolehkan menggunakan
          Layanan Cepat Desa Keji.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Total Warga
              </p>

              <p className="mt-2 text-3xl font-black text-slate-900">
                {
                  daftarWarga.length
                }
              </p>
            </div>

            <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700">
              <Users
                size={24}
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Warga Aktif
              </p>

              <p className="mt-2 text-3xl font-black text-slate-900">
                {jumlahAktif}
              </p>
            </div>

            <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700">
              <ShieldCheck
                size={24}
              />
            </div>
          </div>
        </div>
      </div>

      <WargaForm />

      <section className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-100 p-6">
          <div className="rounded-xl bg-emerald-100 p-2.5 text-emerald-700">
            <UserRound
              size={21}
            />
          </div>

          <div>
            <h2 className="font-black text-slate-900">
              Daftar Warga
            </h2>

            <p className="mt-0.5 text-xs text-slate-400">
              NIK ditampilkan dalam
              bentuk tersamarkan.
            </p>
          </div>
        </div>

        {daftarWarga.length ===
        0 ? (
          <div className="p-10 text-center text-sm font-medium text-slate-500">
            Belum ada data warga
            yang ditambahkan.
          </div>
        ) : (
          <>
            {/* Desktop */}
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full min-w-[900px] text-left">
                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-6 py-4">
                      Warga
                    </th>

                    <th className="px-6 py-4">
                      NIK
                    </th>

                    <th className="px-6 py-4">
                      Wilayah
                    </th>

                    <th className="px-6 py-4">
                      WhatsApp
                    </th>

                    <th className="px-6 py-4">
                      Terdaftar
                    </th>

                    <th className="px-6 py-4 text-center">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {daftarWarga.map(
                    (warga) => (
                      <tr
                        key={
                          warga.id
                        }
                        className="transition hover:bg-slate-50/70"
                      >
                        <td className="px-6 py-4">
                          <p className="font-bold text-slate-800">
                            {
                              warga.nama_lengkap
                            }
                          </p>

                          <p className="mt-1 max-w-[250px] truncate text-xs text-slate-400">
                            {warga.alamat ??
                              'Alamat belum diisi'}
                          </p>
                        </td>

                        <td className="px-6 py-4 font-mono text-sm text-slate-600">
                          {maskNik(
                            warga.nik_empat_terakhir
                          )}
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-600">
                          <p>
                            {warga.dusun ??
                              '-'}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            RT{' '}
                            {warga.rt ??
                              '-'}{' '}
                            / RW{' '}
                            {warga.rw ??
                              '-'}
                          </p>
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-600">
                          {warga.nomor_whatsapp ??
                            '-'}
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-500">
                          {formatTanggal(
                            warga.created_at
                          )}
                        </td>

                        <td className="px-6 py-4">
                          <form
                            action={
                              toggleStatusWargaAction
                            }
                            className="flex justify-center"
                          >
                            <input
                              type="hidden"
                              name="id"
                              value={
                                warga.id
                              }
                            />

                            <input
                              type="hidden"
                              name="aktif"
                              value={String(
                                warga.aktif
                              )}
                            />

                            <button
                              type="submit"
                              title={
                                warga.aktif
                                  ? 'Nonaktifkan warga'
                                  : 'Aktifkan warga'
                              }
                              className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold transition ${
                                warga.aktif
                                  ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                              }`}
                            >
                              {warga.aktif ? (
                                <ToggleRight
                                  size={
                                    18
                                  }
                                />
                              ) : (
                                <ToggleLeft
                                  size={
                                    18
                                  }
                                />
                              )}

                              {warga.aktif
                                ? 'Aktif'
                                : 'Nonaktif'}
                            </button>
                          </form>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile */}
            <div className="grid gap-4 p-4 lg:hidden">
              {daftarWarga.map(
                (warga) => (
                  <article
                    key={
                      warga.id
                    }
                    className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-black text-slate-800">
                          {
                            warga.nama_lengkap
                          }
                        </h3>

                        <p className="mt-1 font-mono text-xs text-slate-500">
                          {maskNik(
                            warga.nik_empat_terakhir
                          )}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                          warga.aktif
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-slate-200 text-slate-500'
                        }`}
                      >
                        {warga.aktif
                          ? 'Aktif'
                          : 'Nonaktif'}
                      </span>
                    </div>

                    <div className="mt-4 space-y-1 text-xs text-slate-500">
                      <p>
                        Dusun:{' '}
                        {warga.dusun ??
                          '-'}
                      </p>

                      <p>
                        RT{' '}
                        {warga.rt ??
                          '-'}{' '}
                        / RW{' '}
                        {warga.rw ??
                          '-'}
                      </p>

                      <p>
                        WhatsApp:{' '}
                        {warga.nomor_whatsapp ??
                          '-'}
                      </p>
                    </div>

                    <form
                      action={
                        toggleStatusWargaAction
                      }
                      className="mt-4"
                    >
                      <input
                        type="hidden"
                        name="id"
                        value={
                          warga.id
                        }
                      />

                      <input
                        type="hidden"
                        name="aktif"
                        value={String(
                          warga.aktif
                        )}
                      />

                      <button
                        type="submit"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-600 transition hover:border-emerald-300 hover:text-emerald-700"
                      >
                        {warga.aktif
                          ? 'Nonaktifkan Warga'
                          : 'Aktifkan Warga'}
                      </button>
                    </form>
                  </article>
                )
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
}