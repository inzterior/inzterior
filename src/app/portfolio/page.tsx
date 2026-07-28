import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected interior design projects from Inzterior — residential and commercial spaces across Malaysia.",
};

const GALLERY = [
  { label: "Residential — Living Room", from: "from-amber-200", to: "to-emerald-700" },
  { label: "Residential — Kitchen", from: "from-stone-300", to: "to-stone-700" },
  { label: "Commercial — Office", from: "from-amber-100", to: "to-orange-700" },
  { label: "Residential — Bedroom", from: "from-emerald-600", to: "to-neutral-900" },
  { label: "Commercial — F&B", from: "from-orange-700", to: "to-amber-100" },
  { label: "Residential — Full Home", from: "from-stone-600", to: "to-amber-200" },
];

export default function PortfolioPage() {
  return (
    <>
      <section className="border-b border-[var(--line)] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <span className="mb-4 block text-sm font-semibold text-[var(--accent)]">
            Our Work
          </span>
          <h1 className="max-w-2xl text-3xl font-semibold sm:text-4xl">
            A growing body of Malaysian interiors.
          </h1>
          <p className="mt-4 max-w-xl text-[var(--ink-soft)]">
            We&apos;re currently photographing completed projects for this gallery. In the
            meantime, here&apos;s the range of spaces we design for.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-6 sm:grid-cols-3">
            {GALLERY.map((item) => (
              <div
                key={item.label}
                className={`flex aspect-square items-end bg-gradient-to-br ${item.from} ${item.to} p-4`}
              >
                <span className="text-xs tracking-wide text-white">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 border border-dashed border-[var(--line)] p-8 text-center">
            <h3 className="mb-2 text-lg font-semibold">Full project gallery launching soon</h3>
            <p className="mx-auto mb-6 max-w-md text-sm text-[var(--ink-soft)]">
              Want to see recent work in the meantime, or discuss a project like one of these?
              Get in touch and we&apos;ll walk you through examples directly.
            </p>
            <Link href="/contact" className="btn btn-outline">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
