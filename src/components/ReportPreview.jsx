import React, { useEffect, useRef, useState, useCallback } from "react";
import "../App.css";
import { printStyles } from "../styles/printStyles";
import DriveImage from "./DriveImage";
import { formatKecamatan } from "../utils/formatKecamatan";
import { formatFullDateHari } from "../utils/formatFullDateHari";

// Konsep A4 @96dpi tetap dipertahankan sesuai kode lama
const PAGE_HEIGHT = 1122;

/**
 * 🧠 Utility: Kapitalisasi kata pertama
 */
const capitalizeWord = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * 📄 PageABCD: Menangani logika pembagian halaman otomatis
 */
function PageABCD({ row, kegiatanIndex }) {
  const containerRef = useRef(null);
  const [pages, setPages] = useState([]);
  const [loadingCount, setLoadingCount] = useState(0);

  // Memastikan sinkronisasi loading foto
  const handleLoadingChange = useCallback((isLoading) => {
    setLoadingCount((prev) => prev + (isLoading ? 1 : -1));
  }, []);

  // Injeksi gaya cetak ke head
  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.innerHTML = printStyles;
    document.head.appendChild(styleEl);
    return () => styleEl.remove();
  }, []);

  /**
   * 🔧 LOGIKA UTAMA: Split Logic (Pertahankan logika asli)
   */
  useEffect(() => {
    if (loadingCount > 0) return;

    const el = containerRef.current;
    if (!el) return;

    const sections = Array.from(el.querySelectorAll(".boxed-section"));
    let currentPage = [];
    let currentHeight = 0;
    const result = [];

    for (let i = 0; i < sections.length; i++) {
      const sec = sections[i];
      const h = sec.offsetHeight + 18;

      if (currentHeight + h > PAGE_HEIGHT) {
        // Kasus khusus: Potong Section B jika melebihi halaman (Logic asli tetap dipertahankan)
        if (sec.classList.contains("section-b")) {
          const remaining = PAGE_HEIGHT - currentHeight - 40;
          const content = sec.querySelector(".boxed-content");

          if (content && remaining > 100) {
            const cloneTop = sec.cloneNode(true);
            const cloneBottom = sec.cloneNode(true);

            const topContent = cloneTop.querySelector(".boxed-content");
            topContent.style.height = `${remaining}px`;
            topContent.style.overflow = "hidden";

            const titleEl = cloneBottom.querySelector(".boxed-section-title");
            if (titleEl) titleEl.textContent = "B. (Lanjutan) URUTAN KEGIATAN";

            currentPage.push(cloneTop);
            result.push(currentPage);

            cloneBottom.style.marginTop = "40px";
            currentPage = [cloneBottom];
            currentHeight = cloneBottom.offsetHeight + 18;
            continue;
          }
        }

        // Buat halaman baru
        result.push(currentPage);
        const newSec = sec.cloneNode(true);
        newSec.style.marginTop = "40px";
        currentPage = [newSec];
        currentHeight = h;
      } else {
        currentPage.push(sec);
        currentHeight += h;
      }
    }

    if (currentPage.length) result.push(currentPage);
    setPages(result);
  }, [row, kegiatanIndex, loadingCount]);

  // Ekstraksi data dari row
  const idx = kegiatanIndex;
  const desa = row[`Desa(${idx})`] || "";
  const kec = row[`Kecamatan(${idx})`] || "";
  const kegiatan = row[`Kegiatan(${idx})`] || "-";
  const pejabat = row[`Nama(${idx})`] || "";
  const fotoStr = row[`Foto(${idx})`] || "";
  const fotoList = fotoStr ? fotoStr.split(",").map((f) => f.trim()).filter(Boolean) : [];

  return (
    <div className="report-page" style={{ pageBreakAfter: "always", position: "relative" }}>
      {/* Spinner Loading Foto */}
      {loadingCount > 0 && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-70">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2" />
          <p className="text-gray-700 text-sm font-medium">Memuat foto kegiatan...</p>
        </div>
      )}

      {/* Hidden Container untuk Kalkulasi Layout */}
      <div ref={containerRef} style={{ display: "none" }}>
        {/* A. UMUM */}
        <div className="boxed-section section-a">
          <div className="boxed-section-title">A. UMUM</div>
          <table className="boxed-table full-border">
            <tbody>
              <tr>
                <td className="cell-num">
                  <div className="num-label">1.</div>
                  <div className="num-text">Nama Petugas</div>
                </td>
                <td className="cell-content">{row["NamaCocok"] || "-"}</td>
                <td className="cell-num">
                  <div className="num-label">4.</div>
                  <div className="num-text">Anggaran / Kegiatan Membiayai</div>
                </td>
                <td className="cell-small">054</td>
              </tr>
              <tr>
                <td className="cell-num">
                  <div className="num-label">2.</div>
                  <div className="num-text">Tujuan</div>
                </td>
                <td className="cell-content">
                  {desa ? capitalizeWord(desa) : "-"}, {formatKecamatan(kec)}
                </td>
                <td className="cell-num">
                  <div className="num-label">5.</div>
                  <div className="num-text">Anggaran / Kegiatan Diperiksa</div>
                </td>
                <td className="cell-small">054</td>
              </tr>
              <tr>
                <td className="cell-num">
                  <div className="num-label">3.</div>
                  <div className="num-text">Jadwal</div>
                </td>
                <td className="cell-content">{formatFullDateHari(row["Tanggal Kunjungan"]) || "-"}</td>
                <td className="cell-num">
                  <div className="num-label">6.</div>
                  <div className="num-text">Tanda Tangan Petugas</div>
                </td>
                <td className="cell-small" />
              </tr>
            </tbody>
          </table>
        </div>

        {/* B. URUTAN KEGIATAN */}
{/* B. URUTAN KEGIATAN */}
<div className="boxed-section section-b" style={{ marginTop: 18 }}>
  <div className="boxed-section-title">B. URUTAN KEGIATAN (RINGKASAN HASIL)</div>
  <div className="boxed-content font-bold mb-[2px]">
    {row["Tujuan Kegiatan"] || "-"} {row["Nama Survei"] || "-"}
  </div>
  <div className="boxed-content multiline">
    {kegiatan.split("\n").map((line, i) => {
      // Regex untuk mendeteksi format jam di awal baris (contoh: 08.00 - 08.30)
      const timeMatch = line.match(/^(\d{2}\.\d{2}\s*-\s*\d{2}\.\d{2})(.*)/);

      if (timeMatch) {
        const [_, time, text] = timeMatch;
        return (
          <div key={i} className="schedule-item">
            <span className="schedule-time">{time}</span>
            <span className="schedule-text">{text.trim()}</span>
          </div>
        );
      }

      // Jika baris tidak diawali jam (lanjutan teks tanpa jam), 
      // beri margin kiri agar sejajar dengan teks di atasnya
      return (
        <div key={i} className="schedule-item">
          <span className="schedule-time" /> {/* Kolom kosong untuk jam */}
          <span className="schedule-text">{line}</span>
        </div>
      );
    })}
  </div>
