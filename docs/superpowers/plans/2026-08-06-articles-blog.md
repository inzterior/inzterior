# Articles / Blog Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an SEO-focused "Articles" section (nav link, listing page, MDX-backed detail pages, structured data, sitemap/robots) with 7 launch articles targeting real local-SEO keyword opportunities, meeting Google E-E-A-T expectations.

**Architecture:** Content lives as MDX files (`src/content/articles/<slug>.mdx`) that export a typed `meta` object (no frontmatter parser). `src/lib/articles.ts` is the single source of truth for the known slug list and for dynamically loading each module. `/articles` lists them; `/articles/[slug]` renders one via Next's documented dynamic-MDX-import pattern, with `BlogPosting` JSON-LD. A small reusable script sources and credits Pexels images, recording used photo IDs in the user's existing cross-project ledger.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript (strict), Tailwind v4 (existing hand-applied utility pattern, no new design-token/typography dependency), `@next/mdx`.

## Global Constraints

- Full spec: `docs/superpowers/specs/2026-08-06-articles-blog-design.md` — every task below implements part of it.
- **No test framework exists in this repo** (confirmed: no `jest`/`vitest` in `package.json`, no `tests/` dir). The project's established verification bar is `npm run lint` + `npm run build` + a manual browser check. Every task below verifies with those three, not unit tests. Do not add a test framework as part of this work — out of scope.
- Design tokens (from `src/app/globals.css`): `--ink`, `--ink-soft`, `--line`, `--accent`, `--accent-soft`, `--bg`, `--bg-panel`, `--bg-card`. Use these, not raw Tailwind color utilities.
- Section wrapper pattern used everywhere: `<section className="border-b border-[var(--line)] py-20"><div className="mx-auto max-w-5xl px-6">...</div></section>`.
- Canonical domain: `https://inzterior.com`.
- Legal name / registration: "Istory Design Studio", SSM Reg. No. SA0647003-M — must be accurate anywhere referenced, copy verbatim.
- **Never fabricate specific statistics, prices, regulatory timelines, or legal claims.** Where a fact needs real-world confirmation before publishing, write it as general/qualitative guidance and mark it with an MDX comment `{/* VERIFY: ... */}` describing exactly what needs confirming. This came out of finding `src/lib/pricing.ts` is explicitly placeholder data — do not let placeholder/invented numbers leak into published content.
- `PEXELS_API_KEY`'s value lives in `E:\.env.txt` on this machine — copy the value into `.env.local` (already git-ignored via `.env*` in `.gitignore`). Never print the key value into a committed file, this plan, or commit messages.
- The shared cross-project ledger `E:\assets\used-pexels-ids.json` must only ever be appended to, never have existing IDs removed.
- Every new/modified file must pass `npm run lint` before its task is considered done.

---

### Task 1: MDX build infrastructure

**Files:**
- Modify: `package.json` (add dependencies)
- Modify: `next.config.ts`
- Create: `mdx-components.tsx` (project root, alongside `next.config.ts`)

**Interfaces:**
- Produces: MDX files become importable as React components with a `meta` named export, using `useMDXComponents` for consistent styling. All later tasks that create `.mdx` content or import one depend on this.

- [ ] **Step 1: Install MDX dependencies**

```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx
```

- [ ] **Step 2: Configure `next.config.ts` for MDX**

Replace the full contents of `next.config.ts` with:

```ts
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
```

- [ ] **Step 3: Create `mdx-components.tsx`**

```tsx
import type { MDXComponents } from "mdx/types";
import Link from "next/link";

const components: MDXComponents = {
  h2: ({ children }) => (
    <h2 className="mt-12 mb-4 text-2xl font-semibold text-[var(--ink)]">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 mb-3 text-xl font-semibold text-[var(--ink)]">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="mb-5 leading-relaxed text-[var(--ink-soft)]">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mb-5 list-disc space-y-2 pl-6 text-[var(--ink-soft)]">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-5 list-decimal space-y-2 pl-6 text-[var(--ink-soft)]">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  a: ({ href, children }) => (
    <Link
      href={href ?? "#"}
      className="text-[var(--accent)] underline underline-offset-2 hover:text-[var(--accent-soft)]"
    >
      {children}
    </Link>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-2 border-[var(--accent)] pl-4 italic text-[var(--ink-soft)]">
      {children}
    </blockquote>
  ),
};

export function useMDXComponents(overrides: MDXComponents): MDXComponents {
  return { ...components, ...overrides };
}
```

- [ ] **Step 4: Verify the build still passes with no content yet**

