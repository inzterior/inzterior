import type { Metadata } from "next";
import { BASE_URL } from "@/lib/articles";
import QuoteCalculator from "@/components/QuoteCalculator";
import { getLocale, getDictionary } from "@/lib/i18n";

export const metadata: Metadata = {
  title: { absolute: "Renovation Cost Estimate for Johor Bahru Homes" },
  description:
    "A preliminary ringgit range for your Johor Bahru or Iskandar Puteri project, calculated on this page. No obligation, and no phone number required.",
  alternates: { canonical: `${BASE_URL}/estimate` },
};

export default async function EstimatePage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const t = dict.estimate;

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
        <div className="mx-auto max-w-5xl px-6">
          <QuoteCalculator dict={dict.quoteCalculator} />
        </div>
      </section>
    </>
  );
}
