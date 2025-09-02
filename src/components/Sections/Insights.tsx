import { useMemo, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useQuery } from "convex/react";
import { useReveal } from "../Hooks/useReveal";
import { api } from "../../../convex/_generated/api";

type PublicationCategory = "revues-hebdo" | "revues-mensuelles" | "teaser-dividende" | "marches" | "analyses";

type PublicationItem = {
  title: string;
  desc: string;
  href: string;
  category: PublicationCategory;
  date: string; // ISO string for ordering
};

const ALL_LABEL = "tout" as const;
const CATEGORY_LABELS: Record<PublicationCategory | typeof ALL_LABEL, string> = {
  [ALL_LABEL]: "Tout",
  "revues-hebdo": "Revues hebdomadaires",
  "revues-mensuelles": "Revues mensuelles",
  "teaser-dividende": "Teaser des dividendes",
  "marches": "Marchés",
  "analyses": "Analyses",
};

export const Insights: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>();
  const listRef = useReveal<HTMLDivElement>();
  const filtersRef = useReveal<HTMLDivElement>();

  const [activeCategory, setActiveCategory] = useState<PublicationCategory | typeof ALL_LABEL>(ALL_LABEL);

  // Fetch publications from Convex
  const publications = useQuery(api.publications.getPublications, { 
    limit: 3, // Show only 6 publications in insights section
    status: 'published' // Only show published publications
  });

  // Transform Convex data to match our component's expected format
  const items: Array<PublicationItem> = useMemo(() => {
    if (!publications?.page) return []
    
    // Sort by featured first, then by creation date (newest first)
    const sortedPublications = [...publications.page].sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return b.createdAt - a.createdAt
    })
    
    return sortedPublications.map(pub => ({
      title: pub.title,
      desc: pub.description,
      href: `/publications/${pub.slug}`,
      category: pub.category as PublicationCategory,
      date: new Date(pub.createdAt).toISOString().split('T')[0] // Convert timestamp to date string
    }))
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
    <section ref={sectionRef} className="reveal py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="kicker text-gradient-gold">Publications</span>
          <h2 className="luxury-heading mt-3">Restez informé des marchés</h2>
        </div>

        <div ref={filtersRef} className="reveal-stagger mt-10 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`${isActive ? "btn-primary" : "btn-secondary"} inline-flex items-center justify-center text-xs px-4 py-2 rounded-full font-display tracking-wide`}
                aria-pressed={isActive}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            );
          })}
        </div>

        {publications === undefined ? (
          // Loading state
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--gold-metallic)] mx-auto mb-4"></div>
            <p className="text-[var(--night-80)]">Chargement des publications...</p>
          </div>
        ) : filtered.length === 0 ? (
          // Empty state
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--gold-metallic-10)] flex items-center justify-center">
              <svg className="w-8 h-8 text-[var(--gold-metallic)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-[var(--night)] mb-2">Aucune publication trouvée</h3>
            <p className="text-[var(--night-80)]">Aucune publication ne correspond aux critères sélectionnés.</p>
          </div>
        ) : (
          <div ref={listRef} className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
            {filtered.map((it) => (
            <a key={`${it.title}-${it.date}`} href={it.href} className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all duration-300 hover:shadow-lg hover:border-[var(--gold-light)]/30 group-hover:bg-white/70 block">
              {/* Background blur effect */}
              <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />

              {/* Cover image placeholder */}
              <div className="h-36 edge-media bg-gradient-to-br from-[var(--white-smoke)]/80 to-[var(--gold-light)]/20 flex items-center justify-center text-secondary mb-5 rounded-xl border border-[var(--gold-metallic)]/10">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-[var(--gold-light)]/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[var(--gold-dark)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium">Publication</span>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[var(--gold-light)]/10 text-[var(--gold-dark)] border border-[var(--gold-light)]/20">
                      {CATEGORY_LABELS[it.category]}
                    </span>
                    {/* Featured indicator */}
                    {publications.page.find(pub => 
                      pub.title === it.title && 
                      new Date(pub.createdAt).toISOString().split('T')[0] === it.date
                    )?.featured && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[var(--gold-metallic)]/20 text-[var(--gold-metallic)] border border-[var(--gold-metallic)]/30">
                        ⭐ En vedette
                      </span>
                    )}
                  </div>
                  <time className="text-xs text-secondary font-medium" dateTime={it.date}>
                    {new Date(it.date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </time>
                </div>
                
                <h3 className="font-display text-lg font-semibold text-[var(--night)] mb-3 group-hover:text-[var(--gold-dark)] transition-colors leading-tight">
                  {it.title}
                </h3>
                
                <p className="text-secondary text-sm leading-relaxed mb-4">
                  {it.desc}
                </p>

                {/* Divider */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--gold-metallic-10)] to-transparent mb-4" />

                {/* Read more indicator */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[var(--gold-dark)] group-hover:text-[var(--gold-dark)] transition-colors">
                    Lire la suite
                  </span>
                  <svg className="w-4 h-4 text-[var(--gold-dark)] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <a
            href="/publications"
            className="btn-secondary inline-flex items-center gap-2 font-display tracking-wide"
          >
            Voir toutes les publications
            <FaExternalLinkAlt />
          </a>
        </div>
      </div>
    </section>
  );
};


