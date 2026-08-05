// app/admin/tilik-arkeji/page.tsx

import Link from 'next/link';

import type { ReactNode } from 'react';

import {
  AlertCircle,
  Archive,
  BadgeCheck,
  CheckCircle2,
  ExternalLink,
  FolderOpen,
  Image as ImageIcon,
  Images,
  Landmark,
  Pencil,
  Power,
  Save,
  Trash2,
  Upload,
  Users,
  type LucideIcon,
} from 'lucide-react';

import {
  hapusMantanKadesAction,
  hapusMediaTilikAction,
  hapusPenghargaanAction,
  simpanPengaturanTilikAction,
  tambahMantanKadesAction,
  tambahMediaTilikAction,
  tambahPenghargaanAction,
  toggleMantanKadesAction,
  toggleMediaTilikAction,
  togglePenghargaanAction,
  ubahMantanKadesAction,
  ubahMediaTilikAction,
  ubahPenghargaanAction,
} from '@/app/admin/tilik-arkeji/actions';

import { supabaseAdmin } from '@/lib/supabase-admin';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  searchParams: Promise<{
    success?: string;
    error?: string;
  }>;
}

interface PengaturanTilik {
  judul: string;
  deskripsi: string;
  biografi_drive_url: string | null;
  struktur_drive_url: string | null;
  penghargaan_drive_url: string | null;
  galeri_drive_url: string | null;
}

interface MantanKadesAdmin {
  id: string;
  nama: string;
  periode_mulai: number;
  periode_selesai: number | null;
  biografi: string;
  foto_url: string | null;
  urutan: number;
  aktif: boolean;
}

interface PenghargaanAdmin {
  id: string;
  nama_penghargaan: string;
  tahun: number;
  tingkat: string;
  penyelenggara: string;
  deskripsi: string;
  foto_url: string | null;
  urutan: number;
  aktif: boolean;
}

interface MediaTilikAdmin {
  id: string;
  kategori: 'struktur-organisasi' | 'galeri-desa';
  judul: string;
  deskripsi: string;
  gambar_url: string | null;
  urutan: number;
  aktif: boolean;
}

const fallbackPengaturan: PengaturanTilik = {
  judul: 'Tilik Arkeji',
  deskripsi:
    'Arsip digital kepemimpinan, struktur organisasi, pencapaian, dan dokumentasi Desa Keji.',
  biografi_drive_url: null,
  struktur_drive_url: null,
  penghargaan_drive_url: null,
  galeri_drive_url: null,
};

function safeString(value: unknown) {
  return String(value ?? '').trim();
}

function nullableString(value: unknown) {
  const result = safeString(value);
  return result || null;
}

function normalizePengaturan(value: unknown): PengaturanTilik {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return fallbackPengaturan;
  }

  const row = value as Record<string, unknown>;

  return {
    judul: safeString(row.judul) || fallbackPengaturan.judul,
    deskripsi:
      safeString(row.deskripsi) || fallbackPengaturan.deskripsi,
    biografi_drive_url: nullableString(row.biografi_drive_url),
    struktur_drive_url: nullableString(row.struktur_drive_url),
    penghargaan_drive_url: nullableString(row.penghargaan_drive_url),
    galeri_drive_url: nullableString(row.galeri_drive_url),
  };
}

function normalizeMantanKades(value: unknown): MantanKadesAdmin | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }

  const row = value as Record<string, unknown>;
  const id = safeString(row.id);
  const nama = safeString(row.nama);
  const biografi = safeString(row.biografi);
  const periodeMulai = Number(row.periode_mulai);
  const periodeSelesai =
    row.periode_selesai === null || row.periode_selesai === undefined
      ? null
      : Number(row.periode_selesai);
  const urutan = Number(row.urutan ?? 0);

  if (
    !id ||
    !nama ||
    !biografi ||
    !Number.isInteger(periodeMulai) ||
    !Number.isInteger(urutan)
  ) {
    return null;
  }

  return {
    id,
    nama,
    periode_mulai: periodeMulai,
    periode_selesai:
      periodeSelesai !== null && Number.isInteger(periodeSelesai)
        ? periodeSelesai
        : null,
    biografi,
    foto_url: nullableString(row.foto_url),
    urutan,
    aktif: Boolean(row.aktif),
  };
}

function normalizePenghargaan(value: unknown): PenghargaanAdmin | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }

  const row = value as Record<string, unknown>;
  const id = safeString(row.id);
  const namaPenghargaan = safeString(row.nama_penghargaan);
  const tahun = Number(row.tahun);
  const tingkat = safeString(row.tingkat);
  const penyelenggara = safeString(row.penyelenggara);
  const deskripsi = safeString(row.deskripsi);
  const urutan = Number(row.urutan ?? 0);

  if (
    !id ||
    !namaPenghargaan ||
    !tingkat ||
    !penyelenggara ||
    !deskripsi ||
    !Number.isInteger(tahun) ||
    !Number.isInteger(urutan)
  ) {
    return null;
  }

  return {
    id,
    nama_penghargaan: namaPenghargaan,
    tahun,
    tingkat,
    penyelenggara,
    deskripsi,
    foto_url: nullableString(row.foto_url),
    urutan,
    aktif: Boolean(row.aktif),
  };
}

