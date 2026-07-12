// app/admin/pengaturan/page.tsx

import {
  CalendarDays,
  Database,
  Settings2,
  Users,
} from 'lucide-react';

import ProfilDesaForm from '@/components/admin/ProfilDesaForm';

import {
  supabaseAdmin,
} from '@/lib/supabase-admin';

import type {
  ProfilDesa,
} from '@/types/profil-desa';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const PROFIL_KEY = 'utama';

const fallbackData: ProfilDesa = {
  id: '',
  profil_key: PROFIL_KEY,
  jumlah_laki_laki: 0,
  jumlah_perempuan: 0,
  jumlah_dusun: 0,
  jumlah_rw: 0,
  jumlah_rt: 0,
  tahun_data: new Date().getFullYear(),
  updated_at: new Date().toISOString(),
};

function formatTanggal(
  value: string | null | undefined
) {
  if (!value) {
    return 'Belum pernah diperbarui';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 'Belum pernah diperbarui';
  }

  return new Intl.DateTimeFormat(
    'id-ID',
    {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Jakarta',
    }
  )
    .format(date)
    .replace('.', ':');
}

function formatAngka(value: number) {
  return new Intl.NumberFormat(
    'id-ID'
  ).format(value);
}

export default async function PengaturanPage() {
  const {
    data,
    error,
  } = await supabaseAdmin
    .from('profil_desa')
    .select(`
      id,
      profil_key,
      jumlah_laki_laki,
      jumlah_perempuan,
      jumlah_dusun,
      jumlah_rw,
      jumlah_rt,
      tahun_data,
      updated_at
    `)
    .eq('profil_key', PROFIL_KEY)
    .maybeSingle();

  if (error) {
    console.error(
      'Gagal mengambil data profil desa:',
      error
    );
  }

  const profilDesa: ProfilDesa = data
    ? {
        id: String(data.id ?? ''),
        profil_key:
          String(
            data.profil_key ??
              PROFIL_KEY
          ),

        jumlah_laki_laki:
          Number(
            data.jumlah_laki_laki ?? 0
          ),

        jumlah_perempuan:
          Number(
            data.jumlah_perempuan ?? 0
          ),

        jumlah_dusun:
          Number(
            data.jumlah_dusun ?? 0
          ),

        jumlah_rw:
          Number(
            data.jumlah_rw ?? 0
          ),

        jumlah_rt:
          Number(
            data.jumlah_rt ?? 0
          ),

        tahun_data:
          Number(
            data.tahun_data ??
              new Date().getFullYear()
          ),

        updated_at:
          String(
            data.updated_at ??
              new Date().toISOString()
          ),
      }
    : fallbackData;

  const totalPenduduk =
    profilDesa.jumlah_laki_laki +
    profilDesa.jumlah_perempuan;

  return (
    <div className="mx-auto max-w-[1450px] space-y-6">
      {/* Header */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#064e3b] via-[#065f46] to-[#047857] p-6 text-white shadow-xl sm:p-8">
        {/* Ornamen */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border-[52px] border-white/[0.05]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 right-48 h-48 w-48 rounded-full bg-white/[0.04]"
        />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 shadow-lg backdrop-blur-sm">
              <Settings2
                size={23}
                strokeWidth={2.2}
              />
            </div>

            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-emerald-200">
                Data Utama Desa
              </p>

              <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">
                Pengaturan Profil Desa
              </h1>

              <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-emerald-50/80">
                Kelola data kependudukan dan
                wilayah administrasi Desa Keji.
                Perubahan akan digunakan pada
                halaman utama dan halaman profil
                desa.
              </p>
            </div>
          </div>

          <div className="inline-flex w-fit items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md">
            <CalendarDays
              size={18}
              className="shrink-0 text-emerald-200"
            />

            <div>
              <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-emerald-200/80">
                Terakhir diperbarui
              </p>

              <p className="mt-1 text-xs font-bold text-white">
                {formatTanggal(
                  profilDesa.updated_at
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Peringatan ketika data gagal dimuat */}
      {error && (
        <section className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
          <p className="text-sm font-bold text-amber-800">
            Data profil desa tidak berhasil
            dimuat dari database.
          </p>

          <p className="mt-1 text-xs leading-relaxed text-amber-700">
            Form tetap ditampilkan menggunakan
            nilai awal. Periksa struktur tabel
            profil_desa dan koneksi Supabase.
          </p>
        </section>
      )}

      {/* Ringkasan Data */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-slate-500">
                Total Penduduk
              </p>

              <p className="mt-2 text-2xl font-black text-slate-900">
                {formatAngka(
                  totalPenduduk
                )}
              </p>

              <p className="mt-1 text-xs font-semibold text-slate-400">
                Jiwa
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
              <Users size={21} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-slate-500">
            Jumlah Dusun
          </p>

          <p className="mt-2 text-2xl font-black text-slate-900">
            {formatAngka(
              profilDesa.jumlah_dusun
            )}
          </p>

          <p className="mt-1 text-xs font-semibold text-slate-400">
            Wilayah dusun
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-slate-500">
            Jumlah RW
          </p>

          <p className="mt-2 text-2xl font-black text-slate-900">
            {formatAngka(
              profilDesa.jumlah_rw
            )}
          </p>

          <p className="mt-1 text-xs font-semibold text-slate-400">
            Rukun warga
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-slate-500">
            Jumlah RT
          </p>

          <p className="mt-2 text-2xl font-black text-slate-900">
            {formatAngka(
              profilDesa.jumlah_rt
            )}
          </p>

          <p className="mt-1 text-xs font-semibold text-slate-400">
            Rukun tetangga
          </p>
        </div>
      </section>

      {/* Informasi Sinkronisasi */}
      <section className="flex flex-col gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5 sm:flex-row sm:items-center">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-emerald-700 shadow-sm">
          <Database size={20} />
        </div>

        <div>
          <h2 className="text-sm font-black text-emerald-900">
            Data tersinkronisasi
          </h2>

          <p className="mt-1 text-xs font-medium leading-relaxed text-emerald-800/70">
            Data yang disimpan pada form di
            bawah akan digunakan secara otomatis
            pada statistik halaman utama dan
            halaman Profil Desa.
          </p>
        </div>
      </section>

      {/* Form Pengaturan */}
      <ProfilDesaForm
        initialData={profilDesa}
      />
    </div>
  );
}