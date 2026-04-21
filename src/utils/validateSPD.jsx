export function validateSPD(rows) {
  const errors = {};

  if (!rows || rows.length === 0) {
    errors.rows = "Belum ada data perjalanan";
    return { isValid: false, errors };
  }

  rows.forEach((row, i) => {
    const nip = String(row.nip ?? "").trim();
    const nama = String(row.nama ?? "").trim();
    const noST = String(row.noST ?? "").trim();

    if (!nip) errors[`nip_${i}`] = "NIP kosong";
    if (!nama) errors[`nama_${i}`] = "Nama kosong";
    if (!noST) errors[`noST_${i}`] = "No ST kosong";

    if (!row.trips || row.trips.length === 0) {
      errors[`trip_${i}`] = "Belum ada perjalanan";
    } else {
      row.trips.forEach((t, j) => {
        const asal = String(t.asal ?? "").trim();
        const tujuan = String(t.tujuan ?? "").trim();

        if (!asal) errors[`asal_${i}_${j}`] = "Asal kosong";
        if (!tujuan) errors[`tujuan_${i}_${j}`] = "Tujuan kosong";
      });
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}