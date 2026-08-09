// app/(public)/profil/tilik-arkeji/page.tsx

import type {
  Metadata,
} from 'next';

import Link from 'next/link';

import {
  Archive,
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  ExternalLink,
  FolderOpen,
  Image as ImageIcon,
  Images,
  Landmark,
  Users,
  type LucideIcon,
} from 'lucide-react';

import {
  supabaseAdmin,
} from '@/lib/supabase-admin';

export const metadata: Metadata = {
  title:
    'Tilik Arkeji – Arsip Desa Keji | SIJI',

  description:
    'Arsip sejarah kepemimpinan, struktur organisasi, penghargaan, dan galeri Desa Keji.',
};

export const dynamic =
  'force-dynamic';

export const revalidate = 0;

interface PengaturanTilik {
  judul: string;
  deskripsi: string;

  biografi_drive_url:
    string | null;

  struktur_drive_url:
    string | null;

  penghargaan_drive_url:
    string | null;

  galeri_drive_url:
    string | null;
}

interface MantanKadesPublik {
  id: string;
  nama: string;

  periode_mulai:
    number;

  periode_selesai:
    number | null;

  biografi: string;

  foto_url:
    string | null;

  urutan: number;
}

interface PenghargaanPublik {
  id: string;

  nama_penghargaan:
    string;

  tahun: number;
  tingkat: string;
  penyelenggara: string;
  deskripsi: string;

  foto_url:
    string | null;

  urutan: number;
}

interface MediaTilikPublik {
  id: string;

  kategori:
    | 'struktur-organisasi'
    | 'galeri-desa';

  judul: string;
  deskripsi: string;

  gambar_url:
    string | null;

  urutan: number;
}

const fallbackPengaturan:
  PengaturanTilik = {
  judul: 'Tilik Arkeji',

  deskripsi:
    'Arsip digital kepemimpinan, struktur organisasi, pencapaian, dan dokumentasi Desa Keji.',

  biografi_drive_url: null,

  struktur_drive_url: null,

  penghargaan_drive_url:
    null,

  galeri_drive_url: null,
};

function safeString(
  value: unknown
) {
  return String(
    value ?? ''
  ).trim();
}

function nullableString(
  value: unknown
) {
  const result =
    safeString(value);

  return result || null;
}

function normalizePengaturan(
  value: unknown
): PengaturanTilik {
  if (
    !value ||
    typeof value !== 'object' ||
    Array.isArray(value)
  ) {
    return fallbackPengaturan;
  }

  const row =
    value as Record<
      string,
      unknown
    >;

  return {
    judul:
      safeString(row.judul) ||
      fallbackPengaturan.judul,

    deskripsi:
      safeString(
        row.deskripsi
      ) ||
      fallbackPengaturan.deskripsi,

    biografi_drive_url:
      nullableString(
        row.biografi_drive_url
      ),

    struktur_drive_url:
      nullableString(
        row.struktur_drive_url
      ),

    penghargaan_drive_url:
      nullableString(
        row.penghargaan_drive_url
      ),

    galeri_drive_url:
      nullableString(
        row.galeri_drive_url
      ),
  };
}

function normalizeMantanKades(
  value: unknown
): MantanKadesPublik | null {
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

  const nama =
    safeString(row.nama);

  const biografi =
    safeString(
      row.biografi
    );

  const periodeMulai =
    Number(
      row.periode_mulai
    );

  const periodeSelesai =
    row.periode_selesai === null ||
    row.periode_selesai ===
      undefined
      ? null
      : Number(
          row.periode_selesai
        );

  const urutan =
    Number(
      row.urutan ?? 0
    );

  if (
    !id ||
    !nama ||
    !biografi ||
    !Number.isInteger(
      periodeMulai
    ) ||
    !Number.isInteger(
      urutan
    )
  ) {
    return null;
  }

  return {
    id,
    nama,

    periode_mulai:
      periodeMulai,

    periode_selesai:
      periodeSelesai !== null &&
      Number.isInteger(
        periodeSelesai
      )
        ? periodeSelesai
        : null,

    biografi,

    foto_url:
      nullableString(
        row.foto_url
      ),

    urutan,
  };
}

