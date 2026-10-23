---
name: EVEREST Finance
description: Lit-workroom system, piloted on the home and rolling out to every page
colors:
  forest: "#0E2826"
  forest-mid: "#1A3A35"
  gold: "#B68A3E"
  gold-light: "#D4B26C"
  white: "#FFFFFF"
  paper: "#FAF8F4"
  mist: "#F5F6F6"
  mist-strong: "#ECEEEE"
  edge: "#0E282614"
  edge-strong: "#0E282629"
  rule: "#0E282624"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "clamp(44px, 4.7vw, 68px)"
    fontWeight: 500
    lineHeight: 1.07
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "clamp(30px, 2.9vw, 42px)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  statement:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "clamp(22px, 1.95vw, 28px)"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "22px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  body-dense:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.4
  meta:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  control: "12px"
  panel: "20px"
  pill: "999px"
  node: "50%"
spacing:
  section: "112px"
  section-tablet: "80px"
  section-phone: "40px"
  panel-rise: "72px"
  container-max: "1400px"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.forest}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "16px 22px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.gold-light}"
  link-action:
    textColor: "{colors.forest}"
    typography: "{typography.label}"
    height: "48px"
  link-action-hover:
    textColor: "{colors.forest-mid}"
  panel:
    backgroundColor: "{colors.white}"
    textColor: "{colors.forest}"
    rounded: "{rounded.panel}"
    padding: "88px 64px 56px"
  tile-mist:
    backgroundColor: "{colors.mist}"
    textColor: "{colors.forest}"
    rounded: "{rounded.panel}"
    padding: "32px 36px"
  status-chip:
    backgroundColor: "{colors.mist}"
    textColor: "{colors.forest}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "8px 16px 8px 10px"
  status-node-done:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.forest}"
    rounded: "{rounded.node}"
    size: "32px"
  status-node-pending:
    backgroundColor: "{colors.mist-strong}"
    rounded: "{rounded.node}"
    size: "32px"
  list-row-hover:
    backgroundColor: "{colors.mist}"
    rounded: "{rounded.panel}"
    padding: "24px 28px"
---

# Design System: EVEREST Finance

## Overview

**Creative North Star: "The Lit Workroom"**

The house's work is shown as a calm, well-made interface. White and mist
surfaces carry rounded white panels built only from referential content; the
dark sections are forest fields lit by one slow directional gradient. The
summit photograph opens the page and the first white panel rises over its
lower edge, so the fold already shows two layers. The craft bar is Stripe and
Ramp (owner, 23 Oct 2026): fluid, precise, quiet.

This world replaces the Swiss/editorial look (hairline columns, paper grounds,
square actions, open ledgers), which the owner rejected as "old, like a
newspaper". The home is the pilot. The system rolls out to every page; until
then the inner pages still render the earlier look (see "Inner pages (legacy,
pending rollout)" at the end). Tokens live on `:root` in
`src/components/Sections/home.css`; shared N1/N2 blocks live in
`src/components/Referentiel.tsx`.

**Key Characteristics:**
- Six charter colours, their tints, and soft gradients inside forest only.
- Rounded panels (20px) with a self-coloured edge and one light from above.
- One family, Plus Jakarta Sans, until a licensed display face is decided.
- Gold marks action and state, nothing else.
- Motion moves content that is already visible; it never reveals it.

## Colors

A forest-and-white palette with gold held back for action and state.

### Primary
- **Forest** (`forest`): ink on light grounds; the hero ground; the field base; the footer floor.
- **Forest Mid** (`forest-mid`): secondary text on light grounds (N2 copy, panel bodies, link hover); the far end of every field gradient.

### Secondary
- **Charter Gold** (`gold`): the primary button fill, done status nodes, the order bar, record-chip checks, inline-link underlines on light grounds.
- **Gold Light** (`gold-light`): button hover, link hover on dark grounds, inline-link underlines on fields, the field sheen, the expertise drawings' strokes, text selection.

### Neutral
- **White** (`white`): the page ground and every panel.
- **Mist** (`mist`, forest 4% into white): section grounds that alternate with white (positioning, analyses, Sama Naffa); tile fills; hover fills; chips.
- **Mist Strong** (`mist-strong`, forest 8% into white): pending status nodes, tracks, quiet check discs.
- **Edge** (`edge`, forest 8% alpha) and **Edge Strong** (`edge-strong`, 16%): the self-coloured 1px ring on panels and tiles; the timeline head rule.
- **Paper** (`paper`) and **Rule** (`rule`): charter values kept for the legacy inner pages. The home no longer uses them.

On fields, secondary text is white mixed 80 to 86% with forest, never a grey.

### Named Rules
**The Gold Means Something Rule.** Gold appears only on an action (button, link hover, link underline) or a state (done node, progress bar, a verified record). Never as decoration, never as a headline accent.

