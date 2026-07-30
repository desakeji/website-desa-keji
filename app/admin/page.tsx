// app/admin/page.tsx

import { createHmac } from 'node:crypto';

import Link from 'next/link';

import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  CircleAlert,
  Clock3,
  Database,
  Eye,
  FileText,
  LayoutGrid,
  ListChecks,
  MessageCircle,
  Newspaper,
  RefreshCw,
  ShoppingCart,
  UserRound,
  Users,
  XCircle,
  type LucideIcon,
} from 'lucide-react';

import { revalidatePath } from 'next/cache';

import { supabaseAdmin } from '@/lib/supabase-admin';

import {
  publicContentModules,
  type AdminNavigationItem,
} from '@/lib/admin-navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PermohonanRow {
  id: number;
  warga_nik: string;
  layanan_id: number;
  no_wa: string;
  status: string;
  created_at: string | null;
}

interface WargaRow {
  nik_hash: string;
  nama_lengkap: string;
}

interface LayananRow {
  id: number;
  nama: string;
}

interface PermohonanTerbaru {
  id: number;
  namaPemohon: string;
  nikLast4: string;
  namaLayanan: string;
  noWa: string;
  status: string;
  createdAt: string | null;
}

interface DashboardData {
  totalPenduduk: number;
  totalBerita: number;
  totalLayanan: number;
  totalUmkm: number;
  totalPermohonan: number;
  totalMenunggu: number;
  permohonanTerbaru: PermohonanTerbaru[];
}

interface StatistikDashboard {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  href?: string;
}

interface QueryError {
  message?: string;
  code?: string;
  details?: string;
  hint?: string;
}

function logQueryError(
  title: string,
  error: QueryError | null
) {
  if (!error) {
    return;
  }

  console.error(
    title,
    JSON.stringify(
      {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      },
      null,
      2
    )
  );
}

function normalisasiNik(value: string) {
  return value
    .replace(/\D/g, '')
    .slice(0, 16);
}

function hashNik(
  nik: string,
  secret: string
) {
  return createHmac(
    'sha256',
    secret
  )
    .update(nik)
    .digest('hex');
}

function formatTanggal(
  value: string | null
) {
  if (!value) {
    return '-';
  }

  const date = new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return '-';
  }

  return new Intl.DateTimeFormat(
    'id-ID',
    {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Jakarta',
    }
  ).format(date);
}

function getWhatsAppNumber(
  nomor: string
) {
  const digits =
    nomor.replace(/\D/g, '');

  if (
    digits.startsWith('0')
  ) {
    return `62${digits.slice(1)}`;
  }

  if (
    digits.startsWith('8')
  ) {
    return `62${digits}`;
  }

  return digits;
}

function getStatusNormalized(
  value: string
) {
  return value
    .trim()
    .toLowerCase();
}

