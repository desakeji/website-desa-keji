// components/umkm/LapakDesaClient.tsx

'use client';

import {
  useMemo,
  useState,
  type FormEvent,
} from 'react';

import {
  BadgeCheck,
  ExternalLink,
  FileText,
  MapPin,
  PackageSearch,
  Search,
  ShoppingBag,
  ShoppingCart,
  Store,
  UserRound,
} from 'lucide-react';

import type { ProdukUmkm } from '@/types/umkm';

interface EcatalogUmkm {
  judul: string;
  deskripsi: string;
  url: string;
}

interface LapakDesaClientProps {
  produk: ProdukUmkm[];
  kategori: string[];
  ecatalog: EcatalogUmkm | null;
}

function formatRupiah(
  value: number
) {
  return new Intl.NumberFormat(
    'id-ID',
    {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }
  ).format(value);
}

function normalizeWhatsapp(
  value: string | null
) {
  if (!value) {
    return null;
  }

  let nomor =
    value.replace(/\D/g, '');

  if (nomor.startsWith('0')) {
    nomor =
      `62${nomor.slice(1)}`;
  }

  if (nomor.startsWith('8')) {
    nomor = `62${nomor}`;
  }

  return nomor.length >= 10
    ? nomor
    : null;
}

function getWhatsappUrl(
  item: ProdukUmkm
) {
  const nomor =
    normalizeWhatsapp(
      item.nomor_whatsapp
    );

  if (!nomor) {
    return null;
  }

  const pesan = [
    'Halo, saya mendapatkan informasi produk dari Website Desa Keji.',
    '',
    `Saya tertarik membeli: ${item.nama_produk}`,
    `Harga: ${formatRupiah(
      item.harga
    )} / ${item.satuan}`,
    '',
    'Apakah produk masih tersedia?',
  ].join('\n');

  return `https://wa.me/${nomor}?text=${encodeURIComponent(
    pesan
  )}`;
}

