# Public Pages Experience Redesign Plan
 
**Status:** Hero section redesigned and polished. Ready for remaining sections.

## Completed Work

### HeroSectionMountain.tsx
**Status:** ✅ Redesigned, polished, and committed

**Key Decisions:**
- Removed image-based background in favor of code-generated Granient-style gradients
- Eliminated AI-slop patterns (glass cards, metric layouts, pulse animations)
- Implemented single-column monumental typography
- Added sophisticated micro-interactions via `/delight` skill
- Refined spacing and consistency via `/polish` skill

**Skills Used:** `/critique`, `/frontend-design`, `/delight`, `/polish`

## Scope
 
### Shared landing surfaces
 - `src/App.tsx`
 - `src/components/Hero/HeroSectionMountain.tsx`
 - `src/components/Sections/ValueProps.tsx`
 - `src/components/Sections/Services.tsx`
 - `src/components/Sections/Insights.tsx`
 - `src/components/Sections/NewsSection.tsx`
 - `src/components/Sections/CTA.tsx`
 
 ### Public routes to redesign after landing
 - `src/routes/PublicationsPage.tsx`
 - `src/routes/PublicationPage.tsx`
 - `src/routes/ServicesPage.tsx`
 - Then remaining public routes one by one: `AboutPage.tsx`, `FAQPage.tsx`, `BoursePage.tsx`, `AssistedMgmtPage.tsx`, `DiscretionaryMgmtPage.tsx`, `MandateMgmtPage.tsx`, `CapitalMarketsPage.tsx`, `InvestmentBankingPage.tsx`, `PortalPage.tsx`, `AuthPage.tsx`
 
 ### Out of scope for this phase
 - `src/routes/admin/**`
 - `src/routes/DashboardPage.tsx`
 
 ## Core Reframe
 
 The redesign should not be treated as a color pass. The goal is to redefine how Everest Finance feels on first contact.
 
 What must change:
 - page composition and section order when needed
 - hero storytelling and background concept
 - scale, density, rhythm, and whitespace usage
 - visual hierarchy between trust, expertise, and performance
 - motion language, reveal choreography, and hover behaviors
 - relationship between landing, services, and publications pages
 
 What should only support the redesign, not drive it:
 - brand color application
 - token cleanup
 - surface gradients
 - decorative accents
 
 ## Brand Questions the Design Must Answer
 
 Before implementation, the public experience should clearly position Everest Finance as:
 - a trusted financial operator, not a generic startup
 - regionally credible and institutionally serious
 - premium but not cold
 - sophisticated without looking like a media magazine or luxury fashion brand
 - accessible to both aspirational and established investors
 
 The company provided colors, but the identity can still be shaped around:
 - BRVM / capital markets expertise
 - West African financial leadership
 - advisory trust and execution rigor
 - wealth progression and portfolio stewardship
 
 ## Current Structural Observations
 
 Based on the current public pages:
 - the site has multiple strong components, but they do not yet belong to one clear experience world
 - several sections are still driven by content blocks instead of a narrative journey
 - the homepage alternates between editorial, corporate, and luxury cues without a single governing tone
 - the current hero relies on atmosphere more than a precise brand metaphor
 - services and publications are being treated as section variants instead of distinct user journeys
 
 ## Proposed Process
 
 ### Stage 1 — Define the design direction before more implementation
 Decide on a non-editorial core direction for the public site.
 
 Output:
 - one approved brand-experience direction
 - a list of visual principles and anti-patterns
 - a hero concept brief aligned with that direction
 
 ### Stage 2 — Build an experience framework
 Establish rules that every public page must follow.
 
 Deliverables:
 - homepage narrative architecture
 - layout grammar for hero, split sections, grids, and conversion moments
 - motion grammar for reveals, emphasis, and hover states
 - component hierarchy for trust, expertise, and offer presentation
 
 ### Stage 3 — Redesign the landing page as the flagship
 Files:
 - `src/App.tsx`
 - `HeroSectionMountain.tsx`
 - `ValueProps.tsx`
 - `Services.tsx`
 - `Insights.tsx`
 - `NewsSection.tsx`
 - `CTA.tsx`
 
 Goal:
 - make the homepage feel like the canonical Everest Finance experience
 - redesign section structure where necessary instead of preserving current layouts by default
 - create stronger sequencing from trust to expertise to action
 
 ### Stage 4 — Extend the system to public routes
 
 #### 4.1 Publications index
 Goal:
 - make it part of the same experience world while preserving discoverability
 - avoid pure editorial-magazine tropes unless they are intentionally selected in the approved direction
 
 #### 4.2 Publication article page
 Goal:
 - design a reading template that feels premium and useful, not just styled
 - reinforce authority, clarity, and retention through layout and metadata treatment
 
 #### 4.3 Services hub page
 Goal:
 - turn services into a guided decision environment
 - use comparison, progression, and trust-building structure rather than simple cards
 
 #### 4.4 Remaining public pages
 Move one page at a time after the flagship system is approved.
 
 ## Candidate Non-Editorial Directions
 
 ### Direction A — Strategic Summit
 Position Everest Finance as a high-altitude guide for capital decisions.
 
 Characteristics:
 - monumental layouts
 - calm, sparse composition
 - horizon, elevation, trajectory, ascent cues
 - premium confidence without excess ornament
 - motion that feels deliberate and measured
 
 Best for:
 - trust, ambition, long-term positioning
 - a hero that feels iconic and ownable
 
 Risk:
 - can become too abstract if not anchored with concrete trust signals
 
 ### Direction B — Capital Command Center
 Position Everest Finance as a disciplined operator with market intelligence and execution control.
 
 Characteristics:
 - structured dashboards and signal panels
 - data-informed layout rhythm
 - grid-based composition
 - precise, restrained motion
 - stronger institutional and professional tone
 
 Best for:
 - authority, competence, execution, market seriousness
 - services and publications integration
 
 Risk:
 - can feel too technical or cold if not softened with human trust cues
 
 ### Direction C — Private Advisory Maison
 Position Everest Finance as a premium relationship-led advisory house.
 
 Characteristics:
 - intimate layouts
 - refined materials and tactile surfaces
 - higher emphasis on counsel, discretion, and tailored support
 - slower, softer interactions
 - human-centered conversion moments
 
 Best for:
 - affluent clients, trust, relationship-building
 - converting visitors into consultations
 
 Risk:
 - can drift too far into luxury codes and away from financial credibility
 
 ### Direction D — Regional Market Authority
 Position Everest Finance as a leading West African market specialist.
 
 Characteristics:
 - geography, networks, flows, regional context
 - institutional clarity with local relevance
 - stronger emphasis on BRVM and UEMOA expertise
 - brand world shaped by market access and regional leadership
 
 Best for:
 - differentiation versus generic global finance aesthetics
 - identity rooted in what the company actually does
 
 Risk:
 - requires disciplined visual research to avoid cliché regional motifs
 
 ## Recommended Next Move
 
 Choose one primary direction, or a deliberate hybrid:
 - `Strategic Summit + Capital Command Center`
 - `Strategic Summit + Regional Market Authority`
 - `Private Advisory Maison + Capital Command Center`
 
 My current recommendation is:
 - **Primary:** `Strategic Summit`
 - **Secondary influence:** `Capital Command Center`
 
 Reason:
 - it gives Everest Finance a distinctive metaphor beyond editorial styling
 - it fits the name "Everest"
 - it supports a stronger hero regeneration
 - it can still incorporate trust metrics, market intelligence, and conversion logic

 ## Approved Direction
 
 The approved direction for implementation is:
 - **Strategic Summit + Capital Command Center**

