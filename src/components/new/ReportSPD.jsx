import React from "react";
import { formatKecamatan } from "../../utils/formatKecamatan";
import { formatFullDate } from "../../utils/formatFullDate";

// Variabel CSS ini akan kita suntikkan ke dalam komponen
const spdStyles = `
/* =========================================================
   GAYA KHUSUS LAPORAN: SURAT PERJALANAN DINAS (SPD)
   ========================================================= */
.spd-container {
  font-family: "Times New Roman", Times, serif;
  font-size: 11pt; /* Dikecilkan sedikit agar muat 1 halaman A4 */
  line-height: 1.4;
  color: #000;
  width: 100%;
}

/* Header Kanan (Nomor & Lembar) */
.spd-header-right {
  width: 250px;
  margin-left: auto; /* Dorong ke kanan */
  margin-bottom: 20px;
}
.spd-header-right table {
  width: 100%;
  border-collapse: collapse;
}
.spd-header-right td {
  padding: 2px 4px;
  border: none !important;
  vertical-align: top;
}

/* Header Kiri (Nama Instansi) */
.spd-header-left {
  margin-bottom: 15px;
  line-height: 1.2;
}

/* Tabel Utama SPD */
.spd-table {
  width: 100%;
  border-collapse: collapse;
  border-top: 1px solid black;    /* Garis atas tetap ada */
  border-bottom: 1px solid black; /* Garis bawah tetap ada */
  border-left: none;              /* Hilangkan bingkai kiri */
  border-right: none;             /* Hilangkan bingkai kanan */
  table-layout: fixed;
}
.spd-table th, 
.spd-table td {
  border: 1px solid black;
  padding: 6px 8px;
  vertical-align: top;
  word-wrap: break-word;
}

/* Pengaturan Lebar Kolom Utama */
.col-no { 
  width: 5%; 
  text-align: center; 
  border-left: none !important; /* Rahasia hilangkan garis kiri tepi */
}

/* Kelas baru untuk menghilangkan garis tepi kanan */
.edge-right {
  border-right: none !important; /* Rahasia hilangkan garis kanan tepi */
}
.col-label { width: 45%; }
.col-val1 { width: 11%; } /* Khusus untuk kolom "Umur" di baris 8 */
.col-val2 { width: 30%; }

/* Utility Classes untuk memanipulasi garis dalam tabel (Secret Sauce) */
.nb-t { border-top: none !important; }
.nb-b { border-bottom: none !important; }
.nb-y { border-top: none !important; border-bottom: none !important; }

/* Flexbox untuk poin 9 (Pembebanan Anggaran) */
.flex-space {
  display: flex;
  justify-content: space-between;
  padding-left: 15px;
  padding-right: 15px;
}

.pb-row8 { 
  padding-bottom: 40px !important; /* Silakan ubah angka 40px ini sesuai selera/kebutuhan lebar ruangnya */
}
/* Layout Khusus Baris 9 */
.r9-wrapper {
  display: flex;
  width: 100%;
}
.r9-left { flex: 1; }
.r9-mid { width: 70px; }
.r9-right { width: 35px; }
.pb-custom { padding-bottom: 1px !important; } /* Memberi jarak nafas antar baris */

/* Tabel Tanda Tangan Bawah */
.spd-footer {
  width: 250px;
  margin-left: auto;
  margin-top: 15px;
}
.spd-footer table {
  width: 100%;
  border-collapse: collapse;
}
.spd-footer td {
  border: none !important;
  padding: 2px;
  vertical-align: top;
}
.text-center { text-align: center; }
.font-bold { font-weight: bold; }
.font-underline { text-decoration: underline; }
`;

