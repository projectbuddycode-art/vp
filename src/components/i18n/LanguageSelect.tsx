"use client";

import { useEffect, useId, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { setLocale } from "@/lib/i18n/actions";
import { localeMeta, locales, type Locale } from "@/lib/i18n/locale";
import { useCopy, useLocale } from "@/components/i18n/LocaleProvider";
import { cn } from "@/lib/utils";

const pickedKey = "sthapathya_lang_picked";

function hasPickedLanguage() {
  try {
    return sessionStorage.getItem(pickedKey) === "1";
  } catch {
    return false;
  }
}

function markLanguagePicked() {
  try {
    sessionStorage.setItem(pickedKey, "1");
  } catch {
    /* ignore */
  }
}

export function LanguageSelect({ light = false }: { light?: boolean }) {
  const locale = useLocale();
  const copy = useCopy();
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [pending, startTransition] = useTransition();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const listId = useId();

  useEffect(() => {
    if (hasPickedLanguage()) setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        markLanguagePicked();
        setOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        markLanguagePicked();
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("mousedown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const activeIndex = Math.max(
      0,
      locales.findIndex((item) => item === locale),
    );
    optionRefs.current[activeIndex]?.focus();
  }, [open, locale]);

  function choose(next: Locale) {
    markLanguagePicked();
    setOpen(false);
    triggerRef.current?.focus();
    if (next === locale) return;
    startTransition(async () => {
      await setLocale(next);
      router.refresh();
    });
  }

  function onTriggerKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpen(true);
    }
  }

  function onOptionKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      const next = (index + 1) % locales.length;
      optionRefs.current[next]?.focus();
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      const previous = (index - 1 + locales.length) % locales.length;
      optionRefs.current[previous]?.focus();
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      optionRefs.current[0]?.focus();
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      optionRefs.current[locales.length - 1]?.focus();
      return;
    }
    if (event.key === "Tab") {
      markLanguagePicked();
      setOpen(false);
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        className={cn(
          "inline-flex h-8 items-center gap-0.5 px-1.5 text-xs",
          light ? "text-ivory" : "text-deep",
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={copy.languageLabel}
        disabled={pending}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={onTriggerKeyDown}
      >
        <span>{localeMeta[locale].short}</span>
        <span aria-hidden className={cn("text-[0.55rem] transition-transform duration-200", open && "rotate-180")}>
          ▾
        </span>
      </button>
      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-label={copy.languageList}
          className="language-menu absolute right-0 z-[80] mt-1 min-w-28 border border-deep/10 bg-ivory py-0.5 text-deep shadow-lift"
        >
          {locales.map((item, index) => {
            const active = item === locale;
            return (
              <li key={item}>
                <button
                  ref={(node) => {
                    optionRefs.current[index] = node;
                  }}
                  type="button"
                  role="option"
                  aria-selected={active}
                  tabIndex={active ? 0 : -1}
                  className={cn(
                    "flex w-full items-center justify-between px-2.5 py-1.5 text-left text-xs hover:bg-parchment focus:bg-parchment focus:outline-none",
                    active && "text-bark",
                  )}
                  onClick={() => choose(item)}
                  onKeyDown={(event) => onOptionKeyDown(event, index)}
                >
                  <span>{localeMeta[item].label}</span>
                  {active ? (
                    <span aria-hidden className="text-[0.55rem] text-gold">
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
