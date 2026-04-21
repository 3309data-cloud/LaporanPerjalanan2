import { useState, useMemo, useCallback } from "react";
import { useData } from "../context/DataContext";
import FilterPanel from "../components/FilterPanel";
import ReportResults from "../components/ReportResults";

function ReportPage() {
  const { data } = useData();

  // State tunggal untuk semua filter
  const [filters, setFilters] = useState({
    survei: "",
    kegiatan: "",
    nama: "",
    tanggal: "",
  });

  // Fungsi update yang stabil
  const handleFilterChange = useCallback((key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  // Filter data berdasarkan 4 kriteria (Strict Matching)
  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter((row) => {
      return (
        (!filters.survei || row["Nama Survei"] === filters.survei) &&
        (!filters.kegiatan || row["Tujuan Kegiatan"] === filters.kegiatan) &&
        (!filters.nama || row["NamaCocok"] === filters.nama) &&
        (!filters.tanggal || row["Tanggal Kunjungan"] === filters.tanggal)
      );
    });
  }, [data, filters]);

// Di dalam ReportPage.jsx, bagian return:
return (
  <main className="min-h-screen bg-gray-50 p-2 sm:p-8 space-y-4 sm:space-y-6">
    <div className="border-b pb-4 px-2 sm:px-0">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight">
        Review Laporan
      </h1>
      <p className="text-[10px] sm:text-sm text-gray-500 italic">
        Lengkapi filter untuk melihat preview.
      </p>
    </div>

    <div className="space-y-4">
      <FilterPanel
        data={data}
        selected={filters}
        onFilterChange={handleFilterChange}
      />

      <ReportResults
        filtered={filteredData}
        selected={filters}
      />
    </div>
  </main>
);
}

export default ReportPage;