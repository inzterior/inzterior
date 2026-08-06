import type { Metadata } from "next";
import Link from "next/link";
import { getLocale, getDictionary } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "About",
  description:
    "Inzterior is an Iskandar Puteri interior design studio built on written contracts and staged payments, founded by Billy Yeap, operating as Istory Design Studio (SSM Reg. No. SA0647003-M).",
};

export default async function AboutPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const t = dict.about;

  return (
    <>
      <section className="border-b border-[var(--line)] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <span className="mb-4 block text-sm font-semibold text-[var(--accent)]">
            {t.eyebrow}
          </span>
          <h1 className="max-w-3xl text-3xl font-semibold sm:text-4xl">{t.heading}</h1>
          <p className="mt-6 max-w-2xl text-[var(--ink-soft)]">{t.p1}</p>
          <p className="mt-4 max-w-2xl text-[var(--ink-soft)]">{t.p2}</p>
        </div>
      </section>

      <section className="border-b border-[var(--line)] bg-[var(--bg-panel)] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-10">
            <span className="mb-2 block text-sm font-semibold text-[var(--accent)]">
              {t.section2Eyebrow}
            </span>
            <h2 className="text-2xl font-semibold sm:text-3xl">{t.section2Heading}</h2>
          </div>
          <div className="divide-y divide-[var(--line)]">
            {t.trustPoints.map((point) => (
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
              {t.section3Eyebrow}
            </span>
            <h2 className="text-2xl font-semibold sm:text-3xl">{t.section3Heading}</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {t.beliefs.map((b) => (
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
            {t.closingEyebrow}
          </span>
          <h2 className="text-2xl font-semibold sm:text-3xl">{t.closingHeading}</h2>
          <Link href="/contact" className="btn btn-primary mt-8">
            {t.closingButton}
          </Link>
        </div>
      </section>
    </>
  );
}
