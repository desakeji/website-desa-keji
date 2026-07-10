// app/(public)/profil/sejarah/page.tsx

import {
  Calendar,
  User,
  Eye,
  Map,
  Utensils,
  Home as HomeIcon,
  Palette,
} from 'lucide-react';

import SidebarLayanan from '@/components/SidebarLayanan';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

interface PilihanLayanan {
  id: number;
  nama: string;
  slug: string;
}

async function getDaftarLayanan(): Promise<PilihanLayanan[]> {
  const { data, error } = await supabase
    .from('layanan')
    .select('id, nama, slug')
    .eq('aktif', true)
    .order('urutan', { ascending: true });

  if (error) {
    console.error('Gagal mengambil daftar layanan:', error);
    return [];
  }

  return (data ?? []).map((layanan) => ({
    id: Number(layanan.id),
    nama: String(layanan.nama),
    slug: String(layanan.slug),
  }));
}

export default async function SejarahDesaPage() {
  const daftarLayanan = await getDaftarLayanan();

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Teks Berjalan */}
        <div className="relative mb-6 flex items-center gap-3 overflow-hidden rounded bg-emerald-800 px-4 py-2 text-sm font-medium text-white shadow-sm">
          <div className="z-10 shrink-0 rounded bg-emerald-600 px-3 py-1 text-xs font-bold shadow-md">
            Sekilas Info
          </div>

          <style
            dangerouslySetInnerHTML={{
              __html: `
                @keyframes scrolling-info {
                  0% {
                    transform: translateX(100%);
                  }

                  100% {
                    transform: translateX(-100%);
                  }
                }

                .animate-scrolling-info {
                  display: inline-block;
                  animation: scrolling-info 20s linear infinite;
                  white-space: nowrap;
                }
              `,
            }}
          />

          <div className="w-full flex-1 overflow-hidden">
            <div className="animate-scrolling-info">
              Untuk Permohonan Informasi Silakan Masuk ke Menu PPID
              Website Ini. *** Sejarah & Potensi Wisata Desa Keji,
              Kecamatan Ungaran Barat, Kabupaten Semarang ***
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* KOLOM KIRI: Konten Utama Sejarah dan Potensi */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8 lg:w-2/3">
            <h1 className="mb-4 text-2xl font-extrabold leading-tight text-gray-800 md:text-3xl">
              Sejarah & Potensi Pariwisata Desa Keji
            </h1>

            {/* Metadata */}
            <div className="mb-6 flex flex-wrap gap-4 border-b border-gray-100 pb-4 text-xs font-semibold text-gray-500">
              <span className="flex items-center gap-1.5">
                <Calendar
                  size={14}
                  className="text-emerald-500"
                />
                05 Juli 2026
              </span>

              <span className="flex items-center gap-1.5">
                <User
                  size={14}
                  className="text-emerald-500"
                />
                Admin Desa
              </span>

              <span className="flex items-center gap-1.5">
                <Eye
                  size={14}
                  className="text-emerald-500"
                />
                Dibaca 5.027 Kali
              </span>
            </div>

            {/* Gambar Utama */}
            <div className="mb-8 h-[300px] w-full overflow-hidden rounded-xl shadow-sm md:h-[400px]">
              <img
                src="/background.png"
                alt="Potensi Wisata Desa Keji"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Isi Artikel */}
            <div className="prose prose-emerald max-w-none text-justify leading-relaxed text-gray-700">
              <p className="mb-6 text-lg font-medium text-gray-800">
                Desa Keji merupakan salah satu desa yang terdapat di
                Kecamatan Ungaran Barat, Kabupaten Semarang. Berada di
                lereng Gunung Ungaran dengan panorama khas pedesaan,
                hawa di desa ini terasa begitu sejuk.
              </p>

              <p>
                Desa ini memiliki banyak potensi, salah satunya yaitu{' '}
                <strong>Kampoeng Seni</strong> yang terdapat di Dusun
                Suruhan. Desa wisata yang berjarak sekitar 26 km dari
                pusat Kota Semarang ini merintis pariwisatanya melalui
                Sanggar Tari dan Studio Pelestari Seni Budaya dan
                Permainan Tradisional{' '}
                <strong>Yoss Tradisional Centre (YTC)</strong>.
              </p>

              <p>
                Penyambutan wisatawan biasanya dilakukan secara meriah
                dengan{' '}
                <strong>Tarian Kuda Debog (Pelepah Pisang)</strong>{' '}
                oleh anak-anak desa. Boleh dibilang, YTC hampir serupa
                dengan Saung Angklung Mang Udjo di Bandung atau Bali
                Classic Centre. Tempat-tempat tersebut menonjolkan
                kesenian masing-masing daerah yang khas dalam sebuah
                pertunjukan yang menarik.
              </p>

              {/* Potensi Kebudayaan */}
              <div className="mb-4 mt-8 flex items-center gap-2 border-b-2 border-emerald-100 pb-2">
                <Palette
                  className="text-emerald-600"
                  size={24}
                />

                <h3 className="m-0 text-xl font-bold text-gray-800">
                  Potensi Kebudayaan
                </h3>
              </div>

              <p>
                Sumber air <strong>Watu Kemloso</strong> yang tidak jauh
                dari lokasi Kampoeng Seni juga menjadi perlengkapan
                pariwisata. Setiap tahunnya terdapat ritual adat{' '}
                <strong>Iriban Banyu Kemloso</strong>. Perayaan yang
                jatuh pada bulan Agustus, tepatnya pada hari Sabtu
                Pahing, biasanya digelar secara besar-besaran dengan
                kirab sesaji ke sumber air yang menjadi sumber
                penghidupan warga.
              </p>

              {/* Potensi Kuliner */}
              <div className="mb-4 mt-8 flex items-center gap-2 border-b-2 border-emerald-100 pb-2">
                <Utensils
                  className="text-emerald-600"
                  size={24}
                />

                <h3 className="m-0 text-xl font-bold text-gray-800">
                  Potensi Kuliner
                </h3>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-4">
                  <h4 className="mb-1 text-lg font-bold text-emerald-800">
                    1. Gethuk Tetek Melek
                  </h4>

                  <p className="text-sm">
                    Berbahan baku singkong, jajanan ini hampir sama
                    dengan kue jongkong. Perbedaannya terdapat pada
                    pembungkusnya. Jongkong dibungkus menggunakan daun
                    pisang, sedangkan tetek melek dibungkus menggunakan
                    plastik.
                  </p>

                  <p className="text-sm">
                    Cara membuatnya yaitu singkong diparut, diberi
                    garam dan gula jawa, kemudian dikukus. Setelah
                    matang, adonan diletakkan di atas nampan, dipotong,
                    dan disajikan dengan parutan kelapa.
                  </p>

                  <p className="text-sm">
                    Makanan ini dinamakan &quot;Tetek Melek&quot;
                    karena proses pembuatannya dilakukan sambil{' '}
                    <em>melek-melek</em> atau begadang agar orang yang
                    menyantapnya dapat terus terjaga ketika menyaksikan
                    pertunjukan adat.
                  </p>
                </div>

                <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-4">
                  <h4 className="mb-1 text-lg font-bold text-emerald-800">
                    2. Pecel Gablok
                  </h4>

                  <p className="text-sm">
                    Menu ini menggunakan <em>gablok</em> yang dibuat
                    dari beras. Beras dimasukkan ke dalam plastik,
                    kemudian direbus hingga penuh.
                  </p>

                  <p className="text-sm">
                    Beras setengah matang beserta plastiknya lalu
                    dikukus selama kurang lebih satu jam. Gablok
                    disantap dengan sambal pecel yang dicampur berbagai
                    sayuran, seperti sawi, tauge, bayam, dan daun
                    kenci.
                  </p>

                  <p className="text-sm">
                    Sajian ini biasanya dilengkapi dengan tempe mendoan
                    hangat.
                  </p>
                </div>
              </div>

              {/* Paket Wisata */}
              <div className="mb-4 mt-8 flex items-center gap-2 border-b-2 border-emerald-100 pb-2">
                <Map
                  className="text-emerald-600"
                  size={24}
                />

                <h3 className="m-0 text-xl font-bold text-gray-800">
                  Paket Wisata
                </h3>
              </div>

              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong>Paket Edukatif:</strong> Wisatawan diajak
                  belajar membatik motif khas kuda debog, bunga
                  terompet, dan srengengen, serta mengenal tokoh wayang
                  Punakawan.
                </li>

                <li>
                  <strong>Paket One Day atau Satu Hari:</strong>{' '}
                  Wisatawan dijemput dari bandara atau stasiun kereta
                  api di Semarang menggunakan bus. Selama satu hari,
                  wisatawan akan diajak mengunjungi Industri Herbal Ibu
                  Hj. Herlin, YTC, industri makanan khas tumpi,
                  Industri Tas Deliwang, dan Industri Tahu Baxo Ibu
                  Pudji.
                </li>
              </ul>

              {/* Penginapan */}
              <div className="mb-4 mt-8 flex items-center gap-2 border-b-2 border-emerald-100 pb-2">
                <HomeIcon
                  className="text-emerald-600"
                  size={24}
                />

                <h3 className="m-0 text-xl font-bold text-gray-800">
                  Penginapan (Homestay)
                </h3>
              </div>

              <p>
                Bagi wisatawan yang ingin merasakan secara langsung
                suasana malam di pedesaan, penginapan atau{' '}
                <em>homestay</em> tersedia di rumah-rumah penduduk
                dengan harga yang terjangkau serta keramahan khas warga
                Desa Keji.
              </p>
            </div>
          </div>

          {/* KOLOM KANAN: Komponen Layanan Cepat */}
          <div className="lg:w-1/3">
            <SidebarLayanan daftarLayanan={daftarLayanan} />
          </div>
        </div>
      </div>
    </div>
  );
}