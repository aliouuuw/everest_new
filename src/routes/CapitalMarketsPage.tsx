import { FaChartLine, FaCheckCircle, FaFileSignature, FaHandshake } from 'react-icons/fa'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { CTA } from '../components/Sections/CTA'
import { useReveal } from '../components/Hooks/useReveal'

export const CapitalMarketsPage = () => {
  const heroRef = useReveal<HTMLElement>()
  const servicesSectionRef = useReveal<HTMLElement>()
  const servicesGridRef = useReveal<HTMLDivElement>()
  const processSectionRef = useReveal<HTMLElement>()
  const processGridRef = useReveal<HTMLDivElement>()
  const casesSectionRef = useReveal<HTMLElement>()
  const casesGridRef = useReveal<HTMLDivElement>()

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
                <span className="kicker text-gradient-gold">Offres — Marché des capitaux</span>
                <h1 className="luxury-heading mt-3">Accéder, structurer et placer sur les marchés</h1>
                <p className="luxury-subheading mt-5">De l’ingénierie à l’exécution, nous accompagnons les émetteurs et investisseurs sur le primaire et le secondaire, avec exigence et transparence.</p>
                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <a href="#processus" className="btn-primary font-display tracking-wide">Proposer une émission</a>
                  <a href="#contact" className="btn-secondary font-display tracking-wide">Nous contacter</a>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6">
                <div className="pointer-events-none absolute -top-12 -right-12 w-56 h-56 rounded-full bg-[var(--gold-metallic-10)] blur-3xl" />
                <div className="relative w-full h-[280px] rounded-xl overflow-hidden border border-[var(--gold-metallic)]/25 bg-[var(--white-smoke)]/80 grid place-content-center text-secondary">
                  <div className="flex flex-col items-center gap-3">
                    <FaChartLine className="text-3xl" />
                    <div className="font-display">Flux primaire & secondaire</div>
                    <div className="text-xs text-secondary">Obligations • Actions • Titres de créance</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services overview */}
        <section ref={servicesSectionRef} className="reveal py-14 sm:py-18">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-2xl mx-auto">
              <span className="kicker text-gradient-gold">Capacités</span>
              <h2 className="luxury-heading mt-3">Exécution et conseil sur le marché</h2>
              <p className="luxury-subheading mt-5">Couverture complète du cycle de financement: structuration, placement et suivi post-marché.</p>
            </div>

            <div ref={servicesGridRef} className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="flex items-start gap-5">
                  <div className="icon-badge text-[var(--night)] text-xl"><FaFileSignature /></div>
                  <div>
                    <div className="font-display text-lg mb-1">Structuration d’émissions</div>
                    <p className="text-secondary text-sm">Analyse, montage et documentation pour dettes et actions.</p>
                  </div>
                </div>
                <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-[var(--gold-metallic-10)] to-transparent" />
                <a href="#processus" className="mt-3 text-xs text-[var(--night-80)]/80 hover:text-[var(--gold-metallic)] transition-colors duration-200 inline-flex items-center gap-1">Découvrir le processus <span>→</span></a>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="flex items-start gap-5">
                  <div className="icon-badge text-[var(--night)] text-xl"><FaHandshake /></div>
                  <div>
                    <div className="font-display text-lg mb-1">Placement & bookbuilding</div>
                    <p className="text-secondary text-sm">Accès investisseurs, constitution du livre, allocation disciplinée.</p>
                  </div>
                </div>
                <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-[var(--gold-metallic-10)] to-transparent" />
                <a href="#processus" className="mt-3 text-xs text-[var(--night-80)]/80 hover:text-[var(--gold-metallic)] transition-colors duration-200 inline-flex items-center gap-1">Voir les étapes <span>→</span></a>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="flex items-start gap-5">
                  <div className="icon-badge text-[var(--night)] text-xl"><FaCheckCircle /></div>
                  <div>
                    <div className="font-display text-lg mb-1">Suivi post-marché</div>
                    <p className="text-secondary text-sm">Reporting, liquidité secondaire et relation investisseurs.</p>
                  </div>
                </div>
                <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-[var(--gold-metallic-10)] to-transparent" />
                <a href="#contact" className="mt-3 text-xs text-[var(--night-80)]/80 hover:text-[var(--gold-metallic)] transition-colors duration-200 inline-flex items-center gap-1">Parler à un conseiller <span>→</span></a>
              </div>
            </div>
          </div>
        </section>

        {/* Primary issuance process */}
        <section id="processus" ref={processSectionRef} className="reveal py-14 sm:py-18 bg-[var(--white-smoke)]">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-2xl mx-auto">
              <span className="kicker text-gradient-gold">Processus d’émission</span>
              <h2 className="luxury-heading mt-3">Du diagnostic au règlement-livraison</h2>
            </div>
            <div ref={processGridRef} className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {[
                { step: '01', title: 'Diagnostic & structuration', desc: 'Cadrage des objectifs, termes et modalités de l’opération.' },
                { step: '02', title: 'Visa & documentation', desc: 'Préparation du prospectus et interactions régulateur.' },
                { step: '03', title: 'Placement & bookbuilding', desc: 'Commercialisation, collecte des intentions et fixation du prix.' },
                { step: '04', title: 'Règlement-livraison', desc: 'Allotissement, admission et suivi des engagements.' },
              ].map((s) => (
                <div key={s.step} className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
                  <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-medium tracking-wider text-[var(--night-80)]/80">Étape</span>
                    <span className="numeric-tabular text-sm px-2 py-1 rounded-md border border-[var(--gold-metallic)]/25 bg-[var(--white-smoke)]/60">{s.step}</span>
                  </div>
                  <div className="font-display text-lg mt-3">{s.title}</div>
                  <p className="text-secondary text-sm mt-2">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case highlights */}
        <section ref={casesSectionRef} className="reveal py-14 sm:py-18">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-2xl mx-auto">
              <span className="kicker text-gradient-gold">Études de cas</span>
              <h2 className="luxury-heading mt-3">Opérations récentes</h2>
            </div>
            <div ref={casesGridRef} className="reveal-stagger grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="font-display text-lg">Emprunt obligataire — Secteur Infra</div>
                <div className="mt-4 grid grid-cols-2 gap-4 numeric-tabular">
                  <div className="stat-card"><div className="text-xs text-secondary">Montant levé</div><div className="font-display text-xl">10,5 Mds XOF</div></div>
                  <div className="stat-card"><div className="text-xs text-secondary">Demande</div><div className="font-display text-xl">1,6×</div></div>
                </div>
                <div className="mt-4 text-secondary text-sm">Structuration, placement et admission réussie en moins de 6 semaines.</div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="font-display text-lg">Augmentation de capital — Services</div>
                <div className="mt-4 grid grid-cols-2 gap-4 numeric-tabular">
                  <div className="stat-card"><div className="text-xs text-secondary">Levée</div><div className="font-display text-xl">3,2 Mds XOF</div></div>
                  <div className="stat-card"><div className="text-xs text-secondary">Investisseurs</div><div className="font-display text-xl">45</div></div>
                </div>
                <div className="mt-4 text-secondary text-sm">Livre rapidement constitué auprès d’institutionnels et family offices.</div>
              </div>
            </div>
          </div>
        </section>

        <div id="contact" className="sr-only" />
        <CTA scheme="ivory" primaryHref="mailto:contact@everest-finance.sn" primaryLabel="Écrire à un conseiller" secondaryHref="#processus" secondaryLabel="Voir le processus" />
    </main>

    <Footer />
  </div>
)
}