async function getDashboardData(): Promise<DashboardData> {
  const [
    pendudukResult,
    beritaResult,
    layananResult,
    umkmResult,
    permohonanResult,
    permohonanMenungguResult,
    permohonanTerbaruResult,
  ] = await Promise.all([
    /*
     * Tabel warga memakai kolom aktif.
     */
    supabaseAdmin
      .from('warga')
      .select('id', {
        count: 'exact',
        head: true,
      })
      .eq('aktif', true),

    supabaseAdmin
      .from('berita')
      .select('id', {
        count: 'exact',
        head: true,
      }),

    supabaseAdmin
      .from('layanan')
      .select('id', {
        count: 'exact',
        head: true,
      })
      .eq('aktif', true),

    supabaseAdmin
      .from('produk_umkm')
      .select('id', {
        count: 'exact',
        head: true,
      }),

    supabaseAdmin
      .from('permohonan')
      .select('id', {
        count: 'exact',
        head: true,
      }),

    supabaseAdmin
      .from('permohonan')
      .select('id', {
        count: 'exact',
        head: true,
      })
      .eq('status', 'Menunggu'),

    supabaseAdmin
      .from('permohonan')
      .select(`
        id,
        warga_nik,
        layanan_id,
        no_wa,
        status,
        created_at
      `)
      .order('created_at', {
        ascending: false,
      })
      .limit(6),
  ]);

  logQueryError(
    'Gagal mengambil jumlah warga aktif:',
    pendudukResult.error
  );

  logQueryError(
    'Gagal mengambil jumlah berita:',
    beritaResult.error
  );

  logQueryError(
    'Gagal mengambil jumlah layanan:',
    layananResult.error
  );

  logQueryError(
    'Gagal mengambil jumlah produk UMKM:',
    umkmResult.error
  );

  logQueryError(
    'Gagal mengambil jumlah permohonan:',
    permohonanResult.error
  );

  logQueryError(
    'Gagal mengambil jumlah permohonan menunggu:',
    permohonanMenungguResult.error
  );

  logQueryError(
    'Gagal mengambil permohonan terbaru:',
    permohonanTerbaruResult.error
  );

  const permohonanRows =
    (
      permohonanTerbaruResult.data ??
      []
    ) as PermohonanRow[];

  /*
   * Ambil semua NIK mentah yang disimpan
   * pada tabel permohonan.
   */
  const daftarNik = [
    ...new Set(
      permohonanRows
        .map((item) =>
          normalisasiNik(
            String(
              item.warga_nik ??
                ''
            )
          )
        )
        .filter((nik) =>
          /^\d{16}$/.test(nik)
        )
    ),
  ];

  /*
   * Buat pasangan:
   *
   * NIK mentah → nik_hash
   *
   * Hash dibuat menggunakan secret yang
   * sama dengan proses penyimpanan warga.
   */
  const nikHashMap =
    new Map<string, string>();

  const secret =
    process.env.NIK_HASH_SECRET;

  if (
    !secret ||
    secret.length < 32
  ) {
    console.error(
      'NIK_HASH_SECRET belum tersedia atau kurang dari 32 karakter. Nama warga pada permohonan tidak dapat dicocokkan.'
    );
  } else {
    daftarNik.forEach((nik) => {
      nikHashMap.set(
        nik,
        hashNik(
          nik,
          secret
        )
      );
    });
  }

  const daftarNikHash = [
    ...new Set(
      Array.from(
        nikHashMap.values()
      )
    ),
  ];

  const daftarLayananId = [
    ...new Set(
      permohonanRows
        .map((item) =>
          Number(
            item.layanan_id
          )
        )
        .filter(
          (id) =>
            Number.isInteger(id) &&
            id > 0
        )
    ),
  ];

  let wargaRows: WargaRow[] = [];
  let layananRows: LayananRow[] = [];

  /*
   * Tabel warga tidak memiliki kolom nik.
   * Pencarian dilakukan melalui nik_hash.
   */
  if (
    daftarNikHash.length > 0
  ) {
    const wargaResult =
      await supabaseAdmin
        .from('warga')
        .select(`
          nik_hash,
          nama_lengkap
        `)
        .in(
          'nik_hash',
          daftarNikHash
        );

    logQueryError(
      'Gagal mengambil nama warga pemohon:',
      wargaResult.error
    );

    wargaRows =
      (
        wargaResult.data ??
        []
      ) as WargaRow[];
  }

  if (
    daftarLayananId.length > 0
  ) {
    const layananNamaResult =
      await supabaseAdmin
        .from('layanan')
        .select(`
          id,
          nama
        `)
        .in(
          'id',
          daftarLayananId
        );

    logQueryError(
      'Gagal mengambil nama layanan:',
      layananNamaResult.error
    );

    layananRows =
      (
        layananNamaResult.data ??
        []
      ) as LayananRow[];
  }

  /*
   * Map nama warga berdasarkan nik_hash.
   */
  const wargaMap =
    new Map(
      wargaRows.map(
        (warga) => [
          String(
            warga.nik_hash
          ),
          warga.nama_lengkap,
        ]
      )
    );

  const layananMap =
    new Map(
      layananRows.map(
        (layanan) => [
          Number(
            layanan.id
          ),
          layanan.nama,
        ]
      )
    );

  const permohonanTerbaru:
    PermohonanTerbaru[] =
    permohonanRows.map(
      (item) => {
        const nik =
          normalisasiNik(
            String(
              item.warga_nik ??
                ''
            )
          );

        const nikHash =
          nikHashMap.get(nik) ??
          '';

        return {
          id:
            Number(item.id),

          namaPemohon:
            wargaMap.get(
              nikHash
            ) ??
            'Warga Desa Keji',

          nikLast4:
            nik.length >= 4
              ? nik.slice(-4)
              : '----',

          namaLayanan:
            layananMap.get(
              Number(
                item.layanan_id
              )
            ) ??
            'Layanan tidak ditemukan',

          noWa:
            String(
              item.no_wa ??
                ''
            ),

          status:
            String(
              item.status ??
                'Menunggu'
            ),

          createdAt:
            item.created_at,
        };
      }
    );

  return {
    totalPenduduk:
      pendudukResult.error
        ? 0
        : pendudukResult.count ??
          0,

    totalBerita:
      beritaResult.error
        ? 0
        : beritaResult.count ??
          0,

    totalLayanan:
      layananResult.error
        ? 0
        : layananResult.count ??
          0,

    totalUmkm:
      umkmResult.error
        ? 0
        : umkmResult.count ??
          0,

    totalPermohonan:
      permohonanResult.error
        ? 0
        : permohonanResult.count ??
          0,

    totalMenunggu:
      permohonanMenungguResult.error
        ? 0
        : permohonanMenungguResult.count ??
          0,

    permohonanTerbaru,
  };
}

