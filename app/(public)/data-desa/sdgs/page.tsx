// app/(public)/data-desa/sdgs/page.tsx

import {
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  ExternalLink,
  Gauge,
  Info,
  Target,
} from 'lucide-react';

import SidebarLayanan from '@/components/SidebarLayanan';

import {
  supabaseAdmin,
} from '@/lib/supabase-admin';

import type {
  PilihanLayanan,
} from '@/types/layanan';

import type {
  SdgsDesa,
} from '@/types/sdgs';

export const dynamic =
  'force-dynamic';

export const revalidate = 0;

interface LayananRow {
  id: number;
  nama: string;
  slug: string;
}

function normalizeSdgs(
  data: unknown
): SdgsDesa[] {
  if (!Array.isArray(data)) {
    return [];
  }

  return data.map(
    (item) => {
      const row =
        item as Record<
          string,
          unknown
        >;

      return {
        id:
          Number(row.id),

        nama:
          String(
            row.nama ?? ''
          ),

        skor:
          Number(
            row.skor ?? 0
          ),

        warna:
          String(
            row.warna ??
              '#047857'
          ),

        tahun_data:
          Number(
            row.tahun_data ??
              new Date()
                .getFullYear()
          ),

        aktif:
          Boolean(
            row.aktif
          ),

        updated_at:
          String(
            row.updated_at ??
              ''
          ),
      };
    }
  );
}

function formatSkor(
  value: number
) {
  return new Intl.NumberFormat(
    'id-ID',
    {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }
  ).format(value);
}

function formatTanggal(
  value: string
) {
  if (!value) {
    return 'Belum diperbarui';
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return 'Belum diperbarui';
  }

  return new Intl.DateTimeFormat(
    'id-ID',
    {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      timeZone:
        'Asia/Jakarta',
    }
  ).format(date);
}

function getKategoriSkor(
  skor: number
) {
  if (skor >= 80) {
    return 'Sangat Baik';
  }

  if (skor >= 60) {
    return 'Baik';
  }

  if (skor >= 40) {
    return 'Cukup';
  }

  if (skor > 0) {
    return 'Perlu Ditingkatkan';
  }

  return 'Belum Diisi';
}

