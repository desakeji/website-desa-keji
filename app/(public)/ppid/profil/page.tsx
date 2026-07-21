// app/(public)/ppid/profil/page.tsx

import {
  Building2,
  CheckCircle2,
  Clock3,
  FileCheck2,
  FileSearch,
  Landmark,
  Mail,
  MapPin,
  Network,
  Phone,
  ShieldCheck,
  UserRound,
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

import type {
  PengurusPpid,
  ProfilPpid,
} from '@/types/ppid';

export const dynamic =
  'force-dynamic';

export const revalidate = 0;

interface LayananRow {
  id: number;
  nama: string;
  slug: string;
}

interface TugasPpid {
  title: string;
  description: string;
  icon: LucideIcon;
}

const tugasPpid:
  TugasPpid[] = [
    {
      title:
        'Pengumpulan Informasi',
      description:
        'Menghimpun informasi dan dokumentasi dari setiap bagian Pemerintah Desa Keji.',
      icon: FileSearch,
    },
    {
      title:
        'Pengelolaan Dokumen',
      description:
        'Menyimpan, menata, dan memutakhirkan dokumen informasi publik secara berkala.',
      icon: FileCheck2,
    },
    {
      title:
        'Pelayanan Informasi',
      description:
        'Memberikan informasi yang dibutuhkan masyarakat sesuai prosedur pelayanan.',
      icon: Users,
    },
    {
      title:
        'Perlindungan Informasi',
      description:
        'Menjaga informasi pribadi dan informasi yang dikecualikan berdasarkan ketentuan.',
      icon: ShieldCheck,
    },
  ];

const fallbackProfil:
  ProfilPpid = {
    id: '',
    profil_key: 'utama',

    judul:
      'Profil PPID Desa Keji',

    deskripsi:
      'Pejabat Pengelola Informasi dan Dokumentasi Desa Keji bertanggung jawab mengelola, mendokumentasikan, menyediakan, serta memberikan pelayanan informasi publik kepada masyarakat.',

    email: null,
    telepon: null,

    alamat:
      'Kantor Pemerintah Desa Keji, Kecamatan Ungaran Barat, Kabupaten Semarang',

    jam_layanan:
      'Senin–Kamis 08.00–15.00 WIB dan Jumat 08.00–11.30 WIB',

    aktif: true,
    created_at: '',
    updated_at: '',
  };

function normalizeProfil(
  data: Record<
    string,
    unknown
  > | null
): ProfilPpid {
  if (!data) {
    return fallbackProfil;
  }

  return {
    id:
      String(
        data.id ?? ''
      ),

    profil_key:
      String(
        data.profil_key ??
          'utama'
      ),

    judul:
      String(
        data.judul ??
          fallbackProfil.judul
      ),

    deskripsi:
      String(
        data.deskripsi ??
          fallbackProfil.deskripsi
      ),

    email:
      data.email
        ? String(data.email)
        : null,

    telepon:
      data.telepon
        ? String(
            data.telepon
          )
        : null,

    alamat:
      data.alamat
        ? String(
            data.alamat
          )
        : null,

    jam_layanan:
      data.jam_layanan
        ? String(
            data.jam_layanan
          )
        : null,

    aktif:
      Boolean(
        data.aktif
      ),

    created_at:
      String(
        data.created_at ??
          ''
      ),

    updated_at:
      String(
        data.updated_at ??
          ''
      ),
  };
}

function normalizePengurus(
  data: unknown
): PengurusPpid[] {
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
          String(
            row.id ?? ''
          ),

        nama:
          String(
            row.nama ?? ''
          ),

        jabatan_desa:
          String(
            row.jabatan_desa ??
              ''
          ),

        jabatan_ppid:
          String(
            row.jabatan_ppid ??
              ''
          ),

        urutan:
          Number(
            row.urutan ?? 0
          ),

        aktif:
          Boolean(
            row.aktif
          ),

        created_at:
          String(
            row.created_at ??
              ''
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

function getInitials(
  nama: string
) {
  return nama
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((kata) =>
      kata
        .charAt(0)
        .toUpperCase()
    )
    .join('');
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

export default async function ProfilPpidPage() {
  const [
    profilResult,
    pengurusResult,
    layananResult,
  ] = await Promise.all([
    supabaseAdmin
      .from('profil_ppid')
      .select(`
        id,
        profil_key,
        judul,
        deskripsi,
        email,
        telepon,
        alamat,
        jam_layanan,
        aktif,
        created_at,
        updated_at
      `)
      .eq(
        'profil_key',
        'utama'
      )
      .eq('aktif', true)
      .maybeSingle(),

    supabaseAdmin
      .from('ppid_pengurus')
      .select(`
        id,
        nama,
        jabatan_desa,
        jabatan_ppid,
        urutan,
        aktif,
        created_at,
        updated_at
      `)
      .eq('aktif', true)
      .order('urutan', {
        ascending: true,
      })
      .order('created_at', {
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

  if (
    profilResult.error
  ) {
    console.error(
      'Gagal mengambil profil PPID:',
      {
        message:
          profilResult.error.message,
        code:
          profilResult.error.code,
        details:
          profilResult.error.details,
        hint:
          profilResult.error.hint,
      }
    );
  }

  if (
    pengurusResult.error
  ) {
    console.error(
      'Gagal mengambil pengurus PPID:',
      {
        message:
          pengurusResult.error.message,
        code:
          pengurusResult.error.code,
        details:
          pengurusResult.error.details,
        hint:
          pengurusResult.error.hint,
      }
    );
  }

  if (
    layananResult.error
  ) {
    console.error(
      'Gagal mengambil layanan:',
      {
        message:
          layananResult.error.message,
      }
    );
  }

  const profil =
    normalizeProfil(
      profilResult.data as
        | Record<
            string,
            unknown
          >
        | null
    );

  const daftarPengurus =
    normalizePengurus(
      pengurusResult.data
    );

  const daftarLayanan:
    PilihanLayanan[] = (
      (layananResult.data ??
        []) as LayananRow[]
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

  const jumlahBidang =
    new Set(
      daftarPengurus
        .map(
          (item) =>
            item.jabatan_ppid
        )
        .filter(Boolean)
    ).size;

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-700">
            <Landmark size={16} />

            Pejabat Pengelola Informasi
            dan Dokumentasi
          </div>

          <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
            Profil PPID
          </h1>

          <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-500 md:text-base">
            Profil, struktur
            organisasi, tugas, dan
            pelayanan PPID Pemerintah
            Desa Keji.
          </p>
        </header>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <main className="min-w-0 space-y-6 lg:w-2/3">
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
                        0.23
                      ) 1.5px,
                      transparent 1.5px
                    )
                  `,
                  backgroundSize:
                    '26px 26px',
                }}
              />

              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border-[46px] border-white/[0.06]" />

              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/10 shadow-lg backdrop-blur">
                  <Network size={31} />
                </div>

                <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-100">
                  Pemerintah Desa Keji
                </p>

                <h2 className="mt-3 text-2xl font-black leading-tight md:text-3xl">
                  {profil.judul}
                </h2>

                <p className="mt-4 max-w-3xl whitespace-pre-line text-sm font-medium leading-7 text-emerald-50/90 md:text-base md:leading-8">
                  {profil.deskripsi}
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  <HeroStat
                    label="Pengurus Aktif"
                    value={
                      daftarPengurus.length
                    }
                    icon={Users}
                  />

                  <HeroStat
                    label="Jabatan PPID"
                    value={jumlahBidang}
                    icon={Building2}
                  />

                  <HeroStat
                    label="Status"
                    value="Aktif"
                    icon={ShieldCheck}
                  />
                </div>
              </div>
            </section>

            {/* Tentang PPID */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <Landmark size={23} />
                </div>

                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-600">
                    Tentang Kami
                  </p>

                  <h2 className="mt-2 text-xl font-black text-slate-900 md:text-2xl">
                    PPID Pemerintah Desa
                    Keji
                  </h2>

                  <div className="mt-4 space-y-4 text-sm font-medium leading-7 text-slate-600">
                    <p>
                      PPID Desa Keji
                      merupakan unsur
                      Pemerintah Desa yang
                      bertanggung jawab
                      terhadap pengelolaan
                      dan pelayanan
                      informasi publik.
                    </p>

                    <p>
                      Pelayanan PPID
                      bertujuan memberikan
                      akses informasi yang
                      mudah, cepat, tepat,
                      dan dapat
                      dipertanggungjawabkan
                      kepada masyarakat.
                    </p>

                    <p>
                      Informasi yang
                      dikelola meliputi
                      informasi
                      pemerintahan,
                      pembangunan,
                      pelayanan publik,
                      produk hukum,
                      anggaran, dan
                      informasi desa
                      lainnya.
                    </p>
                  </div>

                  <p className="mt-5 text-xs font-semibold text-slate-400">
                    Terakhir diperbarui:{' '}
                    {formatTanggal(
                      profil.updated_at
                    )}
                  </p>
                </div>
              </div>
            </section>

            {/* Tugas */}
            <section>
              <div className="mb-5">
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-600">
                  Tugas dan Fungsi
                </p>

                <h2 className="mt-2 text-2xl font-black text-slate-900">
                  Tugas Utama PPID
                </h2>

                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">
                  Fungsi PPID dalam
                  mendukung pelayanan
                  informasi publik Desa
                  Keji.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {tugasPpid.map(
                  (item) => (
                    <TugasCard
                      key={item.title}
                      item={item}
                    />
                  )
                )}
              </div>
            </section>

            {/* Susunan organisasi */}
            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-white p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-md">
                    <Users size={23} />
                  </div>

                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-600">
                      Struktur Organisasi
                    </p>

                    <h2 className="mt-2 text-xl font-black text-slate-900 md:text-2xl">
                      Susunan PPID Desa
                      Keji
                    </h2>

                    <p className="mt-2 text-sm font-medium text-slate-500">
                      Daftar pejabat dan
                      petugas pengelola
                      informasi publik.
                    </p>
                  </div>
                </div>
              </div>

              {daftarPengurus.length ===
              0 ? (
                <div className="px-6 py-14 text-center">
                  <Users
                    size={46}
                    className="mx-auto text-slate-300"
                  />

                  <h3 className="mt-4 font-black text-slate-700">
                    Susunan pengurus
                    belum tersedia
                  </h3>

                  <p className="mt-2 text-sm font-medium text-slate-500">
                    Data pengurus PPID
                    belum dimasukkan oleh
                    administrator.
                  </p>
                </div>
              ) : (
                <>
                  {/* Desktop */}
                  <div className="hidden overflow-x-auto md:block">
                    <table className="w-full min-w-[760px] border-collapse text-left">
                      <thead>
                        <tr className="bg-slate-700 text-white">
                          <th className="w-[70px] px-4 py-4 text-center text-xs font-extrabold uppercase">
                            No
                          </th>

                          <th className="px-5 py-4 text-xs font-extrabold uppercase">
                            Nama
                          </th>

                          <th className="px-5 py-4 text-xs font-extrabold uppercase">
                            Jabatan Desa
                          </th>

                          <th className="px-5 py-4 text-xs font-extrabold uppercase">
                            Jabatan dalam
                            PPID
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-slate-200">
                        {daftarPengurus.map(
                          (
                            pengurus,
                            index
                          ) => (
                            <tr
                              key={
                                pengurus.id
                              }
                              className="transition odd:bg-white even:bg-slate-50 hover:bg-emerald-50/60"
                            >
                              <td className="px-4 py-4 text-center text-sm font-semibold text-slate-500">
                                {index + 1}
                              </td>

                              <td className="px-5 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-xs font-black text-emerald-700">
                                    {getInitials(
                                      pengurus.nama
                                    )}
                                  </div>

                                  <p className="font-extrabold text-slate-800">
                                    {
                                      pengurus.nama
                                    }
                                  </p>
                                </div>
                              </td>

                              <td className="px-5 py-4 text-sm font-semibold text-slate-600">
                                {
                                  pengurus.jabatan_desa
                                }
                              </td>

                              <td className="px-5 py-4">
                                <span className="inline-flex rounded-full bg-cyan-100 px-3 py-1.5 text-xs font-extrabold text-cyan-700">
                                  {
                                    pengurus.jabatan_ppid
                                  }
                                </span>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile */}
                  <div className="grid gap-4 p-4 md:hidden">
                    {daftarPengurus.map(
                      (
                        pengurus,
                        index
                      ) => (
                        <article
                          key={
                            pengurus.id
                          }
                          className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-xs font-black text-emerald-700">
                              {getInitials(
                                pengurus.nama
                              )}
                            </div>

                            <div className="min-w-0">
                              <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                                Pengurus{' '}
                                {index + 1}
                              </p>

                              <h3 className="mt-1 font-black text-slate-800">
                                {
                                  pengurus.nama
                                }
                              </h3>

                              <p className="mt-1 text-xs font-semibold text-slate-500">
                                {
                                  pengurus.jabatan_desa
                                }
                              </p>
                            </div>
                          </div>

                          <div className="mt-4 rounded-xl bg-cyan-100 px-4 py-3 text-xs font-extrabold leading-relaxed text-cyan-800">
                            {
                              pengurus.jabatan_ppid
                            }
                          </div>
                        </article>
                      )
                    )}
                  </div>
                </>
              )}
            </section>

            {/* Kontak */}
            <section className="overflow-hidden rounded-3xl bg-slate-900 text-white shadow-xl">
              <div className="border-b border-white/10 p-6 md:p-8">
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-300">
                  Kontak dan Pelayanan
                </p>

                <h2 className="mt-2 text-xl font-black md:text-2xl">
                  Sekretariat PPID Desa
                  Keji
                </h2>

                <p className="mt-2 text-sm font-medium leading-6 text-slate-300">
                  Hubungi atau kunjungi
                  sekretariat PPID untuk
                  memperoleh informasi
                  lebih lanjut.
                </p>
              </div>

              <div className="grid gap-px bg-white/10 sm:grid-cols-2">
                <ContactItem
                  icon={MapPin}
                  label="Alamat"
                  value={
                    profil.alamat ??
                    'Alamat belum tersedia'
                  }
                />

                <ContactItem
                  icon={Clock3}
                  label="Jam Pelayanan"
                  value={
                    profil.jam_layanan ??
                    'Jam pelayanan belum tersedia'
                  }
                />

                <ContactItem
                  icon={Phone}
                  label="Telepon"
                  value={
                    profil.telepon ??
                    'Nomor telepon belum tersedia'
                  }
                />

                <ContactItem
                  icon={Mail}
                  label="Email"
                  value={
                    profil.email ??
                    'Email belum tersedia'
                  }
                />
              </div>
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
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number | string;
  icon: LucideIcon;
}) {
  return (
    <article className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
      <Icon
        size={19}
        className="text-emerald-100"
      />

      <p className="mt-3 text-2xl font-black text-white">
        {value}
      </p>

      <p className="mt-1 text-xs font-bold text-emerald-100/80">
        {label}
      </p>
    </article>
  );
}

function TugasCard({
  item,
}: {
  item: TugasPpid;
}) {
  const Icon =
    item.icon;

  return (
    <article className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 transition group-hover:bg-emerald-700 group-hover:text-white">
        <Icon size={23} />
      </div>

      <h3 className="mt-4 font-black text-slate-900">
        {item.title}
      </h3>

      <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
        {item.description}
      </p>
    </article>
  );
}

function ContactItem({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <article className="bg-slate-900 p-5 md:p-6">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300">
          <Icon size={19} />
        </div>

        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
            {label}
          </p>

          <p className="mt-2 text-sm font-bold leading-6 text-white">
            {value}
          </p>
        </div>
      </div>
    </article>
  );
}