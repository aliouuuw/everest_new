# Technical Specifications & Features

## Technology Stack

### Frontend Framework
- **React 18+**: Modern React with hooks and concurrent features
- **TypeScript**: Type-safe development with enhanced IDE support
- **TanStack Router**: Type-safe, code-based routing solution
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **React Icons**: Font Awesome icons via react-icons/fa package
- **GSAP (GreenSock)**: High-performance animations
- **WebGL/Three.js**: 3D graphics and enhanced visual effects

### Development Tools
- **Vite**: Lightning-fast build tool and dev server with HMR
- **ESLint**: Code quality and linting with TypeScript support
- **TypeScript Compiler**: Type checking and compilation
- **PostCSS**: CSS processing with Tailwind integration
- **Git**: Version control with initialized repository

### Backend Options (To Be Decided)
**Sync Engine Options:**
- **Convex**: Real-time backend with automatic sync and type safety
- **TanStack DB**: Local-first database with sync capabilities  
- **Supabase**: PostgreSQL-based backend with real-time features

**Selection Criteria:**
- Real-time BRVM data requirements
- Scalability needs
- Development complexity
- Cost considerations
- Type safety integration

## Hero Section Technical Requirements

### Background & Layout
```css
Background: white-smoke (#f5f5f5ff)
Container: Full viewport height (100vh)
Layout: CSS Grid/Flexbox hybrid
Responsive: Mobile-first approach
```

### Animated Mountain SVG
**SVG Specifications:**
- Vector-based mountain silhouette
- Scalable design (min: 320px, max: 1920px)
- Clean, geometric style
- Optimized path data (<10KB file size)

**Animation Requirements:**
```javascript
// GSAP Animation Specifications
- Subtle parallax effect on scroll
- Gentle floating/breathing animation (2-3px amplitude)
- Color transition on hover/interaction
- Performance: 60fps target
- Duration: 3-5 seconds loop
```

### Typography System
**Font Stack:**
- Primary: System fonts (SF Pro, Helvetica Neue, Arial)
- Fallback: Web-safe alternatives
- Loading: Font-display swap for performance

**Hierarchy:**
```css
H1: 3.5rem (56px) - Company name
H2: 2.25rem (36px) - Tagline
Body: 1.125rem (18px) - Supporting text
Caption: 0.875rem (14px) - Legal/meta info
```

### WebGL Integration
**Purpose:** Enhanced visual appeal without performance impact
- Subtle particle effects
- Golden gradient overlays (brand-compliant)
- Interactive background elements
- Fallback: CSS-only version for unsupported devices

### Icon Integration
**React Icons Implementation:**
```javascript
// Icon usage in components
import { FaChartLine, FaMountain, FaPlay } from 'react-icons/fa';

// Stock ticker with icons
<div className="stock-item">
  <FaChartLine size={16} className="icon-accent" />
  <span>BOAS: 1,250 XOF</span>
  <FaTrendingUp size={14} className="icon-success" />
</div>
```

**Performance Considerations:**
- Tree-shake unused icons
- Import only required icons
- Use consistent sizing (16px, 20px, 24px)
- Apply CSS classes for consistent styling

## Navigation System (Bottom Dock)

### Design Specifications
```css
Position: Fixed bottom
Height: 80px (desktop), 60px (mobile)
Background: rgba(245, 245, 245, 0.95)
Backdrop-filter: blur(20px)
Border-radius: 20px 20px 0 0
```

### BRVM Stock Slider
**Data Requirements:**
- Real-time stock prices from BRVM
- Company symbols and current values
- Percentage change (daily)
- Last update timestamp

**Slider Specifications:**
```javascript
// Slider Configuration
Auto-scroll: 30 seconds per cycle
Manual controls: Touch/mouse drag with icon indicators
Smooth transitions: 0.5s ease-out
Responsive: 3-5 items visible (screen dependent)
Navigation icons: FaArrowLeft, FaArrowRight from react-icons/fa
```

**Stock Data Format:**
```json
{
  "symbol": "BOAS",
  "name": "Bank of Africa Senegal",
  "price": "1,250 FCFA",
  "change": "+2.5%",
  "changeType": "positive", // for icon selection
  "icon": "FaTrendingUp", // suggested icon
  "timestamp": "2024-01-15T15:30:00Z"
}
```

## Performance Requirements

### Loading Performance
- **First Contentful Paint (FCP)**: <1.5s
- **Time to Interactive (TTI)**: <3s
- **Cumulative Layout Shift (CLS)**: <0.1

### Animation Performance
- **Frame Rate**: 60fps maintained
- **GPU Acceleration**: Transform and opacity only
- **Memory Usage**: <50MB for animations
- **CPU Usage**: <30% on mid-range devices

### Network Optimization
```javascript
// Resource Loading Strategy
- Critical CSS: Inline (<14KB)
- Non-critical CSS: Defer loading
- Images: WebP with JPG fallback
- SVG: Inline for critical graphics
- JavaScript: Lazy load non-critical features
```

## Browser Support

