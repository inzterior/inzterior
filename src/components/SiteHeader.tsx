"use client";

import Link from "next/link";
import { useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import type { Dictionary, Locale } from "@/lib/i18n";

export default function SiteHeader({
  dict,
  locale,
  languageSwitcherAriaLabel,
}: {
  dict: Dictionary["nav"];
  locale: Locale;
  languageSwitcherAriaLabel: string;
}) {
  const [open, setOpen] = useState(false);

  const NAV_LINKS = [
    { href: "/portfolio", label: dict.portfolio },
    { href: "/articles", label: "Articles" },
    { href: "/#journey", label: dict.howWeWork },
    { href: "/estimate", label: dict.estimate },
  ];

  return (
    <header className="border-b border-[var(--line)]">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-6">
        <Link href="/" className="font-serif-display text-xl font-semibold">
          Inzterior
        </Link>

        <nav className="hidden gap-1 text-sm sm:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-[var(--ink-soft)] transition-colors hover:bg-[var(--bg-panel)] hover:text-[var(--ink)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          <LanguageSwitcher locale={locale} ariaLabel={languageSwitcherAriaLabel} />
          <Link href="/contact" className="btn btn-primary">
            {dict.startProject}
          </Link>
        </div>

        <button
          type="button"
          aria-label={dict.toggleMenu}
          className="rounded-full px-2 py-1 text-xl transition-colors hover:bg-[var(--bg-panel)] sm:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-4 border-t border-[var(--line)] px-6 py-6 text-sm sm:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 transition-colors hover:bg-[var(--bg-panel)] hover:text-[var(--accent)]"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <LanguageSwitcher locale={locale} ariaLabel={languageSwitcherAriaLabel} />
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="btn btn-primary mt-2 w-fit"
          >
            {dict.startProject}
          </Link>
        </nav>
      )}
    </header>
  );
}
