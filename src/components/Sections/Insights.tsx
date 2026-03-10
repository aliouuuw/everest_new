import { useMemo, useState } from "react";
import { useQuery } from "convex/react";
import { useReveal } from "../Hooks/useReveal";
import { api } from "../../../convex/_generated/api";
import { FiArrowRight } from "react-icons/fi";

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

export const Insights: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>();
  const listRef = useReveal<HTMLDivElement>();

  const [activeCategory, setActiveCategory] = useState<PublicationCategory | typeof ALL_LABEL>(ALL_LABEL);

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
              className="inline-flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase mb-6"
              style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--mauve)' }}
            >
              <span className="inline-block w-5 h-[1px]" style={{ background: 'var(--mauve)', opacity: 0.4 }} />
              Publications
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 300,
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.015em',
                color: 'var(--night)',
              }}
            >
              Restez informé{' '}
              <em style={{ fontWeight: 300, fontStyle: 'italic', color: 'var(--mauve)' }}>
                des marchés.
              </em>
            </h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-1">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className="px-3.5 py-2 transition-all duration-300 cursor-pointer"
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontWeight: isActive ? 500 : 400,
                    fontSize: '0.7rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase' as const,
                    color: isActive ? 'var(--mauve)' : 'var(--night-60)',
                    background: isActive ? 'var(--summit-haze)' : 'transparent',
                    borderRadius: '4px',
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
          <div ref={listRef} className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-0">
            {filtered.map((it, i) => (
              <a
                key={`${it.title}-${it.date}`}
                href={it.href}
                className="group flex flex-col transition-colors duration-300"
                style={{
                  padding: 'clamp(1.5rem, 2.5vw, 2rem) 0',
                  paddingRight: i < filtered.length - 1 ? 'clamp(1.5rem, 3vw, 2rem)' : '0',
                  paddingLeft: i > 0 ? 'clamp(1.5rem, 3vw, 2rem)' : '0',
                  borderBottom: '1px solid var(--command-border)',
                  borderRight: i < filtered.length - 1 ? '1px solid var(--command-border)' : 'none',
                }}
              >
                {/* Category + date */}
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className="text-[10px] tracking-[0.12em] uppercase"
                    style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--mauve)' }}
                  >
                    {CATEGORY_LABELS[it.category]}
                  </span>
                  <span
                    className="text-[10px]"
                    style={{ fontFamily: 'var(--font-primary)', fontWeight: 300, color: 'var(--night-60)' }}
                  >
                    {new Date(it.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="mb-3 group-hover:text-[var(--mauve)] transition-colors duration-300"
                  style={{
                    fontFamily: 'var(--font-display-aptos)',
                    fontWeight: 600,
                    fontSize: '1.25rem',
                    lineHeight: 1.25,
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
                    fontWeight: 300,
                    fontSize: '0.85rem',
                    lineHeight: 1.75,
                    color: 'var(--night-60)',
                    maxWidth: '22rem',
                  }}
                >
                  {it.desc}
                </p>

                {/* Read more */}
                <span
                  className="inline-flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase group-hover:text-[var(--mauve)] transition-colors duration-300"
                  style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--night-60)' }}
                >
                  Lire
                  <span className="inline-block w-4 h-[1px] bg-current group-hover:w-7 transition-all duration-500" />
                </span>
              </a>
            ))}
          </div>
        )}

        {/* View all link */}
        <div className="mt-14 flex justify-center">
          <a
            href="/publications"
            className="group inline-flex items-center gap-4"
          >
            <span
              className="relative overflow-hidden text-[11px] tracking-[0.2em] uppercase"
              style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--night)' }}
            >
              Voir toutes les publications
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--jaune-or)] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)]" />
            </span>
            <span className="w-9 h-9 rounded-full border border-[var(--night)]/10 flex items-center justify-center group-hover:border-[var(--mauve)]/40 transition-all duration-500">
              <FiArrowRight className="text-sm text-[var(--night)]/50 group-hover:text-[var(--mauve)] transition-colors duration-500" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};


