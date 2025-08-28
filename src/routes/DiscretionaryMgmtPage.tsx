import { FiCompass, FiDollarSign, FiGrid, FiTrendingUp } from 'react-icons/fi'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { CTA } from '../components/Sections/CTA'
import { useReveal } from '../components/Hooks/useReveal'

export const DiscretionaryMgmtPage = () => {
  const heroRef = useReveal<HTMLElement>()
  const approachSectionRef = useReveal<HTMLElement>()
  const approachGridRef = useReveal<HTMLDivElement>()
  const packsSectionRef = useReveal<HTMLElement>()
  const packsGridRef = useReveal<HTMLDivElement>()

  return (
    <div className="min-h-screen bg-[var(--pure-white)] text-[var(--night)]">
      <Header />

      <main className="pt-24 sm:pt-28">
        {/* Hero — Split pattern focused on approach */}
        <section ref={heroRef} className="reveal relative overflow-hidden">
          <div className="absolute inset-0 gradient-gold-subtle" />
          <div className="absolute inset-0" style={{ opacity: 0.06 }}>
            <div className="w-full h-full" style={{ backgroundImage: `linear-gradient(var(--night-10) 1px, transparent 1px), linear-gradient(90deg, var(--night-10) 1px, transparent 1px)`, backgroundSize: '64px 64px' }} />
          </div>
          <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="kicker text-gradient-gold">Offres — Gestion libre</span>
                <h1 className="luxury-heading mt-3">Pilotez vos investissements en toute simplicité</h1>
                <p className="luxury-subheading mt-5">Vous décidez de l’orientation et des limites. Nous exécutons avec rigueur sur la BRVM, dans un cadre clair et transparent.</p>
                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <a href="#packs" className="btn-primary font-display tracking-wide">Découvrir les packs</a>
                  <a href="#contact" className="btn-secondary font-display tracking-wide">Nous contacter</a>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6">
                <div className="pointer-events-none absolute -top-12 -right-12 w-56 h-56 rounded-full bg-[var(--gold-metallic-10)] blur-3xl" />
                <div className="relative w-full h-[280px] rounded-xl overflow-hidden border border-[var(--gold-metallic)]/25 bg-[var(--white-smoke)]/80">
                  <div className="absolute inset-0 grid grid-cols-3 gap-3 p-6">
                    <div className="rounded-lg bg-[var(--pure-white)]/70 border border-[var(--gold-metallic)]/25 flex flex-col items-center justify-center text-center p-4">
                      <FiCompass className="text-xl mb-2" />
                      <div className="text-xs font-display">Approche</div>
                    </div>
                    <div className="rounded-lg bg-[var(--pure-white)]/70 border border-[var(--gold-metallic)]/25 flex flex-col items-center justify-center text-center p-4">
                      <FiGrid className="text-xl mb-2" />
                      <div className="text-xs font-display">Univers</div>
                    </div>
                    <div className="rounded-lg bg-[var(--pure-white)]/70 border border-[var(--gold-metallic)]/25 flex flex-col items-center justify-center text-center p-4">
                      <FiDollarSign className="text-xl mb-2" />
                      <div className="text-xs font-display">Frais clairs</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Approche & Univers d’investissement */}
        <section ref={approachSectionRef} className="reveal py-14 sm:py-18">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-2xl mx-auto">
              <span className="kicker text-gradient-gold">Cadre</span>
              <h2 className="luxury-heading mt-3">Approche et univers d’investissement</h2>
              <p className="luxury-subheading mt-5">Un cadre simple, des règles explicites, et un univers BRVM adapté à vos objectifs.</p>
            </div>
            <div ref={approachGridRef} className="reveal-stagger grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="flex items-start gap-4">
                  <div className="icon-badge text-[var(--night)] text-xl"><FiCompass /></div>
                  <div>
                    <div className="font-display text-lg mb-1">Approche</div>
                    <p className="text-secondary text-sm">Vous fixez les objectifs, contraintes et limites; nous assurons l’exécution et le suivi.</p>
                  </div>
                </div>
                <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-[var(--gold-metallic-10)] to-transparent" />
                <ul className="mt-3 text-secondary text-sm space-y-1">
                  <li>• Profil de risque défini dès l’ouverture</li>
                  <li>• Règles d’allocation simples et traçables</li>
                  <li>• Reporting périodique clair</li>
                </ul>
              </div>
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="flex items-start gap-4">
                  <div className="icon-badge text-[var(--night)] text-xl"><FiGrid /></div>
                  <div>
                    <div className="font-display text-lg mb-1">Univers d’investissement</div>
                    <p className="text-secondary text-sm">Titres cotés BRVM et opérations primaires, avec filtres de qualité et liquidité.</p>
                  </div>
                </div>
                <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-[var(--gold-metallic-10)] to-transparent" />
                <ul className="mt-3 text-secondary text-sm space-y-1">
                  <li>• Actions principales de la cote</li>
                  <li>• Obligations souveraines et corporates</li>
                  <li>• Participations primaires éligibles</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Packs */}
        <section id="packs" ref={packsSectionRef} className="reveal py-14 sm:py-18 bg-[var(--white-smoke)]">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-2xl mx-auto">
              <span className="kicker text-gradient-gold">Packs</span>
              <h2 className="luxury-heading mt-3">Choisissez le niveau d’accompagnement</h2>
              <p className="luxury-subheading mt-5">Frais transparents et outils adaptés à votre autonomie.</p>
            </div>
            <div ref={packsGridRef} className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[
                { name: 'Essentiel', fee: '0,60%', min: '100 000 F CFA', tools: 'Appli web', note: 'Exécution simple' },
                { name: 'Confort', fee: '0,50%', min: '250 000 F CFA', tools: 'Appli web + alertes', note: 'Support prioritaire' },
                { name: 'Expert', fee: '0,40%', min: '1 000 000 F CFA', tools: 'Outils avancés + flux', note: 'Desk dédié' },
              ].map((p) => (
                <div key={p.name} className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
                  <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                  <div className="font-display text-lg">{p.name}</div>
                  <div className="mt-4 grid grid-cols-2 gap-4 numeric-tabular">
                    <div className="stat-card"><div className="text-xs text-secondary">Frais dès</div><div className="font-display text-xl">{p.fee}</div></div>
                    <div className="stat-card"><div className="text-xs text-secondary">Minimum</div><div className="font-display text-xl">{p.min}</div></div>
                  </div>
                  <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-[var(--gold-metallic-10)] to-transparent" />
                  <div className="mt-3 text-sm text-[var(--night-80)]/80 flex items-center gap-2"><FiTrendingUp className="opacity-80" />{p.tools}</div>
                  <div className="text-secondary text-xs mt-1">{p.note}</div>
                  <a href="#contact" className="mt-5 inline-flex items-center justify-center btn-secondary font-display tracking-wide">Ouvrir un compte</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA band */}
        <div id="contact" className="sr-only" />
        <CTA
          scheme="ivory"
          primaryHref="mailto:contact@everest-finance.sn"
          primaryLabel="Ouvrir un compte"
          secondaryHref="#packs"
          secondaryLabel="Voir les packs"
        />
      </main>

      <Footer />
    </div>
  )
}