Run: `npm run build`
Expected: build succeeds (no `.mdx` files exist yet, so this only proves the MDX plugin wiring doesn't break the existing site).

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json next.config.ts mdx-components.tsx
git commit -m "Add MDX build infrastructure for the Articles section"
```

---

### Task 2: Content data layer (`lib/authors.ts`, `lib/articles.ts`)

**Files:**
- Create: `src/lib/authors.ts`
- Create: `src/lib/articles.ts`

**Interfaces:**
- Consumes: nothing (pure data/logic layer).
- Produces:
  - `AuthorId = "billy-yeap" | "jackie-yap"`, `AUTHORS: Record<AuthorId, { name: string; role: string; href: string }>` — consumed by the listing page, detail page, and JSON-LD.
  - `ArticleMeta` type (`title`, `description`, `keywords: string[]`, `publishedAt`, `updatedAt`, `author: AuthorId`, `excerpt`, `heroImage: { src, alt, credit, creditUrl }`) — every article MDX file's `meta` export must match this shape.
  - `ARTICLE_SLUGS: string[]` — appended to by each article task.
  - `getArticleModule(slug: string): Promise<{ meta: ArticleMeta; default: ComponentType }>`
  - `getAllArticles(): Promise<Array<{ slug: string; meta: ArticleMeta }>>` — sorted newest-first by `publishedAt`.

- [ ] **Step 1: Create `src/lib/authors.ts`**

```ts
export type AuthorId = "billy-yeap" | "jackie-yap";

export const AUTHORS: Record<AuthorId, { name: string; role: string; href: string }> = {
  "billy-yeap": {
    name: "Billy Yeap",
    role: "Founder & Principal Designer",
    href: "/team",
  },
  "jackie-yap": {
    name: "Jackie Yap",
    role: "Co-founder",
    href: "/team",
  },
};
```

- [ ] **Step 2: Create `src/lib/articles.ts`**

```ts
import type { ComponentType } from "react";
import type { AuthorId } from "./authors";

export type ArticleMeta = {
  title: string;
  description: string;
  keywords: string[];
  publishedAt: string;
  updatedAt: string;
  author: AuthorId;
  excerpt: string;
  heroImage: {
    src: string;
    alt: string;
    credit: string;
    creditUrl: string;
  };
};

export type ArticleModule = {
  meta: ArticleMeta;
  default: ComponentType;
};

// Appended to as each article ships — see Tasks 6, 8-13.
export const ARTICLE_SLUGS: string[] = [];

export async function getArticleModule(slug: string): Promise<ArticleModule> {
  return (await import(`@/content/articles/${slug}.mdx`)) as ArticleModule;
}

export async function getAllArticles(): Promise<Array<{ slug: string; meta: ArticleMeta }>> {
  const articles = await Promise.all(
    ARTICLE_SLUGS.map(async (slug) => {
      const { meta } = await getArticleModule(slug);
      return { slug, meta };
    }),
  );

  return articles.sort(
    (a, b) => new Date(b.meta.publishedAt).getTime() - new Date(a.meta.publishedAt).getTime(),
  );
}
```

- [ ] **Step 3: Verify lint and build**

Run: `npm run lint && npm run build`
Expected: both pass (empty `ARTICLE_SLUGS` means no MDX imports are attempted yet).

- [ ] **Step 4: Commit**

```bash
git add src/lib/authors.ts src/lib/articles.ts
git commit -m "Add authors and articles data layer"
```

---

### Task 3: Nav link + Jackie Yap on the team page

**Files:**
- Modify: `src/components/SiteHeader.tsx:6-10` (`NAV_LINKS`)
- Modify: `src/app/team/page.tsx:10-17` (`TEAM`)

**Interfaces:**
- Consumes: nothing new.
- Produces: a working `/articles` nav entry (route created in Task 5) and a real `/team` bio for `jackie-yap` so the `AUTHORS["jackie-yap"].href` link (Task 2) resolves to actual content.

- [ ] **Step 1: Add "Articles" to `NAV_LINKS`**

In `src/components/SiteHeader.tsx`, replace:

```tsx
const NAV_LINKS = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/#journey", label: "How We Work" },
  { href: "/estimate", label: "Estimate" },
];
```

with:

```tsx
const NAV_LINKS = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/articles", label: "Articles" },
  { href: "/#journey", label: "How We Work" },
  { href: "/estimate", label: "Estimate" },
];
```

- [ ] **Step 2: Add Jackie Yap to the `TEAM` array**

In `src/app/team/page.tsx`, replace:

```tsx
const TEAM = [
  {
    initials: "BY",
    name: "Billy Yeap",
    role: "Founder & Principal Designer",
    bio: "Billy started Inzterior to fix the trust problem he kept seeing in Malaysia's renovation industry — deposit-and-disappear contractors, vague scopes, and designers who were never properly registered. He leads every project's design direction and stays as the client's single point of contact from concept to handover.",
  },
];
```

with:

```tsx
const TEAM = [
  {
    initials: "BY",
    name: "Billy Yeap",
    role: "Founder & Principal Designer",
    bio: "Billy started Inzterior to fix the trust problem he kept seeing in Malaysia's renovation industry — deposit-and-disappear contractors, vague scopes, and designers who were never properly registered. He leads every project's design direction and stays as the client's single point of contact from concept to handover.",
  },
  {
    initials: "JY",
    name: "Jackie Yap",
    role: "Co-founder",
    // Placeholder — Billy and Jackie will supply the real bio copy later.
    bio: "Jackie co-founded Inzterior alongside Billy, bringing the same commitment to transparent, well-documented renovation projects across Iskandar Puteri and Johor Bahru.",
  },
];
```

- [ ] **Step 3: Verify lint and build**

Run: `npm run lint && npm run build`
Expected: both pass.

- [ ] **Step 4: Manual check**

Start the dev server, open `/` and confirm "Articles" appears in the nav (it will 404 until Task 5 — that's expected here), then open `/team` and confirm Jackie Yap's card renders under Billy's.

- [ ] **Step 5: Commit**

```bash
git add src/components/SiteHeader.tsx src/app/team/page.tsx
git commit -m "Add Articles nav link and Jackie Yap to the team page"
```

---

### Task 4: Pexels image-sourcing script

**Files:**
- Create: `scripts/fetch-pexels-image.mjs`
- Modify: `.env.example`
- Create: `.env.local` (git-ignored, not committed)

**Interfaces:**
- Consumes: `PEXELS_API_KEY` env var, `E:\assets\used-pexels-ids.json` (cross-project ledger, pre-existing).
- Produces: `public/images/articles/<slug>.jpg` + a JSON object `{ slug, alt, credit, creditUrl, photoId }` printed to stdout — later article tasks (6, 8-13) copy `alt`/`credit`/`creditUrl` into that article's `meta.heroImage`.

- [ ] **Step 1: Add `PEXELS_API_KEY` to `.env.example`**

Append to `.env.example`:

```
# Pexels — used only by scripts/fetch-pexels-image.mjs at content-authoring time
PEXELS_API_KEY=your_pexels_api_key
```

- [ ] **Step 2: Create `.env.local` with the real key**

Create `E:\Inzterior\.env.local` containing one line:

```
PEXELS_API_KEY=<copy the value from E:\.env.txt — do not paste it into any committed file>
```

- [ ] **Step 3: Create `scripts/fetch-pexels-image.mjs`**

```js
#!/usr/bin/env node
// Fetches a topically relevant Pexels photo for an Inzterior article, skipping
// any photo ID already used across this user's other projects.
//
// Usage: node scripts/fetch-pexels-image.mjs <slug> "<search query>"

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const LEDGER_PATH = "E:/assets/used-pexels-ids.json";
const PUBLIC_DIR = path.resolve(process.cwd(), "public/images/articles");