export default function LapakDesaClient({
  produk,
  kategori,
  ecatalog,
}: LapakDesaClientProps) {
  const [
    kategoriAktif,
    setKategoriAktif,
  ] = useState(
    'Semua Kategori'
  );

  const [
    inputPencarian,
    setInputPencarian,
  ] = useState('');

  const [
    pencarian,
    setPencarian,
  ] = useState('');

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setPencarian(
      inputPencarian.trim()
    );
  }

  function resetFilter() {
    setKategoriAktif(
      'Semua Kategori'
    );

    setInputPencarian('');
    setPencarian('');
  }

  const produkTersaring =
    useMemo(() => {
      const query =
        pencarian
          .trim()
          .toLowerCase();

      return produk.filter(
        (item) => {
          const sesuaiKategori =
            kategoriAktif ===
              'Semua Kategori' ||
            item.kategori ===
              kategoriAktif;

          const teksPencarian =
            [
              item.nama_produk,
              item.kategori,
              item.deskripsi ?? '',
              item.nama_penjual,
              item.alamat ?? '',
            ]
              .join(' ')
              .toLowerCase();

          const sesuaiPencarian =
            query.length === 0 ||
            teksPencarian.includes(
              query
            );

          return (
            sesuaiKategori &&
            sesuaiPencarian
          );
        }
      );
    }, [
      kategoriAktif,
      pencarian,
      produk,
    ]);

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* Header */}
          <div className="border-b border-slate-200 px-5 py-5 md:px-7">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <ShoppingBag
                  size={23}
                />
              </div>

              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-600">
                  Produk Lokal Desa
                </p>

                <h1 className="mt-1 text-2xl font-black text-slate-900 md:text-3xl">
                  Lapak Desa Keji
                </h1>
              </div>
            </div>

            <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-slate-500">
              Temukan produk makanan,
              minuman, kerajinan, dan
              berbagai produk UMKM
              masyarakat Desa Keji.
            </p>
          </div>

          {/* E-Catalog Produk UMKM */}
          <section className="border-b border-slate-200 bg-gradient-to-r from-emerald-950 via-emerald-800 to-teal-700 p-5 text-white md:p-7">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
                  <FileText size={23} />
                </div>

                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-emerald-200">
                    Katalog Digital UMKM
                  </p>

                  <h2 className="mt-2 text-xl font-black md:text-2xl">
                    {ecatalog
                      ? ecatalog.judul
                      : 'E-Catalog Produk UMKM Desa Keji'}
                  </h2>

                  <p className="mt-2 max-w-3xl text-sm font-medium leading-7 text-emerald-50/80">
                    {ecatalog
                      ? ecatalog.deskripsi
                      : 'E-Catalog sedang disiapkan dan akan segera tersedia untuk masyarakat.'}
                  </p>
                </div>
              </div>

              {ecatalog ? (
                <a
                  href={ecatalog.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-extrabold text-emerald-900 shadow-lg transition hover:bg-emerald-50"
                >
                  <FileText size={17} />

                  Buka E-Catalog

                  <ExternalLink
                    size={15}
                  />
                </a>
              ) : (
                <span className="inline-flex min-h-12 shrink-0 cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-6 text-sm font-extrabold text-emerald-100">
                  <FileText size={17} />

                  E-Catalog Disiapkan
                </span>
              )}
            </div>
          </section>

          {/* Filter Produk */}
          <form
            onSubmit={handleSubmit}
            className="grid gap-3 border-b border-slate-200 bg-slate-50/70 p-5 md:grid-cols-[minmax(230px,0.8fr)_minmax(260px,1fr)_auto] md:p-7"
          >
            <label
              htmlFor="kategori-umkm"
              className="sr-only"
            >
              Pilih kategori
            </label>

            <select
              id="kategori-umkm"
              value={kategoriAktif}
              onChange={(event) =>
                setKategoriAktif(
                  event.target.value
                )
              }
              className="h-12 w-full rounded-xl border-2 border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
            >
              <option value="Semua Kategori">
                Semua Kategori
              </option>

              {kategori.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                )
              )}
            </select>

            <div className="relative">
              <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="search"
                value={
                  inputPencarian
                }
                onChange={(event) =>
                  setInputPencarian(
                    event.target.value
                  )
                }
                placeholder="Cari produk atau penjual"
                className="h-12 w-full rounded-xl border-2 border-slate-200 bg-white pl-11 pr-4 text-sm font-semibold text-slate-700 outline-none transition placeholder:font-medium placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              />
            </div>

            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 text-sm font-extrabold text-white shadow-md transition hover:bg-emerald-800"
            >
              <Search size={17} />

              Cari
            </button>
          </form>

          {/* Ringkasan */}
          <div className="flex flex-col gap-2 px-5 pt-5 sm:flex-row sm:items-center sm:justify-between md:px-7">
            <p className="text-sm font-bold text-slate-700">
              Menampilkan{' '}
              <span className="text-emerald-700">
                {
                  produkTersaring.length
                }
              </span>{' '}
              produk
            </p>

            {(pencarian ||
              kategoriAktif !==
                'Semua Kategori') && (
              <button
                type="button"
                onClick={resetFilter}
                className="w-fit text-xs font-extrabold text-emerald-700 transition hover:text-emerald-900"
              >
                Hapus filter
              </button>
            )}
          </div>

          {/* Daftar Produk */}
          <div className="p-5 md:p-7">
            {produkTersaring.length >
            0 ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {produkTersaring.map(
                  (item) => (
                    <ProdukCard
                      key={item.id}
                      item={item}
                    />
                  )
                )}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
                <PackageSearch
                  size={48}
                  className="mx-auto text-slate-300"
                />

                <h2 className="mt-4 text-lg font-black text-slate-800">
                  Produk tidak ditemukan
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm font-medium leading-6 text-slate-500">
                  Gunakan kata kunci
                  lain atau pilih semua
                  kategori untuk melihat
                  produk yang tersedia.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function ProdukCard({
  item,
}: {
  item: ProdukUmkm;
}) {
  const whatsappUrl =
    getWhatsappUrl(item);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl">
      {/* Gambar Produk */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        {item.gambar_url ? (
          <img
            src={item.gambar_url}
            alt={item.nama_produk}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center text-slate-300">
            <ShoppingBag
              size={44}
            />

            <span className="mt-2 text-xs font-bold">
              Belum ada foto
            </span>
          </div>
        )}

        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wide text-emerald-700 shadow-sm backdrop-blur">
          {item.kategori}
        </span>
      </div>

      {/* Informasi Produk */}
      <div className="flex flex-1 flex-col p-5">
        <h2 className="text-lg font-black leading-snug text-slate-900">
          {item.nama_produk}
        </h2>

        <div className="mt-2 flex flex-wrap items-end gap-1">
          <p className="text-xl font-black text-emerald-800">
            {formatRupiah(
              item.harga
            )}
          </p>

          <span className="pb-0.5 text-xs font-semibold text-slate-500">
            / {item.satuan}
          </span>
        </div>

        {item.deskripsi && (
          <p className="mt-3 line-clamp-4 text-sm font-medium leading-6 text-slate-600">
            {item.deskripsi}
          </p>
        )}

        <div className="mt-4 flex items-start gap-2">
          <UserRound
            size={15}
            className="mt-0.5 shrink-0 text-slate-500"
          />

          <div className="flex min-w-0 items-center gap-1.5">
            <p className="truncate text-xs font-black uppercase tracking-wide text-slate-700">
              {item.nama_penjual}
            </p>

            {item.terverifikasi && (
              <BadgeCheck
                size={17}
                className="shrink-0 fill-emerald-500 text-white"
              />
            )}
          </div>
        </div>

        {item.alamat && (
          <div className="mt-3 flex items-start gap-2 text-xs font-medium leading-5 text-slate-500">
            <Store
              size={14}
              className="mt-0.5 shrink-0"
            />

            <span>
              {item.alamat}
            </span>
          </div>
        )}

        {/* Tombol Produk */}
        <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-3 text-xs font-extrabold text-white transition hover:bg-emerald-800"
            >
              <ShoppingCart
                size={15}
              />

              Beli Sekarang
            </a>
          ) : (
            <span className="inline-flex min-h-11 cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-slate-200 px-3 text-xs font-extrabold text-slate-400">
              <ShoppingCart
                size={15}
              />

              Beli Sekarang
            </span>
          )}

          {item.lokasi_url ? (
            <a
              href={item.lokasi_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-cyan-600 px-3 text-xs font-extrabold text-white transition hover:bg-cyan-700"
            >
              <MapPin size={15} />

              Lokasi
            </a>
          ) : (
            <span className="inline-flex min-h-11 cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-slate-100 px-3 text-xs font-extrabold text-slate-400">
              <MapPin size={15} />

              Lokasi
            </span>
          )}
        </div>
      </div>
    </article>
  );
}