Interpretation:
- `Strategic Summit` defines the emotional and symbolic layer
- `Capital Command Center` defines the structural and operational layer

This means the public site should feel:
- elevated, clear, and confident
- rigorous, informed, and execution-oriented
- premium through restraint rather than ornament
- guided by perspective and control, not by editorial styling

## Approved Atmosphere

The public experience should be **predominantly light**.

Target balance:
- **Light surfaces:** roughly `70–80%`
- **Dark surfaces:** roughly `20–30%`

Atmospheric rules:
- light mode is the default experience across most public pages
- dark mode is reserved for cinematic, high-authority, or conversion-heavy moments
- avoid treating black as the default brand background
- prefer ivory, white-smoke, cream, and very soft mauve-tinted surfaces for the main reading and browsing experience
- when dark is used, prefer mauve-night or plum-depth over flat black

Page rhythm guidance:
- homepage: light-led overall, with one or two strategic dark emphasis sections at most
- hero: may remain dark or dark-to-light if it creates a stronger opening and transitions cleanly into the lighter site body
- publications pages: mostly light for clarity, scanning, and readability
- services pages: mostly light, with dark used only where it enhances authority or comparison focus
- CTA / footer-adjacent moments: can use dark for contrast and memorability

Design consequence:
- the brand should feel welcoming first, then authoritative
- contrast should come from rhythm and composition, not from making the entire site dark

