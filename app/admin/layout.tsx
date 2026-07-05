// app/admin/layout.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Newspaper, 
  FileText, 
  Settings, 
  LogOut,
  Menu,
  X,
  UserCircle
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Daftar Menu Navigasi Admin
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { name: 'Kelola Berita', icon: Newspaper, href: '/admin/berita' },
    { name: 'Permohonan Layanan', icon: FileText, href: '/admin/layanan' },
    { name: 'Pengaturan', icon: Settings, href: '/admin/pengaturan' },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex overflow-hidden">
      
      {/* Overlay untuk mobile saat sidebar terbuka */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-emerald-800 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto flex flex-col shadow-xl
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header Sidebar (Logo) */}
        <div className="flex items-center justify-between p-4 bg-emerald-900 border-b border-emerald-700/50 h-16 shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1 rounded">
              <img src="/logodesakeji.png" alt="Logo" className="w-6 h-7 object-contain" />
            </div>
            <span className="font-extrabold text-sm uppercase tracking-wider">Admin Panel</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-1 bg-emerald-800 rounded text-emerald-100">
            <X size={20} />
          </button>
        </div>

        {/* Menu Navigasi */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm
                  ${isActive 
                    ? 'bg-emerald-600 text-white shadow-md' 
                    : 'text-emerald-100 hover:bg-emerald-700 hover:text-white'
                  }
                `}
              >
                <item.icon size={18} className={isActive ? 'text-white' : 'text-emerald-300'} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer Sidebar (Logout) */}
        <div className="p-4 bg-emerald-900/50 border-t border-emerald-700/50 shrink-0">
          <Link 
            href="/login" 
            className="flex items-center gap-3 px-4 py-3 text-red-300 hover:bg-red-500 hover:text-white rounded-xl transition-all font-bold text-sm"
          >
            <LogOut size={18} /> Keluar
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* Top Header */}
        <header className="bg-white h-16 shadow-sm border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 shrink-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-lg bg-emerald-50 text-emerald-700 lg:hidden hover:bg-emerald-100 transition-colors"
            >
              <Menu size={20} />
            </button>
            <h2 className="hidden sm:block text-lg font-bold text-gray-800">Sistem Informasi Desa Keji</h2>
          </div>

          {/* Profil Admin */}
          <div className="flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-full border border-gray-200">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-gray-800">Bpk. Siswanto</p>
              <p className="text-[10px] font-semibold text-emerald-600 uppercase">Kepala Desa</p>
            </div>
            <UserCircle size={28} className="text-emerald-700" strokeWidth={1.5} />
          </div>
        </header>

        {/* Area Konten Dinamis */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 relative">
          {children}
        </main>

      </div>
    </div>
  );
}