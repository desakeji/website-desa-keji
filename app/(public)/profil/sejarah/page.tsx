// app/(public)/profil/sejarah/page.tsx
import { Calendar, User, Eye, Info, Send, Map, Utensils, Home as HomeIcon, Palette } from 'lucide-react';

export default function SejarahDesaPage() {
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
              Untuk Permohonan Informasi Silahkan Masuk Ke Menu PPID Website ini. *** Sejarah & Potensi Wisata Desa Keji Kecamatan Ungaran Barat Kabupaten Semarang ***
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* KOLOM KIRI: Konten Utama Sejarah & Potensi */}
          <div className="lg:w-2/3 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-4 leading-tight">
              Sejarah & Potensi Pariwisata Desa Keji
            </h1>
            
            {/* Meta Data */}
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-gray-500 mb-6 border-b border-gray-100 pb-4">
              <span className="flex items-center gap-1.5"><Calendar size={14} className="text-emerald-500" /> 05 Juli 2026</span>
              <span className="flex items-center gap-1.5"><User size={14} className="text-emerald-500" /> Admin Desa</span>
              <span className="flex items-center gap-1.5"><Eye size={14} className="text-emerald-500" /> Dibaca 5.027 Kali</span>
            </div>

            {/* Gambar Utama */}
            <div className="w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden mb-8 shadow-sm">
              <img 
                src="/background.png" 
                alt="Potensi Wisata Desa Keji" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
              />
            </div>

            {/* Teks Artikel (Sudah Dirapikan & Dipercantik) */}
            <div className="prose prose-emerald max-w-none text-gray-700 leading-relaxed text-justify">
              <p className="text-lg font-medium text-gray-800 mb-6">
                Desa Keji merupakan salah satu desa yang terdapat di Kecamatan Ungaran Barat, Kabupaten Semarang. Berada di lereng Gunung Ungaran dengan panorama khas pedesaan, hawa di desa ini terasa begitu sejuk. 
              </p>

              <p>
                Desa ini memiliki banyak potensi, salah satunya yaitu <strong>Kampoeng Seni</strong> yang terdapat di Dusun Suruhan. Desa wisata yang berjarak sekitar 26 km dari pusat Kota Semarang ini merintis pariwisatanya melalui Sanggar Tari dan Studio Pelestari Seni Budaya dan Permainan Tradisional <strong>Yoss Tradisional Centre (YTC)</strong>.
              </p>
              
              <p>
                Penyambutan wisatawan biasanya dilakukan secara meriah dengan <strong>Tarian Kuda Debog (Pelepah Pisang)</strong> oleh anak-anak desa. Boleh dibilang, YTC hampir serupa dengan Saung Angklung Mang Udjo di Bandung atau Bali Classic Centre. Tempat-tempat tersebut menonjolkan kesenian masing-masing daerah yang khas dalam sebuah pertunjukan yang menarik.
              </p>

              {/* Seksi Kebudayaan */}
              <div className="mt-8 mb-4 flex items-center gap-2 border-b-2 border-emerald-100 pb-2">
                <Palette className="text-emerald-600" size={24} />
                <h3 className="text-xl font-bold text-gray-800 m-0">Potensi Kebudayaan</h3>
              </div>
              <p>
                Sumber air <strong>Watu Kemloso</strong> yang tak jauh dari lokasi Kampoeng Seni juga menjadi perlengkapan pariwisataan. Lebih-lebih, setiap tahunnya terdapat ritual adat <strong>Iriban Banyu Kemloso</strong>. Perayaan yang jatuh pada bulan Agustus, tepatnya pada hari Sabtu Pahing, biasanya digelar besar-besaran dengan kirab sesaji ke sumber air penghidupan warga tersebut.
              </p>

              {/* Seksi Kuliner */}
              <div className="mt-8 mb-4 flex items-center gap-2 border-b-2 border-emerald-100 pb-2">
                <Utensils className="text-emerald-600" size={24} />
                <h3 className="text-xl font-bold text-gray-800 m-0">Potensi Kuliner</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                  <h4 className="font-bold text-emerald-800 text-lg mb-1">1. Gethuk Tetek Melek</h4>
                  <p className="text-sm">Berbahan baku singkong, jajanan ini hampir sama dengan kue jongkong. Bedanya ada pada pembungkusnya; jongkong dibungkus daun pisang, sedangkan tetek melek dibungkus plastik. Cara membuatnya: singkong diparut, diberi garam dan gula jawa, dikukus, diletakkan di atas nampan, lalu dipotong dan disajikan dengan parutan kelapa. Dinamakan "Tetek Melek" karena pembuatannya sambil <em>melek-melek</em> (begadang) agar yang menyantap gethuk ini bisa terus terjaga menyaksikan pertunjukan adat.</p>
                </div>
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                  <h4 className="font-bold text-emerald-800 text-lg mb-1">2. Pecel Gablok</h4>
                  <p className="text-sm">Menu yang satu ini menggunakan <em>gablok</em> yang dibuat dari beras. Beras dimasukkan ke plastik, direbus hingga penuh, lalu beras setengah matang beserta plastiknya dikukus selama kurang lebih satu jam. Gablok disantap tanpa bumbu tambahan, cukup disiram bumbu sambal pecel yang dicampur sayuran sawi, tauge, bayam, daun kenci, plus tambahan tempe mendoan hangat.</p>
                </div>
              </div>

              {/* Seksi Paket Wisata */}
              <div className="mt-8 mb-4 flex items-center gap-2 border-b-2 border-emerald-100 pb-2">
                <Map className="text-emerald-600" size={24} />
                <h3 className="text-xl font-bold text-gray-800 m-0">Paket Wisata</h3>
              </div>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Paket Edukatif:</strong> Turis diajak belajar membatik motif khas kuda debog-bunga terompet dan srengengen, serta pengenalan tokoh wayang punakawan.</li>
                <li><strong>Paket One Day (Satu Hari):</strong> Antar jemput wisatawan dari bandara atau stasiun kereta api di Semarang menggunakan bus. Seharian, para turis akan diantar menjelajahi Industri Herbal Ibu Hj Herlin, YTC, Industri makanan khas Tumpi, Industri Tas Deliwang, dan Industri Tahu Baxo Ibu Pudji.</li>
              </ul>

              {/* Seksi Penginapan */}
              <div className="mt-8 mb-4 flex items-center gap-2 border-b-2 border-emerald-100 pb-2">
                <HomeIcon className="text-emerald-600" size={24} />
                <h3 className="text-xl font-bold text-gray-800 m-0">Penginapan (Homestay)</h3>
              </div>
              <p>
                Bagi wisatawan yang ingin merasakan langsung suasana malam di pedesaan, penginapan <em>(homestay)</em> tersedia di rumah-rumah penduduk dengan harga yang sangat terjangkau, lengkap dengan keramahan khas warga Desa Keji.
              </p>
            </div>
          </div>

          {/* KOLOM KANAN: Form Layanan Cepat (Sesuai Konsep Sebelumnya) */}
          <div className="lg:w-1/3">
            <div className="bg-emerald-800 rounded-2xl overflow-hidden shadow-lg sticky top-24 border border-emerald-700">
              
              <div className="bg-emerald-600 p-5 text-center relative overflow-hidden">
                <h3 className="text-white font-extrabold text-xl relative z-10">Layanan Cepat</h3>
                <div className="absolute -bottom-8 -left-4 w-[120%] h-12 bg-emerald-800 rounded-t-[50%] rotate-3"></div>
              </div>
              
              <div className="p-6 relative z-20">
                {/* Petunjuk Penggunaan */}
                <div className="bg-emerald-50 text-emerald-800 text-[11px] font-bold p-3 rounded-lg flex items-start gap-2 mb-6 shadow-inner border border-emerald-100">
                  <Info size={16} className="shrink-0 text-emerald-600 mt-0.5" />
                  <p>Isi form di bawah ini. Admin desa akan menghubungi Anda via WhatsApp untuk konfirmasi.</p>
                </div>

                <form className="space-y-4">
                  <div>
                    <label className="text-white text-sm font-semibold mb-1.5 block">Nama Lengkap</label>
                    <input 
                      type="text" 
                      className="w-full p-2.5 rounded-lg border-none focus:ring-2 focus:ring-amber-400 bg-white shadow-inner text-gray-800 font-medium text-sm outline-none"
                      placeholder="Nama sesuai KTP"
                    />
                  </div>
                  
                  <div>
                    <label className="text-white text-sm font-semibold mb-1.5 block">No. WhatsApp</label>
                    <input 
                      type="tel" 
                      className="w-full p-2.5 rounded-lg border-none focus:ring-2 focus:ring-amber-400 bg-white shadow-inner text-gray-800 font-medium text-sm outline-none"
                      placeholder="Contoh: 08123456789"
                    />
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

                  <button 
                    type="button"
                    className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-extrabold py-3 rounded-lg transition-colors mt-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
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