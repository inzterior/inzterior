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
  const [activeIndex, setActiveIndex] = useState(0);
  const [showPayment, setShowPayment] = useState(false);

  const stage = dict.stages[activeIndex];
  const milestoneRefs = STAGE_MILESTONE_REFS[activeIndex] ?? [];
  const milestones = paymentStages.filter((p) => milestoneRefs.includes(p.n));
  const image = STAGE_IMAGES[activeIndex];

  function selectStage(i: number) {
    setActiveIndex(i);
    setShowPayment(false);
  }

  return (
    <section id="journey" className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto mb-12 max-w-[48ch] text-center">
          <span className="mb-3 block text-sm font-semibold text-[var(--accent)]">
            {dict.eyebrow}
          </span>
          <h2 className="font-serif-display text-2xl font-semibold text-balance sm:text-3xl">
            {dict.heading}
          </h2>
        </div>

        <div
          role="tablist"
          aria-label={dict.heading}
          className="mb-10 grid grid-cols-4 border-b border-[var(--line)] sm:flex sm:flex-wrap sm:justify-center sm:gap-1"
        >
          {dict.stages.map((s, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={s.n}
                type="button"
                role="tab"
                id={`stage-tab-${s.n}`}
                aria-selected={isActive}
                aria-controls={`stage-panel-${s.n}`}
                onClick={() => selectStage(i)}
                className={`relative flex flex-col items-center gap-1 px-2 py-3 text-center text-sm font-semibold transition-colors sm:flex-none sm:flex-row sm:gap-2 sm:px-4 sm:text-left sm:whitespace-nowrap ${
                  isActive
                    ? "text-[var(--accent)]"
                    : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
                }`}
              >
                <span className="font-serif-display italic">{s.n}</span>
                <span className="hidden sm:inline">{s.tag}</span>
                {isActive && (
                  <span className="absolute inset-x-0 -bottom-px h-0.5 bg-[var(--accent)]" />
                )}
              </button>
            );
          })}
        </div>

        <div
          key={stage.n}
          id={`stage-panel-${stage.n}`}
          role="tabpanel"
          aria-labelledby={`stage-tab-${stage.n}`}
          className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-14"
        >
          <div className="relative aspect-4/3 overflow-hidden bg-[var(--bg-panel)]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
          <div>
            <h3 className="font-serif-display mb-3 text-xl font-semibold text-balance sm:text-2xl">
              {stage.title}
            </h3>
            <p className="max-w-[46ch] text-sm text-[var(--ink-soft)]">{stage.body}</p>
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
                  onClick={() => setShowPayment((v) => !v)}
                  aria-expanded={showPayment}
                  className="text-xs font-semibold tracking-wide text-[var(--accent)] uppercase hover:text-[var(--accent-soft)]"
                >
                  {showPayment ? dict.hidePaymentTerms : dict.showPaymentTerms}
                </button>
                {showPayment && (
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
        </div>
      </div>
    </section>
  );
}
