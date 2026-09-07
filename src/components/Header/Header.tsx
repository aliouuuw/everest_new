/* eslint-disable sort-imports */
import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
// Fingerprint Icon Component
const FingerprintIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.97-4.659.97-7.132A8 8 0 0012 4a8 8 0 00-8 8c0 2.473.325 4.866.97 7.132M9 12a2 2 0 104 0m-4 0a2 2 0 104 0" />
  </svg>
);

interface DropdownItem {
  label: string;
  to: string;
  search?: { frequency?: 'hebdomadaire' | 'mensuelle' | 'semestrielle' };
  hash?: string;
}

interface DropdownProps {
  name: string;
  title: string;
  titleTo?: string;
  items: Array<DropdownItem>;
  isOpen: boolean;
  onOpen: (name: string) => void;
  onClose: (name: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ name, title, titleTo, items, isOpen, onOpen, onClose }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    onOpen(name);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      onClose(name);
    }, 150); // Small delay to prevent flickering when moving between trigger and dropdown
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      className="relative" 
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {titleTo ? (
        <Link
          to={titleTo}
          className="flex items-center gap-1 text-[14px] font-bold tracking-[0.04em] transition-colors duration-300 hover:text-white group"
          style={{ fontFamily: 'var(--font-primary)',  color: 'rgba(255,255,255,0.75)' }}
          aria-expanded={isOpen}
          aria-haspopup="menu"
        >
          {title}
          <svg
            className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </Link>
      ) : (
        <button
          className="flex items-center gap-1 text-[14px] font-bold tracking-[0.04em] transition-colors duration-300 hover:text-white group"
          style={{ fontFamily: 'var(--font-primary)',  color: 'rgba(255,255,255,0.75)' }}
          aria-expanded={isOpen}
          aria-haspopup="menu"
        >
          {title}
          <svg
            className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}

      {isOpen && (
        <div className="absolute top-full left-0 mt-4 w-64 bg-[var(--pure-white)] border border-white/[0.15] rounded-2xl py-3 z-50 shadow-2xl shadow-black/40 backdrop-blur-sm">
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              {...(item.search ? { search: item.search } : {})}
              {...(item.hash ? { hash: item.hash } : {})}
              className="block px-6 py-3 text-[14px] font-bold transition-all duration-200 text-[var(--night-80)] hover:text-[var(--jaune-or)] hover:bg-white/[0.08] first:rounded-t-xl last:rounded-b-xl"
              style={{ fontFamily: 'var(--font-primary)', }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export const Header: React.FC = () => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Track scroll to add header background for contrast on light pages
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openDropdownByName = (dropdownName: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenDropdown(dropdownName);
  };

  const closeDropdownByName = (dropdownName: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown((current) => (current === dropdownName ? null : current));
    }, 0);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setOpenDropdown(null); // Close any open dropdowns when mobile menu toggles
  };

  // Close all dropdowns when clicking outside or when another dropdown opens
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdown(null);
    };

    if (openDropdown) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [openDropdown]);

  // Check if user is authenticated and on dashboard
  const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';
  const isOnDashboard = location.pathname === '/dashboard';
  
  // Check if user is in admin portal
  const isInAdminorClientPortal = location.pathname.startsWith('/admin') || location.pathname.startsWith('/dashboard');

  // Pages with light backgrounds need immediate dark backdrop for nav contrast
  const lightBackgroundPaths = ['/test'];
  const isLightBackgroundPage = lightBackgroundPaths.some(path => location.pathname.startsWith(path));

  // Force "scrolled" header appearance on selected routes from first paint
  const forceScrolledStylePaths = [ '/offres', '/auth' ];
  const isForcedScrolledStyle = forceScrolledStylePaths.some(path =>
      location.pathname.startsWith(path),
    ) || (location.pathname.startsWith('/actualites/') && location.pathname !== '/actualites');
  const shouldUseScrolledStyle = isScrolled || isForcedScrolledStyle;

  // Hide header if authenticated and on dashboard, or if in admin portal
  const shouldHideHeader = (isAuthenticated && isOnDashboard) || isInAdminorClientPortal;

  const expertisesItems: Array<DropdownItem> = [
    { label: 'Marché Financier Régional (BRVM)', to: '/expertises', hash: 'marche-financier-regional' },
    { label: 'Marché des Titres Publics', to: '/expertises', hash: 'marche-titres-publics' },
    { label: 'Structuration & Ingénierie', to: '/expertises', hash: 'ingenierie-financiere' },
    { label: 'Private Office', to: '/expertises', hash: 'private-office' },
  ];

  const marchesItems: Array<DropdownItem> = [
    { label: 'Actualités', to: '/actualites' },
    { label: 'Publications', to: '/publications' },
    { label: 'Abécédaire / FAQ', to: '/faq' },
  ];

  const ressourcesItems: Array<DropdownItem> = [
    { label: 'Opportunités en cours', to: '/offres' },
    { label: 'BRVM / Marché régional', to: '/bourse' },
    { label: 'Outils investisseur', to: '/outils-investisseur' },
  ];

  const societeItems: Array<DropdownItem> = [
    { label: 'À propos', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ];

  // Return null without violating hooks rules
  if (shouldHideHeader) {
    return null;
  }

  // Header background: darker mauve/purple on all pages
  const headerBg = isLightBackgroundPage
    ? shouldUseScrolledStyle
      ? 'bg-[#012d2a]'
      : 'bg-[#012d2a]'
    : shouldUseScrolledStyle
      ? 'bg-[#6c786eba]/90 backdrop-blur-xl'
      : '';

  // Nav link color: always white on mauve bg
  const navLinkColor = 'rgba(255,255,255,0.75)';

  return (
    <header className={`fixed top-[40px] left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-16 lg:px-24 py-4 flex items-center justify-between">
        {/* Logo only — larger */}
        <Link to="/" className="transition-opacity hover:opacity-85 flex items-center">
          <img src="/logo-everest.png" alt="Everest Finance" className="h-16 w-auto" />
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link
            to="/"
            className="text-[14px] font-bold tracking-[0.04em] transition-colors duration-300 hover:text-white"
            style={{ fontFamily: 'var(--font-primary)',  color: navLinkColor }}
          >
            Accueil
          </Link>

          <Dropdown
            name="marches"
            title="Insights"
            items={marchesItems}
            isOpen={openDropdown === 'marches'}
            onOpen={openDropdownByName}
            onClose={closeDropdownByName}
          />

          <Dropdown
            name="expertises"
            title="Expertises"
            titleTo="/expertises"
            items={expertisesItems}
            isOpen={openDropdown === 'expertises'}
            onOpen={openDropdownByName}
            onClose={closeDropdownByName}
          />

          <Dropdown
            name="societe"
            title="Société"
            items={societeItems}
            isOpen={openDropdown === 'societe'}
            onOpen={openDropdownByName}
            onClose={closeDropdownByName}
          />

          <Dropdown
            name="ressources"
            title="Ressources"
            items={ressourcesItems}
            isOpen={openDropdown === 'ressources'}
            onOpen={openDropdownByName}
            onClose={closeDropdownByName}
          />
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="https://everest-account-opening.vercel.app/new-home"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--jaune-or)] rounded-full transition-all duration-500 hover:bg-[var(--jaune-or)]/90"
          >
            <span
              className="text-[11px] tracking-[0.15em] uppercase"
              style={{ fontFamily: 'var(--font-primary)', fontWeight: 600, color: 'var(--pure-white)' }}
            >
              Ouvrir un compte
            </span>
          </a>
          <Link
            to="/auth"
            className="group inline-flex items-center gap-2.5 px-5 py-2.5 border border-white/30 rounded-full transition-all duration-500 hover:border-white/70 hover:bg-white/10"
          >
            <FingerprintIcon className="w-3.5 h-3.5 text-white/70 transition-transform duration-300 group-hover:scale-110 group-hover:text-white" />
            <span
              className="text-[11px] tracking-[0.15em] uppercase"
              style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'rgba(255,255,255,0.75)' }}
            >
              Accès Client
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className="p-2 text-white/70 hover:text-white transition-colors"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[var(--mauve-80)] border-t border-white/[0.12] py-6 z-50 shadow-2xl shadow-black/40">
          <div className="px-6 space-y-5">
            <Link
              to="/"
              className="block text-sm transition-colors hover:text-white"
              style={{ fontFamily: 'var(--font-primary)',  color: 'rgba(255,255,255,0.75)' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Accueil
            </Link>

            <div>
              <div
                className="text-[10px] tracking-[0.2em] uppercase mb-3"
                style={{ fontFamily: 'var(--font-primary)', fontWeight: 600, color: 'var(--jaune-or)' }}
              >
                Insights
              </div>
              <div className="space-y-3 pl-3 border-l border-white/[0.15]">
                {marchesItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.to}
                    {...(item.search ? { search: item.search } : {})}
                    {...(item.hash ? { hash: item.hash } : {})}
                    className="block text-sm transition-colors hover:text-white"
                    style={{ fontFamily: 'var(--font-primary)', fontWeight: 300, color: 'rgba(255,255,255,0.6)' }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div
                className="text-[10px] tracking-[0.2em] uppercase mb-3"
                style={{ fontFamily: 'var(--font-primary)', fontWeight: 600, color: 'var(--jaune-or)' }}
              >
                Expertises
              </div>
              <div className="space-y-3 pl-3 border-l border-white/[0.15]">
                {expertisesItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.to}
                    {...(item.search ? { search: item.search } : {})}
                    {...(item.hash ? { hash: item.hash } : {})}
                    className="block text-sm transition-colors hover:text-white"
                    style={{ fontFamily: 'var(--font-primary)', fontWeight: 300, color: 'rgba(255,255,255,0.6)' }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div
                className="text-[10px] tracking-[0.2em] uppercase mb-3"
                style={{ fontFamily: 'var(--font-primary)', fontWeight: 600, color: 'var(--jaune-or)' }}
              >
                Société
              </div>
              <div className="space-y-3 pl-3 border-l border-white/[0.15]">
                {societeItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.to}
                    {...(item.search ? { search: item.search } : {})}
                    {...(item.hash ? { hash: item.hash } : {})}
                    className="block text-sm transition-colors hover:text-white"
                    style={{ fontFamily: 'var(--font-primary)', fontWeight: 300, color: 'rgba(255,255,255,0.6)' }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div
                className="text-[10px] tracking-[0.2em] uppercase mb-3"
                style={{ fontFamily: 'var(--font-primary)', fontWeight: 600, color: 'var(--jaune-or)' }}
              >
                Ressources
              </div>
              <div className="space-y-3 pl-3 border-l border-white/[0.15]">
                {ressourcesItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.to}
                    {...(item.search ? { search: item.search } : {})}
                    {...(item.hash ? { hash: item.hash } : {})}
                    className="block text-sm transition-colors hover:text-white"
                    style={{ fontFamily: 'var(--font-primary)', fontWeight: 300, color: 'rgba(255,255,255,0.6)' }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.12] flex flex-col gap-3">
              <a
                href="https://everest-account-opening.vercel.app/new-home"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-2.5 bg-[var(--jaune-or)] rounded-full w-full transition-all duration-300 hover:bg-[var(--jaune-or)]/90"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span
                  className="text-[11px] tracking-[0.15em] uppercase"
                  style={{ fontFamily: 'var(--font-primary)', fontWeight: 600, color: 'var(--pure-white)' }}
                >
                  Ouvrir un compte
                </span>
              </a>
              <Link
                to="/auth"
                className="inline-flex items-center gap-2.5 px-5 py-2.5 border border-white/30 rounded-full w-full justify-center transition-all duration-300 hover:border-white/70 hover:bg-white/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FingerprintIcon className="w-3.5 h-3.5 text-white/70" />
                <span
                  className="text-[11px] tracking-[0.15em] uppercase"
                  style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'rgba(255,255,255,0.75)' }}
                >
                  Accès Client
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
