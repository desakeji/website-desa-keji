// components/admin/WargaForm.tsx

'use client';

import {
  useActionState,
  useEffect,
  useRef,
} from 'react';

import {
  CircleAlert,
  LoaderCircle,
  Save,
  ShieldCheck,
} from 'lucide-react';

import {
  createWargaAction,
} from '@/app/admin/warga/actions';

import type {
  WargaActionState,
} from '@/types/warga';

const initialState:
  WargaActionState = {
    error: null,
    success: null,
  };

export default function WargaForm() {
  const formRef =
    useRef<HTMLFormElement>(
      null
    );

  const [
    state,
    formAction,
    isPending,
  ] = useActionState(
    createWargaAction,
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
          <ShieldCheck
            size={24}
          />
        </div>

        <div>
          <h2 className="text-xl font-black text-slate-900">
            Tambah Data Warga
          </h2>

          <p className="mt-1 text-sm leading-relaxed text-slate-500">
            Masukkan data warga Desa
            Keji. NIK akan diamankan
            sebelum disimpan ke database.
          </p>
        </div>
      </div>

      {state.error && (
        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
          <CircleAlert
            size={18}
            className="mt-0.5 shrink-0"
          />

          <p>
            {state.error}
          </p>
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
            htmlFor="nik"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            NIK
          </label>

          <input
            id="nik"
            name="nik"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            required
            minLength={16}
            maxLength={16}
            pattern="[0-9]{16}"
            disabled={isPending}
            placeholder="Masukkan 16 digit NIK"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:opacity-60"
            onInput={(
              event
            ) => {
              event.currentTarget.value =
                event.currentTarget.value
                  .replace(
                    /\D/g,
                    ''
                  )
                  .slice(
                    0,
                    16
                  );
            }}
          />

          <p className="mt-2 text-xs text-slate-400">
            NIK tidak akan ditampilkan
            secara lengkap setelah
            disimpan.
          </p>
        </div>

        <div>
          <label
            htmlFor="nama_lengkap"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Nama Lengkap
          </label>

          <input
            id="nama_lengkap"
            name="nama_lengkap"
            type="text"
            required
            minLength={3}
            maxLength={150}
            disabled={isPending}
            placeholder="Nama sesuai dokumen kependudukan"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:opacity-60"
          />
        </div>

        <div>
          <label
            htmlFor="dusun"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Dusun
          </label>

          <input
            id="dusun"
            name="dusun"
            type="text"
            maxLength={100}
            disabled={isPending}
            placeholder="Contoh: Dusun Keji"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:opacity-60"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="rw"
              className="mb-2 block text-sm font-bold text-slate-700"
            >
              RW
            </label>

            <input
              id="rw"
              name="rw"
              type="text"
              inputMode="numeric"
              maxLength={3}
              disabled={isPending}
              placeholder="001"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:opacity-60"
              onInput={(
                event
              ) => {
                event.currentTarget.value =
                  event.currentTarget.value
                    .replace(
                      /\D/g,
                      ''
                    )
                    .slice(
                      0,
                      3
                    );
              }}
            />
          </div>

          <div>
            <label
              htmlFor="rt"
              className="mb-2 block text-sm font-bold text-slate-700"
            >
              RT
            </label>

            <input
              id="rt"
              name="rt"
              type="text"
              inputMode="numeric"
              maxLength={3}
              disabled={isPending}
              placeholder="001"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:opacity-60"
              onInput={(
                event
              ) => {
                event.currentTarget.value =
                  event.currentTarget.value
                    .replace(
                      /\D/g,
                      ''
                    )
                    .slice(
                      0,
                      3
                    );
              }}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="nomor_whatsapp"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Nomor WhatsApp
          </label>

          <input
            id="nomor_whatsapp"
            name="nomor_whatsapp"
            type="tel"
            inputMode="numeric"
            maxLength={15}
            disabled={isPending}
            placeholder="Contoh: 081234567890"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:opacity-60"
            onInput={(
              event
            ) => {
              event.currentTarget.value =
                event.currentTarget.value
                  .replace(
                    /\D/g,
                    ''
                  )
                  .slice(
                    0,
                    15
                  );
            }}
          />
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="alamat"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Alamat
          </label>

          <textarea
            id="alamat"
            name="alamat"
            rows={3}
            disabled={isPending}
            placeholder="Alamat warga Desa Keji"
            className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium leading-relaxed text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:opacity-60"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 text-sm font-extrabold text-white shadow-md transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-400 md:w-auto"
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
            Simpan Data Warga
          </>
        )}
      </button>
    </form>
  );
}