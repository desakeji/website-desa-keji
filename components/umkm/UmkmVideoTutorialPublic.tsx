// components/umkm/UmkmVideoTutorialPublic.tsx

import {
  ExternalLink,
  Play,
  PlayCircle,
} from 'lucide-react';

import {
  supabaseAdmin,
} from '@/lib/supabase-admin';

import type {
  UmkmVideoTutorial,
} from '@/types/umkm-video';

const MAX_VIDEO = 8;

/* =========================================================
   HELPER
========================================================= */

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
    !item.youtube_url ||
    !item.youtube_id
  ) {
    return null;
  }

  return item;
}

/* =========================================================
   COMPONENT
========================================================= */

export default async function UmkmVideoTutorialPublic() {
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
    .eq(
      'aktif',
      true
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
        ascending: true,
      }
    )
    .limit(
      MAX_VIDEO
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
    error
      ? []
      : (
          data ?? []
        )
          .map(
            normalizeVideo
          )
          .filter(
            (
              item
            ): item is UmkmVideoTutorial =>
              item !== null
          );

  return (
    <section
      id="video-tutorial-umkm"
      className="border-t border-emerald-100 bg-gradient-to-b from-emerald-50/70 via-white to-white py-14 sm:py-16"
    >
      <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-8">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-emerald-700">
              <Play
                size={14}
                fill="currentColor"
              />

              Video Tutorial
            </div>

            <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-900 md:text-3xl">
              Belajar Mengembangkan UMKM
            </h2>

            <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-500">
              Akses panduan praktis
              untuk membantu pelaku
              usaha memasarkan,
              mengelola, dan
              mengembangkan produk
              UMKM secara digital.
            </p>
          </div>

          <div className="shrink-0">
            <span className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-extrabold text-slate-500 shadow-sm ring-1 ring-slate-200">
              {videos.length}{' '}
              video tersedia
            </span>
          </div>
        </div>

        {/* =====================================================
            VIDEO KOSONG
        ===================================================== */}

        {videos.length ===
        0 ? (
          <div className="mt-8 overflow-hidden rounded-3xl border border-dashed border-emerald-200 bg-white">
            <div className="flex min-h-[280px] flex-col items-center justify-center px-6 py-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <PlayCircle
                  size={32}
                />
              </div>

              <h3 className="mt-5 text-lg font-black text-slate-800">
                Belum Ada Video Tutorial
              </h3>

              <p className="mt-2 max-w-lg text-sm font-medium leading-7 text-slate-500">
                Video tutorial UMKM
                akan ditampilkan pada
                bagian ini setelah
                ditambahkan dan
                dipublikasikan melalui
                halaman admin.
              </p>
            </div>
          </div>
        ) : (
          /* ===================================================
             DAFTAR VIDEO
          =================================================== */

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {videos.map(
              (
                video,
                index
              ) => (
                <a
                  key={
                    video.id
                  }
                  href={
                    video.youtube_url
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl"
                >
                  {/* ===========================================
                      THUMBNAIL
                  =========================================== */}

                  <div className="relative aspect-video overflow-hidden bg-slate-900">
                    <img
                      src={thumbnailUrl(
                        video.youtube_id
                      )}
                      alt={
                        video.judul
                      }
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-black/10 transition duration-300 group-hover:bg-black/30" />

                    {/* Play */}

                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-xl transition duration-300 group-hover:scale-110">
                        <Play
                          size={23}
                          fill="currentColor"
                        />
                      </span>
                    </div>

                    {/* Nomor */}

                    <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1.5 text-[10px] font-extrabold text-white backdrop-blur">
                      Video{' '}
                      {String(
                        index + 1
                      ).padStart(
                        2,
                        '0'
                      )}
                    </span>

                    {/* YouTube */}

                    <span className="absolute bottom-3 right-3 rounded-lg bg-red-600 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-white shadow">
                      YouTube
                    </span>
                  </div>

                  {/* ===========================================
                      CONTENT
                  =========================================== */}

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-base font-black leading-6 text-slate-900 transition group-hover:text-emerald-700">
                      {
                        video.judul
                      }
                    </h3>

                    {video.deskripsi ? (
                      <p className="mt-2 line-clamp-3 flex-1 text-sm font-medium leading-6 text-slate-500">
                        {
                          video.deskripsi
                        }
                      </p>
                    ) : (
                      <div className="flex-1" />
                    )}

                    <div className="mt-5 border-t border-slate-200 pt-4">
                      <span className="inline-flex items-center gap-2 text-xs font-extrabold text-emerald-700">
                        Tonton Video

                        <ExternalLink
                          size={13}
                        />
                      </span>
                    </div>
                  </div>
                </a>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}