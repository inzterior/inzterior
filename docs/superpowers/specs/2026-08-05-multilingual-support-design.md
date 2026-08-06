# Multi-language support (English / Malay / Chinese) — Design

**Date:** 2026-08-05
**Status:** Proposed — pending user review

## Problem

Inzterior's website is currently English-only. Malaysia is multicultural, and the
business wants to offer visitors the choice of English, Malay, or Chinese. On
first visit, a popup should ask the user's preferred language; once chosen, the
site's visible content should switch to that language and the choice should
persist across visits. Users should also be able to change their language
later (not just on first visit).

## Decisions (confirmed with user)

1. **URL stays the same** for all languages (no `/ms/`, `/zh/` prefixes).
   Content is swapped based on a stored preference, not routing.
2. **Translate everything** — all existing pages and shared components — in
   this pass, not just high-traffic pages.
3. **Claude drafts the Malay and Chinese copy** directly, matching the
   existing English tone. This should be spot-checked by a native/fluent
   speaker before being fully relied upon in production, especially the
   Terms of Service and Privacy Policy pages (legal accuracy matters there).
4. Explicitly rejected: a runtime auto-translate widget (e.g. embedded Google
   Translate). Reasoning: worse tone/brand-voice fit, no SEO benefit since
   translated content isn't server-rendered/indexable, added third-party
   script and flicker, and poor fit with a custom popup/switcher UI.

## Architecture

Next.js 16 (this repo) renders all pages in `src/app/**/page.tsx` as **Server
Components** by default. Rather than a client-side i18n library that
re-renders strings in the browser, language selection is resolved
**server-side per request**, via a `locale` cookie:

- `next/headers`'s `cookies()` is read at the top of each page/layout to
  determine the active locale (`en` | `ms` | `zh`), defaulting to `en` when
  the cookie is absent or invalid.
- The matching dictionary (a plain typed object of translated strings) is
  loaded and passed into the page's JSX.
- The server renders the fully-translated HTML directly — no
  flash-of-English-before-swap, no client bundle bloat from shipping all
  three languages' text to the browser.

When the user picks a language (in the popup or the header switcher — both
Client Components), the flow is:

1. Set the `locale` cookie (1-year expiry, `path=/`).
2. Call `router.refresh()` (Next.js App Router).
3. The App Router re-runs the Server Components for the current URL with the
   new cookie already present, re-rendering translated content in place —
   no full navigation, no lost scroll position.

Note: this Next.js version renamed `middleware.ts` to `proxy.ts` (confirmed
by reading `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md`).
The cookie-based approach above needs neither file — there is no URL
rewriting/redirecting involved, since the URL never changes.

## Components

- `src/lib/i18n/dictionaries/en.ts`, `ms.ts`, `zh.ts` — one typed object per
  language. Structured by page/section: `nav`, `footer`, `home`, `services`,
  `about`, `contact`, `estimate`, `team`, `portfolio`, `terms`,
  `termsOfService`, `privacyPolicy`, `languagePopup`, `languageSwitcher`.
  `ms.ts` and `zh.ts` are typed as `Dictionary` (`= typeof en`), so a missing
  translation key is a **build-time TypeScript error**, not a silent runtime
  gap.
- `src/lib/i18n/index.ts` — exports:
  - `type Locale = 'en' | 'ms' | 'zh'`
  - `getLocale(): Promise<Locale>` — reads/validates the cookie server-side.
  - `getDictionary(locale: Locale)` — returns the matching dictionary object.
- `src/components/LanguagePopup.tsx` (Client Component) — rendered by
  `RootLayout` only when no `locale` cookie exists yet (server determines
  this and passes a boolean down, avoiding hydration mismatches). Presents
  English / Bahasa Melayu / 中文 as three clear choices. Selecting one sets
  the cookie and refreshes.
- `src/components/LanguageSwitcher.tsx` (Client Component) — a compact
  EN | MY | 中 control added to `SiteHeader`, always visible, so the choice
  isn't locked in after first visit.
- Every existing page (`src/app/**/page.tsx`) and the shared components that
  currently hardcode English strings (`SiteHeader`, `SiteFooter`,
  `ContactForm`, `ProcessTimeline`, `PortfolioGallery`, `QuoteCalculator`)
  are updated to look up their text from the resolved dictionary instead of
  inline strings.

## Data flow

```
Request
  └─ RootLayout (Server Component)
       ├─ locale = await getLocale()          // reads cookie
       ├─ dict   = getDictionary(locale)
       ├─ hasChosen = cookie present?
       ├─ renders <LanguagePopup /> only if !hasChosen
       └─ passes locale + dict.nav / dict.footer to
            SiteHeader (Client Component, for the switcher UI)
            SiteFooter

  └─ Each page.tsx (Server Component)
       ├─ locale = await getLocale()
       ├─ dict   = getDictionary(locale)
       └─ renders using dict.<page>.*
```

## Error handling

- Unknown/garbled cookie value → `getLocale()` falls back to `en`.
- Missing dictionary key → caught at build time via the shared `Dictionary`
  type (see above), not handled at runtime.
- `LanguagePopup` never traps the user — closing without choosing (if a close
  affordance exists) defaults to English on next load, same as a first-time
  visitor who ignores it.

## Testing / verification plan

Manual browser verification (this is a static content/UX feature — no
business logic warranting automated tests beyond the existing build/typecheck):

1. Clear cookies, load the site → popup appears.
2. Select "Bahasa Melayu" → popup closes, all visible header/footer/page text
   updates to Malay.
3. Reload the page → language persists, popup does **not** reappear.
4. Use the header switcher to change to 中文 → content updates in place.
5. Spot-check Terms, Terms of Service, and Privacy Policy pages render
   correctly in all 3 languages.
6. `npm run build` passes (validates the `Dictionary` type covers all keys
   in `ms.ts` and `zh.ts`).

## Scope

All ~10 existing pages, plus header, footer, and the contact/estimate forms,
translated into Malay and Chinese. Translations are Claude-drafted and should
be spot-checked by a native/fluent speaker before being fully trusted in
production — particularly the two legal pages.
