import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/RekapPage";
import Charts from "./pages/Charts";
import Tables from "./pages/ListPage";
import ReportPage from "./pages/ReportPage";
import SurveyPage from "./pages/SurveyPage";
import KelolaPerjalanan from "./pages/KelolaPerjalanan";
import KelolaSuratTugas from "./pages/KelolaSuratTugas";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Pindahkan state password ke sini agar bisa dipakai di Routes dan Sidebar
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);

  // Komponen Helper untuk memproteksi halaman
  const ProtectedRoute = ({ children }) => {
    if (!isAdminUnlocked) {
      // Jika belum unlock, paksa pindah ke dashboard
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <Router>
      <div className="flex bg-gray-100 min-h-screen">
        {/* Kirim state dan setter ke Sidebar */}
        <Sidebar 
          open={sidebarOpen} 
          setOpen={setSidebarOpen} 
          isAdminUnlocked={isAdminUnlocked} 
          setIsAdminUnlocked={setIsAdminUnlocked} 
        />

        <div className={`flex-1 flex flex-col transition-all duration-300 md:ml-64`}>
          <div className="sticky top-0 z-40 bg-white shadow">
            <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          </div>

          <main className="p-4 md:p-6 space-y-4 md:space-y-6 overflow-y-auto">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/charts" element={<Charts />} />
              <Route path="/daftarperjalanan" element={<Tables />} />
              <Route path="/cetaklaporan" element={<ReportPage />} />

              {/* Protected Routes (Halaman yang dikunci) */}
              <Route 
                path="/daftarsurvey" 
                element={<ProtectedRoute><SurveyPage /></ProtectedRoute>} 
              />
              <Route 
                path="/kelolaPerjalanan" 
                element={<ProtectedRoute><KelolaPerjalanan /></ProtectedRoute>} 
              />
              <Route 
                path="/kelolaSuratTugas" 
                element={<ProtectedRoute><KelolaSuratTugas /></ProtectedRoute>} 
              />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;