export default async function SdgsDesaPage() {
  const [
    sdgsResult,
    layananResult,
  ] = await Promise.all([
    supabaseAdmin
      .from('sdgs_desa')
      .select(`
        id,
        nama,
        skor,
        warna,
        tahun_data,
        aktif,
        updated_at
      `)
      .eq('aktif', true)
      .order('id', {
        ascending: true,
      }),

    supabaseAdmin
      .from('layanan')
      .select(`
        id,
        nama,
        slug
      `)
      .eq('aktif', true)
      .order('urutan', {
        ascending: true,
      }),
  ]);

  if (sdgsResult.error) {
    console.error(
      'Gagal mengambil data SDGs:',
      {
        message:
          sdgsResult.error.message,
        code:
          sdgsResult.error.code,
        details:
          sdgsResult.error.details,
        hint:
          sdgsResult.error.hint,
      }
    );
  }

  if (
    layananResult.error
  ) {
    console.error(
      'Gagal mengambil daftar layanan:',
      {
        message:
          layananResult.error.message,
        code:
          layananResult.error.code,
        details:
          layananResult.error.details,
        hint:
          layananResult.error.hint,
      }
    );
  }

  const daftarSdgs =
    normalizeSdgs(
      sdgsResult.data
    );

  const daftarLayanan:
    PilihanLayanan[] = (
      (layananResult.data ??
        []) as LayananRow[]
    )
      .map((layanan) => ({
        id:
          Number(
            layanan.id
          ),

        nama:
          String(
            layanan.nama ??
              ''
          ).trim(),

        slug:
          String(
            layanan.slug ??
              ''
          ).trim(),
      }))
      .filter(
        (layanan) =>
          Number.isFinite(
            layanan.id
          ) &&
          layanan.id > 0 &&
          layanan.nama.length >
            0 &&
          layanan.slug.length >
            0
      );

  const jumlahGoal =
    daftarSdgs.length;

  const rataRata =
    jumlahGoal > 0
      ? daftarSdgs.reduce(
          (
            total,
            item
          ) =>
            total +
            item.skor,
          0
        ) /
        jumlahGoal
      : 0;

  const goalTertinggi =
    daftarSdgs.reduce<
      SdgsDesa | null
    >(
      (
        tertinggi,
        item
      ) => {
        if (
          !tertinggi ||
          item.skor >
            tertinggi.skor
        ) {
          return item;
        }

        return tertinggi;
      },
      null
    );

  const tahunData =
    daftarSdgs[0]
      ?.tahun_data ??
    new Date().getFullYear();

  const terakhirDiperbarui =
    daftarSdgs
      .map(
        (item) =>
          item.updated_at
      )
      .filter(Boolean)
      .sort()
      .at(-1) ?? '';

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-700">
            <Target size={16} />
            Pembangunan Desa
          </div>

          <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
            SDGs Desa Keji
          </h1>

          <p className="mt-3 max-w-4xl text-sm font-medium leading-relaxed text-slate-500 md:text-base">
            SDGs Desa merupakan upaya
            terpadu untuk pembangunan
            ekonomi, sosial,
            lingkungan, hukum, dan
            tata kelola masyarakat
            pada tingkat desa.
          </p>
        </header>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* Konten Utama */}
          <main className="min-w-0 space-y-6 lg:w-2/3">
            {/* Hero */}
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-700 p-6 text-white shadow-xl shadow-emerald-950/10 md:p-8">
              <div
                className="pointer-events-none absolute inset-0 opacity-25"
                style={{
                  backgroundImage: `
                    radial-gradient(
                      circle,
                      rgba(
                        255,
                        255,
                        255,
                        0.2
                      ) 1.5px,
                      transparent 1.5px
                    )
                  `,
                  backgroundSize:
                    '25px 25px',
                }}
              />

              <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full border-[42px] border-white/[0.06]" />

              <div className="relative">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div className="max-w-xl">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
                      <Gauge size={28} />
                    </div>

                    <h2 className="text-2xl font-black md:text-3xl">
                      Skor SDGs Desa
                    </h2>

                    <p className="mt-3 text-sm font-medium leading-relaxed text-emerald-50/85">
                      Skor menggunakan
                      skala 0 sampai
                      100. Semakin besar
                      skor menunjukkan
                      semakin tinggi
                      pencapaian tujuan
                      pembangunan desa.
                    </p>
                  </div>

                  <div className="flex h-40 w-40 shrink-0 flex-col items-center justify-center rounded-full border-[12px] border-white/20 bg-white/10 shadow-xl backdrop-blur">
                    <p className="text-4xl font-black">
                      {formatSkor(
                        rataRata
                      )}
                    </p>

                    <p className="mt-1 text-xs font-extrabold uppercase tracking-widest text-emerald-100">
                      Rata-rata
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Statistik */}
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatistikCard
                label="Jumlah Goal"
                value={String(
                  jumlahGoal
                )}
                description="Tujuan pembangunan"
                icon={Target}
              />

              <StatistikCard
                label="Skor Rata-rata"
                value={formatSkor(
                  rataRata
                )}
                description={getKategoriSkor(
                  rataRata
                )}
                icon={Gauge}
              />

              <StatistikCard
                label="Tahun Data"
                value={String(
                  tahunData
                )}
                description="Periode penilaian"
                icon={CalendarDays}
              />

              <StatistikCard
                label="Skor Tertinggi"
                value={
                  goalTertinggi
                    ? formatSkor(
                        goalTertinggi.skor
                      )
                    : '0'
                }
                description={
                  goalTertinggi
                    ?.nama ??
                  'Belum tersedia'
                }
                icon={BarChart3}
                smallDescription
              />
            </section>

            {/* Informasi */}
            <section className="rounded-2xl border border-cyan-200 bg-cyan-50 p-5">
              <div className="flex items-start gap-3">
                <Info
                  size={21}
                  className="mt-0.5 shrink-0 text-cyan-700"
                />

                <div>
                  <h2 className="font-extrabold text-cyan-900">
                    Tentang SDGs Desa
                  </h2>

                  <p className="mt-1 text-sm font-medium leading-relaxed text-cyan-800">
                    Goals SDGs Desa
                    diturunkan dari
                    SDGs nasional
                    menjadi 18 bidang
                    fokus pembangunan.
                    Data terakhir
                    diperbarui pada{' '}
                    {formatTanggal(
                      terakhirDiperbarui
                    )}
                    .
                  </p>

                  <a
                    href="https://sid.kemendesa.go.id/sdgs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-xs font-extrabold text-cyan-800 underline decoration-cyan-400 underline-offset-4"
                  >
                    Lihat SDGs Kemendesa

                    <ExternalLink
                      size={14}
                    />
                  </a>
                </div>
              </div>
            </section>

            {/* Daftar Goal */}
            <section>
              <div className="mb-5">
                <h2 className="text-2xl font-black text-slate-900">
                  Skor 18 Goals SDGs Desa
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Pencapaian setiap
                  tujuan pembangunan
                  Desa Keji.
                </p>
              </div>

              {daftarSdgs.length ===
              0 ? (
                <div className="rounded-3xl border border-amber-200 bg-amber-50 p-10 text-center">
                  <Target
                    size={42}
                    className="mx-auto text-amber-400"
                  />

                  <h3 className="mt-4 font-black text-amber-900">
                    Data belum tersedia
                  </h3>

                  <p className="mt-2 text-sm text-amber-700">
                    Pemerintah Desa
                    belum memasukkan
                    skor SDGs Desa.
                  </p>
                </div>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {daftarSdgs.map(
                    (item) => (
                      <article
                        key={item.id}
                        className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                      >
                        <div
                          className="relative flex min-h-[190px] flex-col justify-between overflow-hidden p-5 text-white"
                          style={{
                            background: `
                              linear-gradient(
                                135deg,
                                ${item.warna},
                                ${item.warna}CC
                              )
                            `,
                          }}
                        >
                          <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full border-[28px] border-white/10 transition group-hover:scale-110" />

                          <div className="relative">
                            <p className="text-5xl font-black leading-none text-white/30">
                              {String(
                                item.id
                              ).padStart(
                                2,
                                '0'
                              )}
                            </p>

                            <h3 className="mt-4 text-lg font-black leading-snug text-white drop-shadow-sm">
                              {item.nama}
                            </h3>
                          </div>

                          <div className="relative mt-6 flex items-center justify-between">
                            <span className="text-xs font-extrabold uppercase tracking-widest text-white/75">
                              Goal{' '}
                              {item.id}
                            </span>

                            <ArrowUpRight
                              size={18}
                              className="text-white/60 transition group-hover:text-white"
                            />
                          </div>
                        </div>

                        <div className="p-5">
                          <div className="flex items-end justify-between gap-4">
                            <div>
                              <p className="text-3xl font-black text-slate-900">
                                {formatSkor(
                                  item.skor
                                )}
                              </p>

                              <p className="mt-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                                Nilai
                              </p>
                            </div>

                            <span className="rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-extrabold text-slate-600">
                              {getKategoriSkor(
                                item.skor
                              )}
                            </span>
                          </div>

                          <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="h-full rounded-full transition-all duration-700"
                              style={{
                                width:
                                  `${Math.min(
                                    Math.max(
                                      item.skor,
                                      0
                                    ),
                                    100
                                  )}%`,

                                backgroundColor:
                                  item.warna,
                              }}
                            />
                          </div>

                          <div className="mt-2 flex justify-between text-[10px] font-bold text-slate-400">
                            <span>0</span>
                            <span>100</span>
                          </div>
                        </div>
                      </article>
                    )
                  )}
                </div>
              )}
            </section>
          </main>

          {/* Sidebar */}
          <aside className="min-w-0 lg:w-1/3">
            <SidebarLayanan
              daftarLayanan={
                daftarLayanan
              }
            />
          </aside>
        </div>
      </div>
    </div>
  );
}

function StatistikCard({
  label,
  value,
  description,
  icon: Icon,
  smallDescription = false,
}: {
  label: string;
  value: string;
  description: string;
  icon: typeof Target;
  smallDescription?: boolean;
}) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
      <div className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-emerald-50" />

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
            {label}
          </p>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <Icon size={20} />
          </div>
        </div>

        <p className="mt-3 text-3xl font-black text-slate-900">
          {value}
        </p>

        <p
          className={`mt-1 font-bold text-emerald-700 ${
            smallDescription
              ? 'line-clamp-2 text-[10px] leading-relaxed'
              : 'text-xs'
          }`}
        >
          {description}
        </p>
      </div>
    </article>
  );
}