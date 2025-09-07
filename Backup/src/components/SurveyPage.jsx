import { useEffect, useState } from "react";

// ID Spreadsheet & nama sheet
const SPREADSHEET_ID = "10hx-OuCyjml7ugrdAdnasKQY0tPyVU8YOvzXfuB1nsQ";
const SHEET_NAME = "Sheet1"; // sesuaikan nama sheet

// URL Google Apps Script Web App untuk fetch & update
const API_BASE = "https://script.google.com/macros/s/AKfycbwfQ5iNCPBlHl7razvuvwbZaAKwY2ns9LqiRfUwfWwkIewlNJdEYqYBW4omaOj24NBZZw/exec";

function SurveyPage() {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newSurvey, setNewSurvey] = useState("");

  // Ambil daftar survei dari Google Sheet
  const fetchSurveys = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}?action=getSurveys`);
      const data = await res.json();
      setSurveys(data);
    } catch (err) {
      console.error("Gagal ambil daftar survei:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSurveys();
  }, []);

  // Tambah survey baru
  const addSurvey = async () => {
    if (!newSurvey.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}?action=addSurvey&name=${encodeURIComponent(newSurvey)}`);
      const data = await res.json();
      if (data.success) {
        setNewSurvey("");
        fetchSurveys();
      } else {
        alert("Gagal menambahkan survei");
      }
    } catch (err) {
      console.error("Gagal menambahkan survei:", err);
    } finally {
      setLoading(false);
    }
  };

  // Toggle status Aktif / Non Aktif
  const toggleStatus = async (rowIndex) => {
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
      } else {
        alert("Gagal update status");
      }
    } catch (err) {
      console.error("Gagal update status:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Daftar Survei</h1>

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
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Tambah
        </button>
      </div>

      {loading && <p className="text-gray-500">Memuat...</p>}

      <table className="table-auto w-full border-collapse text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Nama Survei</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {surveys.map((survey, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="border p-2">{survey["Nama Survei"]}</td>
              <td className="border p-2">{survey.Status}</td>
              <td className="border p-2">
                <label className="inline-flex relative items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={survey.Status === "Aktif"}
                    className="sr-only peer"
                    onChange={() => toggleStatus(i)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SurveyPage;
