import React from "react";

const spdBelakangStyles = `
/* =========================================================
   GAYA KHUSUS LAPORAN: LEMBAR BELAKANG SPD (VISUM)
   ========================================================= */
.spdb-container {
  font-family: "Times New Roman", Times, serif;
  font-size: 11pt;
  line-height: 1.4;
  color: #000;
  width: 100%;
  margin-top: 10px;
}

/* Tabel Utama Pembagi Layout Kiri-Kanan */
.spdb-main-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed; /* Memaksa rasio 50:50 */
}

/* Pengaturan Garis (Borders) */
.spdb-main-table td {
  padding: 15px 20px;
  vertical-align: top;
}

/* Garis Tengah Vertikal */
.col-left {
  border-right: 1px solid black; 
}

/* Garis Horizontal Pembatas Baris */
.row-divider td {
  border-bottom: 1px solid black;
}
/* Garis Horizontal Tebal di akhir tabel (sebelum footer) */
.row-last td {
  border-bottom: 1px solid black; 
}

/* Tabel Inner (Untuk menyejajarkan titik dua dalam tiap blok) */
.spdb-inner-table {
  width: 100%;
  border-collapse: collapse;
}
.spdb-inner-table td {
  padding: 2px 0;
  border: none !important;
  vertical-align: top;
}
.i-label { width: 100px; }
.i-colon { width: 15px; text-align: center; }
.i-val { width: auto; }

/* Tanda Tangan */
.sign-block {
  text-align: center;
  margin-top: 20px;
}
.sign-space {
  height: 125px; /* Ruang untuk tanda tangan basah */
}

/* Footer Catatan */
.spdb-footer {
  margin-top: 10px;
  font-size: 10pt; /* Biasanya footer sedikit lebih kecil */
  display: flex;
}
.f-label { width: 120px; flex-shrink: 0; }
.f-colon { width: 15px; text-align: center; flex-shrink: 0; }
.f-text { flex-grow: 1; text-align: justify; }

.font-bold { font-weight: bold; }
.font-underline { text-decoration: underline; }
`;

export default function SPDBelakang({ row }) {
  // Mapping Data (Sesuaikan dengan field data Anda)
  const asal = row["tujuan"] || ""; 
  const tujuan = row["tujuan"] || "";
  
  // Pejabat
  const namaKepsK = "Puguh Raharjo, SST, MT";
  const nipKepsK = "1980010022002121005";
  const namaPpk = "Siti Taufiq Hidayati, S.ST., M.Ak";
  const nipPpk = "198503292009122005";

  return (
    <>
      <style>{spdBelakangStyles}</style>

      <div className="spdb-container">
        
        {/* TABEL UTAMA (GRID 50% : 50%) */}
        <table className="spdb-main-table">
          <colgroup>
            <col style={{ width: "50%" }} />
            <col style={{ width: "50%" }} />
          </colgroup>
          <tbody>
            
            {/* BARIS 1 */}
            <tr className="row-divider">
              <td className="col-left">
                {/* Kotak Kiri Atas Dikosongkan sesuai format asli */}
              </td>
              <td>
                <table className="spdb-inner-table">
                  <tbody>
                    <tr>
                      <td className="i-label">Berangkat dari</td>
                      <td className="i-colon">:</td>
                      <td className="i-val">Kec. {asal}<br/>(Tempat Kedudukan)</td>
                    </tr>
                    <tr>
                      <td className="i-label">Pada Tanggal</td>
                      <td className="i-colon">:</td>
                      <td className="i-val"></td>
                    </tr>
                    <tr>
                      <td className="i-label">Ke</td>
                      <td className="i-colon">:</td>
                      <td className="i-val">Kec. {tujuan}</td>
                    </tr>
                  </tbody>
                </table>
                
                <div className="sign-block">
                  Kepala BPS Kabupaten Boyolali
                  <div className="sign-space"></div>
                  <span className="font-bold font-underline">{namaKepsK}</span><br />
                  <span className="font-bold">NIP. {nipKepsK}</span>
                </div>
              </td>
            </tr>

            {/* BARIS 2 (Bagian Visum Tujuan) */}
            <tr className="row-divider">
              <td className="col-left">
                <table className="spdb-inner-table">
                  <tbody>
                    <tr>
                      <td className="i-label">Tiba di</td>
                      <td className="i-colon">:</td>
                      <td className="i-val">Kec. {tujuan}</td>
                    </tr>
                    <tr>
                      <td className="i-label">Pada tanggal</td>
                      <td className="i-colon">:</td>
                      <td className="i-val"></td>
                    </tr>
                  </tbody>
                </table>
                {/* Ruang kosong agar setara dengan sebelah kanan */}
                <div style={{ minHeight: "200px" }}></div> 
              </td>
              <td>
                <table className="spdb-inner-table">
                  <tbody>
                    <tr>
                      <td className="i-label">Berangkat dari</td>
                      <td className="i-colon">:</td>
                      <td className="i-val">Kec. {tujuan}</td>
                    </tr>
                    <tr>
                      <td className="i-label">Ke</td>
                      <td className="i-colon">:</td>
                      <td className="i-val">Kec. {asal}</td>
                    </tr>
                    <tr>
                      <td className="i-label">Pada tanggal</td>
                      <td className="i-colon">:</td>
                      <td className="i-val"></td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            {/* BARIS 3 (Bagian Kembali & Keterangan) */}
            <tr className="row-last">
              <td className="col-left">
                <table className="spdb-inner-table">
                  <tbody>
                    <tr>
                      <td className="i-label">Tiba di</td>
                      <td className="i-colon">:</td>
                      <td className="i-val">Kec. {asal}<br/>(Tempat Kedudukan)</td>
                    </tr>
                    <tr>
                      <td className="i-label">Pada tanggal</td>
                      <td className="i-colon">:</td>
                      <td className="i-val"></td>
                    </tr>
                  </tbody>
                </table>

                <div className="sign-block" style={{ marginTop: "40px" }}>
                  Pejabat Pembuat Komitmen
                  <div className="sign-space"></div>
                  <span className="font-bold font-underline">{namaPpk}</span><br />
                  NIP. {nipPpk}
                </div>
              </td>
              <td>
                <div style={{ textAlign: "justify", marginBottom: "20px" }}>
                  Telah diperiksa dengan keterangan bahwa perjalanan tersebut atas perintahnya dan semata-mata untuk kepentingan jabatan dalam waktu yang sesingkat-singkatnya.
                </div>

                <div className="sign-block">
                  Pejabat Pembuat Komitmen
                  <div className="sign-space"></div>
                  <span className="font-bold font-underline">{namaPpk}</span><br />
                  NIP. {nipPpk}
                </div>
              </td>
            </tr>

          </tbody>
        </table>

        {/* FOOTER */}
        <div className="spdb-footer">
          <div className="f-label">
            Catatan Lain-lain<br />
            PERHATIAN
          </div>
          <div className="f-colon"><br/>:</div>
          <div className="f-text">
            <br/>Pejabat yang berwenang menerbitkan SPD pegawai yang melakukan perjalanan dinas para pejabat yang mengesahkan tanggal berangkat/tiba serta bendaharawan bertanggung jawab berdasarkan peraturan-peraturan keuangan Negara apabila Negara menderita rugi akibat kesalahan, kelalaian dan kealpaannya.
          </div>
        </div>

      </div>
    </>
  );
}