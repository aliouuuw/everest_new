import { Link, useLocation } from '@tanstack/react-router';
import type { CSSProperties } from 'react';
import { SITE_NAV, type NavItem } from './siteNav';

const expertises = SITE_NAV.find((item) => item.children)?.children ?? [];

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

  const renderLinkList = (items: Array<NavItem>) => (
    <ul>
      {items.map((l) => (
        <li key={`${l.to}-${l.label}`}>
          <Link
            to={l.to}
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
          <div className="lg:col-span-2">
            <img src="/logo-everest.png" alt="EVEREST Finance" className="h-32 w-auto brightness-125 mb-5" />
            <p className="text-secondary-dark text-[0.85rem] font-light leading-relaxed">
              Encordés, vers le sommet
            </p>
          </div>

          <div>{renderLinkList(SITE_NAV)}</div>

          <div>
            <div className="kicker text-[var(--jaune-or)]" style={headingStyle}>Expertises</div>
            {renderLinkList(expertises)}
          </div>

          <div>
            <div className="kicker text-[var(--jaune-or)]" style={headingStyle}>Coordonnées</div>
            <ul className="space-y-3 text-secondary-dark text-[0.8rem] font-light leading-relaxed">
              <li>
                18 Boulevard de la République,<br />Dakar, Sénégal,<br />BP 11659-13000
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

        {/* Bottom bar */}
        <div
          className="mt-16 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-[var(--pure-white)]/5 text-secondary-dark text-[0.7rem] font-light"
        >
          <span className="opacity-70">
            &copy; {new Date().getFullYear()} EVEREST Finance, SGI agréée AMF-UMOA n° SGI/DA/2016/60. Tous droits réservés.
          </span>
          {/* Legal pages land in lot L7 (referential §9). */}
          <span>Mentions légales</span>
          <span>Conditions générales d'utilisation</span>
          <span>Politique de Confidentialité</span>
          <Link to="/faq" style={linkStyle} className="hover:!text-[var(--jaune-or)]">
            Abécédaire / FAQ
          </Link>
        </div>
      </div>
    </footer>
  );
};
