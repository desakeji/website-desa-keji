// components/admin/PpidPengurusForm.tsx

'use client';

import {
  useActionState,
  useEffect,
  useRef,
} from 'react';

import {
  CircleAlert,
  LoaderCircle,
  UserPlus,
  Users,
} from 'lucide-react';

import {
  createPengurusPpidAction,
} from '@/app/admin/ppid/actions';

import type {
  PpidActionState,
} from '@/types/ppid';

const initialState:
  PpidActionState = {
    error: null,
    success: null,
  };

const JABATAN_PPID = [
  'Atasan PPID',
  'PPID',
  'Sekretaris PPID',
  'Bidang Pelayanan Informasi',
  'Bidang Pengelolaan Informasi',
  'Bidang Dokumentasi dan Arsip',
  'Bidang Pengaduan dan Penyelesaian Sengketa',
];

export default function PpidPengurusForm() {
  const formRef =
    useRef<HTMLFormElement>(
      null
    );

  const [
    state,
    formAction,
    isPending,
  ] = useActionState(
    createPengurusPpidAction,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="space-y-6 rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm md:p-8"
    >
      <div className="flex items-start gap-3 border-b border-slate-100 pb-5">
        <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700">
          <Users size={24} />
        </div>

        <div>
          <h2 className="text-xl font-black text-slate-900">
            Tambah Pengurus PPID
          </h2>

          <p className="mt-1 text-sm leading-relaxed text-slate-500">
            Masukkan nama perangkat desa dan jabatan resminya dalam struktur PPID.
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
        <div>
          <label
            htmlFor="nama"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Nama Lengkap
          </label>

          <input
            id="nama"
            name="nama"
            type="text"
            required
            minLength={3}
            maxLength={150}
            disabled={isPending}
            placeholder="Nama pengurus PPID"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:opacity-60"
          />
        </div>

        <div>
          <label
            htmlFor="jabatan_desa"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Jabatan di Pemerintah Desa
          </label>

          <input
            id="jabatan_desa"
            name="jabatan_desa"
            type="text"
            required
            minLength={3}
            maxLength={150}
            disabled={isPending}
            placeholder="Contoh: Kepala Desa"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:opacity-60"
          />
        </div>

        <div>
          <label
            htmlFor="jabatan_ppid"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Jabatan dalam PPID
          </label>

          <select
            id="jabatan_ppid"
            name="jabatan_ppid"
            required
            defaultValue=""
            disabled={isPending}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:opacity-60"
          >
            <option
              value=""
              disabled
            >
              Pilih jabatan PPID
            </option>

            {JABATAN_PPID.map(
              (jabatan) => (
                <option
                  key={jabatan}
                  value={jabatan}
                >
                  {jabatan}
                </option>
              )
            )}
          </select>
        </div>

        <div>
          <label
            htmlFor="urutan"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Nomor Urut
          </label>

          <input
            id="urutan"
            name="urutan"
            type="number"
            min={0}
            max={999}
            required
            defaultValue={1}
            disabled={isPending}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:opacity-60"
          />
        </div>

        <label className="flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 md:col-span-2">
          <input
            name="aktif"
            type="checkbox"
            defaultChecked
            disabled={isPending}
            className="mt-0.5 h-4 w-4 rounded border-emerald-300 text-emerald-700"
          />

          <span>
            <span className="block text-sm font-bold text-emerald-900">
              Aktifkan pengurus
            </span>

            <span className="mt-1 block text-xs text-emerald-700">
              Pengurus langsung ditampilkan pada halaman Profil PPID.
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
              <UserPlus size={18} />
              Tambah Pengurus
            </>
          )}
        </button>
      </div>
    </form>
  );
}