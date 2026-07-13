// types/warga.ts

export interface Warga {
  id: string;
  nik_empat_terakhir: string;
  nama_lengkap: string;
  dusun: string | null;
  rw: string | null;
  rt: string | null;
  alamat: string | null;
  nomor_whatsapp: string | null;
  aktif: boolean;
  created_at: string;
  updated_at: string;
}

export interface WargaActionState {
  error: string | null;
  success: string | null;
}