import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Inzterior is an Iskandar Puteri interior design studio built on written contracts and staged payments, founded by Billy Yeap, operating as Istory Design Studio (SSM Reg. No. SA0647003-M).",
};

const TRUST_POINTS = [
  {
    n: 1,
    title: "A Written Contract",
    body: "Scope, materials, and timeline are documented before any work begins beyond the initial design deposit — no verbal promises.",
  },
  {
    n: 2,
    title: "Staged Payments",
    body: "A small deposit starts the design phase. Further payments are released only against completed milestones — you never pay in full for work that hasn't happened.",
  },
  {
    n: 3,
    title: "Progress You Can See",
    body: "Photo and video updates at every milestone, not just a single reveal at the end.",
  },
  {
    n: 4,
    title: "A Defects Warranty",
    body: 'A fixed warranty period after handover covers workmanship issues — the project isn\'t "done" the moment you pay the final invoice.',
  },
  {
    n: 5,
    title: "A Real, Registered Business",
    body: "SSM Reg. No. SA0647003-M and a real studio address in Horizon Hills, Iskandar Puteri — not just a Facebook page and a WhatsApp number.",
  },
];

const BELIEFS = [
  {
    title: "Function First",
    body: "A beautiful room that doesn't work for your daily routine isn't good design — we plan for real life before we plan for looks.",
  },
  {
    title: "Transparent Process",
    body: "Itemised quotes, clear timelines, and one point of contact from concept to handover — no vague scopes or hidden costs.",
  },
  {
    title: "Built for Malaysia",
    body: "Climate, space constraints, and local sourcing shape every recommendation — not imported templates that don't fit the context.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-[var(--line)] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <span className="mb-4 block text-sm font-semibold text-[var(--accent)]">
            About Inzterior
          </span>
          <h1 className="max-w-3xl text-3xl font-semibold sm:text-4xl">
            Malaysia&apos;s interior design industry has a trust problem. Here&apos;s how
            we&apos;re different.
          </h1>
          <p className="mt-6 max-w-2xl text-[var(--ink-soft)]">
            Deposit-and-disappear contractors, half-finished renovations, designers who were
            never properly registered — these stories are common enough that many homeowners
            delay renovating altogether just to avoid the risk. Billy Yeap started Inzterior to
            be the opposite of that.
          </p>
          <p className="mt-4 max-w-2xl text-[var(--ink-soft)]">
            Every project runs on a written contract before a ringgit changes hands beyond a
            small design deposit. Payments are staged to match actual progress — you pay for
            what&apos;s been built, not what&apos;s been promised. The studio operates under the
            registered business Istory Design Studio (SSM Reg. No. SA0647003-M), trading
            publicly as Inzterior — a real, registered business with a real address in Horizon
            Hills, Iskandar Puteri.
          </p>
        </div>
      </section>

      <section className="border-b border-[var(--line)] bg-[var(--bg-panel)] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-10">
            <span className="mb-2 block text-sm font-semibold text-[var(--accent)]">
              How We Protect You
            </span>
            <h2 className="text-2xl font-semibold sm:text-3xl">
              Five things every client gets, no exceptions
            </h2>
          </div>
          <div className="divide-y divide-[var(--line)]">
            {TRUST_POINTS.map((point) => (
              <div key={point.n} className="flex gap-6 py-7">
                <span className="min-w-[3rem] text-2xl font-semibold text-[var(--taupe)]">
                  {point.n}
                </span>
                <div>
                  <h3 className="mb-1 text-lg font-semibold">{point.title}</h3>
                  <p className="text-sm text-[var(--ink-soft)]">{point.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12 text-center">
            <span className="mb-2 block text-sm font-semibold text-[var(--accent)]">
              What We Believe
            </span>
            <h2 className="text-2xl font-semibold sm:text-3xl">
              Design should serve how you live, not the other way around
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {BELIEFS.map((b) => (
              <div key={b.title} className="border border-[var(--line)] p-8">
                <h3 className="mb-2 text-lg font-semibold">{b.title}</h3>
                <p className="text-sm text-[var(--ink-soft)]">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--line)] py-20 text-center">
        <div className="mx-auto max-w-5xl px-6">
          <span className="mb-2 block text-sm font-semibold text-[var(--accent)]">
            Get in Touch
          </span>
          <h2 className="text-2xl font-semibold sm:text-3xl">Let&apos;s talk about your space</h2>
          <Link href="/contact" className="btn btn-primary mt-8">
            Book a Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
