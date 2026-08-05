import type { Metadata } from "next";
import PortfolioGallery from "@/components/PortfolioGallery";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Concept studies and active project direction from Inzterior — residential and commercial interior design across Iskandar Puteri, Johor.",
};

export default function PortfolioPage() {
  return (
    <>
      <section className="border-b border-[var(--line)] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <span className="mb-4 block text-sm font-semibold text-[var(--accent)]">
            Design Direction
          </span>
          <h1 className="max-w-2xl text-3xl font-semibold sm:text-4xl">
            The concept work behind every Inzterior project.
          </h1>
          <p className="mt-4 max-w-xl text-[var(--ink-soft)]">
            These are concept studies — the aesthetic direction and spatial thinking that shape
            how we approach a space, published while our first completed Iskandar Puteri
            projects are still underway. Full project documentation is on its way.
          </p>
        </div>
      </section>

      <PortfolioGallery />
    </>
  );
}
