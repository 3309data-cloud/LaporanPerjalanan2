import React from "react";
import ReactDOM from "react-dom/client";
import ReportPreview from "./ReportPreview";
import { fetchImageBase64 } from "./utils/fetchImageBase64";
import rawAppCss from "./rawAppCss";   // ⬅️ tambahkan ini

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
      fotos.push(...fotoField.split(",").map(f => f.trim()).filter(Boolean));
    }
  }
  row._fotos = fotos;

  // 2️⃣ Convert semua foto ke base64
  for (let i = 0; i < row._fotos.length; i++) {
    const f = row._fotos[i];
    if (!f.startsWith("data:")) {
      try {
        const match = f.match(/[-\w]{25,}/);
        const fileId = match ? match[0] : null;
        if (fileId) {
          console.log(`Mengambil base64 untuk foto[${i}] fileId:`, fileId);
          const base64 = await fetchImageBase64(fileId);
          if (base64) row._fotos[i] = base64;
          else console.warn(`fetchImageBase64 returned null untuk foto[${i}]:`, f);
        }
      } catch (err) {
        console.error(`Gagal ambil foto base64 foto[${i}]:`, f, err);
      }
    }
  }

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

  await new Promise(resolve => setTimeout(resolve, 100));

  // 4️⃣ Convert <img> tambahan di HTML
  await convertImagesToBase64(tempDiv);

  // 5️⃣ Ambil style dari <style>
  const styles = Array.from(document.querySelectorAll("style"))
    .map(s => s.outerHTML)
    .join("\n");

  // 6️⃣ Print
  doPrint(tempDiv.innerHTML, styles);

  // cleanup
  root.unmount();
  document.body.removeChild(tempDiv);

  console.log("=== DEBUG: printReport END ===");
}

/**
 * Print dari DOM yang sudah ada
 */
export async function printReportFromDOM() {
  console.log("=== DEBUG: printReportFromDOM START ===");
  const reportContainer = document.querySelector(".report-container");
  if (!reportContainer) {
    console.warn("Tidak ada .report-container di DOM!");
    return;
  }

  const clone = reportContainer.cloneNode(true);
  await convertImagesToBase64(clone);

  const styles = Array.from(document.querySelectorAll("style"))
    .map(s => s.outerHTML)
    .join("\n");

  doPrint(clone.innerHTML, styles);
  console.log("=== DEBUG: printReportFromDOM END ===");
}

/**
 * Helper → convert semua <img> ke base64
 */
async function convertImagesToBase64(root) {
  const imgs = root.querySelectorAll("img");
  for (const [index, img] of Array.from(imgs).entries()) {
    const src = img.getAttribute("src");
    if (src && !src.startsWith("data:")) {
      try {
        const match = src.match(/[-\w]{25,}/);
        const fileId = match ? match[0] : null;
        if (fileId) {
          const base64 = await fetchImageBase64(fileId);
          if (base64) {
            img.setAttribute("src", base64);
          }
        }
      } catch (e) {
        console.error(`Gagal convert img[${index}]:`, src, e);
      }
    }
  }
}

/**
 * Helper → render ke iframe lalu print
 * Versi fix: injek CSS langsung dari App.css (inline)
 */
function doPrint(contentHTML, stylesHTML) {
  const iframe = document.createElement("iframe");
  iframe.style.position = "absolute";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow.document;

  // ⬅️ Satukan CSS dari App.css + style tag runtime
  const allStyles = `
    <style>
      ${rawAppCss}
    </style>
    ${stylesHTML}
  `;

  doc.open();
  doc.write(`
    <html>
      <head>
        <title>Print Report</title>
        ${allStyles}
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
    setTimeout(() => document.body.removeChild(iframe), 500);
  } else {
    images.forEach(img => {
      if (img.complete) loaded++;
      else img.onload = img.onerror = () => {
        loaded++;
        if (loaded === images.length) {
          iframe.contentWindow.print();
          setTimeout(() => document.body.removeChild(iframe), 500);
        }
      };
    });

    if (loaded === images.length) {
      iframe.contentWindow.print();
      setTimeout(() => document.body.removeChild(iframe), 500);
    }
  }
}
