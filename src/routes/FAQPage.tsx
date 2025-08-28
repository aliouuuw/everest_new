import { useMemo, useState } from 'react'
import { useReveal } from '../components/Hooks/useReveal'

type QA = { q: string; a: string }
type Glossary = { term: string; def: string }

export const FAQPage = () => {
  const heroRef = useReveal<HTMLElement>()
  const qaRef = useReveal<HTMLDivElement>()
  const glossaryRef = useReveal<HTMLDivElement>()
  const indexRef = useReveal<HTMLDivElement>()

  const qas: Array<QA> = [
    { q: 'Comment ouvrir un compte ?', a: 'Remplissez le formulaire en ligne, notre équipe vous accompagne pour la suite.' },
    { q: 'Quels sont vos frais ?', a: 'Frais transparents selon le service et le profil ; détail communiqué à l’ouverture.' },
    { q: 'Comment accéder au portail client ?', a: 'Via le lien “Accès Client” en haut de page ; identifiants fournis à l’activation.' },
    { q: 'Offrez-vous la gestion sous mandat ?', a: 'Oui, plusieurs profils sont disponibles selon vos objectifs et contraintes.' },
    { q: 'Puis-je recevoir des recommandations ?', a: 'Oui, via la gestion assistée et nos publications de recherche.' },
    { q: 'Comment contacter un conseiller ?', a: 'Par le formulaire de contact ou WhatsApp ; réponse sous 24h ouvrées.' },
  ]

  const glossary: Array<Glossary> = [
    { term: 'Action', def: 'Titre de propriété représentant une part du capital d’une société.' },
    { term: 'Allocation', def: 'Répartition d’un portefeuille entre classes d’actifs.' },
    { term: 'Achevé à terme', def: 'Opération dont le règlement intervient à une date future convenue.' },
    { term: 'Bêta', def: 'Sensibilité d’un titre aux variations de son indice de référence.' },
    { term: 'BRVM', def: 'Bourse Régionale des Valeurs Mobilières de l’UEMOA.' },
    { term: 'Coupon', def: 'Intérêt périodique versé par une obligation.' },
    { term: 'Capitalisation', def: 'Valeur totale des actions d’une société (cours x nombre d’actions).' },
    { term: 'Dividende', def: 'Partie du bénéfice distribuée aux actionnaires.' },
    { term: 'Duration', def: 'Mesure de la sensibilité du prix d’une obligation aux taux.' },
    { term: 'Échéance', def: 'Date de remboursement d’une obligation ou d’un prêt.' },
    { term: 'Émission primaire', def: 'Vente initiale d’un titre sur le marché primaire.' },
    { term: 'Flux de trésorerie', def: 'Entrées et sorties de cash d’une entreprise ou d’un projet.' },
    { term: 'Free float', def: 'Part du capital d’une société librement échangeable sur le marché.' },
    { term: 'Garantie', def: 'Sûreté apportée pour sécuriser une opération financière.' },
    { term: 'Gestion sous mandat', def: 'Délégation de la gestion d’un portefeuille selon un profil.' },
    { term: 'Indice', def: 'Mesure synthétique de la performance d’un groupe de titres.' },
    { term: 'Inflation', def: 'Hausse générale et durable des prix.' },
    { term: 'Liquidité', def: 'Facilité avec laquelle un actif peut être acheté ou vendu.' },
    { term: 'Notation', def: 'Opinion d’une agence sur le risque de crédit d’un émetteur.' },
    { term: 'Obligation', def: 'Titre de créance représentant un emprunt émis par un émetteur.' },
    { term: 'OPA', def: 'Offre Publique d’Achat : proposition d’acquérir des titres cotés.' },
    { term: 'Placement privé', def: 'Émission de titres auprès d’un cercle restreint d’investisseurs.' },
    { term: 'Prime d’émission', def: 'Différence positive entre prix d’émission et valeur nominale.' },
    { term: 'Spread', def: 'Écart de rendement entre deux titres comparables.' },
    { term: 'Taux nominal', def: 'Taux indiqué sur une obligation servant au calcul du coupon.' },
    { term: 'Valorisation', def: 'Estimation de la valeur d’un actif ou d’une entreprise.' },
    { term: 'Volatilité', def: 'Mesure de l’ampleur des variations de prix d’un actif.' },
  ]

  const [query, setQuery] = useState('')
  const [activeLetter, setActiveLetter] = useState<string>('') // empty = all

  const normalizedQuery = query.trim().toLowerCase()

  const filteredGlossary = useMemo(() => {
    const base = normalizedQuery
      ? glossary.filter(g =>
          g.term.toLowerCase().includes(normalizedQuery) ||
          g.def.toLowerCase().includes(normalizedQuery)
        )
      : glossary
    const byLetter = base.filter(g => (activeLetter ? g.term.charAt(0).toUpperCase() === activeLetter : true))
    return byLetter.sort((a, b) => a.term.localeCompare(b.term, 'fr'))
  }, [glossary, normalizedQuery, activeLetter])

  const letters = useMemo(() => {
    const set = new Set<string>()
    for (const g of glossary) {
      const l = g.term.charAt(0).toUpperCase()
      if (l >= 'A' && l <= 'Z') set.add(l)
    }
    return Array.from(set).sort()
  }, [glossary])

  const grouped = useMemo(() => {
    const map = new Map<string, Array<Glossary>>()
    for (const g of filteredGlossary) {
      const l = g.term.charAt(0).toUpperCase()
      if (!map.has(l)) map.set(l, [])
      map.get(l)!.push(g)
    }
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]))
  }, [filteredGlossary])

  return (
    <div className="pt-24 sm:pt-28">
        {/* Hero: Compact Centered */}
        <section ref={heroRef} className="reveal py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <span className="kicker text-gradient-gold">Abécédaire & FAQ</span>
            <h1 className="luxury-heading mt-3">Comprendre nos services</h1>
            <p className="luxury-subheading mt-5">Questions fréquentes et définitions clés pour mieux décider.</p>
          </div>
        </section>

        {/* Q&A Section */}
        <section className="py-14 sm:py-18">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="font-display text-lg mb-4">Questions fréquentes</h2>
            <div ref={qaRef} className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {qas.map((item) => (
                <div key={item.q} className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
                  <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                  <div className="font-display mb-2">{item.q}</div>
                  <div className="text-secondary text-sm">{item.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Abécédaire (Glossary) */}
        <section className="py-14 sm:py-18">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-col items-center text-center">
              <h2 className="font-display text-lg mb-2">Abécédaire</h2>
              <p className="text-secondary mb-6">Jargon et termes clés de nos métiers.</p>
              <div className="w-full max-w-2xl flex items-center gap-3">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Rechercher un terme ou une définition..."
                  aria-label="Rechercher dans l’abécédaire"
                  className="flex-1 px-4 py-3 rounded-lg border border-[var(--night)]/15 bg-[var(--white-smoke)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--gold-metallic-20)]"
                />
                <button
                  type="button"
                  onClick={() => { setQuery(''); setActiveLetter('') }}
                  className="btn-secondary text-xs"
                >
                  Effacer
                </button>
              </div>
            </div>

            {/* A–Z Index */}
            <div ref={indexRef} className="reveal-stagger mt-6 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setActiveLetter('')}
                className={`${activeLetter === '' ? 'btn-primary' : 'btn-secondary'} text-xs px-3 py-2 rounded-full`}
                aria-pressed={activeLetter === ''}
              >
                Tous
              </button>
              {letters.map((l) => (
                <a
                  key={l}
                  href={`#letter-${l}`}
                  onClick={() => setActiveLetter(l)}
                  className={`${activeLetter === l ? 'btn-primary' : 'btn-secondary'} text-xs px-3 py-2 rounded-full`}
                  aria-label={`Aller à la lettre ${l}`}
                >
                  {l}
                </a>
              ))}
            </div>

            {/* Grouped terms */}
            <div ref={glossaryRef} className="reveal mt-10 space-y-10">
              {grouped.length === 0 && (
                <div className="text-center text-secondary">Aucun résultat.</div>
              )}
              {grouped.map(([letter, terms]) => (
                <div key={letter} id={`letter-${letter}`} className="scroll-mt-24">
                  <div className="flex items-baseline gap-3 mb-4">
                    <div className="font-display text-2xl">{letter}</div>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--gold-metallic-10)] to-transparent" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {terms.map((g) => (
                      <div key={g.term} className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
                        <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                        <div className="font-display mb-1">{g.term}</div>
                        <div className="text-secondary text-sm">{g.def}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-14 sm:py-18">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <div className="inline-flex items-center gap-3 p-6 rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm">
              <div className="text-secondary">Besoin d’aide supplémentaire ?</div>
              <a href="#contact" className="btn-primary font-display tracking-wide">Nous contacter</a>
            </div>
          </div>
      </section>
    </div>
  )
}


