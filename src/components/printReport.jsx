import React from "react";
import ReactDOM from "react-dom/client";
import ReportPreview from "../components/ReportPreview";
import { fetchImageBase64 } from "../utils/fetchImageBase64";
import { printStyles } from "../styles/printStyles";

// 🔥 Cache global agar gambar tidak di-fetch berulang
const imageCache = window.__imageCache || (window.__imageCache = new Map());

export async function printReport(row) {
  console.log("=== DEBUG: printReport START ===");

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
  console.log("DEBUG: Semua foto dikumpulkan", row._fotos);

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
          console.log(`DEBUG: foto[${i}] berhasil diambil`);
        }
      } catch (err) {
        console.error(`Gagal ambil foto base64 foto[${i}]:`, f, err);
      }
    })
  );

  // 3️⃣ Render sementara ke elemen hidden tapi tetap dihitung layout
  const tempDiv = document.createElement("div");
  tempDiv.style.position = "absolute";
  tempDiv.style.visibility = "hidden"; // lebih aman daripada left: -9999px
  tempDiv.style.top = "0";
  tempDiv.style.left = "0";
  tempDiv.style.width = "100%"; // pastikan layout flex / block dihitung
  document.body.appendChild(tempDiv);

  const root = ReactDOM.createRoot(tempDiv);
  root.render(
    <div className="report-container">
      <ReportPreview row={row} forceBase64 />
    </div>
  );

  // 4️⃣ Tunggu dua frame untuk memastikan semua layout selesai
  await new Promise(requestAnimationFrame);
  await new Promise(requestAnimationFrame);
  console.log("DEBUG: Render ReportPreview selesai, tunggu 100ms tambahan");
  await new Promise((resolve) => setTimeout(resolve, 100));

  // 5️⃣ Pastikan semua img jadi base64
  console.log("DEBUG: convertImagesToBase64 START");
  await convertImagesToBase64(tempDiv);
  console.log("DEBUG: convertImagesToBase64 END");

  // 6️⃣ Ambil CSS dari dokumen utama
  const styles = Array.from(document.querySelectorAll("style"))
    .map((s) => s.outerHTML)
    .join("\n");
  console.log("DEBUG: Styles diambil, total length =", styles.length);

  // 7️⃣ Lakukan print
  console.log("DEBUG: Panggil doPrint");
  doPrint(tempDiv.innerHTML, styles);

  // 8️⃣ Bersihkan
  root.unmount();
  document.body.removeChild(tempDiv);

  console.log("=== DEBUG: printReport END ===");
}

export async function printReportFromDOM() {
  const reportContainer = document.querySelector(".report-container");
  if (!reportContainer) {
    console.warn("Tidak ada .report-container di DOM!");
    return;
  }

  const clone = reportContainer.cloneNode(true);
  await convertImagesToBase64(clone);

  const styles = Array.from(document.querySelectorAll("style"))
    .map((s) => s.outerHTML)
    .join("\n");

  doPrint(clone.innerHTML, styles);
}

async function convertImagesToBase64(root) {
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

function doPrint(contentHTML, stylesHTML) {
  console.log("DEBUG: doPrint START");
  const iframe = document.createElement("iframe");
  iframe.style.position = "absolute";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow.document;

  doc.open();
  doc.write(`
    <html>
      <head>
        <title>Print Report</title>
        ${stylesHTML}
        ${printStyles}
      </head>
      <body class="printing-mode">
        ${contentHTML}
      </body>
    </html>
  `);
  doc.close();

  const images = doc.querySelectorAll("img");
  let loaded = 0;

  if (images.length === 0) {
    iframe.contentWindow.print();
    document.body.removeChild(iframe);
  } else {
    images.forEach((img) => {
      if (img.complete) loaded++;
      else
        img.onload = img.onerror = () => {
          loaded++;
          if (loaded === images.length) {
            iframe.contentWindow.print();
            document.body.removeChild(iframe);
          }
        };
    });

    if (loaded === images.length) {
      iframe.contentWindow.print();
      document.body.removeChild(iframe);
    }
  }

  console.log("DEBUG: doPrint END");
}
export { convertImagesToBase64 };