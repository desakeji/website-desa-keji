// app/(public)/kontak/page.tsx

import Image from 'next/image';
import Link from 'next/link';

import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock3,
  ExternalLink,
  Headphones,
  Info,
  Landmark,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Siren,
  Users,
  type LucideIcon,
} from 'lucide-react';

import SidebarLayanan from '@/components/SidebarLayanan';

import {
  supabaseAdmin,
} from '@/lib/supabase-admin';

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

interface KontakDesa {
  nama: string;
  jabatan: string;
  nomor: string;
  description: string;
  icon: LucideIcon;
  featured?: boolean;
}

const daftarKontak:
  KontakDesa[] = [
    {
      nama: 'Kepala Desa',
      jabatan:
        'Pimpinan Pemerintah Desa',
      nomor:
        '0813-2944-2688',
      description:
        'Layanan pengaduan umum, koordinasi pemerintahan, dan kebijakan desa.',
      icon: Landmark,
      featured: true,
    },
    {
      nama: 'Sekretaris Desa',
      jabatan:
        'Administrasi Pemerintah Desa',
      nomor:
        '0822-2022-5538',
      description:
        'Informasi administrasi, surat-menyurat, dan pelayanan pemerintahan desa.',
      icon: Building2,
      featured: true,
    },
    {
      nama: 'Bhabinkamtibmas',
      jabatan:
        'Keamanan dan Ketertiban',
      nomor:
        '0852-2541-9475',
      description:
        'Pelaporan keamanan, ketertiban masyarakat, dan kondisi darurat kepolisian.',
      icon: ShieldCheck,
    },
    {
      nama: 'Babinsa',
      jabatan:
        'Pembinaan Wilayah',
      nomor:
        '0853-2626-8087',
      description:
        'Koordinasi keamanan wilayah, kedaruratan, dan pembinaan masyarakat.',
      icon: ShieldCheck,
    },
    {
      nama: 'Bidan Desa',
      jabatan:
        'Pelayanan Kesehatan',
      nomor:
        '0812-2530-7511',
      description:
        'Informasi dan koordinasi pelayanan kesehatan masyarakat Desa Keji.',
      icon: Headphones,
    },
    {
      nama: 'Kadus Suruhan',
      jabatan:
        'Kepala Dusun Suruhan',
      nomor:
        '0857-1299-5229',
      description:
        'Pelayanan dan koordinasi masyarakat di wilayah Dusun Suruhan.',
      icon: Users,
    },
    {
      nama: 'Kadus Setoyo',
      jabatan:
        'Kepala Dusun Setoyo',
      nomor:
        '0838-3857-9933',
      description:
        'Pelayanan dan koordinasi masyarakat di wilayah Dusun Setoyo.',
      icon: Users,
    },
    {
      nama: 'Kadus Keji',
      jabatan:
        'Kepala Dusun Keji',
      nomor:
        '0819-0110-6777',
      description:
        'Pelayanan dan koordinasi masyarakat di wilayah Dusun Keji.',
      icon: Users,
    },
  ];

const jadwalPelayanan = [
  {
    hari: 'Senin–Kamis',
    waktu: '08.00–15.00 WIB',
  },
  {
    hari: 'Jumat',
    waktu: '08.00–11.30 WIB',
  },
  {
    hari: 'Istirahat',
    waktu: '12.00–13.00 WIB',
  },
  {
    hari:
      'Sabtu, Minggu, dan Tanggal Merah',
    waktu: 'Libur',
  },
];

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
  kontak: KontakDesa
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

