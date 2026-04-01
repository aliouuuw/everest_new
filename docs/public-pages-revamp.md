# Public Pages Experience Redesign Plan
 
> **Approved Design Direction:** Modern Professional (Apple, Google, dabafinance.com inspired)  
> **Core Shift:** Editorial/literary → Clean, confident sans-serif aesthetic  
> **Dominant Color:** Mauve (#461D4C) | **Accent:** Gold (#ca942f)

## Design Direction Summary

### Key Principles
- **ALL headings** use sans-serif (`var(--font-primary)` = Aptos/Plus Jakarta Sans), weight **600-800** — NO Fraunces serif
- **NO italic emphasis** in headings — use `<span style={{ color: 'var(--mauve)' }}>` for accent words
- **Mauve (#461D4C)** is the **DOMINANT UI color** — headings, active states, badges, filters, links
- **Gold (#ca942f)** is the **ACCENT** — dark section CTAs, trust markers, primary buttons on dark
- **Section kickers** use rounded pill badges (`px-4 py-1.5 rounded-full`) — NOT editorial line+text
- **All section headers** are centered with: pill badge → bold heading → subtext pattern
- **Cards** use `rounded-2xl` with subtle hover lift + purple border glow
- **Buttons** use `rounded-full` (pill shape)
- **Dark sections** use purple-dominant gradient: `linear-gradient(170deg, #2a1435 0%, #1e1028 40%, #150e1c 100%)`
- **Light sections** alternate between `var(--pure-white)` and `var(--summit-ivory)`

## Completed Work

### HeroSectionMountain.tsx
**Status:** ✅ Redesigned with WebGL atmospheric mountain background

**Key Decisions:**
- WebGL shader-based mountain landscape with fbm noise, golden rim lighting, rolling fog
- All sans-serif typography (Aptos/Plus Jakarta Sans), weight 800 for headline
- Color span accents instead of italic emphasis
- Removed Fraunces serif completely
- Performance-optimized: IntersectionObserver mounting, low-power GPU preference

**Skills Used:** `/critique`, `/frontend-design`, `/delight`, `/polish`, `webgl-expert`

### ValueProps.tsx
**Status:** ✅ Redesigned with ascending graph layout + WebGL background

**Key Decisions:**
- Mathematical graph alignment (SVG curve + CSS grid with negative margins)
- Zero text overlap guarantee through decoupled layout
- WebGL mountain background matching hero palette
- Mauve-dominant nodes, gold gradient for summit node
- Staggered GSAP animations for line draw and node reveals

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
- **Modern Professional** (Apple, Google, dabafinance.com inspired)
- **Primary metaphor:** Strategic Summit + Capital Command Center

Interpretation:
- Clean, confident sans-serif typography throughout (NO Fraunces serif)
- Mauve (#461D4C) as the dominant UI color for structure, hierarchy, and interaction
- Gold (#ca942f) as strategic accent for conversion moments and dark sections
- Pill-shaped buttons and rounded-2xl cards as core component language
- WebGL atmospheric backgrounds for hero and value props sections
- Light-led overall with strategic dark moments (Services, CTA)

This means the public site should feel:
- elevated, clear, and confident through bold sans-serif typography
- rigorous, informed, and execution-oriented through structured layouts
- premium through restraint rather than ornament
- guided by perspective and control, not by editorial styling
- welcoming first (light surfaces), then authoritative (strategic dark sections)

## Approved Atmosphere

The public experience should be **predominantly light** with a **Modern Professional** aesthetic.

Target balance:
- **Light surfaces:** roughly `70–80%`
- **Dark surfaces:** roughly `20–30%`

Typography:
- **ALL headings:** Sans-serif (`var(--font-primary)`), weight 600-800
- **NO italic emphasis:** Use `<span style={{ color: 'var(--mauve)' }}>` for accents
- **Tight letter-spacing:** `-0.02em` to `-0.03em` for impact

Color hierarchy:
- **Mauve (#461D4C):** Dominant — headings, active states, badges, filters, links
- **Gold (#ca942f):** Accent — dark section CTAs, trust markers, primary buttons on dark

Component language:
- **Buttons:** `rounded-full` (pill shape)
- **Cards:** `rounded-2xl` with hover lift + purple border glow
- **Kickters:** `rounded-full` pill badges, NOT line+text
- **Dark sections:** Purple gradient (`#2a1435 → #1e1028 → #150e1c`)

Atmospheric rules:
- light mode is the default experience across most public pages
- dark mode is reserved for cinematic, high-authority, or conversion-heavy moments
- avoid treating black as the default brand background
- prefer ivory, white-smoke, cream, and very soft mauve-tinted surfaces for the main reading and browsing experience
- when dark is used, prefer purple-dominant gradients over flat black

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

The hero background uses a **WebGL atmospheric mountain** approach — code-generated using Three.js/React Three Fiber with custom GLSL shaders. This aligns with the Modern Professional direction and the Strategic Summit metaphor.

### Visual Description
An abstract mountain landscape constructed from procedural noise (fbm) generating three parallax ridge layers in mauve, purple, and deep plum. Golden rim lighting on peaks suggests sunlight. Rolling fog at the bottom using warped fbm noise creates depth. The color palette is sampled from the hero image: warm ivory sky, rich purple ridges, soft lavender mist, and gold highlights. Subtle film grain adds texture. The result is airy and welcoming, but still strategic, elevated, and quietly authoritative.

### Technical Implementation
**Stack:** React Three Fiber + Three.js + Custom GLSL Shaders

**Shader architecture:**
1. **Base Sky** — warm ivory to soft lavender gradient
2. **Golden Sun Glow** — top-right glow with exponential falloff
3. **Far Ridge** — muted purple with soft peaks
4. **Mid Ridge** — richer purple with gold rim lighting
5. **Near Ridge** — deep mauve, most prominent, strong gold rim
6. **Rolling Fog** — warped fbm noise at bottom
7. **Film Grain** — subtle noise overlay

**Animation approach:**
- Slow mountain drift (`uTime * 0.008`)
- Rolling fog animation (`uTime * 0.02`)
- Entrance: fade-in with GSAP
- `prefers-reduced-motion` disables shader animation

**Color palette integration:**
- Base: ivory white (`#f2eff3`) — 75% dominance
- Atmospheric depth: pale mauve-gray — 15%
- Warm accent: champagne gold (`#ca942f`) — 10%
- Deep anchor: dark mauve (`#421d4d`) — texture base

### Content Layout
- **Structure:** Single-column monumental typography, no side cards
- **Kicker:** Pill badge "Société de Gestion et d'Intermédiation — Dakar"
- **Headline:** "L'excellence au sommet du capital." — Sans-serif weight 800, color span accent on "sommet"
- **Subhead:** Clean paragraph, max-width 480px, `--night-60` color
- **CTAs:** Primary (mauve with hover fill) + Secondary (text with mauve underline)
- **Trust signals:** Inline text markers with mauve/gold dots

### Micro-interactions (Delight)
- Primary CTA: mauve fill slides up on hover, arrow translates right (200ms)
- Secondary CTA: mauve underline animates width on hover, arrow translates right (200ms)
- Trust markers: dot scales 125% on hover
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
- ❌ Fraunces serif typography
