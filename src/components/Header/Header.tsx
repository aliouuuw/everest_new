/* eslint-disable sort-imports */
import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { FiArrowRight } from 'react-icons/fi';
import { MagneticButton } from '../ui/MagneticButton';

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
  isScrolled?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ name, title, items, isOpen, onOpen, onClose, isScrolled = false }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    onOpen(name);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => onClose(name), 150);
  };

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  const textColorClass = isScrolled ? 'text-[var(--night-80)]' : 'text-white/80';
  const bgHoverClass = isScrolled ? 'hover:bg-[var(--night)]/[0.04]' : 'hover:bg-white/[0.1]';
  const activeColorClass = isScrolled ? 'var(--night)' : 'white';

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`flex items-center gap-1 text-[14px] transition-colors duration-200 font-medium py-1.5 px-2 rounded-full ${bgHoverClass} focus:outline-none`}
        style={{ fontFamily: 'var(--font-primary)', color: isOpen ? activeColorClass : '' }}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className={!isOpen ? textColorClass : ''} style={{ color: isOpen ? activeColorClass : undefined }}>{title}</span>
        <svg
          className={`w-3.5 h-3.5 opacity-50 transition-transform duration-200 ${!isOpen ? textColorClass : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', color: isOpen ? activeColorClass : undefined }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 bg-white/95 backdrop-blur-xl rounded-2xl border border-black/[0.04] shadow-[0_8px_30px_rgba(0,0,0,0.08)] py-2 z-50 overflow-hidden origin-top"
          style={{ animation: 'dropdownEnter 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
        >
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className="block px-4 py-2.5 text-[13.5px] font-medium transition-colors duration-150 hover:bg-black/[0.03] active:bg-black/[0.05] text-[var(--night-80)] hover:text-[var(--night)]"
              style={{ fontFamily: 'var(--font-primary)' }}
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

  // Track scroll with smooth threshold
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openDropdownByName = (dropdownName: string) => {
    if (closeTimeoutRef.current) { clearTimeout(closeTimeoutRef.current); closeTimeoutRef.current = null; }
    setOpenDropdown(dropdownName);
  };

  const closeDropdownByName = (dropdownName: string) => {
    if (closeTimeoutRef.current) { clearTimeout(closeTimeoutRef.current); closeTimeoutRef.current = null; }
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown((current) => (current === dropdownName ? null : current));
    }, 0);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setOpenDropdown(null);
  };

  useEffect(() => {
    const handleClickOutside = () => setOpenDropdown(null);
    if (openDropdown) document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [openDropdown]);

  const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';
  const isOnDashboard = location.pathname === '/dashboard';
  const isInAdminorClientPortal = location.pathname.startsWith('/admin') || location.pathname.startsWith('/dashboard');
  const shouldHideHeader = (isAuthenticated && isOnDashboard) || isInAdminorClientPortal;

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

  const headerClasses = isScrolled
    ? 'py-2.5 bg-white/80 backdrop-blur-2xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] border border-black/[0.04] rounded-full'
    : 'py-3 bg-transparent rounded-full text-white';

  const textColorClass = isScrolled ? 'text-[var(--night)]' : 'text-white';
  const textMutedClass = isScrolled ? 'text-[var(--night-80)]' : 'text-white/80';
  const hoverBgClass = isScrolled ? 'hover:bg-[var(--night)]/[0.04]' : 'hover:bg-white/[0.1]';
  const activeBgClass = isScrolled ? 'bg-[var(--night)]/[0.04]' : 'bg-white/[0.1]';
  const hoverTextClass = isScrolled ? 'hover:text-[var(--night)]' : 'hover:text-white';

  if (shouldHideHeader) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 transition-all duration-300">
      <div
        className={`w-full max-w-[1100px] flex items-center justify-between transition-all duration-500 ease-out px-4 lg:px-6 ${headerClasses}`}
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group shrink-0 focus:outline-none"
          aria-label="Retour à l'accueil Everest Finance"
        >
          <img
            src="/logo-everest.png"
            alt="Everest Finance"
            className={`h-7 w-auto transition-transform duration-300 group-hover:scale-105 ${!isScrolled ? 'brightness-0 invert' : ''}`}
          />
          <div className="hidden sm:flex flex-col">
            <span
              className={`text-[13px] font-semibold leading-tight tracking-tight transition-colors duration-300 ${textColorClass}`}
              style={{ fontFamily: 'var(--font-primary)' }}
            >
              Everest Finance
            </span>
          </div>
        </Link>

        {/* Center Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          <Link
            to="/"
            className={`text-[14px] font-medium py-1.5 px-3 rounded-full transition-colors duration-200 ${textMutedClass} ${hoverTextClass} ${hoverBgClass}`}
            style={{ fontFamily: 'var(--font-primary)' }}
            activeProps={{ className: `${textColorClass} ${activeBgClass}` }}
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
          />

          <Dropdown
            name="services"
            title="Services"
            items={servicesItems}
            isOpen={openDropdown === 'services'}
            onOpen={openDropdownByName}
            onClose={closeDropdownByName}
            isScrolled={isScrolled}
          />

          <Link
            to="/offres"
            className={`text-[14px] font-medium py-1.5 px-3 rounded-full transition-colors duration-200 ${textMutedClass} ${hoverTextClass} ${hoverBgClass}`}
            style={{ fontFamily: 'var(--font-primary)' }}
            activeProps={{ className: `${textColorClass} ${activeBgClass}` }}
          >
            Offres
          </Link>

          <Link
            to="/bourse"
            className={`text-[14px] font-medium py-1.5 px-3 rounded-full transition-colors duration-200 ${textMutedClass} ${hoverTextClass} ${hoverBgClass}`}
            style={{ fontFamily: 'var(--font-primary)' }}
            activeProps={{ className: `${textColorClass} ${activeBgClass}` }}
          >
            Bourse
          </Link>
        </nav>

        {/* CTA */}
        <div className="hidden lg:block shrink-0">
          <MagneticButton
            as={Link}
            to="/auth"
            className={`group inline-flex items-center gap-2 px-5 py-2 rounded-full text-[13px] font-semibold tracking-wide transition-all duration-300 active:scale-[0.97] focus:outline-none ${
              isScrolled 
                ? 'bg-[var(--night)] text-white hover:bg-[var(--mauve)] hover:shadow-lg hover:shadow-[var(--mauve)]/20' 
                : 'bg-white text-[var(--night)] hover:shadow-xl hover:shadow-white/20'
            }`}
            style={{ fontFamily: 'var(--font-primary)' }}
            strength={20}
          >
            Accès Client
            <FiArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </MagneticButton>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className={`p-2.5 -mr-1 rounded-full transition-colors duration-200 focus:outline-none ${
              isScrolled ? 'text-[var(--night)] hover:bg-black/[0.04]' : 'text-white hover:bg-white/[0.1]'
            }`}
            aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMobileMenuOpen}
            style={{ minHeight: '44px', minWidth: '44px' }}
          >
            <div className="relative w-5 h-4 flex flex-col justify-between">
              <span
                className="block h-[1.5px] w-5 bg-current rounded-full transition-all duration-300 origin-center"
                style={{
                  transform: isMobileMenuOpen ? 'translateY(5px) rotate(45deg)' : 'none',
                }}
              />
              <span
                className="block h-[1.5px] w-5 bg-current rounded-full transition-all duration-300"
                style={{ opacity: isMobileMenuOpen ? 0 : 1, transform: isMobileMenuOpen ? 'scaleX(0)' : 'scaleX(1)' }}
              />
              <span
                className="block h-[1.5px] w-5 bg-current rounded-full transition-all duration-300 origin-center"
                style={{
                  transform: isMobileMenuOpen ? 'translateY(-5px) rotate(-45deg)' : 'none',
                }}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden absolute top-full left-0 right-0 mx-4 mt-3 bg-white/95 backdrop-blur-2xl rounded-3xl border border-black/[0.04] shadow-[0_8px_30px_rgba(0,0,0,0.12)] py-5 z-50 overflow-hidden origin-top"
          style={{ animation: 'menuSlideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
        >
          <div className="px-5 space-y-1">
            <Link
              to="/"
              className="block text-[15px] font-medium py-3 px-4 rounded-2xl transition-colors text-[var(--night)] hover:bg-black/[0.03] active:bg-black/[0.06]"
              style={{ fontFamily: 'var(--font-primary)' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Accueil
            </Link>

            <div className="pt-3 pb-2">
              <div className="text-[11px] tracking-[0.15em] uppercase px-4 pb-3 font-semibold text-[var(--night-60)]" style={{ fontFamily: 'var(--font-primary)' }}>
                Société
              </div>
              {societeItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  className="block text-[15px] font-medium py-2.5 px-4 rounded-xl transition-colors text-[var(--night-80)] hover:text-[var(--night)] hover:bg-black/[0.03] active:bg-black/[0.06]"
                  style={{ fontFamily: 'var(--font-primary)' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="pt-3 pb-2">
              <div className="text-[11px] tracking-[0.15em] uppercase px-4 pb-3 font-semibold text-[var(--night-60)]" style={{ fontFamily: 'var(--font-primary)' }}>
                Services
              </div>
              {servicesItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  className="block text-[15px] font-medium py-2.5 px-4 rounded-xl transition-colors text-[var(--night-80)] hover:text-[var(--night)] hover:bg-black/[0.03] active:bg-black/[0.06]"
                  style={{ fontFamily: 'var(--font-primary)' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <Link
              to="/offres"
              className="block text-[15px] font-medium py-3 px-4 rounded-2xl transition-colors text-[var(--night)] hover:bg-black/[0.03] active:bg-black/[0.06]"
              style={{ fontFamily: 'var(--font-primary)' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Offres
            </Link>

            <Link
              to="/bourse"
              className="block text-[15px] font-medium py-3 px-4 rounded-2xl transition-colors text-[var(--night)] hover:bg-black/[0.03] active:bg-black/[0.06]"
              style={{ fontFamily: 'var(--font-primary)' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Bourse
            </Link>

            <div className="pt-4 mt-3 border-t border-black/[0.06] px-1">
              <Link
                to="/auth"
                className="flex items-center justify-center gap-2 py-3.5 bg-[var(--night)] text-white rounded-2xl text-[14px] font-semibold tracking-wide transition-all duration-300 hover:bg-[var(--mauve)] hover:shadow-lg hover:shadow-[var(--mauve)]/20 active:scale-[0.98]"
                style={{ fontFamily: 'var(--font-primary)' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Accès Client
                <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

