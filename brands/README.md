# Brand holding pages — Kahnso & Tahtami

Static, single-file holding pages for the two iStory sister brands. Deliberately kept
outside the Next.js app so each brand can grow into its own site later.

```
brands/
├── kahnso/   index.html + assets/ (mark.svg, avatar.svg, png/)
└── tahtami/  index.html + assets/
```

## Logo assets

| File | Use |
|---|---|
| `assets/mark.svg` | Vector mark, transparent background. Favicon, print, designer handoff. |
| `assets/avatar.svg` | Square mark + wordmark on brand background. Source for the avatar PNGs. |
| `assets/lockup.svg` | Mark + wordmark + tagline + endorsement line, on brand background. |
| `assets/lockup-on-dark.svg` | Same lockup, transparent, light artwork for dark grounds. |
| `assets/lockup-on-light.svg` | Same lockup, transparent, dark artwork for light grounds. |
| `assets/png/<brand>-avatar-1024.png` | **Facebook / Instagram profile picture upload.** |
| `assets/png/<brand>-avatar-512.png` | General web use. |
| `assets/png/<brand>-avatar-180.png` | Apple touch icon / small avatars. |
| `assets/png/<brand>-lockup-1200.png` | Facebook cover, link preview, slide/deck title, email signature. |
| `assets/png/<brand>-lockup-on-dark-1200.png` | **Transparent.** Light artwork — place on dark photos or dark brand colours. |
| `assets/png/<brand>-lockup-on-light-1200.png` | **Transparent.** Dark artwork — place on white, linen or light photos. |

Regenerate the PNGs after editing an `avatar.svg`:

```bash
node brands/render-avatars.mjs
```

These are **interim marks** built on the approved K1 and T1 concepts (see
`admin/marketing/logo-direction-kahnso-tahtami.md`). Replace them when a designer
delivers final artwork; keep the same filenames so nothing else needs updating.

## Deploying to Vercel

One Vercel project per brand, each a static deploy with no build step:

1. `vercel` → new project → set **root directory** to `brands/kahnso` (then repeat for `brands/tahtami`)
2. Framework preset: **Other**. Build command: none. Output directory: `.`
3. Add the domain (`kahnso.com` / `tahtami.com`) in the project's Domains settings,
   plus the `www` redirect, and point the registrar's nameservers or A/CNAME records
   at Vercel as instructed there.

Both domains were purchased 2026-09-11.

## TODO before launch

- [ ] Both pages currently use the existing `inquiry@inzterior.com` address. Switch to
      brand-specific mailboxes (`hello@kahnso.com` / `hello@tahtami.com`) once they exist.
- [ ] Confirm "Launching 2026" wording once the showroom date is fixed
      (see `admin/marketing/showroom-launch-plan-2026.md`).
- [ ] Add each brand's social links once the accounts exist.
