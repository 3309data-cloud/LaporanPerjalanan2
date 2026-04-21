export function getPrintAvailability(row) {
  const requiredSPD = [
    "NoSPD",
    "tglKwitansi",
    "Program1",
    "Program2",
    "Kegiatan1",
    "Kegiatan2",
    "Komponen1",
    "Komponen2",
  ];

  const missingSPD = requiredSPD.some((key) => !row[key]);

  const missingNoST = !row["NoST"];

  return {
    SPD: !missingSPD,
    OLD: true, // selalu boleh
    Kwitansi: !missingSPD,
    Riil: !missingSPD,
    Randis: !missingSPD,

    messages: {
      SPD: "Tidak bisa mencetak SPD karena Detail SPD belum diisi",
      Kwitansi: "Tidak bisa mencetak Kwitansi karena Detail SPD belum diisi",
      Riil: "Tidak bisa mencetak Pengeluaran Riil karena Detail SPD belum diisi",
      Randis
          : "Tidak bisa mencetak karena Detail SPD & No Surat Tugas belum diisi",
    },
  };
}