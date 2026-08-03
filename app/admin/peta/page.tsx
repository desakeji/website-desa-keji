// app/admin/peta/page.tsx

import Link from 'next/link';

import {
  ExternalLink,
  MapPinned,
} from 'lucide-react';

import FormPetaDesa from '@/components/admin/FormPetaDesa';

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

export default async function AdminPetaDesaPage() {
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
      'Gagal mengambil konfigurasi peta desa:',
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

  const initialData:
    PetaDesaData = {
    ...PETA_DESA_DEFAULTS,
    ...(data ?? {}),
  };

  return (
    <div className="mx-auto max-w-6xl space-y-7">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#064e3b] via-[#065f46] to-[#047857] px-6 py-7 text-white shadow-xl shadow-emerald-950/10 sm:px-8 sm:py-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.13) 1.5px, transparent 1.5px)',

            backgroundSize:
              '26px 26px',
          }}
        />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
              <MapPinned
                size={27}
              />
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-200">
                Data dan Pemerintahan
              </p>

              <h1 className="mt-2 text-2xl font-black sm:text-3xl">
                Peta Desa
              </h1>

              <p className="mt-2 max-w-3xl text-sm font-medium leading-7 text-emerald-50/80">
                Kelola judul, deskripsi, tautan Maps,
                peta embed, dan ukuran tampilan peta
                wilayah Desa Keji.
              </p>
            </div>
          </div>

          <Link
            href="/peta"
            target="_blank"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 text-sm font-extrabold text-white transition hover:bg-white/15"
          >
            Lihat Peta Publik

            <ExternalLink
              size={16}
            />
          </Link>
        </div>
      </section>

      {error && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800">
          Konfigurasi lama gagal dimuat. Formulir
          menggunakan data bawaan.
        </div>
      )}

      <FormPetaDesa
        initialData={
          initialData
        }
      />
    </div>
  );
}