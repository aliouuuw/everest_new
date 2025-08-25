# Everest Finance Design System

## Foundations

### Color Palette (Source of Truth)
```css
/* Brand Core Colors */
:root {
  --pure-white: #FFFFFF;
  --white-smoke: #f5f5f5;      /* subtle background */
  --timberwolf: #e0e0e0;       /* borders/dividers */
  --line-soft: #eeeeee;        /* hairline dividers */

  --gold-metallic: #b7a47a;    /* brand accent */
  --gold-light: #e9e1cb;       /* light accent */
  --gold-dark: #8c7a52;        /* dark accent */

  --night: #0f1115;            /* primary ink */
  --night-80: rgba(15, 17, 21, 0.8);

  /* Extended Palette */
  --success-green: #10b981;
  --error-red: #ef4444;

  /* Opacity Variations */
  --white-smoke-80: rgba(245, 245, 245, 0.8);
  --night-10: rgba(15, 17, 21, 0.08);
  --night-20: rgba(15, 17, 21, 0.16);
  --gold-metallic-20: rgba(199, 164, 105, 0.2);
  --gold-metallic-10: rgba(199, 164, 105, 0.1);
}
```

- Backgrounds: `--pure-white` (base), `--white-smoke` (panels), `--night` (rare dark accents)
- Text: `--night` primary, `--night-80` secondary
- Accents: `--gold-metallic` family only for brand emphasis

### Fonts
```css
:root {
  --font-primary: 'General Sans', system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
  --font-display: 'General Sans', system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
}
```

Tailwind is used for sizing/spacing; custom classes provide hierarchy and tone.

## Utilities

### Glassmorphism
```css
@utility glassmorphism {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px) saturate(120%);
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 8px 24px rgba(0,0,0,0.05);
}
```

### Brand Gradients
```css
@utility gradient-gold {
  background: linear-gradient(120deg, var(--gold-light) 0%, var(--gold-metallic) 55%, var(--gold-dark) 100%);
}
@utility gradient-gold-subtle {
  background: linear-gradient(180deg, var(--gold-metallic-10) 0%, transparent 75%);
}
@utility text-gradient-gold {
  background: linear-gradient(135deg, var(--gold-metallic) 0%, var(--gold-dark) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Animations
```css
@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
@keyframes fadeInUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
@keyframes slideInRight { from{opacity:0;transform:translateX(30px)} to{opacity:1;transform:translateX(0)} }
@keyframes slideInFromLeft { from{opacity:0;transform:translateX(-30px)} to{opacity:1;transform:translateX(0)} }
@keyframes slideInFromRight { from{opacity:0;transform:translateX(30px)} to{opacity:1;transform:translateX(0)} }
@keyframes tickerScroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

.ticker-scroll { animation: tickerScroll 45s linear infinite; }
.ticker-scroll-paused { animation: tickerScroll 45s linear infinite; animation-play-state: paused; }

:root {
  --ease-out-cubic: cubic-bezier(0.215, 0.61, 0.355, 1);
  --ease-in-out-cubic: cubic-bezier(0.645, 0.045, 0.355, 1);
  --ease-out-back: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
```

- Respect `prefers-reduced-motion`; long-running ambient animations are subtle.

## Typography

### Classes
```css
.kicker { text-transform: uppercase; letter-spacing: 0.18em; font-weight: 600; font-size: 0.7rem; }
.heading-display { font-weight: 500; line-height: 1.08; letter-spacing: -0.02em; }
.brand-heading { font-weight: 500; letter-spacing: -0.01em; line-height: 1.1; }
.numeric-tabular { font-variant-numeric: tabular-nums lining-nums; font-feature-settings: "tnum" 1, "lnum" 1; }

.luxury-heading { font-weight: 300; font-size: clamp(2.25rem, 6vw, 4.25rem); line-height: 1.05; letter-spacing: -0.02em; color: var(--night); }
.luxury-subheading { font-weight: 400; font-size: clamp(0.95rem, 1.6vw, 1.125rem); line-height: 1.7; color: var(--night-80); max-width: 42rem; margin: 0 auto; }

.text-primary { line-height: 1.6; }
.text-secondary { line-height: 1.5; color: var(--night-80); }
```

### Usage
- Kicker: small uppercase descriptor above headings
- Luxury heading: hero headline tone
- Numeric tabular: use for prices/index values

## Components

### Buttons
- Primary: `.btn-primary` dark ink on light, subtle gold shimmer on hover
- Secondary: `.btn-secondary` bordered, soft backgrounds on hover

```html
<button class="btn-primary font-display tracking-wide">Call to action</button>
<button class="btn-secondary font-display tracking-wide">Secondary</button>
```

Focus style uses gold-tinted shadows.
```css
.btn-primary:focus-visible { box-shadow: 0 0 0 3px var(--gold-metallic-20), 0 0 0 1px var(--gold-metallic); outline: none; }
.btn-secondary:focus-visible { box-shadow: 0 0 0 3px var(--gold-metallic-10), 0 0 0 1px var(--gold-metallic); outline: none; }
```

### Cards
```html
<div class="stat-card">...</div>
```
- Light background with gold-tinted border and soft shadow on hover.

### Header
- Fixed, centered container with `glassmorphism`
- Desktop: nav with hover dropdowns
- Mobile: hamburger toggles a blurred panel menu

### Hero
- Background: subtle `gradient-gold-subtle` and animated `MountainWireframe`
- Content: `kicker`, `luxury-heading`, `luxury-subheading`, primary/secondary buttons
- Extras: bottom-left license text, centered minimal scroll indicator

## Icons
- Library: `react-icons` (Font Awesome glyphs)
- Current usage: `FaUser` in header; expand as needed

```bash
npm install react-icons
```

```tsx
import { FaUser } from 'react-icons/fa';
```

## Layout & Spacing
- Tailwind handles spacing and breakpoints
- Common container: `max-w-6xl mx-auto px-4/5/6`
- Hero grid: single column on mobile, two columns on large screens

## Responsive Behavior
- Header nav hidden on `<lg`, mobile menu enabled
- Hero is full viewport height across breakpoints

## Accessibility
- Focus: visible focus rings on interactive elements (gold-tinted shadows)
- Motion: honor `prefers-reduced-motion`

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- Contrast: meet WCAG AA — text 4.5:1, large text 3:1, UI components 3:1

## Implementation Notes
- Tailwind v4 is used alongside custom utilities defined in `:root`
- Tokens live in `src/styles.css` and should be the single source of truth

---

Design System Version: 1.1  
Last Updated: 2025-08-25  
Maintained by: Design Team
