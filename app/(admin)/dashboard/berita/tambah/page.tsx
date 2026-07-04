// app/(admin)/dashboard/berita/tambah/page.tsx
'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function TambahBeritaPage() {
  const [judul, setJudul] = useState('');
  const [kategori, setKategori] = useState('berita');
  const [konten, setKonten] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fungsi membuat slug otomatis dari judul
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const slug = generateSlug(judul);

    // Kirim data ke tabel berita_pengumuman di Supabase
    const { error } = await supabase
      .from('berita_pengumuman')
      .insert([
        {
          judul: judul,
          slug: slug,
          kategori: kategori,
          konten: konten,
          status: 'published' // Untuk sementara otomatis langsung dipublikasi
        }
      ]);

    if (error) {
      alert('Gagal menambahkan berita: ' + error.message);
      setLoading(false);
    } else {
      alert('Berita berhasil ditambahkan!');
      router.push('/dashboard/berita'); // Kembali ke halaman daftar berita
    }
  };

  return (
    <div className="max-w-2xl bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Tambah Berita Baru</h1>
        <Link href="/dashboard/berita" className="text-gray-500 hover:text-gray-700">
          Batal
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Judul</label>
          <input
            type="text"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-emerald-500"
            required
            placeholder="Contoh: Kegiatan KKN Bersih Desa"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Kategori</label>
          <select
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-emerald-500"
          >
            <option value="berita">Berita</option>
            <option value="pengumuman">Pengumuman</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Konten / Isi</label>
          <textarea
            value={konten}
            onChange={(e) => setKonten(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-emerald-500 min-h-[200px]"
            required
            placeholder="Tulis isi berita di sini..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-emerald-600 text-white font-bold py-2 px-6 rounded hover:bg-emerald-700 transition disabled:opacity-50"
        >
          {loading ? 'Menyimpan...' : 'Simpan Berita'}
        </button>
      </form>
    </div>
  );
}