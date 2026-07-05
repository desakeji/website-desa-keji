// app/(public)/profil/visi-misi/page.tsx
import { Calendar, User, Eye, Info, Send, Target, ListChecks, CheckCircle2 } from 'lucide-react';

export default function VisiMisiPage() {
  const misiList = [
    "Mewujudkan tata kelola Pemerintahan Desa yang transparan, akuntabel, dan bebas dari korupsi (KEJI BERANI).",
    "Meningkatkan kualitas pelayanan publik yang cepat, mudah, dan 100% gratis bagi seluruh warga.",
    "Mengoptimalkan potensi pariwisata Kampoeng Seni dan kebudayaan lokal untuk meningkatkan perekonomian masyarakat.",
    "Mendorong pemberdayaan UMKM dan Badan Usaha Milik Desa (BUMDes) sebagai motor penggerak ekonomi desa.",
    "Meningkatkan kualitas infrastruktur desa yang merata, ramah lingkungan, dan tepat sasaran.",
    "Membangun kerukunan antarwarga berlandaskan nilai-nilai kejujuran dan semangat gotong royong (Makarti Nyawiji Mbangun Desa Keji)."
  ];

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
              Untuk Permohonan Informasi Silahkan Masuk Ke Menu PPID Website ini. *** Visi & Misi Desa Keji Kecamatan Ungaran Barat Kabupaten Semarang ***
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* KOLOM KIRI: Konten Utama Visi Misi */}
          <div className="lg:w-2/3 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-4 leading-tight">
              Visi dan Misi Pemerintah Desa Keji
            </h1>
            
            {/* Meta Data */}
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-gray-500 mb-8 border-b border-gray-100 pb-4">
              <span className="flex items-center gap-1.5"><Calendar size={14} className="text-emerald-500" /> 05 Juli 2026</span>
              <span className="flex items-center gap-1.5"><User size={14} className="text-emerald-500" /> Admin Desa</span>
              <span className="flex items-center gap-1.5"><Eye size={14} className="text-emerald-500" /> Dibaca 3.102 Kali</span>
            </div>

            {/* VISI SECTION */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-emerald-100 p-2.5 rounded-xl text-emerald-600">
                  <Target size={28} strokeWidth={2.5} />
                </div>
                <h2 className="text-2xl font-black text-gray-800">Visi</h2>
              </div>
              
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl p-6 md:p-8 shadow-lg text-center relative overflow-hidden border border-emerald-500">
                {/* Aksen Background Visi */}
                <div className="absolute -top-10 -right-10 text-white/10">
                  <Target size={150} strokeWidth={1} />
                </div>
                <p className="text-white text-lg md:text-xl font-extrabold leading-relaxed relative z-10 drop-shadow-md">
                  "Terwujudnya Desa Keji yang Mandiri, Sejahtera, Berbudaya, serta Terciptanya Tata Kelola Pemerintahan yang Bersih dan Berani Anti Korupsi."
                </p>
              </div>
            </div>

            {/* MISI SECTION */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-emerald-100 p-2.5 rounded-xl text-emerald-600">
                  <ListChecks size={28} strokeWidth={2.5} />
                </div>
                <h2 className="text-2xl font-black text-gray-800">Misi</h2>
              </div>
              
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-inner">
                <ul className="space-y-4">
                  {misiList.map((misi, index) => (
                    <li key={index} className="flex items-start gap-4 p-3 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-emerald-100 hover:shadow-sm">
                      <div className="mt-0.5 bg-white rounded-full p-1 shadow-sm border border-emerald-200 shrink-0">
                        <CheckCircle2 size={20} className="text-emerald-500" />
                      </div>
                      <p className="text-gray-700 font-medium leading-relaxed">
                        {misi}
                      </p>
                    </li>
                  ))}
                </ul>
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