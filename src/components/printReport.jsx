import React from "react";
import ReactDOM from "react-dom/client";
import ReportPreview from "./ReportPreview";
import { fetchImageBase64 } from "./utils/fetchImageBase64";

// 🔥 Cache global (dipakai bersama ReportPreview.jsx & printReport.js)
const imageCache = window.__imageCache || (window.__imageCache = new Map());

/**
 * PrintReport versi browser-friendly
 */
export async function printReport(row) {
  console.log("=== DEBUG: printReport START ===");

  // 1️⃣ Ambil semua foto dari row
  const fotos = [];
  for (let i = 1; i <= 5; i++) {
    const fotoField = row[`Foto(${i})`];
    if (fotoField) {
      fotos.push(...fotoField.split(",").map((f) => f.trim()).filter(Boolean));
    }
  }
  row._fotos = fotos;

  // 2️⃣ Convert semua foto ke base64 dengan Promise.all + cache
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
        console.log(`Mengambil base64 untuk foto[${i}] fileId:`, fileId);
        const base64 = await fetchImageBase64(fileId);
        if (base64) {
          row._fotos[i] = base64;
          imageCache.set(fileId, base64); // simpan ke cache
        } else {
          console.warn(`fetchImageBase64 returned null untuk foto[${i}]:`, f);
        }
      } catch (err) {
        console.error(`Gagal ambil foto base64 foto[${i}]:`, f, err);
      }
    })
  );

  // 3️⃣ Render ReportPreview ke div sementara di DOM
  const tempDiv = document.createElement("div");
  tempDiv.style.position = "absolute";
  tempDiv.style.left = "-9999px";
  tempDiv.style.top = "-9999px";
  document.body.appendChild(tempDiv);

  const root = ReactDOM.createRoot(tempDiv);
  root.render(
    <div className="report-container">
      <ReportPreview row={row} forceBase64 />
    </div>
  );

  // tunggu next tick agar React render selesai
  await new Promise((resolve) => setTimeout(resolve, 100));

  // 4️⃣ Convert <img> tambahan di HTML
  await convertImagesToBase64(tempDiv);

  // 5️⃣ Ambil CSS inline saja (biar Netlify aman)
  const styles = Array.from(document.querySelectorAll("style"))
    .map((s) => s.outerHTML)
    .join("\n");

  // 6️⃣ Print
  doPrint(tempDiv.innerHTML, styles);

  // cleanup
  root.unmount();
  document.body.removeChild(tempDiv);

  console.log("=== DEBUG: printReport END ===");
}

/**
 * Print dari DOM yang sudah ada (misal preview live)
 */
export async function printReportFromDOM() {
  console.log("=== DEBUG: printReportFromDOM START ===");
  const reportContainer = document.querySelector(".report-container");
  if (!reportContainer) {
    console.warn("Tidak ada .report-container di DOM!");
    return;
  }

  const clone = reportContainer.cloneNode(true);
  console.log(
    "Clone dibuat. Jumlah img sebelum convert:",
    clone.querySelectorAll("img").length
  );

  await convertImagesToBase64(clone);

  clone.querySelectorAll("img").forEach((img, i) =>
    console.log(`img[${i}] src:`, img.src.substring(0, 100) + "...")
  );
  console.log(
    "Jumlah img setelah convert:",
    clone.querySelectorAll("img").length
  );

  // Ambil CSS inline saja
  const styles = Array.from(document.querySelectorAll("style"))
    .map((s) => s.outerHTML)
    .join("\n");

  doPrint(clone.innerHTML, styles);
  console.log("=== DEBUG: printReportFromDOM END ===");
}

/**
 * Helper → convert semua <img> ke base64
 */
async function convertImagesToBase64(root) {
  const imgs = root.querySelectorAll("img");
  await Promise.all(
    Array.from(imgs).map(async (img, index) => {
      const src = img.getAttribute("src");
      if (src && !src.startsWith("data:")) {
        try {
          console.log(`Convert img[${index}] src:`, src);
          const match = src.match(/[-\w]{25,}/);
          const fileId = match ? match[0] : null;
          if (fileId) {
            if (imageCache.has(fileId)) {
              img.setAttribute("src", imageCache.get(fileId));
              return;
            }
            const base64 = await fetchImageBase64(fileId);
            if (base64) {
              img.setAttribute("src", base64);
              imageCache.set(fileId, base64);
              console.log(
                `img[${index}] berhasil di-convert →`,
                base64.substring(0, 50) + "..."
              );
            } else {
              console.warn(
                `fetchImageBase64 returned null untuk img[${index}]:`,
                src
              );
            }
          }
        } catch (e) {
          console.error(`Gagal convert img[${index}]:`, src, e);
        }
      }
    })
  );
}

