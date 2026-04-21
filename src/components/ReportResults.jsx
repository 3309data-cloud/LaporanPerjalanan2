import React, { useState } from "react";
import ReportPreview from "./ReportPreview";
import { printReport } from "./printReport";

function ReportResults({ filtered = [], selected = {} }) {
  const { survei, kegiatan, nama, tanggal } = selected;
  const isComplete = survei && kegiatan && nama && tanggal;

  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = async () => {
    if (filtered.length === 0) return;
    setIsPrinting(true);
    try {
      const sections = ["OLD"];
      await printReport(filtered[0], sections);
    } catch (error) {
      console.error("Print Error:", error);
      alert("Gagal memproses dokumen.");
    } finally {
      setIsPrinting(false);
    }
  };

  return (
    <section className="bg-white rounded-2xl shadow-sm border overflow-hidden mb-20">
      {/* LOADING OVERLAY KHUSUS PRINT */}
      {isPrinting && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center">
            <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-blue-600 border-solid"></div>
            <p className="mt-4 font-bold text-blue-800 tracking-wide shadow-sm">Menyiapkan Printer...</p>
          </div>
        </div>
      )}

      {/* HEADER PREVIEW */}
      <div className="p-4 border-b flex justify-between items-center bg-gray-50/50">
        <h2 className="font-bold text-gray-800 text-sm">Preview Laporan</h2>
        
        {/* Tombol Print Desktop (Sembunyi di Mobile) */}
        {isComplete && filtered.length > 0 && (
          <button 
            onClick={handlePrint}
            disabled={isPrinting}
            className="hidden sm:block bg-blue-600 text-white px-6 py-2 rounded-lg text-xs font-bold active:scale-95 transition disabled:opacity-50"
          >
            🖨️ Cetak Laporan
          </button>
        )}
      </div>

      <div className="p-2 sm:p-6 bg-gray-100/30">
        {!isComplete ? (
          <div className="py-20 text-center">
            <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest px-10">
              Silakan lengkapi filter secara berurutan terlebih dahulu
            </p>
          </div>
        ) : filtered.length > 0 ? (
          <div className="flex flex-col">
            {/* WRAPPER SCROLL */}
            <div className="overflow-x-auto pb-4 scrollbar-hide">
              <div className="min-w-[850px] origin-top-left scale-[0.42] sm:scale-100 transition-transform mb-[-450px] sm:mb-0" 
                   style={{ height: "fit-content" }}>
                <div id="report-container">
                  {filtered.map((row, i) => <ReportPreview key={i} row={row} />)}
                </div>
              </div>
            </div>

            <p className="sm:hidden text-center text-[10px] text-gray-400 mt-4 mb-2 font-medium italic">
              ↔️ Geser untuk melihat detail laporan
            </p>

            {/* TOMBOL PRINT MOBILE (Floating / Sticky di bawah) */}
            <div className="sm:hidden mt-4">
               <button 
                onClick={handlePrint}
                disabled={isPrinting}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-sm shadow-lg shadow-blue-200 active:scale-95 transition flex items-center justify-center gap-2"
              >
                {isPrinting ? "Sabar ya..." : "🖨️ Cetak Sekarang"}
              </button>
            </div>
          </div>
        ) : (
          <div className="py-20 text-center font-bold text-red-400 text-xs uppercase tracking-tighter">
            Data tidak ditemukan untuk kombinasi ini
          </div>
        )}
      </div>
    </section>
  );
}

export default ReportResults;