// DriveImage.jsx
import React, { useEffect, useState } from "react";

function extractFileId(url) {
  if (!url) return null;
  const m = url.match(/[-\w]{25,}/); // cari pola fileId Google Drive
  return m ? m[0] : null;
}

export default function DriveImage({ driveUrl, alt = "", className, style }) {
  const [src, setSrc] = useState(null);
  const [error, setError] = useState(null);

  // ✅ Ganti dengan scriptUrl kamu
  const scriptUrl = "https://script.google.com/macros/s/AKfycbyR8QZ5vOTelCnDy8ztkEF0lvKq977Z6TTbVFaW1As4adWt9MQMc-lB_txugACtyaBd/exec";

  useEffect(() => {
    let alive = true;
    async function load() {
      setError(null);
      setSrc(null);
      const fileId = extractFileId(driveUrl);
      if (!fileId) {
        setError("fileId tidak ditemukan");
        return;
      }

      const cacheKey = `driveimg_${fileId}`;
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        setSrc(cached);
        return;
      }

      try {
        const url = `${scriptUrl}?fileId=${encodeURIComponent(fileId)}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (json.error) throw new Error(json.error);
        const dataUrl = `data:${json.mime};base64,${json.data}`;
        sessionStorage.setItem(cacheKey, dataUrl);
        if (alive) setSrc(dataUrl);
      } catch (err) {
        if (alive) setError(err.message);
      }
    }
    load();
    return () => { alive = false; };
  }, [driveUrl]);

  if (error) return <div style={{ color: "crimson" }}>Foto gagal: {error}</div>;
  if (!src) return <div style={{ minHeight: 80 }}>Memuat foto…</div>;
  return <img src={src} alt={alt} className={className} style={style} />;
}