**The Charter-Only Rule.** Every colour is one of the six charter values or a `color-mix` of them. No new hue, no grey from a UI kit.

## Typography

**Display Font:** Plus Jakarta Sans (with sans-serif)
**Body Font:** Plus Jakarta Sans

**Character:** One family carries everything, set tight at display sizes
(negative tracking) and open at body sizes. Retained until the owner decides a
licensed display face; do not swap it for another free face.

### Hierarchy
- **Display** (500, `display`, 1.07): the hero H1 (two lines on desktop), the agrément record lead, the closing heading. Phone hero: clamp(31px, 8.5vw, 42px), line-height 1.13; the fixed referential headline takes three lines there.
- **Headline** (500, `headline`, 1.15, balanced): section H2s, max 28ch. Phone: 28px.
- **Statement** (400, `statement`, 1.45): the positioning N1, proof leads (500), the Éthique & Déontologie line, the segments thesis.
- **Title** (600, 22px): expertise names.
- **Body** (400, 16px / 1.65, max 36em) and **Body dense** (15px / 1.6): two prose sizes only. Dense is for proof tiles, opened details and narrow columns.
- **Label** (600, 15px): buttons, action links, chips, timeline stations.
- **Meta** (13px): footer links and small captions.

### Named Rules
**The Two Prose Sizes Rule.** Running text is 16 or 15px. Nothing in between, nothing smaller except meta.

**The Mixed Case Rule.** No tracked uppercase labels anywhere. Small text keeps sentence case; the first letter of a CMS fragment is capitalised with `::first-letter`, never by rewriting the text.

## Layout

One container shared with the header and footer: max 1400px, gutters 24 / 64 /
96 / 24 / 40px at 0 / 768 / 1024 / 1280 / 1536px. Breakpoints: 1023px (two
columns collapse to one) and 600px (phone).

Section rhythm: 112px desktop, 80px tablet, 40px phone. Content splits are
asymmetric, 7:5 or 5:7, never equal halves of equal cards.

The hero owns the first viewport (min max(780px, 100svh); phone
max(820px, 100svh)). Desktop: H1 bottom-left, then a two-column foot with the
gold button and an action link on the left, the N2 on the right. Phone: copy
above actions, buttons full-width, an open view of the summit between title and
copy. The positioning panel rises 72px over the hero's edge (40px on phones),
and the hero's bottom padding clears it.

Order after the hero: positioning panel on mist, the order timeline on a field,
proofs on white, engagements on a field, analyses on mist, expertises on white,
segments on a field, Sama Naffa on mist, the governance close on a field that
ends in forest so the footer continues without a seam. The phone page stays
under 8500px.

## Elevation & Depth

Depth comes from layering: rounded white panels lit from one source above,
floating on white or mist, and white panels sitting on lit forest fields.

### Shadow Vocabulary
- **Edge ring** (`0 0 0 1px` edge): on every panel and tile; inset on mist tiles.
- **Lift** (`0 1px 2px` forest 8% + `0 16px 32px -16px` forest 28%): resting panels, report covers, the Sama Naffa mark.
- **Lift high** (`0 2px 4px` forest 10% + `0 28px 48px -20px` forest 38%): the agrément record; a report cover under the pointer.
- **Field lift** (`0 2px 4px` + `0 32px 64px -24px`, black-mixed at 20 to 55%): white panels on a forest field only (timeline, commitments), where a forest-tinted shadow would not read.

### Fields
A field is `linear-gradient(160deg, forest 35%, forest-mid)`, plus a broad
gold-light sheen (16%) that drifts across in 22s, plus fractal grain at 7%
overlay against banding. Grain sits on the ground, under text.

### Named Rules
**The One Light Rule.** Shadows are tight, negative-spread and fall downward. No even halo, no glow, no offset slab.

**The Visible-First Motion Rule.** Content is in place without JavaScript or animation. Scroll motion (`animation-timeline: view()`) only translates panels 40px into place or lets the summit recede; reduced motion turns every animation and transition off.

## Shapes

Gently rounded throughout: 20px for panels, tiles, list rows and the expertise
frame; 12px for buttons, report covers and inner rows; full pills for status
chips and the progress bar; circles for status nodes and check discs. Arrows are
bare, diagonal (up-right), 18px, and slide 2px outward on hover. The expertise
drawings keep their own square-cap line language inside a rounded frame.

## Components

### Buttons
- **Shape:** gently rounded (12px), min height 48px.
- **Primary:** forest text on charter gold, 600 label, trailing up-right arrow. One per view.
- **Hover / Focus:** fill shifts to gold-light; the arrow slides 2px. The button never moves. Gold focus ring.
- **Action link:** the secondary action is a text link with the same arrow (white on dark, forest on light; hover gold-light or forest-mid). Never an outlined button.
- **Inline link:** a destination the referential names in passing gets a static 1px gold underline (gold-light on fields). No words are added.

