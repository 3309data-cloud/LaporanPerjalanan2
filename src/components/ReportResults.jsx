// components/ReportResults.jsx
import React from "react";
import ReportPreview from "./ReportPreview";
import { printReportFromDOM } from "./printReport";

function ReportResults({ filtered, selected }) {
  const { survei, kegiatan, nama, tanggal } = selected;
  const noData =
    survei && kegiatan && nama && tanggal && filtered.length === 0;

  return (
    <section className="bg-white p-4 rounded-xl shadow flex flex-col">
      <div className="flex justify-between items-center mb-3 shrink-0">
        <h2 className="text-lg font-semibold">Hasil Laporan</h2>
        {filtered.length > 0 && (
          <button
            onClick={() => printReportFromDOM(filtered[0])}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
          >
            🖨️ Print
          </button>
        )}
      </div>

      {filtered.length > 0 ? (
        <div className="report-container flex-1 overflow-y-auto pr-2 space-y-6">
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
