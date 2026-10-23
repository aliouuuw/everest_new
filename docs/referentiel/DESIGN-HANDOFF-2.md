# Design handoff 2: EVEREST Finance home (after the 23 Oct 2026 session)

For: the next design agent on `apps/web` (home page).
From: the session of 22–23 Oct 2026, which ran six design passes on the home.
Read this file first, then `docs/referentiel/DESIGN-HANDOFF.md` (the first handoff).
The first handoff still holds for the job, the hard constraints (C1–C7), the brand
and the references. This file adds what the owner said since, what exists in the
tree now, and the traps that cost time.

## 1. Where things stand

- **Nothing is committed.** All home work is uncommitted on `staging` (HEAD `40504a4`).
- **The owner rewound the last pass** (a Swiss/editorial restyle) with the words
  "not quite satisfied". The tree now holds the pass before it (section 4).
- **The owner's last stated direction still stands:** "much more Swiss / editorial,
  with a much more polished modern pro look, like Ramp and Stripe", and "no
  delight that makes no sense". The rewound attempt did not satisfy it. Ask the
  owner what fell short before you build (section 7).
- All checks pass on the current tree (section 6).

## 2. What the owner said, in order (the feedback log)

Each line is the owner's verdict on a pass. Treat it as the brief.

| # | Pass | Owner verdict |
|---|---|---|
| 1 | Reading-room home: text blocks, N2 behind `details`, two covers | Asked for audit, polish, delight |
| 2 | Polish: analyses and governance N2 open, covers beside text, scroll parallax on the summit | Accepted as a base |
| 3 | Four disclosure looks (round, tile flood, row, dossier), topographic contour SVGs, curved route SVG, internet photos (Alpine rope team, khaki city duotones) | "Reveal cards bland and repetitive", wanted contrast. Then, at critique: **"too many reveal elements; IA isn't different; UI not polished and serious enough (Stripe, Ramp, Mercury, Endex); decorations not in theme (topography, curves)"** |
| 4 | Elevation after critique: one disclosure (expertises only), all other N2 visible, chain diagram as a stretched-logo roof with labelled stations, straight-line routes, roof echo at the close, West African CC0/PD photos, one container | "Better, but **no need for the same mountain SVG animation everywhere**. Diversify, bolder, more delightful" |
| 5 | Diversify: gold order pulse on the chain, "doors" for audiences (widen on hover), cover tilt, image push-in, governance as a ledger; then clarify/typeset/distill/animate (inline links, two prose sizes, transform-only pulse) | **"The animated cards in the audiences section make no sense."** Asked to review every choice that makes no sense, and to go **Swiss / editorial, Ramp / Stripe polish** |
| 6 | Swiss restyle: 12-col grid, sticky section heads left (cols 1–5), content right (7–12), 1px forest rule per section, white everywhere except hero/engagements/close, chain as a flat flow line with stations, doors/tilt/push-in removed | **Rewound: "not quite satisfied"** |

Patterns in this log:

1. The owner rejects motion or decoration that does not explain something.
   Every "delight" that was only a hover effect failed (tile flood, doors, tilt).
2. The owner rejects one motif repeated across sections (contours, the summit
   line in three places).
3. The owner wants seriousness from structure and precision (Stripe, Ramp), not
   from more effects. Pass 6 moved that way but was not enough. Something was
   still missing; nobody knows what yet.
4. Showing evidence beats folding it. The owner chose "expertises only" for
   disclosures (pass 4) and did not reverse it.

## 3. Owner decisions on record (do not re-ask)

