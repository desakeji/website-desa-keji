// app/(public)/profil/sejarah/page.tsx

import Link from 'next/link';

import {
  ArrowRight,
  BookOpen,
  Calendar,
  Camera,
  Download,
  ExternalLink,
  Eye,
  FileText,
  Home as HomeIcon,
  Map,
  Palette,
  ShoppingBag,
  User,
  Utensils,
} from 'lucide-react';

import SidebarLayanan from '@/components/SidebarLayanan';
import SidebarTilikArkeji from '@/components/SidebarTilikArkeji';

import { supabaseAdmin } from '@/lib/supabase-admin';

import type {
  PilihanLayanan,
} from '@/types/layanan';

export const dynamic =
  'force-dynamic';

export const revalidate = 0;

const JENIS_EBOOK =
  'ebook-sejarah';

interface LayananDatabase {
  id: number | string | null;
  nama: string | null;
  slug: string | null;
}

interface EbookSejarahPublik {
  id: string;
  judul: string;
  deskripsi: string;
  penyusun: string;
  tahun: number | null;
  jumlah_halaman: number | null;
  file_url: string;
  cover_url: string | null;
  urutan: number;
}

function safeString(
  value: unknown
) {
  return String(
    value ?? ''
  ).trim();
}

function normalizeEbook(
  value: unknown
): EbookSejarahPublik | null {
  if (
    !value ||
    typeof value !== 'object' ||
    Array.isArray(value)
  ) {
    return null;
  }

  const row =
    value as Record<
      string,
      unknown
    >;

  const id =
    safeString(row.id);

  const judul =
    safeString(row.judul);

  const deskripsi =
    safeString(
      row.deskripsi
    );

  const penyusun =
    safeString(
      row.penyusun
    );

  const fileUrl =
    safeString(
      row.file_url
    );

  const urutan =
    Number(
      row.urutan ?? 0
    );

  if (
    !id ||
    !judul ||
    !deskripsi ||
    !penyusun ||
    !fileUrl ||
    !Number.isInteger(
      urutan
    )
  ) {
    return null;
  }

  const tahun =
    row.tahun === null ||
    row.tahun === undefined
      ? null
      : Number(row.tahun);

  const jumlahHalaman =
    row.jumlah_halaman === null ||
    row.jumlah_halaman === undefined
      ? null
      : Number(
          row.jumlah_halaman
        );

  const coverUrl =
    safeString(
      row.cover_url
    );

  return {
    id,
    judul,
    deskripsi,
    penyusun,

    tahun:
      tahun !== null &&
      Number.isInteger(tahun)
        ? tahun
        : null,

    jumlah_halaman:
      jumlahHalaman !== null &&
      Number.isInteger(
        jumlahHalaman
      )
        ? jumlahHalaman
        : null,

    file_url: fileUrl,

    cover_url:
      coverUrl || null,

    urutan,
  };
}

async function getDaftarLayanan():
  Promise<PilihanLayanan[]> {
  const { data, error } =
    await supabaseAdmin
      .from('layanan')
      .select(`
        id,
        nama,
        slug
      `)
      .eq('aktif', true)
      .order('urutan', {
        ascending: true,
      })
      .order('nama', {
        ascending: true,
      });

  if (error) {
    console.error(
      'Gagal mengambil layanan pada halaman sejarah:',
      {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      }
    );

    return [];
  }

  const rows =
    (data ??
      []) as LayananDatabase[];

  return rows
    .map((layanan) => ({
      id: Number(layanan.id),

      nama: safeString(
        layanan.nama
      ),

      slug: safeString(
        layanan.slug
      ),
    }))
    .filter(
      (layanan) =>
        Number.isInteger(
          layanan.id
        ) &&
        layanan.id > 0 &&
        layanan.nama.length > 0 &&
        layanan.slug.length > 0
    );
}

async function getEbookSejarah():
  Promise<EbookSejarahPublik[]> {
  const { data, error } =
    await supabaseAdmin
      .from(
        'desa_wisata_dokumen'
      )
      .select(`
        id,
        judul,
        deskripsi,
        penyusun,
        tahun,
        jumlah_halaman,
        file_url,
        cover_url,
        urutan
      `)
      .eq(
        'jenis',
        JENIS_EBOOK
      )
      .eq('aktif', true)
      .order('urutan', {
        ascending: true,
      })
      .order('tahun', {
        ascending: false,
        nullsFirst: false,
      });

  if (error) {
    console.error(
      'Gagal mengambil ebook sejarah:',
      {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      }
    );

    return [];
  }

  return (data ?? [])
    .map(normalizeEbook)
    .filter(
      (
        item
      ): item is EbookSejarahPublik =>
        item !== null
    );
}

