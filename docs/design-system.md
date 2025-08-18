# Everest Finance Design System

## Color Palette

### Primary Colors
```css
/* Brand Core Colors */
:root {
  --white-smoke: #f5f5f5;      /* hsla(0, 0%, 96%, 1) */
  --timberwolf: #dcdad2;       /* hsla(48, 13%, 84%, 1) */
  --gold-metallic: #e4bd61;    /* hsla(42, 71%, 64%, 1) */
  --night: #0a0a0a;            /* hsla(0, 0%, 4%, 1) */
}
```

### Semantic Color Usage

#### Background Colors
- **Primary Background**: `white-smoke` - Main site background
- **Secondary Background**: `timberwolf` - Card backgrounds, sections
- **Contrast Background**: `night` - Dark sections, overlays

#### Accent & Interactive
- **Primary Accent**: `gold-metallic` - Buttons, links, highlights
- **Text Primary**: `night` - Main text content
- **Text Secondary**: `rgba(10, 10, 10, 0.7)` - Supporting text
- **Text Muted**: `rgba(10, 10, 10, 0.5)` - Meta information

### Extended Color Palette
```css
/* Additional Utility Colors */
:root {
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
  --info: #3b82f6;
  
  /* Opacity Variations */
  --white-smoke-80: rgba(245, 245, 245, 0.8);
  --night-10: rgba(10, 10, 10, 0.1);
  --night-20: rgba(10, 10, 10, 0.2);
  --gold-metallic-20: rgba(228, 189, 97, 0.2);
  
  /* Gradient Colors - Golden Brand Only */
  --gradient-gold-light: #f4d03f;
  --gradient-gold-medium: #e4bd61;
  --gradient-gold-dark: #d4a843;
}
```

### Brand Gradient Usage
**Gradient Restriction**: Only use gradients with golden brand colors to maintain brand consistency.

```css
/* Approved Gradient Combinations */
:root {
  --gradient-primary: linear-gradient(135deg, var(--gradient-gold-light) 0%, var(--gold-metallic) 100%);
  --gradient-secondary: linear-gradient(90deg, var(--gold-metallic) 0%, var(--gradient-gold-dark) 100%);
  --gradient-subtle: linear-gradient(180deg, var(--gold-metallic-20) 0%, transparent 100%);
  --gradient-radial: radial-gradient(circle, var(--gold-metallic-20) 0%, transparent 70%);
}
```

**Usage Examples**:
- Hero section subtle background enhancement
- Button hover states
- Card accent borders
- Loading states and progress indicators

## Icon System

### React Icons Implementation
**Library**: `react-icons/fa` (Font Awesome icons)
**Installation**: `npm install react-icons`

```javascript
// Icon imports
import { 
  FaChartLine,     // Stock/financial data
  FaMountain,      // Brand mountain theme
  FaPlay,          // Play/start actions
  FaPause,         // Pause actions
  FaArrowRight,    // Navigation arrows
  FaArrowLeft,     // Navigation arrows
  FaChevronDown,   // Dropdown indicators
  FaExternalLinkAlt, // External links
  FaPhone,         // Contact
  FaEnvelope,      // Email
  FaMapMarkerAlt,  // Location
  FaClock,         // Time/updates
  FaInfoCircle,    // Information
  FaExclamationTriangle, // Warnings
  FaCheckCircle,   // Success states
  FaTimes,         // Close/cancel
  FaBars,          // Menu toggle
  FaSearch,        // Search functionality
  FaUser,          // User/profile
  FaCog,           // Settings
  FaHome,          // Home navigation
  FaBuilding,      // Company/corporate
  FaHandshake,     // Partnership/trust
  FaShieldAlt,     // Security/compliance
  FaTrendingUp,    // Growth/performance
  FaGlobe,         // Global/international
  FaCalculator,    // Financial tools
  FaFileAlt,       // Documents/reports
  FaUsers,         // Team/clients
  FaAward          // Excellence/achievements
} from 'react-icons/fa';
```

### Icon Usage Guidelines

#### Size Standards
```css
:root {
  --icon-xs: 12px;
  --icon-sm: 16px;
  --icon-base: 20px;
  --icon-lg: 24px;
  --icon-xl: 32px;
  --icon-2xl: 48px;
}
```

#### Color Application
```css
/* Icon color classes */
.icon-primary { color: var(--night); }
.icon-accent { color: var(--gold-metallic); }
.icon-muted { color: rgba(10, 10, 10, 0.5); }
.icon-success { color: var(--success); }
.icon-warning { color: var(--warning); }
.icon-error { color: var(--error); }
```

#### Component Examples
```javascript
// Stock ticker with icon
<div className="stock-ticker">
  <FaChartLine className="icon-accent" size={16} />
  <span className="stock-symbol">BOAS</span>
  <span className="stock-price">1,250 XOF</span>
  <FaTrendingUp className="icon-success" size={14} />
</div>

// Navigation button with icon
<button className="nav-button">
  <FaArrowRight className="icon-primary" size={18} />
  <span>Explore Services</span>
</button>

// Status indicator with icon
<div className="market-status">
  <FaClock className="icon-muted" size={14} />
  <span>Market Open</span>
</div>
```

## Typography System

