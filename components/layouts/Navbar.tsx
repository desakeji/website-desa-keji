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
  const pathname = usePathname();

  const [
    isOpen,
    setIsOpen,
  ] = useState(false);

  const [
    openDropdown,
    setOpenDropdown,
  ] = useState<string | null>(
    null
  );

  /*
   * Menutup menu mobile dan dropdown
   * ketika pengguna berpindah halaman.
   */
  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  function isPathActive(
    href: string
  ) {
    if (href === '/') {
      return pathname === '/';
    }

    return (
      pathname === href ||
      pathname.startsWith(
        `${href}/`
      )
    );
  }

  function isItemActive(
    item: NavItem
  ) {
    if (isPathActive(item.href)) {
      return true;
    }

    return (
      item.subItems?.some(
        (subItem) =>
          !subItem.external &&
          isPathActive(
            subItem.href
          )
      ) ?? false
    );
  }

  function toggleMobileDropdown(
    itemName: string
  ) {
    setOpenDropdown(
      (current) =>
        current === itemName
          ? null
          : itemName
    );
  }

  function closeMobileMenu() {
    setIsOpen(false);
    setOpenDropdown(null);
  }

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

            {/* Daftar Menu Desktop */}
            <div className="flex min-w-0 flex-1">
              {navItems.map(
                (item) => {
                  const hasSubItems =
                    Boolean(
                      item.subItems
                        ?.length
                    );

                  const active =
                    isItemActive(item);

                  return (
                    <div
                      key={item.name}
                      className="group/nav relative flex"
                    >
                      <Link
                        href={item.href}
                        className={`relative flex items-center gap-1.5 whitespace-nowrap px-4 text-[13px] font-semibold transition-colors ${
                          active
                            ? 'bg-emerald-900 text-white'
                            : 'text-emerald-50 hover:bg-emerald-800 hover:text-white'
                        }`}
                      >
                        {item.name}

                        {hasSubItems && (
                          <ChevronDown
                            size={14}
                            strokeWidth={
                              2.7
                            }
                            className="opacity-70 transition-transform duration-300 group-hover/nav:rotate-180 group-focus-within/nav:rotate-180"
                          />
                        )}

                        {active && (
                          <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-emerald-300" />
                        )}
                      </Link>

                      {/* Dropdown Desktop */}
                      {hasSubItems && (
                        <div className="invisible absolute left-0 top-full z-50 min-w-[230px] translate-y-2 border-t-2 border-emerald-400 bg-emerald-900 opacity-0 shadow-2xl transition-all duration-200 group-hover/nav:visible group-hover/nav:translate-y-0 group-hover/nav:opacity-100 group-focus-within/nav:visible group-focus-within/nav:translate-y-0 group-focus-within/nav:opacity-100">
                          <div className="flex flex-col py-1.5">
                            {item.subItems?.map(
                              (
                                subItem
                              ) => {
                                const subActive =
                                  !subItem.external &&
                                  isPathActive(
                                    subItem.href
                                  );

                                if (
                                  subItem.external
                                ) {
                                  return (
                                    <a
                                      key={
                                        subItem.name
                                      }
                                      href={
                                        subItem.href
                                      }
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="group/sub flex items-center justify-between gap-4 px-5 py-3 text-[13px] font-medium text-emerald-50/90 transition-colors hover:bg-emerald-700 hover:text-white"
                                    >
                                      <span>
                                        {
                                          subItem.name
                                        }
                                      </span>

                                      <ChevronRight
                                        size={
                                          14
                                        }
                                        className="-translate-x-1 opacity-0 transition-all group-hover/sub:translate-x-0 group-hover/sub:opacity-100"
                                      />
                                    </a>
                                  );
                                }

                                return (
                                  <Link
                                    key={
                                      subItem.name
                                    }
                                    href={
                                      subItem.href
                                    }
                                    className={`group/sub flex items-center justify-between gap-4 px-5 py-3 text-[13px] font-medium transition-colors ${
                                      subActive
                                        ? 'bg-emerald-700 text-white'
                                        : 'text-emerald-50/90 hover:bg-emerald-700 hover:text-white'
                                    }`}
                                  >
                                    <span>
                                      {
                                        subItem.name
                                      }
                                    </span>

                                    <ChevronRight
                                      size={
                                        14
                                      }
                                      className={`transition-all ${
                                        subActive
                                          ? 'translate-x-0 opacity-100'
                                          : '-translate-x-1 opacity-0 group-hover/sub:translate-x-0 group-hover/sub:opacity-100'
                                      }`}
                                    />
                                  </Link>
                                );
                              }
                            )}
                          </div>
                        </div>
                      )}
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

            {/* Daftar Menu Mobile */}
            {navItems.map(
              (item) => {
                const hasSubItems =
                  Boolean(
                    item.subItems
                      ?.length
                  );

                const active =
                  isItemActive(item);

                const isDropdownOpen =
                  openDropdown ===
                  item.name;

                return (
                  <div
                    key={item.name}
                    className="flex flex-col border-b border-emerald-700/60"
                  >
                    {hasSubItems ? (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            toggleMobileDropdown(
                              item.name
                            )
                          }
                          aria-expanded={
                            isDropdownOpen
                          }
                          className={`flex w-full items-center justify-between py-3 text-left text-sm font-semibold transition ${
                            active
                              ? 'text-emerald-200'
                              : 'text-white hover:text-emerald-200'
                          }`}
                        >
                          <span>
                            {
                              item.name
                            }
                          </span>

                          <ChevronDown
                            size={14}
                            className={`transition-transform duration-200 ${
                              isDropdownOpen
                                ? 'rotate-180'
                                : 'opacity-50'
                            }`}
                          />
                        </button>

                        <div
                          className={`grid transition-all duration-200 ${
                            isDropdownOpen
                              ? 'grid-rows-[1fr] pb-2'
                              : 'grid-rows-[0fr]'
                          }`}
                        >
                          <div className="overflow-hidden">
                            <div className="flex flex-col overflow-hidden rounded-lg bg-emerald-950/40">
                              {item.subItems?.map(
                                (
                                  subItem
                                ) => {
                                  const subActive =
                                    !subItem.external &&
                                    isPathActive(
                                      subItem.href
                                    );

                                  if (
                                    subItem.external
                                  ) {
                                    return (
                                      <a
                                        key={
                                          subItem.name
                                        }
                                        href={
                                          subItem.href
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={
                                          closeMobileMenu
                                        }
                                        className="flex items-center gap-2 px-4 py-3 text-xs font-medium text-emerald-50/85 transition hover:bg-emerald-700/60 hover:text-white"
                                      >
                                        <ChevronRight
                                          size={
                                            12
                                          }
                                          className="opacity-50"
                                        />

                                        {
                                          subItem.name
                                        }
                                      </a>
                                    );
                                  }

                                  return (
                                    <Link
                                      key={
                                        subItem.name
                                      }
                                      href={
                                        subItem.href
                                      }
                                      onClick={
                                        closeMobileMenu
                                      }
                                      className={`flex items-center gap-2 px-4 py-3 text-xs font-medium transition ${
                                        subActive
                                          ? 'bg-emerald-700 text-white'
                                          : 'text-emerald-50/85 hover:bg-emerald-700/60 hover:text-white'
                                      }`}
                                    >
                                      <ChevronRight
                                        size={
                                          12
                                        }
                                        className="opacity-50"
                                      />

                                      {
                                        subItem.name
                                      }
                                    </Link>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <Link
                        href={
                          item.href
                        }
                        onClick={
                          closeMobileMenu
                        }
                        className={`flex w-full items-center justify-between py-3 text-sm font-semibold transition ${
                          active
                            ? 'text-emerald-200'
                            : 'text-white hover:text-emerald-200'
                        }`}
                      >
                        <span>
                          {
                            item.name
                          }
                        </span>

                        <ChevronRight
                          size={14}
                          className={
                            active
                              ? 'text-emerald-300'
                              : 'opacity-40'
                          }
                        />
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