import { useEffect, useRef, useState, useMemo } from 'react';
import { Link } from '@tanstack/react-router';
import { FiArrowRight, FiCalendar, FiClock, FiExternalLink, FiSearch } from 'react-icons/fi';
import { EditableText } from '../cms';
import { gsap } from 'gsap';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

type Article = {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  imageUrl: string;
  slug?: string;
};

function estimateInternalReadTime(content: string): string {
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 200))} min`;
}



export const ActualitesPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.actu-reveal', { y: 40, opacity: 0 });
      gsap.to('.actu-reveal', {
        y: 0, opacity: 1, stagger: 0.08, duration: 0.9, ease: 'power3.out', delay: 0.15
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  // ── Internal articles from Convex ───────────────────────────
  const rawInternalArticles = useQuery(api.articles.getArticles, { status: 'published' });

  const internalArticles: Article[] = useMemo(() => {
    if (!rawInternalArticles) return [];
    return rawInternalArticles.map(a => ({
      title: a.title,
      excerpt: a.excerpt,
      category: a.category,
      date: new Date(a.publishedAt ?? a.createdAt).toISOString().split('T')[0],
      readTime: estimateInternalReadTime(a.content),
      imageUrl: a.imageUrl ?? '',
      slug: a.slug,
    }));
  }, [rawInternalArticles]);

  const featuredArticle: Article | null = useMemo(() => {
    const f = rawInternalArticles?.find(a => a.featured);
    if (!f) return null;
    return {
      title: f.title,
      excerpt: f.excerpt,
      category: f.category,
      date: new Date(f.publishedAt ?? f.createdAt).toISOString().split('T')[0],
      readTime: estimateInternalReadTime(f.content),
      imageUrl: f.imageUrl ?? '',
      slug: f.slug,
    };
  }, [rawInternalArticles]);

  const ARTICLES = useMemo(() =>
    [...internalArticles].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
  [internalArticles]);

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
    <div ref={pageRef} className="font-primary">
      {/* ─── Hero — Dark Image with Overlay ─── */}
      <section className="relative min-h-[55vh] flex items-end pb-16 pt-24 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/Assets_Website/Actualités.png"
            alt="Actualités financières"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 w-full page-container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-end">
            <div className="md:col-span-7">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--jaune-or)]/15 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-[var(--jaune-or)] mb-6">
                <EditableText id="actualites.hero.badge">Centre de presse</EditableText>
              </span>
              <h1 className="font-primary font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-5 text-white">
                <EditableText id="actualites.hero.title">Actualités & Communiqués.</EditableText>
              </h1>
            </div>

            <div className="md:col-span-5 pb-2">
              <p className="text-base md:text-lg leading-relaxed text-white/65 font-light mb-8">
                <EditableText id="actualites.hero.subtitle">Restez informé de nos derniers communiqués de presse, mises à jour et mentions dans les médias.</EditableText>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Search + Filters ─── */}
      <section className="py-10 border-b border-black/5 sticky top-0 z-20 bg-[var(--pure-white)]/95 backdrop-blur-md">
        <div className="page-container">
          <div className="actu-reveal flex flex-col lg:flex-row items-start lg:items-center gap-6 justify-between">
            
            {/* Category Filters */}
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 text-[11px] tracking-[0.1em] uppercase transition-all duration-300 border font-primary rounded-full ${
                      isActive 
                        ? 'font-bold text-[var(--pure-white)] bg-[var(--mauve)] border-[var(--mauve)] shadow-sm' 
                        : 'font-bold text-[var(--mauve)] bg-white border-[var(--mauve)]/10 hover:border-[var(--mauve)]/30 hover:bg-[var(--mauve-10)] shadow-sm'
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
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--mauve)]/40" size={16} />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[var(--mauve)]/15 focus:border-[var(--mauve)] outline-none font-primary text-sm transition-colors rounded-full shadow-sm"
                />
              </div>

              <div className="flex items-center gap-2">
                <select 
                  value={activeYear}
                  onChange={(e) => setActiveYear(e.target.value)}
                  className="px-4 py-2.5 bg-white border border-[var(--mauve)]/15 rounded-full text-sm font-primary focus:outline-none focus:border-[var(--mauve)] text-[var(--night)] shadow-sm cursor-pointer"
                >
                  <option value="Tout">Année</option>
                  {years.filter(y => y !== 'Tout').map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>

                <select 
                  value={activeMonth}
                  onChange={(e) => setActiveMonth(e.target.value)}
                  disabled={activeYear === 'Tout'}
                  className="px-4 py-2.5 bg-white border border-[var(--mauve)]/15 rounded-full text-sm font-primary focus:outline-none focus:border-[var(--mauve)] disabled:opacity-50 text-[var(--night)] shadow-sm cursor-pointer"
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
          <Link to="/actualites/$slug" params={{ slug: featuredArticle.slug! }} className="actu-reveal group grid grid-cols-1 lg:grid-cols-12 gap-0 border border-black/10 hover:border-[var(--mauve)]/50 transition-all duration-500 rounded-2xl overflow-hidden hover:shadow-[0_8px_24px_rgba(70,29,76,0.1)]">
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
                <span className="inline-block bg-[var(--mauve)] px-4 py-1.5 text-[10px] tracking-[0.15em] uppercase font-bold text-white rounded-full">
                  À la une
                </span>
              </div>
            </div>
            <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-center bg-[var(--white-smoke)]/30">
              <div className="flex items-center gap-4 mb-6">
                <span className="flex items-center gap-1.5 text-[10px] tracking-[0.1em] uppercase font-bold text-[var(--mauve)]">
                  {featuredArticle.category}
                </span>
                <span className="w-1 h-1 bg-[rgba(10,10,10,0.3)] rounded-full" />
                <span className="flex items-center gap-1.5 text-[10px] tracking-[0.05em] text-[rgba(10,10,10,0.5)]">
                  <FiCalendar className="text-xs" /> {new Date(featuredArticle.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
              <h2 className="mb-6 group-hover:text-[var(--mauve)] transition-colors duration-300 font-primary font-bold text-3xl md:text-4xl leading-[1.2] text-[var(--night)]">
                {featuredArticle.title}
              </h2>
              <p className="mb-8 font-light text-base leading-[1.7] text-[rgba(10,10,10,0.7)]">
                {featuredArticle.excerpt}
              </p>
              <span className="inline-flex items-center gap-3 text-[11px] tracking-[0.15em] uppercase group-hover:gap-4 group-hover:text-[var(--mauve)] transition-all duration-300 font-bold text-[var(--night)]">
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

            {/* Articles Feed */}
            <div className="lg:col-span-8">
              <div className="actu-reveal flex items-center justify-between mb-12">
                <h3 className="font-primary font-bold text-2xl text-[var(--night)]">
                  Publications récentes
                  <span className="ml-3 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.1em] uppercase bg-[var(--mauve-10)] text-[var(--mauve)]">
                    {ARTICLES.length}
                  </span>
                </h3>
              </div>

              {filteredArticles.length === 0 ? (
                <div className="py-12 text-center text-[var(--night)]/60 font-light">
                  Aucun article ne correspond à vos critères.
                </div>
              ) : (
                <div className="border-t border-black/10">
                  {filteredArticles.map((article, i) =>
                      <Link
                        key={i}
                        to="/actualites/$slug"
                        params={{ slug: article.slug! }}
                        className="actu-reveal group grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-8 py-10 border-b border-black/10 hover:bg-[var(--white-smoke)]/30 transition-colors"
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
                              <span className="text-[var(--mauve)]/30 text-4xl font-bold">{article.title[0]}</span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex flex-col justify-center">
                          <div className="flex flex-wrap items-center gap-2 mb-4">
                            <span className="text-[10px] tracking-[0.12em] uppercase font-bold text-[var(--mauve)]">
                              {article.category}
                            </span>
                            <span className="flex items-center gap-1 text-[10px] text-[rgba(10,10,10,0.5)]">
                              <FiCalendar className="text-[9px]" />
                              {new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                            <span className="flex items-center gap-1 text-[10px] text-[rgba(10,10,10,0.5)]">
                              <FiClock className="text-[9px]" /> {article.readTime}
                            </span>
                          </div>
                          <h4 className="mb-3 group-hover:text-[var(--mauve)] transition-colors duration-300 font-primary font-bold text-xl leading-[1.35] text-[var(--night)]">
                            {article.title}
                          </h4>
                          <p className="mb-4 line-clamp-2 font-light text-sm leading-[1.65] text-[rgba(10,10,10,0.7)]">
                            {article.excerpt}
                          </p>
                          <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.12em] uppercase text-[var(--mauve)] group-hover:gap-3 transition-all duration-300 font-bold">
                            Lire <FiArrowRight />
                          </span>
                        </div>
                      </Link>
                  )}
                </div>
              )}

            </div>

            {/* ─── Sidebar ─── */}
            <aside className="lg:col-span-4 flex flex-col gap-10">

              {/* Ad Banner — Premium CTA */}
              <div className="actu-reveal relative overflow-hidden min-h-[400px] flex flex-col justify-end p-8 section-bg-light rounded-2xl">
                <div className="absolute inset-0">
                  <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="" className="w-full h-full object-cover opacity-20" />
                </div>
                <div className="relative z-10">
                  <span className="inline-block px-3 py-1 mb-5 text-[9px] tracking-[0.2em] uppercase font-bold text-[var(--jaune-or)] bg-[var(--jaune-or)]/10 rounded-full">
                    Publicité
                  </span>
                  <h4 className="text-xl mb-3 font-primary font-bold leading-[1.25] text-[var(--pure-white)]">
                    Ouvrez votre compte-titres 100% en ligne
                  </h4>
                  <p className="text-sm mb-6 font-light leading-[1.6] text-white/70">
                    Accédez aux meilleures opportunités de la BRVM avec notre plateforme sécurisée.
                  </p>
                  <a
                    href="https://everest-account-opening.vercel.app/new-home"
                    className="inline-flex items-center gap-2 bg-[var(--jaune-or)] text-[var(--night)] px-6 py-3 rounded-full text-[11px] tracking-[0.12em] uppercase font-bold hover:bg-white transition-colors duration-300"
                  >
                    Commencer <FiExternalLink />
                  </a>
                </div>
              </div>

              {/* Categories */}
              <div className="actu-reveal border border-black/10 p-8 rounded-2xl">
                <h3 className="font-primary font-bold text-lg mb-6 text-[var(--night)]">
                  Rubriques
                </h3>
                <ul className="flex flex-col">
                  {['Communiqués de presse', 'Mentions médias', 'Mises à jour', 'Événements'].map((cat, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="flex justify-between items-center py-3 text-sm hover:text-[var(--mauve)] transition-colors duration-200 border-b border-black/5 last:border-0 font-normal text-[var(--night)] group"
                      >
                        <span>{cat}</span>
                        <FiArrowRight className="text-xs opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter */}
              <div className="actu-reveal border border-black/10 p-8 rounded-2xl">
                <h3 className="font-primary font-bold text-lg mb-2 text-[var(--night)]">
                  Newsletter
                </h3>
                <p className="text-sm mb-5 font-light leading-[1.6] text-[rgba(10,10,10,0.6)]">
                  Recevez nos communiqués et analyses directement dans votre boîte mail.
                </p>
                <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    placeholder="votre@email.com"
                    className="bg-white border border-black/10 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-[var(--mauve)] transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-[var(--mauve)] rounded-full text-white px-5 py-3 text-[11px] tracking-[0.12em] uppercase hover:bg-[var(--night)] hover:text-white transition-colors duration-300 font-bold"
                  >
                    S'abonner
                  </button>
                </form>
              </div>

            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};
