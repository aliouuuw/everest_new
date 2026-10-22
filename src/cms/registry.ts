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
 *  - Supports `type: "text"`, `type: "richtext"`, and `type: "image"`.
 */

import { HOME_TEXT, type HomeTextId } from "../content/home";
import { SOCIETE_TEXT, type SocieteTextId } from "../content/societe";
import { EXPERTISES_TEXT, type ExpertisesTextId } from "../content/expertises";
import { ACTUALITES_TEXT, ANALYSES_TEXT, type ActualitesTextId, type AnalysesTextId } from "../content/analyses";
import { CONTACT_TEXT, OPPORTUNITES_TEXT, SAMA_NAFFA_TEXT, type ContactTextId, type OpportunitesTextId, type SamaNaffaTextId } from "../content/relation";

export type RegistryFieldType = "text" | "richtext" | "image";

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
  | "expertises"
  | "contact"
  | "faq"
  | "publications"
  | "actualites"
  | "opportunites"
  | "sama-naffa";

export const registry: Record<PageKey, ReadonlyArray<RegistryEntry>> = {
  home: [
    // Referential V2.1 §1: one entry per text in src/content/home.ts
    ...(Object.keys(HOME_TEXT) as Array<HomeTextId>).map((id) => ({
      id,
      label: id.slice('home.'.length),
      section: id.split('.')[1],
      type: "text" as const,
    })),
    // Reference logos: shown in La société §2.7 once Legal confirms (not on the home page)
    { id: "home.trust.partners", label: "Partenaires — logos", section: "Trust Strip", type: "text" },
  ],
  about: [
    // Referential V2.1 §2: one entry per text in src/content/societe.ts
    ...(Object.keys(SOCIETE_TEXT) as Array<SocieteTextId>).map((id) => ({
      id,
      label: id.slice('about.'.length),
      section: id.split('.')[1],
      type: "text" as const,
    })),
  ],
  services: [
    // Hero
    { id: "services.hero.badge", label: "Hero — badge", section: "Hero", type: "text" },
    { id: "services.hero.title", label: "Hero — titre", section: "Hero", type: "text" },
    { id: "services.hero.subtitle", label: "Hero — sous-titre", section: "Hero", type: "text" },
    { id: "services.hero.ctaLabel", label: "Hero — label CTA", section: "Hero", type: "text" },
    // Services Overview
    { id: "services.overview.badge", label: "Approches — badge", section: "Aperçu services", type: "text" },
    { id: "services.overview.title", label: "Approches — titre", section: "Aperçu services", type: "text" },
    { id: "services.overview.intro", label: "Approches — intro", section: "Aperçu services", type: "text" },
    // Gestion Libre
    { id: "services.libre.title", label: "Gestion Libre — titre", section: "Gestion Libre", type: "text" },
    { id: "services.libre.description", label: "Gestion Libre — description", section: "Gestion Libre", type: "richtext" },
    { id: "services.libre.fees", label: "Gestion Libre — frais", section: "Gestion Libre", type: "text" },
    // Gestion Assistée
    { id: "services.assistee.title", label: "Gestion Assistée — titre", section: "Gestion Assistée", type: "text" },
    { id: "services.assistee.description", label: "Gestion Assistée — description", section: "Gestion Assistée", type: "richtext" },
    { id: "services.assistee.fees", label: "Gestion Assistée — frais", section: "Gestion Assistée", type: "text" },
    // Gestion Sous-Mandat
    { id: "services.mandat.title", label: "Gestion Sous-Mandat — titre", section: "Gestion Sous-Mandat", type: "text" },
    { id: "services.mandat.description", label: "Gestion Sous-Mandat — description", section: "Gestion Sous-Mandat", type: "richtext" },
    { id: "services.mandat.fees", label: "Gestion Sous-Mandat — frais", section: "Gestion Sous-Mandat", type: "text" },
  ],
  offres: [
    // Hero
    { id: "offres.hero.badge", label: "Hero — badge", section: "Hero", type: "text" },
    { id: "offres.hero.title", label: "Hero — titre", section: "Hero", type: "text" },
    { id: "offres.hero.subtitle", label: "Hero — sous-titre", section: "Hero", type: "text" },
    { id: "offres.hero.ctaLabel", label: "Hero — label CTA", section: "Hero", type: "text" },
    // Services Overview
    { id: "offres.overview.badge", label: "Approches — badge", section: "Aperçu offres", type: "text" },
    { id: "offres.overview.title", label: "Approches — titre", section: "Aperçu offres", type: "text" },
    { id: "offres.overview.intro", label: "Approches — intro", section: "Aperçu offres", type: "text" },
    // Gestion Libre
    { id: "offres.libre.title", label: "Gestion Libre — titre", section: "Gestion Libre", type: "text" },
    { id: "offres.libre.description", label: "Gestion Libre — description", section: "Gestion Libre", type: "richtext" },
    { id: "offres.libre.fees", label: "Gestion Libre — frais", section: "Gestion Libre", type: "text" },
    // Gestion Assistée
    { id: "offres.assistee.title", label: "Gestion Assistée — titre", section: "Gestion Assistée", type: "text" },
    { id: "offres.assistee.description", label: "Gestion Assistée — description", section: "Gestion Assistée", type: "richtext" },
    { id: "offres.assistee.fees", label: "Gestion Assistée — frais", section: "Gestion Assistée", type: "text" },
    // Gestion Sous-Mandat
    { id: "offres.mandat.title", label: "Gestion Sous-Mandat — titre", section: "Gestion Sous-Mandat", type: "text" },
    { id: "offres.mandat.description", label: "Gestion Sous-Mandat — description", section: "Gestion Sous-Mandat", type: "richtext" },
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
    { id: "capital-markets.hero.background", label: "Hero — image de fond", section: "Hero", type: "image" },
    { id: "capital-markets.hero.headline", label: "Hero — titre principal", section: "Hero", type: "text" },
    { id: "capital-markets.hero.subtitle", label: "Hero — sous-titre", section: "Hero", type: "text" },
    // Presentation
    { id: "capital-markets.presentation", label: "Présentation", section: "Présentation", type: "richtext" },
    // CTA
    { id: "capital-markets.cta.text", label: "CTA — texte principal", section: "CTA", type: "text" },
    { id: "capital-markets.cta.subtitle", label: "CTA — sous-texte", section: "CTA", type: "text" },
  ],
  "investment-banking": [
    // Hero
    { id: "investment-banking.hero.background", label: "Hero — image de fond", section: "Hero", type: "image" },
    { id: "investment-banking.hero.headline", label: "Hero — titre principal", section: "Hero", type: "text" },
    { id: "investment-banking.hero.subtitle", label: "Hero — sous-titre", section: "Hero", type: "text" },
    // Presentation
    { id: "investment-banking.presentation", label: "Présentation", section: "Présentation", type: "richtext" },
    // CTA
    { id: "investment-banking.cta.text", label: "CTA — texte principal", section: "CTA", type: "text" },
    { id: "investment-banking.cta.subtitle", label: "CTA — sous-texte", section: "CTA", type: "text" },
  ],
  mandate: [
    // Hero
    { id: "mandate.hero.background", label: "Hero — image de fond", section: "Hero", type: "image" },
    { id: "mandate.hero.headline", label: "Hero — titre principal", section: "Hero", type: "text" },
    { id: "mandate.hero.subtitle", label: "Hero — sous-titre", section: "Hero", type: "text" },
    // Presentation
    { id: "mandate.presentation", label: "Présentation", section: "Présentation", type: "richtext" },
    // CTA
    { id: "mandate.cta.text", label: "CTA — texte principal", section: "CTA", type: "text" },
    { id: "mandate.cta.subtitle", label: "CTA — sous-texte", section: "CTA", type: "text" },
  ],
  expertises: [
    // Referential V2.1 §3: one entry per text in src/content/expertises.ts
    ...(Object.keys(EXPERTISES_TEXT) as Array<ExpertisesTextId>).map((id) => ({
      id,
      label: id.slice('expertises.'.length),
      section: id.split('.')[1],
      type: "text" as const,
    })),
  ],
  contact: [
    // Referential V2.1 §8: one entry per text in src/content/relation.ts
    ...(Object.keys(CONTACT_TEXT) as Array<ContactTextId>).map((id) => ({
      id,
      label: id.slice('contact.'.length),
      section: "Référentiel",
      type: "text" as const,
    })),
    // Form (functional labels, not referential copy)
    { id: "contact.form.privacy", label: "Formulaire — confidentialité", section: "Formulaire", type: "richtext" },
    { id: "contact.form.submit", label: "Formulaire — bouton", section: "Formulaire", type: "text" },
  ],
  faq: [
    // Hero
    { id: "faq.hero.background", label: "Hero — image de fond", section: "Hero", type: "image" },
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
    // Referential V2.1: one entry per text in src/content/analyses.ts
    ...(Object.keys(ANALYSES_TEXT) as Array<AnalysesTextId>).map((id) => ({
      id,
      label: id.slice('publications.'.length),
      section: "Référentiel",
      type: "text" as const,
    })),
  ],
  actualites: [
    // Referential V2.1: one entry per text in src/content/analyses.ts
    ...(Object.keys(ACTUALITES_TEXT) as Array<ActualitesTextId>).map((id) => ({
      id,
      label: id.slice('actualites.'.length),
      section: "Référentiel",
      type: "text" as const,
    })),
  ],
  "opportunites": [
    // Referential V2.1: one entry per text in src/content/relation.ts
    ...(Object.keys(OPPORTUNITES_TEXT) as Array<OpportunitesTextId>).map((id) => ({
      id,
      label: id.slice('opportunites.'.length),
      section: "Référentiel",
      type: "text" as const,
    })),
  ],
  "sama-naffa": [
    // Referential V2.1: one entry per text in src/content/relation.ts
    ...(Object.keys(SAMA_NAFFA_TEXT) as Array<SamaNaffaTextId>).map((id) => ({
      id,
      label: id.slice('sama-naffa.'.length),
      section: "Référentiel",
      type: "text" as const,
    })),
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
  "expertises",
  "contact",
  "faq",
  "publications",
  "actualites",
  "opportunites",
  "sama-naffa",
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
  expertises: "Expertises",
  contact: "Contact",
  faq: "FAQ",
  publications: "Publications",
  actualites: "Actualités",
  opportunites: "Opportunités",
  "sama-naffa": "Sama Naffa",
};

/** Public path to open a preview of the page (marketing site). */
export const PAGE_KEY_PREVIEW_PATH: Record<PageKey, string> = {
  home: "/",
  about: "/la-societe",
  services: "/offres",
  offres: "/offres",
  bourse: "/bourse",
  "capital-markets": "/marche-capitaux",
  "investment-banking": "/ingenieurie-financiere",
  mandate: "/gestion-sous-mandat",
  expertises: "/expertises",
  contact: "/contact",
  faq: "/faq",
  publications: "/analyses",
  actualites: "/actualites",
  opportunites: "/opportunites",
  "sama-naffa": "/sama-naffa",
};
