"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { BrandLockup } from "@/components/brand/Logo";
import { navItems } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const overlay = pathname === "/" && !scrolled && !open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        open ? "bg-transparent text-deep" : overlay ? "bg-transparent text-ivory" : "border-b border-deep/10 bg-ivory/92 text-deep",
      )}
    >
      <Container className="flex h-[4.5rem] items-center justify-between gap-4 lg:h-20">
        <Link href="/" className="min-w-0 leading-none" aria-label="STHAPATYA, Vastu consultancy of Sanjeev Jain">
          <BrandLockup light={overlay} />
        </Link>
        <nav className="hidden items-center gap-x-3 xl:flex 2xl:gap-x-4" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "vedic-link text-[0.78rem] transition-colors 2xl:text-[0.86rem]",
                overlay ? "text-ivory/90 hover:text-sand" : "text-deep/80 hover:text-deep",
                pathname === item.href ? (overlay ? "text-sand" : "text-deep") : "",
              )}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className={cn(
              "vedic-button hidden px-4 py-2.5 text-sm transition sm:inline-flex",
              overlay ? "bg-ivory text-deep hover:bg-sand" : "bg-deep text-ivory hover:bg-[#342b26]",
            )}
          >
            Book a Consultation
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </Container>
      {open ? (
        <div id="mobile-navigation" className="fixed inset-0 z-[70] bg-ivory text-deep xl:hidden">
          <Container className="flex h-[4.5rem] items-center justify-end">
            <button type="button" className="inline-flex h-11 w-11 items-center justify-center" onClick={() => setOpen(false)}>
              <span className="sr-only">Close menu</span>
              <X size={22} />
            </button>
          </Container>
          <nav className="flex flex-col px-6 pb-10" aria-label="Mobile">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="vedic-link border-b border-deep/10 py-4 font-serif text-3xl"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)} className="vedic-button mt-8 inline-flex items-center justify-center bg-deep px-5 py-4 text-center text-base text-ivory">
              Book a Consultation
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