async function refreshDashboard() {
  'use server';

  revalidatePath('/admin');
  revalidatePath(
    '/admin/permohonan'
  );
}

export default async function AdminDashboardPage() {
  const dashboard =
    await getDashboardData();

  const totalModul =
    publicContentModules.length;

  const totalModulAktif =
    publicContentModules.filter(
      (item) =>
        item.enabled
    ).length;

  const totalModulBelumAktif =
    totalModul -
    totalModulAktif;

  const persentaseModul =
    totalModul === 0
      ? 0
      : Math.round(
          (
            totalModulAktif /
            totalModul
          ) * 100
        );

  const statistik:
    StatistikDashboard[] = [
    {
      title:
        'Warga Terdaftar',

      value:
        dashboard.totalPenduduk.toLocaleString(
          'id-ID'
        ),

      description:
        'Warga aktif dalam database',

      href:
        '/admin/warga',

      icon:
        Users,
    },
    {
      title:
        'Permohonan Masuk',

      value:
        dashboard.totalPermohonan.toLocaleString(
          'id-ID'
        ),

      description:
        `${dashboard.totalMenunggu.toLocaleString(
          'id-ID'
        )} menunggu diproses`,

      href:
        '/admin/permohonan',

      icon:
        FileText,
    },
    {
      title:
        'Total Berita',

      value:
        dashboard.totalBerita.toLocaleString(
          'id-ID'
        ),

      description:
        'Artikel dalam sistem',

      href:
        '/admin/berita',

      icon:
        Newspaper,
    },
    {
      title:
        'Layanan Aktif',

      value:
        dashboard.totalLayanan.toLocaleString(
          'id-ID'
        ),

      description:
        'Layanan publik yang aktif',

      icon:
        ListChecks,
    },
    {
      title:
        'Produk UMKM',

      value:
        dashboard.totalUmkm.toLocaleString(
          'id-ID'
        ),

      description:
        'Produk pada Lapak UMKM',

      icon:
        ShoppingCart,
    },
    {
      title:
        'Modul Publik',

      value:
        totalModul.toLocaleString(
          'id-ID'
        ),

      description:
        `${totalModulAktif} modul admin telah aktif`,

      icon:
        LayoutGrid,
    },
  ];

  return (
    <div className="mx-auto max-w-[1500px] space-y-7">
      {/* Header dashboard */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#064e3b] via-[#065f46] to-[#047857] px-6 py-7 text-white shadow-xl shadow-emerald-950/10 sm:px-8 sm:py-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              radial-gradient(
                circle,
                rgba(255,255,255,0.13) 1.5px,
                transparent 1.5px
              )
            `,
            backgroundSize:
              '26px 26px',
          }}
        />

        <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full border-[40px] border-white/[0.04]" />

        <div className="pointer-events-none absolute -bottom-24 right-32 h-52 w-52 rounded-full bg-emerald-300/10 blur-3xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold text-emerald-50 backdrop-blur-md">
              <CalendarDays
                size={14}
              />

              Pusat administrasi dan publikasi
            </div>

            <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
              Dashboard Admin Desa Keji
            </h1>

            <p className="mt-2 max-w-3xl text-sm font-medium leading-relaxed text-emerald-50/80 sm:text-base">
              Kelola data warga,
              permohonan layanan,
              berita, galeri,
              informasi publik,
              pembangunan, dan seluruh
              konten website Desa Keji
              melalui satu dashboard.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-extrabold text-white backdrop-blur transition hover:bg-white/15"
            >
              <Eye size={17} />

              Lihat Website Publik

              <ArrowUpRight
                size={15}
              />
            </Link>

            <form
              action={
                refreshDashboard
              }
            >
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white px-4 py-3 text-sm font-extrabold text-emerald-800 shadow-lg transition hover:-translate-y-0.5 hover:bg-emerald-50"
              >
                <RefreshCw
                  size={17}
                />

                Segarkan Data
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Statistik utama */}
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {statistik.map(
          (item) => (
            <StatistikCard
              key={item.title}
              item={item}
            />
          )
        )}
      </section>

      {/* Permohonan terbaru dan progres modul */}
      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        {/* Permohonan terbaru */}
        <article className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-[0_12px_35px_rgba(6,78,59,0.07)]">
          <div className="flex flex-col gap-4 border-b border-emerald-50 bg-gradient-to-r from-emerald-50/80 via-white to-white px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-700">
                Administrasi Warga
              </p>

              <h2 className="mt-2 text-xl font-black text-slate-900 sm:text-2xl">
                Permohonan Layanan Terbaru
              </h2>

              <p className="mt-2 text-sm font-medium text-slate-500">
                Data yang dikirim dari
                formulir layanan publik
                akan otomatis muncul di
                sini.
              </p>
            </div>

            <Link
              href="/admin/permohonan"
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 text-sm font-extrabold text-white transition hover:bg-emerald-800"
            >
              Kelola Semua

              <ArrowUpRight
                size={16}
              />
            </Link>
          </div>

          {dashboard
            .permohonanTerbaru
            .length === 0 ? (
            <div className="flex min-h-[380px] flex-col items-center justify-center px-6 py-14 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                <FileText
                  size={28}
                />
              </div>

              <h3 className="mt-5 text-base font-extrabold text-slate-800">
                Belum ada permohonan
              </h3>

              <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-500">
                Permohonan yang dikirim
                warga melalui halaman
                layanan akan ditampilkan
                otomatis pada dashboard.
              </p>

              <Link
                href="/layanan"
                target="_blank"
                className="mt-5 inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-extrabold text-emerald-700 transition hover:bg-emerald-100"
              >
                <Eye size={17} />

                Buka Layanan Publik
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {dashboard
                .permohonanTerbaru
                .map(
                  (item) => (
                    <PermohonanItem
                      key={item.id}
                      item={item}
                    />
                  )
                )}
            </div>
          )}
        </article>

        {/* Progres modul */}
        <article className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-[0_12px_35px_rgba(6,78,59,0.07)] sm:p-7">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-700">
                Status Integrasi
              </p>

              <h2 className="mt-2 text-xl font-black text-slate-900">
                Progres Modul Admin
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <CheckCircle2
                size={23}
              />
            </div>
          </div>

          <p className="mt-6 text-5xl font-black tracking-tight text-slate-900">
            {persentaseModul}%
          </p>

          <p className="mt-3 text-sm font-medium leading-6 text-slate-500">
            {totalModulAktif} dari{' '}
            {totalModul} modul publik
            telah memiliki halaman
            pengelolaan admin.
          </p>

          <div className="mt-6 h-3 overflow-hidden rounded-full bg-emerald-50">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-800"
              style={{
                width: `${persentaseModul}%`,
              }}
            />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-emerald-50 p-4">
              <p className="text-2xl font-black text-emerald-700">
                {totalModulAktif}
              </p>

              <p className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-emerald-800">
                Sudah aktif
              </p>
            </div>

            <div className="rounded-2xl bg-amber-50 p-4">
              <p className="text-2xl font-black text-amber-700">
                {totalModulBelumAktif}
              </p>

              <p className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-amber-800">
                Belum dibuat
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-start gap-3">
              <CircleAlert
                size={18}
                className="mt-0.5 shrink-0 text-amber-700"
              />

              <p className="text-xs font-semibold leading-5 text-amber-900">
                Modul berlabel
                &quot;Segera&quot; pada
                sidebar belum memiliki
                halaman admin.
              </p>
            </div>
          </div>
        </article>
      </section>

      {/* Pusat pengelolaan konten */}
      <section className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-[0_12px_35px_rgba(6,78,59,0.07)]">
        <div className="flex flex-col gap-5 border-b border-emerald-50 bg-gradient-to-r from-emerald-50/80 via-white to-white px-6 py-6 sm:flex-row sm:items-end sm:justify-between sm:px-7">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-700">
              Konten Website Publik
            </p>

            <h2 className="mt-2 text-xl font-black text-slate-900 sm:text-2xl">
              Pusat Pengelolaan Konten
            </h2>

            <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-slate-500">
              Seluruh bagian pada
              website publik ditampilkan
              di sini. Modul aktif dapat
              langsung dikelola.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-emerald-100 bg-white px-5 py-4 shadow-sm">
            <Database
              size={22}
              className="text-emerald-700"
            />

            <div>
              <p className="text-xl font-black text-slate-900">
                {totalModul}
              </p>

              <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
                Modul publik
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-7 xl:grid-cols-3 2xl:grid-cols-4">
          {publicContentModules.map(
            (module) => (
              <ModuleCard
                key={module.id}
                module={module}
              />
            )
          )}
        </div>
      </section>
    </div>
  );
}

function StatistikCard({
  item,
}: {
  item: StatistikDashboard;
}) {
  const Icon = item.icon;

  const content = (
    <article className="group relative h-full overflow-hidden rounded-3xl border border-emerald-100 bg-white p-6 shadow-[0_12px_35px_rgba(6,78,59,0.07)] transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_18px_45px_rgba(6,78,59,0.12)]">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-emerald-600 to-emerald-800" />

      <div className="pointer-events-none absolute -bottom-10 -right-10 h-28 w-28 rounded-full bg-emerald-50" />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">
            {item.title}
          </p>

          <p className="mt-4 text-4xl font-black tracking-tight text-slate-900">
            {item.value}
          </p>
        </div>

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 transition group-hover:bg-emerald-600 group-hover:text-white">
          <Icon
            size={23}
            strokeWidth={2.1}
          />
        </div>
      </div>

      <div className="relative mt-5 flex items-center justify-between border-t border-emerald-50 pt-4">
        <p className="text-sm font-medium text-slate-500">
          {item.description}
        </p>

        {item.href && (
          <ArrowUpRight
            size={17}
            className="shrink-0 text-emerald-300 transition group-hover:text-emerald-700"
          />
        )}
      </div>
    </article>
  );

  if (!item.href) {
    return content;
  }

  return (
    <Link
      href={item.href}
      className="block h-full"
    >
      {content}
    </Link>
  );
}

function PermohonanItem({
  item,
}: {
  item: PermohonanTerbaru;
}) {
  const whatsappNumber =
    getWhatsAppNumber(
      item.noWa
    );

  const message =
    encodeURIComponent(
      `Halo ${item.namaPemohon}, permohonan layanan ${item.namaLayanan} Anda sedang kami tindak lanjuti oleh Pemerintah Desa Keji.`
    );

  return (
    <div className="grid gap-5 px-6 py-5 transition hover:bg-emerald-50/30 sm:px-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
      <div className="flex min-w-0 items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
          <UserRound
            size={20}
          />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-black text-slate-900">
              {item.namaPemohon}
            </h3>

            <StatusBadge
              status={item.status}
            />
          </div>

          <p className="mt-2 text-sm font-extrabold text-emerald-700">
            {item.namaLayanan}
          </p>

          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-slate-500">
            <span>
              NIK ••••{' '}
              {item.nikLast4}
            </span>

            <span>
              {formatTanggal(
                item.createdAt
              )}
            </span>

            <span>
              {item.noWa}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 pl-[60px] lg:pl-0">
        <a
          href={`https://wa.me/${whatsappNumber}?text=${message}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 text-xs font-extrabold text-emerald-700 transition hover:bg-emerald-100"
        >
          <MessageCircle
            size={15}
          />

          WhatsApp
        </a>

        <Link
          href="/admin/permohonan"
          className="inline-flex h-10 items-center justify-center rounded-xl bg-emerald-700 px-4 text-xs font-extrabold text-white transition hover:bg-emerald-800"
        >
          Kelola
        </Link>
      </div>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const normalized =
    getStatusNormalized(
      status
    );

  if (
    normalized === 'selesai'
  ) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.1em] text-emerald-700">
        <CheckCircle2
          size={12}
        />

        Selesai
      </span>
    );
  }

  if (
    normalized === 'diproses'
  ) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.1em] text-blue-700">
        <RefreshCw
          size={12}
        />

        Diproses
      </span>
    );
  }

  if (
    normalized === 'ditolak'
  ) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.1em] text-red-700">
        <XCircle
          size={12}
        />

        Ditolak
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.1em] text-amber-700">
      <Clock3
        size={12}
      />

      Menunggu
    </span>
  );
}

