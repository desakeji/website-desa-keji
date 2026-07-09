// app/(public)/profil/data/page.tsx
import { Calendar, User, Eye, MapPin, Users, Map as MapIcon, Compass, Building, Phone, Mail, Globe, AtSign, Share2 } from 'lucide-react';
import SidebarLayanan from '@/components/SidebarLayanan'; // Menggunakan komponen pintar kita

export default function ProfilWilayahPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Teks Berjalan */}
        <div className="bg-emerald-800 text-white text-sm font-medium px-4 py-2 rounded flex items-center gap-3 mb-6 shadow-sm overflow-hidden relative">
          <div className="bg-emerald-600 px-3 py-1 rounded text-xs font-bold shrink-0 z-10 shadow-md">
            Sekilas Info
          </div>
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes scrolling-info { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
            .animate-scrolling-info { display: inline-block; animation: scrolling-info 20s linear infinite; white-space: nowrap; }
          `}} />
          <div className="overflow-hidden w-full flex-1">
            <div className="animate-scrolling-info">
              Untuk Permohonan Informasi Silahkan Masuk Ke Menu PPID Website ini. *** Profil Wilayah & Demografi Desa Keji Kecamatan Ungaran Barat Kabupaten Semarang ***
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* KOLOM KIRI: Konten Utama */}
          <div className="lg:w-2/3 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-4 leading-tight">
              Profil Desa Keji
            </h1>
            
            {/* Meta Data */}
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-gray-500 mb-8 border-b border-gray-100 pb-4">
              <span className="flex items-center gap-1.5"><Calendar size={14} className="text-emerald-500" /> 10 Juli 2026</span>
              <span className="flex items-center gap-1.5"><User size={14} className="text-emerald-500" /> Admin Desa</span>
              <span className="flex items-center gap-1.5"><Eye size={14} className="text-emerald-500" /> Dibaca 4.512 Kali</span>
            </div>

            {/* KARTU BARU: Informasi Pemerintahan & Kontak */}
            <div className="mb-10 bg-emerald-50 border border-emerald-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-start gap-4 mb-5">
                <div className="bg-emerald-600 p-3 rounded-xl text-white shrink-0 shadow-md">
                  <Building size={24} />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-emerald-900">Pemerintah Desa Keji</h2>
                  <p className="text-gray-700 mt-2 text-sm leading-relaxed text-justify">
                    Salah satu unit pemerintahan yang berperan aktif dalam memberikan layanan publik secara profesional dan transparan kepada seluruh masyarakat Desa Keji.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 border-t border-emerald-200/60 pt-4">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-emerald-800 uppercase">Alamat Kantor</p>
                    <p className="text-sm text-gray-700 font-medium">Jl Bima Sakti Raya No 12<br/>Desa Keji</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-emerald-600 shrink-0" />
                    <p className="text-sm text-gray-700 font-medium">024-76914580</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-emerald-600 shrink-0" />
                    <p className="text-sm text-gray-700 font-medium">desakeji01@gmail.com</p>
                  </div>
                </div>
              </div>

              {/* Sosial Media & Web (Ikon Diperbaiki) */}
              <div className="mt-5 flex flex-wrap gap-3">
                <a href="https://keji-ungaranbarat.semarangkab.go.id" target="_blank" className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-emerald-200 text-xs font-bold text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors">
                  <Globe size={14} /> Website Resmi
                </a>
                <a href="#" className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-emerald-200 text-xs font-bold text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors">
                  <AtSign size={14} /> @desakeji
                </a>
                <a href="#" className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-emerald-200 text-xs font-bold text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors">
                  <Share2 size={14} /> DesaKeji
                </a>
              </div>
            </div>

            {/* KARTU 1: Kondisi Geografis */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
                  <MapPin size={24} strokeWidth={2.5} />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Kondisi Geografis</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4 text-justify">
                Secara Geografis, Desa Keji terletak di wilayah dataran tinggi lereng Gunung Ungaran dengan suhu rata-rata yang sejuk. Sebagian besar lahan diperuntukkan sebagai lahan pemukiman, area Kampoeng Seni, dan lahan pertanian/perkebunan.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-gray-100 flex items-start gap-4">
                  <Compass className="text-emerald-500 mt-1" size={24} />
                  <div>
                    <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">Sebelah Utara</h4>
                    <p className="text-gray-700 font-medium">Berbatasan dengan Kelurahan Bandarjo</p>
                  </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-gray-100 flex items-start gap-4">
                  <Compass className="text-emerald-500 mt-1" size={24} />
                  <div>
                    <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">Sebelah Selatan</h4>
                    <p className="text-gray-700 font-medium">Berbatasan dengan Desa Lerep</p>
                  </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-gray-100 flex items-start gap-4">
                  <Compass className="text-emerald-500 mt-1" size={24} />
                  <div>
                    <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">Sebelah Timur</h4>
                    <p className="text-gray-700 font-medium">Berbatasan dengan Kelurahan Ungaran</p>
                  </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-gray-100 flex items-start gap-4">
                  <Compass className="text-emerald-500 mt-1" size={24} />
                  <div>
                    <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">Sebelah Barat</h4>
                    <p className="text-gray-700 font-medium">Berbatasan dengan Desa Kalisidi</p>
                  </div>
                </div>
              </div>
            </div>

            {/* KARTU 2: Pembagian Wilayah Administrasi */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
                  <MapIcon size={24} strokeWidth={2.5} />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Wilayah Administrasi</h2>
              </div>
              <div className="bg-white border border-emerald-100 rounded-xl p-5 flex flex-wrap gap-4 justify-around text-center shadow-sm">
                <div className="flex flex-col items-center p-4">
                  <span className="text-4xl font-black text-emerald-600">4</span>
                  <span className="text-sm font-bold text-gray-500 mt-2 uppercase tracking-wide">Dusun</span>
                </div>
                <div className="flex flex-col items-center p-4">
                  <span className="text-4xl font-black text-emerald-600">6</span>
                  <span className="text-sm font-bold text-gray-500 mt-2 uppercase tracking-wide">Rukun Warga (RW)</span>
                </div>
                <div className="flex flex-col items-center p-4">
                  <span className="text-4xl font-black text-emerald-600">24</span>
                  <span className="text-sm font-bold text-gray-500 mt-2 uppercase tracking-wide">Rukun Tetangga (RT)</span>
                </div>
              </div>
            </div>

          </div>

          {/* KOLOM KANAN: Form Layanan Cepat Component */}
          <div className="lg:w-1/3">
            <SidebarLayanan />
          </div>

        </div>
      </div>
    </div>
  );
}