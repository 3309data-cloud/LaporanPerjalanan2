import React, { useEffect, useState, useCallback, useMemo } from "react";
import * as XLSX from "xlsx";
import { 
  Search, Map, FileText, ChevronLeft, Plus, 
  Save, Edit3, Download, Printer, Trash2, 
  Database, UploadCloud, CheckCircle2, AlertCircle, X, Users
} from "lucide-react";

import Toast from "../components/toast";
import { printSPDBelakang } from "../components/printSPDBelakang";
import {
    saveSPD,
    getSPDBySurvey,
    updateSPD,
    deleteSPD,
    fetchPegawaiMaster,
    fetchKecamatan
} from "../api/spdSevice";

const API_BASE = "https://script.google.com/macros/s/AKfycbyj-1nroXJU82TXfykW7dBJh8rCfLOKPWQqNLqr20JWVp1zm44VBnqft5xTlNdkIqeLSQ/exec";

function KelolaPerjalanan() {
    // =========================================================================
    // 1. STATE MANAGEMENT
    // =========================================================================
    const [view, setView] = useState("list");
    const [loading, setLoading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [toast, setToast] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const [importState, setImportState] = useState({
        isImporting: false,
        total: 0,
        current: 0,
        success: 0,
        failed: 0,
        logs: [],
        isFinished: false
    });

    const [surveys, setSurveys] = useState([]);
    const [masterSPD, setMasterSPD] = useState([]);
    const [pegawaiMaster, setPegawaiMaster] = useState([]);
    const [kecamatan, setKecamatan] = useState([]);

    const [selectedSurvey, setSelectedSurvey] = useState(null);
    const [rows, setRows] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    const [headerSPD, setHeaderSPD] = useState({
        noSPD: "", program: "", kegiatan: "", komponen: "", tglKwitansi: ""
    });

    const [isLocked, setIsLocked] = useState(true);
    const [headerLocked, setHeaderLocked] = useState(true);
    const [isNewData, setIsNewData] = useState(true);
    const [pegawaiOptions, setPegawaiOptions] = useState({});

    // =========================================================================
    // 2. HELPERS & LOGIC
    // =========================================================================
    const showToast = (message, type = "success") => setToast({ message, type });

    const groupDataByNipST = (data) => {
        const grouped = {};
        data.forEach((d) => {
            const key = `${d.nip || d.NIP}_${d.noST || d["No ST"]}`;
            if (!grouped[key]) {
                grouped[key] = {
                    id: key,
                    nip: String(d.nip || d.NIP || ""),
                    nama: String(d.nama || d.Nama || ""),
                    noST: String(d.noST || d["No ST"] || ""),
                    trips: []
                };
            }
            const noSPD = String(d.noSPD || d["No SPD"] || "").trim();
            const asal = String(d.asal || d.Asal || "").trim();
            const tujuan = String(d.tujuan || d.Tujuan || "").trim();

            if (noSPD !== "" || asal !== "" || tujuan !== "") {
                grouped[key].trips.push({
                    rowIndex: d.rowIndex,
                    noSPD,
                    asal: asal || "Mojosongo",
                    tujuan,
                    statusLaporan: d.statusLaporan
                });
            }
        });
        return Object.values(grouped);
    };

    const flattenTrips = (dataToProcess = rows) => {
        const result = [];
        dataToProcess.forEach(emp => {
            emp.trips.forEach(trip => {
                result.push({
                    nip: emp.nip, nama: emp.nama, noST: emp.noST,
                    noSPD: trip.noSPD, asal: trip.asal, tujuan: trip.tujuan,
                    survey: selectedSurvey?.["Nama Survei"] || ""
                });
            });
        });
        return result;
    };

    // =========================================================================
    // 3. API ACTIONS
    // =========================================================================
    const fetchSurveys = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}?action=getSurveys`);
            const data = await res.json();
            setSurveys(data.reverse());
        } catch (err) { showToast("Gagal muat survei", "error"); }
        finally { setLoading(false); }
    };

    const loadSPD = useCallback(async (surveyName) => {
        setLoading(true);
        try {
            const data = await getSPDBySurvey(surveyName);
            if (data.length === 0) {
                setRows([]); setIsNewData(true); setIsLocked(false);
            } else {
                setRows(groupDataByNipST(data)); setIsNewData(false); setIsLocked(true);
            }
        } catch (err) { showToast("Gagal muat data SPD", "error"); }
        finally { setLoading(false); }
    }, []);

    const saveHeaderSPD = async () => {
        setIsProcessing(true);
        try {
            await fetch(API_BASE, {
                method: "POST",
                body: JSON.stringify({ action: "saveSPD", row: selectedSurvey.row, ...headerSPD })
            });
            showToast("Header SPD disimpan ✨");
            setHeaderLocked(true);
        } catch (err) { showToast("Gagal simpan header", "error"); }
        finally { setIsProcessing(false); }
    };

    const handleSaveOrUpdate = async (mode) => {
        setIsProcessing(true);
        try {
            const safeRowsToSave = rows.map(row => {
                if (!row.trips || row.trips.length === 0) {
                    return { ...row, trips: [{ noSPD: "", asal: "", tujuan: "" }] };
                }
                return row;
            });

            if (mode === "save") {
                await saveSPD(selectedSurvey["Nama Survei"], safeRowsToSave);
                showToast("SPD berhasil disimpan 🎉");
            } else {
                await updateSPD(selectedSurvey["Nama Survei"], safeRowsToSave);
                showToast("SPD berhasil diperbarui ✨");
            }
            await loadSPD(selectedSurvey["Nama Survei"]);
        } catch (err) {
            showToast(`Gagal ${mode === "save" ? "menyimpan" : "memperbarui"} data`, "error");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDeleteSingleTrip = async (rowIndexSheet) => {
        if (!window.confirm("Hapus perjalanan ini dari database?")) return;
        setIsProcessing(true);
        try {
            await deleteSPD(rowIndexSheet);
            await loadSPD(selectedSurvey["Nama Survei"]);
            showToast("Data rute berhasil dihapus");
        } catch (error) { showToast("Gagal menghapus data", "error"); }
        finally { setIsProcessing(false); }
    };

    // =========================================================================
    // 4. FORM & TABLE HANDLERS
    // =========================================================================
    const searchPegawaiHandler = (index, keyword) => {
        if (keyword.length < 3) {
            setPegawaiOptions(prev => ({ ...prev, [index]: [] }));
            return;
        }
        const filtered = pegawaiMaster.filter(p => p.nama.toLowerCase().includes(keyword.toLowerCase()));
        setPegawaiOptions(prev => ({ ...prev, [index]: filtered.slice(0, 5) }));
    };

    const addEmployee = () => {
        setRows([...rows, { id: Date.now(), nip: "", nama: "", noST: "", trips: [] }]);
    };

    const addTrip = (i) => {
        const copy = [...rows];
        copy[i].trips.push({ noSPD: "", asal: "Mojosongo", tujuan: "" });
        setRows(copy);
    };

    const updateField = (i, field, value) => {
        const copy = [...rows];
        copy[i][field] = value;
        setRows(copy);
    };

    const updateTrip = (i, j, field, value) => {
        const copy = [...rows];
        copy[i].trips[j][field] = value;
        setRows(copy);
    };

    const toggleRowSelection = (id) => {
        setSelectedRows(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    const toggleSelectAll = () => {
        if (selectedRows.length === rows.length) setSelectedRows([]);
        else setSelectedRows(rows.map(r => r.id));
    };

    // =========================================================================
    // 5. EXCEL IMPORT LOGIC
    // =========================================================================
const handleImportExcel = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = async (evt) => {
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: "binary" });
            const rawData = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);

            if (rawData.length > 0) {
                // --- PROSES NORMALISASI KOLOM SEBELUM GROUPING ---
                const normalizedData = rawData.map(row => {
                    const keys = Object.keys(row);
                    const newRow = { ...row };

                    // Cari & Standarisasi NIP (Mencari: nip, n.i.p, NIP Pegawai, dll)
                    const nipKey = keys.find(k => k.toLowerCase().replace(/[\s._]/g, "") === "nip");
                    if (nipKey) newRow.nip = String(row[nipKey]);

                    // Cari & Standarisasi No ST (Mencari: nost, no st, No. ST, dll)
                    const stKey = keys.find(k => k.toLowerCase().replace(/[\s._]/g, "").includes("nost"));
                    if (stKey) newRow.noST = String(row[stKey]);

                    // Cari & Standarisasi No SPD (Mencari: nospd, no spd, dll)
                    const spdKey = keys.find(k => k.toLowerCase().replace(/[\s._]/g, "").includes("nospd"));
                    if (spdKey) newRow.noSPD = String(row[spdKey]);

                    // Cari & Standarisasi Tujuan (Mencari: tujuan, kec_tujuan, dll)
                    const tujuanKey = keys.find(k => k.toLowerCase().replace(/[\s._]/g, "").includes("tujuan"));
                    if (tujuanKey) newRow.tujuan = String(row[tujuanKey]);

                    return newRow;
                });

                // Jalankan grouping dengan data yang sudah distandarisasi
                const groupedData = groupDataByNipST(normalizedData);
                
                setImportState({ 
                    isImporting: true, 
                    total: groupedData.length, 
                    current: 0, 
                    success: 0, 
                    failed: 0, 
                    logs: ["Membaca file Excel..."], 
                    isFinished: false 
                });
                
                let validData = [];
                for (let i = 0; i < groupedData.length; i++) {
                    const item = groupedData[i];
                    // Validasi ke Master Pegawai
                    const master = pegawaiMaster.find(p => String(p.nip) === String(item.nip));
                    
                    if (!master) {
                        setImportState(prev => ({ 
                            ...prev, 
                            current: i+1, 
                            failed: prev.failed + 1, 
                            logs: [`❌ NIP ${item.nip || "Kosong"} tidak ditemukan`, ...prev.logs] 
                        }));
                    } else {
                        item.nama = master.nama;
                        validData.push(item);
                        setImportState(prev => ({ 
                            ...prev, 
                            current: i+1, 
                            success: prev.success + 1, 
                            logs: [`✅ ${item.nama} tervalidasi`, ...prev.logs] 
                        }));
                    }
                    await new Promise(res => setTimeout(res, 20));
                }

                if (validData.length > 0) {
                    try {
                        const finalRows = [...rows, ...validData];
                        if (isNewData && rows.length === 0) {
                            await saveSPD(selectedSurvey["Nama Survei"], finalRows);
                        } else {
                            await updateSPD(selectedSurvey["Nama Survei"], finalRows);
                        }
                        setRows(finalRows);
                        setIsNewData(false);
                        showToast("Data berhasil disinkronkan ke database");
                    } catch (err) { 
                        showToast("Gagal sinkronisasi database", "error"); 
                    }
                }
                setImportState(prev => ({ ...prev, isFinished: true }));
            }
            e.target.value = "";
        };
        reader.readAsBinaryString(file);
    };

    // =========================================================================
    // 6. PRINT ACTIONS
    // =========================================================================
    const handlePrintByRow = (row) => {
        if (!row.trips || row.trips.length === 0) return showToast("Tidak ada rute perjalanan!", "error");
        printSPDBelakang(flattenTrips([row]));
    };

    const handlePrintSelected = () => {
        if (selectedRows.length === 0) return showToast("Pilih pegawai dulu!", "error");
        const valid = rows.filter(r => selectedRows.includes(r.id) && r.trips && r.trips.length > 0);
        if (valid.length === 0) return showToast("Pegawai terpilih tidak memiliki rute!", "error");
        printSPDBelakang(flattenTrips(valid));
    };

    const handlePrintAll = () => {
        const valid = rows.filter(r => r.trips && r.trips.length > 0);
        if (valid.length === 0) return showToast("Tidak ada data untuk dicetak!", "error");
        printSPDBelakang(flattenTrips(valid));
    };

    // =========================================================================
    // 7. LIFECYCLE & MEMOS
    // =========================================================================
    useEffect(() => {
        const loadInitial = async () => {
            const [p, k] = await Promise.all([fetchPegawaiMaster(), fetchKecamatan()]);
            setPegawaiMaster(p || []); setKecamatan(k || []);
        };
        loadInitial();
    }, []);

    useEffect(() => { if (view === "list") fetchSurveys(); }, [view]);

    useEffect(() => {
        if (!selectedSurvey) return;
        loadSPD(selectedSurvey["Nama Survei"]);
        (async () => {
            const mRes = await fetch(`${API_BASE}?action=getMaster`);
            const mData = await mRes.json();
            setMasterSPD(mData || []);
            const hRes = await fetch(`${API_BASE}?action=getSurveyDetail&row=${selectedSurvey.row}`);
            const hData = await hRes.json();
            if (hData.success) {
                setHeaderSPD({
                    noSPD: hData.data.noSPD || "", program: hData.data.program || "",
                    kegiatan: hData.data.kegiatan || "", komponen: hData.data.komponen || "",
                    tglKwitansi: hData.data.tglKwitansi || ""
                });
            }
        })();
    }, [selectedSurvey, loadSPD]);

    const filteredSurveys = useMemo(() => 
        surveys.filter(s => s["Nama Survei"]?.toLowerCase().includes(searchTerm.toLowerCase())), 
    [surveys, searchTerm]);

    const { kegiatanList, komponenList } = useMemo(() => {
        const p = masterSPD.find(x => x.nama === headerSPD.program);
        const k = p?.kegiatan.find(x => x.nama === headerSPD.kegiatan);
        return { kegiatanList: p?.kegiatan || [], komponenList: k?.komponen || [] };
    }, [headerSPD.program, headerSPD.kegiatan, masterSPD]);

const stats = useMemo(() => {
        // Kita hitung dari semua rute (trips) yang ada di setiap baris pegawai
        const allTrips = rows.flatMap(row => row.trips || []);
        const total = allTrips.length;
        const uploaded = allTrips.filter(t => Number(t.statusLaporan) === 1).length;
        const pending = total - uploaded;

        // Hitung persentase untuk progress bar
        const percent = total > 0 ? Math.round((uploaded / total) * 100) : 0;
        const percentkurang = total > 0 ? Math.round((pending / total) * 100) : 0;

        return { total, uploaded, pending, percent, percentkurang };
    }, [rows]);

    const transClass = "animate-in fade-in slide-in-from-bottom-2 duration-500 max-w-7xl mx-auto";

    // =========================================================================
    // 8. RENDER
    // =========================================================================
    return (
        <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans text-slate-900">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            
            {(loading || isProcessing) && (
                <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-md z-[100] flex flex-col items-center justify-center">
                    <div className="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center">
                        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-4 font-bold text-slate-700">{isProcessing ? "Sedang Memproses..." : "Sinkronisasi Data..."}</p>
                    </div>
                </div>
            )}

            {view === "list" ? (
                <div className={transClass}>
                    <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Kelola Perjalanan</h1>
                            <p className="text-slate-500">Pilih survei untuk mengelola rute perjalanan dan cetak SPD.</p>
                        </div>
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input 
                                type="text" placeholder="Cari survei..." value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                            />
                        </div>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredSurveys.map((s, i) => (
                            <div key={i} onClick={() => { setSelectedSurvey(s); setView("detail"); }}
                                className="group bg-white p-6 rounded-[2.2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-500 transition-all cursor-pointer relative overflow-hidden">
                                <div className={`absolute top-4 right-4 w-2 h-2 rounded-full ${s.Status === "Aktif" ? "bg-green-500" : "bg-slate-300"}`} />
                                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <Map size={24} />
                                </div>
                                <h3 className="font-bold text-lg text-slate-800 mb-1">{s["Nama Survei"]}</h3>
                                <p className="text-xs text-slate-400">Kelola rincian SPD dan cetak halaman belakang.</p>
                                <div className="mt-4 pt-4 border-t border-slate-50 flex items-center text-blue-600 text-[10px] font-black uppercase tracking-widest">
                                    Lihat Detail <ChevronLeft size={14} className="rotate-180 ml-1" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
<div className="space-y-6 animate-fadeIn max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 pb-4 border-b border-gray-200">
                        <button
                            onClick={() => { setView("list"); setSelectedSurvey(null); }}
                            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors shadow-sm"
                            title="Kembali ke Daftar"
                        >
                            ←
                        </button>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
                                {selectedSurvey["Nama Survei"]}
                            </h1>
                            <p className="text-gray-500 text-sm mt-1">Detail SPD Survei</p>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
                        <div className="flex flex-col xl:flex-row gap-8 justify-between">
                            <div className="flex-1 space-y-4">
                                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Informasi Tanggal</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 mb-1 block">Tanggal Surat Tugas</label>
                                        <input
                                            type="text"
                                            placeholder="Contoh: 12 April 2026"
                                            disabled={headerLocked}
                                            value={headerSPD.noSPD}
                                            onChange={(e) => setHeaderSPD({ ...headerSPD, noSPD: e.target.value })}
                                            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm disabled:bg-gray-50 disabled:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 mb-1 block">Tanggal Kwitansi</label>
                                        <input
                                            type="text"
                                            placeholder="Contoh: 12 April 2026"
                                            disabled={headerLocked}
                                            value={headerSPD.tglKwitansi}
                                            onChange={(e) => setHeaderSPD({ ...headerSPD, tglKwitansi: e.target.value })}
                                            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm disabled:bg-gray-50 disabled:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex-[1.5] space-y-4">
                                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Mata Anggaran</h3>
                                <div className="space-y-3 text-sm bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                                    <div className="grid grid-cols-[90px_1fr] sm:grid-cols-[130px_1fr] items-center gap-2">
                                        <label className="font-medium text-gray-600">Program</label>
                                        <div className="flex items-center gap-2">
                                            <span className="hidden sm:block text-gray-400">:</span>
                                            <select
                                                className="w-full p-2.5 bg-white border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 shadow-sm"
                                                value={headerSPD.program}
                                                disabled={headerLocked}
                                                onChange={(e) => setHeaderSPD(prev => ({ ...prev, program: e.target.value, kegiatan: "", komponen: "" }))}
                                            >
                                                <option value="">-- Pilih Program --</option>
                                                {masterSPD.map((p, i) => <option key={i} value={p.nama}>{p.nama}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-[90px_1fr] sm:grid-cols-[130px_1fr] items-center gap-2">
                                        <label className="font-medium text-gray-600">Kegiatan</label>
                                        <div className="flex items-center gap-2">
                                            <span className="hidden sm:block text-gray-400">:</span>
                                            <select
                                                className="w-full p-2.5 bg-white border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 shadow-sm"
                                                disabled={!headerSPD.program || headerLocked}
                                                value={headerSPD.kegiatan}
                                                onChange={(e) => setHeaderSPD(prev => ({ ...prev, kegiatan: e.target.value, komponen: "" }))}
                                            >
                                                <option value="">-- Pilih Kegiatan --</option>
                                                {kegiatanList.map((k, i) => <option key={i} value={k.nama}>{k.nama}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-[90px_1fr] sm:grid-cols-[130px_1fr] items-center gap-2">
                                        <label className="font-medium text-gray-600">Komponen</label>
                                        <div className="flex items-center gap-2">
                                            <span className="hidden sm:block text-gray-400">:</span>
                                            <select
                                                className="w-full p-2.5 bg-white border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 shadow-sm"
                                                disabled={!headerSPD.kegiatan || headerLocked}
                                                value={headerSPD.komponen}
                                                onChange={(e) => setHeaderSPD(prev => ({ ...prev, komponen: e.target.value }))}
                                            >
                                                <option value="">-- Pilih Komponen --</option>
                                                {komponenList.map((k, i) => <option key={i} value={k}>{k}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end mt-6 pt-4 border-t border-gray-100">
                            {headerLocked ? (
                                <button onClick={() => setHeaderLocked(false)} className="bg-amber-50 text-amber-600 border border-amber-200 hover:bg-amber-100 px-6 py-2.5 rounded-xl font-bold shadow-sm transition-colors flex items-center gap-2">
                                    <span>✏️</span> Edit Detail SPD
                                </button>
                            ) : (
                                <button onClick={saveHeaderSPD} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-md shadow-green-200 transition-all flex items-center gap-2">
                                    <span>💾</span> Simpan Detail SPD
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        {/* Card Total Perjalanan */}
                        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Rencana Perjalanan</p>
                            <div className="flex items-end gap-2 mt-1">
                                <h3 className="text-2xl font-black text-gray-800">{stats.total}</h3>
                                <p className="text-xs text-gray-400 pb-1">Perjalanan</p>
                            </div>
                        </div>

                        {/* Card Sudah Laporan */}
                        <div className="bg-green-50 p-4 rounded-2xl border border-green-100 shadow-sm">
                            <p className="text-xs font-bold text-green-700 uppercase tracking-wider">Sudah Upload Laporan</p>
                            <div className="flex items-end gap-2 mt-1">
                                <h3 className="text-2xl font-black text-green-700">{stats.uploaded}</h3>
                                <span className="bg-green-200 text-green-800 text-[10px] px-2 py-0.5 rounded-full mb-1 font-bold">
                                    {stats.percent}%
                                </span>
                            </div>
                        </div>

                        {/* Card Belum Laporan */}
                        <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 shadow-sm">
                            <p className="text-xs font-bold text-amber-700 uppercase tracking-wider">Belum Upload Laporan</p>
                            <div className="flex items-end gap-2 mt-1">
                                <h3 className="text-2xl font-black text-amber-700">{stats.pending}</h3>
                                                                <span className="bg-amber-200 text-amber-800 text-[10px] px-2 py-0.5 rounded-full mb-1 font-bold">
                                    {stats.percentkurang}%
                                </span>
                            </div>
                        </div>

                        {/* Progress Chart Sederhana */}
                        <div className="bg-slate-800 p-4 rounded-2xl shadow-sm flex flex-col justify-center">
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-[10px] font-bold text-slate-400 uppercase">Progres Laporan</p>
                                <span className="text-white font-bold text-xs">{stats.percent}%</span>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-2">
                                <div
                                    className="bg-blue-400 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${stats.percent}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-visible">
                        <div className="overflow-x-auto max-h-[800px] overflow-y-auto custom-scrollbar">
                            <table className="w-full text-left border-collapse relative">
                                <thead className="bg-gray-100 text-gray-700 uppercase text-[11px] font-extrabold sticky top-0 z-10 shadow-sm outline outline-1 outline-gray-200">
                                    <tr>
                                        <th className="p-2 text-center w-[5%] border-r border-gray-200">
                                            <input type="checkbox"
                                                className="w-3.5 h-3.5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                                                checked={selectedRows.length === rows.length && rows.length > 0}
                                                onChange={toggleSelectAll} />
                                        </th>
                                        <th className="p-3 w-[30%] border-r border-gray-200 tracking-wider">Detail Petugas (No Surat Tugas)</th>
                                        <th className="p-2 text-center w-[5%] border-r border-gray-200">Jml</th>
                                        <th className="p-3 w-[15%]">No SPD</th>
                                        <th className="p-3 w-[15%]">Kecamatan Asal</th>
                                        <th className="p-3 w-[15%]">Kecamatan Tujuan</th>
                                        <th className="p-2 text-center w-[5%]">Laporan</th>
                                        <th className="p-2 text-center w-[15%]">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-700 text-xs">
                                    {rows.map((row, i) => {
                                        const bgGroup = i % 2 === 0 ? "bg-white" : "bg-slate-50/60";

                                        // KONDISI 1: JIKA RUTE KOSONG (0)
                                        if (!row.trips || row.trips.length === 0) {
                                            return (
                                                <tr key={`empty-${i}`} className={`hover:bg-blue-50/40 transition-colors group ${bgGroup} border-b-2 border-gray-300`}>
                                                    <td className="text-center align-top pt-3 border-r border-gray-200">
                                                        <input type="checkbox"
                                                            className="w-3.5 h-3.5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                                                            checked={selectedRows.includes(row.id)}
                                                            onChange={() => toggleRowSelection(row.id)} />
                                                    </td>
                                                    <td className="p-2.5 border-r border-gray-200 align-top space-y-1.5 min-w-[260px]">
                                                        <div className="relative">
                                                            <input
                                                                disabled={isLocked}
                                                                value={row.nama}
                                                                onChange={(e) => {
                                                                    updateField(i, "nama", e.target.value);
                                                                    searchPegawaiHandler(i, e.target.value);
                                                                }}
                                                                placeholder="Ketik nama..."
                                                                className="block w-full border border-gray-300 rounded-md px-2 py-1 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none disabled:border-transparent disabled:bg-transparent disabled:p-0"
                                                            />
                                                            {pegawaiOptions[i]?.length > 0 && !isLocked && (
                                                                <div className="absolute z-50 mt-1 bg-white border border-gray-200 shadow-xl rounded-xl w-full max-h-48 overflow-auto py-1">
                                                                    {pegawaiOptions[i].map((p, idx) => (
                                                                        <div key={idx} onClick={() => {
                                                                            const copy = [...rows];
                                                                            copy[i].nip = p.nip;
                                                                            copy[i].nama = p.nama;
                                                                            setRows(copy);
                                                                            setPegawaiOptions(prev => ({ ...prev, [i]: [] }));
                                                                        }} className="px-3 py-1.5 hover:bg-blue-50 cursor-pointer text-xs border-b border-gray-50 last:border-0">
                                                                            <div className="font-bold text-gray-800">{p.nama}</div>
                                                                            <div className="text-[10px] text-gray-500">{p.nip}</div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-1.5 mt-1 text-[10px]">
                                                            <div>
                                                                <label className="text-gray-400 font-semibold mb-0 block leading-none">NIP / SOBAT ID</label>
                                                                <input disabled value={row.nip} placeholder="NIP Otomatis" className="block w-full border border-gray-200 rounded-md px-2 py-0.5 bg-white shadow-sm text-gray-600 outline-none disabled:border-transparent disabled:bg-transparent disabled:shadow-none disabled:p-0" />
                                                            </div>
                                                            <div>
                                                                <label className="text-gray-400 font-semibold mb-0 block leading-none">No ST</label>
                                                                <input disabled={isLocked} value={row.noST} onChange={(e) => updateField(i, "noST", e.target.value)} placeholder="No ST" className="block w-full border border-gray-300 rounded-md px-2 py-0.5 text-blue-700 font-medium focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-transparent disabled:border-transparent disabled:p-0" />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-2 border-r border-gray-200 text-center align-top pt-3">
                                                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-500 font-extrabold text-[10px] shadow-sm">
                                                            0
                                                        </span>
                                                    </td>
                                                    <td colSpan="3" className="p-4 text-center align-middle">
                                                        <span className="text-gray-400 text-xs italic">Belum ada rute perjalanan ditambahkan.</span>
                                                    </td>
                                                    <td className="p-2 text-right space-x-1.5 whitespace-nowrap align-top pt-2.5">
                                                        {!isLocked && (
                                                            <button onClick={() => addTrip(i)} title="Tambah Rute" className="text-blue-700 hover:bg-blue-600 hover:text-white px-2 py-1 rounded-md text-[10px] font-bold border border-blue-200 bg-blue-50 shadow-sm transition-colors">
                                                                + Rute
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        }

                                        // KONDISI 2: JIKA RUTE > 0
                                        return row.trips.map((trip, j) => {
                                            const isLastTrip = j === row.trips.length - 1;
                                            const borderBottom = isLastTrip ? "border-b-2 border-gray-300" : "border-b border-gray-100";

                                            return (
                                                <tr key={`${i}-${j}`} className={`hover:bg-blue-50/40 transition-colors group ${bgGroup} ${borderBottom}`}>
                                                    {j === 0 && (
                                                        <td rowSpan={row.trips.length} className="text-center align-top pt-3 border-r border-gray-200">
                                                            <input type="checkbox"
                                                                className="w-3.5 h-3.5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                                                                checked={selectedRows.includes(row.id)}
                                                                onChange={() => toggleRowSelection(row.id)} />
                                                        </td>
                                                    )}
                                                    {j === 0 && (
                                                        <td rowSpan={row.trips.length} className="p-2.5 border-r border-gray-200 align-top space-y-1.5 min-w-[260px]">
                                                            <div className="relative">
                                                                <input
                                                                    disabled={isLocked}
                                                                    value={row.nama}
                                                                    onChange={(e) => {
                                                                        updateField(i, "nama", e.target.value);
                                                                        searchPegawaiHandler(i, e.target.value);
                                                                    }}
                                                                    placeholder="Ketik nama..."
                                                                    className="block w-full border border-gray-300 rounded-md px-2 py-1 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none disabled:border-transparent disabled:bg-transparent disabled:p-0"
                                                                />
                                                                {pegawaiOptions[i]?.length > 0 && !isLocked && (
                                                                    <div className="absolute z-50 mt-1 bg-white border border-gray-200 shadow-xl rounded-xl w-full max-h-48 overflow-auto py-1">
                                                                        {pegawaiOptions[i].map((p, idx) => (
                                                                            <div
                                                                                key={idx}
                                                                                onClick={() => {
                                                                                    const copy = [...rows];
                                                                                    copy[i].nip = p.nip;
                                                                                    copy[i].nama = p.nama;
                                                                                    setRows(copy);
                                                                                    setPegawaiOptions(prev => ({ ...prev, [i]: [] }));
                                                                                }}
                                                                                className="px-3 py-1.5 hover:bg-blue-50 cursor-pointer text-xs border-b border-gray-50 last:border-0"
                                                                            >
                                                                                <div className="font-bold text-gray-800">{p.nama}</div>
                                                                                <div className="text-[10px] text-gray-500">{p.nip}</div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-1.5 mt-1 text-[10px]">
                                                                <div>
                                                                    <label className="text-gray-400 font-semibold mb-0 block leading-none">NIP / SOBAT ID</label>
                                                                    <input disabled value={row.nip} placeholder="NIP Otomatis" className="block w-full border border-gray-200 rounded-md px-2 py-0.5 bg-white shadow-sm text-gray-600 outline-none disabled:border-transparent disabled:bg-transparent disabled:shadow-none disabled:p-0" />
                                                                </div>
                                                                <div>
                                                                    <label className="text-gray-400 font-semibold mb-0 block leading-none">No ST</label>
                                                                    <input disabled={isLocked} value={row.noST} onChange={(e) => updateField(i, "noST", e.target.value)} placeholder="No ST" className="block w-full border border-gray-300 rounded-md px-2 py-0.5 text-blue-700 font-medium focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-transparent disabled:border-transparent disabled:p-0" />
                                                                </div>
                                                            </div>
                                                        </td>
                                                    )}
                                                    {j === 0 && (
                                                        <td rowSpan={row.trips.length} className="p-2 border-r border-gray-200 text-center align-top pt-3">
                                                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-extrabold text-[10px] shadow-sm">
                                                                {row.trips.length}
                                                            </span>
                                                        </td>
                                                    )}
                                                    <td className="p-2 align-top pt-2.5">
                                                        <input
                                                            disabled={isLocked}
                                                            value={trip.noSPD}
                                                            onChange={(e) => updateTrip(i, j, "noSPD", e.target.value)}
                                                            placeholder="No SPD..."
                                                            className="w-full border border-gray-300 rounded-md px-2 py-1 text-xs font-medium text-blue-700 focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-transparent disabled:border-transparent disabled:px-0"
                                                        />
                                                    </td>
                                                    <td className="p-2 align-top pt-2.5">
                                                        <select
                                                            disabled={isLocked}
                                                            value={trip.asal}
                                                            onChange={(e) => updateTrip(i, j, "asal", e.target.value)}
                                                            className="w-full border border-gray-300 rounded-md px-2 py-1 text-xs focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-transparent disabled:border-transparent disabled:appearance-none disabled:px-0 disabled:text-gray-800 font-medium"
                                                        >
                                                            <option value="">Pilih Asal</option>
                                                            {kecamatan.map((k, idx) => <option key={idx} value={k}>{k}</option>)}
                                                        </select>
                                                    </td>
                                                    <td className="p-2 align-top pt-2.5">
                                                        <select
                                                            disabled={isLocked}
                                                            value={trip.tujuan}
                                                            onChange={(e) => updateTrip(i, j, "tujuan", e.target.value)}
                                                            className="w-full border border-gray-300 rounded-md px-2 py-1 text-xs focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-transparent disabled:border-transparent disabled:appearance-none disabled:px-0 disabled:text-gray-800 font-medium"
                                                        >
                                                            <option value="">Pilih Tujuan</option>
                                                            {kecamatan.map((k, idx) => <option key={idx} value={k}>{k}</option>)}
                                                        </select>
                                                    </td>
                                                    { /* Di dalam row.trips.map((trip, j) => { ... */}
                                                    <td className="p-2 text-center align-top pt-2.5">
                                                        {Number(trip.statusLaporan) === 1 ? (
                                                            <span className="text-green-600 font-bold text-lg" title="Sudah Upload">
                                                                ✅
                                                            </span>
                                                        ) : (
                                                            <span className="text-gray-300" title="Belum Upload">
                                                                —
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="p-2 text-right space-x-1.5 whitespace-nowrap align-top pt-2.5">
                                                        {j === 0 && !isLocked && (
                                                            <button onClick={() => addTrip(i)} title="Tambah Rute" className="text-blue-700 hover:bg-blue-600 hover:text-white px-2 py-1 rounded-md text-[10px] font-bold border border-blue-200 bg-blue-50 shadow-sm transition-colors">
                                                                + Rute
                                                            </button>
                                                        )}
                                                        {j === 0 && (
                                                            <button onClick={() => handlePrintByRow(row)} title="Print SPD Pegawai Ini" className="text-indigo-700 hover:bg-indigo-600 hover:text-white px-2 py-1 rounded-md text-[10px] font-bold border border-indigo-200 bg-indigo-50 shadow-sm transition-colors">
                                                                🖨️ {isLocked ? "Cetak" : ""}
                                                            </button>
                                                        )}
                                                        {trip.rowIndex && !isLocked && (
                                                            <button onClick={() => handleDeleteSingleTrip(trip.rowIndex)} title="Hapus Rute" className="text-red-500 hover:bg-red-500 hover:text-white px-1.5 py-1 rounded-md text-[10px] font-bold border border-red-100 bg-red-50 transition-colors opacity-60 group-hover:opacity-100">
                                                                🗑️
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        });
                                    })}
                                </tbody>
                            </table>
                            {rows.length === 0 && !loading && (
                                <div className="text-center py-10 text-gray-400 bg-gray-50/50">
                                    <svg className="mx-auto h-10 w-10 text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                    </svg>
                                    <p className="font-medium text-sm">Belum ada data pegawai untuk survei ini.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col xl:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                        <div className="w-full xl:w-auto flex gap-2">
                            <label className="cursor-pointer bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 px-6 py-3 rounded-xl font-bold transition-colors text-sm flex justify-center items-center gap-2">
                                📊 Import Excel
                                <input type="file" accept=".xlsx, .xls" className="hidden" onChange={handleImportExcel} />
                            </label>
                            {!isLocked && (
                                <button onClick={addEmployee} className="w-full md:w-auto bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 px-6 py-3 rounded-xl font-bold transition-colors text-sm flex justify-center items-center gap-2">
                                    <span className="text-lg leading-none">+</span> Petugas Manual
                                </button>
                            )}
                        </div>
                        <div className="flex flex-wrap justify-center xl:justify-end items-center gap-3 w-full xl:w-auto">
                            <div className="flex items-center gap-2 bg-indigo-50/50 p-1.5 rounded-xl border border-indigo-100">
                                <div className="px-3 flex flex-col justify-center">
                                    <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-400">Cetak SPD</span>
                                    <span className="text-xs font-semibold text-indigo-800">Hal. Belakang</span>
                                </div>
                                <button onClick={handlePrintSelected} className="bg-white border border-indigo-200 text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg font-bold shadow-sm transition-colors text-sm">
                                    🖨️ Terpilih
                                </button>
                                <button onClick={handlePrintAll} className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-lg font-bold shadow-md shadow-indigo-200 transition-colors text-sm">
                                    🖨️ Semua
                                </button>
                            </div>
                            <div className="h-8 w-px bg-gray-200 hidden md:block mx-1"></div>
                            {isNewData ? (
                                <button onClick={() => handleSaveOrUpdate("save")} className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-md shadow-blue-200 hover:bg-blue-700 transition-colors text-sm">
                                    💾 Simpan SPD Baru
                                </button>
                            ) : (
                                <>
                                    {isLocked ? (
                                        <button onClick={() => setIsLocked(false)} className="bg-amber-500 text-white px-6 py-2.5 rounded-xl font-bold shadow-md shadow-amber-200 hover:bg-amber-600 transition-colors text-sm">
                                            ✏️ Edit Data Tabel
                                        </button>
                                    ) : (
                                        <button onClick={() => handleSaveOrUpdate("update")} className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-md shadow-green-200 hover:bg-green-700 transition-colors text-sm">
                                            💾 Simpan Perubahan
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )
            }

            {/* IMPORT MODAL */}
            {importState.isImporting && (
                <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-md z-[200] flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-lg rounded-[2.8rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className={`p-10 text-center ${importState.isFinished ? "bg-green-50" : "bg-blue-50"}`}>
                            <div className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center mb-6 shadow-xl ${importState.isFinished ? "bg-white text-green-500" : "bg-white text-blue-500"}`}>
                                {importState.isFinished ? <CheckCircle2 size={40} /> : <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />}
                            </div>
                            <h3 className="text-2xl font-black text-slate-800">{importState.isFinished ? "Import Berhasil!" : "Memproses Excel"}</h3>
                            <p className="text-sm text-slate-500 font-medium mt-1">{importState.current} dari {importState.total} Petugas</p>
                        </div>
                        <div className="p-10 space-y-8">
                            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                                <div className="bg-blue-600 h-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(37,99,235,0.5)]" style={{ width: `${(importState.current / importState.total) * 100}%` }} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50/80 p-5 rounded-3xl text-center border border-slate-100">
                                    <span className="block text-3xl font-black text-green-600">{importState.success}</span>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Valid</span>
                                </div>
                                <div className="bg-slate-50/80 p-5 rounded-3xl text-center border border-slate-100">
                                    <span className="block text-3xl font-black text-rose-500">{importState.failed}</span>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gagal</span>
                                </div>
                            </div>
                            <div className="bg-slate-900 rounded-[1.8rem] p-5 h-40 overflow-y-auto font-mono text-[10px] text-slate-400 leading-relaxed shadow-inner">
                                {importState.logs.map((log, i) => (
                                    <div key={i} className={`mb-1 ${log.includes('✅') ? 'text-green-400' : log.includes('❌') ? 'text-rose-400' : ''}`}>
                                        {log}
                                    </div>
                                ))}
                            </div>
                            <button disabled={!importState.isFinished} onClick={() => setImportState(p => ({ ...p, isImporting: false }))}
                                className="w-full py-5 bg-slate-950 text-white rounded-[1.8rem] font-bold hover:bg-slate-800 transition-all shadow-xl disabled:opacity-30 active:scale-[0.98]">
                                Selesai & Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default KelolaPerjalanan;