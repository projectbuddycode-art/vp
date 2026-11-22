"use client";

import { createContext, useContext } from "react";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { getPageBodies, type PageBodies } from "@/lib/i18n/page-bodies";
import type { Locale } from "@/lib/i18n/locale";
import type { Copy } from "@/lib/i18n/types";

const LocaleContext = createContext<Locale>("en");

export function LocaleProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return useContext(LocaleContext);
}

export function useCopy(): Copy {
  return dictionaries[useContext(LocaleContext)];
}

export function usePageBodies(): PageBodies {
  return getPageBodies(useContext(LocaleContext));
}
