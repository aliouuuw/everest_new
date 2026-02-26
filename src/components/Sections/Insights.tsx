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
    limit: 3, // Show only 3 publications in insights section
    status: 'published' // Only show published publications
  });

  // Transform Convex data to match our component's expected format
  const items: Array<PublicationItem> = useMemo(() => {
    if (!publications?.page) return []
    
    // Sort by featured first, then by creation date (newest first)
    const sortedPublications = [...publications.page].sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return (b.createdAt || 0) - (a.createdAt || 0)
    })
    
    return sortedPublications.map(pub => ({
      title: pub.title,
      desc: pub.description,
      href: `/publications/${pub.slug}`,
      category: pub.category as PublicationCategory,
      date: new Date(pub.createdAt || 0).toISOString().split('T')[0] // Convert timestamp to date string
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
    <section ref={sectionRef} className="reveal py-32 bg-[var(--night)] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[var(--gold-metallic)]/5 to-transparent pointer-events-none" />
      <div className="absolute -bottom-1/4 right-1/4 w-1/2 h-1/2 bg-[var(--gold-metallic)]/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="kicker text-[var(--gold-metallic)] tracking-[0.3em]">PUBLICATIONS</span>
            <h2 className="luxury-heading-dark mt-4">Restez informé des marchés</h2>
            <p className="luxury-subheading-dark mt-4">Analyses pointues, décryptages sectoriels et veille stratégique pour éclairer vos décisions d'investissement.</p>
          </div>
          
          <div className="hidden md:block">
            <a
              href="/publications"
              className="btn-secondary-dark inline-flex items-center gap-2"
            >
              Voir tout
              <FaExternalLinkAlt className="text-[10px]" />
            </a>
          </div>
        </div>

        <div ref={filtersRef} className="reveal-stagger flex flex-wrap items-center gap-3 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`inline-flex items-center justify-center text-xs px-5 py-2.5 rounded-full font-medium tracking-wide transition-all duration-300 ${
                  isActive 
                    ? "bg-[var(--gold-metallic)] text-[var(--night)] shadow-[0_0_15px_rgba(202,148,47,0.3)]" 
                    : "bg-[var(--night)] text-white/70 border border-white/10 hover:border-[var(--gold-metallic)]/50 hover:text-white"
                }`}
                aria-pressed={isActive}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            );
          })}
        </div>

        {publications === undefined ? (
          // Loading state
          <div className="text-center py-20 border border-white/5 rounded-3xl bg-white/5 backdrop-blur-sm">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--gold-metallic)] mx-auto mb-4"></div>
            <p className="text-white/60">Chargement des publications...</p>
          </div>
        ) : filtered.length === 0 ? (
          // Empty state
          <div className="text-center py-20 border border-white/5 rounded-3xl bg-white/5 backdrop-blur-sm">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--gold-metallic)]/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-[var(--gold-metallic)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Aucune publication trouvée</h3>
            <p className="text-white/60">Aucune publication ne correspond aux critères sélectionnés.</p>
          </div>
        ) : (
          <div ref={listRef} className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-8">
            {filtered.map((it) => (
            <a key={`${it.title}-${it.date}`} href={it.href} className="group relative overflow-hidden rounded-3xl border border-white/5 bg-[var(--night)] p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] block h-full flex flex-col">
              {/* Hover gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-[var(--gold-metallic)]/0 to-[var(--gold-metallic)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Border glow on hover */}
              <div className="absolute inset-0 rounded-3xl border border-[var(--gold-metallic)]/0 group-hover:border-[var(--gold-metallic)]/30 transition-colors duration-500" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-[var(--gold-metallic)]/10 text-[var(--gold-metallic)] border border-[var(--gold-metallic)]/20">
                      {CATEGORY_LABELS[it.category]}
                    </span>
                    {/* Featured indicator */}
                    {publications.page.find(pub => 
                      pub.title === it.title && 
                      new Date(pub.createdAt || 0).toISOString().split('T')[0] === it.date
                    )?.featured && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-[var(--gold-metallic)] text-[var(--night)]">
                        En vedette
                      </span>
                    )}
                  </div>
                </div>
                
                <h3 className="font-display text-2xl font-medium text-white mb-4 group-hover:text-[var(--gold-metallic)] transition-colors leading-tight">
                  {it.title}
                </h3>
                
                <p className="text-white/60 text-sm leading-relaxed mb-8 flex-grow">
                  {it.desc}
                </p>

                <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/10">
                  <time className="text-xs text-white/40 font-medium" dateTime={it.date}>
                    {new Date(it.date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </time>
                  <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[var(--gold-metallic)]">
                    Lire
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          ))}
          </div>
        )}

        <div className="mt-12 text-center md:hidden">
          <a
            href="/publications"
            className="btn-secondary-dark w-full justify-center gap-2"
          >
            Voir toutes les publications
            <FaExternalLinkAlt className="text-[10px]" />
          </a>
        </div>
      </div>
    </section>
  );
};


