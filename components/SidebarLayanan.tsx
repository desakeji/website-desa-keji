// components/SidebarLayanan.tsx
'use client';

import { useState } from 'react';
import { Info, Send, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase'; // Memanggil jembatan koneksi kita

export default function SidebarLayanan() {
  const [namaLengkap, setNamaLengkap] = useState('');
  const [noWa, setNoWa] = useState('');
  const [layanan, setLayanan] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Fungsi untuk mengirim data ke Supabase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('permohonan')
        .insert([
          { 
            nama_lengkap: namaLengkap, 
            no_wa: noWa, 
            layanan: layanan 
            // status dan created_at otomatis diisi oleh Supabase
          }
        ]);

      if (error) throw error;

      // Jika sukses, ubah tampilan form menjadi centang hijau
      setIsSuccess(true);
      setNamaLengkap('');
      setNoWa('');
      setLayanan('');
      
      // Kembalikan ke form semula setelah 5 detik
      setTimeout(() => setIsSuccess(false), 5000);

    } catch (error) {
      console.error('Error mengirim data:', error);
      alert('Maaf, terjadi kesalahan. Pastikan koneksi internet stabil.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-emerald-800 rounded-2xl overflow-hidden shadow-lg sticky top-24 border border-emerald-700">
      
      <div className="bg-emerald-600 p-5 text-center relative overflow-hidden">
        <h3 className="text-white font-extrabold text-xl relative z-10">Layanan Cepat</h3>
        <div className="absolute -bottom-8 -left-4 w-[120%] h-12 bg-emerald-800 rounded-t-[50%] rotate-3"></div>
      </div>
      
      <div className="p-6 relative z-20">
        <div className="bg-emerald-50 text-emerald-800 text-[11px] font-bold p-3 rounded-lg flex items-start gap-2 mb-6 shadow-inner border border-emerald-100">
          <Info size={16} className="shrink-0 text-emerald-600 mt-0.5" />
          <p>Isi form di bawah ini. Admin desa akan menghubungi Anda via WhatsApp untuk konfirmasi.</p>
        </div>

        {/* Jika berhasil, tampilkan pesan sukses. Jika tidak, tampilkan Form */}
        {isSuccess ? (
          <div className="bg-white rounded-xl p-6 text-center shadow-inner border border-emerald-100 py-10">
            <CheckCircle2 size={48} className="text-emerald-500 mx-auto mb-4" />
            <h4 className="font-extrabold text-emerald-800 text-lg mb-2">Berhasil Terkirim!</h4>
            <p className="text-sm text-gray-600 font-medium leading-relaxed">
              Permohonan Anda sudah masuk ke sistem kami. Admin akan segera menghubungi nomor WhatsApp Anda.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-white text-sm font-semibold mb-1.5 block">Nama Lengkap</label>
              <input 
                type="text" 
                required
                value={namaLengkap}
                onChange={(e) => setNamaLengkap(e.target.value)}
                className="w-full p-2.5 rounded-lg border-none focus:ring-2 focus:ring-amber-400 bg-white shadow-inner text-gray-800 font-medium text-sm outline-none" 
                placeholder="Nama sesuai KTP" 
              />
            </div>
            
            <div>
              <label className="text-white text-sm font-semibold mb-1.5 block">No. WhatsApp</label>
              <input 
                type="tel" 
                required
                value={noWa}
                onChange={(e) => setNoWa(e.target.value)}
                className="w-full p-2.5 rounded-lg border-none focus:ring-2 focus:ring-amber-400 bg-white shadow-inner text-gray-800 font-medium text-sm outline-none" 
                placeholder="Contoh: 08123456789" 
              />
            </div>

            <div>
              <label className="text-white text-sm font-semibold mb-1.5 block">Pilih Layanan</label>
              <select 
                required
                value={layanan}
                onChange={(e) => setLayanan(e.target.value)}
                className="w-full p-2.5 rounded-lg border-none focus:ring-2 focus:ring-amber-400 bg-white shadow-inner text-gray-800 font-medium text-sm outline-none"
              >
                <option value="" disabled>-- Pilih Keperluan --</option>
                <option value="Surat Pengantar KTP / KK">Surat Pengantar KTP / KK</option>
                <option value="Surat Pengantar SKCK">Surat Pengantar SKCK</option>
                <option value="Surat Keterangan Domisili">Surat Keterangan Domisili</option>
                <option value="Surat Keterangan Usaha (SKU)">Surat Keterangan Usaha (SKU)</option>
                <option value="SKTM (Tidak Mampu)">SKTM (Tidak Mampu)</option>
                <option value="Lainnya">Lainnya...</option>
              </select>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full flex items-center justify-center gap-2 text-white font-extrabold py-3 rounded-lg transition-all mt-2 shadow-md ${
                isLoading ? 'bg-gray-400 cursor-wait' : 'bg-amber-500 hover:bg-amber-600 transform hover:-translate-y-0.5 hover:shadow-lg'
              }`}
            >
              <Send size={16} /> {isLoading ? 'Mengirim Data...' : 'Kirim Permohonan'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}