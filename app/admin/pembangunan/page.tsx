// app/admin/pembangunan/page.tsx

import Link from 'next/link';

import {
  AlertCircle,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  ExternalLink,
  HardHat,
  Image as ImageIcon,
  MapPin,
  Pencil,
  Power,
  Save,
  Trash2,
  TrendingUp,
  UploadCloud,
  type LucideIcon,
} from 'lucide-react';

import {
  hapusProyekPembangunanAction,
  tambahProyekPembangunanAction,
  toggleAktifProyekPembangunanAction,
  ubahProyekPembangunanAction,
} from '@/app/admin/pembangunan/actions';

import {
  supabaseAdmin,
} from '@/lib/supabase-admin';

import {
  STATUS_PEMBANGUNAN_OPTIONS,
  type ProyekPembangunan,
  type StatusPembangunan,
} from '@/types/pembangunan';

export const dynamic =
  'force-dynamic';

export const revalidate = 0;

interface PageProps {
  searchParams: Promise<{
    success?: string;
    error?: string;
  }>;
}

function safeString(
  value: unknown
) {
  return String(
    value ?? ''
  ).trim();
}

function nullableString(
  value: unknown
) {
  const text =
    safeString(value);

  return text || null;
}

function isStatusPembangunan(
  value: string
): value is StatusPembangunan {
  return (
    STATUS_PEMBANGUNAN_OPTIONS as readonly string[]
  ).includes(value);
}

function normalizePembangunan(
  value: unknown
): ProyekPembangunan | null {
  if (
    !value ||
    typeof value !==
      'object' ||
    Array.isArray(value)
  ) {
    return null;
  }

  const row =
    value as Record<
      string,
      unknown
    >;

  const id =
    safeString(
      row.id
    );

  const nama =
    safeString(
      row.nama
    );

  const lokasi =
    safeString(
      row.lokasi
    );

  const tahun =
    Number(
      row.tahun ?? 0
    );

  const anggaran =
    Number(
      row.anggaran ?? 0
    );

  const progres =
    Number(
      row.progres ?? 0
    );

  const status =
    safeString(
      row.status
    );

  if (
    !id ||
    !nama ||
    !lokasi ||
    !Number.isInteger(
      tahun
    ) ||
    !Number.isFinite(
      anggaran
    ) ||
    !Number.isInteger(
      progres
    ) ||
    !isStatusPembangunan(
      status
    )
  ) {
    return null;
  }

  return {
    id,
    nama,
    lokasi,
    tahun,

    sumber_dana:
      safeString(
        row.sumber_dana
      ),

    anggaran,
    progres,
    status,

    deskripsi:
      safeString(
        row.deskripsi
      ),

    gambar_url:
      nullableString(
        row.gambar_url
      ),

    aktif:
      Boolean(
        row.aktif
      ),

    urutan:
      Number(
        row.urutan ?? 0
      ),

    created_at:
      safeString(
        row.created_at
      ),

    updated_at:
      safeString(
        row.updated_at
      ),
  };
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
  ).format(
    Number.isFinite(value)
      ? value
      : 0
  );
}

function formatTanggal(
  value: string
) {
  if (!value) {
    return 'Belum diperbarui';
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return 'Belum diperbarui';
  }

  return new Intl.DateTimeFormat(
    'id-ID',
    {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      timeZone:
        'Asia/Jakarta',
    }
  ).format(date);
}

function getStatusClass(
  status: StatusPembangunan
) {
  switch (status) {
    case 'Selesai':
      return 'bg-emerald-100 text-emerald-700';

    case 'Berjalan':
      return 'bg-cyan-100 text-cyan-700';

    case 'Perencanaan':
      return 'bg-amber-100 text-amber-700';
  }
}

