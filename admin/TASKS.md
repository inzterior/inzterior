# Inzterior — Admin & Task Dashboard

> Personal tracking only. Not part of the website. Source of truth for the daily 8am SGT check.

Last updated: 2026-08-06
Dashboard artifact: https://claude.ai/code/artifact/44fe990a-b099-47c5-a22e-21a8379abfc5 (source: `admin/dashboard.html`, republish with this `url` to keep the link stable)
Game plan: `admin/game-plan-2026-h2.md` (Aug 1 – Dec 31 2026, phased)
Market research: `admin/research/sg-my-market-research-2026-07-29.md`

---

## 1. Business Setup & Accounts
- [x] Gmail — inzterior.my@gmail.com
- [x] Company email — inquiry@inzterior.com
- [x] Domain — inzterior.com
- [x] Facebook Page — @Inzterior Design
- [x] Instagram — @inzterior
- [x] TikTok — @Inzterior Design
- [x] RedNote — @Inzterior Design

## 2. Website Development
- [x] About page — real copy (trust points, SSM reg. no., studio address)
- [x] Contact page — real copy + working contact form component
- [x] Estimate page — real copy + working quote calculator component
- [x] Portfolio page — real, finished page copy (gallery photos still pending, but page itself is not boilerplate)
- [x] Services page — real copy, six defined service lines
- [x] Terms page (`/terms`) — payment structure, written contract, warranty, legal identity, entity-type disclosure (shipped 2026-07-29). Milestone percentages and final warranty duration are placeholders pending the Phase 0 decision in the game plan.
- [x] Deploy to production — live at https://inzterior-lac.vercel.app (2026-07-30). Custom domain (inzterior.com) and GitHub auto-deploy still pending — see Notes.
- [x] Point inzterior.com to the Vercel deployment — confirmed live 2026-07-30 on the correct project (`istory1/inzterior`, see Notes). The earlier DNS check that suggested it was still parked was reading stale/cached info — it was already correctly configured.

## 3. Business & Content
- [ ] Portfolio photos / case studies collected
- [ ] Copywriting for all pages
- [ ] Estimate/pricing logic defined — blocked on real completed-project data from Billy (game plan Phase 0.3 → 2.7)
- [x] Client leads pipeline started — live and verified end-to-end 2026-07-30. Contact form and Estimate calculator both save to the "Inzterior — Leads" Google Sheet (shared with the team) via a service account, with an optional Resend email notification. See Notes for setup details and gotchas hit along the way.
- [ ] Trademark / name protection for "Inzterior" (game plan Phase 1.9 — long lead time, start early)
- [ ] Supplier / contractor relationships (furniture, materials, subcontracted trades)
- [x] Terms of service / privacy policy for website — legal boilerplate shipped at `/terms-of-service` and `/privacy-policy` (2026-07-30), linked from footer. Both pages flag themselves as unreviewed templates — still needs a pass from a Malaysian lawyer before treating as final.
- [ ] Standard client contract covering scope, payment terms, liability — needs real legal drafting (game plan Phase 1.10)
- [ ] Warranty structure decision (keep 6mo flat / extend to 12mo / split 12mo carpentry–6mo wet works) — Billy + Fuyi, game plan Phase 0.1
- [ ] Deposit ladder finalized — percentages per milestone + retention — Billy + Fuyi, game plan Phase 0.2
- [ ] Referral mechanic drafted (credit or warranty-extension model, not cash — game plan Phase 2.10)

## 4. Accounting & Admin
- [x] Business registration
- [ ] Company bank account & credit card registration
- [ ] Invoicing setup — needed before first client under the new staged-payment structure
- [ ] Contract / agreement templates
- [ ] Tax & compliance tracking
- [ ] Business insurance (professional/public liability)
- [ ] SST registration (check against Malaysia threshold)
- [x] Accounting/bookkeeping system — free local + Google Sheets ledger (see admin/finance/)
- [ ] Payment collection method decided (bank transfer, PayNow, Stripe, etc.)

## 5. Social Media
- [ ] Content pipeline/workflow defined (new — separate from GuidesBooks workflow)
- [ ] Profile branding/bio completed on each platform
- [ ] First posts scheduled
- [ ] Instagram: carousel case studies + trust-architecture Highlights (Terms/Payments/Warranty/Site Notes) launched
- [ ] Facebook: long-form posts + local group presence launched
- [ ] Xiaohongshu: 装修全记录 posts launched — needs a Chinese-fluent content owner assigned
- [ ] TikTok: "what this actually costs" / site-walk / "ask before you sign" series launched, Billy on camera

## 6. Marketing
- [ ] Google Business Profile listing
- [ ] Review-request ritual installed into the handover process (operational, not a webpage)
- [ ] Google review count target: 30 dated, photo-attached reviews by end of 2026

