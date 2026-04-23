import { Link } from "@tanstack/react-router";
import { useReveal } from "../Hooks/useReveal";
import { FiArrowRight, FiCalendar } from "react-icons/fi";

type NewsArticle = {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  imageUrl: string;
  slug: string;
};

const NEWS_ARTICLES: NewsArticle[] = [
  {
    title: "BRVM : Sucrivoire s'illustre, Société Générale CI donne le ton au marché",
    excerpt: "La BRVM orchestre un rebond, clôturant la séance en territoire positif. L'indice BRVM Composite gagne 0,13 % à 406,95 points, porté par Sucrivoire (+7,32 %) et Société Générale CI (+2,66 %).",
    category: "Marchés",
    date: "2026-04-09",
    imageUrl: "/articles/brvm-marche.jpg",
    slug: "brvm-sucrivoire-societe-generale-ci"
  },
  {
    title: "À Abidjan, le paradoxe d'un continent riche en capital mais pauvre en financement",
    excerpt: "Réunis à l'initiative de la BAD, les acteurs de la finance africaine constatent un déficit de 400 milliards USD/an malgré 4 000 milliards d'épargne disponible.",
    category: "Finance",
    date: "2026-04-10",
    imageUrl: "/articles/abidjan-finance.jpg",
    slug: "abidjan-paradoxe-financement-afrique"
  },
  {
    title: "La RDC lève 1,25 milliard USD pour son tout premier eurobond",
    excerpt: "La République démocratique du Congo fait son entrée sur le marché international de la dette avec une émission largement sursouscrite, structurée en deux tranches.",
    category: "Obligations",
    date: "2026-04-10",
    imageUrl: "/articles/rdc-eurobond.jpg",
    slug: "rdc-premier-eurobond"
  },
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
            <h2 className="luxury-heading">
              Dernières{' '}
              <span style={{ color: 'var(--jaune-or)' }}>
                informations.
              </span>
            </h2>
          </div>
          
          <Link
            to="/actualites"
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
          </Link>
        </div>

        {/* All-vertical card grid */}
        <div ref={listRef} className="reveal-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {NEWS_ARTICLES.map((article) => (
            <Link
              key={article.slug}
              to="/actualites/$slug"
              params={{ slug: article.slug }}
              className="group flex flex-col bg-[var(--pure-white)] rounded-2xl border border-[var(--mauve-10)] hover:border-[var(--mauve-30)] hover:shadow-xl hover:shadow-[var(--mauve-08)] transition-all duration-500 overflow-hidden"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                />
                <div className="absolute top-5 left-5 z-20">
                  <span className="inline-block px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.15em] text-[var(--mauve)] bg-white/90 backdrop-blur-sm border border-[var(--mauve-15)]">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 lg:p-7 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-4">
                  <FiCalendar size={12} className="text-[var(--night-20)]" />
                  <span
                    className="text-[11px]"
                    style={{ fontFamily: 'var(--font-primary)', fontWeight: 400, color: 'var(--night-60)' }}
                  >
                    {new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>

                <h3
                  className="mb-3 transition-colors duration-300 group-hover:text-[var(--mauve)]"
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontWeight: 700,
                    fontSize: '1.15rem',
                    lineHeight: 1.3,
                    color: 'var(--night)',
                  }}
                >
                  {article.title}
                </h3>

                <p
                  className="mb-6 flex-grow line-clamp-3"
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontWeight: 300,
                    fontSize: '0.9rem',
                    lineHeight: 1.65,
                    color: 'var(--night-60)',
                  }}
                >
                  {article.excerpt}
                </p>

                <span
                  className="inline-flex items-center gap-2 text-[10px] tracking-[0.12em] uppercase group-hover:text-[var(--mauve)] group-hover:gap-3 transition-all duration-300 mt-auto"
                  style={{ fontFamily: 'var(--font-primary)', fontWeight: 600, color: 'var(--night)' }}
                >
                  Lire l'article
                  <FiArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View all link */}
        <div className="mt-12 flex justify-center md:hidden">
          <Link
            to="/actualites"
            className="group inline-flex items-center gap-3"
          >
            <span
              className="relative overflow-hidden text-[11px] tracking-[0.2em] uppercase"
              style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--night)' }}
            >
              Voir toutes les actualités
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--jaune-or)] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)]" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};
