import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Kiri */}
      <aside className="w-64 bg-slate-800 text-white flex flex-col">
        <div className="p-6 text-center font-bold text-xl border-b border-slate-700">
          Admin Desa Keji
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/dashboard" className="block px-4 py-2 rounded hover:bg-slate-700 transition">
            Dashboard Utama
          </Link>
          <Link href="/dashboard/berita" className="block px-4 py-2 rounded hover:bg-slate-700 transition">
            Kelola Berita
          </Link>
          <Link href="/dashboard/umkm" className="block px-4 py-2 rounded hover:bg-slate-700 transition">
            Kelola UMKM
          </Link>
          <Link href="/dashboard/galeri" className="block px-4 py-2 rounded hover:bg-slate-700 transition">
            Kelola Galeri
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-700">
          <button className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm font-semibold transition">
            Logout
          </button>
        </div>
      </aside>

      {/* Konten Utama (Sebelah Kanan) */}
      <main className="flex-1">
        {/* Header Sederhana */}
        <header className="bg-white shadow-sm p-4">
          <h2 className="text-xl font-semibold text-gray-800">Panel Administrasi</h2>
        </header>
        
        {/* Area Konten Dinamis */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}