function normalizePenghargaan(
  value: unknown
): PenghargaanPublik | null {
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

  const namaPenghargaan =
    safeString(
      row.nama_penghargaan
    );

  const tahun =
    Number(row.tahun);

  const tingkat =
    safeString(
      row.tingkat
    );

  const penyelenggara =
    safeString(
      row.penyelenggara
    );

  const deskripsi =
    safeString(
      row.deskripsi
    );

  const urutan =
    Number(
      row.urutan ?? 0
    );

  if (
    !id ||
    !namaPenghargaan ||
    !tingkat ||
    !penyelenggara ||
    !deskripsi ||
    !Number.isInteger(tahun) ||
    !Number.isInteger(
      urutan
    )
  ) {
    return null;
  }

  return {
    id,

    nama_penghargaan:
      namaPenghargaan,

    tahun,
    tingkat,
    penyelenggara,
    deskripsi,

    foto_url:
      nullableString(
        row.foto_url
      ),

    urutan,
  };
}

function normalizeMedia(
  value: unknown
): MediaTilikPublik | null {
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

  const kategori =
    safeString(
      row.kategori
    );

  const judul =
    safeString(row.judul);

  const urutan =
    Number(
      row.urutan ?? 0
    );

  if (
    !id ||
    !judul ||
    !Number.isInteger(
      urutan
    ) ||
    (
      kategori !==
        'struktur-organisasi' &&
      kategori !==
        'galeri-desa'
    )
  ) {
    return null;
  }

  return {
    id,

    kategori,

    judul,

    deskripsi:
      safeString(
        row.deskripsi
      ),

    gambar_url:
      nullableString(
        row.gambar_url
      ),

    urutan,
  };
}

