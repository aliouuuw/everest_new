import { FiAward, FiClipboard, FiLayers, FiSend, FiTarget, FiTrendingUp, FiUsers } from 'react-icons/fi'

import { CTA } from '../components/Sections/CTA'
import { useReveal } from '../components/Hooks/useReveal'

export const InvestmentBankingPage = () => {
  const heroRef = useReveal<HTMLElement>()
  const capsSectionRef = useReveal<HTMLElement>()
  const capsGridRef = useReveal<HTMLDivElement>()
  const processSectionRef = useReveal<HTMLElement>()
  const processListRef = useReveal<HTMLUListElement>()

  return (
    <div className="pt-24 sm:pt-28 lg:pt-32">
        {/* Hero — Split pattern with capabilities */}
        <section ref={heroRef} className="reveal relative overflow-hidden">
          <div className="absolute inset-0 gradient-gold-subtle" />
          <div className="absolute inset-0" style={{ opacity: 0.06 }}>
            <div className="w-full h-full" style={{ backgroundImage: `linear-gradient(var(--night-10) 1px, transparent 1px), linear-gradient(90deg, var(--night-10) 1px, transparent 1px)`, backgroundSize: '64px 64px' }} />
          </div>
          <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <span className="kicker text-gradient-gold">Offres — Ingénierie financière</span>
                <h1 className="luxury-heading mt-3">L'excellence dans la conception d'opérations financières complexes</h1>
                <p className="luxury-subheading mt-5 pt-8 leading-relaxed">Nous concevons des solutions de financement sur mesure et les exécutons avec la plus haute rigueur. De l'idée à la réalisation, votre succès est notre priorité.</p>

                {/* Key Differentiators */}
                <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                  <div className="group flex items-center gap-3">
                    <div className="relative shrink-0">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--pure-white)] border border-[var(--gold-metallic)]/30 shadow-sm grid place-content-center">
                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[var(--white-smoke)]/80 border border-[var(--timberwolf)] grid place-content-center text-[var(--night)] transition-transform duration-300 group-hover:scale-110">
                          <FiTarget className="text-base md:text-lg" />
                        </div>
                      </div>
                      <div className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[var(--gold-metallic-10)]" />
                    </div>
                    <span className="text-sm md:text-base font-medium">Solutions sur mesure</span>
                  </div>
                  <div className="group flex items-center gap-3">
                    <div className="relative shrink-0">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--pure-white)] border border-[var(--gold-metallic)]/30 shadow-sm grid place-content-center">
                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[var(--white-smoke)]/80 border border-[var(--timberwolf)] grid place-content-center text-[var(--night)] transition-transform duration-300 group-hover:scale-110">
                          <FiTrendingUp className="text-base md:text-lg" />
                        </div>
                      </div>
                      <div className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[var(--gold-metallic-10)]" />
                    </div>
                    <span className="text-sm md:text-base font-medium">Optimisation fiscale</span>
                  </div>
                  <div className="group flex items-center gap-3">
                    <div className="relative shrink-0">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--pure-white)] border border-[var(--gold-metallic)]/30 shadow-sm grid place-content-center">
                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[var(--white-smoke)]/80 border border-[var(--timberwolf)] grid place-content-center text-[var(--night)] transition-transform duration-300 group-hover:scale-110">
                          <FiAward className="text-base md:text-lg" />
                        </div>
                      </div>
                      <div className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[var(--gold-metallic-10)]" />
                    </div>
                    <span className="text-sm md:text-base font-medium">Expertise réglementaire</span>
                  </div>
                  <div className="group flex items-center gap-3">
                    <div className="relative shrink-0">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--pure-white)] border border-[var(--gold-metallic)]/30 shadow-sm grid place-content-center">
                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[var(--white-smoke)]/80 border border-[var(--timberwolf)] grid place-content-center text-[var(--night)] transition-transform duration-300 group-hover:scale-110">
                          <FiUsers className="text-base md:text-lg" />
                        </div>
                      </div>
                      <div className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[var(--gold-metallic-10)]" />
                    </div>
                    <span className="text-sm md:text-base font-medium">Équipe dédiée</span>
                  </div>
                </div>

                <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-5">
                  <a href="#contact" className="btn-primary font-display tracking-wide">Demander une étude personnalisée</a>
                  <a href="#processus" className="btn-secondary font-display tracking-wide">Découvrir notre approche</a>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 md:p-7">
                <div className="pointer-events-none absolute -top-12 -right-12 w-56 h-56 rounded-full bg-[var(--gold-metallic-10)] blur-3xl" />
                <div className="relative w-full h-[280px] sm:h-[320px] rounded-xl overflow-hidden border border-[var(--gold-metallic)]/25 bg-[var(--white-smoke)]/80">
                  <div className="absolute inset-0 grid grid-cols-3 gap-3 p-6">
                    <div className="rounded-lg bg-[var(--pure-white)]/70 border border-[var(--gold-metallic)]/25 flex flex-col items-center justify-center text-center p-4">
                      <div className="relative shrink-0 mb-2">
                        <div className="w-10 h-10 rounded-full bg-[var(--pure-white)] border border-[var(--gold-metallic)]/30 shadow-sm grid place-content-center">
                          <div className="w-6 h-6 rounded-full bg-[var(--white-smoke)]/80 border border-[var(--timberwolf)] grid place-content-center text-[var(--night)]">
                            <FiLayers className="text-sm" />
                          </div>
                        </div>
                        <div className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[var(--gold-metallic-10)]" />
                      </div>
                      <div className="text-xs font-display">Structuration</div>
                    </div>
                    <div className="rounded-lg bg-[var(--pure-white)]/70 border border-[var(--gold-metallic)]/25 flex flex-col items-center justify-center text-center p-4">
                      <div className="relative shrink-0 mb-2">
                        <div className="w-10 h-10 rounded-full bg-[var(--pure-white)] border border-[var(--gold-metallic)]/30 shadow-sm grid place-content-center">
                          <div className="w-6 h-6 rounded-full bg-[var(--white-smoke)]/80 border border-[var(--timberwolf)] grid place-content-center text-[var(--night)]">
                            <FiClipboard className="text-sm" />
                          </div>
                        </div>
                        <div className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[var(--gold-metallic-10)]" />
                      </div>
                      <div className="text-xs font-display">Conseil</div>
                    </div>
                    <div className="rounded-lg bg-[var(--pure-white)]/70 border border-[var(--gold-metallic)]/25 flex flex-col items-center justify-center text-center p-4">
                      <div className="relative shrink-0 mb-2">
                        <div className="w-10 h-10 rounded-full bg-[var(--pure-white)] border border-[var(--gold-metallic)]/30 shadow-sm grid place-content-center">
                          <div className="w-6 h-6 rounded-full bg-[var(--white-smoke)]/80 border border-[var(--timberwolf)] grid place-content-center text-[var(--night)]">
                            <FiSend className="text-sm" />
                          </div>
                        </div>
                        <div className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[var(--gold-metallic-10)]" />
                      </div>
                      <div className="text-xs font-display">Placement</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Metrics & Expertise */}
        <section className="py-14 sm:py-18 lg:py-20 bg-gradient-to-br from-[var(--gold-light)]/5 to-transparent">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-3xl mx-auto">
              <span className="kicker text-gradient-gold">Notre expertise</span>
              <h2 className="luxury-heading mt-3">Des opérations complexes menées avec succès</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-10 mt-12">
              {[
                { value: '18+', label: 'Projets structurés', icon: FiLayers },
                { value: '8Mds', label: 'XOF conseillés', icon: FiTrendingUp },
                { value: '12', label: 'Experts spécialisés', icon: FiUsers },
                { value: '100%', label: 'Projets livrés', icon: FiAward }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="relative inline-flex items-center justify-center mb-4">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[var(--pure-white)] border border-[var(--gold-metallic)]/30 shadow-sm grid place-content-center">
                      <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[var(--white-smoke)]/80 border border-[var(--timberwolf)] grid place-content-center text-[var(--night)] transition-transform duration-300 group-hover:scale-110">
                        <stat.icon className="text-base md:text-lg" />
                      </div>
                    </div>
                    <div className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[var(--gold-metallic-10)]" />
                  </div>
                  <div className="numeric-tabular text-3xl font-display text-[var(--night)] mb-1">{stat.value}</div>
                  <div className="text-sm md:text-base text-secondary">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Case Studies */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 md:p-7">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="font-display text-lg mb-3">Refinancement d'entreprise — Secteur industriel</div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-[var(--gold-light)]/10 rounded-lg">
                    <div className="numeric-tabular text-xl font-display text-[var(--night)]">4,2 Mds XOF</div>
                    <div className="text-xs text-secondary">Montant refinancé</div>
                  </div>
                  <div className="text-center p-3 bg-[var(--gold-light)]/10 rounded-lg">
                    <div className="numeric-tabular text-xl font-display text-[var(--night)]">15%</div>
                    <div className="text-xs text-secondary">Économie réalisée</div>
                  </div>
                </div>
                <p className="text-secondary text-sm md:text-base leading-relaxed">Structuration d'une solution hybride dette/fonds propres avec optimisation fiscale majeure.</p>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 md:p-7">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="font-display text-lg mb-3">Levée de fonds — Start-up technologique</div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-[var(--gold-light)]/10 rounded-lg">
                    <div className="numeric-tabular text-xl font-display text-[var(--night)]">850 M XOF</div>
                    <div className="text-xs text-secondary">Fonds levés</div>
                  </div>
                  <div className="text-center p-3 bg-[var(--gold-light)]/10 rounded-lg">
                    <div className="numeric-tabular text-xl font-display text-[var(--night)]">8</div>
                    <div className="text-xs text-secondary">Investisseurs</div>
                  </div>
                </div>
                <p className="text-secondary text-sm md:text-base leading-relaxed">Conception d'une structure d'investissement innovante adaptée aux spécificités du secteur tech.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities grid */}
        <section ref={capsSectionRef} id="offres" className="reveal py-14 sm:py-18 lg:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-2xl mx-auto">
              <span className="kicker text-gradient-gold">Capacités</span>
              <h2 className="luxury-heading mt-3">Structuration, conseil et placement</h2>
              <p className="luxury-subheading mt-5 leading-relaxed">Une offre intégrée couvrant l'ensemble de la chaîne de valeur d'une opération.</p>
            </div>
            <div ref={capsGridRef} className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 mt-12">
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 md:p-7 lg:p-8 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="flex items-start gap-5 md:gap-6">
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[var(--pure-white)] border border-[var(--gold-metallic)]/30 shadow-sm grid place-content-center">
                      <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[var(--white-smoke)]/80 border border-[var(--timberwolf)] grid place-content-center text-[var(--night)] text-xl md:text-2xl transition-transform duration-300 group-hover:scale-110">
                        <FiLayers />
                      </div>
                    </div>
                    <div className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[var(--gold-metallic-10)]" />
                  </div>
                  <div>
                    <div className="font-display text-lg md:text-xl mb-1">Structuration d'opérations</div>
                    <p className="text-secondary text-sm md:text-base leading-relaxed mb-3">Conception sur mesure des termes financiers, modélisation avancée, optimisation des instruments et évaluation des risques.</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-[var(--gold-light)]/20 text-xs md:text-sm rounded-md">Modélisation</span>
                      <span className="px-2 py-1 bg-[var(--gold-light)]/20 text-xs md:text-sm rounded-md">Risques</span>
                      <span className="px-2 py-1 bg-[var(--gold-light)]/20 text-xs md:text-sm rounded-md">Optimisation</span>
                    </div>
                  </div>
                </div>
                <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-[var(--gold-metallic-10)] to-transparent" />
                <a href="#processus" className="mt-3 text-xs md:text-sm text-[var(--night-80)]/80 hover:text-[var(--gold-metallic)] transition-colors duration-200 inline-flex items-center gap-1">Découvrir le processus <span>→</span></a>
              </div>
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 md:p-7 lg:p-8 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="flex items-start gap-5 md:gap-6">
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[var(--pure-white)] border border-[var(--gold-metallic)]/30 shadow-sm grid place-content-center">
                      <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[var(--white-smoke)]/80 border border-[var(--timberwolf)] grid place-content-center text-[var(--night)] text-xl md:text-2xl transition-transform duration-300 group-hover:scale-110">
                        <FiClipboard />
                      </div>
                    </div>
                    <div className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[var(--gold-metallic-10)]" />
                  </div>
                  <div>
                    <div className="font-display text-lg md:text-xl mb-1">Conseil stratégique</div>
                    <p className="text-secondary text-sm md:text-base leading-relaxed mb-3">Préparation à l'émission, stratégie de communication, gouvernance d'entreprise et conformité réglementaire.</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-[var(--gold-light)]/20 text-xs md:text-sm rounded-md">Gouvernance</span>
                      <span className="px-2 py-1 bg-[var(--gold-light)]/20 text-xs md:text-sm rounded-md">Communication</span>
                      <span className="px-2 py-1 bg-[var(--gold-light)]/20 text-xs md:text-sm rounded-md">Réglementaire</span>
                    </div>
                  </div>
                </div>
                <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-[var(--gold-metallic-10)] to-transparent" />
                <a href="#contact" className="mt-3 text-xs md:text-sm text-[var(--night-80)]/80 hover:text-[var(--gold-metallic)] transition-colors duration-200 inline-flex items-center gap-1">Parler à un conseiller <span>→</span></a>
              </div>
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 md:p-7 lg:p-8 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="flex items-start gap-5 md:gap-6">
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[var(--pure-white)] border border-[var(--gold-metallic)]/30 shadow-sm grid place-content-center">
                      <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[var(--white-smoke)]/80 border border-[var(--timberwolf)] grid place-content-center text-[var(--night)] text-xl md:text-2xl transition-transform duration-300 group-hover:scale-110">
                        <FiSend />
                      </div>
                    </div>
                    <div className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[var(--gold-metallic-10)]" />
                  </div>
                  <div>
                    <div className="font-display text-lg md:text-xl mb-1">Placement et exécution</div>
                    <p className="text-secondary text-sm md:text-base leading-relaxed mb-3">Accès exclusif aux investisseurs, gestion du bookbuilding, allocation optimale et exécution parfaite.</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-[var(--gold-light)]/20 text-xs md:text-sm rounded-md">Bookbuilding</span>
                      <span className="px-2 py-1 bg-[var(--gold-light)]/20 text-xs md:text-sm rounded-md">Pricing</span>
                      <span className="px-2 py-1 bg-[var(--gold-light)]/20 text-xs md:text-sm rounded-md">Allocation</span>
                    </div>
                  </div>
                </div>
                <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-[var(--gold-light)] to-transparent" />
                <a href="#processus" className="mt-3 text-xs md:text-sm text-[var(--night-80)]/80 hover:text-[var(--gold-metallic)] transition-colors duration-200 inline-flex items-center gap-1">Voir les étapes <span>→</span></a>
              </div>
            </div>
          </div>
        </section>

        {/* Process timeline (About-style) */}
        <section id="processus" ref={processSectionRef} className="reveal py-14 sm:py-18 lg:py-20 bg-[var(--white-smoke)]">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-2xl mx-auto">
              <span className="kicker text-gradient-gold">Méthodologie éprouvée</span>
              <h2 className="luxury-heading mt-3">Notre approche structurée pour maximiser vos chances de succès</h2>
              <p className="luxury-subheading mt-5 leading-relaxed">Chaque étape est conçue pour optimiser les résultats et minimiser les risques.</p>
            </div>
            <div className="relative mt-12">
              <div className="absolute left-4 sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-px bg-[var(--night)]/10" />
              <ul ref={processListRef} className="reveal-stagger space-y-8">
                {[
                  {
                    step: '01',
                    title: 'Diagnostic & cadrage stratégique',
                    desc: "Analyse approfondie de vos objectifs financiers, contraintes budgétaires et environnement concurrentiel. Identification des meilleures options de financement adaptées à votre profil.",
                    duration: "1-2 semaines",
                    deliverables: ["Rapport d'analyse", "Options stratégiques", "Recommandations initiales"]
                  },
                  {
                    step: '02',
                    title: 'Structuration & documentation',
                    desc: 'Modélisation financière détaillée, définition des termes optimaux, préparation du prospectus d\'émission et coordination avec les autorités de régulation.',
                    duration: "2-4 semaines",
                    deliverables: ["Modèle financier", "Prospectus", "Visa réglementaire"]
                  },
                  {
                    step: '03',
                    title: 'Placement & fixation des conditions',
                    desc: 'Roadshow auprès des investisseurs institutionnels, constitution du livre d\'ordres, analyse de la demande et détermination du prix d\'émission optimal.',
                    duration: "1-3 semaines",
                    deliverables: ["Book d'ordres", "Prix final", "Allocations"]
                  },
                  {
                    step: '04',
                    title: 'Clôture & suivi post-opération',
                    desc: "Exécution du règlement-livraison, admission à la cote, mise en place du suivi post-marché et reporting aux investisseurs.",
                    duration: "1 semaine",
                    deliverables: ["Admission BRVM", "Reporting", "Suivi investisseurs"]
                  },
                ].map((s, index) => (
                  <li key={s.step} className="relative">
                    <div className={`flex flex-col sm:flex-row ${index % 2 === 0 ? 'sm:flex-row-reverse' : ''} sm:items-start sm:justify-between gap-4`}>
                      <div className="sm:w-1/2 group relative overflow-hidden rounded-xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-5 md:p-6 transition-all card-hover">
                        <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                        <div className="flex items-start justify-between mb-3">
                          <span className="text-xs font-medium tracking-wider text-[var(--night-80)]/80">Étape {s.step}</span>
                          <span className="text-xs px-2 py-1 rounded-md bg-[var(--gold-light)]/20 text-[var(--gold-metallic)] font-medium">{s.duration}</span>
                        </div>
                        <div className="font-display text-lg md:text-xl mb-2">{s.title}</div>
                        <p className="text-secondary text-sm md:text-base leading-relaxed mb-4">{s.desc}</p>
                        <div className="border-t border-[var(--gold-light)]/20 pt-3">
                          <div className="text-xs text-[var(--night-80)]/80 mb-2">Livrables clés:</div>
                          <div className="flex flex-wrap gap-1">
                            {s.deliverables.map((deliverable, i) => (
                              <span key={i} className="px-2 py-1 bg-[var(--gold-light)]/10 text-xs rounded-md">{deliverable}</span>
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

        {/* CTA band (shared) */}
        <div id="contact" className="sr-only" />
      <CTA scheme="ivory" primaryHref="mailto:contact@everest-finance.sn" primaryLabel="Écrire à un conseiller" secondaryHref="#processus" secondaryLabel="Voir le processus" />
    </div>
  )
}


