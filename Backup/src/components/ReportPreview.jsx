import React, { useEffect, useState } from "react";

/**
 * Komponen DriveImage → hanya untuk live DOM
 */
function DriveImage({ fileId, alt }) {
  const [src, setSrc] = useState(null);

  useEffect(() => {
    if (!fileId) return;
    const url = `https://script.google.com/macros/s/AKfycbxGvdoKSOvm2ZrykWCvcdNd-puOE5NeOejWdIieMIfOo-gPSmJxuymmNt38MX0H83hK/exec?id=${fileId}`;

    fetch(url)
      .then((res) => res.json())
      .then(({ mime, data }) => {
        setSrc(`data:${mime};base64,${data}`);
      })
      .catch((err) => {
        console.error("❌ Gagal ambil foto:", err);
      });
  }, [fileId]);

  if (!src) {
    return <div style={{ fontSize: "12px", color: "#999" }}>Memuat foto...</div>;
  }

  return <img src={src} alt={alt} />;
}

/**
 * ReportPreview → bisa dipakai untuk live DOM atau print
 * @param {Object} row → data
 * @param {boolean} forceBase64 → jika true, gunakan src base64 langsung
 */
function ReportPreview({ row, forceBase64 = false }) {
  function formatFullDate(dateStr) {
    if (!dateStr) return "";
    const d = new Date(dateStr.split("/").reverse().join("-"));
    if (isNaN(d)) return dateStr;
    const hari = d.toLocaleDateString("id-ID", { weekday: "long" });
    const tanggal = d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    return `${hari}, ${tanggal}`;
  }

  function formatKecamatan(str) {
    if (!str) return "";
    const nama = str.replace(/^\d+\s*/, "").toLowerCase();
    return "Kecamatan " + nama.charAt(0).toUpperCase() + nama.slice(1);
  }

  function capitalizeWord(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  return (
    <div>
      {[1, 2, 3, 4, 5].map((i) => {
        const desa = row[`Desa(${i})`];
        const kec = row[`Kecamatan(${i})`];
        const namaResponden = row[`Nama(${i})`];
        const kegiatan = row[`Kegiatan(${i})`];
        const foto = row[`Foto(${i})`];

        if (!desa && !kec && !namaResponden && !kegiatan && !foto) return null;

        return (
          <div key={i} className="report-page">
            <h2 className="report-title">LAPORAN KEGIATAN PERJALANAN DINAS</h2>

            <div className="report-section">
              <div className="report-row">
                <span className="report-label">Nama Pelaksana Tugas</span>
                <span className="report-sep">:</span>
                <span className="report-value">{row["Nama"]}</span>
              </div>
              <div className="report-row">
                <span className="report-label">Nama Kegiatan</span>
                <span className="report-sep">:</span>
                <span className="report-value">
                  {[row["Tujuan Kegiatan"], row["Nama Survei"]].filter(Boolean).join(" ")}
                </span>
              </div>
              <div className="report-row">
                <span className="report-label">Tanggal Pelaksanaan</span>
                <span className="report-sep">:</span>
                <span className="report-value">{formatFullDate(row["Tanggal Kunjungan"])}</span>
              </div>
              <div className="report-row">
                <span className="report-label">Lokasi Tujuan</span>
                <span className="report-sep">:</span>
                <span className="report-value">
                  {capitalizeWord(desa) || "-"}, {formatKecamatan(kec) || "-"}
                </span>
              </div>
            </div>

            <div className="report-section">
              <p className="report-labelbawah">Nama Petugas/Pejabat/Responden yang dikunjungi :</p>
              <div className="ml-2 multiline">{namaResponden || "-"}</div>
            </div>

            <div className="report-section">
              <p className="report-labelbawah">Kegiatan yang dilakukan :</p>
              <div className="ml-2 multiline">{kegiatan || "-"}</div>
            </div>

            {foto && (
              <div className="report-section">
                <p className="report-labelbawah">Foto Kegiatan</p>
                <div className="report-photos mt-2">
                  {foto.split(",").slice(0, 5).map((link, idx) => {
                    if (forceBase64) {
                      // langsung pakai src base64
                      return <img key={idx} src={link} alt={`Foto ${idx + 1}`} />;
                    } else {
                      // live DOM → pakai DriveImage
                      const match = link.match(/[-\w]{25,}/);
                      const fileId = match ? match[0] : null;
                      return fileId ? <DriveImage key={idx} fileId={fileId} alt={`Foto ${idx + 1}`} /> : null;
                    }
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ReportPreview;
