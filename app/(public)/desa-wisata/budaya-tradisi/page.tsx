// app/(public)/desa-wisata/budaya-tradisi/page.tsx

import { Landmark } from 'lucide-react';

import HalamanDalamPengembangan from '@/components/desa-wisata/HalamanDalamPengembangan';

export default function BudayaTradisiPage() {
  return (
    <HalamanDalamPengembangan
      judul="Budaya dan Tradisi"
      deskripsi="Cerita mengenai kesenian, kuliner tradisional, kegiatan sosial, serta warisan budaya masyarakat Desa Keji sedang disiapkan."
      ikon={Landmark}
    />
  );
}