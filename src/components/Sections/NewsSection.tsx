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
      className="reveal relative py-28 md:py-36 bg-[#f5f5f5]"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-16 lg:px-24">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-8 bg-[var(--jaune-or)]" />
              <span
                className="text-[10px] tracking-[0.3em] uppercase"
                style={{ fontFamily: 'var(--font-primary)', fontWeight: 600, color: 'var(--night)' }}
              >
                Actualités
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
              Évolutions &{' '}
              <span className="block text-[var(--night)]/40 mt-2">
                perspectives.
              </span>
            </h2>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <a
              href="/actualites"
              className="group inline-flex items-center gap-3 text-[11px] tracking-widest uppercase font-semibold text-[var(--night)] hover:text-[var(--jaune-or)] transition-colors"
            >
              Toutes les actualités
              <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center group-hover:border-[var(--jaune-or)]/30 group-hover:bg-[var(--jaune-or)]/5 transition-all">
                <FiArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>
          </div>
        </div>

        {/* Content Layout - Featured + Grid */}
        <div ref={listRef} className="reveal-stagger grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Featured Article (Left) */}
          <div className="lg:col-span-7">
            <a
              href={MOCK_NEWS[0].href}
              className="group block relative h-full min-h-[450px] bg-[var(--night)] overflow-hidden"
            >
              <div className="absolute inset-0">
                <img 
                  src={MOCK_NEWS[0].imageUrl} 
                  alt={MOCK_NEWS[0].title}
                  className="w-full h-full object-cover opacity-60 mix-blend-overlay group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--night)] via-[var(--night)]/40 to-transparent" />
              </div>
              
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                <div className="flex items-center gap-4 mb-6">
                  <span className="px-3 py-1 bg-white text-[var(--night)] text-[9px] uppercase tracking-widest font-semibold">
                    {MOCK_NEWS[0].category}
                  </span>
                  <span className="text-white/60 text-[11px] font-mono">
                    {new Date(MOCK_NEWS[0].date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                  </span>
                </div>
                
                <h3
                  className="text-white mb-4 max-w-2xl group-hover:text-[var(--jaune-or)] transition-colors duration-300"
                  style={{
                    fontFamily: 'var(--font-display-aptos)',
                    fontWeight: 500,
                    fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                    lineHeight: 1.15,
                  }}
                >
                  {MOCK_NEWS[0].title}
                </h3>
                
                <p className="text-white/70 max-w-xl text-sm md:text-base font-light leading-relaxed mb-8">
                  {MOCK_NEWS[0].excerpt}
                </p>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-[var(--jaune-or)] group-hover:border-[var(--jaune-or)] group-hover:text-[var(--night)] transition-all">
                    <FiArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-white/70 group-hover:text-white font-medium transition-colors">
                    Lire l'article
                  </span>
                </div>
              </div>
            </a>
          </div>

          {/* Secondary Articles (Right List) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {MOCK_NEWS.slice(1).map((article, i) => (
              <a
                key={i}
                href={article.href}
                className="group flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-6 bg-white p-6 border border-black/5 hover:border-[var(--jaune-or)]/30 hover:shadow-lg hover:shadow-black/[0.02] transition-all duration-300 h-full"
              >
                <div className="sm:w-1/3 lg:w-full xl:w-1/3 aspect-[4/3] sm:aspect-auto lg:aspect-[21/9] xl:aspect-auto relative overflow-hidden shrink-0">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                
                <div className="flex flex-col flex-grow py-2">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[9px] uppercase tracking-widest text-[var(--jaune-or)] font-semibold">
                      {article.category}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--night)]/40">
                      {new Date(article.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                    </span>
                  </div>
                  
                  <h3
                    className="mb-3 text-[var(--night)] group-hover:text-[var(--jaune-or)] transition-colors duration-300"
                    style={{
                      fontFamily: 'var(--font-display-aptos)',
                      fontWeight: 500,
                      fontSize: '1.25rem',
                      lineHeight: 1.25,
                    }}
                  >
                    {article.title}
                  </h3>
                  
                  <div className="mt-auto pt-4 flex justify-end">
                    <FiArrowRight className="w-5 h-5 text-[var(--night)]/20 group-hover:text-[var(--jaune-or)] transition-colors" />
                  </div>
                </div>
              </a>
            ))}
          </div>

        </div>

        {/* Mobile View All Link */}
        <div className="mt-12 flex justify-center md:hidden">
          <a
            href="/actualites"
            className="group inline-flex items-center gap-4 bg-white border border-black/10 px-8 py-4 w-full justify-center text-[var(--night)] hover:border-[var(--jaune-or)] transition-colors duration-300"
          >
            <span
              className="text-[11px] tracking-[0.2em] uppercase"
              style={{ fontFamily: 'var(--font-primary)', fontWeight: 600 }}
            >
              Voir toutes les actualités
            </span>
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
};
