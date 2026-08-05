"use client";

import { useState } from "react";
import Image from "next/image";
import { PAYMENT_STAGES } from "@/lib/content";

const STAGES = [
  {
    n: "01",
    tag: "Discovery Consultation",
    title: "We start by listening, not selling",
    body: "We walk the space (or review your floor plan) and talk through budget, timeline, and how you actually want to live in it — no obligation, no pressure to sign anything yet.",
    trust: null,
    milestoneRefs: [] as number[],
    image: "/images/journey-discovery.jpg",
    alt: "Cozy living room interior",
  },
  {
    n: "02",
    tag: "Concept & Proposal",
    title: "Nothing starts until it's in writing",
    body: "Mood boards, layout options, and an itemised quote — reviewed together before anything is signed.",
    trust: "A written contract covers scope, materials, and timeline before any work begins beyond the design deposit.",
    milestoneRefs: [1],
    image: "/images/journey-concept.jpg",
    alt: "Minimalist living room interior",
  },
  {
    n: "03",
    tag: "Design Development",
    title: "You pay for what's built, not what's promised",
    body: "Detailed drawings, material and furniture selection, and 3D visualization sign-off before any carpentry begins.",
    trust: "A small design deposit gets us started — further payments release only against completed milestones.",
    milestoneRefs: [2, 3],
    image: "/images/closing-living-room.jpg",
    alt: "Spacious living room with minimalist furniture",
  },
  {
    n: "04",
    tag: "Build & Handover",
    title: "Six months of coverage after we're done",
    body: "On-site coordination through to final styling and a walkthrough before you move in.",
    trust: "Photo and video updates at every milestone, plus a 6-month defects warranty after handover.",
    milestoneRefs: [4, 5],
    image: "/images/hero-living-room.jpg",
    alt: "Living room interior with natural light",
  },
];

export default function ProcessTimeline() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  function toggle(stageN: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(stageN)) {
        next.delete(stageN);
      } else {
        next.add(stageN);
      }
      return next;
    });
  }

  return (
    <section id="journey" className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto mb-16 max-w-[48ch] text-center">
          <span className="mb-3 block text-sm font-semibold text-[var(--accent)]">
            How It Works
          </span>
          <h2 className="font-serif-display text-2xl font-semibold text-balance sm:text-3xl">
            Every stage protected — not just promised
          </h2>
        </div>

        <div className="relative">
          <div className="absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 bg-[var(--line)] md:block" />

          <div className="flex flex-col gap-16">
            {STAGES.map((stage, i) => {
              const milestones = PAYMENT_STAGES.filter((p) =>
                stage.milestoneRefs.includes(p.n)
              );
              const isOpen = expanded.has(stage.n);

              return (
                <div
                  key={stage.n}
                  className="relative grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-18"
                >
                  <div className="absolute top-1/2 left-1/2 z-10 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--bg)] font-serif-display text-base text-[var(--accent)] italic md:flex">
                    {stage.n}
                  </div>
                  <div className={i % 2 === 1 ? "md:order-2" : ""}>
                    <span className="mb-3 block text-sm font-semibold text-[var(--accent)]">
                      {stage.tag}
                    </span>
                    <h3 className="font-serif-display mb-3 text-xl font-semibold text-balance sm:text-2xl">
                      {stage.title}
                    </h3>
                    <p className="max-w-[44ch] text-sm text-[var(--ink-soft)]">{stage.body}</p>
                    {stage.trust && (
                      <div className="mt-5 flex gap-3 border-t border-[var(--line)] pt-5 text-sm">
                        <span className="font-serif-display flex-none text-[var(--accent)] italic">
                          &ldquo;
                        </span>
                        <span>{stage.trust}</span>
                      </div>
                    )}
                    {milestones.length > 0 && (
                      <div className="mt-4">
                        <button
                          type="button"
                          onClick={() => toggle(stage.n)}
                          aria-expanded={isOpen}
                          className="text-xs font-semibold tracking-wide text-[var(--accent)] uppercase hover:text-[var(--accent-soft)]"
                        >
                          {isOpen ? "Hide payment terms ↑" : "See the exact payment terms →"}
                        </button>
                        {isOpen && (
                          <div className="mt-4 flex flex-col gap-4 border-l border-[var(--line)] pl-4">
                            {milestones.map((m) => (
                              <div key={m.n}>
                                <p className="text-sm font-semibold">{m.title}</p>
                                <p className="mt-1 text-xs text-[var(--ink-soft)]">{m.body}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div
                    className={`relative aspect-4/3 overflow-hidden bg-[var(--bg-panel)] ${i % 2 === 1 ? "md:order-1" : ""}`}
                  >
                    <Image
                      src={stage.image}
                      alt={stage.alt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
