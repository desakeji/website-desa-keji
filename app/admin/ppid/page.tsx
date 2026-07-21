// app/admin/ppid/page.tsx

import {
  Building2,
  Eye,
  EyeOff,
  ShieldCheck,
  Trash2,
  Users,
} from 'lucide-react';

import PpidPengurusForm from '@/components/admin/PpidPengurusForm';
import PpidProfilForm from '@/components/admin/PpidProfilForm';

import {
  supabaseAdmin,
} from '@/lib/supabase-admin';

import {
  deletePengurusPpidAction,
  togglePengurusPpidAction,
} from './actions';

import type {
  PengurusPpid,
  ProfilPpid,
} from '@/types/ppid';

export const dynamic =
  'force-dynamic';

export const revalidate = 0;

const fallbackProfil:
  ProfilPpid = {
    id: '',
    profil_key: 'utama',

    judul:
      'Profil PPID Desa Keji',

    deskripsi:
      'Pejabat Pengelola Informasi dan Dokumentasi Desa Keji bertanggung jawab mengelola, mendokumentasikan, menyediakan, serta memberikan pelayanan informasi publik kepada masyarakat.',

    email: null,
    telepon: null,

    alamat:
      'Kantor Pemerintah Desa Keji, Kecamatan Ungaran Barat, Kabupaten Semarang',

    jam_layanan:
      'Senin–Kamis 08.00–15.00 WIB dan Jumat 08.00–11.30 WIB',

    aktif: true,
    created_at: '',
    updated_at: '',
  };

function normalizeProfil(
  data: Record<
    string,
    unknown
  > | null
): ProfilPpid {
  if (!data) {
    return fallbackProfil;
  }

  return {
    id:
      String(
        data.id ?? ''
      ),

    profil_key:
      String(
        data.profil_key ??
          'utama'
      ),

    judul:
      String(
        data.judul ??
          fallbackProfil.judul
      ),

    deskripsi:
      String(
        data.deskripsi ??
          fallbackProfil.deskripsi
      ),

    email:
      data.email
        ? String(data.email)
        : null,

    telepon:
      data.telepon
        ? String(
            data.telepon
          )
        : null,

    alamat:
      data.alamat
        ? String(
            data.alamat
          )
        : null,

    jam_layanan:
      data.jam_layanan
        ? String(
            data.jam_layanan
          )
        : null,

    aktif:
      Boolean(
        data.aktif
      ),

    created_at:
      String(
        data.created_at ?? ''
      ),

    updated_at:
      String(
        data.updated_at ?? ''
      ),
  };
}

function normalizePengurus(
  data: unknown
): PengurusPpid[] {
  if (!Array.isArray(data)) {
    return [];
  }

  return data.map(
    (item) => {
      const row =
        item as Record<
          string,
          unknown
        >;

      return {
        id:
          String(
            row.id ?? ''
          ),

        nama:
          String(
            row.nama ?? ''
          ),

        jabatan_desa:
          String(
            row.jabatan_desa ??
              ''
          ),

        jabatan_ppid:
          String(
            row.jabatan_ppid ??
              ''
          ),

        urutan:
          Number(
            row.urutan ?? 0
          ),

        aktif:
          Boolean(
            row.aktif
          ),

        created_at:
          String(
            row.created_at ??
              ''
          ),

        updated_at:
          String(
            row.updated_at ??
              ''
          ),
      };
    }
  );
}

