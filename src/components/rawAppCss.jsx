// src/components/rawAppCss.jsx
const rawAppCss = `
/* --- Default Layout (screen) --- */
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

.report-page {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
}

.report-title {
  font-size: 1.25rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
}

.report-section {
  margin-bottom: 1rem;
}

.report-row {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.report-label {
  font-weight: bold;
  min-width: 180px;
}

.report-sep {
  margin-right: 4px;
}

.report-value {
  flex: 1;
}

.report-labelbawah {
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.multiline {
  white-space: pre-line;
}

.report-photos {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.report-photos img {
  height: 200px;      /* tinggi seragam */
  width: auto;        /* lebar sesuai rasio asli */
  object-fit: contain;
  border-radius: 8px;
  /* border dihapus */
}


/* --- PRINT STYLES --- */
@media print {
  @page {
    size: A4 portrait;
    margin: 20mm;
  }

  body.printing-mode aside,
  body.printing-mode header,
  body.printing-mode nav,
  body.printing-mode section:first-of-type,
  body.printing-mode button,
  body.printing-mode footer {
    display: none !important;
  }

  body.printing-mode .report-page {
    width: 210mm !important;
    min-height: 297mm !important;
    margin: 0 auto !important;
    padding: 20mm 15mm !important;
    page-break-after: always;
    background: white !important;
    box-shadow: none !important;
    border: none !important;
    border-radius: 0 !important;
    font-size: 12pt !important;
    line-height: 1.5 !important;
    color: black !important;
  }

  body.printing-mode .report-page:last-child {
    page-break-after: auto;
  }
    
   body.printing-mode .report-photos img {
    height: 200px !important;  /* tinggi fix */
    width: auto !important;    /* lebar mengikuti rasio */
    object-fit: contain !important;
    border-radius: 6px !important;
    /* border dihapus */
  }

  body.printing-mode html,
  body.printing-mode body {
    background: white !important;
    margin: 0 !important;
    padding: 0 !important;
    width: 100% !important;
    height: auto !important;
  }
}
`;

export default rawAppCss;
