// app/admin/tilik-arkeji/media/page.tsx

import Link from 'next/link';

import {
  AlertCircle,
  Archive,
  BadgeCheck,
  CheckCircle2,
  ExternalLink,
  FolderOpen,
  Image as ImageIcon,
  Images,
  Landmark,
  Pencil,
  Power,
  Save,
  Trash2,
  Upload,
  Users,
} from 'lucide-react';

import {
  hapusMediaTilikAction,
  simpanFotoMantanKadesAction,
  simpanFotoPenghargaanAction,
  simpanPengaturanDriveAction,
  tambahMediaTilikAction,
  toggleMediaTilikAction,
  ubahMediaTilikAction,
} from '@/app/admin/tilik-arkeji/media/actions';

import {
  getGoogleDriveImageUrl,
} from '@/lib/google-drive';

import {
  supabaseAdmin,
} from '@/lib/supabase-admin';

export const dynamic =
  'force-dynamic';

export const revalidate = 0;

interface PageProps {
  searchParams: Promise<{
    success?: string;
    error?: string;
  }>;
}

interface Settings {
  drive_utama_url: string;
  struktur_drive_url: string;
  penghargaan_drive_url: string;
  galeri_drive_url: string;
}

interface KepalaDesa {
  id: string;
  nama: string;
  periode_mulai: number;
  periode_selesai: number | null;
  foto_url: string;
}

interface Penghargaan {
  id: string;
  nama_penghargaan: string;
  tahun: number;
  foto_url: string;
}

interface MediaTilik {
  id: string;
  kategori:
    | 'struktur-organisasi'
    | 'galeri-desa';
  judul: string;
  deskripsi: string;
  gambar_url: string;
  urutan: number;
  aktif: boolean;
}

function safeString(
  value: unknown
) {
  return String(
    value ?? ''
  ).trim();
}

