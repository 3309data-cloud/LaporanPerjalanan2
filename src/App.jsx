import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/RekapPage";
import Charts from "./pages/Charts";
import Tables from "./pages/ListPage";
import ReportPage from "./pages/ReportPage";
import SurveyPage from "./pages/SurveyPage";

function App() {
  return (
    <Router>
      <div className="flex bg-gray-100 min-h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="ml-64 flex-1 flex flex-col">
          <Navbar />
          <main className="p-6 space-y-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/charts" element={<Charts />} />
              <Route path="/daftarperjalanan" element={<Tables />} />
              <Route path="/cetaklaporan" element={<ReportPage />} />
              <Route path="/daftarsurvey" element={<SurveyPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}


export default App;
