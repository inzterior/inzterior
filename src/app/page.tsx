import Image from "next/image";
import Link from "next/link";
import ProcessTimeline from "@/components/ProcessTimeline";

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
      <ProcessTimeline />

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
