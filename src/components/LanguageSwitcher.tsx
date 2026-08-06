"use client";

import { useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { setLocaleCookie } from "@/lib/i18n/client-locale";

const LANGUAGES: { locale: Locale; label: string }[] = [
  { locale: "en", label: "EN" },
  { locale: "ms", label: "MY" },
  { locale: "zh", label: "中" },
];

export default function LanguageSwitcher({ locale, ariaLabel }: { locale: Locale; ariaLabel: string }) {
  const router = useRouter();

  function choose(next: Locale) {
    if (next === locale) return;
    setLocaleCookie(next);
    router.refresh();
  }

  return (
    <div role="group" aria-label={ariaLabel} className="flex gap-1 text-xs">
      {LANGUAGES.map(({ locale: l, label }) => (
        <button
          key={l}
          type="button"
          onClick={() => choose(l)}
          aria-pressed={l === locale}
          className={`rounded-full px-2.5 py-1.5 transition-colors ${
            l === locale
              ? "bg-[var(--ink)] text-[var(--bg)]"
              : "text-[var(--ink-soft)] hover:bg-[var(--bg-panel)] hover:text-[var(--ink)]"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
