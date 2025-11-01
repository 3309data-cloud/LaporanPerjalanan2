import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  AlignmentType,
  WidthType,
  BorderStyle,
  ImageRun,
} from "docx";
import { saveAs } from "file-saver";
import { fetchImageBase64 } from "../utils/fetchImageBase64";

// 🔹 Utilitas format tanggal & teks
function formatFullDate(dateStr) {
  if (!dateStr) return "-";
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

function capitalizeWord(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function formatKecamatan(str) {
  if (!str) return "";
  const nama = str.replace(/^\d+\s*/, "").toLowerCase();
  return "Kecamatan " + nama.charAt(0).toUpperCase() + nama.slice(1);
}

// 🔹 Convert base64 ke Uint8Array
function base64ToUint8Array(base64) {
  const raw = atob(base64);
  const uint8Array = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) {
    uint8Array[i] = raw.charCodeAt(i);
  }
  return uint8Array;
}

// ========================================================
// 📄 UTAMA: Export ke Word dengan Section A–D per kegiatan + progres
// ========================================================
export async function exportToWord(data, fileName = "Laporan.docx", onProgress) {
  const children = [];

  // Hitung total kegiatan untuk progres
  let totalKegiatan = 0;
  data.forEach((row) => {
    for (let idx = 1; idx <= 5; idx++) {
      const fields = [
        row[`Desa(${idx})`],
        row[`Kecamatan(${idx})`],
        row[`Nama(${idx})`],
        row[`Kegiatan(${idx})`],
        row[`Foto(${idx})`],
      ];
      if (fields.some(Boolean)) totalKegiatan++;
    }
  });

  let kegiatanCount = 0;
  let lastRow = null;
  let lastIdx = null;

  for (const row of data) {
    for (let idx = 1; idx <= 5; idx++) {
      const fields = [
        row[`Desa(${idx})`],
        row[`Kecamatan(${idx})`],
        row[`Nama(${idx})`],
        row[`Kegiatan(${idx})`],
        row[`Foto(${idx})`],
      ];
      if (!fields.some(Boolean)) continue;

      kegiatanCount++;
      lastRow = row;
      lastIdx = idx;
      if (onProgress) onProgress(Math.round((kegiatanCount / totalKegiatan) * 100));

      // Ambil foto
      const fotoField = row[`Foto(${idx})`] || "";
      const fotos = fotoField
        ? fotoField.split(",").map((f) => f.trim()).filter(Boolean)
        : [];
      const fotosBase64 = await Promise.all(
        fotos.map(async (f) => {
          if (!f) return null;
          if (f.startsWith("data:")) return f.split(",")[1];
          const match = f.match(/[-\w]{25,}/);
          const fileId = match ? match[0] : null;
          if (!fileId) return null;
          try {
            const base64Full = await fetchImageBase64(fileId);
            return base64Full ? base64Full.split(",")[1] : null;
          } catch (e) {
            console.error("Gagal fetch foto:", f, e);
            return null;
          }
        })
      );

      // ===== JUDUL =====
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "LAPORAN PERJALANAN DINAS",
              bold: true,
              size: 28,
              font: "Arial",
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 300 },
        })
      );

      // ===== SECTION A =====
      const tableA = new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: {
          top: { style: BorderStyle.SINGLE, size: 8 },
          bottom: { style: BorderStyle.SINGLE, size: 8 },
          left: { style: BorderStyle.SINGLE, size: 8 },
          right: { style: BorderStyle.SINGLE, size: 8 },
          insideHorizontal: { style: BorderStyle.SINGLE, size: 4 },
          insideVertical: { style: BorderStyle.SINGLE, size: 4 },
        },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                columnSpan: 4,
                margins: { top: 200, bottom: 200, left: 200, right: 200 },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                      new TextRun({
                        text: "A. UMUM",
                        bold: true,
                        font: "Arial",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          new TableRow({
            height: { value: 400 },
            children: [
              new TableCell({
                width: { size: 25, type: WidthType.PERCENTAGE },
                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({ text: "1. Nama Petugas", font: "Arial" }),
                    ],
                  }),
                ],
              }),
              new TableCell({
                width: { size: 25, type: WidthType.PERCENTAGE },
                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({ text: row["Nama"] || "-", font: "Arial" }),
                    ],
                  }),
                ],
              }),
              new TableCell({
                width: { size: 35, type: WidthType.PERCENTAGE },
                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "4. Anggaran / Kegiatan Membiayai",
                        font: "Arial",
                      }),
                    ],
                  }),
                ],
              }),
              new TableCell({
                width: { size: 15, type: WidthType.PERCENTAGE },
                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                children: [
                  new Paragraph({
                    children: [new TextRun({ text: "054", font: "Arial" })],
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
          }),
          new TableRow({
            children: [
              new TableCell({
                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                children: [
                  new Paragraph({
                    children: [new TextRun({ text: "2. Tujuan", font: "Arial" })],
                  }),
                ],
              }),
              new TableCell({
                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `${capitalizeWord(
                          row[`Desa(${idx})`]
                        )}${
                          row[`Kecamatan(${idx})`]
                            ? ", " + formatKecamatan(row[`Kecamatan(${idx})`])
                            : ""
                        }`,
                        font: "Arial",
                      }),
                    ],
                  }),
                ],
              }),
              new TableCell({
                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "5. Anggaran / Kegiatan Diperiksa",
                        font: "Arial",
                      }),
                    ],
                  }),
                ],
              }),
              new TableCell({
                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                children: [
                  new Paragraph({
                    children: [new TextRun({ text: "054", font: "Arial" })],
                  }),
                ],
              }),
            ],
          }),
          new TableRow({
            children: [
              new TableCell({
                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                children: [
                  new Paragraph({
                    children: [new TextRun({ text: "3. Jadwal", font: "Arial" })],
                  }),
                ],
              }),
              new TableCell({
                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: formatFullDate(row["Tanggal Kunjungan"]),
                        font: "Arial",
                      }),
                    ],
                  }),
                ],
              }),
              new TableCell({
                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "6. Tanda Tangan Petugas",
                        font: "Arial",
                      }),
                    ],
                  }),
                ],
              }),
              new TableCell({
                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                children: [
                  new Paragraph({
                    children: [new TextRun({ text: "", font: "Arial" })],
                  }),
                ],
              }),
            ],
          }),
        ],
      });
      children.push(tableA);

      // ===== SECTION B =====
      const tableB = new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: {
          top: { style: BorderStyle.SINGLE, size: 8 },
          bottom: { style: BorderStyle.SINGLE, size: 8 },
          left: { style: BorderStyle.SINGLE, size: 8 },
          right: { style: BorderStyle.SINGLE, size: 8 },
        },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                      new TextRun({
                        text: "B. URUTAN KEGIATAN (RINGKASAN HASIL)",
                        bold: true,
                        font: "Arial",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          new TableRow({
            children: [
              new TableCell({
                margins: { top: 100, bottom: 400, left: 100, right: 100 },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `${row["Tujuan Kegiatan"] || "-"} ${row["Nama Survei"] || "-"}`,
                        bold: true,
                        font: "Arial",
                      }),
                    ],
                  }),
                  new Paragraph({
                    children: [
                      new TextRun({ text: row[`Kegiatan(${idx})`] || "-", font: "Arial" }),
                    ],
                    spacing: { before: 100 },
                  }),
                ],
              }),
            ],
          }),
        ],
      });
      children.push(new Paragraph({ text: "", spacing: { after: 200 } }), tableB);

      // ===== SECTION C =====
      const tableC = new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: {
          top: { style: BorderStyle.SINGLE, size: 8 },
          bottom: { style: BorderStyle.SINGLE, size: 8 },
          left: { style: BorderStyle.SINGLE, size: 8 },
          right: { style: BorderStyle.SINGLE, size: 8 },
        },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                      new TextRun({
                        text: "C. PEJABAT DAN TEMPAT YANG DIKUNJUNGI",
                        bold: true,
                        font: "Arial",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          new TableRow({
            children: [
              new TableCell({
                margins: { top: 100, bottom: 400, left: 100, right: 100 },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: (row[`Nama(${idx})`] || "-").replace(/\n/g, " "),
                        font: "Arial",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      });
      children.push(new Paragraph({ text: "", spacing: { after: 200 } }), tableC);

// Maksimal ukuran sel dalam point (1pt ≈ 1/72 inch)
const MAX_CELL_WIDTH = 280;  // lebar maksimal sel
const MAX_CELL_HEIGHT = 280; // tinggi maksimal sel
const GAP = 10;               // jarak di sekeliling foto

const tableDRows = [];
if (fotosBase64.length) {
  for (let i = 0; i < fotosBase64.length; i += 2) {
    const rowChildren = [];
    for (let j = 0; j < 2; j++) {
      const b64 = fotosBase64[i + j];
      if (b64) {
        // Ambil ukuran asli gambar
        const imgSize = await new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve({ width: img.width, height: img.height });
          img.src = "data:image/jpeg;base64," + b64;
        });

        // Hitung faktor scale untuk menyesuaikan sel
        const scaleWidth = (MAX_CELL_WIDTH - GAP * 2) / imgSize.width;
        const scaleHeight = (MAX_CELL_HEIGHT - GAP * 2) / imgSize.height;
        const scale = Math.min(scaleWidth, scaleHeight, 1); // jangan upscale > 100%

        const width = Math.round(imgSize.width * scale);
        const height = Math.round(imgSize.height * scale);

        rowChildren.push(
          new TableCell({
            margins: { top: GAP, bottom: GAP, left: GAP, right: GAP },
            children: [
              new Paragraph({
                children: [
                  new ImageRun({
                    data: base64ToUint8Array(b64),
                    transformation: { width, height },
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
          })
        );
      } else {
        rowChildren.push(
          new TableCell({
            children: [
              new Paragraph({
                children: [new TextRun({ text: "", font: "Arial" })],
              }),
            ],
          })
        );
      }
    }
    tableDRows.push(new TableRow({ children: rowChildren }));
  }
} else {
  tableDRows.push(
    new TableRow({
      children: [
        new TableCell({
          columnSpan: 2,
          children: [
            new Paragraph({
              children: [new TextRun({ text: "- Tidak ada foto -", font: "Arial" })],
            }),
          ],
        }),
      ],
    })
  );
}


const tableD = new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  borders: {
    top: { style: BorderStyle.SINGLE, size: 8 },
    bottom: { style: BorderStyle.SINGLE, size: 8 },
    left: { style: BorderStyle.SINGLE, size: 8 },
    right: { style: BorderStyle.SINGLE, size: 8 },
        insideHorizontal: { style: BorderStyle.NONE, size: 0 },
    insideVertical: { style: BorderStyle.NONE, size: 0 },
  },
  rows: [
    new TableRow({
      children: [
        new TableCell({
          columnSpan: 2,
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: "D. FOTO – FOTO KEGIATAN",
                  bold: true,
                  font: "Arial",
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    ...tableDRows,
  ],
});

children.push(new Paragraph({ text: "", spacing: { after: 400 } }), tableD);


      // ===== PAGE BREAK =====
      children.push(new Paragraph({ text: "", pageBreakBefore: true }));
    }
  }

  // ✅ Nama file dinamis berdasarkan row terakhir
  let dynamicFileName = fileName;
  if (lastRow && lastIdx) {
    const pelaksana = lastRow["Nama"] ? lastRow["Nama"].replace(/\s+/g, "_") : "Pelaksana";
    const namaKegiatan = lastRow["Nama Survei"] ? lastRow["Nama Survei"].replace(/\s+/g, "_") : "Nama Survei";
    const tanggal = lastRow["Tanggal Kunjungan"] ? lastRow["Tanggal Kunjungan"].replace(/\//g, "-") : "Tanggal";
    dynamicFileName = `${pelaksana}_${namaKegiatan}_${tanggal}.docx`;
  }

  // Buat dokumen dan save
  const doc = new Document({ sections: [{ children }] });
  const blob = await Packer.toBlob(doc);
  saveAs(blob, dynamicFileName);

  if (onProgress) onProgress(100);
}
