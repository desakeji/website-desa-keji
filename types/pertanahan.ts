// types/pertanahan.ts

export interface PertanahanSettings {
  setting_key: string;

  judul: string;

  deskripsi: string;

  tahun_data:
    | number
    | null;

  sumber_data:
    | string
    | null;

  catatan:
    | string
    | null;

  peta_url:
    | string
    | null;

  aktif: boolean;

  created_at?: string;

  updated_at: string;
}

export interface PertanahanData {
  id: string;

  nama: string;

  kategori: string;

  luas_hektar: number;

  jumlah_bidang:
    | number
    | null;

  keterangan:
    | string
    | null;

  warna: string;

  aktif: boolean;

  urutan: number;

  created_at: string;

  updated_at: string;
}