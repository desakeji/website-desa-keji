import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Kiri - Tema Hijau Gelap */}
      <aside className="w-64 bg-emerald-950 text-white flex flex-col shadow-xl z-10">
        <div className="p-6 text-center border-b border-emerald-800/50">
          <h1 className="font-bold text-2xl tracking-wider text-emerald-400">KEJI</h1>
          <p className="text-xs text-emerald-200/70 mt-1">Panel Administrasi</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/dashboard" className="block px-4 py-2 rounded-lg hover:bg-emerald-800 hover:text-white transition-all">
            Dashboard Utama
          </Link>
          <Link href="/dashboard/berita" className="block px-4 py-2 rounded-lg hover:bg-emerald-800 hover:text-white transition-all">
            Kelola Berita
          </Link>
          <Link href="/dashboard/umkm" className="block px-4 py-2 rounded-lg hover:bg-emerald-800 hover:text-white transition-all">
            Kelola UMKM
          </Link>
          <Link href="/dashboard/galeri" className="block px-4 py-2 rounded-lg hover:bg-emerald-800 hover:text-white transition-all">
            Kelola Galeri
          </Link>
        </nav>
        <div className="p-4 border-t border-emerald-800/50">
          <button className="w-full bg-red-500/90 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-semibold transition-all">
            Logout
          </button>
        </div>
      </aside>

      {/* Konten Utama (Sebelah Kanan) */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header Sederhana */}
        <header className="bg-white shadow-sm border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Sistem Informasi Desa</h2>
          <span className="text-sm bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-medium">Administrator</span>
        </header>
        
        {/* Area Konten Dinamis yang bisa di-scroll */}
        <div className="p-6 flex-1 overflow-y-auto bg-gray-50">
          {children}
        </div>
      </main>
    </div>
  );
}