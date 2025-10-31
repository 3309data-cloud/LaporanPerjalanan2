// 🧠 DataContext.jsx
// ========================================================
// Modul ini bertanggung jawab untuk:
// 1️⃣ Mengambil data dari Google Sheets (CSV format).
// 2️⃣ Memparsing CSV menggunakan PapaParse.
// 3️⃣ Membersihkan & memformat data (normalisasi teks, tanggal).
// 4️⃣ Menyediakan data global ke seluruh aplikasi melalui Context API.
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

/**
 * 🔹 DataProvider
 * Komponen utama untuk mengambil dan menyediakan data ke seluruh app.
 */
export function DataProvider({ children }) {
  const [data, setData] = useState([]);

  // --------------------------------------------------------
  // 🌀 Effect: Fetch dan parsing data dari Google Sheets
  // --------------------------------------------------------
  useEffect(() => {
    fetch(SHEET_URL)
      .then((res) => res.text())
      .then((csvText) => {
        const parsed = Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
        });

        // 🧩 Format & normalisasi setiap baris data
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

          return newRow;
        });

        setData(formatted);
      });
  }, []);

  // --------------------------------------------------------
  // 📤 Return Provider dengan data siap pakai
  // --------------------------------------------------------
  return (
    <DataContext.Provider value={data}>{children}</DataContext.Provider>
  );
}

// Hook untuk menggunakan data dari context
export function useData() {
  return useContext(DataContext);
}

// ========================================================
// 🧰 Helper Functions
// ========================================================

/**
 * ✨ normalizeText()
 * Membersihkan teks satu baris: lowercase → kapital di awal tiap kata.
 */
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


/**
 * 🧹 normalizeMultiline()
 * Sama seperti normalizeText(), tapi mendukung teks dengan baris ganda.
 */
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

/**
 * 📅 formatDate()
 * Mengubah string tanggal menjadi format lokal Indonesia (dd/mm/yyyy)
 */
function formatDate(str) {
  if (!str) return "";
  const d = new Date(str);
  return isNaN(d) ? str : d.toLocaleDateString("id-ID");
}