</div>

        {/* C. PEJABAT */}
        <div className="boxed-section section-c" style={{ marginTop: 18 }}>
          <div className="boxed-section-title">C. PEJABAT DAN TEMPAT YANG DIKUNJUNGI</div>
          <div className="boxed-content min-h-[80px]">
            {pejabat.split("\n").map((line, i) => (
              <div key={i}>{line || <br />}</div>
            ))}
          </div>
        </div>

        {/* D. FOTO */}
        <div className="boxed-section section-d" style={{ marginTop: 18 }}>
          <div className="boxed-section-title">D. FOTO – FOTO KEGIATAN</div>
          <div className="boxed-content">
            <div className="report-photos">
              {fotoList.length === 0 && <div>- Tidak ada foto -</div>}
              {fotoList.slice(0, 6).map((link, i) => {
                const fileId = link.match(/[-\w]{25,}/)?.[0];
                return fileId ? (
                  <DriveImage
                    key={i}
                    fileId={fileId}
                    alt={`Foto ${i + 1}`}
                    onLoadingChange={handleLoadingChange}
                  />
                ) : null;
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Render Hasil Split */}
      <div className="report-title">LAPORAN PERJALANAN DINAS</div>
      {pages.map((sectionList, pIdx) => (
        <div
          key={pIdx}
          className="printable-page-area"
          dangerouslySetInnerHTML={{
            __html: sectionList.map((sec) => sec.outerHTML).join(""),
          }}
        />
      ))}
    </div>
  );
}

/**
 * 📘 ReportPreview (Main Component)
 */
export default function ReportPreview({ row }) {
  if (row["Ket"]?.toLowerCase() !== "aktif") return null;

  const kegiatanIndexes = [];
  for (let i = 1; i <= 5; i++) {
    const hasData = [
      row[`Desa(${i})`], row[`Kecamatan(${i})`],
      row[`Nama(${i})`], row[`Kegiatan(${i})`],
      row[`Foto(${i})`],
    ].some(Boolean);
    if (hasData) kegiatanIndexes.push(i);
  }

  return (
    <div className="report-preview-container">
      {kegiatanIndexes.map((idx) => (
        <PageABCD key={idx} row={row} kegiatanIndex={idx} />
      ))}
    </div>
  );
}