import React from "react";

export default function BaseReportLayout({ title, children }) {
  return (
    <div className="report-page">
      <div style={{ textAlign: "center", fontWeight: "bold", marginBottom: "20px" }}>
        {title}
      </div>
      {children}
    </div>
  );
}