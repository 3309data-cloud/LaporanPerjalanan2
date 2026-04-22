import React from "react";
import { formatKecamatan } from "../../utils/formatKecamatan";
import { formatFullDate } from "../../utils/formatFullDate";

// CSS khusus untuk Kwitansi disuntikkan langsung di dalam file ini
const kwitansiStyles = `
/* =========================================================
   GAYA KHUSUS LAPORAN: KWITANSI
   ========================================================= */
.kwi-container {
  font-family: "Times New Roman", Times, serif;
  font-size: 12pt;
  line-height: 1.5;
  color: #000;
  width: 100%;
}

.kwi-header {
  text-align: left;
  margin-bottom: 20px;
  line-height: 1.2;
}

.kwi-title {
  text-align: center;
  font-weight: bold;
  font-size: 14pt;
  margin-bottom: 30px;
}

/* Tabel Body Kwitansi (Tanpa Garis) */
.kwi-body-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 40px;
}
.kwi-body-table td {
  padding: 6px 0; /* Jarak antar baris */
  vertical-align: top;
  border: none !important;
}

/* Pengaturan Lebar Kolom */
.kwi-label { width: 220px; }
.kwi-colon { width: 20px; text-align: center; }
.kwi-val { width: auto; text-align: justify; }

/* Sub-layout untuk Nomor & Tanggal SPD */
.kwi-sub-label {
  display: inline-block;
  width: 70px;
}

/* Tabel Tanda Tangan */
.kwi-signature-table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}
.kwi-signature-table td {
  width: 33.33%; /* Dibagi 3 rata */
  vertical-align: top;
  border: none !important;
  padding: 2px;
}

.font-bold { font-weight: bold; }
.font-underline { text-decoration: underline; }
`;

export default function Kwitansi({ row }) {
  // Mapping Data Dinamis
  const namaPenerima = row["NamaCocok"] || "XXXXXXXXXXXXXXXX";
  const nipPenerima = row["NIP"] || "XXXXXXXXXXXXXXXX";
  
  const tujuanKegiatan = row["Tujuan Kegiatan"] || "XXXXXXXXXXXXXXXX";
  const namaSurvei = row["Nama Survei"] || "XXXXXXXXXXXXXXXX";
  const noSPD = row["NoLengkapSPD"] || "XXXXXXXXXXXXXXXX";
  const tglST = formatFullDate(row["Tanggal Kunjungan"]) || "XXXXXXXXXXXXXXXX";
  const kecTujuan = formatKecamatan(row["Kecamatan(1)"]) || "XXXXXXXXXXXXXXXX";
  const tglKwitansi = row["tglKwitansi"] || "XXXXXXXXXXXXXXXX";

  return (
    <>
      <style>{kwitansiStyles}</style>

      <div className="kwi-container">
        {/* Header Instansi */}
        <div className="kwi-header">
          BADAN PUSAT STATISTIK<br />
          KABUPATEN BOYOLALI
        </div>

        {/* Judul */}
        <div className="kwi-title">
          <u>KWITANSI</u>
        </div>

        {/* Tabel Utama Isi Kwitansi */}
        <table className="kwi-body-table">
          <tbody>
            <tr>
              <td className="kwi-label">Sudah terima dari</td>
              <td className="kwi-colon">:</td>
              <td className="kwi-val">Kuasa Pengguna Anggaran BPS Kabupaten Boyolali</td>
            </tr>
            <tr>
              <td className="kwi-label">Uang sebesar</td>
              <td className="kwi-colon">:</td>
              <td className="kwi-val">Rp100.000,-</td>
            </tr>
            <tr>
              <td className="kwi-label">Untuk pembayaran</td>
              <td className="kwi-colon">:</td>
              <td className="kwi-val">
                Transport lokal dalam rangka {tujuanKegiatan} {namaSurvei}
              </td>
            </tr>
            <tr>
              <td className="kwi-label">Berdasarkan SPD</td>
              <td className="kwi-colon">:</td>
              <td className="kwi-val">
                <div>
                  <span className="kwi-sub-label">Nomor</span>: {noSPD}
                </div>
                <div>
                  <span className="kwi-sub-label">Tanggal</span>: {tglST}
                </div>
              </td>
            </tr>
            <tr>
              <td className="kwi-label">Untuk perjalanan dinas dari</td>
              <td className="kwi-colon">:</td>
              <td className="kwi-val">Kecamatan Mojosongo ke Kecamatan {kecTujuan} PP</td>
            </tr>
            <tr>
              <td className="kwi-label">Terbilang</td>
              <td className="kwi-colon">:</td>
              <td className="kwi-val">Seratus Ribu Rupiah</td>
            </tr>
          </tbody>
        </table>

        {/* Tabel Tanda Tangan */}
        <table className="kwi-signature-table">
          <tbody>
            <tr>
              <td>Bendahara Pengeluaran</td>
              <td>Setuju dibayar</td>
              <td>Yang Menerima,</td>
            </tr>
            <tr>
              <td style={{ paddingTop: "15px" }}>Lunas pada tanggal .........</td>
              <td style={{ paddingTop: "15px" }}>Pejabat Pembuat Komitmen</td>
              <td style={{ paddingTop: "15px" }}>Boyolali, {tglKwitansi}</td>
            </tr>
            {/* Ruang Kosong Tanda Tangan */}
            <tr>
              <td style={{ height: "80px" }}></td>
              <td style={{ height: "80px" }}></td>
              <td style={{ height: "80px" }}></td>
            </tr>
            {/* Nama & NIP */}
            <tr>
              <td>
                <span className="font-bold font-underline">Dwiana Ari Sulistyani, A.Md</span><br />
                NIP. 198811182011012012
              </td>
              <td>
                <span className="font-bold font-underline">Siti Taufiq Hidayati, S.ST., M.Ak.</span><br />
                NIP. 198503292009122005
              </td>
              <td>
                <span className="font-bold font-underline">{namaPenerima}</span><br />
                NIP. {nipPenerima}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}