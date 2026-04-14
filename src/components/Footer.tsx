import { useLocation } from '@tanstack/react-router';
import { FaFacebook, FaLinkedin, FaTiktok } from 'react-icons/fa';

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
    marginBottom: '1.25rem',
  };

  return (
    <footer className="relative bg-[var(--mauve)]" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      {/* Subtle mauve ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(ellipse 50% 30% at 50% 100%, var(--mauve-10) 0%, transparent 70%)',
        }}
      />
      <div className="mx-auto max-w-6xl px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">

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

          {/* Links */}
          <div>
            <div className="kicker text-[var(--jaune-or)]" style={headingStyle}>Liens</div>
            <ul>
              {[
                { label: 'À propos', href: '#about' },
                { label: 'Publications', href: '#publications' },
                { label: 'Outils', href: '/outils-investisseur' },
                { label: 'Abécédaire / FAQ', href: '#faq' },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} style={linkStyle} className="text-secondary-dark text-[0.8rem] font-light leading-loose hover:!text-[var(--jaune-or)]">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Offres */}
          <div>
            <div className="kicker text-[var(--jaune-or)]" style={headingStyle}>Offres & services</div>
            <ul>
              {[
                { label: 'Marché des capitaux', href: '/marche-capitaux' },
                { label: 'Ingénierie financière', href: '/ingenieurie-financiere' },
                { label: 'Gestion sous mandat', href: '/gestion-sous-mandat' },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} style={linkStyle} className="text-secondary-dark text-[0.8rem] font-light leading-loose hover:!text-[var(--jaune-or)]">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
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
