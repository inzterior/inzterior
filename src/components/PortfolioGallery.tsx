"use client";

import { useState } from "react";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n";

const GALLERY_STYLES = [
  { from: "from-amber-200", to: "to-emerald-700" },
  { from: "from-stone-300", to: "to-stone-700" },
  { from: "from-amber-100", to: "to-orange-700" },
  { from: "from-emerald-600", to: "to-neutral-900" },
  { from: "from-orange-700", to: "to-amber-100" },
  { from: "from-stone-600", to: "to-amber-200" },
];

type TabId = "concept" | "active";

export default function PortfolioGallery({ dict }: { dict: Dictionary["portfolioGallery"] }) {
  const [tab, setTab] = useState<TabId>("concept");

  const TABS: { id: TabId; label: string }[] = [
    { id: "concept", label: dict.tabConcept },
    { id: "active", label: dict.tabActive },
  ];

  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-10 flex gap-2 border-b border-[var(--line)]">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`-mb-px border-b-2 px-1 py-3 text-sm transition-colors ${
                tab === t.id
                  ? "border-[var(--accent)] text-[var(--ink)]"
                  : "border-transparent text-[var(--ink-soft)] hover:text-[var(--ink)]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "concept" ? (
          <>
            <div className="grid gap-6 sm:grid-cols-3">
              {dict.galleryItems.map((label, i) => {
                const style = GALLERY_STYLES[i];
                return (
                  <div
                    key={label}
                    className={`relative flex aspect-square items-end bg-gradient-to-br ${style.from} ${style.to} p-4`}
                  >
                    <span className="absolute top-4 left-4 rounded-full bg-black/30 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white uppercase">
                      {dict.conceptBadge}
                    </span>
                    <span className="text-xs tracking-wide text-white">{label}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 border border-dashed border-[var(--line)] p-8 text-center">
              <h3 className="mb-2 text-lg font-semibold">{dict.conceptHeading}</h3>
              <p className="mx-auto mb-6 max-w-md text-sm text-[var(--ink-soft)]">
                {dict.conceptBody}
              </p>
              <Link href="/contact" className="btn btn-outline">
                {dict.conceptButton}
              </Link>
            </div>
          </>
        ) : (
          <div className="border border-dashed border-[var(--line)] p-12 text-center">
            <h3 className="mb-2 text-lg font-semibold">{dict.activeHeading}</h3>
            <p className="mx-auto mb-6 max-w-md text-sm text-[var(--ink-soft)]">
              {dict.activeBody}
            </p>
            <Link href="/contact" className="btn btn-outline">
              {dict.activeButton}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