function normalizeMedia(value: unknown): MediaTilikAdmin | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }

  const row = value as Record<string, unknown>;
  const id = safeString(row.id);
  const kategori = safeString(row.kategori);
  const judul = safeString(row.judul);
  const urutan = Number(row.urutan ?? 0);

  if (
    !id ||
    !judul ||
    !Number.isInteger(urutan) ||
    (kategori !== 'struktur-organisasi' && kategori !== 'galeri-desa')
  ) {
    return null;
  }

  return {
    id,
    kategori,
    judul,
    deskripsi: safeString(row.deskripsi),
    gambar_url: nullableString(row.gambar_url),
    urutan,
    aktif: Boolean(row.aktif),
  };
}

export default async function AdminTilikArkejiPage({
  searchParams,
}: PageProps) {
  const [
    params,
    pengaturanResult,
    mantanKadesResult,
    penghargaanResult,
    mediaResult,
  ] = await Promise.all([
    searchParams,

    supabaseAdmin
      .from('tilik_arkeji_settings')
      .select(`
        judul,
        deskripsi,
        biografi_drive_url,
        struktur_drive_url,
        penghargaan_drive_url,
        galeri_drive_url
      `)
      .eq('setting_key', 'utama')
      .maybeSingle(),

    supabaseAdmin
      .from('tilik_arkeji_mantan_kades')
      .select(`
        id,
        nama,
        periode_mulai,
        periode_selesai,
        biografi,
        foto_url,
        urutan,
        aktif
      `)
      .order('urutan', { ascending: true })
      .order('periode_mulai', { ascending: true }),

    supabaseAdmin
      .from('tilik_arkeji_penghargaan')
      .select(`
        id,
        nama_penghargaan,
        tahun,
        tingkat,
        penyelenggara,
        deskripsi,
        foto_url,
        urutan,
        aktif
      `)
      .order('urutan', { ascending: true })
      .order('tahun', { ascending: false }),

    supabaseAdmin
      .from('tilik_arkeji_media')
      .select(`
        id,
        kategori,
        judul,
        deskripsi,
        gambar_url,
        urutan,
        aktif
      `)
      .order('kategori', { ascending: true })
      .order('urutan', { ascending: true })
      .order('created_at', { ascending: false }),
  ]);

  if (pengaturanResult.error) {
    console.error('Gagal mengambil pengaturan Tilik Arkeji:', pengaturanResult.error);
  }

  if (mantanKadesResult.error) {
    console.error('Gagal mengambil data kepala desa:', mantanKadesResult.error);
  }

  if (penghargaanResult.error) {
    console.error('Gagal mengambil penghargaan:', penghargaanResult.error);
  }

  if (mediaResult.error) {
    console.error('Gagal mengambil media Tilik Arkeji:', mediaResult.error);
  }

  const pengaturan = normalizePengaturan(pengaturanResult.data);

  const daftarMantanKades = (mantanKadesResult.data ?? [])
    .map(normalizeMantanKades)
    .filter((item): item is MantanKadesAdmin => item !== null);

  const daftarPenghargaan = (penghargaanResult.data ?? [])
    .map(normalizePenghargaan)
    .filter((item): item is PenghargaanAdmin => item !== null);

  const daftarMedia = (mediaResult.data ?? [])
    .map(normalizeMedia)
    .filter((item): item is MediaTilikAdmin => item !== null);

  const strukturMedia = daftarMedia.filter(
    (item) => item.kategori === 'struktur-organisasi'
  );

  const galeriMedia = daftarMedia.filter(
    (item) => item.kategori === 'galeri-desa'
  );

  const tahunSekarang = new Date().getFullYear();

  return (
    <div className="mx-auto max-w-[1500px] space-y-7">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-800 to-emerald-700 px-6 py-8 text-white shadow-xl sm:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.16) 1.5px, transparent 1.5px)',
            backgroundSize: '26px 26px',
          }}
        />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
              <Archive size={28} />
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-200">
                Arsip Digital Desa Keji
              </p>

              <h1 className="mt-2 text-2xl font-black sm:text-3xl">
                Kelola Tilik Arkeji
              </h1>

              <p className="mt-2 max-w-3xl text-sm font-medium leading-7 text-emerald-50/80">
                Kelola biografi kepala desa, penghargaan, struktur organisasi,
                galeri, gambar, dan tautan arsip Google Drive.
              </p>
            </div>
          </div>

          <Link
            href="/profil/tilik-arkeji"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-extrabold text-emerald-900 transition hover:bg-emerald-50"
          >
            Lihat Halaman Publik
            <ExternalLink size={16} />
          </Link>
        </div>
      </section>

      {params.success && <Message type="success" text={params.success} />}
      {params.error && <Message type="error" text={params.error} />}

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Kepala Desa"
          value={daftarMantanKades.length}
          description={`${daftarMantanKades.filter((item) => item.aktif).length} data aktif`}
          icon={Users}
        />

        <StatCard
          label="Penghargaan"
          value={daftarPenghargaan.length}
          description={`${daftarPenghargaan.filter((item) => item.aktif).length} data aktif`}
          icon={BadgeCheck}
        />

        <StatCard
          label="Struktur Organisasi"
          value={strukturMedia.length}
          description={`${strukturMedia.filter((item) => item.aktif).length} gambar aktif`}
          icon={Landmark}
        />

        <StatCard
          label="Galeri Desa"
          value={galeriMedia.length}
          description={`${galeriMedia.filter((item) => item.aktif).length} gambar aktif`}
          icon={Images}
        />
      </section>

      <form
        id="pengaturan-tilik"
        action={simpanPengaturanTilikAction}
        className="scroll-mt-24 overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm"
      >
        <SectionHeader
          label="Pengaturan Halaman"
          title="Judul dan Arsip Google Drive"
          description="Link Drive tetap dipakai sebagai arsip sementara. Gambar yang tampil langsung di website diunggah melalui admin."
          icon={FolderOpen}
        />

        <div className="grid gap-5 p-6 sm:p-7 md:grid-cols-2">
          <div className="md:col-span-2">
            <TextInput
              idPrefix="pengaturan"
              name="judul_halaman"
              label="Judul Halaman"
              value={pengaturan.judul}
            />
          </div>

          <div className="md:col-span-2">
            <TextArea
              idPrefix="pengaturan"
              name="deskripsi_halaman"
              label="Deskripsi Halaman"
              value={pengaturan.deskripsi}
              rows={4}
            />
          </div>

          <UrlInput
            idPrefix="pengaturan"
            name="biografi_drive_url"
            label="Folder Drive Biografi Kepala Desa"
            value={pengaturan.biografi_drive_url ?? ''}
          />

          <UrlInput
            idPrefix="pengaturan"
            name="struktur_drive_url"
            label="Folder Drive Struktur Organisasi"
            value={pengaturan.struktur_drive_url ?? ''}
          />

          <UrlInput
            idPrefix="pengaturan"
            name="penghargaan_drive_url"
            label="Folder Drive Pencapaian Desa"
            value={pengaturan.penghargaan_drive_url ?? ''}
          />

          <UrlInput
            idPrefix="pengaturan"
            name="galeri_drive_url"
            label="Folder Drive Galeri Desa"
            value={pengaturan.galeri_drive_url ?? ''}
          />

          <div className="flex justify-end md:col-span-2">
            <SubmitButton text="Simpan Pengaturan" />
          </div>
        </div>
      </form>

      <form
        id="tambah-mantan-kades"
        action={tambahMantanKadesAction}
        className="scroll-mt-24 overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm"
      >
        <SectionHeader
          label="Arsip Kepemimpinan"
          title="Tambah Biografi Kepala Desa"
          description="Foto dipilih langsung dari perangkat dan disimpan ke Supabase Storage."
          icon={Landmark}
        />

        <div className="grid gap-5 p-6 sm:p-7 md:grid-cols-2">
          <div className="md:col-span-2">
            <TextInput
              idPrefix="kades-baru"
              name="nama"
              label="Nama Lengkap"
              placeholder="Masukkan nama kepala desa"
            />
          </div>

          <NumberInput
            idPrefix="kades-baru"
            name="periode_mulai"
            label="Awal Masa Jabatan"
            value=""
            min={1900}
            max={2200}
          />

          <NumberInput
            idPrefix="kades-baru"
            name="periode_selesai"
            label="Akhir Masa Jabatan"
            value=""
            min={1900}
            max={2200}
            required={false}
          />

          <NumberInput
            idPrefix="kades-baru"
            name="urutan"
            label="Nomor Urutan"
            value={String(daftarMantanKades.length + 1)}
            min={0}
          />

          <Checkbox
            id="kades-baru-aktif"
            name="aktif"
            label="Publikasikan Biografi"
            description="Biografi ditampilkan pada halaman publik."
            checked
          />

          <div className="md:col-span-2">
            <TextArea
              idPrefix="kades-baru"
              name="biografi"
              label="Biografi"
              placeholder="Tuliskan riwayat, kontribusi, dan pencapaian selama menjabat."
            />
          </div>

          <div className="md:col-span-2">
            <FileInput
              id="kades-baru-foto"
              name="foto"
              label="Foto Kepala Desa"
              required={false}
            />
          </div>

          <div className="flex justify-end md:col-span-2">
            <SubmitButton text="Tambah Biografi" />
          </div>
        </div>
      </form>

      <DataSection
        id="daftar-mantan-kades"
        label="Biografi"
        title="Daftar Kepala Desa"
        description={`${daftarMantanKades.length} data tersimpan.`}
        icon={Users}
      >
        {daftarMantanKades.length === 0 ? (
          <EmptyState icon={Landmark} text="Belum ada biografi kepala desa." />
        ) : (
          <div className="grid gap-5 p-5 sm:p-7 xl:grid-cols-2">
            {daftarMantanKades.map((item) => (
              <MantanKadesAdminCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </DataSection>

      <form
        id="tambah-penghargaan"
        action={tambahPenghargaanAction}
        className="scroll-mt-24 overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm"
      >
        <SectionHeader
          label="Arsip Prestasi"
          title="Tambah Penghargaan Desa"
          description="Masukkan informasi penghargaan dan unggah dokumentasi langsung dari perangkat."
          icon={BadgeCheck}
        />

        <div className="grid gap-5 p-6 sm:p-7 md:grid-cols-2">
          <div className="md:col-span-2">
            <TextInput
              idPrefix="penghargaan-baru"
              name="nama_penghargaan"
              label="Nama Penghargaan"
              placeholder="Masukkan nama penghargaan"
            />
          </div>

          <NumberInput
            idPrefix="penghargaan-baru"
            name="tahun"
            label="Tahun"
            value={String(tahunSekarang)}
            min={1900}
            max={2200}
          />

          <NumberInput
            idPrefix="penghargaan-baru"
            name="urutan"
            label="Nomor Urutan"
            value={String(daftarPenghargaan.length + 1)}
            min={0}
          />

          <TextInput
            idPrefix="penghargaan-baru"
            name="tingkat"
            label="Tingkat"
            placeholder="Kabupaten, Provinsi, Nasional"
          />

          <TextInput
            idPrefix="penghargaan-baru"
            name="penyelenggara"
            label="Penyelenggara"
            placeholder="Nama lembaga atau instansi"
          />

          <div className="md:col-span-2">
            <TextArea
              idPrefix="penghargaan-baru"
              name="deskripsi"
              label="Deskripsi"
              placeholder="Jelaskan latar belakang dan pencapaian penghargaan."
            />
          </div>

          <div className="md:col-span-2">
            <FileInput
              id="penghargaan-baru-foto"
              name="foto"
              label="Foto atau Dokumentasi"
              required={false}
            />
          </div>

          <Checkbox
            id="penghargaan-baru-aktif"
            name="aktif"
            label="Publikasikan Penghargaan"
            description="Penghargaan ditampilkan pada halaman publik."
            checked
          />

          <div className="flex items-end justify-end">
            <SubmitButton text="Tambah Penghargaan" />
          </div>
        </div>
      </form>

      <DataSection
        id="daftar-penghargaan"
        label="Prestasi Desa"
        title="Daftar Penghargaan"
        description={`${daftarPenghargaan.length} penghargaan tersimpan.`}
        icon={BadgeCheck}
      >
        {daftarPenghargaan.length === 0 ? (
          <EmptyState icon={BadgeCheck} text="Belum ada penghargaan Desa Keji." />
        ) : (
          <div className="grid gap-5 p-5 sm:p-7 xl:grid-cols-2">
            {daftarPenghargaan.map((item) => (
              <PenghargaanAdminCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </DataSection>

      <form
        id="tambah-media"
        action={tambahMediaTilikAction}
        className="scroll-mt-24 overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm"
      >
        <SectionHeader
          label="Struktur dan Galeri"
          title="Tambah Gambar Tilik Arkeji"
          description="Pilih kategori, isi keterangan, lalu unggah gambar langsung dari perangkat."
          icon={Images}
        />

        <div className="grid gap-5 p-6 sm:p-7 md:grid-cols-2">
          <SelectKategori id="media-baru-kategori" />

          <TextInput
            idPrefix="media-baru"
            name="judul"
            label="Judul Gambar"
            placeholder="Contoh: Struktur Pemerintah Desa Keji"
          />

          <div className="md:col-span-2">
            <TextArea
              idPrefix="media-baru"
              name="deskripsi"
              label="Deskripsi"
              placeholder="Tuliskan keterangan singkat gambar."
              required={false}
              rows={4}
            />
          </div>

          <NumberInput
            idPrefix="media-baru"
            name="urutan"
            label="Nomor Urutan"
            value={String(daftarMedia.length + 1)}
            min={0}
          />

          <Checkbox
            id="media-baru-aktif"
            name="aktif"
            label="Publikasikan Gambar"
            description="Gambar langsung ditampilkan pada halaman publik."
            checked
          />

          <div className="md:col-span-2">
            <FileInput
              id="media-baru-gambar"
              name="gambar"
              label="Gambar Struktur atau Galeri"
              required
            />
          </div>

          <div className="flex justify-end md:col-span-2">
            <SubmitButton text="Tambah Gambar" />
          </div>
        </div>
      </form>

      <DataSection
        id="daftar-media"
        label="Media Tilik Arkeji"
        title="Struktur Organisasi dan Galeri Desa"
        description={`${daftarMedia.length} gambar tersimpan.`}
        icon={Images}
      >
        {daftarMedia.length === 0 ? (
          <EmptyState icon={Images} text="Belum ada gambar struktur atau galeri." />
        ) : (
          <div className="grid gap-5 p-5 sm:p-7 xl:grid-cols-2">
            {daftarMedia.map((item) => (
              <MediaAdminCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </DataSection>
    </div>
  );
}

function MantanKadesAdminCard({ item }: { item: MantanKadesAdmin }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
      <PreviewImage src={item.foto_url} alt={item.nama} aktif={item.aktif} />

      <div className="p-5">
        <p className="text-xs font-extrabold text-emerald-700">
          {item.periode_mulai} – {item.periode_selesai ?? 'Sekarang'}
        </p>

        <h3 className="mt-2 text-xl font-black text-slate-900">{item.nama}</h3>

        <p className="mt-3 line-clamp-4 whitespace-pre-line text-sm font-medium leading-7 text-slate-500">
          {item.biografi}
        </p>
      </div>

      <CardActions
        id={item.id}
        aktif={item.aktif}
        toggleAction={toggleMantanKadesAction}
        deleteAction={hapusMantanKadesAction}
      />

      <details className="border-t border-slate-200 bg-white">
        <summary className="flex cursor-pointer list-none items-center justify-center gap-2 p-4 text-sm font-extrabold text-slate-700">
          <Pencil size={16} />
          Edit Biografi
        </summary>

        <form
          action={ubahMantanKadesAction}
          className="grid gap-5 border-t border-slate-200 p-5 md:grid-cols-2"
        >
          <input type="hidden" name="id" value={item.id} />

          <div className="md:col-span-2">
            <TextInput
              idPrefix={`edit-kades-${item.id}`}
              name="nama"
              label="Nama Lengkap"
              value={item.nama}
            />
          </div>

          <NumberInput
            idPrefix={`edit-kades-${item.id}`}
            name="periode_mulai"
            label="Awal Masa Jabatan"
            value={String(item.periode_mulai)}
            min={1900}
            max={2200}
          />

          <NumberInput
            idPrefix={`edit-kades-${item.id}`}
            name="periode_selesai"
            label="Akhir Masa Jabatan"
            value={item.periode_selesai ? String(item.periode_selesai) : ''}
            min={1900}
            max={2200}
            required={false}
          />

          <NumberInput
            idPrefix={`edit-kades-${item.id}`}
            name="urutan"
            label="Nomor Urutan"
            value={String(item.urutan)}
            min={0}
          />

          <Checkbox
            id={`edit-kades-${item.id}-aktif`}
            name="aktif"
            label="Publikasikan Biografi"
            description="Tampilkan pada halaman publik."
            checked={item.aktif}
          />

          <div className="md:col-span-2">
            <TextArea
              idPrefix={`edit-kades-${item.id}`}
              name="biografi"
              label="Biografi"
              value={item.biografi}
            />
          </div>

          <div className="md:col-span-2">
            <FileInput
              id={`edit-kades-${item.id}-foto`}
              name="foto"
              label="Ganti Foto"
              required={false}
            />
          </div>

          {item.foto_url && (
            <div className="md:col-span-2">
              <Checkbox
                id={`edit-kades-${item.id}-hapus-foto`}
                name="hapus_foto"
                label="Hapus Foto Lama"
                description="Centang untuk menghapus foto tanpa menggantinya."
                checked={false}
                danger
              />
            </div>
          )}

          <div className="flex justify-end md:col-span-2">
            <SubmitButton text="Simpan Perubahan" dark />
          </div>
        </form>
      </details>
    </article>
  );
}

function PenghargaanAdminCard({ item }: { item: PenghargaanAdmin }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
      <PreviewImage
        src={item.foto_url}
        alt={item.nama_penghargaan}
        aktif={item.aktif}
      />

      <div className="p-5">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-extrabold text-emerald-700">
            {item.tahun}
          </span>

          <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-extrabold text-emerald-700">
            Tingkat {item.tingkat}
          </span>
        </div>

        <h3 className="mt-4 text-xl font-black text-slate-900">
          {item.nama_penghargaan}
        </h3>

        <p className="mt-2 text-xs font-extrabold text-emerald-700">
          {item.penyelenggara}
        </p>

        <p className="mt-3 line-clamp-4 text-sm font-medium leading-7 text-slate-500">
          {item.deskripsi}
        </p>
      </div>

      <CardActions
        id={item.id}
        aktif={item.aktif}
        toggleAction={togglePenghargaanAction}
        deleteAction={hapusPenghargaanAction}
      />

      <details className="border-t border-slate-200 bg-white">
        <summary className="flex cursor-pointer list-none items-center justify-center gap-2 p-4 text-sm font-extrabold text-slate-700">
          <Pencil size={16} />
          Edit Penghargaan
        </summary>

        <form
          action={ubahPenghargaanAction}
          className="grid gap-5 border-t border-slate-200 p-5 md:grid-cols-2"
        >
          <input type="hidden" name="id" value={item.id} />

          <div className="md:col-span-2">
            <TextInput
              idPrefix={`edit-award-${item.id}`}
              name="nama_penghargaan"
              label="Nama Penghargaan"
              value={item.nama_penghargaan}
            />
          </div>

          <NumberInput
            idPrefix={`edit-award-${item.id}`}
            name="tahun"
            label="Tahun"
            value={String(item.tahun)}
            min={1900}
            max={2200}
          />

          <NumberInput
            idPrefix={`edit-award-${item.id}`}
            name="urutan"
            label="Nomor Urutan"
            value={String(item.urutan)}
            min={0}
          />

          <TextInput
            idPrefix={`edit-award-${item.id}`}
            name="tingkat"
            label="Tingkat"
            value={item.tingkat}
          />

          <TextInput
            idPrefix={`edit-award-${item.id}`}
            name="penyelenggara"
            label="Penyelenggara"
            value={item.penyelenggara}
          />

          <div className="md:col-span-2">
            <TextArea
              idPrefix={`edit-award-${item.id}`}
              name="deskripsi"
              label="Deskripsi"
              value={item.deskripsi}
            />
          </div>

          <div className="md:col-span-2">
            <FileInput
              id={`edit-award-${item.id}-foto`}
              name="foto"
              label="Ganti Dokumentasi"
              required={false}
            />
          </div>

          {item.foto_url && (
            <div className="md:col-span-2">
              <Checkbox
                id={`edit-award-${item.id}-hapus-foto`}
                name="hapus_foto"
                label="Hapus Foto Lama"
                description="Centang untuk menghapus foto tanpa menggantinya."
                checked={false}
                danger
              />
            </div>
          )}

          <Checkbox
            id={`edit-award-${item.id}-aktif`}
            name="aktif"
            label="Publikasikan Penghargaan"
            description="Tampilkan pada halaman publik."
            checked={item.aktif}
          />

          <div className="flex items-end justify-end">
            <SubmitButton text="Simpan Perubahan" dark />
          </div>
        </form>
      </details>
    </article>
  );
}

function MediaAdminCard({ item }: { item: MediaTilikAdmin }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
      <PreviewImage src={item.gambar_url} alt={item.judul} aktif={item.aktif} />

      <div className="p-5">
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide text-emerald-700">
          {item.kategori === 'struktur-organisasi'
            ? 'Struktur Organisasi'
            : 'Galeri Desa'}
        </span>

        <h3 className="mt-4 text-xl font-black text-slate-900">{item.judul}</h3>

        <p className="mt-3 text-sm font-medium leading-7 text-slate-500">
          {item.deskripsi || 'Tidak ada deskripsi.'}
        </p>

        <p className="mt-3 text-xs font-extrabold text-emerald-700">
          Urutan {item.urutan}
        </p>
      </div>

      <CardActions
        id={item.id}
        aktif={item.aktif}
        toggleAction={toggleMediaTilikAction}
        deleteAction={hapusMediaTilikAction}
      />

      <details className="border-t border-slate-200 bg-white">
        <summary className="flex cursor-pointer list-none items-center justify-center gap-2 p-4 text-sm font-extrabold text-slate-700">
          <Pencil size={16} />
          Edit Gambar
        </summary>

        <form
          action={ubahMediaTilikAction}
          className="grid gap-5 border-t border-slate-200 p-5 md:grid-cols-2"
        >
          <input type="hidden" name="id" value={item.id} />

          <SelectKategori
            id={`edit-media-${item.id}-kategori`}
            value={item.kategori}
          />

          <TextInput
            idPrefix={`edit-media-${item.id}`}
            name="judul"
            label="Judul Gambar"
            value={item.judul}
          />

          <div className="md:col-span-2">
            <TextArea
              idPrefix={`edit-media-${item.id}`}
              name="deskripsi"
              label="Deskripsi"
              value={item.deskripsi}
              required={false}
              rows={4}
            />
          </div>

          <NumberInput
            idPrefix={`edit-media-${item.id}`}
            name="urutan"
            label="Nomor Urutan"
            value={String(item.urutan)}
            min={0}
          />

          <Checkbox
            id={`edit-media-${item.id}-aktif`}
            name="aktif"
            label="Publikasikan Gambar"
            description="Tampilkan pada halaman publik."
            checked={item.aktif}
          />

          <div className="md:col-span-2">
            <FileInput
              id={`edit-media-${item.id}-gambar`}
              name="gambar"
              label="Ganti Gambar"
              required={false}
            />
          </div>

          {item.gambar_url && (
            <div className="md:col-span-2">
              <Checkbox
                id={`edit-media-${item.id}-hapus-gambar`}
                name="hapus_gambar"
                label="Hapus Gambar Lama"
                description="Centang untuk menghapus gambar tanpa menggantinya."
                checked={false}
                danger
              />
            </div>
          )}

          <div className="flex justify-end md:col-span-2">
            <SubmitButton text="Simpan Perubahan" dark />
          </div>
        </form>
      </details>
    </article>
  );
}

function DataSection({
  id,
  label,
  title,
  description,
  icon,
  children,
}: {
  id: string;
  label: string;
  title: string;
  description: string;
  icon: LucideIcon;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
    >
      <SectionHeader
        label={label}
        title={title}
        description={description}
        icon={icon}
        dark
      />
      {children}
    </section>
  );
}

function CardActions({
  id,
  aktif,
  toggleAction,
  deleteAction,
}: {
  id: string;
  aktif: boolean;
  toggleAction: (formData: FormData) => Promise<void>;
  deleteAction: (formData: FormData) => Promise<void>;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 border-t border-slate-200 bg-white p-4">
      <form action={toggleAction}>
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="aktif" value={String(!aktif)} />

        <button
          type="submit"
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-emerald-100 px-3 text-xs font-extrabold text-emerald-700 transition hover:bg-emerald-200"
        >
          <Power size={15} />
          {aktif ? 'Sembunyikan' : 'Publikasikan'}
        </button>
      </form>

      <form action={deleteAction}>
        <input type="hidden" name="id" value={id} />

        <button
          type="submit"
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-red-100 px-3 text-xs font-extrabold text-red-700 transition hover:bg-red-200"
        >
          <Trash2 size={15} />
          Hapus
        </button>
      </form>
    </div>
  );
}

function PreviewImage({
  src,
  alt,
  aktif,
}: {
  src: string | null;
  alt: string;
  aktif: boolean;
}) {
  return (
    <div className="relative aspect-[16/9] overflow-hidden bg-emerald-950">
      {src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center text-emerald-200">
          <ImageIcon size={40} />
          <p className="mt-3 text-xs font-extrabold uppercase tracking-wider">
            Belum ada gambar
          </p>
        </div>
      )}

      <span
        className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-[10px] font-extrabold text-white ${
          aktif ? 'bg-emerald-700' : 'bg-slate-800'
        }`}
      >
        {aktif ? 'Aktif' : 'Nonaktif'}
      </span>
    </div>
  );
}

function SectionHeader({
  label,
  title,
  description,
  icon: Icon,
  dark = false,
}: {
  label: string;
  title: string;
  description: string;
  icon: LucideIcon;
  dark?: boolean;
}) {
  return (
    <div className="border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-white px-6 py-5 sm:px-7">
      <div className="flex items-start gap-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white ${
            dark ? 'bg-emerald-900' : 'bg-emerald-700'
          }`}
        >
          <Icon size={23} />
        </div>

        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-emerald-700">
            {label}
          </p>
          <h2 className="mt-1 text-xl font-black text-slate-900">{title}</h2>
          <p className="mt-1 text-sm font-medium leading-6 text-slate-500">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  description,
  icon: Icon,
}: {
  label: string;
  value: number;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <article className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
            {label}
          </p>
          <p className="mt-3 text-4xl font-black text-slate-900">{value}</p>
          <p className="mt-2 text-xs font-semibold text-slate-500">
            {description}
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
          <Icon size={22} />
        </div>
      </div>
    </article>
  );
}

function Message({
  type,
  text,
}: {
  type: 'success' | 'error';
  text: string;
}) {
  const success = type === 'success';
  const Icon = success ? CheckCircle2 : AlertCircle;

  return (
    <div
      className={`flex items-start gap-3 rounded-2xl border p-4 ${
        success
          ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
          : 'border-red-200 bg-red-50 text-red-700'
      }`}
    >
      <Icon size={20} className="mt-0.5 shrink-0" />
      <p className="text-sm font-semibold leading-6">{text}</p>
    </div>
  );
}

function TextInput({
  idPrefix,
  name,
  label,
  value = '',
  placeholder,
}: {
  idPrefix: string;
  name: string;
  label: string;
  value?: string;
  placeholder?: string;
}) {
  const id = `${idPrefix}-${name}`;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-extrabold uppercase tracking-wider text-slate-500"
      >
        {label}
        <span className="ml-1 text-red-500">*</span>
      </label>

      <input
        id={id}
        name={name}
        type="text"
        required
        defaultValue={value}
        placeholder={placeholder}
        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-800 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
      />
    </div>
  );
}

function UrlInput({
  idPrefix,
  name,
  label,
  value = '',
}: {
  idPrefix: string;
  name: string;
  label: string;
  value?: string;
}) {
  const id = `${idPrefix}-${name}`;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-extrabold uppercase tracking-wider text-slate-500"
      >
        {label}
      </label>

      <input
        id={id}
        name={name}
        type="url"
        defaultValue={value}
        placeholder="https://drive.google.com/drive/folders/..."
        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-800 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
      />
    </div>
  );
}

function NumberInput({
  idPrefix,
  name,
  label,
  value,
  min,
  max,
  required = true,
}: {
  idPrefix: string;
  name: string;
  label: string;
  value: string;
  min: number;
  max?: number;
  required?: boolean;
}) {
  const id = `${idPrefix}-${name}`;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-extrabold uppercase tracking-wider text-slate-500"
      >
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <input
        id={id}
        name={name}
        type="number"
        required={required}
        min={min}
        max={max}
        step="1"
        defaultValue={value}
        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-800 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
      />
    </div>
  );
}

function TextArea({
  idPrefix,
  name,
  label,
  value = '',
  placeholder,
  rows = 6,
  required = true,
}: {
  idPrefix: string;
  name: string;
  label: string;
  value?: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}) {
  const id = `${idPrefix}-${name}`;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-extrabold uppercase tracking-wider text-slate-500"
      >
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <textarea
        id={id}
        name={name}
        rows={rows}
        required={required}
        defaultValue={value}
        placeholder={placeholder}
        className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold leading-7 text-slate-800 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
      />
    </div>
  );
}

function FileInput({
  id,
  name,
  label,
  required,
}: {
  id: string;
  name: string;
  label: string;
  required: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-extrabold uppercase tracking-wider text-slate-500">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <label
        htmlFor={id}
        className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-7 text-center transition hover:border-emerald-400 hover:bg-emerald-50"
      >
        <Upload size={24} className="text-emerald-700" />
        <p className="mt-3 text-sm font-extrabold text-slate-700">
          Pilih gambar dari perangkat
        </p>
        <p className="mt-1 text-xs font-medium text-slate-500">
          JPG, PNG, atau WebP. Maksimal 5 MB.
        </p>

        <input
          id={id}
          name={name}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          required={required}
          className="mt-4 block w-full max-w-md text-xs font-semibold text-slate-500 file:mr-4 file:rounded-xl file:border-0 file:bg-emerald-700 file:px-4 file:py-2.5 file:text-xs file:font-extrabold file:text-white"
        />
      </label>
    </div>
  );
}

function SelectKategori({
  id,
  value = 'struktur-organisasi',
}: {
  id: string;
  value?: 'struktur-organisasi' | 'galeri-desa';
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-extrabold uppercase tracking-wider text-slate-500"
      >
        Kategori
        <span className="ml-1 text-red-500">*</span>
      </label>

      <select
        id={id}
        name="kategori"
        required
        defaultValue={value}
        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-800 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
      >
        <option value="struktur-organisasi">Struktur Organisasi</option>
        <option value="galeri-desa">Galeri Desa</option>
      </select>
    </div>
  );
}

function Checkbox({
  id,
  name,
  label,
  description,
  checked,
  danger = false,
}: {
  id: string;
  name: string;
  label: string;
  description: string;
  checked: boolean;
  danger?: boolean;
}) {
  return (
    <label
      htmlFor={id}
      className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 ${
        danger
          ? 'border-red-200 bg-red-50'
          : 'border-emerald-100 bg-emerald-50/60'
      }`}
    >
      <input
        id={id}
        type="checkbox"
        name={name}
        value="true"
        defaultChecked={checked}
        className={`mt-1 h-4 w-4 shrink-0 ${
          danger ? 'accent-red-600' : 'accent-emerald-700'
        }`}
      />

      <span>
        <span
          className={`block text-sm font-extrabold ${
            danger ? 'text-red-800' : 'text-slate-700'
          }`}
        >
          {label}
        </span>
        <span className="mt-1 block text-xs font-medium leading-5 text-slate-500">
          {description}
        </span>
      </span>
    </label>
  );
}

function SubmitButton({
  text,
  dark = false,
}: {
  text: string;
  dark?: boolean;
}) {
  return (
    <button
      type="submit"
      className={`inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl px-6 text-sm font-extrabold text-white transition sm:w-auto ${
        dark
          ? 'bg-emerald-900 hover:bg-emerald-950'
          : 'bg-emerald-700 hover:bg-emerald-800'
      }`}
    >
      <Save size={17} />
      {text}
    </button>
  );
}

function EmptyState({
  icon: Icon,
  text,
}: {
  icon: LucideIcon;
  text: string;
}) {
  return (
    <div className="px-6 py-16 text-center">
      <Icon size={48} className="mx-auto text-slate-300" />
      <p className="mt-4 text-sm font-bold text-slate-500">{text}</p>
    </div>
  );
}