// pages/ReportPage.jsx
import { useState, useMemo } from "react";
import { useData } from "../context/DataContext";
import FilterPanel from "../components/FilterPanel";
import ReportResults from "../components/ReportResults";

function ReportPage() {
  const data = useData();

  const [selectedSurvei, setSelectedSurvei] = useState("");
  const [selectedKegiatan, setSelectedKegiatan] = useState("");
  const [selectedNama, setSelectedNama] = useState("");
  const [selectedTanggal, setSelectedTanggal] = useState("");

  const filtered = useMemo(() => {
    return data.filter(
      (row) =>
        row["Nama Survei"] === selectedSurvei &&
        row["Tujuan Kegiatan"] === selectedKegiatan &&
        row["Nama"] === selectedNama &&
        row["Tanggal Kunjungan"] === selectedTanggal
    );
  }, [data, selectedSurvei, selectedKegiatan, selectedNama, selectedTanggal]);

  return (
    <main className="min-h-screen bg-gray-100 p-6 space-y-6">
      <FilterPanel
        data={data}
        selected={{
          survei: selectedSurvei,
          kegiatan: selectedKegiatan,
          nama: selectedNama,
          tanggal: selectedTanggal,
        }}
        setSelected={{
          setSurvei: setSelectedSurvei,
          setKegiatan: setSelectedKegiatan,
          setNama: setSelectedNama,
          setTanggal: setSelectedTanggal,
        }}
      />

      <ReportResults
        filtered={filtered}
        selected={{
          survei: selectedSurvei,
          kegiatan: selectedKegiatan,
          nama: selectedNama,
          tanggal: selectedTanggal,
        }}
      />
    </main>
  );
}

export default ReportPage;