### Status chips and nodes
- **Record chip:** mist pill with an edge ring, 600 label, a gold check disc. Used for verifiable facts (the agrément date and number).
- **Timeline node:** 32px circle, gold with a forest check when done, mist-strong and empty when pending (24px on phones).

### Panels / Tiles
- **Panel:** white, 20px, edge ring plus lift. The positioning panel pads 88 / 64 / 56px.
- **Mist tile:** mist, 20px, inset edge ring, 32 / 36px padding. Proof facts.
- **Checklist panel:** white on a field, 10px inner padding, 12px rounded rows that turn mist on hover; the closing row spans both columns at statement size.
- **Glass list:** on fields, white 7% fill with a white 12% inset ring; rows separated by a 1px white 10% line; row hover white 7%.

### Navigation
The global header and its overlay menu are unchanged by this pass. The footer
aligns to the shared container; footer links stay at least 44px high on touch.

### Order timeline (signature)
A white panel on a field. Head: « de la prise d'ordre » rule « au
règlement-livraison ». Five stations parsed from the positioning N2 (not drawn
if the CMS text no longer has five). A 9s loop turns each node from pending to
done in turn, and the gold-to-gold-light bar fills by `clip-path`. Phones stack
the stations on a vertical rail.

### Expertise index
Four rows beside a 4:5 forest frame holding one drawing per expertise
(`ExpertiseIllustrations.tsx`: gold-light 1.5px strokes, square caps, straight
segments, no text). The row under the pointer or focus turns mist, its arrow
turns gold, and its drawing wipes in by `clip-path`. Each row's N2 is a native
`details` with a bare chevron; it unfolds in height where `::details-content`
is supported. The frame hides below 1024px.

### Report covers
Two real catalogue covers, the second offset 56px down, 12px radius with lift.
Under the pointer the cover rises 8px to lift high. They link to `/analyses`.

### Summit hero
Poster image by default; the short film loads on desktop only with motion on
and Save-Data off. The photo settles from 1.035 scale and recedes on scroll.
Forest legibility scrims only.

## Do's and Don'ts

### Do:
- **Do** copy every visible string word for word from `docs/referentiel/SITEWEB-REFERENTIEL-V2.1.md`; the check rejects anything else.
- **Do** keep all text in server HTML and visible without JavaScript.
- **Do** build panels from referential content: a fact, a record, a list the text already names.
- **Do** alternate white and mist grounds and break them with lit fields.
- **Do** keep summary and link targets at least 44px.
- **Do** test the Astro dev server and the production preview.

### Don't:
- **Don't** add eyebrows, kickers, decorative numbering, mock metrics or invented labels.
- **Don't** set a row of equal cards or a split hero with a panel on the right.
- **Don't** use gold for decoration or a headline accent.
- **Don't** hide content for an entrance animation, or let a button lift on hover.
- **Don't** put text in decorative SVG or media (alt stays empty).
- **Don't** change the WhatsApp bubble (owner decision) or the company logos.
- **Don't** replace the current photographs or the report covers with stock images.

## Inner pages (legacy, pending rollout)

These facts describe the inner pages as they still render, in the earlier
square, hairline look. They move to the lit-workroom system page by page; keep
their content facts when they do.

- Page head: forest band, the menu label at display size (68, weight 500), then the page N1 (statement) and N2. Grounds use white, paper and forest (`Referentiel.tsx` `Section` tones).
- N1 leads and the N2 follows in forest-mid; blocks and index rows sit on the 1px rule.
- Container and footer are the home's on every page.
- Lists of things are indexes or ledgers, not card grids: the expertise index, the engagements ledger, the four « Parcours » steps.
- Documents show their real cover (`public/publications/covers/<id>.webp`), then date, format, pages, size. No client-side PDF rendering.
- Controls are square: filters (active = forest fill), fields (1px border at 55% forest, 3:1 against white), gold submit.
- Expertises, Opportunités, Sama Naffa and Contact open on a photograph of the place the page is about (`PageHero` `media`), behind a forest veil on the text side, ending in forest; it settles and recedes on scroll like the summit. Sama Naffa uses its own hero still. Media sources: `docs/referentiel/MEDIA-PLACEHOLDERS.md`.
- The Expertises hub reuses the home index and its swap frame; each expertise page names its disciplines at heading size and ends on photo links to the other three.
- Opportunités sets the four instruments its N1 names as a ledger (same words, `aria-hidden`), with square gold markers.
- Contact « Parcours »: four steps on one gold line; a gold mark walks it from step 1 to step 4.
