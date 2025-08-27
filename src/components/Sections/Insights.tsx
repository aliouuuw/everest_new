import { useReveal } from "../Hooks/useReveal";
import { FaExternalLinkAlt } from "react-icons/fa";

export const Insights: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>();
  const listRef = useReveal<HTMLDivElement>();

  const items = [
    { title: "Note de marché BRVM", desc: "Tendances hebdomadaires et opportunités.", href: "#" },
    { title: "Étude secteur bancaire", desc: "Qualité d’actifs et perspectives 2025.", href: "#" },
    { title: "Point taux et émissions", desc: "Marché primaire et courbe des rendements.", href: "#" },
  ];

  return (
    <section ref={sectionRef} className="reveal py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="kicker text-gradient-gold">Analyses & publications</span>
          <h2 className="luxury-heading mt-3">Restez informé des marchés</h2>
        </div>

        <div ref={listRef} className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12">
          {items.map((it, i) => (
            <a key={i} href={it.href} className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover block">
              {/* Decorative gold glow */}
              <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
              
              <div className="h-36 edge-media bg-[var(--white-smoke)]/80 flex items-center justify-center text-secondary mb-5 rounded-xl">Cover Placeholder</div>
              <div className="font-display flex items-center gap-2">
                <span className="group-hover:underline">{it.title}</span>
                <FaExternalLinkAlt className="text-secondary" />
              </div>
              <div className="text-secondary text-sm mt-1">{it.desc}</div>
              
              {/* Subtle divider */}
              <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-[var(--gold-metallic-10)] to-transparent" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};


