// src/styles/printStyles.js
export const printStyles = `
<style>

/* =========================================================
   🔷 1. LAYOUT DASAR APLIKASI
   ========================================================= */
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0;
  text-align: left;
  font-family: Arial, Helvetica, sans-serif;
  background: #f3f4f6;
}

.report-container {
  flex: 1;
  overflow-y: auto;
  padding-right: 0.5rem;
}

/* =========================================================
   🔷 2. STRUKTUR HALAMAN LAPORAN
   ========================================================= */
.report-page {
  width: 210mm;
  min-height: 280mm;
  padding: 20mm;
  margin: 0 auto 20px auto;
  background: white;
  font-family: Arial, sans-serif;
  font-size: 12pt;
  line-height: 1.5;
  color: black;
  box-shadow: 0 0 5px rgba(0,0,0,0.2);
  border-radius: 12px;
}

/* =========================================================
   🔷 3. JUDUL & SECTION
   ========================================================= */
.report-title {
  font-size: 14pt;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
  text-transform: uppercase;
}

.report-section {
  margin-top: 20px;
}

.report-row {
  display: flex;
  margin-bottom: 4px;
  gap: 0.5rem;
}

.report-label {
  font-weight: bold;
  min-width: 180px;
  text-align: left;
}

.report-labelbawah {
  font-weight: bold;
  margin-bottom: 0.25rem;
  min-width: 180px;
  display: inline-block;
}

.report-value {
  flex: 1;
  display: table-cell;
}

.report-sep {
  margin-right: 8px;
}

.multiline {
  white-space: pre-line;
}

/* =========================================================
   🔷 4. FOTO & GAMBAR
   ========================================================= */
.report-photos {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.report-photos img {
  width: 100%;
  max-height: 300px;
  object-fit: contain;
}

/* =========================================================
   🔷 5. STRUKTUR BOXED SECTION (TABEL MIRIP WORD)
   ========================================================= */
.boxed-section {
  border: 1px solid #111;
  margin-bottom: 12px;
  padding: 0;
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

.boxed-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: 12pt;
  border: none;
}

.boxed-table td {
  border: 1px solid #111;
  padding: 6px 8px;
  vertical-align: top;
  word-wrap: break-word;
  height: 13mm;
}

/* nomor & teks agar sejajar */
.cell-num {
  vertical-align: top;
  padding: 6px 8px;
}

.cell-num .num-label {
  display: inline-block;
  width: 18px;
}

.cell-num .num-text {
  display: inline-block;
  width: calc(100% - 20px);
  vertical-align: top;
}

/* lebar kolom */
.boxed-table tr td:nth-child(1) { width: 25%; }
.boxed-table tr td:nth-child(2) { width: 30%; }
.boxed-table tr td:nth-child(3) { width: 30%; }
.boxed-table tr td:nth-child(4) { width: 15%; text-align: center; }

/* struktur sel */
.cell-num { width: 20%; }
.cell-content { width: 29%; }
.cell-small { width: 9%; text-align: center; vertical-align: middle; }

/* variasi lama */
.cell-left { width: 210px; font-weight: normal; }
.cell-mid { width: calc(100% - 210px - 120px); }
.cell-right, .cell-right-small {
  width: 120px;
  text-align: center;
  vertical-align: top;
}

.cell-small { font-size: 10pt; margin-top: 6px; }

.boxed-content {
  border: 1px solid transparent;
  padding: 8px;
  background: transparent;
}

/* =========================================================
   🔷 6. TANDA TANGAN & CATATAN
   ========================================================= */
.signature-block {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  text-align: center;
}

.signature-space {
  height: 60px; /* area tanda tangan */
}

.signature-name {
  font-weight: bold;
  text-decoration: underline;
}

.report-page ol {
  margin-top: 4px;
  margin-bottom: 0;
  padding-left: 18px;
}

/* =========================================================
   🔷 7. MODE PRINT KHUSUS (A4)
   ========================================================= */
@media print {
  @page {
    size: A4 portrait;
    margin: 10mm 15mm;
  }

  html, body {
    background: white !important;
    margin: 0 !important;
    padding: 0 !important;
    width: 100% !important;
    height: auto !important;
  }

  body.printing-mode {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  body.printing-mode aside,
  body.printing-mode header,
  body.printing-mode nav,
  body.printing-mode section:first-of-type,
  body.printing-mode button,
  body.printing-mode footer {
    display: none !important;
  }

  body.printing-mode #root > div {
    display: block !important;
    width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  body.printing-mode .ml-64 { margin-left: 0 !important; }
  body.printing-mode .flex-1 { flex: none !important; width: 100% !important; }

  body.printing-mode .report-container {
    width: 100% !important;
    max-width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
    overflow: visible !important;
    background: white !important;
  }

  body.printing-mode .report-page {
    width: 210mm !important;
    min-height: 290mm !important;
    margin: 0 auto !important;
    padding: 5mm 3mm !important;
    box-sizing: border-box !important;
    page-break-after: always;
    page-break-inside: avoid;
    background: white !important;
    box-shadow: none !important;
    border: none !important;
    border-radius: 0 !important;
    font-size: 12pt !important;
    line-height: 1.5 !important;
    color: black !important;
  }

  body.printing-mode .report-page:last-child {
    page-break-after: avoid;
  }

  body.printing-mode .report-title {
    font-size: 18pt !important;
    font-weight: bold !important;
    text-align: center !important;
    margin-bottom: 20px !important;
    color: black !important;
  }

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

  body.printing-mode .report-label,
  body.printing-mode .report-sep,
  body.printing-mode .report-value,
  body.printing-mode .report-labelbawah,
  body.printing-mode .multiline,
  body.printing-mode .multilinebold {
    color: black !important;
  }

  body.printing-mode .report-photos {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 20px;
  }

  body.printing-mode .report-photos img {
    max-height: 300px;
    object-fit: contain;
  }

  
}

</style>
`;
