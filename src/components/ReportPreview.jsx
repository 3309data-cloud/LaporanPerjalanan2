import React, { useEffect, useRef, useState } from "react";
import "../App.css";

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

/** Komponen utama laporan per kegiatan */
function PageABCD({ row, kegiatanIndex }) {
  const containerRef = useRef(null);
  const [pages, setPages] = useState([]);

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
        // Jika bagian B masih bisa dipotong sebagian
        if (sec.classList.contains("section-b")) {
          const remaining = PAGE_HEIGHT - currentHeight - 40;
          const content = sec.querySelector(".boxed-content");

          if (content && remaining > 100) {
            const cloneTop = sec.cloneNode(true);
            const cloneBottom = sec.cloneNode(true);
            const topContent = cloneTop.querySelector(".boxed-content");
            const bottomContent = cloneBottom.querySelector(".boxed-content");

            // bagian atas
            topContent.style.height = remaining + "px";
            topContent.style.overflow = "hidden";

            // bagian bawah = lanjutan
            const titleEl = cloneBottom.querySelector(".boxed-section-title");
            if (titleEl) {
              titleEl.textContent = "B. (Lanjutan) URUTAN KEGIATAN";
            }

            currentPage.push(cloneTop);
            result.push(currentPage);

            // mulai halaman baru, kasih margin top
            cloneBottom.style.marginTop = "40px";
            currentPage = [cloneBottom];
            currentHeight = cloneBottom.offsetHeight + 18;
            continue;
          }
        }

        // simpan halaman penuh
        result.push(currentPage);

        // mulai halaman baru: tambahkan marginTop ke section pertama
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

  /** Data kegiatan */
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
    <>
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
          <div className="boxed-content multiline">{kegiatan}</div>
        </div>

        {/* === C === */}
        <div className="boxed-section section-c" style={{ marginTop: 18 }}>
          <div className="boxed-section-title">
            C. PEJABAT DAN TEMPAT YANG DIKUNJUNGI
          </div>
          <div className="boxed-content" style={{ minHeight: 80 }}>
            {pejabat || "-"}
          </div>
        </div>

        {/* === D === */}
        <div className="boxed-section section-d" style={{ marginTop: 18 }}>
          <div className="boxed-section-title">D. FOTO – FOTO KEGIATAN</div>
          <div className="boxed-content">
            <div className="report-photos">
              {fotoList.length === 0 && <div>- Tidak ada foto -</div>}
              {fotoList.slice(0, 6).map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Foto ${i + 1}`}
                  className="report-photo-img"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* hasil render halaman */}
      {pages.map((sectionList, pIdx) => (
        <div
          className="report-page"
          key={pIdx}
          style={{ marginTop: pIdx === 0 ? 0 : 40 }}
        >
          {pIdx === 0 && (
            <h2 className="report-title">LAPORAN PERJALANAN DINAS</h2>
          )}
          {sectionList.map((sec, i) => (
            <div
              key={i}
              dangerouslySetInnerHTML={{ __html: sec.outerHTML }}
            ></div>
          ))}
        </div>
      ))}
    </>
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
