// 📦 utils/fetchImageBase64.js
// ========================================================
// Modul utilitas untuk mengambil gambar dari Google Drive
// melalui Google Apps Script dan mengubahnya ke format base64.
// ========================================================

// 🔹 Tambahkan tracker global agar proses print bisa tahu gambar mana yang masih loading
window.__imageLoadTracker = window.__imageLoadTracker || new Map();

/**
 * 📸 fetchImageBase64(fileId)
 * Mengambil file gambar dari Google Drive melalui endpoint Apps Script,
 * lalu mengonversinya menjadi string base64 agar bisa langsung dipakai
 * di <img src="..."> tanpa perlu link eksternal.
 *
 * @param {string} fileId - ID file Google Drive.
 * @returns {Promise<string|null>} - String base64 dengan prefix MIME,
 *   atau null jika gagal.
 */
export async function fetchImageBase64(fileId) {
  if (!fileId) return null;
  const key = `drive-${fileId}`;

  // 🔸 Jika sedang atau sudah di-load, kembalikan promise yang sama
  if (window.__imageLoadTracker.has(key)) {
    return window.__imageLoadTracker.get(key);
  }

  // 🔹 Buat promise baru untuk proses fetch
  const promise = (async () => {
    try {
      const url = `https://script.google.com/macros/s/AKfycbx2jS1PWUbPDUhuygPaXEF4VCoF-hsXhbPbwvskKQIn_Xz9dgRb-P3W73LyDJ_-Z3j-/exec?fileId=${fileId}`;
      const res = await fetch(url);
      const json = await res.json();

      if (json.error) throw new Error(json.error);

      const base64 = `data:${json.mime};base64,${json.data}`;
      return base64;
    } catch (err) {
      console.error("Gagal ambil gambar:", err);
      return null;
    }
  })();

  // 🔸 Simpan promise di tracker agar bisa ditunggu di proses print
  window.__imageLoadTracker.set(key, promise);

  // 🔸 Kembalikan hasil promise
  return promise;
}
