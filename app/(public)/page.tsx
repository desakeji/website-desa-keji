// app/(public)/page.tsx
'use client';

import Link from 'next/link';
import { TypeAnimation } from 'react-type-animation';
import { 
  Map, Scale, Info, ShoppingCart, Archive, Image as ImageIcon, 
  Megaphone, Hammer, PieChart, Users, User, UserPlus,
  Clock, MapPin, Calendar, Sun, Moon, Sunrise, Sunset,
  FileText, ChevronRight
} from 'lucide-react';

export default function HomePage() {
  const quickLinks = [
    { name: 'Peta Desa', icon: Map, href: '/peta' },
    { name: 'Produk Hukum', icon: Scale, href: '/peraturan' },
    { name: 'Informasi Publik', icon: Info, href: '/informasi' },
    { name: 'Lapak UMKM', icon: ShoppingCart, href: '/umkm' },
    { name: 'Arsip Berita', icon: Archive, href: '/berita' },
    { name: 'Album Galeri', icon: ImageIcon, href: '/galeri' },
    { name: 'Pengaduan', icon: Megaphone, href: '/pengaduan' },
    { name: 'Pembangunan', icon: Hammer, href: '/pembangunan' },
    { name: 'Status IDM', icon: PieChart, href: '/idm' },
  ];

  const beritaTerbaru = [
    {
      id: 1,
      judul: 'Desa Keji Siapkan Budidaya Lele Bioflok Bersama BUMDes',
      tanggal: '13 Mei 2026',
      penulis: 'Admin Desa',
      kutipan: 'Pemerintah Desa Keji bersama Badan Usaha Milik Desa (BUMDes) menerima kunjungan survei lokasi dari Dinas Pertanian dan Perikanan Kabupaten Semarang...',
      gambar: 'https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 2,
      judul: 'Pengumuman Calon Tetap Anggota BPD Keji Tahun 2026-2034',
      tanggal: '30 April 2026',
      penulis: 'Admin Desa',
      kutipan: 'Pemerintah Desa Keji menginformasikan pelaksanaan pengisian anggota Badan Permusyawaratan Desa (BPD) untuk masa bakti 2026-2034 seiring berakhirnya...',
      gambar: 'https://images.unsplash.com/photo-1577563908411-50cb98976fea?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 3,
      judul: 'Pemerintah Desa Keji Mengucapkan Selamat Hari Raya Idul Fitri 1447 H',
      tanggal: '22 Maret 2026',
      penulis: 'Admin Desa',
      kutipan: 'Dalam suasana yang penuh berkah, segenap aparatur Pemerintah Desa Keji mengucapkan Selamat Hari Raya Idul Fitri 1447 H. Minal Aidin Wal Faizin...',
      gambar: 'https://images.unsplash.com/photo-1564121211835-e88c852648ab?q=80&w=600&auto=format&fit=crop'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pb-12">
      
      {/* 1. HERO SECTION & PENCARIAN */}
      <section className="relative flex flex-col items-center justify-center bg-emerald-950 min-h-[65vh] pt-20 pb-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <img src="/background.png" alt="Pemandangan Desa Keji" className="w-full h-full object-cover opacity-90" />
        </div>
        <div className="relative z-20 text-center px-4 w-full max-w-3xl">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-md mx-auto p-3 rounded-xl border border-white/20 flex items-center justify-center mb-6 shadow-xl">
             <img src="/logodesakeji.png" alt="Logo Desa Keji" className="w-full h-full object-contain drop-shadow-md" />
          </div>
          
          <div className="min-h-[80px] md:min-h-[60px] flex items-center justify-center mb-2">
            <TypeAnimation
              sequence={[
                'Sistem Informasi Desa Keji',
                2000,
                'Portal Resmi Pemerintahan',
                2000,
                'Keji Berani, Anti Korupsi',
                2000
              ]}
              wrapper="h1"
              speed={50}
              deletionSpeed={50}
              className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg"
              repeat={Infinity}
            />
          </div>

          <p className="text-emerald-50 text-lg md:text-xl font-medium tracking-wide drop-shadow mb-8 mt-2">Kec. Ungaran Barat, Kab. Semarang</p>
          <div className="bg-white p-1.5 rounded-full flex shadow-2xl max-w-xl mx-auto transform transition-transform hover:scale-[1.02]">
            <input type="text" placeholder="Cari informasi layanan atau berita desa..." className="flex-1 px-6 py-3 rounded-l-full focus:outline-none text-gray-700 bg-transparent" />
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full transition-colors font-semibold shadow-md">Cari</button>
          </div>
        </div>
      </section>

      {/* 2. MENU PINTASAN */}
      <section className="relative z-30 -mt-16 max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <style dangerouslySetInnerHTML={{__html: `.hide-scroll-bar { -ms-overflow-style: none; scrollbar-width: none; } .hide-scroll-bar::-webkit-scrollbar { display: none; }`}} />
        <div className="flex overflow-x-auto pb-8 pt-2 hide-scroll-bar gap-4 snap-x xl:justify-center">
          {quickLinks.map((link, index) => (
            <Link key={index} href={link.href} className="snap-start shrink-0 w-32 h-32 bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center justify-center gap-3 hover:-translate-y-2 hover:shadow-emerald-200/50 transition-all duration-300 group">
              <div className="p-3 rounded-full bg-emerald-50 group-hover:bg-emerald-100 transition-colors"><link.icon size={28} className="text-emerald-600" /></div>
              <span className="text-xs font-bold text-gray-700 text-center px-2 group-hover:text-emerald-700">{link.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. SAMBUTAN & STATISTIK PENDUDUK (Foto Pak Kades Sudah Update) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 w-full">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-8/12 bg-emerald-600 rounded-2xl shadow-lg p-6 lg:p-8 flex flex-col md:flex-row items-center gap-6 text-white border border-emerald-500">
            <div className="shrink-0 w-32 h-40 bg-emerald-800 rounded-xl border-4 border-emerald-300 overflow-hidden shadow-xl">
               {/* Menggunakan foto asli pakkades.png dari folder public */}
               <img src="/pakkades.png" alt="Kepala Desa Keji - Siswanto" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="italic leading-relaxed text-emerald-50 mb-5 text-sm lg:text-base">
                "Assalamu'alaikum Warahmatullahi Wabarakatuh. Selamat datang di website resmi Desa Keji. Melalui semangat <strong className="text-white">KEJI BERANI</strong> and <strong className="text-white">KEJI ANTI KORUPSI</strong>, kami berkomitmen penuh menghadirkan informasi desa yang transparan dan mudah diakses."
              </p>
              <p className="font-extrabold text-lg tracking-wide">-- SISWANTO</p>
              <p className="text-emerald-200 text-sm font-medium">Kepala Desa Keji</p>
            </div>
          </div>

          <div className="lg:w-4/12 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-50 rounded-full opacity-50"></div>
            <h3 className="text-center font-extrabold text-gray-800 mb-6 pb-3 border-b-2 border-emerald-100 relative z-10">Statistik Penduduk</h3>
            <div className="flex justify-between items-center text-center relative z-10">
              <div className="space-y-2"><div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto shadow-sm"><User size={20} strokeWidth={2.5} /></div><p className="text-2xl font-black text-gray-800">1.250</p><p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">Laki-laki</p></div>
              <div className="space-y-2"><div className="w-12 h-12 bg-pink-50 text-pink-600 rounded-full flex items-center justify-center mx-auto shadow-sm"><UserPlus size={20} strokeWidth={2.5} /></div><p className="text-2xl font-black text-gray-800">1.320</p><p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">Perempuan</p></div>
              <div className="space-y-2"><div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm"><Users size={20} strokeWidth={2.5} /></div><p className="text-2xl font-black text-emerald-600">2.570</p><p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">Total</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SEKILAS INFO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 w-full">
        <div className="bg-white border border-emerald-100 rounded-xl flex items-center overflow-hidden shadow-sm relative">
          <div className="bg-emerald-600 text-white px-5 py-3.5 text-sm font-bold shrink-0 flex items-center gap-2 z-10 shadow-lg"><Megaphone size={18} className="animate-pulse" /> Sekilas Info</div>
          <style dangerouslySetInnerHTML={{__html: `@keyframes scrolling-text { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } } .animate-scrolling { display: inline-block; animation: scrolling-text 25s linear infinite; }`}} />
          <div className="overflow-hidden whitespace-nowrap w-full">
            <div className="animate-scrolling text-sm font-bold text-gray-700 py-3.5 px-4 tracking-wide">
              Sugeng Rawuh Wonten Website Resmi Pemerintah Desa Keji Kec. Ungaran Barat Kab. Semarang <span className="text-emerald-500 mx-2">•••</span> <span className="text-red-600">KEJI BERANI (Keji Anti Korupsi)</span> <span className="text-emerald-500 mx-2">•••</span> Keji Menjunjung Kejujuran Tinggi <span className="text-emerald-500 mx-2">•••</span> Makarti Nyawiji Mbangun Desa Keji <span className="text-emerald-500 mx-2">•••</span> <span className="text-blue-600">Pelayanan Masyarakat 100% GRATIS (Estimasi 10 Menit).</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TIGA WIDGET */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md border border-gray-100 flex flex-col overflow-hidden">
            <div className="bg-emerald-600 text-white px-4 py-3 font-bold flex items-center gap-2"><Clock size={20} /> Jadwal Sholat</div>
            <div className="p-4 flex-1">
              <div className="flex justify-between items-center text-xs text-gray-500 font-medium mb-4 pb-2 border-b border-gray-100"><span className="flex items-center gap-1"><Calendar size={14} /> Waktu Setempat</span><span className="flex items-center gap-1"><MapPin size={14} /> Kab. Semarang</span></div>
              <ul className="space-y-3">
                <li className="flex justify-between items-center bg-gray-50 p-2 rounded-lg"><span className="flex items-center gap-2 text-gray-700 text-sm font-semibold"><Moon size={16} className="text-indigo-500"/> Subuh</span><span className="font-bold text-gray-800">04:30</span></li>
                <li className="flex justify-between items-center bg-gray-50 p-2 rounded-lg"><span className="flex items-center gap-2 text-gray-700 text-sm font-semibold"><Sun size={16} className="text-yellow-500"/> Dzuhur</span><span className="font-bold text-gray-800">11:46</span></li>
                <li className="flex justify-between items-center bg-gray-50 p-2 rounded-lg"><span className="flex items-center gap-2 text-gray-700 text-sm font-semibold"><Sunrise size={16} className="text-orange-400"/> Ashar</span><span className="font-bold text-gray-800">15:07</span></li>
                <li className="flex justify-between items-center bg-gray-50 p-2 rounded-lg"><span className="flex items-center gap-2 text-gray-700 text-sm font-semibold"><Sunset size={16} className="text-red-500"/> Maghrib</span><span className="font-bold text-gray-800">17:38</span></li>
                <li className="flex justify-between items-center bg-gray-50 p-2 rounded-lg"><span className="flex items-center gap-2 text-gray-700 text-sm font-semibold"><Moon size={16} className="text-slate-700"/> Isya</span><span className="font-bold text-gray-800">18:52</span></li>
              </ul>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md border border-gray-100 flex flex-col overflow-hidden">
            <div className="bg-emerald-600 text-white px-4 py-3 font-bold flex items-center gap-2"><MapPin size={20} /> Lokasi Kantor Desa</div>
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex-1 w-full bg-gray-200 rounded-lg overflow-hidden mb-4 min-h-[250px]">
                <iframe src="https://www.google.com/maps/embed?pb=!3m2!1sid!2sid!4v1783169741086!5m2!1sid!2sid!6m8!1m7!1sHXngLM2u7IHVcobjOka3-g!2m2!1d-7.117264937135624!2d110.3876973148899!3f281.70226021323737!4f7.440792834337273!5f0.7820865974627469" className="w-full h-full" style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="strict-origin-when-cross-origin"></iframe>
              </div>
              <div className="flex gap-2">
                <a href="https://www.google.com/maps/place/-7.117264937135624,110.3876973148899" target="_blank" rel="noopener noreferrer" className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-center text-sm font-semibold py-2 rounded-lg transition-colors shadow-sm">Buka Peta</a>
                <button className="flex-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-sm font-semibold py-2 rounded-lg transition-colors shadow-sm">Detail</button>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md border border-gray-100 flex flex-col overflow-hidden">
            <div className="bg-emerald-600 text-white px-4 py-3 font-bold flex items-center gap-2"><Clock size={20} /> Jam Kerja</div>
            <div className="p-0 flex-1 overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-emerald-50 text-emerald-800 border-b border-emerald-100">
                  <tr><th className="px-4 py-3 font-bold">Hari</th><th className="px-4 py-3 font-bold">Mulai</th><th className="px-4 py-3 font-bold">Selesai</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-medium text-gray-700">Senin - Kamis</td><td className="px-4 py-3 text-gray-600">08:00</td><td className="px-4 py-3 text-gray-600">15:00</td></tr>
                  <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-medium text-gray-700">Istirahat</td><td className="px-4 py-3 text-gray-600">12:00</td><td className="px-4 py-3 text-gray-600">13:00</td></tr>
                  <tr className="hover:bg-gray-50"><td className="px-4 py-3 font-medium text-gray-700">Jumat</td><td className="px-4 py-3 text-gray-600">08:00</td><td className="px-4 py-3 text-gray-600">11:30</td></tr>
                  <tr className="bg-red-50/50"><td className="px-4 py-3 font-medium text-gray-700">Sabtu</td><td colSpan={2} className="px-4 py-3"><span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-md">Libur</span></td></tr>
                  <tr className="bg-red-50/50"><td className="px-4 py-3 font-medium text-gray-700">Minggu</td><td colSpan={2} className="px-4 py-3"><span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-md">Libur</span></td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BERITA DESA TERBARU */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-extrabold text-gray-800 flex items-center gap-2"><FileText className="text-emerald-600" size={28} /> Berita Desa</h2>
          <div className="flex overflow-x-auto hide-scroll-bar gap-2 pb-1">
            <button className="shrink-0 bg-emerald-600 text-white px-5 py-2 rounded-lg text-sm font-bold shadow-md flex items-center gap-1">Terbaru <ChevronRight size={16} /></button>
            <button className="shrink-0 bg-white text-gray-600 hover:text-emerald-600 hover:border-emerald-300 border border-gray-200 px-5 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm">Berita Desa</button>
            <button className="shrink-0 bg-white text-gray-600 hover:text-emerald-600 hover:border-emerald-300 border border-gray-200 px-5 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm">PPID</button>
            <button className="shrink-0 bg-white text-gray-600 hover:text-emerald-600 hover:border-emerald-300 border border-gray-200 px-5 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm">Laporan Anggaran</button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {beritaTerbaru.map((berita) => (
            <article key={berita.id} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden flex flex-col group hover:shadow-xl transition-shadow duration-300">
              <div className="h-52 overflow-hidden relative">
                <img src={berita.gambar} alt={berita.judul} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-bold text-emerald-700 shadow-sm">Desa Keji</div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-[17px] font-extrabold text-gray-800 group-hover:text-emerald-600 transition-colors mb-3 line-clamp-2 leading-snug"><Link href={`/berita/${berita.id}`}>{berita.judul}</Link></h3>
                <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 mb-4 pb-4 border-b border-gray-100">
                  <span className="flex items-center gap-1.5"><Calendar size={14} className="text-emerald-500" /> {berita.tanggal}</span>
                  <span className="flex items-center gap-1.5"><User size={14} className="text-emerald-500" /> {berita.penulis}</span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-3 mb-5 flex-1 leading-relaxed">{berita.kutipan}</p>
                <Link href={`/berita/${berita.id}`} className="text-emerald-600 hover:text-emerald-800 text-sm font-bold flex items-center gap-1 transition-colors">Selengkapnya <ChevronRight size={16} /></Link>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/berita" className="inline-block bg-white border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-8 py-3 rounded-full font-bold transition-colors shadow-sm hover:shadow-md">Lihat Semua Berita</Link>
        </div>
      </section>

    </div>
  );
}