import React, { useEffect, useState, useCallback, useMemo } from "react";
import * as XLSX from "xlsx";
import Toast from "../components/toast";
import { validateSPD } from "../utils/validateSPD";
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
    // 1. STATE: KONTROL UI (Tampilan Layar & Notifikasi)
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
        logs: []
    });

    // =========================================================================
    // 2. STATE: DATA MASTER
    // =========================================================================
    const [surveys, setSurveys] = useState([]);
    const [masterSPD, setMasterSPD] = useState([]);
    const [pegawaiMaster, setPegawaiMaster] = useState([]);
    const [kecamatan, setKecamatan] = useState([]);

    // =========================================================================
    // 3. STATE: DATA TRANSAKSI
    // =========================================================================
    const [selectedSurvey, setSelectedSurvey] = useState(null);
    const [rows, setRows] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    const [headerSPD, setHeaderSPD] = useState({
        noSPD: "",
        program: "",
        kegiatan: "",
        komponen: "",
        tglKwitansi: ""
    });

    // =========================================================================
    // 4. STATE: STATUS FORM
    // =========================================================================
    const [isLocked, setIsLocked] = useState(true);
    const [headerLocked, setHeaderLocked] = useState(true);
    const [isNewData, setIsNewData] = useState(true);
    const [pegawaiOptions, setPegawaiOptions] = useState({});

    // =========================================================================
    // 5. FUNGSI HELPER
    // =========================================================================
    const showToast = (message, type = "success") => {
        setToast({ message, type });
    };

    // Mengelompokkan data mentah dari Sheet (per-baris) menjadi grup per-pegawai (nested array)
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
                    noSPK: String(d.noSPK || d["No SPK"] || ""),
                    noBAST: String(d.noBAST || d["No BAST"] || ""),
                    trips: [] // Diinisialisasi sebagai array kosong terlebih dahulu
                };
            }

            // Ambil nilai dari Excel (bersihkan spasi kosong dengan .trim())
            const noSPD = String(d.noSPD || d["No SPD"] || "").trim();
            const asal = String(d.asal || d.Asal || "").trim();
            const tujuan = String(d.tujuan || d.Tujuan || "").trim();

            // KONDISI: Hanya tambahkan rute JIKA minimal salah satu dari (No SPD / Asal / Tujuan) ada isinya di Excel
            if (noSPD !== "" || asal !== "" || tujuan !== "") {
                grouped[key].trips.push({
                    rowIndex: d.rowIndex,
                    noSPD: noSPD,
                    asal: asal || "Mojosongo", // Set default Mojosongo HANYA jika baris ini dianggap rute aktif
                    tujuan: tujuan
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
                    nip: emp.nip,
                    nama: emp.nama,
                    noST: emp.noST,
                    noSPK: emp.noSPK,
                    noBAST: emp.noBAST,
                    noSPD: trip.noSPD,
                    asal: trip.asal,
                    tujuan: trip.tujuan,
                    survey: selectedSurvey?.["Nama Survei"] || ""
                });
            });
        });
        return result;
    };

    // =========================================================================
    // 6. FUNGSI API
    // =========================================================================
    const fetchSurveys = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}?action=getSurveys`);
            const data = await res.json();
            setSurveys(data.reverse());
        } catch (err) {
            showToast("Gagal mengambil daftar survei", "error");
        } finally {
            setLoading(false);
        }
    };

    const saveHeaderSPD = async () => {
        setIsProcessing(true);
        try {
            await fetch(API_BASE, {
                method: "POST",
                body: JSON.stringify({
                    action: "saveSPD",
                    row: selectedSurvey.row,
                    ...headerSPD
                })
            });
            showToast("Header SPD berhasil disimpan ✨");
            setHeaderLocked(true);
        } catch (err) {
            showToast("Gagal menyimpan header SPD", "error");
        } finally {
            setIsProcessing(false);
        }
    };

    const loadSPD = useCallback(async (surveyName) => {
        setLoading(true);
        try {
            const data = await getSPDBySurvey(surveyName);
            if (data.length === 0) {
                setRows([]);
                setIsNewData(true);
                setIsLocked(false);
            } else {
                const grouped = groupDataByNipST(data);
                setRows(grouped);
                setIsNewData(false);
                setIsLocked(true);
            }
        } catch (err) {
            showToast("Gagal memuat data SPD", "error");
        } finally {
            setLoading(false);
        }
    }, []);

    // =========================================================================
    // 7. EXCEL IMPORT LOGIC
    // =========================================================================
    const handleImportExcel = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (evt) => {
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: "binary" });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws);

            if (data.length > 0) {
                const groupedData = groupDataByNipST(data);

                setImportState({
                    isImporting: true, total: groupedData.length, current: 0, success: 0, failed: 0,
                    logs: ["Membaca file Excel..."], isFinished: false
                });

                let failCount = 0;
                let currentLogs = ["Membaca file Excel..."];
                let validDataToSave = [];

                const addLog = (msg) => {
                    currentLogs.unshift(msg);
                    if (currentLogs.length > 50) currentLogs.pop();
                };

                for (let i = 0; i < groupedData.length; i++) {
                    const item = groupedData[i];
                    await new Promise(res => setTimeout(res, 30));

                    const masterPegawai = pegawaiMaster.find(p => String(p.nip) === String(item.nip));

                    if (!masterPegawai) {
                        failCount++;
                        addLog(`❌ Gagal: NIP ${item.nip} tidak terdaftar di Master Pegawai.`);
                    } else {
                        item.nama = masterPegawai.nama;
                        validDataToSave.push(item);
                        addLog(`⏳ Valid: ${item.nama} menunggu penyimpanan...`);
                    }

                    setImportState(prev => ({
                        ...prev, current: i + 1, failed: failCount, logs: [...currentLogs]
                    }));
                }

                if (validDataToSave.length > 0) {
                    addLog(`🔄 Mengirim ${validDataToSave.length} data ke Database...`);
                    setImportState(prev => ({ ...prev, logs: [...currentLogs] }));

                    try {
                        const finalRows = [...rows, ...validDataToSave];

                        if (isNewData && rows.length === 0) {
                            await saveSPD(selectedSurvey["Nama Survei"], finalRows);
                            setIsNewData(false);
                        } else {
                            await updateSPD(selectedSurvey["Nama Survei"], finalRows);
                        }

                        addLog(`✅ SUKSES: Database berhasil menyimpan ${validDataToSave.length} data.`);
                        setImportState(prev => ({ ...prev, success: validDataToSave.length, logs: [...currentLogs] }));

                        setRows(finalRows);
                        setIsLocked(false);
                    } catch (err) {
                        failCount += validDataToSave.length;
                        addLog(`❌ FATAL: Kesalahan server Google Script saat menyimpan data.`);
                        setImportState(prev => ({ ...prev, failed: failCount, logs: [...currentLogs] }));
                    }
                } else {
                    addLog(`ℹ️ Tidak ada data valid yang dapat disimpan ke database.`);
                }

                addLog(`🏁 Proses Selesai.`);
                setImportState(prev => ({ ...prev, logs: [...currentLogs], isFinished: true }));

                if (validDataToSave.length > 0) {
                    showToast(`Import Selesai! ${validDataToSave.length} data ditambahkan.`, "success");
                } else {
                    showToast("Import selesai, tapi tidak ada data valid.", "error");
                }
            }
            e.target.value = "";
        };
        reader.readAsBinaryString(file);
    };

    // =========================================================================
    // 8. LIFECYCLE HOOKS
    // =========================================================================
    useEffect(() => {
        const loadMasterData = async () => {
            try {
                const [dataPegawai, dataKecamatan] = await Promise.all([
                    fetchPegawaiMaster(),
                    fetchKecamatan()
                ]);
                setPegawaiMaster(dataPegawai || []);
                setKecamatan(dataKecamatan || []);
            } catch (err) {
                console.error("Gagal memuat data master:", err);
            }
        };
        loadMasterData();
    }, []);

    useEffect(() => {
        if (view === "list") fetchSurveys();
    }, [view]);

    useEffect(() => {
        if (!selectedSurvey) return;

        loadSPD(selectedSurvey["Nama Survei"]);

        const loadDetailData = async () => {
            try {
                const resMaster = await fetch(`${API_BASE}?action=getMaster`);
                const dataMaster = await resMaster.json();
                setMasterSPD(dataMaster || []);

                const resHeader = await fetch(`${API_BASE}?action=getSurveyDetail&row=${selectedSurvey.row}`);
                const dataHeader = await resHeader.json();

                if (dataHeader.success) {
                    setHeaderSPD({
                        noSPD: dataHeader.data.noSPD || "",
                        program: dataHeader.data.program || "",
                        kegiatan: dataHeader.data.kegiatan || "",
                        komponen: dataHeader.data.komponen || "",
                        tglKwitansi: dataHeader.data.tglKwitansi || ""
                    });
                }
            } catch (error) {
                console.error("Gagal memuat detail pendukung", error);
            }
        };
        loadDetailData();
    }, [selectedSurvey, loadSPD]);

    // =========================================================================
    // 9. FUNGSI HANDLER FORM & TABEL
    // =========================================================================
    const searchPegawaiHandler = (index, keyword) => {
        if (keyword.length < 3) {
            setPegawaiOptions(prev => ({ ...prev, [index]: [] }));
            return;
        }
        const filtered = pegawaiMaster.filter(p => p.nama.toLowerCase().includes(keyword.toLowerCase()));
        setPegawaiOptions(prev => ({ ...prev, [index]: filtered.slice(0, 10) }));
    };

    const addEmployee = () => {
        setRows([...rows, {
            id: Date.now(),
            nip: "",
            nama: "",
            noST: "",
            noSPK: "",
            noBAST: "",
            trips: []
        }]);
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
    // 10. FUNGSI AKSI UTAMA
    // =========================================================================
    // Mencetak 1 baris pegawai yang diklik 
    // (Tombol ini sebenarnya otomatis tersembunyi jika rute 0, jadi aman)
    const handlePrintByRow = (row) => printSPDBelakang(flattenTrips([row]));

    // Mencetak seluruh pegawai di tabel (Hanya yang punya rute)
    const handlePrintAll = () => {
        // Saring baris: pastikan trips ada dan jumlahnya lebih dari 0
        const validEmployees = rows.filter(r => r.trips && r.trips.length > 0);

        if (validEmployees.length === 0) {
            return showToast("Tidak ada data dengan rute perjalanan untuk dicetak!", "error");
        }

        printSPDBelakang(flattenTrips(validEmployees));
    };

    // Mencetak hanya pegawai yang dicentang (Hanya yang punya rute)
    const handlePrintSelected = () => {
        if (selectedRows.length === 0) return showToast("Pilih pegawai dulu!", "error");

        // Saring baris: ID-nya dicentang DAN jumlah trips lebih dari 0
        const validSelectedEmployees = rows.filter(r =>
            selectedRows.includes(r.id) && r.trips && r.trips.length > 0
        );

        if (validSelectedEmployees.length === 0) {
            return showToast("Pegawai yang dicentang tidak memiliki rute perjalanan (Jml = 0)!", "error");
        }

        printSPDBelakang(flattenTrips(validSelectedEmployees));
    };

    const handleSaveOrUpdate = async (mode) => {
        setIsProcessing(true);
        try {
            // --- AWAL TRIK PERBAIKAN ---
            // Kita petakan (map) data rows sebelum dikirim ke database
            const safeRowsToSave = rows.map(row => {
                // Jika pegawai tidak punya rute sama sekali (0)
                if (!row.trips || row.trips.length === 0) {
                    return {
                        ...row,
                        // Berikan 1 rute kosong agar backend GAS bisa membaca dan menulis NIP/Nama-nya ke baris Excel
                        trips: [{ noSPD: "", asal: "", tujuan: "" }]
                    };
                }
                return row; // Jika sudah ada rute, biarkan apa adanya
            });
            // --- AKHIR TRIK PERBAIKAN ---

            if (mode === "save") {
                // Gunakan safeRowsToSave, bukan rows asli
                await saveSPD(selectedSurvey["Nama Survei"], safeRowsToSave);
                showToast("SPD berhasil disimpan 🎉");
            } else {
                // Gunakan safeRowsToSave, bukan rows asli
                await updateSPD(selectedSurvey["Nama Survei"], safeRowsToSave);
                showToast("SPD berhasil diperbarui ✨");
            }

            // Saat dimuat ulang, fungsi groupDataByNipST otomatis membuang rute bayangan ini
            await loadSPD(selectedSurvey["Nama Survei"]);
        } catch (err) {
            showToast(`Gagal ${mode === "save" ? "menyimpan" : "memperbarui"} data`, "error");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDeleteSingleTrip = async (rowIndexSheet) => {
        if (!window.confirm("Hapus perjalanan ini?")) return;
        setIsProcessing(true);
        try {
            await deleteSPD(rowIndexSheet);
            await loadSPD(selectedSurvey["Nama Survei"]);
            showToast("Data dihapus");
        } catch (error) {
            showToast("Gagal menghapus data", "error");
        } finally {
            setIsProcessing(false);
        }
    };

    // =========================================================================
    // 11. PEMROSESAN OTOMATIS
    // =========================================================================
    const filteredSurveys = useMemo(() => {
        return surveys.filter((s) => {
            const namaSurvei = s["Nama Survei"] ? s["Nama Survei"].toLowerCase() : "";
            return namaSurvei.includes(searchTerm.toLowerCase());
        });
    }, [surveys, searchTerm]);

    const { kegiatanList, komponenList } = useMemo(() => {
        const selectedP = masterSPD.find(p => p.nama === headerSPD.program);
        const kList = selectedP?.kegiatan || [];
        const selectedK = kList.find(k => k.nama === headerSPD.kegiatan);
        const cList = selectedK?.komponen || [];
        return { kegiatanList: kList, komponenList: cList };
    }, [headerSPD.program, headerSPD.kegiatan, masterSPD]);

    // =========================================================================
    // 12. TAMPILAN ANTARMUKA
    // =========================================================================
    return (
        <div className="relative min-h-screen p-4 md:p-8 bg-slate-50">
            {(loading || isProcessing) && (
                <div className="fixed inset-0 bg-white/70 backdrop-blur-sm z-50 flex flex-col items-center justify-center transition-all">
                    <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-blue-600 border-solid"></div>
                    <p className="mt-4 font-bold text-blue-800 tracking-wide shadow-sm">
                        {isProcessing ? "Sedang memproses data..." : "Memuat data..."}
                    </p>
                </div>
            )}

            {view === "list" ? (
                <div className="space-y-6 max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Cetak SPD Halaman Belakang</h1>
                        <div className="relative w-full md:w-80">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Cari nama survei..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow shadow-sm"
                            />
                        </div>
                    </div>

                    {filteredSurveys.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 border-dashed">
                            <p className="text-gray-500 font-medium">Tidak ada survei yang cocok dengan "{searchTerm}"</p>
                            <button onClick={() => setSearchTerm("")} className="mt-2 text-blue-500 hover:underline text-sm">
                                Hapus pencarian
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredSurveys.map((s, i) => (
                                <div
                                    key={i}
                                    onClick={() => { setSelectedSurvey(s); setView("detail"); }}
                                    className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[180px]"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${s.Status === "Aktif"
                                            ? "bg-green-50 text-green-700 border-green-200"
                                            : "bg-red-50 text-red-700 border-red-200"
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${s.Status === "Aktif" ? "bg-green-500" : "bg-red-500"}`}></span>
                                            {s.Status || "Status Tidak Diketahui"}
                                        </span>
                                        <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="font-bold text-xl text-gray-800 group-hover:text-blue-600 line-clamp-2 mb-2 transition-colors">
                                            {s["Nama Survei"]}
                                        </h2>
                                        <p className="text-sm text-gray-500 line-clamp-2">
                                            {s["Deskripsi"] || "Ketuk kartu ini untuk melihat rincian SPD dan mencetak SPD halaman belakang."}
                                        </p>
                                    </div>
                                    <div className="mt-5 pt-4 border-t border-gray-50 flex items-center justify-between">
                                        <p className="text-sm text-blue-500 font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                            Rincian <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div className="space-y-6 animate-fadeIn max-w-[1400px] mx-auto">
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

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
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
            )}

            {importState.isImporting && (
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col">
                        <div className={`p-6 border-b transition-colors ${importState.isFinished ? 'bg-green-50' : 'bg-gray-50'}`}>
                            <h3 className={`text-xl font-extrabold ${importState.isFinished ? 'text-green-700' : 'text-gray-800'}`}>
                                {importState.isFinished ? '✅ Proses Selesai!' : 'Import Data Excel'}
                            </h3>
                            <p className={`text-sm mt-1 ${importState.isFinished ? 'text-green-600 font-medium' : 'text-gray-500'}`}>
                                {importState.isFinished ? 'Semua baris telah selesai divalidasi dan disimpan.' : 'Mencocokkan NIP dan menarik data nama...'}
                            </p>
                        </div>
                        <div className="p-6 space-y-6">
                            <div>
                                <div className="flex justify-between text-sm font-semibold mb-2">
                                    <span className={importState.isFinished ? 'text-green-600' : 'text-gray-700'}>
                                        {importState.isFinished ? 'Selesai!' : 'Memproses...'}
                                    </span>
                                    <span>{importState.current} / {importState.total}</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                                    <div
                                        className={`${importState.isFinished ? 'bg-green-500' : 'bg-blue-500'} h-full transition-all`}
                                        style={{ width: `${importState.total > 0 ? (importState.current / importState.total) * 100 : 0}%` }}>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-green-50 rounded-2xl p-4 text-center"><div className="text-3xl font-extrabold text-green-600">{importState.success}</div><div className="text-xs font-bold text-green-800">Data Valid</div></div>
                                <div className="bg-red-50 rounded-2xl p-4 text-center"><div className="text-3xl font-extrabold text-red-600">{importState.failed}</div><div className="text-xs font-bold text-red-800">NIP Tidak Valid</div></div>
                            </div>
                            <div className="bg-slate-900 rounded-2xl p-4 h-48 overflow-y-auto text-[11px] font-mono space-y-2">
                                {importState.logs.map((log, i) => <div key={i} className={`${log.includes('✅') ? 'text-green-400' : ''} ${log.includes('❌') ? 'text-red-400' : ''} ${!log.match(/[✅❌]/) ? 'text-slate-300' : ''}`}>{log}</div>)}
                            </div>
                        </div>
                        <div className="p-4 bg-gray-50 flex justify-end">
                            <button
                                disabled={!importState.isFinished}
                                onClick={() => setImportState(prev => ({ ...prev, isImporting: false }))}
                                className={`px-8 py-2.5 rounded-xl font-bold transition-all shadow-sm
                                    ${importState.isFinished ? 'bg-green-600 text-white hover:bg-green-700 hover:shadow-md hover:-translate-y-0.5' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
                                `}>
                                {importState.isFinished ? 'Oke, Tutup Jendela' : 'Mohon Tunggu...'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </div>
    );
}

export default KelolaPerjalanan;