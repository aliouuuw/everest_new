# Page Implementation Guide

This guide defines how to build all remaining pages so they feel consistent with the Home and About pages and the design system in `src/styles.css`.

## Core Principles
- **Single source of truth**: use tokens and utilities from `src/styles.css` only.
- **Minimal, premium tone**: white surfaces, gold accents, precise type.
- **Reusable primitives**: `Header`, `Footer`, buttons, cards, reveal utilities, and section spacing.
- **Progressive enhancement**: graceful without JS, subtle motion with `useReveal`.

## Page Skeleton (Route Template)
Use this skeleton for all route files in `src/routes/`.

```tsx
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { useReveal } from '../components/Hooks/useReveal'

export const SomePage = () => {
  const sectionRef = useReveal<HTMLElement>()
  const gridRef = useReveal<HTMLDivElement>()

  return (
    <div className="min-h-screen bg-[var(--pure-white)] text-[var(--night)]">
      <Header />

      <main className="pt-24 sm:pt-28">
        {/* Hero (choose one of the approved patterns below) */}
        <section ref={sectionRef} className="reveal py-16 sm:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <span className="kicker text-gradient-gold">Section Eyebrow</span>
            <h1 className="luxury-heading mt-3">Page headline</h1>
            <p className="luxury-subheading mt-5">Concise subheading explaining the page.</p>
          </div>
        </section>

        {/* Content Section Example */}
        <section ref={sectionRef} className="reveal py-14 sm:py-18">
          <div className="mx-auto max-w-6xl px-6">
            <div ref={gridRef} className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="font-display mb-1">Card title</div>
                <div className="text-secondary text-sm">Card description.</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
```

## Approved Hero Patterns
Choose one per page.

1) Split Hero (About-style)
- Background: `gradient-gold-subtle` + light grid overlay.
- Left: `kicker`, `luxury-heading`, `luxury-subheading`, two CTAs (`btn-primary`, `btn-secondary`).
- Right: glass card with grid media placeholder and small stat chips.

```tsx
<section ref={heroRef} className="reveal relative overflow-hidden">
  <div className="absolute inset-0 gradient-gold-subtle" />
  <div className="absolute inset-0" style={{ opacity: 0.06 }}>
    <div className="w-full h-full" style={{ backgroundImage: `linear-gradient(var(--night-10) 1px, transparent 1px), linear-gradient(90deg, var(--night-10) 1px, transparent 1px)`, backgroundSize: '64px 64px' }} />
  </div>
  <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
      <div>
        <span className="kicker text-gradient-gold">Eyebrow</span>
        <h1 className="luxury-heading mt-3">Headline</h1>
        <p className="luxury-subheading mt-5">Subheading text.</p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <a href="#target-1" className="btn-primary font-display tracking-wide">Primary CTA</a>
          <a href="#target-2" className="btn-secondary font-display tracking-wide">Secondary CTA</a>
        </div>
      </div>
      <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6">
        <div className="pointer-events-none absolute -top-12 -right-12 w-56 h-56 rounded-full bg-[var(--gold-metallic-10)] blur-3xl" />
        <div className="relative w-full h-[280px] rounded-xl overflow-hidden border border-[var(--gold-metallic)]/25 bg-[var(--white-smoke)]/80" />
      </div>
    </div>
  </div>
</section>
```

2) Compact Centered Hero (for list pages like Newsroom/Research)
- Center-aligned `kicker`, `luxury-heading`, short `luxury-subheading`.
- Optional filters immediately below using `btn-secondary` chips.

```tsx
<section ref={heroRef} className="reveal py-16 sm:py-28">
  <div className="mx-auto max-w-6xl px-6 text-center">
    <span className="kicker text-gradient-gold">Eyebrow</span>
    <h1 className="luxury-heading mt-3">Headline</h1>
    <p className="luxury-subheading mt-5">Short description of the section.</p>
  </div>
</section>
```

