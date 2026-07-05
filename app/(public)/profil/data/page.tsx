// app/(public)/profil/data/page.tsx
import { Calendar, User, Eye, Info, Send, MapPin, Users, Map, Compass } from 'lucide-react';

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
          
          {/* KOLOM KIRI: Konten Utama Profil Wilayah */}
          <div className="lg:w-2/3 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-4 leading-tight">
              Profil Wilayah & Data Kependudukan
            </h1>
            
            {/* Meta Data */}
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-gray-500 mb-8 border-b border-gray-100 pb-4">
              <span className="flex items-center gap-1.5"><Calendar size={14} className="text-emerald-500" /> 05 Juli 2026</span>
              <span className="flex items-center gap-1.5"><User size={14} className="text-emerald-500" /> Admin Desa</span>
              <span className="flex items-center gap-1.5"><Eye size={14} className="text-emerald-500" /> Dibaca 4.512 Kali</span>
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
                Secara Geografis, Desa Keji terletak di wilayah dataran tinggi lereng Gunung Ungaran dengan suhu rata-rata yang sejuk. Luas wilayah Desa Keji ± 145 Hektar yang sebagian besar diperuntukkan sebagai lahan pemukiman, area Kampoeng Seni, dan lahan pertanian/perkebunan.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex items-start gap-4">
                  <Compass className="text-emerald-500 mt-1" size={24} />
                  <div>
                    <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">Sebelah Utara</h4>
                    <p className="text-gray-700 font-medium">Berbatasan dengan Kelurahan Bandarjo</p>
                  </div>
                </div>
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex items-start gap-4">
                  <Compass className="text-emerald-500 mt-1" size={24} />
                  <div>
                    <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">Sebelah Selatan</h4>
                    <p className="text-gray-700 font-medium">Berbatasan dengan Desa Lerep</p>
                  </div>
                </div>
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex items-start gap-4">
                  <Compass className="text-emerald-500 mt-1" size={24} />
                  <div>
                    <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">Sebelah Timur</h4>
                    <p className="text-gray-700 font-medium">Berbatasan dengan Kelurahan Ungaran</p>
                  </div>
                </div>
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex items-start gap-4">
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
                  <Map size={24} strokeWidth={2.5} />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Wilayah Administrasi</h2>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-wrap gap-4 justify-around text-center">
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

            {/* KARTU 3: Data Demografi */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
                  <Users size={24} strokeWidth={2.5} />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Demografi Penduduk</h2>
              </div>
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-xl p-6 shadow-md text-white">
                <p className="text-emerald-50 mb-6 text-sm">
                  Jumlah penduduk Desa Keji hingga tahun terakhir tercatat sebanyak 2.570 jiwa. Masyarakat didominasi oleh kelompok usia produktif yang mayoritas bekerja di sektor pertanian, industri UMKM (Kampoeng Seni), dan pegawai swasta.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-lg text-center">
                    <p className="text-3xl font-black mb-1">1.250</p>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-200">Laki-Laki</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-lg text-center">
                    <p className="text-3xl font-black mb-1">1.320</p>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-200">Perempuan</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm border border-white/40 p-4 rounded-lg text-center shadow-inner">
                    <p className="text-3xl font-black mb-1 text-amber-300">2.570</p>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-100">Total Penduduk</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* KOLOM KANAN: Form Layanan Cepat */}
          <div className="lg:w-1/3">
            <div className="bg-emerald-800 rounded-2xl overflow-hidden shadow-lg sticky top-24 border border-emerald-700">
              <div className="bg-emerald-600 p-5 text-center relative overflow-hidden">
                <h3 className="text-white font-extrabold text-xl relative z-10">Layanan Cepat</h3>
                <div className="absolute -bottom-8 -left-4 w-[120%] h-12 bg-emerald-800 rounded-t-[50%] rotate-3"></div>
              </div>
              
              <div className="p-6 relative z-20">
                <div className="bg-emerald-50 text-emerald-800 text-[11px] font-bold p-3 rounded-lg flex items-start gap-2 mb-6 shadow-inner border border-emerald-100">
                  <Info size={16} className="shrink-0 text-emerald-600 mt-0.5" />
                  <p>Isi form di bawah ini. Admin desa akan menghubungi Anda via WhatsApp untuk konfirmasi.</p>
                </div>

                <form className="space-y-4">
                  <div>
                    <label className="text-white text-sm font-semibold mb-1.5 block">Nama Lengkap</label>
                    <input type="text" className="w-full p-2.5 rounded-lg border-none focus:ring-2 focus:ring-amber-400 bg-white shadow-inner text-gray-800 font-medium text-sm outline-none" placeholder="Nama sesuai KTP" />
                  </div>
                  
                  <div>
                    <label className="text-white text-sm font-semibold mb-1.5 block">No. WhatsApp</label>
                    <input type="tel" className="w-full p-2.5 rounded-lg border-none focus:ring-2 focus:ring-amber-400 bg-white shadow-inner text-gray-800 font-medium text-sm outline-none" placeholder="Contoh: 08123456789" />
                  </div>

                  <div>
                    <label className="text-white text-sm font-semibold mb-1.5 block">Pilih Layanan</label>
                    <select className="w-full p-2.5 rounded-lg border-none focus:ring-2 focus:ring-amber-400 bg-white shadow-inner text-gray-800 font-medium text-sm outline-none">
                      <option value="" disabled selected>-- Pilih Keperluan --</option>
                      <option value="ktp">Surat Pengantar KTP / KK</option>
                      <option value="skck">Surat Pengantar SKCK</option>
                      <option value="domisili">Surat Keterangan Domisili</option>
                      <option value="usaha">Surat Keterangan Usaha (SKU)</option>
                      <option value="tidak-mampu">SKTM (Tidak Mampu)</option>
                      <option value="lainnya">Lainnya...</option>
                    </select>
                  </div>

                  <button type="button" className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-extrabold py-3 rounded-lg transition-colors mt-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                    <Send size={16} /> Kirim Permohonan
                  </button>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}