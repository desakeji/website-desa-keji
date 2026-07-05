// app/admin/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Users, FileText, Newspaper, TrendingUp, RefreshCw } from 'lucide-react';
import { supabase } from '../../lib/supabase'; // Memanggil koneksi Supabase

// Mendefinisikan tipe data permohonan
type Permohonan = {
  id: number;
  nama_lengkap: string;
  layanan: string;
  no_wa: string;
  status: string;
  created_at: string;
};

export default function AdminDashboardPage() {
  const [permohonanTerbaru, setPermohonanTerbaru] = useState<Permohonan[]>([]);
  const [totalPermohonan, setTotalPermohonan] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Fungsi untuk mengambil data dari Supabase
  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // Mengambil 5 permohonan terakhir
      const { data, error, count } = await supabase
        .from('permohonan')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;

      if (data) setPermohonanTerbaru(data);
      if (count !== null) setTotalPermohonan(count);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Jalankan fungsi saat halaman pertama kali dimuat
  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800 mb-1">Dashboard Admin</h1>
          <p className="text-sm font-medium text-gray-500">Selamat datang kembali! Berikut adalah ringkasan data terbaru.</p>
        </div>
        
        <button 
          onClick={fetchDashboardData}
          disabled={isLoading}
          className="flex items-center gap-2 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors"
        >
          <RefreshCw size={16} className={isLoading ? 'animate-spin text-emerald-500' : ''} />
          {isLoading ? 'Memuat Data...' : 'Segarkan Data'}
        </button>
      </div>

      {/* Widget Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide">Total Penduduk</h3>
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
              <Users size={20} />
            </div>
          </div>
          <div>
            <p className="text-3xl font-black text-gray-800">2.570</p>
            <p className="text-xs font-medium text-emerald-600 mt-1 flex items-center gap-1"><TrendingUp size={12} /> Data sensus terakhir</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4 relative overflow-hidden">
          <div className="flex items-center justify-between relative z-10">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide">Surat Masuk</h3>
            <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center">
              <FileText size={20} />
            </div>
          </div>
          <div className="relative z-10">
            {isLoading ? (
              <div className="h-9 bg-gray-100 rounded w-16 animate-pulse"></div>
            ) : (
              <p className="text-3xl font-black text-gray-800">{totalPermohonan}</p>
            )}
            <p className="text-xs font-medium text-amber-600 mt-1">Total antrean permohonan</p>
          </div>
          {/* Aksen Background */}
          <div className="absolute -bottom-4 -right-4 text-amber-50 opacity-50">
            <FileText size={100} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide">Total Berita</h3>
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
              <Newspaper size={20} />
            </div>
          </div>
          <div>
            <p className="text-3xl font-black text-gray-800">0</p>
            <p className="text-xs font-medium text-gray-500 mt-1">Artikel dipublikasikan</p>
          </div>
        </div>

      </div>

      {/* Tabel Permohonan Terbaru (DATA ASLI DARI SUPABASE) */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 md:p-6 border-b border-gray-100 flex items-center justify-between bg-slate-50/50">
          <h2 className="text-lg font-bold text-gray-800">5 Permohonan Layanan Terbaru</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white text-gray-500 font-bold border-b border-gray-100 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4">Nama Pemohon</th>
                <th className="px-6 py-4">Layanan</th>
                <th className="px-6 py-4">No. WhatsApp</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              
              {isLoading ? (
                // Loading Skeleton
                [...Array(3)].map((_, i) => (
                  <tr key={i}>
                    <td colSpan={5} className="px-6 py-4">
                      <div className="h-4 bg-gray-100 rounded w-full animate-pulse"></div>
                    </td>
                  </tr>
                ))
              ) : permohonanTerbaru.length === 0 ? (
                // State Kosong
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500 font-medium">
                    Belum ada data permohonan masuk.
                  </td>
                </tr>
              ) : (
                // Render Data Asli
                permohonanTerbaru.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-gray-500 font-medium">
                      {new Date(item.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-800">{item.nama_lengkap}</td>
                    <td className="px-6 py-4 text-emerald-700 font-medium">{item.layanan}</td>
                    <td className="px-6 py-4 text-gray-600">{item.no_wa}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider ${
                        item.status === 'Selesai' 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}