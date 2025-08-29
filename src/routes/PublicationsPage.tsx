import { useMemo, useState } from 'react'
import { useReveal } from '../components/Hooks/useReveal'

type PublicationCategory = 'revues-hebdo' | 'revues-mensuelles' | 'teaser-dividende' | 'marches' | 'analyses'

type PublicationItem = {
  title: string
  desc: string
  href: string
  category: PublicationCategory
  date: string
}

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

  const items: Array<PublicationItem> = [
    { title: 'Revue hebdomadaire - Semaine 25', desc: 'Point sur les marchés et perspectives de la semaine.', href: '#', category: 'revues-hebdo', date: '2025-06-22' },
    { title: 'Revue mensuelle - Juin 2025', desc: 'Synthèse mensuelle des performances et tendances.', href: '#', category: 'revues-mensuelles', date: '2025-06-20' },
    { title: 'Teaser dividende - SONATEL', desc: 'Analyse des perspectives de dividende pour SONATEL.', href: '#', category: 'teaser-dividende', date: '2025-06-18' },
    { title: 'Marchés - Point BRVM', desc: 'Indices, volumes et tendances clés du marché.', href: '#', category: 'marches', date: '2025-06-15' },
    { title: 'Analyse - Secteur bancaire', desc: 'Étude approfondie du secteur bancaire ouest-africain.', href: '#', category: 'analyses', date: '2025-06-12' },
    { title: 'Revue hebdomadaire - Semaine 24', desc: 'Bilan de la semaine et perspectives à venir.', href: '#', category: 'revues-hebdo', date: '2025-06-08' },
    { title: 'Teaser dividende - NSIA', desc: 'Évaluation des perspectives de dividende pour NSIA.', href: '#', category: 'teaser-dividende', date: '2025-06-05' },
    { title: 'Marchés - Taux & émissions', desc: 'Analyse des taux d\'intérêt et nouvelles émissions.', href: '#', category: 'marches', date: '2025-06-02' },
    { title: 'Analyse - Marché obligataire', desc: 'Étude du marché obligataire et opportunités.', href: '#', category: 'analyses', date: '2025-05-30' },
    { title: 'Revue mensuelle - Mai 2025', desc: 'Rétrospective du mois de mai et projections.', href: '#', category: 'revues-mensuelles', date: '2025-05-28' },
  ]

  const categories: Array<PublicationCategory | typeof ALL_LABEL> = useMemo(
    () => [ALL_LABEL, 'revues-hebdo', 'revues-mensuelles', 'teaser-dividende', 'marches', 'analyses'],
    []
  )

  const filtered = useMemo(() => {
    const sorted = [...items].sort((a, b) => (a.date < b.date ? 1 : -1))
    if (activeCategory === ALL_LABEL) return sorted
    return sorted.filter((it) => it.category === activeCategory)
  }, [items, activeCategory])

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

        {/* Filters */}
        <section className="py-0">
          <div className="mx-auto max-w-6xl px-6">
            <div ref={filtersRef} className="reveal-stagger mb-6 flex flex-wrap items-center justify-center gap-2">
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
        </section>

        {/* Grid list */}
        <section className="py-14 sm:py-18">
          <div className="mx-auto max-w-6xl px-6">
            <div ref={listRef} className="reveal-stagger grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item, index) => (
                <article key={index} className="group">
                  <a href={item.href} className="block">
                    <div className="relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all duration-300 hover:shadow-lg hover:border-[var(--gold-light)]/30 group-hover:bg-white/70">
                      {/* Background blur effect */}
                      <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                      
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
                            {CATEGORY_LABELS[item.category]}
                          </span>
                          <time className="text-xs text-secondary font-medium" dateTime={item.date}>
                            {new Date(item.date).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </time>
                        </div>
                        
                        <h3 className="font-display text-lg font-semibold text-[var(--night)] mb-3 group-hover:text-[var(--gold-dark)] transition-colors leading-tight">
                          {item.title}
                        </h3>
                        
                        <p className="text-secondary text-sm leading-relaxed mb-4">
                          {item.desc}
                        </p>

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
          </div>
        </section>
    </div>
  )
}
