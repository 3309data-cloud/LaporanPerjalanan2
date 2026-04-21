import { useLocation } from "react-router-dom";
import { Menu, Bell, UserCircle } from "lucide-react";

export default function Navbar({ toggleSidebar }) {
  const location = useLocation();

  // Map path ke judul (bisa dipindah ke file constants jika sudah banyak)
  const titleMap = {
    "/": "Dashboard Rekap",
    "/daftarperjalanan": "Daftar Perjalanan Dinas",
    "/cetaklaporan": "Review & Cetak Laporan",
    "/daftarsurvey": "Manajemen Master Survey",
  };

  // Cari judul berdasarkan pathname, fallback ke "Rekap"
  const currentTitle = titleMap[location.pathname];

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 h-16 sticky top-0 z-[50] flex items-center justify-between px-4 md:px-8">
      
      <div className="flex items-center">
        {/* Tombol hamburger: Animasi hover & focus yang lebih halus */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 -ml-2 mr-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 outline-none"
          aria-label="Open Menu"
        >
          <Menu size={20} />
        </button>

        {/* Judul dengan transisi halus saat pindah halaman */}
        <div className="flex flex-col">
          <h1 className="text-sm md:text-lg font-extrabold text-gray-800 tracking-tight leading-none">
            {currentTitle}
          </h1>
        </div>
      </div>

      {/* Bagian Kanan: Status & Profil (Opsional tapi mempercantik UI) */}
      <div className="flex items-center gap-2 md:gap-4">


      </div>
    </header>
  );
}