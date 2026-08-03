// app/(public)/kontak/page.tsx

import Link from 'next/link';

import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  ExternalLink,
  Headphones,
  Info,
  Landmark,
  MapPin,
  MessageCircle,
  Phone,
  Siren,
  type LucideIcon,
} from 'lucide-react';

import SidebarLayanan from '@/components/SidebarLayanan';

import {
  KONTAK_DESA_DEFAULTS,
  KONTAK_ITEM_DEFAULTS,
  ETIKA_PELAYANAN_DEFAULTS,
  JADWAL_PELAYANAN_DEFAULTS,
} from '@/lib/kontak-defaults';

import {
  KONTAK_ICON_MAP,
} from '@/lib/kontak-icons';

import {
  supabaseAdmin,
} from '@/lib/supabase-admin';

import type {
  EtikaPelayananDesa,
  JadwalPelayananDesa,
  KontakDesaItem,
  KontakDesaSettings,
} from '@/types/kontak-desa';

import type {
  PilihanLayanan,
} from '@/types/layanan';

export const dynamic =
  'force-dynamic';

export const revalidate = 0;

interface LayananRow {
  id: number;
  nama: string;
  slug: string;
}

function getPhoneNumber(
  nomor: string
) {
  return nomor.replace(
    /\D/g,
    ''
  );
}

function getWhatsAppNumber(
  nomor: string
) {
  const digits =
    getPhoneNumber(nomor);

  if (
    digits.startsWith('0')
  ) {
    return `62${digits.slice(
      1
    )}`;
  }

  return digits;
}

function getWhatsAppLink(
  kontak:
    KontakDesaItem
) {
  const phone =
    getWhatsAppNumber(
      kontak.nomor
    );

  const message =
    encodeURIComponent(
      `Selamat datang. Saya ingin menghubungi ${kontak.nama} Desa Keji terkait pelayanan atau pengaduan masyarakat.`
    );

  return `https://wa.me/${phone}?text=${message}`;
}

