import type { Metadata } from 'next';

import Link from 'next/link';

import {
  ArrowLeft,
  FileSearch,
  ShieldCheck,
} from 'lucide-react';

import PengawasanClient, {
  type IndikatorPengawasanPublik,
} from '@/components/anti-korupsi/PengawasanClient';

import { supabaseAdmin } from '@/lib/supabase-admin';

import {
  ANTI_KORUPSI_ICON_OPTIONS,
  JENIS_DOKUMEN_ANTI_KORUPSI,
  type AntiKorupsiIconKey,
  type JenisDokumenAntiKorupsi,
} from '@/types/anti-korupsi';

export const metadata: Metadata = {
  title:
    'Pengawasan Desa Anti Korupsi | SIJI',

  description:
    'Dokumen dan bukti dukung penguatan pengawasan Desa Anti Korupsi Desa Keji.',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const SUB_SLUG = 'pengawasan';

function safeString(
  value: unknown
) {
  return String(
    value ?? ''
  ).trim();
}

function isIconKey(
  value: string
): value is AntiKorupsiIconKey {
  return (
    ANTI_KORUPSI_ICON_OPTIONS as readonly string[]
  ).includes(value);
}

function isJenisDokumen(
  value: string
): value is JenisDokumenAntiKorupsi {
  return (
    JENIS_DOKUMEN_ANTI_KORUPSI as readonly string[]
  ).includes(value);
}

export default async function PengawasanPage() {
  const indikatorResult =
    await supabaseAdmin
      .from(
        'anti_korupsi_indikator'
      )
      .select(`
        id,
        kode,
        judul,
        ringkasan,
        icon_key,
        urutan
      `)
      .eq(
        'sub_slug',
        SUB_SLUG
      )
      .eq('aktif', true)
      .order('urutan', {
        ascending: true,
      })
      .order('created_at', {
        ascending: true,
      });

  if (indikatorResult.error) {
    console.error(
      'Gagal mengambil indikator Pengawasan:',
      indikatorResult.error
    );
  }

  const indikatorDasar =
    (
      indikatorResult.data ?? []
    )
      .map((row) => {
        const id =
          safeString(row.id);

        const kode =
          safeString(row.kode);

        const judul =
          safeString(row.judul);

        const iconKey =
          safeString(
            row.icon_key
          );

        if (
          !id ||
          !kode ||
          !judul ||
          !isIconKey(iconKey)
        ) {
          return null;
        }

        return {
          id,
          kode,
          judul,

          ringkasan:
            safeString(
              row.ringkasan
            ),

          iconKey,
        };
      })
      .filter(
        (
          item
        ): item is Omit<
          IndikatorPengawasanPublik,
          'dokumen'
        > =>
          item !== null
      );

  const indikatorIds =
    indikatorDasar.map(
      (item) => item.id
    );

  const dokumenMap =
    new Map<
      string,
      IndikatorPengawasanPublik['dokumen']
    >();

  if (indikatorIds.length > 0) {
    const dokumenResult =
      await supabaseAdmin
        .from(
          'anti_korupsi_dokumen'
        )
        .select(`
          id,
          indikator_id,
          judul,
          deskripsi,
          jenis,
          tahun,
          drive_url,
          urutan
        `)
        .in(
          'indikator_id',
          indikatorIds
        )
        .eq('aktif', true)
        .order('urutan', {
          ascending: true,
        })
        .order('created_at', {
          ascending: true,
        });

    if (dokumenResult.error) {
      console.error(
        'Gagal mengambil dokumen Pengawasan:',
        dokumenResult.error
      );
    }

    for (
      const row of
        dokumenResult.data ?? []
    ) {
      const id =
        safeString(row.id);

      const indikatorId =
        safeString(
          row.indikator_id
        );

      const judul =
        safeString(row.judul);

      const jenis =
        safeString(row.jenis);

      const driveUrl =
        safeString(
          row.drive_url
        );

      if (
        !id ||
        !indikatorId ||
        !judul ||
        !driveUrl ||
        !isJenisDokumen(jenis)
      ) {
        continue;
      }

      const rawTahun =
        row.tahun;

      const tahun =
        rawTahun === null ||
        rawTahun === undefined
          ? null
          : Number(rawTahun);

      const daftar =
        dokumenMap.get(
          indikatorId
        ) ?? [];

      daftar.push({
        id,
        judul,

        deskripsi:
          safeString(
            row.deskripsi
          ),

        jenis,

        tahun:
          tahun !== null &&
          Number.isInteger(tahun)
            ? tahun
            : null,

        driveUrl,
      });

      dokumenMap.set(
        indikatorId,
        daftar
      );
    }
  }

  const indikatorPengawasan:
    IndikatorPengawasanPublik[] =
    indikatorDasar.map(
      (indikator) => ({
        ...indikator,

        dokumen:
          dokumenMap.get(
            indikator.id
          ) ?? [],
      })
    );

  return (
    <div className="min-h-screen overflow-x-clip bg-slate-50">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-emerald-950 text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/images/anti-korupsi/hero-anti-korupsi.jpg'), url('/background.png')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#021b16] via-emerald-950/90 to-emerald-900/45" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#021b16] via-transparent to-black/20" />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.55) 1px, transparent 1px)',

            backgroundSize:
              '28px 28px',
          }}
        />

        <div className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full border-[72px] border-white/[0.035]" />

        <div className="pointer-events-none absolute -bottom-32 -left-32 h-[390px] w-[390px] rounded-full bg-emerald-300/10 blur-[110px]" />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <Link
            href="/desa-anti-korupsi"
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-100/80 transition hover:text-white"
          >
            <ArrowLeft size={15} />

            Kembali ke Desa Anti Korupsi
          </Link>

          <div className="mt-7 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.17em] text-emerald-100 backdrop-blur sm:text-xs">
                <ShieldCheck size={15} />

                Desa Anti Korupsi
              </div>

              <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-300">
                Indikator II
              </p>

              <h1 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Penguatan Pengawasan
              </h1>

              <p className="mt-5 max-w-3xl text-sm font-medium leading-7 text-emerald-50/85 sm:text-base">
                Kumpulan dokumen dan
                bukti pendukung
                pelaksanaan pengawasan,
                evaluasi kinerja, tindak
                lanjut pemeriksaan,
                serta pencegahan tindak
                pidana korupsi di
                lingkungan Pemerintah
                Desa Keji.
              </p>
            </div>

            <div className="shrink-0">
              <div className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-xs font-bold text-emerald-50 backdrop-blur">
                <FileSearch size={16} />

                {
                  indikatorPengawasan.length
                }{' '}
                indikator pengawasan
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Konten */}
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <PengawasanClient
          indikatorPengawasan={
            indikatorPengawasan
          }
        />
      </main>
    </div>
  );
}