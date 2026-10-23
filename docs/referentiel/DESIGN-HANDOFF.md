# Design handoff: EVEREST Finance public site (home first)

For: the design agent who takes over the visual design of `apps/web`.
From: the previous agent session, 22 Oct 2026.
Owner verdict on the last pass: **"Way worse than what it was at `883cbef`."**
The site must become a landing page of the class of stripe.com, ramp.com,
mercury.com, withpersona.com and endex.ai, inside the hard constraints below.

## 1. The job

Redesign the public site, **home page first**, so that it has:

1. A clear, compressed information architecture (a visitor understands the
   house in 10 seconds, not after 10,000 px of text).
2. Meaningful media: real imagery and video, used for a reason.
3. Authored illustration (SVG) that explains something real.
4. Motion with a purpose: it shows a sequence, a state, or a relationship.
5. Craft: type scale, rhythm, states, responsive behavior, accessibility.

Do not polish the current home. The owner rejected it. Start from the
referential, the brand, and the references in section 7.

## 2. Read first (in this order)

1. `AGENTS.md` (root), then `apps/web/AGENTS.md`.
2. `docs/referentiel/SITEWEB-REFERENTIEL-V2.1.md`: Part I (strategy, 45 lines)
   and Part III §1 (home copy). This is the only source of public text.
3. `docs/referentiel/DESIGN-PLAN.md`: the critique (score 20/40) and phases.
   Phase 1 is implemented (section 5). Phases 2 to 5 are still valid input.
4. `docs/referentiel/PLAN.md`: lots L0 to L8, blocked items (L7 legal).

## 3. Hard constraints (non-negotiable)

| # | Constraint | Enforced by |
|---|---|---|
| C1 | **Copy word for word from the referential.** No new public text, no rewording, no invented labels, numbers or claims. You may change size, weight, layout, emphasis, and split a text across elements. | `bun run check:copy`, `pages.check.ts` (full text in served HTML) |
| C2 | **Colors: six charter values only.** `#0E2826` forest (primary), `#1A3A35` green mid, `#B68A3E` gold, `#D4B26C` light gold, `#FFFFFF`, `#FAF8F4`. Tints and color-mix of these are in use. | `check:lexicon` (bans old off-charter values) |
| C3 | No performance lexicon (« performance », « rendement », « attractif », « compétitif »), no em dash, « EVEREST Finance » casing. | `check:lexicon`, `pages.check.ts` |
| C4 | Every text is in the server HTML and **visible without JavaScript**. Motion may move or reveal-on-top visible content; it never gates it (no opacity 0 start states). Tabs and accordions must render all panels in HTML. | `pages.check.ts` ("no hidden text"), referential II.3 |
| C5 | **Home block order is fixed** by the referential: hero, positionnement, preuves (4 markers), bandeau engagements, analyses, expertises (intro + 4 vignettes), segments, Sama Naffa, gouvernance, appel final. | `pages.check.ts` order check |
| C6 | Regulated voice: no promise of results, the house never praises itself, proof before claim. Visuals follow the same rule (no charts that imply returns, no stock "growth arrow" imagery). | Referential I.6, II.2 |
| C7 | Accessibility floor from Phase 1 stays: 4.5:1 text contrast, forest text on gold, one focus ring, skip link, `aria-current`, 44 px touch targets, reduced motion honored. | `frame.check.cjs`, manual |

Text that is split for layout must still read word for word in the stripped
HTML. Pattern already in use: resolve the CMS value with `useContent(id)`,
apply `frenchSpaces()` (exported from `src/cms/EditableText.tsx`), keep any
removed separator as an `aria-hidden` `sr-only` span. See
`HomeEngagements` in `src/components/Sections/HomeReferentiel.tsx`.

## 4. Brand and strategy in 12 lines

- **Who:** EVEREST Finance, SGI (broker-dealer and asset manager) in Dakar,
  agréée AMF-UMOA since 30 March 2016 (n° SGI/DA/2016/60), about 20 people.
