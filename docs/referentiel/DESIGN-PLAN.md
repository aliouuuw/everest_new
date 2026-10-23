# Design enhancement plan (after lots L0 to L8)

Source: `/impeccable critique` of https://staging.everestfin.com, 22 Oct 2026
(two isolated assessments: design review, and detector plus browser
measurements at 1440 and 390 px). Score: 20 / 40 (Acceptable).

## Constraints (every item below keeps them)

1. Copy: word for word from `SITEWEB-REFERENTIEL-V2.1.md`. No new text.
   Design may change size, weight, layout and order of display, not words.
2. Colors: `#0E2826`, `#1A3A35`, `#B68A3E`, `#D4B26C`, `#FFFFFF`,
   `#FAF8F4` only.
3. No performance lexicon, no em dash. `bun run check:lexicon` stays at 0.
4. All content in the served HTML and visible without JavaScript (II.3).
   Motion may move visible content; it never gates it.
5. Every change passes `bun run check:copy`, `check:lexicon`,
   `apps/web/e2e/pages.check.ts` and `apps/web/e2e/frame.check.cjs`.

## Diagnosis in one paragraph

The site is faithful and calm, but generic. The N1 gold rule / N2 green
rule device is the one authored idea, and it is overused: about 30 rules
on La société, so the rules become wallpaper. The proof architecture
(referential I.4), which is the axis of the site, has no typographic
weight. The brand story (« Encordés, vers le sommet », the cordée, the
caravan) has no visual form. Gold buttons fail contrast everywhere.

## Phase 1: accessibility and correctness (P0 / P1, about 1 day)

| # | Issue (evidence) | Fix | Files |
|---|------------------|-----|-------|
| 1.1 | White on gold `#B68A3E` = 3.14:1 on every filled button and chip (header, hero, « Devenir client », « Envoyer la demande », « Télécharger », filters) | Forest `#0E2826` text on gold (4.96:1). Hover: tonal shift to `#D4B26C`, no lift, no off-charter `#b5832a` | `src/styles.css` (`.btn-primary-dark`), `Header.tsx`, `ContactPage.tsx`, `PublicationsPage.tsx`, `ActualitesPage.tsx` |
| 1.2 | Home hero text and both CTAs stay at opacity 0 for about 4 s (GSAP `set opacity:0`) | Animate `y` only, from visible; or drop the entrance | `HeroSectionMountain.tsx:43-57` |
| 1.3 | No skip link; contact inputs and selects have `outline-none` (border-only focus) | Skip link to `<main>`; one designed focus ring token (2px gold, offset 3px) on all controls | `SiteShell.tsx`, `styles.css`, `ContactPage.tsx`, `PublicationsPage.tsx` |
| 1.4 | No active state or `aria-current` in nav and dropdown | `aria-current="page"` plus a weight or color shift on the current entry | `Header.tsx` |
| 1.5 | Low-contrast small text: contact labels 4.25:1, consent 2.71:1, Analyses dates 3.74:1, gold badge 2.84:1 at 10px | Raise to `--night-80` or forest; badges forest on light gold | `ContactPage.tsx`, `PublicationsPage.tsx` |
| 1.6 | `/analyses` jumps h1 to h3 | Card titles h2, or a visually hidden h2 for the list | `PublicationsPage.tsx` |
| 1.7 | Touch targets under 44px at 390 px: footer links 16px, in-body text links 19 to 23px, FAQ letter chips 30px | Padding to reach 44px hit areas without changing the visual size | `Footer.tsx`, `Referentiel.tsx` (`TextLink`), `FAQPage.tsx` |
| 1.8 | Contact form: no `autocomplete` | `autocomplete="name"`, `"email"`, `"organization"` | `ContactPage.tsx` |

Commands: `/impeccable harden`, then `/impeccable audit` to confirm.

## Phase 2: hierarchy and typography (P1, about 1 day)

| # | Issue | Fix |
|---|-------|-----|
| 2.1 | The 4 home proofs (« Dix ans… », « Agréée… depuis le 30 mars 2016 », « La chaîne complète… », « Une vingtaine… ») sit in 20px headings: the axis of the site has no weight | Make the proof block the peak of the home page: display size, tabular figures, generous space. Same words |
| 2.2 | « La confiance ne se déclare pas : elle s'organise. » gets the same treatment as every N1 | Give the governance N1 the same peak treatment, as the closing statement before the final CTA |
| 2.3 | The N2 « green » rule renders near-black on light grounds and grey on dark | N2 rule 2px in charter `#1A3A35` (light grounds) or a light tint of it (dark grounds); gold N1 rule stays 3px. Gold reads primary, green secondary |
| 2.4 | `max-w-[62ch]` renders about 95 characters per line (French glyphs are wider than `ch`) | Measure in `em` (about 36em) to land near 70 characters |
| 2.5 | Font stack: `Aptos` first with no `@font-face` (voice changes by OS); `Fraunces` imported and unused | One decision: self-host the display face (or drop Aptos) and remove the unused Fraunces import |
| 2.6 | Two button languages (tracked caps vs sentence case) and three arrow styles | Sentence case everywhere; one arrow (the up-right SVG of `Referentiel.tsx`) |
| 2.7 | Six engagements set inline with « · » on home | Same words set as a one-per-line list |