export default async function SejarahDesaPage() {
  const [
    daftarLayanan,
    daftarEbook,
  ] = await Promise.all([
    getDaftarLayanan(),
    getEbookSejarah(),
  ]);

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Teks Berjalan */}
        <div className="relative mb-6 flex items-center gap-3 overflow-hidden rounded-xl bg-emerald-800 px-4 py-2 text-sm font-medium text-white shadow-sm">
          <div className="z-10 shrink-0 rounded-lg bg-emerald-600 px-3 py-1 text-xs font-bold shadow-md">
            Sekilas Info
          </div>

          <style
            dangerouslySetInnerHTML={{
              __html: `
                @keyframes scrolling-sejarah-info {
                  0% {
                    transform: translateX(100%);
                  }

                  100% {
                    transform: translateX(-100%);
                  }
                }

                .animate-scrolling-sejarah-info {
                  display: inline-block;
                  animation: scrolling-sejarah-info 22s linear infinite;
                  white-space: nowrap;
                }

                @media (prefers-reduced-motion: reduce) {
                  .animate-scrolling-sejarah-info {
                    animation: none;
                  }
                }
              `,
            }}
          />

          <div className="min-w-0 flex-1 overflow-hidden">
            <div className="animate-scrolling-sejarah-info">
              Untuk permohonan informasi
              silakan masuk ke menu PPID
              website ini. *** Sejarah,
              arsip, budaya, kuliner, dan
              potensi wisata Desa Keji,
              Kecamatan Ungaran Barat,
              Kabupaten Semarang ***
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Konten Utama */}
          <main className="min-w-0 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8 lg:w-2/3">
            <h1 className="mb-4 text-2xl font-extrabold leading-tight text-gray-800 md:text-3xl">
              Sejarah dan Potensi
              Pariwisata Desa Keji
            </h1>

            {/* Metadata */}
            <div className="mb-6 flex flex-wrap gap-4 border-b border-gray-100 pb-4 text-xs font-semibold text-gray-500">
              <span className="flex items-center gap-1.5">
                <Calendar
                  size={14}
                  className="text-emerald-500"
                />

                05 Juli 2026
              </span>

              <span className="flex items-center gap-1.5">
                <User
                  size={14}
                  className="text-emerald-500"
                />

                Admin Desa
              </span>

              <span className="flex items-center gap-1.5">
                <Eye
                  size={14}
                  className="text-emerald-500"
                />

                Informasi Publik
              </span>
            </div>

            {/* Gambar Utama */}
            <div className="mb-8 h-[300px] w-full overflow-hidden rounded-xl shadow-sm md:h-[400px]">
              <img
                src="/background.png"
                alt="Potensi Wisata Desa Keji"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Pengantar */}
            <div className="prose prose-emerald max-w-none text-justify leading-relaxed text-gray-700">
              <p className="mb-6 text-lg font-medium text-gray-800">
                Desa Keji merupakan salah
                satu desa yang terdapat di
                Kecamatan Ungaran Barat,
                Kabupaten Semarang. Berada
                di lereng Gunung Ungaran
                dengan panorama khas
                pedesaan, hawa di desa ini
                terasa begitu sejuk.
              </p>

              <p>
                Desa ini memiliki banyak
                potensi, salah satunya yaitu{' '}
                <strong>
                  Kampoeng Seni
                </strong>{' '}
                yang terdapat di Dusun
                Suruhan. Desa wisata yang
                berjarak sekitar 26 km dari
                pusat Kota Semarang ini
                merintis pariwisatanya
                melalui Sanggar Tari dan
                Studio Pelestari Seni Budaya
                dan Permainan Tradisional{' '}
                <strong>
                  Yoss Tradisional Centre
                  (YTC)
                </strong>
                .
              </p>

              <p>
                Penyambutan wisatawan
                biasanya dilakukan secara
                meriah dengan{' '}
                <strong>
                  Tarian Kuda Debog
                  (Pelepah Pisang)
                </strong>{' '}
                oleh anak-anak desa.
                Kesenian tersebut menjadi
                bagian dari identitas budaya
                dan pengalaman wisata Desa
                Keji.
              </p>
            </div>

            {/* Ebook Sejarah */}
            <section
              id="ebook-sejarah"
              className="mt-10 scroll-mt-28"
            >
              <div className="mb-6 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-700 text-white">
                  <BookOpen size={23} />
                </div>

                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-700">
                    Arsip Digital
                  </p>

                  <h2 className="mt-1 text-2xl font-black text-slate-900">
                    Ebook Sejarah Desa Keji
                  </h2>

                  <p className="mt-2 text-sm font-medium leading-7 text-slate-500">
                    Baca dan unduh
                    dokumentasi sejarah Desa
                    Keji dalam bentuk buku
                    digital.
                  </p>
                </div>
              </div>

              {daftarEbook.length > 0 ? (
                <div className="space-y-5">
                  {daftarEbook.map(
                    (ebook, index) => (
                      <EbookSejarahCard
                        key={ebook.id}
                        ebook={ebook}
                        nomor={index + 1}
                      />
                    )
                  )}
                </div>
              ) : (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
                  <FileText
                    size={46}
                    className="mx-auto text-slate-300"
                  />

                  <h3 className="mt-4 text-lg font-black text-slate-800">
                    Ebook sejarah sedang
                    disiapkan
                  </h3>

                  <p className="mx-auto mt-2 max-w-lg text-sm font-medium leading-6 text-slate-500">
                    Ebook akan ditampilkan
                    setelah ditambahkan dan
                    dipublikasikan melalui
                    halaman administrator.
                  </p>
                </div>
              )}
            </section>

            {/* Sejarah dan Potensi */}
            <div className="prose prose-emerald mt-10 max-w-none text-justify leading-relaxed text-gray-700">
              {/* Potensi Kebudayaan */}
              <div className="mb-4 mt-8 flex items-center gap-2 border-b-2 border-emerald-100 pb-2">
                <Palette
                  className="text-emerald-600"
                  size={24}
                />

                <h3 className="m-0 text-xl font-bold text-gray-800">
                  Potensi Kebudayaan
                </h3>
              </div>

              <p>
                Sumber air{' '}
                <strong>
                  Watu Kemloso
                </strong>{' '}
                yang tidak jauh dari lokasi
                Kampoeng Seni juga menjadi
                bagian dari potensi
                pariwisata. Setiap tahunnya
                terdapat ritual adat{' '}
                <strong>
                  Iriban Banyu Kemloso
                </strong>
                .
              </p>

              <p>
                Perayaan yang jatuh pada
                bulan Agustus, tepatnya pada
                hari Sabtu Pahing, biasanya
                digelar secara besar-besaran
                dengan kirab sesaji ke
                sumber air yang menjadi
                sumber penghidupan warga.
              </p>

              <SectionLinkCard
                href="/desa-wisata/galeri"
                icon={Camera}
                label="Dokumentasi Budaya"
                title="Lihat Galeri Desa Keji"
                description="Temukan dokumentasi Iriban Banyu Kemloso, kesenian, tradisi, dan berbagai kegiatan masyarakat Desa Keji."
                buttonText="Lihat Galeri"
                color="emerald"
              />

              {/* Potensi Kuliner */}
              <div className="mb-4 mt-10 flex items-center gap-2 border-b-2 border-emerald-100 pb-2">
                <Utensils
                  className="text-emerald-600"
                  size={24}
                />

                <h3 className="m-0 text-xl font-bold text-gray-800">
                  Potensi Kuliner
                </h3>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-4">
                  <h4 className="mb-1 text-lg font-bold text-emerald-800">
                    1. Gethuk Tetek Melek
                  </h4>

                  <p className="text-sm">
                    Berbahan baku singkong,
                    jajanan ini hampir sama
                    dengan kue jongkong.
                    Perbedaannya terdapat
                    pada pembungkusnya.
                    Jongkong dibungkus
                    menggunakan daun pisang,
                    sedangkan tetek melek
                    dibungkus menggunakan
                    plastik.
                  </p>

                  <p className="text-sm">
                    Cara membuatnya yaitu
                    singkong diparut, diberi
                    garam dan gula jawa,
                    kemudian dikukus. Setelah
                    matang, adonan diletakkan
                    di atas nampan, dipotong,
                    dan disajikan dengan
                    parutan kelapa.
                  </p>

                  <p className="text-sm">
                    Makanan ini dinamakan
                    &quot;Tetek Melek&quot;
                    karena proses
                    pembuatannya dilakukan
                    sambil{' '}
                    <em>melek-melek</em>{' '}
                    atau begadang agar orang
                    yang menyantapnya dapat
                    terus terjaga ketika
                    menyaksikan pertunjukan
                    adat.
                  </p>
                </div>

                <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-4">
                  <h4 className="mb-1 text-lg font-bold text-emerald-800">
                    2. Pecel Gablok
                  </h4>

                  <p className="text-sm">
                    Menu ini menggunakan{' '}
                    <em>gablok</em> yang
                    dibuat dari beras. Beras
                    dimasukkan ke dalam
                    plastik, kemudian direbus
                    hingga penuh.
                  </p>

                  <p className="text-sm">
                    Beras setengah matang
                    beserta plastiknya lalu
                    dikukus selama kurang
                    lebih satu jam. Gablok
                    disantap dengan sambal
                    pecel yang dicampur
                    berbagai sayuran.
                  </p>

                  <p className="text-sm">
                    Sajian ini biasanya
                    dilengkapi dengan tempe
                    mendoan hangat.
                  </p>
                </div>
              </div>

              <SectionLinkCard
  href="/umkm"
  icon={ShoppingBag}
  label="Produk Lokal Desa"
  title="Temukan Kuliner dan Produk UMKM"
  description="Lihat produk makanan, minuman, kerajinan, dan usaha masyarakat Desa Keji melalui Lapak UMKM."
  buttonText="Lihat Lapak UMKM"
  color="emerald"
