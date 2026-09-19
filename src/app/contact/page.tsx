import type { Metadata } from "next";
import { BASE_URL } from "@/lib/articles";
import ContactForm from "@/components/ContactForm";
import { getLocale, getDictionary } from "@/lib/i18n";

export const metadata: Metadata = {
  title: { absolute: "Contact Inzterior — Interior Design, Iskandar Puteri" },
  description:
    "Book a free discovery consultation for a Johor Bahru or Iskandar Puteri project. Email inquiry@inzterior.com or send the enquiry form on this page.",
  alternates: { canonical: `${BASE_URL}/contact` },
};

export default async function ContactPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const t = dict.contact;

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
        <div className="mx-auto grid max-w-5xl gap-14 px-6 sm:grid-cols-[1fr_1.2fr]">
          <div>
            <div className="border-t border-[var(--line)] py-5">
              <span className="mb-1 block text-sm font-semibold text-[var(--accent)]">
                {t.emailLabel}
              </span>
              <a href="mailto:inquiry@inzterior.com">inquiry@inzterior.com</a>
            </div>
            <div className="border-t border-[var(--line)] py-5">
              <span className="mb-1 block text-sm font-semibold text-[var(--accent)]">
                {t.locationLabel}
              </span>
              <span>{t.locationValue}</span>
            </div>
            <div className="border-y border-[var(--line)] py-5">
              <span className="mb-1 block text-sm font-semibold text-[var(--accent)]">
                {t.responseLabel}
              </span>
              <span>{t.responseValue}</span>
            </div>
          </div>

          <ContactForm dict={dict.contactForm} />
        </div>
      </section>
    </>
  );
}
