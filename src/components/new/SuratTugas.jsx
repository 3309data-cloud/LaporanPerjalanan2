import React from "react";
import logoBPS from "../../assets/logo-bps.png"; // Pastikan path ini benar

// CSS khusus untuk Surat Tugas
const suratTugasStyles = `
/* =========================================================
   GAYA KHUSUS LAPORAN: SURAT TUGAS
   ========================================================= */
.st-container {
    font-family: Calibri, sans-serif;
    font-size: 12pt;
    line-height: 1.5;
    color: #000;
    background-color: #fff;
    width: 794px;
    min-height: 1123px;
    padding: 25px 70px;
}

/* Header & Logo */
.st-header {
  text-align: center;
  margin-bottom: 20px;
}
.st-logo {
  width: 150px; 
  height: auto;
  margin: 0 auto 15px auto;
  display: block;
}
.st-title-block {
  font-weight: bold;
  line-height: 1.3;
}
.st-title-main {
  font-size: 12pt;
  display: inline-block;

  margin-top: 15px;
  margin-bottom: 5px;            /* Memberi ruang ke baris Nomor di bawahnya */
 
}

/* Tabel Utama (Tanpa Garis) untuk menyejajarkan titik dua */
.st-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}
.st-table td {
  padding: 4px 0;
  vertical-align: top;
  border: none !important;
}
.st-col-label { width: 120px; }
.st-col-colon { width: 20px; text-align: center; }
.st-col-val { width: auto; text-align: justify; }

/* PERBAIKAN LIST MENGINGAT */
.st-list {
  margin: 0;
  padding: 0;
  list-style: none; /* Kita hilangkan defaultnya */
  counter-reset: item; /* Kita buat counter manual agar kontrol posisi lebih mudah */
}

.st-list li {
  display: table-row; /* Menggunakan display table agar angka dan teks sejajar vertikal */
  counter-increment: item;
}

.st-list li::before {
  content: counter(item) ". ";
  display: table-cell;
  width: 25px; /* Lebar kolom angka */
  padding-right: 5px;
  text-align: left;
  vertical-align: top;
  font-weight: normal;
}

.st-list li span {
  display: table-cell;
  vertical-align: top;
  text-align: justify;
  padding-bottom: 4px;
}

/* Teks Tengah */
.st-center-text {
  text-align: center;
  margin: 20px 0;
}

/* Blok Tanda Tangan */
.st-signature {
  width: 250px;
  margin-left: auto;
  text-align: center;
  margin-top: 30px;
}

/* RUANG KOSONG UNTUK TANDA TANGAN BASAH */
.st-sign-space {
  height: 80px; /* Tinggi ruang kosong, bisa dibesarkan jika kurang */
  width: 100%;
}

/* Footer BSrE */
.st-footer {
  display: flex;
  align-items: flex-start;
  margin-top: 50px;
  font-size: 7.5pt;
  line-height: 1.2;
  color: #333;
}
.st-qr-small {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  flex-shrink: 0;
  background-color: #f0f0f0;
  border: 1px dashed #ccc;
}
.st-footer-text {
  flex-grow: 1;
  text-align: justify;
  font-style: italic;
}
.mepet {line-height: 1; margin-top: -5px;}
.font-bold { font-weight: bold; }
.font-underline { 
  display: inline-block;
  border-bottom: 1px solid #000;
  line-height: 1;
  padding-bottom: 10px;
}
`;

export default function SuratTugas({ row }) {
    const isPDF = window.__PDF_MODE__ === true;
  // Mapping Data Dinamis
  const noST = row["NoLengkapSPD"] || ".................................";
  const namaPetugas = row["NamaCocok"] || ".................................";
  const kegiatan = row["Tujuan Kegiatan"] ? `${row["Tujuan Kegiatan"]} ${row["Nama Survei"]}` : ".................................";
  const jangkaWaktu = row["Lama"] || ".................................";
  const tglST = row["NoSPD"] || ".................................";
  
  const namaKepsK = "Puguh Raharjo, SST, M.T.";
  const nipKepsK = "198010022002121005";

  return (
    <>
      <style>{suratTugasStyles}</style>

      <div className="st-container">
        {/* Header & Logo */}
        <div className="st-header">
          <img 
          src={logoBPS} 
          alt="Logo BPS" 
          style={{ 
            width: "70px", 
            height: "auto", 
            margin: "0 auto 10px", 
            display: "block" 
          }} 
        />
          
          <div className="st-title-block">
            BADAN PUSAT STATISTIK KABUPATEN BOYOLALI<br />
            <div className="st-title-main">SURAT TUGAS</div>
            <div>NOMOR : {noST}</div>
          </div>
        </div>

        {/* Tabel Konsideran (Menimbang & Mengingat) */}
        <table className="st-table">
          <tbody>
            <tr>
              <td className="st-col-label">Menimbang</td>
              <td className="st-col-colon">:</td>
              <td className="st-col-val">
                {row["Menimbang"]}
              </td>
            </tr>
            <tr>
              <td className="st-col-label">Mengingat</td>
              <td className="st-col-colon">:</td>
<td className="st-col-val">
  <ul className="st-list">
    <li><span>Undang–Undang Nomor 16 Tahun 1997 tentang Statistik;</span></li>
    <li><span>Undang–Undang Nomor 43 Tahun 2009 tentang Kearsipan;</span></li>
    <li><span>Peraturan Presiden Nomor 86 Tahun 2007 tentang Badan Pusat Statistik;</span></li>
    <li><span>Peraturan Pemerintah Nomor 28 Tahun 2012 tentang Pelaksanaan Undang-Undang Nomor 43 Tahun 2009 tentang Kearsipan;</span></li>
    <li><span>Peraturan Badan Pusat Statistik Nomor 7 Tahun 2020 tentang Organisasi dan Tata Kerja Badan Pusat Statistik;</span></li>
  </ul>
</td>
            </tr>
          </tbody>
        </table>

        {/* Transisi */}
        <div className="st-center-text">Memberi Tugas</div>

        {/* Tabel Isi Tugas */}
        <table className="st-table">
          <tbody>
            <tr>
              <td className="st-col-label">Kepada</td>
              <td className="st-col-colon">:</td>
              <td className="st-col-val">{namaPetugas}</td>
            </tr>
            <tr>
              <td className="st-col-label">Untuk</td>
              <td className="st-col-colon">:</td>
              <td className="st-col-val">{kegiatan}</td>
            </tr>
            <tr>
              <td className="st-col-label">Jangka Waktu</td>
              <td className="st-col-colon">:</td>
              <td className="st-col-val">{jangkaWaktu}</td>
            </tr>
          </tbody>
        </table>

        {/* Blok Tanda Tangan */}
        <div className="st-signature">
          Boyolali, {tglST}<br />
          Kepala Badan Pusat Statistik<br />
          Kabupaten Boyolali
          
          {/* Ruang Kosong Tanda Tangan Basah */}
          <div className="st-sign-space"></div>
          
          <span className="font-bold font-underline">{namaKepsK}</span><br />
          <div className="mepet">NIP. {nipKepsK}</div>
        </div>
      </div>
    </>
  );
}