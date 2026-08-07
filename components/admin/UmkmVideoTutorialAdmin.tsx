// components/admin/UmkmVideoTutorialAdmin.tsx

import {
  AlertCircle,
  ExternalLink,
  Pencil,
  PlayCircle,
  Power,
  Save,
  Trash2,
} from 'lucide-react';

import {
  hapusVideoTutorialUmkmAction,
  tambahVideoTutorialUmkmAction,
  toggleVideoTutorialUmkmAction,
  ubahVideoTutorialUmkmAction,
} from '@/app/admin/umkm/video-actions';

import {
  supabaseAdmin,
} from '@/lib/supabase-admin';

import type {
  UmkmVideoTutorial,
} from '@/types/umkm-video';

const MAX_VIDEO = 8;

function thumbnailUrl(
  youtubeId: string
) {
  return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
}

function safeString(
  value: unknown
) {
  return String(
    value ?? ''
  ).trim();
}

function normalizeVideo(
  value: unknown
):
  | UmkmVideoTutorial
  | null {
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

  const item:
    UmkmVideoTutorial = {
    id:
      safeString(
        row.id
      ),

    judul:
      safeString(
        row.judul
      ),

    deskripsi:
      safeString(
        row.deskripsi
      ) || null,

    youtube_url:
      safeString(
        row.youtube_url
      ),

    youtube_id:
      safeString(
        row.youtube_id
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
      safeString(
        row.created_at
      ),

    updated_at:
      safeString(
        row.updated_at
      ),
  };

  if (
    !item.id ||
    !item.judul ||
    !item.youtube_id
  ) {
    return null;
  }

  return item;
}

export default async function UmkmVideoTutorialAdmin() {
  const {
    data,
    error,
  } = await supabaseAdmin
    .from(
      'umkm_video_tutorial'
    )
    .select(`
      id,
      judul,
      deskripsi,
      youtube_url,
      youtube_id,
      urutan,
      aktif,
      created_at,
      updated_at
    `)
    .order(
      'urutan',
      {
        ascending: true,
      }
    )
    .order(
      'created_at',
      {
        ascending: true,
      }
    );

  if (error) {
    console.error(
      'Gagal mengambil video tutorial UMKM:',
      {
        message:
          error.message,

        code:
          error.code,

        details:
          error.details,

        hint:
          error.hint,
      }
    );
  }

  const videos =
    (data ?? [])
      .map(
        normalizeVideo
      )
      .filter(
        (
          item
        ): item is UmkmVideoTutorial =>
          item !== null
      );

  const videoAktif =
    videos.filter(
      (item) =>
        item.aktif
    ).length;

  const sudahPenuh =
    videos.length >=
    MAX_VIDEO;

  return (
    <section
      id="video-tutorial"
      className="scroll-mt-24 overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm"
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="border-b border-emerald-100 bg-gradient-to-r from-emerald-50 via-white to-white px-6 py-5 sm:px-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-sm">
              <PlayCircle
                size={24}
              />
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-emerald-700">
                Media Edukasi UMKM
              </p>

              <h2 className="mt-1 text-xl font-black text-slate-900">
                Video Tutorial UMKM
              </h2>

              <p className="mt-1 max-w-3xl text-sm font-medium leading-6 text-slate-500">
                Kelola video panduan
                dan tutorial UMKM yang
                terhubung langsung ke
                YouTube.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-extrabold text-slate-600">
              {videos.length} /{' '}
              {MAX_VIDEO} video
            </span>

            <span className="rounded-full bg-emerald-100 px-4 py-2 text-xs font-extrabold text-emerald-700">
              {videoAktif} tayang
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================
          INFORMASI TARGET
      ===================================================== */}

      <div className="border-b border-slate-100 bg-amber-50 px-6 py-4 sm:px-7">
        <div className="flex items-start gap-3">
          <AlertCircle
            size={18}
            className="mt-0.5 shrink-0 text-amber-600"
          />

          <p className="text-xs font-semibold leading-6 text-amber-800">
            Target program adalah
            6–8 video tutorial.
            Sistem membatasi maksimal
            8 video agar tampilan
            Lapak UMKM tetap ringkas.
          </p>
        </div>
      </div>

      {/* =====================================================
          FORM TAMBAH VIDEO
      ===================================================== */}

      {!sudahPenuh ? (
        <form
          action={
            tambahVideoTutorialUmkmAction
          }
          className="border-b border-slate-100 p-6 sm:p-7"
        >
          <div className="mb-5">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-emerald-700">
              Video Baru
            </p>

            <h3 className="mt-1 text-lg font-black text-slate-900">
              Tambah Video Tutorial
            </h3>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Masukkan URL video
              YouTube. Thumbnail akan
              ditampilkan otomatis
              berdasarkan ID video.
            </p>
          </div>

          <VideoFormFields
            idPrefix="tambah-video"
            defaultUrutan={
              videos.length
            }
          />

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 text-sm font-extrabold text-white transition hover:bg-emerald-800 sm:w-auto"
            >
              <PlayCircle
                size={17}
              />

              Tambah Video
            </button>
          </div>
        </form>
      ) : (
        <div className="border-b border-slate-100 bg-slate-50 px-6 py-5 text-sm font-bold text-slate-500 sm:px-7">
          Maksimal 8 video sudah
          tercapai. Hapus salah satu
          video untuk menambahkan
          video baru.
        </div>
      )}

      {/* =====================================================
          DAFTAR VIDEO
      ===================================================== */}

      {videos.length ===
      0 ? (
        <div className="px-6 py-14 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
            <PlayCircle
              size={32}
            />
          </div>

          <h3 className="mt-4 font-black text-slate-700">
            Belum ada video tutorial
          </h3>

          <p className="mt-2 text-sm font-medium text-slate-500">
            Masukkan URL video
            YouTube melalui formulir
            di atas.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 p-5 sm:p-7 xl:grid-cols-2">
          {videos.map(
            (video) => (
              <VideoAdminCard
                key={
                  video.id
                }
                video={
                  video
                }
              />
            )
          )}
        </div>
      )}
    </section>
  );
}

