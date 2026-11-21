import { en } from "@/lib/i18n/en";
import { gu } from "@/lib/i18n/gu";
import { hi } from "@/lib/i18n/hi";
import type { Locale } from "@/lib/i18n/locale";
import type { Copy } from "@/lib/i18n/types";

export const dictionaries: Record<Locale, Copy> = { en, hi, gu };

export function fill(template: string, values: Record<string, string>) {
  return Object.entries(values).reduce((text, [key, value]) => text.replaceAll(`{${key}}`, value), template);
}

export function translateError(copy: Copy, message: string | undefined) {
  if (!message) return undefined;
  return copy.errors[message] ?? message;
}
