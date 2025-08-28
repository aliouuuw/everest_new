import { FiClipboard, FiLayers, FiSend } from 'react-icons/fi'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { useReveal } from '../components/Hooks/useReveal'

export const InvestmentBankingPage = () => {
  const heroRef = useReveal<HTMLElement>()
  const capsSectionRef = useReveal<HTMLElement>()
  const capsGridRef = useReveal<HTMLDivElement>()
  const processSectionRef = useReveal<HTMLElement>()
  const processGridRef = useReveal<HTMLDivElement>()
  const casesSectionRef = useReveal<HTMLElement>()
  const casesGridRef = useReveal<HTMLDivElement>()

  return (
    <div className="min-h-screen bg-[var(--pure-white)] text-[var(--night)]">
      <Header />
      <main className="pt-24 sm:pt-28">
        {/* Hero — Split pattern with capabilities */}
        <section ref={heroRef} className="reveal relative overflow-hidden">
          <div className="absolute inset-0 gradient-gold-subtle" />
          <div className="absolute inset-0" style={{ opacity: 0.06 }}>
            <div className="w-full h-full" style={{ backgroundImage: `linear-gradient(var(--night-10) 1px, transparent 1px), linear-gradient(90deg, var(--night-10) 1px, transparent 1px)`, backgroundSize: '64px 64px' }} />
          </div>
          <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="kicker text-gradient-gold">Offres — Ingénierie financière</span>
                <h1 className="luxury-heading mt-3">Concevoir et exécuter vos opérations de financement</h1>
                <p className="luxury-subheading mt-5">Nous structurons des émissions sur mesure et pilotons leur succès de bout en bout, avec rigueur et transparence.</p>
                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <a href="#processus" className="btn-primary font-display tracking-wide">Voir le processus</a>
                  <a href="#contact" className="btn-secondary font-display tracking-wide">Nous contacter</a>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6">
                <div className="pointer-events-none absolute -top-12 -right-12 w-56 h-56 rounded-full bg-[var(--gold-metallic-10)] blur-3xl" />
                <div className="relative w-full h-[280px] rounded-xl overflow-hidden border border-[var(--gold-metallic)]/25 bg-[var(--white-smoke)]/80">
                  <div className="absolute inset-0 grid grid-cols-3 gap-3 p-6">
                    <div className="rounded-lg bg-[var(--pure-white)]/70 border border-[var(--gold-metallic)]/25 flex flex-col items-center justify-center text-center p-4">
                      <FiLayers className="text-xl mb-2" />
                      <div className="text-xs font-display">Structuration</div>
                    </div>
                    <div className="rounded-lg bg-[var(--pure-white)]/70 border border-[var(--gold-metallic)]/25 flex flex-col items-center justify-center text-center p-4">
                      <FiClipboard className="text-xl mb-2" />
                      <div className="text-xs font-display">Conseil</div>
                    </div>
                    <div className="rounded-lg bg-[var(--pure-white)]/70 border border-[var(--gold-metallic)]/25 flex flex-col items-center justify-center text-center p-4">
                      <FiSend className="text-xl mb-2" />
                      <div className="text-xs font-display">Placement</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities grid */}
        <section ref={capsSectionRef} id="offres" className="reveal py-14 sm:py-18">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-2xl mx-auto">
              <span className="kicker text-gradient-gold">Capacités</span>
              <h2 className="luxury-heading mt-3">Structuration, conseil et placement</h2>
              <p className="luxury-subheading mt-5">Une offre intégrée couvrant l’ensemble de la chaîne de valeur d’une opération.</p>
            </div>
            <div ref={capsGridRef} className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="flex items-start gap-5">
                  <div className="icon-badge text-[var(--night)] text-xl"><FiLayers /></div>
                  <div>
                    <div className="font-display text-lg mb-1">Structuration d’opérations</div>
                    <p className="text-secondary text-sm">Conception des termes, modélisation, choix des instruments.</p>
                  </div>
                </div>
                <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-[var(--gold-metallic-10)] to-transparent" />
                <a href="#processus" className="mt-3 text-xs text-[var(--night-80)]/80 hover:text-[var(--gold-metallic)] transition-colors duration-200 inline-flex items-center gap-1">Découvrir le processus <span>→</span></a>
              </div>
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="flex items-start gap-5">
                  <div className="icon-badge text-[var(--night)] text-xl"><FiClipboard /></div>
                  <div>
                    <div className="font-display text-lg mb-1">Conseil aux émetteurs</div>
                    <p className="text-secondary text-sm">Préparation au marché, gouvernance et obligations d’information.</p>
                  </div>
                </div>
                <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-[var(--gold-metallic-10)] to-transparent" />
                <a href="#contact" className="mt-3 text-xs text-[var(--night-80)]/80 hover:text-[var(--gold-metallic)] transition-colors duration-200 inline-flex items-center gap-1">Parler à un conseiller <span>→</span></a>
              </div>
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="flex items-start gap-5">
                  <div className="icon-badge text-[var(--night)] text-xl"><FiSend /></div>
                  <div>
                    <div className="font-display text-lg mb-1">Placement & bookbuilding</div>
                    <p className="text-secondary text-sm">Accès investisseurs, constitution du livre et allocation.</p>
                  </div>
                </div>
                <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-[var(--gold-metallic-10)] to-transparent" />
                <a href="#processus" className="mt-3 text-xs text-[var(--night-80)]/80 hover:text-[var(--gold-metallic)] transition-colors duration-200 inline-flex items-center gap-1">Voir les étapes <span>→</span></a>
              </div>
            </div>
          </div>
        </section>

        {/* Process steps (4-card grid like CapitalMarketsPage) */}
        <section id="processus" ref={processSectionRef} className="reveal py-14 sm:py-18 bg-[var(--white-smoke)]">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-2xl mx-auto">
              <span className="kicker text-gradient-gold">Processus d'exécution</span>
              <h2 className="luxury-heading mt-3">Du diagnostic au règlement-livraison</h2>
            </div>
            <div ref={processGridRef} className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {[
                { step: '01', title: 'Diagnostic & cadrage', desc: 'Objectifs, contraintes et meilleures options de financement.' },
                { step: '02', title: 'Structuration & documentation', desc: 'Modélisation, termes, prospectus et interactions régulateur.' },
                { step: '03', title: 'Placement & pricing', desc: 'Roadshow, bookbuilding, allocations et fixation du prix.' },
                { step: '04', title: 'Clôture & suivi', desc: 'Règlement-livraison, admission et reporting post-opération.' },
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

        {/* Case highlights (like CapitalMarketsPage) */}
        <section ref={casesSectionRef} className="reveal py-14 sm:py-18">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-2xl mx-auto">
              <span className="kicker text-gradient-gold">Études de cas</span>
              <h2 className="luxury-heading mt-3">Opérations récentes</h2>
            </div>
            <div ref={casesGridRef} className="reveal-stagger grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="font-display text-lg">Structuration obligataire — Secteur Énergie</div>
                <div className="mt-4 grid grid-cols-2 gap-4 numeric-tabular">
                  <div className="stat-card"><div className="text-xs text-secondary">Montant structuré</div><div className="font-display text-xl">8,5 Mds XOF</div></div>
                  <div className="stat-card"><div className="text-xs text-secondary">Durée</div><div className="font-display text-xl">7 ans</div></div>
                </div>
                <div className="mt-4 text-secondary text-sm">Conception sur mesure, documentation et placement réussi en 8 semaines.</div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="font-display text-lg">Conseil en émission — Secteur Bancaire</div>
                <div className="mt-4 grid grid-cols-2 gap-4 numeric-tabular">
                  <div className="stat-card"><div className="text-xs text-secondary">Capital levé</div><div className="font-display text-xl">12,0 Mds XOF</div></div>
                  <div className="stat-card"><div className="text-xs text-secondary">Souscripteurs</div><div className="font-display text-xl">67</div></div>
                </div>
                <div className="mt-4 text-secondary text-sm">Accompagnement complet de la préparation à l'admission BRVM.</div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact anchor for CTA links (consistent with CapitalMarketsPage) */}
        <section id="contact" className="py-14 sm:py-18">
          <div className="mx-auto max-w-6xl px-6">
            <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-8 text-center">
              <div className="pointer-events-none absolute -top-16 -right-16 w-72 h-72 rounded-full bg-[var(--gold-metallic-10)] blur-3xl" />
              <h3 className="font-display text-xl">Un projet d'émission ou une question de structuration ?</h3>
              <p className="text-secondary mt-2">Nos équipes vous répondent sous 24h ouvrées.</p>
              <div className="mt-6 flex items-center justify-center gap-4">
                <a href="mailto:contact@everest-finance.sn" className="btn-primary font-display tracking-wide">Écrire à un conseiller</a>
                <a href="#processus" className="btn-secondary font-display tracking-wide">Voir le processus</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}


