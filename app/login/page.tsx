// app/login/page.tsx (Sesuaikan dengan lokasi file login Anda)
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, LogIn, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Nanti kita hubungkan logika ini dengan Supabase Auth
    // Sementara kita buat simulasi jika diklik langsung pindah ke Dashboard
    console.log('Login dengan:', email, password);
    router.push('/admin'); 
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center relative overflow-hidden">
      
      {/* Background Aksen Hijau */}
      <div className="absolute top-0 left-0 w-full h-64 bg-emerald-800 rounded-b-[20%] md:rounded-b-[50%] shadow-lg"></div>

      <div className="relative z-10 max-w-md w-full mx-auto px-4 sm:px-6">
        
        {/* Tombol Kembali */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-emerald-100 hover:text-white font-semibold text-sm mb-6 transition-colors drop-shadow-md"
        >
          <ArrowLeft size={16} /> Kembali ke Beranda
        </Link>

        {/* Kartu Login */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          
          {/* Header Kartu */}
          <div className="bg-emerald-50/50 p-6 md:p-8 text-center border-b border-gray-100">
            <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-4 border border-emerald-100">
              <ShieldCheck size={32} className="text-emerald-600" />
            </div>
            <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">
              Portal Admin
            </h1>
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mt-1">
              Desa Keji - Kab. Semarang
            </p>
          </div>

          {/* Form Login */}
          <div className="p-6 md:p-8">
            <form onSubmit={handleLogin} className="space-y-5">
              
              <div>
                <label className="text-sm font-bold text-gray-700 block mb-2">Email Administrator</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 p-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 bg-slate-50 focus:bg-white transition-all text-sm font-medium outline-none text-gray-800"
                    placeholder="admin@desakeji.id"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-gray-700 block mb-2">Kata Sandi</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 p-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 bg-slate-50 focus:bg-white transition-all text-sm font-medium outline-none text-gray-800"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button 
                  type="submit" 
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wide transform hover:-translate-y-0.5"
                >
                  <LogIn size={18} /> Masuk ke Dashboard
                </button>
              </div>

            </form>
          </div>

          {/* Footer Kartu */}
          <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
            <p className="text-[11px] font-semibold text-gray-500">
              Sistem Informasi Desa Keji &copy; 2026<br/>
              Hanya untuk pengelola yang sah.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}