# Multi-language Support (EN / MS / ZH) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to
> implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for
> tracking.
>
> **Adaptation note:** this is a content/UI feature, not business logic — the
> design's own testing plan (see spec) is manual browser verification plus
> `npm run build` for type coverage, not per-function unit tests. Task steps
> below reflect that: "write the code" → "build/typecheck" → "commit", rather
> than a red/green TDD cycle. The full translated dictionary content (the hard,
> non-mechanical part of this feature) is specified inline in Tasks 2–4; all
> other tasks are mechanical wiring against that already-fixed content.

**Goal:** Let visitors pick English, Bahasa Melayu, or 中文 on first visit
(via a popup) and switch anytime (via a header control), with the entire
site's visible text rendered server-side in the chosen language.

**Architecture:** Server Components read a `locale` cookie via `next/headers`
`cookies()` and render translated content directly — no URL change, no
client-side i18n library. Client Components (`LanguagePopup`,
`LanguageSwitcher`) set the cookie and call `router.refresh()` to re-render
in place. Full rationale in
`docs/superpowers/specs/2026-08-05-multilingual-support-design.md`.

**Tech Stack:** Next.js 16 App Router (Server Components + `next/headers`
`cookies()`), no new dependencies.

## Global Constraints

- No URL/routing changes — every locale renders at the same path.
- `ms.ts` and `zh.ts` must satisfy `type Dictionary = typeof en` — a missing
  key is a build-time TypeScript error, not a runtime fallback.
- Cookie name: `locale`. Values: `"en" | "ms" | "zh"`. 1-year expiry, `path=/`.
- Unknown/missing cookie value → default to `en`.
- Dictionaries hold **text only**. JSX structure (tags, `href`s, `className`s)
  stays in components; only text nodes are replaced with `dict.*` lookups.
- `src/lib/pricing.ts` and `src/lib/content.ts`'s numeric/id logic is
  locale-agnostic and untouched except where noted (Task 6, Task 10) — only
  display labels move into dictionaries, keyed by the same stable ids.
- Every component/page that currently imports hardcoded English strings must
  have zero hardcoded user-facing English text left after its task, aside
  from Malaysian addresses/proper nouns/email addresses (not translated).

---

## File Structure

```
src/lib/i18n/
  index.ts              # Locale type, getLocale(), getDictionary()
  dictionaries/
    en.ts                # source-of-truth English dictionary (Dictionary type origin)
    ms.ts                # Bahasa Melayu, typed as Dictionary
    zh.ts                # Simplified Chinese, typed as Dictionary

src/components/
  LanguagePopup.tsx      # new — first-visit language picker (Client Component)
  LanguageSwitcher.tsx   # new — header language control (Client Component)
  SiteHeader.tsx         # modified — receives dict + locale, renders LanguageSwitcher
  SiteFooter.tsx         # modified — receives dict
  ContactForm.tsx        # modified — receives dict
  ProcessTimeline.tsx    # modified — receives dict, stages now data not hardcoded
  PortfolioGallery.tsx   # modified — receives dict
  QuoteCalculator.tsx    # modified — receives dict, labels keyed by pricing.ts ids

src/app/
  layout.tsx             # modified — reads locale/dict, renders popup conditionally
  page.tsx                              # modified
  services/page.tsx                     # modified
  about/page.tsx                        # modified
  contact/page.tsx                      # modified
  estimate/page.tsx                     # modified
  team/page.tsx                         # modified
  portfolio/page.tsx                    # modified
  terms/page.tsx                        # modified
  terms-of-service/page.tsx             # modified
  privacy-policy/page.tsx               # modified

src/lib/content.ts       # deleted — PAYMENT_STAGES moves into dictionaries
src/lib/pricing.ts       # unchanged (ids, multipliers, calculateEstimate, formatMYR stay locale-agnostic)
```

## Contracts (what every task can rely on)

