// app/(public)/desa-wisata/agenda/page.tsx

import { CalendarDays } from 'lucide-react';

import HalamanDalamPengembangan from '@/components/desa-wisata/HalamanDalamPengembangan';

export default function AgendaWisataPage() {
  return (
    <HalamanDalamPengembangan
      judul="Agenda Wisata"
      deskripsi="Informasi mengenai jadwal kegiatan budaya, kesenian, Pasar Leginan, festival, dan agenda masyarakat Desa Keji sedang dipersiapkan."
      ikon={CalendarDays}
    />
  );
}