/>

              {/* Paket Wisata */}
              <div className="mb-4 mt-10 flex items-center gap-2 border-b-2 border-emerald-100 pb-2">
                <Map
                  className="text-emerald-600"
                  size={24}
                />

                <h3 className="m-0 text-xl font-bold text-gray-800">
                  Paket Wisata
                </h3>
              </div>

              <p>
                Desa Wisata Keji
                menyediakan pilihan kegiatan
                yang dapat disesuaikan untuk
                wisatawan, sekolah,
                komunitas, maupun kelompok
                kunjungan.
              </p>

              <div className="not-prose mt-5 grid gap-4 sm:grid-cols-2">
                <article className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-700 text-white">
                    <Map size={20} />
                  </div>

                  <p className="mt-4 text-[10px] font-extrabold uppercase tracking-[0.14em] text-emerald-700">
                    Paket 01
                  </p>

                  <h4 className="mt-2 text-lg font-black text-slate-900">
                    Paket Edukatif
                  </h4>

                  <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
                    Wisatawan diajak
                    belajar membatik dengan
                    motif khas kuda debog,
                    bunga terompet, dan
                    srengengen, serta
                    mengenal tokoh wayang
                    Punakawan.
                  </p>
                </article>

                <article className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-700 text-white">
                    <Calendar size={20} />
                  </div>

                  <p className="mt-4 text-[10px] font-extrabold uppercase tracking-[0.14em] text-emerald-700">
                    Paket 02
                  </p>

                  <h4 className="mt-2 text-lg font-black text-slate-900">
                    Paket One Day
                  </h4>

                  <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
                    Wisatawan diajak
                    mengunjungi industri
                    herbal, Yoss Traditional
                    Centre, industri makanan
                    khas, industri tas, dan
                    berbagai usaha kuliner
                    lokal Desa Keji.
                  </p>
                </article>
              </div>

              {/* Penginapan */}
              <div className="mb-4 mt-10 flex items-center gap-2 border-b-2 border-emerald-100 pb-2">
                <HomeIcon
                  className="text-emerald-600"
                  size={24}
                />

                <h3 className="m-0 text-xl font-bold text-gray-800">
                  Penginapan (Homestay)
                </h3>
              </div>

              <p>
                Bagi wisatawan yang ingin
                merasakan secara langsung
                suasana malam di pedesaan,
                penginapan atau{' '}
                <em>homestay</em> tersedia
                di rumah-rumah penduduk
                dengan harga yang terjangkau
                serta keramahan khas warga
                Desa Keji.
              </p>

              <SectionLinkCard
                href="/desa-wisata/paket-wisata"
                icon={Map}
                label="Informasi Kunjungan"
                title="Paket Wisata dan Pemesanan Homestay"
                description="Lihat informasi lengkap mengenai paket kegiatan, fasilitas, homestay, kontak pengelola, dan pemesanan kunjungan Desa Wisata Keji."
                buttonText="Lihat Paket Wisata"
                color="dark"
              />
            </div>
          </main>

          {/* Sidebar Kanan */}
          <aside className="min-w-0 lg:w-1/3">
            <div className="flex flex-col gap-8 lg:sticky lg:top-24">
              <SidebarLayanan
                daftarLayanan={
                  daftarLayanan
                }
                sticky={false}
              />

              <SidebarTilikArkeji />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function EbookSejarahCard({
  ebook,
  nomor,
}: {
  ebook: EbookSejarahPublik;
  nomor: number;
}) {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:border-emerald-200 hover:shadow-lg">
      <div className="grid sm:grid-cols-[200px_minmax(0,1fr)]">
        <div className="relative min-h-72 overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-800 to-teal-700">
          {ebook.cover_url ? (
            <img
              src={ebook.cover_url}
              alt={`Cover ${ebook.judul}`}
              loading="lazy"
              className="h-full min-h-72 w-full object-cover"
            />
          ) : (
            <div className="flex h-full min-h-72 flex-col items-center justify-center p-6 text-center text-white">
              <BookOpen size={52} />

              <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-200">
                Ebook Sejarah
              </p>

              <p className="mt-2 text-xl font-black">
                Desa Keji
              </p>
            </div>
          )}

          <span className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1.5 text-xs font-black text-white backdrop-blur">
            {String(nomor).padStart(
              2,
              '0'
            )}
          </span>
        </div>

        <div className="flex flex-col p-6">
          <div className="flex flex-wrap gap-2">
            {ebook.tahun && (
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-extrabold text-emerald-700">
                Tahun {ebook.tahun}
              </span>
            )}

            {ebook.jumlah_halaman && (
              <span className="rounded-full bg-blue-100 px-3 py-1 text-[10px] font-extrabold text-blue-700">
                {ebook.jumlah_halaman}{' '}
                halaman
              </span>
            )}
          </div>

          <h3 className="mt-4 text-2xl font-black leading-tight text-slate-900">
            {ebook.judul}
          </h3>

          <p className="mt-2 text-xs font-extrabold uppercase tracking-wider text-emerald-700">
            Disusun oleh{' '}
            {ebook.penyusun}
          </p>

          <p className="mt-4 flex-1 text-sm font-medium leading-7 text-slate-600">
            {ebook.deskripsi}
          </p>

          <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row">
            <a
              href={ebook.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 text-sm font-extrabold text-white transition hover:bg-emerald-800"
            >
              <FileText size={16} />

              Baca Ebook

              <ExternalLink size={13} />
            </a>

            <a
              href={ebook.file_url}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-5 text-sm font-extrabold text-emerald-700 transition hover:bg-emerald-100"
            >
              <Download size={16} />

              Unduh PDF
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

function SectionLinkCard({
  href,
  icon: Icon,
  label,
  title,
  description,
  buttonText,
  color,
}: {
  href: string;
  icon: typeof Map;
  label: string;
  title: string;
  description: string;
  buttonText: string;
  color: 'emerald' | 'dark';
}) {
  const isDark =
    color === 'dark';

  return (
    <div
      className={`not-prose mt-6 rounded-2xl border p-5 sm:p-6 ${
        isDark
          ? 'border-emerald-800 bg-gradient-to-br from-emerald-950 via-emerald-800 to-teal-700 text-white'
          : 'border-emerald-100 bg-gradient-to-r from-emerald-50 to-white'
      }`}
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
              isDark
                ? 'border border-white/15 bg-white/10 text-white'
                : 'bg-emerald-700 text-white'
            }`}
          >
            <Icon size={20} />
          </div>

          <div>
            <p
              className={`text-xs font-extrabold uppercase tracking-[0.14em] ${
                isDark
                  ? 'text-emerald-200'
                  : 'text-emerald-700'
              }`}
            >
              {label}
            </p>

            <h4
              className={`mt-2 text-lg font-black ${
                isDark
                  ? 'text-white'
                  : 'text-slate-900'
              }`}
            >
              {title}
            </h4>

            <p
              className={`mt-2 max-w-xl text-sm font-medium leading-6 ${
                isDark
                  ? 'text-emerald-50/80'
                  : 'text-slate-500'
              }`}
            >
              {description}
            </p>
          </div>
        </div>

        <Link
          href={href}
          className={`inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl px-5 text-sm font-extrabold transition ${
            isDark
              ? 'bg-white text-emerald-900 hover:bg-emerald-50'
              : 'bg-emerald-700 text-white hover:bg-emerald-800'
          }`}
        >
          {buttonText}

          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}