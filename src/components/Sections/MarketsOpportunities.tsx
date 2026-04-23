import { Link } from '@tanstack/react-router';
import { FiArrowRight, FiCalendar } from 'react-icons/fi';
import { useReveal } from '../Hooks/useReveal';
import { SectionHeader } from '../ui';

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
    excerpt:
      "La BRVM orchestre un rebond, clôturant la séance en territoire positif. L'indice BRVM Composite gagne 0,13 % à 406,95 points, porté par Sucrivoire (+7,32 %) et Société Générale CI (+2,66 %).",
    category: 'Marchés',
    date: '2026-04-09',
    imageUrl: '/articles/brvm-marche.jpg',
    slug: 'brvm-sucrivoire-societe-generale-ci',
  },
  {
    title: "À Abidjan, le paradoxe d'un continent riche en capital mais pauvre en financement",
    excerpt:
      "Réunis à l'initiative de la BAD, les acteurs de la finance africaine constatent un déficit de 400 milliards USD/an malgré 4 000 milliards d'épargne disponible.",
    category: 'Finance',
    date: '2026-04-10',
    imageUrl: '/articles/abidjan-finance.jpg',
    slug: 'abidjan-paradoxe-financement-afrique',
  },
  {
    title: 'La RDC lève 1,25 milliard USD pour son tout premier eurobond',
    excerpt:
      "La République démocratique du Congo fait son entrée sur le marché international de la dette avec une émission largement sursouscrite, structurée en deux tranches.",
    category: 'Obligations',
    date: '2026-04-10',
    imageUrl: '/articles/rdc-eurobond.jpg',
    slug: 'rdc-premier-eurobond',
  },
];

export const MarketsOpportunities: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>();
  const gridRef = useReveal<HTMLDivElement>();

  return (
    <section
      ref={sectionRef}
      className="reveal relative py-16 md:py-20 bg-[var(--pure-white)]"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="mb-10 md:mb-12">
          <SectionHeader
            heading={
              <>
                Marchés <span style={{ color: 'var(--jaune-or)' }}>&amp; opportunités.</span>
              </>
            }
            subtext="Actualités BRVM, dette souveraine et financement régional : veille structurée sur les marchés UEMOA."
            align="left"
            dark={false}
            action={{
              label: 'Voir toutes les actualités',
              href: '/actualites',
              variant: 'primary',
            }}
          />
        </div>

        <div
          ref={gridRef}
          className="reveal-stagger grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {NEWS_ARTICLES.map((article) => (
            <Link
              key={article.slug}
              to="/actualites/$slug"
              params={{ slug: article.slug }}
              className="group flex min-h-0 flex-col overflow-hidden rounded-xl border border-[var(--command-border)] bg-[var(--command-surface)] transition-all duration-500 hover:border-[var(--mauve-20)] hover:shadow-md"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-t-xl">
                <div className="absolute inset-0 z-10 bg-black/5 transition-colors duration-500 group-hover:bg-transparent" />
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="h-full w-full transform object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
                <div className="absolute left-5 top-5 z-20">
                  <span className="inline-block rounded-full border border-[var(--mauve-15)] bg-white/90 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-[var(--mauve)] backdrop-blur-sm">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="flex flex-grow flex-col p-6 lg:p-7">
                <div className="mb-4 flex items-center gap-2">
                  <FiCalendar size={12} className="text-[var(--night-20)]" />
                  <span
                    className="text-[11px]"
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontWeight: 400,
                      color: 'var(--night-60)',
                    }}
                  >
                    {new Date(article.date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
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
                  className="mt-auto inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] transition-all duration-300 group-hover:gap-3 group-hover:text-[var(--mauve)]"
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontWeight: 600,
                    color: 'var(--night)',
                  }}
                >
                  Lire l&apos;article
                  <FiArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
