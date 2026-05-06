import { Link } from '@tanstack/react-router';
import { FiArrowRight, FiCalendar, FiFileText } from 'react-icons/fi';
import { useReveal } from '../Hooks/useReveal';
import { EditableText } from '../../cms';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useMemo } from 'react';

/* ─── Data: Actualités ─── */

type NewsArticle = {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  imageUrl: string;
  slug: string;
};

/* ─── Data: Publications ─── */

type Frequency = 'hebdomadaire' | 'mensuelle' | 'semestrielle';

type Publication = {
  id: string;
  title: string;
  desc: string;
  frequency: Frequency;
  date: string;
  fileUrl: string;
  fileSize: string;
  pages?: number;
};

const FREQUENCY_LABELS: Record<Frequency, string> = {
  hebdomadaire: 'Hebdomadaire',
  mensuelle: 'Mensuelle',
  semestrielle: 'Semestrielle',
};

const PUBLICATIONS: Array<Publication> = [
  {
    id: 'revue-hebdo-32',
    title: 'Revue Hebdomadaire — 20 au 24 avril 2026',
    desc: "Synthèse hebdomadaire des performances du marché boursier régional, tendances sectorielles et recommandations d'investissement.",
    frequency: 'hebdomadaire',
    date: '2026-04-24',
    fileUrl: '/publications/Revue-Hebdo-32.pdf',
    fileSize: '14.0 MB',
    pages: 10,
  },
  {
    id: 'revue-hebdo-example',
    title: 'Revue Hebdomadaire — 1 au 4 avril 2026',
    desc: "Synthèse hebdomadaire des performances du marché boursier régional, tendances sectorielles et recommandations d'investissement.",
    frequency: 'hebdomadaire',
    date: '2026-04-04',
    fileUrl: '/publications/Revue-Hebdomadaire-example.pdf',
    fileSize: '13.2 MB',
    pages: 9,
  },
  {
    id: 'revue-semestrielle-sep-26',
    title: 'Revue Semestrielle — S1 2026',
    desc: "Bilan semestriel complet : analyse macro-économique UEMOA, performances des indices, faits marquants et perspectives du second semestre.",
    frequency: 'semestrielle',
    date: '2026-09-20',
    fileUrl: '/publications/Revue-semestrielle-20.09.26-1.pdf',
    fileSize: '10.5 MB',
    pages: 16,
  },
];

/* ─── Main Component ─── */

