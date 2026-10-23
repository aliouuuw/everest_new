---
name: EVEREST Finance Home
description: Publication-led home system, scoped to the public landing page
colors:
  forest: "#0E2826"
  forest-mid: "#1A3A35"
  gold: "#B68A3E"
  gold-light: "#D4B26C"
  white: "#FFFFFF"
  paper: "#FAF8F4"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "clamp(48px, 4.7vw, 68px)"
    fontWeight: 500
    lineHeight: 1.07
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "clamp(28px, 3vw, 42px)"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.7
rounded:
  action: "0"
spacing:
  section: "112px"
  section-mobile: "48px"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.forest}"
    rounded: "{rounded.action}"
    padding: "18px 24px"
  button-primary-hover:
    backgroundColor: "{colors.gold-light}"
---

# Design System: EVEREST Finance Home

## Overview

The home borrows the clarity of a research reading room. The summit establishes
the house's identity; genuine documents show its output. Dense copy remains
available through native disclosures rather than a wall of repeated panels.

The inner pages share this system (23 Oct 2026): tokens live on `:root` in
`src/components/Sections/home.css`, and `src/components/Referentiel.tsx` draws the
N1/N2 blocks, page heads, links and rules in it. Source: those two files. Earlier rope and card-heavy passes
are rejected directions, not components to restore.

## Colors

Use only the referential's six charter values. Grounds alternate so the page
is not one white field. Paper carries the positioning statement, the analyses,
and Sama Naffa. White carries the proofs and the expertise index. Forest carries
the hero, the chain, the engagements, and the close. Forest-mid carries the
four routes. Gold identifies the primary action and the chain order.
Gradients exist only as legibility scrims on the summit image.

## Typography

Use the retained Plus Jakarta Sans family without an unprovided Aptos face.
Do not introduce a licensed or downloaded face without a separate decision.

The desktop hero is two lines. On phones the fixed referential headline takes
three readable lines; do not rewrite it or shrink it to body size to satisfy a
generic two-line rule. Long section statements stay quieter than the hero.
Body text is 16px, with a 15px phone hero paragraph.

## Layout

One container shared with the header and footer: at most 1400px, with the header's
gutters (24 / 64 / 96 / 24 / 40px at 0 / 768 / 1024 / 1280 / 1536px). Main breakpoints: 1023px and 600px.
Type scale: 68 display, 42 heading, 28 statement, 22 title, 16 body, 13 meta.
Prose has two sizes only: body 16/1.65, dense 15/1.6 (proof columns, opened details,
the ledger). Proportional numerals. Light-on-dark sections use grayscale smoothing.

The hero owns the first viewport. Desktop places actions and supporting copy
on separate bottom axes. Phone places the copy before the actions and preserves
an unobstructed view of the summit between title and copy.

Below it: the statement on paper, then the chain as a full-bleed forest band
(the one drawn summit line), an open credential band (the fact leads each proof
sentence, at heading size), the engagements ledger (Éthique & Déontologie closes
it, larger, on a gold wash), the analyses on paper with two captioned covers,
the expertise index on white with one image frame, four equal routes on
forest-mid with the closing line at heading size, the Sama Naffa mark on a
forest field, and the governance close.

## Elevation & Depth

No card shadows, decorative rails, or floating panels in home content.
No repeated card grid and no audience doors. The summit line is drawn once,
on the chain. It is not repeated at the close.

Motion explains one thing per section. A gold order travels the chain from
« prise d'ordre » to « règlement-livraison » and lights each station. A cover
lifts when it is the document under the pointer. The expertise frame swaps to
the row under the pointer, and that row's rule turns gold. Route names turn
gold-light under the pointer. Nothing changes width. Depth comes from the
summit scene and a tight forest-tinted shadow on the report covers only.
The global menu keeps its existing overlay behavior.

## Shapes

Square primary actions. Bare directional arrows.

Disclosures: one pattern only, the bare chevron row, used by the four expertise
details (owner decision, 23 Oct 2026, reversing the four-look version). Every other
N2 is plain visible text: the page shows its evidence (I.6).
Do not replace the company logos. The Sama Naffa mark sits on a flat forest field, with no radius and no shadow.

## Components

The expertise `details`/`summary` uses the N1 itself as its accessible control name.
The N2 stays in the HTML, expands without JavaScript, and has no invented label.
Where `::details-content` is supported, the N2 unfolds in height; it never fades.
Chain labels are parsed from the positioning N2 at render time; if the CMS text no
longer has five stations in parentheses, the diagram is not drawn.
Summary targets are at least 44px.

Report covers link to `/analyses`, where the publication disclaimer is available.
Use canonical catalogue records. Do not invent report titles, editions, or dates.
Do not use the stock growth-chart semestrial cover on the home.

The short summit film loads on desktop only when reduced motion and Save-Data
are off. It plays once; the poster always supplies a still fallback. Honor live
changes to reduced-motion preferences. Never hide copy for an entrance animation.
As the hero leaves the viewport, the summit recedes slightly (scroll-driven, motion-enabled only).

## Do's and Don'ts

- Do preserve the referential text and the fixed block order.
- Do use the existing gold focus ring and forest text on gold.
- Do test both the Astro dev server and the production preview.
- Do keep home footer links at least 44px high on touch widths.
- Do not add eyebrows, decorative numbering, mock metrics, or card tiles. Proofs are an open band.
- Do not put text in decorative SVG or media (alt stays empty).
- Do link a destination the referential names in passing (« La société », « Sama Naffa »)
  with a static gold underline; never add words to do it.
- Do not add motion merely to meet an animated-element count.
- Do not generalize unresolved inner-page defects into design-system rules.

## Inner pages

- Page head: forest band, the menu label at display size (68, weight 500), then the page N1 (statement) and N2.
- No side rails. Part III's « filet doré / filet vert » codes the levels of the source
  document; on screen the N1 leads and the N2 follows in forest-mid. Blocks and index rows
  sit on the home's 1px rule.
- Container and footer are the home's on every page (header gutters, 1400px).
- Lists of things are indexes or ledgers, not card grids: the expertise index, the
  engagements ledger (Éthique & Déontologie closes it on a gold wash), the four
  « Parcours » steps on rules.
- Documents show their real cover (`public/publications/covers/<id>.webp`), then date,
  format, pages, size. No client-side PDF rendering.
- Controls are square: filters (active = forest fill), fields (1px border at 55% forest,
  3:1 against white), gold submit.
- Expertises, Opportunités, Sama Naffa and Contact open on the place the page is about
  (`PageHero` `media`): a graded photograph behind a forest veil on the text side, ending in
  forest. It settles and recedes on scroll like the home summit. One film (Sama Naffa) plays
  once on motion-enabled desktops. Sources: `docs/referentiel/MEDIA-PLACEHOLDERS.md`.
- The Expertises hub reuses the home index and its swap frame. Each expertise page names its
  disciplines at heading size beside the text, and ends on photo links to the other three.
- Opportunités sets the four instruments its N1 names as a ledger (same words, `aria-hidden`).
- The « Parcours » steps sit on one gold line; a gold mark walks it from step 1 to step 4.
