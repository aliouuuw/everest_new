/** Referential V2.1 II.1: one taxonomy, same labels and order in the menu and the footer. */

export type NavItem = {
  label: string;
  to: string;
  hash?: string;
  children?: Array<NavItem>;
};

export const SITE_NAV: Array<NavItem> = [
  { label: 'Accueil', to: '/' },
  { label: 'La société', to: '/la-societe' },
  {
    label: 'Expertises',
    to: '/expertises',
    children: [
      { label: 'Marché des Titres Publics', to: '/expertises/marche-titres-publics' },
      { label: 'Marché Financier Régional (BRVM)', to: '/expertises/marche-financier-regional' },
      { label: 'Structuration & Ingénierie Financière', to: '/expertises/ingenierie-financiere' },
      { label: 'Private Office', to: '/expertises/private-office' },
    ],
  },
  { label: 'Analyses & Publications', to: '/analyses' },
  { label: 'Actualités', to: '/actualites' },
  { label: 'Opportunités', to: '/opportunites' },
  { label: 'Sama Naffa', to: '/sama-naffa' },
  { label: 'Contact / Devenir client', to: '/contact' },
];
