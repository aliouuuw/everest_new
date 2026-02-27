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
    <div className="bg-[var(--pure-white)] text-[var(--night)] font-primary selection:bg-[var(--jaune-or)] selection:text-white">
        {/* ─── 1. Hero — Editorial & Asymmetrical ─── */}
        <section ref={heroRef} className="reveal relative flex items-end pb-20 pt-40 border-b border-black/10 min-h-[60vh]">
          <div className="absolute top-0 right-0 w-full md:w-1/2 h-full z-0 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1600&q=80"
              alt="Support client"
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--pure-white)] via-[var(--pure-white)]/80 to-transparent" />
          </div>
          
          <div className="relative z-10 w-full px-6 md:px-12 mx-auto max-w-[1600px]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-end">
              <div className="md:col-span-8">
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-12 h-px bg-[var(--jaune-or)]" />
                  <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-[var(--jaune-or)]">
                    Abécédaire & FAQ
                  </span>
                </div>
                <h1 className="font-display-aptos text-5xl md:text-7xl lg:text-[6.5rem] leading-[0.95] tracking-tight mb-8">
                  Comprendre nos services.
                </h1>
              </div>
              
              <div className="md:col-span-4 pb-4">
                <p className="text-lg md:text-xl leading-relaxed text-[rgba(10, 10, 10, 0.8)] font-light mb-10 border-l border-[var(--jaune-or)] pl-6">
                  Questions fréquentes et définitions clés pour mieux décider.
                </p>
                <a href="#faq" className="btn-primary group inline-flex items-center justify-center gap-4 px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all mt-4 w-fit">
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
                  <span className="text-[10px] font-bold tracking-[0.3em] text-[var(--jaune-or)] uppercase block mb-8">Support</span>
                  <h2 className="font-display-aptos text-4xl md:text-6xl leading-[1.05]">
                    Questions fréquentes.
                  </h2>
                </div>
              </div>
              
              <div className="lg:col-span-8">
                <div ref={qaRef} className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
                  {qas.map((item) => (
                    <div key={item.q} className="relative">
                      <div className="w-8 h-px bg-[var(--jaune-or)] mb-8" />
                      <h3 className="font-display-aptos text-2xl md:text-3xl mb-4 text-[var(--night)]">
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
                <div className="sticky top-32 flex flex-col border-t border-black/10">
                  <div className="py-6 border-b border-black/10">
                    <span className="text-[10px] font-bold tracking-[0.3em] text-[var(--jaune-or)] uppercase block mb-6">Définitions</span>
                    <h2 className="font-display-aptos text-3xl md:text-4xl leading-[1.05] mb-6">
                      Abécédaire
                    </h2>
                    
                    <div className="flex flex-col gap-4 mt-8">
                      <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Rechercher..."
                        className="w-full px-0 py-3 bg-transparent border-b border-black/20 focus:border-black outline-none font-display-aptos text-xl transition-colors rounded-none"
                      />
                      
                      <div className="flex flex-wrap gap-2 mt-4">
                        <button
                          type="button"
                          onClick={() => setActiveLetter('')}
                          className={`text-xs font-bold tracking-[0.2em] uppercase px-3 py-2 border ${activeLetter === '' ? 'border-black bg-black text-white' : 'border-black/10 hover:border-black/30'}`}
                        >
                          Tous
                        </button>
                        {letters.map((l) => (
                          <button
                            key={l}
                            type="button"
                            onClick={() => setActiveLetter(l)}
                            className={`text-xs font-bold uppercase px-3 py-2 border ${activeLetter === l ? 'border-black bg-black text-white' : 'border-black/10 hover:border-black/30'}`}
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
                    <div key={letter} className="group py-10 border-b border-black/10">
                      <div className="font-display-aptos text-4xl text-[var(--jaune-or)] mb-8">
                        {letter}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {terms.map((g) => (
                          <div key={g.term}>
                            <h3 className="font-display-aptos text-xl md:text-2xl mb-2 text-[var(--night)]">
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
        <section className="bg-[var(--night)] text-white py-24 md:py-32">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
              <div className="md:col-span-7">
                <h2 className="font-display-aptos text-5xl md:text-7xl leading-[1.05] mb-6">
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