- **Axis (I.1):** « l'intégration prouvée ». One house carries the operation end
  to end, from structuring to settlement, and proves it by publishing analyses.
  The site **shows the integrated chain** and **gives the analyses to read**;
  it never says "we understand the market better".
- **Audiences, in order (I.2):** institutional investors, private clients,
  companies and issuers, savers (via Sama Naffa). Home speaks institutional.
- **Proof architecture (I.4):** ten years; the agreement; APSGI membership; the
  full chain under one roof; 13 institutional references (pending legal OK).
- **Defiance to disarm (I.3):** the opacity of the regional market. Answer:
  organized transparency (publications, FAQ, investor space, negative promise).
- **Signature:** « Encordés, vers le sommet » (roped together, toward the
  summit). Brand world: the mountain and the caravan. Logo: a gold summit line.
- **Copy structure:** each block is N1 (headline, on a gold rule) and N2
  (paragraph, on a green rule). Part III says N2 is shown « sous l'accroche ou
  **au dépliage** »: **N2 may be collapsed behind a disclosure.** This is the
  main lever to shorten the page (see C4: the text stays in the HTML).

## 5. Current state of the repo

Branch `staging`. HEAD `f4395eb` = lots L0 to L8 done (referential copy on every
page), not yet the design pass. Staging: https://staging.everestfin.com (HEAD).

**Uncommitted work in the tree (three passes, mixed in some files):**

| Pass | Verdict | What it did | Files |
|---|---|---|---|
| A. Phase 1 accessibility (DESIGN-PLAN 1.1 to 1.8) | **Keep.** Checked and correct. | Forest text on gold buttons, tonal hover, no hover lift; one `:focus-visible` ring token; skip link; `aria-current` and active color in nav; label/date/badge contrast; `/analyses` heading levels; 44 px targets; contact `autocomplete`; Lenis anchor handler now moves focus. | `Header.tsx`, `ContactPage.tsx`, `PublicationsPage.tsx`, `ActualitesPage.tsx`, `ArticlePage.tsx`, `FAQPage.tsx`, `SiteShell.tsx`, `LenisWrapper.tsx`; parts of `styles.css` (button, focus, skip-link blocks), `Footer.tsx` (tap targets), `Referentiel.tsx` (`TextLink` padding), hero (no opacity gating) |
| B. Hero media + type peak | Assets reusable, layout rejected with the rest | Hero video recolored to the charter (21 MB to 187 KB webm / 383 KB mp4, 45 KB poster), desktop-only playback, washes measured to 5:1 behind text at 390 to 1920 px. "Peak" N1 size, joined N1/N2 rules. | `public/hero/*`, `HeroSectionMountain.tsx`, `Referentiel.tsx` |
| C. « La cordée » home redesign | **Rejected by the owner.** | Braided rope line down the page, knots per N1, scroll-drawn (CSS scroll timelines), sticky summit beside the proofs, big-type engagements, expertise index rows, « quatre portes » grid, summit bookend at the close. | `HomeReferentiel.tsx`, `HomePage.tsx`, rope/knot/summit-drift block in `styles.css`, `Section`/`Rope`/knot in `Referentiel.tsx` |

Suggested first move: commit pass A alone (it is independent of the home),
then decide whether to keep B's assets, and drop C. Ask the owner before
discarding anything.

**What the owner preferred (`883cbef`, before the referential rebuild):**
the home was more visual: mountain video hero, `TrustStrip` (13 partner logos),
`Positioning`, `ValueProps` (image + counters), `Capacity`, `Services` (icon
cards), `InsightsMergedStatic` (real publications and news as cards), `CTA`,
`FAQ`. Those components still exist in `src/components/Sections/`. Their copy
is **not** referential and some contains banned words; their visual language
(density, imagery, cards with real content, logo strip) is what the owner felt
was better. To see it:

