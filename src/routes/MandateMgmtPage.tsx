import { FiClipboard, FiShield, FiSliders, FiTarget } from 'react-icons/fi'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { CTA } from '../components/Sections/CTA'
import { useReveal } from '../components/Hooks/useReveal'

export const MandateMgmtPage = () => {
  const heroRef = useReveal<HTMLElement>()
  const profilesSectionRef = useReveal<HTMLElement>()
  const profilesGridRef = useReveal<HTMLDivElement>()
  const govSectionRef = useReveal<HTMLElement>()
  const govGridRef = useReveal<HTMLDivElement>()

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


