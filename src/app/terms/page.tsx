import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Terms",
  description:
    "How Inzterior structures payments, contracts, warranty, and legal identity — published before you ever pick up the phone. SSM Reg. No. SA0647003-M.",
};

const PAYMENT_STAGES = [
  {
    n: 1,
    title: "Design Deposit (~10%)",
    body: "Starts the design phase. This is the only payment due before any design work begins — nothing is asked for upfront beyond it.",
  },
  {
    n: 2,
    title: "Design Sign-off",
    body: "Due once you've approved the final design and material selections — not before.",
  },
  {
    n: 3,
    title: "Materials & Carpentry",
    body: "Due when materials are ordered and carpentry production begins.",
  },
  {
    n: 4,
    title: "On-Site Installation",
    body: "Due as on-site work is carried out — matched to what's physically been installed.",
  },
  {
    n: 5,
    title: "Handover",
    body: "The final payment, due at practical completion and handover of the finished space.",
  },
];

export default function TermsPage() {
  return (
    <>
      <section className="border-b border-[var(--line)] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <span className="mb-4 block text-sm font-semibold text-[var(--accent)]">
            Our Terms
          </span>
          <h1 className="max-w-3xl text-3xl font-semibold sm:text-4xl">
            You can read our payment structure, contract terms, and warranty right now —
            before you give us your phone number.
          </h1>
          <p className="mt-6 max-w-2xl text-[var(--ink-soft)]">
            Every other decision about your project is personal — the layout, the materials,
            the budget. These aren&apos;t. They&apos;re the same for every client, published
            here, and written into your contract before any work beyond the design deposit
            begins.
          </p>
        </div>
      </section>

      <section className="border-b border-[var(--line)] bg-[var(--bg-panel)] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-10">
            <span className="mb-2 block text-sm font-semibold text-[var(--accent)]">
              Payment Structure
            </span>
            <h2 className="text-2xl font-semibold sm:text-3xl">
              How payments work, stage by stage
            </h2>
          </div>
          <div className="divide-y divide-[var(--line)]">
            {PAYMENT_STAGES.map((stage) => (
              <div key={stage.n} className="flex gap-6 py-7">
                <span className="min-w-[3rem] text-2xl font-semibold text-[var(--taupe)]">
                  {stage.n}
                </span>
                <div>
                  <h3 className="mb-1 text-lg font-semibold">{stage.title}</h3>
                  <p className="text-sm text-[var(--ink-soft)]">{stage.body}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-sm text-[var(--ink-soft)]">
            The exact percentage for each stage is set out in your project&apos;s written
            contract, calculated against your total project value once we&apos;ve scoped the
            work — so you know what&apos;s due, and why, before you ever pay it.
          </p>
          <div className="mt-8 border border-[var(--line)] bg-[var(--bg-card)] p-6">
            <p className="text-sm text-[var(--ink-soft)]">
              <strong className="text-[var(--ink)]">For context:</strong> Singapore&apos;s
              strictest renovation consumer-protection scheme caps deposits at 20% of project
              value. Malaysia has no equivalent scheme — deposits asked upfront, before any
              contract is signed, are often well above that. Our design deposit is roughly
              half of Singapore&apos;s cap, and released in stages tied to what&apos;s actually
              been done, not a fixed calendar date.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--line)] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <span className="mb-2 block text-sm font-semibold text-[var(--accent)]">
                Written Contract
              </span>
              <h3 className="mb-2 text-xl font-semibold">
                Everything in writing, before you commit
              </h3>
              <p className="text-sm text-[var(--ink-soft)]">
                Scope, materials, and timeline are documented in a written contract before any
                work begins beyond the design deposit. Nothing about your project is agreed
                over WhatsApp or a phone call alone.
              </p>
            </div>
            <div>
              <span className="mb-2 block text-sm font-semibold text-[var(--accent)]">
                Progress Transparency
              </span>
              <h3 className="mb-2 text-xl font-semibold">You&apos;ll see it as it happens</h3>
              <p className="text-sm text-[var(--ink-soft)]">
                Photo and video updates at every milestone — not just a single reveal at the
                end. This is a standard part of how a project runs with us, not a favour.
              </p>
            </div>
            <div>
              <span className="mb-2 block text-sm font-semibold text-[var(--accent)]">
                Defects Warranty
              </span>
              <h3 className="mb-2 text-xl font-semibold">
                We&apos;re still on the hook after handover
              </h3>
              <p className="text-sm text-[var(--ink-soft)]">
                For 6 months after handover, we return to fix workmanship issues — problems
                with how something was installed or finished — at no extra cost. This doesn&apos;t
                cover normal wear and tear, or damage caused after handover.
              </p>
            </div>
            <div>
              <span className="mb-2 block text-sm font-semibold text-[var(--accent)]">
                Changes & Variations
              </span>
              <h3 className="mb-2 text-xl font-semibold">Changes are still written down</h3>
              <p className="text-sm text-[var(--ink-soft)]">
                If you want to change something after the contract is signed, we document the
                change and its cost impact in writing and get your approval before proceeding
                — no invoices for changes you didn&apos;t agree to.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--line)] bg-[var(--bg-panel)] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <span className="mb-2 block text-sm font-semibold text-[var(--accent)]">
            Legal Identity
          </span>
          <h2 className="mb-6 text-2xl font-semibold sm:text-3xl">A real, registered business</h2>
          <p className="max-w-2xl text-[var(--ink-soft)]">
            Inzterior is the trading name of Istory Design Studio, a business registered with
            the Companies Commission of Malaysia (SSM Reg. No. SA0647003-M), based in Horizon
            Hills, Iskandar Puteri, Johor — a real address, not just a Facebook page and a
            WhatsApp number.
          </p>
          <p className="mt-4 max-w-2xl text-[var(--ink-soft)]">
            You can verify this registration yourself, independently of anything we tell you,
            via{" "}
            <a
              href="https://www.ssm-einfo.my/"
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-[var(--ink)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              SSM e-Info
            </a>
            , the official company search portal of Suruhanjaya Syarikat Malaysia (SSM).
          </p>
          <div className="mt-8 border border-[var(--line)] bg-[var(--bg-card)] p-6">
            <p className="text-sm text-[var(--ink-soft)]">
              <strong className="text-[var(--ink)]">Good to know:</strong> Istory Design
              Studio is registered as a sole proprietorship — not a private limited company
              (Sdn Bhd). What that means for you as a client: with a Sdn Bhd, limited
              liability protects the owner if something goes wrong, not the customer. Your
              actual protection comes from the payment structure above — because payments are
              staged and released against completed work, your exposure at any point in the
              project is capped by the schedule, regardless of what kind of company you&apos;re
              dealing with.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 text-center">
        <div className="mx-auto max-w-5xl px-6">
          <span className="mb-2 block text-sm font-semibold text-[var(--accent)]">
            Questions About This
          </span>
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Ask us anything before you sign anything
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-[var(--ink-soft)]">
            None of this is meant to replace a conversation — it&apos;s meant to make that
            conversation start from the same page.
          </p>
          <Link href="/contact" className="btn btn-primary mt-8">
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
