import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/RekapPage";
import Charts from "./pages/Charts";
import Tables from "./pages/ListPage";
import ReportPage from "./pages/ReportPage";
import SurveyPage from "./pages/SurveyPage";
import KelolaPerjalanan from "./pages/KelolaPerjalanan";
import { useState } from "react";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex bg-gray-100 min-h-screen">
        {/* Sidebar */}
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

        {/* Main Content */}
        <div
          className={`flex-1 flex flex-col transition-all duration-300
            ${sidebarOpen ? "ml-0" : "ml-0"} 
            md:ml-64
          `}
        >
          {/* ✅ Navbar dibuat sticky agar tidak ikut scroll */}
          <div className="sticky top-0 z-40 bg-white shadow">
            <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          </div>

          {/* Main area */}
          <main className="p-4 md:p-6 space-y-4 md:space-y-6 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/charts" element={<Charts />} />
              <Route path="/daftarperjalanan" element={<Tables />} />
              <Route path="/cetaklaporan" element={<ReportPage />} />
              <Route path="/daftarsurvey" element={<SurveyPage />} />
              <Route path="/kelolaPerjalanan" element={<KelolaPerjalanan />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
