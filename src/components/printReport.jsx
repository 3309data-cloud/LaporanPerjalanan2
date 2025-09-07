import React from "react";
import ReactDOMServer from "react-dom/server";
import ReportPreview from "./ReportPreview";
import { fetchImageBase64 } from "./utils/fetchImageBase64";

/**
 * PrintReport versi otomatis ambil semua foto Drive → base64
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

  // 3️⃣ Render ReportPreview → forceBase64 = true
  const htmlString = ReactDOMServer.renderToString(
    <div className="report-container">
      <ReportPreview row={row} forceBase64 />
    </div>
  );

  // 4️⃣ Convert <img> tambahan di HTML
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;
  await convertImagesToBase64(tempDiv);

  // 5️⃣ Print
  doPrint(tempDiv.innerHTML);

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
  console.log("Clone dibuat. Jumlah img sebelum convert:", clone.querySelectorAll("img").length);

  await convertImagesToBase64(clone);

  clone.querySelectorAll("img").forEach((img, i) =>
    console.log(`img[${i}] src:`, img.src.substring(0, 100) + "...")
  );
  console.log("Jumlah img setelah convert:", clone.querySelectorAll("img").length);

  doPrint(clone.innerHTML);
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
        console.log(`Convert img[${index}] src:`, src);
        const match = src.match(/[-\w]{25,}/);
        const fileId = match ? match[0] : null;
        if (fileId) {
          const base64 = await fetchImageBase64(fileId);
          if (base64) {
            img.setAttribute("src", base64);
            console.log(`img[${index}] berhasil di-convert →`, base64.substring(0, 50) + "...");
          } else {
            console.warn(`fetchImageBase64 returned null untuk img[${index}]:`, src);
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
 */
function doPrint(contentHTML) {
  const iframe = document.createElement("iframe");
  iframe.style.position = "absolute";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow.document;
  const styles = Array.from(
    document.querySelectorAll("style, link[rel='stylesheet']")
  ).map(node => node.outerHTML).join("\n");

  doc.open();
  doc.write(`
    <html>
      <head>
        <title>Print Report</title>
        ${styles}
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
      else img.onload = img.onerror = () => {
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
