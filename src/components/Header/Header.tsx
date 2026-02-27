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
}

const Dropdown: React.FC<DropdownProps> = ({ name, title, items, isOpen, onOpen, onClose }) => {
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
      <button
        className="flex items-center gap-1 text-[13px] tracking-[0.04em] transition-colors duration-300 hover:text-[var(--jaune-or)] group"
        style={{ fontFamily: 'var(--font-primary)', fontWeight: 400, color: 'rgba(255,255,255,0.6)' }}
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
        <div className="absolute top-full left-0 mt-3 w-56 bg-[var(--night)]/95 backdrop-blur-xl border border-white/[0.06] py-2 z-50">
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className="block px-5 py-2.5 text-[13px] transition-colors duration-200 hover:text-[var(--jaune-or)] hover:bg-white/[0.03]"
              style={{ fontFamily: 'var(--font-primary)', fontWeight: 300, color: 'rgba(255,255,255,0.5)' }}
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

  // Hide header if authenticated and on dashboard, or if in admin portal
  const shouldHideHeader = (isAuthenticated && isOnDashboard) || isInAdminorClientPortal;

  const societeItems: Array<DropdownItem> = [
    { label: 'À propos', href: '/about' },
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-[var(--night)]/90 backdrop-blur-xl shadow-lg shadow-black/10' : ''}`}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-16 lg:px-24 py-5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link to="/" className="transition-opacity hover:opacity-80 flex items-center gap-3">
            <img src="/logo-everest.png" alt="Everest Finance" className="h-10 w-auto" />
            <span
              className="hidden sm:block text-sm tracking-[0.08em] uppercase"
              style={{ fontFamily: 'var(--font-primary)', fontWeight: 400, color: 'rgba(255,255,255,0.7)' }}
            >
              Everest Finance
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link
            to="/"
            className="text-[13px] tracking-[0.04em] transition-colors duration-300 hover:text-[var(--jaune-or)]"
            style={{ fontFamily: 'var(--font-primary)', fontWeight: 400, color: 'rgba(255,255,255,0.6)' }}
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
          />

          <Dropdown
            name="services"
            title="Services"
            items={servicesItems}
            isOpen={openDropdown === 'services'}
            onOpen={openDropdownByName}
            onClose={closeDropdownByName}
          />

          <Link
            to="/services"
            className="text-[13px] tracking-[0.04em] transition-colors duration-300 hover:text-[var(--jaune-or)]"
            style={{ fontFamily: 'var(--font-primary)', fontWeight: 400, color: 'rgba(255,255,255,0.6)' }}
          >
            Offres
          </Link>

          <Link
            to="/actualites"
            className="text-[13px] tracking-[0.04em] transition-colors duration-300 hover:text-[var(--jaune-or)]"
            style={{ fontFamily: 'var(--font-primary)', fontWeight: 400, color: 'rgba(255,255,255,0.6)' }}
          >
            Actualités
          </Link>

          <Link
            to="/bourse"
            className="text-[13px] tracking-[0.04em] transition-colors duration-300 hover:text-[var(--jaune-or)]"
            style={{ fontFamily: 'var(--font-primary)', fontWeight: 400, color: 'rgba(255,255,255,0.6)' }}
          >
            Bourse
          </Link>
        </nav>

        {/* CTA */}
        <div className="hidden lg:block">
          <Link
            to="/auth"
            className="group inline-flex items-center gap-2.5 px-5 py-2.5 border border-[var(--jaune-or)]/30 rounded-sm transition-all duration-500 hover:border-[var(--jaune-or)]/60 hover:bg-[var(--jaune-or)]/5"
          >
            <FingerprintIcon className="w-3.5 h-3.5 text-[var(--jaune-or)] transition-transform duration-300 group-hover:scale-110" />
            <span
              className="text-[11px] tracking-[0.15em] uppercase"
              style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--jaune-or)' }}
            >
              Accès Client
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className="p-2 text-white/60 hover:text-[var(--jaune-or)] transition-colors"
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
        <div className="lg:hidden absolute top-full left-0 right-0 mx-4 mt-1 bg-[var(--night)]/95 backdrop-blur-xl border border-white/[0.06] py-6 z-50">
          <div className="px-6 space-y-5">
            <Link
              to="/"
              className="block text-sm transition-colors hover:text-[var(--jaune-or)]"
              style={{ fontFamily: 'var(--font-primary)', fontWeight: 400, color: 'rgba(255,255,255,0.7)' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Accueil
            </Link>

            <div>
              <div
                className="text-[10px] tracking-[0.2em] uppercase mb-3"
                style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--jaune-or)' }}
              >
                Société
              </div>
              <div className="space-y-3 pl-3 border-l border-white/[0.06]">
                {societeItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.href}
                    className="block text-sm transition-colors hover:text-[var(--jaune-or)]"
                    style={{ fontFamily: 'var(--font-primary)', fontWeight: 300, color: 'rgba(255,255,255,0.5)' }}
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
                style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--jaune-or)' }}
              >
                Services
              </div>
              <div className="space-y-3 pl-3 border-l border-white/[0.06]">
                {servicesItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.href}
                    className="block text-sm transition-colors hover:text-[var(--jaune-or)]"
                    style={{ fontFamily: 'var(--font-primary)', fontWeight: 300, color: 'rgba(255,255,255,0.5)' }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/actualites"
              className="block text-sm transition-colors hover:text-[var(--jaune-or)]"
              style={{ fontFamily: 'var(--font-primary)', fontWeight: 400, color: 'rgba(255,255,255,0.7)' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Actualités
            </Link>

            <Link
              to="/services"
              className="block text-sm transition-colors hover:text-[var(--jaune-or)]"
              style={{ fontFamily: 'var(--font-primary)', fontWeight: 400, color: 'rgba(255,255,255,0.7)' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Offres
            </Link>

            <Link
              to="/bourse"
              className="block text-sm transition-colors hover:text-[var(--jaune-or)]"
              style={{ fontFamily: 'var(--font-primary)', fontWeight: 400, color: 'rgba(255,255,255,0.7)' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Bourse
            </Link>

            <div className="pt-4 border-t border-white/[0.06]">
              <Link
                to="/auth"
                className="inline-flex items-center gap-2.5 px-5 py-2.5 border border-[var(--jaune-or)]/30 w-full justify-center transition-all duration-300 hover:border-[var(--jaune-or)]/60"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FingerprintIcon className="w-3.5 h-3.5 text-[var(--jaune-or)]" />
                <span
                  className="text-[11px] tracking-[0.15em] uppercase"
                  style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--jaune-or)' }}
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