- **Chain diagram labels:** the words of the positioning N2 may be used as diagram
  labels (structuration, placement primaire, courtage, conservation, conseil en
  allocation; « de la prise d'ordre » / « au règlement-livraison »). This closes
  first-handoff question §9.2.
- **Disclosures:** only the four expertise N2 fold. Every other N2 is visible.
- **Decoration:** curved decoration is out. The owner later also rejected repeating
  the summit line; so use at most one drawn motif, where it explains something.
- **Images:** internet images are allowed **as placeholders**. Prefer public domain
  or CC0 (no on-page credit needed). Current set: `docs/referentiel/MEDIA-PLACEHOLDERS.md`.
- **Phone height:** the 6,000 px target is dropped because evidence stays open.
  `apps/web/e2e/home-design.check.ts` gates phones at 8,500 px.
- **WhatsApp bubble:** do not change it (off-charter green, placeholder number
  `+221000000000`). Raise the number before launch.

## 4. What is in the tree now (the pass-5 state)

Files: `src/components/Sections/HomeReferentiel.tsx`, `src/components/Sections/home.css`,
`src/components/Hero/HeroSectionMountain.tsx`, `apps/web/src/islands/HomePage.tsx`.

| Block | Current implementation | Owner status |
|---|---|---|
| Hero | Graded summit poster, desktop-only film, settle + scroll recede, 2-line H1, square gold CTA | Never criticised. Keep. |
| Positioning | Statement (28px) left, N2 right; **chain figure**: stretched-logo roof polyline over 5 stations, labels parsed from the N2, baseline with a travelling gold pulse that lights each station | Roof shape judged a distorted logo in pass 6. Pulse = the one motion with a reason. |
| Proofs | Open band on paper, 4 columns, fact lead (28px) splits each N1, N2 visible, subgrid alignment | Not criticised. |
| Engagements | Forest band, single-column ledger, gold squares, Éthique & Déontologie last and larger in gold-light; « La société » linked | Not criticised. |
| Analyses | N1 + N2 + link left, two weekly covers right with catalogue titles; **3D tilt on hover** | Tilt judged a gimmick in pass 6. |
| Expertises | Paper; image frame left (`:has()` swap per hovered row, **push-in on hover**), 4 rows right, the page's only `details` | Swap is meaningful; push-in is not. |
| Segments | **Four "doors" that widen on hover** | **Rejected: "makes no sense".** Remove first. |
| Sama Naffa | Paper, N1 + N2 + link, logo (no blend) | Not criticised. |
| Close | Forest, display H2, governance N2 as a 5-line ledger, two CTAs | Not criticised. |

**`DESIGN.md` is out of sync.** Its "Elevation & Depth" section still describes the
rewound Swiss pass (12-col grid, rules, no gimmicks), while the "Layout" section
describes the roof echo and routes from pass 4. Rewrite `DESIGN.md` from whatever
you ship. `PRODUCT.md` is accurate.

## 5. Hard constraints (summary; full table in the first handoff §3)

1. Copy word for word from `docs/referentiel/SITEWEB-REFERENTIEL-V2.1.md`. You may
   split a string across elements; you may not add words, labels or numbers.
   Captions from `src/data/publications.ts` (catalogue records) are allowed.
2. Six charter colours only: `#0E2826`, `#1A3A35`, `#B68A3E`, `#D4B26C`, `#FFFFFF`, `#FAF8F4`.
3. Fixed block order: hero, positioning, proofs, engagements, analyses, expertises,
   segments, Sama Naffa, governance/close.
4. All text in server HTML, visible without JavaScript. No opacity-0 start states.
5. No growth imagery (a line rising left to right reads as a chart: avoid it).
6. Plus Jakarta Sans only, until the owner decides on a display face.

## 6. Checks (all green on the current tree)

```bash
bun run check:copy && bun run check:lexicon && bun run check:seed
bun run build:web
cd apps/web && bunx astro preview --port 4322 --host 127.0.0.1   # separate shell; it daemonises and can die between builds
export CHROMIUM_PATH=$HOME/Library/Caches/ms-playwright/chromium-1194/chrome-mac/Chromium.app/Contents/MacOS/Chromium
bun apps/web/e2e/pages.check.ts http://127.0.0.1:4322 <outdir>
node apps/web/e2e/frame.check.cjs http://127.0.0.1:4322 <outdir>
bun apps/web/e2e/home-design.check.ts http://127.0.0.1:4322 <outdir>   # writes screenshots at 5 widths + no-JS
```

Baseline: copy 155/155, lexicon 0, pages 526/526, frame 276/277 (known `/analyses`
pdf.js failure), home-design 7/7. Detector (`impeccable detect <url>`): only
`overused-font`, which is the pending font decision.

`home-design.check.ts` asserts "no unapproved copy": the stripped home text minus
the referential strings, nav labels, catalogue titles and chain labels must be
empty. Any new visible string fails it. That is intended.

## 7. First moves for the next agent

1. Ask the owner what fell short in pass 6 (the Swiss restyle). Offer concrete
   candidates: not bold enough; too empty or white; heading column too narrow;
   the chain flow too plain; missing product-like artifacts (Ramp and Stripe show
   framed product UI; Everest has none, so the documents and the chain must play
   that role).
2. Remove the audience doors, the cover tilt and the expertise push-in. These
   are rejected or unjustified in every reading of the feedback.
3. Rebuild from the owner's answer, keeping what was never criticised (hero,
   proofs band, engagements ledger, governance ledger, expertise image swap,
   chain pulse).
