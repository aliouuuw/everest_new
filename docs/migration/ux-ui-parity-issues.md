# UX/UI parity issues (Astro vs redesign)

Baseline: Vite redesign (`feat/pm-storytelling-refonte`). Surface: `apps/web`.
Audit date: 2026-09-08. Tag: `--ux-ui`. No code changes in the audit itself.

Status: open unless marked done.

## High

- [x] **Publications are files, not HTML slugs.** `/publications` and home Insights use `PUBLICATION_FILES` (PDF download). Public `/publications/[slug]` HTML pages are removed.

- [x] **Accès Client 404.** Header `to="/auth"`. Astro `/auth` now shows the Accès Client page with a contact CTA. Convex sign-in stays on Vite.

- [x] **Home Insights news cards have no photos.** Vite `InsightsMerged` uses `article.imageUrl`. `InsightsMergedStatic` now renders the same 16/10 image when `imageUrl` is set.

## Medium

- [ ] **Home CTA « Évaluer mon profil d'investisseur ».** Vite opens `InvestorProfileModal`. Astro sends `secondaryHref` to the account-opening Vercel URL. Same label, different product.

- [x] **Lenis missing.** Vite `Layout` wraps `LenisWrapper`. Astro `SiteShell` now wraps the same wrapper.

- [x] **Outils quiz does not save a lead.** Island posts to Payload `investor-leads` via `onSubmitLead`.

## Low

- [x] **Header chrome on `/about` (and similar).** `forceScrolledStylePaths` includes `/about`, `/faq`, `/publications`, `/actualites`. Image heroes use `--site-chrome-top`.

- [ ] **Site copy mostly defaults.** Import created `home.hero.title`. Other `EditableText` keys stay hardcoded.

- [x] **`/services`, `/gestion-libre`, `/gestion-assistee`.** Astro and Vite redirect to `/offres`.

## Informational

- [ ] Vite still mounts `/publications/$slug` (Convex). Redesign list never links there.

- [ ] Publications filters `sticky top-0` sit under ticker + header. Same on Vite.

## Home (open)

- [x] **Only the hero paints on `/`.** `.reveal` stayed at opacity 0 when `HomePage` failed to hydrate (Vite 504). Astro `html.astro-public` now shows SSR sections.
