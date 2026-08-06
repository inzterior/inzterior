"use client";

import { useState } from "react";
import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";

const STAGE_IMAGES = [
  { src: "/images/journey-discovery.jpg", alt: "Cozy living room interior" },
  { src: "/images/journey-concept.jpg", alt: "Minimalist living room interior" },
  { src: "/images/closing-living-room.jpg", alt: "Spacious living room with minimalist furniture" },
  { src: "/images/hero-living-room.jpg", alt: "Living room interior with natural light" },
];

const STAGE_MILESTONE_REFS: number[][] = [[], [1], [2, 3], [4, 5]];

export default function ProcessTimeline({
  dict,
  paymentStages,
}: {
  dict: Dictionary["processTimeline"];
  paymentStages: Dictionary["paymentStages"];
}) {
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
            {dict.eyebrow}
          </span>
          <h2 className="font-serif-display text-2xl font-semibold text-balance sm:text-3xl">
            {dict.heading}
          </h2>
        </div>

        <div className="relative">
          <div className="absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 bg-[var(--line)] md:block" />

          <div className="flex flex-col gap-16">
            {dict.stages.map((stage, i) => {
              const milestoneRefs = STAGE_MILESTONE_REFS[i] ?? [];
              const milestones = paymentStages.filter((p) => milestoneRefs.includes(p.n));
              const isOpen = expanded.has(stage.n);
              const image = STAGE_IMAGES[i];

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
                          {isOpen ? dict.hidePaymentTerms : dict.showPaymentTerms}
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
                      src={image.src}
                      alt={image.alt}
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
