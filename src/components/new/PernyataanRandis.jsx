import React from "react";
import { formatFullDate } from "../../utils/formatFullDate";

// CSS khusus untuk Surat Pernyataan Randis
const randisStyles = `
/* =========================================================
   GAYA KHUSUS LAPORAN: PERNYATAAN KENDARAAN DINAS
   ========================================================= */
.randis-container {
  font-family: "Times New Roman", Times, serif;
  font-size: 12pt;
  line-height: 1.5;
  color: #000;
  width: 100%;
  padding: 10px 20px; /* Memberikan sedikit ruang nafas */
}

/* Judul Surat */
.randis-title {
  text-align: center;
  margin-bottom: 30px;
  line-height: 1.2;
}
.randis-title-main {
  font-size: 14pt;
}

/* Teks Paragraf */
.randis-text {
  text-align: justify;
  margin-bottom: 15px;
}

/* Tabel Identitas (Tanpa Garis, Kolom Terkunci) */
.randis-identity-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 15px;
  margin-left: 20px; /* Memberi indentasi ke dalam */
}
.randis-identity-table td {
  padding: 2px 0;
  vertical-align: top;
  border: none !important;
}
.r-col-label { width: 150px; }
.r-col-colon { width: 20px; text-align: center; }
.r-col-val { width: auto; }

/* Blok Tanda Tangan Kanan Bawah */
.randis-signature {
  width: 300px;
  margin-left: auto; /* Mendorong blok ke sisi kanan kertas */
  margin-top: 40px;
  text-align: center;
}

.font-underline { text-decoration: underline; }
`;

export default function PernyataanRandis({ row }) {
  // Mapping Data Dinamis
  const nama = row["NamaCocok"] || "XXXXXXXXXXXXXXXX";
  const nip = row["NIP"] || "XXXXXXXXXXXXXXXX";
  const pangkat = row["Pangkat"] || "XXXXXXXXXXXXXXXX";
  const jabatan = row["Jabatan"] || "XXXXXXXXXXXXXXXX";
  
  const noST = row["NoLengkapSPD"] || "XXXXXXXXXXXXXXXX";
  const tglST = row["NoSPD"] || "XXXXXXXXXXXXXXXX"; 
  const tglKunjungan = formatFullDate(row["Tanggal Kunjungan"]) || "XXXXXXXXXXXXXXXX";
  const tglKwitansi = row["tglKwitansi"] || "XXXXXXXXXXXXXXXX";

  return (
    <>
      <style>{randisStyles}</style>
      <div className="randis-container">
        {/* Judul */}
        <div className="randis-title">
          <div className="randis-title-main">SURAT PERNYATAAN</div>
          <div className="randis-title-main">TIDAK MENGGUNAKAN KENDARAAN DINAS</div>
        </div>

        <div className="randis-text">
          Yang bertanda tangan di bawah ini:
        </div>

        {/* Tabel Identitas */}
        <table className="randis-identity-table">
          <tbody>
            <tr>
              <td className="r-col-label">Nama</td>
              <td className="r-col-colon">:</td>
              <td className="r-col-val">{nama}</td>
            </tr>
            <tr>
              <td className="r-col-label">NIP</td>
              <td className="r-col-colon">:</td>
              <td className="r-col-val">{nip}</td>
            </tr>
            <tr>
              <td className="r-col-label">Pangkat/Golongan</td>
              <td className="r-col-colon">:</td>
              <td className="r-col-val">{pangkat}</td>
            </tr>
            <tr>
              <td className="r-col-label">Jabatan</td>
              <td className="r-col-colon">:</td>
              <td className="r-col-val">{jabatan}</td>
            </tr>
            <tr>
              <td className="r-col-label">Unit Kerja</td>
              <td className="r-col-colon">:</td>
              <td className="r-col-val">BPS Kabupaten Boyolali</td>
            </tr>
          </tbody>
        </table>

        {/* Paragraf 1 */}
        <div className="randis-text">
          Menerangkan bahwa dalam rangka melaksanakan perjalanan dinas dalam kota di Kabupaten Boyolali untuk melaksanakan tugas kedinasan sesuai surat tugas nomor {noST} tanggal {tglST}, saya benar-benar tidak menggunakan kendaraan dinas pada tanggal {tglKunjungan}.
        </div>

        {/* Paragraf 2 */}
        <div className="randis-text">
          Demikian pernyataan ini saya buat dengan sebenar-benarnya untuk dipergunakan sebagaimana mestinya. Apabila terdapat kekeliruan dalam pertanggung jawaban SPD dan mengakibatkan kerugian negara, saya bersedia dituntut sesuai peraturan yang berlaku dan mengembalikan biaya transport yang sudah terlanjur saya terima ke kas negara.
        </div>

        {/* Blok Tanda Tangan */}
        <div className="randis-signature">
          Boyolali, {tglKwitansi}<br />
          Pelaksana Perjalanan Dinas
          
          {/* Ruang kosong untuk tanda tangan basah */}
          <div style={{ height: "80px" }}></div>
          
          <span className="font-underline">{nama}</span><br />
          Nip. {nip}
        </div>
      </div>
    </>
  );
}