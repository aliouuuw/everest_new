import { useMemo, useState } from 'react'
import { FiArrowRight, FiArrowDown } from 'react-icons/fi'
import { useReveal } from '../components/Hooks/useReveal'

type QA = { q: string; a: string }
type Glossary = { term: string; def: string }

export const FAQPage = () => {
  const heroRef = useReveal<HTMLElement>()
  const qaRef = useReveal<HTMLDivElement>()
  const glossaryRef = useReveal<HTMLDivElement>()

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
    <div className="bg-[var(--pure-white)] text-[var(--night)] font-primary selection:bg-[var(--mauve)] selection:text-white">
        {/* ─── 1. Hero — Dark Image with Overlay ─── */}
        <section ref={heroRef} className="relative min-h-[55vh] flex items-end pb-16 pt-24 overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/Assets_Website/Abécédaire-&-FAQ.png"
              alt="Support client"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 w-full px-6 md:px-12 mx-auto max-w-[1600px]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-end">
              <div className="md:col-span-7">
                <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--jaune-or)]/15 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-[var(--jaune-or)] mb-6">
                  Abécédaire & FAQ
                </span>
                <h1 className="font-primary font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-5 text-white">
                  Comprendre nos services.
                </h1>
              </div>

              <div className="md:col-span-5 pb-2">
                <p className="text-base md:text-lg leading-relaxed text-white/65 font-light mb-8">
                  Questions fréquentes et définitions clés pour mieux décider.
                </p>
                <a
                  href="#faq"
                  className="group inline-flex items-center justify-center gap-3 px-7 py-3 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:opacity-90"
                  style={{ background: 'var(--jaune-or)', color: 'var(--pure-white)' }}
                >
                  <span>Voir les questions</span>
                  <FiArrowDown className="text-lg group-hover:translate-y-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. Q&A Section — Stark Grid ─── */}
        <section id="faq" className="py-24 md:py-40 border-b border-black/10">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              <div className="lg:col-span-4">
                <div className="sticky top-32">
                  <span className="px-4 py-1.5 rounded-full bg-[var(--mauve-10)] text-[10px] font-bold tracking-[0.3em] text-[var(--mauve)] uppercase inline-block mb-8">Support</span>
                  <h2 className="font-primary font-bold text-4xl md:text-6xl leading-[1.05] text-[var(--mauve)]">
                    Questions fréquentes.
                  </h2>
                </div>
              </div>
              
              <div className="lg:col-span-8">
                <div ref={qaRef} className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
                  {qas.map((item) => (
                    <div key={item.q} className="relative">
                      <div className="w-8 h-px bg-[var(--mauve)] mb-8" />
                      <h3 className="font-primary font-bold text-2xl md:text-3xl mb-4 text-[var(--mauve)]">
                        {item.q}
                      </h3>
                      <p className="text-[rgba(10, 10, 10, 0.8)] leading-relaxed font-light text-lg">
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. Abécédaire (Glossary) — Editorial List ─── */}
        <section id="glossary" className="py-24 md:py-40 bg-[var(--white-smoke)]">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              <div className="lg:col-span-4">
                <div className="sticky top-32 flex flex-col border-t border-[var(--mauve)]/10">
                  <div className="py-6 border-b border-[var(--mauve)]/10">
                    <span className="px-4 py-1.5 rounded-full bg-[var(--mauve-10)] text-[10px] font-bold tracking-[0.3em] text-[var(--mauve)] uppercase inline-block mb-6">Définitions</span>
                    <h2 className="font-primary font-bold text-3xl md:text-4xl leading-[1.05] mb-6">
                      Abécédaire
                    </h2>
                    
                    <div className="flex flex-col gap-4 mt-8">
                      <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Rechercher..."
                        className="w-full px-4 py-3 bg-white border border-[var(--mauve)]/20 focus:border-[var(--mauve)] outline-none font-primary text-lg transition-colors rounded-full"
                      />
                      
                      <div className="flex flex-wrap gap-2 mt-4">
                        <button
                          type="button"
                          onClick={() => setActiveLetter('')}
                          className={`text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border transition-all ${activeLetter === '' ? 'border-[var(--mauve)] bg-[var(--mauve)] text-white' : 'border-[var(--mauve)]/10 text-[var(--mauve)] hover:border-[var(--mauve)]/30 hover:bg-[var(--mauve-10)]'}`}
                        >
                          Tous
                        </button>
                        {letters.map((l) => (
                          <button
                            key={l}
                            type="button"
                            onClick={() => setActiveLetter(l)}
                            className={`text-xs font-bold uppercase px-4 py-1.5 rounded-full border transition-all ${activeLetter === l ? 'border-[var(--mauve)] bg-[var(--mauve)] text-white' : 'border-[var(--mauve)]/10 text-[var(--mauve)] hover:border-[var(--mauve)]/30 hover:bg-[var(--mauve-10)]'}`}
                          >
                            {l}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8">
                <div ref={glossaryRef} className="border-t border-black/10">
                  {grouped.length === 0 && (
                    <div className="py-10 text-[rgba(10, 10, 10, 0.8)] font-light text-xl">Aucun résultat.</div>
                  )}
                  {grouped.map(([letter, terms]) => (
                    <div key={letter} className="group py-10 border-b border-[var(--mauve)]/10">
                      <div className="font-primary font-bold text-4xl text-[var(--mauve)] mb-8">
                        {letter}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {terms.map((g) => (
                          <div key={g.term}>
                            <h3 className="font-primary font-bold text-xl md:text-2xl mb-2 text-[var(--mauve)]">
                              {g.term}
                            </h3>
                            <p className="text-[rgba(10, 10, 10, 0.8)] leading-relaxed font-light text-lg">
                              {g.def}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 4. CTA — Editorial Footer Block ─── */}
        <section className="section-bg-light py-24 md:py-32">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
              <div className="md:col-span-7">
                <h2 className="font-primary font-bold text-5xl md:text-7xl leading-[1.05] mb-6 text-white">
                  Besoin d'aide supplémentaire ?
                </h2>
                <p className="text-xl md:text-2xl text-white/60 font-light max-w-2xl">
                  Notre équipe se tient à votre disposition pour répondre à toutes vos interrogations.
                </p>
              </div>
              <div className="md:col-span-5 flex flex-col sm:flex-row gap-6 md:justify-end">
                <a href="/contact" className="btn-primary-dark inline-flex items-center justify-center gap-4 px-10 py-5 text-xs uppercase tracking-[0.2em] font-bold w-fit">
                  Nous contacter <FiArrowRight className="text-lg" />
                </a>
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}


