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
import type { Dictionary } from "@/lib/i18n";

const PROPERTY_TYPES = [
  { id: "landed" },
  { id: "condo" },
  { id: "commercial-lot" },
] as const;

type PropertyTypeId = (typeof PROPERTY_TYPES)[number]["id"];

export default function QuoteCalculator({ dict }: { dict: Dictionary["quoteCalculator"] }) {
  const [propertyType, setPropertyType] = useState<PropertyTypeId>("landed");
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

  const scopeInfo = dict.scopes[scope];

  async function handleEmailEstimate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setLeadStatus({ message: dict.errorRequired, ok: false });
      return;
    }

    const propertyLabel = dict.propertyTypes[propertyType];
    const projectLabel = dict.projectTypes[projectType];
    const scopeLabel = dict.scopes[scope].label;
    const tierLabel = dict.tiers[tier];

    const details = [
      `Property type: ${propertyLabel}`,
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

      setLeadStatus({ message: dict.success, ok: true });
    } catch (err) {
      setLeadStatus({
        message: err instanceof Error ? err.message : dict.errorGeneric,
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
          <span className="mb-2 block text-xs tracking-wide text-[var(--ink-soft)] uppercase">
            {dict.propertyTypeLabel}
          </span>
          <div className="flex flex-wrap gap-3">
            {PROPERTY_TYPES.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPropertyType(p.id)}
                className={`border px-4 py-2 text-sm ${
                  propertyType === p.id
                    ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--bg)]"
                    : "border-[var(--line)]"
                }`}
              >
                {dict.propertyTypes[p.id]}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-[var(--ink-soft)]">{dict.propertyNote}</p>
        </div>

        <div>
          <span className="mb-2 block text-xs tracking-wide text-[var(--ink-soft)] uppercase">
            {dict.projectTypeLabel}
          </span>
          <div className="flex gap-3">
            {PROJECT_TYPES.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setProjectType(p.id)}
                className={`border px-4 py-2 text-sm ${
                  projectType === p.id
                    ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--bg)]"
                    : "border-[var(--line)]"
                }`}
              >
                {dict.projectTypes[p.id]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="mb-2 block text-xs tracking-wide text-[var(--ink-soft)] uppercase">
            {dict.scopeLabel}
          </span>
          <div className="flex flex-col gap-2">
            {SCOPES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setScope(s.id)}
                className={`border px-4 py-3 text-left text-sm ${
                  scope === s.id ? "border-[var(--ink)] bg-[var(--bg-panel)]" : "border-[var(--line)]"
                }`}
              >
                <span className="block font-medium">{dict.scopes[s.id].label}</span>
                <span className="mt-1 block text-xs text-[var(--ink-soft)]">
                  {dict.scopes[s.id].note}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="mb-2 block text-xs tracking-wide text-[var(--ink-soft)] uppercase">
            {dict.tierLabel}
          </span>
          <div className="flex gap-3">
            {TIERS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTier(t.id)}
                className={`border px-4 py-2 text-sm ${
                  tier === t.id
                    ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--bg)]"
                    : "border-[var(--line)]"
                }`}
              >
                {dict.tiers[t.id]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="sqft"
            className="mb-2 block text-xs tracking-wide text-[var(--ink-soft)] uppercase"
          >
            {dict.sizeLabel}
          </label>
          <input
            id="sqft"
            type="number"
            min={0}
            step={50}
            value={sqft}
            onChange={(e) => setSqft(Number(e.target.value) || 0)}
            className="w-full max-w-xs border border-[var(--line)] px-3 py-2.5 text-sm"
          />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="border border-[var(--line)] bg-[var(--bg-panel)] p-8">
          <span className="mb-2 block text-xs tracking-wide text-[var(--ink-soft)] uppercase">
            {dict.estimatedRangeLabel}
          </span>
          <p className="text-3xl font-semibold">
            {formatMYR(estimate.low)} – {formatMYR(estimate.high)}
          </p>
          {scopeInfo?.note && <p className="mt-3 text-sm text-[var(--ink-soft)]">{scopeInfo.note}</p>}
          <p className="mt-4 text-xs text-[var(--ink-soft)]">
            {dict.disclaimerPart1}
            <a href="/about" className="underline">
              {dict.disclaimerLinkText}
            </a>
            {dict.disclaimerPart2}
          </p>
        </div>

        <form onSubmit={handleEmailEstimate} className="flex flex-col gap-4">
          <p className="text-sm font-medium">{dict.emailEstimateHeading}</p>
          <div>
            <label htmlFor="lead-name" className="mb-1 block text-xs tracking-wide uppercase">
              {dict.nameLabel}
            </label>
            <input
              id="lead-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-[var(--line)] px-3 py-2.5 text-sm"
            />
          </div>
          <div>
            <label htmlFor="lead-email" className="mb-1 block text-xs tracking-wide uppercase">
              {dict.emailLabel}
            </label>
            <input
              id="lead-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-[var(--line)] px-3 py-2.5 text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-fit rounded bg-[var(--ink)] px-6 py-3 text-xs tracking-wide text-[var(--bg)] uppercase disabled:opacity-50"
          >
            {submitting ? dict.submitting : dict.submit}
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
