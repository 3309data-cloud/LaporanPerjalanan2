import { createContext, useContext, useState, useEffect } from "react";
import Papa from "papaparse";

const DataContext = createContext();

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSvWvdZ7YInQaix7VVXtPnEklDEKXs5cqWC-XHvKCcSD8i02gE1XE2sE4Ww7t6otf1Jb_WQCyCEwqts/pub?gid=699251161&single=true&output=csv";

export function DataProvider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(SHEET_URL)
      .then((res) => res.text())
      .then((csvText) => {
        const parsed = Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
        });

        const formatted = parsed.data.map((row) => {
          let newRow = { ...row };

          newRow["Nama"] = normalizeText(row["Nama"]);
          newRow["Tujuan Kegiatan"] = normalizeText(row["Tujuan Kegiatan"]);
          newRow["Nama Survei"] = normalizeText(row["Nama Survei"]);
          newRow["Tanggal Kunjungan"] = formatDate(row["Tanggal Kunjungan"]);

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

  return (
    <DataContext.Provider value={data}>{children}</DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}

// 🔧 fungsi helper
function normalizeText(str) {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
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