4. Show the owner screenshots at 1440 and 390 before polishing details.
5. Rewrite `DESIGN.md` from the shipped result.

## 8. Traps that cost time

- **Global margin reset:** `.everest-home p, h2, figure { margin: 0 }` (in `home.css`)
  beats any single-class margin rule. Prefix such rules with `.everest-home`.
  Same for phone overrides of prefixed rules.
- **SVG dash drawing:** `pathLength={1}` with `vector-effect: non-scaling-stroke`
  makes Chrome resolve dashes in screen space, so lines never finish drawing.
  Reveal drawings with `clip-path` instead.
- **Flex parent splits text:** a `display: flex` paragraph turns `<strong>` and the
  following text node into separate items (a comma lands on a new line). Wrap the
  sentence in one inner `<span>`.
- **No-wrap spans:** spaces inside `white-space: nowrap` spans are not break points.
  Put the space outside the span (`<Fragment>{' '}<span>word</span></Fragment>`).
- **Hover specificity:** a `:has(summary:hover)` rule outranks `[open]`; a hover
  hint can freeze an opened state. Scope hover hints to `:not([open])`.
- **Accessible names:** an `aria-hidden` span is dropped from a link's name.
  `frame.check` looks up « Découvrir Sama Naffa → » by name, so keep the arrow in
  a plain `sr-only` span.
- **Scroll timelines:** write `animation-*` longhands (the minifier drops the
  shorthand). Lenis smooth scroll makes screenshots taken right after a scroll
  show mid-animation states; wait about 1 s.
- **Build noise:** "Payload unreachable (localhost:3001)" during `build:web` is
  expected; the build falls back to the checked-in copy.
- **Section screenshots** taken with Playwright show the fixed header over the
  section top. That is an artifact, not a layout bug.

## 9. Tools

- **Playwright MCP is broken here** (no Google Chrome). Use Node scripts that
  require `node_modules/playwright` and launch the cached Chromium path above.
- **Higgsfield is not connected in Claude Code** (no MCP entry). Generated imagery
  needs the owner to add it (`claude mcp add`) first. Do not substitute silently.
- **Wikimedia Commons** works for placeholder images (API, no key). Grade with PIL
  to the charter (gradient map forest to paper). Record each file in
  `MEDIA-PLACEHOLDERS.md`.
- The `impeccable` skill critique for this page: `.impeccable/critique/2026-10-23T02-05-59Z__apps-web-src-islands-homepage-tsx.md`
  (18/32 before pass 4). Re-run `/impeccable critique` after your pass.

## 10. Open owner decisions (unchanged)

1. Display typeface (licensed or self-hosted) vs Plus Jakarta Sans.
2. Header labels « Ouvrir un compte » / « Accès Client » are not referential; header
   buttons are pills while the home uses square buttons.
3. Partner logos (Legal), BRVM live band (data rights), house photography.
4. `/analyses` has no anchor per issue, so the home covers link to the listing.
5. Commit message when the owner approves: `feat(web): redesign the referential landing page`.
