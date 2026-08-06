"use client";

import { useRouter } from "next/navigation";
import type { Dictionary, Locale } from "@/lib/i18n";
import { setLocaleCookie } from "@/lib/i18n/client-locale";

const LANGUAGES: { locale: Locale; labelKey: "english" | "malay" | "chinese" }[] = [
  { locale: "en", labelKey: "english" },
  { locale: "ms", labelKey: "malay" },
  { locale: "zh", labelKey: "chinese" },
];

export default function LanguagePopup({ dict }: { dict: Dictionary["languagePopup"] }) {
  const router = useRouter();

  function choose(locale: Locale) {
    setLocaleCookie(locale);
    router.refresh();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
      <div className="w-full max-w-sm border border-[var(--line)] bg-[var(--bg)] p-8 text-center">
        <h2 className="mb-2 text-lg font-semibold">{dict.heading}</h2>
        <p className="mb-6 text-sm text-[var(--ink-soft)]">{dict.body}</p>
        <div className="flex flex-col gap-3">
          {LANGUAGES.map(({ locale, labelKey }) => (
            <button
              key={locale}
              type="button"
              onClick={() => choose(locale)}
              className="btn btn-outline w-full"
            >
              {dict[labelKey]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
