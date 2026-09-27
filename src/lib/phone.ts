// Shared phone-number validation for lead forms (Contact + Estimate).
// Used client-side (instant feedback) and server-side in /api/leads
// (authoritative check — never trust the client alone).
//
// Deliberately permissive on format: we accept local Malaysian formats
// (e.g. "012-345 6789") and international/E.164 formats (e.g.
// "+60123456789"), because the point is to make sure we can reach the
// customer on WhatsApp, not to enforce a single dialing convention.
export function isValidPhone(raw: string): boolean {
  const digits = raw.replace(/[^0-9]/g, "");
  return digits.length >= 8 && digits.length <= 15;
}
