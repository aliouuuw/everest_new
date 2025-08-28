import { FiHeadphones, FiHelpCircle, FiMessageCircle, FiPhone, FiSliders, FiUserCheck } from 'react-icons/fi'
import { FaLightbulb } from 'react-icons/fa'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { CTA } from '../components/Sections/CTA'
import { ServiceComparison } from '../components/Sections/ServiceComparison'
import { TestimonialsCarousel } from '../components/Sections/TestimonialsCarousel'
import { PerformanceComparison } from '../components/Sections/PerformanceComparison'
import { InvestmentCalculator } from '../components/Sections/InvestmentCalculator'
import { ServiceFAQ } from '../components/Sections/ServiceFAQ'
import { useReveal } from '../components/Hooks/useReveal'

export const AssistedMgmtPage = () => {
  const heroRef = useReveal<HTMLElement>()
  const stepsSectionRef = useReveal<HTMLElement>()
  const stepsGridRef = useReveal<HTMLDivElement>()
  const toolsSectionRef = useReveal<HTMLElement>()
  const toolsGridRef = useReveal<HTMLDivElement>()
  const advisorsSectionRef = useReveal<HTMLElement>()
  const advisorsGridRef = useReveal<HTMLDivElement>()
  const benefitsSectionRef = useReveal<HTMLElement>()
  const benefitsGridRef = useReveal<HTMLDivElement>()

  return (
    <div className="min-h-screen bg-[var(--pure-white)] text-[var(--night)]">
      <Header />

      <main className="pt-24 sm:pt-28 lg:pt-32">
        {/* Hero — Split pattern with advisor angle */}
        <section ref={heroRef} className="reveal relative overflow-hidden">
          <div className="absolute inset-0 gradient-gold-subtle" />
          <div className="absolute inset-0" style={{ opacity: 0.06 }}>
            <div className="w-full h-full" style={{ backgroundImage: `linear-gradient(var(--night-10) 1px, transparent 1px), linear-gradient(90deg, var(--night-10) 1px, transparent 1px)`, backgroundSize: '64px 64px' }} />
          </div>
          <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <span className="kicker text-gradient-gold">Offres — Gestion assistée</span>
                <h1 className="luxury-heading mt-3">Décider avec un conseiller à vos côtés</h1>
                <p className="luxury-subheading mt-5 leading-relaxed">Vous gardez la main sur les décisions, nous apportons analyses, recommandations et suivi pour investir sereinement.</p>
                <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-5">
                  <a href="#marche" className="btn-primary font-display tracking-wide">Comment ça marche</a>
                  <a href="#contact" className="btn-secondary font-display tracking-wide">Parler à un conseiller</a>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 md:p-7">
                <div className="pointer-events-none absolute -top-12 -right-12 w-56 h-56 rounded-full bg-[var(--gold-metallic-10)] blur-3xl" />
                <div className="relative w-full h-[280px] sm:h-[320px] rounded-xl overflow-hidden border border-[var(--gold-metallic)]/25 bg-[var(--white-smoke)]/80 grid place-content-center">
                  <div className="flex items-center gap-3 text-secondary">
                    <div className="relative shrink-0">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[var(--pure-white)] border border-[var(--gold-metallic)]/30 shadow-sm grid place-content-center">
                        <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[var(--white-smoke)]/80 border border-[var(--timberwolf)] grid place-content-center text-[var(--night)]">
                          <FiHeadphones className="text-base md:text-lg" />
                        </div>
                      </div>
                      <div className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[var(--gold-metallic-10)]" />
                    </div>
                    <div className="font-display">Accompagnement personnalisé</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comment ça marche (3 steps) */}
        <section id="marche" ref={stepsSectionRef} className="reveal py-14 sm:py-18 lg:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-2xl mx-auto">
              <span className="kicker text-gradient-gold">Processus</span>
              <h2 className="luxury-heading mt-3">Comment ça marche</h2>
              <p className="luxury-subheading mt-5 leading-relaxed">Un cadre simple, pensé pour vous conseiller sans vous déposséder de la décision.</p>
            </div>
            <div ref={stepsGridRef} className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 mt-12">
              {[
                { step: '01', title: 'Diagnostic initial', desc: 'Besoins, objectifs, contraintes et horizon clarifiés.', icon: FiHelpCircle },
                { step: '02', title: 'Recommandations', desc: 'Listes d\'actions ou obligations avec rationales et niveaux.', icon: FiSliders },
                { step: '03', title: 'Décision & suivi', desc: 'Vous validez, nous exécutons et assurons le reporting.', icon: FiUserCheck },
              ].map((s) => (
                <div key={s.step} className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 md:p-7 lg:p-8 transition-all card-hover">
                  <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-medium tracking-wider text-[var(--night-80)]/80">Étape</span>
                    <span className="numeric-tabular text-sm px-2 py-1 rounded-md border border-[var(--gold-metallic)]/25 bg-[var(--white-smoke)]/60">{s.step}</span>
                  </div>
                  <div className="flex items-start gap-5 md:gap-6 mt-3">
                    <div className="relative shrink-0">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[var(--pure-white)] border border-[var(--gold-metallic)]/30 shadow-sm grid place-content-center">
                        <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[var(--white-smoke)]/80 border border-[var(--timberwolf)] grid place-content-center text-[var(--night)] text-xl md:text-2xl transition-transform duration-300 group-hover:scale-110">
                          <s.icon />
                        </div>
                      </div>
                      <div className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[var(--gold-metallic-10)]" />
                    </div>
                    <div>
                      <div className="font-display text-lg md:text-xl mb-1">{s.title}</div>
                      <p className="text-secondary text-sm md:text-base leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Outils & accompagnement (2 cards) */}
        <section ref={toolsSectionRef} className="reveal py-14 sm:py-18 lg:py-20 bg-[var(--white-smoke)]">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-2xl mx-auto">
              <span className="kicker text-gradient-gold">Outils & accompagnement</span>
              <h2 className="luxury-heading mt-3">Des moyens concrets pour décider</h2>
            </div>
            <div ref={toolsGridRef} className="reveal-stagger grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 mt-12">
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 md:p-7 lg:p-8 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="font-display text-lg md:text-xl mb-1">Analyses & alertes</div>
                <p className="text-secondary text-sm md:text-base leading-relaxed">Notes régulières, signaux de marché et alertes personnalisées pour ne rien manquer.</p>
                <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-[var(--gold-metallic-10)] to-transparent" />
                <div className="mt-3 text-xs md:text-sm text-[var(--night-80)]/80">Accès aux publications et à un flux d'alertes</div>
              </div>
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 md:p-7 lg:p-8 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="font-display text-lg md:text-xl mb-1">Échanges avec un conseiller</div>
                <p className="text-secondary text-sm md:text-base leading-relaxed">Points de marché, simulations et idées d'allocation en direct avec votre interlocuteur.</p>
                <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-[var(--gold-metallic-10)] to-transparent" />
                <div className="mt-3 text-xs md:text-sm text-[var(--night-80)]/80 flex items-center gap-2"><FiMessageCircle className="opacity-80" />Canaux: email, téléphone, visio</div>
              </div>
            </div>
          </div>
        </section>

        {/* Avantages Clés */}
        <section ref={benefitsSectionRef} className="reveal py-14 sm:py-18 lg:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-2xl mx-auto">
              <span className="kicker text-gradient-gold">Avantages</span>
              <h2 className="luxury-heading mt-3">Le meilleur des deux mondes</h2>
              <p className="luxury-subheading mt-5 leading-relaxed">Gardez le contrôle de vos décisions tout en bénéficiant de l'expertise d'un conseiller.</p>
            </div>
            <div ref={benefitsGridRef} className="reveal-stagger grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 mt-12">
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 md:p-7 lg:p-8 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="flex items-start gap-5 md:gap-6">
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[var(--pure-white)] border border-[var(--gold-metallic)]/30 shadow-sm grid place-content-center">
                      <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[var(--white-smoke)]/80 border border-[var(--timberwolf)] grid place-content-center text-[var(--night)] text-xl md:text-2xl transition-transform duration-300 group-hover:scale-110">
                        <FiUserCheck />
                      </div>
                    </div>
                    <div className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[var(--gold-metallic-10)]" />
                  </div>
                  <div>
                    <div className="font-display text-lg md:text-xl mb-1">Décisions souveraines</div>
                    <p className="text-secondary text-sm md:text-base leading-relaxed">Vous validez chaque recommandation avant exécution.</p>
                  </div>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 md:p-7 lg:p-8 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="flex items-start gap-5 md:gap-6">
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[var(--pure-white)] border border-[var(--gold-metallic)]/30 shadow-sm grid place-content-center">
                      <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[var(--white-smoke)]/80 border border-[var(--timberwolf)] grid place-content-center text-[var(--night)] text-xl md:text-2xl transition-transform duration-300 group-hover:scale-110">
                        <FaLightbulb />
                      </div>
                    </div>
                    <div className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[var(--gold-metallic-10)]" />
                  </div>
                  <div>
                    <div className="font-display text-lg md:text-xl mb-1">Expertise accessible</div>
                    <p className="text-secondary text-sm md:text-base leading-relaxed">Conseils d'experts sans frais de gestion élevés.</p>
                  </div>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 md:p-7 lg:p-8 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="flex items-start gap-5 md:gap-6">
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[var(--pure-white)] border border-[var(--gold-metallic)]/30 shadow-sm grid place-content-center">
                      <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[var(--white-smoke)]/80 border border-[var(--timberwolf)] grid place-content-center text-[var(--night)] text-xl md:text-2xl transition-transform duration-300 group-hover:scale-110">
                        <FiPhone />
                      </div>
                    </div>
                    <div className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[var(--gold-metallic-10)]" />
                  </div>
                  <div>
                    <div className="font-display text-lg md:text-xl mb-1">Support réactif</div>
                    <p className="text-secondary text-sm md:text-base leading-relaxed">Échanges réguliers et assistance quand vous en avez besoin.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nos Conseillers */}
        <section ref={advisorsSectionRef} className="reveal py-14 sm:py-18 bg-[var(--white-smoke)]">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-2xl mx-auto">
              <span className="kicker text-gradient-gold">Équipe</span>
              <h2 className="luxury-heading mt-3">Rencontrez nos conseillers</h2>
              <p className="luxury-subheading mt-5">Des experts passionnés à votre service pour vous accompagner dans vos décisions d'investissement.</p>
            </div>
            <div ref={advisorsGridRef} className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[
                {
                  name: 'Marie-Louise Diop',
                  role: 'Conseillère Senior',
                  experience: '12 ans d\'expérience',
                  specializations: ['Actions BRVM', 'Stratégies défensives', 'Retraite'],
                  description: 'Spécialiste des stratégies d\'investissement à long terme pour les particuliers.'
                },
                {
                  name: 'Amadou Faye',
                  role: 'Conseiller Principal',
                  experience: '15 ans d\'expérience',
                  specializations: ['Marchés émergents', 'Analyse technique', 'Diversification'],
                  description: 'Expert en analyse de marché et en construction de portefeuilles équilibrés.'
                },
                {
                  name: 'Fatima Sall',
                  role: 'Conseillère Patrimoniale',
                  experience: '10 ans d\'expérience',
                  specializations: ['Immobilier', 'Private Equity', 'Succession'],
                  description: 'Accompagne les familles dans leur stratégie patrimoniale globale.'
                },
              ].map((advisor) => (
                <div key={advisor.name} className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
                  <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />

                  {/* Avatar */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-[var(--gold-light)]/30 flex items-center justify-center">
                      <span className="text-lg font-display text-[var(--gold-dark)]">
                        {advisor.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-display text-lg text-[var(--night)]">{advisor.name}</div>
                      <div className="text-sm text-secondary">{advisor.role}</div>
                      <div className="text-xs text-[var(--gold-dark)] font-medium">{advisor.experience}</div>
                    </div>
                  </div>

                  <p className="text-secondary text-sm mb-4">{advisor.description}</p>

                  <div className="border-t border-[var(--gold-metallic)]/25 pt-4">
                    <div className="text-xs text-[var(--night-80)]/80 font-medium mb-2">Spécialisations</div>
                    <div className="flex flex-wrap gap-1">
                      {advisor.specializations.map((spec) => (
                        <span
                          key={spec}
                          className="text-xs bg-[var(--gold-light)]/20 text-[var(--gold-dark)] px-2 py-1 rounded-full"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Comparison */}
        <ServiceComparison currentService="assisted" />

        {/* Testimonials */}
        <TestimonialsCarousel service="assisted" />

        {/* Performance Comparison */}
        <PerformanceComparison />

        {/* Investment Calculator */}
        <InvestmentCalculator />

        {/* FAQ */}
        <ServiceFAQ service="assisted" />

        {/* CTA band */}
        <div id="contact" className="sr-only" />
        <CTA
          scheme="ivory"
          primaryHref="mailto:contact@everest-finance.sn"
          primaryLabel="Parler à un conseiller"
          secondaryHref="#marche"
          secondaryLabel="Voir le fonctionnement"
        />
      </main>

      <Footer />
    </div>
  )
}


