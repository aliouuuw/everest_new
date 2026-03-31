import { useLocation } from '@tanstack/react-router';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';

export const Footer = () => {
  const location = useLocation();

  const isInAdminorClientPortal = location.pathname.startsWith('/admin') || location.pathname.startsWith('/dashboard');

  if (isInAdminorClientPortal) {
    return null;
  }

    const linkStyle: React.CSSProperties = {
    transition: 'color 0.3s',
  };

  const headingStyle: React.CSSProperties = {
    fontFamily: 'var(--font-primary)',
    fontWeight: 600,
    fontSize: '0.8rem',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    marginBottom: '1.25rem',
  };

  return (
    <footer className="relative" style={{ background: 'var(--night)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      {/* Subtle mauve ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 40% at 50% 100%, rgba(70,29,76,0.08) 0%, transparent 70%)',
        }}
      />
      <div className="mx-auto max-w-[1400px] px-6 md:px-16 lg:px-24 py-20 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img src="/logo-everest.png" alt="Everest Finance" className="h-8 w-auto brightness-125" />
              <span style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 500, fontSize: '1.1rem', color: 'var(--pure-white)' }}>
                Everest Finance
              </span>
            </div>
            <p style={{ fontFamily: 'var(--font-primary)', fontWeight: 300, fontSize: '0.85rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.5)' }}>
              Des idées et des valeurs au service de vos ambitions.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="#"
                aria-label="LinkedIn"
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300"
                style={{ border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.35)' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(202,148,47,0.4)'; e.currentTarget.style.color = 'var(--jaune-or)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; }}
              >
                <FaLinkedin className="text-sm" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300"
                style={{ border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.35)' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(202,148,47,0.4)'; e.currentTarget.style.color = 'var(--jaune-or)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; }}
              >
                <FaTwitter className="text-sm" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <div style={{ ...headingStyle, color: 'var(--pure-white)' }}>Liens</div>
            <ul>
              {[
                { label: 'À propos', href: '#about' },
                { label: 'Publications', href: '#publications' },
                { label: 'Abécédaire / FAQ', href: '#faq' },
                { label: 'Performance', href: '#performance' },
                { label: 'Portail client', href: '#portal-preview' },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    style={{ ...linkStyle, fontFamily: 'var(--font-primary)', fontWeight: 300, fontSize: '0.8rem', lineHeight: 2, color: 'rgba(255,255,255,0.5)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--jaune-or)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Offres */}
          <div>
            <div style={{ ...headingStyle, color: 'var(--pure-white)' }}>Offres & services</div>
            <ul>
              {[
                { label: 'Marché des capitaux', href: '/marche-capitaux' },
                { label: 'Ingénierie financière', href: '/ingenieurie-financiere' },
                { label: 'Gestion sous-mandat', href: '/gestion-sous-mandat' },
                { label: 'Gestion libre', href: '/gestion-libre' },
                { label: 'Gestion assistée', href: '/gestion-assistee' },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    style={{ ...linkStyle, fontFamily: 'var(--font-primary)', fontWeight: 300, fontSize: '0.8rem', lineHeight: 2, color: 'rgba(255,255,255,0.5)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--jaune-or)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div style={{ ...headingStyle, color: 'var(--pure-white)' }}>Contact</div>
            <ul className="space-y-3" style={{ fontFamily: 'var(--font-primary)', fontWeight: 300, fontSize: '0.8rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.5)' }}>
              <li>
                18 Boulevard de la République,<br />Dakar, Sénégal
              </li>
              <li>
                <a
                  href="mailto:contact@everest-finance.sn"
                  style={{ ...linkStyle, color: 'rgba(255,255,255,0.5)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--jaune-or)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                >
                  contact@everest-finance.sn
                </a>
              </li>
              <li>
                <a
                  href="tel:+221000000000"
                  style={{ ...linkStyle, color: 'rgba(255,255,255,0.5)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--jaune-or)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                >
                  +221 00 000 00 00
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)', fontFamily: 'var(--font-primary)', fontWeight: 300, fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)' }}
        >
          <span>
            &copy; {new Date().getFullYear()} Everest Finance SGI — Agrément CREPMF SGI/DA/2016/60
          </span>
          <span style={{ opacity: 0.7 }}>
            Tous droits réservés
          </span>
        </div>
      </div>
    </footer>
  );
};
