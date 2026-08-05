"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/#journey", label: "How We Work" },
  { href: "/estimate", label: "Estimate" },
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

        <div className="hidden sm:block">
          <Link href="/contact" className="btn btn-primary">
            Start a Project
          </Link>
        </div>

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
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="btn btn-primary mt-2 w-fit"
          >
            Start a Project
          </Link>
        </nav>
      )}
    </header>
  );
}
