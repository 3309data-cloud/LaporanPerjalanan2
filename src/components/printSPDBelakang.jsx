import React from "react";
import ReactDOM from "react-dom/client";
import { printStyles } from "../styles/printStyles";
import SPDBelakang from "../components/new/SPDBelakang";

export async function printSPDBelakang(selectedRows) {
  if (!selectedRows || selectedRows.length === 0) {
    alert("Pilih pegawai terlebih dahulu");
    return;
  }

  // Hidden render container
  const tempDiv = document.createElement("div");
  Object.assign(tempDiv.style, {
    position: "fixed",
    opacity: "0",
    top: "0",
    left: "0",
    width: "100%"
  });
  document.body.appendChild(tempDiv);

  const root = ReactDOM.createRoot(tempDiv);

  // 🔥 RENDER PER ROW (INI KUNCINYA)
  root.render(
    <div className="report-container">
      {selectedRows.map((row, i) => (
        <div
          key={i}
          className="report-page"
          style={{ pageBreakAfter: "always" }}
        >
          <SPDBelakang row={row} />
        </div>
      ))}
    </div>
  );

  await new Promise(res => setTimeout(res, 300));

  const styles = Array.from(document.querySelectorAll("style"))
    .map(s => s.outerHTML)
    .join("\n");

  await doPrint(tempDiv.innerHTML, styles);

  root.unmount();
  document.body.removeChild(tempDiv);
}

async function doPrint(contentHTML, stylesHTML) {
  const iframe = document.createElement("iframe");
  Object.assign(iframe.style, {
    position: "fixed",
    opacity: "0",
    pointerEvents: "none"
  });
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow.document;
  doc.open();
  doc.write(`
    <html>
      <head>
        ${stylesHTML}
        ${printStyles}
      </head>
      <body class="printing-mode">${contentHTML}</body>
    </html>
  `);
  doc.close();

  await new Promise(res => setTimeout(res, 500));
  iframe.contentWindow.focus();
  iframe.contentWindow.print();

  setTimeout(() => document.body.removeChild(iframe), 1000);
}