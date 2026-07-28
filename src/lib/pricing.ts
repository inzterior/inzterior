/**
 * ⚠️ PLACEHOLDER PRICING — these rates are illustrative only.
 * Replace with Inzterior's real per-square-foot rates before this calculator
 * is linked live on the public site. Nothing else in the calculator needs to
 * change when rates are updated — only the numbers in BASE_PSF_RATES and
 * TIERS below.
 *
 * Model: base RM/sqft rate (by project type × scope) × tier multiplier × sqft,
 * shown as a ±15% range rather than a single number.
 */

export const PROJECT_TYPES = [
  { id: "residential", label: "Residential" },
  { id: "commercial", label: "Commercial / Office" },
] as const;

export const SCOPES = [
  {
    id: "consultation",
    label: "Design Consultation Only",
    note: "Design direction and floor plan advice — you manage the build yourself.",
  },
  {
    id: "design-styling",
    label: "Design + Styling",
    note: "Full design, furniture sourcing, and styling — you (or your own contractor) manage execution.",
  },
  {
    id: "full-renovation",
    label: "Full Renovation (Turnkey)",
    note: "End-to-end: design, materials, contractor coordination, and styling under one contract.",
  },
] as const;

export const TIERS = [
  { id: "budget", label: "Budget", multiplier: 0.8 },
  { id: "mid", label: "Mid-Range", multiplier: 1.0 },
  { id: "premium", label: "Premium", multiplier: 1.5 },
] as const;

export type ProjectTypeId = (typeof PROJECT_TYPES)[number]["id"];
export type ScopeId = (typeof SCOPES)[number]["id"];
export type TierId = (typeof TIERS)[number]["id"];

// RM per square foot, at the "mid" tier, before the tier multiplier is applied.
const BASE_PSF_RATES: Record<ProjectTypeId, Record<ScopeId, number>> = {
  residential: {
    consultation: 3,
    "design-styling": 15,
    "full-renovation": 90,
  },
  commercial: {
    consultation: 4,
    "design-styling": 18,
    "full-renovation": 110,
  },
};

export interface EstimateInput {
  projectType: ProjectTypeId;
  scope: ScopeId;
  tier: TierId;
  sqft: number;
}

export interface EstimateResult {
  low: number;
  high: number;
}

export function calculateEstimate({
  projectType,
  scope,
  tier,
  sqft,
}: EstimateInput): EstimateResult {
  const basePsf = BASE_PSF_RATES[projectType]?.[scope] ?? 0;
  const tierConfig = TIERS.find((t) => t.id === tier);
  const ratePsf = basePsf * (tierConfig?.multiplier ?? 1);
  const midpoint = ratePsf * Math.max(sqft, 0);

  const round = (n: number) => Math.round(n / 100) * 100;

  return {
    low: round(midpoint * 0.85),
    high: round(midpoint * 1.15),
  };
}

export function formatMYR(amount: number): string {
  return new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency: "MYR",
    maximumFractionDigits: 0,
  }).format(amount);
}
