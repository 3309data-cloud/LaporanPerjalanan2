import { useState, useMemo } from "react";
import { useData } from "../context/DataContext";
import { printReport, convertImagesToBase64 } from "../components/printReport";
import ReactDOM from "react-dom/client";
import ReportPreview from "../components/ReportPreview";
import { printStyles } from "../styles/printStyles";
import { flushSync } from "react-dom";
import { fetchImageBase64 } from "../utils/fetchImageBase64";

const bulanNama = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

export default function DashboardTable() {
  const data = useData();
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const dashboardArray = useMemo(() => {
    const dash = {};
    data.forEach(row => {
      const namaSurvei = row["Nama Survei"];
      const pelaksana = row["Nama"];
      const tanggalStr = row["Tanggal Kunjungan"];
      if (!namaSurvei || !pelaksana || !tanggalStr) return;

      const tanggal = parseTanggal(tanggalStr);
      if (!tanggal) return;

      const bulan = bulanNama[tanggal.getMonth()];
      const desa = row[`Desa(1)`] || "";
      const kecamatan = (row[`Kecamatan(1)`] || "").replace(/^\d+\s*/, "");
      const lokasi = desa + (kecamatan ? ", " + kecamatan : "");

      if (!dash[namaSurvei]) {
        dash[namaSurvei] = { nama: namaSurvei, bulan: {}, rincian: {} };
        bulanNama.forEach(b => {
          dash[namaSurvei].bulan[b] = 0;
          dash[namaSurvei].rincian[b] = [];
        });
      }

      dash[namaSurvei].bulan[bulan] += 1;

      const existingPelaksana = dash[namaSurvei].rincian[bulan].find(r => r.pelaksana === pelaksana);
      if (existingPelaksana) {
        existingPelaksana.jumlah += 1;
        existingPelaksana.tanggal.push(tanggalStr);
        existingPelaksana.lokasi.push(lokasi);
      } else {
        dash[namaSurvei].rincian[bulan].push({ pelaksana, jumlah: 1, tanggal: [tanggalStr], lokasi: [lokasi] });
      }
    });
    return Object.values(dash);
  }, [data]);

  function parseTanggal(str) {
    if (!str) return null;
    const parts = str.split("/");
    if (parts.length !== 3) return null;
    const [dd, mm, yyyy] = parts.map(Number);
    return new Date(yyyy, mm - 1, dd);
  }

const handlePrint = async (row) => {
  try {
    setLoading(true);
    setProgress(0);

    // Tampilkan progres bar awal
    flushSync(() => setProgress(50)); // bisa set ke 50% sebagai placeholder

    await printReport(row);

    // Selesai, progres 100%
    flushSync(() => setProgress(100));

    // Tambahan delay kecil agar progres 100% terlihat
    await new Promise(res => setTimeout(res, 200));
  } finally {
    setLoading(false);
    setProgress(0);
  }
};


  // 🔹 Print semua row untuk survei + bulan modal
// 🔹 Print semua row untuk survei + bulan modal
async function waitIframeImages(iframe) {
  const imgs = Array.from(iframe.contentDocument.querySelectorAll("img"));
  await Promise.all(
    imgs.map(
      (img) =>
        new Promise((resolve) => {
          if (img.complete) return resolve();
          img.onload = img.onerror = resolve;
        })
    )
  );
  return imgs.length;
}


async function waitImagesReady(container) {
  const imgs = Array.from(container.querySelectorAll("img"));
  await Promise.all(
    imgs.map(
      (img) =>
        new Promise((resolve) => {
          if (img.complete && img.src.startsWith("data:")) return resolve();
          img.onload = img.onerror = resolve;
        })
    )
  );
  return imgs.length;
}
// ✅ Helper baru
async function waitAllDriveImages(tempDiv, timeout = 15000) {
  const start = performance.now();
  let imgs = Array.from(tempDiv.querySelectorAll("img"));
  if (imgs.length === 0) {
    console.warn("Belum ada <img> di tempDiv, menunggu muncul...");
  }

  // Tunggu sampai ada minimal 1 img
  while (imgs.length === 0 && performance.now() - start < timeout) {
    await new Promise((r) => setTimeout(r, 200));
    imgs = Array.from(tempDiv.querySelectorAll("img"));
  }

  console.log(`➡️ Jumlah IMG ditemukan: ${imgs.length}`);

  // Sekarang tunggu sampai semua img sudah punya src base64 atau sudah onload
  let allReady = false;
  while (!allReady && performance.now() - start < timeout) {
    const readyCount = imgs.filter(
      (img) =>
        img.src &&
        (img.src.startsWith("data:") ||
          img.complete ||
          img.naturalWidth > 0)
    ).length;

    console.log(`⏳ Gambar siap ${readyCount}/${imgs.length}`);

    if (readyCount === imgs.length) {
      allReady = true;
      break;
    }
    await new Promise((r) => setTimeout(r, 400));
  }

  console.log("✅ Semua gambar DriveImage siap.");
}



const handlePrintAll = async () => {
  if (!selected) return;

  try {
    console.clear();
    console.log("=== 🧩 DEBUG PRINT SEMUA START ===");
    console.time("TOTAL");

    setLoading(true);
    setProgress(0);

    // 1️⃣ Filter rows sesuai survei + bulan
    console.time("FILTER_ROWS");
    const rowsToPrint = data.filter((r) => {
      const tgl = parseTanggal(r["Tanggal Kunjungan"]);
      if (!tgl) return false;
      const bulanRow = bulanNama[tgl.getMonth()];
      return r["Nama Survei"] === selected.nama && bulanRow === selected.bulan;
    });
    console.timeEnd("FILTER_ROWS");

    if (!rowsToPrint.length) {
      alert("Tidak ada data yang akan dicetak!");
      throw new Error("rowsToPrint kosong");
    }

    // 2️⃣ Buat container sementara untuk render semua row sekaligus
    console.time("CREATE_TEMP");
    const tempDiv = document.createElement("div");
    tempDiv.style.position = "absolute";
    tempDiv.style.left = "-9999px";
    document.body.appendChild(tempDiv);
    console.timeEnd("CREATE_TEMP");

    // 3️⃣ Render React ke tempDiv
    console.time("RENDER_REACT");
    const root = ReactDOM.createRoot(tempDiv);
    root.render(
      <div className="report-container">
        {rowsToPrint.map((row, i) => (
          <ReportPreview key={i} row={row} forceBase64 />
        ))}
      </div>
    );
    await new Promise((res) => setTimeout(res, 500));
    console.timeEnd("RENDER_REACT");

    // 4️⃣ Tunggu semua DriveImage selesai load
    console.time("WAIT_DRIVE_IMAGES");
    await Promise.all(Array.from(window.__imageLoadTracker.values()));
    console.timeEnd("WAIT_DRIVE_IMAGES");

    const imgs = Array.from(tempDiv.querySelectorAll("img"));
    console.log("✅ Semua gambar DriveImage siap:", imgs.length);

    // 5️⃣ Convert semua <img> ke Base64 sambil update progres
    console.time("CONVERT_BASE64");
    for (let i = 0; i < imgs.length; i++) {
      const img = imgs[i];
      if (img.src && !img.src.startsWith("data:")) {
        try {
          const match = img.src.match(/[-\w]{25,}/);
          const fileId = match ? match[0] : null;
          if (fileId && !window.__imageCache.has(fileId)) {
            const base64 = await fetchImageBase64(fileId);
            if (base64) window.__imageCache.set(fileId, base64);
            img.src = window.__imageCache.get(fileId) || img.src;
          }
        } catch (err) {
          console.error("Gagal convert img:", img.src, err);
        }
      }

      // 🔹 Update progres per gambar, beri waktu render React
      flushSync(() => setProgress(Math.round(((i + 1) / imgs.length) * 100)));
      await new Promise(r => setTimeout(r, 10)); // biar progres bar muncul
    }
    console.timeEnd("CONVERT_BASE64");

    // 6️⃣ Pastikan semua gambar siap
    console.time("WAIT_IMAGES_READY");
    await waitImagesReady(tempDiv);
    console.timeEnd("WAIT_IMAGES_READY");

    // 7️⃣ Ambil semua <style>
    console.time("GET_STYLES");
    const styles = Array.from(document.querySelectorAll("style"))
      .map((s) => s.outerHTML)
      .join("\n");
    console.timeEnd("GET_STYLES");

    // 8️⃣ Buat iframe tunggal untuk print semua row
    console.time("CREATE_IFRAME");
    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    document.body.appendChild(iframe);
    console.timeEnd("CREATE_IFRAME");

    // 9️⃣ Tulis HTML ke iframe
    console.time("WRITE_IFRAME");
    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(`
      <html>
        <head>
          ${styles}
          ${printStyles || ""}
        </head>
        <body class="printing-mode">
          ${tempDiv.innerHTML}
        </body>
      </html>
    `);
    doc.close();
    console.timeEnd("WRITE_IFRAME");

    // 10️⃣ Tunggu semua gambar di iframe load
    console.time("WAIT_IFRAME_IMAGES");
    await waitIframeImages(iframe);
    console.timeEnd("WAIT_IFRAME_IMAGES");

    // 11️⃣ Print sekali untuk semua
    console.time("PRINT_WINDOW");
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
    console.timeEnd("PRINT_WINDOW");

    // 12️⃣ Cleanup
    root.unmount();
    document.body.removeChild(tempDiv);
    setTimeout(() => document.body.removeChild(iframe), 1000);

    console.timeEnd("TOTAL");
    console.log("=== 🧩 DEBUG PRINT SEMUA END ===");
  } catch (err) {
    console.error("❌ Gagal print semua:", err);
  } finally {
    setLoading(false);
    setProgress(0);
  }
};




// ================= Helper Functions =================


  return (
    <div className="relative">
{loading && (
  <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black bg-opacity-40 pointer-events-auto">
    {/* Progres bar container */}
    <div className="w-64">
      <div className="w-full h-4 bg-gray-200 rounded overflow-hidden">
        <div
          className="h-4 bg-blue-500 transition-all duration-200"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="text-center text-white text-sm font-semibold mt-2">
        {progress > 0 ? `Menyiapkan... ${progress}%` : "Menyiapkan laporan..."}
      </div>
    </div>
  </div>
)}


      <div className="overflow-x-auto">
        <table className="border border-gray-300 table-auto text-sm w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2 text-left" style={{ minWidth: "200px" }}>Nama Survei</th>
              {bulanNama.map(bulan => (
                <th key={bulan} className="border p-2 text-center" style={{ minWidth: "8ch" }}>
                  {bulan}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dashboardArray.map(row => (
              <tr key={row.nama}>
                <td className="border p-2">{row.nama}</td>
                {bulanNama.map(bulan => (
                  <td
                    key={bulan}
                    className="border p-2 text-center cursor-pointer hover:bg-gray-100 transition"
                    onClick={() => {
                      if (row.rincian[bulan]?.length > 0) {
                        setSelected({ nama: row.nama, bulan, rincian: row.rincian[bulan] });
                      }
                    }}
                  >
                    {row.bulan[bulan] > 0 ? row.bulan[bulan] : "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal rincian */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg w-[700px] max-h-[80vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-3 text-center">{selected.nama} - {selected.bulan}</h2>

            <table className="w-full text-sm border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-1 text-center">Pelaksana</th>
                  <th className="border p-1 text-center">Jumlah Perjalanan</th>
                  <th className="border p-1 text-center">Tanggal</th>
                  <th className="border p-1 text-center">Desa Tujuan</th>
                  <th className="border p-1 text-center">Print</th>
                </tr>
              </thead>
              <tbody>
                {selected.rincian.map((item, idx) =>
                  item.tanggal.map((tgl, i) => {
                    const rowAsli = data.find(r => {
                      const desa = r[`Desa(1)`] || "";
                      const kecamatan = (r[`Kecamatan(1)`] || "").replace(/^\d+\s*/, "");
                      const lokasiRow = desa + (kecamatan ? ", " + kecamatan : "");

                      return (
                        r["Nama Survei"] === selected.nama &&
                        r["Nama"] === item.pelaksana &&
                        r["Tanggal Kunjungan"] === tgl &&
                        lokasiRow === item.lokasi[i]
                      );
                    });

                    return (
                      <tr key={`${idx}-${i}`}>
                        {i === 0 && (
                          <>
                            <td className="border p-1 font-medium align-top" rowSpan={item.tanggal.length}>{item.pelaksana}</td>
                            <td className="border p-1 text-center align-top" rowSpan={item.tanggal.length}>{item.jumlah}</td>
                          </>
                        )}
                        <td className="border p-1 text-center">{tgl}</td>
                        <td className="border p-1">{item.lokasi[i]}</td>
                        <td className="border p-1 text-center">
                          <button
                            className="text-gray-500 hover:text-gray-700 text-sm"
                            onClick={() => rowAsli && handlePrint(rowAsli)}
                            title="Print Laporan"
                          >
                            🖨️
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>

            <div className="mt-4 flex justify-end gap-2">
              <button
                className="px-4 py-1 bg-gray-300 rounded hover:bg-gray-400 transition"
                onClick={handlePrintAll}
              >
                🖨️ Print Semua
              </button>

              <button
                className="px-4 py-1 bg-gray-300 rounded hover:bg-gray-400 transition"
                onClick={() => setSelected(null)}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
