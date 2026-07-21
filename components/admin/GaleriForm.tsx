// components/admin/GaleriForm.tsx

'use client';

import {
  useActionState,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  CircleAlert,
  ImagePlus,
  Images,
  LoaderCircle,
  Save,
} from 'lucide-react';

import {
  createAlbumAction,
} from '@/app/admin/galeri/actions';

import type {
  GaleriActionState,
} from '@/types/galeri';

const initialState:
  GaleriActionState = {
    error: null,
    success: null,
  };

const KATEGORI_GALERI = [
  'Pemerintahan',
  'Kegiatan Masyarakat',
  'Budaya dan Tradisi',
  'Pembangunan',
  'UMKM',
  'Desa Wisata',
  'Karang Taruna',
  'KKN dan Kolaborasi',
];

export default function GaleriForm() {
  const formRef =
    useRef<HTMLFormElement>(null);

  const [
    jumlahFoto,
    setJumlahFoto,
  ] = useState(0);

  const [
    state,
    formAction,
    isPending,
  ] = useActionState(
    createAlbumAction,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      setJumlahFoto(0);
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
          <Images size={24} />
        </div>

        <div>
          <h2 className="text-xl font-black text-slate-900">
            Tambah Album Galeri
          </h2>

          <p className="mt-1 text-sm leading-relaxed text-slate-500">
            Buat album baru dan unggah dokumentasi
            kegiatan Desa Keji.
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
            Judul Album
          </label>

          <input
            id="judul"
            name="judul"
            type="text"
            required
            minLength={3}
            maxLength={180}
            disabled={isPending}
            placeholder="Contoh: Keji Fest 2026"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:opacity-60"
          />
        </div>

        <div>
          <label
            htmlFor="kategori"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Kategori
          </label>

          <select
            id="kategori"
            name="kategori"
            required
            defaultValue=""
            disabled={isPending}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:opacity-60"
          >
            <option
              value=""
              disabled
            >
              Pilih kategori
            </option>

            {KATEGORI_GALERI.map(
              (kategori) => (
                <option
                  key={kategori}
                  value={kategori}
                >
                  {kategori}
                </option>
              )
            )}
          </select>
        </div>

        <div>
          <label
            htmlFor="tanggal_kegiatan"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Tanggal Kegiatan
          </label>

          <input
            id="tanggal_kegiatan"
            name="tanggal_kegiatan"
            type="date"
            disabled={isPending}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:opacity-60"
          />
        </div>

        <div>
          <label
            htmlFor="lokasi"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Lokasi
          </label>

          <input
            id="lokasi"
            name="lokasi"
            type="text"
            maxLength={180}
            disabled={isPending}
            placeholder="Contoh: Balai Desa Keji"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:opacity-60"
          />
        </div>

        <div>
          <label
            htmlFor="urutan"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Urutan
          </label>

          <input
            id="urutan"
            name="urutan"
            type="number"
            min={0}
            defaultValue={0}
            disabled={isPending}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:opacity-60"
          />
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="deskripsi"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Deskripsi Album
          </label>

          <textarea
            id="deskripsi"
            name="deskripsi"
            rows={4}
            maxLength={3000}
            disabled={isPending}
            placeholder="Jelaskan kegiatan atau dokumentasi pada album ini."
            className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium leading-relaxed text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:opacity-60"
          />
        </div>

        <div>
          <label
            htmlFor="foto_sampul"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Foto Sampul
          </label>

          <label className="flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-emerald-200 bg-emerald-50/50 p-5 text-center transition hover:border-emerald-400 hover:bg-emerald-50">
            <ImagePlus
              size={30}
              className="text-emerald-600"
            />

            <span className="mt-3 text-sm font-bold text-slate-700">
              Pilih foto sampul
            </span>

            <span className="mt-1 text-xs text-slate-400">
              JPG, PNG, atau WebP. Maksimal 5 MB.
            </span>

            <input
              id="foto_sampul"
              name="foto_sampul"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              required
              disabled={isPending}
              className="sr-only"
            />
          </label>
        </div>

        <div>
          <label
            htmlFor="foto_album"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Foto Album
          </label>

          <label className="flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-cyan-200 bg-cyan-50/50 p-5 text-center transition hover:border-cyan-400 hover:bg-cyan-50">
            <Images
              size={30}
              className="text-cyan-700"
            />

            <span className="mt-3 text-sm font-bold text-slate-700">
              Pilih beberapa foto
            </span>

            <span className="mt-1 text-xs text-slate-400">
              Maksimal 8 foto dalam satu kali unggah.
            </span>

            <span className="mt-2 text-xs font-extrabold text-cyan-700">
              {jumlahFoto} foto dipilih
            </span>

            <input
              id="foto_album"
              name="foto_album"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              disabled={isPending}
              className="sr-only"
              onChange={(event) => {
                setJumlahFoto(
                  event.currentTarget
                    .files?.length ?? 0
                );
              }}
            />
          </label>
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
              Publikasikan album
            </span>

            <span className="mt-1 block text-xs leading-relaxed text-emerald-700">
              Album langsung tampil pada halaman publik
              setelah berhasil disimpan.
            </span>
          </span>
        </label>
      </div>

      <div className="flex justify-end border-t border-slate-100 pt-6">
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

              Mengunggah Album...
            </>
          ) : (
            <>
              <Save size={18} />
              Simpan Album
            </>
          )}
        </button>
      </div>
    </form>
  );
}