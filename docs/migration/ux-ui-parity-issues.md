# UX/UI parity issues (Astro vs redesign)

Baseline: Vite redesign (`feat/pm-storytelling-refonte`). Surface: `apps/web`.
Audit date: 2026-09-08. Tag: `--ux-ui`. No code changes in the audit itself.

Status: open unless marked done.

## High

- [x] **Publications are files, not HTML slugs.** `/publications` and home Insights use `PUBLICATION_FILES` (PDF download). Public `/publications/[slug]` HTML pages are removed.

- [ ] **Accès Client 404.** Header `to="/auth"`. Astro has no `/auth`. Hide the CTA, stub a message, or point to the live portal.

- [x] **Home Insights news cards have no photos.** Vite `InsightsMerged` uses `article.imageUrl`. `InsightsMergedStatic` now renders the same 16/10 image when `imageUrl` is set.

## Medium

- [ ] **Home CTA « Évaluer mon profil d'investisseur ».** Vite opens `InvestorProfileModal`. Astro sends `secondaryHref` to the account-opening Vercel URL. Same label, different product.

- [ ] **Lenis missing.** Vite `Layout` wraps `LenisWrapper`. Astro `SiteShell` does not. Scroll feel diverges.

- [ ] **Outils quiz does not save a lead.** Island renders `SimulateurView` with no `onSubmitLead`. Result still shows. User thinks the profil is stored.

## Low

- [ ] **Header chrome on `/about` (and similar).** `forceScrolledStylePaths` omits `/about`, `/faq`, `/publications`, `/actualites` list. Hero `padding-top` can clip under ticker + header.

- [ ] **Site copy mostly defaults.** Import created `home.hero.title`. Other `EditableText` keys stay hardcoded.

- [ ] **`/services`, `/gestion-libre`, `/gestion-assistee`.** Astro redirects to `/offres`. Vite still renders `ServicesPage`. Phase 3 wants the redirects.

## Informational

- [ ] Vite still mounts `/publications/$slug` (Convex). Redesign list never links there.

- [ ] Publications filters `sticky top-0` sit under ticker + header. Same on Vite.

## Home (open)

- [x] **Only the hero paints on `/`.** `.reveal` stayed at opacity 0 when `HomePage` failed to hydrate (Vite 504). Astro `html.astro-public` now shows SSR sections.