const [, , slug, ...queryParts] = process.argv;
const query = queryParts.join(" ");

if (!slug || !query) {
  console.error('Usage: node scripts/fetch-pexels-image.mjs <slug> "<search query>"');
  process.exit(1);
}

const apiKey = process.env.PEXELS_API_KEY;
if (!apiKey) {
  console.error("PEXELS_API_KEY is not set. Export it or run with `node -r dotenv/config`.");
  process.exit(1);
}

const ledger = JSON.parse(await readFile(LEDGER_PATH, "utf8"));
const usedIds = new Set(ledger.usedIds);

const searchRes = await fetch(
  `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=15&orientation=landscape`,
  { headers: { Authorization: apiKey } },
);
if (!searchRes.ok) {
  console.error(`Pexels API error: ${searchRes.status} ${searchRes.statusText}`);
  process.exit(1);
}
const searchData = await searchRes.json();

const photo = searchData.photos.find((p) => !usedIds.has(p.id));
if (!photo) {
  console.error(`No unused Pexels photo found for query "${query}".`);
  process.exit(1);
}

const imageRes = await fetch(photo.src.large2x);
const buffer = Buffer.from(await imageRes.arrayBuffer());

await mkdir(PUBLIC_DIR, { recursive: true });
await writeFile(path.join(PUBLIC_DIR, `${slug}.jpg`), buffer);

ledger.usedIds.push(photo.id);
await writeFile(LEDGER_PATH, `${JSON.stringify(ledger, null, 2)}\n`);

