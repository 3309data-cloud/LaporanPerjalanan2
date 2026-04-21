import { useState, useMemo, useCallback } from "react";
import { useData } from "../context/DataContext";
import { printReport } from "../components/printReport";
import { printStyles } from "../styles/printStyles";
import { flushSync } from "react-dom";
import { renderReportHTML } from "./renderReportHTML";
import PrintOptionModal from "../components/PrintOptionModal";
import { getPrintAvailability, needNoST } from "../utils/printEngine";
import { saveNoST } from "../api/noSTService";

const BULAN_NAMA = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

export default function DashboardTable() {
  const { data } = useData();

  // --- States ---
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [checkedMap, setCheckedMap] = useState({});
  const [noSTModal, setNoSTModal] = useState(false);
  const [noSTValue, setNoSTValue] = useState("");
  const [pendingRandisRows, setPendingRandisRows] = useState([]);
  const [printModal, setPrintModal] = useState(false);
  const [printTarget, setPrintTarget] = useState(null);
  const [bulkRows, setBulkRows] = useState(null);
  const [printOption, setPrintOption] = useState({
    SPD: true, OLD: true, Kwitansi: true, Riil: true, Randis: true,
  });

  // --- Helpers ---
  const parseTanggal = (str) => {
    if (!str) return null;
    const [dd, mm, yyyy] = str.split("/").map(Number);
    return new Date(yyyy, mm - 1, dd);
  };

  const makeRowKey = (pelaksana, tgl, lokasi) => `${pelaksana}__${tgl}__${lokasi}`;

  // --- Logic Pemrosesan Data (Optimasi O(N)) ---
  const dashboardArray = useMemo(() => {
    const dash = {};
    const aktifData = data.filter(row => row["Ket"]?.toLowerCase() === "aktif");

    aktifData.forEach(row => {
      const namaSurvei = row["Nama Survei"];
      const pelaksana = row["NamaCocok"];
      const tglStr = row["Tanggal Kunjungan"];
      if (!namaSurvei || !pelaksana || !tglStr) return;

      const dateObj = parseTanggal(tglStr);
      if (!dateObj) return;

      const bulan = BULAN_NAMA[dateObj.getMonth()];
      const lokasi = `${row["Desa(1)"] || ""}${row["Kecamatan(1)"] ? ", " + row["Kecamatan(1)"].replace(/^\d+\s*/, "") : ""}`;

      if (!dash[namaSurvei]) {
        dash[namaSurvei] = { nama: namaSurvei, bulan: {}, rincian: {} };
        BULAN_NAMA.forEach(b => {
          dash[namaSurvei].bulan[b] = 0;
          dash[namaSurvei].rincian[b] = [];
        });
      }

      dash[namaSurvei].bulan[bulan] += 1;
      let pGroup = dash[namaSurvei].rincian[bulan].find(r => r.pelaksana === pelaksana);

      if (!pGroup) {
        pGroup = { pelaksana, jumlah: 0, items: [] };
        dash[namaSurvei].rincian[bulan].push(pGroup);
      }

      pGroup.jumlah += 1;
      pGroup.items.push({ tglStr, lokasi, originalRow: row });
    });

    return Object.values(dash);
  }, [data]);

  // --- Availability & Validation Logic ---
  const isDetailSPDLengkap = useMemo(() => {
    const rows = printTarget ? [printTarget] : bulkRows || [];
    return rows.length > 0 && rows.every(r =>
      r.NoSPD && r.tglKwitansi && r.Program1 && r.Program2 &&
      r.Kegiatan1 && r.Kegiatan2 && r.Komponen1 && r.Komponen2
    );
  }, [printTarget, bulkRows]);

  const availability = useMemo(() => {
    if (!printModal) return null;
    if (printTarget) return getPrintAvailability(printTarget);
    if (bulkRows?.length) {
      return bulkRows.reduce((acc, row) => {
        const a = getPrintAvailability(row);
        return {
          SPD: acc.SPD && a.SPD, OLD: acc.OLD && a.OLD,
          Kwitansi: acc.Kwitansi && a.Kwitansi, Riil: acc.Riil && a.Riil,
          Randis: acc.Randis && a.Randis, messages: a.messages
        };
      }, { SPD: true, OLD: true, Kwitansi: true, Riil: true, Randis: true });
    }
    return null;
  }, [printModal, printTarget, bulkRows]);

  // --- Core Print Engine ---
  const handlePrint = async (row, sections) => {
    setLoading(true);
    setProgress(50);
    try {
      await printReport(row, sections);
      setProgress(100);
    } finally {
      setTimeout(() => { setLoading(false); setProgress(0); }, 300);
    }
  };

  const handlePrintAll = async (rows, sections) => {
    setLoading(true);
    setProgress(10);
    const iframe = document.createElement("iframe");
    Object.assign(iframe.style, { position: "fixed", opacity: "0", zIndex: "-1" });
    document.body.appendChild(iframe);

    try {
      const styles = Array.from(document.querySelectorAll("style")).map(s => s.outerHTML).join("\n");
      let htmlContent = "";
      for (const row of rows) {
        const html = await renderReportHTML(row, sections);
        htmlContent += `<div class="merged-document">${html}</div><div style="page-break-after:always;"></div>`;
      }

      const doc = iframe.contentWindow.document;
      doc.open();
      doc.write(`<html><head>${styles}${printStyles}</head><body class="printing-mode">${htmlContent}</body></html>`);
      doc.close();

      const images = doc.querySelectorAll("img");
      await Promise.all(Array.from(images).map(img => new Promise(res => {
        if (img.complete) res(); else img.onload = img.onerror = res;
      })));

      setProgress(90);
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
      setProgress(100);
    } finally {
      setTimeout(() => {
        if (document.body.contains(iframe)) document.body.removeChild(iframe);
        setLoading(false);
        setProgress(0);
      }, 1000);
    }
  };

  const doFinalPrint = async (rows) => {
    const sections = Object.keys(printOption).filter(k => printOption[k]);
    if (!rows?.length) return;
    rows.length === 1 ? await handlePrint(rows[0], sections) : await handlePrintAll(rows, sections);
  };

  // --- Action Handlers ---
  const confirmPrint = async () => {
    // 1. Kumpulkan baris yang akan diprint
    const rows = printTarget ? [printTarget] : bulkRows || [];

    // 2. Jika user memilih opsi cetak 'Randis'
    if (printOption.Randis) {
      // Jalankan engine untuk menyaring baris mana yang NoST-nya masih kosong
      const missingNoST = needNoST(rows);

      // Jika ada setidaknya satu baris yang NoST-nya kosong
      if (missingNoST.length > 0) {
        setPendingRandisRows(missingNoST);
        setNoSTModal(true);
        return; // Berhenti untuk meminta input user
      }
    }

    // 3. Jika Randis tidak dipilih, atau semua sudah punya NoST
    // Langsung tutup modal opsi dan print
    setPrintModal(false);
    await doFinalPrint(rows);
  };

  const submitNoST = async () => {
    if (!noSTValue) return alert("Isi NoST terlebih dahulu");
    setLoading(true);
    try {
      const res = await saveNoST(noSTValue, pendingRandisRows);
      if (res.success) {
        pendingRandisRows.forEach(r => { r.NoST = noSTValue; });
        setNoSTModal(false);
        setNoSTValue("");
        setPrintModal(false); // Tutup modal print utama juga
        await doFinalPrint(printTarget ? [printTarget] : bulkRows);
      } else {
        alert("Gagal menyimpan NoST");
      }
    } catch (e) {
      alert("Error simpan NoST");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* 1. Progress Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center">
            <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-blue-600 border-solid"></div>
            <p className="mt-4 font-bold text-blue-800 tracking-wide shadow-sm">Menyiapkan Dokumen...</p>
            <p className="mt-4 font-bold text-blue-800 tracking-wide shadow-sm">Mohon Tunggu Sebentar</p>
          </div>
        </div>
      )}

      {/* 2. Main Dashboard Table */}
      <div className="hidden md:block overflow-x-auto border rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-3">Nama Survei</th>
              {BULAN_NAMA.map(b => <th key={b} className="p-3 text-center">{b}</th>)}
            </tr>
          </thead>
          <tbody>
            {dashboardArray.map(row => (
              <tr key={row.nama} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{row.nama}</td>
                {BULAN_NAMA.map(bulan => (
                  <td
                    key={bulan}
                    className="p-3 text-center cursor-pointer hover:bg-blue-50"
                    onClick={() => {
                      if (row.rincian[bulan]?.length > 0) {
                        setSelected({ nama: row.nama, bulan, rincian: row.rincian[bulan] });
                        const initCheck = {};
                        row.rincian[bulan].forEach(p => p.items.forEach(i => {
                          initCheck[makeRowKey(p.pelaksana, i.tglStr, i.lokasi)] = true;
                        }));
                        setCheckedMap(initCheck);
                      }
                    }}
                  >
                    {row.bulan[bulan] || "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* 📱 2.5 Mobile View - Muncul hanya di layar kecil */}
      <div className="md:hidden space-y-4">
        {dashboardArray.map((row) => (
          <div key={row.nama} className="bg-white border rounded-xl shadow-sm overflow-hidden">
            {/* Header Kartu: Nama Survei */}
            <div className="bg-gray-800 p-3">
              <h3 className="text-white font-bold text-sm leading-tight">{row.nama}</h3>
            </div>

            {/* Isi Kartu: Grid Bulan */}
            <div className="p-3 grid grid-cols-3 gap-2">
              {BULAN_NAMA.map((bulan) => {
                const jumlah = row.bulan[bulan];
                if (!jumlah) return null; // Sembunyikan bulan yang kosong agar ringkas

                return (
                  <button
                    key={bulan}
                    onClick={() => {
                      setSelected({ nama: row.nama, bulan, rincian: row.rincian[bulan] });
                      const initCheck = {};
                      row.rincian[bulan].forEach(p => p.items.forEach(i => {
                        initCheck[makeRowKey(p.pelaksana, i.tglStr, i.lokasi)] = true;
                      }));
                      setCheckedMap(initCheck);
                    }}
                    className="flex flex-col items-center justify-center p-2 rounded-lg bg-blue-50 border border-blue-100 active:bg-blue-200 transition-colors"
                  >
                    <span className="text-[10px] uppercase font-bold text-black-400">{bulan.substring(0, 3)}</span>
                    <span className="text-lg font-bold text-blue-700">{jumlah}</span>
                  </button>
                );
              })}
            </div>

            {/* Footer Kartu */}
            <div className="px-3 py-2 bg-gray-50 border-t flex justify-between items-center text-[10px] text-gray-500 font-medium">
              <span>Total Setahun</span>
              <span className="bg-gray-200 px-2 py-0.5 rounded text-gray-700">
                {Object.values(row.bulan).reduce((a, b) => a + b, 0)} Perjalanan
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Modal Detail Rincian */}
      {selected && (
        <div className="fixed inset-0 z-[50] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="p-4 border-b flex justify-between items-center bg-gray-50 rounded-t-xl">
              <h3 className="font-bold">{selected.nama} - {selected.bulan}</h3>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-red-500">✕</button>
            </div>

            <div className="overflow-y-auto p-4">
              <table className="w-full text-xs border">
                <thead className="bg-gray-100 sticky top-0">
                  <tr>
                    <th className="border p-2 text-center">
                      <input
                        type="checkbox"
                        checked={Object.values(checkedMap).every(v => v)}
                        onChange={(e) => {
                          const next = {};
                          Object.keys(checkedMap).forEach(k => next[k] = e.target.checked);
                          setCheckedMap(next);
                        }}
                      />
                    </th>
                    <th className="border p-2">Pelaksana</th>
                    <th className="border p-2 text-center">Jml</th>
                    <th className="border p-2">Tanggal</th>
                    <th className="border p-2">Lokasi Tujuan</th>
                    <th className="border p-2 text-center">Cetak</th>
                  </tr>
                </thead>
                <tbody>
                  {selected.rincian.map(pGroup => pGroup.items.map((item, idx) => {
                    const key = makeRowKey(pGroup.pelaksana, item.tglStr, item.lokasi);
                    return (
                      <tr key={key} className="hover:bg-gray-50">
                        <td className="border p-2 text-center">
                          <input
                            type="checkbox"
                            checked={checkedMap[key] || false}
                            onChange={(e) => setCheckedMap(prev => ({ ...prev, [key]: e.target.checked }))}
                          />
                        </td>
                        {idx === 0 && (
                          <>
                            <td className="border p-2 font-medium bg-white" rowSpan={pGroup.items.length}>{pGroup.pelaksana}</td>
                            <td className="border p-2 text-center bg-white" rowSpan={pGroup.items.length}>{pGroup.jumlah}</td>
                          </>
                        )}
                        <td className="border p-2 text-center">{item.tglStr}</td>
                        <td className="border p-2">{item.lokasi}</td>
                        <td className="border p-2 text-center">
                          <button
                            className="p-1 hover:bg-blue-100 rounded"
                            onClick={() => { setPrintTarget(item.originalRow); setBulkRows(null); setPrintModal(true); }}
                          >🖨️</button>
                        </td>
                      </tr>
                    );
                  }))}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t flex justify-end gap-2 bg-gray-50 rounded-b-xl">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-bold"
                onClick={() => {
                  const toPrint = [];
                  selected.rincian.forEach(p => p.items.forEach(i => {
                    if (checkedMap[makeRowKey(p.pelaksana, i.tglStr, i.lokasi)]) toPrint.push(i.originalRow);
                  }));
                  if (toPrint.length === 0) return alert("Pilih minimal satu data");
                  setBulkRows(toPrint);
                  setPrintTarget(null);
                  setPrintModal(true);
                }}
              >
                Cetak Terpilih ({Object.values(checkedMap).filter(v => v).length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Modal Opsi Cetak & NoST Input */}
      <PrintOptionModal
        open={printModal}
        onClose={() => setPrintModal(false)}
        onConfirm={confirmPrint}
        printOption={printOption}
        setPrintOption={setPrintOption}
        rowsToPrint={bulkRows}
        printTarget={printTarget}
      />

      {noSTModal && (
        <div className="fixed inset-0 z-[9990] flex items-center justify-center bg-black/60">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-80">
            <h4 className="font-bold text-center mb-4">Nomor Surat Tugas</h4>
            <input
              className="w-full border-2 border-blue-100 p-3 rounded-lg focus:border-blue-500 outline-none transition"
              placeholder="Contoh: B-123/BPS/..."
              value={noSTValue}
              onChange={(e) => setNoSTValue(e.target.value)}
              autoFocus
            />
            <div className="flex gap-2 mt-6">
              <button className="flex-1 py-2 bg-gray-100 rounded-lg" onClick={() => setNoSTModal(false)}>Batal</button>
              <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-bold" onClick={submitNoST}>Simpan & Print</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}