## Sections and Components
- **Spacing**: `py-24` major bands, `py-14 sm:py-18` for standard sections.
- **Grid**: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6` (or `gap-8/10` when more breathing room is needed).
- **Cards**: use the gold-accent glass card (`border-[var(--gold-metallic)]/25`, `bg-[var(--pure-white)]/80`, `backdrop-blur-sm`, `card-hover`).
- **Stat cards**: use `.stat-card` for KPI blocks.
- **Dividers**: prefer gradient hairline `bg-gradient-to-r ... via-[var(--gold-metallic-10)] ...` inside cards.
- **Buttons**: `.btn-primary` for main actions, `.btn-secondary` for secondary or filter chips.
- **Reveal**: section root uses `reveal`; lists use `reveal-stagger`.

## Animation & Reveal Guidelines
- Add `useReveal<HTMLElement>()` to section containers.
- Add `useReveal<HTMLDivElement>()` to grids/lists with `.reveal-stagger`.
- Avoid animating every small element; animate the container and the first level of children.
- Respect `prefers-reduced-motion` (already handled in CSS tokens).

## Page-by-Page Blueprints
Use these outlines and reuse home/About patterns.

### BoursePage
- Hero: Compact Centered Hero.
- Sections:
  - Market Overview cards (`stat-card`) for main indices.
  - “Latest movements” grid (3x) using card-hover.
  - CTA: “Ouvrir un compte” (primary) + “Nous contacter” (secondary).

### CapitalMarketsPage
- Hero: Split Hero.
- Sections:
  - Services overview (3 cards) — reuse `Services` card style.
  - Primary issuance process (3–4 steps) as cards.
  - Case highlights (2 cards) with brief metrics.

### InvestmentBankingPage
- Hero: Split Hero with capabilities.
- Sections:
  - Capabilities grid (Structuration, Conseil, Placement).
  - Process timeline (4 steps) using the About timeline style.
  - CTA band.

### ResearchAnalyticsPage
- Hero: Compact Centered Hero.
- Sections:
  - Filters as chips (`btn-secondary`).
  - Publications grid — reuse `Insights` section layout and classes.
  - “Voir toutes les publications” CTA.

### DiscretionaryMgmtPage (Gestion libre)
- Hero: Split Hero focused on approach.
- Sections:
  - Approche & Univers d’investissement (2 cards).
  - Packs (3 cards) — fees/policy hints with `numeric-tabular`.
  - CTA band.

### MandateMgmtPage (Gestion sous-mandat)
- Hero: Split Hero.
- Sections:
  - Profils de mandat (3 cards) with constraints/objectives.
  - Gouvernance & reporting (2 cards).
  - CTA band.

### AssistedMgmtPage (Gestion assistée)
- Hero: Split Hero with advisor angle.
- Sections:
  - Comment ça marche (3 steps).
  - Outils & accompagnement (2 cards).
  - CTA to contact.

### PortalPage (Accès Client)
- Hero: Compact Centered Hero focused on security & access.
- Sections:
  - Avantages (3 cards).
  - Sécurité & conformité (2 cards with `FiShield`).
  - CTA to “Se connecter” (link to app).

### CEOMessagePage (Mot du DG)
- Hero: Split Hero (right card can hold portrait/quote).
- Sections:
  - Message blocks (2–3 paragraphs) in glass cards.
  - Valeurs clés (3 features) — reuse `ValueProps` style.

### FAQPage (Abécédaire / FAQ)
- Hero: Compact Centered Hero, short.
- Sections:
  - Accordion or grouped Q&A (simple cards for now; interactive later).
  - Contact CTA.

## Content & Copy Guidelines
- Keep headlines ≤ 9 words. Subheadings ≤ 2 lines.
- Use FR locale; sentence case; avoid jargon unless essential.
- Numbers: use `.numeric-tabular` for KPIs and dates.

## Accessibility & SEO
- Landmarks: one `<h1>` per page; section headings `<h2>`.
- Buttons/links: clear labels; visible focus rings.
- Images: `alt` always; decorative elements set as background or `aria-hidden`.
- Metadata: ensure each route is registered and named in router (title, description) when available.

## Performance
- Reuse components; avoid heavy media in heroes.
- Keep animations subtle; avoid large JS for simple effects.

## Checklist (Before PR)
- Header and Footer present.
- Uses approved hero pattern.
- Spacing matches tokens; cards use gold-accent style.
- Reveal animations applied at section and grid level.
- Lints pass; no unused imports.
- Copy reviewed for tone and length.

---
Maintainers: Design & Engineering
Version: 1.0
Last Updated: 2025-08-28
