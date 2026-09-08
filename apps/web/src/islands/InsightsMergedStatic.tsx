import { Link } from '@tanstack/react-router'
import { FiArrowRight, FiCalendar, FiFileText } from 'react-icons/fi'
import { useReveal } from '@/components/Hooks/useReveal'
import { EditableText } from '@/cms'
import type { NewsItem, Publication } from '../../lib/payload'

type Frequency = 'hebdomadaire' | 'mensuelle' | 'semestrielle'

type PubCard = {
  id: string
  title: string
  desc: string
  frequency: Frequency
  date: string
  href: string
}

const FREQUENCY_LABELS: Record<Frequency, string> = {
  hebdomadaire: 'Hebdomadaire',
  mensuelle: 'Mensuelle',
  semestrielle: 'Semestrielle',
}

function pubFrequency(category: string): Frequency {
  if (category.includes('mensuel')) return 'mensuelle'
  if (category.includes('semest')) return 'semestrielle'
  return 'hebdomadaire'
}

function mapPublication(pub: Publication): PubCard {
  return {
    id: String(pub.id),
    title: pub.title,
    desc: pub.excerpt || pub.description,
    frequency: pubFrequency(pub.category),
    date: pub.publishedAt?.split('T')[0] ?? '',
    href: `/publications/${pub.slug}`,
  }
}

type Props = {
  news: NewsItem[]
  publications: Publication[]
}

export function InsightsMergedStatic({ news, publications }: Props) {
  const sectionRef = useReveal<HTMLElement>()
  const gridRef = useReveal<HTMLDivElement>()
  const articles = news.slice(0, 3)
  const pubCards = publications.map(mapPublication)
  const featured = pubCards[0]
  const secondary = pubCards.slice(1, 3)

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
            Veille de marché, actualités BRVM et notes de recherche pour éclairer vos
            décisions d&apos;investissement sur les marchés UEMOA.
          </EditableText>
        </div>

        <div className="mb-14 md:mb-18">
          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="font-primary text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--mauve-60)]">
              Actualités
            </p>
            <Link
              to="/actualites"
              className="group inline-flex items-center gap-2 font-primary text-xs font-semibold uppercase tracking-[0.12em] text-[var(--night-80)]"
            >
              Toutes les actualités
              <FiArrowRight className="text-xs" />
            </Link>
          </div>

          <div
            ref={gridRef}
            className="reveal-stagger -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-6 pb-2 no-scrollbar md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3"
          >
            {articles.map((article) => {
              const cardClass =
                'group flex min-h-0 w-[min(100%,85vw)] max-w-sm shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-[var(--command-border)] bg-[var(--pure-white)] md:w-auto md:max-w-none'
              const dateLabel = article.publishedAt
                ? new Date(article.publishedAt).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })
                : ''

              const inner = (
                <>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-t-xl bg-[var(--command-surface)]">
                    {article.imageUrl ? (
                      <>
                        <div className="absolute inset-0 z-10 bg-black/5 transition-colors duration-500 group-hover:bg-transparent" />
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="h-full w-full transform object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                      </>
                    ) : null}
                    <div className="absolute left-5 top-5 z-20">
                      <span className="inline-block rounded-full border border-[var(--mauve-15)] bg-white/90 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-[var(--night-80)] backdrop-blur-sm">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-grow flex-col p-6 lg:p-7">
                    {dateLabel && (
                      <div className="mb-4 flex items-center gap-2">
                        <FiCalendar size={12} className="text-[var(--night-20)]" />
                        <span className="text-[11px] text-[var(--night-60)]">{dateLabel}</span>
                      </div>
                    )}
                    <h3 className="mb-3 font-primary text-lg font-bold leading-snug text-[var(--night)]">
                      {article.title}
                    </h3>
                    <p className="mb-6 flex-grow line-clamp-3 text-sm text-[var(--night-60)]">
                      {article.excerpt}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--night)]">
                      Lire l&apos;article
                      <FiArrowRight className="text-xs" />
                    </span>
                  </div>
                </>
              )

              if (article.external) {
                return (
                  <a
                    key={article.href}
                    href={article.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardClass}
                  >
                    {inner}
                  </a>
                )
              }

              const slug = article.href.replace(/^\/actualites\//, '')
              return (
                <Link key={article.href} to="/actualites/$slug" params={{ slug }} className={cardClass}>
                  {inner}
                </Link>
              )
            })}
          </div>
        </div>

        {featured && (
          <div>
            <div className="mb-6 flex items-center justify-between gap-4">
              <p className="font-primary text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--mauve-60)]">
                Publications
              </p>
              <Link
                to="/publications"
                className="group inline-flex items-center gap-2 font-primary text-xs font-semibold uppercase tracking-[0.12em] text-[var(--night-80)]"
              >
                Toutes les publications
                <FiArrowRight className="text-xs" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
              <a
                href={featured.href}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-[var(--everest-green)] p-7 md:p-9 lg:col-span-7 lg:min-h-[360px]"
              >
                <div className="relative z-10">
                  <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 font-primary text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--jaune-or)]" aria-hidden />
                    À la une
                  </span>
                  <h3 className="mb-3 max-w-xl font-primary text-xl font-bold leading-snug text-white md:text-2xl">
                    {featured.title}
                  </h3>
                  <p className="max-w-xl font-primary text-sm font-light leading-relaxed text-white/70 md:text-[15px]">
                    {featured.desc}
                  </p>
                </div>
                <span className="relative mt-8 inline-flex items-center gap-2 font-primary text-xs font-semibold uppercase tracking-[0.14em] text-[var(--jaune-or)]">
                  Lire la publication
                  <FiArrowRight className="text-sm" />
                </span>
              </a>

              <div className="flex flex-col gap-4 lg:col-span-5 lg:min-h-[360px] lg:gap-6">
                {secondary.length === 0 ? (
                  <div className="flex flex-1 items-center justify-center rounded-2xl border border-dashed border-[var(--mauve)]/20 bg-[var(--mauve-05)] p-8">
                    <div className="text-center">
                      <FiFileText className="mx-auto mb-3 text-3xl text-[var(--mauve-40)]" />
                      <p className="font-primary text-sm text-[var(--mauve-60)]">
                        Aucune publication supplémentaire
                      </p>
                    </div>
                  </div>
                ) : (
                  secondary.map((item) => (
                    <a
                      key={item.id}
                      href={item.href}
                      className="group flex flex-1 flex-col justify-between overflow-hidden rounded-2xl border border-[var(--command-border)] bg-[var(--pure-white)] p-5 md:p-6"
                    >
                      <div>
                        <p className="mb-3 font-primary text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--mauve-60)]">
                          Note de recherche · {FREQUENCY_LABELS[item.frequency]}
                        </p>
                        <h4 className="font-primary text-sm font-semibold leading-snug text-[var(--night-80)] md:text-base">
                          {item.title}
                        </h4>
                      </div>
                      <FiArrowRight className="mt-4 text-sm text-[var(--mauve-40)]" aria-hidden />
                    </a>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