## Skill Usage After Direction Approval
- `/critique`: evaluate structural and narrative weaknesses, not just colors
- `/frontend-design`: redesign layouts, hierarchy, and composition
- `/delight`: define motion language and premium interaction moments
- `/normalize`: only after the new structure is proven
- `/colorize`: final refinement of the chosen experience world
- `/polish`: final consistency pass

## Implementation Guardrails
- Do not preserve an existing section just because it already exists.
- Allow section reordering, merging, or replacement when it improves narrative flow.
- Use `docs/design-system.md` as the baseline for typography roles, not as a cage for the old composition style.
- Each public page should communicate one dominant intent: trust, choose, learn, or convert.
- Motion should reinforce hierarchy and confidence, never feel decorative by default.

## Approved Hero Background Concept

The hero background uses a **Granient-style abstract mountain** approach — code-generated using CSS radial gradients, SVG noise filters, and GSAP animations. This aligns with the Strategic Summit direction and the light-led atmosphere while avoiding image dependencies and AI-slop patterns.

### Visual Description
An abstract mountain landscape constructed from overlapping, highly-blurred radial gradients in mauve, champagne gold, ivory, and deep plum. The forms suggest elevation and horizon without literal representation. A premium SVG noise texture (`feTurbulence` + `feColorMatrix`) creates the characteristic Granient grain. Slow-moving ambient animations (scale, rotation, drift) make the surface feel alive and breathing. A subtle shimmer band periodically sweeps across for moments of delight. The result is airy and welcoming, but still strategic, elevated, and quietly authoritative.

### Technical Implementation
**Stack:** CSS Radial Gradients + SVG Filters + GSAP

**Layer architecture:**
1. **Base Canvas** — ivory white (#Fbfafc)
2. **Deep Valley** — dark mauve (#3A1440) radial gradient, blur(120px), opacity 0.12 — anchor element
3. **Gold Ridge** — champagne gold radial gradient, blur(140px), opacity 0.1 — left-side warmth
4. **Mauve Peak** — brand mauve radial gradient, blur(130px), opacity 0.12 — right-side elevation
5. **Light Mist** — pure white radial gradient, blur(90px), opacity 0.75 — center brightening
6. **SVG Noise Layer** — `feTurbulence` baseFrequency="0.65" + `feColorMatrix` alpha 0.12, mix-blend-overlay
7. **Fine Grain Overlay** — secondary noise layer, mix-blend-multiply, opacity 0.025
8. **Shimmer Band** — moving light sweep, 6s duration, 12s repeat delay
9. **Bottom Fog** — gradient ensuring text readability

**Animation approach:**
- Entrance: 3s fade-in for gradient layers, staggered 0.2s
- Typography reveal: 1.4s expo.out per line, staggered 0.06s
- Ambient breathing: each gradient mesh scales/rotates at different speeds (18s, 24s, 20s, 30s) using sine.inOut
- Grain mask: opacity pulses 0.9 for "alive" texture feel
- Shimmer: sweeps across every 18s (6s animate + 12s rest)

**Color palette integration:**
- Base: ivory white (#Fbfafc) — 75% dominance
- Atmospheric depth: pale mauve-gray (#461D4C at 10-12% opacity) — 15%
- Warm accent: champagne gold (#ca942f at 10% opacity) — 10%
- Deep anchor: dark mauve (#3A1440 at 12% opacity) — texture base

### Content Layout
- **Structure:** Single-column monumental typography, no side cards
- **Kicker:** "Société de Gestion et d'Intermédiation — Dakar" with animated line
- **Headline:** "L'excellence / au sommet / du capital." — Fraunces display, italic on "au sommet"
- **Subhead:** Clean paragraph, max-width 480px, --night-50 color
- **CTAs:** Primary (dark with mauve hover fill) + Secondary (text with gold underline)
- **Trust signals:** Inline text markers with gold dots (not cards)

### Micro-interactions (Delight)
- Primary CTA: mauve fill slides up on hover, arrow translates right (200ms)
- Secondary CTA: gold underline animates width on hover, arrow translates right (200ms)
- Trust markers: gold dot scales 125% and switches to mauve on hover, text darkens
- All interactive elements have `focus-visible:ring-2` for keyboard accessibility
- `prefers-reduced-motion` detection disables all animations

### What to Avoid
- ❌ Literal tourism mountain wallpaper
- ❌ Generic SaaS floating glass UI cards
- ❌ Dark cyber finance neon aesthetic
- ❌ Losing all structure in abstract fog
- ❌ Overly glossy gold glamour
- ❌ Hero metric layout template (big number + small label)
- ❌ Identical card grids
- ❌ `animate-pulse` decorative elements
- ❌ `mix-blend-multiply` darkening backgrounds
