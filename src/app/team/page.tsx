import type { Metadata } from "next";
import Link from "next/link";
import { getLocale, getDictionary } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the team behind Inzterior, an Iskandar Puteri interior design studio led by founder Billy Yeap under Istory Design Studio (SSM Reg. No. SA0647003-M).",
};

export default async function TeamPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const t = dict.team;

  const TEAM = [
    {
      initials: "BY",
      name: "Billy Yeap",
      role: "Founder & Principal Designer",
      bio: "Billy started Inzterior to fix the trust problem he kept seeing in Malaysia's renovation industry — deposit-and-disappear contractors, vague scopes, and designers who were never properly registered. He leads every project's design direction and stays as the client's single point of contact from concept to handover.",
    },
    {
      initials: "JY",
      name: "Jackie Yap",
      role: "Co-founder",
      // Placeholder — Billy and Jackie will supply the real bio copy later.
      bio: "Jackie co-founded Inzterior alongside Billy, bringing the same commitment to transparent, well-documented renovation projects across Iskandar Puteri and Johor Bahru.",
    },
  ];

  return (
    <>
      <section className="border-b border-[var(--line)] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <span className="mb-4 block text-sm font-semibold text-[var(--accent)]">
            {t.eyebrow}
          </span>
          <h1 className="max-w-3xl text-3xl font-semibold sm:text-4xl">{t.heading}</h1>
          <p className="mt-6 max-w-2xl text-[var(--ink-soft)]">{t.lead}</p>
        </div>
      </section>

      <section className="border-b border-[var(--line)] bg-[var(--bg-panel)] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="divide-y divide-[var(--line)]">
            {TEAM.map((member) => (
              <div key={member.name} className="flex flex-col gap-6 py-10 sm:flex-row">
                <div className="font-serif-display flex h-20 w-20 flex-none items-center justify-center rounded-full bg-[var(--ink)] text-xl text-[var(--bg)] italic">
                  {member.initials}
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{member.name}</h2>
                  <span className="mb-3 block text-sm font-semibold text-[var(--accent)]">
                    {member.role}
                  </span>
                  <p className="max-w-2xl text-sm text-[var(--ink-soft)]">{member.bio}</p>
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
              {t.craftEyebrow}
            </span>
            <h2 className="text-2xl font-semibold sm:text-3xl">{t.craftHeading}</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {t.craft.map((c) => (
              <div key={c.title} className="border border-[var(--line)] p-8">
                <h3 className="mb-2 text-lg font-semibold">{c.title}</h3>
                <p className="text-sm text-[var(--ink-soft)]">{c.body}</p>
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
