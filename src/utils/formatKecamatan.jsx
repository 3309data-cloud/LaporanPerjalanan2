export function formatKecamatan(str) {
  if (!str) return "";
  const nama = str.replace(/^\d+\s*/, "").toLowerCase();
  return "Kecamatan " + nama.charAt(0).toUpperCase() + nama.slice(1);
}