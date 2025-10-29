import React, { useEffect, useRef, useState } from "react";
import "../App.css";

// 🔥 Cache global untuk foto
const imageCache = window.__imageCache || (window.__imageCache = new Map());

function DriveImage({ fileId, alt, onLoadingChange }) {
  const [src, setSrc] = useState(imageCache.get(fileId) || null);

  useEffect(() => {
    if (!fileId) return;

    if (imageCache.has(fileId)) {
      setSrc(imageCache.get(fileId));
      onLoadingChange?.(false);
      return;
    }

    onLoadingChange?.(true);
    const url = `https://script.google.com/macros/s/AKfycbxGvdoKSOvm2ZrykWCvcdNd-puOE5NeOejWdIieMIfOo-gPSmJxuymmNt38MX0H83hK/exec?id=${fileId}`;

    fetch(url)
      .then((res) => res.json())
      .then(({ mime, data }) => {
        const base64 = `data:${mime};base64,${data}`;
        imageCache.set(fileId, base64);
        setSrc(base64);
      })
      .catch((err) => console.error("❌ Gagal ambil foto:", err))
      .finally(() => onLoadingChange?.(false));
  }, [fileId]);

  if (!src) return null;
  return <img src={src} alt={alt} className="report-photo-img" />;
}

/** Utility */
function formatFullDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr.split("/").reverse().join("-"));
  if (isNaN(d)) return dateStr;
  const hari = d.toLocaleDateString("id-ID", { weekday: "long" });
  const tanggal = d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return `${hari}, ${tanggal}`;
}
function formatKecamatan(str) {
  if (!str) return "";
  const nama = str.replace(/^\d+\s*/, "").toLowerCase();
  return "Kecamatan " + nama.charAt(0).toUpperCase() + nama.slice(1);
}
function capitalizeWord(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/** A4 batas tinggi konten efektif (px) */
const PAGE_HEIGHT = 1000;

/** PageABCD → halaman per kegiatan */
function PageABCD({ row, kegiatanIndex }) {
  const containerRef = useRef(null);
  const [pages, setPages] = useState([]);
  const [loadingCount, setLoadingCount] = useState(0);

  const handleLoadingChange = (isLoading) => {
    setLoadingCount((prev) => prev + (isLoading ? 1 : -1));
  };

  useEffect(() => {
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
        if (sec.classList.contains("section-b")) {
          const remaining = PAGE_HEIGHT - currentHeight - 40;
          const content = sec.querySelector(".boxed-content");

          if (content && remaining > 100) {
            const cloneTop = sec.cloneNode(true);
            const cloneBottom = sec.cloneNode(true);
            const topContent = cloneTop.querySelector(".boxed-content");
            const bottomContent = cloneBottom.querySelector(".boxed-content");

            topContent.style.height = remaining + "px";
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
  }, [row, kegiatanIndex]);

  const idx = kegiatanIndex;
  const desa = row[`Desa(${idx})`] || "";
  const kec = row[`Kecamatan(${idx})`] || "";
  const kegiatan = row[`Kegiatan(${idx})`] || "-";
  const pejabat = row[`Nama(${idx})`] || "";
  const foto = row[`Foto(${idx})`] || "";
  const fotoList = foto
    ? foto.split(",").map((f) => f.trim()).filter(Boolean)
    : [];

  return (
    <div className="report-page" style={{ pageBreakAfter: "always", position: "relative" }}>
      {loadingCount > 0 && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-70">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
          <p className="text-gray-700 text-sm font-medium">Memuat foto...</p>
        </div>
      )}

      <div ref={containerRef} style={{ display: "none" }}>
        {/* === A === */}
        <div className="boxed-section section-a">
          <div className="boxed-section-title">A. UMUM</div>
          <table className="boxed-table full-border">
            <tbody>
              <tr>
                <td className="cell-num">
                  <div className="num-label">1.</div>
                  <div className="num-text">Nama Petugas</div>
                </td>
                <td className="cell-content">{row["Nama"] || "-"}</td>
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
                <td className="cell-content">
                  {formatFullDate(row["Tanggal Kunjungan"]) || "-"}
                </td>
                <td className="cell-num">
                  <div className="num-label">6.</div>
                  <div className="num-text">Tanda Tangan Petugas</div>
                </td>
                <td className="cell-small"></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* === B === */}
        <div className="boxed-section section-b" style={{ marginTop: 18 }}>
          <div className="boxed-section-title">
            B. URUTAN KEGIATAN (RINGKASAN HASIL)
          </div>
            <div
  className="boxed-content font-bold"
  style={{ display: "inline-flex", gap: "4px", marginBottom: "2px" }}
>
  <span>{row["Tujuan Kegiatan"] || "-"}</span>
  <span>{row["Nama Survei"] || "-"}</span>
</div>
          <div className="boxed-content multiline">{kegiatan}</div>
        </div>

        {/* === C === */}
        <div className="boxed-section section-c" style={{ marginTop: 18 }}>
          <div className="boxed-section-title">
            C. PEJABAT DAN TEMPAT YANG DIKUNJUNGI
          </div>
          <div className="boxed-content" style={{ minHeight: 80 }}>
            {pejabat.split("\n").map((line, i) => (
              <div key={i}>{line || <br />}</div>
            ))}
          </div>
        </div>

        {/* === D === */}
        <div className="boxed-section section-d" style={{ marginTop: 18 }}>
          <div className="boxed-section-title">D. FOTO – FOTO KEGIATAN</div>
          <div className="boxed-content">
            <div className="report-photos">
              {fotoList.length === 0 && <div>- Tidak ada foto -</div>}
              {fotoList.slice(0, 6).map((link, i) => {
                const match = link.match(/[-\w]{25,}/);
                const fileId = match ? match[0] : null;
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

      {/* Render halaman A4 */}
      <div className="report-title">LAPORAN PERJALANAN DINAS</div>
      {pages.map((sectionList, pIdx) => (
        <div key={pIdx} dangerouslySetInnerHTML={{ __html: sectionList.map((sec) => sec.outerHTML).join("") }} />
      ))}
    </div>
  );
}

/** Wrapper utama */
export default function ReportPreview({ row }) {
  const kegiatanIndexes = [];
  for (let i = 1; i <= 5; i++) {
    const desa = row[`Desa(${i})`];
    const kec = row[`Kecamatan(${i})`];
    const namaResponden = row[`Nama(${i})`];
    const kegiatan = row[`Kegiatan(${i})`];
    const foto = row[`Foto(${i})`];
    if (desa || kec || namaResponden || kegiatan || foto) {
      kegiatanIndexes.push(i);
    }
  }

  return (
    <div>
      {kegiatanIndexes.map((idx) => (
        <PageABCD key={idx} row={row} kegiatanIndex={idx} />
      ))}
    </div>
  );
}