## 7. Trust & Reputation Assets
- [ ] Comparison worksheet — one page, blank competitor columns, Inzterior's pre-filled (highest-leverage single asset per research)
- [ ] Due-diligence checklist page ("how to check any firm — including us")
- [ ] Cost-anatomy page — percentage cost breakdown by trade, no absolute figures
- [ ] Sample contract PDF — depends on the real legal draft in §3 existing first

## 8. Content Engine & Case Studies
- [ ] Milestone-photo habit started on every live job (operational — start immediately, can't be started retroactively)
- [ ] 3 case studies rebuilt in the new record format (constraint → decisions → timeline → cost split → milestone photos)
- [ ] Johor-climate/technical content series (humidity/joinery, west-facing heat load, termite/wet-area detailing)
- [ ] "One year later" project revisit — conditional on a qualifying project existing (6+ months post-handover)

## 9. Team
- [ ] Add Jackie Yap to `/team` page — pending role, bio, headshot, public-facing preference
- [ ] Confirm Fuyi's public-facing status (team page appearance or strategy-only)

---

## Notes
- Item count grew from 34 to 54 between 2026-07-28 and 2026-07-29 because the market research and game plan broke several vague line items (e.g. "pricing logic defined") into concrete, ownable tasks and surfaced three new categories (Trust & Reputation Assets, Content Engine & Case Studies, Team) that didn't exist as line items before. The completion percentage will look like it dropped — that's the denominator changing, not lost progress.
- Accounting/admin items refine further once specific tools are chosen (invoicing platform, registration steps).
- Website dev status can be auto-checked against the repo (commits, page content) during the daily review; other sections are manually updated unless pointed at a data source.
- Finance ledger: local source of truth is `admin/finance/Inzterior-Finance.xlsx` (Overview, Income, Expenses sheets). Mirrored as a native Google Sheet — "Inzterior — Finance Ledger" — under inquiry.guidesbooks@gmail.com: https://docs.google.com/spreadsheets/d/1aV7m_0TQFyrsgWtyz2mM-gpdsQqDPKk-6sAiEb_4lxI/edit
- Stray file to clean up: an earlier upload attempt (`Inzterior — Finance Ledger.xlsx`, plain xlsx, not a native Sheet) landed under inzterior.my@gmail.com's Drive by mistake — safe to delete from that account.
- Vercel account correction (2026-07-30): the real, GitHub-connected production project is `istory1/inzterior` (Vercel account "istory", istory1@vercel or similar login — logged in via Fuyi's browser) — **not** `invoice-now-check/inzterior`, which was a stray duplicate project accidentally created via CLI early in the deployment session (the CLI was authenticated as a different personal Vercel account, `lowfuyi-1301`, unrelated to this business). `istory1/inzterior` auto-deploys on every push to `master` and already has `inzterior.com` correctly attached as a custom domain (confirmed live, not a parking page — an earlier DNS check that suggested otherwise was reading stale/cached info). All later env var and redeploy instructions refer to `istory1/inzterior`. **Cleanup confirmed done (2026-08-06):** checked both Vercel accounts directly in the dashboard — `istory1` has only the one real `inzterior` project, and `invoice-now-check`/`lowfuyi-1301` has only `invoicenowcheck` and `design-library`. The stray `invoice-now-check/inzterior` duplicate no longer exists (already deleted at some point after this note was written); no further action needed.
- Leads pipeline (2026-07-30): the Contact form and Estimate calculator's "email me this estimate" both now POST to `/api/leads`, which appends a row to the "Inzterior — Leads" Google Sheet (under `inzterior.my@gmail.com`, shared with Billy and Jackie) and optionally sends an email notification via Resend. Previously they just built a `mailto:` link and relied on the visitor's own device having an email client configured — unreliable, no record kept, silently lost leads on many mobiles. **Live and verified end-to-end as of 2026-07-30.** Setup required a Google Cloud service account (Sheets API enabled), the Sheet shared with the service account's `...iam.gserviceaccount.com` address as Editor, and four env vars in Vercel (`GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_SHEET_ID`, `GOOGLE_SHEET_NAME`) — see `.env.example` for the exact names. `RESEND_API_KEY` (+ `RESEND_FROM_EMAIL`, `LEADS_NOTIFY_EMAIL`) is optional; without it leads still save to the Sheet, just no instant email ping.
  Two gotchas hit during setup, worth knowing if this ever needs re-configuring (e.g. key rotation):
  1. `private_key` vs `private_key_id` mixup — the downloaded service account JSON has both fields right next to each other; `private_key_id` is a short 40-char hex string and is *not* the credential needed. Use the long multi-line `private_key` field (starts with `-----BEGIN PRIVATE KEY-----`).
  2. Even with the right field, pasting a multi-line PEM key into Vercel's env var UI can mangle the line breaks (observed: the base64 body ending up glued directly onto the `-----END PRIVATE KEY-----` line, which OpenSSL rejects with `DECODER routines::unsupported`). The code (`src/lib/leads.ts`) now defends against this — it strips whitespace from the key body and rebuilds a canonical PEM before use, so exact copy-paste formatting shouldn't matter going forward.
