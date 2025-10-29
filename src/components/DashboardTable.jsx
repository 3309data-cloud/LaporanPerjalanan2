import { useState, useMemo } from "react";
import { useData } from "./DataContext";

const bulanNama = [
  "Januari","Februari","Maret","April","Mei","Juni",
  "Juli","Agustus","September","Oktober","November","Desember"
];

export default function DashboardTable() {
  const data = useData();
  const [selected, setSelected] = useState(null);

  const dashboardArray = useMemo(() => {
    const dash = {};

    data.forEach(row => {
      const namaSurvei = row["Nama Survei"];
      const pelaksana = row["Nama"];
      const tanggalStr = row["Tanggal Kunjungan"];
      if (!namaSurvei || !pelaksana || !tanggalStr) return;

      const tanggal = parseTanggal(tanggalStr);
      if (!tanggal) return;

      const bulan = bulanNama[tanggal.getMonth()];
      const desa = row[`Desa(1)`] || "";
const kecamatanRaw = row[`Kecamatan(1)`] || "";
const kecamatan = kecamatanRaw.replace(/^\d+\s*/, ""); // hapus kode angka di depan
const lokasi = desa + (kecamatan ? ", " + kecamatan : "");

      if (!dash[namaSurvei]) {
        dash[namaSurvei] = { 
          nama: namaSurvei, 
          bulan: {}, 
          rincian: {} 
        };
        bulanNama.forEach(b => {
          dash[namaSurvei].bulan[b] = 0;
          dash[namaSurvei].rincian[b] = [];
        });
      }

      dash[namaSurvei].bulan[bulan] += 1;

      // Gabungkan pelaksana yang sama
      const existingPelaksana = dash[namaSurvei].rincian[bulan].find(
        r => r.pelaksana === pelaksana
      );

      if (existingPelaksana) {
        existingPelaksana.jumlah += 1;
        existingPelaksana.tanggal.push(tanggalStr);
        existingPelaksana.lokasi.push(lokasi);
      } else {
        dash[namaSurvei].rincian[bulan].push({
          pelaksana,
          jumlah: 1,
          tanggal: [tanggalStr],
          lokasi: [lokasi]
        });
      }
    });

    return Object.values(dash);
  }, [data]);

  function parseTanggal(str) {
    if (!str) return null;
    const parts = str.split("/");
    if (parts.length !== 3) return null;
    const [dd, mm, yyyy] = parts.map(Number);
    return new Date(yyyy, mm - 1, dd);
  }

  const lebarKolomBulan = "8ch";

  return (
    <div className="overflow-x-auto">
      <table className="border border-gray-300 table-auto text-sm w-full">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2 text-left" style={{ minWidth: "200px" }}>Nama Survei</th>
            {bulanNama.map(bulan => (
              <th key={bulan} className="border p-2 text-center" style={{ minWidth: lebarKolomBulan }}>
                {bulan}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dashboardArray.map(row => (
            <tr key={row.nama}>
              <td className="border p-2">{row.nama}</td>
              {bulanNama.map(bulan => (
                <td
                  key={bulan}
                  className="border p-2 text-center cursor-pointer"
                  style={{ minWidth: lebarKolomBulan }}
                  onClick={() => {
                    if (row.rincian[bulan] && row.rincian[bulan].length > 0) {
                      setSelected({ nama: row.nama, bulan, rincian: row.rincian[bulan] });
                    }
                  }}
                >
                  {row.bulan[bulan] > 0 ? row.bulan[bulan] : "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow w-[700px] max-h-[80vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-2">{selected.nama} - {selected.bulan}</h2>
            <table className="w-full text-sm border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-1 text-center">Pelaksana</th>
                  <th className="border p-1 text-center">Jumlah Perjalanan</th>
                  <th className="border p-1 text-center">Tanggal</th>
                  <th className="border p-1 text-center">Desa Tujuan</th>
                </tr>
              </thead>
              <tbody>
                {selected.rincian.map((item, idx) => (
                  <>
                    {item.tanggal.map((tgl, i) => (
                      <tr key={`${idx}-${i}`}>
                        {i === 0 && (
                          <>
                            <td className="border p-1 align-top text-left" rowSpan={item.tanggal.length}>{item.pelaksana}</td>
                            <td className="border p-1 text-center align-top" rowSpan={item.tanggal.length} style={{ width: "120px" }}>{item.jumlah}</td>
                          </>
                        )}
                        <td className="border p-1 text-center align-top" style={{ width: "120px" }}>{parseTanggal(tgl)?.toLocaleDateString("id-ID") || tgl}</td>
                        <td className="border p-1" style={{ width: "200px" }}>{item.lokasi[i]}</td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
            <button
              className="mt-3 px-4 py-1 bg-gray-300 rounded hover:bg-gray-400"
              onClick={() => setSelected(null)}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
