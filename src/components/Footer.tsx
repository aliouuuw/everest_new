import { Link, useLocation } from '@tanstack/react-router';
import { FaFacebook, FaLinkedin, FaTiktok } from 'react-icons/fa';
import type { CSSProperties } from 'react';

type FooterLink = {
  label: string;
  to: string;
  search?: { frequency?: 'hebdomadaire' | 'mensuelle' | 'semestrielle' };
  hash?: string;
};

const societeLinks: Array<FooterLink> = [
  { label: 'À propos', to: '/about' },
  { label: 'Vision & gouvernance', to: '/about', hash: 'gouvernance' },
  { label: 'Conformité & agrément', to: '/about', hash: 'conformite' },
  { label: 'Contact', to: '/contact' },
];

const expertisesLinks: Array<FooterLink> = [
  { label: 'Marché Financier Régional (BRVM)', to: '/expertises', hash: 'marche-financier-regional' },
  { label: 'Marché des Titres Publics', to: '/expertises', hash: 'marche-titres-publics' },
  { label: 'Structuration & Ingénierie', to: '/expertises', hash: 'ingenierie-financiere' },
  { label: 'Private Office', to: '/expertises', hash: 'private-office' },
];

const marchesLinks: Array<FooterLink> = [
  { label: 'Actualités', to: '/actualites' },
  { label: 'Publications', to: '/publications' },
  { label: 'Abécédaire / FAQ', to: '/faq' },
];

const ressourcesLinks: Array<FooterLink> = [
  { label: 'Opportunités en cours', to: '/offres' },
  { label: 'BRVM / Marché régional', to: '/bourse' },
  { label: 'Outils investisseur', to: '/outils-investisseur' },
];

export const Footer = () => {
  const location = useLocation();

  const isInAdminorClientPortal =
    location.pathname.startsWith('/admin') || location.pathname.startsWith('/dashboard');

  if (isInAdminorClientPortal) {
    return null;
  }

  const linkStyle: CSSProperties = {
    transition: 'color 0.3s',
  };

  const headingStyle: CSSProperties = {
    marginBottom: '1.25rem',
  };

  const linkClass =
    'text-secondary-dark text-[0.8rem] font-light leading-loose hover:!text-[var(--jaune-or)]';

  const renderLinkList = (items: Array<FooterLink>) => (
    <ul>
      {items.map((l) => (
        <li key={`${l.to}-${l.label}`}>
          <Link
            to={l.to}
            {...(l.search ? { search: l.search } : {})}
            {...(l.hash ? { hash: l.hash } : {})}
            style={linkStyle}
            className={linkClass}
          >
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <footer className="relative bg-[var(--everest-green)]" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      {/* Subtle green ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          background: 'radial-gradient(ellipse 50% 30% at 50% 100%, var(--everest-green-10) 0%, transparent 70%)',
        }}
      />
      <div className="mx-auto max-w-6xl px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img src="/logo-everest.png" alt="Everest Finance" className="h-32 w-auto brightness-125" />
            </div>
            <p className="text-secondary-dark text-[0.85rem] font-light leading-relaxed">
              Des idées et des valeurs au service de vos ambitions.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="#"
                aria-label="LinkedIn"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300 hover:border-[var(--jaune-or)]/40 hover:text-[var(--jaune-or)]"
                style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.35)' }}
              >
                <FaLinkedin className="text-sm" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300 hover:border-[var(--jaune-or)]/40 hover:text-[var(--jaune-or)]"
                style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.35)' }}
              >
                <FaFacebook className="text-sm" />
              </a>
              <a
                href="#"
                aria-label="TikTok"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300 hover:border-[var(--jaune-or)]/40 hover:text-[var(--jaune-or)]"
                style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.35)' }}
              >
                <FaTiktok className="text-sm" />
              </a>
            </div>
          </div>

          {/* Marchés & opportunités (Insights) */}
          <div>
            <div className="kicker text-[var(--jaune-or)]" style={headingStyle}>Marchés &amp; opportunités</div>
            {renderLinkList(marchesLinks)}
          </div>

          {/* Expertises */}
          <div>
            <div className="kicker text-[var(--jaune-or)]" style={headingStyle}>Expertises</div>
            {renderLinkList(expertisesLinks)}
          </div>

          {/* Société */}
          <div>
            <div className="kicker text-[var(--jaune-or)]" style={headingStyle}>Société</div>
            {renderLinkList(societeLinks)}
          </div>

          {/* Autres & Contact — one column, two groups */}
          <div className="space-y-10">
            <div>
              <div className="kicker text-[var(--jaune-or)]" style={headingStyle}>Autres</div>
              {renderLinkList(ressourcesLinks)}
            </div>
            <div>
              <div className="kicker text-[var(--jaune-or)]" style={headingStyle}>Contact</div>
              <ul className="space-y-3 text-secondary-dark text-[0.8rem] font-light leading-relaxed">
                <li>
                  18 Boulevard de la République,<br />Dakar, Sénégal - BP: 11659-13000
                </li>
                <li>
                  <a href="mailto:contact@everestfin.com" style={linkStyle} className="hover:!text-[var(--jaune-or)]">
                    contact@everestfin.com
                  </a>
                </li>
                <li className="flex flex-col ">
                  <a href="tel:+221338228700" style={linkStyle} className="hover:!text-[var(--jaune-or)]">
                    +221 33 822 87 00
                  </a>
                  <a href="tel:+221338228701" style={linkStyle} className="hover:!text-[var(--jaune-or)]">
                    +221 33 822 87 01
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-[var(--pure-white)]/5 text-secondary-dark text-[0.7rem] font-light"
        >
          <span className="opacity-70">
            &copy; {new Date().getFullYear()} Everest Finance SGI — Numéro d’agrément n° SGI /DA/2016/60
          </span>
          <span>
            Termes et conditions.
          </span>
          <span>
            Politique de Confidentialite
          </span>
          <span className="opacity-60">
            Tous droits réservés
          </span>
        </div>
      </div>
    </footer>
  );
};
