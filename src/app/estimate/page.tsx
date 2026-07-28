import type { Metadata } from "next";
import QuoteCalculator from "@/components/QuoteCalculator";

export const metadata: Metadata = {
  title: "Estimate",
  description:
    "Get a preliminary price range for your interior design project in Iskandar Puteri, Johor — instant estimate, no obligation.",
};

export default function EstimatePage() {
  return (
    <>
      <section className="border-b border-[var(--line)] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <span className="mb-4 block text-sm font-semibold text-[var(--accent)]">
            Get an Estimate
          </span>
          <h1 className="max-w-2xl text-3xl font-semibold sm:text-4xl">
            See a price range before you talk to us.
          </h1>
          <p className="mt-4 max-w-xl text-[var(--ink-soft)]">
            Adjust the inputs below for an instant, preliminary range. No account, no
            obligation — and it&apos;s not a fixed quote. Your exact price gets documented in a
            written contract after a free discovery consultation.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          <QuoteCalculator />
        </div>
      </section>
    </>
  );
}
