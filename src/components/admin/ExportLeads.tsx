"use client";

import { exportEnquiries } from "@/lib/actions/admin";

export function ExportLeads() {
  return (
    <button
      type="button"
      className="border border-deep/20 px-4 py-2 text-[0.68rem] tracking-[0.14em] uppercase"
      onClick={async () => {
        const csv = await exportEnquiries();
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "enquiries.csv";
        link.click();
        URL.revokeObjectURL(url);
      }}
    >
      Export CSV
    </button>
  );
}