```bash
git worktree add ../new_lp-883 883cbef
cd ../new_lp-883 && bun install && bun run build:web
cd apps/web && bunx astro preview --port 4323 --host 127.0.0.1   # untested at that commit
```

## 6. Why the last two passes failed (honest diagnosis)

1. **Type-only pages.** Every section was headline plus paragraph. No
   illustration, no product, no data, no people, no place. The one image (the
   summit) was reused three times.
2. **No IA compression.** All N2 paragraphs were shown in full. Phone page:
   about 10,300 px. The reader gets text walls, not a story.
3. **Decoration standing in for an idea.** The rope was a thin line that meant
   something only to the author. It explained nothing about the business.
4. **Same skeleton everywhere.** Left-aligned rule plus text block, repeated
   ten times with different sizes. Bigger type is not a design.
5. **No proof made visible.** The site's axis is a chain of operations and a
   body of publications; neither was shown as a thing you can see.
6. **Motion without content.** The only motion was a line drawing itself.

## 7. The references, decoded for this brief

Visit each site at 1440 and 390 px before designing. What to take:

| Site | Take | Do not take |
|---|---|---|
| **stripe.com** | Illustrations that explain a system (animated SVG/HTML diagrams of flows); the gradient wave as a brand-owned motion signature; dense but legible IA; small, precise motion on scroll. | The purple palette; developer code blocks. |
| **ramp.com** | Proof-led sections; real product imagery in frames; customer logos used as evidence; confident hierarchy. | Savings numbers and ROI claims (banned here, C1 and C6). |
| **mercury.com** | Calm premium tone; looping hero video; abstract flat illustrations of money flows; regulatory disclosures set cleanly in the page (they state "not a bank" and name partner banks); repeated single CTA. | Stats like "$20B+ volume" (no such figures in the referential). |
| **withpersona.com** | Use-case switching (tabs per audience); UI fragments that assemble to show a flow; trust and compliance made visual. | Playful mascots; the off-charter palette. |
| **endex.ai** | Finance-native seriousness; real artifacts of the work (documents, files) as the hero media; customer cards with HQ photo + logo + sector; a security/compliance band. | Product screenshots Everest does not have. |

**Translation for EVEREST (no product UI to show, so show the work):**

| Pattern | EVEREST material that exists |
|---|---|
| Hero media | The painted summit, already graded to the charter (`public/hero/summit*.webp`, `summit.webm`, `summit.mp4`). Original 4K source: `public/ai-hero-bg-1.mp4`. |
| "Product" diagram (Stripe) | The integrated chain: structuration, placement primaire, courtage, conservation, conseil en allocation, « de la prise d'ordre au règlement-livraison » (home positioning N2, proof 3). An SVG diagram of that chain is the strongest visual idea available. **Labels must be words from the referential; get the owner's OK on using them as diagram labels.** |
| Product imagery (Ramp, Endex) | The publications: real PDFs in `public/publications/` and in Payload. Render first-page covers at build time (DESIGN-PLAN 3.3) and show the latest as artifacts. |
| Live data (Stripe, Mercury) | Referential II.2: the home includes « Bandeau de cotations BRVM en direct ». `src/components/Header/BRVMTicker.tsx` exists but uses **mock data**; data rights are not cleared. Design the slot, ask before shipping. |
| Logo wall (Ramp, Endex) | 13 partner logos in `public/partners/` (BDK, BRVM, CDE, Orabank, Pagena, BCI, BHS, BNDE, BOAD, État du Sénégal, Kalia, SUNU, Ville de Dakar). Referential §2.7: publication pending Legal confirmation. |
| Audience switcher (Persona) | Segments N2 = four sentences, one per audience (institutionnels, clientèle privée, entreprises et émetteurs, épargnants). All panels must stay in the HTML (C4). |
| Compliance band (Mercury, Endex) | Agreement n° SGI/DA/2016/60, AMF-UMOA supervision, APSGI, segregation of client assets, controls (gouvernance N2, §2.6). |
| Photography | **None usable.** `public/Assets_Website/*` and `public/*.jpg` are generic stock (coins, handshakes, candlesticks): do not use. Real photos (Dakar office, team) need the owner and Legal. |