### Font Stack
```css
:root {
  --font-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', 
                  'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 
                  sans-serif;
  --font-mono: 'SF Mono', Monaco, Inconsolata, 'Roboto Mono', 
               Consolas, monospace;
}
```

### Type Scale & Hierarchy
```css
/* Typography Scale */
:root {
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
  --text-5xl: 3rem;      /* 48px */
  --text-6xl: 3.75rem;   /* 60px */
}

/* Line Heights */
:root {
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;
}

/* Font Weights */
:root {
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
}
```

### Typography Components

#### Headings
```css
.heading-1 {
  font-size: var(--text-5xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  color: var(--night);
  letter-spacing: -0.025em;
}

.heading-2 {
  font-size: var(--text-3xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-snug);
  color: var(--night);
}

.heading-3 {
  font-size: var(--text-xl);
  font-weight: var(--font-medium);
  line-height: var(--leading-normal);
  color: var(--night);
}
```

#### Body Text
```css
.text-primary {
  font-size: var(--text-lg);
  font-weight: var(--font-normal);
  line-height: var(--leading-relaxed);
  color: var(--night);
}

.text-secondary {
  font-size: var(--text-base);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
  color: rgba(10, 10, 10, 0.7);
}

.text-caption {
  font-size: var(--text-sm);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
  color: rgba(10, 10, 10, 0.5);
}
```

## Spacing System

### Spacing Scale
```css
:root {
  --space-px: 1px;
  --space-0: 0;
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
  --space-32: 8rem;     /* 128px */
}
```

### Layout Spacing
- **Section Padding**: `var(--space-20)` (80px)
- **Container Max Width**: `1200px`
- **Container Padding**: `var(--space-6)` (24px)
- **Card Padding**: `var(--space-8)` (32px)
- **Button Padding**: `var(--space-3) var(--space-6)` (12px 24px)

## Components

### Buttons

#### Primary Button
```css
.button-primary {
  background: var(--gradient-primary);
  color: var(--night);
  border: none;
  border-radius: 8px;
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.button-primary:hover {
  background: var(--gradient-secondary);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(228, 189, 97, 0.3);
}
```

#### Secondary Button
```css
.button-secondary {
  background: transparent;
  color: var(--night);
  border: 2px solid var(--timberwolf);
  border-radius: 8px;
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.button-secondary:hover {
  border-color: var(--gold-metallic);
  background: var(--gradient-subtle);
}
```

### Cards
```css
.card {
  background: var(--white-smoke);
  border-radius: 12px;
  padding: var(--space-8);
  box-shadow: 0 2px 8px var(--night-10);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px var(--night-20);
}
```

### Stock Ticker Component
```css
.stock-ticker {
  display: flex;
  align-items: center;
  background: rgba(245, 245, 245, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 12px;
  padding: var(--space-4);
  min-width: 160px;
  transition: all 0.2s ease;
}

.stock-symbol {
  font-size: var(--text-sm);
  font-weight: var(--font-bold);
  color: var(--night);
  margin-bottom: var(--space-1);
}

.stock-price {
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--night);
}

.stock-change {
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
}

.stock-change.positive {
  color: var(--success);
}

.stock-change.negative {
  color: var(--error);
}
```

## Animation Guidelines

### Timing Functions
```css
:root {
  --ease-out-cubic: cubic-bezier(0.215, 0.61, 0.355, 1);
  --ease-in-out-cubic: cubic-bezier(0.645, 0.045, 0.355, 1);
  --ease-out-back: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
```

### Animation Durations
- **Micro Interactions**: 150ms
- **UI Transitions**: 250ms
- **Page Transitions**: 400ms
- **Ambient Animations**: 2000ms+

### GSAP Animation Presets
```javascript
// Fade In Animation
const fadeIn = {
  opacity: 0,
  y: 20,
  duration: 0.6,
  ease: "power2.out"
};

// Slide Up Animation  
const slideUp = {
  y: 50,
  opacity: 0,
  duration: 0.8,
  ease: "power3.out"
};

// Mountain Float Animation
const mountainFloat = {
  y: "-=3",
  duration: 4,
  ease: "power1.inOut",
  yoyo: true,
  repeat: -1
};
```

## Responsive Breakpoints

### Breakpoint System
```css
:root {
  --screen-sm: 640px;
  --screen-md: 768px;
  --screen-lg: 1024px;
  --screen-xl: 1280px;
  --screen-2xl: 1536px;
}
```

### Component Responsive Behavior
- **Hero Section**: Full height on desktop, 70vh on mobile
- **Bottom Dock**: 80px height on desktop, 60px on mobile
- **Stock Slider**: 5 items on desktop, 2-3 on mobile
- **Typography**: Scale down 10-15% on mobile

## Accessibility Standards

### Focus States
```css
.focus-visible {
  outline: 2px solid var(--gold-metallic);
  outline-offset: 2px;
}
```

### Motion Preferences
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Color Contrast Requirements
- **Normal Text**: 4.5:1 minimum contrast ratio
- **Large Text**: 3:1 minimum contrast ratio
- **UI Components**: 3:1 minimum contrast ratio

---

*Design System Version: 1.0*  
*Last Updated: [Current Date]*  
*Maintained by: Design Team*