function VideoAdminCard({
  video,
}: {
  video: UmkmVideoTutorial;
}) {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
      <div className="grid sm:grid-cols-[220px_minmax(0,1fr)]">
        {/* Thumbnail */}

        <a
          href={
            video.youtube_url
          }
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block aspect-video overflow-hidden bg-slate-900 sm:aspect-auto"
        >
          <img
            src={thumbnailUrl(
              video.youtube_id
            )}
            alt={
              video.judul
            }
            loading="lazy"
            className="h-full min-h-[180px] w-full object-cover transition duration-300 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/15 transition group-hover:bg-black/30" />

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-xl transition duration-300 group-hover:scale-110">
              <PlayCircle
                size={27}
              />
            </span>
          </div>
        </a>

        {/* Informasi */}

        <div className="min-w-0 p-5">
          <div className="flex flex-wrap gap-2">
            <span
              className={`rounded-full px-3 py-1 text-[10px] font-extrabold ${
                video.aktif
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {video.aktif
                ? 'Tayang'
                : 'Disembunyikan'}
            </span>

            <span className="rounded-full bg-red-100 px-3 py-1 text-[10px] font-extrabold text-red-700">
              Urutan{' '}
              {video.urutan}
            </span>
          </div>

          <h3 className="mt-3 text-lg font-black leading-6 text-slate-900">
            {video.judul}
          </h3>

          {video.deskripsi && (
            <p className="mt-2 line-clamp-3 text-xs font-medium leading-6 text-slate-500">
              {
                video.deskripsi
              }
            </p>
          )}

          <a
            href={
              video.youtube_url
            }
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-xs font-extrabold text-red-600 transition hover:text-red-700"
          >
            Buka di YouTube

            <ExternalLink
              size={13}
            />
          </a>
        </div>
      </div>

      {/* =====================================================
          ACTION
      ===================================================== */}

      <div className="grid gap-2 border-t border-slate-200 bg-white p-4 sm:grid-cols-2">
        <form
          action={
            toggleVideoTutorialUmkmAction
          }
        >
          <input
            type="hidden"
            name="id"
            value={
              video.id
            }
          />

          <input
            type="hidden"
            name="aktif"
            value={String(
              !video.aktif
            )}
          />

          <button
            type="submit"
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-amber-100 px-3 text-xs font-extrabold text-amber-700 transition hover:bg-amber-200"
          >
            <Power
              size={15}
            />

            {video.aktif
              ? 'Sembunyikan'
              : 'Publikasikan'}
          </button>
        </form>

        <form
          action={
            hapusVideoTutorialUmkmAction
          }
        >
          <input
            type="hidden"
            name="id"
            value={
              video.id
            }
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

      {/* =====================================================
          EDIT VIDEO
      ===================================================== */}

      <details className="border-t border-slate-200 bg-white">
        <summary className="flex cursor-pointer list-none items-center justify-center gap-2 p-4 text-sm font-extrabold text-slate-700">
          <Pencil
            size={16}
          />

          Edit Video
        </summary>

        <form
          action={
            ubahVideoTutorialUmkmAction
          }
          className="border-t border-slate-200 p-5"
        >
          <input
            type="hidden"
            name="id"
            value={
              video.id
            }
          />

          <VideoFormFields
            idPrefix={`edit-video-${video.id}`}
            video={
              video
            }
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

function VideoFormFields({
  idPrefix,
  video,
  defaultUrutan = 0,
}: {
  idPrefix: string;

  video?:
    UmkmVideoTutorial;

  defaultUrutan?: number;
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <TextInput
        idPrefix={
          idPrefix
        }
        name="judul"
        label="Judul Video"
        value={
          video?.judul ??
          ''
        }
        placeholder="Contoh: Cara Membuat Foto Produk UMKM"
      />

      <TextInput
        idPrefix={
          idPrefix
        }
        name="urutan"
        label="Nomor Urutan"
        type="number"
        value={String(
          video?.urutan ??
            defaultUrutan
        )}
        min={0}
      />

      <div className="md:col-span-2">
        <TextInput
          idPrefix={
            idPrefix
          }
          name="youtube_url"
          label="URL YouTube"
          type="url"
          value={
            video?.youtube_url ??
            ''
          }
          placeholder="https://www.youtube.com/watch?v=..."
        />
      </div>

      <div className="md:col-span-2">
        <TextArea
          idPrefix={
            idPrefix
          }
          name="deskripsi"
          label="Deskripsi Video"
          value={
            video?.deskripsi ??
            ''
          }
          required={
            false
          }
        />
      </div>

      <div className="md:col-span-2">
        <Checkbox
          id={`${idPrefix}-aktif`}
          name="aktif"
          label="Publikasikan Video"
          description="Video tampil pada bagian Video Tutorial di halaman Lapak UMKM."
          checked={
            video?.aktif ??
            true
          }
        />
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
  type = 'text',
  min,
}: {
  idPrefix: string;

  name: string;

  label: string;

  value?: string;

  placeholder?: string;

  type?: string;

  min?: number;
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
        type={type}
        min={min}
        required
        defaultValue={
          value
        }
        placeholder={
          placeholder
        }
        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-800 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
      />
    </div>
  );
}

function TextArea({
  idPrefix,
  name,
  label,
  value = '',
  required = true,
}: {
  idPrefix: string;

  name: string;

  label: string;

  value?: string;

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

      <textarea
        id={id}
        name={name}
        rows={4}
        required={
          required
        }
        defaultValue={
          value
        }
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
        name={name}
        type="checkbox"
        value="true"
        defaultChecked={
          checked
        }
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