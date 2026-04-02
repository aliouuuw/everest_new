import { useMemo } from "react";
import { useQuery } from "convex/react";
import { useReveal } from "../Hooks/useReveal";
import { api } from "../../../convex/_generated/api";
import { FiArrowRight } from "react-icons/fi";

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
      style={{ background: 'linear-gradient(180deg, var(--night) 0%, #0f0a10 100%)' }}
    >
      {/* Dual mauve-gold gradient atmosphere */}
      <div
        className="absolute top-0 left-0 w-[55%] h-[70%] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top left, var(--mauve-25) 0%, var(--mauve-10) 40%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 right-0 w-[40%] h-[50%] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom right, var(--jaune-or-10) 0%, transparent 60%)' }}
      />
      {/* Gradient orb accent */}
      <div
        className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20 blur-3xl -translate-y-1/2"
        style={{
          background: 'radial-gradient(circle, var(--mauve-20) 0%, var(--jaune-or-05) 50%, transparent 70%)',
        }}
      />

      {/* Section header strip */}
      <div
        className="relative z-10 flex items-center justify-between px-8 md:px-16 lg:px-24 pt-16 md:pt-20 pb-10 md:pb-12"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-center gap-6">
          <span
            className="text-[10px] tracking-[0.35em] uppercase"
            style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--jaune-or)' }}
          >
            Publications
          </span>
          <span
            className="h-[1px] w-12"
            style={{ background: 'var(--jaune-or)', opacity: 0.4 }}
          />
          <span
            style={{
              fontFamily: 'var(--font-primary)',
              fontWeight: 800,
              fontSize: 'clamp(1.5rem, 3vw, 2.4rem)',
              letterSpacing: '-0.03em',
              lineHeight: 1,
              color: 'var(--pure-white)',
            }}
          >
            Restez informé{' '}
            <span style={{ color: 'var(--jaune-or)' }}>des marchés.</span>
          </span>
        </div>

        <a
          href="/publications"
          className="hidden md:inline-flex items-center gap-3 group"
        >
          <span
            className="relative overflow-hidden text-[10px] tracking-[0.2em] uppercase"
            style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'rgba(255,255,255,0.4)' }}
          >
            Toutes les publications
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--jaune-or)] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)]" />
          </span>
          <FiArrowRight className="text-xs text-[rgba(255,255,255,0.4)] group-hover:text-[var(--jaune-or)] transition-colors duration-500" />
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
              className="group lg:w-[58%] flex flex-col justify-between px-8 md:px-16 lg:px-24 py-14 md:py-18 transition-colors duration-500 hover:bg-white/[0.02]"
              style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div>
                {/* Category badge */}
                <span
                  className="inline-block mb-8 px-3 py-1 text-[10px] tracking-[0.12em] uppercase"
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontWeight: 500,
                    color: 'var(--jaune-or)',
                    border: '1px solid rgba(202,148,47,0.25)',
                  }}
                >
                  {CATEGORY_LABELS[featured.category]}
                </span>

                {/* Large display title */}
                <h3
                  className="mb-6 transition-colors duration-500 group-hover:text-[var(--jaune-or)]"
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontWeight: 700,
                    fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.03em',
                    color: 'var(--pure-white)',
                  }}
                >
                  {featured.title}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontWeight: 300,
                    fontSize: '0.9rem',
                    lineHeight: 1.8,
                    color: 'rgba(255,255,255,0.4)',
                    maxWidth: '34rem',
                  }}
                >
                  {featured.desc}
                </p>
              </div>

              {/* Bottom row */}
              <div className="mt-12 flex items-center justify-between">
                <span
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontWeight: 300,
                    fontSize: '0.75rem',
                    color: 'rgba(255,255,255,0.25)',
                    letterSpacing: '0.05em',
                  }}
                >
                  {new Date(featured.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
                <span
                  className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase group-hover:text-[var(--jaune-or)] transition-colors duration-300"
                  style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'rgba(255,255,255,0.35)' }}
                >
                  Lire
                  <span className="inline-block w-5 h-[1px] bg-current group-hover:w-10 transition-all duration-500" />
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
                className="group flex flex-col justify-between px-8 md:px-12 lg:px-14 py-10 md:py-12 transition-colors duration-500 hover:bg-white/[0.02] flex-1"
                style={{ borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.06)' }}
              >
                <div>
                  <span
                    className="block mb-4 text-[10px] tracking-[0.12em] uppercase"
                    style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--jaune-or)', opacity: 0.7 }}
                  >
                    {CATEGORY_LABELS[it.category]}
                  </span>
                  <h3
                    className="mb-3 transition-colors duration-500 group-hover:text-[var(--jaune-or)]"
                    style={{
                      fontFamily: 'var(--font-display-aptos)',
                      fontWeight: 500,
                      fontSize: 'clamp(1.1rem, 2vw, 1.45rem)',
                      lineHeight: 1.2,
                      color: 'var(--pure-white)',
                    }}
                  >
                    {it.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontWeight: 300,
                      fontSize: '0.82rem',
                      lineHeight: 1.7,
                      color: 'rgba(255,255,255,0.35)',
                    }}
                  >
                    {it.desc}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <span
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontWeight: 300,
                      fontSize: '0.7rem',
                      color: 'rgba(255,255,255,0.2)',
                    }}
                  >
                    {new Date(it.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                  <FiArrowRight className="text-xs text-[rgba(255,255,255,0.2)] group-hover:text-[var(--jaune-or)] transition-colors duration-500" />
                </div>
              </a>
            ))}

            {/* View all — bottom of right column */}
            <a
              href="/publications"
              className="md:hidden flex items-center gap-3 px-8 py-8 group"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              <span
                style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}
              >
                Toutes les publications
              </span>
              <FiArrowRight className="text-xs text-[rgba(255,255,255,0.4)] group-hover:text-[var(--jaune-or)] transition-colors duration-500" />
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


