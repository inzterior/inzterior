import type { Metadata } from "next";
import QuoteCalculator from "@/components/QuoteCalculator";
import { getLocale, getDictionary } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Estimate",
  description:
    "Get a preliminary price range for your interior design project in Iskandar Puteri, Johor — instant estimate, no obligation.",
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