export default async function TilikArkejiPage() {
  const [
    pengaturanResult,
    mantanKadesResult,
    penghargaanResult,
    mediaResult,
  ] = await Promise.all([
    supabaseAdmin
      .from(
        'tilik_arkeji_settings'
      )
      .select(`
        judul,
        deskripsi,
        biografi_drive_url,
        struktur_drive_url,
        penghargaan_drive_url,
        galeri_drive_url
      `)
      .eq(
        'setting_key',
        'utama'
      )
      .maybeSingle(),

    supabaseAdmin
      .from(
        'tilik_arkeji_mantan_kades'
      )
      .select(`
        id,
        nama,
        periode_mulai,
        periode_selesai,
        biografi,
        foto_url,
        urutan
      `)
      .eq('aktif', true)
      .order('urutan', {
        ascending: true,
      })
      .order(
        'periode_mulai',
        {
          ascending: true,
        }
      ),

    supabaseAdmin
      .from(
        'tilik_arkeji_penghargaan'
      )
      .select(`
        id,
        nama_penghargaan,
        tahun,
        tingkat,
        penyelenggara,
        deskripsi,
        foto_url,
        urutan
      `)
      .eq('aktif', true)
      .order('urutan', {
        ascending: true,
      })
      .order('tahun', {
        ascending: false,
      }),

    supabaseAdmin
      .from(
        'tilik_arkeji_media'
      )
      .select(`
        id,
        kategori,
        judul,
        deskripsi,
        gambar_url,
        urutan
      `)
      .eq('aktif', true)
      .order('kategori', {
        ascending: true,
      })
      .order('urutan', {
        ascending: true,
      }),
  ]);

  if (
    pengaturanResult.error
  ) {
    console.error(
      'Gagal mengambil pengaturan Tilik Arkeji:',
      {
        message:
          pengaturanResult.error
            .message,

        code:
          pengaturanResult.error
            .code,

        details:
          pengaturanResult.error
            .details,

        hint:
          pengaturanResult.error
            .hint,
      }
    );
  }

  if (
    mantanKadesResult.error
  ) {
    console.error(
      'Gagal mengambil biografi kepala desa:',
      {
        message:
          mantanKadesResult.error
            .message,

        code:
          mantanKadesResult.error
            .code,

        details:
          mantanKadesResult.error
            .details,

        hint:
          mantanKadesResult.error
            .hint,
      }
    );
  }

  if (
    penghargaanResult.error
  ) {
    console.error(
      'Gagal mengambil penghargaan:',
      {
        message:
          penghargaanResult.error
            .message,

        code:
          penghargaanResult.error
            .code,

        details:
          penghargaanResult.error
            .details,

        hint:
          penghargaanResult.error
            .hint,
      }
    );
  }

  if (mediaResult.error) {
    console.error(
      'Gagal mengambil media Tilik Arkeji:',
      {
        message:
          mediaResult.error
            .message,

        code:
          mediaResult.error
            .code,

        details:
          mediaResult.error
            .details,

        hint:
          mediaResult.error
            .hint,
      }
    );
  }

  const pengaturan =
    normalizePengaturan(
      pengaturanResult.data
    );

  const daftarMantanKades =
    (
      mantanKadesResult.data ??
      []
    )
      .map(
        normalizeMantanKades
      )
      .filter(
        (
          item
        ): item is MantanKadesPublik =>
          item !== null
      );

  const daftarPenghargaan =
    (
      penghargaanResult.data ??
      []
    )
      .map(
        normalizePenghargaan
      )
      .filter(
        (
          item
        ): item is PenghargaanPublik =>
          item !== null
      );

  const daftarMedia =
    (
      mediaResult.data ?? []
    )
      .map(normalizeMedia)
      .filter(
        (
          item
        ): item is MediaTilikPublik =>
          item !== null
      );

  const strukturOrganisasi =
    daftarMedia.filter(
      (item) =>
        item.kategori ===
        'struktur-organisasi'
    );

  const galeriDesa =
    daftarMedia.filter(
      (item) =>
        item.kategori ===
        'galeri-desa'
    );

  return (
    <div className="min-h-screen overflow-x-clip bg-slate-50">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-emerald-950 text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/background.png')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#021b16] via-emerald-950/95 to-emerald-900/55" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#021b16] via-transparent to-black/20" />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.55) 1px, transparent 1px)',

            backgroundSize:
              '28px 28px',
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full border-[72px] border-white/[0.035]"
        />

        <div className="relative mx-auto max-w-[1500px] px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <Link
            href="/profil/sejarah"
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-100/80 transition hover:text-white"
          >
            <ArrowLeft size={15} />

            Kembali ke Sejarah Desa
          </Link>

          <div className="mt-7 flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.17em] text-emerald-100 backdrop-blur sm:text-xs">
                <Archive size={15} />

                Arsip Desa Keji
              </div>

              <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-300">
                {pengaturan.judul}
              </p>

              <h1 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Menilik Sejarah dan
                Pencapaian Desa Keji
              </h1>

              <p className="mt-5 max-w-3xl text-sm font-medium leading-7 text-emerald-50/85 sm:text-base">
                {pengaturan.deskripsi}
              </p>
            </div>

            <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4 xl:w-auto">
              <HeroStat
                value={String(
                  daftarMantanKades.length
                )}
                label="Kepala Desa"
              />

              <HeroStat
                value={String(
                  daftarPenghargaan.length
                )}
                label="Penghargaan"
              />

              <HeroStat
                value={String(
                  strukturOrganisasi.length
                )}
                label="Struktur"
              />

              <HeroStat
                value={String(
                  galeriDesa.length
                )}
                label="Galeri"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Konten utama tanpa sidebar */}
      <main className="mx-auto max-w-[1500px] space-y-16 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {/* Biografi Kepala Desa */}
        <section
  id="kepala-desa"
  className="scroll-mt-28"
>
  <SectionTitle
    label="Arsip Kepemimpinan"
    title="Biografi Kepala Desa Keji"
    description="Mengenal tokoh yang pernah memimpin dan berkontribusi terhadap perkembangan Desa Keji."
    icon={Users}
  />

  {daftarMantanKades.length >
  0 ? (
    <div className="mt-8 space-y-6">
      {daftarMantanKades.map(
        (
          item,
          index
        ) => (
          <MantanKadesCard
            key={
              item.id
            }
            data={
              item
            }
            nomor={
              index +
              1
            }
          />
        )
      )}
    </div>
  ) : (
    <EmptyState
      icon={
        Landmark
      }
      title="Biografi kepala desa belum tersedia"
      description="Biografi akan tampil setelah dipublikasikan melalui halaman administrator."
    />
  )}
</section>

        {/* Struktur Organisasi */}
        <section
          id="struktur-organisasi"
          className="scroll-mt-28"
        >
          <SectionTitle
            label="Pemerintahan Desa"
            title="Struktur Organisasi"
            description="Susunan organisasi dan perangkat Pemerintah Desa Keji."
            icon={Landmark}
            driveUrl={
              pengaturan.struktur_drive_url
            }
            driveLabel="Buka Folder Struktur"
          />

          {strukturOrganisasi.length >
          0 ? (
            <div className="mt-8 grid gap-6">
              {strukturOrganisasi.map(
                (item) => (
                  <MediaCard
                    key={item.id}
                    data={item}
                    contain
                    wide
                  />
                )
              )}
            </div>
          ) : (
            <EmptyState
              icon={Landmark}
              title="Gambar struktur organisasi belum tersedia"
              description="Gambar akan tampil setelah diunggah melalui halaman administrator."
            />
          )}
        </section>

        {/* Penghargaan */}
        <section
  id="penghargaan"
  className="scroll-mt-28"
>
  <SectionTitle
    label="Arsip Prestasi"
    title="Penghargaan Desa Keji"
    description="Catatan penghargaan, apresiasi, dan pencapaian yang pernah diraih Desa Keji."
    icon={
      BadgeCheck
    }
  />

  {daftarPenghargaan.length >
  0 ? (
    <div className="mt-8 space-y-6">
      {daftarPenghargaan.map(
        (
          item,
          index
        ) => (
          <PenghargaanCard
            key={
              item.id
            }
            data={
              item
            }
            nomor={
              index +
              1
            }
          />
        )
      )}
    </div>
  ) : (
    <EmptyState
      icon={
        BadgeCheck
      }
      title="Penghargaan desa belum tersedia"
      description="Catatan penghargaan akan tampil setelah dipublikasikan melalui halaman administrator."
    />
  )}
</section>

        {/* Galeri */}
        <section
          id="galeri-desa"
          className="scroll-mt-28"
        >
          <SectionTitle
            label="Dokumentasi Desa"
            title="Galeri Desa Keji"
            description="Dokumentasi kegiatan, sejarah, budaya, pemerintahan, dan perkembangan Desa Keji."
            icon={Images}
            driveUrl={
              pengaturan.galeri_drive_url
            }
            driveLabel="Buka Folder Galeri"
          />

          {galeriDesa.length >
          0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {galeriDesa.map(
                (item) => (
                  <MediaCard
                    key={item.id}
                    data={item}
                  />
                )
              )}
            </div>
          ) : (
            <EmptyState
              icon={ImageIcon}
              title="Galeri desa belum tersedia"
              description="Gambar galeri akan tampil setelah diunggah melalui halaman administrator."
            />
          )}
        </section>
      </main>
    </div>
  );
}

