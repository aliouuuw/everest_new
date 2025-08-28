import { FiBarChart, FiBookOpen, FiEye, FiFileText, FiSearch, FiTrendingUp, FiUsers } from 'react-icons/fi'
import { FaAward, FaChartLine } from 'react-icons/fa'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { CTA } from '../components/Sections/CTA'
import { useReveal } from '../components/Hooks/useReveal'

export const ResearchAnalyticsPage = () => {
  const heroRef = useReveal<HTMLElement>()
  const capsSectionRef = useReveal<HTMLElement>()
  const capsGridRef = useReveal<HTMLDivElement>()
  const methodSectionRef = useReveal<HTMLElement>()
  const methodListRef = useReveal<HTMLUListElement>()

  return (
    <div className="min-h-screen bg-[var(--pure-white)] text-[var(--night)]">
      <Header />
      <main className="pt-24 sm:pt-28">
        {/* Hero — Split pattern explaining the offer */}
        <section ref={heroRef} className="reveal relative overflow-hidden">
          <div className="absolute inset-0 gradient-gold-subtle" />
          <div className="absolute inset-0" style={{ opacity: 0.06 }}>
            <div className="w-full h-full" style={{ backgroundImage: `linear-gradient(var(--night-10) 1px, transparent 1px), linear-gradient(90deg, var(--night-10) 1px, transparent 1px)`, backgroundSize: '64px 64px' }} />
          </div>
          <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="kicker text-gradient-gold">Offres — Recherche & analyses</span>
                <h1 className="luxury-heading mt-3">L'intelligence au service de vos investissements</h1>
                <p className="luxury-subheading mt-5 pt-8">Analyses approfondies, données exclusives et insights stratégiques pour prendre les bonnes décisions sur la BRVM. Plus de 10 ans d'expertise en recherche financière.</p>

                {/* Key Differentiators */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <FaChartLine className="text-gold-metallic text-lg" />
                    <span className="text-sm font-medium">Données exclusives</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiEye className="text-gold-metallic text-lg" />
                    <span className="text-sm font-medium">Vision prospective</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiBookOpen className="text-gold-metallic text-lg" />
                    <span className="text-sm font-medium">Expertise sectorielle</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaAward className="text-gold-metallic text-lg" />
                    <span className="text-sm font-medium">Reconnaissance marché</span>
                  </div>
                </div>

                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <a href="#contact" className="btn-primary font-display tracking-wide">Demander une analyse personnalisée</a>
                  <a href="/newsroom" className="btn-secondary font-display tracking-wide">Découvrir nos publications</a>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6">
                <div className="pointer-events-none absolute -top-12 -right-12 w-56 h-56 rounded-full bg-[var(--gold-metallic-10)] blur-3xl" />
                <div className="relative w-full h-[280px] rounded-xl overflow-hidden border border-[var(--gold-metallic)]/25 bg-[var(--white-smoke)]/80">
                  <div className="absolute inset-0 grid grid-cols-3 gap-3 p-6">
                    <div className="rounded-lg bg-[var(--pure-white)]/70 border border-[var(--gold-metallic)]/25 flex flex-col items-center justify-center text-center p-4">
                      <FiSearch className="text-xl mb-2" />
                      <div className="text-xs font-display">Couverture</div>
                    </div>
                    <div className="rounded-lg bg-[var(--pure-white)]/70 border border-[var(--gold-metallic)]/25 flex flex-col items-center justify-center text-center p-4">
                      <FiFileText className="text-xl mb-2" />
                      <div className="text-xs font-display">Études</div>
                    </div>
                    <div className="rounded-lg bg-[var(--pure-white)]/70 border border-[var(--gold-metallic)]/25 flex flex-col items-center justify-center text-center p-4">
                      <FiTrendingUp className="text-xl mb-2" />
                      <div className="text-xs font-display">Notes marchés</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Research Impact & Recognition */}
        <section className="py-14 sm:py-18 bg-gradient-to-br from-[var(--gold-light)]/5 to-transparent">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-3xl mx-auto">
              <span className="kicker text-gradient-gold">Notre reconnaissance</span>
              <h2 className="luxury-heading mt-3">Une recherche qui fait référence sur le marché</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {[
                { value: '500+', label: 'Publications', icon: FiFileText },
                { value: '15+', label: 'Années d\'expérience', icon: FiTrendingUp },
                { value: '98%', label: 'Précision prévisions', icon: FiBarChart },
                { value: '200+', label: 'Clients institutionnels', icon: FiUsers }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--gold-metallic-10)] mb-4 group-hover:bg-[var(--gold-metallic)] transition-colors">
                    <stat.icon className="text-2xl text-[var(--night)] group-hover:text-white transition-colors" />
                  </div>
                  <div className="numeric-tabular text-3xl font-display text-[var(--night)] mb-1">{stat.value}</div>
                  <div className="text-sm text-secondary">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Sample Research Preview */}
            <div className="mt-16">
              <div className="text-center mb-8">
                <h3 className="luxury-heading text-xl">Exemples de nos dernières publications</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6">
                  <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                  <div className="flex items-center gap-3 mb-4">
                    <FiTrendingUp className="text-gold-metallic text-xl" />
                    <span className="text-sm font-medium text-[var(--gold-metallic)]">Note de marché</span>
                  </div>
                  <h4 className="font-display text-lg mb-2">BRVM : Perspectives 2024</h4>
                  <p className="text-secondary text-sm mb-4">Analyse des tendances macroéconomiques et impacts sur les marchés actions de la région UEMOA.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-secondary">15 pages • PDF</span>
                    <span className="px-3 py-1 bg-[var(--gold-light)]/20 text-xs rounded-full">Gratuit</span>
                  </div>
                </div>

                <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6">
                  <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                  <div className="flex items-center gap-3 mb-4">
                    <FiBarChart className="text-gold-metallic text-xl" />
                    <span className="text-sm font-medium text-[var(--gold-metallic)]">Étude sectorielle</span>
                  </div>
                  <h4 className="font-display text-lg mb-2">Secteur bancaire : Résilience et croissance</h4>
                  <p className="text-secondary text-sm mb-4">Analyse comparative des performances des établissements bancaires et perspectives d'évolution.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-secondary">25 pages • PDF</span>
                    <span className="px-3 py-1 bg-[var(--gold-light)]/20 text-xs rounded-full">Premium</span>
                  </div>
                </div>

                <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6">
                  <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                  <div className="flex items-center gap-3 mb-4">
                    <FiSearch className="text-gold-metallic text-xl" />
                    <span className="text-sm font-medium text-[var(--gold-metallic)]">Analyse sur mesure</span>
                  </div>
                  <h4 className="font-display text-lg mb-2">Valorisation entreprise technologique</h4>
                  <p className="text-secondary text-sm mb-4">Évaluation détaillée avec modélisation DCF et comparables sectoriels pour comité d'investissement.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-secondary">40 pages • PDF + Excel</span>
                    <span className="px-3 py-1 bg-[var(--gold-light)]/20 text-xs rounded-full">Sur mesure</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section ref={capsSectionRef} className="reveal py-14 sm:py-18">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-2xl mx-auto">
              <span className="kicker text-gradient-gold">Capacités</span>
              <h2 className="luxury-heading mt-3">Couverture et livrables</h2>
              <p className="luxury-subheading mt-5">Une offre claire : revues marché, études sectorielles, et analyses ad hoc.</p>
            </div>
            <div ref={capsGridRef} className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="flex items-start gap-5">
                  <div className="icon-badge text-[var(--night)] text-xl"><FiTrendingUp /></div>
                  <div>
                    <div className="font-display text-lg mb-1">Notes & revues de marché</div>
                    <p className="text-secondary text-sm mb-3">Publications hebdomadaires et mensuelles sur l'évolution des indices BRVM, volumes de transactions, flux primaire et analyse des valorisations.</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-[var(--gold-light)]/20 text-xs rounded-md">Hebdomadaire</span>
                      <span className="px-2 py-1 bg-[var(--gold-light)]/20 text-xs rounded-md">Mensuel</span>
                      <span className="px-2 py-1 bg-[var(--gold-light)]/20 text-xs rounded-md">Gratuit</span>
                    </div>
                  </div>
                </div>
                <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-[var(--gold-metallic-10)] to-transparent" />
                <a href="/newsroom" className="mt-3 text-xs text-[var(--night-80)]/80 hover:text-[var(--gold-metallic)] transition-colors duration-200 inline-flex items-center gap-1">Voir les dernières notes <span>→</span></a>
              </div>
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="flex items-start gap-5">
                  <div className="icon-badge text-[var(--night)] text-xl"><FiFileText /></div>
                  <div>
                    <div className="font-display text-lg mb-1">Études sectorielles approfondies</div>
                    <p className="text-secondary text-sm mb-3">Analyses fondamentales complètes avec benchmarks sectoriels, évaluation des tendances et recommandations d'investissement par secteur économique.</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-[var(--gold-light)]/20 text-xs rounded-md">Banques</span>
                      <span className="px-2 py-1 bg-[var(--gold-light)]/20 text-xs rounded-md">Télécoms</span>
                      <span className="px-2 py-1 bg-[var(--gold-light)]/20 text-xs rounded-md">Immobilier</span>
                    </div>
                  </div>
                </div>
                <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-[var(--gold-metallic-10)] to-transparent" />
                <a href="/newsroom" className="mt-3 text-xs text-[var(--night-80)]/80 hover:text-[var(--gold-metallic)] transition-colors duration-200 inline-flex items-center gap-1">Explorer les études <span>→</span></a>
              </div>
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="flex items-start gap-5">
                  <div className="icon-badge text-[var(--night)] text-xl"><FiSearch /></div>
                  <div>
                    <div className="font-display text-lg mb-1">Analyses sur mesure</div>
                    <p className="text-secondary text-sm mb-3">Études personnalisées pour comités d'investissement, due diligences, valorisations d'entreprises et analyses de marché spécifiques.</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-[var(--gold-light)]/20 text-xs rounded-md">DCF</span>
                      <span className="px-2 py-1 bg-[var(--gold-light)]/20 text-xs rounded-md">Comparables</span>
                      <span className="px-2 py-1 bg-[var(--gold-light)]/20 text-xs rounded-md">Risques</span>
                    </div>
                  </div>
                </div>
                <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-[var(--gold-metallic-10)] to-transparent" />
                <a href="#contact" className="mt-3 text-xs text-[var(--night-80)]/80 hover:text-[var(--gold-metallic)] transition-colors duration-200 inline-flex items-center gap-1">Demander une analyse <span>→</span></a>
              </div>
            </div>
          </div>
        </section>

        {/* Méthodologie (timeline) */}
        <section id="methodologie" ref={methodSectionRef} className="reveal py-14 sm:py-18 bg-[var(--white-smoke)]">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-2xl mx-auto">
              <span className="kicker text-gradient-gold">Notre approche méthodologique</span>
              <h2 className="luxury-heading mt-3">De la collecte des données à la recommandation stratégique</h2>
              <p className="luxury-subheading mt-5">Un processus rigoureux combinant analyse quantitative et qualitative pour des insights fiables et actionnables.</p>
            </div>
            <div className="relative mt-12">
              <div className="absolute left-4 sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-px bg-[var(--night)]/10" />
              <ul ref={methodListRef} className="reveal-stagger space-y-8">
                {[
                  {
                    step: '01',
                    title: 'Définition du périmètre et validation des hypothèses',
                    desc: "Clarification des objectifs d'analyse, définition du scope géographique et sectoriel, identification des sources de données pertinentes et validation des hypothèses de travail avec le client.",
                    tools: ["Briefing client", "Analyse préliminaire", "Plan de recherche"],
                    duration: "3-5 jours"
                  },
                  {
                    step: '02',
                    title: 'Collecte et traitement des données primaires et secondaires',
                    desc: 'Récupération des données financières (états comptables, données BRVM), collecte d\'informations sectorielles, entretiens qualitatifs avec acteurs de marché et vérification de la qualité des données.',
                    tools: ["Bases de données financières", "API BRVM", "Entretiens experts"],
                    duration: "1-2 semaines"
                  },
                  {
                    step: '03',
                    title: 'Analyse quantitative et qualitative approfondie',
                    desc: 'Modélisation financière (DCF, comparables, sum-of-the-parts), analyse de sensibilité, évaluation des risques, tests de scénarios et benchmarking sectoriel.',
                    tools: ["Excel/Modèles propriétaires", "Analyse statistique", "Modélisation Monte Carlo"],
                    duration: "1-3 semaines"
                  },
                  {
                    step: '04',
                    title: 'Synthèse et recommandations stratégiques',
                    desc: "Rédaction du rapport final avec recommandations actionnables, présentation des conclusions au client, session de questions-réponses et suivi post-livraison.",
                    tools: ["Rapport structuré", "Présentation executive", "Support de suivi"],
                    duration: "3-7 jours"
                  },
                ].map((s, index) => (
                  <li key={s.step} className="relative">
                    <div className={`flex flex-col sm:flex-row ${index % 2 === 0 ? 'sm:flex-row-reverse' : ''} sm:items-start sm:justify-between gap-4`}>
                      <div className="sm:w-1/2 group relative overflow-hidden rounded-xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-5 transition-all card-hover">
                        <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                        <div className="flex items-start justify-between mb-3">
                          <span className="text-xs font-medium tracking-wider text-[var(--night-80)]/80">Étape {s.step}</span>
                          <span className="text-xs px-2 py-1 rounded-md bg-[var(--gold-light)]/20 text-[var(--gold-metallic)] font-medium">{s.duration}</span>
                        </div>
                        <div className="font-display text-lg mb-2">{s.title}</div>
                        <p className="text-secondary text-sm mb-4">{s.desc}</p>
                        <div className="border-t border-[var(--gold-light)]/20 pt-3">
                          <div className="text-xs text-[var(--night-80)]/80 mb-2">Outils & méthodes:</div>
                          <div className="flex flex-wrap gap-1">
                            {s.tools.map((tool, i) => (
                              <span key={i} className="px-2 py-1 bg-[var(--gold-light)]/10 text-xs rounded-md">{tool}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="hidden sm:block sm:w-1/2" />
                    </div>
                    <span className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-5 inline-block h-3 w-3 rounded-full bg-[var(--gold-dark)] shadow" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA — contact primary, newsroom secondary */}
        <div id="contact" className="sr-only" />
        <CTA
          scheme="ivory"
          primaryHref="mailto:contact@everest-finance.sn"
          primaryLabel="Écrire à un analyste"
          secondaryHref="/newsroom"
          secondaryLabel="Voir nos publications"
        />
      </main>
      <Footer />
    </div>
  )
}


