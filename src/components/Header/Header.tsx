/* eslint-disable sort-imports */
import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { SITE_NAV, type NavItem } from '../siteNav';
import './nav-ledger.css';

/** Same outward arrow as the home. Marks the account link, which leaves this site. */
const OutArrow = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" className="h-3.5 w-3.5 shrink-0">
    <path d="M6 18 18 6M8 6h10v10" />
  </svg>
);

/** `page` on the exact entry, `true` on the parent of the current page (DESIGN-PLAN 1.4). */
const currentState = (to: string, pathname: string): 'page' | 'true' | undefined => {
  const path = pathname.replace(/\/$/, '') || '/';
  if (path === to) return 'page';
  return to !== '/' && path.startsWith(`${to}/`) ? 'true' : undefined;
};

const navLinkClass = (current: string | undefined, open = false) =>
  `whitespace-nowrap text-[13px] font-bold transition-colors duration-300 ${
    current || open ? 'text-[var(--or-clair)]' : 'text-white/75 hover:text-white'
  }`;

/** The bar says Contact. « Devenir client » is the action beside it, not part of the same label. */
const barLabel = (item: NavItem) => (item.to === '/contact' ? 'Contact' : item.label);

const HOUSE_TOS = ['/la-societe', '/analyses', '/actualites'] as const;

const houseItems = () => HOUSE_TOS.map((to) => SITE_NAV.find((item) => item.to === to)!);

/** Closed label is the current page in the group, otherwise the first official label. The button does not navigate. */
const houseLabel = (pathname: string) => {
  const active = houseItems().find((item) => currentState(item.to, pathname));
  return active?.label ?? houseItems()[0].label;
};

