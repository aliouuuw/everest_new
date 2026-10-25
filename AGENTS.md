# EVEREST Finance website (new_lp)

## Current work

The site is being aligned on the content referential V2.1.
Read `docs/referentiel/PLAN.md` first, then
`docs/referentiel/SITEWEB-REFERENTIEL-V2.1.md`. The referential is the only
source of public text: copy it word for word, write no copy of your own.

Lots L0 to L8 are done (L7 is blocked on Legal inputs). **The interface is
frozen** (team request, 25 Oct 2026): this step only adapts content to the
referential and sets up the CMS. The site uses the validated interface of
`883cbef` / `c9cdad0` (old components, old header and footer), filled with
referential text. Do not redesign; the 23–24 Oct redesign was withdrawn
(see `DESIGN.md`). Open points: `docs/referentiel/COMPLIANCE-V2.1.md`.

- Public texts live in `src/content/*.ts`, keyed by CMS id. New ids must not
  reuse an old Payload row (the seed never updates rows).
- Text goes into the old components through their props or `EditableText`
  ids (`HOME_TEXT`, `SOCIETE_TEXT`, …); page heads use `src/components/PageHead.tsx`.
- Checks before every push: `bun run check:copy`, `bun run check:lexicon`,
  `bun run check:seed`, then with a preview server on port 4322
  (`bunx astro preview --port 4322 --host 127.0.0.1` in `apps/web`):
  `bun apps/web/e2e/pages.check.ts` and `node apps/web/e2e/frame.check.cjs`.
  Where external requests hang (sandbox), set `E2E_OFFLINE=1` and serve
  `apps/web/dist` with `python3 -m http.server 4322`.
- Seeding the staging database (`bun run seed:site-content`) needs the
  user's OK each time.

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
