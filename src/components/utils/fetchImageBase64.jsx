export async function fetchImageBase64(fileId) {
  try {
    const url = `https://script.google.com/macros/s/AKfycbx2jS1PWUbPDUhuygPaXEF4VCoF-hsXhbPbwvskKQIn_Xz9dgRb-P3W73LyDJ_-Z3j-/exec?fileId=${fileId}`;
    const res = await fetch(url);
    const json = await res.json();
    if (json.error) throw new Error(json.error);

    // gabungkan supaya bisa dipakai di <img src="...">
    return `data:${json.mime};base64,${json.data}`;
  } catch (err) {
    console.error("Gagal ambil gambar:", err);
    return null;
  }
}
