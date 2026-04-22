export const laporanprint = `
/* =========================================================
   GAYA KHUSUS LAPORAN: DAFTAR PENGELUARAN RIIL
   ========================================================= */
.riil-container {
  font-family: "Times New Roman", Times, serif;
  font-size: 12pt;
  line-height: 1.5;
  color: #000;
  width: 100%;
  margin-top: 20px;
}

.riil-title {
  text-align: center;
  font-weight: bold;
  font-size: 14pt;
  margin-bottom: 30px;
}

.riil-paragraph {
  margin-bottom: 8px;
}

.text-justify { text-align: justify; }
.text-center { text-align: center; }
.italic { font-style: italic; }
.font-underline { text-decoration: underline; }

/* Tabel Identitas */
.riil-identity-table {
  width: 100%;
  border-collapse: collapse;
  margin-left: 20px; /* Indentasi agar sejajar rapi */
  margin-bottom: 10px;
}
.riil-identity-table td {
  padding: 2px 0;
  vertical-align: top;
  border: none !important; /* Memastikan tidak ada garis */
}
.col-label { width: 80px; }
.col-colon { width: 15px; }
.col-value { width: auto; }

/* Wrapper untuk List Bernomor */
.riil-list-wrapper {
  display: flex;
  width: 100%;
}
.riil-list-num {
  width: 30px; /* Ruang untuk angka "1." dan "2." */
  flex-shrink: 0;
}
.riil-list-content {
  flex-grow: 1;
}

/* Tabel Data Pengeluaran (Tabel Bergaris) */
.riil-data-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  margin-bottom: 5px;
}
.riil-data-table th, 
.riil-data-table td {
  border: 1px solid black !important;
  padding: 6px 8px;
  vertical-align: top;
}
.riil-data-table th {
  font-weight: normal;
  text-align: center;
}
.riil-data-table .row-numbers th {
  padding-top: 2px !important;    /* Kurangi jarak atas */
  padding-bottom: 2px !important; /* Kurangi jarak bawah */
  font-size: 10pt;                /* Opsional: Font dikecilkan sedikit agar proporsional */
  line-height: 1;                 /* Menghilangkan sisa ruang dari tinggi baris standar */
}

.riil-data-table .jumlah td {
  padding-top: 6px !important;    /* Kurangi jarak atas */
  padding-bottom: 100px !important; /* Kurangi jarak bawah */
  font-size: 10pt;                /* Opsional: Font dikecilkan sedikit agar proporsional */
  line-height: 1;                 /* Menghilangkan sisa ruang dari tinggi baris standar */
}

/* Tabel Tanda Tangan */
.riil-signature-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 40px;
}
.riil-signature-table td {
  border: none !important;
  vertical-align: top;
}
  

`;