## 8. Technical notes and traps

- **Stack:** Astro static site (`apps/web`), React islands in
  `apps/web/src/islands`, components shared from the legacy root `src/`
  (`@/components/...`). Tailwind v4. GSAP 3.13 installed; no Motion library
  (adding one is a dependency decision). Lenis smooth scroll wraps the site.
- **Text source:** `src/content/*.ts` keyed by CMS id; `EditableText` renders the
  Payload override or the default. Never hard-code public text in JSX.
- **Shared blocks:** `src/components/Referentiel.tsx` (`N1`, `N2`, `Pair`,
  `Section`, `TextLink`, `PageHero`). Changes there hit every page.
- **CSS cascade trap:** rules in `src/styles.css` outside `@layer` beat Tailwind
  utilities. `h1, h2 { line-height: 1 !important }` is global; override with
  the `!` suffix (`leading-[1.2]!`).
- **Minifier trap:** Lightning CSS folds `animation` + `animation-timeline` into
  one shorthand that Chrome drops. Write scroll-driven animations as longhands.
- **Fonts:** stack is `Aptos` (no `@font-face`, so it varies by OS), then Plus
  Jakarta Sans via a Google `@import` that also loads unused Fraunces. A licensed
  or self-hosted display face is an open owner decision (DESIGN-PLAN 2.5).
- **Hero video:** 4K original is 21 MB; use the graded encodes in `public/hero/`.
- **Header:** fixed, `--site-chrome-sticky` = header height (ticker hidden, 0).
- **WhatsApp bubble:** off-charter green and a placeholder number
  (`+221000000000`). The owner said **do not change it** in this pass.

**Checks before every push** (all must pass; seeding needs the owner's OK):

```bash
bun run check:copy && bun run check:lexicon && bun run check:seed
bun run build:web
cd apps/web && bunx astro preview --port 4322 --host 127.0.0.1   # separate shell
CHROMIUM_PATH=$HOME/Library/Caches/ms-playwright/chromium-1194/chrome-mac/Chromium.app/Contents/MacOS/Chromium \
  bun apps/web/e2e/pages.check.ts && node apps/web/e2e/frame.check.cjs
```

Known failure, not yours: `frame.check` "no page errors" on `/analyses` (the
client pdf.js thumbnail needs a newer Chromium; DESIGN-PLAN 3.3 replaces it).
Baseline today: copy 155/155, lexicon 0, pages 526/526, frame 276/277.

Git: work on `staging`, push to `origin` (`aliouuuw/everest_new`), Conventional
Commits, no co-author or tool attribution lines.

## 9. Open decisions for the owner (ask, do not assume)

1. Display typeface: license or self-host one, or stay on Plus Jakarta Sans.
2. Chain diagram: may referential words be used as diagram labels?
3. BRVM live band: data rights and source.
4. Partner logos: Legal confirmation for the new site (§2.7).
5. Photography of the house (Dakar, team): wanted, and cleared by Legal?
6. What to keep from pass B (graded summit assets) and from `883cbef`.

## 10. Definition of done (home)

1. A design direction shown to the owner **before** building: two or three
   composed frames at 1440 and 390 px, with the media and diagrams sketched.
2. Built in the repo, all checks green, no new public text.
3. Phone page height cut substantially (target under 6,000 px) by using N2
   disclosure and better composition, not by deleting referential text.
4. Screenshots at 390, 768, 1024, 1440, 1920 px reviewed; reduced motion and
   no-JS renders reviewed.
5. Re-run `/impeccable critique` and beat 20/40 by a wide margin; the owner
   compares against `883cbef` and approves.
