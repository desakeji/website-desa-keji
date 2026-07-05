// app/(public)/peta/page.tsx
import { MapPin, ExternalLink } from 'lucide-react';

export default function PetaDesaPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
          
          {/* Header Judul */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 flex items-center gap-3">
              <div className="bg-emerald-100 p-2.5 rounded-xl text-emerald-600">
                <MapPin size={28} strokeWidth={2.5} />
              </div>
              Peta Wilayah Desa Keji
            </h1>
            
            <a 
              href="https://maps.app.goo.gl/FWsujCYUDPxpBd1n7" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              Buka di Aplikasi Maps <ExternalLink size={16} />
            </a>
          </div>

          {/* TAMPILAN KHUSUS IFRAME MAPS */}
          <div className="w-full bg-gray-200 rounded-xl overflow-hidden shadow-inner border border-gray-200 relative" style={{ height: '550px' }}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30104.871962527242!2d110.39033584095044!3d-7.126358155274365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708886a2357377%3A0x6a45c79e20536dbb!2sUngaran%20Barat%2C%20Kec.%20Ungaran%20Bar.%2C%20Kabupaten%20Semarang%2C%20Jawa%20Tengah!5e1!3m2!1sid!2sid!4v1783248516806!5m2!1sid!2sid" 
              className="w-full h-full absolute top-0 left-0" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta Interaktif Desa Keji"
            ></iframe>
          </div>

        </div>
      </div>
    </div>
  );
}