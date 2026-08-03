// components/admin/KelolaPerangkatDesa.tsx

'use client';

import {
  useActionState,
  type FormEvent,
} from 'react';

import {
  CheckCircle2,
  CircleAlert,
  Image as ImageIcon,
  LoaderCircle,
  Pencil,
  Plus,
  Power,
  Save,
  Trash2,
  UserRound,
  UsersRound,
} from 'lucide-react';

import {
  hapusPerangkatAction,
  tambahPerangkatAction,
  togglePerangkatAction,
  ubahPerangkatAction,
} from '@/app/admin/pemerintahan/actions';

import {
  KELOMPOK_PERANGKAT,
  type PemerintahanActionState,
  type PerangkatDesaData,
} from '@/types/pemerintahan';

interface Props {
  perangkat:
    PerangkatDesaData[];
}

const initialState:
  PemerintahanActionState = {
    success: false,
    message: '',
  };

const inputClassName =
  'h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-800 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100';

export default function KelolaPerangkatDesa({
  perangkat,
}: Props) {
  return (
    <div className="space-y-7">
      <TambahPerangkatForm />

      <section className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-[0_12px_35px_rgba(6,78,59,0.07)]">
        <div className="flex flex-col gap-3 border-b border-emerald-50 bg-gradient-to-r from-emerald-50/80 to-white px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-emerald-700">
              Struktur Organisasi
            </p>

            <h2 className="mt-1 text-xl font-black text-slate-900">
              Daftar Perangkat Desa
            </h2>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Edit status, identitas, jabatan, foto,
              dan urutan perangkat desa.
            </p>
          </div>

          <div className="rounded-xl border border-emerald-100 bg-white px-4 py-2 text-xs font-extrabold text-emerald-700">
            {perangkat.length} perangkat
          </div>
        </div>

        {perangkat.length === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center p-8 text-center">
            <UsersRound
              size={34}
              className="text-emerald-600"
            />

            <h3 className="mt-4 font-black text-slate-800">
              Belum ada perangkat desa
            </h3>

            <p className="mt-2 text-sm font-medium text-slate-500">
              Tambahkan Kepala Desa dan perangkat lainnya
              melalui formulir di atas.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 p-5 sm:p-7 xl:grid-cols-2">
            {perangkat.map(
              (item) => (
                <PerangkatCard
                  key={item.id}
                  perangkat={item}
                />
              )
            )}
          </div>
        )}
      </section>
    </div>
  );
}

function TambahPerangkatForm() {
  const [
    state,
    formAction,
    pending,
  ] = useActionState(
    tambahPerangkatAction,
    initialState
  );

  return (
    <form
      action={formAction}
      className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-[0_12px_35px_rgba(6,78,59,0.07)]"
    >
      <div className="border-b border-emerald-50 bg-gradient-to-r from-emerald-50/80 to-white px-6 py-5 sm:px-7">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-700 text-white">
            <Plus size={23} />
          </div>

          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-emerald-700">
              Perangkat Baru
            </p>

            <h2 className="mt-1 text-xl font-black text-slate-900">
              Tambah Perangkat Desa
            </h2>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-7">
        {state.message && (
          <ActionMessage state={state} />
        )}

        <PerangkatFields />

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={pending}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-7 text-sm font-extrabold text-white transition hover:bg-emerald-800 disabled:bg-slate-400 sm:w-auto"
          >
            {pending ? (
              <LoaderCircle
                size={18}
                className="animate-spin"
              />
            ) : (
              <Plus size={18} />
            )}

            {pending
              ? 'Menambahkan...'
              : 'Tambah Perangkat'}
          </button>
        </div>
      </div>
    </form>
  );
}

