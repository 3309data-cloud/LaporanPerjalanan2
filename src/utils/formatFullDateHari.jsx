export function formatFullDateHari(dateStr) {
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