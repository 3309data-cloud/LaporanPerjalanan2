export async function fetchImageBase64(fileId) {
  try {
    const url = `https://script.google.com/macros/s/AKfycbxGvdoKSOvm2ZrykWCvcdNd-puOE5NeOejWdIieMIfOo-gPSmJxuymmNt38MX0H83hK/exec?fileId=${fileId}`;
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
