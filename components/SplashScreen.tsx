// components/SplashScreen.tsx
'use client';

import { useState, useEffect } from 'react';

export default function SplashScreen() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Menonaktifkan scroll saat splash screen aktif
    document.body.style.overflow = 'hidden';

    // Mengatur jalannya progress bar di latar belakang (tanpa menampilkan angka)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          
          // Tunggu sebentar di 100%, lalu mulai fade out
          setTimeout(() => {
            setIsFadingOut(true);
            
            // Hapus komponen dari layar setelah animasi selesai
            setTimeout(() => {
              setIsVisible(false);
              document.body.style.overflow = 'auto'; // Aktifkan scroll kembali
            }, 800);
            
          }, 500);
          
          return 100;
        }
        
        // Kecepatan animasi bar
        const increment = Math.floor(Math.random() * 5) + 3; 
        return prev + increment > 100 ? 100 : prev + increment;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className={`
        fixed inset-0 z-[9999] flex flex-col items-center justify-center 
        bg-gradient-to-br from-emerald-800 via-emerald-900 to-slate-900 
        transition-all duration-700 ease-in-out px-4
        ${isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'}
      `}
    >
      {/* Ornamen Latar Belakang */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-sm">
        
        {/* LOGO */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="bg-white p-5 rounded-full shadow-2xl relative border-2 border-emerald-500/20">
            <img 
              src="/logodesakeji.png" 
              alt="Logo Desa Keji" 
              className="w-20 h-24 sm:w-24 sm:h-28 object-contain relative z-10 animate-[bounce_3s_ease-in-out_infinite]"
            />
          </div>
        </div>

        {/* JUDUL */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2 drop-shadow-lg">
            Desa Keji
          </h1>
          <p className="text-emerald-300 text-sm sm:text-base font-semibold tracking-widest uppercase">
            Kabupaten Semarang
          </p>
        </div>

        {/* LOADING BAR (Polos & Elegan tanpa tulisan/angka) */}
        <div className="w-48 sm:w-56 mt-4">
          <div className="w-full h-1.5 bg-emerald-950/50 rounded-full overflow-hidden backdrop-blur-sm shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-100 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              {/* Efek kilap pada bar */}
              <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/40 blur-[2px] translate-x-1/2"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}