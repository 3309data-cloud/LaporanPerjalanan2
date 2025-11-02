// 🧠 DataContext.jsx
// ========================================================
// Modul ini bertanggung jawab untuk:
// 1️⃣ Mengambil data dari Google Sheets (CSV format).
// 2️⃣ Memparsing CSV menggunakan PapaParse.
// 3️⃣ Membersihkan & memformat data (normalisasi teks, tanggal).
// 4️⃣ Menyediakan data global ke seluruh aplikasi melalui Context API.
// 5️⃣ Menyediakan fungsi refreshData() untuk memuat ulang data global.
// ========================================================

import { createContext, useContext, useState, useEffect } from "react";
import Papa from "papaparse";

// 🌐 URL sumber data (Google Sheets dipublikasikan sebagai CSV)
const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSvWvdZ7YInQaix7VVXtPnEklDEKXs5cqWC-XHvKCcSD8i02gE1XE2sE4Ww7t6otf1Jb_WQCyCEwqts/pub?gid=699251161&single=true&output=csv";

// ========================================================
// 🧩 Context Setup
// ========================================================
const DataContext = createContext();

export function DataProvider({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // --------------------------------------------------------
  // 🔁 Fungsi utama untuk fetch dan parsing data
  // --------------------------------------------------------
  const fetchData = async () => {
    try {
      setLoading(true);

      // 🔥 Tambahkan timestamp agar cache Google Sheet selalu di-bypass
      const urlWithCacheBuster = `${SHEET_URL}&t=${Date.now()}`;

      const res = await fetch(urlWithCacheBuster, { cache: "no-store" });
      const csvText = await res.text();

      const parsed = Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
      });

      // 🧹 Format & normalisasi hasil parsing
      const formatted = parsed.data.map((row) => {
        let newRow = { ...row };

        // ✍️ Normalisasi kolom teks utama
        newRow["Nama"] = normalizeText(row["Nama"]);
        newRow["Tujuan Kegiatan"] = normalizeText(row["Tujuan Kegiatan"]);
        newRow["Nama Survei"] = normalizeText(row["Nama Survei"]);
        newRow["Tanggal Kunjungan"] = formatDate(row["Tanggal Kunjungan"]);

        // 🔁 Normalisasi data berulang (Nama(1..5), Kegiatan(1..5), dll)
        for (let i = 1; i <= 5; i++) {
          newRow[`Nama(${i})`] = normalizeMultiline(row[`Nama(${i})`]);
          newRow[`Kegiatan(${i})`] = normalizeMultiline(row[`Kegiatan(${i})`]);
          newRow[`Desa(${i})`] = normalizeText(row[`Desa(${i})`]);
          newRow[`Kecamatan(${i})`] = normalizeText(row[`Kecamatan(${i})`]);
        }

        // 🔹 Tangani kolom status "Ket" agar sinkron persis dengan Sheet
        newRow["Ket"] = row["Ket"]?.trim() ?? "";

        return newRow;
      });

      setData(formatted);
    } catch (error) {
      console.error("❌ Gagal memuat data:", error);
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------------
  // 🌀 Muat data pertama kali saat komponen mount
  // --------------------------------------------------------
  useEffect(() => {
    fetchData();
  }, []);

  // --------------------------------------------------------
  // 🔁 Fungsi refreshData: bisa dipanggil dari komponen manapun
  // --------------------------------------------------------
  const refreshData = async () => {
    console.log("🔄 Memuat ulang data dari Google Sheets (tanpa cache)...");
    await fetchData();
  };

  // --------------------------------------------------------
  // 📤 Return Provider dengan data & fungsi siap pakai
  // --------------------------------------------------------
  return (
    <DataContext.Provider value={{ data, loading, refreshData }}>
      {children}
    </DataContext.Provider>
  );
}

// Hook untuk menggunakan data dari context
export function useData() {
  return useContext(DataContext);
}

// ========================================================
// 🧰 Helper Functions
// ========================================================
function normalizeText(str) {
  if (!str) return "";
  return str
    .split(" ")
    .map((w) => {
      if (w.length <= 3) return w; // kata ≤ 3 huruf tidak diubah
      return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    })
    .join(" ")
    .trim();
}

function normalizeMultiline(str) {
  if (!str) return "";
  return str
    .split("\n")
    .map((line) =>
      line
        .toLowerCase()
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
        .trim()
    )
    .join("\n");
}

function formatDate(str) {
  if (!str) return "";
  const d = new Date(str);
  return isNaN(d) ? str : d.toLocaleDateString("id-ID");
}
