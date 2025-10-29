import { useLocation } from "react-router-dom";

export default function Navbar() {
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
    <header className="bg-white shadow-md h-16 flex items-center px-6">
      <h1 className="text-xl font-bold text-gray-700">{title}</h1>
    </header>
  );
}
