import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Map, 
  Printer, 
  ClipboardList, 
  X,
  ChevronRight
} from "lucide-react";

export default function Sidebar({ open, setOpen }) {
  const location = useLocation();

  const menu = [
    { name: "Rekap Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Daftar Perjalanan", path: "/daftarperjalanan", icon: Map },
    { name: "Cetak Laporan", path: "/cetaklaporan", icon: Printer },
        { name: "Cetak SPD Belakang", path: "/kelolaPerjalanan", icon: Printer },
    { name: "Master Survey", path: "/daftarsurvey", icon: ClipboardList },

  ];

  // Komponen Navigasi Reusable
  const NavItems = ({ isMobile = false }) => (
    <nav className="mt-4 px-3">
      {menu.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;
        
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
      })}
    </nav>
  );

  return (
    <>
      {/* 🔹 Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-gray-950 text-white h-screen fixed border-r border-gray-800 shadow-2xl">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xl font-bold tracking-tight">Laporan <span className="text-blue-500">Translok</span></span>
          </div>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">BPS Kabupaten Boyolali</p>
        </div>
        
        <NavItems />

        {/* Footer Sidebar Desktop */}
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

      {/* 🔹 Sidebar Mobile */}
      <div className={`fixed inset-0 z-[100] md:hidden transition-all duration-500 ${open ? "visible" : "invisible"}`}>
        {/* Overlay dengan blur */}
        <div
          className={`absolute inset-0 bg-gray-950/60 backdrop-blur-sm transition-opacity duration-500 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />

        {/* Panel Sidebar Mobile */}
        <aside className={`relative w-72 bg-gray-950 text-white h-full shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}>
          <div className="p-6 flex justify-between items-center border-b border-gray-900">
            <div>
              <span className="text-lg font-bold">Laporan <span className="text-blue-500">Translok</span></span>
              <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">BPS Kabupaten Boyolali</p>
            </div>
            <button
              className="p-2 bg-gray-900 rounded-full text-gray-400 hover:text-white"
              onClick={() => setOpen(false)}
            >
              <X size={20} />
            </button>
          </div>
          
          <NavItems isMobile />
        </aside>
      </div>
    </>
  );
}