export default function ReportSPD({ row }) {
  // Mapping Data (Ganti string statis dengan data dari 'row' jika ada)
  const noSPD = row["NoLengkapSPD"] || "XXXXXXXXXXXXXXXX";
  const namaPpk = "Siti Taufiq Hidayati, SST, M.Ak";
  const nipPpk = "198503292009122005";
  
  const namaPegawai = row["NamaCocok"] || "XXXXXXXXXXXXXXXX";
  const nipPegawai = row["NIP"] || "XXXXXXXXXXXXXXXX";
  const pangkat = row["Pangkat"] || "XXXXXXXXXXXXXXXX";
  const jabatan = row["Jabatan"] || "XXXXXXXXXXXXXXXX";
  const tingkatBiaya = "C";
  
  const maksud = row["Tujuan Kegiatan"] ? `${row["Tujuan Kegiatan"]} ${row["Nama Survei"]}` : "XXXXXXXXXXXXXXXX";
  const kendaraan ="Kendaraan Umum";
  const kecAsal = "Kec. Mojosongo";
  const kecTujuan = formatKecamatan(row["Kecamatan(1)"]) || "XXXXXXXXXXXXXXXX";
  
  const lama = "1 (satu) hari";
  const tglBerangkat = formatFullDate(row["Tanggal Kunjungan"]) || "XXXXXXXXXXXXXXXX";
  const tglKembali = formatFullDate(row["Tanggal Kunjungan"]) || "XXXXXXXXXXXXXXXX";
  const tglKwitansi = row["tglKwitansi"] || "XXXXXXXXXXXXXXXX";

  const program1 = row["Program1"] || "XXXXXXXXXXXXXXXX";
  const kegiatan1 = row["Kegiatan1"] || "XXXXXXXXXXXXXXXX";
  const komponen1 = row["Komponen1"] || "XXXXXXXXXXXXXXXX";

    const program2 = row["Program2"] || "XXXXXXXXXXXXXXXX";
  const kegiatan2 = row["Kegiatan2"] || "XXXXXXXXXXXXXXXX";
  const komponen2 = row["Komponen2"] || "XXXXXXXXXXXXXXXX";
  return (
    <>
      {/* Suntikkan CSS khusus SPD */}
      <style>{spdStyles}</style>

      <div className="spd-container">
        {/* Header Kanan (Nomor Surat) */}
        <div className="spd-header-right">
          <table>
            <tbody>
              <tr>
                <td style={{ width: "60px" }}>Nomor</td>
                <td style={{ width: "10px" }}>:</td>
                <td>{noSPD}</td>
              </tr>
              <tr>
                <td>Lembar</td>
                <td>:</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Header Kiri (Instansi) */}
        <div className="spd-header-left">
          Badan Pusat Statistik Kabupaten Boyolali<br />
          Jl Boyolali-Solo Km 2, Mojosongo, Boyolali
        </div>

        {/* TABEL UTAMA */}
        <table className="spd-table">
          <colgroup>
            <col style={{ width: "5%" }} />  {/* Kolom 1: Nomor */}
            <col style={{ width: "45%" }} /> {/* Kolom 2: Label / Pertanyaan */}
            <col style={{ width: "12%" }} /> {/* Kolom 3: Umur (Bisa dikecilkan lagi kalau mau) */}
            <col style={{ width: "38%" }} /> {/* Kolom 4: Keterangan */}
          </colgroup>
          <tbody>
            {/* Baris 1 */}
            <tr>
              <td className="col-no">1.</td>
              <td className="col-label">Pejabat Pembuat Komitmen</td>
              <td colSpan="2 " className="edge-right">{namaPpk}</td>
            </tr>

            {/* Baris 2 */}
            <tr>
              <td className="col-no">2.</td>
              <td>Nama/NIP Pegawai yang melaksanakan perjalanan dinas</td>
              <td colSpan="2" className="edge-right">{namaPegawai} / {nipPegawai}</td>
            </tr>

            {/* Baris 3 (Dipepecah 3 tanpa garis tengah) */}
            <tr>
              <td className="col-no" rowSpan="3">3.</td>
              <td className="nb-b">a. Pangkat dan Golongan</td>
              <td colSpan="2" className="nb-b edge-right">{pangkat}</td>
            </tr>
            <tr>
              <td className="nb-y">b. Jabatan/Instansi</td>
              <td colSpan="2" className="nb-y edge-right">{jabatan}</td>
            </tr>
            <tr>
              <td className="nb-t">c. Tingkat Biaya Perjalanan Dinas</td>
              <td colSpan="2" className="nb-t edge-right">C</td>
            </tr>

            {/* Baris 4 */}
            <tr>
              <td className="col-no">4.</td>
              <td>Maksud perjalanan dinas</td>
              <td colSpan="2" className="edge-right">{maksud}</td>
            </tr>

            {/* Baris 5 */}
            <tr>
              <td className="col-no">5.</td>
              <td>Alat angkutan yang dipergunakan</td>
              <td colSpan="2" className="edge-right">{kendaraan}</td>
            </tr>

            {/* Baris 6 (Ada garis pemisah) */}
            <tr>
              <td className="col-no" rowSpan="2">6.</td>
              <td className="nb-b pb-custom">a. Tempat berangkat</td>
              <td colSpan="2" className="nb-b pb-custom edge-right">{kecAsal}</td>
            </tr>
            <tr>
              <td className="nb-y pb-custom">b. Tempat tujuan</td>
              <td colSpan="2" className="nb-y pb-custom edge-right">{kecTujuan}</td>
            </tr>

            {/* Baris 7 (Ada garis pemisah) */}
{/* Baris 7 (Garis pemisah dihilangkan agar terlihat menyatu) */}
            <tr>
              <td className="col-no" rowSpan="3">7.</td>
              <td className="nb-b pb-custom">a. Lamanya perjalanan Dinas</td>
              <td colSpan="2" className="nb-b pb-custom edge-right">{lama}</td>
            </tr>
            <tr>
              <td className="nb-y pb-custom">b. Tanggal Berangkat</td>
              <td colSpan="2" className="nb-y pb-custom edge-right">{tglBerangkat}</td>
            </tr>
            <tr>
              <td className="nb-t pb-custom">c. Tanggal harus kembali / tiba di tempat baru *)</td>
              <td colSpan="2" className="nb-t pb-custom edge-right">{tglKembali}</td>
            </tr>

            {/* Baris 8 (Dipecah jadi 3 kolom kanan) */}
{/* Baris 8 (Ditambah ruang kosong di bawahnya) */}
            <tr>
              <td className="col-no pb-row8">8.</td>
              <td className="pb-row8">Pengikut : Nama</td>
              <td className="text-center pb-row8">Umur</td>
              <td className="text-center pb-row8 edge-right">Hubungan keluarga/keterangan</td>
            </tr>

            {/* Baris 9 (Kompleks: Tanpa garis horisontal di tengah) */}
{/* Baris 9 (Diperbaiki agar persis gambar) */}
            <tr>
              <td className="col-no" rowSpan="5">9.</td>
              <td className="nb-b pb-custom">
                <div className="r9-wrapper">
                  <div className="r9-left">Pembebanan Anggaran</div>
                  <div className="r9-mid">Program</div>
                  <div className="r9-right">{program1}</div>
                </div>
              </td>
              <td colSpan="2" className="nb-b pb-custom edge-right">
                {program2}
              </td>
            </tr>
            <tr>
              <td className="nb-y pb-custom">
                <div className="r9-wrapper">
                  <div className="r9-left"></div>
                  <div className="r9-mid">Kegiatan</div>
                  <div className="r9-right">{kegiatan1}</div>
                </div>
              </td>
              <td colSpan="2" className="nb-y pb-custom edge-right">
                {kegiatan2}
              </td>
            </tr>
            <tr>
              <td className="nb-y pb-custom">
                <div className="r9-wrapper">
                  <div className="r9-left"></div>
                  <div className="r9-mid">Komponen</div>
                  <div className="r9-right">{komponen1}</div>
                </div>
              </td>
              <td colSpan="2" className="nb-y pb-custom edge-right">
                {komponen2}
              </td>
            </tr>
            <tr>
              <td className="nb-y">a. Intansi</td>
              <td colSpan="2" className="nb-y edge-right">Badan Pusat Statistik Boyolali</td>
            </tr>
            <tr>
              <td className="nb-t">b. Mata anggaran</td>
              <td colSpan="2" className="nb-t edge-right">524113</td>
            </tr>

            {/* Baris 10 */}
            <tr>
              <td className="col-no">10.</td>
              <td colSpan="3" className="edge-right">Keterangan lain-lain</td>
            </tr>
          </tbody>
        </table>

        {/* Footer Tanda Tangan */}
        <div className="spd-footer">
          <table>
            <tbody>
              <tr>
                <td style={{ width: "100px" }}>Dikeluarkan di</td>
                <td style={{ width: "10px" }}>:</td>
                <td>Boyolali</td>
              </tr>
              <tr>
                <td>Tanggal</td>
                <td>:</td>
                <td>{tglKwitansi}</td>
              </tr>
              <tr>
                <td colSpan="3" className="text-center" style={{ paddingTop: "15px", paddingBottom: "60px" }}>
                  PEJABAT PEMBUAT KOMITMEN
                </td>
              </tr>
              <tr>
                <td colSpan="3" className="text-center font-bold">
                  <span className="font-underline">{namaPpk}</span><br />
                  NIP. {nipPpk}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
      </div>
    </>
  );
}