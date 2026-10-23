import { useEffect, useState, useMemo } from 'react';
import { Link } from '@tanstack/react-router';
import { FiSearch } from 'react-icons/fi';
import { ArrowUpRight, N1, N2, PageHero, RULE } from '../components/Referentiel';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

export type ActualitesArticle = {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  imageUrl: string;
  slug?: string;
  href?: string;
  external?: boolean;
  featured?: boolean;
};

function estimateInternalReadTime(content: string): string {
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 200))} min`;
}

function articleHref(article: ActualitesArticle): string {
  if (article.slug) return `/actualites/${article.slug}`
  if (article.external && article.href) return article.href
  return article.href ?? '/actualites'
}

function opensInNewTab(article: ActualitesArticle): boolean {
  return Boolean(article.external && article.href?.startsWith('http'))
}

export function ActualitesView({ articles }: { articles: ActualitesArticle[] }) {
  const featuredArticle = useMemo(
    () => articles.find((article) => article.featured) ?? articles[0] ?? null,
    [articles],
  );

  const ARTICLES = articles;

  const CATEGORIES = useMemo(() => {
    const cats = new Set(['Tout']);
    ARTICLES.forEach(a => cats.add(a.category));
    return Array.from(cats);
  }, [ARTICLES]);

  const [activeCategory, setActiveCategory] = useState<string>('Tout');
  const [activeYear, setActiveYear] = useState<string>('Tout');
  const [activeMonth, setActiveMonth] = useState<string>('Tout');
  const [searchQuery, setSearchQuery] = useState('');

  const years = useMemo(() => {
    const y = new Set(ARTICLES.map(a => new Date(a.date).getFullYear().toString()));
    return ['Tout', ...Array.from(y).sort().reverse()];
  }, [ARTICLES]);

  const months = useMemo(() => {
    if (activeYear === 'Tout') return ['Tout'];
    const m = new Set(
      ARTICLES.filter(a => new Date(a.date).getFullYear().toString() === activeYear)
        .map(a => (new Date(a.date).getMonth() + 1).toString().padStart(2, '0'))
    );
    return ['Tout', ...Array.from(m).sort()];
  }, [activeYear, ARTICLES]);

  // Reset month if year changes and month not in new year
  useEffect(() => {
    if (activeMonth !== 'Tout' && !months.includes(activeMonth)) {
      setActiveMonth('Tout');
    }
  }, [months, activeMonth]);

  const filteredArticles = useMemo(() => {
    return [...ARTICLES].filter(article => {
      const d = new Date(article.date);
      const yearMatch = activeYear === 'Tout' || d.getFullYear().toString() === activeYear;
      const monthMatch = activeMonth === 'Tout' || (d.getMonth() + 1).toString().padStart(2, '0') === activeMonth;
      const categoryMatch = activeCategory === 'Tout' || article.category === activeCategory;
      const searchMatch = searchQuery === '' || 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return yearMatch && monthMatch && categoryMatch && searchMatch;
    });
  }, [ARTICLES, activeYear, activeMonth, activeCategory, searchQuery]);

  const dateLabel = (date: string) => new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div>
      {/* ─── Hero: referential V2.1 §5 ─── */}
      <PageHero title="Actualités">
        <N1 id="actualites.n1" tone="dark" as="p" size="statement" />
        <N2 id="actualites.n2" tone="dark" />
      </PageHero>

      {/* An empty collection shows no toolbar and no « no match » message (DESIGN-PLAN 4.1). */}
      {ARTICLES.length > 0 && (
        <>
      {/* ─── Search + Filters ─── */}
      <section className="py-6 md:py-8 bg-[var(--home-white)] shadow-[inset_0_-1px_0_var(--home-rule)]">
        <div className="page-container">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 justify-between">
            <div className="flex flex-wrap items-center gap-1">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    aria-pressed={isActive}
                    className={`min-h-12 px-4 text-[15px] font-semibold transition-colors cursor-pointer ${
                      isActive ? 'bg-[var(--home-ink)] text-white' : 'text-[var(--home-ink)] hover:bg-[var(--home-paper)]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              <div className="relative w-full sm:w-64">
                <FiSearch aria-hidden className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--home-mid)]" size={16} />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  aria-label="Rechercher"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full min-h-12 pl-11 pr-4 border border-[color-mix(in_srgb,var(--home-ink)_55%,transparent)] hover:border-[var(--home-mid)] focus:border-[var(--home-ink)] bg-white text-[15px] text-[var(--home-ink)] transition-colors"
                />
              </div>
              <div className="flex items-center gap-2">
                <select value={activeYear} onChange={(e) => setActiveYear(e.target.value)} aria-label="Année" className="min-h-12 px-4 cursor-pointer border border-[color-mix(in_srgb,var(--home-ink)_55%,transparent)] hover:border-[var(--home-mid)] focus:border-[var(--home-ink)] bg-white text-[15px] text-[var(--home-ink)] transition-colors">
                  <option value="Tout">Année</option>
                  {years.filter(y => y !== 'Tout').map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
                <select
                  value={activeMonth}
                  onChange={(e) => setActiveMonth(e.target.value)}
                  aria-label="Mois"
                  disabled={activeYear === 'Tout'}
                  className="min-h-12 px-4 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 border border-[color-mix(in_srgb,var(--home-ink)_55%,transparent)] hover:border-[var(--home-mid)] focus:border-[var(--home-ink)] bg-white text-[15px] text-[var(--home-ink)] transition-colors"
                >
                  <option value="Tout">Mois</option>
                  {months.filter(m => m !== 'Tout').map(m => (
                    <option key={m} value={m}>{new Date(2000, parseInt(m) - 1).toLocaleString('fr-FR', { month: 'long' })}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Featured Article ─── */}
      {featuredArticle && (
      <section className="bg-[var(--home-paper)] py-12 md:py-20 lg:py-28">
        <div className="page-container">
          <Link
            to={articleHref(featuredArticle)}
            className="group grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16"
            target={opensInNewTab(featuredArticle) ? '_blank' : undefined}
            rel={opensInNewTab(featuredArticle) ? 'noopener noreferrer' : undefined}
          >
            <div className="lg:col-span-7 aspect-[16/10] overflow-hidden bg-[var(--home-ink)]">
              <img src={featuredArticle.imageUrl} alt={featuredArticle.title} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="lg:col-span-5 flex flex-col justify-center gap-4">
              <p className="text-[13px] leading-[1.5] text-[var(--home-mid)]">
                <span className="font-semibold text-[var(--home-ink)]">À la une</span>{' · '}{featuredArticle.category}{' · '}
                <time dateTime={featuredArticle.date}>{dateLabel(featuredArticle.date)}</time>
              </p>
              <h2 className="text-[clamp(26px,2.6vw,36px)] font-medium leading-[1.2]! tracking-[-0.02em] text-[var(--home-ink)] transition-colors duration-200 group-hover:text-[var(--home-mid)]">
                {featuredArticle.title}
              </h2>
              <p className="text-base leading-[1.65] text-[var(--home-mid)]">{featuredArticle.excerpt}</p>
              <span className="home-link text-[var(--home-ink)]">
                Lire le communiqué
                <ArrowUpRight />
              </span>
            </div>
          </Link>
        </div>
      </section>
      )}

      {/* ─── Articles ─── */}
      <section className="bg-[var(--home-white)] py-12 md:py-20 lg:py-28">
        <div className="page-container">
          <div className="max-w-5xl">
              {filteredArticles.length === 0 ? (
                <p className="py-12 text-base text-[var(--home-mid)]">Aucun article ne correspond à vos critères.</p>
              ) : (
                <div className="shadow-[inset_0_-1px_0_var(--home-rule)]">
                  {filteredArticles.map((article, i) =>
                      <Link
                        key={i}
                        to={articleHref(article)}
                        className={`group grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-8 py-10 ${RULE.light}`}
                        target={opensInNewTab(article) ? '_blank' : undefined}
                        rel={opensInNewTab(article) ? 'noopener noreferrer' : undefined}
                      >
                        <div className="relative aspect-[4/3] overflow-hidden bg-[var(--home-paper)]">
                          {article.imageUrl && (
                            <img src={article.imageUrl} alt={article.title} className="absolute inset-0 h-full w-full object-cover" referrerPolicy="no-referrer" />
                          )}
                        </div>
                        <div className="flex flex-col justify-center gap-3">
                          <p className="text-[13px] leading-[1.5] text-[var(--home-mid)]">
                            {article.category}{' · '}<time dateTime={article.date}>{dateLabel(article.date)}</time>{' · '}{article.readTime}
                          </p>
                          <h2 className="text-[19px] md:text-[22px] font-semibold leading-[1.35]! tracking-[-0.015em] text-[var(--home-ink)] transition-colors duration-200 group-hover:text-[var(--home-mid)]">
                            {article.title}
                          </h2>
                          <p className="line-clamp-2 text-[15px] leading-[1.65] text-[var(--home-mid)]">{article.excerpt}</p>
                          <span className="home-link text-[var(--home-ink)]">
                            Lire
                            <ArrowUpRight />
                          </span>
                        </div>
                      </Link>
                  )}
                </div>
              )}
          </div>
        </div>
      </section>
        </>
      )}
    </div>
  );
};

export const ActualitesPage = () => {
  const rawInternalArticles = useQuery(api.articles.getArticles, { status: 'published' });

  const articles = useMemo<ActualitesArticle[]>(() => {
    if (!rawInternalArticles) return [];
    return rawInternalArticles.map((article) => ({
      title: article.title,
      excerpt: article.excerpt,
      category: article.category,
      date: new Date(article.publishedAt ?? article.createdAt).toISOString().split('T')[0],
      readTime: estimateInternalReadTime(article.content),
      imageUrl: article.imageUrl ?? '',
      slug: article.slug,
      featured: article.featured,
    }));
  }, [rawInternalArticles]);

  if (rawInternalArticles === undefined) return null;
  return <ActualitesView articles={articles} />;
};