export default async function AdminPembangunanPage({
  searchParams,
}: PageProps) {
  const [
    params,
    pembangunanResult,
  ] = await Promise.all([
    searchParams,

    supabaseAdmin
      .from(
        'proyek_pembangunan'
      )
      .select(`
        id,
        nama,
        lokasi,
        tahun,
        sumber_dana,
        anggaran,
        progres,
        status,
        deskripsi,
        gambar_url,
        aktif,
        urutan,
        created_at,
        updated_at
      `)
      .order(
        'tahun',
        {
          ascending: false,
        }
      )
      .order(
        'urutan',
        {
          ascending: true,
        }
      )
      .order(
        'created_at',
        {
          ascending: false,
        }
      ),
  ]);

  if (
    pembangunanResult.error
  ) {
    console.error(
      'Gagal mengambil proyek pembangunan pada admin:',
      {
        message:
          pembangunanResult.error
            .message,

        code:
          pembangunanResult.error
            .code,

        details:
          pembangunanResult.error
            .details,

        hint:
          pembangunanResult.error
            .hint,
      }
    );
  }

  const daftarProyek =
    (
      pembangunanResult.data ??
      []
    )
      .map(
        normalizePembangunan
      )
      .filter(
        (
          item
        ): item is ProyekPembangunan =>
          item !== null
      );

  const proyekAktif =
    daftarProyek.filter(
      (item) =>
        item.aktif
    );

  const proyekBerjalan =
    proyekAktif.filter(
      (item) =>
        item.status ===
        'Berjalan'
    ).length;

  const proyekSelesai =
    proyekAktif.filter(
      (item) =>
        item.status ===
        'Selesai'
    ).length;

  const totalAnggaran =
    proyekAktif.reduce(
      (
        total,
        item
      ) =>
        total +
        item.anggaran,
      0
    );

  const tahunSekarang =
    new Date()
      .getFullYear();

  return (
    <div className="mx-auto max-w-[1500px] space-y-7">
      {/* Header */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-800 to-teal-700 px-6 py-8 text-white shadow-xl">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.14) 1.5px, transparent 1.5px)',

            backgroundSize:
              '26px 26px',
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border-[52px] border-white/[0.05]"
        />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
              <HardHat
                size={28}
              />
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-200">
                Program dan Infrastruktur
              </p>

              <h1 className="mt-2 text-2xl font-black sm:text-3xl">
                Pembangunan Desa Keji
              </h1>

              <p className="mt-2 max-w-3xl text-sm font-medium leading-7 text-emerald-50/80">
                Kelola kegiatan,
                lokasi, sumber dana,
                anggaran, progres,
                status, dokumentasi,
                dan publikasi proyek
                pembangunan desa.
              </p>
            </div>
          </div>

          <Link
            href="/pembangunan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 text-sm font-extrabold text-white transition hover:bg-white/15"
          >
            Lihat Pembangunan

            <ExternalLink
              size={16}
            />
          </Link>
        </div>
      </section>

      {/* Pesan */}
      {params.success && (
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
          <CheckCircle2
            size={20}
            className="mt-0.5 shrink-0"
          />

          <p className="text-sm font-semibold leading-6">
            {params.success}
          </p>
        </div>
      )}

      {params.error && (
        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
          <AlertCircle
            size={20}
            className="mt-0.5 shrink-0"
          />

          <p className="text-sm font-semibold leading-6">
            {params.error}
          </p>
        </div>
      )}

      {/* Statistik */}
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Proyek"
          value={String(
            daftarProyek.length
          )}
          description={`${proyekAktif.length} proyek dipublikasikan`}
          icon={BarChart3}
        />

        <StatCard
          label="Sedang Berjalan"
          value={String(
            proyekBerjalan
          )}
          description="Proyek aktif berstatus berjalan"
          icon={TrendingUp}
        />

        <StatCard
          label="Proyek Selesai"
          value={String(
            proyekSelesai
          )}
          description="Proyek aktif telah selesai"
          icon={CheckCircle2}
        />

        <StatCard
          label="Total Anggaran"
          value={formatRupiah(
            totalAnggaran
          )}
          description="Akumulasi proyek aktif"
          icon={CircleDollarSign}
          compact
        />
      </section>

      {/* Tambah proyek */}
      <form
        id="tambah-pembangunan"
        action={
          tambahProyekPembangunanAction
        }
        encType="multipart/form-data"
        className="scroll-mt-24 overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm"
      >
        <div className="border-b border-emerald-100 bg-gradient-to-r from-emerald-50 to-white px-6 py-5 sm:px-7">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-700 text-white">
              <HardHat
                size={23}
              />
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-emerald-700">
                Proyek Baru
              </p>

              <h2 className="mt-1 text-xl font-black text-slate-900">
                Tambah Proyek
                Pembangunan
              </h2>

              <p className="mt-1 text-sm font-medium text-slate-500">
                Dokumentasi dapat
                dipilih langsung dari
                perangkat.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-7">
          <PembangunanFormFields
            idPrefix="tambah"
            defaultTahun={
              tahunSekarang
            }
            defaultUrutan={
              daftarProyek.length
            }
          />

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 text-sm font-extrabold text-white transition hover:bg-emerald-800 sm:w-auto"
            >
              <Save
                size={17}
              />

              Tambah Proyek
            </button>
          </div>
        </div>
      </form>

      {/* Daftar proyek */}
      <section
        id="daftar-pembangunan"
        className="scroll-mt-24 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
      >
        <div className="border-b border-slate-200 px-6 py-5 sm:px-7">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-emerald-700">
            Data Kegiatan
          </p>

          <h2 className="mt-1 text-xl font-black text-slate-900">
            Daftar Proyek
            Pembangunan
          </h2>

          <p className="mt-1 text-sm font-medium text-slate-500">
            {daftarProyek.length}{' '}
            proyek tersimpan dalam
            database.
          </p>
        </div>

        {daftarProyek.length ===
        0 ? (
          <div className="px-6 py-16 text-center">
            <HardHat
              size={48}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-4 font-black text-slate-700">
              Belum ada proyek
              pembangunan
            </h3>

            <p className="mt-2 text-sm font-medium text-slate-500">
              Tambahkan proyek melalui
              formulir di atas.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 p-5 sm:p-7 xl:grid-cols-2">
            {daftarProyek.map(
              (item) => (
                <PembangunanAdminCard
                  key={item.id}
                  item={item}
                />
              )
            )}
          </div>
        )}
      </section>
    </div>
  );
}

function PembangunanAdminCard({
  item,
}: {
  item: ProyekPembangunan;
}) {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
      {/* Gambar */}
      <div className="relative aspect-[16/8] overflow-hidden bg-slate-200">
        {item.gambar_url ? (
          <img
            src={item.gambar_url}
            alt={item.nama}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-slate-400">
            <ImageIcon
              size={42}
            />

            <p className="mt-2 text-xs font-bold">
              Belum ada dokumentasi
            </p>
          </div>
        )}

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span
            className={`rounded-full px-3 py-1.5 text-[10px] font-extrabold ${getStatusClass(
              item.status
            )}`}
          >
            {item.status}
          </span>

          <span
            className={`rounded-full bg-white px-3 py-1.5 text-[10px] font-extrabold ${
              item.aktif
                ? 'text-emerald-700'
                : 'text-amber-700'
            }`}
          >
            {item.aktif
              ? 'Dipublikasikan'
              : 'Disembunyikan'}
          </span>
        </div>
      </div>

      {/* Informasi */}
      <div className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-emerald-700">
              Tahun {item.tahun}
            </p>

            <h3 className="mt-2 text-xl font-black text-slate-900">
              {item.nama}
            </h3>
          </div>

          <div className="rounded-2xl bg-emerald-700 px-4 py-3 text-right text-white">
            <p className="text-[9px] font-extrabold uppercase tracking-wider text-emerald-200">
              Progres
            </p>

            <p className="mt-1 text-2xl font-black">
              {item.progres}%
            </p>
          </div>
        </div>

        <p className="mt-3 line-clamp-3 text-sm font-medium leading-6 text-slate-500">
          {item.deskripsi}
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <MetaCard
            label="Lokasi"
            value={item.lokasi}
            icon={MapPin}
          />

          <MetaCard
            label="Sumber Dana"
            value={
              item.sumber_dana
            }
            icon={
              CircleDollarSign
            }
          />

          <MetaCard
            label="Anggaran"
            value={formatRupiah(
              item.anggaran
            )}
            icon={
              CircleDollarSign
            }
          />

          <MetaCard
            label="Nomor Urutan"
            value={String(
              item.urutan
            )}
            icon={
              BarChart3
            }
          />
        </div>

        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
            <span>
              Progres Pekerjaan
            </span>

            <span>
              {item.progres}%
            </span>
          </div>

          <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-700 to-emerald-400"
              style={{
                width:
                  `${Math.min(
                    Math.max(
                      item.progres,
                      0
                    ),
                    100
                  )}%`,
              }}
            />
          </div>
        </div>

        <p className="mt-4 flex items-center gap-2 text-[11px] font-semibold text-slate-400">
          <CalendarDays
            size={14}
          />

          Diperbarui{' '}
          {formatTanggal(
            item.updated_at
          )}
        </p>
      </div>

      {/* Aksi */}
      <div className="grid grid-cols-2 gap-2 border-t border-slate-200 bg-white p-4">
        <form
          action={
            toggleAktifProyekPembangunanAction
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
              !item.aktif
            )}
          />

          <button
            type="submit"
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-amber-100 px-3 text-xs font-extrabold text-amber-700 transition hover:bg-amber-200"
          >
            <Power
              size={15}
            />

            {item.aktif
              ? 'Sembunyikan'
              : 'Publikasikan'}
          </button>
        </form>

        <form
          action={
            hapusProyekPembangunanAction
          }
        >
          <input
            type="hidden"
            name="id"
            value={item.id}
          />

          <button
            type="submit"
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-red-100 px-3 text-xs font-extrabold text-red-700 transition hover:bg-red-200"
          >
            <Trash2
              size={15}
            />

            Hapus
          </button>
        </form>
      </div>

      {/* Edit */}
      <details className="border-t border-slate-200 bg-white">
        <summary className="flex cursor-pointer list-none items-center justify-center gap-2 p-4 text-sm font-extrabold text-slate-700">
          <Pencil
            size={16}
          />

          Edit Proyek
        </summary>

        <form
          action={
            ubahProyekPembangunanAction
          }
          encType="multipart/form-data"
          className="border-t border-slate-200 p-5"
        >
          <input
            type="hidden"
            name="id"
            value={item.id}
          />

          <PembangunanFormFields
            idPrefix={`edit-${item.id}`}
            item={item}
          />

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-800 px-6 text-sm font-extrabold text-white transition hover:bg-slate-900 sm:w-auto"
            >
              <Save
                size={17}
              />

              Simpan Perubahan
            </button>
          </div>
        </form>
      </details>
    </article>
  );
}