export default async function AdminPpidPage() {
  const [
    profilResult,
    pengurusResult,
  ] = await Promise.all([
    supabaseAdmin
      .from('profil_ppid')
      .select(`
        id,
        profil_key,
        judul,
        deskripsi,
        email,
        telepon,
        alamat,
        jam_layanan,
        aktif,
        created_at,
        updated_at
      `)
      .eq(
        'profil_key',
        'utama'
      )
      .maybeSingle(),

    supabaseAdmin
      .from('ppid_pengurus')
      .select(`
        id,
        nama,
        jabatan_desa,
        jabatan_ppid,
        urutan,
        aktif,
        created_at,
        updated_at
      `)
      .order('urutan', {
        ascending: true,
      })
      .order('created_at', {
        ascending: true,
      }),
  ]);

  if (profilResult.error) {
    console.error(
      'Gagal mengambil profil PPID:',
      {
        message:
          profilResult.error.message,
        code:
          profilResult.error.code,
        details:
          profilResult.error.details,
        hint:
          profilResult.error.hint,
      }
    );
  }

  if (pengurusResult.error) {
    console.error(
      'Gagal mengambil pengurus PPID:',
      {
        message:
          pengurusResult.error.message,
        code:
          pengurusResult.error.code,
        details:
          pengurusResult.error.details,
        hint:
          pengurusResult.error.hint,
      }
    );
  }

  const profil =
    normalizeProfil(
      profilResult.data as
        | Record<
            string,
            unknown
          >
        | null
    );

  const daftarPengurus =
    normalizePengurus(
      pengurusResult.data
    );

  const jumlahAktif =
    daftarPengurus.filter(
      (item) =>
        item.aktif
    ).length;

  const jumlahJabatan =
    new Set(
      daftarPengurus.map(
        (item) =>
          item.jabatan_ppid
      )
    ).size;

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-600">
          Informasi Publik
        </p>

        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
          Pengelolaan PPID
        </h1>

        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-500">
          Kelola profil, kontak, dan susunan pengurus PPID Pemerintah Desa Keji.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatistikCard
          label="Total Pengurus"
          value={
            daftarPengurus.length
          }
          icon={Users}
        />

        <StatistikCard
          label="Pengurus Aktif"
          value={jumlahAktif}
          icon={ShieldCheck}
        />

        <StatistikCard
          label="Jabatan PPID"
          value={jumlahJabatan}
          icon={Building2}
        />

        <StatistikCard
          label="Status Profil"
          value={
            profil.aktif ? 1 : 0
          }
          icon={
            profil.aktif
              ? Eye
              : EyeOff
          }
        />
      </section>

      <PpidProfilForm
        profil={profil}
      />

      <PpidPengurusForm />

      <section className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-6">
          <h2 className="text-xl font-black text-slate-900">
            Daftar Pengurus PPID
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Data ini langsung digunakan pada halaman publik Profil PPID.
          </p>
        </div>

        {daftarPengurus.length ===
        0 ? (
          <div className="p-12 text-center">
            <Users
              size={46}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-4 font-black text-slate-700">
              Belum ada pengurus PPID
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Tambahkan pengurus melalui formulir di atas.
            </p>
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[850px] text-left">
                <thead className="bg-slate-50 text-xs font-extrabold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="w-[80px] px-5 py-4 text-center">
                      Urutan
                    </th>

                    <th className="px-5 py-4">
                      Nama
                    </th>

                    <th className="px-5 py-4">
                      Jabatan Desa
                    </th>

                    <th className="px-5 py-4">
                      Jabatan PPID
                    </th>

                    <th className="px-5 py-4 text-center">
                      Status
                    </th>

                    <th className="px-5 py-4 text-center">
                      Aksi
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {daftarPengurus.map(
                    (item) => (
                      <tr
                        key={item.id}
                        className="transition hover:bg-slate-50"
                      >
                        <td className="px-5 py-4 text-center text-sm font-black text-slate-600">
                          {item.urutan}
                        </td>

                        <td className="px-5 py-4 font-black text-slate-800">
                          {item.nama}
                        </td>

                        <td className="px-5 py-4 text-sm font-semibold text-slate-600">
                          {item.jabatan_desa}
                        </td>

                        <td className="px-5 py-4">
                          <span className="inline-flex rounded-full bg-cyan-100 px-3 py-1.5 text-xs font-extrabold text-cyan-700">
                            {item.jabatan_ppid}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-center">
                          <span
                            className={`inline-flex rounded-full px-3 py-1.5 text-[10px] font-extrabold ${
                              item.aktif
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            {item.aktif
                              ? 'Aktif'
                              : 'Tidak Aktif'}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex justify-center gap-2">
                            <form
                              action={
                                togglePengurusPpidAction
                              }
                            >
                              <input
                                type="hidden"
                                name="id"
                                value={item.id}
                              />

                              <input
                                type="hidden"
                                name="aktif"
                                value={String(
                                  item.aktif
                                )}
                              />

                              <button
                                type="submit"
                                title={
                                  item.aktif
                                    ? 'Nonaktifkan'
                                    : 'Aktifkan'
                                }
                                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-amber-200 text-amber-700 transition hover:bg-amber-50"
                              >
                                {item.aktif ? (
                                  <EyeOff
                                    size={16}
                                  />
                                ) : (
                                  <Eye
                                    size={16}
                                  />
                                )}
                              </button>
                            </form>

                            <form
                              action={
                                deletePengurusPpidAction
                              }
                            >
                              <input
                                type="hidden"
                                name="id"
                                value={item.id}
                              />

                              <button
                                type="submit"
                                title="Hapus pengurus"
                                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-red-200 text-red-600 transition hover:bg-red-50"
                              >
                                <Trash2
                                  size={16}
                                />
                              </button>
                            </form>
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            <div className="grid gap-4 p-4 md:hidden">
              {daftarPengurus.map(
                (item) => (
                  <article
                    key={item.id}
                    className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-extrabold uppercase tracking-wider text-emerald-600">
                          Urutan {item.urutan}
                        </p>

                        <h3 className="mt-1 font-black text-slate-800">
                          {item.nama}
                        </h3>

                        <p className="mt-1 text-xs font-semibold text-slate-500">
                          {item.jabatan_desa}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-[10px] font-extrabold ${
                          item.aktif
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-slate-200 text-slate-500'
                        }`}
                      >
                        {item.aktif
                          ? 'Aktif'
                          : 'Tidak Aktif'}
                      </span>
                    </div>

                    <div className="mt-4 rounded-xl bg-cyan-100 px-4 py-3 text-xs font-extrabold leading-relaxed text-cyan-800">
                      {item.jabatan_ppid}
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <form
                        action={
                          togglePengurusPpidAction
                        }
                      >
                        <input
                          type="hidden"
                          name="id"
                          value={item.id}
                        />

                        <input
                          type="hidden"
                          name="aktif"
                          value={String(
                            item.aktif
                          )}
                        />

                        <button
                          type="submit"
                          className="w-full rounded-xl border border-amber-200 bg-white px-3 py-2.5 text-xs font-bold text-amber-700"
                        >
                          {item.aktif
                            ? 'Nonaktifkan'
                            : 'Aktifkan'}
                        </button>
                      </form>

                      <form
                        action={
                          deletePengurusPpidAction
                        }
                      >
                        <input
                          type="hidden"
                          name="id"
                          value={item.id}
                        />

                        <button
                          type="submit"
                          className="w-full rounded-xl border border-red-200 bg-white px-3 py-2.5 text-xs font-bold text-red-600"
                        >
                          Hapus
                        </button>
                      </form>
                    </div>
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
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: typeof Users;
}) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
      <div className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-emerald-50" />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
            {label}
          </p>

          <p className="mt-3 text-3xl font-black text-slate-900">
            {value}
          </p>
        </div>

        <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700">
          <Icon size={23} />
        </div>
      </div>
    </article>
  );
}