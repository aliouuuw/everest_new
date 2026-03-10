import { useReveal } from "../Hooks/useReveal";
import { FiArrowRight } from "react-icons/fi";

type NewsArticle = {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  imageUrl: string;
  href: string;
};

const MOCK_NEWS: NewsArticle[] = [
  {
    title: "Le marché financier régional maintient sa dynamique de croissance",
    excerpt: "Analyse des tendances récentes du marché financier de l'UEMOA et perspectives pour le prochain trimestre.",
    category: "Marchés",
    date: "2023-10-15",
    imageUrl: "/bg-mc.jpg",
    href: "/actualites/marche-financier-croissance"
  },
  {
    title: "Everest Finance lance de nouveaux produits d'investissement",
    excerpt: "Découvrez notre nouvelle gamme de produits structurés adaptés aux besoins spécifiques des investisseurs institutionnels.",
    category: "Entreprise",
    date: "2023-10-02",
    imageUrl: "/background-sol.jpg",
    href: "/actualites/nouveaux-produits"
  },
  {
    title: "Comment optimiser la gestion de trésorerie en période d'inflation",
    excerpt: "Stratégies et conseils pratiques pour les entreprises cherchant à préserver la valeur de leur trésorerie.",
    category: "Conseil",
    date: "2023-09-20",
    imageUrl: "/bg-mc.jpg",
    href: "/actualites/optimiser-tresorerie"
  }
];

export const NewsSection: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>();
  const listRef = useReveal<HTMLDivElement>();

  return (
    <section
      ref={sectionRef}
      className="reveal relative"
      style={{ background: 'var(--pure-white)', paddingTop: 'var(--section-gap)', paddingBottom: 'var(--section-gap)' }}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-16 lg:px-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <span
              className="inline-flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase mb-6"
              style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--mauve)' }}
            >
              <span className="inline-block w-5 h-[1px]" style={{ background: 'var(--mauve)', opacity: 0.4 }} />
              Actualités
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
              Dernières{' '}
              <em style={{ fontWeight: 300, fontStyle: 'italic', color: 'var(--mauve)' }}>
                informations.
              </em>
            </h2>
          </div>
        </div>

        {/* Content Grid */}
        <div ref={listRef} className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {MOCK_NEWS.map((article, i) => (
            <a
              key={i}
              href={article.href}
              className="group flex flex-col h-full overflow-hidden transition-all duration-500"
              style={{
                border: '1px solid var(--command-border)',
                background: 'var(--summit-ivory)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--command-border-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--command-border)';
              }}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={article.imageUrl} 
                  alt={article.title}
                  className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ filter: 'saturate(0.9) contrast(1.02)' }}
                />
                <div className="absolute top-4 left-4 z-10">
                  <span
                    className="text-[9px] tracking-[0.12em] uppercase px-2.5 py-1"
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontWeight: 500,
                      color: 'var(--pure-white)',
                      background: 'var(--mauve)',
                    }}
                  >
                    {article.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6 md:p-7 flex flex-col flex-grow">
                <span
                  className="text-[10px] mb-3 block"
                  style={{ fontFamily: 'var(--font-primary)', fontWeight: 400, color: 'var(--night-60)' }}
                >
                  {new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
                
                <h3
                  className="mb-3 group-hover:text-[var(--mauve)] transition-colors duration-300"
                  style={{
                    fontFamily: 'var(--font-display-aptos)',
                    fontWeight: 600,
                    fontSize: '1.15rem',
                    lineHeight: 1.3,
                    color: 'var(--night)',
                  }}
                >
                  {article.title}
                </h3>
                
                <p
                  className="mb-6 flex-grow"
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontWeight: 300,
                    fontSize: '0.85rem',
                    lineHeight: 1.7,
                    color: 'var(--night-60)',
                  }}
                >
                  {article.excerpt}
                </p>
                
                <span
                  className="inline-flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase group-hover:text-[var(--mauve)] transition-colors duration-300 mt-auto"
                  style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--night-60)' }}
                >
                  Lire la suite
                  <span className="inline-block w-4 h-[1px] bg-current group-hover:w-7 transition-all duration-500" />
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* View all link */}
        <div className="mt-14 flex justify-center">
          <a
            href="/actualites"
            className="group inline-flex items-center gap-4"
          >
            <span
              className="relative overflow-hidden text-[11px] tracking-[0.2em] uppercase"
              style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--night)' }}
            >
              Voir toutes les actualités
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