interface DropdownProps {
  name: string;
  title: string;
  titleTo?: string;
  items: Array<NavItem>;
  pathname: string;
  isOpen: boolean;
  onOpen: (name: string) => void;
  onClose: (name: string) => void;
  onDismiss: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({ name, title, titleTo, items, pathname, isOpen, onOpen, onClose, onDismiss }) => {
  const own = titleTo ? currentState(titleTo, pathname) : undefined;
  const childCurrent = items.some((item) => !item.hash && currentState(item.to, pathname));
  const titleCurrent = own ?? (childCurrent ? 'true' : undefined);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const focusMenu = useRef(false);
  const suppressOpen = useRef(false);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    onOpen(name);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      if (dropdownRef.current?.contains(document.activeElement)) return;
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

  useEffect(() => {
    if (!isOpen || !focusMenu.current) return;
    focusMenu.current = false;
    dropdownRef.current?.querySelector<HTMLElement>('[role="menu"] a')?.focus();
  }, [isOpen]);

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onBlur={(event) => {
        const next = event.relatedTarget;
        if (next instanceof Node && dropdownRef.current?.contains(next)) return;
        onDismiss();
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          const trigger = linkRef.current ?? buttonRef.current;
          onDismiss();
          if (trigger && document.activeElement !== trigger) {
            suppressOpen.current = true;
            trigger.focus();
          }
        }
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          const first = dropdownRef.current?.querySelector<HTMLElement>('[role="menu"] a');
          if (first) {
            first.focus();
            return;
          }
          focusMenu.current = true;
          onOpen(name);
        }
      }}
    >
      {titleTo ? (
        <Link
          ref={linkRef}
          to={titleTo}
          className={`group flex items-center gap-1 ${navLinkClass(titleCurrent, isOpen)}`}
          style={{ fontFamily: 'var(--font-primary)' }}
          aria-current={titleCurrent}
          aria-expanded={isOpen}
          aria-haspopup="menu"
          onFocus={() => {
            if (suppressOpen.current) {
              suppressOpen.current = false;
              return;
            }
            onOpen(name);
          }}
        >
          {title}
          <svg
            aria-hidden="true"
            className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </Link>
      ) : (
        <button
          ref={buttonRef}
          type="button"
          className={`group flex items-center gap-1 border-0 bg-transparent p-0 ${navLinkClass(titleCurrent, isOpen)}`}
          style={{ fontFamily: 'var(--font-primary)' }}
          aria-current={titleCurrent}
          aria-expanded={isOpen}
          aria-haspopup="menu"
          onClick={() => (isOpen ? onDismiss() : onOpen(name))}
          onFocus={() => {
            if (suppressOpen.current) {
              suppressOpen.current = false;
              return;
            }
            onOpen(name);
          }}
        >
          {title}
          <svg
            aria-hidden="true"
            className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}

      {isOpen && (
        <div className="absolute top-full left-0 z-50 pt-2">
          <div role="menu" className="nav-ledger w-max min-w-60 bg-[var(--summit-ivory)]">
            {items.map((item) => {
              const current = item.hash ? undefined : currentState(item.to, pathname);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  {...(item.hash ? { hash: item.hash } : {})}
                  role="menuitem"
                  aria-current={current}
                  className={`nav-ledger-item${current ? ' is-current' : ''}`}
                >
                  <span className="nav-ledger-mark" aria-hidden="true" />
                  <span className="nav-ledger-label">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export const Header: React.FC = () => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
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

  const dismissDropdown = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenDropdown(null);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setOpenDropdown(null);
    setMobileGroup(null);
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

  useEffect(() => {
    setOpenDropdown(null);
    setMobileGroup(null);
  }, [location.pathname]);

  // Close all dropdowns when clicking outside or when another dropdown opens
  useEffect(() => {
    if (!openDropdown) return;
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target;
      const menu = document.querySelector('header nav [role="menu"]');
      const dropdown = menu?.parentElement?.parentElement;
      if (target instanceof Node && dropdown?.contains(target)) return;
      setOpenDropdown(null);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
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

  const quietLinkClass =
    'inline-flex h-11 shrink-0 items-center gap-1.5 whitespace-nowrap text-[13px] font-semibold leading-none text-white/80 transition-colors hover:text-white';

  return (
    <header className={`fixed top-[var(--brvm-ticker-height)] left-0 right-0 z-[55] transition-all duration-500 ${isMobileMenuOpen ? 'bg-[var(--everest-green)]' : headerBg}`}>
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 md:px-16 lg:px-24 xl:px-6 2xl:px-10 py-3 xl:py-4">
        {/* Logo only — larger */}
        <Link to="/" className="flex min-h-11 shrink-0 items-center transition-opacity hover:opacity-85">
          <img src="/logo-everest.png" alt="EVEREST Finance" className="h-12 w-auto sm:h-12 xl:h-14" />
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-x-4 xl:flex 2xl:gap-x-5">
          {SITE_NAV.map((item) => {
            if (HOUSE_TOS.includes(item.to as (typeof HOUSE_TOS)[number]) && item.to !== '/la-societe') return null;
            if (item.to === '/la-societe') {
              return (
                <Dropdown
                  key="house"
                  name="house"
                  title={houseLabel(location.pathname)}
                  items={houseItems()}
                  pathname={location.pathname}
                  isOpen={openDropdown === 'house'}
                  onOpen={openDropdownByName}
                  onClose={closeDropdownByName}
                  onDismiss={dismissDropdown}
                />
              );
            }
            return item.children ? (
              <Dropdown
                key={item.to}
                name={item.to}
                title={barLabel(item)}
                titleTo={item.to}
                items={item.children}
                pathname={location.pathname}
                isOpen={openDropdown === item.to}
                onOpen={openDropdownByName}
                onClose={closeDropdownByName}
                onDismiss={dismissDropdown}
              />
            ) : (
              <Link
                key={item.to}
                to={item.to}
                aria-current={currentState(item.to, location.pathname)}
                className={navLinkClass(currentState(item.to, location.pathname))}
                style={{ fontFamily: 'var(--font-primary)' }}
              >
                {barLabel(item)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 xl:flex">
          <a
            href="https://everest-account-opening.vercel.app/new-home"
            target="_blank"
            rel="noopener noreferrer"
            className={quietLinkClass}
          >
            Devenir client
            <OutArrow />
          </a>
          <Link to="/auth" className={quietLinkClass}>
            Accès Client
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
            {SITE_NAV.map((item) => {
              if (HOUSE_TOS.includes(item.to as (typeof HOUSE_TOS)[number]) && item.to !== '/la-societe') return null;
              if (item.to === '/la-societe') {
                const groupOpen = mobileGroup === 'house';
                const label = houseLabel(location.pathname);
                return (
                  <div key="house">
                    <button
                      type="button"
                      className={`flex min-h-11 w-full items-center justify-between text-sm touch-manipulation ${
                        houseItems().some((entry) => currentState(entry.to, location.pathname))
                          ? 'font-semibold text-[var(--or-clair)]'
                          : 'text-white/75'
                      }`}
                      style={{ fontFamily: 'var(--font-primary)' }}
                      aria-expanded={groupOpen}
                      onClick={() => setMobileGroup((current) => (current === 'house' ? null : 'house'))}
                    >
                      {label}
                      <svg
                        className={`h-3.5 w-3.5 transition-transform ${groupOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {groupOpen && (
                      <div className="mt-1 space-y-1 border-l border-white/[0.15] pl-3">
                        {houseItems().map((child) => (
                          <Link
                            key={child.to}
                            to={child.to}
                            aria-current={currentState(child.to, location.pathname)}
                            className={`flex min-h-11 items-center text-sm transition-colors touch-manipulation ${
                              currentState(child.to, location.pathname)
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
                );
              }
              const groupId = item.to.replace(/^\//, '') || 'home';
              const groupOpen = mobileGroup === item.to;
              const children = item.children ?? [];
              return (
                <div key={item.to} className="relative">
                  <Link
                    id={`nav-${groupId}`}
                    to={item.to}
                    aria-current={currentState(item.to, location.pathname)}
                    className={`flex min-h-11 items-center text-sm transition-colors touch-manipulation ${
                      children.length > 0 ? 'pr-12' : ''
                    } ${
                      currentState(item.to, location.pathname) ? 'font-semibold text-[var(--or-clair)]' : 'text-white/75 hover:text-white'
                    }`}
                    style={{ fontFamily: 'var(--font-primary)' }}
                    onClick={onMenuNavigate}
                  >
                    {barLabel(item)}
                  </Link>
                  {children.length > 0 && (
                    <button
                      type="button"
                      className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center text-white/70"
                      aria-expanded={groupOpen}
                      aria-controls={`nav-group-${groupId}`}
                      aria-labelledby={`nav-${groupId}`}
                      onClick={() => setMobileGroup((current) => (current === item.to ? null : item.to))}
                    >
                      <svg
                        className={`h-3.5 w-3.5 transition-transform ${groupOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                  {children.length > 0 && groupOpen && (
                    <div id={`nav-group-${groupId}`} className="mt-1 space-y-1 border-l border-white/[0.15] pl-3">
                      {children.map((child) => (
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
              );
            })}

            <div className="flex flex-col gap-1 border-t border-white/[0.12] pt-4">
              <a
                href="https://everest-account-opening.vercel.app/new-home"
                target="_blank"
                rel="noopener noreferrer"
                className={`${quietLinkClass} w-full`}
                onClick={onMenuNavigate}
              >
                Devenir client
                <OutArrow />
              </a>
              <Link to="/auth" className={`${quietLinkClass} w-full`} onClick={onMenuNavigate}>
                Accès Client
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
