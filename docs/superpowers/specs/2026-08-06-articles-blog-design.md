# Articles / Blog Section — Design

**Date:** 2026-08-06
**Goal:** Add an SEO-focused "Articles" section to drive organic search traffic, following Google E-E-A-T principles.

## Content model

- Content lives as MDX files at `src/content/articles/<slug>.mdx`.
- No frontmatter parser (gray-matter etc.) — each file uses Next.js's native MDX metadata-export convention:

  ```tsx
  export const meta = {
    title: string,
    description: string,        // meta description, brand-voice not generic SEO copy
    keywords: string[],         // primary + secondary target keywords
    publishedAt: string,        // ISO date
    updatedAt: string,          // ISO date, defaults to publishedAt
    author: "billy-yeap" | "jackie-yap",
    excerpt: string,            // shown on listing cards
    heroImage: {
      src: string,               // "/images/articles/<slug>.jpg"
      alt: string,
      credit: string,            // Pexels photographer name
      creditUrl: string,         // link to photographer's Pexels profile
    },
  };
  ```

- `src/lib/articles.ts` holds the static list of known slugs (`ARTICLE_SLUGS`) plus a helper `getAllArticles()` that dynamically imports each MDX module, extracts `meta` + `slug`, and returns them sorted newest-first by `publishedAt`. This is the single source of truth for both the listing page and `generateStaticParams` — no metadata duplication.
- `src/lib/authors.ts` holds a small `AUTHORS` map (`billy-yeap`, `jackie-yap`) with `name`, `role`, and the `/team` anchor/link, so byline rendering and JSON-LD author data pull from one place.

## Routes

- `src/app/articles/page.tsx` — listing page. Server component, reuses the site's existing section/wrapper pattern (`border-b border-[var(--line)] py-20` + `mx-auto max-w-5xl px-6`). Cards show hero image, title, excerpt, author, date.
- `src/app/articles/[slug]/page.tsx` — detail page.
  - `generateStaticParams()` returns `ARTICLE_SLUGS`; `export const dynamicParams = false` (unknown slugs 404).
  - `generateMetadata()` builds `title`/`description`/`keywords`/canonical URL/Open Graph tags from the article's `meta`.
  - Dynamically imports `@/content/articles/${slug}.mdx` per Next.js's documented pattern for MDX blog routes.
  - Renders: hero image + credit line, title, byline (author name/role linking to `/team`), published/updated dates, MDX body, then a JSON-LD `<script>` tag with `BlogPosting` structured data (headline, `datePublished`, `dateModified`, `author` as `Person`, `publisher` as the Inzterior/Istory Design Studio organization).
- `src/app/sitemap.ts` — emits all static routes + all article routes (`lastModified` from `updatedAt`). Does not exist today; independent SEO gap worth closing alongside this feature.
- `src/app/robots.ts` — allows all, points to the sitemap. Does not exist today.

## Styling

- `mdx-components.tsx` at the project root maps `h2`, `h3`, `p`, `ul`, `ol`, `a`, `blockquote`, `img` to elements styled with the existing design tokens (`--ink`, `--ink-soft`, `--line`, `--accent`), matching the hand-applied Tailwind utility pattern used across the rest of the site. No `@tailwindcss/typography` dependency added.
- Article detail page reuses the eyebrow/label convention and the numbered-list/divide-y patterns where applicable.

## Navigation

- Add `{ href: "/articles", label: "Articles" }` to `NAV_LINKS` in `src/components/SiteHeader.tsx`, positioned after "Portfolio".

## Team page update

- Add Jackie Yap to the `TEAM` array in `src/app/team/page.tsx`: title "Co-founder", placeholder bio (both her and Billy's bios are flagged to be revised by the user later — not polished copy to invent).

## Images (Pexels sourcing)

- `PEXELS_API_KEY` added to `.env.local` (git-ignored; not committed) and `.env.example` documents the variable. Used only during content authoring (a one-off script/manual fetch), never called from client or server at runtime.
- For each article: search Pexels for a topically relevant photo, download into `public/images/articles/<slug>.jpg`, and record `{ alt, credit, creditUrl }` in that article's `meta`. Hotlinking avoided so images are served by Next/Image and don't depend on Pexels' CDN uptime.
- Each used photo ID is appended to the existing cross-project ledger at `E:\assets\used-pexels-ids.json` to avoid reusing a photo already used on another of the user's sites.
- Captions/alt text stay generic/illustrative (e.g. "Modern living room interior") — never implies the photo depicts an actual Inzterior project, consistent with `/portfolio`'s existing stance against misrepresenting stock imagery as real project work.

## Content — initial 7 articles

| Slug | Title | Primary keyword | Byline |
|---|---|---|---|
| `interior-design-cost-johor-bahru-iskandar-puteri` | Interior Design Renovation Cost Guide for Johor Bahru & Iskandar Puteri (2026) | interior design cost Johor Bahru | Jackie Yap |
| `spot-deposit-disappear-contractor-malaysia` | How to Spot a "Deposit-and-Disappear" Renovation Contractor in Malaysia | renovation contractor scam Malaysia | Billy Yeap |
| `interior-design-contract-guide-malaysia` | What's Actually in an Interior Design Contract? A Malaysia Homeowner's Guide | interior design contract Malaysia | Billy Yeap |
| `condo-vs-landed-renovation-iskandar-puteri` | Condo vs. Landed Renovation in Iskandar Puteri: Key Differences to Plan For | condo renovation Iskandar Puteri | Jackie Yap |
| `renovation-timeline-malaysia` | How Long Does a Renovation Take in Malaysia? A Realistic Timeline by Project Type | renovation timeline Malaysia | Jackie Yap |
| `renovation-warranty-malaysia-guide` | Renovation Warranty in Malaysia: What Should Be Covered After Handover? | renovation warranty Malaysia | Billy Yeap |
| `interior-designer-vs-contractor-malaysia` | Interior Design vs. Contractor-Only Renovation: Which Do You Actually Need? | interior designer vs contractor Malaysia | Jackie Yap |

Each article ties back to existing site content (payment stages, trust framework, `/estimate` calculator) as internal links/CTAs, without duplicating those pages' copy — goes deeper, in a practitioner voice.

## E-E-A-T summary

- Named, verifiable authors linking to real `/team` bios (not a generic "Inzterior Team" byline).
- Visible published/updated dates on every article.
- `BlogPosting` structured data with author/publisher/dates.
- Content grounded in the brand's actual stated experience (trust framework, payment structure, local Johor/Iskandar Puteri market specifics) rather than generic, unverifiable claims.
- Stock imagery captioned as illustrative, never implying real project documentation.

## Dependencies to add

- `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, `@types/mdx` (per Next.js 16's documented MDX setup — checked against `node_modules/next/dist/docs/01-app/02-guides/mdx.md`).
- `next.config.ts` updated to wrap config with `createMDX()` and extend `pageExtensions`.

## Out of scope (for this pass)

- CMS/editing UI — MDX files in the repo remain the only authoring path.
- Comments, related-posts algorithm, tag/category taxonomy pages.
- RSS feed (can be added later if requested).
