import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Inzterior collects, uses, and protects personal data submitted through this website, under Malaysia's Personal Data Protection Act 2010.",
};

const SECTIONS = [
  {
    title: "1. Who this applies to",
    body: (
      <p>
        This Privacy Policy explains how Istory Design Studio, trading as Inzterior (SSM Reg.
        No. SA0647003-M, &ldquo;we&rdquo;, &ldquo;us&rdquo;), collects and handles personal
        data when you use <strong className="text-[var(--ink)]">inzterior.com</strong>. We
        process personal data in line with Malaysia&apos;s Personal Data Protection Act 2010
        (PDPA).
      </p>
    ),
  },
  {
    title: "2. What we collect",
    body: (
      <>
        <p>
          <strong className="text-[var(--ink)]">Information you give us directly</strong> —
          when you use the contact form or the estimate calculator, we collect what you enter:
          typically your name, email address, phone number, and details about your project
          (space type, size, budget range, timeline).
        </p>
        <p className="mt-4">
          <strong className="text-[var(--ink)]">Information collected automatically</strong> —
          this Site uses Vercel Analytics and Vercel Speed Insights to understand traffic
          patterns and page performance. These tools collect aggregated, privacy-preserving
          usage data (such as page views and load times) and do not use cookies to track you
          individually across other sites.
        </p>
      </>
    ),
  },
  {
    title: "3. How we use it",
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>To respond to enquiries submitted through the contact form.</li>
        <li>To prepare indicative estimates or follow up on quote requests.</li>
        <li>To understand how the Site is used, so we can improve it.</li>
        <li>To meet legal or regulatory obligations where applicable.</li>
      </ul>
    ),
  },
  {
    title: "4. Who we share it with",
    body: (
      <p>
        We don&apos;t sell or rent your personal data. We share it only where necessary to
        operate — for example, with the email and hosting providers that deliver contact form
        submissions to us — and never for their independent marketing use. We don&apos;t
        transfer your data outside Malaysia except where our service providers (such as our
        hosting provider) process it as part of delivering their service.
      </p>
    ),
  },
  {
    title: "5. How long we keep it",
    body: (
      <p>
        We keep enquiry and project data for as long as reasonably needed to respond to you,
        deliver a project, and meet accounting or legal record-keeping obligations —
        after which it&apos;s deleted or anonymised.
      </p>
    ),
  },
  {
    title: "6. Your rights",
    body: (
      <p>
        Under the PDPA, you can ask us to access, correct, or delete the personal data we hold
        about you, and to withdraw consent for us to contact you. To do this, email{" "}
        <a href="mailto:inquiry@inzterior.com" className="border-b border-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)]">
          inquiry@inzterior.com
        </a>
        . We&apos;ll respond within a reasonable time.
      </p>
    ),
  },
  {
    title: "7. Security",
    body: (
      <p>
        We take reasonable technical and organisational steps to protect the personal data we
        hold, but no method of transmission or storage is completely secure — we can&apos;t
        guarantee absolute security.
      </p>
    ),
  },
  {
    title: "8. Changes to this policy",
    body: (
      <p>
        We may update this Privacy Policy from time to time. Changes take effect once posted
        on this page.
      </p>
    ),
  },
  {
    title: "9. Contact",
    body: (
      <p>
        Questions about this policy, or requests relating to your personal data, can be sent
        to{" "}
        <a href="mailto:inquiry@inzterior.com" className="border-b border-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)]">
          inquiry@inzterior.com
        </a>
        .
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="border-b border-[var(--line)] py-20">
        <div className="mx-auto max-w-3xl px-6">
          <span className="mb-4 block text-sm font-semibold text-[var(--accent)]">
            Legal
          </span>
          <h1 className="text-3xl font-semibold sm:text-4xl">Privacy Policy</h1>
          <p className="mt-4 text-sm text-[var(--ink-soft)]">Last updated: 30 July 2026</p>
          <p className="mt-6 max-w-2xl text-[var(--ink-soft)]">
            This page is a general template and hasn&apos;t yet been reviewed by a Malaysian
            lawyer — treat it as a placeholder pending that review, not final legal advice.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="flex flex-col gap-10">
            {SECTIONS.map((section) => (
              <div key={section.title}>
                <h2 className="mb-3 text-lg font-semibold">{section.title}</h2>
                <div className="max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">
                  {section.body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