async function getDaftarLayanan():
  Promise<PilihanLayanan[]> {
  const {
    data,
    error,
  } = await supabaseAdmin
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
      'Gagal mengambil daftar layanan pada halaman kontak:',
      {
        message:
          error.message,
        code:
          error.code,
        details:
          error.details,
        hint:
          error.hint,
      }
    );

    return [];
  }

  return (
    (data ?? []) as LayananRow[]
  )
    .map((item) => ({
      id:
        Number(item.id),

      nama:
        String(
          item.nama ?? ''
        ).trim(),

      slug:
        String(
          item.slug ?? ''
        ).trim(),
    }))
    .filter(
      (item) =>
        Number.isFinite(
          item.id
        ) &&
        item.id > 0 &&
        item.nama.length >
          0 &&
        item.slug.length >
          0
    );
}

export default async function KontakPage() {
  const daftarLayanan =
    await getDaftarLayanan();

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-700">
            <Landmark size={16} />

            Pemerintah Desa Keji
          </div>

          <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
            Kontak dan Layanan Aduan
          </h1>

          <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-500 md:text-base">
            Hubungi Pemerintah Desa
            Keji untuk memperoleh
            informasi pelayanan,
            menyampaikan pengaduan,
            atau berkoordinasi dengan
            perangkat wilayah.
          </p>
        </header>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <main className="min-w-0 space-y-8 lg:w-2/3">
            {/* Hero */}
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-700 p-6 text-white shadow-xl shadow-emerald-950/10 md:p-8">
              <div
                className="pointer-events-none absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                    radial-gradient(
                      circle,
                      rgba(
                        255,
                        255,
                        255,
                        0.24
                      ) 1.5px,
                      transparent 1.5px
                    )
                  `,
                  backgroundSize:
                    '25px 25px',
                }}
              />

              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border-[52px] border-white/[0.06]" />

              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/10 shadow-lg backdrop-blur">
                  <Headphones
                    size={31}
                  />
                </div>

                <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-100">
                  Layanan Masyarakat
                </p>

                <h2 className="mt-3 max-w-2xl text-2xl font-black leading-tight md:text-3xl">
                  Pemerintah Desa Keji
                  siap menerima informasi,
                  pertanyaan, dan aduan
                  masyarakat
                </h2>

                <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-emerald-50/90 md:text-base md:leading-8">
                  Pilih kontak yang
                  sesuai dengan kebutuhan
                  Anda. Gunakan layanan
                  telepon atau WhatsApp
                  secara bertanggung
                  jawab dan sampaikan
                  informasi dengan jelas.
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
                    value="10 Menit"
                    label="Estimasi Pelayanan"
                  />

                  <HeroStat
                    icon={CheckCircle2}
                    value="Gratis"
                    label="Administrasi Desa"
                  />
                </div>
              </div>
            </section>

            {/* Informasi kantor */}
            <section className="grid gap-4 sm:grid-cols-2">
              <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <MapPin size={23} />
                </div>

                <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-600">
                  Lokasi Kantor
                </p>

                <h2 className="mt-2 text-lg font-black text-slate-900">
                  Kantor Pemerintah Desa
                  Keji
                </h2>

                <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
                  Desa Keji, Kecamatan
                  Ungaran Barat,
                  Kabupaten Semarang,
                  Jawa Tengah.
                </p>
              </article>

              <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700">
                  <Clock3 size={23} />
                </div>

                <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.16em] text-cyan-700">
                  Jam Pelayanan
                </p>

                <h2 className="mt-2 text-lg font-black text-slate-900">
                  Senin sampai Jumat
                </h2>

                <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
                  Pelayanan administrasi
                  dilaksanakan sesuai jam
                  operasional Pemerintah
                  Desa Keji.
                </p>
              </article>
            </section>

            {/* Kontak utama */}
            <section>
              <div className="mb-5">
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-600">
                  Kontak Pelayanan
                </p>

                <h2 className="mt-2 text-2xl font-black text-slate-900">
                  Layanan Aduan
                  Masyarakat
                </h2>

                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">
                  Hubungi petugas sesuai
                  bidang atau wilayah
                  pelayanan yang
                  dibutuhkan.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {daftarKontak.map(
                  (kontak) => (
                    <KontakCard
                      key={
                        kontak.nama
                      }
                      kontak={
                        kontak
                      }
                    />
                  )
                )}
              </div>
            </section>

            {/* Poster */}
            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-start gap-4 border-b border-slate-100 p-6 md:p-8">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <Phone size={23} />
                </div>

                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-600">
                    Infografis Kontak
                  </p>

                  <h2 className="mt-2 text-xl font-black text-slate-900 md:text-2xl">
                    Daftar Layanan Aduan
                    Desa Keji
                  </h2>

                  <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">
                    Poster daftar nomor
                    kontak Pemerintah Desa
                    dan petugas wilayah.
                  </p>
                </div>
              </div>

              <div className="bg-slate-100 p-3 sm:p-5">
                <a
                  href="/images/kontak/Layanan-Aduan-Masyarakat.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block overflow-hidden rounded-2xl bg-white"
                >
                  <Image
                    src="/images/kontak/Layanan-Aduan-Masyarakat.png"
                    alt="Poster layanan aduan masyarakat Desa Keji"
                    width={650}
                    height={860}
                    className="h-auto w-full object-contain"
                  />
                </a>
              </div>

              <div className="border-t border-slate-100 p-5">
                <a
                  href="/images/kontak/Layanan-Aduan-Masyarakat.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-extrabold text-emerald-700 transition hover:text-emerald-800"
                >
                  Lihat poster ukuran
                  penuh

                  <ExternalLink
                    size={16}
                  />
                </a>
              </div>
            </section>

            {/* Jadwal pelayanan */}
            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-white p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-md">
                    <Clock3 size={23} />
                  </div>

                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-600">
                      Waktu Pelayanan
                    </p>

                    <h2 className="mt-2 text-xl font-black text-slate-900 md:text-2xl">
                      Jadwal Operasional
                      Kantor Desa
                    </h2>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 p-5 md:p-8">
                {jadwalPelayanan.map(
                  (
                    jadwal,
                    index
                  ) => (
                    <article
                      key={
                        jadwal.hari
                      }
                      className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-xs font-black text-emerald-700">
                          {index + 1}
                        </span>

                        <p className="text-sm font-extrabold text-slate-700">
                          {jadwal.hari}
                        </p>
                      </div>

                      <span
                        className={`rounded-xl px-4 py-2 text-sm font-black ${
                          jadwal.waktu ===
                          'Libur'
                            ? 'bg-rose-100 text-rose-700'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {jadwal.waktu}
                      </span>
                    </article>
                  )
                )}
              </div>
            </section>

            {/* Tata cara menghubungi */}
            <section className="rounded-3xl border border-cyan-200 bg-cyan-50 p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-700 text-white">
                  <Info size={23} />
                </div>

                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-cyan-700">
                    Etika Pelayanan
                  </p>

                  <h2 className="mt-2 text-xl font-black text-cyan-950">
                    Sampaikan aduan
                    dengan jelas dan
                    bertanggung jawab
                  </h2>

                  <div className="mt-4 space-y-3">
                    <InfoItem text="Sampaikan nama, wilayah, dan keperluan secara jelas." />

                    <InfoItem text="Jelaskan lokasi dan waktu kejadian apabila menyampaikan pengaduan." />

                    <InfoItem text="Lampirkan foto atau bukti pendukung apabila diperlukan." />

                    <InfoItem text="Hindari menyampaikan informasi palsu, penghinaan, atau pesan berulang." />

                    <InfoItem text="Gunakan nomor darurat hanya untuk kondisi yang benar-benar mendesak." />
                  </div>
                </div>
              </div>
            </section>

            {/* Darurat */}
            <section className="relative overflow-hidden rounded-3xl bg-slate-900 p-6 text-white shadow-xl md:p-8">
              <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full border-[48px] border-white/[0.04]" />

              <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.16em] text-rose-300">
                    <Siren size={17} />
                    Kondisi Darurat
                  </div>

                  <h2 className="mt-3 text-xl font-black md:text-2xl">
                    Terdapat kejadian
                    yang membahayakan
                    masyarakat?
                  </h2>

                  <p className="mt-2 max-w-xl text-sm font-medium leading-6 text-slate-300">
                    Segera hubungi
                    Bhabinkamtibmas,
                    Babinsa, Kepala
                    Dusun, atau Pemerintah
                    Desa sesuai lokasi
                    kejadian.
                  </p>
                </div>

                <a
                  href={getWhatsAppLink(
                    daftarKontak[0]
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-emerald-500"
                >
                  <MessageCircle
                    size={18}
                  />

                  Hubungi Pemerintah Desa
                </a>
              </div>
            </section>

            {/* Navigasi terkait */}
            <section className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/layanan"
                className="group flex items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-200 hover:shadow-md"
              >
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-emerald-600">
                    Administrasi
                  </p>

                  <h2 className="mt-2 font-black text-slate-900">
                    Layanan Desa
                  </h2>

                  <p className="mt-1 text-xs font-medium text-slate-500">
                    Lihat jenis dan
                    persyaratan layanan.
                  </p>
                </div>

                <ArrowRight
                  size={20}
                  className="shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-emerald-600"
                />
              </Link>

              <Link
                href="/ppid/permohonan-informasi"
                className="group flex items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-200 hover:shadow-md"
              >
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-emerald-600">
                    Informasi Publik
                  </p>

                  <h2 className="mt-2 font-black text-slate-900">
                    Layanan PPID
                  </h2>

                  <p className="mt-1 text-xs font-medium text-slate-500">
                    Ajukan permohonan
                    informasi publik.
                  </p>
                </div>

                <ArrowRight
                  size={20}
                  className="shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-emerald-600"
                />
              </Link>
            </section>
          </main>

          {/* Sidebar */}
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
  value: number | string;
  label: string;
}) {
  return (
    <article className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
      <Icon
        size={19}
        className="text-emerald-100"
      />

      <p className="mt-3 text-xl font-black text-white">
        {value}
      </p>

      <p className="mt-1 text-xs font-bold text-emerald-100/80">
        {label}
      </p>
    </article>
  );
}

