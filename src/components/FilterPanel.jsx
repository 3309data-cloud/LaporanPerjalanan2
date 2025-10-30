// components/FilterPanel.jsx
import React from "react";
import { getUniqueValues } from "../utils/filterUtils";

function FilterPanel({
  data,
  selected,
  setSelected,
}) {
  const { survei, kegiatan, nama, tanggal } = selected;
  const { setSurvei, setKegiatan, setNama, setTanggal } = setSelected;

  const surveiOptions = getUniqueValues(data, () => true, "Nama Survei");
  const kegiatanOptions = getUniqueValues(data, r => r["Nama Survei"] === survei, "Tujuan Kegiatan");
  const namaOptions = getUniqueValues(data, r => r["Nama Survei"] === survei && r["Tujuan Kegiatan"] === kegiatan, "Nama");
  const tanggalOptions = getUniqueValues(data, r => 
    r["Nama Survei"] === survei && 
    r["Tujuan Kegiatan"] === kegiatan && 
    r["Nama"] === nama, 
  "Tanggal Kunjungan");

  return (
    <section className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-3">Filter Data</h2>
      <div className="grid gap-3 md:grid-cols-4">
        {/* Survei */}
        <select
          value={survei}
          onChange={(e) => {
            setSurvei(e.target.value);
            setKegiatan("");
            setNama("");
            setTanggal("");
          }}
          className="border p-2 rounded w-full"
        >
          <option value="">PILIH NAMA SURVEI</option>
          {surveiOptions.map((item, i) => (
            <option key={i} value={item}>{item}</option>
          ))}
        </select>

        {/* Kegiatan */}
        <select
          value={kegiatan}
          onChange={(e) => {
            setKegiatan(e.target.value);
            setNama("");
            setTanggal("");
          }}
          className="border p-2 rounded w-full"
          disabled={!survei}
        >
          <option value="">PILIH KEGIATAN</option>
          {kegiatanOptions.map((item, i) => (
            <option key={i} value={item}>{item}</option>
          ))}
        </select>

        {/* Nama */}
        <select
          value={nama}
          onChange={(e) => {
            setNama(e.target.value);
            setTanggal("");
          }}
          className="border p-2 rounded w-full"
          disabled={!kegiatan}
        >
          <option value="">PILIH NAMA</option>
          {namaOptions.map((item, i) => (
            <option key={i} value={item}>{item}</option>
          ))}
        </select>

        {/* Tanggal */}
        <select
          value={tanggal}
          onChange={(e) => setTanggal(e.target.value)}
          className="border p-2 rounded w-full"
          disabled={!nama}
        >
          <option value="">PILIH TANGGAL</option>
          {tanggalOptions.map((item, i) => (
            <option key={i} value={item}>{item}</option>
          ))}
        </select>
      </div>
    </section>
  );
}

export default FilterPanel;
