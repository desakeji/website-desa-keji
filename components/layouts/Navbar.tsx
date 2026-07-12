// components/layouts/Navbar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Home, ChevronDown, LogIn, ChevronRight } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navItems = [
    { 
      name: 'Profil', 
      href: '#', 
      subItems: [
        { name: 'Sejarah Desa', href: '/profil/sejarah' },
        { name: 'Visi - Misi', href: '/profil/visi-misi' },
        { name: 'Profil Desa', href: '/profil/data' },
        { name: 'Peta Desa', href: '/peta' },
      ]
    },
    {
      name: 'Pemerintah Desa',
      href: '#',
      subItems: [
        { name: 'SOTK Pemerintah Desa', href: '/pemerintahan'},
        { name: 'RPJMDes 2020–2028', href: 'https://drive.google.com/file/d/144eXukbqxtmsCkPqBc7TxskQIQXhBw5E/view?usp=sharing'},
        { name: 'Absensi', href: '#' },
      ],
    },
    { name: 'Data Desa', href: '/data-desa', subItems: [] },
    { name: 'Informasi Publik', href: '/informasi', subItems: [] },
    { name: 'PPID', 
      href: '#',
      subItems: [
        { name: 'Apa itu PPID', href: '/ppid/apa-itu-ppid' },
        { name: 'Profil PPID', href: '/ppid/profil' },
        { name: 'Klasifikasi Informasi', href: '/ppid/klasifikasi-informasi'},
        { name: 'Permohonan Informasi Publik', href: '/ppid/permohonan-informasi' },
        { name: 'Pengajuan Keberatan Informasi', href: '/ppid/pengajuan-keberatan' },
      ],
    },
    { name: 'Layanan', href: '/layanan', subItems: [] },
    { name: 'Lapak', href: '/umkm' },
    { name: 'Kontak', href: '/kontak', subItems: [] },
    { name: 'Desa Anti Korupsi', href: '/anti-korupsi', subItems: [] },
  ];

  return (
    <header className="sticky top-0 z-50 flex flex-col shadow-md">
      
      {/* TINGKAT 1: Header Putih */}
      <div className="bg-white w-full border-b border-gray-100 overflow-hidden">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-8">
          
          {/* Identitas Desa */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <img 
              src="/logodesakeji.png" 
              alt="Logo Desa Keji" 
              className="w-10 h-12 lg:w-11 lg:h-13 object-contain" 
            />
            <div className="flex flex-col">
              <h1 className="text-sm md:text-base font-extrabold text-emerald-800 tracking-tight">
                Sistem Informasi Desa Keji
              </h1>
              <p className="text-[10px] lg:text-[11px] font-bold text-emerald-600">
                Kec. Ungaran Barat Kab. Semarang
              </p>
            </div>
          </Link>

          {/* Teks Berjalan (Sangat Kecil & Tanpa Ikon/Tanda Seru) */}
          <div className="hidden md:flex flex-1 items-center overflow-hidden max-w-2xl border-l border-gray-100 pl-6">
             <style dangerouslySetInnerHTML={{__html: `
                @keyframes header-scroll {
                  0% { transform: translateX(100%); }
                  100% { transform: translateX(-100%); }
                }
                .animate-header-scroll {
                  display: inline-block;
                  animation: header-scroll 25s linear infinite;
                  white-space: nowrap;
                }
             `}} />
             
             <div className="overflow-hidden w-full relative">
                <div className="animate-header-scroll text-[10px] font-medium text-gray-500 tracking-wide">
                  Selamat Datang di Portal Resmi Desa Keji • Makarti Nyawiji Mbangun Desa Keji • Keji Berani (Keji Anti Korupsi) • Gunakan Layanan Mandiri untuk Pengurusan Surat Online • Pelayanan 100% Gratis Tanpa Pungutan Biaya
                </div>
             </div>
          </div>

        </div>
      </div>

      {/* TINGKAT 2: Navigation Bar (Hijau Emerald) */}
      <nav className="bg-emerald-700 text-white w-full">
        <div className="max-w-[100rem] mx-auto flex items-center justify-between h-11 md:h-12">
          
          <div className="hidden xl:flex items-stretch h-full w-full">
            {/* Tombol Home */}
            <Link 
              href="/" 
              className="bg-emerald-600 hover:bg-emerald-500 px-5 transition-colors flex items-center justify-center shrink-0 border-r border-emerald-600/50"
            >
              <Home size={16} strokeWidth={2.5} />
            </Link>

            {/* Deretan Menu */}
            <div className="flex flex-1">
              {navItems.map((item) => (
                <div key={item.name} className="relative group flex">
                  <Link 
                    href={item.href} 
                    className="px-4 hover:bg-emerald-800 transition-colors flex items-center gap-1.5 text-[13px] font-medium whitespace-nowrap"
                  >
                    {item.name}
                    {item.subItems && item.subItems.length > 0 && <ChevronDown size={14} strokeWidth={3} className="opacity-70 group-hover:rotate-180 transition-transform duration-300" />}
                  </Link>

                  {item.subItems && item.subItems.length > 0 && (
                    <div className={`absolute top-full left-0 z-50 bg-emerald-800 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top border-t-2 border-emerald-500 ${
                        item.name === 'PPID'
                          ? 'min-w-[290px]'
                          : 'min-w-[200px]'}`}>
                      <div className="py-1 flex flex-col">
                        {item.subItems.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            target={sub.href.startsWith('http') ? '_blank' : undefined}
                            rel={
                              sub.href.startsWith('http')
                                ? 'noopener noreferrer'
                                : undefined
                            }
                            className="px-5 py-2.5 hover:bg-emerald-700 text-[13px] font-medium transition-colors flex items-center justify-between group/sub"
                          >
                            {sub.name}

                            <ChevronRight
                              size={14}
                              className="opacity-0 group-hover/sub:opacity-100 transition-opacity transform -translate-x-2 group-hover/sub:translate-x-0"
                            />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Tombol Login Admin */}
            <Link 
              href="/login" 
              className="px-6 bg-emerald-800 hover:bg-emerald-900 transition-colors font-bold flex items-center gap-2 whitespace-nowrap border-l border-emerald-600/50 text-[13px] shadow-inner"
            >
              <LogIn size={16} strokeWidth={2.5} /> Login Admin
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="xl:hidden flex items-center justify-between w-full px-4 h-full">
            <div className="flex items-center gap-2 font-bold text-sm">
              <Menu size={18} /> Menu Utama
            </div>
            <button onClick={() => setIsOpen(!isOpen)} className="p-1 bg-emerald-800 rounded">
              {isOpen ? <X size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <div className={`xl:hidden overflow-y-auto transition-all duration-300 ease-in-out bg-emerald-800 ${isOpen ? 'max-h-[80vh] border-t border-emerald-600/50' : 'max-h-0'}`}>
          <div className="px-4 py-3 flex flex-col">
            <Link href="/" onClick={() => setIsOpen(false)} className="py-3 border-b border-emerald-700/50 flex items-center gap-3 font-semibold text-sm">
              <Home size={16} /> Beranda
            </Link>
            {navItems.map((item) => (
              <div key={item.name} className="flex flex-col border-b border-emerald-700/50">
                <button onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)} className="py-3 flex items-center justify-between text-sm font-semibold w-full">
                  {item.name}
                  {item.subItems && item.subItems.length > 0 && <ChevronDown size={14} className={openDropdown === item.name ? 'rotate-180' : 'opacity-50'} />}
                </button>
                {item.subItems && item.subItems.length > 0 && openDropdown === item.name && (
                  <div className="bg-emerald-900/40 rounded-lg mb-2 flex flex-col">
                    {item.subItems.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        target={sub.href.startsWith('http') ? '_blank' : undefined}
                        rel={
                          sub.href.startsWith('http')
                            ? 'noopener noreferrer'
                            : undefined
                        }
                        onClick={() => setIsOpen(false)}
                        className="py-2.5 px-4 text-xs font-medium flex items-center gap-2"
                      >
                        <ChevronRight size={12} className="opacity-50" />
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link href="/login" onClick={() => setIsOpen(false)} className="py-4 text-emerald-200 font-bold text-sm flex items-center gap-2 justify-center mt-2">
              <LogIn size={16} /> Login Admin
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}