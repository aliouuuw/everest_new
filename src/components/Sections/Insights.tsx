import { useMemo, useState, useRef } from "react";
import { useQuery } from "convex/react";
import { useReveal } from "../Hooks/useReveal";
import { api } from "../../../convex/_generated/api";
import { FiArrowRight } from "react-icons/fi";
import { ConvexSafeBoundary } from "../ConvexSafeBoundary";

type PublicationCategory = "revues-hebdo" | "revues-mensuelles" | "teaser-dividende" | "marches" | "analyses";

type PublicationItem = {
  title: string;
  desc: string;
  href: string;
  category: PublicationCategory;
  date: string;
};

const ALL_LABEL = "tout" as const;
const CATEGORY_LABELS: Record<PublicationCategory | typeof ALL_LABEL, string> = {
  [ALL_LABEL]: "Tout",
  "revues-hebdo": "Revues hebdo",
  "revues-mensuelles": "Revues mensuelles",
  "teaser-dividende": "Dividendes",
  "marches": "Marchés",
  "analyses": "Analyses",
};

// Exported wrapper that gracefully handles missing Convex provider
export const Insights: React.FC = () => (
  <ConvexSafeBoundary>
    <InsightsInner />
  </ConvexSafeBoundary>
);

const InsightsInner: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>();
  const listRef = useReveal<HTMLDivElement>();

  const [activeCategory, setActiveCategory] = useState<PublicationCategory | typeof ALL_LABEL>(ALL_LABEL);

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

  const publications = useQuery(api.publications.getPublications, {
    limit: 3,
    status: 'published'
  });

  const items: Array<PublicationItem> = useMemo(() => {
    if (!publications?.page) return [];
    const sortedPublications = [...publications.page].sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return (b.createdAt || 0) - (a.createdAt || 0);
    });
    return sortedPublications.map(pub => ({
      title: pub.title,
      desc: pub.description,
      href: `/publications/${pub.slug}`,
      category: pub.category as PublicationCategory,
      date: new Date(pub.createdAt || 0).toISOString().split('T')[0]
    }));
  }, [publications]);

  const categories: Array<PublicationCategory | typeof ALL_LABEL> = useMemo(
    () => [ALL_LABEL, "revues-hebdo", "revues-mensuelles", "teaser-dividende", "marches", "analyses"],
    []
  );

  const filtered = useMemo(() => {
    const sorted = [...items].sort((a, b) => (a.date < b.date ? 1 : -1));
    if (activeCategory === ALL_LABEL) return sorted;
    return sorted.filter((it) => it.category === activeCategory);
  }, [items, activeCategory]);

  return (
    <section
      ref={sectionRef}
      className="reveal relative"
      style={{ background: 'var(--summit-ivory)', paddingTop: 'var(--section-gap)', paddingBottom: 'var(--section-gap)' }}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-16 lg:px-24">

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
          <div className="max-w-xl">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-[11px] tracking-[0.08em] uppercase font-medium"
              style={{
                fontFamily: 'var(--font-primary)',
                color: 'var(--pure-white)',
                background: 'var(--mauve)',
              }}
            >
              Recherche & publications
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
              Nos analyses{' '}
              <span style={{ color: 'var(--mauve)' }}>sur les marchés.</span>
            </h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className="px-3.5 py-2 transition-all duration-300 cursor-pointer rounded-full hover:scale-105"
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontWeight: isActive ? 500 : 400,
                    fontSize: '0.75rem',
                    color: isActive ? 'var(--pure-white)' : 'var(--night-60)',
                    background: isActive ? 'var(--mauve)' : 'transparent',
                    border: isActive ? '1px solid var(--mauve)' : '1px solid var(--command-border)',
                  }}
                  aria-pressed={isActive}
                >
                  {CATEGORY_LABELS[cat]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        {publications === undefined ? (
          <div className="text-center py-20">
            <div
              className="w-7 h-7 border border-[var(--mauve)]/20 border-t-[var(--mauve)]/60 rounded-full animate-spin mx-auto mb-4"
            />
            <p style={{ fontFamily: 'var(--font-primary)', fontWeight: 300, fontSize: '0.875rem', color: 'var(--night-60)' }}>
              Chargement des publications…
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p style={{ fontFamily: 'var(--font-primary)', fontWeight: 300, fontSize: '0.95rem', color: 'var(--night-60)' }}>
              Aucune publication ne correspond aux critères sélectionnés.
            </p>
          </div>
        ) : (
          <div ref={listRef} className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-6">
            {filtered.map((it) => (
              <a
                key={`${it.title}-${it.date}`}
                href={it.href}
                className="group flex flex-col p-7 rounded-2xl transition-all duration-500"
                style={{
                  background: 'var(--pure-white)',
                  border: '1px solid var(--canvas-border)',
                  borderLeft: '3px solid var(--mauve)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--canvas-border-hover)';
                  e.currentTarget.style.borderLeftColor = 'var(--mauve)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(70,29,76,0.08)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--canvas-border)';
                  e.currentTarget.style.borderLeftColor = 'var(--mauve)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Category + date */}
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="text-[10px] tracking-[0.06em] uppercase px-2.5 py-1 rounded-full"
                    style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--pure-white)', background: 'var(--mauve)' }}
                  >
                    {CATEGORY_LABELS[it.category]}
                  </span>
                  <span
                    className="text-[11px]"
                    style={{ fontFamily: 'var(--font-primary)', fontWeight: 400, color: 'var(--night-60)' }}
                  >
                    {new Date(it.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>

                {/* Title */}
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
                  {it.title}
                </h3>

                {/* Description */}
                <p
                  className="mb-6 flex-grow"
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontWeight: 400,
                    fontSize: '0.875rem',
                    lineHeight: 1.7,
                    color: 'var(--night-60)',
                  }}
                >
                  {it.desc}
                </p>

                {/* Read more */}
                <span
                  className="inline-flex items-center gap-2 group-hover:gap-3 transition-all duration-300"
                  style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, fontSize: '0.85rem', color: 'var(--mauve)' }}
                >
                  Lire
                  <FiArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </a>
            ))}
          </div>
        )}

        {/* View all link */}
        <div className="mt-14 flex justify-center">
          <a
            ref={buttonRef}
            href="/publications"
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
            <span className="relative z-10">Voir toutes les publications</span>
            <FiArrowRight className="relative z-10 text-sm group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
};


