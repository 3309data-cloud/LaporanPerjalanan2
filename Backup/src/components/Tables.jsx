import { useState } from "react";
import { printReport } from "./printReport";
import { useData } from "./DataContext";

function ReportTable() {
  const data = useData();
  const [filters, setFilters] = useState({
    survei: "",
    kegiatan: "",
    nama: "",
    tujuan: "",
    tanggal: "",
  });
  const [loading, setLoading] = useState(false); // ✅ state spinner

  if (!data || data.length === 0) {
    return <p className="p-4 text-gray-500">Belum ada data kegiatan...</p>;
  }

  function formatFullDate(dateStr) {
    if (!dateStr) return "";
    const d = new Date(dateStr.split("/").reverse().join("-"));
    if (isNaN(d)) return dateStr;
    const hari = d.toLocaleDateString("id-ID", { weekday: "long" });
    const tanggal = d.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return `${hari}, ${tanggal}`;
  }

  const filteredData = data.filter((row) => {
    const tujuanList = [];
    for (let i = 1; i <= 5; i++) {
      const desa = row[`Desa(${i})`];
      let kec = row[`Kecamatan(${i})`];
      if (kec) kec = kec.length > 4 ? kec.substring(4).trim() : kec.trim();
      if (desa || kec) tujuanList.push([desa, kec].filter(Boolean).join(", "));
    }
    const tujuanLokasi = tujuanList.join(" ");
    const kegiatanFull = row["Tujuan Kegiatan"];
    return (
      row["Nama Survei"].toLowerCase().includes(filters.survei.toLowerCase()) &&
      kegiatanFull.toLowerCase().includes(filters.kegiatan.toLowerCase()) &&
      row["Nama"].toLowerCase().includes(filters.nama.toLowerCase()) &&
      tujuanLokasi.toLowerCase().includes(filters.tujuan.toLowerCase()) &&
      row["Tanggal Kunjungan"].toLowerCase().includes(filters.tanggal.toLowerCase())
    );
  });

  const handlePrint = async (row) => {
    try {
      setLoading(true); // mulai spinner
      await printReport(row);
    } finally {
      setLoading(false); // hentikan spinner setelah print
    }
  };

  return (
    <div className="relative">
      {/* ✅ Spinner overlay */}
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            <span className="mt-2 text-white font-semibold">Mencetak laporan...</span>
          </div>
        </div>
      )}

      <div className="border border-gray-300 rounded overflow-hidden">
        <div className="overflow-y-auto max-h-[500px]">
          <table className="table-auto w-full border-collapse text-sm">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr className="text-left">
                <th className="border p-2">Nama Survei</th>
                <th className="border p-2">Nama Kegiatan</th>
                <th className="border p-2">Nama</th>
                <th className="border p-2">Tujuan</th>
                <th className="border p-2">Tanggal</th>
                <th className="border p-2 text-center">Aksi</th>
              </tr>
              <tr className="bg-gray-50 sticky top-[38px] z-10">
                <th className="border p-1">
                  <input
                    type="text"
                    placeholder="Cari Survei"
                    value={filters.survei}
                    onChange={(e) =>
                      setFilters({ ...filters, survei: e.target.value })
                    }
                    className="w-full p-1 border rounded text-xs"
                  />
                </th>
                <th className="border p-1">
                  <input
                    type="text"
                    placeholder="Cari Kegiatan"
                    value={filters.kegiatan}
                    onChange={(e) =>
                      setFilters({ ...filters, kegiatan: e.target.value })
                    }
                    className="w-full p-1 border rounded text-xs"
                  />
                </th>
                <th className="border p-1">
                  <input
                    type="text"
                    placeholder="Cari Nama"
                    value={filters.nama}
                    onChange={(e) =>
                      setFilters({ ...filters, nama: e.target.value })
                    }
                    className="w-full p-1 border rounded text-xs"
                  />
                </th>
                <th className="border p-1">
                  <input
                    type="text"
                    placeholder="Cari Tujuan"
                    value={filters.tujuan}
                    onChange={(e) =>
                      setFilters({ ...filters, tujuan: e.target.value })
                    }
                    className="w-full p-1 border rounded text-xs"
                  />
                </th>
                <th className="border p-1">
                  <input
                    type="text"
                    placeholder="Cari Tanggal"
                    value={filters.tanggal}
                    onChange={(e) =>
                      setFilters({ ...filters, tanggal: e.target.value })
                    }
                    className="w-full p-1 border rounded text-xs"
                  />
                </th>
                <th className="border p-1"></th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="border p-2 text-center text-gray-500 italic"
                  >
                    Tidak ada data yang cocok...
                  </td>
                </tr>
              ) : (
                filteredData.map((row, i) => {
                  const tujuanList = [];
                  for (let j = 1; j <= 5; j++) {
                    const desa = row[`Desa(${j})`];
                    let kec = row[`Kecamatan(${j})`];
                    if (kec)
                      kec =
                        kec.length > 4 ? kec.substring(4).trim() : kec.trim();
                    if (desa || kec)
                      tujuanList.push([desa, kec].filter(Boolean).join(", "));
                  }

                  return (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="border p-2">{row["Nama Survei"]}</td>
                      <td className="border p-2">{row["Tujuan Kegiatan"]}</td>
                      <td className="border p-2">{row["Nama"]}</td>
                      <td className="border p-2">
                        {tujuanList.map((t, idx) => (
                          <div key={idx}>{t}</div>
                        ))}
                      </td>
                      <td className="border p-2">
                        {formatFullDate(row["Tanggal Kunjungan"])}
                      </td>
                      <td className="border p-2 text-center">
                        <button
                          onClick={() => handlePrint(row)}
                          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                        >
                          🖨️ Print
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ReportTable;
