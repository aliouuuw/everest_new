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

const Dropdown: React.FC<DropdownProps> = ({ name, title, items, isOpen, onOpen, onClose }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    onOpen(name);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    timeoutRef.current = setTimeout(() => {
      onClose(name);
    }, 150);
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
        className="flex items-center gap-1.5 text-[13px] tracking-[0.03em] transition-all duration-300 ease-out hover:text-[var(--mauve)] group font-medium py-2 px-1 rounded-sm focus:outline-none focus:ring-2 focus:ring-[var(--mauve)] focus:ring-offset-2"
        style={{ fontFamily: 'var(--font-primary)', color: isHovered || isOpen ? 'var(--mauve)' : 'var(--night-80)' }}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {title}
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-300 ease-out ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div 
          className="absolute top-full left-0 mt-2 w-56 bg-white/95 backdrop-blur-xl border border-[var(--mauve-10)] shadow-lg shadow-[var(--mauve-05)] py-1.5 z-50 rounded-md overflow-hidden"
          style={{ 
            animation: 'dropdownEnter 0.25s ease-out',
          }}
        >
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className="block px-4 py-2.5 text-[13px] transition-all duration-200 ease-out hover:text-[var(--mauve)] hover:bg-[var(--mauve-05)] hover:pl-5 font-medium relative group"
              style={{ fontFamily: 'var(--font-primary)', color: 'var(--night-80)' }}
            >
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-[1px] bg-[var(--jaune-or)] transition-all duration-200 group-hover:w-2" />
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
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Track scroll with smooth threshold
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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

  // Header styles based on scroll state - refined
  const headerClasses = isScrolled
    ? 'backdrop-blur-xl shadow-sm bg-[#Fbfafc]/90 border-b border-[var(--mauve-10)]/50'
    : 'bg-transparent';
    
  const paddingClasses = isScrolled ? 'py-3' : 'py-5 lg:py-6';

  // Theme detection for mobile menu (always light for public pages)
  const needsDarkText = true;

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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${headerClasses}`}>
      <div className={`mx-auto max-w-[1400px] px-6 md:px-12 lg:px-16 flex items-center justify-between transition-all duration-500 ease-out ${paddingClasses}`}>
        {/* Logo - refined with better hover treatment */}
        <div className="flex items-center gap-3">
          <Link 
            to="/" 
            className="flex items-center gap-3 group py-1 rounded-sm focus:outline-none focus:ring-2 focus:ring-[var(--mauve)] focus:ring-offset-2"
            aria-label="Retour à l'accueil Everest Finance"
          >
            <img 
              src="/logo-everest.png" 
              alt="Everest Finance" 
              className="h-8 w-auto transition-all duration-300 ease-out group-hover:scale-[1.03] group-hover:brightness-105" 
            />
            <div className="hidden sm:flex flex-col">
              <span
                className="text-[12px] tracking-[0.1em] uppercase font-semibold leading-tight text-[var(--night)] transition-colors duration-300 group-hover:text-[var(--mauve)]"
                style={{ fontFamily: 'var(--font-primary)' }}
              >
                Everest Finance
              </span>
              <span
                className="text-[9px] tracking-[0.12em] uppercase leading-tight text-[var(--jaune-or)]"
                style={{ fontFamily: 'var(--font-primary)', fontWeight: 500 }}
              >
                SGI — Dakar
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation - refined with consistent hover states */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link
            to="/"
            onMouseEnter={() => setHoveredLink('accueil')}
            onMouseLeave={() => setHoveredLink(null)}
            className={`text-[13px] tracking-[0.02em] transition-all duration-300 ease-out font-medium relative py-2 px-1 rounded-sm focus:outline-none focus:ring-2 focus:ring-[var(--mauve)] focus:ring-offset-2 ${hoveredLink === 'accueil' ? 'text-[var(--mauve)]' : 'text-[var(--night-80)]'}`}
            style={{ fontFamily: 'var(--font-primary)' }}
            activeProps={{ className: 'text-[var(--mauve)]' }}
          >
            Accueil
            <span 
              className="absolute bottom-0 left-0 h-[2px] bg-[var(--jaune-or)] transition-all duration-300 ease-out"
              style={{ width: hoveredLink === 'accueil' ? '100%' : '0%' }}
            />
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
            onMouseEnter={() => setHoveredLink('offres')}
            onMouseLeave={() => setHoveredLink(null)}
            className={`text-[13px] tracking-[0.02em] transition-all duration-300 ease-out font-medium relative py-2 px-1 rounded-sm focus:outline-none focus:ring-2 focus:ring-[var(--mauve)] focus:ring-offset-2 ${hoveredLink === 'offres' ? 'text-[var(--mauve)]' : 'text-[var(--night-80)]'}`}
            style={{ fontFamily: 'var(--font-primary)' }}
            activeProps={{ className: 'text-[var(--mauve)]' }}
          >
            Offres
            <span 
              className="absolute bottom-0 left-0 h-[2px] bg-[var(--jaune-or)] transition-all duration-300 ease-out"
              style={{ width: hoveredLink === 'offres' ? '100%' : '0%' }}
            />
          </Link>

          <Link
            to="/bourse"
            onMouseEnter={() => setHoveredLink('bourse')}
            onMouseLeave={() => setHoveredLink(null)}
            className={`text-[13px] tracking-[0.02em] transition-all duration-300 ease-out font-medium relative py-2 px-1 rounded-sm focus:outline-none focus:ring-2 focus:ring-[var(--mauve)] focus:ring-offset-2 ${hoveredLink === 'bourse' ? 'text-[var(--mauve)]' : 'text-[var(--night-80)]'}`}
            style={{ fontFamily: 'var(--font-primary)' }}
            activeProps={{ className: 'text-[var(--mauve)]' }}
          >
            Bourse
            <span 
              className="absolute bottom-0 left-0 h-[2px] bg-[var(--jaune-or)] transition-all duration-300 ease-out"
              style={{ width: hoveredLink === 'bourse' ? '100%' : '0%' }}
            />
          </Link>
        </nav>

        {/* CTA - refined with sophisticated hover */}
        <div className="hidden lg:block">
          <Link
            to="/auth"
            className="group inline-flex items-center gap-2 px-5 py-2.5 transition-all duration-300 ease-out relative overflow-hidden rounded-sm bg-[var(--night)] text-white hover:shadow-lg hover:shadow-[var(--mauve)]/15 active:scale-[0.98] active:duration-150 focus:outline-none focus:ring-2 focus:ring-[var(--mauve)] focus:ring-offset-2"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--mauve)] to-[#3A1440] translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out" />
            <FingerprintIcon className="relative z-10 w-3.5 h-3.5 text-white/90 transition-all duration-300 group-hover:scale-110" />
            <span
              className="relative z-10 text-[11px] tracking-[0.12em] uppercase font-semibold text-white"
              style={{ fontFamily: 'var(--font-primary)' }}
            >
              Accès Client
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button - improved touch target */}
        <div className="lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className="p-3 -mr-2 transition-colors duration-200 text-[var(--night)] hover:text-[var(--mauve)] rounded-sm focus:outline-none focus:ring-2 focus:ring-[var(--mauve)] focus:ring-offset-2"
            aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMobileMenuOpen}
            style={{ minHeight: '44px', minWidth: '44px' }}
          >
            <div className="relative w-5 h-5">
              <span 
                className="absolute left-0 top-1 h-[2px] w-5 bg-current transition-all duration-300 ease-out"
                style={{ 
                  transform: isMobileMenuOpen ? 'rotate(45deg) translateY(4px)' : 'rotate(0deg) translateY(0)',
                  top: isMobileMenuOpen ? '8px' : '4px'
                }}
              />
              <span 
                className="absolute left-0 top-[9px] h-[2px] w-5 bg-current transition-all duration-300 ease-out"
                style={{ opacity: isMobileMenuOpen ? 0 : 1 }}
              />
              <span 
                className="absolute left-0 bottom-1 h-[2px] w-5 bg-current transition-all duration-300 ease-out"
                style={{ 
                  transform: isMobileMenuOpen ? 'rotate(-45deg) translateY(-4px)' : 'rotate(0deg) translateY(0)',
                  bottom: isMobileMenuOpen ? '8px' : '4px'
                }}
              />
            </div>
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

