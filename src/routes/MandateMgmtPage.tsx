import { FiClipboard, FiShield, FiSliders, FiTarget, FiTrendingUp, FiUsers, FiAward } from 'react-icons/fi'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { CTA } from '../components/Sections/CTA'
import { ServiceComparison } from '../components/Sections/ServiceComparison'
import { TestimonialsCarousel } from '../components/Sections/TestimonialsCarousel'
import { PerformanceComparison } from '../components/Sections/PerformanceComparison'
import { InvestmentCalculator } from '../components/Sections/InvestmentCalculator'
import { ServiceFAQ } from '../components/Sections/ServiceFAQ'
import { useReveal } from '../components/Hooks/useReveal'

export const MandateMgmtPage = () => {
  const heroRef = useReveal<HTMLElement>()
  const profilesSectionRef = useReveal<HTMLElement>()
  const profilesGridRef = useReveal<HTMLDivElement>()
  const govSectionRef = useReveal<HTMLElement>()
  const govGridRef = useReveal<HTMLDivElement>()
  const advantagesSectionRef = useReveal<HTMLElement>()
  const advantagesGridRef = useReveal<HTMLDivElement>()
  const expertiseSectionRef = useReveal<HTMLElement>()
  const expertiseGridRef = useReveal<HTMLDivElement>()

  return (
    <div className="min-h-screen bg-[var(--pure-white)] text-[var(--night)]">
      <Header />

      <main className="pt-24 sm:pt-28">
        {/* Hero — Split pattern */}
        <section ref={heroRef} className="reveal relative overflow-hidden">
          <div className="absolute inset-0 gradient-gold-subtle" />
          <div className="absolute inset-0" style={{ opacity: 0.06 }}>
            <div className="w-full h-full" style={{ backgroundImage: `linear-gradient(var(--night-10) 1px, transparent 1px), linear-gradient(90deg, var(--night-10) 1px, transparent 1px)`, backgroundSize: '64px 64px' }} />
          </div>
          <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="kicker text-gradient-gold">Offres — Gestion sous-mandat</span>
                <h1 className="luxury-heading mt-3">Déléguez l’exécution avec des règles claires</h1>
                <p className="luxury-subheading mt-5">Nous gérons le portefeuille dans un cadre défini ensemble: objectifs mesurables, contraintes explicites et reporting transparent.</p>
                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <a href="#profils" className="btn-primary font-display tracking-wide">Découvrir les profils</a>
                  <a href="#contact" className="btn-secondary font-display tracking-wide">Nous contacter</a>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6">
                <div className="pointer-events-none absolute -top-12 -right-12 w-56 h-56 rounded-full bg-[var(--gold-metallic-10)] blur-3xl" />
                <div className="relative w-full h-[280px] rounded-xl overflow-hidden border border-[var(--gold-metallic)]/25 bg-[var(--white-smoke)]/80">
                  <div className="absolute inset-0 grid grid-cols-3 gap-3 p-6">
                    <div className="rounded-lg bg-[var(--pure-white)]/70 border border-[var(--gold-metallic)]/25 flex flex-col items-center justify-center text-center p-4">
                      <FiTarget className="text-xl mb-2" />
                      <div className="text-xs font-display">Objectifs</div>
                    </div>
                    <div className="rounded-lg bg-[var(--pure-white)]/70 border border-[var(--gold-metallic)]/25 flex flex-col items-center justify-center text-center p-4">
                      <FiSliders className="text-xl mb-2" />
                      <div className="text-xs font-display">Contraintes</div>
                    </div>
                    <div className="rounded-lg bg-[var(--pure-white)]/70 border border-[var(--gold-metallic)]/25 flex flex-col items-center justify-center text-center p-4">
                      <FiClipboard className="text-xl mb-2" />
                      <div className="text-xs font-display">Reporting</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Profils de mandat */}
        <section id="profils" ref={profilesSectionRef} className="reveal py-14 sm:py-18">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-2xl mx-auto">
              <span className="kicker text-gradient-gold">Profils de mandat</span>
              <h2 className="luxury-heading mt-3">Objectifs et contraintes</h2>
              <p className="luxury-subheading mt-5">Trois profils types, ajustables selon votre horizon et votre tolérance au risque.</p>
            </div>
            <div ref={profilesGridRef} className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[
                {
                  name: 'Conservateur',
                  objective: 'Préservation du capital, rendement régulier',
                  constraints: ['Volatilité faible', 'Obligations/monétaire majoritaires', "Horizon ≥ 1 an"],
                },
                {
                  name: 'Équilibré',
                  objective: 'Croissance mesurée avec contrôle du risque',
                  constraints: ['Actions 30–60%', 'Obligations 40–70%', "Horizon ≥ 2 ans"],
                },
                {
                  name: 'Dynamique',
                  objective: 'Performance long terme',
                  constraints: ['Actions majoritaires', 'Acceptation d’une volatilité plus élevée', "Horizon ≥ 3 ans"],
                },
              ].map((p) => (
                <div key={p.name} className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
                  <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                  <div className="font-display text-lg mb-1">{p.name}</div>
                  <div className="text-secondary text-sm">Objectif: {p.objective}</div>
                  <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-[var(--gold-metallic-10)] to-transparent" />
                  <div className="mt-3 text-xs text-[var(--night-80)]/80 font-medium tracking-wide">Contraintes principales</div>
                  <ul className="mt-2 text-secondary text-sm space-y-1">
                    {p.constraints.map((c) => (
                      <li key={c}>• {c}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gouvernance & reporting */}
        <section ref={govSectionRef} className="reveal py-14 sm:py-18 bg-[var(--white-smoke)]">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-2xl mx-auto">
              <span className="kicker text-gradient-gold">Gouvernance & reporting</span>
              <h2 className="luxury-heading mt-3">Cadre de suivi et transparence</h2>
            </div>
            <div ref={govGridRef} className="reveal-stagger grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="flex items-start gap-5">
                  <div className="icon-badge text-[var(--night)] text-xl"><FiShield /></div>
                  <div>
                    <div className="font-display text-lg mb-1">Gouvernance</div>
                    <p className="text-secondary text-sm">Comité d’investissement, limites et délégations, contrôles de conformité.</p>
                  </div>
                </div>
                <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-[var(--gold-metallic-10)] to-transparent" />
                <ul className="mt-3 text-secondary text-sm space-y-1">
                  <li>• Comité d’investissement périodique</li>
                  <li>• Limites par émetteur/secteur</li>
                  <li>• Conformité CREPMF et procédures internes</li>
                </ul>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="flex items-start gap-5">
                  <div className="icon-badge text-[var(--night)] text-xl"><FiClipboard /></div>
                  <div>
                    <div className="font-display text-lg mb-1">Reporting</div>
                    <p className="text-secondary text-sm">Rapports détaillés et accès client sécurisé pour un suivi continu.</p>
                  </div>
                </div>
                <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-[var(--gold-metallic-10)] to-transparent" />
                <ul className="mt-3 text-secondary text-sm space-y-1">
                  <li>• Reporting mensuel: positions, performance, risques</li>
                  <li>• Accès plateforme client 24/7</li>
                  <li>• Points de gestion trimestriels</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Avantages Clés */}
        <section ref={advantagesSectionRef} className="reveal py-14 sm:py-18">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-2xl mx-auto">
              <span className="kicker text-gradient-gold">Avantages</span>
              <h2 className="luxury-heading mt-3">Pourquoi déléguer votre gestion ?</h2>
              <p className="luxury-subheading mt-5">Confiez vos investissements à des experts tout en gardant la maîtrise des objectifs.</p>
            </div>
            <div ref={advantagesGridRef} className="reveal-stagger grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="flex items-start gap-4">
                  <div className="icon-badge text-[var(--night)] text-xl"><FiShield /></div>
                  <div>
                    <div className="font-display text-lg mb-1">Expertise dédiée</div>
                    <p className="text-secondary text-sm">Équipe d'experts financiers spécialisés dans la gestion BRVM.</p>
                  </div>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="flex items-start gap-4">
                  <div className="icon-badge text-[var(--night)] text-xl"><FiTrendingUp /></div>
                  <div>
                    <div className="font-display text-lg mb-1">Performance ciblée</div>
                    <p className="text-secondary text-sm">Stratégies adaptées à votre profil de risque et à vos objectifs.</p>
                  </div>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="flex items-start gap-4">
                  <div className="icon-badge text-[var(--night)] text-xl"><FiUsers /></div>
                  <div>
                    <div className="font-display text-lg mb-1">Suivi personnalisé</div>
                    <p className="text-secondary text-sm">Conseiller dédié et points réguliers pour faire le bilan.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise & Track Record */}
        <section ref={expertiseSectionRef} className="reveal py-14 sm:py-18 bg-[var(--white-smoke)]">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-2xl mx-auto">
              <span className="kicker text-gradient-gold">Expertise</span>
              <h2 className="luxury-heading mt-3">Notre approche d'investissement</h2>
              <p className="luxury-subheading mt-5">Une méthodologie éprouvée et des résultats constants sur la durée.</p>
            </div>
            <div ref={expertiseGridRef} className="reveal-stagger grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="flex items-start gap-5">
                  <div className="icon-badge text-[var(--night)] text-xl"><FiTarget /></div>
                  <div>
                    <div className="font-display text-lg mb-1">Analyse fondamentale</div>
                    <p className="text-secondary text-sm">Sélection rigoureuse des valeurs basée sur l'analyse financière approfondie des entreprises cotées.</p>
                  </div>
                </div>
                <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-[var(--gold-metallic-10)] to-transparent" />
                <ul className="mt-3 text-secondary text-sm space-y-1">
                  <li>• Étude des états financiers</li>
                  <li>• Évaluation de la qualité de gestion</li>
                  <li>• Analyse sectorielle et macro-économique</li>
                </ul>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="flex items-start gap-5">
                  <div className="icon-badge text-[var(--night)] text-xl"><FiAward /></div>
                  <div>
                    <div className="font-display text-lg mb-1">Gestion active</div>
                    <p className="text-secondary text-sm">Ajustements réguliers du portefeuille en fonction des conditions de marché et des opportunités.</p>
                  </div>
                </div>
                <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-[var(--gold-metallic-10)] to-transparent" />
                <ul className="mt-3 text-secondary text-sm space-y-1">
                  <li>• Rééquilibrages périodiques</li>
                  <li>• Arbitrages opportunistes</li>
                  <li>• Gestion du risque en temps réel</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Service Comparison */}
        <ServiceComparison currentService="mandate" />

        {/* Testimonials */}
        <TestimonialsCarousel service="mandate" />

        {/* Performance Comparison */}
        <PerformanceComparison />

        {/* Investment Calculator */}
        <InvestmentCalculator />

        {/* FAQ */}
        <ServiceFAQ service="mandate" />

        {/* CTA band */}
        <div id="contact" className="sr-only" />
        <CTA
          scheme="ivory"
          primaryHref="mailto:contact@everest-finance.sn"
          primaryLabel="Parler à un conseiller"
          secondaryHref="#profils"
          secondaryLabel="Découvrir les profils"
        />
      </main>

      <Footer />
    </div>
  )
}


