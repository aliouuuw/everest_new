import { useMemo, useState } from 'react'
import { useQuery } from 'convex/react'
import { useReveal } from '../components/Hooks/useReveal'
import { api } from '../../convex/_generated/api'

type PublicationCategory = 'revues-hebdo' | 'revues-mensuelles' | 'teaser-dividende' | 'marches' | 'analyses'

 type VisiblePublicationCategory = 'revues-hebdo' | 'revues-mensuelles'

const ALL_LABEL = 'tout' as const
const CATEGORY_LABELS: Record<PublicationCategory | typeof ALL_LABEL, string> = {
  [ALL_LABEL]: 'Tout',
  'revues-hebdo': 'Revues hebdomadaires',
  'revues-mensuelles': 'Revues mensuelles',
  'teaser-dividende': 'Teaser des dividendes',
  'marches': 'Marchés',
  'analyses': 'Analyses',
}

 const VISIBLE_CATEGORIES: Array<VisiblePublicationCategory> = ['revues-hebdo', 'revues-mensuelles']

export const PublicationsPage = () => {
  const heroRef = useReveal<HTMLElement>()
  const filtersRef = useReveal<HTMLDivElement>()
  const listRef = useReveal<HTMLDivElement>()

  const [activeCategory, setActiveCategory] = useState<VisiblePublicationCategory | typeof ALL_LABEL>(ALL_LABEL)
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Fetch publications from Convex
  const publications = useQuery(api.publications.getPublications, { 
    limit: 1000,
    status: 'published' // Only show published publications
  })

  const categories: Array<VisiblePublicationCategory | typeof ALL_LABEL> = useMemo(
    () => [ALL_LABEL, ...VISIBLE_CATEGORIES],
    []
  )

  const filtered = useMemo(() => {
    if (!publications?.page) return []

    let filteredItems = publications.page.filter(pub => VISIBLE_CATEGORIES.includes(pub.category as VisiblePublicationCategory))

    if (activeCategory !== ALL_LABEL) {
      filteredItems = filteredItems.filter(pub => pub.category === activeCategory)
    }

    // Apply search filter if there's a search query
    if (searchQuery.trim()) {
      filteredItems = filteredItems.filter(pub =>
        pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (pub.excerpt && pub.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Sort by published date (newest first)
    return filteredItems.sort((a, b) => {
      if (!a.publishedAt && !b.publishedAt) return 0
      if (!a.publishedAt) return 1
      if (!b.publishedAt) return -1
      return b.publishedAt - a.publishedAt
    })
  }, [publications, searchQuery, activeCategory])

  return (
    <div className="bg-[var(--pure-white)] font-primary">
        {/* Hero: Editorial & Asymmetrical */}
        <section ref={heroRef} className="relative py-24 md:py-32 border-b border-black/10 section-bg-mauve">
          <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full z-0 overflow-hidden">
            <img
              src="/Assets_Website/publications.png"
              alt="Recherche et publications"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-4 mb-8">
                  <span className="px-4 py-1.5 rounded-full bg-[var(--jaune-or)]/15 text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--jaune-or)]">
                    Publications
                  </span>
                </div>
                <h1 className="font-primary font-bold text-5xl md:text-7xl lg:text-[6.5rem] leading-[0.95] tracking-tight text-[var(--pure-white)]">
                  Nos études et analyses.
                </h1>
              </div>
              <div className="lg:col-span-4 pb-4">
                <p className="text-lg md:text-xl leading-relaxed text-white/70 font-light border-l-2 border-[var(--jaune-or)] pl-6">
                  Revues, analyses et teasers de dividendes pour vous accompagner dans vos décisions d'investissement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-12 border-b border-black/10">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12">
            {/* Search */}
            <div ref={filtersRef} className="reveal mb-8">
              <div className="max-w-md mb-6">
                <input
                  type="text"
                  placeholder="Rechercher des publications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-3 bg-white border border-[var(--mauve)]/20 focus:border-[var(--mauve)] outline-none font-primary text-lg transition-colors rounded-full shadow-sm"
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap items-center gap-2">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      className={`${isActive ? 'bg-[var(--mauve)] text-white border-[var(--mauve)]' : 'bg-white text-[var(--night)] border-[var(--mauve)]/10 hover:border-[var(--mauve)]/30 hover:bg-[var(--mauve-10)] text-[var(--mauve)]'} px-4 py-2 border rounded-full text-[11px] tracking-[0.1em] uppercase font-bold transition-all shadow-sm hover:shadow`}
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
        <section className="py-24 md:py-40">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12">
            {publications === undefined ? (
              // Loading state
              <div className="text-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--mauve)] mx-auto mb-4"></div>
                <p className="text-[rgba(10, 10, 10, 0.8)] font-primary">Chargement des publications...</p>
              </div>
            ) : filtered.length === 0 ? (
              // Empty state
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-4 bg-[var(--mauve-10)] rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-[var(--mauve)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-primary font-bold text-[var(--night)] mb-2">Aucune publication trouvée</h3>
                <p className="text-[rgba(10, 10, 10, 0.8)] font-primary">Aucune publication ne correspond aux critères sélectionnés.</p>
              </div>
            ) : (
              <div ref={listRef} className="reveal grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((item, index) => (
                <article key={index} className="group">
                  <a href={`/publications/${item.slug}`} className="block h-full">
                    <div className="border border-[var(--mauve)]/10 p-6 rounded-2xl bg-white transition-all duration-300 hover:shadow-[0_8px_24px_rgba(70,29,76,0.06)] hover:border-[var(--mauve)]/20 h-full flex flex-col">
                      {/* Cover image placeholder */}
                      <div className="h-40 bg-[var(--mauve-10)] rounded-xl flex items-center justify-center text-[rgba(10,10,10,0.5)] mb-6 overflow-hidden">
                        <div className="text-center">
                          <div className="w-12 h-12 mx-auto bg-[var(--mauve)]/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-6 h-6 text-[var(--mauve)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 flex flex-col">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] tracking-[0.1em] uppercase font-bold text-[var(--mauve)]">
                              {CATEGORY_LABELS[item.category]}
                            </span>
                            {/* Featured indicator */}
                            {item.featured && (
                              <span className="text-[10px] tracking-[0.1em] uppercase font-bold text-white bg-[var(--mauve)] px-2.5 py-0.5 rounded-full">
                                En vedette
                              </span>
                            )}
                          </div>
                          <time className="text-[10px] text-[rgba(10,10,10,0.5)] font-bold uppercase tracking-[0.1em]" dateTime={item.createdAt ? new Date(item.createdAt).toISOString().split('T')[0] : ''}>
                            {item.createdAt ? new Date(item.createdAt).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            }) : 'Date non disponible'}
                          </time>
                        </div>
                        
                        <h3 className="font-primary font-bold text-xl text-[var(--night)] mb-3 group-hover:text-[var(--mauve)] transition-colors leading-tight">
                          {item.title}
                        </h3>
                        
                        <p className="text-[rgba(10,10,10,0.7)] text-sm leading-relaxed mb-6 flex-1 font-primary">
                          {item.description}
                        </p>

                        {/* Divider */}
                        <div className="h-px w-full bg-[var(--mauve)]/10 mb-4" />

                        {/* Read more indicator */}
                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--mauve)] group-hover:tracking-[0.15em] transition-all">
                            Lire la suite
                          </span>
                          <svg className="w-4 h-4 text-[var(--mauve)] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
