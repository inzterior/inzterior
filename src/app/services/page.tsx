import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Residential, commercial, and renovation interior design services from Inzterior, Iskandar Puteri.",
};

const SERVICES = [
  {
    title: "Residential Design",
    body: "Full-home and single-room interiors for condos, landed homes, and renovations — layout, materials, furniture, and styling.",
  },
  {
    title: "Commercial & Office Design",
    body: "Retail, F&B, and office fit-outs designed around brand, workflow, and how customers or staff move through the space.",
  },
  {
    title: "Renovation & Turnkey Delivery",
    body: "End-to-end project management — contractor coordination, site supervision, and timeline management so you have one point of contact.",
  },
  {
    title: "Space Planning & 3D Visualization",
    body: "Floor plan optimisation and photorealistic 3D renders, so you can see and approve the design before construction starts.",
  },
  {
    title: "Furniture & Styling",
    body: "Sourcing, custom carpentry coordination, and final styling — the details that make a finished space feel complete.",
  },
  {
    title: "Design Consultation",
    body: "A single paid consultation for homeowners who want expert direction without committing to a full project yet.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-[var(--line)] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <span className="mb-4 block text-sm font-semibold text-[var(--accent)]">
            What We Do
          </span>
          <h1 className="max-w-2xl text-3xl font-semibold sm:text-4xl">
            Full-service interior design, from first sketch to final styling.
          </h1>
          <p className="mt-4 max-w-xl text-[var(--ink-soft)]">
            Every project is scoped to fit the space, the budget, and how you actually plan to
            use it — we don&apos;t sell one-size-fits-all packages.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-5xl gap-8 px-6 sm:grid-cols-2">
          {SERVICES.map((s) => (
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
            Ready When You Are
          </span>
          <h2 className="text-2xl font-semibold sm:text-3xl">Tell us about your space</h2>
          <p className="mx-auto mt-4 max-w-md text-[var(--ink-soft)]">
            Every quote is scoped after a discovery consultation — no generic packages, no
            surprise costs.
          </p>
          <Link href="/contact" className="btn btn-primary mt-8">
            Book a Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
