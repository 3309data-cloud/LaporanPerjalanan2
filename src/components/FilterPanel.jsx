import React, { useMemo } from "react";
import { getUniqueValues } from "../utils/filterUtils";

function FilterPanel({ data = [], selected = {}, onFilterChange }) {
  const { survei = "", kegiatan = "", nama = "", tanggal = "" } = selected;

  const activeData = useMemo(() => 
    data.filter((r) => (r["Ket"] || "Aktif") === "Aktif"), 
  [data]);

  // Options Logic
  const surveiOptions = useMemo(() => 
    getUniqueValues(activeData, () => true, "Nama Survei").sort(), [activeData]);

  const kegiatanOptions = useMemo(() => 
    getUniqueValues(activeData, (r) => r["Nama Survei"] === survei, "Tujuan Kegiatan").sort(), [activeData, survei]);

  const namaOptions = useMemo(() => 
    getUniqueValues(activeData, (r) => r["Nama Survei"] === survei && r["Tujuan Kegiatan"] === kegiatan, "NamaCocok").sort(), [activeData, survei, kegiatan]);

  const tanggalOptions = useMemo(() => 
    getUniqueValues(activeData, (r) => r["Nama Survei"] === survei && r["Tujuan Kegiatan"] === kegiatan && r["NamaCocok"] === nama, "Tanggal Kunjungan").sort(), [activeData, survei, kegiatan, nama]);

  // Handler khusus untuk reset anak-anaknya saat bapaknya berubah
  const handleUpdate = (key, val) => {
    onFilterChange(key, val);
    if (key === "survei") { onFilterChange("kegiatan", ""); onFilterChange("nama", ""); onFilterChange("tanggal", ""); }
    if (key === "kegiatan") { onFilterChange("nama", ""); onFilterChange("tanggal", ""); }
    if (key === "nama") { onFilterChange("tanggal", ""); }
  };

return (
    <section className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border grid gap-4 grid-cols-1 md:grid-cols-4">
      {/* 1. Nama Survei */}
      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-bold text-blue-600 uppercase ml-1 tracking-widest">Nama Survei</label>
        <select 
          value={survei} 
          onChange={(e) => handleUpdate("survei", e.target.value)} 
          className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        >
          <option value="">-- PILIH SURVEI --</option>
          {surveiOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>

      {/* 2. Kegiatan */}
      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 tracking-widest">Kegiatan</label>
        <select 
          disabled={!survei} 
          value={kegiatan} 
          onChange={(e) => handleUpdate("kegiatan", e.target.value)} 
          className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-all"
        >
          <option value="">{!survei ? "PILIH SURVEI DULU" : "-- PILIH KEGIATAN --"}</option>
          {kegiatanOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>

      {/* 3. Nama */}
      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 tracking-widest">Nama Pelaksana</label>
        <select 
          disabled={!kegiatan} 
          value={nama} 
          onChange={(e) => handleUpdate("nama", e.target.value)} 
          className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-all"
        >
          <option value="">{!kegiatan ? "PILIH KEGIATAN DULU" : "-- PILIH NAMA --"}</option>
          {namaOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>

      {/* 4. Tanggal */}
      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 tracking-widest">Tanggal Kunjungan</label>
        <select 
          disabled={!nama} 
          value={tanggal} 
          onChange={(e) => handleUpdate("tanggal", e.target.value)} 
          className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-all"
        >
          <option value="">{!nama ? "PILIH NAMA DULU" : "-- PILIH TANGGAL --"}</option>
          {tanggalOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>
    </section>
  );
}

export default FilterPanel;