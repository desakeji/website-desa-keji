// app/(public)/desa-anti-korupsi/tata-laksana/page.tsx

import type { Metadata } from 'next';

import {
  ShieldCheck,
} from 'lucide-react';

import CetakPdfButton from '@/components/anti-korupsi/CetakPdfButton';
import TataLaksanaClient from '@/components/anti-korupsi/TataLaksanaClient';

export const metadata: Metadata = {
  title:
    'Tata Laksana Desa Anti Korupsi | SIJI',
  description:
    'Dokumen dan bukti dukung penguatan tata laksana Desa Anti Korupsi Desa Keji.',
};

export default function TataLaksanaPage() {
  return (
    <>
      <style>{`
        @media print {
          @page {
            size: A4 landscape;
            margin: 12mm;
          }

          header.sticky,
          footer,
          .print-hide {
            display: none !important;
          }

          body {
            background: white !important;
          }

          .print-container {
            max-width: none !important;
            width: 100% !important;
            padding: 0 !important;
          }

          .document-card {
            break-inside: avoid;
            box-shadow: none !important;
          }
        }
      `}</style>

      <div className="min-h-screen bg-slate-50">
        {/* Hero */}
        <section className="relative isolate overflow-hidden bg-emerald-950 text-white">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('/images/anti-korupsi/hero-anti-korupsi.jpg'), url('/background.png')",
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#021b16] via-emerald-950/90 to-emerald-900/45" />

          <div className="absolute inset-0 bg-gradient-to-t from-[#021b16] via-transparent to-black/20" />

          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.13]"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(255,255,255,0.55) 1px, transparent 1px)',
              backgroundSize:
                '28px 28px',
            }}
          />

          <div className="pointer-events-none absolute -right-32 -top-32 h-[430px] w-[430px] rounded-full border-[76px] border-white/[0.035]" />

          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-4xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.17em] text-emerald-100 backdrop-blur">
                  <ShieldCheck size={15} />

                  Desa Anti Korupsi
                </div>

                <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-300">
                  Indikator I
                </p>

                <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
                  Penguatan Tata Laksana
                </h1>

                <p className="mt-6 max-w-3xl text-sm font-medium leading-7 text-emerald-50/85 md:text-base md:leading-8">
                  Kumpulan dokumen dan bukti
                  pendukung penerapan tata kelola
                  pemerintahan Desa Keji yang
                  transparan, akuntabel, tertib,
                  dan berintegritas.
                </p>
              </div>

              <div className="print-hide">
                <CetakPdfButton />
              </div>
            </div>
          </div>
        </section>

        <main className="print-container mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <TataLaksanaClient />
        </main>
      </div>
    </>
  );
}