function MantanKadesCard({
  data,
  nomor,
}: {
  data: MantanKadesPublik;
  nomor: number;
}) {
  return (
    <article className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm transition duration-300 hover:border-emerald-300 hover:shadow-lg">
      <div className="grid md:grid-cols-[260px_minmax(0,1fr)]">
        <div className="relative min-h-72 overflow-hidden bg-gradient-to-br from-emerald-950 to-emerald-700">
          {data.foto_url ? (
            <img
              src={data.foto_url}
              alt={`Foto ${data.nama}`}
              loading="lazy"
              className="h-full min-h-72 w-full object-cover"
            />
          ) : (
            <div className="flex h-full min-h-72 flex-col items-center justify-center p-6 text-center text-white">
              <Landmark
                size={52}
              />

              <p className="mt-4 text-xs font-extrabold uppercase tracking-wider text-emerald-200">
                Kepala Desa Keji
              </p>
            </div>
          )}

          <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1.5 text-xs font-black text-white backdrop-blur">
            {String(nomor).padStart(
              2,
              '0'
            )}
          </span>
        </div>

        <div className="p-6 sm:p-8 lg:p-9">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-700">
            Masa Jabatan
          </p>

          <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-extrabold text-emerald-700">
            <CalendarDays
              size={14}
            />

            {data.periode_mulai}
            {' – '}
            {data.periode_selesai ??
              'Sekarang'}
          </p>

          <h2 className="mt-5 text-2xl font-black leading-tight text-slate-900 sm:text-3xl">
            {data.nama}
          </h2>

          <p className="mt-5 whitespace-pre-line text-sm font-medium leading-8 text-slate-600 sm:text-[15px]">
            {data.biografi}
          </p>
        </div>
      </div>
    </article>
  );
}

