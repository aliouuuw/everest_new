/* eslint-disable sort-imports */
import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { SITE_NAV, type NavItem } from '../siteNav';
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

/** `page` on the exact entry, `true` on the parent of the current page (DESIGN-PLAN 1.4). */
const currentState = (to: string, pathname: string): 'page' | 'true' | undefined => {
  const path = pathname.replace(/\/$/, '') || '/';
  if (path === to) return 'page';
  return to !== '/' && path.startsWith(`${to}/`) ? 'true' : undefined;
};

const navLinkClass = (current: string | undefined) =>
  `whitespace-nowrap text-[13px] font-bold transition-colors duration-300 ${
    current ? 'text-[var(--or-clair)]' : 'text-white/75 hover:text-white'
  }`;

interface DropdownProps {
  name: string;
  title: string;
  titleTo?: string;
  items: Array<NavItem>;
  pathname: string;
  isOpen: boolean;
  onOpen: (name: string) => void;
  onClose: (name: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ name, title, titleTo, items, pathname, isOpen, onOpen, onClose }) => {
  const titleCurrent = titleTo ? currentState(titleTo, pathname) : undefined;
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
          className={`group flex items-center gap-1 ${navLinkClass(titleCurrent)}`}
          style={{ fontFamily: 'var(--font-primary)' }}
          aria-current={titleCurrent}
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
          className={`group flex items-center gap-1 ${navLinkClass(undefined)}`}
          style={{ fontFamily: 'var(--font-primary)' }}
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
        <div className="absolute top-full left-0 mt-4 w-72 bg-[var(--pure-white)] border border-white/[0.15] rounded-2xl py-3 z-50 shadow-2xl shadow-black/40 backdrop-blur-sm">
          {items.map((item, index) => {
            const current = item.hash ? undefined : currentState(item.to, pathname);
            return (
              <Link
                key={index}
                to={item.to}
                {...(item.hash ? { hash: item.hash } : {})}
                aria-current={current}
                className={`block px-6 py-3 text-[14px] font-bold transition-colors duration-200 ${
                  current
                    ? 'bg-[var(--summit-ivory)] text-[var(--everest-green)]'
                    : 'text-[var(--night-80)] hover:bg-[var(--summit-ivory)] hover:text-[var(--everest-green)]'
                }`}
                style={{ fontFamily: 'var(--font-primary)', }}
              >
                {item.label}
              </Link>
            );
          })}
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

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = 'hidden';
    return () => {
      root.style.overflow = prev;
    };
  }, [isMobileMenuOpen]);

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

  // Closing the drawer unmounts the link and cancels the click. A new page resets the menu.
  const onMenuNavigate = (e: { currentTarget: HTMLAnchorElement }) => {
    const url = new URL(e.currentTarget.href, window.location.href);
    const samePage = url.origin === window.location.origin && url.pathname === window.location.pathname;
    if (samePage || url.origin !== window.location.origin) setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if (!isMobileMenuOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [isMobileMenuOpen])

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
  const isAuthenticated =
    typeof sessionStorage !== 'undefined' && sessionStorage.getItem('isAuthenticated') === 'true';
  const isOnDashboard = location.pathname === '/dashboard';
  
  // Check if user is in admin portal
  const isInAdminorClientPortal = location.pathname.startsWith('/admin') || location.pathname.startsWith('/dashboard');

  // Pages with light backgrounds need immediate dark backdrop for nav contrast
  const lightBackgroundPaths = ['/test'];
  const isLightBackgroundPage = lightBackgroundPaths.some(path => location.pathname.startsWith(path));

  // Force "scrolled" header appearance on selected routes from first paint
  const forceScrolledStylePaths = [
    '/la-societe',
    '/analyses',
    '/actualites',
    '/opportunites',
    '/sama-naffa',
    '/contact',
    '/auth',
    '/faq',
  ];
  const isForcedScrolledStyle = forceScrolledStylePaths.some((path) =>
    location.pathname.startsWith(path),
  );

  // Hide header if authenticated and on dashboard, or if in admin portal
  const shouldHideHeader = (isAuthenticated && isOnDashboard) || isInAdminorClientPortal;

  // Return null without violating hooks rules
  if (shouldHideHeader) {
    return null;
  }

  // Header background: solid mauve on inner pages; translucent only on home after scroll
  const headerBg = isLightBackgroundPage || isForcedScrolledStyle
    ? 'bg-[var(--everest-green)]'
    : isScrolled
      ? 'bg-[var(--everest-green)]/95 backdrop-blur-md'
      : '';

  const ctaShellClass =
    'inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full border box-border px-4 xl:px-5 whitespace-nowrap transition-all duration-300';
  const ctaLabelClass =
    'font-primary text-[10px] 2xl:text-[11px] font-semibold tracking-[0.1em] 2xl:tracking-[0.15em] uppercase leading-none';

  return (
    <header className={`fixed top-[var(--brvm-ticker-height)] left-0 right-0 z-[55] transition-all duration-500 ${isMobileMenuOpen ? 'bg-[var(--everest-green)]' : headerBg}`}>
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 md:px-16 lg:px-24 xl:px-6 2xl:px-10 py-3 xl:py-4">
        {/* Logo only — larger */}
        <Link to="/" className="flex min-h-11 shrink-0 items-center transition-opacity hover:opacity-85">
          <img src="/logo-everest.png" alt="EVEREST Finance" className="h-12 w-auto sm:h-12 xl:h-14" />
        </Link>

        {/* Navigation — xl+ only; lg is too tight for nav + dual CTAs */}
        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-3 xl:flex 2xl:gap-4">
          {SITE_NAV.map((item) =>
            item.children ? (
              <Dropdown
                key={item.to}
                name={item.to}
                title={item.label}
                titleTo={item.to}
                items={item.children}
                pathname={location.pathname}
                isOpen={openDropdown === item.to}
                onOpen={openDropdownByName}
                onClose={closeDropdownByName}
              />
            ) : (
              <Link
                key={item.to}
                to={item.to}
                aria-current={currentState(item.to, location.pathname)}
                className={navLinkClass(currentState(item.to, location.pathname))}
                style={{ fontFamily: 'var(--font-primary)' }}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        {/* CTA */}
        <div className="hidden shrink-0 items-center gap-2 xl:flex 2xl:gap-3">
          <a
            href="https://everest-account-opening.vercel.app/new-home"
            target="_blank"
            rel="noopener noreferrer"
            className={`${ctaShellClass} border-transparent bg-[var(--jaune-or)] hover:bg-[var(--or-clair)]`}
          >
            <span className={`${ctaLabelClass} text-[var(--everest-green)]`}>
              Ouvrir un compte
            </span>
          </a>
          <Link
            to="/auth"
            className={`${ctaShellClass} group border-white/30 bg-transparent hover:border-white/70 hover:bg-white/10`}
          >
            <FingerprintIcon className="h-3.5 w-3.5 shrink-0 text-white/70 transition-transform duration-300 group-hover:scale-110 group-hover:text-white" />
            <span className={`${ctaLabelClass} text-white/75`}>
              Accès Client
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="xl:hidden">
          <button
            onClick={toggleMobileMenu}
            className="flex h-11 w-11 items-center justify-center text-white/70 transition-colors hover:text-white touch-manipulation"
            aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Menu'}
            aria-expanded={isMobileMenuOpen}
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
        <div
          data-lenis-prevent
          className="fixed inset-x-0 z-[55] overflow-y-auto overscroll-contain border-t border-white/[0.12] bg-[var(--everest-green)] py-6 xl:hidden [touch-action:pan-y] [-webkit-overflow-scrolling:touch]"
          style={{
            top: 'calc(var(--brvm-ticker-height) + var(--site-header-height))',
            height: 'calc(100dvh - var(--brvm-ticker-height) - var(--site-header-height))',
          }}
        >
          <div className="space-y-2 px-6 pb-[max(2rem,env(safe-area-inset-bottom))]">
            {SITE_NAV.map((item) => (
              <div key={item.to}>
                <Link
                  to={item.to}
                  aria-current={currentState(item.to, location.pathname)}
                  className={`flex min-h-11 items-center text-sm transition-colors touch-manipulation ${
                    currentState(item.to, location.pathname) ? 'font-semibold text-[var(--or-clair)]' : 'text-white/75 hover:text-white'
                  }`}
                  style={{ fontFamily: 'var(--font-primary)' }}
                  onClick={onMenuNavigate}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="mt-1 space-y-1 pl-3 border-l border-white/[0.15]">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.to}
                        {...(child.hash ? { hash: child.hash } : {})}
                        aria-current={child.hash ? undefined : currentState(child.to, location.pathname)}
                        className={`flex min-h-11 items-center text-sm transition-colors touch-manipulation ${
                          !child.hash && currentState(child.to, location.pathname)
                            ? 'font-semibold text-[var(--or-clair)]'
                            : 'font-light text-white/60 hover:text-white'
                        }`}
                        style={{ fontFamily: 'var(--font-primary)' }}
                        onClick={onMenuNavigate}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="pt-4 border-t border-white/[0.12] flex flex-col gap-3">
              <a
                href="https://everest-account-opening.vercel.app/new-home"
                target="_blank"
                rel="noopener noreferrer"
                className={`${ctaShellClass} group w-full border-transparent bg-[var(--jaune-or)] hover:bg-[var(--or-clair)]`}
                onClick={onMenuNavigate}
              >
                <span className={`${ctaLabelClass} text-[var(--everest-green)]`}>
                  Ouvrir un compte
                </span>
              </a>
              <Link
                to="/auth"
                className={`${ctaShellClass} group w-full border-white/30 bg-transparent hover:border-white/70 hover:bg-white/10`}
                onClick={onMenuNavigate}
              >
                <FingerprintIcon className="h-3.5 w-3.5 shrink-0 text-white/70" />
                <span className={`${ctaLabelClass} text-white/75`}>
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
