import { useMemo } from "react";
import { useQuery } from "convex/react";
import { useReveal } from "../Hooks/useReveal";
import { api } from "../../../convex/_generated/api";
import { FiArrowRight } from "react-icons/fi";
import { PillBadge } from '../ui';

type PublicationCategory = "revues-hebdo" | "revues-mensuelles" | "teaser-dividende" | "marches" | "analyses";

const CATEGORY_LABELS: Record<PublicationCategory, string> = {
  "revues-hebdo": "Revues hebdo",
  "revues-mensuelles": "Revues mensuelles",
  "teaser-dividende": "Dividendes",
  "marches": "Marchés",
  "analyses": "Analyses",
};

type PublicationItem = {
  title: string;
  desc: string;
  href: string;
  category: PublicationCategory;
  date: string;
};

export const Insights: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>();

  const publications = useQuery(api.publications.getPublications, {
    limit: 3,
    status: 'published'
  });

  const items: Array<PublicationItem> = useMemo(() => {
    if (!publications?.page) return [];
    return [...publications.page]
      .sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return (b.createdAt || 0) - (a.createdAt || 0);
      })
      .map(pub => ({
        title: pub.title,
        desc: pub.description,
        href: `/publications/${pub.slug}`,
        category: pub.category as PublicationCategory,
        date: new Date(pub.createdAt || 0).toISOString().split('T')[0],
      }));
  }, [publications]);

  const featured = items[0];
  const secondary = items.slice(1, 3);

  return (
      <section
        ref={sectionRef}
        className="reveal relative overflow-hidden"
        style={{ background: 'var(--gradient-dark-section)' }}
      >
        {/* Subtle atmospheric orbs */}
        <div
          className="absolute top-0 left-0 w-[55%] h-[70%] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top left, rgba(70,29,76,0.25) 0%, transparent 60%)' }}
        />
        <div
          className="absolute bottom-0 right-0 w-[40%] h-[50%] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at bottom right, var(--jaune-or-10) 0%, transparent 60%)' }}
        />

        {/* Section header strip */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between px-8 md:px-16 lg:px-24 pt-20 md:pt-28 pb-12 md:pb-16 border-b border-white/10 gap-6">
          <div className="flex flex-col gap-6">
            <div>
              <PillBadge variant="gold">Publications</PillBadge>
            </div>
            
            <h2 className="luxury-heading-dark">
              Restez informé{' '}
              <span style={{ color: 'var(--jaune-or)' }}>des marchés.</span>
            </h2>
          </div>

          <a
            href="/publications"
            className="hidden md:inline-flex items-center gap-3 group"
          >
            <span className="kicker text-white/60 group-hover:text-white transition-colors relative overflow-hidden pb-1">
              Toutes les publications
              <span className="absolute bottom-0 left-0 w-full h-px bg-[var(--jaune-or)] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)]" />
            </span>
            <FiArrowRight className="text-lg text-white/60 group-hover:text-[var(--jaune-or)] transition-colors duration-500" />
          </a>
        </div>

      {/* Loading state */}
      {publications === undefined && (
        <div className="relative z-10 flex items-center justify-center py-28">
          <div className="w-7 h-7 border border-[var(--jaune-or)]/30 border-t-[var(--jaune-or)] rounded-full animate-spin" />
        </div>
      )}

      {/* Editorial split — featured left, secondary right */}
      {publications !== undefined && items.length > 0 && (
        <div className="relative z-10 flex flex-col lg:flex-row" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>

          {/* FEATURED — left, large */}
          {featured && (
            <a
              href={featured.href}
              className="group lg:w-[58%] flex flex-col justify-between px-8 md:px-16 lg:px-24 py-16 md:py-20 transition-colors duration-500 hover:bg-white/[0.03]"
              style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div>
                {/* Category badge */}
                <span className="inline-block mb-10 px-4 py-1.5 kicker text-[var(--jaune-or)] border border-[var(--jaune-or)]/30 rounded-full bg-[var(--jaune-or)]/5">
                  {CATEGORY_LABELS[featured.category]}
                </span>

                {/* Large display title */}
                <h3 className="font-primary font-bold text-3xl md:text-5xl leading-[1.1] tracking-tight text-white mb-6 transition-colors duration-500 group-hover:text-[var(--jaune-or)]">
                  {featured.title}
                </h3>

                <p className="text-secondary-dark text-base md:text-lg mb-8 max-w-2xl">
                  {featured.desc}
                </p>
              </div>

              {/* Bottom row */}
              <div className="mt-12 flex items-center justify-between">
                <span className="font-primary font-light text-sm text-white/40 tracking-wider">
                  {new Date(featured.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
                <span className="inline-flex items-center gap-3 kicker text-white/60 group-hover:text-[var(--jaune-or)] transition-colors duration-300">
                  Lire
                  <span className="inline-block w-6 h-px bg-current group-hover:w-12 transition-all duration-500" />
                </span>
              </div>
            </a>
          )}

          {/* SECONDARY — right, stacked */}
          <div className="lg:w-[42%] flex flex-col">
            {secondary.map((it, i) => (
              <a
                key={`${it.title}-${it.date}`}
                href={it.href}
                className="group flex flex-col justify-between px-8 md:px-12 lg:px-16 py-12 transition-colors duration-500 hover:bg-white/[0.03] flex-1"
                style={{ borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.06)' }}
              >
                <div>
                  <span className="block mb-5 kicker text-[var(--jaune-or)]/80">
                    {CATEGORY_LABELS[it.category]}
                  </span>
                  <h3 className="font-display-aptos text-xl md:text-2xl text-white mb-4 transition-colors duration-500 group-hover:text-[var(--jaune-or)]">
                    {it.title}
                  </h3>
                  <p className="text-secondary-dark text-sm md:text-base line-clamp-3">
                    {it.desc}
                  </p>
                </div>
                <div className="mt-8 flex items-center justify-between">
                  <span className="font-primary font-light text-xs text-white/40 tracking-wider">
                    {new Date(it.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                  <FiArrowRight className="text-lg text-white/40 group-hover:text-[var(--jaune-or)] transition-colors duration-500 group-hover:translate-x-1" />
                </div>
              </a>
            ))}

            {/* View all — bottom of right column */}
            <a
              href="/publications"
              className="md:hidden flex items-center justify-between px-8 py-8 group hover:bg-white/[0.03] transition-colors"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              <span className="kicker text-white/60 group-hover:text-[var(--jaune-or)] transition-colors">
                Toutes les publications
              </span>
              <FiArrowRight className="text-lg text-white/60 group-hover:text-[var(--jaune-or)] transition-colors duration-500 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      )}

      {/* Empty state */}
      {publications !== undefined && items.length === 0 && (
        <div className="relative z-10 py-24 text-center">
          <p style={{ fontFamily: 'var(--font-primary)', fontWeight: 300, fontSize: '0.9rem', color: 'rgba(255,255,255,0.3)' }}>
            Aucune publication disponible.
          </p>
        </div>
      )}
    </section>
  );
};


