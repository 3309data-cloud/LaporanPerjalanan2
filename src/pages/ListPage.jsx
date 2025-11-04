import { useState } from "react";
import { printReport } from "../components/printReport";
import { useData } from "../context/DataContext";
import { updateSheet } from "../utils/updateSheet";

function ReportTable() {
  const { data, refreshData, loading: loadingData } = useData();
const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    survei: "",
    kegiatan: "",
    nama: "",
    tujuan: "",
    tanggal: "",
  });
  const [loading, setLoading] = useState(false); // spinner print
  const [updating, setUpdating] = useState(false); // spinner update status

  // 🔹 State lokal untuk override status sementara
  const [localStatus, setLocalStatus] = useState({});

  if (loadingData) {
    return <p className="p-4 text-gray-500">Memuat data...</p>;
  }

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

  const filteredData = data
    .filter((row) => {
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
    })
    .sort((a, b) => {
      const dateA = new Date(a["Tanggal Kunjungan"].split("/").reverse().join("-"));
      const dateB = new Date(b["Tanggal Kunjungan"].split("/").reverse().join("-"));
      if (dateA.getTime() !== dateB.getTime()) return dateA - dateB;
      return a["Nama"].localeCompare(b["Nama"]);
    });

  // 🔹 Fungsi ubah status
  const handleEditStatus = async (row) => {
    const current = localStatus[row["ID_Laporan"]] || row["Ket"]?.trim() || "Aktif";
    const newStatus = current === "Aktif" ? "Hapus" : "Aktif";

    const confirmChange = window.confirm(
      `Apakah kamu yakin ingin mengubah status laporan ini menjadi "${newStatus}"?`
    );
    if (!confirmChange) return;

    try {
      setUpdating(true);
      // 🔹 Update UI lokal langsung
      setLocalStatus({ ...localStatus, [row["ID_Laporan"]]: newStatus });

      const res = await updateSheet(row["ID_Laporan"], "Ket", newStatus);
      console.log("updateSheet response:", res);

      if (res.status === "ok" || res.status === "success") {
        alert(`✅ ${res.message || "Status berhasil diperbarui!"}`);
        // refresh data dari CSV publik
        try {
          await refreshData();
        } catch (err) {
          console.warn("⚠️ Refresh data gagal:", err);
        }
      } else {
        alert(`❌ Gagal memperbarui: ${res.message || "Respons tidak valid"}`);
        // rollback local status jika gagal
        setLocalStatus({ ...localStatus, [row["ID_Laporan"]]: current });
      }
    } catch (err) {
      console.error("❌ Error saat update status:", err);
      alert(`❌ Terjadi kesalahan saat update status: ${err.message || "unknown"}`);
      // rollback local status jika error
      setLocalStatus({ ...localStatus, [row["ID_Laporan"]]: current });
    } finally {
      setUpdating(false);
    }
  };

  const handlePrint = async (row) => {
    try {
      setLoading(true);
      await printReport(row);
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="relative">
    {/* Spinner print */}
    {loading && (
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          <span className="mt-2 text-white font-semibold">
            Mencetak laporan...
          </span>
        </div>
      </div>
    )}

    {/* Spinner update */}
    {updating && (
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
          <span className="mt-2 text-yellow-300 font-semibold">
            Memperbarui status...
          </span>
        </div>
      </div>
    )}

    {/* 🔽 Tombol toggle filter (mobile) — sticky di bawah navbar */}
    <div className="sm:hidden sticky top-[0px] z-30 bg-white border-b border-gray-300 p-2 shadow-md">
      <div className="flex justify-end mb-2">
        <button
          onClick={() => setShowFilters((prev) => !prev)}
          className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm flex items-center gap-2 w-full justify-center"
        >
          <span>{showFilters ? "Tutup Pencarian" : "Cari Data"}</span>
          <span
            className={`transform transition-transform duration-300 ${
              showFilters ? "rotate-180" : "rotate-0"
            }`}
          >
            ▼
          </span>
        </button>
      </div>

      {/* Filter collapsible */}
      {showFilters && (
        <div className="mb-2 border rounded bg-gray-50 p-3 space-y-2 shadow-inner">
          {["survei", "kegiatan", "nama", "tujuan", "tanggal"].map((key) => (
            <input
              key={key}
              type="text"
              placeholder={`Cari ${key}`}
              value={filters[key]}
              onChange={(e) =>
                setFilters({ ...filters, [key]: e.target.value })
              }
              className="w-full p-2 border rounded text-sm"
            />
          ))}
        </div>
      )}
    </div>

    {/* 🔽 Kontainer utama tabel & list */}
    <div className="border border-gray-300 rounded overflow-hidden">
      {/* scroll di sini saja agar sticky di atas tetap menempel */}
      <div className="overflow-y-auto max-h-[calc(100vh-120px)]">
        {/* 💻 Desktop Table */}
        <table className="hidden sm:table table-auto w-full border-collapse text-sm">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr className="text-left">
              <th className="border p-2">Nama Survei</th>
              <th className="border p-2">Nama Kegiatan</th>
              <th className="border p-2">Nama</th>
              <th className="border p-2">Tujuan</th>
              <th className="border p-2">Tanggal</th>
              <th className="border p-2 text-center">Aksi</th>
            </tr>

            {/* Filter bar desktop */}
            <tr className="bg-gray-50 sticky top-[38px] z-10">
              {["survei", "kegiatan", "nama", "tujuan", "tanggal"].map(
                (key) => (
                  <th key={key} className="border p-1">
                    <input
                      type="text"
                      placeholder={`Cari ${key}`}
                      value={filters[key]}
                      onChange={(e) =>
                        setFilters({ ...filters, [key]: e.target.value })
                      }
                      className="w-full p-1 border rounded text-xs"
                    />
                  </th>
                )
              )}
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
              filteredData.map((row) => {
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

                const status =
                  localStatus[row["ID_Laporan"]] || row["Ket"] || "Aktif";
                const statusColor =
                  status === "Hapus"
                    ? "text-red-600"
                    : status === "Aktif"
                    ? "text-green-600"
                    : "text-gray-600";

                return (
                  <tr key={row["ID_Laporan"]} className="hover:bg-gray-50">
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
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handlePrint(row)}
                          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                        >
                          🖨️
                        </button>
                        <button
                          onClick={() => handleEditStatus(row)}
                          className={`px-3 py-1 rounded hover:opacity-80 ${
                            status === "Hapus"
                              ? "bg-green-500 text-white"
                              : "bg-red-500 text-white"
                          }`}
                        >
                          {status === "Hapus" ? "🔄" : "🗑️"}
                        </button>
                      </div>
                      <div className={`text-xs mt-1 ${statusColor}`}>
                        {status === "Hapus" ? "Dihapus" : "Aktif"}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {/* 📱 Mobile List Section */}
        <div className="sm:hidden p-2 space-y-3">
          {filteredData.length === 0 ? (
            <p className="text-center text-gray-500 italic">
              Tidak ada data yang cocok...
            </p>
          ) : (
            filteredData.map((row) => {
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

              const status =
                localStatus[row["ID_Laporan"]] || row["Ket"] || "Aktif";
              const statusColor =
                status === "Hapus"
                  ? "text-red-600"
                  : status === "Aktif"
                  ? "text-green-600"
                  : "text-gray-600";

              return (
                <div
                  key={row["ID_Laporan"]}
                  className="bg-white shadow rounded-lg p-3 border border-gray-200"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {row["Nama Survei"]}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {formatFullDate(row["Tanggal Kunjungan"])}
                      </p>
                    </div>
                    <span className={`text-xs font-semibold ${statusColor}`}>
                      {status === "Hapus" ? "Dihapus" : "Aktif"}
                    </span>
                  </div>

                  <div className="mt-2 text-sm">
                    <p>
                      <span className="font-semibold">Kegiatan:</span>{" "}
                      {row["Tujuan Kegiatan"]}
                    </p>
                    <p>
                      <span className="font-semibold">Nama:</span> {row["Nama"]}
                    </p>
                    <p>
                      <span className="font-semibold">Tujuan:</span>{" "}
                      {tujuanList.join("; ")}
                    </p>
                  </div>

                  <div className="mt-3 flex justify-end gap-2">
                    <button
                      onClick={() => handlePrint(row)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                    >
                      🖨️
                    </button>
                    <button
                      onClick={() => handleEditStatus(row)}
                      className={`px-3 py-1 rounded text-sm hover:opacity-80 ${
                        status === "Hapus"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {status === "Hapus" ? "Aktifkan" : "Hapus"}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  </div>
);




}

export default ReportTable;
