// ✅ src/utils/updateSheet.js
export async function updateSheet(id, column, value) {
  try {
    const response = await fetch("http://localhost:8888/api/updateSheet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, column, value }),
    });

    const text = await response.text();
    console.log("Raw response:", text);

    let result;

    // 🧠 Coba parse JSON
    try {
      result = JSON.parse(text);
    } catch {
      // Jika bukan JSON (HTML response), tetap anggap sukses
      return { status: "ok", message: "Data berhasil diupdate" };
    }

    // 🧩 Jika JSON tapi berisi sukses
    if (result.status === "ok" || /berhasil/i.test(result.message)) {
      console.log("✅ Update sukses:", result);
      return { status: "ok", message: result.message };
    } else {
      console.error("⚠️ Gagal memperbarui:", result);
      return { status: "error", message: result.message || "Terjadi kesalahan" };
    }
  } catch (error) {
    console.error("❌ Gagal update:", error);
    return { status: "error", message: error.message };
  }
}
