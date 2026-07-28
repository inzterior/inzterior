"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/estimate", label: "Estimate" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/team", label: "Our Team" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-[var(--line)]">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
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

        <Link
          href="/contact"
          className="hidden border-b border-[var(--ink)] pb-0.5 text-sm transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] sm:block"
        >
          Enquire
        </Link>

        <button
          type="button"
          aria-label="Toggle menu"
          className="rounded-full px-2 py-1 text-xl transition-colors hover:bg-[var(--bg-panel)] sm:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-[var(--line)] px-6 py-6 text-sm sm:hidden">
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
        </nav>
      )}
    </header>
  );
}
