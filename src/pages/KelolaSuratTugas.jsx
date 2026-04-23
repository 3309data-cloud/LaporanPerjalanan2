import React, { useEffect, useState, useMemo } from "react";
import { createRoot } from "react-dom/client";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { flushSync } from "react-dom";
import * as XLSX from "xlsx";
import { 
  Search, FileText, ChevronLeft, Plus, 
  Save, Edit3, Download, Trash2, CheckCircle2,
  Users, Calendar, Info, UploadCloud, X
} from "lucide-react";

import SuratTugas from "../components/new/SuratTugas";
import Toast from "../components/toast";
import { fetchPegawaiMaster } from "../api/spdSevice";

const API_BASE = "https://script.google.com/macros/s/AKfycbyj-1nroXJU82TXfykW7dBJh8rCfLOKPWQqNLqr20JWVp1zm44VBnqft5xTlNdkIqeLSQ/exec";

export default function KelolaSuratTugas() {
  // --- States ---
  const [view, setView] = useState("list"); // list, kegiatan-list, detail
  const [searchTerm, setSearchTerm] = useState("");
  const [isLocked, setIsLocked] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [toast, setToast] = useState(null);

  const [surveys, setSurveys] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [kegiatanList, setKegiatanList] = useState([]);
  const [selectedKegiatan, setSelectedKegiatan] = useState(null);
  const [pegawaiMaster, setPegawaiMaster] = useState([]);
  const [pegawaiOptions, setPegawaiOptions] = useState({});

  const [headerST, setHeaderST] = useState({
    menimbang: "Berdasarkan Surat dari ......... Nomor .......... tanggal ......... mengenai .........., maka perlu menugaskan nama tersebut dalam Surat Tugas ini sebagai Petugas ..........",
    untuk: "Melakukan ........... ",
    jangkaWaktu: "",
    tanggalST: ""
  });
  const [petugasRows, setPetugasRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  // State khusus Import Excel
  const [importState, setImportState] = useState({
    isImporting: false,
    total: 0,
    current: 0,
    success: 0,
    failed: 0,
    logs: [],
    isFinished: false
  });

  // --- Effects ---
  useEffect(() => {
    const init = async () => {
      const data = await fetchPegawaiMaster();
      setPegawaiMaster(data || []);
    };
    init();
  }, []);

  useEffect(() => {
    if (view === "list") fetchSurveys();
  }, [view]);

  // --- Handlers ---
  const showToast = (message, type = "success") => setToast({ message, type });

  const fetchSurveys = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}?action=getSurveys`);
      const data = await res.json();
      setSurveys(data.reverse());
    } catch (err) {
      showToast("Gagal muat survei", "error");
    } finally {
      setLoading(false);
    }
  };

  const handlePilihSurvei = async (survey) => {
    setSelectedSurvey(survey);
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}?action=getSTKegiatan&survey=${encodeURIComponent(survey["Nama Survei"])}`);
      const data = await res.json();
      setKegiatanList(data || []);
      setView("kegiatan-list");
    } catch (err) {
      showToast("Gagal muat kegiatan", "error");
    } finally {
      setLoading(false);
    }
  };

  const handlePilihKegiatan = async (kegiatan) => {
    setSelectedKegiatan(kegiatan);
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}?action=getSTDetail&survey=${encodeURIComponent(selectedSurvey["Nama Survei"])}&kegiatan=${encodeURIComponent(kegiatan.nama)}`);
      const result = await res.json();
      if (result.success) {
        setHeaderST(result.header || { menimbang: "", untuk: "", jangkaWaktu: "", tanggalST: "" });
        setPetugasRows(result.petugas || []);
      }
      setView("detail");
    } catch (err) {
      showToast("Gagal muat detail", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveST = async () => {
    setIsProcessing(true);
    try {
      const payload = {
        action: "saveSTData",
        surveyName: selectedSurvey["Nama Survei"],
        kegiatanName: selectedKegiatan.nama,
        header: headerST,
        petugas: petugasRows
      };
      await fetch(API_BASE, { method: "POST", body: JSON.stringify(payload) });
      showToast("Data ST Berhasil disimpan ✨");
      setIsLocked(true);
    } catch (err) {
      showToast("Gagal simpan data", "error");
    } finally {
      setIsProcessing(false);
    }
  };

const handleImportExcel = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (evt) => {
    try {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);

      if (data.length > 0) {
        setImportState({
          isImporting: true,
          total: data.length,
          current: 0,
          success: 0,
          failed: 0,
          logs: ["Membaca data Excel..."],
          isFinished: false
        });

        let validData = [];
        
        for (let i = 0; i < data.length; i++) {
          const item = data[i];
          const keys = Object.keys(item);

          // --- LOGIKA NORMALISASI KOLOM ---
          
          // 1. Cari kolom NIP
          const nipKey = keys.find(k => k.toLowerCase().replace(/[\s._]/g, "") === "nip");
          const nipValue = nipKey ? String(item[nipKey]).trim() : "";

          // 2. Cari kolom NO ST
          const noSTKey = keys.find(k => k.toLowerCase().replace(/[\s._]/g, "").includes("nost"));
          const noSTValue = noSTKey ? String(item[noSTKey]).trim() : "";

          // 3. Cari master pegawai berdasarkan NIP
          const master = pegawaiMaster.find(p => String(p.nip) === nipValue);

          // --- LOGIKA VALIDASI & ANTI-DUPLIKAT ---

          if (!master) {
            // Jika NIP tidak terdaftar di master
            setImportState(prev => ({
              ...prev,
              current: i + 1,
              failed: prev.failed + 1,
              logs: [`❌ NIP ${nipValue || "Kosong"} tidak ditemukan`, ...prev.logs]
            }));
          } else {
            // Cek apakah kombinasi Nama/NIP + No ST sudah ada di state (petugasRows) 
            // ATAU sudah ada di list yang baru akan di-import (validData)
            const isDuplicateInState = petugasRows.some(p => 
              String(p.nip) === String(master.nip) && String(p.noST) === noSTValue
            );
            
            const isDuplicateInNewData = validData.some(p => 
              String(p.nip) === String(master.nip) && String(p.noST) === noSTValue
            );

            if (isDuplicateInState || isDuplicateInNewData) {
              // Jika duplikat, tampilkan log peringatan dan lewati (skip)
              setImportState(prev => ({
                ...prev,
                current: i + 1,
                failed: prev.failed + 1,
                logs: [`⚠️ ${master.nama} - ST: ${noSTValue || "(Tanpa ST)"} sudah ada (Skip)`, ...prev.logs]
              }));
            } else {
              // Jika data unik (tidak duplikat), masukkan ke antrian valid
              validData.push({
                id: Date.now() + i + Math.random(), // Tambah random agar ID benar-benar unik
                nip: master.nip,
                nama: master.nama,
                noST: noSTValue
              });

              setImportState(prev => ({
                ...prev,
                current: i + 1,
                success: prev.success + 1,
                logs: [`✅ ${master.nama} tervalidasi`, ...prev.logs]
              }));
            }
          }
          
          // Memberi nafas pada UI agar tidak membeku
          await new Promise(res => setTimeout(res, 10));
        }

        // Finalisasi: Gabungkan data baru yang valid ke state utama
        if (validData.length > 0) {
          setPetugasRows(prev => [...prev, ...validData]);
          showToast(`${validData.length} petugas baru berhasil ditambahkan`, "success");
        } else {
          showToast("Tidak ada data baru yang ditambahkan (semua duplikat/invalid)", "warning");
        }
      }
    } catch (err) {
      console.error(err);
      showToast("Gagal memproses file", "error");
    } finally {
      setImportState(prev => ({ ...prev, isFinished: true }));
      // Reset input file agar bisa import file yang sama lagi jika perlu
      if (e.target) e.target.value = "";
    }
  };
  reader.readAsBinaryString(file);
};

  // --- PDF Logic ---
  const handleExportPDF = async (mode = "all", singleRowId = null) => {
    let rowsToExport = mode === "single" 
      ? petugasRows.filter(r => r.id === singleRowId)
      : mode === "selected"
      ? petugasRows.filter(r => selectedRows.includes(r.id))
      : petugasRows;

    if (rowsToExport.length === 0) return showToast("Pilih petugas dulu!", "error");

    setIsProcessing(true);
    try {
      for (const row of rowsToExport) {
        const namePart = row.nama ? row.nama.split(",")[0].trim() : "Petugas";
        const fileName = `ST_${selectedKegiatan?.nama}_${namePart}.pdf`.replace(/[^a-zA-Z0-9_. -]/g, "_");

        const container = document.createElement("div");
        container.style.position = "fixed";
        container.style.left = "-9999px";
        container.style.width = "794px";
        document.body.appendChild(container);

        const root = createRoot(container);
        flushSync(() => {
          root.render(<SuratTugas row={{
            ...row,
            NamaCocok: row.nama,
            NIP: row.nip,
            NoLengkapSPD: row.noST,
            "Tujuan Kegiatan": headerST.untuk,
            "Nama Survei": "",
            Lama: headerST.jangkaWaktu,
            NoSPD: headerST.tanggalST,
            Menimbang: headerST.menimbang
          }} />);
        });

        await document.fonts.ready;
        const canvas = await html2canvas(container, { scale: 2, useCORS: true });
        root.unmount();
        document.body.removeChild(container);

        const pdf = new jsPDF("p", "mm", "a4");
        const imgData = canvas.toDataURL("image/jpeg", 0.95);
        pdf.addImage(imgData, "JPEG", 10, 10, 190, (canvas.height * 190) / canvas.width);
        pdf.save(fileName);
      }
      showToast("Ekspor PDF Berhasil!");
    } catch (err) {
      showToast("Gagal ekspor PDF", "error");
    } finally {
      setIsProcessing(false);
    }
  };

  const filteredSurveys = useMemo(() => {
    return surveys.filter((s) => s["Nama Survei"]?.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [surveys, searchTerm]);

  // --- Sub-Components ---
  const Breadcrumb = () => (
    <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
      <span className="hover:text-blue-600 cursor-pointer" onClick={() => setView("list")}>Survei</span>
      {selectedSurvey && (
        <>
          <ChevronLeft size={14} className="rotate-180" />
          <span className="hover:text-blue-600 cursor-pointer" onClick={() => setView("kegiatan-list")}>{selectedSurvey["Nama Survei"]}</span>
        </>
      )}
      {selectedKegiatan && view === "detail" && (
        <>
          <ChevronLeft size={14} className="rotate-180" />
          <span className="font-semibold text-gray-800">{selectedKegiatan.nama}</span>
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans text-slate-900">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      {(loading || isProcessing) && (
        <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-md z-[100] flex flex-col items-center justify-center transition-all">
          <div className="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 font-bold text-slate-700">{isProcessing ? "Menyusun PDF..." : "Sinkronisasi..."}</p>
          </div>
        </div>
      )}

      {/* --- VIEW: LIST SURVEI --- */}
      {view === "list" && (
        <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-800">Kelola Surat Tugas</h1>
              <p className="text-slate-500 mt-1">Pilih survei untuk mengelola penugasan pegawai.</p>
            </div>
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Cari nama survei..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSurveys.map((s, i) => (
              <div 
                key={i} 
                onClick={() => handlePilihSurvei(s)}
                className="group bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 hover:border-blue-500 transition-all cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative">
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-blue-200">
                    <FileText size={24} />
                  </div>
                  <h2 className="font-bold text-xl text-slate-800 mb-2">{s["Nama Survei"]}</h2>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-4">{s["Deskripsi"] || "Tidak ada deskripsi."}</p>
                  <div className="flex items-center text-blue-600 text-sm font-bold">
                    Kelola Tugas <ChevronLeft size={16} className="rotate-180 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- VIEW: LIST KEGIATAN --- */}
      {view === "kegiatan-list" && (
        <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
          <Breadcrumb />
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"><Calendar /></span>
                Daftar Kegiatan
              </h2>
              <button 
                onClick={() => {
                  const n = window.prompt("Nama Kegiatan Baru:");
                  if (n) setKegiatanList([...kegiatanList, { id: Date.now(), nama: n }]);
                }}
                className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200"
              >
                <Plus size={18} /> Tambah Kegiatan
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {kegiatanList.map((k) => (
                <div 
                  key={k.id} 
                  onClick={() => handlePilihKegiatan(k)}
                  className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-blue-500 hover:shadow-md cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-slate-400 group-hover:text-blue-500">📁</div>
                    <span className="font-bold text-slate-700">{k.nama}</span>
                  </div>
                  <ChevronLeft size={18} className="rotate-180 text-slate-300 group-hover:text-blue-500 transition-all" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- VIEW: DETAIL / EDIT ST --- */}
      {view === "detail" && (
        <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
          <Breadcrumb />
          
          <div className="flex justify-between items-center mb-6">
             <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-2xl border flex items-center justify-center shadow-sm">
                  <FileText className="text-blue-600" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-800">{selectedKegiatan?.nama}</h1>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">{selectedSurvey?.["Nama Survei"]}</p>
                </div>
             </div>
             <div className="flex gap-3">
                {isLocked ? (
                  <button onClick={() => setIsLocked(false)} className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-6 py-2.5 rounded-2xl font-bold hover:bg-slate-50 transition-all">
                    <Edit3 size={18} /> Buka Kunci Edit
                  </button>
                ) : (
                  <button onClick={handleSaveST} className="flex items-center gap-2 bg-green-600 text-white px-8 py-2.5 rounded-2xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-100">
                    <Save size={18} /> Simpan Perubahan
                  </button>
                )}
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
                  <h3 className="font-bold flex items-center gap-2 text-slate-700"><Info size={18} className="text-blue-500" /> Pengaturan Surat</h3>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase">Menimbang</label>
                      <textarea 
                        disabled={isLocked}
                        value={headerST.menimbang}
                        onChange={(e) => setHeaderST({...headerST, menimbang: e.target.value})}
                        className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm h-32 outline-none focus:ring-2 focus:ring-blue-500 transition-all disabled:opacity-60"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase">Untuk / Keperluan</label>
                      <textarea 
                        disabled={isLocked}
                        value={headerST.untuk}
                        onChange={(e) => setHeaderST({...headerST, untuk: e.target.value})}
                        className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm h-20 outline-none focus:ring-2 focus:ring-blue-500 transition-all disabled:opacity-60"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                       <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase">Jangka Waktu</label>
                        <input 
                          disabled={isLocked}
                          value={headerST.jangkaWaktu}
                          onChange={(e) => setHeaderST({...headerST, jangkaWaktu: e.target.value})}
                          className="w-full bg-slate-50 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-60"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase">Tgl Surat</label>
                        <input 
                          disabled={isLocked}
                          value={headerST.tanggalST}
                          onChange={(e) => setHeaderST({...headerST, tanggalST: e.target.value})}
                          className="w-full bg-slate-50 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-60"
                        />
                      </div>
                    </div>
                  </div>
                </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-visible">
                <div className="p-6 border-b flex justify-between items-center bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <span className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Users size={18} /></span>
                    <h3 className="font-bold text-slate-700">
    Daftar Petugas 
    <span className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 rounded-full text-xs">
        {petugasRows.length}
    </span>
</h3>
                  </div>
                  
                  {!isLocked && (
                    <div className="flex gap-2">
                       <label className="cursor-pointer bg-green-50 text-green-700 px-4 py-2 rounded-xl text-xs font-bold border border-green-200 hover:bg-green-100 transition flex items-center gap-2">
                        <UploadCloud size={14} /> Import Excel
                        <input type="file" accept=".xlsx, .xls" className="hidden" onChange={handleImportExcel} />
                      </label>
                      <button 
                        onClick={() => setPetugasRows([...petugasRows, { id: Date.now(), nip: "", nama: "", noST: "" }])}
                        className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-700 transition flex items-center gap-2"
                      >
                        <Plus size={14} /> Petugas Manual
                      </button>
                    </div>
                  )}
                </div>
                
                <table className="w-full">
                  <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase border-b">
                    <tr>
                      <th className="p-4 text-center w-12">
                        <input 
                          type="checkbox" 
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                          onChange={() => setSelectedRows(selectedRows.length === petugasRows.length ? [] : petugasRows.map(r => r.id))}
                          checked={selectedRows.length === petugasRows.length && petugasRows.length > 0}
                        />
                      </th>
                      <th className="p-4 text-left">Nama / NIP</th>
                      <th className="p-4 text-left">No ST</th>
                      <th className="p-4 text-center">Opsi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {petugasRows.map((row, i) => (
                      <tr key={row.id} className="hover:bg-blue-50/30 transition-colors group">
                        <td className="p-4 text-center">
                          <input 
                            type="checkbox"
                            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                            checked={selectedRows.includes(row.id)}
                            onChange={() => setSelectedRows(prev => prev.includes(row.id) ? prev.filter(x => x !== row.id) : [...prev, row.id])}
                          />
                        </td>
                        <td className="p-4 relative">
                          <input 
                            disabled={isLocked}
                            value={row.nama}
                            onChange={(e) => {
                              const c = [...petugasRows];
                              c[i].nama = e.target.value;
                              setPetugasRows(c);
                              const kw = e.target.value;
                              if(kw.length < 3) setPegawaiOptions(prev => ({...prev, [i]: []}));
                              else {
                                const f = pegawaiMaster.filter(p => p.nama.toLowerCase().includes(kw.toLowerCase())).slice(0,5);
                                setPegawaiOptions(prev => ({...prev, [i]: f}));
                              }
                            }}
                            className="w-full font-bold text-slate-700 bg-transparent outline-none disabled:opacity-100"
                            placeholder="Ketik Nama..."
                          />
                          <div className="text-[10px] text-slate-400 font-medium">{row.nip || "NIP Kosong"}</div>
                          {pegawaiOptions[i]?.length > 0 && !isLocked && (
                            <div className="absolute left-4 right-4 z-50 mt-1 bg-white border border-slate-200 shadow-xl rounded-2xl overflow-hidden animate-in fade-in slide-in-from-top-2">
                               {pegawaiOptions[i].map((p, idx) => (
                                 <div 
                                   key={idx} 
                                   onClick={() => {
                                      const c = [...petugasRows];
                                      c[i].nama = p.nama;
                                      c[i].nip = p.nip;
                                      setPetugasRows(c);
                                      setPegawaiOptions(prev => ({...prev, [i]: []}));
                                   }}
                                   className="p-3 hover:bg-blue-50 cursor-pointer border-b last:border-0"
                                 >
                                    <div className="text-xs font-bold text-slate-700">{p.nama}</div>
                                    <div className="text-[10px] text-slate-400">{p.nip}</div>
                                 </div>
                               ))}
                            </div>
                          )}
                        </td>
                        <td className="p-4 text-blue-700 font-mono text-xs">
                          <input 
                            disabled={isLocked}
                            value={row.noST}
                            onChange={(e) => {
                              const c = [...petugasRows];
                              c[i].noST = e.target.value;
                              setPetugasRows(c);
                            }}
                            className="w-full bg-transparent outline-none font-bold"
                            placeholder="No ST..."
                          />
                        </td>
                        <td className="p-4 text-center">
                          {!isLocked ? (
                            <button onClick={() => setPetugasRows(petugasRows.filter(p => p.id !== row.id))} className="text-rose-500 hover:scale-110 transition"><Trash2 size={18} /></button>
                          ) : (
                            <button onClick={() => handleExportPDF("single", row.id)} className="p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-600 hover:text-white transition-all"><Download size={16} /></button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between p-6 bg-slate-800 rounded-[2rem] text-white shadow-xl">
                 <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-green-400" />
                    <div>
                      <div className="font-bold text-sm">{selectedRows.length > 0 ? `${selectedRows.length} Petugas Dipilih` : "Siap Cetak"}</div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-tighter">Ekspor PDF Masal</div>
                    </div>
                 </div>
                 <button 
                  onClick={() => handleExportPDF(selectedRows.length > 0 ? "selected" : "all")}
                  className="bg-white text-slate-900 px-8 py-3 rounded-2xl font-black text-sm hover:bg-blue-500 hover:text-white transition-all shadow-lg active:scale-95 flex items-center gap-2"
                >
                  <Download size={18} /> Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL IMPORT PROGRESS */}
      {importState.isImporting && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-md z-[200] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className={`p-8 text-center ${importState.isFinished ? "bg-green-50" : "bg-blue-50"}`}>
              <div className="w-16 h-16 mx-auto rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4">
                {importState.isFinished ? 
                  <CheckCircle2 size={32} className="text-green-500" /> : 
                  <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                }
              </div>
              <h3 className="text-xl font-bold text-slate-800">
                {importState.isFinished ? "Import Selesai" : "Mengimpor Data"}
              </h3>
              <p className="text-sm text-slate-500 mt-1">{importState.current} / {importState.total} Baris diproses</p>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-600 h-full transition-all duration-300" 
                  style={{ width: `${(importState.current / importState.total) * 100}%` }} 
                />
              </div>

              <div className="bg-slate-900 rounded-2xl p-4 h-32 overflow-y-auto font-mono text-[10px] text-slate-400">
                {importState.logs.map((log, i) => (
                  <div key={i} className={`mb-1 ${log.includes('✅') ? 'text-green-400' : log.includes('❌') ? 'text-rose-400' : ''}`}>
                    {log}
                  </div>
                ))}
              </div>

              <button 
                disabled={!importState.isFinished}
                onClick={() => setImportState(p => ({ ...p, isImporting: false }))}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all disabled:opacity-20 active:scale-95"
              >
                Tutup & Lihat Tabel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}