# Everest Finance Design System

> **Design Direction:** Modern Professional (Apple, Google, dabafinance.com inspired)  
> **Status:** Shifted from editorial/literary to clean, confident sans-serif aesthetic

## Foundations

### Color Palette (Source of Truth: `src/styles.css`)
```css
:root {
  /* Brand Core Colors */
  --pure-white: #FFFFFF;
  --white-smoke: #f5f5f5;      /* subtle background */
  --timberwolf: #dcdad2;       /* borders/dividers */
  --line-soft: #eeeeee;        /* hairline dividers */
  --cream: #faf6ef;            /* warmer alternate background */

  /* Brand Accents — NEW HIERARCHY */
  --mauve: #461D4C;            /* DOMINANT UI COLOR — headings, active states, badges, links */
  --jaune-or: #ca942f;         /* ACCENT — dark section CTAs, trust markers, gold highlights */
  
  /* Ink / Text */
  --night: #0a0a0a;            /* Primary ink */
  --night-80: rgba(10, 10, 10, 0.8);
  --night-60: rgba(10, 10, 10, 0.6);
  --night-40: rgba(10, 10, 10, 0.4);
  --night-20: rgba(10, 10, 10, 0.2);
  --night-10: rgba(10, 10, 10, 0.1);
}
```

**Color Usage Rules:**
- **Mauve (#461D4C)** — Primary UI color for: headings, section kickers, active states, badges, filters, links, borders on hover
- **Gold (#ca942f)** — Accent reserved for: primary CTAs on dark backgrounds, trust markers, summit highlights, dark section emphasis
- **Backgrounds:** `--pure-white` (base), `--summit-ivory` (warm sections), dark sections use purple-dominant gradients
- **Text:** `--night` primary, `--night-60` secondary, `--night-40` tertiary

### Fonts
```css
:root {
  --font-primary: 'Aptos', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  --font-display: 'Aptos', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
}
```

**Typography Rules:**
- **ALL headings** use `var(--font-primary)` at weight **600-800** — NO Fraunces serif
- **NO italic emphasis** in headings — use `<span style={{ color: 'var(--mauve)' }}>` for accent words instead
- **Body text:** weight 300-400, clean sans-serif throughout
- **Fluid sizing:** Use `clamp()` for responsive scaling (e.g., `clamp(2rem, 4vw, 3rem)`)
- **Tight letter-spacing:** `-0.02em` to `-0.03em` for headings

## Typography

### Semantic Classes
```css
/* Structural text */
.kicker { text-transform: uppercase; letter-spacing: 0.25em; font-weight: 500; font-size: 0.65rem; font-family: var(--font-primary); }
.numeric-tabular { font-variant-numeric: tabular-nums lining-nums; font-feature-settings: "tnum" 1, "lnum" 1; }

/* Large editorial headings */
.luxury-heading { font-family: var(--font-display); font-weight: 400; font-size: clamp(2.5rem, 5.5vw, 4.5rem); line-height: 1.0; letter-spacing: -0.01em; color: var(--night); }
.luxury-heading-dark { /* Same but for pure-white text on dark backgrounds */ }

/* Subheadings for hero sections */
.luxury-subheading { font-family: var(--font-primary); font-weight: 300; font-size: clamp(0.95rem, 1.5vw, 1.1rem); line-height: 1.75; color: var(--night-60); max-width: 38rem; margin: 0 auto; }
.luxury-subheading-left { /* Left aligned variant */ }

/* Body text */
.text-primary { font-family: var(--font-primary); line-height: 1.6; }
.text-secondary { font-family: var(--font-primary); line-height: 1.5; color: var(--night-80); }
.text-secondary-dark { color: rgba(255, 255, 255, 0.7); }
```

## Utilities & Effects

### Spacing & Layout
- Vertical Section Padding: `.section-py` (`py-14 sm:py-18 lg:py-20`) for standard sections.
- Smaller Section Padding: `.section-py-sm` (`py-12 sm:py-16`) for secondary strips.
- Hero Top Padding: `--hero-py: clamp(7rem, 12vw, 9rem)` applied to hero wrappers via inline style.
- Standard Container: `max-w-6xl mx-auto px-6`.

### Glassmorphism & Materials
```css
@utility glassmorphism {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px) saturate(120%);
  border: 1px solid rgba(0, 0, 0, 0.04);
}
```

- Light Cards: `.stat-card` - White/smoke backgrounds with subtle gold borders and hover lifts.
- Dark Cards: `.glass-card-dark` - Night backgrounds with deep blur and subtle metallic borders.

### Brand Gradients
```css
@utility gradient-gold { background: linear-gradient(120deg, var(--jaune-or-light), var(--jaune-or)); }
@utility gradient-gold-subtle { background: linear-gradient(180deg, var(--jaune-or-10) 0%, transparent 75%); }
@utility text-gradient-gold { background: linear-gradient(135deg, var(--jaune-or) 0%, var(--jaune-or) 100%); background-clip: text; color: transparent; }
```

## Components

### Buttons
All buttons use **pill shape** (`rounded-full`):

- **Primary Light:** `.btn-primary` — Mauve bg (`--mauve`), white text, hover lift + scale
- **Secondary Light:** `.btn-secondary` — Bordered mauve, mauve text, hover fill
- **Primary Dark:** `.btn-primary-dark` — Gold bg (`--jaune-or`), night text, hover lift + shadow
- **Secondary Dark:** `.btn-secondary-dark` — Bordered gold, gold text, hover bg fill

Focus states use accessible mauve-tinted double ring shadows.

### Section Kicker Pattern (NEW)
All section kickers use **rounded pill badges** — NOT editorial line+text:

```tsx
<span
  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-[11px] tracking-[0.08em] uppercase font-medium transition-transform hover:scale-105 duration-300"
  style={{ fontFamily: 'var(--font-primary)', color: 'var(--pure-white)', background: 'var(--mauve)' }}
>
  Section Label
</span>
```

Dark sections: Use gold background (`--jaune-or`) with night text instead.

### Section Header Pattern (NEW)
All section headers follow the **centered triple pattern**:

```tsx
<div className="text-center mb-12 md:mb-16">
  {/* 1. Pill badge kicker */}
  <span className="...">Section Label</span>
  
  {/* 2. Bold sans-serif heading with color accent */}
  <h2 style={{
    fontFamily: 'var(--font-primary)',
    fontWeight: 800,
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    lineHeight: 1.05,
    letterSpacing: '-0.03em',
    color: 'var(--night)',
  }}>
    Heading with <span style={{ color: 'var(--mauve)' }}>accent word</span>
  </h2>
  
  {/* 3. Subtext paragraph */}
  <p className="mt-5 mx-auto" style={{...}}>Description text</p>
</div>
```

### Cards
Cards use **rounded-2xl** with subtle hover lift and purple border glow:

```tsx
<div
  className="rounded-2xl p-8 transition-all duration-300 hover:translate-y-[-4px]"
  style={{
    background: 'var(--pure-white)',
    border: '1px solid var(--command-border)',
    boxShadow: '0 4px 20px rgba(70,29,76,0.04)',
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.borderColor = 'rgba(70,29,76,0.2)';
    e.currentTarget.style.boxShadow = '0 12px 40px rgba(70,29,76,0.08)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.borderColor = 'var(--command-border)';
    e.currentTarget.style.boxShadow = '0 4px 20px rgba(70,29,76,0.04)';
  }}
>
  {/* Card content */}
</div>
```

## Animations

- Sub-components use GSAP or CSS `transition-all duration-300` for hover effects.
- Scroll reveal relies on `.reveal` and `.reveal-stagger` classes with defined easings.
- Standard easing curve: `--ease-out-cubic: cubic-bezier(0.215, 0.61, 0.355, 1);`
- Reduced motion preferences are strictly respected via media queries.

## Strategic Summit Design Direction

### Dark Sections (NEW)
Dark sections use a **purple-dominant gradient** — NOT flat black:

```css
background: linear-gradient(170deg, #2a1435 0%, #1e1028 40%, #150e1c 100%);
```

Dark section rules:
- Reserve for strategic moments: Services showcase, CTA conversion, authority emphasis
- Gold (`--jaune-or`) becomes primary for CTAs and accents on dark
- Mauve becomes secondary (borders, subtle highlights)
- Keep text at 70-80% opacity for readability (`rgba(255,255,255,0.7)`)

### Light Sections
Light sections alternate between:
- `--pure-white` — clean, crisp surfaces
- `--summit-ivory` — warm, welcoming backgrounds

### Page Rhythm (Light-Led)
- **Hero:** Light (`--summit-ivory`) with WebGL atmospheric mountain background
- **ValueProps:** Light (`--pure-white` or `--summit-ivory`), ascending graph layout
- **Services:** Dark (purple gradient) — strategic dark moment
- **Insights:** Light (`--summit-ivory`), clean publication grid
- **Calculator:** Light (`--pure-white`), structured panels
- **News:** Light (`--pure-white`), card-based grid
- **CTA:** Dark (purple gradient) — conversion dark moment

**Balance target:** 70-80% light surfaces, 20-30% dark surfaces

### Atmospheric Surfaces
```css
:root {
  --summit-ivory: #faf8f4;       /* Hero & warm sections */
  --summit-fog: #f0eee9;         /* Depth layer */
  --summit-haze: rgba(70, 29, 76, 0.04);  /* Mauve tint for active states */
  --summit-depth: rgba(70, 29, 76, 0.08); /* Stronger mauve depth */
  --summit-warm: rgba(202, 148, 47, 0.06); /* Gold warmth */
  --summit-glass: rgba(255, 255, 255, 0.7);
  --summit-glass-strong: rgba(255, 255, 255, 0.85);
}
```

### Command Center Tokens
```css
:root {
  --command-border: rgba(10, 10, 10, 0.06);       /* Section dividers */
  --command-border-hover: rgba(70, 29, 76, 0.2);  /* Hover state borders */
  --command-surface: #f7f6f3;                      /* Structured panels */
  --command-surface-hover: rgba(70, 29, 76, 0.03); /* Hover surface */
}
```

### Motion Grammar
```css
:root {
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --duration-fast: 200ms;
  --duration-normal: 400ms;
  --duration-slow: 700ms;
  --duration-reveal: 900ms;
}
```

### Section Spacing
```css
:root {
  --section-gap: clamp(6rem, 10vw, 9rem); /* Consistent vertical rhythm */
}
```

## Implementation Notes

- Tailwind v4 is used alongside custom utilities defined in `styles.css`.
- The single source of truth for all brand colors, typography logic, and complex component shadows is `src/styles.css`.
- Do not use arbitrary Tailwind text colors for basic elements; stick to `var(--night)`, `var(--night-80)`, and `var(--pure-white)`.
- The public site follows a **predominantly light** atmosphere (70-80% light surfaces, 20-30% dark).
- Dark surfaces are reserved for Services and CTA sections only.
- All sections use `paddingTop/paddingBottom: var(--section-gap)` for consistent vertical rhythm.
