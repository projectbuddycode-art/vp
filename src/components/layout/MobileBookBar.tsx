"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCopy } from "@/components/i18n/LocaleProvider";

export function MobileBookBar() {
  const pathname = usePathname();
  const copy = useCopy();
  if (pathname.startsWith("/contact") || pathname.startsWith("/admin") || pathname.startsWith("/phone-consultation")) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-deep/10 bg-ivory/95 p-3 sm:hidden">
      <Link href="/contact" className="vedic-button flex w-full justify-center bg-deep px-4 py-3 text-sm text-ivory">
        {copy.bookPersonal}
      </Link>
    </div>
  );
}
