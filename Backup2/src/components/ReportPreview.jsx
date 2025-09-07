function ReportPreview({ row }) {
  function formatFullDate(dateStr) {
    if (!dateStr) return "";
    const d = new Date(dateStr.split("/").reverse().join("-"));
    if (isNaN(d)) return dateStr;
    const hari = d.toLocaleDateString("id-ID", { weekday: "long" });
    const tanggal = d.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
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

  // 🔧 Ubah link Google Drive jadi direct thumbnail link
function formatFotoLink(url) {
  const match = url.match(/[-\w]{25,}/);
  if (match) {
    // Gunakan "export=view" untuk bisa di <img>
    return `https://drive.google.com/uc?export=view&id=${match[0]}`;
  }
  return url;
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
            {/* Judul */}
            <h2 className="report-title">LAPORAN KEGIATAN PERJALANAN DINAS</h2>

            {/* Detail utama */}
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
                  {[row["Tujuan Kegiatan"], row["Nama Survei"]]
                    .filter(Boolean) // hilangkan yg kosong/null
                    .join(" ")}
                </span>
              </div>
              <div className="report-row">
                <span className="report-label">Tanggal Pelaksanaan</span>
                <span className="report-sep">:</span>
                <span className="report-value">
                  {formatFullDate(row["Tanggal Kunjungan"])}
                </span>
              </div>
              <div className="report-row">
                <span className="report-label">Lokasi Tujuan</span>
                <span className="report-sep">:</span>
                <span className="report-value">
                  {capitalizeWord(desa) || "-"}, {formatKecamatan(kec) || "-"}
                </span>
              </div>
            </div>

            {/* Nama Responden */}
            <div className="report-section">
              <p className="report-labelbawah">
                Nama Petugas/Pejabat/Responden yang dikunjungi :
              </p>
              <div className="ml-2 multiline">{namaResponden || "-"}</div>
            </div>

            {/* Kegiatan */}
            <div className="report-section">
              <p className="report-labelbawah">Kegiatan yang dilakukan :</p>
              <div className="ml-2 multiline">{kegiatan || "-"}</div>
            </div>

            {/* Foto */}
            {foto && (
              <div className="report-section">
                <p className="report-labelbawah">Foto Kegiatan</p>
                <div className="report-photos mt-2">
                  {foto
                    .split(",")
                    .slice(0, 5) // maksimal 5 foto
                    .map((link, idx) => {
                      const trimmed = link.trim();
                      const directLink = formatFotoLink(trimmed);

                      return (
                        <img
                          key={idx}
                          src={directLink}
                          alt={`Foto ${idx + 1}`}
                          onError={(e) => {
                            console.error("❌ Gagal load foto:", e.target.src);
                            e.target.alt = "Foto gagal dimuat";
                            e.target.style.display = "none";
                          }}
                        />
                      );
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