/**
 * Helper → render ke iframe lalu print
 */
function doPrint(contentHTML, stylesHTML) {
  const iframe = document.createElement("iframe");
  iframe.style.position = "absolute";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow.document;

  // === Semua CSS dari App.css + Index.css dimasukkan di sini ===
  const customStyles = `
    <style>
      #root {
        max-width: 1280px;
        margin: 0 auto;
        padding: 0;
        text-align: left;
        font-family: Arial, Helvetica, sans-serif;
        background: #f3f4f6;
      }
      .report-container { flex: 1; overflow-y: auto; padding-right: 0.5rem; }
      .report-page {
        width: 210mm; min-height: 280mm; padding: 20mm; margin: 0 auto 20px auto;
        background: white; font-family: Arial, sans-serif; font-size: 12pt; line-height: 1.5;
        color: black; box-shadow: 0 0 5px rgba(0,0,0,0.2); border-radius: 12px;
      }
      .report-title {
        font-size: 14pt; font-weight: bold; text-align: center; margin-bottom: 10px;
        text-transform: uppercase; text-decoration: underline;
      }
      .report-section { margin-top: 20px;}
      .report-row { display: flex; margin-bottom: 4px; gap: 0.5rem; }
      .report-label { font-weight: bold; min-width: 180px; text-align: left; }
      .report-labelbawah { font-weight: bold; margin-bottom: 0.25rem; min-width: 180px; display: inline-block; }
      .report-sep { margin-right: 8px; }
      .report-value { flex: 1; display: table-cell; }
      .multiline { white-space: pre-line; }
      .report-photos {
        display: grid; grid-template-columns: 1fr 1fr; gap: 4px; margin-top: 20px; flex-wrap: wrap;
      }
      .report-photos img {
        width: 100%; max-height: 200px; object-fit: contain; 
      }
      @media print {
        @page {
  size: A4 portrait;
  margin: 10mm 15mm;
}
        body.printing-mode aside, body.printing-mode header, body.printing-mode nav,
        body.printing-mode section:first-of-type, body.printing-mode button, body.printing-mode footer {
          display: none !important;
        }
  .report-page:first-child {
    margin-top: -15mm !important;
  }
  /* --- Sembunyikan elemen luar saat print --- */
  body.printing-mode aside,
  body.printing-mode header,
  body.printing-mode nav,
  body.printing-mode section:first-of-type,
  body.printing-mode button,
  body.printing-mode footer {
    display: none !important;
  }

  /* Reset wrapper */
  body.printing-mode #root > div {
    display: block !important;
    width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  body.printing-mode .ml-64 {
    margin-left: 0 !important;
  }

  body.printing-mode .flex-1 {
    flex: none !important;
    width: 100% !important;
  }

  /* Kontainer laporan */
  body.printing-mode .report-container {
    width: 100% !important;
    max-width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
    overflow: visible !important;
    background: white !important;
  }

  /* Halaman laporan = A4 */
  body.printing-mode .report-page {
    width: 210mm !important; min-height: 290mm !important; margin: 0 auto !important;
          padding: 10mm 15mm !important; box-sizing: border-box !important;
          page-break-after: always; page-break-inside: avoid;
          background: white !important; box-shadow: none !important; border: none !important;
          border-radius: 0 !important; font-size: 12pt !important; line-height: 1.5 !important;
          color: black !important;
  }

  
  body.printing-mode .report-page:last-child {
    page-break-after: avoid;
  }

  /* Judul laporan */
  body.printing-mode .report-title {
    font-size: 18pt !important;
    font-weight: bold !important;
    text-align: center !important;
    margin-bottom: 20px !important;
    text-decoration: underline !important;
    color: black !important;
  }

  /* Section */
  body.printing-mode .report-section {
    margin-top: 16px !important;
    margin-bottom: 8px !important;
    page-break-inside: avoid;
  }

  body.printing-mode .report-row {
    display: flex !important;
    gap: 8px !important;
    margin-bottom: 6px !important;
    font-size: 12pt !important;
    line-height: 1.4 !important;
  }

  body.printing-mode .report-label {
    font-weight: bold !important;
    min-width: 180px !important;
    flex-shrink: 0 !important;
    color: black !important;
  }

  body.printing-mode .report-sep {
    margin-right: 4px !important;
    flex-shrink: 0 !important;
    color: black !important;
  }

  body.printing-mode .report-value {
    flex: 1 !important;
    color: black !important;
  }

  body.printing-mode .report-labelbawah {
    font-weight: bold !important;
    margin-bottom: 8px !important;
    font-size: 12pt !important;
    color: black !important;
  }

  body.printing-mode .multiline {
    white-space: pre-line !important;
    font-size: 12pt !important;
    line-height: 1.4 !important;
    margin-left: 8px !important;
    color: black !important;
  }

  /* Foto kegiatan */
  body.printing-mode .report-photos {
display: grid; grid-template-columns: 1fr 1fr; gap: 4px; margin-top: 20px; flex-wrap: wrap;
  }

  body.printing-mode .report-photos img {
 max-height: 180px; object-fit: contain;
  }

  /* Background putih */
  body.printing-mode html,
  body.printing-mode body {
    background: white !important;
    margin: 0 !important;
    padding: 0 !important;
    width: 100% !important;
    height: auto !important;
  }
   body.printing-mode .signature-block {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  text-align: center;
}
 body.printing-mode .signature-space {
  height: 60px; /* area tanda tangan */
}
 body.printing-mode .signature-name {
  font-weight: bold;
  text-decoration: underline;
}






/* === umum === */
.report-page {
  width: 210mm;
  min-height: 297mm;
  padding: 20mm 17mm 20mm 17mm; /* margin kiri-kanan 1.7cm, atas-bawah 2cm */
  margin: auto;
  background: #fff;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
  font-size: 12pt;
  color: #000;
}

.report-title {
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 14pt;
  text-transform: uppercase;
}

/* === tambahan style: boxed table mirip Word === */
.boxed-section {
  border: 1px solid #111;
  padding: 0; /* hapus padding di luar tabel agar border tidak ganda */
  margin-bottom: 12px;
  box-sizing: border-box;
  page-break-inside: avoid;
}

.boxed-section-title {
  font-weight: bold;
  padding: 6px;
  border-bottom: 1px solid #111;
  text-transform: uppercase;
  margin: 0;
  text-align: center;
  background: transparent;
}

/* struktur tabel kotak di halaman A */
.boxed-table {
  width: 100%;
  border-collapse: collapse; /* penting agar border menyatu */
  table-layout: fixed;
  font-size: 12pt;
  border: none; /* hilangkan border ganda */
}

.boxed-table td {
  border: 1px solid #111;
  padding: 6px 8px;
  vertical-align: top;
  box-sizing: border-box;
  word-wrap: break-word;
  height: 13mm;
}
/* nomor & teks agar sejajar rapi dalam satu sel */
cell-num { width: 20%; vertical-align: top; padding: 6px 8px; }
.cell-num .num-label { display: inline-block; width: 18px; }
.cell-num .num-text { display: inline-block; width: calc(100% - 20px); vertical-align: top; }

.cell-content { width: 29%; }
.cell-small { width: 9%; text-align: center; vertical-align: middle; font-size: 10pt; margin-top: 6px; }
.boxed-table tr td:nth-child(1) {
  width: 25%;
}
.boxed-table tr td:nth-child(2) {
  width: 30%;
}
.boxed-table tr td:nth-child(3) {
  width: 30%;
}
.boxed-table tr td:nth-child(4) {
  width: 15%;
  text-align: center;
}

/* --- pembagian kolom --- */
.cell-num {
  width: 26%;
}

.cell-content {
  width: 29%;
}

.cell-small {
  width: 9%;
  text-align: center;
  vertical-align: middle;
}

/* versi sebelumnya */
.cell-left {
  width: 210px;
  font-weight: normal;
}
.cell-mid {
  width: calc(100% - 210px - 120px);
}
.cell-right,
.cell-right-small {
  width: 120px;
  text-align: center;
  vertical-align: top;
}

/* small text inside right cell */
.cell-small {
  font-size: 10pt;
  margin-top: 6px;
}

/* boxed content area for B, C, D */
.boxed-content {
  border: 1px solid transparent; /* internal content area, border handled by parent */
  padding: 8px;
  background: transparent;
}

/* photos */
.report-photos {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}

.report-photo-img {
  width: 100%;
  max-height: 180px;
  object-fit: contain;
  border: 1px solid #ddd;
  background: #fff;
  padding: 4px;
}

/* --- Catatan bagian bawah --- */
.report-page ol {
  margin-top: 4px;
  margin-bottom: 0;
  padding-left: 18px;
}

/* === Print mode === */
@media print {
  @page {
    size: A4;
    margin: 20mm 17mm 20mm 17mm;
  }

  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    background: #fff;
  }

  .report-page {
    page-break-after: always;
    box-shadow: none;
  }

  .boxed-section-title {
    background: transparent !important;
  }

  .boxed-table td {
    border: 1px solid #111 !important;
  }

  .report-photo-img {
    border: none !important;
  }
}



    </style>
  `;

  doc.open();
  doc.write(`
    <html>
      <head>
        <title>Print Report</title>
        ${stylesHTML}
        ${customStyles}
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
    images.forEach(img => {
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
}