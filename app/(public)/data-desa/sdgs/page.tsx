// app/(public)/data-desa/sdgs/page.tsx

import {
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  ExternalLink,
  Gauge,
  Info,
  ShieldCheck,
  Target,
  type LucideIcon,
} from 'lucide-react';

import SidebarLayanan from '@/components/SidebarLayanan';
import SidebarTilikArkeji from '@/components/SidebarTilikArkeji';

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
  id:
    | number
    | string
    | null;

  nama:
    | string
    | null;

  slug:
    | string
    | null;
}

function safeString(
  value: unknown
) {
  return String(
    value ?? ''
  ).trim();
}

function safeNumber(
  value: unknown,
  fallback = 0
) {
  const number =
    Number(value);

  return Number.isFinite(
    number
  )
    ? number
    : fallback;
}

function normalizeHexColor(
  value: unknown
) {
  const color =
    safeString(value);

  if (
    /^#[0-9a-f]{6}$/i.test(
      color
    )
  ) {
    return color;
  }

  return '#047857';
}

function normalizeSdgs(
  data: unknown
): SdgsDesa[] {
  if (!Array.isArray(data)) {
    return [];
  }

  return data
    .map((item) => {
      if (
        !item ||
        typeof item !==
          'object' ||
        Array.isArray(item)
      ) {
        return null;
      }

      const row =
        item as Record<
          string,
          unknown
        >;

      const id =
        safeNumber(row.id);

      const nama =
        safeString(row.nama);

      const skorRaw =
        safeNumber(
          row.skor
        );

      const tahunData =
        safeNumber(
          row.tahun_data,
          new Date()
            .getFullYear()
        );

      if (
        !Number.isInteger(id) ||
        id <= 0 ||
        !nama
      ) {
        return null;
      }

      return {
        id,

        nama,

        skor:
          Math.min(
            Math.max(
              skorRaw,
              0
            ),
            100
          ),

        warna:
          normalizeHexColor(
            row.warna
          ),

        tahun_data:
          Number.isInteger(
            tahunData
          ) &&
          tahunData >= 1900 &&
          tahunData <= 2200
            ? tahunData
            : new Date()
                .getFullYear(),

        aktif:
          Boolean(
            row.aktif
          ),

        updated_at:
          safeString(
            row.updated_at
          ),
      } satisfies SdgsDesa;
    })
    .filter(
      (
        item
      ): item is SdgsDesa =>
        item !== null
    );
}

