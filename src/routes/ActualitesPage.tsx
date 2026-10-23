import { useEffect, useState, useMemo } from 'react';
import { Link } from '@tanstack/react-router';
import { FiArrowRight, FiCalendar, FiClock, FiSearch } from 'react-icons/fi';
import { N1, N2 } from '../components/Referentiel';
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

  return (
    <div>
      {/* ─── Hero: referential V2.1 §5 ─── */}
      <section className="bg-[var(--everest-green)] pt-[180px] pb-14 md:pb-20">
        <div className="page-container">
          <h1
            className="mb-10 font-bold leading-[0.95]! tracking-tight text-white md:mb-14"
            style={{ fontSize: 'clamp(2.375rem, 4.6vw + 1.2rem, 50px)' }}
          >
            Actualités
          </h1>
          <div className="flex max-w-4xl flex-col gap-6">
            <N1 id="actualites.n1" tone="dark" as="p" size="statement" />
            <N2 id="actualites.n2" tone="dark" />
          </div>
        </div>
      </section>

      {/* ─── Search + Filters ─── */}
      <section className="py-10 border-b border-black/5 sticky top-[var(--site-chrome-sticky)] z-20 bg-[var(--pure-white)]/95 backdrop-blur-md">
        <div className="page-container">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 justify-between">
            
            {/* Category Filters */}
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    aria-pressed={isActive}
                    className={`px-4 py-2 text-[11px] tracking-[0.1em] uppercase transition-all duration-300 border font-primary rounded-full ${
                      isActive 
                        ? 'font-bold text-[var(--everest-green)] bg-[var(--jaune-or)] border-[var(--jaune-or)] shadow-sm' 
                        : 'font-bold text-[var(--night-80)] bg-white border-[var(--mauve)]/10 hover:border-[var(--mauve)]/30 hover:bg-[var(--mauve-10)] shadow-sm'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Right side: Search + Selectors */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
              <div className="relative w-full sm:w-64">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--night-80)]/40" size={16} />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  aria-label="Rechercher"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[var(--mauve)]/15 focus:border-[var(--mauve)] font-primary text-sm transition-colors rounded-full shadow-sm"
                />
              </div>

              <div className="flex items-center gap-2">
                <select 
                  value={activeYear}
                  onChange={(e) => setActiveYear(e.target.value)}
                  aria-label="Année"
                  className="px-4 py-2.5 bg-white border border-[var(--mauve)]/15 rounded-full text-sm font-primary focus:border-[var(--mauve)] text-[var(--night)] shadow-sm cursor-pointer"
                >
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
                  className="px-4 py-2.5 bg-white border border-[var(--mauve)]/15 rounded-full text-sm font-primary focus:border-[var(--mauve)] disabled:opacity-50 text-[var(--night)] shadow-sm cursor-pointer"
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
      <section className="bg-[var(--pure-white)] py-24 md:py-40 border-b border-black/10">
        <div className="page-container">
          <Link
            to={articleHref(featuredArticle)}
            className="group grid grid-cols-1 lg:grid-cols-12 gap-0 border border-black/10 hover:border-[var(--mauve)]/50 transition-all duration-500 rounded-2xl overflow-hidden hover:shadow-[0_8px_24px_rgba(14,40,38,0.1)]"
            target={opensInNewTab(featuredArticle) ? '_blank' : undefined}
            rel={opensInNewTab(featuredArticle) ? 'noopener noreferrer' : undefined}
          >
            <div className="lg:col-span-7 relative overflow-hidden">
              <div className="aspect-[16/10] lg:aspect-auto lg:absolute lg:inset-0">
                <img
                  src={featuredArticle.imageUrl}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
              </div>
              <div className="absolute top-6 left-6 z-10">
                <span className="inline-block bg-[var(--jaune-or)] px-4 py-1.5 text-[10px] tracking-[0.15em] uppercase font-bold text-[var(--everest-green)] rounded-full">
                  À la une
                </span>
              </div>
            </div>
            <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-center bg-[var(--white-smoke)]/30">
              <div className="flex items-center gap-4 mb-6">
                <span className="flex items-center gap-1.5 text-[10px] tracking-[0.1em] uppercase font-bold text-[var(--night-80)]">
                  {featuredArticle.category}
                </span>
                <span className="w-1 h-1 bg-[rgba(10,10,10,0.3)] rounded-full" />
                <span className="flex items-center gap-1.5 text-[10px] tracking-[0.05em] text-[var(--night-80)]">
                  <FiCalendar className="text-xs" /> {new Date(featuredArticle.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
              <h2 className="mb-6 group-hover:text-[var(--night-80)] transition-colors duration-300 font-primary font-bold text-3xl md:text-4xl leading-[1.2] text-[var(--night)]">
                {featuredArticle.title}
              </h2>
              <p className="mb-8 font-light text-base leading-[1.7] text-[rgba(10,10,10,0.7)]">
                {featuredArticle.excerpt}
              </p>
              <span className="inline-flex items-center gap-3 text-[11px] tracking-[0.15em] uppercase group-hover:gap-4 group-hover:text-[var(--night-80)] transition-all duration-300 font-bold text-[var(--night)]">
                Lire le communiqué
                <span className="inline-block w-6 h-[1px] bg-current group-hover:w-10 transition-all duration-500" />
              </span>
            </div>
          </Link>
        </div>
      </section>
      )}

      {/* ─── Main Content: Articles + Sidebar ─── */}
      <section className="bg-[var(--pure-white)] py-24 md:py-40">
        <div className="page-container">
          <div className="max-w-5xl">

            {/* Articles Feed */}
            <div>
              {filteredArticles.length === 0 ? (
                <div className="py-12 text-center text-[var(--night-80)] font-light">
                  Aucun article ne correspond à vos critères.
                </div>
              ) : (
                <div className="border-t border-black/10">
                  {filteredArticles.map((article, i) =>
                      <Link
                        key={i}
                        to={articleHref(article)}
                        className="group grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-8 py-10 border-b border-black/10 hover:bg-[var(--white-smoke)]/30 transition-colors"
                        target={opensInNewTab(article) ? '_blank' : undefined}
                        rel={opensInNewTab(article) ? 'noopener noreferrer' : undefined}
                      >
                        {/* Thumbnail */}
                        <div className="relative aspect-[4/3] overflow-hidden bg-[var(--white-smoke)] rounded-2xl">
                          {article.imageUrl ? (
                            <img
                              src={article.imageUrl}
                              alt={article.title}
                              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--mauve-10)] to-[var(--summit-ivory)] flex items-center justify-center">
                              <span className="text-[var(--night-80)]/30 text-4xl font-bold">{article.title[0]}</span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex flex-col justify-center">
                          <div className="flex flex-wrap items-center gap-2 mb-4">
                            <span className="text-[10px] tracking-[0.12em] uppercase font-bold text-[var(--night-80)]">
                              {article.category}
                            </span>
                            <span className="flex items-center gap-1 text-[10px] text-[var(--night-80)]">
                              <FiCalendar className="text-[9px]" />
                              {new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                            <span className="flex items-center gap-1 text-[10px] text-[var(--night-80)]">
                              <FiClock className="text-[9px]" /> {article.readTime}
                            </span>
                          </div>
                          <h2 className="mb-3 group-hover:text-[var(--night-80)] transition-colors duration-300 font-primary font-bold text-xl leading-[1.35]! text-[var(--night)]">
                            {article.title}
                          </h2>
                          <p className="mb-4 line-clamp-2 font-light text-sm leading-[1.65] text-[rgba(10,10,10,0.7)]">
                            {article.excerpt}
                          </p>
                          <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.12em] uppercase text-[var(--night-80)] group-hover:gap-3 transition-all duration-300 font-bold">
                            Lire <FiArrowRight />
                          </span>
                        </div>
                      </Link>
                  )}
                </div>
              )}

            </div>

          </div>
        </div>
      </section>
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

