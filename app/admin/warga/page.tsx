// app/admin/warga/page.tsx

import {
  House,
  MapPin,
  ShieldCheck,
  ToggleLeft,
  ToggleRight,
  UserRound,
  Users,
} from 'lucide-react';

import type {
  LucideIcon,
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
  value:
    | string
    | null
) {
  if (!value) {
    return '-';
  }

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

function maskNomor(
  lastFourDigits:
    | string
    | null
) {
  if (!lastFourDigits) {
    return '-';
  }

  return `************${lastFourDigits}`;
}

function formatJenisKelamin(
  value:
    | 'L'
    | 'P'
    | null
) {
  if (value === 'L') {
    return 'Laki-laki';
  }

  if (value === 'P') {
    return 'Perempuan';
  }

  return 'Belum diisi';
}

function formatStatusPenduduk(
  value:
    | 'TETAP'
    | 'TIDAK_TETAP'
    | null
) {
  if (value === 'TETAP') {
    return 'Penduduk Tetap';
  }

  if (
    value ===
    'TIDAK_TETAP'
  ) {
    return 'Penduduk Tidak Tetap';
  }

  return 'Belum diisi';
}

function getStatusPendudukClass(
  value:
    | 'TETAP'
    | 'TIDAK_TETAP'
    | null
) {
  if (value === 'TETAP') {
    return 'bg-emerald-100 text-emerald-700';
  }

  if (
    value ===
    'TIDAK_TETAP'
  ) {
    return 'bg-amber-100 text-amber-700';
  }

  return 'bg-slate-100 text-slate-500';
}

function formatKodeWilayah(
  value:
    | string
    | null
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

export default async function AdminWargaPage() {
  const {
    data,
    error,
  } = await supabaseAdmin
    .from('warga')
    .select(`
      id,
      nik_empat_terakhir,
      no_kk_empat_terakhir,
      nama_lengkap,
      jenis_kelamin,
      tanggal_lahir,
      status_penduduk,
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
  }

  const daftarWarga =
    (data ?? []) as Warga[];

  const jumlahAktif =
    daftarWarga.filter(
      (warga) =>
        warga.aktif
    ).length;

  const jumlahTetap =
    daftarWarga.filter(
      (warga) =>
        warga.aktif &&
        warga.status_penduduk ===
          'TETAP'
    ).length;

  const jumlahTidakTetap =
    daftarWarga.filter(
      (warga) =>
        warga.aktif &&
        warga.status_penduduk ===
          'TIDAK_TETAP'
    ).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <header>
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-600">
          Administrasi Warga
        </p>

        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
          Database Warga Desa
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">
          Kelola data warga yang
          diperbolehkan menggunakan
          Layanan Cepat serta menjadi
          sumber statistik kependudukan
          Desa Keji.
        </p>
      </header>

      {/* Statistik */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatistikCard
          label="Total Warga"
          value={
            daftarWarga.length
          }
          description="Seluruh data warga"
          icon={Users}
        />

        <StatistikCard
          label="Warga Aktif"
          value={jumlahAktif}
          description="Dapat menggunakan layanan"
          icon={ShieldCheck}
        />

        <StatistikCard
          label="Penduduk Tetap"
          value={jumlahTetap}
          description="Berdomisili tetap"
          icon={House}
        />

        <StatistikCard
          label="Tidak Tetap"
          value={
            jumlahTidakTetap
          }
          description="Domisili tidak tetap"
          icon={MapPin}
        />
      </section>

      {/* Form Tambah */}
      <WargaForm />

      {/* Daftar Warga */}
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
              NIK dan nomor KK
              ditampilkan dalam bentuk
              tersamarkan.
            </p>
          </div>
        </div>

        {daftarWarga.length ===
        0 ? (
          <div className="p-10 text-center text-sm font-medium text-slate-500">
            Belum ada data warga yang
            ditambahkan.
          </div>
        ) : (
          <>
            {/* Desktop */}
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full min-w-[1250px] text-left">
                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-5 py-4">
                      Warga
                    </th>

                    <th className="px-5 py-4">
                      Identitas
                    </th>

                    <th className="px-5 py-4">
                      Demografi
                    </th>

                    <th className="px-5 py-4">
                      Wilayah
                    </th>

                    <th className="px-5 py-4">
                      WhatsApp
                    </th>

                    <th className="px-5 py-4">
                      Terdaftar
                    </th>

                    <th className="px-5 py-4 text-center">
                      Akses
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {daftarWarga.map(
                    (warga) => (
                      <tr
                        key={warga.id}
                        className="align-top transition hover:bg-slate-50/70"
                      >
                        {/* Warga */}
                        <td className="px-5 py-4">
                          <p className="font-bold text-slate-800">
                            {
                              warga.nama_lengkap
                            }
                          </p>

                          <p className="mt-1 max-w-[240px] text-xs leading-relaxed text-slate-400">
                            {warga.alamat ??
                              'Alamat belum diisi'}
                          </p>
                        </td>

                        {/* Identitas */}
                        <td className="px-5 py-4">
                          <div className="space-y-2">
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                NIK
                              </p>

                              <p className="mt-0.5 font-mono text-xs text-slate-600">
                                {maskNomor(
                                  warga.nik_empat_terakhir
                                )}
                              </p>
                            </div>

                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                Nomor KK
                              </p>

                              <p className="mt-0.5 font-mono text-xs text-slate-600">
                                {maskNomor(
                                  warga.no_kk_empat_terakhir
                                )}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Demografi */}
                        <td className="px-5 py-4">
                          <p className="text-sm font-semibold text-slate-700">
                            {formatJenisKelamin(
                              warga.jenis_kelamin
                            )}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            Lahir:{' '}
                            {formatTanggal(
                              warga.tanggal_lahir
                            )}
                          </p>

                          <span
                            className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold ${getStatusPendudukClass(
                              warga.status_penduduk
                            )}`}
                          >
                            {formatStatusPenduduk(
                              warga.status_penduduk
                            )}
                          </span>
                        </td>

                        {/* Wilayah */}
                        <td className="px-5 py-4 text-sm text-slate-600">
                          <p className="font-semibold">
                            {warga.dusun ??
                              '-'}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            RT{' '}
                            {formatKodeWilayah(
                              warga.rt
                            )}{' '}
                            / RW{' '}
                            {formatKodeWilayah(
                              warga.rw
                            )}
                          </p>
                        </td>

                        {/* WhatsApp */}
                        <td className="px-5 py-4 text-sm text-slate-600">
                          {warga.nomor_whatsapp ??
                            '-'}
                        </td>

                        {/* Tanggal daftar */}
                        <td className="px-5 py-4 text-sm text-slate-500">
                          {formatTanggal(
                            warga.created_at
                          )}
                        </td>

                        {/* Status akses */}
                        <td className="px-5 py-4">
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
                                  ? 'Nonaktifkan akses layanan'
                                  : 'Aktifkan akses layanan'
                              }
                              className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold transition ${
                                warga.aktif
                                  ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                              }`}
                            >
                              {warga.aktif ? (
                                <ToggleRight
                                  size={18}
                                />
                              ) : (
                                <ToggleLeft
                                  size={18}
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
                    key={warga.id}
                    className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="truncate font-black text-slate-800">
                          {
                            warga.nama_lengkap
                          }
                        </h3>

                        <p className="mt-1 font-mono text-xs text-slate-500">
                          NIK:{' '}
                          {maskNomor(
                            warga.nik_empat_terakhir
                          )}
                        </p>

                        <p className="mt-1 font-mono text-xs text-slate-500">
                          KK:{' '}
                          {maskNomor(
                            warga.no_kk_empat_terakhir
                          )}
                        </p>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${
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

                    <div className="mt-4 grid gap-3 rounded-xl border border-slate-100 bg-white p-3 text-xs text-slate-500">
                      <div>
                        <p className="font-bold text-slate-700">
                          Data Demografi
                        </p>

                        <p className="mt-1">
                          Jenis kelamin:{' '}
                          {formatJenisKelamin(
                            warga.jenis_kelamin
                          )}
                        </p>

                        <p className="mt-1">
                          Tanggal lahir:{' '}
                          {formatTanggal(
                            warga.tanggal_lahir
                          )}
                        </p>

                        <p className="mt-1">
                          Status:{' '}
                          {formatStatusPenduduk(
                            warga.status_penduduk
                          )}
                        </p>
                      </div>

                      <div>
                        <p className="font-bold text-slate-700">
                          Wilayah
                        </p>

                        <p className="mt-1">
                          Dusun:{' '}
                          {warga.dusun ??
                            '-'}
                        </p>

                        <p className="mt-1">
                          RT{' '}
                          {formatKodeWilayah(
                            warga.rt
                          )}{' '}
                          / RW{' '}
                          {formatKodeWilayah(
                            warga.rw
                          )}
                        </p>
                      </div>

                      <div>
                        <p className="font-bold text-slate-700">
                          Kontak
                        </p>

                        <p className="mt-1">
                          WhatsApp:{' '}
                          {warga.nomor_whatsapp ??
                            '-'}
                        </p>

                        <p className="mt-1">
                          Terdaftar:{' '}
                          {formatTanggal(
                            warga.created_at
                          )}
                        </p>
                      </div>

                      <div>
                        <p className="font-bold text-slate-700">
                          Alamat
                        </p>

                        <p className="mt-1 leading-relaxed">
                          {warga.alamat ??
                            'Alamat belum diisi'}
                        </p>
                      </div>
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
                          ? 'Nonaktifkan Akses Warga'
                          : 'Aktifkan Akses Warga'}
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

function StatistikCard({
  label,
  value,
  description,
  icon: Icon,
}: {
  label: string;
  value: number;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
      <div className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-emerald-50" />

      <div className="relative flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {label}
          </p>

          <p className="mt-2 text-3xl font-black text-slate-900">
            {new Intl.NumberFormat(
              'id-ID'
            ).format(value)}
          </p>

          <p className="mt-1 text-xs font-semibold text-emerald-700">
            {description}
          </p>
        </div>

        <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700">
          <Icon size={24} />
        </div>
      </div>
    </article>
  );
}