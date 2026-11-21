"use client";

import { useEffect, useId, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { setLocale } from "@/lib/i18n/actions";
import { localeMeta, locales, type Locale } from "@/lib/i18n/locale";
import { useCopy, useLocale } from "@/components/i18n/LocaleProvider";
import { cn } from "@/lib/utils";

const seenKey = "sthapathya_lang_seen";

export function LanguageSelect({ light = false }: { light?: boolean }) {
  const locale = useLocale();
  const copy = useCopy();
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [pending, startTransition] = useTransition();
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    try {
      if (sessionStorage.getItem(seenKey)) setOpen(false);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        markSeen();
        setOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        markSeen();
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function markSeen() {
    try {
      sessionStorage.setItem(seenKey, "1");
    } catch {
      /* ignore */
    }
  }

  function choose(next: Locale) {
    markSeen();
    setOpen(false);
    if (next === locale) return;
    startTransition(async () => {
      await setLocale(next);
      router.refresh();
    });
  }

  return (
    <div ref={rootRef} className="relative">
      <div
        className={cn(
          "inline-flex items-center gap-0.5 rounded-sm border px-1 py-1 text-sm",
          light ? "border-ivory/35 bg-deep/25 text-ivory backdrop-blur-sm" : "border-deep/15 bg-ivory text-deep",
        )}
        role="group"
        aria-label={copy.languageLabel}
      >
        {locales.map((item) => {
          const active = item === locale;
          return (
            <button
              key={item}
              type="button"
              disabled={pending}
              aria-pressed={active}
              aria-label={localeMeta[item].label}
              className={cn(
                "min-w-10 px-2.5 py-1.5 text-sm transition",
                active
                  ? light
                    ? "bg-ivory text-deep"
                    : "bg-deep text-ivory"
                  : light
                    ? "text-ivory/85 hover:bg-ivory/15"
                    : "text-deep/75 hover:bg-parchment",
              )}
              onClick={() => choose(item)}
            >
              <span className="sm:hidden">{localeMeta[item].short}</span>
              <span className="hidden sm:inline">{localeMeta[item].label}</span>
            </button>
          );
        })}
        <button
          type="button"
          className={cn("px-1.5 py-1.5 text-[0.65rem]", light ? "text-ivory/70" : "text-deep/55")}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-label={copy.languageList}
          disabled={pending}
          onClick={() => setOpen((value) => !value)}
        >
          ▾
        </button>
      </div>
      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-label={copy.languageList}
          className="absolute right-0 z-[80] mt-2 min-w-44 border border-deep/10 bg-ivory py-2 text-deep shadow-lift"
        >
          <li className="px-3 pb-2 text-[0.68rem] tracking-[0.16em] text-gold uppercase">{copy.languageLabel}</li>
          {locales.map((item) => {
            const active = item === locale;
            return (
              <li key={item}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  className={cn(
                    "flex w-full items-center justify-between px-3 py-2.5 text-left text-sm hover:bg-parchment",
                    active && "text-bark",
                  )}
                  onClick={() => choose(item)}
                >
                  <span>{localeMeta[item].label}</span>
                  {active ? (
                    <span aria-hidden className="text-gold">
                      ●
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