console.log(
  JSON.stringify(
    {
      slug,
      alt: photo.alt || query,
      credit: photo.photographer,
      creditUrl: photo.photographer_url,
      photoId: photo.id,
    },
    null,
    2,
  ),
);
```

- [ ] **Step 4: Verify lint**

Run: `npm run lint`
Expected: passes.

- [ ] **Step 5: Smoke-test the script**

Run (with the real key loaded, e.g. via `set -a; source .env.local; set +a` or your shell's equivalent):

```bash
node scripts/fetch-pexels-image.mjs smoke-test "modern living room interior"
```

Expected: prints a JSON object with `alt`, `credit`, `creditUrl`, `photoId`, and creates `public/images/articles/smoke-test.jpg`. Then delete the smoke-test file and manually remove the last-appended `photoId` from `E:\assets\used-pexels-ids.json`'s `usedIds` array (this was a throwaway verification run, not a real article image) — do **not** run this cleanup for any of the real per-article runs in later tasks.

Run: `rm public/images/articles/smoke-test.jpg`

- [ ] **Step 6: Commit**

```bash
git add scripts/fetch-pexels-image.mjs .env.example
git commit -m "Add Pexels image-sourcing script for article hero images"
```

(`.env.local` is git-ignored and intentionally not committed.)

---

### Task 5: Articles listing page

**Files:**
- Create: `src/app/articles/page.tsx`

**Interfaces:**
- Consumes: `getAllArticles()` and `ArticleMeta` from `src/lib/articles.ts` (Task 2), `AUTHORS` from `src/lib/authors.ts` (Task 2).
- Produces: the `/articles` route, linking to `/articles/<slug>` (route created in Task 6).

- [ ] **Step 1: Create `src/app/articles/page.tsx`**

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllArticles } from "@/lib/articles";
import { AUTHORS } from "@/lib/authors";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Practical guides on renovation costs, contracts, and timelines in Iskandar Puteri and Johor Bahru, from the Inzterior team.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-MY", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  return (
    <>
      <section className="border-b border-[var(--line)] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <span className="mb-4 block text-sm font-semibold text-[var(--accent)]">Articles</span>
          <h1 className="max-w-2xl text-3xl font-semibold sm:text-4xl">
            Straight answers on renovating in Johor.
          </h1>
          <p className="mt-4 max-w-xl text-[var(--ink-soft)]">
            Practical guides on cost, contracts, and process from the Inzterior team — grounded in
            what we actually see doing this work in Iskandar Puteri and Johor Bahru.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          {articles.length === 0 ? (
            <p className="text-[var(--ink-soft)]">
              New articles are on the way — check back soon.
            </p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2">
              {articles.map(({ slug, meta }) => (
                <Link
                  key={slug}
                  href={`/articles/${slug}`}
                  className="group block border border-[var(--line)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[var(--bg-panel)]">
                    <Image
                      src={meta.heroImage.src}
                      alt={meta.heroImage.alt}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="mb-2 text-lg font-semibold text-[var(--ink)]">{meta.title}</h2>
                    <p className="mb-4 text-sm text-[var(--ink-soft)]">{meta.excerpt}</p>
                    <div className="flex items-center gap-2 text-xs text-[var(--ink-soft)]">
                      <span>{AUTHORS[meta.author].name}</span>
                      <span aria-hidden="true">·</span>
                      <time dateTime={meta.publishedAt}>{formatDate(meta.publishedAt)}</time>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Verify lint and build**

Run: `npm run lint && npm run build`
Expected: both pass.

- [ ] **Step 3: Manual check**

Start the dev server, open `/articles`, confirm the empty-state message renders (no articles exist until Task 6) and the page matches the site's visual style.

- [ ] **Step 4: Commit**

```bash
git add src/app/articles/page.tsx
git commit -m "Add Articles listing page"
```

---

### Task 6: Article detail route + first article (contractor trust piece)

**Files:**
- Create: `src/app/articles/[slug]/page.tsx`
- Create: `src/content/articles/spot-deposit-disappear-contractor-malaysia.mdx`
- Modify: `src/lib/articles.ts:22` (`ARTICLE_SLUGS`)

**Interfaces:**
- Consumes: `ARTICLE_SLUGS`, `getArticleModule`, `ArticleMeta` (Task 2), `AUTHORS` (Task 2).
- Produces: the full `/articles/[slug]` route mechanism (`generateStaticParams`, `generateMetadata`, JSON-LD) that every remaining article task (8-13) reuses without modification.

- [ ] **Step 1: Source the hero image**

Run (with `PEXELS_API_KEY` loaded from `.env.local`):

```bash
node scripts/fetch-pexels-image.mjs spot-deposit-disappear-contractor-malaysia "contract signing meeting"
```

Expected: prints JSON with `alt`, `credit`, `creditUrl`, `photoId`; creates `public/images/articles/spot-deposit-disappear-contractor-malaysia.jpg`. Note the printed values for Step 3.

- [ ] **Step 2: Create `src/app/articles/[slug]/page.tsx`**

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ARTICLE_SLUGS, getArticleModule } from "@/lib/articles";
import { AUTHORS } from "@/lib/authors";

export const dynamicParams = false;

const BASE_URL = "https://inzterior.com";

export function generateStaticParams() {
  return ARTICLE_SLUGS.map((slug) => ({ slug }));
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-MY", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!ARTICLE_SLUGS.includes(slug)) return {};
  const { meta } = await getArticleModule(slug);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: { canonical: `${BASE_URL}/articles/${slug}` },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "article",
      publishedTime: meta.publishedAt,
      modifiedTime: meta.updatedAt,
      images: [{ url: `${BASE_URL}${meta.heroImage.src}` }],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!ARTICLE_SLUGS.includes(slug)) notFound();

  const { meta, default: Content } = await getArticleModule(slug);
  const author = AUTHORS[meta.author];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.publishedAt,
    dateModified: meta.updatedAt,
    author: { "@type": "Person", name: author.name, url: `${BASE_URL}${author.href}` },
    publisher: {
      "@type": "Organization",
      name: "Istory Design Studio (Inzterior)",
      url: BASE_URL,
    },
    image: `${BASE_URL}${meta.heroImage.src}`,
    mainEntityOfPage: `${BASE_URL}/articles/${slug}`,
  };

  return (
    <article>
      {/* eslint-disable-next-line react/no-danger -- JSON-LD is our own generated data, not user input */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="border-b border-[var(--line)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <span className="mb-4 block text-sm font-semibold text-[var(--accent)]">Articles</span>
          <h1 className="text-3xl font-semibold sm:text-4xl">{meta.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-[var(--ink-soft)]">
            <Link href={author.href} className="font-medium text-[var(--ink)] hover:underline">
              {author.name}
            </Link>
            <span aria-hidden="true">·</span>
            <span>{author.role}</span>
          </div>
          <div className="mt-1 text-xs text-[var(--ink-soft)]">
            Published <time dateTime={meta.publishedAt}>{formatDate(meta.publishedAt)}</time>
            {meta.updatedAt !== meta.publishedAt && (
              <>
                {" · Updated "}
                <time dateTime={meta.updatedAt}>{formatDate(meta.updatedAt)}</time>
              </>
            )}
          </div>
        </div>
      </section>

      <div className="relative aspect-16/9 w-full bg-[var(--bg-panel)]">
        <Image
          src={meta.heroImage.src}
          alt={meta.heroImage.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <p className="mx-auto max-w-3xl px-6 pt-2 text-right text-xs text-[var(--ink-soft)]">
        Photo by{" "}
        <a
          href={meta.heroImage.creditUrl}
          className="underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {meta.heroImage.credit}
        </a>{" "}
        on Pexels
      </p>

      <div className="mx-auto max-w-3xl px-6 py-12">
        <Content />
      </div>

      <section className="border-t border-[var(--line)] py-16 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-2xl font-semibold sm:text-3xl">Ready to talk about your space?</h2>
          <Link href="/contact" className="btn btn-primary mt-6">
            Start a Project
          </Link>
        </div>
      </section>
    </article>
  );
}
```

- [ ] **Step 3: Create `src/content/articles/spot-deposit-disappear-contractor-malaysia.mdx`**

