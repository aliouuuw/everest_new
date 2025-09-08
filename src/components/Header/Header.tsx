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
        className="flex items-center gap-1 text-sm text-secondary transition-colors hover:text-[var(--gold-dark)] group"
        aria-expanded={isOpen}
      >
        {title}
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-white/95 backdrop-blur-sm border border-black/10 rounded-xl shadow-lg py-2 z-50">
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className="block px-4 py-3 text-sm text-secondary hover:text-[var(--gold-dark)] hover:bg-[var(--gold-light)]/10 transition-colors"
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
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    { label: 'Mot du DG', href: '/mot-dg' },
  ];

  const offresItems: Array<DropdownItem> = [
    { label: 'Marché des capitaux', href: '/marche-capitaux' },
    { label: 'Ingénieurie financière', href: '/ingenieurie-financiere' },
    { label: 'Recherche et analyses', href: '/recherche-analyses' },
  ];

  // Return null without violating hooks rules
  if (shouldHideHeader) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-20">
      <div className="mx-auto max-w-5xl px-8 py-1 mt-5 rounded-xl flex items-center justify-between bg-white/90 backdrop-blur supports-[backdrop-filter]:glassmorphism border border-black/5">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link to="/" className="transition-opacity hover:opacity-80">
            <img src="/logo-everest.png" alt="Everest Finance" className="h-16 w-18" />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm text-secondary">
          <Link 
            to="/" 
            className="transition-colors hover:text-[var(--gold-dark)]"
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
            name="offres"
            title="Offres"
            items={offresItems}
            isOpen={openDropdown === 'offres'}
            onOpen={openDropdownByName}
            onClose={closeDropdownByName}
          />
          
          <Link 
            to="/services" 
            className="transition-colors hover:text-[var(--gold-dark)]"
          >
            Services
          </Link>

          <Link 
            to="/simulateur" 
            className="transition-colors hover:text-[var(--gold-dark)]"
          >
            Simulateur
          </Link>

          <Link 
            to="/bourse" 
            className="transition-colors hover:text-[var(--gold-dark)]"
          >
            Bourse
          </Link>
        </nav>

        {/* Connexion Button */}
        <div className="hidden lg:block">
          <Link
            to="/auth"
            className="btn-primary inline-flex items-center gap-2.5 font-display tracking-wide"
          >
            <FingerprintIcon className="w-4 h-4 text-white transition-transform duration-300 hover:scale-110" />
            <span className="tracking-wide">Accès Client</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button 
            onClick={toggleMobileMenu}
            className="p-2 text-secondary hover:text-[var(--gold-dark)] transition-colors"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 mt-2 mx-4 bg-white/95 backdrop-blur-sm border border-black/10 rounded-xl shadow-lg py-4 z-50">
          <div className="px-4 space-y-4">
            {/* Accueil Link */}
            <Link 
              to="/" 
              className="block text-sm text-secondary hover:text-[var(--gold-dark)] transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Accueil
            </Link>

            {/* Société Section */}
            <div>
              <div className="font-medium text-sm text-[var(--gold-dark)] mb-2">Société</div>
              <div className="space-y-2 pl-3">
                {societeItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.href}
                    className="block text-sm text-secondary hover:text-[var(--gold-dark)] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Offres Section */}
            <div>
              <div className="font-medium text-sm text-[var(--gold-dark)] mb-2">Offres</div>
              <div className="space-y-2 pl-3">
                {offresItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.href}
                    className="block text-sm text-secondary hover:text-[var(--gold-dark)] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Services Link */}
            <Link 
              to="/services" 
              className="block text-sm text-secondary hover:text-[var(--gold-dark)] transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>

            {/* Simulateur Link */}
            <Link 
              to="/simulateur" 
              className="block text-sm text-secondary hover:text-[var(--gold-dark)] transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Simulateur
            </Link>

            {/* Bourse Link */}
            <Link 
              to="/bourse" 
              className="block text-sm text-secondary hover:text-[var(--gold-dark)] transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Bourse
            </Link>

            {/* Connexion Button */}
            <div className="pt-4 border-t border-black/10">
              <Link
                to="/auth"
                className="btn-primary inline-flex items-center justify-center gap-2.5 w-full font-display tracking-wide"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FingerprintIcon className="w-4 h-4 text-white transition-transform duration-300 hover:scale-110" />
                <span className="tracking-wide">Accès Client</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
