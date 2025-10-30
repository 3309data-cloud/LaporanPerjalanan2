// 📁 src/components/DriveImage.jsx
import React, { useEffect, useState } from "react";
import { fetchImageBase64 } from "../utils/fetchImageBase64";

// 🔹 Cache global agar gambar tidak diambil berulang
const imageCache = window.__imageCache || (window.__imageCache = new Map());

// 🔹 Tracker global agar bisa tunggu semua load (dipakai di handlePrintAll)
window.__imageLoadTracker = window.__imageLoadTracker || new Map();

export default function DriveImage({ fileId, alt, onLoadingChange }) {
  const [src, setSrc] = useState(imageCache.get(fileId) || null);

  useEffect(() => {
    if (!fileId) return;

    const key = `drive-${fileId}`;

    // Jika sudah di cache → tampilkan langsung
    if (imageCache.has(fileId)) {
      setSrc(imageCache.get(fileId));
      onLoadingChange?.(false);
      // Buat Promise resolved untuk tracker
      window.__imageLoadTracker.set(key, Promise.resolve());
      return;
    }

    onLoadingChange?.(true);

    // 🔹 Fetch gambar dan simpan promise di tracker
    const loadPromise = fetchImageBase64(fileId)
      .then((base64) => {
        if (base64) {
          imageCache.set(fileId, base64);
          setSrc(base64);
        }
      })
      .catch((err) => console.error("❌ Gagal ambil foto:", err))
      .finally(() => {
        onLoadingChange?.(false);
        window.__imageLoadTracker.delete(key);
      });

    window.__imageLoadTracker.set(key, loadPromise);

    return () => {
      window.__imageLoadTracker.delete(key);
    };
  }, [fileId]);

  if (!src) return null;
  return <img src={src} alt={alt} className="report-photo-img" />;
}