function PembangunanFormFields({
  idPrefix,
  item,
  defaultTahun,
  defaultUrutan = 0,
}: {
  idPrefix: string;
  item?: ProyekPembangunan;
  defaultTahun?: number;
  defaultUrutan?: number;
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <TextInput
        idPrefix={idPrefix}
        name="nama"
        label="Nama Kegiatan"
        value={
          item?.nama ??
          ''
        }
        placeholder="Contoh: Pembangunan Rabat Beton"
      />

      <TextInput
        idPrefix={idPrefix}
        name="lokasi"
        label="Lokasi"
        value={
          item?.lokasi ??
          ''
        }
        placeholder="Contoh: Dusun Suruhan"
      />

      <NumberInput
        idPrefix={idPrefix}
        name="tahun"
        label="Tahun"
        value={String(
          item?.tahun ??
            defaultTahun ??
            ''
        )}
        min={1900}
        max={2200}
        step="1"
      />

      <TextInput
        idPrefix={idPrefix}
        name="sumber_dana"
        label="Sumber Dana"
        value={
          item?.sumber_dana ??
          ''
        }
        placeholder="Contoh: Dana Desa"
      />

      <NumberInput
        idPrefix={idPrefix}
        name="anggaran"
        label="Anggaran"
        value={String(
          item?.anggaran ??
            0
        )}
        min={0}
        step="1"
        placeholder="100000000"
      />

      <NumberInput
        idPrefix={idPrefix}
        name="progres"
        label="Progres (%)"
        value={String(
          item?.progres ??
            0
        )}
        min={0}
        max={100}
        step="1"
      />

      <SelectStatus
        idPrefix={idPrefix}
        value={
          item?.status ??
          'Perencanaan'
        }
      />

      <NumberInput
        idPrefix={idPrefix}
        name="urutan"
        label="Nomor Urutan"
        value={String(
          item?.urutan ??
            defaultUrutan
        )}
        min={0}
        step="1"
      />

      <div className="md:col-span-2">
        <TextArea
          idPrefix={idPrefix}
          name="deskripsi"
          label="Deskripsi Kegiatan"
          value={
            item?.deskripsi ??
            ''
          }
          placeholder="Jelaskan tujuan, ruang lingkup, dan hasil kegiatan pembangunan."
          rows={5}
        />
      </div>

      <div className="md:col-span-2">
        <FileUploadField
          idPrefix={idPrefix}
          item={item}
        />
      </div>

      <div className="md:col-span-2">
        <Checkbox
          id={`${idPrefix}-aktif`}
          name="aktif"
          label="Publikasikan Proyek"
          description="Proyek ditampilkan pada halaman publik Pembangunan Desa."
          checked={
            item?.aktif ??
            true
          }
        />
      </div>
    </div>
  );
}

