import Image from "next/image";
import Link from "next/link";

const STAGES = [
  {
    n: "01",
    tag: "Discovery Consultation",
    title: "We start by listening, not selling",
    body: "We walk the space (or review your floor plan) and talk through budget, timeline, and how you actually want to live in it — no obligation, no pressure to sign anything yet.",
    trust: null,
    image: "/images/journey-discovery.jpg",
    alt: "Cozy living room interior",
  },
  {
    n: "02",
    tag: "Concept & Proposal",
    title: "Nothing starts until it's in writing",
    body: "Mood boards, layout options, and an itemised quote — reviewed together before anything is signed.",
    trust: "A written contract covers scope, materials, and timeline before any work begins beyond the design deposit.",
    image: "/images/journey-concept.jpg",
    alt: "Minimalist living room interior",
  },
  {
    n: "03",
    tag: "Design Development",
    title: "You pay for what's built, not what's promised",
    body: "Detailed drawings, material and furniture selection, and 3D visualization sign-off before any carpentry begins.",
    trust: "A small design deposit gets us started — further payments release only against completed milestones.",
    image: "/images/closing-living-room.jpg",
    alt: "Spacious living room with minimalist furniture",
  },
  {
    n: "04",
    tag: "Build & Handover",
    title: "Six months of coverage after we're done",
    body: "On-site coordination through to final styling and a walkthrough before you move in.",
    trust: "Photo and video updates at every milestone, plus a 6-month defects warranty after handover.",
    image: "/images/hero-living-room.jpg",
    alt: "Living room interior with natural light",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="grid min-h-[560px] grid-cols-1 items-stretch md:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-14 md:px-16 lg:px-20">
          <span className="mb-5 block text-sm font-semibold text-[var(--accent)]">
            Interior Design Studio · Horizon Hills, Iskandar Puteri
          </span>
          <h1 className="font-serif-display mb-6 max-w-[13ch] text-4xl leading-[1.1] font-semibold text-balance sm:text-5xl">
            Spaces designed around how you{" "}
            <em className="font-serif-display font-normal text-[var(--accent)] not-italic italic">
              actually
            </em>{" "}
            live.
          </h1>
          <p className="mb-8 max-w-md text-[var(--ink-soft)]">
            Inzterior turns empty units into considered, liveable spaces — for homeowners and
            businesses across Johor, under a written contract from day one.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/contact" className="btn btn-primary">
              Start a Project
            </Link>
            <a
              href="#journey"
              className="border-b border-[var(--taupe)] text-sm hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              See How It Works ↓
            </a>
          </div>
        </div>
        <div className="relative min-h-[60vw] overflow-hidden bg-[var(--bg-panel)] md:min-h-0">
          <Image
            src="/images/hero-living-room.jpg"
            alt="Modern minimalist living room with grey sofa and large window"
            fill
            priority
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
      </section>

      {/* Journey */}
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
              {STAGES.map((stage, i) => (
                <div
                  key={stage.n}
                  className="relative grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-18"
                >
                  <div
                    className={`absolute top-1/2 left-1/2 z-10 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--bg)] font-serif-display text-base text-[var(--accent)] italic md:flex`}
                  >
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
                  </div>
                  <div className={`relative aspect-4/3 overflow-hidden bg-[var(--bg-panel)] ${i % 2 === 1 ? "md:order-1" : ""}`}>
                    <Image
                      src={stage.image}
                      alt={stage.alt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founder teaser */}
      <section className="border-y border-[var(--line)] bg-[var(--bg-panel)] py-10">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-6 px-6">
          <div className="flex items-center gap-5">
            <div className="font-serif-display flex h-16 w-16 flex-none items-center justify-center rounded-full bg-[var(--ink)] text-lg text-[var(--bg)] italic">
              BY
            </div>
            <p className="max-w-[46ch] text-[var(--ink-soft)]">
              Founded by <strong className="text-[var(--ink)]">Billy Yeap</strong> under Istory
              Design Studio (SSM Reg. No. SA0647003-M) — a real, registered studio, not just a
              WhatsApp number.
            </p>
          </div>
          <Link
            href="/about"
            className="border-b border-[var(--taupe)] text-sm whitespace-nowrap hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Read Our Story →
          </Link>
        </div>
      </section>

      {/* Mood grid */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto mb-14 max-w-[48ch] text-center">
            <span className="mb-3 block text-sm font-semibold text-[var(--accent)]">
              What We Design Toward
            </span>
            <h2 className="font-serif-display text-2xl font-semibold text-balance sm:text-3xl">
              The feeling every space should have
            </h2>
          </div>
          <div className="grid h-auto grid-cols-1 gap-4 sm:h-[520px] sm:grid-cols-[1.3fr_1fr] sm:grid-rows-2">
            <div className="relative h-64 overflow-hidden sm:row-span-2 sm:h-auto">
              <Image
                src="/images/mood-1.jpg"
                alt="Bright interior with natural light"
                fill
                className="object-cover"
                sizes="(min-width: 640px) 40vw, 100vw"
              />
            </div>
            <div className="relative h-64 overflow-hidden sm:h-auto">
              <Image
                src="/images/mood-2.jpg"
                alt="Modern minimalist studio apartment"
                fill
                className="object-cover"
                sizes="(min-width: 640px) 30vw, 100vw"
              />
            </div>
            <div className="relative h-64 overflow-hidden sm:h-auto">
              <Image
                src="/images/mood-3.jpg"
                alt="Modern apartment interior"
                fill
                className="object-cover"
                sizes="(min-width: 640px) 30vw, 100vw"
              />
            </div>
          </div>
          <p className="mt-5 text-center text-sm text-[var(--ink-soft)]">
            Reference imagery — our own project portfolio is in progress as current work is
            completed.
          </p>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="grid grid-cols-1 items-stretch md:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-20 md:px-16 lg:px-20">
          <span className="mb-3 block text-sm font-semibold text-[var(--accent)]">
            Let&apos;s Talk
          </span>
          <h2 className="font-serif-display mb-4 text-2xl font-semibold sm:text-3xl">
            Have a space in mind?
          </h2>
          <p className="mb-8 max-w-sm text-[var(--ink-soft)]">
            Whether it&apos;s a new home, an office fit-out, or a single room refresh — tell us
            about it.
          </p>
          <Link href="/contact" className="btn btn-primary w-fit">
            Book a Consultation
          </Link>
        </div>
        <div className="relative min-h-[46vw] overflow-hidden bg-[var(--bg-panel)] md:min-h-0">
          <Image
            src="/images/closing-living-room.jpg"
            alt="Spacious living room with minimalist furniture"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
      </section>
    </>
  );
}
