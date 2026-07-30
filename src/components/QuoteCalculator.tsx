"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  PROJECT_TYPES,
  SCOPES,
  TIERS,
  calculateEstimate,
  formatMYR,
  type ProjectTypeId,
  type ScopeId,
  type TierId,
} from "@/lib/pricing";

export default function QuoteCalculator() {
  const [projectType, setProjectType] = useState<ProjectTypeId>("residential");
  const [scope, setScope] = useState<ScopeId>("design-styling");
  const [tier, setTier] = useState<TierId>("mid");
  const [sqft, setSqft] = useState<number>(1000);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [leadStatus, setLeadStatus] = useState<{ message: string; ok: boolean } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const estimate = useMemo(
    () => calculateEstimate({ projectType, scope, tier, sqft }),
    [projectType, scope, tier, sqft]
  );

  const scopeNote = SCOPES.find((s) => s.id === scope)?.note;

  async function handleEmailEstimate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setLeadStatus({ message: "Please fill in your name and email.", ok: false });
      return;
    }

    const projectLabel = PROJECT_TYPES.find((p) => p.id === projectType)?.label ?? projectType;
    const scopeLabel = SCOPES.find((s) => s.id === scope)?.label ?? scope;
    const tierLabel = TIERS.find((t) => t.id === tier)?.label ?? tier;

    const details = [
      `Project type: ${projectLabel}`,
      `Scope: ${scopeLabel}`,
      `Finish tier: ${tierLabel}`,
      `Size: ${sqft} sqft`,
      "",
      `Estimated range: ${formatMYR(estimate.low)} – ${formatMYR(estimate.high)}`,
    ].join("\n");

    setSubmitting(true);
    setLeadStatus(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "Estimate Calculator",
          name,
          email,
          details,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Something went wrong.");
      }

      setLeadStatus({
        message: "Thanks — we've got your estimate request and will follow up soon.",
        ok: true,
      });
    } catch (err) {
      setLeadStatus({
        message:
          err instanceof Error
            ? err.message
            : "Something went wrong. Please email inquiry@inzterior.com directly.",
        ok: false,
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid gap-12 sm:grid-cols-[1.1fr_0.9fr]">
      <div className="flex flex-col gap-8">
        <div>
          <span className="mb-2 block text-xs uppercase tracking-wide text-neutral-500">
            Project Type
          </span>
          <div className="flex gap-3">
            {PROJECT_TYPES.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setProjectType(p.id)}
                className={`border px-4 py-2 text-sm ${
                  projectType === p.id
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-300"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="mb-2 block text-xs uppercase tracking-wide text-neutral-500">
            Scope
          </span>
          <div className="flex flex-col gap-2">
            {SCOPES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setScope(s.id)}
                className={`border px-4 py-3 text-left text-sm ${
                  scope === s.id ? "border-neutral-900 bg-neutral-50" : "border-neutral-300"
                }`}
              >
                <span className="block font-medium">{s.label}</span>
                <span className="mt-1 block text-xs text-neutral-500">{s.note}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="mb-2 block text-xs uppercase tracking-wide text-neutral-500">
            Finish Tier
          </span>
          <div className="flex gap-3">
            {TIERS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTier(t.id)}
                className={`border px-4 py-2 text-sm ${
                  tier === t.id
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-300"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="sqft" className="mb-2 block text-xs uppercase tracking-wide text-neutral-500">
            Size (square feet)
          </label>
          <input
            id="sqft"
            type="number"
            min={0}
            step={50}
            value={sqft}
            onChange={(e) => setSqft(Number(e.target.value) || 0)}
            className="w-full max-w-xs border border-neutral-300 px-3 py-2.5 text-sm"
          />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="border border-neutral-200 bg-neutral-50 p-8">
          <span className="mb-2 block text-xs uppercase tracking-wide text-neutral-500">
            Estimated Range
          </span>
          <p className="text-3xl font-semibold">
            {formatMYR(estimate.low)} – {formatMYR(estimate.high)}
          </p>
          {scopeNote && <p className="mt-3 text-sm text-neutral-600">{scopeNote}</p>}
          <p className="mt-4 text-xs text-neutral-500">
            This is a preliminary estimate, not a fixed quote. Your exact price will be
            documented in a written contract after a free discovery consultation — see{" "}
            <a href="/about" className="underline">
              how we protect every client
            </a>
            .
          </p>
        </div>

        <form onSubmit={handleEmailEstimate} className="flex flex-col gap-4">
          <p className="text-sm font-medium">Get this estimate emailed to you</p>
          <div>
            <label htmlFor="lead-name" className="mb-1 block text-xs uppercase tracking-wide">
              Name
            </label>
            <input
              id="lead-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-neutral-300 px-3 py-2.5 text-sm"
            />
          </div>
          <div>
            <label htmlFor="lead-email" className="mb-1 block text-xs uppercase tracking-wide">
              Email
            </label>
            <input
              id="lead-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-neutral-300 px-3 py-2.5 text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-fit rounded bg-neutral-900 px-6 py-3 text-xs uppercase tracking-wide text-white disabled:opacity-50"
          >
            {submitting ? "Sending..." : "Email Me This Estimate"}
          </button>
          {leadStatus && (
            <p className={`text-sm ${leadStatus.ok ? "text-emerald-700" : "text-red-700"}`}>
              {leadStatus.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