export default async function AdminMediaTilikPage({
  searchParams,
}: PageProps) {
  const [
    params,
    settingsResult,
    kepalaDesaResult,
    penghargaanResult,
    mediaResult,
  ] = await Promise.all([
    searchParams,

    supabaseAdmin
      .from(
        'tilik_arkeji_settings'
      )
      .select(`
        drive_utama_url,
        struktur_drive_url,
        penghargaan_drive_url,
        galeri_drive_url
      `)
      .eq(
        'setting_key',
        'utama'
      )
      .maybeSingle(),

    supabaseAdmin
      .from(
        'tilik_arkeji_mantan_kades'
      )
      .select(`
        id,
        nama,
        periode_mulai,
        periode_selesai,
        foto_url
      `)
      .order('urutan', {
        ascending: true,
      }),

    supabaseAdmin
      .from(
        'tilik_arkeji_penghargaan'
      )
      .select(`
        id,
        nama_penghargaan,
        tahun,
        foto_url
      `)
      .order('urutan', {
        ascending: true,
      }),

    supabaseAdmin
      .from(
        'tilik_arkeji_media'
      )
      .select(`
        id,
        kategori,
        judul,
        deskripsi,
        gambar_url,
        urutan,
        aktif
      `)
      .order('kategori', {
        ascending: true,
      })
      .order('urutan', {
        ascending: true,
      }),
  ]);

  const settings:
    Settings = {
    drive_utama_url:
      safeString(
        settingsResult.data
          ?.drive_utama_url
      ),

    struktur_drive_url:
      safeString(
        settingsResult.data
          ?.struktur_drive_url
      ),

    penghargaan_drive_url:
      safeString(
        settingsResult.data
          ?.penghargaan_drive_url
      ),

    galeri_drive_url:
      safeString(
        settingsResult.data
          ?.galeri_drive_url
      ),
  };

  const kepalaDesa =
    (
      kepalaDesaResult.data ??
      []
    ).map(
      (
        row
      ): KepalaDesa => ({
        id:
          safeString(row.id),

        nama:
          safeString(row.nama),

        periode_mulai:
          Number(
            row.periode_mulai ??
              0
          ),

        periode_selesai:
          row.periode_selesai ===
            null
            ? null
            : Number(
                row.periode_selesai
              ),

        foto_url:
          safeString(
            row.foto_url
          ),
      })
    );

  const penghargaan =
    (
      penghargaanResult.data ??
      []
    ).map(
      (
        row
      ): Penghargaan => ({
        id:
          safeString(row.id),

        nama_penghargaan:
          safeString(
            row.nama_penghargaan
          ),

        tahun:
          Number(
            row.tahun ?? 0
          ),

        foto_url:
          safeString(
            row.foto_url
          ),
      })
    );

  const daftarMedia =
    (
      mediaResult.data ?? []
    ).map(
      (
        row
      ): MediaTilik => ({
        id:
          safeString(row.id),

        kategori:
          row.kategori ===
          'struktur-organisasi'
            ? 'struktur-organisasi'
            : 'galeri-desa',

        judul:
          safeString(row.judul),

        deskripsi:
          safeString(
            row.deskripsi
          ),

        gambar_url:
          safeString(
            row.gambar_url
          ),

        urutan:
          Number(
            row.urutan ?? 0
          ),

        aktif:
          Boolean(row.aktif),
      })
    );

  return (
    <div className="mx-auto max-w-[1500px] space-y-7">
      {/* Header */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-800 to-emerald-700 px-6 py-8 text-white shadow-xl">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)',

            backgroundSize:
              '25px 25px',
          }}
        />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
              <Images size={27} />
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-200">
                Media Tilik Arkeji
              </p>

              <h1 className="mt-2 text-2xl font-black sm:text-3xl">
                Kelola Foto dan Drive
              </h1>

              <p className="mt-2 max-w-3xl text-sm font-medium leading-7 text-emerald-50/80">
                Masukkan link file gambar
                Google Drive untuk kepala
                desa, penghargaan, struktur
                organisasi, dan galeri.
              </p>
            </div>
          </div>

          <Link
            href="/profil/tilik-arkeji"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-extrabold text-emerald-900"
          >
            Lihat Halaman Publik

            <ExternalLink size={16} />
          </Link>
        </div>
      </section>

      {params.success && (
        <Message
          success
          text={params.success}
        />
      )}

      {params.error && (
        <Message
          text={params.error}
        />
      )}

      {/* Petunjuk */}
      <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
        <h2 className="font-black text-emerald-950">
          Cara memasukkan gambar Drive
        </h2>

        <div className="mt-4 grid gap-3 text-sm font-semibold leading-6 text-emerald-800 md:grid-cols-3">
          <p>
            1. Buka gambar di Google
            Drive.
          </p>

          <p>
            2. Ubah akses menjadi siapa
            saja yang memiliki link.
          </p>

          <p>
            3. Salin link file, bukan
            link folder.
          </p>
        </div>
      </section>

      {/* Link folder */}
      <form
        id="pengaturan-drive"
        action={
          simpanPengaturanDriveAction
        }
        className="scroll-mt-24 overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm"
      >
        <SectionHeader
          icon={FolderOpen}
          label="Folder Sumber"
          title="Pengaturan Google Drive"
          description="Folder ini akan ditampilkan sebagai tombol menuju arsip lengkap."
        />

        <div className="grid gap-5 p-6 md:grid-cols-2">
          <TextInput
            id="drive-utama"
            name="drive_utama_url"
            label="Folder Drive Utama"
            value={
              settings.drive_utama_url
            }
          />

          <TextInput
            id="drive-struktur"
            name="struktur_drive_url"
            label="Folder Struktur Organisasi"
            value={
              settings.struktur_drive_url
            }
          />

          <TextInput
            id="drive-penghargaan"
            name="penghargaan_drive_url"
            label="Folder Pencapaian Desa"
            value={
              settings.penghargaan_drive_url
            }
          />

          <TextInput
            id="drive-galeri"
            name="galeri_drive_url"
            label="Folder Galeri Desa"
            value={
              settings.galeri_drive_url
            }
          />

          <div className="flex justify-end md:col-span-2">
            <SaveButton text="Simpan Link Drive" />
          </div>
        </div>
      </form>

      {/* Foto kepala desa */}
      <section
        id="foto-kepala-desa"
        className="scroll-mt-24 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
      >
        <SectionHeader
          icon={Users}
          label="Arsip Kepemimpinan"
          title="Foto Kepala Desa"
          description="Masukkan satu link file Google Drive untuk setiap kepala desa."
        />

        <div className="grid gap-5 p-5 md:grid-cols-2">
          {kepalaDesa.map(
            (item) => (
              <PhotoUrlCard
                key={item.id}
                id={item.id}
                title={item.nama}
                subtitle={`${item.periode_mulai}–${item.periode_selesai ?? 'sekarang'}`}
                imageUrl={
                  item.foto_url
                }
                action={
                  simpanFotoMantanKadesAction
                }
              />
            )
          )}
        </div>
      </section>

      {/* Foto penghargaan */}
      <section
        id="foto-penghargaan"
        className="scroll-mt-24 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
      >
        <SectionHeader
          icon={BadgeCheck}
          label="Pencapaian Desa"
          title="Foto Penghargaan"
          description="Masukkan link dokumentasi penghargaan yang sesuai."
        />

        <div className="grid gap-5 p-5 md:grid-cols-2">
          {penghargaan.length >
          0 ? (
            penghargaan.map(
              (item) => (
                <PhotoUrlCard
                  key={item.id}
                  id={item.id}
                  title={
                    item.nama_penghargaan
                  }
                  subtitle={String(
                    item.tahun
                  )}
                  imageUrl={
                    item.foto_url
                  }
                  action={
                    simpanFotoPenghargaanAction
                  }
                />
              )
            )
          ) : (
            <EmptyState text="Belum ada data penghargaan." />
          )}
        </div>
      </section>

      {/* Tambah media */}
      <form
        id="tambah-media"
        action={
          tambahMediaTilikAction
        }
        className="scroll-mt-24 overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm"
      >
        <SectionHeader
          icon={Upload}
          label="Media Baru"
          title="Tambah Struktur atau Galeri"
          description="Setiap gambar dimasukkan menggunakan link file Google Drive."
        />

        <div className="grid gap-5 p-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="media-kategori"
              className="mb-2 block text-xs font-extrabold uppercase tracking-wider text-slate-500"
            >
              Kategori
            </label>

            <select
              id="media-kategori"
              name="kategori"
              required
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold"
            >
              <option value="struktur-organisasi">
                Struktur Organisasi
              </option>

              <option value="galeri-desa">
                Galeri Desa
              </option>
            </select>
          </div>

          <TextInput
            id="media-judul"
            name="judul"
            label="Judul"
          />

          <div className="md:col-span-2">
            <TextInput
              id="media-gambar"
              name="gambar_url"
              label="Link File Gambar Drive"
            />
          </div>

          <div className="md:col-span-2">
            <TextArea
              id="media-deskripsi"
              name="deskripsi"
              label="Deskripsi"
            />
          </div>

          <TextInput
            id="media-urutan"
            name="urutan"
            label="Nomor Urutan"
            type="number"
            value={String(
              daftarMedia.length
            )}
          />

          <Checkbox
            id="media-aktif"
            name="aktif"
            label="Publikasikan Media"
            checked
          />

          <div className="flex justify-end md:col-span-2">
            <SaveButton text="Tambah Media" />
          </div>
        </div>
      </form>

      {/* Daftar media */}
      <section
        id="daftar-media"
        className="scroll-mt-24 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
      >
        <SectionHeader
          icon={Images}
          label="Media Tersimpan"
          title="Struktur dan Galeri"
          description={`${daftarMedia.length} media tersimpan.`}
        />

        <div className="grid gap-5 p-5 md:grid-cols-2">
          {daftarMedia.length >
          0 ? (
            daftarMedia.map(
              (media) => (
                <MediaAdminCard
                  key={media.id}
                  media={media}
                />
              )
            )
          ) : (
            <EmptyState text="Belum ada media struktur atau galeri." />
          )}
        </div>
      </section>
    </div>
  );
}

