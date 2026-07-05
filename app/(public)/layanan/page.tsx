// app/(public)/layanan/page.tsx
import { Info, FileCheck, CheckCircle2 } from 'lucide-react';
import SidebarLayanan from '@/components/SidebarLayanan'; // Panggil komponen pintar kita

export default function LayananPage() {
  const daftarLayanan = [
    {
      id: 1,
      nama: 'Surat Pengantar KTP / KK Baru',
      deskripsi: 'Digunakan untuk syarat perekaman KTP baru atau pembuatan Kartu Keluarga (KK) baru/pecah KK.',
      syarat: ['Surat Pengantar RT / RW', 'Fotokopi KK Lama', 'Fotokopi Akta Kelahiran']
    },
    {
      id: 2,
      nama: 'Surat Keterangan Usaha (SKU)',
      deskripsi: 'Diperlukan untuk syarat pengajuan pinjaman modal usaha ke Bank (KUR) atau bantuan UMKM.',
      syarat: ['Surat Pengantar RT / RW', 'Fotokopi KTP Pemohon', 'Fotokopi KK Pemohon']
    },
    {
      id: 3,
      nama: 'Surat Keterangan Tidak Mampu (SKTM)',
      deskripsi: 'Syarat untuk pengajuan beasiswa, keringanan biaya rumah sakit, atau bantuan sosial lainnya.',
      syarat: ['Surat Pengantar RT / RW', 'Fotokopi KTP & KK', 'Surat Pernyataan Tidak Mampu bermeterai']
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight mb-2">
            Layanan Administrasi Desa
          </h1>
          <p className="text-gray-500 font-medium">Informasi persyaratan pelayanan surat menyurat di Kantor Kepala Desa Keji.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* KOLOM KIRI */}
          <div className="lg:w-2/3 space-y-6">
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl flex items-start gap-3 shadow-sm">
              <Info size={24} className="text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-blue-900 text-sm">Informasi Jam Pelayanan</h4>
                <p className="text-sm text-blue-800 mt-1">
                  Pelayanan tatap muka buka hari <strong>Senin - Kamis (08.00 - 15.00 WIB)</strong> dan <strong>Jumat (08.00 - 11.30 WIB)</strong>. Pelayanan 100% GRATIS.
                </p>
              </div>
            </div>

            {daftarLayanan.map((layanan) => (
              <div key={layanan.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                <div className="flex items-start gap-3 mb-4 border-b border-gray-100 pb-4">
                  <div className="bg-emerald-100 p-2.5 rounded-lg text-emerald-600 shrink-0">
                    <FileCheck size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{layanan.nama}</h3>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">{layanan.deskripsi}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800 mb-3">Syarat yang dibawa:</h4>
                  <ul className="space-y-2">
                    {layanan.syarat.map((syarat, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700 font-medium">
                        <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" /> <span>{syarat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* KOLOM KANAN (Tinggal panggil komponen pintar di sini) */}
          <div className="lg:w-1/3">
            <SidebarLayanan />
          </div>

        </div>
      </div>
    </div>
  );
}