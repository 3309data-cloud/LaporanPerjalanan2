
import React from "react";
import ReactDOM from "react-dom/client";
import ReportPreview from "../components/ReportPreview";
import { fetchImageBase64 } from "../utils/fetchImageBase64";
import { printStyles } from "../styles/printStyles";
import ReportSPD from "../components/new/ReportSPD";
import Kwitansi from "./new/Kwitansi";
import PengeluaranRiil from "./new/PengeluaranRiil";
import PernyataanRandis from "./new/PernyataanRandis";

// 🔥 Cache global agar gambar tidak di-fetch berulang
const imageCache = window.__imageCache || (window.__imageCache = new Map());

// ✅ Mapping report
const reportMap = {
  OLD: ReportPreview,
  SPD: ReportSPD,
  Kwitansi: Kwitansi,
  Riil: PengeluaranRiil,
  Randis: PernyataanRandis
};

export async function renderReportHTML(row, types = ["OLD"]) {
  console.log("=== DEBUG: renderReportHTML START ===");

  // 1️⃣ Kumpulkan semua foto dari field Foto(1)...Foto(5)
  const fotos = [];
  for (let i = 1; i <= 5; i++) {
    const fotoField = row[`Foto(${i})`];
    if (fotoField) {
      fotos.push(
        ...fotoField.split(",").map((f) => f.trim()).filter(Boolean)
      );
    }
  }
  row._fotos = fotos;

  // 2️⃣ Konversi semua foto ke base64 (pakai cache)
  await Promise.all(
    row._fotos.map(async (f, i) => {
      if (f.startsWith("data:")) return;

      const match = f.match(/[-\w]{25,}/);
      const fileId = match ? match[0] : null;
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
        console.error(`Gagal ambil foto base64 foto[${i}]:`, f, err);
      }
    })
  );

  // 3️⃣ Render sementara ke elemen hidden agar layout dihitung
  const tempDiv = document.createElement("div");
  tempDiv.style.position = "fixed";
  tempDiv.style.opacity = "0";
  tempDiv.style.top = "0";
  tempDiv.style.left = "0";
  tempDiv.style.width = "100%";
  document.body.appendChild(tempDiv);

  const root = ReactDOM.createRoot(tempDiv);

  // SUPPORT MULTI REPORT
  root.render(
    <div className="report-container">
      {types.map((type, i) => {
        const Comp = reportMap[type];
        if (!Comp) return null;
        return (
          <div key={i} className="report-page">
            <Comp row={row} forceBase64 />
          </div>
        );
      })}
    </div>
  );

  // 4️⃣ Tunggu render selesai
  await new Promise(requestAnimationFrame);
  await new Promise(requestAnimationFrame);
  await new Promise((resolve) => setTimeout(resolve, 200));

  // 5️⃣ Pastikan semua img jadi base64
  await convertImagesToBase64(tempDiv);

  // 6️⃣ Ambil CSS dari dokumen utama
  const styles = Array.from(document.querySelectorAll("style"))
    .map((s) => s.outerHTML)
    .join("\n");

  // ⭐ INI BAGIAN PALING PENTING ⭐
const htmlResult = `
  <div class="report-root">
    ${tempDiv.innerHTML}
  </div>
`;

  // 7️⃣ Bersihkan DOM sementara
  root.unmount();
  document.body.removeChild(tempDiv);

  console.log("=== DEBUG: renderReportHTML END ===");

  // 🚀 RETURN HTML BUKAN PRINT
  return htmlResult;
}
export async function convertImagesToBase64(root) {
  const imgs = root.querySelectorAll("img");
  await Promise.all(
    Array.from(imgs).map(async (img, i) => {
      const src = img.getAttribute("src");
      if (src && !src.startsWith("data:")) {
        try {
          const match = src.match(/[-\w]{25,}/);
          const fileId = match ? match[0] : null;
          if (!fileId) return;

          if (imageCache.has(fileId)) {
            img.setAttribute("src", imageCache.get(fileId));
            return;
          }

          const base64 = await fetchImageBase64(fileId);
          if (base64) {
            img.setAttribute("src", base64);
            imageCache.set(fileId, base64);
            console.log(`DEBUG: convert img[${i}] berhasil`);
          }
        } catch (e) {
          console.error("Gagal convert img:", src, e);
        }
      }
    })
  );
}