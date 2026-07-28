import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the team behind Inzterior, an Iskandar Puteri interior design studio led by founder Billy Yeap under Istory Design Studio (SSM Reg. No. SA0647003-M).",
};

const TEAM = [
  {
    initials: "BY",
    name: "Billy Yeap",
    role: "Founder & Principal Designer",
    bio: "Billy started Inzterior to fix the trust problem he kept seeing in Malaysia's renovation industry — deposit-and-disappear contractors, vague scopes, and designers who were never properly registered. He leads every project's design direction and stays as the client's single point of contact from concept to handover.",
  },
];

const CRAFT = [
  {
    title: "Design",
    body: "Space planning, mood boards, and material selection tailored to how you actually live — not a template pulled off the shelf.",
  },
  {
    title: "Project Management",
    body: "One point of contact coordinates contractors, timelines, and milestone payments so nothing falls through the cracks.",
  },
  {
    title: "Site Execution",
    body: "A vetted network of contractors and tradespeople carries out the work, with progress documented in photos and video at every stage.",
  },
];

export default function TeamPage() {
  return (
    <>
      <section className="border-b border-[var(--line)] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <span className="mb-4 block text-sm font-semibold text-[var(--accent)]">
            Our Team
          </span>
          <h1 className="max-w-3xl text-3xl font-semibold sm:text-4xl">
            The people behind every project
          </h1>
          <p className="mt-6 max-w-2xl text-[var(--ink-soft)]">
            Inzterior operates under the registered business Istory Design Studio (SSM Reg. No.
            SA0647003-M), based in Horizon Hills, Iskandar Puteri. Every project is led by a
            single point of contact, backed by a vetted network of contractors and tradespeople.
          </p>
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
              How We Work
            </span>
            <h2 className="text-2xl font-semibold sm:text-3xl">
              A small team, a clear process
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {CRAFT.map((c) => (
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
            Get in Touch
          </span>
          <h2 className="text-2xl font-semibold sm:text-3xl">Let&apos;s talk about your space</h2>
          <Link href="/contact" className="btn btn-primary mt-8">
            Book a Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
