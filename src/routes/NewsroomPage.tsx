import { useMemo, useState } from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'

import { useReveal } from '../components/Hooks/useReveal'

type NewsCategory = 'communique' | 'presse' | 'entreprise' | 'marches' | 'evenement'

type NewsItem = {
  title: string
  desc: string
  href: string
  category: NewsCategory
  date: string
}

const ALL_LABEL = 'tout' as const
const CATEGORY_LABELS: Record<NewsCategory | typeof ALL_LABEL, string> = {
  [ALL_LABEL]: 'Tout',
  communique: 'Communiqués',
  presse: 'Presse',
  entreprise: 'Entreprise',
  marches: 'Marchés',
  evenement: 'Événements',
}

export const NewsroomPage = () => {
  const heroRef = useReveal<HTMLElement>()
  const filtersRef = useReveal<HTMLDivElement>()
  const listRef = useReveal<HTMLDivElement>()

  const [activeCategory, setActiveCategory] = useState<NewsCategory | typeof ALL_LABEL>(ALL_LABEL)

  const items: Array<NewsItem> = [
    { title: 'Communiqué – Résultats semestriels', desc: 'Points clés de la performance et perspectives.', href: '#', category: 'communique', date: '2025-06-22' },
    { title: 'Dans la presse – Interview DG', desc: 'Vision stratégique et cap 2025.', href: '#', category: 'presse', date: '2025-06-18' },
    { title: 'Entreprise – Nouvelle plateforme client', desc: 'Expérience sécurisée et fonctionnalités avancées.', href: '#', category: 'entreprise', date: '2025-06-15' },
    { title: 'Marchés – Point BRVM', desc: 'Indices, volumes et tendances clés.', href: '#', category: 'marches', date: '2025-06-12' },
    { title: 'Événement – Conférence investisseurs', desc: 'Rencontre annuelle et échanges marchés.', href: '#', category: 'evenement', date: '2025-06-08' },
    { title: 'Communiqué – Nomination', desc: 'Renforcement de l’équipe dirigeante.', href: '#', category: 'communique', date: '2025-05-30' },
    { title: 'Dans la presse – Tribune marchés', desc: 'Perspectives macro et allocation.', href: '#', category: 'presse', date: '2025-05-25' },
    { title: 'Entreprise – Initiative RSE', desc: 'Engagements et réalisations clés.', href: '#', category: 'entreprise', date: '2025-05-20' },
    { title: 'Marchés – Taux & émissions', desc: 'Primaire et courbe des rendements.', href: '#', category: 'marches', date: '2025-05-10' },
  ]

  const categories: Array<NewsCategory | typeof ALL_LABEL> = useMemo(
    () => [ALL_LABEL, 'communique', 'presse', 'entreprise', 'marches', 'evenement'],
    []
  )

  const filtered = useMemo(() => {
    const sorted = [...items].sort((a, b) => (a.date < b.date ? 1 : -1))
    if (activeCategory === ALL_LABEL) return sorted
    return sorted.filter((it) => it.category === activeCategory)
  }, [items, activeCategory])

  return (
    <div className="pt-24 sm:pt-28">
        {/* Hero: Compact Centered */}
        <section ref={heroRef} className="reveal py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <span className="kicker text-gradient-gold">Actualités</span>
            <h1 className="luxury-heading mt-3">Newsroom</h1>
            <p className="luxury-subheading mt-5">Communiqués, presse et annonces d’entreprise.</p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-0">
          <div className="mx-auto max-w-6xl px-6">
            <div ref={filtersRef} className="reveal-stagger mt-2 mb-6 flex flex-wrap items-center justify-center gap-2">
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
            <div ref={listRef} className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((it) => (
                <a key={`${it.title}-${it.date}`} href={it.href} className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover block">
                  <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />

                  <div className="h-36 edge-media bg-[var(--white-smoke)]/80 flex items-center justify-center text-secondary mb-5 rounded-xl">
                    Media Placeholder
                  </div>

                  <div className="font-display flex items-center gap-2">
                    <span className="group-hover:underline">{it.title}</span>
                    <FaExternalLinkAlt className="text-secondary" />
                  </div>
                  <div className="text-secondary text-sm mt-1">{it.desc}</div>

                  <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-[var(--gold-metallic-10)] to-transparent" />

                  <div className="mt-4 flex items-center justify-between text-xs">
                    <span className="font-medium px-2 py-1 rounded-full bg-[var(--gold-metallic-10)] text-[var(--gold-dark)]">
                      {CATEGORY_LABELS[it.category]}
                    </span>
                    <span className="numeric-tabular opacity-70">{new Date(it.date).toLocaleDateString()}</span>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-10 text-center">
              <a href="#" className="btn-secondary inline-flex items-center gap-2 font-display tracking-wide">
                Voir toutes les actualités
                <FaExternalLinkAlt />
              </a>
            </div>
          </div>
      </section>
    </div>
  )
}


