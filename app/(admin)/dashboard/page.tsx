export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Selamat Datang di Dasbor Desa!</h1>
      
      {/* Grid untuk Kartu Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-gray-500 text-sm font-medium">Total Berita</h3>
          <p className="text-3xl font-bold text-emerald-600 mt-2">12</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-gray-500 text-sm font-medium">Data UMKM</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">8</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-gray-500 text-sm font-medium">Agenda Mendatang</h3>
          <p className="text-3xl font-bold text-orange-600 mt-2">3</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Panduan Penggunaan</h2>
        <p className="text-gray-600 mb-2">
          Gunakan menu di sebelah kiri untuk menambah, mengubah, atau menghapus data yang ada di website utama Desa Keji.
        </p>
      </div>
    </div>
  );
}