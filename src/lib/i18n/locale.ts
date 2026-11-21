export const locales = ["en", "hi", "gu"] as const;

export type Locale = (typeof locales)[number];

export const localeCookie = "sthapathya_lang";

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "en" || value === "hi" || value === "gu";
}

export const localeMeta: Record<Locale, { html: string; og: string; short: string; label: string }> = {
  en: { html: "en", og: "en_IN", short: "EN", label: "English" },
  hi: { html: "hi", og: "hi_IN", short: "हिं", label: "हिन्दी" },
  gu: { html: "gu", og: "gu_IN", short: "ગુજ", label: "ગુજરાતી" },
};
