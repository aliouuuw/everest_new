import { useMemo, useState } from 'react'
import { useReveal } from '../components/Hooks/useReveal'
import { usePublications } from '@/hooks/useCMS'
import LoadingSpinner from '@/components/CMS/Shared/LoadingSpinner'
import { formatDate } from '@/utils/cms/helpers'

type PublicationCategory = 'revues-hebdo' | 'revues-mensuelles' | 'teaser-dividende' | 'marches' | 'analyses'

const ALL_LABEL = 'tout' as const
const CATEGORY_LABELS: Record<PublicationCategory | typeof ALL_LABEL, string> = {
  [ALL_LABEL]: 'Tout',
  'revues-hebdo': 'Revues hebdomadaires',
  'revues-mensuelles': 'Revues mensuelles',
  'teaser-dividende': 'Teaser des dividendes',
  'marches': 'Marchés',
  'analyses': 'Analyses',
}

export const PublicationsPage = () => {
  const heroRef = useReveal<HTMLElement>()
  const filtersRef = useReveal<HTMLDivElement>()
  const listRef = useReveal<HTMLDivElement>()

  const [activeCategory, setActiveCategory] = useState<PublicationCategory | typeof ALL_LABEL>(ALL_LABEL)
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Fetch publications from CMS
  const publications = usePublications({
    status: 'published', // Only show published publications
    category: activeCategory !== ALL_LABEL ? activeCategory : undefined,
    limit: 50,
  })

  const categories: Array<PublicationCategory | typeof ALL_LABEL> = useMemo(
    () => [ALL_LABEL, 'revues-hebdo', 'revues-mensuelles', 'teaser-dividende', 'marches', 'analyses'],
    []
  )

  const filtered = useMemo(() => {
    if (!publications) return []

    let filteredItems = [...publications.page]

    // Apply search filter if there's a search query
    if (searchQuery.trim()) {
      filteredItems = filteredItems.filter(pub =>
        pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Sort by published date (newest first)
    return filteredItems.sort((a, b) => {
      if (!a.publishedAt && !b.publishedAt) return 0
      if (!a.publishedAt) return 1
      if (!b.publishedAt) return -1
      return b.publishedAt - a.publishedAt
    })
  }, [publications, searchQuery])

  return (
    <div>
        {/* Hero: Compact Centered */}
        <section ref={heroRef} className="reveal py-34 sm:py-28">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <span className="kicker text-gradient-gold">Publications</span>
            <h1 className="luxury-heading mt-3">Nos études et analyses</h1>
            <p className="luxury-subheading mt-5 pt-8">Revues, analyses et teasers de dividendes.</p>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-0">
          <div className="mx-auto max-w-6xl px-6">
            {/* Search */}
            <div ref={filtersRef} className="reveal-stagger mb-6">
              <div className="max-w-md mx-auto mb-4">
                <input
                  type="text"
                  placeholder="Rechercher des publications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 rounded-full border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm focus:ring-2 focus:ring-[var(--gold-light)] focus:border-transparent text-center font-display"
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      className={`${isActive ? 'btn-primary' : 'btn-secondary'} inline-flex items-center justify-center text-xs px-4 py-2 rounded-full font-display tracking-wide`}
                      aria-pressed={isActive}
                    >
                      {CATEGORY_LABELS[cat]}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Grid list */}
        <section className="py-14 sm:py-18">
          <div className="mx-auto max-w-6xl px-6">
            {!publications ? (
              <div className="flex justify-center py-12">
                <LoadingSpinner size="lg" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune publication trouvée</h3>
                <p className="text-gray-600">
                  {searchQuery || activeCategory !== ALL_LABEL
                    ? 'Essayez de modifier vos filtres ou votre recherche.'
                    : 'Les publications seront affichées ici une fois créées.'}
                </p>
              </div>
            ) : (
              <div ref={listRef} className="reveal-stagger grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((publication) => (
                  <article key={publication._id} className="group">
                    <a href={`/publications/${publication.slug}`} className="block">
                      <div className="relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all duration-300 hover:shadow-lg hover:border-[var(--gold-light)]/30 group-hover:bg-white/70">
                        {/* Background blur effect */}
                        <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />

                        {/* Featured badge */}
                        {publication.featured && (
                          <div className="absolute top-4 left-4 z-20">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[var(--gold-dark)] text-white">
                              À la une
                            </span>
                          </div>
                        )}

                        {/* Cover image placeholder */}
                        <div className="h-36 edge-media bg-gradient-to-br from-[var(--white-smoke)]/80 to-[var(--gold-light)]/20 flex items-center justify-center text-secondary mb-5 rounded-xl border border-[var(--gold-metallic)]/10">
                          <div className="text-center">
                            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-[var(--gold-light)]/20 flex items-center justify-center">
                              <svg className="w-6 h-6 text-[var(--gold-dark)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <span className="text-xs font-medium">Publication</span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10">
                          <div className="flex items-start justify-between mb-3">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[var(--gold-light)]/10 text-[var(--gold-dark)] border border-[var(--gold-light)]/20">
                              {CATEGORY_LABELS[publication.category as PublicationCategory]}
                            </span>
                            {publication.publishedAt && (
                              <time className="text-xs text-secondary font-medium" dateTime={new Date(publication.publishedAt).toISOString()}>
                                {formatDate(publication.publishedAt)}
                              </time>
                            )}
                          </div>

                          <h3 className="font-display text-lg font-semibold text-[var(--night)] mb-3 group-hover:text-[var(--gold-dark)] transition-colors leading-tight">
                            {publication.title}
                          </h3>

                          <p className="text-secondary text-sm leading-relaxed mb-4">
                            {publication.excerpt}
                          </p>

                          {/* Reading time */}
                          {publication.readingTime && (
                            <div className="text-xs text-secondary mb-3">
                              {publication.readingTime} min de lecture
                            </div>
                          )}

                          {/* Divider */}
                          <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--gold-metallic-10)] to-transparent mb-4" />

                          {/* Read more indicator */}
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-[var(--gold-dark)] group-hover:text-[var(--gold-dark)] transition-colors">
                              Lire la suite
                            </span>
                            <svg className="w-4 h-4 text-[var(--gold-dark)] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </a>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
    </div>
  )
}