```ts
// src/lib/i18n/index.ts
export type Locale = "en" | "ms" | "zh";
export async function getLocale(): Promise<Locale>;   // reads `locale` cookie, defaults "en"
export async function hasLocaleCookie(): Promise<boolean>; // true if cookie is present & valid
export function getDictionary(locale: Locale): Dictionary;  // sync — dictionaries are static imports
export type Dictionary = typeof import("./dictionaries/en").en;
```

```tsx
// src/components/LanguagePopup.tsx
"use client";
export default function LanguagePopup({ dict }: { dict: Dictionary["languagePopup"] }): JSX.Element;
// Renders a modal. Sets `document.cookie = "locale=xx; path=/; max-age=31536000"`
// then calls `router.refresh()`. Only mounted by RootLayout when !hasLocaleCookie().

// src/components/LanguageSwitcher.tsx
"use client";
export default function LanguageSwitcher({ locale, ariaLabel }: { locale: Locale; ariaLabel: string }): JSX.Element;
// Same cookie-set + router.refresh() pattern. Renders three buttons: English / Bahasa Melayu / 中文
// (language names are NOT translated — always shown as their own autonym), highlighting the active one.
```

Every `page.tsx` follows this exact pattern at the top of its default export:

```tsx
const locale = await getLocale();
const dict = getDictionary(locale);
```

---

## Task 1: Core i18n infrastructure

**Files:**
- Create: `src/lib/i18n/index.ts`
- Create: `src/components/LanguagePopup.tsx`
- Create: `src/components/LanguageSwitcher.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/components/SiteHeader.tsx`
- Modify: `src/components/SiteFooter.tsx`
- Depends on: Task 2 (`en.ts` must exist first for `Dictionary` type to resolve) — implement Task 2 first, then this task.

**Interfaces:**
- Consumes: `Dictionary` type and `en`/`ms`/`zh` objects from Task 2–4.
- Produces: `getLocale()`, `getDictionary()`, `Locale`, `Dictionary` (consumed by every later task), `<LanguagePopup>`, `<LanguageSwitcher>`.

- [ ] **Step 1: Write `src/lib/i18n/index.ts`**

```ts
import { cookies } from "next/headers";
import { en } from "./dictionaries/en";
import { ms } from "./dictionaries/ms";
import { zh } from "./dictionaries/zh";

export type Locale = "en" | "ms" | "zh";
export type Dictionary = typeof en;

const DICTIONARIES: Record<Locale, Dictionary> = { en, ms, zh };
const LOCALE_COOKIE = "locale";

function isLocale(value: string | undefined): value is Locale {
  return value === "en" || value === "ms" || value === "zh";
}

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const value = cookieStore.get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : "en";
}

export async function hasLocaleCookie(): Promise<boolean> {
  const cookieStore = await cookies();
  return isLocale(cookieStore.get(LOCALE_COOKIE)?.value);
}

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}
```

- [ ] **Step 2: Write `src/components/LanguagePopup.tsx`**

```tsx
"use client";

import { useRouter } from "next/navigation";
import type { Dictionary, Locale } from "@/lib/i18n";

const LANGUAGES: { locale: Locale; labelKey: "english" | "malay" | "chinese" }[] = [
  { locale: "en", labelKey: "english" },
  { locale: "ms", labelKey: "malay" },
  { locale: "zh", labelKey: "chinese" },
];

export default function LanguagePopup({ dict }: { dict: Dictionary["languagePopup"] }) {
  const router = useRouter();

  function choose(locale: Locale) {
    document.cookie = `locale=${locale}; path=/; max-age=31536000`;
    router.refresh();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
      <div className="w-full max-w-sm border border-[var(--line)] bg-[var(--bg)] p-8 text-center">
        <h2 className="mb-2 text-lg font-semibold">{dict.heading}</h2>
        <p className="mb-6 text-sm text-[var(--ink-soft)]">{dict.body}</p>
        <div className="flex flex-col gap-3">
          {LANGUAGES.map(({ locale, labelKey }) => (
            <button
              key={locale}
              type="button"
              onClick={() => choose(locale)}
              className="btn btn-outline w-full"
            >
              {dict[labelKey]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Write `src/components/LanguageSwitcher.tsx`**

```tsx
"use client";

import { useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n";

const LANGUAGES: { locale: Locale; label: string }[] = [
  { locale: "en", label: "EN" },
  { locale: "ms", label: "MY" },
  { locale: "zh", label: "中" },
];

export default function LanguageSwitcher({ locale, ariaLabel }: { locale: Locale; ariaLabel: string }) {
  const router = useRouter();

  function choose(next: Locale) {
    if (next === locale) return;
    document.cookie = `locale=${next}; path=/; max-age=31536000`;
    router.refresh();
  }

  return (
    <div role="group" aria-label={ariaLabel} className="flex gap-1 text-xs">
      {LANGUAGES.map(({ locale: l, label }) => (
        <button
          key={l}
          type="button"
          onClick={() => choose(l)}
          aria-pressed={l === locale}
          className={`rounded-full px-2.5 py-1.5 transition-colors ${
            l === locale
              ? "bg-[var(--ink)] text-[var(--bg)]"
              : "text-[var(--ink-soft)] hover:bg-[var(--bg-panel)] hover:text-[var(--ink)]"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Modify `src/app/layout.tsx`**

Replace the full file with:

```tsx
import type { Metadata } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import LanguagePopup from "@/components/LanguagePopup";
import { getLocale, getDictionary, hasLocaleCookie } from "@/lib/i18n";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Inzterior — Interior Design Studio, Iskandar Puteri",
    template: "%s — Inzterior",
  },
  description:
    "Inzterior is a Malaysian interior design studio crafting thoughtful residential and commercial spaces, based in Horizon Hills, Iskandar Puteri.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const showLanguagePopup = !(await hasLocaleCookie());

  return (
    <html lang={locale} className={`h-full antialiased ${fraunces.variable} ${workSans.variable}`}>
      <body className="flex min-h-full flex-col">
        <SiteHeader dict={dict.nav} locale={locale} languageSwitcherAriaLabel={dict.languageSwitcher.ariaLabel} />
        <main className="flex-1">{children}</main>
        <SiteFooter dict={dict.footer} />
        {showLanguagePopup && <LanguagePopup dict={dict.languagePopup} />}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Modify `src/components/SiteHeader.tsx`**

Replace the full file with:

```tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import type { Dictionary, Locale } from "@/lib/i18n";

export default function SiteHeader({
  dict,
  locale,
  languageSwitcherAriaLabel,
}: {
  dict: Dictionary["nav"];
  locale: Locale;
  languageSwitcherAriaLabel: string;
}) {
  const [open, setOpen] = useState(false);

  const NAV_LINKS = [
    { href: "/portfolio", label: dict.portfolio },
    { href: "/#journey", label: dict.howWeWork },
    { href: "/estimate", label: dict.estimate },
  ];

  return (
    <header className="border-b border-[var(--line)]">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-6">
        <Link href="/" className="font-serif-display text-xl font-semibold">
          Inzterior
        </Link>

        <nav className="hidden gap-1 text-sm sm:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-[var(--ink-soft)] transition-colors hover:bg-[var(--bg-panel)] hover:text-[var(--ink)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          <LanguageSwitcher locale={locale} ariaLabel={languageSwitcherAriaLabel} />
          <Link href="/contact" className="btn btn-primary">
            {dict.startProject}
          </Link>
        </div>

        <button
          type="button"
          aria-label={dict.toggleMenu}
          className="rounded-full px-2 py-1 text-xl transition-colors hover:bg-[var(--bg-panel)] sm:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-4 border-t border-[var(--line)] px-6 py-6 text-sm sm:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 transition-colors hover:bg-[var(--bg-panel)] hover:text-[var(--accent)]"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <LanguageSwitcher locale={locale} ariaLabel={languageSwitcherAriaLabel} />
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="btn btn-primary mt-2 w-fit"
          >
            {dict.startProject}
          </Link>
        </nav>
      )}
    </header>
  );
}
```

- [ ] **Step 6: Modify `src/components/SiteFooter.tsx`**

Replace the full file with:

```tsx
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n";

export default function SiteFooter({ dict }: { dict: Dictionary["footer"] }) {
  return (
    <footer className="mt-24 bg-[var(--ink)] text-[#b9bbb5]">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-4">
          <div>
            <h4 className="font-serif-display mb-4 text-lg font-semibold text-[#f5f6f3]">
              Inzterior
            </h4>
            <p className="text-sm text-[#9a9c95]">{dict.tagline}</p>
          </div>
          <div>
            <h4 className="mb-4 text-xs tracking-wide text-[#f5f6f3]">{dict.explore}</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link href="/services" className="hover:text-[var(--accent-soft)]">{dict.services}</Link></li>
              <li><Link href="/about" className="hover:text-[var(--accent-soft)]">{dict.about}</Link></li>
              <li><Link href="/team" className="hover:text-[var(--accent-soft)]">{dict.ourTeam}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-xs tracking-wide text-[#f5f6f3]">{dict.studioGovernance}</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link href="/terms" className="hover:text-[var(--accent-soft)]">{dict.ourTerms}</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-[var(--accent-soft)]">{dict.termsOfService}</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-[var(--accent-soft)]">{dict.privacyPolicy}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-xs tracking-wide text-[#f5f6f3]">{dict.contact}</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li><a href="mailto:inquiry@inzterior.com" className="hover:text-[var(--accent-soft)]">inquiry@inzterior.com</a></li>
              <li>{dict.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-[#83857e] sm:flex-row sm:items-center sm:justify-between">
          <span>{dict.copyright}</span>
          <span>{dict.tradingName}</span>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 7: Typecheck**

Run: `npm run build` (will fail until Tasks 2–15 are done — that's expected;
this step is repeated as the final gate in Task 16). For this task alone,
verify no *new* errors originate from the 6 files above beyond "Cannot find
module" for pages not yet migrated.

- [ ] **Step 8: Commit**

```bash
git add src/lib/i18n/index.ts src/components/LanguagePopup.tsx src/components/LanguageSwitcher.tsx src/app/layout.tsx src/components/SiteHeader.tsx src/components/SiteFooter.tsx
git commit -m "feat(i18n): add core infrastructure, popup, and switcher"
```

---

## Task 2: `en.ts` dictionary

**Files:**
- Create: `src/lib/i18n/dictionaries/en.ts`

**Interfaces:**
- Produces: `export const en = {...}` — the `Dictionary` type origin every other task relies on.

- [ ] **Step 1: Write the full English dictionary**

Structure: `nav`, `footer`, `languagePopup`, `languageSwitcher`, `home`,
`processTimeline`, `paymentStages`, `services`, `about`, `contact`,
`contactForm`, `estimate`, `quoteCalculator`, `team`, `portfolio`,
`portfolioGallery`, `terms`, `termsOfService`, `privacyPolicy` — one key per
page/section, extracted verbatim from the current hardcoded strings in each
page/component (see the source files read during planning:
`src/app/**/page.tsx`, `src/components/*.tsx`, `src/lib/content.ts`,
`src/lib/pricing.ts`). Written directly to
`src/lib/i18n/dictionaries/en.ts` during implementation.

- [ ] **Step 2: `npx tsc --noEmit`** — no errors (this file is the type origin, can't fail against itself).

- [ ] **Step 3: Commit**

```bash
git add src/lib/i18n/dictionaries/en.ts
git commit -m "feat(i18n): add English dictionary"
```

---

## Task 3: `ms.ts` dictionary

**Files:**
- Create: `src/lib/i18n/dictionaries/ms.ts`

**Interfaces:**
- Consumes: `Dictionary` type from `src/lib/i18n` (type-only import).
- Produces: `export const ms: Dictionary = {...}`.

- [ ] **Step 1: Write the full Bahasa Melayu dictionary**, typed as `Dictionary`, mirroring every key in `en.ts` with natural Malay marketing/legal copy.
- [ ] **Step 2: Run `npm run build`** — TypeScript errors on any missing/extra key vs. `Dictionary`. Fix until clean.
- [ ] **Step 3: Commit**

```bash
git add src/lib/i18n/dictionaries/ms.ts
git commit -m "feat(i18n): add Bahasa Melayu dictionary"
```

---

## Task 4: `zh.ts` dictionary

Same shape as Task 3, Simplified Chinese copy.

```bash
git add src/lib/i18n/dictionaries/zh.ts
git commit -m "feat(i18n): add Simplified Chinese dictionary"
```

---

## Tasks 5–15: Wire each page/component to the dictionary

Each task follows the same pattern and touches disjoint files, so they can be
done in any order once Tasks 1–4 are complete:

1. Add `const locale = await getLocale(); const dict = getDictionary(locale);`
   at the top of the page's default export (Server Component pages), or
   accept `dict` as a prop (Client Components: `ContactForm`,
   `ProcessTimeline`, `PortfolioGallery`, `QuoteCalculator`).
2. Replace every hardcoded English string with the matching `dict.<page>.*`
   lookup.
3. Where a page currently imports static label arrays with embedded JSX
   (`SECTIONS`, `TRUST_POINTS`, `BELIEFS`, `CRAFT`, `STAGES`), rebuild the
   array from `dict.<page>.*` inside the component instead of as a
   module-level constant, preserving exactly the same rendering structure.
4. For `terms-of-service` and `privacy-policy`: sections with an inline link
   (e.g. "See our **Our Terms** page") are split into `before` / `linkText`
   / `href` / `after` dictionary fields, reconstructed as
   `{s.linkParagraph.before}<a href={s.linkParagraph.href}>{s.linkParagraph.linkText}</a>{s.linkParagraph.after}`.
   Cosmetic-only inline emphasis (e.g. `<strong>` around "inzterior.com")
   is simplified to plain text — the functional links are preserved, the
   decorative bold is not carried over. This is a deliberate simplification,
   not a gap.
5. `npm run build` — must pass with no type errors.
6. Commit.

Task-specific notes:

- **Task 6 (Home + ProcessTimeline):** `ProcessTimeline` currently imports
  `PAYMENT_STAGES` from `src/lib/content.ts`. Move that content into
  `dict.paymentStages` (Task 2–4 already define it there) and delete
  `src/lib/content.ts`. Update the one other importer, `src/app/terms/page.tsx`
  (handled in Task 13), to also read `dict.paymentStages` instead.
- **Task 10 (Estimate + QuoteCalculator):** `QuoteCalculator` currently reads
  `.label`/`.note` directly off `PROJECT_TYPES`/`SCOPES`/`TIERS` (imported
  from `src/lib/pricing.ts`) and off its own local `PROPERTY_TYPES` array.
  Keep `pricing.ts`'s ids/multipliers/`calculateEstimate`/`formatMYR`
  untouched (they're locale-agnostic), but replace every `.label`/`.note`
  render with a lookup into `dict.quoteCalculator.projectTypes[id]` /
  `dict.quoteCalculator.scopes[id]` / `dict.quoteCalculator.tiers[id]` /
  `dict.quoteCalculator.propertyTypes[id]`, keyed by the same `id` values.

---

## Task 16: Build + browser verification

**Files:** none (verification only)

- [ ] **Step 1:** `npm run build` — must succeed with zero TypeScript errors.
- [ ] **Step 2:** Start the dev server, open in the browser preview with cookies cleared.
- [ ] **Step 3:** Confirm the language popup appears; select "Bahasa Melayu"; confirm header, footer, and home page content switch to Malay; confirm popup does not reappear on reload.
- [ ] **Step 4:** Use the header `LanguageSwitcher` to switch to 中文; confirm content updates in place without a full navigation.
- [ ] **Step 5:** Visit `/terms`, `/terms-of-service`, `/privacy-policy` in all 3 languages; visually confirm no leftover hardcoded English strings and that links (`/terms`, `/estimate`, `mailto:`) still work.
- [ ] **Step 6:** Visit `/estimate`; confirm the calculator's property/project/scope/tier labels are translated in all 3 languages while the numeric output (`RM` range) is unaffected by locale.
