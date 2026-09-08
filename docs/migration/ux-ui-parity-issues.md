# UX/UI parity issues (Astro vs redesign)

Baseline: Vite redesign (`feat/pm-storytelling-refonte`). Surface: `apps/web`.
Audit date: 2026-09-08. Tag: `--ux-ui`. No code changes in the audit itself.

Status: open unless marked done.

## High

- [ ] **Publications are files, not HTML slugs.** `/publications` is the PDF catalogue (`PUBLICATIONS` + preview/download). Home Insights still maps Payload docs to `/publications/[slug]` with « Lire la publication ». After import, `test-1` / `test-2` are HTML pages. Fix: drop public `[slug]`; reuse the PDF list on home. Keep Payload HTML off the public IA.

- [ ] **Accès Client 404.** Header `to="/auth"`. Astro has no `/auth`. Hide the CTA, stub a message, or point to the live portal.

- [ ] **Home Insights news cards have no photos.** Vite `InsightsMerged` uses `article.imageUrl`. `InsightsMergedStatic` renders an empty 16/10 block.

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

- [ ] **Only the hero paints on `/`.** Sections below stay in the DOM at `.reveal { opacity: 0 }` unless `useReveal` adds `.in`. Nested `SiteShell` + page island can skip hydration. Tracked as the first code fix after this file.
