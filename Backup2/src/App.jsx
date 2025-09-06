import { useEffect, useState } from "react";
import Papa from "papaparse";
import ReportPreview from "./components/ReportPreview";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function App() {
  const [data, setData] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    Papa.parse(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vSvWvdZ7YInQaix7VVXtPnEklDEKXs5cqWC-XHvKCcSD8i02gE1XE2sE4Ww7t6otf1Jb_WQCyCEwqts/pub?gid=699251161&single=true&output=csv",
      {
        download: true,
        header: true,
        complete: (result) => {
          setData(result.data.filter((row) => row["Nama Survei"])); // filter row kosong
        },
      }
    );
  }, []);

  const surveys = [...new Set(data.map((row) => row["Nama Survei"]))].filter(
    Boolean
  );

  const activities = [
    ...new Set(
      data
        .filter((row) => row["Nama Survei"] === selectedSurvey)
        .map((row) => row["Tujuan Kegiatan"])
    ),
  ].filter(Boolean);

  const names = [
    ...new Set(
      data
        .filter(
          (row) =>
            row["Nama Survei"] === selectedSurvey &&
            row["Tujuan Kegiatan"] === selectedActivity
        )
        .map((row) => row["Nama"])
    ),
  ].filter(Boolean);

  const dates = [
    ...new Set(
      data
        .filter(
          (row) =>
            row["Nama Survei"] === selectedSurvey &&
            row["Tujuan Kegiatan"] === selectedActivity &&
            row["Nama"] === selectedName
        )
        .map((row) => row["Tanggal Kunjungan"])
    ),
  ].filter(Boolean);

  const filteredRows = data.filter(
    (row) =>
      row["Nama Survei"] === selectedSurvey &&
      row["Tujuan Kegiatan"] === selectedActivity &&
      row["Nama"] === selectedName &&
      row["Tanggal Kunjungan"] === selectedDate
  );


  // 🔹 fungsi print
  const handlePrint = () => {
    window.print();
  };

  // 🔹 fungsi download PDF
  const handleDownloadPDF = async () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const pages = document.querySelectorAll(".report-page");

    for (let i = 0; i < pages.length; i++) {
      const hiddenDiv = document.createElement("div");
      hiddenDiv.style.position = "absolute";
      hiddenDiv.style.left = "-9999px";
      document.body.appendChild(hiddenDiv);

      const clone = pages[i].cloneNode(true);
      const photoSection = clone.querySelector(".report-photos");
      if (photoSection) photoSection.innerHTML = "";
      hiddenDiv.appendChild(clone);

      const canvas = await html2canvas(clone, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      if (i > 0) pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      document.body.removeChild(hiddenDiv);

      // render foto manual
      const photos = pages[i].querySelectorAll(".report-photos img");
      if (photos.length > 0) {
        let x = 20,
          y = 180,
          size = 80;
        for (let j = 0; j < photos.length; j++) {
          try {
            const response = await fetch(photos[j].src, { mode: "cors" });
            const blob = await response.blob();

            const img = document.createElement("img");
            img.src = URL.createObjectURL(blob);
            await new Promise((res) => (img.onload = res));

            const canvasResize = document.createElement("canvas");
            canvasResize.width = 400;
            canvasResize.height =
              (img.naturalHeight / img.naturalWidth) * 400;
            const ctx = canvasResize.getContext("2d");
            ctx.drawImage(img, 0, 0, canvasResize.width, canvasResize.height);

            const base64 = canvasResize.toDataURL("image/jpeg", 0.7);

            pdf.addImage(base64, "JPEG", x, y, size, size * 0.75);

            x += size + 10;
            if ((j + 1) % 2 === 0) {
              x = 20;
              y += size + 10;
            }
          } catch (err) {
            console.error("⚠️ Gagal ambil gambar:", photos[j].src, err);
          }
        }
      }
    }

    pdf.save("laporan.pdf");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-4 text-lg font-bold border-b border-gray-700">
          Cetak Laporan
        </div>
        <nav className="flex-1 p-4">
          <ul>
            <li className="py-2 px-3 rounded hover:bg-gray-700 cursor-pointer">
              Laporan Kegiatan
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow p-4">
          <h1 className="text-2xl font-bold">Cetak Laporan</h1>
          <p className="text-gray-600">
            Pilih filter di bawah untuk menampilkan laporan sesuai pilihan Anda
          </p>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          {/* Filter dropdowns */}
          <div className="bg-white p-4 rounded shadow mb-4">
            <div className="grid grid-cols-1 gap-3">
              {/* Survey */}
              <select
                className="border p-2 rounded w-full"
                value={selectedSurvey}
                onChange={(e) => {
                  setSelectedSurvey(e.target.value);
                  setSelectedActivity("");
                  setSelectedName("");
                  setSelectedDate("");
                }}
              >
                <option value="">Pilih Nama Survei</option>
                {surveys.map((s, idx) => (
                  <option key={idx} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              {/* Activity */}
              <select
                className="border p-2 rounded w-full"
                value={selectedActivity}
                disabled={!selectedSurvey}
                onChange={(e) => {
                  setSelectedActivity(e.target.value);
                  setSelectedName("");
                  setSelectedDate("");
                }}
              >
                <option value="">Pilih Kegiatan</option>
                {activities.map((a, idx) => (
                  <option key={idx} value={a}>
                    {a}
                  </option>
                ))}
              </select>

              {/* Name */}
              <select
                className="border p-2 rounded w-full"
                value={selectedName}
                disabled={!selectedActivity}
                onChange={(e) => {
                  setSelectedName(e.target.value);
                  setSelectedDate("");
                }}
              >
                <option value="">Pilih Nama</option>
                {names.map((n, idx) => (
                  <option key={idx} value={n}>
                    {n}
                  </option>
                ))}
              </select>

              {/* Date */}
              <select
                className="border p-2 rounded w-full"
                value={selectedDate}
                disabled={!selectedName}
                onChange={(e) => setSelectedDate(e.target.value)}
              >
                <option value="">Pilih Tanggal</option>
                {dates.map((d, idx) => (
                  <option key={idx} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Report Preview */}
          <div className="bg-white p-4 rounded shadow mb-4 h-[600px] overflow-y-auto">
            {filteredRows.length === 0 ? (
              <p className="text-gray-500">Tidak ada data laporan.</p>
            ) : (
              filteredRows.map((row, idx) => (
                <ReportPreview key={idx} row={row} />
              ))
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={handlePrint}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Print
            </button>
            <button
              onClick={handleDownloadPDF}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Download PDF
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
