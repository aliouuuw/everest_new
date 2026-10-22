# Referential V2.1: work plan

Source: `SITEWEB-REFERENTIEL-V2.1.md` in this folder (EF-SITE-REFERENTIEL-2026-V2.1,
8 July 2026, status "soumis à validation ADG"). Converted verbatim from the
`.docx` sent by email. If the two ever differ, the `.docx` wins.

## Rules (from the referential)

1. **Copy, never write.** Every public text comes from Part III, word for word.
   The dev team writes no copy of its own (II.3). If a slot has no text in
   Part III, leave it out and list it in "Questions" below.
2. **Banned words in public pages:** « performance », « rendement »,
   « attractif », « compétitif » (I.6). The standard disclaimer on
   publications is the only exception (it quotes « performances passées »).
3. **Spelling:** « EVEREST » in capitals, « EVEREST Finance », « AMF-UMOA »,
   « agréée », vouvoiement, « Analyses », « clientèle privée », « Private
   Office ». No mention of BTD 2029. Agrément: `SGI/DA/2016/60`, no stray space.
4. **Charter colors (II.3):** forest `#0E2826`, mid green `#1A3A35`, metallic
   gold `#B68A3E`, light gold `#D4B26C`, white `#FFFFFF`, warm off-white
   `#FAF8F4`. `#C8A96B` is off-charter. Today `src/styles.css` uses
   `--everest-green: #012d2a` and `--jaune-or: #cb9824`: both must move to
   the charter values.
5. **One taxonomy:** the same 8 entries, same labels, same order, in the menu
   and in the footer (II.1).

## Gap check (22 Oct 2026, on `staging` at `3511d28`)

Searched `apps/web/src`, `apps/cms/src/seed` and the shared `src/` components:

| Item | State |
|------|-------|
| Charter colors | Missing (old greens and golds in use) |
| « Encordés, vers le sommet » | Missing |
| Hero « Accès stratégique aux marchés financiers de l'UEMOA » | In `src/` only, check wording |
| « La société », « Opportunités », « Six engagements » | Missing |
| 4 expertise pages | Routes exist under `apps/web/src/pages/expertises/`, text not checked |
| « rendement » | 9 files in `src/`: audit each one |

## Lots, in order

Each lot = one commit on `staging`. Check the page at
https://staging.everestfin.com after the push.

1. **L0 Audit. Done (22 Oct 2026), see `AUDIT.md`.** For each Part III
   block: the file that renders it and its state (absent / different /
   conform). No code change.
2. **L1 Global frame.** Charter colors. Menu and footer with the 8 entries
   (II.1). Footer copyright and signature (§9). « Mentions légales »,
   « Conditions générales d'utilisation », « Politique de Confidentialité ».
   Home meta description (II.3). Route map below.
3. **L2 Accueil** (§1), blocks in the stated order.
4. **L3 La société** (§2.1 to §2.7). §2.7 Références stays hidden until the
   legal check (§10).
5. **L4 Expertises** (§3 intro, §3.1 to §3.4).
6. **L5 Analyses & Publications** (§4, disclaimer on every publication) and
   **Actualités** (§5).
7. **L6 Opportunités** (§6), **Sama Naffa** gateway (§7, no N2), **Contact /
   Devenir client** (§8, 4 steps and contact details).
8. **L7 Footer pages** (§9): legal pages as structures, FAQ with its 8 entries.
9. **L8 Lexicon gate.** Grep the built site for the banned words and the
   off-charter color. Zero hits outside the disclaimer.

## Route map (to confirm with the user before L1)

| Referential entry | Current route | Proposal |
|-------------------|---------------|----------|
| 1. Accueil | `/` | keep |
| 2. La société | `/about`, `/mot-dg` | `/la-societe`, redirect both |
| 3. Expertises | `/expertises` + 4 subpages | keep |
| 4. Analyses & Publications | `/publications`, `/insights` | `/analyses`, redirect both |
| 5. Actualités | `/actualites` | keep |
| 6. Opportunités | `/marches-opportunites`, `/offres` | `/opportunites`, redirect both |
| 7. Sama Naffa | none | `/sama-naffa` |
| 8. Contact / Devenir client | `/contact` | keep |

Old department routes (`/marche-capitaux`, `/ingenieurie-financiere`,
`/gestion-*`, `/bourse`, `/services`, `/simulateur`, `/outils-investisseur`)
have no entry in the referential. Redirect them to the closest entry, after
the user agrees.

## Blocked (referential §10): do not invent

| Item | Waits on |
|------|----------|
| Guinée operations data (proofs) | ADG |
| Legal data: company form, capital, RCCM, tax ID, publication director, host | Legal + dev |
| 13 reference logos on the new site | Legal |
| BRVM ticker redistribution right | Legal. Keep the ticker, flag it |
| TikTok in the social links | ADG |
| Carrières page | ADG / RRHA |
| Investor space (auth, rights, 10-year logs) for Opportunités and reserved publications | Not specified. Ask before building |

## Decisions (22 Oct 2026)

1. **Em dashes: replace.** A pair of « — » becomes parentheses. A single
   « — » becomes a comma or a colon. Every other word stays as in Part III.
2. **FAQ V1.0 source: none.** Keep the FAQ as it is until a source arrives.
3. **Route map: approved.** Old department routes redirect to the closest
   entry (see `apps/web/src/pages/*.astro`).
4. **BRVM ticker: hidden** until a real feed and the legal check.
5. **Header buttons « Ouvrir un compte » and « Accès Client »: kept.**
6. **§6 CTA « Accéder à l'espace investisseur »: hidden** until the
   investor space exists.
7. **Footer social icons: removed** until the real URLs arrive.

## Lot status

| Lot | State |
|-----|-------|
| L0 Audit | Done (`19d812b`) |
| L1 Global frame | Done. `apps/web/e2e/frame.check.cjs`: 276/277 checks pass at 7 widths |
| L2 Accueil | Done. Text in `src/content/home.ts`; `bun run check:copy` (word for word) and `apps/web/e2e/home.check.ts` (80/80) |

L1 also built `/opportunites` (§6) and `/sama-naffa` (§7) with their full
text, so that no menu entry points to a missing page. L6 finishes them.

## Found during L1 (not in the lot)

1. **Staging PDFs return 500.** `/api/media/file/*.pdf` fails on
   staging, so « Télécharger » on publications is broken there.
2. **PDF thumbnails fail on older browsers.** `pdfjs-dist` 5.6 calls
   `Map.prototype.getOrInsertComputed`, which Chromium 141 lacks. Same
   error on staging. This is the one E2E check that still fails.
3. **Fixed:** `/analyses` sorted the shared publication list in place.
   Without the CMS, this changed the home « À la une » item and broke
   React hydration (error #418).

## Notes from L2

1. Home texts use new CMS ids (`home.*.n1`, `home.*.n2`). The seed only
   creates missing rows, so the old Payload rows (`home.positioning.title`,
   `home.cta.*`, …) stay in the database, unused. Clean them up later.
2. The new ids have no Payload row on staging yet: the page shows the
   JSX text, which is the referential text. Run `bun run seed:site-content`
   against the staging database to make them editable in Payload.
3. Global CSS beats Tailwind utilities: `.font-primary` (weight 400) and
   `h1, h2 { line-height: 1 !important }` are unlayered. New blocks do not
   use `font-primary` and mark heading line-heights `!`.

## Waiting on the user

1. Real LinkedIn and Facebook URLs for the footer (user adds them later).
