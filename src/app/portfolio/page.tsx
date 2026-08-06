import type { Metadata } from "next";
import PortfolioGallery from "@/components/PortfolioGallery";
import { getLocale, getDictionary } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Concept studies and active project direction from Inzterior — residential and commercial interior design across Iskandar Puteri, Johor.",
};

export default async function PortfolioPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const t = dict.portfolio;

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

      <PortfolioGallery dict={dict.portfolioGallery} />
    </>
  );
}
