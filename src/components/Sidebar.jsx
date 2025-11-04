import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ open, setOpen }) {
  const location = useLocation();

  const menu = [
    { name: "Rekap", path: "/" },
    { name: "Daftar Perjalanan", path: "/daftarperjalanan" },
    { name: "Cetak Laporan", path: "/cetaklaporan" },
    { name: "Daftar Survey", path: "/daftarsurvey" },
  ];

  return (
    <>
      {/* 🔹 Sidebar untuk desktop */}
      <aside className="hidden md:block w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white h-screen fixed shadow-xl">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          Laporan Translok
        </div>
        <nav className="mt-6">
          <ul>
            {menu.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`block px-4 py-3 rounded-lg mx-2 mb-2 transition-all ${
                    location.pathname === item.path
                      ? "bg-gray-700 font-semibold"
                      : "hover:bg-gray-700"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* 🔹 Sidebar untuk HP (slide-in) */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Overlay gelap */}
        <div
          className={`absolute inset-0 bg-black bg-opacity-50 transition-opacity ${
            open ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setOpen(false)}
        ></div>

        {/* Panel sidebar */}
        <aside className="relative w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white h-full shadow-xl">
          <div className="p-4 text-xl font-bold border-b border-gray-700 flex justify-between items-center">
            Laporan Translok
            <button
              className="text-gray-300 hover:text-white text-2xl"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </div>
          <nav className="mt-6">
            <ul>
              {menu.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={`block px-4 py-3 rounded-lg mx-2 mb-2 transition-all ${
                      location.pathname === item.path
                        ? "bg-gray-700 font-semibold"
                        : "hover:bg-gray-700"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>
    </>
  );
}