### Primary Support (Full Features)
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Fallback Support (Graceful Degradation)
- Chrome 70+
- Firefox 70+
- Safari 12+
- IE 11 (minimal functionality)

## Accessibility Requirements

### WCAG 2.1 AA Compliance
- **Color Contrast**: 4.5:1 minimum ratio
- **Focus Management**: Visible focus indicators
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Readers**: ARIA labels and roles
- **Motion Preferences**: Respect prefers-reduced-motion

### Implementation Details
```html
<!-- Example ARIA structure with icons -->
<nav role="navigation" aria-label="BRVM Stock Information">
  <button aria-label="Previous stocks" className="nav-button">
    <FaArrowLeft size={16} aria-hidden="true" />
  </button>
  <div role="region" aria-live="polite" aria-label="Live stock prices">
    <!-- Stock slider content with icons -->
    <div className="stock-item">
      <FaChartLine aria-hidden="true" size={16} />
      <span>BOAS: 1,250 XOF</span>
      <FaTrendingUp aria-hidden="true" size={14} />
    </div>
  </div>
  <button aria-label="Next stocks" className="nav-button">
    <FaArrowRight size={16} aria-hidden="true" />
  </button>
</nav>
```

## API Integration Requirements

### BRVM Data Source
**Endpoint Structure:**
```
Base URL: [To be determined - BRVM API or third-party provider]
Update Frequency: Every 30 seconds during market hours
Caching: 5-minute client-side cache
Error Handling: Graceful fallback to last known values
```

**Security Considerations:**
- CORS configuration
- Rate limiting compliance
- API key management
- Data validation and sanitization

## Development Environment Setup

### Required Dependencies

#### Core Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "@tanstack/react-router": "^1.15.0",
  "@tanstack/router-devtools": "^1.15.0",
  "react-icons": "^4.12.0",
  "gsap": "^3.12.0",
  "three": "^0.158.0",
  "@types/three": "^0.158.0"
}
```

#### Development Dependencies
```json
{
  "@types/react": "^18.2.0",
  "@types/react-dom": "^18.2.0",
  "@typescript-eslint/eslint-plugin": "^6.0.0",
  "@typescript-eslint/parser": "^6.0.0",
  "@vitejs/plugin-react": "^4.2.0",
  "autoprefixer": "^10.4.16",
  "eslint": "^8.45.0",
  "eslint-plugin-react-hooks": "^4.6.0",
  "eslint-plugin-react-refresh": "^0.4.5",
  "postcss": "^8.4.32",
  "tailwindcss": "^3.4.0",
  "typescript": "^5.0.2",
  "vite": "^5.0.8"
}
```

#### Backend Dependencies (Conditional)
```json
{
  // If using Convex
  "convex": "^1.8.0",
  
  // If using Supabase
  "@supabase/supabase-js": "^2.38.0",
  
  // If using TanStack DB
  "@tanstack/react-query": "^5.17.0",
  "@tanstack/query-devtools": "^5.17.0"
}
```

### Build Configuration

#### Vite Configuration
```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';

export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(),
  ],
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@utils': '/src/utils',
      '@types': '/src/types',
    },
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['@tanstack/react-router'],
          animations: ['gsap'],
          icons: ['react-icons'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
```

#### Tailwind Configuration
```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'white-smoke': '#f5f5f5',
        'timberwolf': '#dcdad2',
        'gold-metallic': '#e4bd61',
        'night': '#0a0a0a',
        'gradient-gold-light': '#f4d03f',
        'gradient-gold-dark': '#d4a843',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'slide-up': 'slideUp 0.8s ease-out',
      },
    },
  },
  plugins: [],
} satisfies Config;
```

## Testing Strategy

#### Testing Framework Setup
```json
{
  "@testing-library/react": "^13.4.0",
  "@testing-library/jest-dom": "^6.1.0",
  "@testing-library/user-event": "^14.5.0",
  "vitest": "^1.1.0",
  "@vitest/ui": "^1.1.0",
  "jsdom": "^23.0.0"
}
```

#### Automated Testing
- **Unit Tests**: React components and TypeScript utilities
- **Integration Tests**: TanStack Router navigation flows
- **Component Tests**: React Testing Library for UI components
- **Visual Regression**: Screenshot comparisons with Playwright
- **Performance Tests**: Lighthouse CI integration
- **Accessibility Tests**: axe-core integration with React Testing Library

#### Test Examples
```typescript
// Component test example
import { render, screen } from '@testing-library/react';
import { StockTicker } from './StockTicker';

test('displays stock information correctly', () => {
  const mockStock = {
    symbol: 'BOAS',
    price: 1250,
    change: 2.5,
    currency: 'XOF'
  };
  
  render(<StockTicker {...mockStock} />);
  
  expect(screen.getByText('BOAS: 1,250 XOF')).toBeInTheDocument();
  expect(screen.getByText('+2.5%')).toBeInTheDocument();
});
```

#### Manual Testing
- Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- Mobile device testing with responsive design
- Animation smoothness validation
- BRVM data integration verification
- TypeScript type checking validation

---

*Technical Lead: [To be assigned]*  
*Last Updated: [Current Date]*  
*Version: 1.0*