function PhotoUrlCard({
  id,
  title,
  subtitle,
  imageUrl,
  action,
}: {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  action: (
    formData: FormData
  ) => Promise<void>;
}) {
  const previewUrl =
    getGoogleDriveImageUrl(
      imageUrl,
      900
    );

  return (
    <form
      action={action}
      className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
    >
      <input
        type="hidden"
        name="id"
        value={id}
      />

      <div className="aspect-[16/9] bg-emerald-950">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt={title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-emerald-200">
            <ImageIcon size={42} />
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-black text-slate-900">
          {title}
        </h3>

        <p className="mt-1 text-xs font-bold text-emerald-700">
          {subtitle}
        </p>

        <label className="mt-4 block text-xs font-extrabold uppercase text-slate-500">
          Link file gambar
        </label>

        <input
          type="url"
          name="foto_url"
          defaultValue={imageUrl}
          placeholder="https://drive.google.com/file/d/..."
          className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold"
        />

        <button
          type="submit"
          className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 text-sm font-extrabold text-white hover:bg-emerald-800"
        >
          <Save size={16} />

          Simpan Foto
        </button>
      </div>
    </form>
  );
}

function MediaAdminCard({
  media,
}: {
  media: MediaTilik;
}) {
  const previewUrl =
    getGoogleDriveImageUrl(
      media.gambar_url,
      1000
    );

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
      <div className="aspect-[16/10] bg-emerald-950">
        {previewUrl && (
          <img
            src={previewUrl}
            alt={media.judul}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <div className="p-5">
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-extrabold uppercase text-emerald-700">
          {media.kategori ===
          'struktur-organisasi'
            ? 'Struktur Organisasi'
            : 'Galeri Desa'}
        </span>

        <h3 className="mt-3 text-lg font-black text-slate-900">
          {media.judul}
        </h3>

        <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
          {media.deskripsi ||
            'Tidak ada deskripsi.'}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 border-t border-slate-200 bg-white p-4">
        <form
          action={
            toggleMediaTilikAction
          }
        >
          <input
            type="hidden"
            name="id"
            value={media.id}
          />

          <input
            type="hidden"
            name="aktif"
            value={String(
              !media.aktif
            )}
          />

          <button
            type="submit"
            className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-emerald-100 text-xs font-extrabold text-emerald-700"
          >
            <Power size={15} />

            {media.aktif
              ? 'Sembunyikan'
              : 'Publikasikan'}
          </button>
        </form>

        <form
          action={
            hapusMediaTilikAction
          }
        >
          <input
            type="hidden"
            name="id"
            value={media.id}
          />

          <button
            type="submit"
            className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-red-100 text-xs font-extrabold text-red-700"
          >
            <Trash2 size={15} />

            Hapus
          </button>
        </form>
      </div>

      <details className="border-t border-slate-200 bg-white">
        <summary className="flex cursor-pointer items-center justify-center gap-2 p-4 text-sm font-extrabold text-slate-700">
          <Pencil size={16} />

          Edit Media
        </summary>

        <form
          action={
            ubahMediaTilikAction
          }
          className="grid gap-4 border-t border-slate-200 p-5"
        >
          <input
            type="hidden"
            name="id"
            value={media.id}
          />

          <select
            name="kategori"
            defaultValue={
              media.kategori
            }
            className="h-12 rounded-xl border border-slate-200 px-4 text-sm font-semibold"
          >
            <option value="struktur-organisasi">
              Struktur Organisasi
            </option>

            <option value="galeri-desa">
              Galeri Desa
            </option>
          </select>

          <input
            name="judul"
            required
            defaultValue={
              media.judul
            }
            className="h-12 rounded-xl border border-slate-200 px-4 text-sm font-semibold"
          />

          <input
            name="gambar_url"
            type="url"
            required
            defaultValue={
              media.gambar_url
            }
            className="h-12 rounded-xl border border-slate-200 px-4 text-sm font-semibold"
          />

          <textarea
            name="deskripsi"
            rows={4}
            defaultValue={
              media.deskripsi
            }
            className="rounded-xl border border-slate-200 p-4 text-sm font-semibold"
          />

          <input
            name="urutan"
            type="number"
            min={0}
            required
            defaultValue={
              media.urutan
            }
            className="h-12 rounded-xl border border-slate-200 px-4 text-sm font-semibold"
          />

          <Checkbox
            id={`media-${media.id}-aktif`}
            name="aktif"
            label="Publikasikan"
            checked={media.aktif}
          />

          <SaveButton text="Simpan Perubahan" />
        </form>
      </details>
    </article>
  );
}

function SectionHeader({
  icon: Icon,
  label,
  title,
  description,
}: {
  icon: typeof Archive;
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="border-b border-emerald-100 bg-gradient-to-r from-emerald-50 to-white p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-700 text-white">
          <Icon size={23} />
        </div>

        <div>
          <p className="text-xs font-extrabold uppercase tracking-wider text-emerald-700">
            {label}
          </p>

          <h2 className="mt-1 text-xl font-black text-slate-900">
            {title}
          </h2>

          <p className="mt-1 text-sm font-medium text-slate-500">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function TextInput({
  id,
  name,
  label,
  value = '',
  type = 'url',
}: {
  id: string;
  name: string;
  label: string;
  value?: string;
  type?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-extrabold uppercase text-slate-500"
      >
        {label}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        defaultValue={value}
        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold"
      />
    </div>
  );
}

function TextArea({
  id,
  name,
  label,
}: {
  id: string;
  name: string;
  label: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-extrabold uppercase text-slate-500"
      >
        {label}
      </label>

      <textarea
        id={id}
        name={name}
        rows={4}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold"
      />
    </div>
  );
}

function Checkbox({
  id,
  name,
  label,
  checked,
}: {
  id: string;
  name: string;
  label: string;
  checked: boolean;
}) {
  return (
    <label className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
      <input
        id={id}
        name={name}
        type="checkbox"
        value="true"
        defaultChecked={checked}
        className="h-4 w-4 accent-emerald-700"
      />

      <span className="text-sm font-extrabold text-emerald-800">
        {label}
      </span>
    </label>
  );
}

function SaveButton({
  text,
}: {
  text: string;
}) {
  return (
    <button
      type="submit"
      className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 text-sm font-extrabold text-white hover:bg-emerald-800 sm:w-auto"
    >
      <Save size={17} />

      {text}
    </button>
  );
}

function Message({
  success = false,
  text,
}: {
  success?: boolean;
  text: string;
}) {
  const Icon =
    success
      ? CheckCircle2
      : AlertCircle;

  return (
    <div
      className={`flex items-start gap-3 rounded-2xl border p-4 ${
        success
          ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
          : 'border-red-200 bg-red-50 text-red-700'
      }`}
    >
      <Icon size={20} />

      <p className="text-sm font-semibold">
        {text}
      </p>
    </div>
  );
}

function EmptyState({
  text,
}: {
  text: string;
}) {
  return (
    <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
      <Landmark
        size={42}
        className="mx-auto text-slate-300"
      />

      <p className="mt-3 text-sm font-bold text-slate-500">
        {text}
      </p>
    </div>
  );
}