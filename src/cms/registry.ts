/**
 * Light CMS editable-content registry.
 *
 * Single source of truth for editable blocks on marketing pages. Used by:
 *  - The edit panel to render the list of controls for the current page.
 *  - The Convex `siteContent.upsert` / `remove` mutations to enforce an
 *    allowlist of mutable content IDs (unknown IDs are rejected server-side).
 *
 * Conventions:
 *  - `id` is `pageKey.section.field` (e.g. `home.hero.title`). Stable across
 *    refactors; never rename casually.
 *  - v1 supports only `type: "text"`. Rich text / media are phase 2.
 */

export type RegistryFieldType = "text";

export interface RegistryEntry {
  id: string;
  label: string;
  section: string;
  type: RegistryFieldType;
}

export type PageKey =
  | "home"
  | "about"
  | "services"
  | "offres"
  | "bourse"
  | "capital-markets"
  | "investment-banking"
  | "mandate"
  | "faq"
  | "publications"
  | "actualites";

export const registry: Record<PageKey, ReadonlyArray<RegistryEntry>> = {
  home: [
    // Hero
    { id: "home.hero.title", label: "Hero title (line 1)", section: "Hero", type: "text" },
    { id: "home.hero.titleAccent", label: "Hero title (line 2, gold)", section: "Hero", type: "text" },
    { id: "home.hero.subtitle", label: "Hero subtitle", section: "Hero", type: "text" },
    { id: "home.hero.ctaPrimary", label: "Hero primary CTA label", section: "Hero", type: "text" },
    { id: "home.hero.ctaSecondary", label: "Hero secondary CTA label", section: "Hero", type: "text" },

    // Positioning
    { id: "home.positioning.badge", label: "Badge", section: "Positioning", type: "text" },
    { id: "home.positioning.title", label: "Title (line 1)", section: "Positioning", type: "text" },
    { id: "home.positioning.titleAccent", label: "Title (line 2, gold)", section: "Positioning", type: "text" },
    { id: "home.positioning.intro", label: "Intro paragraph", section: "Positioning", type: "text" },

    // Value Props
    { id: "home.valueProps.badge", label: "Badge", section: "Value Props", type: "text" },
    { id: "home.valueProps.title", label: "Title (line 1)", section: "Value Props", type: "text" },
    { id: "home.valueProps.titleAccent", label: "Title (line 2, gold)", section: "Value Props", type: "text" },
    { id: "home.valueProps.intro", label: "Intro paragraph", section: "Value Props", type: "text" },

    // Capacity
    { id: "home.capacity.badge", label: "Badge", section: "Capacity", type: "text" },
    { id: "home.capacity.titleLead", label: "Title lead word", section: "Capacity", type: "text" },
    { id: "home.capacity.titleAccent", label: "Title accent word (gold)", section: "Capacity", type: "text" },
    { id: "home.capacity.titleSuffix", label: "Title suffix (second line)", section: "Capacity", type: "text" },
    { id: "home.capacity.intro", label: "Intro paragraph", section: "Capacity", type: "text" },

    // Services
    { id: "home.services.badge", label: "Badge", section: "Services", type: "text" },
    { id: "home.services.title", label: "Title (line 1)", section: "Services", type: "text" },
    { id: "home.services.titleAccent", label: "Title accent (gold)", section: "Services", type: "text" },
    { id: "home.services.intro", label: "Intro paragraph", section: "Services", type: "text" },

    // Insights (Actualités + Publications on home)
    { id: "home.insights.title", label: "Section title", section: "Insights", type: "text" },
    { id: "home.insights.subtext", label: "Section intro", section: "Insights", type: "text" },
    { id: "home.insights.actualitesKicker", label: "Actualités — kicker", section: "Insights", type: "text" },
    { id: "home.insights.actualitesLink", label: "Actualités — voir tout", section: "Insights", type: "text" },
    { id: "home.insights.publicationsKicker", label: "Publications — kicker", section: "Insights", type: "text" },
    { id: "home.insights.publicationsLink", label: "Publications — voir tout", section: "Insights", type: "text" },

    // Markets & Opportunities
    { id: "home.markets.badge", label: "Badge", section: "Markets & Opportunities", type: "text" },
    { id: "home.markets.title", label: "Title (line 1)", section: "Markets & Opportunities", type: "text" },
    { id: "home.markets.titleAccent", label: "Title accent (gold)", section: "Markets & Opportunities", type: "text" },
    { id: "home.markets.intro", label: "Intro paragraph", section: "Markets & Opportunities", type: "text" },
    { id: "home.markets.linkLabel", label: "Link: see all news", section: "Markets & Opportunities", type: "text" },

    // Contact CTA block
    { id: "home.cta.badge", label: "Badge", section: "Contact CTA", type: "text" },
    { id: "home.cta.title", label: "Title (line 1)", section: "Contact CTA", type: "text" },
    { id: "home.cta.titleAccent", label: "Title accent (gold)", section: "Contact CTA", type: "text" },
    { id: "home.cta.intro", label: "Intro paragraph", section: "Contact CTA", type: "text" },
    { id: "home.cta.primary", label: "Primary button label", section: "Contact CTA", type: "text" },
    { id: "home.cta.secondary", label: "Secondary button label", section: "Contact CTA", type: "text" },

    // FAQ
    { id: "home.faq.badge", label: "Badge", section: "FAQ", type: "text" },
    { id: "home.faq.title", label: "Title (line 1)", section: "FAQ", type: "text" },
    { id: "home.faq.titleSub", label: "Title (line 2)", section: "FAQ", type: "text" },
    { id: "home.faq.intro", label: "Intro paragraph", section: "FAQ", type: "text" },
    { id: "home.faq.linkLabel", label: "Link: see all questions", section: "FAQ", type: "text" },
  ],
  about: [],
  services: [],
  offres: [],
  bourse: [],
  "capital-markets": [],
  "investment-banking": [],
  mandate: [],
  faq: [],
  publications: [],
  actualites: [],
};

