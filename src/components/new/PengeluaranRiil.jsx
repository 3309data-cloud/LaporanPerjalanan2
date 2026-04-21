import React from "react";

export default function PengeluaranRiil({ row }) {
  // Variabel default jika data kosong untuk mencegah error
  const nama = row["NamaCocok"] || "...................................";
  const nip = row["NIP"] || "...................................";
  const tglST = row["NoSPD"] || "......................"; // Di kode sebelumnya NoSPD berisi tanggal
  const noSPD = row["NoLengkapSPD"] || "......................";
  const tglKwitansi = row["tglKwitansi"] || "......................";
  const status = row["Status"] || "lokal"; 

  return (
    <div className="riil-container">
      {/* Judul Laporan */}
      <div className="riil-title">
        <u>DAFTAR PENGELUARAN RIIL</u>
      </div>

      <div className="riil-paragraph">Yang bertanda tangan di bawah ini :</div>

      {/* Tabel Identitas (Tanpa Garis) */}
      <table className="riil-identity-table">
        <tbody>
          <tr>
            <td className="col-label">Nama</td>
            <td className="col-colon">:</td>
            <td className="col-value">{nama}</td>
          </tr>
          <tr>
            <td className="col-label">NIP</td>
            <td className="col-colon">:</td>
            <td className="col-value">{nip}</td>
          </tr>
        </tbody>
      </table>

      <div className="riil-paragraph" style={{ marginTop: "10px" }}>
        Berdasarkan surat Perjalanan Dinas (SPD) tanggal {tglST} nomor {noSPD} dengan ini menyatakan sesungguhnya bahwa:
      </div>

      {/* List Item 1 */}
      <div className="riil-list-wrapper">
        <div className="riil-list-num">1.</div>
        <div className="riil-list-content">
          Biaya transport {status} di bawah ini yang tidak dapat diperoleh bukti bukti pengeluarannya meliputi :
          
          {/* Tabel Rincian Biaya */}
          <table className="riil-data-table">
            <thead>
              <tr>
                <th style={{ width: "8%" }}>No</th>
                <th style={{ width: "42%" }}>Uraian</th>
                <th style={{ width: "30%" }}>Jumlah</th>
                <th style={{ width: "20%" }}>Keterangan</th>
              </tr>
              <tr>
                <th>(1)</th>
                <th>(2)</th>
                <th>(3)</th>
                <th>(4)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center">1</td>
                <td>Biaya Transportasi</td>
                <td className="text-center">Rp. 100.000,-</td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td>Jumlah</td>
                <td className="text-center">Rp. 100.000,-</td>
                <td></td>
              </tr>
              <tr>
                <td colSpan="4" className="text-center italic">
                  Terbilang == Seratus Ribu Rupiah ==
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* List Item 2 */}
      <div className="riil-list-wrapper" style={{ marginTop: "15px" }}>
        <div className="riil-list-num">2.</div>
        <div className="riil-list-content text-justify">
          Jumlah uang tersebut pada angka 1 di atas benar-benar dikeluarkan untuk pelaksanaan Perjalanan dinas dimaksud dan apabila di kemudian hari terdapat kelebihan atas pembayaran, kami bersedia untuk menyetorkan kelebihan tersebut ke Kas Negara.
        </div>
      </div>

      <div className="riil-paragraph text-justify" style={{ marginTop: "20px" }}>
        Demikian pernyataan ini kami buat dengan sebenarnya untuk dipergunakan sebagaimana mestinya.
      </div>

      {/* Tabel Tanda Tangan */}
      <table className="riil-signature-table">
        <tbody>
          <tr>
            <td className="text-center" style={{ width: "50%" }}>
              Mengetahui/menyetujui<br />
              Pejabat Pembuat Komitmen
            </td>
            <td className="text-center" style={{ width: "50%" }}>
              Boyolali, {tglKwitansi}<br />
              Yang melakukan perjalanan dinas,
            </td>
          </tr>
          <tr>
            <td style={{ height: "80px" }}></td>
            <td style={{ height: "80px" }}></td>
          </tr>
          <tr>
            <td className="text-center">
              <span className="font-underline">Siti Taufiq Hidayati, S.ST., M.Ak.</span><br />
              NIP. 198503292009122005
            </td>
            <td className="text-center">
              <span className="font-underline">{nama}</span><br />
              NIP. {nip}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}