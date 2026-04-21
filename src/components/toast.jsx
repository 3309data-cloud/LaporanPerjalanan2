import { useEffect } from "react";

export default function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, []);

  const bg =
    type === "success" ? "#16a34a" :
    type === "error" ? "#dc2626" :
    "#334155";

  return (
    <div style={{
      position: "fixed",
      top: 20,
      right: 20,
      background: bg,
      color: "white",
      padding: "12px 18px",
      borderRadius: 8,
      boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
      zIndex: 9999
    }}>
      {message}
    </div>
  );
}
