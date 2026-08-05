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
  Image as ImageIcon,
  Landmark,
  Users,
} from 'lucide-react';

import SidebarLayanan from '@/components/SidebarLayanan';
import SidebarTilikArkeji from '@/components/SidebarTilikArkeji';

import { supabaseAdmin } from '@/lib/supabase-admin';

import type {
  PilihanLayanan,
} from '@/types/layanan';

export const metadata: Metadata = {
  title:
    'Tilik Arkeji – Arsip Desa Keji | SIJI',

  description:
    'Arsip sejarah kepemimpinan, biografi mantan kepala desa, dan catatan penghargaan Desa Keji.',
};

export const dynamic =
  'force-dynamic';

export const revalidate = 0;

interface LayananRow {
  id: number;
  nama: string;
  slug: string;
}

interface MantanKadesPublik {
  id: string;
  nama: string;
  periode_mulai: number;
  periode_selesai: number | null;
  biografi: string;
  foto_url: string | null;
  urutan: number;
}

interface PenghargaanPublik {
  id: string;
  nama_penghargaan: string;
  tahun: number;
  tingkat: string;
  penyelenggara: string;
  deskripsi: string;
  foto_url: string | null;
  urutan: number;
}

function safeString(
  value: unknown
) {
  return String(
    value ?? ''
  ).trim();
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

  const biografi =
    safeString(
      row.biografi
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

  const fotoUrl =
    safeString(
      row.foto_url
    );

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
      fotoUrl || null,

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
    !Number.isInteger(urutan)
  ) {
    return null;
  }

  const fotoUrl =
    safeString(
      row.foto_url
    );

  return {
    id,

    nama_penghargaan:
      namaPenghargaan,

    tahun,
    tingkat,
    penyelenggara,
    deskripsi,

    foto_url:
      fotoUrl || null,

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
      });

  if (error) {
    console.error(
      'Gagal mengambil layanan pada Tilik Arkeji:',
      error
    );

    return [];
  }

  return (
    (data ?? []) as LayananRow[]
  ).map((item) => ({
    id: Number(item.id),
    nama: String(item.nama),
    slug: String(item.slug),
  }));
}