function FileUploadField({
  idPrefix,
  item,
}: {
  idPrefix: string;
  item?: ProyekPembangunan;
}) {
  const inputId =
    `${idPrefix}-gambar_file`;

  const removeId =
    `${idPrefix}-hapus_gambar`;

  return (
    <div>
      <label
        htmlFor={inputId}
        className="mb-2 block text-xs font-extrabold uppercase tracking-wider text-slate-500"
      >
        Dokumentasi Gambar
      </label>

      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
            <UploadCloud
              size={23}
            />
          </div>

          <div className="min-w-0 flex-1">
            <input
              id={inputId}
              name="gambar_file"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="block w-full text-sm font-semibold text-slate-600 file:mr-4 file:rounded-xl file:border-0 file:bg-emerald-700 file:px-4 file:py-2.5 file:text-xs file:font-extrabold file:text-white hover:file:bg-emerald-800"
            />

            <p className="mt-2 text-xs font-medium leading-5 text-slate-400">
              Format JPG, PNG, atau WebP.
              Ukuran maksimal 5 MB.
            </p>
          </div>
        </div>

        {item?.gambar_url && (
          <div className="mt-5">
            <p className="mb-2 text-xs font-extrabold uppercase tracking-wider text-slate-500">
              Gambar Saat Ini
            </p>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <img
                src={
                  item.gambar_url
                }
                alt={
                  item.nama
                }
                className="h-56 w-full object-cover"
              />
            </div>

            <label
              htmlFor={removeId}
              className="mt-3 flex cursor-pointer items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4"
            >
              <input
                id={removeId}
                type="checkbox"
                name="hapus_gambar"
                value="true"
                className="mt-1 h-4 w-4 shrink-0 accent-red-600"
              />

              <span>
                <span className="block text-sm font-extrabold text-red-700">
                  Hapus gambar saat ini
                </span>

                <span className="mt-1 block text-xs font-medium leading-5 text-red-600/80">
                  Centang apabila gambar
                  ingin dihapus tanpa
                  mengunggah gambar baru.
                </span>
              </span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  description,
  icon: Icon,
  compact = false,
}: {
  label: string;
  value: string;
  description: string;
  icon: LucideIcon;
  compact?: boolean;
}) {
  return (
    <article className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
            {label}
          </p>

          <p
            className={`mt-3 break-words font-black text-slate-900 ${
              compact
                ? 'text-xl'
                : 'text-4xl'
            }`}
          >
            {value}
          </p>

          <p className="mt-2 text-xs font-semibold text-slate-500">
            {description}
          </p>
        </div>

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
          <Icon
            size={22}
          />
        </div>
      </div>
    </article>
  );
}

function MetaCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
}) {
  return (
    <div className="rounded-2xl bg-white p-4">
      <div className="flex items-start gap-3">
        <Icon
          size={16}
          className="mt-0.5 shrink-0 text-emerald-700"
        />

        <div className="min-w-0">
          <p className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-slate-400">
            {label}
          </p>

          <p className="mt-1 break-words text-xs font-black leading-5 text-slate-700">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

function TextInput({
  idPrefix,
  name,
  label,
  value = '',
  placeholder,
  required = true,
}: {
  idPrefix: string;
  name: string;
  label: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
}) {
  const id =
    `${idPrefix}-${name}`;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-extrabold uppercase tracking-wider text-slate-500"
      >
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <input
        id={id}
        name={name}
        type="text"
        required={required}
        defaultValue={value}
        placeholder={placeholder}
        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-800 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
      />
    </div>
  );
}

function NumberInput({
  idPrefix,
  name,
  label,
  value,
  placeholder,
  min,
  max,
  step,
}: {
  idPrefix: string;
  name: string;
  label: string;
  value: string;
  placeholder?: string;
  min: number;
  max?: number;
  step: string;
}) {
  const id =
    `${idPrefix}-${name}`;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-extrabold uppercase tracking-wider text-slate-500"
      >
        {label}

        <span className="ml-1 text-red-500">
          *
        </span>
      </label>

      <input
        id={id}
        name={name}
        type="number"
        required
        min={min}
        max={max}
        step={step}
        defaultValue={value}
        placeholder={placeholder}
        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-800 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
      />
    </div>
  );
}

