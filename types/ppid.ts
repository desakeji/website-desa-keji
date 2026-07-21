// types/ppid.ts

export interface ProfilPpid {
  id: string;
  profil_key: string;
  judul: string;
  deskripsi: string;

  email: string | null;
  telepon: string | null;
  alamat: string | null;
  jam_layanan: string | null;

  aktif: boolean;
  created_at: string;
  updated_at: string;
}

export interface PengurusPpid {
  id: string;
  nama: string;
  jabatan_desa: string;
  jabatan_ppid: string;
  urutan: number;
  aktif: boolean;
  created_at: string;
  updated_at: string;
}

export interface PpidActionState {
  error: string | null;
  success: string | null;
}