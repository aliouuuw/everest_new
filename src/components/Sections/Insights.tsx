import { useMemo, useState, useRef, useEffect } from "react";
import { useQuery } from "convex/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { api } from "../../../convex/_generated/api";
import { FiArrowRight, FiBookOpen } from "react-icons/fi";
import { ConvexSafeBoundary } from "../ConvexSafeBoundary";

gsap.registerPlugin(ScrollTrigger);

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
  "revues-hebdo": "Hebdo",
  "revues-mensuelles": "Mensuel",
  "teaser-dividende": "Dividendes",
  "marches": "Marchés",
  "analyses": "Analyses",
};

export const Insights: React.FC = () => (
  <ConvexSafeBoundary>
    <InsightsInner />
  </ConvexSafeBoundary>
);

const InsightsInner: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<PublicationCategory | typeof ALL_LABEL>(ALL_LABEL);
  const viewAllRef = useRef<HTMLAnchorElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const publications = useQuery(api.publications.getPublications, { limit: 4, status: "published" });

  const items: PublicationItem[] = useMemo(() => {
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
        date: new Date(pub.createdAt || 0).toISOString().split("T")[0],
      }));
  }, [publications]);

  const categories = useMemo<Array<PublicationCategory | typeof ALL_LABEL>>(
    () => [ALL_LABEL, "revues-hebdo", "revues-mensuelles", "teaser-dividende", "marches", "analyses"],
    []
  );

  const filtered = useMemo(() => {
    const sorted = [...items].sort((a, b) => (a.date < b.date ? 1 : -1));
    return activeCategory === ALL_LABEL ? sorted : sorted.filter(it => it.category === activeCategory);
  }, [items, activeCategory]);

  // Scroll reveal
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    gsap.fromTo(".ins-header",
      { y: 32, opacity: 0, filter: "blur(5px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.65, ease: "expo.out",
        scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none reverse" } }
    );
    gsap.fromTo(".ins-featured",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "expo.out",
        scrollTrigger: { trigger: ".ins-featured", start: "top 82%", toggleActions: "play none none reverse" } }
    );
    gsap.utils.toArray<HTMLElement>(".ins-secondary").forEach((el, i) => {
      gsap.fromTo(el,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: i * 0.08, ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 86%", toggleActions: "play none none reverse" } }
      );
    });
  }, [filtered]);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });

  const [featured, ...secondary] = filtered;

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--pure-white)",
        paddingTop: "var(--section-gap)",
        paddingBottom: "var(--section-gap)",
      }}
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-12 lg:px-16">

        {/* ── Header ── */}
        <div className="ins-header flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-12">
          <div>
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-[11px] tracking-[0.08em] uppercase font-medium"
              style={{ fontFamily: "var(--font-primary)", color: "var(--pure-white)", background: "var(--mauve)" }}
            >
              Recherche & publications
            </span>
            <h2 style={{
              fontFamily: "var(--font-primary)", fontWeight: 800,
              fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.08, letterSpacing: "-0.03em",
              color: "var(--night)",
            }}>
              Nos analyses{" "}
              <span style={{ color: "var(--mauve)" }}>sur les marchés.</span>
            </h2>
          </div>

          {/* Filters — compact, below heading, not competing */}
          <div className="flex flex-wrap gap-1.5 md:pb-1">
            {categories.map(cat => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={isActive}
                  style={{
                    fontFamily: "var(--font-primary)", fontWeight: isActive ? 600 : 400,
                    fontSize: "0.72rem", letterSpacing: "0.03em",
                    color: isActive ? "var(--pure-white)" : "var(--night-60)",
                    background: isActive ? "var(--mauve)" : "transparent",
                    border: isActive ? "1px solid var(--mauve)" : "1px solid var(--command-border)",
                    padding: "0.35rem 0.85rem", borderRadius: "999px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = "rgba(70,29,76,0.3)";
                      e.currentTarget.style.color = "var(--night)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = "var(--command-border)";
                      e.currentTarget.style.color = "var(--night-60)";
                    }
                  }}
                >
                  {CATEGORY_LABELS[cat]}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Loading ── */}
        {publications === undefined && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-6 h-6 rounded-full border-2 border-[var(--mauve)]/20 border-t-[var(--mauve)] animate-spin" />
            <p style={{ fontFamily: "var(--font-primary)", fontSize: "0.85rem", color: "var(--night-40)" }}>
              Chargement…
            </p>
          </div>
        )}

        {/* ── Empty state ── */}
        {publications !== undefined && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <FiBookOpen className="w-8 h-8" style={{ color: "var(--night-20)" }} />
            <p style={{ fontFamily: "var(--font-primary)", fontWeight: 400, fontSize: "0.95rem", color: "var(--night-40)" }}>
              Aucune publication dans cette catégorie pour l'instant.
            </p>
            <button
              onClick={() => setActiveCategory(ALL_LABEL)}
              style={{
                fontFamily: "var(--font-primary)", fontSize: "0.8rem", fontWeight: 500,
                color: "var(--mauve)", background: "none", border: "none", cursor: "pointer",
                textDecoration: "underline", textUnderlineOffset: "3px",
              }}
            >
              Voir toutes les publications
            </button>
          </div>
        )}

        {/* ── Content: featured + secondary ── */}
        {publications !== undefined && filtered.length > 0 && (
          <div className="flex flex-col gap-4 md:gap-5">

            {/* Featured — full width, more visual weight */}
            {featured && (
              <a
                href={featured.href}
                className="ins-featured group relative flex flex-col md:flex-row gap-0 rounded-2xl overflow-hidden"
                style={{
                  background: "var(--summit-ivory)",
                  border: "1px solid var(--command-border)",
                  transition: "box-shadow 0.3s ease, transform 0.3s ease",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = "0 16px 48px rgba(70,29,76,0.09)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Left: content */}
                <div className="flex flex-col justify-between p-8 md:p-10 flex-1">
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <span style={{
                        fontFamily: "var(--font-primary)", fontWeight: 600,
                        fontSize: "0.68rem", letterSpacing: "0.07em", textTransform: "uppercase",
                        color: "var(--pure-white)", background: "var(--mauve)",
                        padding: "0.3rem 0.75rem", borderRadius: "999px",
                      }}>
                        {CATEGORY_LABELS[featured.category]}
                      </span>
                      <span style={{ fontFamily: "var(--font-primary)", fontSize: "0.78rem", color: "var(--night-40)" }}>
                        {formatDate(featured.date)}
                      </span>
                    </div>
                    <h3
                      className="group-hover:text-[var(--mauve)] transition-colors duration-300"
                      style={{
                        fontFamily: "var(--font-primary)", fontWeight: 700,
                        fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)", lineHeight: 1.25,
                        letterSpacing: "-0.02em", color: "var(--night)",
                        marginBottom: "0.875rem",
                      }}
                    >
                      {featured.title}
                    </h3>
                    <p style={{
                      fontFamily: "var(--font-primary)", fontWeight: 400,
                      fontSize: "0.95rem", lineHeight: 1.7, color: "var(--night-60)",
                      maxWidth: "42rem",
                    }}>
                      {featured.desc}
                    </p>
                  </div>
                  <div className="mt-8 flex items-center gap-2 group-hover:gap-3 transition-all duration-300"
                    style={{ fontFamily: "var(--font-primary)", fontWeight: 500, fontSize: "0.875rem", color: "var(--mauve)" }}>
                    Lire l'analyse
                    <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>

                {/* Right: date accent panel */}
                <div
                  className="hidden md:flex flex-col items-center justify-center w-[160px] shrink-0 gap-2"
                  style={{ background: "var(--mauve)", padding: "2rem 1.5rem" }}
                >
                  <span style={{
                    fontFamily: "var(--font-primary)", fontWeight: 800,
                    fontSize: "2.5rem", lineHeight: 1, letterSpacing: "-0.04em",
                    color: "rgba(255,255,255,0.9)",
                  }}>
                    {new Date(featured.date).getDate().toString().padStart(2, "0")}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-primary)", fontWeight: 400,
                    fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase",
                    color: "rgba(255,255,255,0.5)",
                  }}>
                    {new Date(featured.date).toLocaleDateString("fr-FR", { month: "long" })}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-primary)", fontWeight: 300,
                    fontSize: "0.85rem", color: "rgba(255,255,255,0.4)",
                    marginTop: "0.25rem",
                  }}>
                    {new Date(featured.date).getFullYear()}
                  </span>
                </div>
              </a>
            )}

            {/* Secondary — horizontal list, lighter weight */}
            {secondary.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                {secondary.slice(0, 3).map((it, i) => (
                  <a
                    key={`${it.title}-${it.date}`}
                    href={it.href}
                    className="ins-secondary group flex flex-col gap-4 p-6 rounded-2xl"
                    style={{
                      background: "var(--pure-white)",
                      border: "1px solid var(--command-border)",
                      transition: "border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = "rgba(70,29,76,0.18)";
                      e.currentTarget.style.boxShadow = "0 8px 28px rgba(70,29,76,0.07)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = "var(--command-border)";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span style={{
                        fontFamily: "var(--font-primary)", fontWeight: 600,
                        fontSize: "0.65rem", letterSpacing: "0.07em", textTransform: "uppercase",
                        color: "var(--pure-white)", background: "var(--mauve)",
                        padding: "0.25rem 0.65rem", borderRadius: "999px",
                      }}>
                        {CATEGORY_LABELS[it.category]}
                      </span>
                      <span style={{ fontFamily: "var(--font-primary)", fontSize: "0.72rem", color: "var(--night-40)" }}>
                        {formatDate(it.date)}
                      </span>
                    </div>

                    <h3
                      className="group-hover:text-[var(--mauve)] transition-colors duration-300 flex-1"
                      style={{
                        fontFamily: "var(--font-primary)", fontWeight: 600,
                        fontSize: "1rem", lineHeight: 1.35, letterSpacing: "-0.01em",
                        color: "var(--night)",
                      }}
                    >
                      {it.title}
                    </h3>

                    <span
                      className="inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-300 mt-auto"
                      style={{ fontFamily: "var(--font-primary)", fontWeight: 500, fontSize: "0.78rem", color: "var(--mauve)" }}
                    >
                      Lire
                      <FiArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── View all ── */}
        {publications !== undefined && filtered.length > 0 && (
          <div className="mt-10 flex justify-center">
            <a
              ref={viewAllRef}
              href="/publications"
              className="group relative overflow-hidden inline-flex items-center gap-3 px-6 py-3 rounded-full"
              style={{
                fontFamily: "var(--font-primary)", fontWeight: 500, fontSize: "0.875rem",
                color: "var(--mauve)", border: "1px solid rgba(70,29,76,0.2)",
                transition: "all 0.25s ease",
              }}
              onMouseMove={e => {
                if (!viewAllRef.current) return;
                const r = viewAllRef.current.getBoundingClientRect();
                setMousePos({ x: e.clientX - r.left, y: e.clientY - r.top });
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "var(--mauve)";
                e.currentTarget.style.color = "var(--pure-white)";
                e.currentTarget.style.borderColor = "var(--mauve)";
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(70,29,76,0.15)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--mauve)";
                e.currentTarget.style.borderColor = "rgba(70,29,76,0.2)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay"
                style={{ background: `radial-gradient(80px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.35), transparent 50%)` }}
              />
              <span className="relative z-10">Toutes les publications</span>
              <FiArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};