function ModuleCard({
  module,
}: {
  module: AdminNavigationItem;
}) {
  const Icon = module.icon;

  return (
    <article className="group flex min-h-[275px] min-w-0 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition ${
            module.enabled
              ? 'bg-emerald-700 text-white'
              : 'bg-slate-100 text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-700'
          }`}
        >
          <Icon size={23} />
        </div>

        <span
          className={`rounded-full px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.12em] ${
            module.enabled
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-amber-100 text-amber-700'
          }`}
        >
          {module.enabled
            ? 'Aktif'
            : 'Belum dibuat'}
        </span>
      </div>

      <h3 className="mt-5 text-lg font-black text-slate-900">
        {module.label}
      </h3>

      <p className="mt-2 flex-1 text-sm font-medium leading-6 text-slate-500">
        {module.description}
      </p>

      <div className="mt-5 grid grid-cols-2 gap-2 border-t border-slate-100 pt-4">
        {module.enabled ? (
          <Link
            href={module.href}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-3 text-xs font-extrabold text-white transition hover:bg-emerald-800"
          >
            Kelola

            <ArrowUpRight
              size={14}
            />
          </Link>
        ) : (
          <div className="inline-flex min-h-10 items-center justify-center rounded-xl bg-slate-100 px-3 text-center text-[10px] font-extrabold uppercase tracking-[0.1em] text-slate-400">
            Tahap berikutnya
          </div>
        )}

        {module.publicHref ? (
          <Link
            href={
              module.publicHref
            }
            target="_blank"
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-extrabold text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
          >
            <Eye size={14} />

            Publik
          </Link>
        ) : (
          <div />
        )}
      </div>
    </article>
  );
}