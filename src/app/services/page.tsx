import type { Metadata } from "next";
import Link from "next/link";
import { getLocale, getDictionary } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Residential, commercial, and renovation interior design services from Inzterior, Iskandar Puteri.",
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