function formatSkor(
  value: number
) {
  return new Intl.NumberFormat(
    'id-ID',
    {
      minimumFractionDigits:
        0,

      maximumFractionDigits:
        2,
    }
  ).format(
    Number.isFinite(value)
      ? value
      : 0
  );
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

function getTerakhirDiperbarui(
  daftarSdgs:
    SdgsDesa[]
) {
  const timestamps =
    daftarSdgs
      .map((item) => {
        const date =
          new Date(
            item.updated_at
          );

        return Number.isNaN(
          date.getTime()
        )
          ? null
          : {
              raw:
                item.updated_at,

              time:
                date.getTime(),
            };
      })
      .filter(
        (
          item
        ): item is {
          raw: string;
          time: number;
        } => item !== null
      );

  if (
    timestamps.length === 0
  ) {
    return '';
  }

  return timestamps.reduce(
    (
      latest,
      current
    ) =>
      current.time >
      latest.time
        ? current
        : latest
  ).raw;
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
        nullsFirst: false,
      })
      .order('nama', {
        ascending: true,
      }),
  ]);

  if (sdgsResult.error) {
    console.error(
      'Gagal mengambil data SDGs:',
      {
        message:
          sdgsResult.error
            .message,

        code:
          sdgsResult.error
            .code,

        details:
          sdgsResult.error
            .details,

        hint:
          sdgsResult.error
            .hint,
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
          layananResult.error
            .message,

        code:
          layananResult.error
            .code,

        details:
          layananResult.error
            .details,

        hint:
          layananResult.error
            .hint,
      }
    );
  }

  const daftarSdgs =
    normalizeSdgs(
      sdgsResult.data
    );

  const daftarLayanan:
    PilihanLayanan[] = (
      (
        layananResult.data ??
        []
      ) as LayananRow[]
    )
      .map((layanan) => {
        const id =
          Number(
            layanan.id
          );

        const nama =
          safeString(
            layanan.nama
          );

        const slug =
          safeString(
            layanan.slug
          );

        return {
          id,
          nama,
          slug,
        };
      })
      .filter(
        (layanan) =>
          Number.isInteger(
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

  const totalSkor =
    daftarSdgs.reduce(
      (
        total,
        item
      ) =>
        total +
        item.skor,
      0
    );

  const rataRata =
    jumlahGoal > 0
      ? totalSkor /
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

  const daftarTahun =
    daftarSdgs
      .map(
        (item) =>
          item.tahun_data
      )
      .filter(
        (tahun) =>
          Number.isInteger(
            tahun
          )
      );

  const tahunData =
    daftarTahun.length > 0
      ? Math.max(
          ...daftarTahun
        )
      : new Date()
          .getFullYear();

  const terakhirDiperbarui =
    getTerakhirDiperbarui(
      daftarSdgs
    );

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Halaman */}
        <header className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-800 to-emerald-700 px-6 py-8 text-white shadow-lg sm:px-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)',

              backgroundSize:
                '25px 25px',
            }}
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border-[52px] border-white/[0.04]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-emerald-400/[0.06] blur-2xl"
          />

          <div className="relative">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
              <Target
                size={24}
              />
            </div>

            <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-200">
              Pembangunan Desa
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              SDGs Desa Keji
            </h1>

            <p className="mt-4 max-w-4xl text-sm font-medium leading-7 text-emerald-50/80 sm:text-base">
              Informasi pencapaian
              tujuan pembangunan
              ekonomi, sosial,
              lingkungan, hukum, dan
              tata kelola masyarakat
              Desa Keji tahun{' '}
              {tahunData}.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <HeaderBadge
                label={`${jumlahGoal} goal aktif`}
              />

              <HeaderBadge
                label={`Rata-rata ${formatSkor(
                  rataRata
                )}`}
              />

              <HeaderBadge
                label={getKategoriSkor(
                  rataRata
                )}
              />
            </div>
          </div>
        </header>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* Konten Utama */}
          <main className="min-w-0 space-y-7 lg:w-2/3">
            {/* Ringkasan Skor */}
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-800 to-emerald-700 p-6 text-white shadow-xl shadow-emerald-950/10 sm:p-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-25"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)',

                  backgroundSize:
                    '25px 25px',
                }}
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full border-[42px] border-white/[0.05]"
              />

              <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                <div className="max-w-xl">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
                    <Gauge
                      size={28}
                    />
                  </div>

                  <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-200">
                    Indeks Pembangunan
                  </p>

                  <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                    Skor SDGs Desa
                  </h2>

                  <p className="mt-3 text-sm font-medium leading-7 text-emerald-50/80">
                    Skor menggunakan
                    skala 0 hingga 100.
                    Nilai yang lebih
                    tinggi menunjukkan
                    pencapaian tujuan
                    pembangunan desa
                    yang semakin baik.
                  </p>
                </div>

                <div className="flex shrink-0 items-center justify-center">
                  <div className="flex h-44 w-44 flex-col items-center justify-center rounded-full border-[12px] border-white/20 bg-white/10 shadow-xl backdrop-blur">
                    <p className="text-4xl font-black">
                      {formatSkor(
                        rataRata
                      )}
                    </p>

                    <p className="mt-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-emerald-100">
                      Rata-rata
                    </p>

                    <p className="mt-1 text-xs font-bold text-white/80">
                      {getKategoriSkor(
                        rataRata
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Statistik */}
            <section className="grid gap-4 sm:grid-cols-2">
              <StatistikCard
                label="Jumlah Goal"
                value={String(
                  jumlahGoal
                )}
                description="Tujuan pembangunan aktif"
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
            <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-700 text-white">
                  <Info
                    size={21}
                  />
                </div>

                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-emerald-700">
                    Informasi SDGs
                  </p>

                  <h2 className="mt-1 font-black text-emerald-950">
                    Tentang SDGs Desa
                  </h2>

                  <p className="mt-2 text-sm font-medium leading-7 text-emerald-800">
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
                    className="mt-4 inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 py-2.5 text-xs font-extrabold text-emerald-700 transition hover:border-emerald-300 hover:bg-emerald-100"
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
              <div className="mb-6 flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-700 text-white">
                  <Target
                    size={21}
                  />
                </div>

                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-emerald-700">
                    Pencapaian Goal
                  </p>

                  <h2 className="mt-1 text-2xl font-black text-slate-900">
                    Skor 18 Goals SDGs
                    Desa
                  </h2>

                  <p className="mt-2 text-sm font-medium leading-7 text-slate-500">
                    Pencapaian setiap
                    tujuan pembangunan
                    Desa Keji berdasarkan
                    data yang telah
                    dipublikasikan.
                  </p>
                </div>
              </div>

              {daftarSdgs.length ===
              0 ? (
                <div className="rounded-3xl border border-dashed border-emerald-200 bg-white px-6 py-16 text-center shadow-sm">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-300">
                    <Target
                      size={34}
                    />
                  </div>

                  <h3 className="mt-5 font-black text-slate-800">
                    Data belum tersedia
                  </h3>

                  <p className="mx-auto mt-2 max-w-md text-sm font-medium leading-6 text-slate-500">
                    Data skor SDGs Desa
                    akan muncul setelah
                    dimasukkan dan
                    dipublikasikan melalui
                    halaman administrator.
                  </p>
                </div>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2">
                  {daftarSdgs.map(
                    (item) => (
                      <GoalCard
                        key={item.id}
                        item={item}
                      />
                    )
                  )}
                </div>
              )}
            </section>

            {/* Sumber Data */}
            <section className="rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <ShieldCheck
                    size={21}
                  />
                </div>

                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-emerald-700">
                    Sumber Data
                  </p>

                  <h2 className="mt-1 font-black text-slate-900">
                    Data Pembangunan
                    Desa Keji
                  </h2>

                  <p className="mt-2 text-sm font-medium leading-7 text-slate-500">
                    Nilai pada halaman
                    ini bersumber dari
                    data SDGs Desa Keji
                    yang dikelola oleh
                    administrator
                    website. Perubahan
                    data akan langsung
                    memengaruhi nilai
                    rata-rata dan
                    informasi setiap
                    goal.
                  </p>
                </div>
              </div>
            </section>
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

function GoalCard({
  item,
}: {
  item: SdgsDesa;
}) {
  const progress =
    Math.min(
      Math.max(
        item.skor,
        0
      ),
      100
    );

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl">
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
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full border-[28px] border-white/10 transition duration-500 group-hover:scale-110"
        />

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
            Goal {item.id}
          </span>

          <ArrowUpRight
            size={18}
            className="text-white/60 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
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

          <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-extrabold text-emerald-700">
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
                `${progress}%`,

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
  );
}

function HeaderBadge({
  label,
}: {
  label: string;
}) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-bold text-emerald-50 backdrop-blur">
      {label}
    </span>
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
  icon: LucideIcon;
  smallDescription?: boolean;
}) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-emerald-50"
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
            {label}
          </p>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 transition group-hover:bg-emerald-700 group-hover:text-white">
            <Icon size={20} />
          </div>
        </div>

        <p className="mt-3 text-3xl font-black text-slate-900">
          {value}
        </p>

        <p
          className={`mt-2 font-semibold text-slate-500 ${
            smallDescription
              ? 'line-clamp-2 text-[10px] leading-5'
              : 'text-xs'
          }`}
        >
          {description}
        </p>
      </div>
    </article>
  );
}