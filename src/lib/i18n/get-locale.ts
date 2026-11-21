import "server-only";
import { cookies } from "next/headers";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { isLocale, localeCookie, type Locale } from "@/lib/i18n/locale";

export async function getLocale(): Promise<Locale> {
  const jar = await cookies();
  const value = jar.get(localeCookie)?.value;
  return isLocale(value) ? value : "en";
}

export async function getCopy() {
  return dictionaries[await getLocale()];
}
