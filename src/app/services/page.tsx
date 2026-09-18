import type { Metadata } from "next";
import { BASE_URL } from "@/lib/articles";
import Link from "next/link";
import { getLocale, getDictionary } from "@/lib/i18n";

export const metadata: Metadata = {
  title: { absolute: "Interior Design & Renovation Services in Johor Bahru" },
  description:
    "Residential, commercial and renovation work across Johor Bahru and Iskandar Puteri, scoped to the space rather than sold as a fixed package.",
  alternates: { canonical: `${BASE_URL}/services` },
};

export default async function ServicesPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const t = dict.services;

  return (
    <>
      <section className="border-b border-[var(--line)] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <span className="mb-4 block text-sm font-semibold text-[var(--accent)]">
            {t.eyebrow}
          </span>
          <h1 className="max-w-2xl text-3xl font-semibold sm:text-4xl">{t.heading}</h1>
          <p className="mt-4 max-w-xl text-[var(--ink-soft)]">{t.lead}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-5xl gap-8 px-6 sm:grid-cols-2">
          {t.items.map((s) => (
            <div key={s.title} className="border border-[var(--line)] p-8">
              <h3 className="mb-2 text-lg font-semibold">{s.title}</h3>
              <p className="text-sm text-[var(--ink-soft)]">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contextual links into the guides that explain what each service involves. */}
      <section className="border-t border-[var(--line)] py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-xl font-semibold">{t.readingHeading}</h2>
          <p className="mt-2 max-w-xl text-[var(--ink-soft)]">{t.readingLead}</p>
          <ul className="mt-6 flex flex-col gap-3">
            <li>
              <Link
                href="/articles/interior-designer-vs-contractor-malaysia"
                className="border-b border-[var(--taupe)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                Interior designer or contractor-only: which route suits your job
              </Link>
            </li>
            <li>
              <Link
                href="/articles/interior-design-contract-guide-malaysia"
                className="border-b border-[var(--taupe)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                What belongs in a Malaysian interior design contract
              </Link>
            </li>
            <li>
              <Link
                href="/articles/renovation-timeline-malaysia"
                className="border-b border-[var(--taupe)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                How long a renovation really takes in Malaysia
              </Link>
            </li>
            <li>
              <Link
                href="/articles/renovation-permit-johor-bahru"
                className="border-b border-[var(--taupe)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                Renovation permits in Johor Bahru: which of the four councils covers you
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="border-t border-[var(--line)] bg-[var(--bg-panel)] py-20 text-center">
        <div className="mx-auto max-w-5xl px-6">
          <span className="mb-2 block text-sm font-semibold text-[var(--accent)]">
            {t.ctaEyebrow}
          </span>
          <h2 className="text-2xl font-semibold sm:text-3xl">{t.ctaHeading}</h2>
          <p className="mx-auto mt-4 max-w-md text-[var(--ink-soft)]">{t.ctaLead}</p>
          <Link href="/contact" className="btn btn-primary mt-8">
            {t.ctaButton}
          </Link>
        </div>
      </section>
    </>
  );
}
