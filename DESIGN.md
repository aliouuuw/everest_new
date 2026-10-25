# Design: EVEREST Finance public site

**The interface is the validated one.** On 25 Oct 2026 the team asked to keep the
interface they had approved and to limit this step to content and the CMS. The
redesign of 23–24 Oct 2026 (modern home system, photo page heads, drawn
expertise frames) was withdrawn from the site and from this file. Its record
stays in git history and in `docs/referentiel/DESIGN-*.md` as history only.

## Source of the interface

- Validated state: `staging` at `883cbef` (22 Oct 2026), with the global frame of
  `c9cdad0` (referential menu and footer, charter colours, BRVM ticker hidden).
- Styles: `src/styles.css`. Header: `src/components/Header/Header.tsx`.
  Footer: `src/components/Footer.tsx`.
- Home sections: `HeroSectionMountain`, `Positioning`, `ValueProps`, `Capacity`,
  `InsightsMergedStatic`, `Services`, `SamaNaffaBlock`, `CTA`.
- Inner pages: `src/routes/*Page.tsx`; shared page head `src/components/PageHead.tsx`
  (kicker pill, title left, intro right, on forest).

## Rules for this step

1. Change text, not layout: put referential text into the existing components.
2. Text that the referential does not contain is removed, not rewritten
   (counters, testimonials, invented kickers and taglines, the 2013 timeline).
3. Blocks the referential requires but the old site lacked (engagements, segments,
   governance, Sama Naffa, the four expertise pages, Opportunités, the « Parcours »)
   reuse an existing component of the old site.
4. Colours: the six charter values of referential II.3.
