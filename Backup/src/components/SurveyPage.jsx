import { useEffect, useState } from "react";

// ID Spreadsheet & nama sheet
const SPREADSHEET_ID = "10hx-OuCyjml7ugrdAdnasKQY0tPyVU8YOvzXfuB1nsQ";
const SHEET_NAME = "Sheet1";

// URL Google Apps Script Web App
const API_BASE =
  "https://script.google.com/macros/s/AKfycbwCzub4GeZaAq20i7xSsqj3m5RXxBo78aE6L5xrP7c2N1wBMf4b_34cvKaDB_Tnc1RJWw/exec";

function SurveyPage() {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newSurvey, setNewSurvey] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const showAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => setAlertMessage(""), 3000);
  };

  const fetchSurveys = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}?action=getSurveys`);
      const data = await res.json();
      setSurveys(data);
    } catch (err) {
      console.error("Gagal ambil daftar survei:", err);
      showAlert("Gagal memuat daftar survei");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSurveys();
  }, []);

  const checkPassword = async () => {
    const userInput = window.prompt("Masukkan password:");
    if (!userInput) return false;

    try {
      const res = await fetch(`${API_BASE}?action=getPassword`);
      const data = await res.json();
      if (userInput === data.password) return true;
      showAlert("Password salah!");
      return false;
    } catch (err) {
      console.error("Gagal ambil password:", err);
      showAlert("Gagal memverifikasi password");
      return false;
    }
  };

  const addSurvey = async () => {
    if (!newSurvey.trim()) {
      showAlert("Nama survei tidak boleh kosong!");
      return;
    }

    const isPass = await checkPassword();
    if (!isPass) return;

    setLoading(true);
    try {
      const res = await fetch(
        `${API_BASE}?action=addSurvey&name=${encodeURIComponent(newSurvey)}`
      );
      const data = await res.json();
      if (data.success) {
        setNewSurvey("");
        fetchSurveys();
      } else showAlert("Gagal menambahkan survei");
    } catch (err) {
      console.error("Gagal menambahkan survei:", err);
      showAlert("Terjadi kesalahan, silakan coba lagi");
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (rowIndex) => {
    const isPass = await checkPassword();
    if (!isPass) return;

    const survey = surveys[rowIndex];
    const newStatus = survey.Status === "Aktif" ? "Non Aktif" : "Aktif";

    setLoading(true);
    try {
      const res = await fetch(
        `${API_BASE}?action=updateStatus&row=${rowIndex + 2}&status=${newStatus}`
      );
      const data = await res.json();
      if (data.success) {
        const updated = [...surveys];
        updated[rowIndex].Status = newStatus;
        setSurveys(updated);
      } else showAlert("Gagal update status");
    } catch (err) {
      console.error("Gagal update status:", err);
      showAlert("Terjadi kesalahan saat update status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 relative">
      <h1 className="text-xl font-bold mb-4">Daftar Survei</h1>

      {alertMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-red-500 text-white px-6 py-4 rounded shadow-lg pointer-events-auto animate-fade-in">
            {alertMessage}
          </div>
        </div>
      )}

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Nama survei baru..."
          value={newSurvey}
          onChange={(e) => setNewSurvey(e.target.value)}
          className="border rounded p-2 flex-1"
        />
        <button
          onClick={addSurvey}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 relative"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
          ) : (
            "Tambah"
          )}
        </button>
      </div>

      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center z-10">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <table className="table-auto w-full border-collapse text-sm relative z-0">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Nama Survei</th>
            <th className="border p-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {surveys.map((survey, i) => {
            const isActive = survey.Status === "Aktif";
            return (
              <tr key={i} className="hover:bg-gray-50">
                <td className="border p-2">{survey["Nama Survei"]}</td>
                <td className="border p-2 flex items-center gap-2">
                  <label className="inline-flex relative items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isActive}
                      className="sr-only peer"
                      onChange={() => toggleStatus(i)}
                    />
                    <div className={`w-14 h-7 rounded-full relative transition-colors ${isActive ? 'bg-blue-600' : 'bg-gray-400'}`}>
                      <span className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${isActive ? 'left-0.5' : 'right-0.5'}`}></span>
                    </div>
                  </label>
                  <span className="text-sm font-medium">{isActive ? "Aktif" : "Non Aktif"}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default SurveyPage;
