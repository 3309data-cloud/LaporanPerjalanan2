import { useEffect, useState, useMemo } from "react";

const API_BASE = "https://script.google.com/macros/s/AKfycbyj-1nroXJU82TXfykW7dBJh8rCfLOKPWQqNLqr20JWVp1zm44VBnqft5xTlNdkIqeLSQ/exec";

function SurveyPage() {
  // --- States: Data ---
  const [surveys, setSurveys] = useState([]);
  const [master, setMaster] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newSurvey, setNewSurvey] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  // --- States: Modal & Form ---
  const [showModal, setShowModal] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const [form, setForm] = useState({
    noSPD: "", program: "", kegiatan: "", komponen: "", tglKwitansi: "",
  });

  // --- Helpers: UI ---
  const showAlert = (msg) => {
    setAlertMessage(msg);
    setTimeout(() => setAlertMessage(""), 3000);
  };

  /** Proteksi Password untuk aksi krusial */
  const withPassword = async (callback) => {
    const pass = window.prompt("Masukkan password konfirmasi:");
    if (!pass) return;

    try {
      const res = await fetch(`${API_BASE}?action=checkPassword&password=${encodeURIComponent(pass)}`);
      const data = await res.json();
      if (data.success) {
        await callback();
      } else {
        showAlert("Password salah! Akses ditolak.");
      }
    } catch (e) {
      showAlert("Gagal memverifikasi password.");
    }
  };

  // --- Logic: API Calls ---
  const fetchSurveys = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}?action=getSurveys`);
      const data = await res.json();
      setSurveys(data.reverse());
    } finally {
      setLoading(false);
    }
  };

  const fetchMaster = async () => {
    const res = await fetch(`${API_BASE}?action=getMaster`);
    const data = await res.json();
    setMaster(data);
  };

  useEffect(() => {
    fetchSurveys();
    fetchMaster();
  }, []);

  // --- Logic: Cascading Data ---
  const { kegiatanList, komponenList } = useMemo(() => {
    const selectedP = master.find(p => p.nama === form.program);
    const kList = selectedP?.kegiatan || [];
    const selectedK = kList.find(k => k.nama === form.kegiatan);
    const cList = selectedK?.komponen || [];
    return { kegiatanList: kList, komponenList: cList };
  }, [form.program, form.kegiatan, master]);

  // --- Handlers: Survey Management ---
  const addSurvey = () => {
    if (!newSurvey.trim()) return showAlert("Nama survei tidak boleh kosong");
    withPassword(async () => {
      setLoading(true);
      await fetch(`${API_BASE}?action=addSurvey&name=${encodeURIComponent(newSurvey)}`);
      setNewSurvey("");
      await fetchSurveys();
    });
  };

  const toggleStatus = (index) => {
    const survey = surveys[index];
    withPassword(async () => {
      setLoading(true);
      const newStatus = survey.Status === "Aktif" ? "Non Aktif" : "Aktif";
      await fetch(`${API_BASE}?action=updateStatus&row=${survey.row}&status=${newStatus}`);
      await fetchSurveys();
    });
  };

  // --- Handlers: SPD Details ---
  const openSPD = async (rowId) => {
    // Bungkus dengan withPassword agar meminta password sebelum modal terbuka
    withPassword(async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}?action=getSurveyDetail&row=${rowId}`);
        const data = await res.json();

        if (data.success) {
          setForm({
            noSPD: data.data.noSPD || "",
            program: data.data.program || "",
            kegiatan: data.data.kegiatan || "",
            komponen: data.data.komponen || "",
            tglKwitansi: data.data.tglKwitansi || "",
          });
          setCurrentRow(rowId);
          setShowModal(true);
        }
      } catch (e) {
        showAlert("Gagal mengambil detail data dari server.");
      } finally {
        setLoading(false);
      }
    });
  };

  const saveSPD = async () => {
    setLoading(true);
    try {
      await fetch(API_BASE, {
        method: "POST",
        body: JSON.stringify({ action: "saveSPD", row: currentRow, ...form }),
      });
      setShowModal(false);
      await fetchSurveys();
    } finally {
      setLoading(false);
    }
  };

  const isSPDComplete = (s) => (s.noSPD && s.program && s.kegiatan && s.komponen && s.tglKwitansi);

  return (
    <div className="p-6 bg-gray-50 min-h-screen relative">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Manajemen Master Survei</h1>

      {/* ALERT OVERLAY */}
      {alertMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] animate-bounce">
          <div className="bg-red-600 text-white px-8 py-3 rounded-full shadow-2xl font-bold">
            ⚠️ {alertMessage}
          </div>
        </div>
      )}

      {/* INPUT ADD SURVEY */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border mb-6 flex gap-3">
        <input
          placeholder="Ketik Nama Survei Baru..."
          value={newSurvey}
          onChange={(e) => setNewSurvey(e.target.value)}
          className="flex-1 p-3 border-2 border-gray-100 rounded-xl focus:border-blue-500 outline-none transition"
        />
        <button
          onClick={addSurvey}
          className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition active:scale-95 shadow-lg shadow-blue-100"
        >
          Tambah Survei
        </button>
      </div>

      {/* SURVEY TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 font-bold uppercase text-[10px] tracking-wider">
            <tr>
              <th className="p-4">Nama Survei</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Detail SPD</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {surveys.map((survey, i) => {
              const isActive = survey.Status === "Aktif";
              return (
                <tr key={i} className="hover:bg-gray-50 transition">
                  <td className="p-4 font-medium text-gray-800">{survey["Nama Survei"]}</td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-start gap-3">
                      <button
                        onClick={() => toggleStatus(i)}
                        className={`w-12 h-6 rounded-full relative transition-all ${isActive ? 'bg-green-500' : 'bg-gray-300'}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isActive ? 'left-7' : 'left-1'}`} />
                      </button>
                      <span className={`text-[10px] font-bold ${isActive ? 'text-green-600' : 'text-gray-400'}`}>
                        {isActive ? "AKTIF" : "NON-AKTIF"}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => openSPD(survey.row)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${isSPDComplete(survey)
                          ? "bg-green-100 text-green-700 border border-green-200 hover:bg-green-600 hover:text-white"
                          : "bg-amber-100 text-amber-700 border border-amber-200 hover:bg-amber-600 hover:text-white"
                        }`}
                    >
                      {isSPDComplete(survey) ? "✓ DATA LENGKAP" : "⚠ LENGKAPI SPD"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MODAL SPD */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[90]">
          <div className="bg-white p-8 w-full max-w-2xl rounded-3xl shadow-2xl space-y-6 animate-popIn">
            <h2 className="text-xl font-bold text-gray-800 border-b pb-4">Detail SPD</h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Tgl Surat Tugas</label>
                <input
                  value={form.noSPD}
                  onChange={(e) => setForm({ ...form, noSPD: e.target.value })}
                  className="w-full p-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                  placeholder="Isikan tanggal Surat Tugas (contoh: 12 April 2026)"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Tgl Kwitansi</label>
                <input
                  value={form.tglKwitansi}
                  onChange={(e) => setForm({ ...form, tglKwitansi: e.target.value })}
                  className="w-full p-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                  placeholder="Isikan tanggal Kwitansi (contoh: 12 April 2026)"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Pilih Program</label>
                <select
                  value={form.program}
                  onChange={(e) => setForm({ ...form, program: e.target.value, kegiatan: "", komponen: "" })}
                  className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Pilih Program --</option>
                  {master.map((p, i) => <option key={i} value={p.nama}>{p.nama}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Pilih Kegiatan</label>
                <select
                  disabled={!form.program}
                  value={form.kegiatan}
                  onChange={(e) => setForm({ ...form, kegiatan: e.target.value, komponen: "" })}
                  className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  <option value="">-- Pilih Kegiatan --</option>
                  {kegiatanList.map((k, i) => <option key={i} value={k.nama}>{k.nama}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Pilih Komponen</label>
                <select
                  disabled={!form.kegiatan}
                  value={form.komponen}
                  onChange={(e) => setForm({ ...form, komponen: e.target.value })}
                  className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  <option value="">-- Pilih Komponen --</option>
                  {komponenList.map((k, i) => <option key={i} value={k}>{k}</option>)}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t">
              <button onClick={() => setShowModal(false)} className="px-6 py-2 text-gray-500 font-bold hover:bg-gray-100 rounded-xl transition">BATAL</button>
              <button
                onClick={saveSPD}
                className="bg-blue-600 text-white px-8 py-2 rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition active:scale-95"
              >
                SIMPAN DATA SPD
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GLOBAL LOADING SPINNER */}
      {loading && (
        <div className="fixed bottom-10 right-10 z-[100] flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-2xl border">
          <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">Sinkronisasi Server...</span>
        </div>
      )}
    </div>
  );
}

export default SurveyPage;