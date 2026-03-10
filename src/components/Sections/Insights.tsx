import { useMemo, useState } from "react";
import { useQuery } from "convex/react";
import { useReveal } from "../Hooks/useReveal";
import { api } from "../../../convex/_generated/api";
import { FiArrowRight, FiFileText } from "react-icons/fi";

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
      className="reveal relative py-28 md:py-36 bg-white border-t border-black/5"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-16 lg:px-24">

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-8 bg-[var(--jaune-or)]" />
              <span
                className="text-[10px] tracking-[0.3em] uppercase"
                style={{ fontFamily: 'var(--font-primary)', fontWeight: 600, color: 'var(--night)' }}
              >
                Intelligence de marché
              </span>
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display-aptos)',
                fontWeight: 500,
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: 'var(--night)',
              }}
            >
              Données et analyses{' '}
              <span className="block text-[var(--night)]/40 mt-2">
                pour décider.
              </span>
            </h2>
          </div>

          {/* Filters - Dashboard Tab Style */}
          <div className="flex flex-wrap gap-1 bg-[#f5f5f5] p-1.5 rounded-sm border border-black/5">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-[10px] uppercase tracking-widest transition-all duration-300 ${
                    isActive 
                      ? 'bg-white text-[var(--night)] shadow-sm' 
                      : 'text-[var(--night)]/50 hover:text-[var(--night)]'
                  }`}
                  style={{ fontFamily: 'var(--font-primary)', fontWeight: isActive ? 600 : 500 }}
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
          <div className="text-center py-32 border border-dashed border-black/10">
            <div
              className="w-6 h-6 border-2 border-[var(--jaune-or)]/30 border-t-[var(--jaune-or)] rounded-full animate-spin mx-auto mb-4"
            />
            <p className="text-[11px] uppercase tracking-widest text-[var(--night)]/40">
              Synchronisation des données...
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-32 border border-dashed border-black/10">
            <p className="text-[11px] uppercase tracking-widest text-[var(--night)]/40">
              Aucun rapport disponible pour ce filtre.
            </p>
          </div>
        ) : (
          <div ref={listRef} className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-6">
            {filtered.map((it) => (
              <a
                key={`${it.title}-${it.date}`}
                href={it.href}
                className="group flex flex-col p-8 md:p-10 bg-[#f8f8f8] border border-black/5 hover:bg-white hover:border-[var(--jaune-or)]/30 transition-all duration-300 relative"
              >
                {/* Meta header */}
                <div className="flex items-center justify-between border-b border-black/5 pb-4 mb-6">
                  <span
                    className="text-[9px] tracking-widest uppercase text-[var(--jaune-or)]"
                    style={{ fontFamily: 'var(--font-primary)', fontWeight: 600 }}
                  >
                    {CATEGORY_LABELS[it.category]}
                  </span>
                  <div className="flex items-center gap-2">
                    <FiFileText className="w-3 h-3 text-[var(--night)]/30" />
                    <span className="text-xs font-mono text-[var(--night)]/50">
                      {new Date(it.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="mb-4 text-[var(--night)] group-hover:text-[var(--jaune-or)] transition-colors duration-300"
                  style={{
                    fontFamily: 'var(--font-display-aptos)',
                    fontWeight: 500,
                    fontSize: '1.4rem',
                    lineHeight: 1.25,
                  }}
                >
                  {it.title}
                </h3>

                {/* Description */}
                <p
                  className="mb-8 flex-grow"
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontWeight: 400,
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                    color: 'var(--night)',
                    opacity: 0.6,
                  }}
                >
                  {it.desc}
                </p>

                {/* Footer action */}
                <div className="flex items-center gap-3 mt-auto pt-6 border-t border-black/5">
                  <span className="w-6 h-6 rounded-full bg-white border border-black/5 flex items-center justify-center group-hover:bg-[var(--jaune-or)] group-hover:border-[var(--jaune-or)] transition-colors">
                    <FiArrowRight className="w-3 h-3 text-[var(--night)] group-hover:text-white" />
                  </span>
                  <span
                    className="text-[10px] tracking-widest uppercase text-[var(--night)]/50 group-hover:text-[var(--night)] transition-colors"
                    style={{ fontFamily: 'var(--font-primary)', fontWeight: 600 }}
                  >
                    Consulter le rapport
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* View all link */}
        <div className="mt-16 flex justify-center">
          <a
            href="/publications"
            className="group inline-flex items-center gap-4 bg-[var(--night)] text-white px-8 py-4 rounded-sm hover:bg-[var(--jaune-or)] transition-colors duration-300"
          >
            <span
              className="text-[11px] tracking-[0.2em] uppercase"
              style={{ fontFamily: 'var(--font-primary)', fontWeight: 600 }}
            >
              Accéder au portail de recherche
            </span>
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
};


