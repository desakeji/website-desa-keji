// components/admin/PpidProfilForm.tsx

'use client';

import {
  useActionState,
} from 'react';

import {
  Building2,
  CircleAlert,
  LoaderCircle,
  Save,
} from 'lucide-react';

import {
  updateProfilPpidAction,
} from '@/app/admin/ppid/actions';

import type {
  PpidActionState,
  ProfilPpid,
} from '@/types/ppid';

interface PpidProfilFormProps {
  profil: ProfilPpid;
}

const initialState:
  PpidActionState = {
    error: null,
    success: null,
  };

export default function PpidProfilForm({
  profil,
}: PpidProfilFormProps) {
  const [
    state,
    formAction,
    isPending,
  ] = useActionState(
    updateProfilPpidAction,
    initialState
  );

  return (
    <form
      action={formAction}
      className="space-y-6 rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm md:p-8"
    >
      <div className="flex items-start gap-3 border-b border-slate-100 pb-5">
        <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700">
          <Building2 size={24} />
        </div>

        <div>
          <h2 className="text-xl font-black text-slate-900">
            Profil PPID
          </h2>

          <p className="mt-1 text-sm leading-relaxed text-slate-500">
            Informasi ini ditampilkan pada halaman profil PPID Desa Keji.
          </p>
        </div>
      </div>

      {state.error && (
        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
          <CircleAlert
            size={18}
            className="mt-0.5 shrink-0"
          />

          <p>{state.error}</p>
        </div>
      )}

      {state.success && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">
          {state.success}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <label
            htmlFor="judul"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Judul Profil
          </label>

          <input
            id="judul"
            name="judul"
            type="text"
            required
            minLength={5}
            maxLength={180}
            defaultValue={profil.judul}
            disabled={isPending}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:opacity-60"
          />
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="deskripsi"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Deskripsi PPID
          </label>

          <textarea
            id="deskripsi"
            name="deskripsi"
            rows={6}
            required
            minLength={20}
            maxLength={5000}
            defaultValue={profil.deskripsi}
            disabled={isPending}
            className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium leading-relaxed text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:opacity-60"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Email PPID
          </label>

          <input
            id="email"
            name="email"
            type="email"
            maxLength={150}
            defaultValue={
              profil.email ?? ''
            }
            disabled={isPending}
            placeholder="ppid@desakeji.id"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:opacity-60"
          />
        </div>

        <div>
          <label
            htmlFor="telepon"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Nomor Telepon
          </label>

          <input
            id="telepon"
            name="telepon"
            type="tel"
            maxLength={20}
            defaultValue={
              profil.telepon ?? ''
            }
            disabled={isPending}
            placeholder="081234567890"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:opacity-60"
          />
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="alamat"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Alamat Sekretariat
          </label>

          <textarea
            id="alamat"
            name="alamat"
            rows={3}
            maxLength={1000}
            defaultValue={
              profil.alamat ?? ''
            }
            disabled={isPending}
            className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:opacity-60"
          />
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="jam_layanan"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Jam Pelayanan
          </label>

          <input
            id="jam_layanan"
            name="jam_layanan"
            type="text"
            maxLength={180}
            defaultValue={
              profil.jam_layanan ?? ''
            }
            disabled={isPending}
            placeholder="Senin–Kamis 08.00–15.00 WIB"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:opacity-60"
          />
        </div>

        <label className="flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 md:col-span-2">
          <input
            name="aktif"
            type="checkbox"
            defaultChecked={
              profil.aktif
            }
            disabled={isPending}
            className="mt-0.5 h-4 w-4 rounded border-emerald-300 text-emerald-700"
          />

          <span>
            <span className="block text-sm font-bold text-emerald-900">
              Tampilkan profil PPID
            </span>

            <span className="mt-1 block text-xs text-emerald-700">
              Profil PPID akan ditampilkan pada halaman publik.
            </span>
          </span>
        </label>
      </div>

      <div className="flex justify-end border-t border-slate-100 pt-6">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 text-sm font-extrabold text-white shadow-md transition hover:bg-emerald-800 disabled:bg-slate-400 md:w-auto"
        >
          {isPending ? (
            <>
              <LoaderCircle
                size={18}
                className="animate-spin"
              />

              Menyimpan...
            </>
          ) : (
            <>
              <Save size={18} />
              Simpan Profil PPID
            </>
          )}
        </button>
      </div>
    </form>
  );
}