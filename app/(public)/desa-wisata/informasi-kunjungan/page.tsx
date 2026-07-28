// app/(public)/desa-wisata/informasi-kunjungan/page.tsx

import { MapPinned } from 'lucide-react';

import HalamanDalamPengembangan from '@/components/desa-wisata/HalamanDalamPengembangan';

export default function InformasiKunjunganPage() {
  return (
    <HalamanDalamPengembangan
      judul="Peta dan Informasi Kunjungan"
      deskripsi="Informasi lokasi, petunjuk arah, fasilitas, kontak pengelola, dan panduan berkunjung ke Desa Keji sedang dipersiapkan."
      ikon={MapPinned}
    />
  );
}