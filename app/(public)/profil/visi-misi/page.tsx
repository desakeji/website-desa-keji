// app/(public)/profil/visi-misi/page.tsx
import { Calendar, User, Eye, Target, ListChecks, CheckCircle2, ChevronRight } from 'lucide-react';
import SidebarLayanan from '@/components/SidebarLayanan'; // Panggil komponen layanan

export default function VisiMisiPage() {
  
  // Data Misi dan Tujuan yang sudah di-struktur-kan
  const misiDanTujuan = [
    {
      id: 1,
      bidang: "PEMBERDAYAAN",
      tujuan: "Memperdayakan Semua Potensi yang ada di masyarakat yang meliputi:",
      poin: [
        "Pemberdayaan sumber daya manusia (SDM)",
        "Pemberdayaan sumber daya alam (SDA)",
        "Pemberdayaan ekonomi masyarakat",
        "Pemberdayaan pemuda, Agama, seni budaya, dan olahraga"
      ]
    },
    {
      id: 2,
      bidang: "PEMBINAAN",
      tujuan: "Menciptakan kondisi masyarakat Desa Keji yang Aman, Tertib, Guyup, dan Rukun dalam kehidupan bermasyarakat, yang meliputi:",
      poin: [
        "Pembinaan Pendidikan dan keagamaan",
        "Pembinaan kelembagaan masyarakat desa",
        "Pembinaan kewilayahan (tilik dusun)"
      ]
    },
    {
      id: 3,
      bidang: "PEMERINTAHAN",
      tujuan: "Optimalisasi penyelenggaraan pemerintah Desa Keji, yang meliputi:",
      poin: [
        "Penyelenggaraan pemerintahan yang transparan dan akuntabel",
        "Pelayanan kepada masyarakat yang prima. Yaitu Cepat, Tepat, dan Benar",
        "Pelaksanaan pembangunan yang berkesinambungan dan mengedepankan partisipasi dan gotong royong masyarakat"
      ]
    },
    {
      id: 4,
      bidang: "PEMBANGUNAN",
      tujuan: "Bekerja sama dengan Pemerintah Daerah Kabupaten, Provinsi, dan Pusat dalam mewujudkan Pembangunan Infrastruktur di Desa Keji yang meliputi:",
      poin: [
        "Bankeu Kabupaten (Aspirasi APBD Kabupaten Semarang)",
        "Bankeu Provinsi (Aspirasi APBD Provinsi Jawa Tengah)",
        "Bankeu Pusat (Aspirasi APBN)"
      ]
    }
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
              Untuk Permohonan Informasi Silahkan Masuk Ke Menu PPID Website ini. *** Visi & Misi Pemerintah Desa Keji Kecamatan Ungaran Barat Kabupaten Semarang ***
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* KOLOM KIRI: Konten Utama Visi Misi */}
          <div className="lg:w-2/3 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-4 leading-tight">
              Visi dan Misi Pemerintah Desa
            </h1>
            
            {/* Meta Data */}
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-gray-500 mb-8 border-b border-gray-100 pb-4">
              <span className="flex items-center gap-1.5"><Calendar size={14} className="text-emerald-500" /> 10 Juli 2026</span>
              <span className="flex items-center gap-1.5"><User size={14} className="text-emerald-500" /> Admin Desa</span>
              <span className="flex items-center gap-1.5"><Eye size={14} className="text-emerald-500" /> Dibaca 3.102 Kali</span>
            </div>

            {/* VISI SECTION */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-emerald-100 p-2.5 rounded-xl text-emerald-600">
                  <Target size={28} strokeWidth={2.5} />
                </div>
                <h2 className="text-2xl font-black text-gray-800">Visi</h2>
              </div>
              
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl p-8 shadow-lg text-center relative overflow-hidden border border-emerald-500">
                <div className="absolute -top-10 -right-10 text-white/10">
                  <Target size={150} strokeWidth={1} />
                </div>
                <p className="text-white text-lg md:text-xl font-extrabold leading-relaxed relative z-10 drop-shadow-md tracking-wide uppercase">
                  "BERSAMA MEMBANGUN DESA MELALUI TATA KELOLA PEMERINTAHAN YANG BERSIH, TRANSPARAN, AKUNTABEL, DAN PARTISIPATIF MENUJU DESA YANG MAJU, MANDIRI DAN BERBUDAYA BERLANDASKAN PERILAKU TERPUJI"
                </p>
              </div>
            </div>

            {/* MISI SECTION */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-emerald-100 p-2.5 rounded-xl text-emerald-600">
                  <ListChecks size={28} strokeWidth={2.5} />
                </div>
                <h2 className="text-2xl font-black text-gray-800">Misi dan Tujuan</h2>
              </div>
              
              <div className="space-y-6">
                {misiDanTujuan.map((misi) => (
                  <div key={misi.id} className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    
                    {/* Header Misi */}
                    <div className="bg-white border-b border-gray-200 p-4 md:px-6 flex items-start gap-4">
                      <div className="bg-emerald-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-black text-lg shrink-0 shadow-sm mt-1">
                        {misi.id}
                      </div>
                      <div>
                        <h3 className="text-emerald-800 font-extrabold text-lg tracking-wide uppercase">
                          MISI BIDANG {misi.bidang}
                        </h3>
                        <p className="text-gray-700 font-medium text-sm mt-1 leading-relaxed">
                          {misi.tujuan}
                        </p>
                      </div>
                    </div>

                    {/* Poin-poin Misi */}
                    <div className="p-4 md:px-6 bg-emerald-50/30">
                      <ul className="space-y-3">
                        {misi.poin.map((poinItem, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <ChevronRight size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                            <span className="text-gray-700 font-medium text-sm leading-relaxed">
                              {poinItem}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* KOLOM KANAN: Panggil Komponen Layanan */}
          <div className="lg:w-1/3">
            <SidebarLayanan />
          </div>

        </div>
      </div>
    </div>
  );
}