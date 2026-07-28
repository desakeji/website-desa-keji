// app/(public)/desa-wisata/destinasi/page.tsx

import { Compass } from 'lucide-react';

import HalamanDalamPengembangan from '@/components/desa-wisata/HalamanDalamPengembangan';

export default function DestinasiWisataPage() {
  return (
    <HalamanDalamPengembangan
      judul="Destinasi dan Potensi"
      deskripsi="Informasi mengenai destinasi, sentra kegiatan, potensi budaya, dan daya tarik wisata Desa Keji sedang dalam tahap pengumpulan dan penyusunan."
      ikon={Compass}
    />
  );
}