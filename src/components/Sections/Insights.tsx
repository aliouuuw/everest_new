import { useMemo, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useReveal } from "../Hooks/useReveal";

type InsightCategory = "revue" | "analyse" | "etude" | "note" | "marches";

type InsightItem = {
  title: string;
  desc: string;
  href: string;
  category: InsightCategory;
  date: string; // ISO string for ordering
};

const ALL_LABEL = "tout" as const;
const CATEGORY_LABELS: Record<InsightCategory | typeof ALL_LABEL, string> = {
  [ALL_LABEL]: "Tout",
  revue: "Revues",
  analyse: "Analyses",
  etude: "Études",
  note: "Notes",
  marches: "Marchés",
};

export const Insights: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>();
  const listRef = useReveal<HTMLDivElement>();
  const filtersRef = useReveal<HTMLDivElement>();

  const [activeCategory, setActiveCategory] = useState<InsightCategory | typeof ALL_LABEL>(ALL_LABEL);

  const items: Array<InsightItem> = [
    { title: "Note de marché BRVM", desc: "Tendances hebdomadaires et opportunités.", href: "#", category: "note", date: "2025-06-15" },
    { title: "Étude secteur bancaire", desc: "Qualité d’actifs et perspectives 2025.", href: "#", category: "etude", date: "2025-05-30" },
    { title: "Point taux et émissions", desc: "Marché primaire et courbe des rendements.", href: "#", category: "marches", date: "2025-06-10" },
    // { title: "Revue hebdo actions", desc: "Performances, volumes et catalyseurs.", href: "#", category: "revue", date: "2025-06-22" },
    // { title: "Analyse secteur télécoms", desc: "ARPU, capex et dynamics concurrentielles.", href: "#", category: "analyse", date: "2025-06-18" },
    // { title: "Étude microfinance UEMOA", desc: "Croissance, risques et réglementation.", href: "#", category: "etude", date: "2025-04-20" },
    // { title: "Note monétaire BCEAO", desc: "Inflation, taux directeurs et liquidité.", href: "#", category: "note", date: "2025-06-05" },
    // { title: "Marché primaire obligations", desc: "Calendrier d’émissions et spreads.", href: "#", category: "marches", date: "2025-06-12" },
    // { title: "Revue sectorielle banques", desc: "Qualité d’actifs et ROE.", href: "#", category: "revue", date: "2025-05-12" },
  ];

  const categories: Array<InsightCategory | typeof ALL_LABEL> = useMemo(
    () => [ALL_LABEL, "revue", "analyse", "etude", "note", "marches"],
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
          <span className="kicker text-gradient-gold">Analyses & publications</span>
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

        <div ref={listRef} className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {filtered.map((it) => (
            <a key={`${it.title}-${it.date}`} href={it.href} className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover block">
              <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />

              <div className="h-36 edge-media bg-[var(--white-smoke)]/80 flex items-center justify-center text-secondary mb-5 rounded-xl">
                Cover Placeholder
              </div>

              <div className="font-display flex items-center gap-2">
                <span className="group-hover:underline">{it.title}</span>
                <FaExternalLinkAlt className="text-secondary" />
              </div>
              <div className="text-secondary text-sm mt-1">{it.desc}</div>

              <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-[var(--gold-metallic-10)] to-transparent" />

              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="font-medium px-2 py-1 rounded-full bg-[var(--gold-metallic-10)] text-[var(--gold-dark)]">
                  {CATEGORY_LABELS[it.category]}
                </span>
                <span className="numeric-tabular opacity-70">{new Date(it.date).toLocaleDateString()}</span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#"
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


