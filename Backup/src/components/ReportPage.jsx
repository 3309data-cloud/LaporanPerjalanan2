import { useState } from "react";
import ReportPreview from "./ReportPreview";
import { useData } from "./DataContext"; // ✅ ambil data dari context
import { printReportFromDOM } from "./printReport"; // ✅ pakai fungsi print global

function ReportPage() {
  const data = useData(); // ✅ akses data global
  const [selectedSurvei, setSelectedSurvei] = useState("");
  const [selectedKegiatan, setSelectedKegiatan] = useState("");
  const [selectedNama, setSelectedNama] = useState("");
  const [selectedTanggal, setSelectedTanggal] = useState("");

  // Dropdown options
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
    <main className="min-h-screen bg-gray-100 p-6 space-y-6">
      {/* Filter Section */}
      <section className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-3">Filter Data</h2>
        <div className="grid gap-3 md:grid-cols-4">
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
      </section>

      {/* Preview Section */}
      <section className="bg-white p-4 rounded-xl shadow flex flex-col">
        <div className="flex justify-between items-center mb-3 shrink-0">
          <h2 className="text-lg font-semibold">Hasil Laporan</h2>
          {filtered.length > 0 && (
            <button
              onClick={() => printReportFromDOM(filtered[0])} // ✅ cukup kirim row pertama
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
            >
              🖨️ Print
            </button>
          )}
        </div>

        {filtered.length > 0 ? (
          <div className="report-container flex-1 overflow-y-auto pr-2 space-y-6 screen-scroll">
            {filtered.map((row, i) => (
              <ReportPreview key={i} row={row} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-6 flex-1 flex items-center justify-center">
            {selectedSurvei && selectedKegiatan && selectedNama && selectedTanggal
              ? "DATA TIDAK DITEMUKAN"
              : "SILAKAN PILIH NAMA SURVEI, KEGIATAN, NAMA, DAN TANGGAL"}
          </p>
        )}
      </section>
    </main>
  );
}

export default ReportPage;
