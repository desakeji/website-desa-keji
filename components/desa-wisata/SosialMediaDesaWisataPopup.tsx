// components/desa-wisata/SosialMediaDesaWisataPopup.tsx

'use client';

import {
  useEffect,
  useState,
} from 'react';

import {
  ArrowUpRight,
  MapPin,
  Sparkles,
  X,
} from 'lucide-react';

/* =========================================================
   CONFIG
========================================================= */

const INSTAGRAM_DESA_KEJI =
  'https://www.instagram.com/desakeji/';

/* =========================================================
   COMPONENT
========================================================= */

export default function SosialMediaDesaWisataPopup() {
  const [
    isOpen,
    setIsOpen,
  ] = useState(true);

  /* =========================================================
     ESC + SCROLL LOCK
  ========================================================= */

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const originalOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      'hidden';

    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (
        event.key ===
        'Escape'
      ) {
        setIsOpen(false);
      }
    }

    window.addEventListener(
      'keydown',
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        originalOverflow;

      window.removeEventListener(
        'keydown',
        handleKeyDown
      );
    };
  }, [
    isOpen,
  ]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="social-media-desa-title"
    >
      {/* =====================================================
          BACKDROP
      ===================================================== */}

      <button
        type="button"
        aria-label="Tutup popup sosial media"
        onClick={() =>
          setIsOpen(false)
        }
        className="absolute inset-0 cursor-default bg-emerald-950/75 backdrop-blur-[5px]"
      />

      {/* =====================================================
          MODAL
      ===================================================== */}

      <div className="relative w-full max-w-[520px] overflow-hidden rounded-[2rem] border border-white/20 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.35)]">
        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-800 to-teal-700 px-6 pb-8 pt-6 text-white sm:px-8">
          {/* Pattern */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(255,255,255,0.55) 1px, transparent 1px)',

              backgroundSize:
                '24px 24px',
            }}
          />

          {/* Glow */}

          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-emerald-300/15 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-28 -left-20 h-56 w-56 rounded-full bg-teal-300/10 blur-3xl" />

          {/* Close */}

          <button
            type="button"
            onClick={() =>
              setIsOpen(false)
            }
            aria-label="Tutup"
            className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white transition hover:bg-white/20"
          >
            <X
              size={19}
            />
          </button>

          {/* Content */}

          <div className="relative pr-12">
            {/* Instagram Icon */}

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 shadow-lg backdrop-blur">
              <InstagramIcon
                className="h-7 w-7 text-white"
              />
            </div>

            {/* Badge */}

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5">
              <Sparkles
                size={13}
                className="text-emerald-300"
              />

              <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-emerald-100">
                Sosial Media Desa
              </span>
            </div>

            {/* Judul */}

            <h2
              id="social-media-desa-title"
              className="mt-4 text-2xl font-black leading-tight tracking-tight sm:text-3xl"
            >
              Ikuti Cerita

              <span className="block text-emerald-300">
                Desa Keji
              </span>
            </h2>

            {/* Deskripsi */}

            <p className="mt-4 max-w-md text-sm font-medium leading-7 text-emerald-50/80">
              Temukan dokumentasi
              kegiatan, informasi
              terbaru, budaya,
              masyarakat, serta
              berbagai cerita dari
              Desa Keji melalui sosial
              media resmi desa.
            </p>
          </div>
        </div>

        {/* ===================================================
            CONTENT
        =================================================== */}

        <div className="p-6 sm:p-8">
          {/* =================================================
              INSTAGRAM CARD
          ================================================= */}

          <a
            href={
              INSTAGRAM_DESA_KEJI
            }
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block overflow-hidden rounded-2xl border border-emerald-100 bg-emerald-50 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-100"
          >
            <div className="flex items-center gap-4">
              {/* Icon */}

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-md">
                <InstagramIcon
                  className="h-6 w-6"
                />
              </div>

              {/* Text */}

              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-emerald-600">
                  Instagram
                </p>

                <h3 className="mt-1 text-base font-black text-emerald-950">
                  @desakeji
                </h3>

                <p className="mt-1 text-xs font-medium text-emerald-700">
                  Instagram resmi
                  Desa Keji
                </p>
              </div>

              {/* Arrow */}

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm transition group-hover:bg-emerald-700 group-hover:text-white">
                <ArrowUpRight
                  size={17}
                />
              </div>
            </div>
          </a>

          {/* =================================================
              LOCATION
          ================================================= */}

          <div className="mt-4 flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <MapPin
                size={17}
              />
            </div>

            <div>
              <p className="text-xs font-black text-slate-700">
                Desa Keji
              </p>

              <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
                Kecamatan Ungaran
                Barat, Kabupaten
                Semarang, Jawa Tengah
              </p>
            </div>
          </div>

          {/* =================================================
              BUTTON INSTAGRAM
          ================================================= */}

          <a
            href={
              INSTAGRAM_DESA_KEJI
            }
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 text-sm font-extrabold text-white shadow-md transition hover:bg-emerald-800"
          >
            <InstagramIcon
              className="h-[18px] w-[18px]"
            />

            Kunjungi Instagram

            <ArrowUpRight
              size={16}
              className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>

          {/* =================================================
              CLOSE BUTTON
          ================================================= */}

          <button
            type="button"
            onClick={() =>
              setIsOpen(false)
            }
            className="mt-3 flex min-h-11 w-full items-center justify-center rounded-xl text-xs font-extrabold text-slate-500 transition hover:bg-slate-50 hover:text-emerald-700"
          >
            Lanjut Jelajahi Desa Wisata
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   INSTAGRAM ICON
========================================================= */

function InstagramIcon({
  className = '',
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={
        className
      }
      aria-hidden="true"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="2"
      />

      <circle
        cx="12"
        cy="12"
        r="4"
        stroke="currentColor"
        strokeWidth="2"
      />

      <circle
        cx="17.5"
        cy="6.5"
        r="1" 
        fill="currentColor"
      />
    </svg>
  );
}