export default async function TilikArkejiPage() {
  const [
    layanan,
    mantanKadesResult,
    penghargaanResult,
  ] = await Promise.all([
    getDaftarLayanan(),

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
      .order('periode_mulai', {
        ascending: false,
      }),

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
  ]);

  if (mantanKadesResult.error) {
    console.error(
      'Gagal mengambil biografi mantan kades:',
      mantanKadesResult.error
    );
  }

  if (penghargaanResult.error) {
    console.error(
      'Gagal mengambil penghargaan:',
      penghargaanResult.error
    );
  }

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

        <div className="absolute inset-0 bg-gradient-to-r from-[#021b16] via-emerald-950/92 to-emerald-900/45" />

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

        <div className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full border-[72px] border-white/[0.035]" />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <Link
            href="/profil/sejarah"
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-100/80 transition hover:text-white"
          >
            <ArrowLeft size={15} />

            Kembali ke Sejarah Desa
          </Link>

          <div className="mt-7 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.17em] text-emerald-100 backdrop-blur sm:text-xs">
                <Archive size={15} />

                Arsip Desa Keji
              </div>

              <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-300">
                Tilik Arkeji
              </p>

              <h1 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Menilik Sejarah dan
                Pencapaian Desa Keji
              </h1>

              <p className="mt-5 max-w-3xl text-sm font-medium leading-7 text-emerald-50/85 sm:text-base">
                Arsip digital mengenai
                tokoh yang pernah
                memimpin Desa Keji serta
                catatan penghargaan dan
                pencapaian desa dari
                masa ke masa.
              </p>
            </div>

            <div className="grid shrink-0 grid-cols-2 gap-3">
              <HeroStat
                value={String(
                  daftarMantanKades.length
                )}
                label="Mantan Kades"
              />

              <HeroStat
                value={String(
                  daftarPenghargaan.length
                )}
                label="Penghargaan"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Konten utama */}
          <main className="min-w-0 flex-1 space-y-10">
            {/* Mantan kades */}
            <section
              id="mantan-kades"
              className="scroll-mt-28"
            >
              <SectionTitle
                label="Arsip Kepemimpinan"
                title="Biografi Mantan Kepala Desa"
                description="Mengenal tokoh-tokoh yang pernah memimpin dan berkontribusi terhadap perkembangan Desa Keji."
                icon={Users}
              />

              {daftarMantanKades.length >
              0 ? (
                <div className="mt-6 space-y-5">
                  {daftarMantanKades.map(
                    (
                      mantanKades,
                      index
                    ) => (
                      <MantanKadesCard
                        key={
                          mantanKades.id
                        }
                        data={
                          mantanKades
                        }
                        nomor={
                          index + 1
                        }
                      />
                    )
                  )}
                </div>
              ) : (
                <EmptyState
                  icon={Landmark}
                  title="Arsip mantan kepala desa belum tersedia"
                  description="Biografi akan ditampilkan setelah data dipublikasikan melalui halaman administrator."
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
                description="Catatan penghargaan, apresiasi, dan pencapaian yang pernah diraih oleh Desa Keji."
                icon={BadgeCheck}
              />

              {daftarPenghargaan.length >
              0 ? (
                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  {daftarPenghargaan.map(
                    (
                      penghargaan,
                      index
                    ) => (
                      <PenghargaanCard
                        key={
                          penghargaan.id
                        }
                        data={
                          penghargaan
                        }
                        nomor={
                          index + 1
                        }
                      />
                    )
                  )}
                </div>
              ) : (
                <EmptyState
                  icon={BadgeCheck}
                  title="Arsip penghargaan belum tersedia"
                  description="Catatan penghargaan akan muncul setelah dipublikasikan oleh administrator."
                />
              )}
            </section>
          </main>

          {/* Sidebar kanan */}
          <aside className="min-w-0 lg:w-1/3">
            <div className="space-y-6 lg:sticky lg:top-24">
              <SidebarLayanan
                daftarLayanan={
                  layanan
                }
              />

              <SidebarTilikArkeji />
            </div>
          </aside>
        </div>
      </div>
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
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:border-emerald-200 hover:shadow-lg">
      <div className="grid sm:grid-cols-[220px_minmax(0,1fr)]">
        <div className="relative min-h-64 overflow-hidden bg-gradient-to-br from-emerald-950 to-emerald-700">
          {data.foto_url ? (
            <img
              src={data.foto_url}
              alt={`Foto ${data.nama}`}
              loading="lazy"
              className="h-full min-h-64 w-full object-cover"
            />
          ) : (
            <div className="flex h-full min-h-64 flex-col items-center justify-center p-6 text-center text-white">
              <Landmark size={48} />

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

        <div className="p-6 sm:p-7">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-700">
            Masa Jabatan
          </p>

          <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-extrabold text-emerald-700">
            <CalendarDays size={14} />

            {data.periode_mulai}
            {' – '}
            {data.periode_selesai ??
              'Selesai'}
          </p>

          <h2 className="mt-5 text-2xl font-black leading-tight text-slate-900">
            {data.nama}
          </h2>

          <p className="mt-4 whitespace-pre-line text-sm font-medium leading-8 text-slate-600">
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
  data: PenghargaanPublik;
  nomor: number;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-amber-200 hover:shadow-lg">
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-amber-100 to-emerald-100">
        {data.foto_url ? (
          <img
            src={data.foto_url}
            alt={`Dokumentasi ${data.nama_penghargaan}`}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-amber-700">
            <BadgeCheck size={48} />

            <p className="mt-3 text-xs font-extrabold uppercase tracking-wider">
              Penghargaan Desa
            </p>
          </div>
        )}

        <span className="absolute left-4 top-4 rounded-full bg-emerald-700 px-3 py-1.5 text-xs font-black text-white">
          {data.tahun}
        </span>

        <span className="absolute right-4 top-4 rounded-full bg-black/60 px-3 py-1.5 text-xs font-black text-white backdrop-blur">
          {String(nomor).padStart(
            2,
            '0'
          )}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="w-fit rounded-full bg-amber-100 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-amber-700">
          Tingkat {data.tingkat}
        </span>

        <h3 className="mt-4 text-lg font-black leading-7 text-slate-900">
          {data.nama_penghargaan}
        </h3>

        <p className="mt-2 text-xs font-extrabold text-emerald-700">
          Penyelenggara:{' '}
          {data.penyelenggara}
        </p>

        <p className="mt-4 flex-1 text-sm font-medium leading-7 text-slate-500">
          {data.deskripsi}
        </p>
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
  label: string;
  title: string;
  description: string;
  icon: typeof Archive;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-700 text-white">
        <Icon size={23} />
      </div>

      <div>
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-700">
          {label}
        </p>

        <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
          {title}
        </h2>

        <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Archive;
  title: string;
  description: string;
}) {
  return (
    <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
      <Icon
        size={46}
        className="mx-auto text-slate-300"
      />

      <h3 className="mt-4 text-lg font-black text-slate-800">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-lg text-sm font-medium leading-6 text-slate-500">
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
    <article className="min-w-28 rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur">
      <p className="text-2xl font-black text-white">
        {value}
      </p>

      <p className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.13em] text-emerald-200">
        {label}
      </p>
    </article>
  );
}