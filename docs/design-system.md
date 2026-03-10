# Everest Finance Design System

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

  /* Brand Accents */
  --jaune-or: #ca942f;         /* Primary brand accent */
  --mauve: #461D4C;            /* Secondary brand accent */
  
  /* Ink / Text */
  --night: #0a0a0a;            /* Primary ink */
  --night-80: rgba(10, 10, 10, 0.8);
  --night-60: rgba(10, 10, 10, 0.6);
  --night-20: rgba(10, 10, 10, 0.2);
  --night-10: rgba(10, 10, 10, 0.1);
}
```

- Backgrounds: `--pure-white` (base), `--white-smoke` (panels), `--cream` (alternate), `--night` (dark sections)
- Text: `--night` primary, `--night-80` secondary, `--night-60` tertiary
- Accents: `--jaune-or` as primary action and highlight color; `--mauve` as secondary accent (tags, hover states, badges)

### Fonts
```css
:root {
  --font-primary: 'Aptos', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  --font-display: 'Fraunces', 'Georgia', serif;
  --font-display-aptos: 'Aptos', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
}
```

- **Primary**: Clean sans-serif used for body text and ui elements.
- **Display**: Elegant serif (`Fraunces`) used exclusively for large luxury headings.
- **Display Aptos**: Medium-weight sans-serif for component headers and structural text.

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
- **Primary**: `.btn-primary` (Dark ink bg, white text, hover lift)
- **Secondary**: `.btn-secondary` (Bordered night, hover night bg)
- **Dark Mode Primary**: `.btn-primary-dark` (Gold bg, white text)
- **Dark Mode Secondary**: `.btn-secondary-dark` (Bordered gold, gold text)

Focus states use accessible gold-tinted double ring shadows.

## Animations

- Sub-components use GSAP or CSS `transition-all duration-300` for hover effects.
- Scroll reveal relies on `.reveal` and `.reveal-stagger` classes with defined easings.
- Standard easing curve: `--ease-out-cubic: cubic-bezier(0.215, 0.61, 0.355, 1);`
- Reduced motion preferences are strictly respected via media queries.

## Strategic Summit Design Direction

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

### Page Rhythm (Light-Led)
- **Hero**: Light (summit-ivory) with atmospheric glass veils
- **ValueProps**: Pure white, structured two-column
- **Services**: Dark (mauve-night gradient) — strategic dark moment
- **Insights**: Summit ivory, clean publication grid
- **Calculator**: Pure white with subtle atmospheric orbs
- **News**: Pure white, card-based grid
- **CTA**: Dark (mauve-night) — conversion dark moment

### Kicker Pattern
All section kickers use the same visual pattern:
```tsx
<span className="inline-flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase mb-6"
  style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--mauve)' }}>
  <span className="inline-block w-5 h-[1px]" style={{ background: 'var(--mauve)', opacity: 0.4 }} />
  Section Label
</span>
```

Dark sections use `color: 'var(--jaune-or)'` with gold line instead.

### Heading Pattern
All section headings use Fraunces serif at weight 300:
```tsx
<h2 style={{
  fontFamily: 'var(--font-display)',
  fontWeight: 300,
  fontSize: 'clamp(2rem, 4vw, 3.2rem)',
  lineHeight: 1.05,
  letterSpacing: '-0.015em',
  color: 'var(--night)', // or var(--pure-white) on dark
}}>
```

## Implementation Notes

- Tailwind v4 is used alongside custom utilities defined in `styles.css`.
- The single source of truth for all brand colors, typography logic, and complex component shadows is `src/styles.css`.
- Do not use arbitrary Tailwind text colors for basic elements; stick to `var(--night)`, `var(--night-80)`, and `var(--pure-white)`.
- The public site follows a **predominantly light** atmosphere (70-80% light surfaces, 20-30% dark).
- Dark surfaces are reserved for Services and CTA sections only.
- All sections use `paddingTop/paddingBottom: var(--section-gap)` for consistent vertical rhythm.
