// app/(public)/desa-wisata/galeri/page.tsx

import { Images } from 'lucide-react';

import HalamanDalamPengembangan from '@/components/desa-wisata/HalamanDalamPengembangan';

export default function GaleriDesaPage() {
  return (
    <HalamanDalamPengembangan
      judul="Galeri Desa"
      deskripsi="Dokumentasi suasana desa, kegiatan masyarakat, budaya, kesenian, kuliner, dan potensi Desa Keji sedang dipilih dan dipersiapkan."
      ikon={Images}
    />
  );
}