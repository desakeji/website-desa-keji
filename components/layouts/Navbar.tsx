// components/layouts/Navbar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Home, ChevronDown, LogIn } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Struktur menu
  const navItems = [
    { name: 'Profil', href: '/profil', hasDropdown: true },
    { name: 'Pemerintah Desa', href: '/pemerintahan', hasDropdown: true },
    { name: 'Data Desa', href: '/data-desa', hasDropdown: true },
    { name: 'Informasi Publik', href: '/informasi', hasDropdown: true },
    { name: 'PPID', href: '/ppid', hasDropdown: true },
    { name: 'Layanan', href: '/layanan', hasDropdown: true },
    { name: 'Lapak', href: '/umkm', hasDropdown: false },
    { name: 'Kontak', href: '/kontak', hasDropdown: true },
    { name: 'Desa Anti Korupsi', href: '/anti-korupsi', hasDropdown: true },
  ];

  return (
    <nav className="bg-emerald-700 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-[100rem] mx-auto flex items-center justify-between h-14 md:h-16">
        
        {/* KIRI: Logo & Nama Desa Terintegrasi (Tanpa Lingkaran Putih) */}
        <Link href="/" className="flex items-center gap-3 px-4 shrink-0 hover:opacity-90 transition-opacity">
          <img 
            src="/logodesakeji.png" 
            alt="Logo Desa Keji" 
            className="h-8 md:h-10 w-auto object-contain rounded-sm" 
          />
          <span className="font-extrabold text-sm md:text-base tracking-widest whitespace-nowrap uppercase">
            Desa Keji
          </span>
        </Link>

        {/* TENGAH: Menu Desktop */}
        <div className="hidden xl:flex items-stretch h-full flex-1 justify-end">
          
          {/* Tombol Home */}
          <Link 
            href="/" 
            className="bg-emerald-600 hover:bg-emerald-500 px-4 transition-colors flex items-center justify-center shrink-0 border-x border-emerald-600/50"
            title="Beranda"
          >
            <Home size={18} strokeWidth={2.5} />
          </Link>

          {/* Deretan Menu */}
          {navItems.map((item) => (
            <div key={item.name} className="relative group flex">
              <Link 
                href={item.href} 
                className="px-3 hover:bg-emerald-800 transition-colors flex items-center gap-1.5 text-[13px] 2xl:text-sm font-medium whitespace-nowrap"
              >
                {item.name}
                {item.hasDropdown && <ChevronDown size={14} strokeWidth={3} className="opacity-70" />}
              </Link>
            </div>
          ))}
        </div>

        {/* KANAN: Tombol Login Desktop */}
        <div className="hidden xl:flex items-stretch h-full shrink-0">
          <Link 
            href="/login" 
            className="px-5 bg-emerald-800 hover:bg-emerald-900 transition-colors font-bold flex items-center gap-2 whitespace-nowrap border-l border-emerald-600/50 text-sm shadow-inner"
          >
            Login Admin <LogIn size={16} strokeWidth={2.5} />
          </Link>
        </div>

        {/* TOMBOL MENU MOBILE */}
        <div className="xl:hidden flex items-center px-4 h-full">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="p-2 bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors flex items-center gap-2 text-sm font-bold border border-emerald-600"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />} 
            <span className="hidden sm:block">Menu</span>
          </button>
        </div>

      </div>

      {/* DROPDOWN MENU MOBILE */}
      <div className={`xl:hidden overflow-hidden transition-all duration-300 ease-in-out bg-emerald-800 ${isOpen ? 'max-h-[700px] border-t border-emerald-600/50' : 'max-h-0'}`}>
        <div className="px-4 py-3 flex flex-col">
          <Link href="/" className="py-3 border-b border-emerald-700/50 flex items-center gap-3 font-semibold">
            <Home size={18} /> Beranda
          </Link>
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="py-3 border-b border-emerald-700/50 flex items-center justify-between text-sm font-medium">
              {item.name}
              {item.hasDropdown && <ChevronDown size={16} className="opacity-50" />}
            </Link>
          ))}
          <Link href="/login" className="py-4 text-emerald-200 font-bold flex items-center gap-2 mt-3 bg-emerald-900/50 px-4 rounded-lg justify-center border border-emerald-700">
            <LogIn size={18} /> Login Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}