function PerangkatCard({
  perangkat,
}: {
  perangkat:
    PerangkatDesaData;
}) {
  const action =
    ubahPerangkatAction.bind(
      null,
      perangkat.id
    );

  const [
    state,
    formAction,
    pending,
  ] = useActionState(
    action,
    initialState
  );

  function handleDelete(
    event:
      FormEvent<HTMLFormElement>
  ) {
    const confirmed =
      window.confirm(
        `Hapus ${perangkat.nama} dari daftar perangkat desa?`
      );

    if (!confirmed) {
      event.preventDefault();
    }
  }

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-start gap-4 border-b border-slate-100 bg-gradient-to-r from-emerald-50/80 to-white p-5">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-emerald-100">
          {perangkat.foto_url ? (
            <img
              src={perangkat.foto_url}
              alt={perangkat.nama}
              className="h-full w-full object-cover object-top"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-emerald-700">
              <UserRound size={28} />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap gap-2">
            <span
              className={`rounded-full px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.1em] ${
                perangkat.aktif
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-amber-100 text-amber-700'
              }`}
            >
              {perangkat.aktif
                ? 'Aktif'
                : 'Nonaktif'}
            </span>

            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-extrabold text-slate-500">
              Urutan {perangkat.urutan}
            </span>
          </div>

          <h3 className="mt-3 truncate text-lg font-black text-slate-900">
            {perangkat.nama}
          </h3>

          <p className="mt-1 text-sm font-bold text-emerald-700">
            {perangkat.jabatan}
          </p>

          <p className="mt-1 text-xs font-semibold text-slate-500">
            {perangkat.kelompok}
          </p>
        </div>
      </div>

      <div className="p-5">
        {perangkat.deskripsi && (
          <p className="line-clamp-3 text-sm font-medium leading-6 text-slate-500">
            {perangkat.deskripsi}
          </p>
        )}

        <div className="mt-5 grid grid-cols-2 gap-2">
          <form
            action={togglePerangkatAction}
          >
            <input
              type="hidden"
              name="id"
              value={perangkat.id}
            />

            <input
              type="hidden"
              name="aktif"
              value={String(
                !perangkat.aktif
              )}
            />

            <button
              type="submit"
              className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-amber-200 bg-amber-50 text-xs font-extrabold text-amber-700 transition hover:bg-amber-100"
            >
              <Power size={15} />

              {perangkat.aktif
                ? 'Nonaktifkan'
                : 'Aktifkan'}
            </button>
          </form>

          <form
            action={hapusPerangkatAction}
            onSubmit={handleDelete}
          >
            <input
              type="hidden"
              name="id"
              value={perangkat.id}
            />

            <button
              type="submit"
              className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 text-xs font-extrabold text-red-700 transition hover:bg-red-100"
            >
              <Trash2 size={15} />
              Hapus
            </button>
          </form>
        </div>

        <details className="mt-4 rounded-2xl border border-slate-200 bg-slate-50">
          <summary className="flex cursor-pointer list-none items-center justify-center gap-2 px-4 py-3 text-xs font-extrabold text-slate-700">
            <Pencil size={15} />
            Edit Perangkat
          </summary>

          <form
            action={formAction}
            className="border-t border-slate-200 p-4"
          >
            {state.message && (
              <ActionMessage
                state={state}
              />
            )}

            <PerangkatFields
              initialData={
                perangkat
              }
            />

            <button
              type="submit"
              disabled={pending}
              className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-800 text-xs font-extrabold text-white disabled:bg-slate-400"
            >
              {pending ? (
                <LoaderCircle
                  size={17}
                  className="animate-spin"
                />
              ) : (
                <Save size={16} />
              )}

              {pending
                ? 'Menyimpan...'
                : 'Simpan Perubahan'}
            </button>
          </form>
        </details>
      </div>
    </article>
  );
}

function PerangkatFields({
  initialData,
}: {
  initialData?:
    PerangkatDesaData;
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <FormInput
        name="nama"
        label="Nama Lengkap"
        defaultValue={
          initialData?.nama ??
          ''
        }
        required
      />

      <FormInput
        name="jabatan"
        label="Jabatan"
        defaultValue={
          initialData?.jabatan ??
          ''
        }
        placeholder="Contoh: Sekretaris Desa"
        required
      />

      <div>
        <label className="mb-2 block text-xs font-extrabold uppercase tracking-[0.1em] text-slate-500">
          Kelompok
        </label>

        <select
          name="kelompok"
          required
          defaultValue={
            initialData?.kelompok ??
            ''
          }
          className={inputClassName}
        >
          <option
            value=""
            disabled
          >
            Pilih kelompok
          </option>

          {KELOMPOK_PERANGKAT.map(
            (kelompok) => (
              <option
                key={kelompok}
                value={kelompok}
              >
                {kelompok}
              </option>
            )
          )}
        </select>
      </div>

      <FormInput
        name="urutan"
        label="Nomor Urutan"
        type="number"
        defaultValue={String(
          initialData?.urutan ??
          1
        )}
        required
      />

      <FormInput
        name="foto_url"
        label="Path Foto"
        defaultValue={
          initialData?.foto_url ??
          ''
        }
        placeholder="/perangkat/nama.jpg"
        icon
      />

      <FormInput
        name="nip"
        label="NIP"
        defaultValue={
          initialData?.nip ??
          ''
        }
      />

      <FormInput
        name="nomor_telepon"
        label="Nomor Telepon"
        defaultValue={
          initialData
            ?.nomor_telepon ??
          ''
        }
      />

      <div className="md:col-span-2">
        <label className="mb-2 block text-xs font-extrabold uppercase tracking-[0.1em] text-slate-500">
          Deskripsi
        </label>

        <textarea
          name="deskripsi"
          rows={4}
          maxLength={2000}
          defaultValue={
            initialData?.deskripsi ??
            ''
          }
          className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold leading-6 outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
        />
      </div>

      <div className="md:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">
          <input
            type="checkbox"
            name="aktif"
            value="true"
            defaultChecked={
              initialData?.aktif ??
              true
            }
            className="mt-1 h-4 w-4 accent-emerald-700"
          />

          <span>
            <span className="block text-sm font-black text-slate-800">
              Tampilkan di halaman publik
            </span>

            <span className="mt-1 block text-xs font-medium text-slate-500">
              Perangkat nonaktif tidak akan muncul pada
              halaman pemerintahan.
            </span>
          </span>
        </label>
      </div>
    </div>
  );
}

function FormInput({
  name,
  label,
  defaultValue,
  placeholder,
  type = 'text',
  required = false,
  icon = false,
}: {
  name: string;
  label: string;
  defaultValue: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  icon?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-extrabold uppercase tracking-[0.1em] text-slate-500">
        {label}
      </label>

      <div className="relative">
        {icon && (
          <ImageIcon
            size={17}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-emerald-700"
          />
        )}

        <input
          name={name}
          type={type}
          required={required}
          min={
            type === 'number'
              ? 1
              : undefined
          }
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={`${inputClassName} ${
            icon ? 'pl-11' : ''
          }`}
        />
      </div>
    </div>
  );
}

function ActionMessage({
  state,
}: {
  state:
    PemerintahanActionState;
}) {
  return (
    <div
      className={`mb-5 flex items-start gap-3 rounded-xl border p-3 ${
        state.success
          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
          : 'border-red-200 bg-red-50 text-red-700'
      }`}
    >
      {state.success ? (
        <CheckCircle2
          size={18}
          className="mt-0.5 shrink-0"
        />
      ) : (
        <CircleAlert
          size={18}
          className="mt-0.5 shrink-0"
        />
      )}

      <p className="text-xs font-semibold leading-5">
        {state.message}
      </p>
    </div>
  );
}