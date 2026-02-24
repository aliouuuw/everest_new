---
name: frontend-design
description: Design and implement production-grade, highly distinctive frontend interfaces for bocalERP. This skill is used to build scalable UI systems, domain modules, dashboards, editors, and applications with strong visual identity, excellent DX, and zero generic “AI aesthetic”.
license: Complete terms in LICENSE.txt
---

## Purpose

This skill governs how frontend interfaces are **designed, implemented, and evolved** in bocalERP.

It prioritizes:
- **Strong aesthetic intent** (no generic UI)
- **Production-grade code** (maintainable, testable, composable)
- **Excellent Developer Experience (DX)** for both humans and AI agents
- **Scalability across domains** (accounting, HR, inventory, payroll, CRM, CMS, analytics, form builders, embeds, etc.)

Use this skill whenever creating:
- UI components
- Pages or layouts
- Dashboards
- Editors (forms, tables, content, analytics)
- Entire frontend applications or modules

---

## Core Principles

### 1. Intentional Design, Not Decoration

Every interface must have:
- A **clear purpose**
- A **strong visual and interaction identity**
- A **reasoned aesthetic direction**

Avoid decorative UI that does not serve clarity, hierarchy, or user intent.

---

### 2. Bold Aesthetic Commitment

Before writing code, **commit to a clear design direction**.

Choose ONE dominant aesthetic axis:
- Brutally minimal
- Industrial / utilitarian
- Editorial / magazine
- Luxury / refined
- Retro-futuristic
- Brutalist / raw
- Organic / natural
- Maximalist systems
- Data-dense professional tools
- Calm enterprise clarity

⚠️ Mixing styles without intent is forbidden.

---

### 3. Domain-Aware UI Design

bocalERP is **modular and cross-domain**. UI must:
- Scale across business domains without redesigning from scratch
- Support dense workflows (tables, forms, batch actions)
- Handle power-user scenarios gracefully
- Allow visual variation between modules while sharing primitives

Think in **design primitives and patterns**, not pages.

---

## Design Thinking Checklist (MANDATORY)

Before implementation, explicitly reason about:

- **Purpose**
  - What job does this interface do?
  - Is it exploratory, operational, administrative, or analytical?

- **Audience**
  - Expert users? Casual users? Internal staff?
  - Frequency of use (daily vs occasional)

- **Tone**
  - Calm, authoritative, energetic, precise, expressive, austere?

- **Differentiation**
  - What will a user remember after using this UI once?
  - What makes this feel *designed*, not assembled?

Document these mentally or inline in comments if helpful for agents.

---

## Implementation Rules

### Code Quality

All frontend code must be:
- **Production-grade**
- **Composable** (small, reusable primitives)
- **Predictable** (explicit props, no magic)
- **Test-friendly**
- **Readable by AI agents**

Avoid clever abstractions that reduce clarity.

---

### Frameworks & Stack

Applies to:
- React / Next.js
- SolidJS
- Vanilla HTML/CSS when appropriate

Prefer:
- Explicit composition over inheritance
- Functional components
- Clear separation of layout, logic, and styling
- Design tokens (CSS variables)

---

## Frontend Aesthetics Guidelines

### Typography
- Choose **characterful fonts**
- Avoid default system fonts unless explicitly justified
- Pair a distinctive display font with a highly readable body font
- Typography hierarchy must be obvious without color

🚫 Avoid:
- Inter
- Roboto
- Arial
- Overused “AI SaaS fonts”
- Repeating the same font choices across unrelated modules

---

### Color & Theme
- Commit to a **strong palette**
- Use CSS variables for all colors
- Prefer dominance + accent over evenly-distributed palettes
- ERP ≠ boring: seriousness comes from clarity, not grayscale

---

### Layout & Composition
- Embrace:
  - Asymmetry
  - Dense information when appropriate
  - Grid-breaking moments
  - Intentional negative space
- Tables, forms, and dashboards should feel **engineered**, not generic

---

### Motion & Interaction
- Motion is **meaningful**, not decorative
- Use:
  - Entry hierarchy
  - Hover affordances
  - Focus and selection clarity
- Prefer:
  - CSS animations where possible
  - Motion libraries when complexity demands it

One strong animation > many weak ones.

---

### Visual Texture & Depth
Use when appropriate:
- Noise/grain
- Subtle gradients
- Layered shadows
- Borders with intent
- Custom cursors or indicators

Avoid flat, sterile UI unless that is the explicit design goal.

---

## Anti-Patterns (STRICTLY FORBIDDEN)

- Generic SaaS dashboards
- Purple-on-white gradients
- Cookie-cutter component libraries without customization
- “Looks like every startup”
- Overused font + rounded card + soft shadow combos
- AI-generated UI that lacks context-specific character

If it looks familiar at first glance, redesign it.

---

## Scaling for Humans and AI (AIX)

Frontend code must be:
- **Easy to extend by AI agents**
- **Easy to reason about in isolation**
- **Composable into new modules without refactoring**

Favor:
- Explicit naming
- Flat structures
- Clear intent in code
- Comments where intent is non-obvious

Design systems should feel like **tools**, not constraints.

---

## Complexity Matching Rule

- Maximalist vision → rich code, layered interactions
- Minimalist vision → restraint, precision, spacing discipline

Never mismatch visual ambition and implementation depth.

---

## Final Reminder

This skill exists to ensure bocalERP frontend work:
- Feels **crafted**, not generated
- Scales across **domains and teams**
- Enables **agentic development**
- Stays beautiful under complexity

Design with conviction. Implement with discipline.
