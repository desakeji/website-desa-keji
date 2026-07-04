// app/(admin)/dashboard/berita/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function KelolaBeritaPage() {
  const [berita, setBerita] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk mengambil data dari Supabase
  const fetchBerita = async () => {
    const { data, error } = await supabase
      .from('berita_pengumuman')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching berita:', error);
    } else {
      setBerita(data || []);
    }
    setLoading(false);
  };

  // Jalankan fungsi saat halaman pertama kali dibuka
  useEffect(() => {
    fetchBerita();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Kelola Berita & Pengumuman</h1>
        <Link 
          href="/dashboard/berita/tambah" 
          className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition"
        >
          + Tambah Berita
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <p className="p-6 text-center text-gray-500">Memuat data...</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-4 font-semibold text-gray-600">Judul</th>
                <th className="p-4 font-semibold text-gray-600">Kategori</th>
                <th className="p-4 font-semibold text-gray-600">Status</th>
                <th className="p-4 font-semibold text-gray-600 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {berita.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">Belum ada berita.</td>
                </tr>
              ) : (
                berita.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4 text-gray-800">{item.judul}</td>
                    <td className="p-4 text-gray-600 capitalize">{item.kategori}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${item.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 flex justify-center space-x-2">
                      <button className="text-emerald-600 hover:underline text-sm">Edit</button>
                      <button className="text-red-600 hover:underline text-sm">Hapus</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}