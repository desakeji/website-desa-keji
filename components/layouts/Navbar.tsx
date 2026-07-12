// components/layouts/Navbar.tsx

'use client';

import {
  useEffect,
  useState,
} from 'react';

import Link from 'next/link';

import {
  ChevronDown,
  ChevronRight,
  Home,
  LogIn,
  Menu,
  X,
} from 'lucide-react';

import {
  usePathname,
} from 'next/navigation';

interface SubMenuItem {
  name: string;
  href: string;
  external?: boolean;
}

interface NavItem {
  name: string;
  href: string;
  subItems?: SubMenuItem[];
}

const navItems: NavItem[] = [
  {
    name: 'Profil',
    href: '/profil/data',
    subItems: [
      {
        name: 'Sejarah Desa',
        href: '/profil/sejarah',
      },
      {
        name: 'Visi dan Misi',
        href: '/profil/visi-misi',
      },
      {
        name: 'Profil Desa',
        href: '/profil/data',
      },
      {
        name: 'Peta Desa',
        href: '/peta',
      },
    ],
  },
  {
    name: 'Pemerintah Desa',
    href: '/pemerintahan',
    subItems: [
      {
        name: 'SOTK Pemerintah Desa',
        href: '/pemerintahan',
      },
      {
        name: 'RPJMDes 2020–2028',
        href: 'https://drive.google.com/file/d/144eXukbqxtmsCkPqBc7TxskQIQXhBw5E/view?usp=sharing',
        external: true,
      },
    ],
  },
  {
    name: 'Data Desa',
    href: '/data-desa',
  },
  {
    name: 'Informasi Publik',
    href: '/informasi',
  },
  {
    name: 'PPID',
    href: '/ppid',
  },
  {
    name: 'Layanan',
    href: '/layanan',
  },
  {
    name: 'Lapak',
    href: '/umkm',
  },
  {
    name: 'Kontak',
    href: '/kontak',
  },
  {
    name: 'Desa Anti Korupsi',
    href: '/anti-korupsi',
  },
];

const marqueeContent = (
  <>
    <span>
      Selamat Datang di Portal Resmi Desa Keji
    </span>

    <span className="h-1 w-1 rounded-full bg-emerald-500" />

    <span>
      Makarti Nyawiji Mbangun Desa Keji
    </span>

    <span className="h-1 w-1 rounded-full bg-emerald-500" />

    <span>
      Keji Berani dan Anti Korupsi
    </span>

    <span className="h-1 w-1 rounded-full bg-emerald-500" />

    <span>
      Pelayanan Masyarakat 100% Gratis
    </span>
  </>
);

export default function Navbar() {


  return (
    <header className="sticky top-0 z-50 flex flex-col shadow-md">
      <style>{`
        @keyframes navbar-marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        .navbar-marquee-track {
          width: max-content;
          animation: navbar-marquee 34s linear infinite;
        }

        .navbar-marquee:hover
        .navbar-marquee-track {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .navbar-marquee-track {
            animation: none;
          }
        }
      `}</style>

      {/* HEADER IDENTITAS */}
      <div className="w-full overflow-hidden border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-[100rem] items-center justify-between gap-8 px-4 py-2 sm:px-6 lg:px-8">
          {/* Identitas Desa */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-3"
          >
            <img
              src="/logodesakeji.png"
              alt="Logo Desa Keji"
              className="h-12 w-10 object-contain transition-transform duration-300 group-hover:scale-105 lg:h-[52px] lg:w-11"
            />

            <div className="flex flex-col">
              <h1 className="text-sm font-extrabold tracking-tight text-emerald-800 md:text-base">
                Sistem Informasi Desa Keji
              </h1>

              <p className="text-[10px] font-bold text-emerald-600 lg:text-[11px]">
                Kec. Ungaran Barat, Kab. Semarang
              </p>
            </div>
          </Link>

          {/* Teks Berjalan */}
          <div className="navbar-marquee hidden max-w-3xl flex-1 items-center overflow-hidden border-l border-gray-100 pl-6 md:flex">
            <div className="relative w-full overflow-hidden py-2">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent" />

              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent" />

              <div className="navbar-marquee-track flex items-center">
                <div className="flex shrink-0 items-center gap-5 pr-16 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                  {marqueeContent}
                </div>

                <div
                  aria-hidden="true"
                  className="flex shrink-0 items-center gap-5 pr-16 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500"
                >
                  {marqueeContent}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NAVIGATION BAR */}
      <nav className="w-full bg-emerald-700 text-white">
        <div className="mx-auto flex h-11 max-w-[100rem] items-center justify-between md:h-12">
          {/* DESKTOP NAVIGATION */}
          <div className="hidden h-full w-full xl:flex xl:items-stretch">
            {/* Beranda */}
            <Link
              href="/"
              aria-label="Beranda"
              className={`flex shrink-0 items-center justify-center border-r border-emerald-600/50 px-5 transition-colors ${
                pathname === '/'
                  ? 'bg-emerald-900'
                  : 'bg-emerald-600 hover:bg-emerald-500'
              }`}
            >
              <Home
                size={16}
                strokeWidth={2.5}
              />
            </Link>


                    </div>
                  );
                }
              )}
            </div>

            {/* Login Admin */}
            <Link
              href="/login"
              className="flex shrink-0 items-center gap-2 whitespace-nowrap border-l border-emerald-600/50 bg-emerald-800 px-6 text-[13px] font-bold shadow-inner transition-colors hover:bg-emerald-950"
            >
              <LogIn
                size={16}
                strokeWidth={2.5}
              />

              Login Admin
            </Link>
          </div>

          {/* MOBILE HEADER */}
          <div className="flex h-full w-full items-center justify-between px-4 xl:hidden">
            <button
              type="button"
              onClick={() =>
                setIsOpen(
                  (current) =>
                    !current
                )
              }
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              className="flex items-center gap-2 text-sm font-bold"
            >
              <Menu size={18} />
              Menu Utama
            </button>

            <button
              type="button"
              aria-label={
                isOpen
                  ? 'Tutup menu'
                  : 'Buka menu'
              }
              onClick={() =>
                setIsOpen(
                  (current) =>
                    !current
                )
              }
              className="rounded-lg border border-white/10 bg-emerald-800 p-1.5 transition hover:bg-emerald-900"
            >
              {isOpen ? (
                <X size={18} />
              ) : (
                <ChevronDown
                  size={18}
                />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE NAVIGATION */}
        <div
          id="mobile-navigation"
          className={`overflow-y-auto bg-emerald-800 transition-all duration-300 ease-in-out xl:hidden ${
            isOpen
              ? 'max-h-[80vh] border-t border-emerald-600/50'
              : 'max-h-0'
          }`}
        >
          <div className="flex flex-col px-4 py-3">
            {/* Beranda */}
            <Link
              href="/"
              onClick={closeMobileMenu}
              className={`flex items-center justify-between border-b border-emerald-700/60 py-3 text-sm font-semibold ${
                pathname === '/'
                  ? 'text-emerald-200'
                  : 'text-white'
              }`}
            >
              <span className="flex items-center gap-3">
                <Home size={16} />
                Beranda
              </span>

              <ChevronRight
                size={14}
                className="opacity-40"
              />
            </Link>

                      </Link>
                    )}
                  </div>
                );
              }
            )}

            {/* Login Admin Mobile */}
            <Link
              href="/login"
              onClick={closeMobileMenu}
              className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-emerald-600/70 bg-emerald-900/50 px-4 py-3 text-sm font-bold text-emerald-100 transition hover:bg-emerald-900"
            >
              <LogIn size={16} />
              Login Admin
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}