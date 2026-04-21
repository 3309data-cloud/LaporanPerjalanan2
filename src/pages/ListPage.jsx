import { useState, useMemo, useCallback } from "react";
import { useData } from "../context/DataContext";
import { printReport } from "../components/printReport";
import { updateSheet } from "../utils/updateSheet";
import { getPrintAvailability, needNoST } from "../utils/printEngine";
import { saveNoST } from "../api/noSTService";
import PrintOptionModal from "../components/PrintOptionModal";

function ReportTable() {
  const { data, refreshData, loading: loadingData } = useData();

  // --- States: Printing ---
  const [printModal, setPrintModal] = useState(false);
  const [rowToPrint, setRowToPrint] = useState(null);
  const [printOption, setPrintOption] = useState({
    SPD: true, OLD: true, Kwitansi: true, Riil: true, Randis: true,
  });

  // --- States: UI & Status ---
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ survei: "", kegiatan: "", nama: "", tujuan: "", tanggal: "" });
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [localStatus, setLocalStatus] = useState({});

  // --- States: NoST Logic ---
  const [noSTModal, setNoSTModal] = useState(false);
  const [noSTValue, setNoSTValue] = useState("");

  // --- Helpers ---
  const formatFullDate = (dateStr) => {
    if (!dateStr) return "";
    const [dd, mm, yyyy] = dateStr.split("/");
    const d = new Date(`${yyyy}-${mm}-${dd}`);
    if (isNaN(d)) return dateStr;
    return d.toLocaleDateString("id-ID", {
      weekday: "long", day: "numeric", month: "long", year: "numeric"
    });
  };

  const getTujuanList = (row) => {
    const list = [];
    for (let i = 1; i <= 5; i++) {
      const desa = row[`Desa(${i})`];
      let kec = row[`Kecamatan(${i})`];
      if (kec) kec = kec.length > 4 ? kec.substring(4).trim() : kec.trim();
      if (desa || kec) list.push([desa, kec].filter(Boolean).join(", "));
    }
    return list;
  };

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data
      .filter((row) => {
        const tujuanStr = getTujuanList(row).join(" ").toLowerCase();
        return (
          row["Nama Survei"].toLowerCase().includes(filters.survei.toLowerCase()) &&
          row["Tujuan Kegiatan"].toLowerCase().includes(filters.kegiatan.toLowerCase()) &&
          row["NamaCocok"].toLowerCase().includes(filters.nama.toLowerCase()) &&
          tujuanStr.includes(filters.tujuan.toLowerCase()) &&
          row["Tanggal Kunjungan"].toLowerCase().includes(filters.tanggal.toLowerCase())
        );
      })
      .sort((a, b) => {
        const parse = (s) => new Date(s.split("/").reverse().join("-"));
        return parse(a["Tanggal Kunjungan"]) - parse(b["Tanggal Kunjungan"]) ||
          a["NamaCocok"].localeCompare(b["NamaCocok"]);
      });
  }, [data, filters]);

  const handleEditStatus = async (row) => {
    const current = localStatus[row["ID_Laporan"]] || row["Ket"]?.trim() || "Aktif";
    const newStatus = current === "Aktif" ? "Hapus" : "Aktif";
    if (!window.confirm(`Ubah status menjadi "${newStatus}"?`)) return;
    setUpdating(true);
    try {
      setLocalStatus(prev => ({ ...prev, [row["ID_Laporan"]]: newStatus }));
      const res = await updateSheet(row["ID_Laporan"], "Ket", newStatus);
      if (res.status === "ok" || res.status === "success") {
        await refreshData();
      } else {
        throw new Error(res.message);
      }
    } catch (err) {
      alert(`Gagal: ${err.message}`);
      setLocalStatus(prev => ({ ...prev, [row["ID_Laporan"]]: current }));
    } finally {
      setUpdating(false);
    }
  };

  const openPrintModal = (row) => {
    setRowToPrint(row);
    setPrintOption({ SPD: true, OLD: true, Kwitansi: true, Riil: true, Randis: true });
    setPrintModal(true);
  };

  const executePrint = async (row) => {
    const sections = Object.keys(printOption).filter(k => printOption[k]);
    setLoading(true);
    try {
      await printReport(row, sections);
    } finally {
      setLoading(false);
      setPrintModal(false);
    }
  };

  const confirmPrint = async () => {
    if (!rowToPrint) return;
    if (printOption.Randis) {
      const missing = needNoST([rowToPrint]);
      if (missing.length > 0) {
        setNoSTModal(true);
        return;
      }
    }
    await executePrint(rowToPrint);
  };

  const submitNoST = async () => {
    if (!noSTValue) return alert("Isi NoST!");
    setUpdating(true);
    try {
      const res = await saveNoST(noSTValue, [rowToPrint]);
      if (res.success) {
        rowToPrint.NoST = noSTValue;
        setNoSTModal(false);
        setNoSTValue("");
        await executePrint(rowToPrint);
      }
    } finally {
      setUpdating(false);
    }
  };

  if (loadingData) return <div className="p-8 text-center animate-pulse text-gray-500">Memuat data Sensus Ekonomi...</div>;

  return (
    <div className="relative min-h-screen bg-gray-50 p-2 sm:p-4">
      {(loading || updating) && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-blue-700 font-bold">Menyiapkan Dokumen...</p>
          </div>
        </div>
      )}

      {/* SEARCH SECTION (MOBILE & DESKTOP) */}
{/* SEARCH SECTION */}
      <div className="mb-4">
        {/* Tombol ini SEKARANG HANYA MUNCUL DI MOBILE (sm:hidden) */}
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="sm:hidden w-full bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg font-bold flex justify-between items-center gap-4 mb-2"
        >
          <span className="flex items-center gap-2">🔍 {showFilters ? "Tutup Filter" : "Cari Laporan"}</span>
          <span className="text-xs">{showFilters ? "▲" : "▼"}</span>
        </button>

        {/* Panel Filter: 
            - Di Desktop (sm): Langsung grid (Tampil permanen)
            - Di Mobile: Tampil jika showFilters true (hidden / grid)
        */}
        <div className={`
          bg-white p-4 rounded-xl shadow-sm border gap-3 animate-fadeIn
          grid-cols-1 sm:grid grid-cols-5 
          ${showFilters ? "grid" : "hidden sm:grid"}
        `}>
          {Object.keys(filters).map(key => (
            <div key={key}>
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">
                {key === "survei" ? "Nama Survei" : 
                 key === "nama" ? "Nama" : 
                 key}
              </label>
              <input
                placeholder={`Cari ${key}...`}
                className="w-full p-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={filters[key]}
                onChange={e => setFilters({...filters, [key]: e.target.value})}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 🖥️ DESKTOP VIEW (TABLE) */}
      <div className="hidden sm:block bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto max-h-[calc(100vh-200px)]">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100 sticky top-0 z-20 shadow-sm">
              <tr>
                {["Nama Survei", "Kegiatan", "Pelaksana", "Tujuan Lokasi", "Tanggal"].map(h => (
                  <th key={h} className="p-3 border-b font-bold text-gray-700">{h}</th>
                ))}
                <th className="p-3 border-b text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row) => {
                const status = localStatus[row["ID_Laporan"]] || row["Ket"] || "Aktif";
                return (
                  <tr key={row["ID_Laporan"]} className={`hover:bg-blue-50/30 transition ${status === 'Hapus' ? 'bg-red-50/50' : ''}`}>
                    <td className="p-3 border-b font-medium">{row["Nama Survei"]}</td>
                    <td className="p-3 border-b text-gray-600">{row["Tujuan Kegiatan"]}</td>
                    <td className="p-3 border-b">{row["NamaCocok"]}</td>
                    <td className="p-3 border-b text-xs">
                      {getTujuanList(row).map((t, i) => <div key={i} className="mb-1">• {t}</div>)}
                    </td>
                    <td className="p-3 border-b whitespace-nowrap">{formatFullDate(row["Tanggal Kunjungan"])}</td>
                    <td className="p-3 border-b text-center">
                      <div className="flex flex-col gap-1 items-center">
                        <div className="flex gap-1">
                          {/* Desktop Button Print */}
                          <button
                            onClick={() => openPrintModal(row)}
                            disabled={status === 'Hapus'} // Logika baru: disable jika hapus
                            className={`p-2 rounded-lg transition ${status === 'Hapus'
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50' // Style saat mati
                              : 'bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white' // Style saat aktif
                              }`}
                          >
                            🖨️
                          </button>
                          <button onClick={() => handleEditStatus(row)} className={`p-2 rounded-lg transition ${status === 'Hapus' ? 'bg-green-100 text-green-700 hover:bg-green-600' : 'bg-red-100 text-red-700 hover:bg-red-600'} hover:text-white`}>
                            {status === "Hapus" ? "🔄" : "🗑️"}
                          </button>
                        </div>
                        <span className={`text-[10px] font-bold uppercase ${status === 'Hapus' ? 'text-red-500' : 'text-green-500'}`}>{status}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 📱 MOBILE VIEW (CARDS) */}
      <div className="sm:hidden space-y-4">
        {filteredData.length === 0 ? (
          <div className="text-center py-10 text-gray-400">Data tidak ditemukan</div>
        ) : (
          filteredData.map((row) => {
            const status = localStatus[row["ID_Laporan"]] || row["Ket"] || "Aktif";
            return (
              <div
                key={row["ID_Laporan"]}
                className={`bg-white rounded-2xl border p-4 shadow-sm space-y-3 transition ${status === 'Hapus' ? 'border-red-200 bg-red-50/30' : 'border-gray-200'}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <span className="text-[12px] font-black text-gray-600 uppercase tracking-tighter bg-blue-50 px-2 py-0.5 rounded">
                      {row["Nama Survei"]}
                    </span>
                    <h3 className="font-bold text-gray-800 mt-1 leading-tight">{row["NamaCocok"]}</h3>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${status === 'Hapus' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                    {status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="text-gray-400 uppercase font-bold">Kegiatan</div>
                  <div className="text-gray-800 font-semibold">{row["Tujuan Kegiatan"]}</div>

                  <div className="text-gray-400 uppercase font-bold">Tanggal</div>
                  <div className="text-gray-800">{row["Tanggal Kunjungan"]}</div>
                </div>

                <div className="bg-gray-50 p-2 rounded-xl border border-gray-100">
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Tujuan Lokasi:</p>
                  {getTujuanList(row).map((t, i) => (
                    <div key={i} className="text-[11px] text-gray-600">• {t}</div>
                  ))}
                </div>

                <div className="flex gap-1 pt-1">
                  {/* Mobile Button Print */}
                  <button
                    onClick={() => openPrintModal(row)}
                    disabled={status === 'Hapus'} // Logika baru: disable jika hapus
                    className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition active:scale-95 ${status === 'Hapus'
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed' // Style saat mati
                        : 'bg-blue-600 text-white shadow-lg shadow-blue-100 active:bg-blue-700' // Style saat aktif
                      }`}
                  >
                    {status === 'Hapus' ? "🚫 Laporan dihapus" : "🖨️ Cetak Laporan"}
                  </button>
                  <button
                    onClick={() => handleEditStatus(row)}
                    className={`px-4 py-3 rounded-xl border-2 transition active:scale-95 ${status === 'Hapus' ? 'border-green-600 text-green-600' : 'border-red-100 text-red-500'}`}
                  >
                    {status === "Hapus" ? "🔄" : "🗑️"}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* MODALS */}
      <PrintOptionModal
        open={printModal}
        onClose={() => setPrintModal(false)}
        onConfirm={confirmPrint}
        printOption={printOption}
        setPrintOption={setPrintOption}
        rowsToPrint={null}
        printTarget={rowToPrint}
      />

      {noSTModal && (
        <div className="fixed inset-0 z-[9990] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-sm animate-popIn">
            <h3 className="font-bold text-lg mb-2 text-center text-gray-800">Nomor Surat Tugas</h3>
            <p className="text-xs text-gray-500 mb-4 text-center">Data Randis memerlukan NoST untuk dicetak.</p>
            <input
              className="w-full border-2 border-blue-50 p-4 rounded-xl focus:border-blue-500 outline-none transition font-mono"
              placeholder="Input NoST..."
              value={noSTValue}
              onChange={e => setNoSTValue(e.target.value)}
              autoFocus
            />
            <div className="flex gap-2 mt-8">
              <button className="flex-1 py-3 bg-gray-100 rounded-xl font-medium" onClick={() => setNoSTModal(false)}>Batal</button>
              <button className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold" onClick={submitNoST}>Simpan & Print</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReportTable;