import Link from 'next/link';
import { MapPin, Phone, Mail, Globe, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Kolom 1: Profil & Slogan */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold border-b-2 border-emerald-500 pb-2 inline-block">Desa Keji</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Website Resmi Pemerintah Desa Keji, Kecamatan Ungaran Barat, Kabupaten Semarang.
            </p>
            <div className="bg-slate-800 p-3 rounded-md border border-slate-700">
              <p className="font-semibold text-emerald-400">KEJI BERANI</p>
              <p className="text-xs text-gray-300">Keji Anti Korupsi</p>
              <p className="text-xs text-gray-300 italic mt-1">"Makarti Nyawiji Mbangun Desa Keji"</p>
            </div>
          </div>

          {/* Kolom 2: Kontak & Layanan */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold border-b-2 border-emerald-500 pb-2 inline-block">Hubungi Kami</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="text-emerald-500 shrink-0" size={18} />
                <span>Kantor Kepala Desa Keji, Kec. Ungaran Barat, Kab. Semarang</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-emerald-500 shrink-0" size={18} />
                <span>+62 813-2944-2688 (Kepala Desa)</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-emerald-500 shrink-0" size={18} />
                <span>desakeji01@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Globe className="text-emerald-500 shrink-0" size={18} />
                <span>keji-ungaranbarat.semarangkab.go.id</span>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Jam Operasional */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold border-b-2 border-emerald-500 pb-2 inline-block">Jam Pelayanan</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center justify-between border-b border-slate-700 pb-2">
                <div className="flex items-center gap-2"><Clock size={16} /> Senin - Kamis</div>
                <span>08.00 - 15.00 WIB</span>
              </li>
              <li className="flex items-center justify-between border-b border-slate-700 pb-2">
                <div className="flex items-center gap-2"><Clock size={16} /> Jumat</div>
                <span>08.00 - 11.30 WIB</span>
              </li>
              <li className="flex items-center justify-between text-red-400">
                <div className="flex items-center gap-2"><Clock size={16} /> Sabtu & Minggu</div>
                <span>Tutup / Libur</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 pt-6 mt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Pemerintah Desa Keji. Hak Cipta Dilindungi.</p>
          <p className="mt-2 md:mt-0">Dikembangkan oleh Tim KKN</p>
        </div>
      </div>
    </footer>
  );
}