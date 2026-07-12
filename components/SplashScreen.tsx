// components/SplashScreen.tsx

'use client';

import {
  useEffect,
  useRef,
  useState,
} from 'react';

export default function SplashScreen() {
  const [progress, setProgress] =
    useState(0);

  const [isVisible, setIsVisible] =
    useState(true);

  const [isFadingOut, setIsFadingOut] =
    useState(false);

  const intervalRef =
    useRef<ReturnType<typeof setInterval> | null>(
      null
    );

  const fadeTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(
      null
    );

  const hideTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(
      null
    );

  useEffect(() => {
    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      'hidden';

    intervalRef.current = setInterval(() => {
      setProgress((previousProgress) => {
        if (previousProgress >= 100) {
          if (intervalRef.current) {
            clearInterval(
              intervalRef.current
            );

            intervalRef.current = null;
          }

          fadeTimerRef.current =
            setTimeout(() => {
              setIsFadingOut(true);

              hideTimerRef.current =
                setTimeout(() => {
                  setIsVisible(false);

                  document.body.style.overflow =
                    previousOverflow;
                }, 800);
            }, 350);

          return 100;
        }

        const increment =
          Math.floor(
            Math.random() * 4
          ) + 3;

        return Math.min(
          previousProgress + increment,
          100
        );
      });
    }, 55);

    return () => {
      if (intervalRef.current) {
        clearInterval(
          intervalRef.current
        );
      }

      if (fadeTimerRef.current) {
        clearTimeout(
          fadeTimerRef.current
        );
      }

      if (hideTimerRef.current) {
        clearTimeout(
          hideTimerRef.current
        );
      }

      document.body.style.overflow =
        previousOverflow;
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      role="status"
      aria-label="Memuat website Desa Keji"
      className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#021c17] px-4 transition-all duration-700 ease-in-out ${
        isFadingOut
          ? 'pointer-events-none scale-105 opacity-0'
          : 'scale-100 opacity-100'
      }`}
    >
      {/* Background Batik */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.42]"
        style={{
          backgroundImage:
            "url('/batik-splash.png')",
        }}
      />

      {/* Overlay gelap */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/65 via-emerald-950/75 to-black/85" />

      {/* Lapisan warna emerald */}
      <div className="pointer-events-none absolute inset-0 bg-emerald-950/25 mix-blend-color" />

      {/* Cahaya di belakang logo */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300/10 blur-[100px]" />

      {/* Cahaya sudut */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-36 -right-32 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />

      {/* Bingkai halaman */}
      <div className="pointer-events-none absolute inset-4 rounded-[30px] border border-white/[0.07] sm:inset-7" />

      {/* Konten */}
      <div className="relative z-10 flex w-full max-w-sm flex-col items-center">
        {/* Logo */}
        <div className="relative">
          {/* Cahaya logo */}
          <div className="absolute inset-0 scale-125 rounded-full bg-amber-300/15 blur-2xl" />

          {/* Ring luar */}
          <div className="relative rounded-full border border-amber-200/30 bg-black/20 p-2.5 shadow-[0_30px_90px_rgba(0,0,0,0.55)] backdrop-blur-md">
            {/* Ring tengah */}
            <div className="rounded-full border border-white/20 bg-white/10 p-2">
              {/* Area putih logo */}
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-white p-5 shadow-inner sm:h-36 sm:w-36">
                <img
                  src="/logodesakeji.png"
                  alt="Logo Desa Keji"
                  className="h-full w-full object-contain drop-shadow-md"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Loading Bar */}
        <div className="mt-12 w-52 sm:w-60">
          <div className="h-1.5 w-full overflow-hidden rounded-full border border-white/[0.08] bg-black/45 shadow-inner backdrop-blur-sm">
            <div
              className="relative h-full rounded-full bg-gradient-to-r from-amber-700 via-amber-400 to-amber-200 transition-[width] duration-100 ease-out"
              style={{
                width: `${progress}%`,
              }}
            >
              {/* Kilap loading */}
              <div className="absolute inset-y-0 right-0 w-6 translate-x-1/2 bg-white/70 blur-[3px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}