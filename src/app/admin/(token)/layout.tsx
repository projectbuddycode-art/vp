import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Review moderation",
  robots: { index: false, follow: false },
};

export default function TokenModerationLayout({ children }: { children: React.ReactNode }) {
  return <main className="min-h-screen bg-[#efe8da] px-4 py-10 sm:px-8">{children}</main>;
}
