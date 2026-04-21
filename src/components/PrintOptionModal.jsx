import React, { useMemo, useEffect } from "react";

/**
 * PRINT OPTION MODAL (REUSABLE COMPONENT)
 * Mengelola pilihan dokumen yang akan dicetak dengan validasi kelengkapan data.
 */

// Helper Internal untuk mengecek kelengkapan data SPD
const checkSPDStatus = (row) => {
  return !!(
    row?.NoSPD && row?.tglKwitansi &&
    row?.Program1 && row?.Program2 &&
    row?.Kegiatan1 && row?.Kegiatan2 &&
    row?.Komponen1 && row?.Komponen2 &&
    row?.NoLengkapSPD
  );
};

export default function PrintOptionModal({
  open,
  onClose,
  onConfirm,
  printOption,
  setPrintOption,
  rowsToPrint, // Untuk mode Bulk
  printTarget, // Untuk mode Single
}) {
  
  // 1. Hitung Availability hanya saat modal dibuka atau data berubah
  const { availability, isDetailSPDLengkap } = useMemo(() => {
    const rows = printTarget ? [printTarget] : rowsToPrint || [];
    const result = { SPD: true, OLD: true, Kwitansi: true, Riil: true, Randis: true };
    
    if (rows.length === 0) return { availability: result, isDetailSPDLengkap: true };

    rows.forEach((row) => {
      const isComplete = checkSPDStatus(row);
      result.SPD = result.SPD && isComplete;
      result.Kwitansi = result.Kwitansi && isComplete;
      result.Riil = result.Riil && isComplete;
      result.Randis = result.Randis && isComplete;
      // OLD (Laporan Perjadin) biasanya selalu true
    });

    return { availability: result, isDetailSPDLengkap: result.SPD };
  }, [rowsToPrint, printTarget, open]);

  // 2. Auto-uncheck jika dokumen menjadi disabled
  useEffect(() => {
    if (open) {
      const updatedOptions = { ...printOption };
      let changed = false;
      
      Object.keys(availability).forEach((key) => {
        if (!availability[key] && printOption[key]) {
          updatedOptions[key] = false;
          changed = true;
        }
      });

      if (changed) setPrintOption(updatedOptions);
    }
  }, [availability, open]);

  if (!open) return null;

  const docs = [
    { key: "SPD", label: "SPD Halaman Depan" },
    { key: "OLD", label: "Laporan Perjadin" },
    { key: "Kwitansi", label: "Kwitansi" },
    { key: "Riil", label: "Pengeluaran Riil" },
    { key: "Randis", label: "Pernyataan Kendaraan Dinas" },
  ];

  // Helper untuk toggle "Print Semua"
  const handleSelectAll = (val) => {
    const nextOptions = {};
    docs.forEach((doc) => {
      nextOptions[doc.key] = availability[doc.key] ? val : false;
    });
    setPrintOption(nextOptions);
  };

  const isAllChecked = docs.every((d) => !availability[d.key] || printOption[d.key]);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9980] animate-fadeIn">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-[350px] space-y-4 border border-gray-100">
        
        <div className="text-center">
          <h2 className="font-bold text-gray-800 text-lg">Opsi Cetak Laporan</h2>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Pilih dokumen yang ingin dicetak</p>
        </div>

        <div className="space-y-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
          {docs.map((item) => {
            const isDisabled = !availability[item.key];
            return (
              <label 
                key={item.key} 
                className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                  isDisabled ? "opacity-40 cursor-not-allowed" : "hover:bg-blue-50 cursor-pointer"
                }`}
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                  disabled={isDisabled}
                  checked={printOption[item.key]}
                  onChange={(e) => setPrintOption({ ...printOption, [item.key]: e.target.checked })}
                />
                <span className={`text-sm ${isDisabled ? "text-gray-400 font-normal" : "text-gray-700 font-medium"}`}>
                  {item.label}
                </span>
              </label>
            );
          })}
        </div>

        <label className="flex items-center gap-3 px-2 py-1 cursor-pointer group">
          <input
            type="checkbox"
            className="w-4 h-4 rounded text-blue-800 focus:ring-blue-700"
            checked={isAllChecked}
            onChange={(e) => handleSelectAll(e.target.checked)}
          />
          <span className="text-sm font-bold text-blue-900 group-hover:text-blue-700 transition">Pilih Semua Dokumen</span>
        </label>

        {!isDetailSPDLengkap && (
          <div className="flex gap-2 bg-amber-50 border border-amber-200 text-amber-800 px-3 py-2 rounded-xl animate-shake">
            <span className="text-sm">⚠️</span>
            <p className="text-[11px] leading-tight font-medium">
              Beberapa dokumen dinonaktifkan karena <span className="font-bold">Detail SPD</span> belum lengkap.
            </p>
          </div>
        )}

        <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
          <button
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-600 rounded-xl font-semibold hover:bg-gray-200 transition active:scale-95"
            onClick={onClose}
          >
            Batal
          </button>
          <button
            className="flex-[2] px-4 py-2 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition active:scale-95"
            onClick={onConfirm}
          >
            Mulai Cetak
          </button>
        </div>
      </div>
    </div>
  );
}