export default async function KontakPage() {
  const [
    settingsResult,
    kontakResult,
    jadwalResult,
    etikaResult,
    layananResult,
  ] = await Promise.all([
    supabaseAdmin
      .from('kontak_desa')
      .select('*')
      .eq(
        'kontak_key',
        'utama'
      )
      .maybeSingle(),

    supabaseAdmin
      .from(
        'kontak_desa_item'
      )
      .select('*')
      .eq('aktif', true)
      .order('urutan', {
        ascending: true,
      }),

    supabaseAdmin
      .from(
        'jadwal_pelayanan_desa'
      )
      .select('*')
      .eq('aktif', true)
      .order('urutan', {
        ascending: true,
      }),

    supabaseAdmin
      .from(
        'etika_pelayanan_desa'
      )
      .select('*')
      .eq('aktif', true)
      .order('urutan', {
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

  const settings:
    KontakDesaSettings = {
    ...KONTAK_DESA_DEFAULTS,
    ...(settingsResult.data ??
      {}),
  };

  const daftarKontak =
    kontakResult.error
      ? KONTAK_ITEM_DEFAULTS
      : (
          kontakResult.data ??
          []
        ) as KontakDesaItem[];

  const jadwal =
    jadwalResult.error
      ? JADWAL_PELAYANAN_DEFAULTS
      : (
          jadwalResult.data ??
          []
        ) as JadwalPelayananDesa[];

  const daftarEtika =
    etikaResult.error
      ? ETIKA_PELAYANAN_DEFAULTS
      : (
          etikaResult.data ??
          []
        ) as EtikaPelayananDesa[];

  const daftarLayanan:
    PilihanLayanan[] = (
      (layananResult.data ??
        []) as LayananRow[]
    ).map((item) => ({
      id:
        Number(item.id),

      nama:
        String(item.nama),

      slug:
        String(item.slug),
    }));

  const kontakDarurat =
    daftarKontak.find(
      (item) =>
        item.featured
    ) ??
    daftarKontak[0];

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-700">
            <Landmark size={16} />

            {settings.label_header}
          </div>

          <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
            {settings.judul_halaman}
          </h1>

          <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-500 md:text-base">
            {settings.deskripsi_halaman}
          </p>
        </header>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <main className="min-w-0 space-y-8 lg:w-2/3">
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-700 p-6 text-white shadow-xl md:p-8">
              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                  <Headphones
                    size={31}
                  />
                </div>

                <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-100">
                  Layanan Masyarakat
                </p>

                <h2 className="mt-3 max-w-2xl text-2xl font-black leading-tight md:text-3xl">
                  {settings.judul_hero}
                </h2>

                <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-emerald-50/90 md:text-base">
                  {settings.deskripsi_hero}
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  <HeroStat
                    icon={Phone}
                    value={
                      daftarKontak.length
                    }
                    label="Kontak Layanan"
                  />

                  <HeroStat
                    icon={Clock3}
                    value={
                      settings.estimasi_pelayanan
                    }
                    label="Estimasi Pelayanan"
                  />

                  <HeroStat
                    icon={CheckCircle2}
                    value={
                      settings.label_biaya
                    }
                    label="Administrasi Desa"
                  />
                </div>
              </div>
            </section>

            <section className="grid gap-4 sm:grid-cols-2">
              <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <MapPin
                  size={23}
                  className="text-emerald-700"
                />

                <h2 className="mt-5 text-lg font-black text-slate-900">
                  Kantor Pemerintah Desa Keji
                </h2>

                <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
                  {settings.alamat_kantor}
                </p>
              </article>

              <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <Clock3
                  size={23}
                  className="text-cyan-700"
                />

                <h2 className="mt-5 text-lg font-black text-slate-900">
                  {settings.judul_jadwal}
                </h2>

                <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
                  Pelayanan administrasi dilaksanakan sesuai jadwal operasional Pemerintah Desa Keji.
                </p>
              </article>
            </section>

            <section>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-600">
                Kontak Pelayanan
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-900">
                {settings.judul_daftar_kontak}
              </h2>

              <p className="mt-2 text-sm font-medium text-slate-500">
                {settings.deskripsi_daftar_kontak}
              </p>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {daftarKontak.map(
                  (kontak) => (
                    <KontakCard
                      key={kontak.id}
                      kontak={kontak}
                    />
                  )
                )}
              </div>
            </section>

            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="p-6">
                <h2 className="text-xl font-black text-slate-900">
                  {settings.judul_poster}
                </h2>

                <p className="mt-2 text-sm font-medium text-slate-500">
                  {settings.deskripsi_poster}
                </p>
              </div>

              <a
                href={settings.poster_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-slate-100 p-4"
              >
                <img
                  src={settings.poster_url}
                  alt={settings.poster_alt}
                  className="h-auto w-full rounded-2xl object-contain"
                />
              </a>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-black text-slate-900">
                {settings.judul_jadwal}
              </h2>

              <div className="mt-5 space-y-3">
                {jadwal.map(
                  (
                    item,
                    index
                  ) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 p-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-xs font-black text-emerald-700">
                          {index + 1}
                        </span>

                        <p className="text-sm font-extrabold text-slate-700">
                          {item.hari}
                        </p>
                      </div>

                      <span
                        className={`rounded-xl px-4 py-2 text-sm font-black ${
                          item.is_libur
                            ? 'bg-rose-100 text-rose-700'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {item.waktu}
                      </span>
                    </div>
                  )
                )}
              </div>
            </section>

            <section className="rounded-3xl border border-cyan-200 bg-cyan-50 p-6">
              <Info
                size={23}
                className="text-cyan-700"
              />

              <h2 className="mt-4 text-xl font-black text-cyan-950">
                {settings.judul_etika}
              </h2>

              <p className="mt-2 text-sm font-medium text-cyan-800">
                {settings.deskripsi_etika}
              </p>

              <div className="mt-5 space-y-3">
                {daftarEtika.map(
                  (item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2
                        size={18}
                        className="mt-0.5 shrink-0 text-cyan-700"
                      />

                      <p className="text-sm font-semibold text-cyan-950">
                        {item.teks}
                      </p>
                    </div>
                  )
                )}
              </div>
            </section>

            <section className="rounded-3xl bg-slate-900 p-6 text-white">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase text-rose-300">
                    <Siren size={17} />
                    Kondisi Darurat
                  </div>

                  <h2 className="mt-3 text-xl font-black">
                    {settings.judul_darurat}
                  </h2>

                  <p className="mt-2 text-sm font-medium text-slate-300">
                    {settings.deskripsi_darurat}
                  </p>
                </div>

                {kontakDarurat && (
                  <a
                    href={getWhatsAppLink(
                      kontakDarurat
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-extrabold"
                  >
                    <MessageCircle
                      size={18}
                    />

                    Hubungi Pemerintah Desa
                  </a>
                )}
              </div>
            </section>

            <section className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/layanan"
                className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-5"
              >
                <div>
                  <p className="text-xs font-extrabold text-emerald-600">
                    Administrasi
                  </p>

                  <h2 className="mt-2 font-black">
                    Layanan Desa
                  </h2>
                </div>

                <ArrowRight
                  size={20}
                />
              </Link>

              <Link
                href="/ppid/permohonan-informasi"
                className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-5"
              >
                <div>
                  <p className="text-xs font-extrabold text-emerald-600">
                    Informasi Publik
                  </p>

                  <h2 className="mt-2 font-black">
                    Layanan PPID
                  </h2>
                </div>

                <ArrowRight
                  size={20}
                />
              </Link>
            </section>
          </main>

          <aside className="min-w-0 lg:w-1/3">
            <div className="lg:sticky lg:top-24">
              <SidebarLayanan
                daftarLayanan={
                  daftarLayanan
                }
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function HeroStat({
  icon: Icon,
  value,
  label,
}: {
  icon: LucideIcon;
  value:
    | number
    | string;
  label: string;
}) {
  return (
    <article className="rounded-2xl border border-white/15 bg-white/10 p-4">
      <Icon size={19} />

      <p className="mt-3 text-xl font-black">
        {value}
      </p>

      <p className="mt-1 text-xs font-bold text-emerald-100">
        {label}
      </p>
    </article>
  );
}

function KontakCard({
  kontak,
}: {
  kontak:
    KontakDesaItem;
}) {
  const Icon =
    KONTAK_ICON_MAP[
      kontak.icon_key
    ] ?? Phone;

  return (
    <article
      className={`rounded-3xl border bg-white p-5 shadow-sm ${
        kontak.featured
          ? 'border-emerald-200'
          : 'border-slate-200'
      }`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-700 text-white">
        <Icon size={23} />
      </div>

      <p className="mt-5 text-xs font-extrabold uppercase text-emerald-600">
        {kontak.jabatan}
      </p>

      <h3 className="mt-2 text-lg font-black text-slate-900">
        {kontak.nama}
      </h3>

      <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
        {kontak.deskripsi}
      </p>

      <p className="mt-5 rounded-2xl bg-slate-50 p-4 text-lg font-black text-slate-800">
        {kontak.nomor}
      </p>

      <a
        href={getWhatsAppLink(
          kontak
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-extrabold text-white"
      >
        <MessageCircle
          size={17}
        />

        Hubungi melalui WhatsApp
      </a>
    </article>
  );
}