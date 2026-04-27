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
  about: [
    // Hero
    { id: "about.hero.badge", label: "Hero — badge", section: "Hero", type: "text" },
    { id: "about.hero.title", label: "Hero — titre", section: "Hero", type: "text" },
    { id: "about.hero.titleAccent", label: "Hero — accent titre (gold)", section: "Hero", type: "text" },
    { id: "about.hero.subtitle", label: "Hero — sous-titre", section: "Hero", type: "text" },
    { id: "about.hero.ctaLabel", label: "Hero — label CTA", section: "Hero", type: "text" },
    // Mission & Vision
    { id: "about.mission.badge", label: "Mission — badge", section: "Mission & Vision", type: "text" },
    { id: "about.mission.sectionTitle", label: "Mission — titre de section", section: "Mission & Vision", type: "text" },
    { id: "about.mission.missionTitle", label: "Notre mission — titre", section: "Mission & Vision", type: "text" },
    { id: "about.mission.missionBody", label: "Notre mission — corps", section: "Mission & Vision", type: "text" },
    { id: "about.mission.visionTitle", label: "Notre vision — titre", section: "Mission & Vision", type: "text" },
    { id: "about.mission.visionBody", label: "Notre vision — corps", section: "Mission & Vision", type: "text" },
    // Philosophie
    { id: "about.philosophie.badge", label: "Philosophie — badge", section: "Philosophie", type: "text" },
    { id: "about.philosophie.title", label: "Philosophie — titre", section: "Philosophie", type: "text" },
    // Histoire
    { id: "about.histoire.badge", label: "Histoire — badge", section: "Histoire", type: "text" },
    { id: "about.histoire.title", label: "Histoire — titre", section: "Histoire", type: "text" },
    // Équipe
    { id: "about.equipe.badge", label: "Équipe — badge", section: "Équipe", type: "text" },
    { id: "about.equipe.title", label: "Équipe — titre", section: "Équipe", type: "text" },
    // Conformité
    { id: "about.conformite.badge", label: "Conformité — badge", section: "Conformité", type: "text" },
    { id: "about.conformite.title", label: "Conformité — titre", section: "Conformité", type: "text" },
  ],
  services: [
    // Hero
    { id: "services.hero.badge", label: "Hero — badge", section: "Hero", type: "text" },
    { id: "services.hero.title", label: "Hero — titre (line 1)", section: "Hero", type: "text" },
    { id: "services.hero.titleAccent", label: "Hero — accent titre (gold)", section: "Hero", type: "text" },
    { id: "services.hero.subtitle", label: "Hero — sous-titre", section: "Hero", type: "text" },
    { id: "services.hero.ctaLabel", label: "Hero — label CTA", section: "Hero", type: "text" },
    // Services Overview
    { id: "services.overview.badge", label: "Approches — badge", section: "Aperçu services", type: "text" },
    { id: "services.overview.title", label: "Approches — titre", section: "Aperçu services", type: "text" },
    { id: "services.overview.intro", label: "Approches — intro", section: "Aperçu services", type: "text" },
    // Gestion Libre
    { id: "services.libre.title", label: "Gestion Libre — titre", section: "Gestion Libre", type: "text" },
    { id: "services.libre.description", label: "Gestion Libre — description", section: "Gestion Libre", type: "text" },
    { id: "services.libre.fees", label: "Gestion Libre — frais", section: "Gestion Libre", type: "text" },
    // Gestion Assistée
    { id: "services.assistee.title", label: "Gestion Assistée — titre", section: "Gestion Assistée", type: "text" },
    { id: "services.assistee.description", label: "Gestion Assistée — description", section: "Gestion Assistée", type: "text" },
    { id: "services.assistee.fees", label: "Gestion Assistée — frais", section: "Gestion Assistée", type: "text" },
    // Gestion Sous-Mandat
    { id: "services.mandat.title", label: "Gestion Sous-Mandat — titre", section: "Gestion Sous-Mandat", type: "text" },
    { id: "services.mandat.description", label: "Gestion Sous-Mandat — description", section: "Gestion Sous-Mandat", type: "text" },
    { id: "services.mandat.fees", label: "Gestion Sous-Mandat — frais", section: "Gestion Sous-Mandat", type: "text" },
  ],
  offres: [
    // Hero
    { id: "offres.hero.badge", label: "Hero — badge", section: "Hero", type: "text" },
    { id: "offres.hero.title", label: "Hero — titre (line 1)", section: "Hero", type: "text" },
    { id: "offres.hero.titleAccent", label: "Hero — accent titre (gold)", section: "Hero", type: "text" },
    { id: "offres.hero.subtitle", label: "Hero — sous-titre", section: "Hero", type: "text" },
    { id: "offres.hero.ctaLabel", label: "Hero — label CTA", section: "Hero", type: "text" },
    // Services Overview
    { id: "offres.overview.badge", label: "Approches — badge", section: "Aperçu offres", type: "text" },
    { id: "offres.overview.title", label: "Approches — titre", section: "Aperçu offres", type: "text" },
    { id: "offres.overview.intro", label: "Approches — intro", section: "Aperçu offres", type: "text" },
    // Gestion Libre
    { id: "offres.libre.title", label: "Gestion Libre — titre", section: "Gestion Libre", type: "text" },
    { id: "offres.libre.description", label: "Gestion Libre — description", section: "Gestion Libre", type: "text" },
    { id: "offres.libre.fees", label: "Gestion Libre — frais", section: "Gestion Libre", type: "text" },
    // Gestion Assistée
    { id: "offres.assistee.title", label: "Gestion Assistée — titre", section: "Gestion Assistée", type: "text" },
    { id: "offres.assistee.description", label: "Gestion Assistée — description", section: "Gestion Assistée", type: "text" },
    { id: "offres.assistee.fees", label: "Gestion Assistée — frais", section: "Gestion Assistée", type: "text" },
    // Gestion Sous-Mandat
    { id: "offres.mandat.title", label: "Gestion Sous-Mandat — titre", section: "Gestion Sous-Mandat", type: "text" },
    { id: "offres.mandat.description", label: "Gestion Sous-Mandat — description", section: "Gestion Sous-Mandat", type: "text" },
    { id: "offres.mandat.fees", label: "Gestion Sous-Mandat — frais", section: "Gestion Sous-Mandat", type: "text" },
  ],
  bourse: [
    // Hero
    { id: "bourse.hero.title", label: "Hero — titre", section: "Hero", type: "text" },
    { id: "bourse.hero.subtitle", label: "Hero — sous-titre", section: "Hero", type: "text" },
    // Section headers
    { id: "bourse.assets.title", label: "Section cours — titre", section: "Cours BRVM", type: "text" },
    { id: "bourse.assets.subtitle", label: "Section cours — sous-titre", section: "Cours BRVM", type: "text" },
  ],
  "capital-markets": [
    // Hero
    { id: "capital-markets.hero.headline", label: "Hero — titre principal", section: "Hero", type: "text" },
    { id: "capital-markets.hero.subtitle", label: "Hero — sous-titre", section: "Hero", type: "text" },
    // Presentation
    { id: "capital-markets.presentation", label: "Présentation", section: "Présentation", type: "text" },
    // CTA
    { id: "capital-markets.cta.text", label: "CTA — texte principal", section: "CTA", type: "text" },
    { id: "capital-markets.cta.subtitle", label: "CTA — sous-texte", section: "CTA", type: "text" },
  ],
  "investment-banking": [
    // Hero
    { id: "investment-banking.hero.headline", label: "Hero — titre principal", section: "Hero", type: "text" },
    { id: "investment-banking.hero.subtitle", label: "Hero — sous-titre", section: "Hero", type: "text" },
    // Presentation
    { id: "investment-banking.presentation", label: "Présentation", section: "Présentation", type: "text" },
    // CTA
    { id: "investment-banking.cta.text", label: "CTA — texte principal", section: "CTA", type: "text" },
    { id: "investment-banking.cta.subtitle", label: "CTA — sous-texte", section: "CTA", type: "text" },
  ],
  mandate: [
    // Hero
    { id: "mandate.hero.headline", label: "Hero — titre principal", section: "Hero", type: "text" },
    { id: "mandate.hero.subtitle", label: "Hero — sous-titre", section: "Hero", type: "text" },
    // Presentation
    { id: "mandate.presentation", label: "Présentation", section: "Présentation", type: "text" },
    // CTA
    { id: "mandate.cta.text", label: "CTA — texte principal", section: "CTA", type: "text" },
    { id: "mandate.cta.subtitle", label: "CTA — sous-texte", section: "CTA", type: "text" },
  ],
  faq: [
    // Hero
    { id: "faq.hero.badge", label: "Hero — badge", section: "Hero", type: "text" },
    { id: "faq.hero.title", label: "Hero — titre", section: "Hero", type: "text" },
    { id: "faq.hero.subtitle", label: "Hero — sous-titre", section: "Hero", type: "text" },
    { id: "faq.hero.ctaLabel", label: "Hero — label CTA", section: "Hero", type: "text" },
    // Q&A section
    { id: "faq.qa.badge", label: "FAQ — badge", section: "FAQ", type: "text" },
    { id: "faq.qa.title", label: "FAQ — titre de section", section: "FAQ", type: "text" },
    // Glossary
    { id: "faq.glossary.badge", label: "Abécédaire — badge", section: "Abécédaire", type: "text" },
    { id: "faq.glossary.title", label: "Abécédaire — titre", section: "Abécédaire", type: "text" },
    // CTA
    { id: "faq.cta.title", label: "CTA — titre", section: "CTA", type: "text" },
    { id: "faq.cta.subtitle", label: "CTA — sous-titre", section: "CTA", type: "text" },
    { id: "faq.cta.ctaLabel", label: "CTA — label bouton", section: "CTA", type: "text" },
  ],
  publications: [
    // Hero
    { id: "publications.hero.badge", label: "Hero — badge", section: "Hero", type: "text" },
    { id: "publications.hero.title", label: "Hero — titre (line 1)", section: "Hero", type: "text" },
    { id: "publications.hero.titleAccent", label: "Hero — accent titre (gold)", section: "Hero", type: "text" },
    { id: "publications.hero.subtitle", label: "Hero — sous-titre", section: "Hero", type: "text" },
  ],
  actualites: [
    // Hero
    { id: "actualites.hero.badge", label: "Hero — badge", section: "Hero", type: "text" },
    { id: "actualites.hero.title", label: "Hero — titre", section: "Hero", type: "text" },
    { id: "actualites.hero.subtitle", label: "Hero — sous-titre", section: "Hero", type: "text" },
  ],
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
