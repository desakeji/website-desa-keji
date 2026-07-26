import { notFound, redirect } from 'next/navigation';

import { isKategoriDesaCantik } from '@/lib/desa-cantik';

interface PageProps {
  params: Promise<{
    kategori: string;
  }>;
}

export default async function DesaCantikKategoriPage({
  params,
}: PageProps) {
  const { kategori } = await params;

  if (!isKategoriDesaCantik(kategori)) {
    notFound();
  }

  redirect(`/desa-cantik/${kategori}/2025`);
}