import Image from "next/image";
import Link from "next/link";
import ProcessTimeline from "@/components/ProcessTimeline";
import { getLocale, getDictionary } from "@/lib/i18n";

export default async function Home() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const t = dict.home;

  return (
    <>
      {/* Hero */}
      <section className="grid min-h-[560px] grid-cols-1 items-stretch md:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-14 md:px-16 lg:px-20">
          <span className="mb-5 block text-sm font-semibold text-[var(--accent)]">
            {t.eyebrow}
          </span>
          <h1 className="font-serif-display mb-6 max-w-[13ch] text-4xl leading-[1.1] font-semibold text-balance sm:text-5xl">
            {t.headingPart1}{" "}
            <em className="font-serif-display font-normal text-[var(--accent)] not-italic italic">
              {t.headingEmphasis}
            </em>{" "}
            {t.headingPart2}
          </h1>
          <p className="mb-8 max-w-md text-[var(--ink-soft)]">{t.lead}</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/contact" className="btn btn-primary">
              {t.ctaPrimary}
            </Link>
            <a
              href="#journey"
              className="border-b border-[var(--taupe)] text-sm hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {t.ctaSecondary}
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

      {/* Trust bar */}
      <section className="border-y border-[var(--line)] bg-[var(--bg-panel)] py-5">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-2.5 px-6 sm:gap-3">
          {t.trustBar.map((point) => (
            <span
              key={point}
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--bg)] px-3.5 py-1.5 text-xs font-semibold text-[var(--ink-soft)] sm:text-sm"
            >
              <span className="text-[var(--accent)]" aria-hidden>
                ✓
              </span>
              {point}
            </span>
          ))}
        </div>
      </section>

      {/* Journey */}
      <ProcessTimeline dict={dict.processTimeline} paymentStages={dict.paymentStages} />

      {/* Founder teaser */}
      <section className="border-y border-[var(--line)] bg-[var(--bg-panel)] py-10">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-6 px-6">
          <div className="flex items-center gap-5">
            <div className="font-serif-display flex h-16 w-16 flex-none items-center justify-center rounded-full bg-[var(--ink)] text-lg text-[var(--bg)] italic">
              {t.founderBadge}
            </div>
            <p className="max-w-[46ch] text-[var(--ink-soft)]">
              {t.founderTextPart1} <strong className="text-[var(--ink)]">{t.founderName}</strong>{" "}
              {t.founderTextPart2}
            </p>
          </div>
          <Link
            href="/about"
            className="border-b border-[var(--taupe)] text-sm whitespace-nowrap hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            {t.founderCta}
          </Link>
        </div>
      </section>

      {/* Mood grid */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto mb-14 max-w-[48ch] text-center">
            <span className="mb-3 block text-sm font-semibold text-[var(--accent)]">
              {t.moodEyebrow}
            </span>
            <h2 className="font-serif-display text-2xl font-semibold text-balance sm:text-3xl">
              {t.moodHeading}
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
          <p className="mt-5 text-center text-sm text-[var(--ink-soft)]">{t.moodCaption}</p>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="grid grid-cols-1 items-stretch md:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-20 md:px-16 lg:px-20">
          <span className="mb-3 block text-sm font-semibold text-[var(--accent)]">
            {t.closingEyebrow}
          </span>
          <h2 className="font-serif-display mb-4 text-2xl font-semibold sm:text-3xl">
            {t.closingHeading}
          </h2>
          <p className="mb-8 max-w-sm text-[var(--ink-soft)]">{t.closingLead}</p>
          <Link href="/contact" className="btn btn-primary w-fit">
            {t.closingCta}
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
