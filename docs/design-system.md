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

- Backgrounds: `--pure-white` (base), `--summit-ivory` (alternate light), `--white-smoke` (panels), `--cream` (warm alternate)
- Text: `--night` primary, `--night-80` secondary, `--night-60` tertiary
- Accents: `--mauve` (#461D4C) is the **DOMINANT** UI color (headings, badges, active states, borders, links). `--jaune-or` (#ca942f) is the **ACCENT** (dark section highlights, trust markers, primary CTAs on dark backgrounds).

### Gradients (Source of Truth: `:root` in `styles.css`)
```css
:root {
  --gradient-dark-section: linear-gradient(170deg, #2a1435 0%, #1e1028 40%, #150e1c 100%);
  --gradient-image-overlay: linear-gradient(180deg, rgba(42,20,53,0.35) 0%, rgba(30,16,40,0.55) 100%);
  --gradient-image-overlay-heavy: linear-gradient(135deg, rgba(70,29,76,0.6) 0%, rgba(21,14,28,0.8) 100%);
  --gradient-light-section: linear-gradient(180deg, var(--pure-white) 0%, var(--summit-ivory) 100%);
  --gradient-ivory-section: linear-gradient(180deg, var(--summit-ivory) 0%, var(--pure-white) 100%);
}
```

### Shadows
```css
:root {
  --shadow-card-float: 0 40px 80px rgba(0,0,0,0.3);
  --shadow-card-lift: 0 8px 24px rgba(70,29,76,0.1);
  --shadow-card-hover: 0 20px 40px rgba(70,29,76,0.15);
}
```

### Border Radius
```css
:root {
  --radius-card: 1rem;      /* Standard cards */
  --radius-card-lg: 2rem;   /* Large floating cards */
  --radius-pill: 9999px;    /* Buttons, badges */
}
```

### Fonts
```css
:root {
  --font-primary: 'Aptos', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  --font-display: 'Fraunces', 'Georgia', serif;
  --font-display-aptos: 'Aptos', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
}
```

- **Primary (sans-serif)**: Used for ALL headings (weight 600-700), body text, and UI elements.
- **Display (serif)**: Reserved for cinematic hero only (HeroSectionMountain). NOT used in section headings.
- No italic emphasis in headings — use `<span style={{ color: 'var(--jaune-or)' }}>` color spans instead.

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

## Reusable UI Components (`src/components/ui/`)

### PillBadge
```tsx
import { PillBadge } from '../ui';

<PillBadge>Label</PillBadge>                  // mauve variant (light sections)
<PillBadge variant="gold">Label</PillBadge>   // gold variant (dark sections)
```
- Variants: `mauve` (default), `gold`
- Used for all section kickers consistently

### SectionHeader
```tsx
import { SectionHeader } from '../ui';

<SectionHeader
  badge="Label"
  heading={<>Heading with <span style={{ color: 'var(--jaune-or)' }}>accent.</span></>}
  subtext="Optional description text"
  align="left"    // or "center"
  dark={false}     // true for dark sections (auto-switches badge to gold)
/>
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

## Implementation Notes

- Tailwind v4 is used alongside custom utilities defined in `styles.css`.
- The single source of truth for all brand colors, typography logic, and complex component shadows is `src/styles.css`.
- Do not use arbitrary Tailwind text colors for basic elements; stick to `var(--night)`, `var(--night-80)`, and `var(--pure-white)`.
