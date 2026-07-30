# Inzterior — Admin & Task Dashboard

> Personal tracking only. Not part of the website. Source of truth for the daily 8am SGT check.

Last updated: 2026-07-30
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
- [ ] Point inzterior.com to the Vercel deployment — registrar DNS change, needs Fuyi's Namecheap login (see Notes for exact steps)

## 3. Business & Content
- [ ] Portfolio photos / case studies collected
- [ ] Copywriting for all pages
- [ ] Estimate/pricing logic defined — blocked on real completed-project data from Billy (game plan Phase 0.3 → 2.7)
- [ ] Client leads pipeline started
- [ ] Trademark / name protection for "Inzterior" (game plan Phase 1.9 — long lead time, start early)
- [ ] Supplier / contractor relationships (furniture, materials, subcontracted trades)
- [ ] Terms of service / privacy policy for website — legal boilerplate, distinct from the `/terms` trust page
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
- Deployment (2026-07-30): shipped via direct Vercel CLI upload, not a GitHub-linked project — the auto-connect step failed because the Vercel account has no GitHub login connection yet (Account Settings → Login Connections, one-time manual step). Until that's done, future site updates need a manual `vercel --prod` redeploy rather than deploying automatically on push. Custom domain `inzterior.com` is also not yet pointed at the deployment — needs a DNS change at the registrar.
- Domain DNS (2026-07-30): `inzterior.com` is registered with Namecheap (nameservers `dns1/dns2.registrar-servers.com`) and currently points to a Namecheap parking page (`216.198.79.1`), not Vercel. Requires manual steps neither Claude nor an agent can complete headlessly (registrar login + interactive domain verification): (1) Vercel dashboard → `invoice-now-check` team → `inzterior` project → Settings → Domains → Add `inzterior.com`, note the A/CNAME records Vercel shows; (2) Namecheap → Domain List → `inzterior.com` → Advanced DNS → replace the parking A record with Vercel's values; (3) allow propagation (minutes to a couple hours).
