import React from "react";
import ReactDOM from "react-dom/client";
import { fetchImageBase64 } from "../utils/fetchImageBase64";
import { printStyles } from "../styles/printStyles";

// Import Components
import ReportPreview from "../components/ReportPreview";
import ReportSPD from "../components/new/ReportSPD";
import Kwitansi from "./new/Kwitansi";
import PengeluaranRiil from "./new/PengeluaranRiil";
import PernyataanRandis from "./new/PernyataanRandis";

// 🔥 Cache global agar gambar tidak di-fetch berulang
const imageCache = window.__imageCache || (window.__imageCache = new Map());

const reportMap = {
  OLD: ReportPreview,
  SPD: ReportSPD,
  Kwitansi: Kwitansi,
  Riil: PengeluaranRiil,
  Randis: PernyataanRandis
};

/**
 * HELPER: Ekstraksi File ID Google Drive dari URL
 */
const getFileId = (url) => {
  if (!url || typeof url !== "string") return null;
  const match = url.match(/[-\w]{25,}/);
  return match ? match[0] : null;
};
/**
 * OPTIMALISASI: Mencetak laporan berdasarkan data mentah (ROW)
 * Paling stabil untuk hasil profesional.
 */
export async function printReport(row, types = ["OLD"]) {
  console.log("=== printReport: Executing ===");
const needImages = types.includes("OLD");
// 🔥 HANYA laporan OLD yang butuh foto
if (needImages) {
  console.log("Prefetch images for OLD report");

  // 1. Ekstraksi Foto
  const fotos = [];
  for (let i = 1; i <= 5; i++) {
    const field = row[`Foto(${i})`];
    if (field) {
      fotos.push(...field.split(",").map(f => f.trim()).filter(Boolean));
    }
  }
  row._fotos = fotos;

  // 2. Pre-fetch Images ke Base64 (Parallel)
  await Promise.all(
    row._fotos.map(async (url, i) => {
      if (url.startsWith("data:")) return;
      const fileId = getFileId(url);
      if (!fileId) return;

      if (imageCache.has(fileId)) {
        row._fotos[i] = imageCache.get(fileId);
        return;
      }

      try {
        const base64 = await fetchImageBase64(fileId);
        if (base64) {
          row._fotos[i] = base64;
          imageCache.set(fileId, base64);
        }
      } catch (err) {
        console.error("Gagal fetch image:", fileId, err);
      }
    })
  );
} else {
  console.log("Skip image prefetch (not OLD report)");
}

  // 3. Render ke Hidden Container
  const tempDiv = document.createElement("div");
  Object.assign(tempDiv.style, { position: "fixed", opacity: "0", top: "0", left: "0", width: "100%" });
  document.body.appendChild(tempDiv);

  const root = ReactDOM.createRoot(tempDiv);
  root.render(
    <div className="report-container">
      {types.map((type, i) => {
        const Comp = reportMap[type];
        if (!Comp) return null;
        return (
          <div key={type + i} className="report-page" style={{ pageBreakAfter: "always" }}>
            <Comp row={row} forceBase64 />
          </div>
        );
      })}
    </div>
  );

  // Tunggu React selesai render
  await new Promise(res => setTimeout(res, 300));

  // 4. Final Image Check
  await convertImagesToBase64(tempDiv);

  // 5. Styles Collection
  const styles = Array.from(document.querySelectorAll("style"))
    .map(s => s.outerHTML)
    .join("\n");

  // 6. Execute Iframe Print
  await doPrint(tempDiv.innerHTML, styles);

  // 7. Cleanup
  root.unmount();
  document.body.removeChild(tempDiv);
}

/**
 * OPTIMALISASI: Mencetak langsung dari apa yang ada di layar
 */
export async function printReportFromDOM() {
  const container = document.getElementById("report-container");
  if (!container) {
    console.error("Gagal cetak: ID report-container tidak ditemukan di layar.");
    return;
  }

  const clone = container.cloneNode(true);
  await convertImagesToBase64(clone);

  const styles = Array.from(document.querySelectorAll("style"))
    .map(s => s.outerHTML)
    .join("\n");

  await doPrint(clone.innerHTML, styles);
}

export async function convertImagesToBase64(root) {
  const imgs = root.querySelectorAll("img");
  await Promise.all(
    Array.from(imgs).map(async (img) => {
      const src = img.getAttribute("src");
      const fileId = getFileId(src);
      if (!fileId || src.startsWith("data:")) return;

      if (imageCache.has(fileId)) {
        img.setAttribute("src", imageCache.get(fileId));
      } else {
        try {
          const base64 = await fetchImageBase64(fileId);
          if (base64) {
            img.setAttribute("src", base64);
            imageCache.set(fileId, base64);
          }
        } catch (e) {
          console.error("Convert fail:", fileId);
        }
      }
    })
  );
}

async function doPrint(contentHTML, stylesHTML) {
  const iframe = document.createElement("iframe");
  Object.assign(iframe.style, {
    position: "fixed", opacity: "0", pointerEvents: "none", zIndex: "-1"
  });
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow.document;
  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Sensus Ekonomi 2026 - Print</title>
        ${stylesHTML}
        ${printStyles}
      </head>
      <body class="printing-mode">${contentHTML}</body>
    </html>
  `);
  doc.close();

  // Wait for all images in iframe to load
  const images = doc.querySelectorAll("img");
  await Promise.all(Array.from(images).map(img => 
    new Promise(res => { if (img.complete) res(); else img.onload = img.onerror = res; })
  ));

  await new Promise(res => setTimeout(res, 500));
  
  try {
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
  } finally {
    setTimeout(() => {
      if (document.body.contains(iframe)) document.body.removeChild(iframe);
    }, 1000);
  }
}