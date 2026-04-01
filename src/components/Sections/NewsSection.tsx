import React, { useRef, useState } from "react";
import { useReveal } from "../Hooks/useReveal";
import { FiArrowRight } from "react-icons/fi";

type NewsArticle = {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  imageUrl: string;
  href: string;
};

const MOCK_NEWS: NewsArticle[] = [
  {
    title: "Le marché financier régional maintient sa dynamique de croissance",
    excerpt: "Analyse des tendances récentes du marché financier de l'UEMOA et perspectives pour le prochain trimestre.",
    category: "Marchés",
    date: "2023-10-15",
    imageUrl: "/bg-mc.jpg",
    href: "/actualites/marche-financier-croissance"
  },
  {
    title: "Everest Finance lance de nouveaux produits d'investissement",
    excerpt: "Découvrez notre nouvelle gamme de produits structurés adaptés aux besoins spécifiques des investisseurs institutionnels.",
    category: "Entreprise",
    date: "2023-10-02",
    imageUrl: "/background-sol.jpg",
    href: "/actualites/nouveaux-produits"
  },
  {
    title: "Comment optimiser la gestion de trésorerie en période d'inflation",
    excerpt: "Stratégies et conseils pratiques pour les entreprises cherchant à préserver la valeur de leur trésorerie.",
    category: "Conseil",
    date: "2023-09-20",
    imageUrl: "/bg-mc.jpg",
    href: "/actualites/optimiser-tresorerie"
  }
];

export const NewsSection: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>();
  const listRef = useReveal<HTMLDivElement>();

  // Magnetic button state
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [buttonMousePosition, setButtonMousePosition] = useState({ x: 0, y: 0 });

  const handleButtonMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setButtonMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      ref={sectionRef}
      className="reveal relative"
      style={{ background: 'var(--summit-ivory)', paddingTop: 'var(--section-gap)', paddingBottom: 'var(--section-gap)' }}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-16 lg:px-24">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-[11px] tracking-[0.08em] uppercase font-medium"
            style={{
              fontFamily: 'var(--font-primary)',
              color: 'var(--mauve)',
              background: 'var(--mauve-05)',
              border: '1px solid var(--mauve-border)',
            }}
          >
            Actualités
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-primary)',
              fontWeight: 800,
              fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: 'var(--night)',
            }}
          >
            Dernières{' '}
            <span style={{ color: 'var(--mauve)' }}>informations.</span>
          </h2>
        </div>

        {/* Content Grid */}
        <div ref={listRef} className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {MOCK_NEWS.map((article, i) => (
            <a
              key={i}
              href={article.href}
              className="group flex flex-col h-full overflow-hidden rounded-2xl transition-all duration-500"
              style={{
                border: '1px solid var(--command-border)',
                background: 'var(--pure-white)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--mauve-border)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(70,29,76,0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--command-border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={article.imageUrl} 
                  alt={article.title}
                  className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ filter: 'saturate(0.9) contrast(1.02)' }}
                />
                <div className="absolute top-4 left-4 z-10">
                  <span
                    className="text-[10px] tracking-[0.06em] uppercase px-2.5 py-1 rounded-full"
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontWeight: 500,
                      color: 'var(--pure-white)',
                      background: 'var(--mauve)',
                    }}
                  >
                    {article.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6 md:p-7 flex flex-col flex-grow">
                <span
                  className="text-[10px] mb-3 block"
                  style={{ fontFamily: 'var(--font-primary)', fontWeight: 400, color: 'var(--night-60)' }}
                >
                  {new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
                
                <h3
                  className="mb-3 group-hover:text-[var(--mauve)] transition-colors duration-300"
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontWeight: 600,
                    fontSize: '1.15rem',
                    lineHeight: 1.3,
                    color: 'var(--night)',
                  }}
                >
                  {article.title}
                </h3>
                
                <p
                  className="mb-6 flex-grow"
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontWeight: 300,
                    fontSize: '0.85rem',
                    lineHeight: 1.7,
                    color: 'var(--night-60)',
                  }}
                >
                  {article.excerpt}
                </p>
                
                <span
                  className="inline-flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase group-hover:text-[var(--mauve)] transition-colors duration-300 mt-auto"
                  style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--night-60)' }}
                >
                  Lire la suite
                  <span className="inline-block w-4 h-[1px] bg-current group-hover:w-7 transition-all duration-500" />
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* View all link */}
        <div className="mt-14 flex justify-center">
          <a
            ref={buttonRef}
            href="/actualites"
            className="group relative overflow-hidden inline-flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-400"
            style={{
              fontFamily: 'var(--font-primary)',
              fontWeight: 500,
              fontSize: '0.875rem',
              color: 'var(--mauve)',
              border: '1px solid var(--mauve-border)',
              transformStyle: 'preserve-3d',
            }}
            onMouseMove={handleButtonMouseMove}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--mauve)';
              e.currentTarget.style.color = 'var(--pure-white)';
              e.currentTarget.style.borderColor = 'var(--mauve)';
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(70,29,76,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--mauve)';
              e.currentTarget.style.borderColor = 'var(--mauve-border)';
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Interactive Shine Effect */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 mix-blend-overlay"
              style={{
                background: `radial-gradient(100px circle at ${buttonMousePosition.x}px ${buttonMousePosition.y}px, rgba(255,255,255,0.4), transparent 50%)`,
              }}
            />
            <span className="relative z-10">Voir toutes les actualités</span>
            <FiArrowRight className="relative z-10 text-sm group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
};
