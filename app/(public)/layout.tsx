// app/(public)/layout.tsx
import Navbar from '@/components/layouts/Navbar';
import Footer from '@/components/layouts/Footer';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      {/* Konten Utama akan mengisi area kosong di tengah */}
      <main className="flex-grow">
        {children}
      </main>

      <Footer />
    </div>
  );
}