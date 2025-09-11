import React, { useEffect, useState } from "react";
import "../App.css";

// 🔥 Cache global (harus sama dengan printReport.js)
const imageCache = window.__imageCache || (window.__imageCache = new Map());

/**
 * Komponen DriveImage → hanya untuk live DOM
 * Ambil dari cache dulu, kalau tidak ada baru fetch ke Apps Script
 */
function DriveImage({ fileId, alt, onLoadingChange }) {
  const [src, setSrc] = useState(imageCache.get(fileId) || null);

  useEffect(() => {
    if (!fileId) return;

    // kalau sudah ada di cache, pakai langsung
    if (imageCache.has(fileId)) {
      setSrc(imageCache.get(fileId));
      onLoadingChange?.(false);
      return;
    }

    onLoadingChange?.(true);
    const url = `https://script.google.com/macros/s/AKfycbxGvdoKSOvm2ZrykWCvcdNd-puOE5NeOejWdIieMIfOo-gPSmJxuymmNt38MX0H83hK/exec?id=${fileId}`;

    fetch(url)
      .then((res) => res.json())
      .then(({ mime, data }) => {
        const base64 = `data:${mime};base64,${data}`;
        imageCache.set(fileId, base64); // simpan ke cache global
        setSrc(base64);
      })
      .catch((err) => {
        console.error("❌ Gagal ambil foto:", err);
      })
      .finally(() => {
        onLoadingChange?.(false);
      });
  }, [fileId]);

  if (!src) return null;

  return <img src={src} alt={alt} className="max-h-64 object-contain" />;
}

/**
 * Komponen ReportPage → satu halaman laporan dengan overlay sendiri
 */
function ReportPage({ children }) {
  const [loadingCount, setLoadingCount] = useState(0);

  const handleLoadingChange = (isLoading) => {
    setLoadingCount((prev) => prev + (isLoading ? 1 : -1));
  };

  return (
    <div className="relative report-page">
      {/* overlay hanya di halaman ini */}
      {loadingCount > 0 && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex flex-col items-center justify-center z-50">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
          <p className="text-gray-700 text-sm font-medium">Memuat foto...</p>
        </div>
      )}
      {/* lempar handler ke children */}
      {children(handleLoadingChange)}
    </div>
  );
}

/**
 * ReportPreview → bisa dipakai untuk live DOM atau print
 */
function ReportPreview({ row, forceBase64 = false }) {
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
          <ReportPage key={i}>
            {(handleLoadingChange) => (
              <>
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
                      {[row["Tujuan Kegiatan"], row["Nama Survei"]]
                        .filter(Boolean)
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

                <div className="report-section">
                  <p className="report-labelbawah">
                    Nama Petugas/Pejabat/Responden yang dikunjungi :
                  </p>
                  <div className="ml-2 multiline">{namaResponden || "-"}</div>
                </div>

                <div className="report-section">
                  <p className="report-labelbawah">Kegiatan yang dilakukan :</p>
                  <div className="ml-2 multiline">{kegiatan || "-"}</div>
                </div>

                <div className="report-section signature-block">
                  <div>
                    <p>Pelaksana Perjalanan Dinas</p>
                    <div className="signature-space"></div>
                    <p className="signature-name">{row["Nama"] || "-"}</p>
                  </div>
                </div>


                {foto && (
                  <div className="report-section">
                    <p className="report-labelbawah">Foto Kegiatan</p>
                    <div className="report-photos mt-2">
                      {foto.split(",").slice(0, 5).map((link, idx) => {
                        if (forceBase64) {
                          return (
                            <img
                              key={idx}
                              src={link}
                              alt={`Foto ${idx + 1}`}
                              className="max-h-64 object-contain"
                            />
                          );
                        } else {
                          const match = link.match(/[-\w]{25,}/);
                          const fileId = match ? match[0] : null;
                          return fileId ? (
                            <DriveImage
                              key={idx}
                              fileId={fileId}
                              alt={`Foto ${idx + 1}`}
                              onLoadingChange={handleLoadingChange}
                            />
                          ) : null;
                        }
                      })}
                    </div>
                  </div>
                )}
              </>
            )}
          </ReportPage>
        );
      })}
    </div>
  );
}

export default ReportPreview;