function KontakCard({
  kontak,
}: {
  kontak: KontakDesa;
}) {
  const Icon =
    kontak.icon;

  const whatsappLink =
    getWhatsAppLink(
      kontak
    );

  return (
    <article
      className={`group relative overflow-hidden rounded-3xl border bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg ${
        kontak.featured
          ? 'border-emerald-200'
          : 'border-slate-200'
      }`}
    >
      {kontak.featured && (
        <span className="absolute right-4 top-4 rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">
          Kontak Utama
        </span>
      )}

      <div
        className={`flex h-12 w-12 items-center justify-center rounded-2xl transition ${
          kontak.featured
            ? 'bg-emerald-700 text-white'
            : 'bg-emerald-100 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white'
        }`}
      >
        <Icon size={23} />
      </div>

      <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.14em] text-emerald-600">
        {kontak.jabatan}
      </p>

      <h3 className="mt-2 text-lg font-black text-slate-900">
        {kontak.nama}
      </h3>

      <p className="mt-2 min-h-[48px] text-sm font-medium leading-6 text-slate-500">
        {kontak.description}
      </p>

      <div className="mt-5 rounded-2xl bg-slate-50 p-4">
        <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
          Nomor WhatsApp
        </p>

        <p className="mt-1 text-lg font-black tracking-wide text-slate-800">
          {kontak.nomor}
        </p>
      </div>

      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-emerald-800"
      >
        <MessageCircle
          size={17}
        />

        Hubungi melalui WhatsApp
      </a>
    </article>
  );
}

function InfoItem({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle2
        size={18}
        className="mt-0.5 shrink-0 text-cyan-700"
      />

      <p className="text-sm font-semibold leading-6 text-cyan-950">
        {text}
      </p>
    </div>
  );
}