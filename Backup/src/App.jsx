import { useEffect, useState } from "react";
import Papa from "papaparse";
import ReportPreview from "./components/ReportPreview";

// format tanggal ke dd/mm/yyyy
function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr.trim();
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

// normalisasi huruf kapital
function normalizeText(str) {
  return str ? str.trim().toUpperCase() : "";
}

// normalisasi multiline → ubah literal "\n" jadi newline asli
function normalizeMultiline(str) {
  if (!str) return "";
  return str
    .replace(/\\r\\n/g, "\n") // string "\r\n"
    .replace(/\\n/g, "\n")    // string "\n"
    .replace(/\r\n/g, "\n")   // Windows newline
    .replace(/\r/g, "\n");    // Mac newline lama
}

function App() {
  const [data, setData] = useState([]);

  const [selectedSurvei, setSelectedSurvei] = useState("");
  const [selectedKegiatan, setSelectedKegiatan] = useState("");
  const [selectedNama, setSelectedNama] = useState("");
  const [selectedTanggal, setSelectedTanggal] = useState("");

  const SHEET_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSvWvdZ7YInQaix7VVXtPnEklDEKXs5cqWC-XHvKCcSD8i02gE1XE2sE4Ww7t6otf1Jb_WQCyCEwqts/pub?gid=699251161&single=true&output=csv";

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

          // Normalisasi umum
          newRow["Nama"] = normalizeText(row["Nama"]);
          newRow["Tujuan Kegiatan"] = normalizeText(row["Tujuan Kegiatan"]);
          newRow["Nama Survei"] = normalizeText(row["Nama Survei"]);
          newRow["Tanggal Kunjungan"] = formatDate(row["Tanggal Kunjungan"]);

          // Normalisasi multiline untuk Nama(1–5) & Kegiatan(1–5)
          for (let i = 1; i <= 5; i++) {
            newRow[`Nama(${i})`] = normalizeMultiline(row[`Nama(${i})`]);
            newRow[`Kegiatan(${i})`] = normalizeMultiline(row[`Kegiatan(${i})`]);
          }

          // Debug log
          console.log("Sesudah normalisasi Nama(1):", newRow["Nama(1)"]);

          return newRow;
        });

        setData(formatted);
      });
  }, []);

  // Dropdown berjenjang
  const surveiOptions = [
    ...new Set(data.map((row) => row["Nama Survei"]).filter(Boolean)),
  ];

  const kegiatanOptions = selectedSurvei
    ? [
        ...new Set(
          data
            .filter((row) => row["Nama Survei"] === selectedSurvei)
            .map((row) => row["Tujuan Kegiatan"])
            .filter(Boolean)
        ),
      ]
    : [];

  const namaOptions =
    selectedSurvei && selectedKegiatan
      ? [
          ...new Set(
            data
              .filter(
                (row) =>
                  row["Nama Survei"] === selectedSurvei &&
                  row["Tujuan Kegiatan"] === selectedKegiatan
              )
              .map((row) => row["Nama"])
              .filter(Boolean)
          ),
        ]
      : [];

  const tanggalOptions =
    selectedSurvei && selectedKegiatan && selectedNama
      ? [
          ...new Set(
            data
              .filter(
                (row) =>
                  row["Nama Survei"] === selectedSurvei &&
                  row["Tujuan Kegiatan"] === selectedKegiatan &&
                  row["Nama"] === selectedNama
              )
              .map((row) => row["Tanggal Kunjungan"])
              .filter(Boolean)
          ),
        ]
      : [];

  const filtered = data.filter(
    (row) =>
      row["Nama Survei"] === selectedSurvei &&
      row["Tujuan Kegiatan"] === selectedKegiatan &&
      row["Nama"] === selectedNama &&
      row["Tanggal Kunjungan"] === selectedTanggal
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-60 bg-white shadow-lg hidden md:flex flex-col">
        <div className="p-4 text-xl font-bold border-b">📋 Menu</div>
        <nav className="flex-1 p-2">
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="block p-2 rounded hover:bg-blue-100 text-blue-700 font-semibold"
              >
                Laporan Kegiatan
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block p-2 rounded hover:bg-gray-200 text-gray-600"
              >
                Data Input
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block p-2 rounded hover:bg-gray-200 text-gray-600"
              >
                Setting
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Laporan Kegiatan
        </h1>

        {/* Filter */}
        <div className="grid gap-2 md:grid-cols-4 mb-6">
          <select
            value={selectedSurvei}
            onChange={(e) => {
              setSelectedSurvei(e.target.value);
              setSelectedKegiatan("");
              setSelectedNama("");
              setSelectedTanggal("");
            }}
            className="border p-2 rounded w-full"
          >
            <option value="">PILIH NAMA SURVEI</option>
            {surveiOptions.map((survei, i) => (
              <option key={i} value={survei}>
                {survei}
              </option>
            ))}
          </select>

          <select
            value={selectedKegiatan}
            onChange={(e) => {
              setSelectedKegiatan(e.target.value);
              setSelectedNama("");
              setSelectedTanggal("");
            }}
            className="border p-2 rounded w-full"
            disabled={!selectedSurvei}
          >
            <option value="">PILIH KEGIATAN</option>
            {kegiatanOptions.map((keg, i) => (
              <option key={i} value={keg}>
                {keg}
              </option>
            ))}
          </select>

          <select
            value={selectedNama}
            onChange={(e) => {
              setSelectedNama(e.target.value);
              setSelectedTanggal("");
            }}
            className="border p-2 rounded w-full"
            disabled={!selectedKegiatan}
          >
            <option value="">PILIH NAMA</option>
            {namaOptions.map((nama, i) => (
              <option key={i} value={nama}>
                {nama}
              </option>
            ))}
          </select>

          <select
            value={selectedTanggal}
            onChange={(e) => setSelectedTanggal(e.target.value)}
            className="border p-2 rounded w-full"
            disabled={!selectedNama}
          >
            <option value="">PILIH TANGGAL</option>
            {tanggalOptions.map((tgl, i) => (
              <option key={i} value={tgl}>
                {tgl}
              </option>
            ))}
          </select>
        </div>

        {/* Preview */}
        <div className="space-y-8">
          {filtered.length > 0 ? (
            filtered.map((row, i) => <ReportPreview key={i} row={row} />)
          ) : (
            <p className="text-center text-gray-500">
              {selectedSurvei && selectedKegiatan && selectedNama && selectedTanggal
                ? "DATA TIDAK DITEMUKAN"
                : "SILAKAN PILIH NAMA SURVEI, KEGIATAN, NAMA, DAN TANGGAL"}
            </p>
          )}
        </div>

        {/* Tombol Print */}
        {filtered.length > 0 && (
          <div className="text-center mt-6">
            <button
              onClick={() => window.print()}
              className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700"
            >
              PRINT LAPORAN
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
