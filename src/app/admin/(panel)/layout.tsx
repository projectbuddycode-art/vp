import { Suspense } from "react";
import type { Metadata } from "next";
import { connection } from "next/server";
import { AdminGate } from "@/components/admin/AdminGate";

export const metadata: Metadata = {
  title: "Studio desk",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await connection();
  return (
    <Suspense fallback={<div className="min-h-screen bg-ivory px-6 py-16">Opening the studio desk…</div>}>
      <AdminGate>{children}</AdminGate>
    </Suspense>
  );
}
