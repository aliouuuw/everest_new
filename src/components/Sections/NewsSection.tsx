import { useReveal } from "../Hooks/useReveal";
import { FiArrowRight } from "react-icons/fi";
import { PillBadge } from '../ui';

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
      className="reveal relative py-24 md:py-32 overflow-hidden"
      style={{ background: 'var(--gradient-light-section)' }}
    >
      {/* Subtle mauve-gold gradient atmosphere */}
      <div
        className="absolute top-0 right-0 w-1/2 h-1/2 pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(ellipse at top right, var(--mauve-08) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-1/3 h-1/3 pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(ellipse at bottom left, var(--jaune-or-08) 0%, transparent 50%)',
        }}
      />
      <div className="mx-auto max-w-[1400px] px-6 md:px-16 lg:px-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <div className="mb-6">
              <PillBadge>Actualités</PillBadge>
            </div>
            <h2 className="luxury-heading">
              Dernières{' '}
              <span style={{ color: 'var(--jaune-or)' }}>
                informations.
              </span>
            </h2>
          </div>
          
          <a
            href="/actualites"
            className="hidden md:inline-flex items-center gap-3 group"
          >
            <span
              className="relative overflow-hidden text-[10px] tracking-[0.2em] uppercase"
              style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--night-60)' }}
            >
              Toutes les actualités
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--mauve)] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)]" />
            </span>
            <FiArrowRight className="text-xs text-[var(--night-60)] group-hover:text-[var(--mauve)] transition-colors duration-500" />
          </a>
        </div>

        {/* Content Grid - 1 large, 2 small stacked */}
        <div ref={listRef} className="reveal-stagger grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Featured Article (Left, spans 7 cols) */}
          <a
            href={MOCK_NEWS[0].href}
            className="group lg:col-span-7 flex flex-col h-full bg-[var(--pure-white)] rounded-2xl border border-[var(--mauve-10)] hover:border-[var(--mauve-30)] hover:shadow-lg hover:shadow-[var(--mauve-10)] transition-all duration-500 overflow-hidden"
          >
            <div className="relative aspect-[16/9] lg:aspect-[4/3] overflow-hidden">
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img 
                src={MOCK_NEWS[0].imageUrl} 
                alt={MOCK_NEWS[0].title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              />
              <div className="absolute top-6 left-6 z-20">
                <span className="inline-block px-4 py-1.5 rounded-full text-[0.6rem] font-medium uppercase tracking-[0.15em] text-[var(--mauve)] bg-white/90 backdrop-blur-sm border border-[var(--mauve-15)]">
                  {MOCK_NEWS[0].category}
                </span>
              </div>
            </div>
            
            <div className="p-8 lg:p-10 flex flex-col flex-grow">
              <span
                className="text-[11px] mb-4 block"
                style={{ fontFamily: 'var(--font-primary)', fontWeight: 400, color: 'var(--night-60)' }}
              >
                {new Date(MOCK_NEWS[0].date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              
              <h3
                className="mb-4 transition-colors duration-300 group-hover:text-[var(--mauve)]"
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontWeight: 700,
                  fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
                  lineHeight: 1.25,
                  color: 'var(--night)',
                }}
              >
                {MOCK_NEWS[0].title}
              </h3>
              
              <p
                className="mb-8 flex-grow"
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontWeight: 300,
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  color: 'var(--night-60)',
                  maxWidth: '38rem',
                }}
              >
                {MOCK_NEWS[0].excerpt}
              </p>
              
              <span
                className="inline-flex items-center gap-3 text-[11px] tracking-[0.15em] uppercase group-hover:text-[var(--mauve)] transition-colors duration-300 mt-auto"
                style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--night)' }}
              >
                Lire l'article
                <span className="inline-block w-6 h-[1px] bg-current group-hover:w-10 transition-all duration-500" />
              </span>
            </div>
          </a>

          {/* Secondary Articles (Right, spans 5 cols, stacked) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {MOCK_NEWS.slice(1).map((article, i) => (
              <a
                key={i}
                href={article.href}
                className="group flex flex-col sm:flex-row lg:flex-col xl:flex-row h-full bg-[var(--pure-white)] rounded-2xl border border-[var(--mauve-10)] hover:border-[var(--mauve-30)] hover:shadow-lg hover:shadow-[var(--mauve-10)] transition-all duration-500 overflow-hidden"
              >
                <div className="relative w-full sm:w-2/5 lg:w-full xl:w-2/5 aspect-[16/9] sm:aspect-auto lg:aspect-[16/9] xl:aspect-auto overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img 
                    src={article.imageUrl} 
                    alt={article.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  />
                </div>
                
                <div className="p-6 flex flex-col justify-center flex-grow">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="text-[9px] tracking-[0.1em] uppercase"
                      style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--mauve)' }}
                    >
                      {article.category}
                    </span>
                    <span
                      className="text-[10px]"
                      style={{ fontFamily: 'var(--font-primary)', fontWeight: 400, color: 'var(--night-60)' }}
                    >
                      {new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                  
                  <h3
                    className="mb-3 transition-colors duration-300 group-hover:text-[var(--mauve)]"
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      lineHeight: 1.3,
                      color: 'var(--night)',
                    }}
                  >
                    {article.title}
                  </h3>
                  
                  <span
                    className="inline-flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase group-hover:text-[var(--mauve)] transition-colors duration-300 mt-auto"
                    style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--night-60)' }}
                  >
                    Lire
                    <FiArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Mobile View all link */}
        <div className="mt-10 flex justify-center md:hidden">
          <a
            href="/actualites"
            className="group inline-flex items-center gap-3"
          >
            <span
              className="relative overflow-hidden text-[11px] tracking-[0.2em] uppercase"
              style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--night)' }}
            >
              Voir toutes les actualités
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--jaune-or)] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)]" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};
