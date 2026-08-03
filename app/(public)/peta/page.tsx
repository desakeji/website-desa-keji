// app/(public)/peta/page.tsx

import {
  ExternalLink,
  Map,
  MapPin,
} from 'lucide-react';

import {
  PETA_DESA_DEFAULTS,
} from '@/lib/peta-defaults';

import {
  supabaseAdmin,
} from '@/lib/supabase-admin';

import type {
  PetaDesaData,
} from '@/types/peta';

export const dynamic =
  'force-dynamic';

export const revalidate = 0;

const PETA_KEY = 'utama';

export default async function PetaDesaPage() {
  const {
    data,
    error,
  } = await supabaseAdmin
    .from('peta_desa')
    .select(`
      peta_key,
      label_seksi,
      judul_halaman,
      deskripsi,
      tombol_label,
      maps_link_url,
      maps_embed_url,
      iframe_title,
      tinggi_peta,
      updated_at
    `)
    .eq(
      'peta_key',
      PETA_KEY
    )
    .maybeSingle();

  if (error) {
    console.error(
      'Gagal mengambil peta desa:',
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

  const peta:
    PetaDesaData = {
    ...PETA_DESA_DEFAULTS,
    ...(data ?? {}),
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 md:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header halaman */}
        <header className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-700">
            <Map
              size={16}
            />

            {peta.label_seksi}
          </div>

          <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
            {peta.judul_halaman}
          </h1>

          <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-500 md:text-base">
            {peta.deskripsi}
          </p>
        </header>

        <section className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
          <div className="flex flex-col gap-5 border-b border-emerald-50 bg-gradient-to-r from-emerald-50/80 to-white p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-lg shadow-emerald-900/20">
                <MapPin
                  size={27}
                  strokeWidth={2.4}
                />
              </div>

              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-emerald-700">
                  Peta Interaktif
                </p>

                <h2 className="mt-1 text-xl font-black text-slate-900 md:text-2xl">
                  Wilayah Desa Keji
                </h2>
              </div>
            </div>

            <a
              href={
                peta.maps_link_url
              }
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 text-sm font-extrabold text-white shadow-lg shadow-emerald-900/15 transition hover:-translate-y-0.5 hover:bg-emerald-800"
            >
              {peta.tombol_label}

              <ExternalLink
                size={16}
              />
            </a>
          </div>

          <div className="p-4 sm:p-6 md:p-8">
            <div
              className="relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 shadow-inner"
              style={{
                height:
                  `${peta.tinggi_peta}px`,
              }}
            >
              <iframe
                src={
                  peta.maps_embed_url
                }
                className="absolute inset-0 h-full w-full"
                style={{
                  border: 0,
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={
                  peta.iframe_title
                }
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}