function SelectStatus({
  idPrefix,
  value,
}: {
  idPrefix: string;
  value: StatusPembangunan;
}) {
  const id =
    `${idPrefix}-status`;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-extrabold uppercase tracking-wider text-slate-500"
      >
        Status Pembangunan

        <span className="ml-1 text-red-500">
          *
        </span>
      </label>

      <select
        id={id}
        name="status"
        required
        defaultValue={value}
        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-800 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
      >
        {STATUS_PEMBANGUNAN_OPTIONS.map(
          (status) => (
            <option
              key={status}
              value={status}
            >
              {status}
            </option>
          )
        )}
      </select>
    </div>
  );
}

function TextArea({
  idPrefix,
  name,
  label,
  value,
  placeholder,
  rows = 4,
}: {
  idPrefix: string;
  name: string;
  label: string;
  value: string;
  placeholder?: string;
  rows?: number;
}) {
  const id =
    `${idPrefix}-${name}`;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-extrabold uppercase tracking-wider text-slate-500"
      >
        {label}

        <span className="ml-1 text-red-500">
          *
        </span>
      </label>

      <textarea
        id={id}
        name={name}
        rows={rows}
        required
        defaultValue={value}
        placeholder={placeholder}
        className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold leading-7 text-slate-800 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
      />
    </div>
  );
}

function Checkbox({
  id,
  name,
  label,
  description,
  checked,
}: {
  id: string;
  name: string;
  label: string;
  description: string;
  checked: boolean;
}) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
    >
      <input
        id={id}
        type="checkbox"
        name={name}
        value="true"
        defaultChecked={checked}
        className="mt-1 h-4 w-4 shrink-0 accent-emerald-700"
      />

      <span>
        <span className="block text-sm font-extrabold text-slate-700">
          {label}
        </span>

        <span className="mt-1 block text-xs font-medium leading-5 text-slate-500">
          {description}
        </span>
      </span>
    </label>
  );
}