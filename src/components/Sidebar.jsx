import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/" },
    { name: "Charts", path: "/charts" },
    { name: "Tables", path: "/tables" },
       { name: "Cetak Laporan", path: "/cetaklaporan" },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white h-screen fixed shadow-xl">
      <div className="p-4 text-2xl font-bold border-b border-gray-700">
        My Dashboard
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
  );
}
