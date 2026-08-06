import type { Metadata } from "next";
import { getLocale, getDictionary } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Inzterior collects, uses, and protects personal data submitted through this website, under Malaysia's Personal Data Protection Act 2010.",
};

export default async function PrivacyPolicyPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const t = dict.privacyPolicy;

  return (
    <>
      <section className="border-b border-[var(--line)] py-20">
        <div className="mx-auto max-w-3xl px-6">
          <span className="mb-4 block text-sm font-semibold text-[var(--accent)]">
            {t.eyebrow}
          </span>
          <h1 className="text-3xl font-semibold sm:text-4xl">{t.title}</h1>
          <p className="mt-4 text-sm text-[var(--ink-soft)]">{t.lastUpdated}</p>
          <p className="mt-6 max-w-2xl text-[var(--ink-soft)]">{t.intro}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="flex flex-col gap-10">
            {t.sections.map((section) => (
              <div key={section.title}>
                <h2 className="mb-3 text-lg font-semibold">{section.title}</h2>
                <div className="max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">
                  {section.paragraphs.map((p, i) => (
                    <p key={i} className={i > 0 ? "mt-4" : undefined}>
                      {p}
                    </p>
                  ))}
                  {section.list.length > 0 && (
                    <ul className="list-disc space-y-2 pl-5">
                      {section.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {section.linkParagraph && (
                    <p
                      className={
                        section.paragraphs.length > 0 || section.list.length > 0
                          ? "mt-4"
                          : undefined
                      }
                    >
                      {section.linkParagraph.before}
                      <a
                        href={section.linkParagraph.href}
                        className="border-b border-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                      >
                        {section.linkParagraph.linkText}
                      </a>
                      {section.linkParagraph.after}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
