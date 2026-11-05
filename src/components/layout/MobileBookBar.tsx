"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function MobileBookBar() {
  const pathname = usePathname();
  if (pathname.startsWith("/contact") || pathname.startsWith("/admin")) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-deep/10 bg-ivory/95 p-3 sm:hidden">
      <Link href="/contact" className="vedic-button flex w-full justify-center bg-deep px-4 py-3 text-sm text-ivory">
        Book a Personal Consultation
      </Link>
    </div>
  );
}