/** Flat set of every known content ID across all pages. */
export const registryIds: ReadonlySet<string> = new Set(
  Object.values(registry).flatMap((entries) => entries.map((e) => e.id)),
);

/** Lookup a registry entry by content ID (returns undefined if unknown). */
export function getRegistryEntry(contentId: string): RegistryEntry | undefined {
  for (const entries of Object.values(registry)) {
    const hit = entries.find((e) => e.id === contentId);
    if (hit) return hit;
  }
  return undefined;
}

/** Whether the given ID is in the registry allowlist. */
export function isKnownContentId(contentId: string): boolean {
  return registryIds.has(contentId);
}

/** Max length for a single text value (characters). */
export const MAX_VALUE_LENGTH = 5000;

/** Stable order for admin page picker and tooling. */
export const PAGE_KEYS: ReadonlyArray<PageKey> = [
  "home",
  "about",
  "services",
  "offres",
  "bourse",
  "capital-markets",
  "investment-banking",
  "mandate",
  "faq",
  "publications",
  "actualites",
];

/** Human-readable labels for the admin content editor. */
export const PAGE_KEY_LABELS: Record<PageKey, string> = {
  home: "Accueil",
  about: "À propos",
  services: "Services",
  offres: "Offres",
  bourse: "Bourse (BRVM)",
  "capital-markets": "Marché des titres publics",
  "investment-banking": "Ingénierie financière",
  mandate: "Gestion sous mandat",
  faq: "FAQ",
  publications: "Publications",
  actualites: "Actualités",
};

/** Public path to open a preview of the page (marketing site). */
export const PAGE_KEY_PREVIEW_PATH: Record<PageKey, string> = {
  home: "/",
  about: "/about",
  services: "/services",
  offres: "/offres",
  bourse: "/bourse",
  "capital-markets": "/marche-capitaux",
  "investment-banking": "/ingenieurie-financiere",
  mandate: "/gestion-sous-mandat",
  faq: "/faq",
  publications: "/publications",
  actualites: "/actualites",
};
