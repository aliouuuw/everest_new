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
  href: string;
}

interface DropdownProps {
  name: string;
  title: string;
  items: Array<DropdownItem>;
  isOpen: boolean;
  onOpen: (name: string) => void;
  onClose: (name: string) => void;
  isScrolled: boolean;
  isLightBackgroundPage: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ name, title, items, isOpen, onOpen, onClose, isScrolled, isLightBackgroundPage }) => {
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

  // Use props or calculate based on them if we ever need dynamic behavior
  // For now, the site is light-mode led
  const needsDarkText = isScrolled || isLightBackgroundPage || true;

  return (
    <div 
      className="relative" 
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="flex items-center gap-1 text-[13px] tracking-[0.04em] transition-colors duration-300 hover:text-[var(--jaune-or)] group font-medium"
        style={{ fontFamily: 'var(--font-primary)', color: needsDarkText ? 'var(--night-80)' : 'rgba(255,255,255,0.6)' }}
        aria-expanded={isOpen}
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

      {isOpen && (
        <div className="absolute top-full left-0 mt-3 w-56 bg-white/95 backdrop-blur-xl border border-[var(--mauve-10)] shadow-xl shadow-[var(--mauve-05)] py-2 z-50 rounded-md">
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className="block px-5 py-2.5 text-[13px] transition-colors duration-200 hover:text-[var(--mauve)] hover:bg-[var(--mauve-05)] font-medium"
              style={{ fontFamily: 'var(--font-primary)', color: 'var(--night-80)' }}
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

  // Since we are moving to a light-led site, almost all paths will have light backgrounds
  const lightBackgroundPaths = ['/', '/about', '/marche-capitaux', '/ingenieurie-financiere', '/gestion-sous-mandat', '/services', '/offres', '/gestion-libre', '/gestion-assistee', '/faq', '/publications', '/actualites'];
  const isLightBackgroundPage = lightBackgroundPaths.some(path => location.pathname === path || location.pathname.startsWith(path)) || location.pathname === '/bourse';

  // Hide header if authenticated and on dashboard, or if in admin portal
  const shouldHideHeader = (isAuthenticated && isOnDashboard) || isInAdminorClientPortal;

  // Header styles based on scroll state
  const headerBgClass = isScrolled ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-[var(--mauve-05)] border-b border-[var(--mauve-10)]' : 'bg-transparent';
  
  // Text color based on light-led theme
  const needsDarkText = true;
  const textColorClass = needsDarkText ? 'text-[var(--night-80)]' : 'text-white/60';
  const logoTextClass = needsDarkText ? 'text-[var(--night)]' : 'text-white/70';

  const societeItems: Array<DropdownItem> = [
    { label: 'À propos', href: '/about' },
    { label: 'Actualités', href: '/actualites' },
    { label: 'Publications', href: '/publications' },
    { label: 'Abécédaire / FAQ', href: '/faq' },
  ];

  const servicesItems: Array<DropdownItem> = [
    { label: 'Marché des capitaux', href: '/marche-capitaux' },
    { label: 'Ingénieurie financière', href: '/ingenieurie-financiere' },
    { label: 'Gestion sous-mandat', href: '/gestion-sous-mandat' },
  ];

  // Return null without violating hooks rules
  if (shouldHideHeader) {
    return null;
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBgClass}`}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-16 lg:px-24 py-5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link to="/" className="transition-opacity hover:opacity-80 flex items-center gap-3">
            <img src="/logo-everest.png" alt="Everest Finance" className="h-10 w-auto" />
            <span
              className={`hidden sm:block text-sm tracking-[0.08em] uppercase font-semibold ${logoTextClass}`}
              style={{ fontFamily: 'var(--font-primary)' }}
            >
              Everest Finance
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link
            to="/"
            className={`text-[13px] tracking-[0.04em] transition-colors duration-300 hover:text-[var(--jaune-or)] font-medium ${textColorClass}`}
            style={{ fontFamily: 'var(--font-primary)' }}
          >
            Accueil
          </Link>

          <Dropdown
            name="societe"
            title="Société"
            items={societeItems}
            isOpen={openDropdown === 'societe'}
            onOpen={openDropdownByName}
            onClose={closeDropdownByName}
            isScrolled={isScrolled}
            isLightBackgroundPage={isLightBackgroundPage}
          />

          <Dropdown
            name="services"
            title="Services"
            items={servicesItems}
            isOpen={openDropdown === 'services'}
            onOpen={openDropdownByName}
            onClose={closeDropdownByName}
            isScrolled={isScrolled}
            isLightBackgroundPage={isLightBackgroundPage}
          />

          <Link
            to="/offres"
            className={`text-[13px] tracking-[0.04em] transition-colors duration-300 hover:text-[var(--jaune-or)] font-medium ${textColorClass}`}
            style={{ fontFamily: 'var(--font-primary)' }}
          >
            Offres
          </Link>

          <Link
            to="/bourse"
            className={`text-[13px] tracking-[0.04em] transition-colors duration-300 hover:text-[var(--jaune-or)] font-medium ${textColorClass}`}
            style={{ fontFamily: 'var(--font-primary)' }}
          >
            Bourse
          </Link>
        </nav>

        {/* CTA */}
        <div className="hidden lg:block">
          <Link
            to="/auth"
            className={`group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-md transition-all duration-500 
              ${needsDarkText 
                ? 'border border-[var(--mauve-20)] hover:border-[var(--mauve)] hover:bg-[var(--mauve-05)]' 
                : 'border border-[var(--jaune-or)]/30 hover:border-[var(--jaune-or)]/60 hover:bg-[var(--jaune-or)]/5'}`}
          >
            <FingerprintIcon className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110 ${needsDarkText ? 'text-[var(--mauve)]' : 'text-[var(--jaune-or)]'}`} />
            <span
              className={`text-[11px] tracking-[0.15em] uppercase font-semibold ${needsDarkText ? 'text-[var(--mauve)]' : 'text-[var(--jaune-or)]'}`}
              style={{ fontFamily: 'var(--font-primary)' }}
            >
              Accès Client
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className={`p-2 transition-colors ${needsDarkText ? 'text-[var(--night)] hover:text-[var(--mauve)]' : 'text-white/60 hover:text-[var(--jaune-or)]'}`}
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
        <div className={`lg:hidden absolute top-full left-0 right-0 mx-4 mt-1 backdrop-blur-xl border py-6 z-50 rounded-lg shadow-xl
          ${needsDarkText ? 'bg-white/95 border-[var(--mauve-10)] shadow-[var(--mauve-10)]' : 'bg-[var(--night)]/95 border-white/[0.06]'}`}>
          <div className="px-6 space-y-5">
            <Link
              to="/"
              className={`block text-sm transition-colors font-medium ${needsDarkText ? 'text-[var(--night)] hover:text-[var(--mauve)]' : 'hover:text-[var(--jaune-or)] text-[rgba(255,255,255,0.7)]'}`}
              style={{ fontFamily: 'var(--font-primary)' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Accueil
            </Link>

            <div>
              <div
                className={`text-[10px] tracking-[0.2em] uppercase mb-3 font-semibold ${needsDarkText ? 'text-[var(--mauve)]' : 'text-[var(--jaune-or)]'}`}
                style={{ fontFamily: 'var(--font-primary)' }}
              >
                Société
              </div>
              <div className={`space-y-3 pl-3 border-l ${needsDarkText ? 'border-[var(--mauve-15)]' : 'border-white/[0.06]'}`}>
                {societeItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.href}
                    className={`block text-sm transition-colors font-medium ${needsDarkText ? 'text-[var(--night-80)] hover:text-[var(--mauve)]' : 'hover:text-[var(--jaune-or)] text-[rgba(255,255,255,0.5)]'}`}
                    style={{ fontFamily: 'var(--font-primary)' }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div
                className={`text-[10px] tracking-[0.2em] uppercase mb-3 font-semibold ${needsDarkText ? 'text-[var(--mauve)]' : 'text-[var(--jaune-or)]'}`}
                style={{ fontFamily: 'var(--font-primary)' }}
              >
                Services
              </div>
              <div className={`space-y-3 pl-3 border-l ${needsDarkText ? 'border-[var(--mauve-15)]' : 'border-white/[0.06]'}`}>
                {servicesItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.href}
                    className={`block text-sm transition-colors font-medium ${needsDarkText ? 'text-[var(--night-80)] hover:text-[var(--mauve)]' : 'hover:text-[var(--jaune-or)] text-[rgba(255,255,255,0.5)]'}`}
                    style={{ fontFamily: 'var(--font-primary)' }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/offres"
              className={`block text-sm transition-colors font-medium ${needsDarkText ? 'text-[var(--night)] hover:text-[var(--mauve)]' : 'hover:text-[var(--jaune-or)] text-[rgba(255,255,255,0.7)]'}`}
              style={{ fontFamily: 'var(--font-primary)' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Offres
            </Link>

            <Link
              to="/bourse"
              className={`block text-sm transition-colors font-medium ${needsDarkText ? 'text-[var(--night)] hover:text-[var(--mauve)]' : 'hover:text-[var(--jaune-or)] text-[rgba(255,255,255,0.7)]'}`}
              style={{ fontFamily: 'var(--font-primary)' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Bourse
            </Link>

            <div className={`pt-4 border-t ${needsDarkText ? 'border-[var(--mauve-10)]' : 'border-white/[0.06]'}`}>
              <Link
                to="/auth"
                className={`inline-flex items-center gap-2.5 px-5 py-2.5 w-full justify-center rounded-md transition-all duration-300
                  ${needsDarkText 
                    ? 'border border-[var(--mauve-20)] hover:border-[var(--mauve)] hover:bg-[var(--mauve-05)]' 
                    : 'border border-[var(--jaune-or)]/30 hover:border-[var(--jaune-or)]/60'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FingerprintIcon className={`w-3.5 h-3.5 ${needsDarkText ? 'text-[var(--mauve)]' : 'text-[var(--jaune-or)]'}`} />
                <span
                  className={`text-[11px] tracking-[0.15em] uppercase font-semibold ${needsDarkText ? 'text-[var(--mauve)]' : 'text-[var(--jaune-or)]'}`}
                  style={{ fontFamily: 'var(--font-primary)' }}
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