Write ~1,100–1,400 words of original prose in Billy Yeap's first-person-adjacent practitioner voice (matching his `/team` bio tone), covering the H2 sections below. Use the `alt`/`credit`/`creditUrl` values printed in Step 1. This content brief is itself the deliverable spec for this step — the actual prose is written at execution time, the one deliberate exception to "no placeholders" in this plan, since prose is this task's creative output the same way it is for Tasks 8-13.

```mdx
export const meta = {
  title: "How to Spot a \"Deposit-and-Disappear\" Renovation Contractor in Malaysia",
  description:
    "A practical checklist for spotting deposit-and-disappear renovation contractors in Malaysia — from SSM registration checks to payment-structure red flags.",
  keywords: [
    "renovation contractor scam Malaysia",
    "how to check contractor SSM registration",
    "renovation red flags Malaysia",
  ],
  publishedAt: "2026-08-06",
  updatedAt: "2026-08-06",
  author: "billy-yeap",
  excerpt:
    "The warning signs we keep seeing homeowners miss — before the deposit is gone and the contractor stops answering calls.",
  heroImage: {
    src: "/images/articles/spot-deposit-disappear-contractor-malaysia.jpg",
    alt: "PASTE the `alt` value printed by the Pexels script in Step 1",
    credit: "PASTE the `credit` value",
    creditUrl: "PASTE the `creditUrl` value",
  },
};
```

Content outline (write full prose per section, do not invent statistics or legal claims):

- **Why this keeps happening in Malaysia's renovation industry** — first-hand framing: informal/unregistered contractors are common; large upfront deposits with no milestone structure are the mechanism that makes disappearing profitable.
- **Check the business registration before anything else** — explain checking a contractor/studio's SSM (Suruhanjaya Syarikat Malaysia) registration. Use Inzterior's own registration (Istory Design Studio, SSM Reg. No. SA0647003-M) as the example of what legitimate registration looks like; link to `/team`. Add `{/* VERIFY: confirm the exact current SSM e-info / registration-check process before publishing */}`.
- **Red flags in the deposit structure** — full payment demanded upfront; one large deposit not tied to milestones; no staged payment schedule at all. Contrast with a staged structure tied to real deliverables (design deposit → design sign-off → materials & carpentry → on-site installation → handover) as what "good" looks like — describe qualitatively, no fixed percentages stated as universal law.
- **No written scope of work** — a proper contract specifies materials/brand/spec, quantities, inclusions/exclusions; a one-page "quotation" isn't a scope of work. Link to `/articles/interior-design-contract-guide-malaysia`.
- **Can't show verifiable past work** — advise asking for site visits to past/in-progress projects; be wary of portfolios that are entirely stock photography.
- **If you're already stuck** — document everything (payments, messages, agreed scope); Malaysia has consumer-recourse channels for this. Add `{/* VERIFY: confirm the current name/contact details of the relevant consumer tribunal (e.g. Tribunal Tuntutan Pengguna Malaysia) before publishing */}`.
- **Closing** — invite the reader to [get in touch](/contact) for a second opinion on a quote or contract they've already received.

- [ ] **Step 4: Register the slug**

In `src/lib/articles.ts`, change:

```ts
export const ARTICLE_SLUGS: string[] = [];
```

to:

```ts
export const ARTICLE_SLUGS: string[] = ["spot-deposit-disappear-contractor-malaysia"];
```

- [ ] **Step 5: Verify lint and build**

Run: `npm run lint && npm run build`
Expected: both pass; build output confirms `/articles/spot-deposit-disappear-contractor-malaysia` was statically generated.

- [ ] **Step 6: Manual check**

Start the dev server. Open `/articles` — confirm the card renders with the real hero image, title, excerpt, byline, date. Click through to the article — confirm hero image + Pexels credit link, byline linking to `/team`, dates, MDX body styled per `mdx-components.tsx`, and the "Start a Project" CTA. View page source and confirm the `application/ld+json` script tag is present with correct fields.

- [ ] **Step 7: Commit**

```bash
git add src/app/articles/[slug]/page.tsx src/content/articles/spot-deposit-disappear-contractor-malaysia.mdx src/lib/articles.ts public/images/articles/spot-deposit-disappear-contractor-malaysia.jpg
git commit -m "Add article detail route with JSON-LD and first article"
```

---

### Task 7: Sitemap and robots.txt

**Files:**
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`

**Interfaces:**
- Consumes: `getAllArticles()` from `src/lib/articles.ts` (Task 2).
- Produces: `/sitemap.xml` and `/robots.txt`.

- [ ] **Step 1: Create `src/app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";

const BASE_URL = "https://inzterior.com";

