"use client";

import { useEffect, useId, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { setLocale } from "@/lib/i18n/actions";
import { localeMeta, locales, type Locale } from "@/lib/i18n/locale";
import { useCopy, useLocale } from "@/components/i18n/LocaleProvider";
import { cn } from "@/lib/utils";

export function LanguageSelect({ light = false }: { light?: boolean }) {
  const locale = useLocale();
  const copy = useCopy();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("mousedown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function choose(next: Locale) {
    setOpen(false);
    if (next === locale) return;
    startTransition(async () => {
      await setLocale(next);
      router.refresh();
    });
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        className={cn(
          "inline-flex h-11 items-center gap-1 px-2 text-sm",
          light ? "text-ivory" : "text-deep",
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={copy.languageLabel}
        disabled={pending}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{localeMeta[locale].short}</span>
        <span aria-hidden className="text-[0.65rem]">▾</span>
      </button>
      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-label={copy.languageList}
          className="absolute right-0 z-[80] mt-1 min-w-36 border border-deep/10 bg-ivory py-1 text-deep shadow-lift"
        >
          {locales.map((item) => {
            const active = item === locale;
            return (
              <li key={item}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  className={cn("flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-parchment", active && "text-bark")}
                  onClick={() => choose(item)}
                >
                  <span>{localeMeta[item].label}</span>
                  {active ? <span aria-hidden className="text-gold">●</span> : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
