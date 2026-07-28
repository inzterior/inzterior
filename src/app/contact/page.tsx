import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a consultation with Inzterior, an Iskandar Puteri interior design studio. Email inquiry@inzterior.com.",
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-[var(--line)] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <span className="mb-4 block text-sm font-semibold text-[var(--accent)]">
            Get in Touch
          </span>
          <h1 className="max-w-2xl text-3xl font-semibold sm:text-4xl">
            Let&apos;s talk about your space.
          </h1>
          <p className="mt-4 max-w-xl text-[var(--ink-soft)]">
            Tell us a bit about your project and we&apos;ll get back to you to arrange a
            discovery consultation.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-5xl gap-14 px-6 sm:grid-cols-[1fr_1.2fr]">
          <div>
            <div className="border-t border-[var(--line)] py-5">
              <span className="mb-1 block text-sm font-semibold text-[var(--accent)]">
                Email
              </span>
              <a href="mailto:inquiry@inzterior.com">inquiry@inzterior.com</a>
            </div>
            <div className="border-t border-[var(--line)] py-5">
              <span className="mb-1 block text-sm font-semibold text-[var(--accent)]">
                Studio Location
              </span>
              <span>No. 58A, Jalan Eka 3, Horizon Hills, 79100 Iskandar Puteri, Johor, Malaysia</span>
            </div>
            <div className="border-y border-[var(--line)] py-5">
              <span className="mb-1 block text-sm font-semibold text-[var(--accent)]">
                Response Time
              </span>
              <span>We typically reply within 1–2 business days.</span>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