function PenghargaanCard({
  data,
  nomor,
}: {
  data:
    PenghargaanPublik;

  nomor:
    number;
}) {
  return (
    <article className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm transition duration-300 hover:border-emerald-300 hover:shadow-lg">
      <div className="grid md:grid-cols-[260px_minmax(0,1fr)]">
        {/* FOTO */}

        <div className="relative min-h-72 overflow-hidden bg-gradient-to-br from-emerald-950 to-emerald-700">
          {data.foto_url ? (
            <img
              src={
                data.foto_url
              }
              alt={`Dokumentasi ${data.nama_penghargaan}`}
              loading="lazy"
              className="h-full min-h-72 w-full object-cover"
            />
          ) : (
            <div className="flex h-full min-h-72 flex-col items-center justify-center p-6 text-center text-white">
              <BadgeCheck
                size={52}
              />

              <p className="mt-4 text-xs font-extrabold uppercase tracking-wider text-emerald-200">
                Penghargaan
                Desa Keji
              </p>
            </div>
          )}

          <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1.5 text-xs font-black text-white backdrop-blur">
            {String(
              nomor
            ).padStart(
              2,
              '0'
            )}
          </span>
        </div>

        {/* CONTENT */}

        <div className="p-6 sm:p-8 lg:p-9">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-extrabold text-emerald-700">
              {
                data.tahun
              }
            </span>

            <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-extrabold text-emerald-700">
              Tingkat{' '}
              {
                data.tingkat
              }
            </span>
          </div>

          <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-700">
            Arsip Prestasi
          </p>

          <h2 className="mt-2 text-2xl font-black leading-tight text-slate-900 sm:text-3xl">
            {
              data.nama_penghargaan
            }
          </h2>

          <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50/60 px-4 py-3">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.13em] text-emerald-600">
              Penyelenggara
            </p>

            <p className="mt-1 text-sm font-black text-emerald-900">
              {
                data.penyelenggara
              }
            </p>
          </div>

          <p className="mt-5 whitespace-pre-line text-sm font-medium leading-8 text-slate-600 sm:text-[15px]">
            {
              data.deskripsi
            }
          </p>
        </div>
      </div>
    </article>
  );
}

function MediaCard({
  data,
  contain = false,
  wide = false,
}: {
  data: MediaTilikPublik;
  contain?: boolean;
  wide?: boolean;
}) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg">
      <div
        className={`overflow-hidden bg-emerald-950 ${
          wide
            ? 'min-h-[320px]'
            : 'aspect-[4/3]'
        }`}
      >
        {data.gambar_url ? (
          <img
            src={data.gambar_url}
            alt={data.judul}
            loading="lazy"
            className={`h-full w-full transition duration-500 group-hover:scale-[1.02] ${
              contain
                ? 'bg-white object-contain p-4 sm:p-8'
                : 'object-cover'
            } ${
              wide
                ? 'max-h-[760px] min-h-[320px]'
                : ''
            }`}
          />
        ) : (
          <div className="flex h-full min-h-72 items-center justify-center text-emerald-200">
            <ImageIcon size={48} />
          </div>
        )}
      </div>

      <div className="p-5 sm:p-6">
        <h3 className="text-lg font-black text-slate-900">
          {data.judul}
        </h3>

        {data.deskripsi && (
          <p className="mt-2 text-sm font-medium leading-7 text-slate-500">
            {data.deskripsi}
          </p>
        )}
      </div>
    </article>
  );
}

function SectionTitle({
  label,
  title,
  description,
  icon: Icon,
}: {
  label:
    string;

  title:
    string;

  description:
    string;

  icon:
    LucideIcon;
}) {
  return (
    <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm sm:p-7">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-md shadow-emerald-900/10">
          <Icon
            size={23}
          />
        </div>

        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-700">
            {label}
          </p>

          <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
            {title}
          </h2>

          <p className="mt-3 max-w-4xl text-sm font-medium leading-7 text-slate-500">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="mt-8 rounded-3xl border border-dashed border-emerald-200 bg-white px-6 py-16 text-center shadow-sm">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-300">
        <Icon size={34} />
      </div>

      <h3 className="mt-5 text-lg font-black text-slate-800">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-xl text-sm font-medium leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}

function HeroStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <article className="min-w-0 rounded-2xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur sm:min-w-28 sm:px-5">
      <p className="text-2xl font-black text-white">
        {value}
      </p>

      <p className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.13em] text-emerald-200">
        {label}
      </p>
    </article>
  );
}