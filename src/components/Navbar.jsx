import { useLocation } from "react-router-dom";
import { Menu } from "lucide-react"; // pastikan sudah install: npm i lucide-react

export default function Navbar({ toggleSidebar }) {
  const location = useLocation();

  // Map path ke judul
  const titleMap = {
    "/": "Rekap",
    "/daftarperjalanan": "Daftar Perjalanan",
    "/cetaklaporan": "Cetak Laporan",
    "/daftarsurvey": "Daftar Survey",
  };

  const title = titleMap[location.pathname] || "Rekap";

  return (
    <header className="bg-white shadow-md h-16 flex items-center px-4 md:px-6">
      {/* Tombol hamburger hanya muncul di HP */}
      <button
        onClick={toggleSidebar}
        className="md:hidden mr-3 text-gray-600 hover:text-gray-900 focus:outline-none"
        aria-label="Toggle Sidebar"
      >
        <Menu size={24} />
      </button>

      <h1 className="text-lg md:text-xl font-bold text-gray-700 truncate">
        {title}
      </h1>
    </header>
  );
}
