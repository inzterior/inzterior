"use client";

import { useState } from "react";
import Link from "next/link";

const GALLERY = [
  { label: "Residential — Living Room", from: "from-amber-200", to: "to-emerald-700" },
  { label: "Residential — Kitchen", from: "from-stone-300", to: "to-stone-700" },
  { label: "Commercial — Office", from: "from-amber-100", to: "to-orange-700" },
  { label: "Residential — Bedroom", from: "from-emerald-600", to: "to-neutral-900" },
  { label: "Commercial — F&B", from: "from-orange-700", to: "to-amber-100" },
  { label: "Residential — Full Home", from: "from-stone-600", to: "to-amber-200" },
];

const TABS = [
  { id: "concept", label: "Concept & Aesthetic Direction" },
  { id: "active", label: "Active Projects" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function PortfolioGallery() {
  const [tab, setTab] = useState<TabId>("concept");

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
              {GALLERY.map((item) => (
                <div
                  key={item.label}
                  className={`relative flex aspect-square items-end bg-gradient-to-br ${item.from} ${item.to} p-4`}
                >
                  <span className="absolute top-4 left-4 rounded-full bg-black/30 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white uppercase">
                    Concept Study
                  </span>
                  <span className="text-xs tracking-wide text-white">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 border border-dashed border-[var(--line)] p-8 text-center">
              <h3 className="mb-2 text-lg font-semibold">Want to see recent work directly?</h3>
              <p className="mx-auto mb-6 max-w-md text-sm text-[var(--ink-soft)]">
                Get in touch and we&apos;ll walk you through examples of work like this in
                person.
              </p>
              <Link href="/contact" className="btn btn-outline">
                Get in Touch
              </Link>
            </div>
          </>
        ) : (
          <div className="border border-dashed border-[var(--line)] p-12 text-center">
            <h3 className="mb-2 text-lg font-semibold">
              Active project documentation is on the way
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm text-[var(--ink-soft)]">
              We&apos;re photographing and documenting current Iskandar Puteri projects as they
              complete — floor plans, on-site progress, and finished spaces will appear here
              directly, not stock imagery.
            </p>
            <Link href="/contact" className="btn btn-outline">
              Ask About a Project in Progress
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