export const InsightsMerged: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>();
  const gridRef = useReveal<HTMLDivElement>();

  const rawArticles = useQuery(api.articles.getArticles, { status: 'published' });

  const NEWS_ARTICLES: NewsArticle[] = useMemo(() => {
    if (!rawArticles) return [];
    return rawArticles
      .sort((a, b) => (b.publishedAt ?? b.createdAt) - (a.publishedAt ?? a.createdAt))
      .slice(0, 3)
      .map((a) => ({
        title: a.title,
        excerpt: a.excerpt,
        category: a.category,
        date: new Date(a.publishedAt ?? a.createdAt).toISOString().split('T')[0],
        imageUrl: a.imageUrl ?? '/articles/default.jpg',
        slug: a.slug,
      }));
  }, [rawArticles]);

  const featured = PUBLICATIONS[0];
  const secondary = PUBLICATIONS.slice(1);

  return (
    <section
      ref={sectionRef}
      className="reveal relative overflow-hidden"
      style={{ background: 'var(--gradient-ivory-section)' }}
    >
      <div
        className="pointer-events-none absolute left-0 top-0 h-full w-full"
        style={{
          background:
            'radial-gradient(ellipse 55% 34% at 18% 16%, var(--mauve-05) 0%, transparent 60%), radial-gradient(ellipse 35% 26% at 84% 64%, var(--jaune-or-05) 0%, transparent 52%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 pb-16 pt-24 md:px-16 md:pt-32 md:pb-20 lg:px-24">
        <div className="mb-10 md:mb-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="luxury-heading">
                <EditableText id="home.insights.title" as="span">
                  Insights
                </EditableText>
              </h2>
              <EditableText
                id="home.insights.subtext"
                as="p"
                className="text-secondary mt-4 max-w-md text-base md:text-lg"
              >
                Veille de marché, actualités BRVM et notes de recherche pour éclairer vos décisions
                d&apos;investissement sur les marchés UEMOA.
              </EditableText>
            </div>
          </div>
        </div>

        {/* ─── Actualités grid ─── */}
        <div className="mb-14 md:mb-18">
          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="font-primary text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--mauve-60)]">
              <EditableText id="home.insights.actualitesKicker" as="span">
                Actualités
              </EditableText>
            </p>
            <Link
              to="/actualites"
              className="group inline-flex items-center gap-2 font-primary text-xs font-semibold uppercase tracking-[0.12em] text-[var(--mauve)] transition-all duration-300 hover:gap-3"
            >
              <EditableText id="home.insights.actualitesLink" as="span">
                Toutes les actualités
              </EditableText>
              <FiArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div
            ref={gridRef}
            className="reveal-stagger -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-6 pb-2 no-scrollbar md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3"
          >
            {NEWS_ARTICLES.map((article) => (
              <Link
                key={article.slug}
                to="/actualites/$slug"
                params={{ slug: article.slug }}
                className="group flex min-h-0 w-[min(100%,85vw)] max-w-sm shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-[var(--command-border)] bg-[var(--pure-white)] transition-all duration-500 hover:border-[var(--mauve-20)] hover:shadow-md md:w-auto md:max-w-none"
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

        {/* ─── Publications ─── */}
        <div>
          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="font-primary text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--mauve-60)]">
              <EditableText id="home.insights.publicationsKicker" as="span">
                Publications
              </EditableText>
            </p>
            <Link
              to="/publications"
              className="group inline-flex items-center gap-2 font-primary text-xs font-semibold uppercase tracking-[0.12em] text-[var(--mauve)] transition-all duration-300 hover:gap-3"
            >
              <EditableText id="home.insights.publicationsLink" as="span">
                Toutes les publications
              </EditableText>
              <FiArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
            <a
              href={featured.fileUrl}
              download
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-[var(--mauve)] p-7 md:p-9 lg:col-span-7 lg:min-h-[360px]"
            >
              <div className="relative z-10">
                <span
                  className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 font-primary text-[10px] font-semibold uppercase tracking-[0.2em] text-white"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--jaune-or)]" aria-hidden />
                  À la une
                </span>

                <h3 className="mb-3 max-w-xl font-primary text-xl font-bold leading-snug tracking-tight text-white md:text-2xl">
                  {featured.title}
                </h3>

                <p className="max-w-xl font-primary text-sm font-light leading-relaxed text-white/70 md:text-[15px]">
                  {featured.desc}
                </p>
              </div>

              <div className="relative mt-8 flex items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-primary text-xs font-light tracking-wide text-white/50">
                  <span>
                    {new Date(featured.date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                  <span aria-hidden>·</span>
                  <span>{FREQUENCY_LABELS[featured.frequency]}</span>
                  {featured.pages && (
                    <>
                      <span aria-hidden>·</span>
                      <span>{featured.pages} pages</span>
                    </>
                  )}
                </div>
                <span className="inline-flex items-center gap-2 font-primary text-xs font-semibold uppercase tracking-[0.14em] text-[var(--jaune-or)] transition-all duration-300 group-hover:gap-3">
                  Lire la publication
                  <FiArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </div>
            </a>

            {/* SECONDARY — dynamic layout based on count */}
            {secondary.length === 0 ? (
              <div className="flex items-center justify-center rounded-2xl border border-dashed border-[var(--mauve)]/20 bg-[var(--mauve-05)] p-8 lg:col-span-5 lg:min-h-[360px]">
                <div className="text-center">
                  <FiFileText className="mx-auto mb-3 text-3xl text-[var(--mauve-40)]" />
                  <p className="font-primary text-sm text-[var(--mauve-60)]">Aucune publication supplémentaire</p>
                </div>
              </div>
            ) : secondary.length === 1 ? (
              <a
                href={secondary[0].fileUrl}
                download
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--command-border)] bg-[var(--pure-white)] p-7 md:p-9 lg:col-span-5 lg:min-h-[360px] transition-all duration-300 hover:border-[var(--mauve-20)] hover:shadow-[var(--shadow-card-lift)]"
              >
                <div>
                  <p className="mb-4 font-primary text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--mauve-60)]">
                    Note de recherche · {FREQUENCY_LABELS[secondary[0].frequency]}
                  </p>
                  <h4 className="mb-4 font-primary text-lg font-bold leading-snug tracking-tight text-[var(--mauve)] md:text-xl">
                    {secondary[0].title}
                  </h4>
                  <p className="font-primary text-sm font-light leading-relaxed text-[var(--night-60)]">
                    {secondary[0].desc}
                  </p>
                </div>
                <div className="mt-8 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 font-primary text-xs font-light text-[var(--night-40)]">
                    <span>
                      {new Date(secondary[0].date).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                    <span aria-hidden>·</span>
                    <span>{secondary[0].fileSize}</span>
                    {secondary[0].pages && (
                      <>
                        <span aria-hidden>·</span>
                        <span>{secondary[0].pages} p.</span>
                      </>
                    )}
                  </div>
                  <span className="inline-flex items-center gap-2 font-primary text-xs font-semibold uppercase tracking-[0.14em] text-[var(--mauve)] transition-all duration-300 group-hover:gap-3">
                    Lire
                    <FiArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </a>
            ) : (
              <div className={`flex flex-col gap-4 lg:col-span-5 lg:min-h-[360px] ${secondary.length === 2 ? 'lg:gap-6' : ''}`}>
                {secondary.map((it) => (
                  <a
                    key={it.id}
                    href={it.fileUrl}
                    download
                    className={`group flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--command-border)] bg-[var(--pure-white)] p-5 transition-all duration-300 hover:border-[var(--mauve-20)] hover:shadow-[var(--shadow-card-lift)] md:p-6 ${
                      secondary.length === 2 ? 'lg:flex-1' : ''
                    }`}
                  >
                    <div>
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--mauve-05)] text-[var(--mauve)] transition-colors duration-300 group-hover:bg-[var(--mauve)] group-hover:text-[var(--pure-white)]">
                          <FiFileText className="text-base" aria-hidden />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-primary text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--mauve-60)]">
                            Note de recherche · {FREQUENCY_LABELS[it.frequency]}
                          </p>
                          <h4 className="font-primary text-sm font-semibold leading-snug tracking-tight text-[var(--mauve)] md:text-base">
                            {it.title}
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 font-primary text-[11px] font-light text-[var(--night-40)]">
                        <span>
                          {new Date(it.date).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                        <span aria-hidden>·</span>
                        <span>{it.fileSize}</span>
                        {it.pages && (
                          <>
                            <span aria-hidden>·</span>
                            <span>{it.pages} p.</span>
                          </>
                        )}
                      </div>
                      <FiArrowRight
                        className="shrink-0 text-sm text-[var(--mauve-40)] transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-[var(--mauve)]"
                        aria-hidden
                      />
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
