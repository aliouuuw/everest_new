import React, { useEffect, useState } from 'react';
import { FaBars, FaTimes, FaMountain } from 'react-icons/fa';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { label: 'Services', href: '#services' },
    { label: 'À Propos', href: '#about' },
    { label: 'Marchés', href: '#markets' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[var(--pure-white)]/95 border-b border-[var(--line-soft)]/80 backdrop-blur' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 gradient-gold rounded-xl">
              <FaMountain className="text-night text-lg lg:text-xl" />
            </div>
            <span className="hidden sm:inline-block text-2xl lg:text-3xl brand-heading text-night">Everest Finance</span>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-night hover:text-[var(--gold-metallic)] font-medium tracking-wide transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--gold-metallic)] transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-night hover:text-[var(--gold-metallic)] transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        <div
          className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen ? 'max-h-80 opacity-100 pb-6' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="pt-4 pb-2 space-y-3">
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-night hover:text-[var(--gold-metallic)] hover:bg-[var(--gold-metallic-20)] rounded-lg font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;


