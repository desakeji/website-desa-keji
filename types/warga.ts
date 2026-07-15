// types/warga.ts

export type JenisKelamin =
  | 'L'
  | 'P';

export interface Warga {
  id: string;
  nik_empat_terakhir: string;

  no_kk_empat_terakhir:
    | string
    | null;

  nama_lengkap: string;

  jenis_kelamin:
    | JenisKelamin
    | null;

  dusun: string | null;
  rw: string | null;
  rt: string | null;
  alamat: string | null;
  tanggal_lahir: string | null;

  nomor_whatsapp:
    | string
    | null;

  aktif: boolean;
  created_at: string;
  updated_at: string;
}

export interface WargaActionState {
  error: string | null;
  success: string | null;
}