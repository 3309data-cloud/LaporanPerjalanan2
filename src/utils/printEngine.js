export function isDetailSPDComplete(row) {
  return (
    row?.NoSPD &&
    row?.tglKwitansi &&
    row?.Program1 &&
    row?.Program2 &&
    row?.Kegiatan1 &&
    row?.Kegiatan2 &&
    row?.Komponen1 &&
    row?.Komponen2
  );
}

export function getPrintAvailability(row) {
  const detail = isDetailSPDComplete(row);

  return {
    SPD: detail,
    OLD: true,
    Kwitansi: detail,
    Riil: detail,
    Randis: detail,
  };
}

export function needNoST(rows) {
  return rows.filter(r => !r.NoST);
}