import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Map, 
  Printer, 
  ClipboardList, 
  X,
  ChevronRight,
  Lock,
  Loader2,
  FileText,
  Route
} from "lucide-react";

const API_BASE = "https://script.google.com/macros/s/AKfycbyj-1nroXJU82TXfykW7dBJh8rCfLOKPWQqNLqr20JWVp1zm44VBnqft5xTlNdkIqeLSQ/exec";

export default function Sidebar({ open, setOpen, isAdminUnlocked, setIsAdminUnlocked }) {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const handleUnlockMenu = async () => {
    const pass = window.prompt("Masukkan password konfirmasi:");
    if (!pass) return;

    try {
      setIsLoading(true);
      const res = await fetch(`${API_BASE}?action=checkPassword&password=${encodeURIComponent(pass)}`);
      const data = await res.json();

      if (data.success) {
        setIsAdminUnlocked(true); // Ini akan mengupdate state di App.jsx
      } else {
        alert("Password salah!");
      }
    } catch (e) {
      alert("Gagal memverifikasi.");
    } finally {
      setIsLoading(false);
    }
  };

  const publicMenu = [
    { name: "Rekap Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Daftar Perjalanan", path: "/daftarperjalanan", icon: Map },
    { name: "Cetak Laporan", path: "/cetaklaporan", icon: Printer },
  ];

  const privateMenu = [
    { name: "Kelola Surat Tugas", path: "/kelolaSuratTugas", icon: FileText },
    { name: "Kelola Perjalanan", path: "/kelolaPerjalanan", icon: Route },
    { name: "Master Survey", path: "/daftarsurvey", icon: ClipboardList },
  ];

  // Helper untuk render item menu
  const renderLink = (item, isMobile) => {
    const Icon = item.icon;
    const isActive = location.pathname === item.path;
    return (
      <Link
        key={item.path}
        to={item.path}
        onClick={() => isMobile && setOpen(false)}
        className={`flex items-center justify-between px-4 py-3 rounded-xl mb-1 transition-all duration-200 group ${
          isActive
            ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
            : "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
        }`}
      >
        <div className="flex items-center gap-3">
          <Icon size={18} className={isActive ? "text-white" : "text-gray-500 group-hover:text-gray-300"} />
          <span className="text-sm font-medium">{item.name}</span>
        </div>
        {isActive && <ChevronRight size={14} className="opacity-50" />}
      </Link>
    );
  };

  const NavItems = ({ isMobile = false }) => (
    <nav className="mt-4 px-3">
      {/* Menu Publik */}
      {publicMenu.map((item) => renderLink(item, isMobile))}

      <div className="my-4 border-t border-gray-800/50" />

      {/* Logika Menu Terkunci */}
      {!isAdminUnlocked ? (
        <button
          onClick={handleUnlockMenu}
          disabled={isLoading}
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl mb-1 transition-all duration-200 group text-gray-400 hover:bg-gray-800 hover:text-gray-100"
        >
          <div className="flex items-center gap-3">
            {isLoading ? (
              <Loader2 size={18} className="animate-spin text-blue-500" />
            ) : (
              <Lock size={18} className="text-gray-500 group-hover:text-blue-400" />
            )}
            <span className="text-sm font-medium">
              {isLoading ? "Memverifikasi..." : "Kelola Survey"}
            </span>
          </div>
        </button>
      ) : (
        // Render menu privat jika sudah terbuka
        privateMenu.map((item) => renderLink(item, isMobile))
      )}
    </nav>
  );

  return (
    <>
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-gray-950 text-white h-screen fixed border-r border-gray-800 shadow-2xl">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xl font-bold tracking-tight">Laporan <span className="text-blue-500">Translok</span></span>
          </div>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">BPS Kabupaten Boyolali</p>
        </div>
        
        <NavItems />

        <div className="mt-auto p-6 border-t border-gray-900">
          <div className="bg-gray-900/50 p-4 rounded-2xl border border-gray-800">
            <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Status Database</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-gray-300">Terhubung</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Sidebar Mobile */}
      <div className={`fixed inset-0 z-[100] md:hidden transition-all duration-500 ${open ? "visible" : "invisible"}`}>
        <div
          className={`absolute inset-0 bg-gray-950/60 backdrop-blur-sm transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpen(false)}
        />
        <aside className={`relative w-72 bg-gray-950 text-white h-full shadow-2xl transition-transform duration-300 ease-out ${open ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="p-6 flex justify-between items-center border-b border-gray-900">
            <div>
              <span className="text-lg font-bold">Laporan <span className="text-blue-500">Translok</span></span>
              <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">BPS Kabupaten Boyolali</p>
            </div>
            <button className="p-2 bg-gray-900 rounded-full text-gray-400 hover:text-white" onClick={() => setOpen(false)}>
              <X size={20} />
            </button>
          </div>
          <NavItems isMobile />
        </aside>
      </div>
    </>
  );
}