import React from "react";
import ReactDOMServer from "react-dom/server";
import ReportPreview from "./ReportPreview";

export function printReport(row) {
  // Render komponen ke HTML string
  const htmlString = ReactDOMServer.renderToString(
    <div className="report-container">
      <ReportPreview row={row} />
    </div>
  );

  // Buat iframe hidden
  const iframe = document.createElement("iframe");
  iframe.style.position = "absolute";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow.document;

  // Ambil semua style dari halaman
  const styles = Array.from(document.querySelectorAll("style, link[rel='stylesheet']"))
    .map((node) => node.outerHTML)
    .join("\n");

  doc.open();
  doc.write(`
    <html>
      <head>
        <title>Print Report</title>
        ${styles}
      </head>
      <body class="printing-mode">
        ${htmlString}
      </body>
    </html>
  `);
  doc.close();

  const iframeWindow = iframe.contentWindow;
  const images = iframeWindow.document.querySelectorAll("img");

  let loadedCount = 0;
  if (images.length === 0) {
    iframeWindow.focus();
    iframeWindow.print();
    document.body.removeChild(iframe);
  } else {
    images.forEach((img) => {
      if (img.complete) {
        loadedCount++;
      } else {
        img.onload = img.onerror = () => {
          loadedCount++;
          if (loadedCount === images.length) {
            iframeWindow.focus();
            iframeWindow.print();
            document.body.removeChild(iframe);
          }
        };
      }
    });
    if (loadedCount === images.length) {
      iframeWindow.focus();
      iframeWindow.print();
      document.body.removeChild(iframe);
    }
  }
}
