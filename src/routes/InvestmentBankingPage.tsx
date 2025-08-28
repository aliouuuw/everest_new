import { FiClipboard, FiLayers, FiSend } from 'react-icons/fi'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { CTA } from '../components/Sections/CTA'
import { useReveal } from '../components/Hooks/useReveal'

export const InvestmentBankingPage = () => {
  const heroRef = useReveal<HTMLElement>()
  const capsSectionRef = useReveal<HTMLElement>()
  const capsGridRef = useReveal<HTMLDivElement>()
  const processSectionRef = useReveal<HTMLElement>()
  const processListRef = useReveal<HTMLUListElement>()

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

        {/* Process timeline (About-style) */}
        <section id="processus" ref={processSectionRef} className="reveal py-14 sm:py-18 bg-[var(--white-smoke)]">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-2xl mx-auto">
              <span className="kicker text-gradient-gold">Processus d'exécution</span>
              <h2 className="luxury-heading mt-3">Du diagnostic au règlement-livraison</h2>
            </div>
            <div className="relative mt-12">
              <div className="absolute left-4 sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-px bg-[var(--night)]/10" />
              <ul ref={processListRef} className="reveal-stagger space-y-8">
                {[
                  { step: '01', title: 'Diagnostic & cadrage', desc: "Objectifs, contraintes et meilleures options de financement." },
                  { step: '02', title: 'Structuration & documentation', desc: 'Modélisation, termes, prospectus et interactions régulateur.' },
                  { step: '03', title: 'Placement & pricing', desc: 'Roadshow, bookbuilding, allocations et fixation du prix.' },
                  { step: '04', title: 'Clôture & suivi', desc: "Règlement-livraison, admission et reporting post-opération." },
                ].map((s, index) => (
                  <li key={s.step} className="relative">
                    <div className={`flex flex-col sm:flex-row ${index % 2 === 0 ? 'sm:flex-row-reverse' : ''} sm:items-start sm:justify-between gap-4`}>
                      <div className="sm:w-1/2 group relative overflow-hidden rounded-xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-5 transition-all card-hover">
                        <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium tracking-wider text-[var(--night-80)]/80">Étape</span>
                          <span className="numeric-tabular text-sm px-2 py-1 rounded-md border border-[var(--gold-metallic)]/25 bg-[var(--white-smoke)]/60">{s.step}</span>
                        </div>
                        <div className="font-display text-lg mt-3">{s.title}</div>
                        <p className="text-secondary mt-2 text-sm">{s.desc}</p>
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
      </main>
      <Footer />
    </div>
  )
}


