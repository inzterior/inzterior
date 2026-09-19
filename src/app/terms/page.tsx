import type { Metadata } from "next";
import { BASE_URL } from "@/lib/articles";
import Link from "next/link";
import { getLocale, getDictionary } from "@/lib/i18n";

export const metadata: Metadata = {
  title: { absolute: "Our Terms — Payment, Contract and Warranty" },
  description:
    "Our payment stages, contract terms and six-month warranty, published in full before you give us a phone number. The same terms apply to every client.",
  alternates: { canonical: `${BASE_URL}/terms` },
};

export default async function TermsPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const t = dict.terms;

  return (
    <>
      <section className="border-b border-[var(--line)] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <span className="mb-4 block text-sm font-semibold text-[var(--accent)]">
            {t.eyebrow}
          </span>
          <h1 className="max-w-3xl text-3xl font-semibold sm:text-4xl">{t.heading}</h1>
          <p className="mt-6 max-w-2xl text-[var(--ink-soft)]">{t.lead}</p>
        </div>
      </section>

      <section className="border-b border-[var(--line)] bg-[var(--bg-panel)] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-10">
            <span className="mb-2 block text-sm font-semibold text-[var(--accent)]">
              {t.paymentEyebrow}
            </span>
            <h2 className="text-2xl font-semibold sm:text-3xl">{t.paymentHeading}</h2>
          </div>
          <div className="divide-y divide-[var(--line)]">
            {dict.paymentStages.map((stage) => (
              <div key={stage.n} className="flex gap-6 py-7">
                <span className="min-w-[3rem] text-2xl font-semibold text-[var(--taupe)]">
                  {stage.n}
                </span>
                <div>
                  <h3 className="mb-1 text-lg font-semibold">{stage.title}</h3>
                  <p className="text-sm text-[var(--ink-soft)]">{stage.body}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-sm text-[var(--ink-soft)]">{t.paymentFootnote}</p>
          <div className="mt-8 border border-[var(--line)] bg-[var(--bg-card)] p-6">
            <p className="text-sm text-[var(--ink-soft)]">
              <strong className="text-[var(--ink)]">{t.contextBoxLabel}</strong>{" "}
              {t.contextBoxBody}
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--line)] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-10 sm:grid-cols-2">
            {t.cards.map((card) => (
              <div key={card.heading}>
                <span className="mb-2 block text-sm font-semibold text-[var(--accent)]">
                  {card.eyebrow}
                </span>
                <h3 className="mb-2 text-xl font-semibold">{card.heading}</h3>
                <p className="text-sm text-[var(--ink-soft)]">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--line)] bg-[var(--bg-panel)] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <span className="mb-2 block text-sm font-semibold text-[var(--accent)]">
            {t.legalEyebrow}
          </span>
          <h2 className="mb-6 text-2xl font-semibold sm:text-3xl">{t.legalHeading}</h2>
          <p className="max-w-2xl text-[var(--ink-soft)]">{t.legalP1}</p>
          <p className="mt-4 max-w-2xl text-[var(--ink-soft)]">
            {t.legalP2Part1}
            <a
              href="https://www.ssm-einfo.my/"
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-[var(--ink)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {t.legalP2LinkText}
            </a>
            {t.legalP2Part2}
          </p>
          <div className="mt-8 border border-[var(--line)] bg-[var(--bg-card)] p-6">
            <p className="text-sm text-[var(--ink-soft)]">
              <strong className="text-[var(--ink)]">{t.goodToKnowLabel}</strong>{" "}
              {t.goodToKnowBody}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 text-center">
        <div className="mx-auto max-w-5xl px-6">
          <span className="mb-2 block text-sm font-semibold text-[var(--accent)]">
            {t.closingEyebrow}
          </span>
          <h2 className="text-2xl font-semibold sm:text-3xl">{t.closingHeading}</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-[var(--ink-soft)]">{t.closingLead}</p>
          <Link href="/contact" className="btn btn-primary mt-8">
            {t.closingButton}
          </Link>
        </div>
      </section>
    </>
  );
}
