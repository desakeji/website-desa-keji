// app/(public)/desa-wisata/kuliner-umkm/page.tsx

import { UtensilsCrossed } from 'lucide-react';

import HalamanDalamPengembangan from '@/components/desa-wisata/HalamanDalamPengembangan';

export default function KulinerUmkmPage() {
  return (
    <HalamanDalamPengembangan
      judul="Kuliner dan UMKM"
      deskripsi="Informasi kuliner khas, produk lokal, serta profil pelaku UMKM Desa Keji sedang disusun dan akan terhubung dengan Lapak Desa."
      ikon={UtensilsCrossed}
    />
  );
}