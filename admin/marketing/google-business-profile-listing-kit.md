# Google Business Profile — Listing Kit

> Reference doc, not part of the website. Everything here is ready to paste into Google Business Profile setup. This file does **not** create the listing — GBP requires signing in with your own Google account and going through Google's own verification flow, which I can't do on your behalf (I don't handle account logins or submit forms with your credentials). Use this as your copy-paste source while you do it.

Last updated: 2026-08-14

---

## Decisions locked in for this listing

- **Listing type: Service-area business** — address hidden from public view, no map pin shown. Chosen because the address on file (No. 58A, Jalan Eka 3, Horizon Hills) is inside a gated residential community, not a public storefront. Avoids Google's physical-location verification (guard house won't cooperate) and avoids exposing a home address publicly.
- **Phone: none listed** — enquiries route through the website contact form instead. GBP allows this; the profile will show a "Message" / website button instead of "Call."
- **Hours: By appointment only** — the studio space itself is still under renovation and isn't a walk-in office, and this isn't a storefront business anyway. "By appointment only" is a real toggle in GBP's hours section (distinct from leaving hours blank) and reads better than a fake 9–6 schedule.

---

## Step 1 — Claim the existing listing (don't create a new one)

**Update 2026-08-14:** Google has already auto-generated an unclaimed Maps entry for "Inzterior" — confirmed live via `google.com/search?q=Inzterior`. It shows as "Interior designer in Iskandar Puteri, Malaysia," with the full Horizon Hills address publicly exposed (a live "Directions" button — Google pulled this from the site's `HomeAndConstructionBusiness` JSON-LD in `layout.tsx`), no phone, no hours, and an **"Own this business?"** link. This is not an official Business Profile yet — it's Google's auto-generated Maps entity from crawling the site's structured data and social profiles.

**Do not create a new listing at business.google.com — it will either get flagged as a duplicate or merged with this one anyway.** Instead:

1. Search `Inzterior` on Google (or Google Maps) to find the existing card.
2. Click **"Own this business?"** (or **"Claim this business"** on Maps).
3. Sign in as `inzterior.my@gmail.com` (or whichever Google account you want as the primary manager — add Billy/Jackie as additional managers afterward from the profile's "Business Profile settings → Managers" once it's live).
4. Google will walk you through confirming the business details — this is where you apply the decisions below (service-area type, no phone, by-appointment hours), even though the auto-generated card currently shows a public address pin. Claiming and switching to service-area business during setup should suppress the public Directions/pin — verify this after claiming (see the note in Step 4).

## Step 2 — Business name

```
Inzterior
```

Use exactly this — matches the current live site header/footer/social display names. Don't add "Design Studio" or keywords into the name field; Google's guidelines prohibit keyword-stuffing business names and can suspend listings for it. (If Google's suggestion dropdown surfaces an existing unclaimed listing under "Inzterior" or "Istory Design Studio," claim that one instead of creating a duplicate — check first.)

## Step 3 — Category

**Primary category:**
```
Interior designer
```

**Additional categories** (optional, add if offered — only if genuinely applicable):
```
Remodeler
```
Don't over-add categories that don't match actual services — it dilutes relevance ranking rather than helping it.

## Step 4 — Location / service area

When asked "Do you want to add a location customers can visit?" → **No**.

When asked for service area, add (in this order — matches the site's existing SEO geo-priority: Johor Bahru as primary keyword anchor, Iskandar Puteri for NAP precision):

```
Johor Bahru, Johor, Malaysia
Iskandar Puteri, Johor, Malaysia
Nusajaya, Johor, Malaysia
Skudai, Johor, Malaysia
Kulai, Johor, Malaysia
```

Google caps service areas at 20 and recommends staying within ~1 hour's drive of the business base — this list is Iskandar Puteri and its immediate JB-metro neighbors, which matches what the site actually claims to serve (see `layout.tsx` `areaServed` schema: Iskandar Puteri, Johor Bahru, Johor).

**Verify the pin disappears after claiming:** the pre-existing auto-generated card (Step 1) currently shows a public "Directions" button and exposed address. After claiming and selecting "No" here, check the listing again on Maps/Search — the address should no longer show a public pin or Directions button. If it still does, go to Business Profile settings and confirm the location visibility is set to hidden/service-area-only; this is a known Google Maps caching lag in some cases (can take a day or two to update publicly even after the setting is correct).

You'll still be asked for the business address during setup even as a service-area business — Google uses it internally for verification/service-area math but will **not** display it publicly. Enter it as-is:
```
No. 58A, Jalan Eka 3, Horizon Hills, 79100 Iskandar Puteri, Johor, Malaysia
```

## Step 5 — Contact details

**Phone:** skip / leave blank.

**Website:**
```
https://inzterior.com
```

## Step 6 — Verification

Google will offer a verification method — for a service-area business without a public address, this is typically **phone** (SMS/call to a number you control), **email**, or **video verification** (a short screen-recording proving business legitimacy: website, signage/materials, work in progress). Postcard verification is usually not offered once you've declined "customers can visit."

Since no phone is being listed publicly, you'll likely still need a phone number *for verification purposes only* (Google doesn't publish it, just uses it to send the code) — any number you can receive an SMS/call on works, including a personal one.

## Step 7 — Business description (750 char limit)

Paste this once the listing exists (Business Profile → Edit profile → About → Business description):

```
Inzterior is the trading name of Istory Design Studio (SSM Reg. No. SA0647003-M), an interior design studio serving Iskandar Puteri and Johor Bahru. Founded by Billy Yeap, we work under written contracts and staged payments — nothing about your project is agreed over WhatsApp or a phone call alone. Services span residential and commercial interiors, renovation and turnkey project management, space planning, 3D visualization, and furniture sourcing and styling. Every quote is itemised and every stage is documented before work begins. Six months of coverage follows every handover.
```
(619 characters — room to spare if you want to trim/adjust.)

## Step 8 — Services list

Add these under Business Profile → Services (matches `/services` on the live site):

| Service | Description |
|---|---|
| Residential Design | Full-home and single-room interiors for condos, landed homes, and renovations — layout, materials, furniture, and styling. |
| Commercial & Office Design | Retail, F&B, and office fit-outs designed around brand, workflow, and how customers or staff move through the space. |
| Renovation & Turnkey Delivery | End-to-end project management — contractor coordination, site supervision, and timeline management so you have one point of contact. |
| Space Planning & 3D Visualization | Floor plan optimisation and photorealistic 3D renders, so you can see and approve the design before construction starts. |
| Furniture & Styling | Sourcing, custom carpentry coordination, and final styling — the details that make a finished space feel complete. |
| Design Consultation | A single paid consultation for homeowners who want expert direction without committing to a full project yet. |

## Step 9 — Photos

Use the same brand assets already in use elsewhere:
- **Logo:** the official black/gold circular Inzterior logo (already in use for FB/Instagram profile — see brand memory).
- **Cover photo:** the FB cover asset, or a hero shot from `/public` if one exists at higher resolution.
- **Additional photos:** once portfolio photos are collected (TASKS.md §3 — currently pending), add project shots. Don't leave the listing photo-empty for long; profiles with photos get materially more engagement, and an empty gallery reads as inactive/unverified to visitors.

## Step 10 — Attributes (once available in the dashboard)

Toggle on whichever genuinely apply: *Online estimates*, *Onsite services*, language attributes (English, Mandarin, Malay — matches the site's 3-locale setup).

---

## What's still open after this

- **Reviews:** TASKS.md §6 already tracks "Review-request ritual" and the 30-review-by-end-of-2026 target as separate line items — this listing kit only covers getting the profile live, not review generation.
- **Verification turnaround:** phone/email verification is usually near-instant; video verification can take a few business days for Google to review. Don't mark §6 complete until verification actually clears (listing stays unpublished/unsearchable until then).
- **Managers:** add Billy and Jackie as Managers/Owners on the profile once it's live, so it's not a single-point-of-failure on one Gmail account.
