# Phase 3 — Public pages (redesign parity)

**Checkpoint (2026-10-06):** Phase 3 public islands are done. Phase 4 R2 adapter is optional: set `R2_*` in `apps/cms/.env`. Unset keeps files on local disk.

**Source of truth:** `feat/pm-storytelling-refonte` (merged into `feat/astro-payload-migration`).

Do not port from `main`. The old Vite home (`HeroSection`, `Insights`, `MountainTransition`) is obsolete.

## Redesign route map

| Path | Vite component | Astro status |
|------|----------------|--------------|
| `/` | `App` (HeroSectionMountain, TrustStrip, Positioning, ValueProps, Capacity, Services, InsightsMerged, CTA, FAQ) | Island |
| `/about` | `AboutPage` | Island |
| `/offres` | `OffresPage` | Island (replaces old `/services` hub) |
| `/expertises` | `ExpertisesPage` | Island |
| `/contact` | `ContactPage` | Island |
| `/faq` | `FAQPage` | Island |
| `/actualites`, `/actualites/[slug]` | `ActualitesPage`, `ArticlePage` | Island + Payload |
| `/publications` | `PublicationsPage` (PDF catalogue) | Island + Payload uploads |
| `/publications/[slug]` | — | Removed. Publications are files only. |
| `/marche-capitaux`, `/ingenieurie-financiere`, `/gestion-sous-mandat` | Department routes | Island + `src/data/departments.ts` |
| `/bourse` | `BoursePage` | Island |
| `/outils-investisseur` | `SimulateurPage` | Island |
| `/portal`, `/dashboard`, `/admin/*` | Client + admin | Stay on Vite until cutover |
| `/auth` | `AuthPage` | Island (no Convex sign-in; contact CTA until cutover) |

**Redirects (legacy URLs):**

| Old | New |
|-----|-----|
| `/services` | `/offres` |
| `/gestion-libre`, `/gestion-assistee` | `/offres` |
| `/insights` | `/publications` |
| `/marches-opportunites` | `/actualites` |
| `/mot-dg` | `/` |
| `/simulateur` | `/outils-investisseur` |

## Astro wiring

```text
apps/web/
├── astro.config.mjs     → publicDir: repo /public, alias @ → src/
├── src/styles/global.css → @import repo src/styles.css
├── src/lib/payload.ts   → build-time CMS fetch
├── src/cms/StaticCMSProvider.tsx → replaces Convex CMSProvider on public build
└── src/islands/*.tsx    → client:load wrappers around src/routes + src/App sections
```

Redesign components expect:

1. **`src/styles.css`** tokens (`--mauve`, `--jaune-or`, `btn-primary`, `page-container`, …)
2. **`EditableText`** — StaticCMSProvider reads Payload `site-content` at build time
3. **`Link` / `useLocation`** — islands mount inside a thin TanStack router shell, or links become `<a href>` in a follow-up pass
4. **`InsightsMerged` Convex query** — swap news for Payload `fetchNewsFeed`. Publications are Payload PDF uploads; empty CMS falls back to `src/data/publications.ts`.

## Not in Phase 3

- Payload admin (already on `:3001`)
- Vite `/admin` removal
- Auth, portal, and dashboard (stay on Vite until cutover)
- Full DESIGN.md motion parity (GSAP, cloud shader) — Lenis is on Astro `SiteShell`

## Check

```bash
bun run dev:cms          # Payload on :3001 (not :3000 — Sama Naffa uses that port)
bun run dev:web          # Astro on :4321
PAYLOAD_URL=http://localhost:3001 bun run build:web
bun run check:news
```
