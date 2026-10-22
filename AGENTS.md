# EVEREST Finance website (new_lp)

## Current work

The site is being aligned on the content referential V2.1.
Read `docs/referentiel/PLAN.md` first, then
`docs/referentiel/SITEWEB-REFERENTIEL-V2.1.md`. The referential is the only
source of public text: copy it word for word, write no copy of your own.

## Layout

| Path | What | Status |
|------|------|--------|
| `apps/web` | Astro public site (pages in `src/pages`, React islands in `src/islands`) | Active |
| `apps/cms` | Payload CMS on Next.js. Serves the built Astro site. Content seeds in `src/seed` | Active |
| `src/` (root) | Legacy Vite + TanStack app. Its components are still imported by the Astro islands (`@/components/...`) | Shared, do not delete |
| `convex/` | Legacy backend | Do not extend |

Each app has its own `AGENTS.md`. Read it before touching that app.

## Commands (Bun)

- `bun install`
- `bun run dev:migration`: CMS and web together
- `bun run build:web`, `bun run build:site`
- `bun run check:seed`, `bun run check:news`, `bun run check:lead`, `bun run lint:cms`

## Git

- Work on `staging`. Commit and push to `origin/staging`. No feature branch
  and no merge to `main` unless the user asks (`.cursor/rules/work-on-staging.mdc`).
- `origin` is `aliouuuw/everest_new`. The `everest-finance` remote returns
  "Repository not found": do not push there.
- Staging deploys to https://staging.everestfin.com (Vercel). Do not change
  the Gandi DNS of `everestfin.com`.
- Conventional Commits. No co-author or tool attribution lines.
