// components/ReportResults.jsx
import React, { useState } from "react";
import ReportPreview from "./ReportPreview";
import { printReportFromDOM } from "./printReport";
import { exportToWord } from "../utils/exportToWord";

function ReportResults({ filtered, selected }) {
  const { survei, kegiatan, nama, tanggal } = selected;
  const noData = survei && kegiatan && nama && tanggal && filtered.length === 0;

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleExportWord = async () => {
    if (!filtered.length) return;
    setLoading(true);
    setProgress(0);

    try {
      await exportToWord(filtered, "Laporan.docx", (p) => setProgress(p));
    } catch (err) {
      console.error("Gagal export Word:", err);
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  return (
    <section className="bg-white p-4 rounded-xl shadow flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-3 shrink-0">
        <h2 className="text-lg font-semibold">Hasil Laporan</h2>
        {filtered.length > 0 && (
          <div className="flex gap-2">
            <button
              onClick={() => printReportFromDOM(filtered[0])}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
            >
              🖨️ Print
            </button>

            <button
              onClick={handleExportWord}
              className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700"
            >
              📄 Export Word
            </button>
          </div>
        )}
      </div>

      {/* Progress overlay */}
      {loading && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black bg-opacity-40 pointer-events-auto">
          <div className="w-64">
            <div className="w-full h-4 bg-gray-200 rounded overflow-hidden">
              <div
                className="h-4 bg-green-500 transition-all duration-200"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-center text-white text-sm font-semibold mt-2">
              {progress > 0
                ? `Menyiapkan... ${progress}%`
                : "Menyiapkan laporan..."}
            </div>
          </div>
        </div>
      )}

      {/* Report Container */}
      {filtered.length > 0 ? (
        <div
          id="report-container"
          className="report-container"
        >
          {filtered.map((row, i) => (
            <ReportPreview key={i} row={row} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-6 flex-1 flex items-center justify-center">
          {noData
            ? "DATA TIDAK DITEMUKAN"
            : "SILAKAN PILIH NAMA SURVEI, KEGIATAN, NAMA, DAN TANGGAL"}
        </p>
      )}
    </section>
  );
}

export default ReportResults;