Commands: `/impeccable typeset`, `/impeccable layout`.

## Phase 3: signature and atmosphere (P1 / P2, about 2 days)

| # | Issue | Fix |
|---|-------|-----|
| 3.1 | Hero video is 21 MB, `preload="auto"`, no poster; under a 0.98 wash it is almost invisible, and it falls back to a black field | Charter-graded poster; 720p clip about 1.5 MB (webm + h264); `preload="metadata"`; still image on phones, Save-Data and reduced motion; lighten the wash so the mountain is seen |
| 3.2 | The cordée has no visual form | One authored device: the mandated rules become a continuous rope line that threads the proofs, the 4 « Parcours » steps and the chain « structuration… règlement-livraison ». Drawn in SVG, static by default, drawn on scroll as a progressive enhancement |
| 3.3 | Analyses, the proof by publication, is the least designed surface (placeholder thumbnails, file-size metadata) | Real first-page covers generated at build time (no client pdf.js, which fails on older browsers), date and format first, size last |
| 3.4 | Thin pages (Sama Naffa hero slab, expertise endings as a bare link band) | Sama Naffa: hero and logo in one composition. Expertise pages end on their end-to-end responsibility line, then the cross-links |
| 3.5 | Green WhatsApp bubble (`#22c55e`, off-charter) covers text on phones | Charter colors and a position that clears the content column, or move it to the footer |

Commands: `/impeccable optimize` (3.1), `/impeccable delight` or `/impeccable bolder` (3.2, 3.3), `/impeccable layout` (3.4).

## Phase 4: states and edge cases (P2, half a day)

| # | Issue | Fix |
|---|-------|-----|
| 4.1 | Actualités: 0 articles, but filters show and the message says « Aucun article ne correspond à vos critères » | When the collection is empty, hide the toolbar and the message; keep N1/N2 |
| 4.2 | La société anchor nav wraps at 1280 px and is not sticky | Sticky anchor nav with scroll spy, one line |
| 4.3 | Analyses filters (Hebdomadaire, Mensuelle, Semestrielle) do not match the formats the §4 copy names | Product decision: filter by the formats the copy names once publications carry that field |

Command: `/impeccable harden`.

## Phase 5: responsive and length (P2)

| # | Issue | Fix |
|---|-------|-----|
| 5.1 | Home is 9,200 px tall on phones, La société 9,400 px | The referential allows N2 « au dépliage »: on phones only, N2 in `<details open>` closed by CSS media query (text stays in the HTML and readable without JS) |
| 5.2 | Phone menu: 12 entries plus 2 buttons | Expertises sub-items collapsed by default in the drawer |

Command: `/impeccable adapt`.

## Out of scope here (decisions or inputs)

1. **FAQ (`/faq`)**: off-system design and contradictions (« sous 24h
   ouvrées » vs the 4-hour promise on Contact; « recommandations »).
   Blocked on the V1.0 text (PLAN.md « L7: what to send »). Rebuild it on
   the shared blocks when the text arrives.
2. **CTA vocabulary**: « Ouvrir un compte » (header, kept by decision),
   « Devenir client », « Entrer en relation » name one goal three ways.
3. **Investor space** CTA on Opportunités: hidden until the space exists.
4. **Contact form pipeline** (II.2 prospection): see PLAN.md.

## Decisions (22 Oct 2026)

1. **First:** Phase 1, accessibility.
2. **Tone:** a bolder brand world. The mountain and the caravan carry
   atmosphere across all pages, not only the home hero. Phase 2 sets the
   type scale and the proof peaks with that ambition; Phase 3 builds the
   world (rope device, hero, publication covers).
3. **Next pass scope:** Phases 1 and 2, then a new critique.

## Progress (23 Oct 2026)

- Phase 1: done (`40504a4`).
- Home redesign and header pass: done (`ff1029c`, `8d328d5`).
- Inner pages on the home system: done. Covers 2.3 (rules replaced by the home's
  horizontal rule), 2.4 (`max-w-[36em]`), 2.6 (sentence case, one arrow), 3.3
  (real covers, no client pdf.js, date first and size last), 4.1 (empty
  Actualités hides its toolbar). 3.4 Sama Naffa: logo and text in one composition.
- Still open: 2.5 font decision, 3.1/3.2 signature, 3.5 WhatsApp bubble (owner: keep),
  4.2 sticky anchor nav, 5.x phone length.

## Order

Phase 1, then 2, then 3. Phases 4 and 5 can run alongside 3. Re-run
`/impeccable critique` after Phase 2 and after Phase 3.
