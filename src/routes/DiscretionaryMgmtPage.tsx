import { FiCheckCircle, FiClock, FiCompass, FiDollarSign, FiGrid, FiShield, FiTrendingUp } from 'react-icons/fi'

import { CTA } from '../components/Sections/CTA'
import { ServiceComparison } from '../components/Sections/ServiceComparison'
import { TestimonialsCarousel } from '../components/Sections/TestimonialsCarousel'
import { PerformanceComparison } from '../components/Sections/PerformanceComparison'
import { InvestmentCalculator } from '../components/Sections/InvestmentCalculator'
import { ServiceFAQ } from '../components/Sections/ServiceFAQ'
import { useReveal } from '../components/Hooks/useReveal'

export const DiscretionaryMgmtPage = () => {
  const heroRef = useReveal<HTMLElement>()
  const approachSectionRef = useReveal<HTMLElement>()
  const approachGridRef = useReveal<HTMLDivElement>()
  const packsSectionRef = useReveal<HTMLElement>()
  const packsGridRef = useReveal<HTMLDivElement>()
  const advantagesSectionRef = useReveal<HTMLElement>()
  const advantagesGridRef = useReveal<HTMLDivElement>()
  const processSectionRef = useReveal<HTMLElement>()
  const processGridRef = useReveal<HTMLDivElement>()

  return (
    <div>
        {/* Hero — Split pattern focused on approach */}
        <section ref={heroRef} className="reveal relative overflow-hidden">
          <div className="absolute inset-0 gradient-gold-subtle" />
          <div className="absolute inset-0" style={{ opacity: 0.06 }}>
            <div className="w-full h-full" style={{ backgroundImage: `linear-gradient(var(--night-10) 1px, transparent 1px), linear-gradient(90deg, var(--night-10) 1px, transparent 1px)`, backgroundSize: '64px 64px' }} />
          </div>
          <div className="relative mx-auto max-w-6xl px-6 py-34 md:py-20 sm:py-28 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <span className="kicker text-gradient-gold">Services — Gestion libre</span>
                <h1 className="luxury-heading mt-3">Pilotez vos investissements en toute simplicité</h1>
                <p className="luxury-subheading mt-5 leading-relaxed">Vous décidez de l'orientation et des limites. Nous exécutons avec rigueur sur la BRVM, dans un cadre clair et transparent.</p>
                <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-5">
                  <a href="#packs" className="btn-primary font-display tracking-wide">Découvrir les packs</a>
                  <a href="#contact" className="btn-secondary font-display tracking-wide">Nous contacter</a>
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
                            <FiCompass className="text-sm" />
                          </div>
                        </div>
                        <div className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[var(--gold-metallic-10)]" />
                      </div>
                      <div className="text-xs font-display">Approche</div>
                    </div>
                    <div className="rounded-lg bg-[var(--pure-white)]/70 border border-[var(--gold-metallic)]/25 flex flex-col items-center justify-center text-center p-4">
                      <div className="relative shrink-0 mb-2">
                        <div className="w-10 h-10 rounded-full bg-[var(--pure-white)] border border-[var(--gold-metallic)]/30 shadow-sm grid place-content-center">
                          <div className="w-6 h-6 rounded-full bg-[var(--white-smoke)]/80 border border-[var(--timberwolf)] grid place-content-center text-[var(--night)]">
                            <FiGrid className="text-sm" />
                          </div>
                        </div>
                        <div className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[var(--gold-metallic-10)]" />
                      </div>
                      <div className="text-xs font-display">Univers</div>
                    </div>
                    <div className="rounded-lg bg-[var(--pure-white)]/70 border border-[var(--gold-metallic)]/25 flex flex-col items-center justify-center text-center p-4">
                      <div className="relative shrink-0 mb-2">
                        <div className="w-10 h-10 rounded-full bg-[var(--pure-white)] border border-[var(--gold-metallic)]/30 shadow-sm grid place-content-center">
                          <div className="w-6 h-6 rounded-full bg-[var(--white-smoke)]/80 border border-[var(--timberwolf)] grid place-content-center text-[var(--night)]">
                            <FiDollarSign className="text-sm" />
                          </div>
                        </div>
                        <div className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[var(--gold-metallic-10)]" />
                      </div>
                      <div className="text-xs font-display">Frais clairs</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Approche & Univers d'investissement */}
        <section ref={approachSectionRef} className="reveal py-14 sm:py-18 lg:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-2xl mx-auto">
              <span className="kicker text-gradient-gold">Cadre</span>
              <h2 className="luxury-heading mt-3">Approche et univers d'investissement</h2>
              <p className="luxury-subheading mt-5 leading-relaxed">Un cadre simple, des règles explicites, et un univers BRVM adapté à vos objectifs.</p>
            </div>
            <div ref={approachGridRef} className="reveal-stagger grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 mt-12">
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 md:p-7 lg:p-8 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="flex items-start gap-5 md:gap-6">
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[var(--pure-white)] border border-[var(--gold-metallic)]/30 shadow-sm grid place-content-center">
                      <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[var(--white-smoke)]/80 border border-[var(--timberwolf)] grid place-content-center text-[var(--night)] text-xl md:text-2xl transition-transform duration-300 group-hover:scale-110">
                        <FiCompass />
                      </div>
                    </div>
                    <div className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[var(--gold-metallic-10)]" />
                  </div>
                  <div>
                    <div className="font-display text-lg md:text-xl mb-1">Approche</div>
                    <p className="text-secondary text-sm md:text-base leading-relaxed">Vous fixez les objectifs, contraintes et limites; nous assurons l'exécution et le suivi.</p>
                  </div>
                </div>
                <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-[var(--gold-metallic-10)] to-transparent" />
                <ul className="mt-3 text-secondary text-sm md:text-base space-y-1 leading-relaxed">
                  <li>• Profil de risque défini dès l'ouverture</li>
                  <li>• Règles d'allocation simples et traçables</li>
                  <li>• Reporting périodique clair</li>
                </ul>
              </div>
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 md:p-7 lg:p-8 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="flex items-start gap-5 md:gap-6">
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[var(--pure-white)] border border-[var(--gold-metallic)]/30 shadow-sm grid place-content-center">
                      <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[var(--white-smoke)]/80 border border-[var(--timberwolf)] grid place-content-center text-[var(--night)] text-xl md:text-2xl transition-transform duration-300 group-hover:scale-110">
                        <FiGrid />
                      </div>
                    </div>
                    <div className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[var(--gold-metallic-10)]" />
                  </div>
                  <div>
                    <div className="font-display text-lg md:text-xl mb-1">Univers d'investissement</div>
                    <p className="text-secondary text-sm md:text-base leading-relaxed">Titres cotés BRVM et opérations primaires, avec filtres de qualité et liquidité.</p>
                  </div>
                </div>
                <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-[var(--gold-metallic-10)] to-transparent" />
                <ul className="mt-3 text-secondary text-sm md:text-base space-y-1 leading-relaxed">
                  <li>• Actions principales de la cote</li>
                  <li>• Obligations souveraines et corporates</li>
                  <li>• Participations primaires éligibles</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Packs */}
        <section id="packs" ref={packsSectionRef} className="reveal py-14 sm:py-18 lg:py-20 bg-[var(--white-smoke)]">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-2xl mx-auto">
              <span className="kicker text-gradient-gold">Packs</span>
              <h2 className="luxury-heading mt-3">Choisissez le niveau d'accompagnement</h2>
              <p className="luxury-subheading mt-5 leading-relaxed">Frais transparents et outils adaptés à votre autonomie.</p>
            </div>
            <div ref={packsGridRef} className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 mt-12">
              {[
                { name: 'Essentiel', fee: '0,60%', min: '100 000 F CFA', tools: 'Appli web', note: 'Exécution simple' },
                { name: 'Confort', fee: '0,50%', min: '250 000 F CFA', tools: 'Appli web + alertes', note: 'Support prioritaire' },
                { name: 'Expert', fee: '0,40%', min: '1 000 000 F CFA', tools: 'Outils avancés + flux', note: 'Desk dédié' },
              ].map((p) => (
                <div key={p.name} className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 md:p-7 lg:p-8 transition-all card-hover">
                  <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                  <div className="font-display text-lg md:text-xl">{p.name}</div>
                  <div className="mt-4 grid grid-cols-2 gap-4 numeric-tabular">
                    <div className="stat-card"><div className="text-xs text-secondary">Frais dès</div><div className="font-display text-xl">{p.fee}</div></div>
                    <div className="stat-card"><div className="text-xs text-secondary">Minimum</div><div className="font-display text-xl">{p.min}</div></div>
                  </div>
                  <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-[var(--gold-metallic-10)] to-transparent" />
                  <div className="mt-3 text-sm md:text-base text-[var(--night-80)]/80 flex items-center gap-2 leading-relaxed"><FiTrendingUp className="opacity-80" />{p.tools}</div>
                  <div className="text-secondary text-xs md:text-sm mt-1">{p.note}</div>
                  <a href="#contact" className="mt-5 inline-flex items-center justify-center btn-secondary font-display tracking-wide">Ouvrir un compte</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Avantages Clés */}
        <section ref={advantagesSectionRef} className="reveal py-14 sm:py-18 lg:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-2xl mx-auto">
              <span className="kicker text-gradient-gold">Avantages</span>
              <h2 className="luxury-heading mt-3">Pourquoi choisir la gestion libre ?</h2>
              <p className="luxury-subheading mt-5 leading-relaxed">Une approche qui allie autonomie et expertise professionnelle.</p>
            </div>
            <div ref={advantagesGridRef} className="reveal-stagger grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 mt-12">
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 md:p-7 lg:p-8 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="flex items-start gap-5 md:gap-6">
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[var(--pure-white)] border border-[var(--gold-metallic)]/30 shadow-sm grid place-content-center">
                      <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[var(--white-smoke)]/80 border border-[var(--timberwolf)] grid place-content-center text-[var(--night)] text-xl md:text-2xl transition-transform duration-300 group-hover:scale-110">
                        <FiCheckCircle />
                      </div>
                    </div>
                    <div className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[var(--gold-metallic-10)]" />
                  </div>
                  <div>
                    <div className="font-display text-lg md:text-xl mb-1">Contrôle total</div>
                    <p className="text-secondary text-sm md:text-base leading-relaxed">Vous prenez toutes les décisions d'investissement selon vos critères.</p>
                  </div>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 md:p-7 lg:p-8 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="flex items-start gap-5 md:gap-6">
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[var(--pure-white)] border border-[var(--gold-metallic)]/30 shadow-sm grid place-content-center">
                      <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[var(--white-smoke)]/80 border border-[var(--timberwolf)] grid place-content-center text-[var(--night)] text-xl md:text-2xl transition-transform duration-300 group-hover:scale-110">
                        <FiClock />
                      </div>
                    </div>
                    <div className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[var(--gold-metallic-10)]" />
                  </div>
                  <div>
                    <div className="font-display text-lg md:text-xl mb-1">Réactivité</div>
                    <p className="text-secondary text-sm md:text-base leading-relaxed">Exécution rapide de vos ordres sur la BRVM.</p>
                  </div>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 md:p-7 lg:p-8 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="flex items-start gap-5 md:gap-6">
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[var(--pure-white)] border border-[var(--gold-metallic)]/30 shadow-sm grid place-content-center">
                      <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[var(--white-smoke)]/80 border border-[var(--timberwolf)] grid place-content-center text-[var(--night)] text-xl md:text-2xl transition-transform duration-300 group-hover:scale-110">
                        <FiShield />
                      </div>
                    </div>
                    <div className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[var(--gold-metallic-10)]" />
                  </div>
                  <div>
                    <div className="font-display text-lg md:text-xl mb-1">Transparence</div>
                    <p className="text-secondary text-sm md:text-base leading-relaxed">Frais clairs et reporting régulier de vos opérations.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Processus */}
        <section ref={processSectionRef} className="reveal py-14 sm:py-18 lg:py-20 bg-[var(--white-smoke)]">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-2xl mx-auto">
              <span className="kicker text-gradient-gold">Processus</span>
              <h2 className="luxury-heading mt-3">Comment ça fonctionne</h2>
              <p className="luxury-subheading mt-5 leading-relaxed">Un processus simple et efficace en 4 étapes.</p>
            </div>
            <div ref={processGridRef} className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 mt-12">
              {[
                { step: '01', title: 'Ouverture compte', desc: 'Remplissez le formulaire en ligne et signez électroniquement.' },
                { step: '02', title: 'Définition profil', desc: 'Établissez vos objectifs, contraintes et niveau de risque.' },
                { step: '03', title: 'Premier dépôt', desc: 'Effectuez votre premier versement selon vos moyens.' },
                { step: '04', title: 'Prise de contrôle', desc: 'Commencez à passer vos ordres via notre plateforme.' },
              ].map((s) => (
                <div key={s.step} className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover text-center">
                  <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                  <div className="numeric-tabular text-2xl font-display text-[var(--gold-dark)] mb-3">{s.step}</div>
                  <div className="font-display text-lg mb-2">{s.title}</div>
                  <p className="text-secondary text-sm">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Comparison */}
        <ServiceComparison currentService="discretionary" />

        {/* Testimonials */}
        <TestimonialsCarousel service="discretionary" />

        {/* Performance Comparison */}
        <PerformanceComparison />

        {/* Investment Calculator */}
        <InvestmentCalculator />

        {/* FAQ */}
        <ServiceFAQ service="discretionary" />

        {/* CTA band */}
        <div id="contact" className="sr-only" />
      <CTA
        scheme="ivory"
        primaryHref="mailto:contact@everest-finance.sn"
        primaryLabel="Ouvrir un compte"
        secondaryHref="#packs"
        secondaryLabel="Voir les packs"
      />
    </div>
  )
}