const STATIC_ROUTES = [
  "",
  "/about",
  "/services",
  "/portfolio",
  "/team",
  "/articles",
  "/contact",
  "/estimate",
  "/privacy-policy",
  "/terms",
  "/terms-of-service",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles();

  return [
    ...STATIC_ROUTES.map((route) => ({
      url: `${BASE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
    ...articles.map(({ slug, meta }) => ({
      url: `${BASE_URL}/articles/${slug}`,
      lastModified: new Date(meta.updatedAt),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
```

- [ ] **Step 2: Create `src/app/robots.ts`**

```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: "https://inzterior.com/sitemap.xml",
  };
}
```

- [ ] **Step 3: Verify lint and build**

Run: `npm run lint && npm run build`

- [ ] **Step 4: Manual check**

Start the dev server, open `/sitemap.xml` and confirm it lists all static routes plus the published article; open `/robots.txt` and confirm it references the sitemap and disallows `/api/`.

- [ ] **Step 5: Commit**

```bash
git add src/app/sitemap.ts src/app/robots.ts
git commit -m "Add sitemap.xml and robots.txt"
```

---

### Task 8: Article — Interior Design Renovation Cost Guide (Jackie Yap)

**Files:**
- Create: `src/content/articles/interior-design-cost-johor-bahru-iskandar-puteri.mdx`
- Modify: `src/lib/articles.ts` (`ARTICLE_SLUGS`)

- [ ] **Step 1: Source the hero image**

```bash
node scripts/fetch-pexels-image.mjs interior-design-cost-johor-bahru-iskandar-puteri "modern living room renovation"
```

- [ ] **Step 2: Write the article**

Create the MDX file with a `meta` export (`author: "jackie-yap"`, `publishedAt`/`updatedAt`: `"2026-08-06"`, `heroImage` from Step 1) and ~1,000–1,300 words in Jackie Yap's voice covering, as H2 sections:

1. **Why renovation quotes vary so much** — scope (design-only vs. full turnkey), material grade, custom carpentry vs. loose furniture, site condition/age, unit type.
2. **The four biggest cost drivers** — expand each of the above.
3. **Condo vs. landed cost differences** — brief, link to `/articles/condo-vs-landed-renovation-iskandar-puteri`.
4. **Budget, mid-range, and premium tiers, explained** — qualitative only (material grade, finish quality, customization level). **Do not state specific RM figures or per-sqft rates** — the site's calculator rates are still placeholders (see Global Constraints). Drive readers to `/estimate` for a personalized range. Add `{/* VERIFY: once real BASE_PSF_RATES are set in src/lib/pricing.ts, consider adding indicative price ranges to this article */}`.
5. **How to avoid budget blowouts** — ties to payment-stage transparency; link to `/articles/spot-deposit-disappear-contractor-malaysia` and `/articles/interior-design-contract-guide-malaysia`.

End with a primary CTA to `/estimate` and secondary CTA to `/contact`.

- [ ] **Step 3: Register the slug**

Append `"interior-design-cost-johor-bahru-iskandar-puteri"` to `ARTICLE_SLUGS` in `src/lib/articles.ts`.

- [ ] **Step 4: Verify lint and build**

Run: `npm run lint && npm run build`

- [ ] **Step 5: Manual check**

Visit `/articles/interior-design-cost-johor-bahru-iskandar-puteri`, confirm it renders correctly and contains no specific RM/sqft figures.

- [ ] **Step 6: Commit**

```bash
git add src/content/articles/interior-design-cost-johor-bahru-iskandar-puteri.mdx src/lib/articles.ts public/images/articles/interior-design-cost-johor-bahru-iskandar-puteri.jpg
git commit -m "Add cost guide article"
```

---

### Task 9: Article — Interior Design Contract Guide (Billy Yeap)

**Files:**
- Create: `src/content/articles/interior-design-contract-guide-malaysia.mdx`
- Modify: `src/lib/articles.ts` (`ARTICLE_SLUGS`)

- [ ] **Step 1: Source the hero image**

```bash
node scripts/fetch-pexels-image.mjs interior-design-contract-guide-malaysia "reviewing document contract closeup"
```

- [ ] **Step 2: Write the article**

Create the MDX file with `meta` (`author: "billy-yeap"`, dates `"2026-08-06"`) and ~1,000–1,300 words covering, as H2 sections:

1. **Why a one-page quotation isn't a contract.**
2. **Scope of work: what should be spelled out** — materials/brand/spec, quantities, explicit inclusions/exclusions (e.g. electrical rewiring, plumbing), attached drawings/mood boards.
3. **Payment milestones tied to deliverables** — use Inzterior's actual 5-stage structure as the worked example (real content from `src/lib/content.ts`'s `PAYMENT_STAGES`: Design Deposit ~10% → Design Sign-off → Materials & Carpentry → On-Site Installation → Handover). Link to `/about`.
4. **Timeline and delay clauses** — should state estimated duration and how delays are handled. Link to `/articles/renovation-timeline-malaysia`.
5. **Variation orders** — how post-signing changes should be documented and priced, to avoid verbal-agreement scope creep.
6. **Warranty / defect liability period** — brief, link to `/articles/renovation-warranty-malaysia-guide`.
7. **Termination and dispute clauses** — brief and general only. Add `{/* VERIFY: do not state specific legal remedies without a lawyer's review before publishing */}`.

End with a CTA to `/contact` framed as "want us to review a contract you've already been given?"

- [ ] **Step 3: Register the slug**

Append `"interior-design-contract-guide-malaysia"` to `ARTICLE_SLUGS`.

- [ ] **Step 4: Verify lint and build**

Run: `npm run lint && npm run build`

- [ ] **Step 5: Manual check**

Visit `/articles/interior-design-contract-guide-malaysia`, confirm rendering and that `/about` resolves (forward-links to timeline/warranty articles will 404 until Tasks 11-12 ship — expected at this point).

- [ ] **Step 6: Commit**

```bash
git add src/content/articles/interior-design-contract-guide-malaysia.mdx src/lib/articles.ts public/images/articles/interior-design-contract-guide-malaysia.jpg
git commit -m "Add contract guide article"
```

---

### Task 10: Article — Condo vs. Landed Renovation (Jackie Yap)

**Files:**
- Create: `src/content/articles/condo-vs-landed-renovation-iskandar-puteri.mdx`
- Modify: `src/lib/articles.ts` (`ARTICLE_SLUGS`)

- [ ] **Step 1: Source the hero image**

```bash
node scripts/fetch-pexels-image.mjs condo-vs-landed-renovation-iskandar-puteri "modern apartment building exterior"
```

- [ ] **Step 2: Write the article**

Create the MDX file with `meta` (`author: "jackie-yap"`, dates `"2026-08-06"`) and ~900–1,200 words covering, as H2 sections:

1. **Intro** — Iskandar Puteri/Horizon Hills has a mix of condo and landed properties, and the renovation process differs meaningfully.
2. **Condo renovations: JMB/MC approval and house rules** — plans typically need submission to the Joint Management Body/Management Corporation before work starts; common restrictions (drilling hours, limits on hacking structural walls, waterproofing requirements in wet areas). Add `{/* VERIFY: confirm the current JMB/MC approval process and typical timeline for a specific Iskandar Puteri development before publishing — this varies by building */}`.
3. **Service lift booking and logistics** — condos often require booking a service lift/loading bay, affecting delivery scheduling.
4. **Landed property: more structural freedom, different constraints** — generally more layout flexibility, subject to local council approval for major structural work; outdoor space and contractor parking/truck access considerations.
5. **Noise and work-hour rules** — condos typically stricter (specific permitted hours); landed more flexible but still subject to local by-laws. Add `{/* VERIFY: confirm current local council work-hour by-laws before publishing */}`.
6. **What this means for your timeline and budget** — condo approval lead time adds to the project timeline. Link to `/articles/renovation-timeline-malaysia` and `/estimate`.

End with a CTA to `/contact`.

- [ ] **Step 3: Register the slug**

Append `"condo-vs-landed-renovation-iskandar-puteri"` to `ARTICLE_SLUGS`.

- [ ] **Step 4: Verify lint and build**

Run: `npm run lint && npm run build`

- [ ] **Step 5: Manual check**

Visit `/articles/condo-vs-landed-renovation-iskandar-puteri`, confirm rendering.

- [ ] **Step 6: Commit**

```bash
git add src/content/articles/condo-vs-landed-renovation-iskandar-puteri.mdx src/lib/articles.ts public/images/articles/condo-vs-landed-renovation-iskandar-puteri.jpg
git commit -m "Add condo vs landed renovation article"
```

---

### Task 11: Article — Renovation Timeline (Jackie Yap)

**Files:**
- Create: `src/content/articles/renovation-timeline-malaysia.mdx`
- Modify: `src/lib/articles.ts` (`ARTICLE_SLUGS`)

- [ ] **Step 1: Source the hero image**

```bash
node scripts/fetch-pexels-image.mjs renovation-timeline-malaysia "construction site progress renovation"
```

- [ ] **Step 2: Write the article**

Create the MDX file with `meta` (`author: "jackie-yap"`, dates `"2026-08-06"`) and ~1,000–1,300 words covering, as H2 sections, structured around Inzterior's own payment-stage framework:

1. **Intro** — online timeline estimates are often unrealistically short; frame around the studio's stage structure.
2. **Design phase** — describe qualitatively (e.g. "often several weeks" rather than an exact day count). Add `{/* VERIFY: confirm typical design-phase duration reflects Inzterior's actual project experience before publishing */}`.
3. **Materials & carpentry lead time** — usually the longest stage, especially custom carpentry and imported materials; explain why.
4. **On-site installation** — depends on scope; sequencing considerations (e.g. electrical/plumbing rough-in before carpentry installation).
5. **Handover and snagging** — final walkthrough, defect list, link to `/articles/renovation-warranty-malaysia-guide`.
6. **What actually causes delays** — material backorders, late design decisions/change requests, condo JMB approval bottlenecks (link to `/articles/condo-vs-landed-renovation-iskandar-puteri`), contractor scheduling conflicts. Honest, not glossed-over.
7. **How Inzterior keeps you informed during delays** — ties to the site's "progress updates" trust pillar; link to `/about`.

End with a CTA to `/contact` or `/estimate`.

- [ ] **Step 3: Register the slug**

Append `"renovation-timeline-malaysia"` to `ARTICLE_SLUGS`.

- [ ] **Step 4: Verify lint and build**

Run: `npm run lint && npm run build`

- [ ] **Step 5: Manual check**

Visit `/articles/renovation-timeline-malaysia`, confirm rendering and that earlier forward-links from Tasks 8/9 to this article now resolve.

- [ ] **Step 6: Commit**

```bash
git add src/content/articles/renovation-timeline-malaysia.mdx src/lib/articles.ts public/images/articles/renovation-timeline-malaysia.jpg
git commit -m "Add renovation timeline article"
```

---

### Task 12: Article — Renovation Warranty Guide (Billy Yeap)

**Files:**
- Create: `src/content/articles/renovation-warranty-malaysia-guide.mdx`
- Modify: `src/lib/articles.ts` (`ARTICLE_SLUGS`)

- [ ] **Step 1: Source the hero image**

```bash
node scripts/fetch-pexels-image.mjs renovation-warranty-malaysia-guide "home inspection checklist clipboard"
```

- [ ] **Step 2: Write the article**

Create the MDX file with `meta` (`author: "billy-yeap"`, dates `"2026-08-06"`) and ~1,000–1,200 words covering, as H2 sections:

1. **Intro** — many contractors go quiet after final payment; a proper warranty/defect-liability period protects the homeowner.
2. **What a fair defect liability period should cover** — workmanship defects (e.g. cabinet doors misaligning, paint peeling, tiling issues) vs. material defects (manufacturer warranty pass-through) vs. exclusions (normal wear, damage from misuse).
3. **How long is reasonable** — frame as "look for a defined period stated in writing, not a vague verbal promise," not a universal legal standard. Add `{/* VERIFY: state Inzterior's actual defined warranty period here once confirmed by Billy/Jackie */}`.
4. **Response-time expectations** — what should happen when an issue is reported (acknowledgment, site visit, fix timeline) — framed as "what to ask for."
5. **Red flags: warranty terms that don't hold up** — verbal-only promises, warranty conditioned on using the same contractor for all future work, no defined scope.
6. **How to document handover properly** — photos/video at handover, a written snag list, both parties signing off. Link to `/about`.

End with a CTA to `/contact`.

- [ ] **Step 3: Register the slug**

Append `"renovation-warranty-malaysia-guide"` to `ARTICLE_SLUGS`.

- [ ] **Step 4: Verify lint and build**

Run: `npm run lint && npm run build`

- [ ] **Step 5: Manual check**

Visit `/articles/renovation-warranty-malaysia-guide`, confirm rendering and that forward-links from Tasks 9/11 now resolve.

- [ ] **Step 6: Commit**

```bash
git add src/content/articles/renovation-warranty-malaysia-guide.mdx src/lib/articles.ts public/images/articles/renovation-warranty-malaysia-guide.jpg
git commit -m "Add renovation warranty guide article"
```

---

### Task 13: Article — Interior Designer vs. Contractor-Only (Jackie Yap)

**Files:**
- Create: `src/content/articles/interior-designer-vs-contractor-malaysia.mdx`
- Modify: `src/lib/articles.ts` (`ARTICLE_SLUGS`)

- [ ] **Step 1: Source the hero image**

```bash
node scripts/fetch-pexels-image.mjs interior-designer-vs-contractor-malaysia "interior designer discussing plans with client"
```

- [ ] **Step 2: Write the article**

Create the MDX file with `meta` (`author: "jackie-yap"`, dates `"2026-08-06"`) and ~1,000–1,200 words covering, as H2 sections:

1. **Intro** — the confusion between hiring a contractor directly vs. a full-service interior design studio.
2. **What a contractor-only route covers (and doesn't)** — execution only; the homeowner (or someone else) must handle design decisions, material selection, and coordination.
3. **What a full-service interior design studio adds** — space planning, design direction, single point of contact managing contractors/timeline/quality. Reference `/services` and `/team`'s described craft (design, project management, site execution).
4. **When contractor-only makes sense** — honest and balanced: small/simple scope, clear existing design direction, tight budget for design fees.
5. **When a design studio is worth it** — full renovations, unclear design direction, multiple trades to coordinate, wanting one accountable point of contact.
6. **A simple decision framework** — a bulleted self-assessment (e.g. "Do you already know exactly what you want?", "Do you have time to manage multiple contractors directly?", "Is this a full renovation or a small, contained fix?").

End with CTAs to both `/estimate` (pick a scope: consultation / design + styling / full renovation — matches the real `SCOPES` from `src/lib/pricing.ts`) and `/contact`.

- [ ] **Step 3: Register the slug**

Append `"interior-designer-vs-contractor-malaysia"` to `ARTICLE_SLUGS`.

- [ ] **Step 4: Verify lint and build**

Run: `npm run lint && npm run build`

- [ ] **Step 5: Manual check**

Visit `/articles/interior-designer-vs-contractor-malaysia`, confirm rendering.

- [ ] **Step 6: Commit**

```bash
git add src/content/articles/interior-designer-vs-contractor-malaysia.mdx src/lib/articles.ts public/images/articles/interior-designer-vs-contractor-malaysia.jpg
git commit -m "Add interior designer vs contractor article"
```

---

### Task 14: Final QA pass

**Files:** none created/modified — verification only.

- [ ] **Step 1: Full lint and build**

Run: `npm run lint && npm run build`
Expected: both pass with all 7 articles registered.

- [ ] **Step 2: Verify `ARTICLE_SLUGS` has exactly 7 entries**

Open `src/lib/articles.ts` and confirm all 7 slugs are present.

- [ ] **Step 3: Manual walkthrough**

Start the dev server and check:
- Every page — "Articles" appears correctly in both desktop and mobile nav.
- `/articles` — all 7 cards render, sorted newest-first, each with a real hero image and no broken images.
- Each of the 7 `/articles/<slug>` pages — hero image + Pexels credit, correct byline (alternating Billy/Jackie) linking to `/team`, dates, body content styled consistently, "Start a Project" CTA works.
- Every internal link mentioned in the content briefs resolves without a 404.
- `/sitemap.xml` includes all 7 article URLs.
- `robots.txt` is correct.
- View page source of one article and confirm the `application/ld+json` script tag is present with correct `author`/`datePublished`/`publisher`.

- [ ] **Step 4: Grep for un-verified content markers**

Run: `grep -rn "VERIFY:" src/content/articles/`
Expected: returns every `{/* VERIFY: ... */}` comment. Report the full list to the user as follow-up items — intentionally left for Billy/Jackie to confirm before full launch (SSM check process, tribunal contact details, JMB/local council specifics, actual warranty length, typical stage durations). Do not resolve these with invented facts.

- [ ] **Step 5: Final commit (if any cleanup was needed)**

Run: `git status`
If everything from Tasks 1-13 is already committed, no further commit is needed.
