import { useLocation } from '@tanstack/react-router';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';

export const Footer = () => {
  const location = useLocation();

  const isInAdminorClientPortal = location.pathname.startsWith('/admin') || location.pathname.startsWith('/dashboard');

  if (isInAdminorClientPortal) {
    return null;
  }

  const linkStyle: React.CSSProperties = {
    fontFamily: 'var(--font-primary)',
    fontWeight: 300,
    fontSize: '0.8rem',
    lineHeight: 2.2,
    color: 'rgba(255,255,255,0.4)',
    transition: 'color 0.3s',
  };

  const headingStyle: React.CSSProperties = {
    fontFamily: 'var(--font-primary)',
    fontWeight: 500,
    fontSize: '0.7rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'var(--jaune-or)',
    marginBottom: '1.25rem',
  };

  return (
    <footer style={{ background: 'var(--night)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-16 lg:px-24 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img src="/logo-everest.png" alt="Everest Finance" className="h-8 w-auto" style={{ filter: 'brightness(1.2)' }} />
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: '1.1rem', color: 'var(--pure-white)' }}>
                Everest Finance
              </span>
            </div>
            <p style={{ fontFamily: 'var(--font-primary)', fontWeight: 300, fontSize: '0.85rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.35)' }}>
              Des idées et des valeurs au service de vos ambitions.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="#"
                aria-label="LinkedIn"
                className="inline-flex items-center justify-center w-9 h-9 border transition-all duration-300 hover:border-[var(--jaune-or)]/40 hover:text-[var(--jaune-or)]"
                style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.35)' }}
              >
                <FaLinkedin className="text-sm" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="inline-flex items-center justify-center w-9 h-9 border transition-all duration-300 hover:border-[var(--jaune-or)]/40 hover:text-[var(--jaune-or)]"
                style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.35)' }}
              >
                <FaTwitter className="text-sm" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <div style={headingStyle}>Liens</div>
            <ul>
              {[
                { label: 'À propos', href: '#about' },
                { label: 'Publications', href: '#publications' },
                { label: 'Abécédaire / FAQ', href: '#faq' },
                { label: 'Performance', href: '#performance' },
                { label: 'Portail client', href: '#portal-preview' },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} style={linkStyle} className="hover:!text-[var(--jaune-or)]">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Offres */}
          <div>
            <div style={headingStyle}>Offres & services</div>
            <ul>
              {[
                { label: 'Marché des capitaux', href: '/marche-capitaux' },
                { label: 'Ingénierie financière', href: '/ingenieurie-financiere' },
                { label: 'Gestion sous-mandat', href: '/gestion-sous-mandat' },
                { label: 'Gestion libre', href: '/gestion-libre' },
                { label: 'Gestion assistée', href: '/gestion-assistee' },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} style={linkStyle} className="hover:!text-[var(--jaune-or)]">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div style={headingStyle}>Contact</div>
            <ul className="space-y-3">
              <li style={{ fontFamily: 'var(--font-primary)', fontWeight: 300, fontSize: '0.8rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.4)' }}>
                18 Boulevard de la République,<br />Dakar, Sénégal
              </li>
              <li>
                <a href="mailto:contact@everest-finance.sn" style={linkStyle} className="hover:!text-[var(--jaune-or)]">
                  contact@everest-finance.sn
                </a>
              </li>
              <li>
                <a href="tel:+221000000000" style={linkStyle} className="hover:!text-[var(--jaune-or)]">
                  +221 00 000 00 00
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
        >
          <span style={{ fontFamily: 'var(--font-primary)', fontWeight: 300, fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)' }}>
            &copy; {new Date().getFullYear()} Everest Finance SGI — Agrément CREPMF SGI/DA/2016/60
          </span>
          <span style={{ fontFamily: 'var(--font-primary)', fontWeight: 300, fontSize: '0.7rem', color: 'rgba(255,255,255,0.2)' }}>
            Tous droits réservés
          </span>
        </div>
      </div>
    </footer>
  );
};
