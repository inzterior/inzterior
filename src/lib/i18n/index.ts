import { cookies } from "next/headers";
import { en } from "./dictionaries/en";
import { ms } from "./dictionaries/ms";
import { zh } from "./dictionaries/zh";

export type Locale = "en" | "ms" | "zh";
export type Dictionary = typeof en;

const DICTIONARIES: Record<Locale, Dictionary> = { en, ms, zh };
const LOCALE_COOKIE = "locale";

function isLocale(value: string | undefined): value is Locale {
  return value === "en" || value === "ms" || value === "zh";
}

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const value = cookieStore.get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : "en";
}

export async function hasLocaleCookie(): Promise<boolean> {
  const cookieStore = await cookies();
  return isLocale(cookieStore.get(LOCALE_COOKIE)?.value);
}

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}
