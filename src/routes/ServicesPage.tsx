import { FiAward, FiCheckCircle, FiClock, FiCompass, FiDollarSign, FiGrid, FiHeadphones, FiHelpCircle, FiMessageCircle, FiPhone, FiShield, FiSliders, FiTarget, FiTrendingUp, FiUserCheck, FiUsers } from 'react-icons/fi'
import { FaLightbulb } from 'react-icons/fa'

import { ServiceComparison } from '../components/Sections/ServiceComparison'
import { TestimonialsCarousel } from '../components/Sections/TestimonialsCarousel'
import { PerformanceComparison } from '../components/Sections/PerformanceComparison'
import { ServiceFAQ } from '../components/Sections/ServiceFAQ'
import { useReveal } from '../components/Hooks/useReveal'

export const ServicesPage = () => {
  const heroRef = useReveal<HTMLElement>()
  const servicesOverviewRef = useReveal<HTMLElement>()
  const servicesGridRef = useReveal<HTMLDivElement>()
  const comparisonRef = useReveal<HTMLDivElement>()
  const testimonialsRef = useReveal<HTMLDivElement>()
  const performanceRef = useReveal<HTMLDivElement>()
  const faqRef = useReveal<HTMLDivElement>()

  return (
    <div>
        {/* Hero Section */}
        <section ref={heroRef} className="reveal relative overflow-hidden">
          <div className="absolute inset-0 gradient-gold-subtle" />
          <div className="absolute inset-0" style={{ opacity: 0.06 }}>
            <div className="w-full h-full" style={{ backgroundImage: `linear-gradient(var(--night-10) 1px, transparent 1px), linear-gradient(90deg, var(--night-10) 1px, transparent 1px)`, backgroundSize: '64px 64px' }} />
          </div>
          <div className="relative mx-auto max-w-6xl px-6 py-34 md:py-20 sm:py-28 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <span className="kicker text-gradient-gold">Services d'investissement</span>
                <h1 className="luxury-heading mt-3">Votre partenaire pour investir sur la BRVM</h1>
                <p className="luxury-subheading mt-5 leading-relaxed">
                  Découvrez nos trois approches d'investissement conçues pour s'adapter à votre style,
                  votre expérience et vos objectifs financiers.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[var(--gold-metallic)] rounded-full flex-shrink-0" />
                    <span className="text-secondary">Accompagnement personnalisé</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[var(--gold-metallic)] rounded-full flex-shrink-0" />
                    <span className="text-secondary">Expertise reconnue sur la BRVM</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[var(--gold-metallic)] rounded-full flex-shrink-0" />
                    <span className="text-secondary">Transparence et suivi continu</span>
                  </div>
                </div>

                <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-5">
                  <a href="#services" className="btn-primary font-display tracking-wide">Explorer nos services</a>
                  <a href="#contact" className="btn-secondary font-display tracking-wide">Parler à un conseiller</a>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-8">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />

                <div className="text-center mb-6">
                  <div className="text-3xl font-display text-[var(--gold-dark)] mb-2">500+</div>
                  <div className="text-sm text-secondary">Clients satisfaits</div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-display text-[var(--gold-dark)] mb-1">4.9/5</div>
                    <div className="text-xs text-secondary">Note moyenne</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-display text-[var(--gold-dark)] mb-1">98%</div>
                    <div className="text-xs text-secondary">Recommandation</div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-[var(--gold-metallic)]/25">
                  <div className="text-center">
                    <div className="text-sm font-display text-[var(--night)] mb-1">Montant minimum</div>
                    <div className="text-lg font-display text-[var(--gold-dark)]">100 000 F CFA</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section id="services" ref={servicesOverviewRef} className="reveal py-14 sm:py-18 lg:py-20 bg-[var(--white-smoke)]">
          <div className="mx-auto max-w-6xl px-6">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="kicker text-gradient-gold">Nos approches</span>
              <h2 className="luxury-heading mt-3">Choisissez votre niveau d'accompagnement</h2>
              <p className="luxury-subheading mt-5 leading-relaxed">
                Que vous soyez novice ou expérimenté, nous avons la solution adaptée à votre profil d'investisseur
                et à vos objectifs sur la BRVM.
              </p>
            </div>

            {/* Services Grid */}
            <div ref={servicesGridRef} className="reveal-stagger grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 mb-16">
              {/* Gestion Libre */}
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/90 backdrop-blur-sm p-6 md:p-7 lg:p-8 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />

                {/* Service Level Indicator */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium tracking-wider text-[var(--night-80)]/80 bg-[var(--gold-light)]/20 px-3 py-1 rounded-full">
                    Niveau 1
                  </span>
                  <div className="text-xs text-secondary">À partir de 100K F CFA</div>
                </div>

                <div className="flex items-start gap-5 md:gap-6 mb-4">
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[var(--pure-white)] border border-[var(--gold-metallic)]/30 shadow-sm grid place-content-center">
                      <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[var(--white-smoke)]/80 border border-[var(--timberwolf)] grid place-content-center text-[var(--night)] text-xl md:text-2xl transition-transform duration-300 group-hover:scale-110">
                        <FiCompass />
                      </div>
                    </div>
                    <div className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[var(--gold-metallic-10)]" />
                  </div>
                  <div>
                    <div className="font-display text-lg md:text-xl mb-1">Gestion Libre</div>
                    <p className="text-secondary text-sm md:text-base leading-relaxed">Idéal pour les investisseurs autonomes qui veulent garder le contrôle total.</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <FiCheckCircle className="text-green-600 w-4 h-4 flex-shrink-0" />
                    <span className="text-sm text-secondary">Décisions 100% indépendantes</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiCheckCircle className="text-green-600 w-4 h-4 flex-shrink-0" />
                    <span className="text-sm text-secondary">Exécution professionnelle</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiCheckCircle className="text-green-600 w-4 h-4 flex-shrink-0" />
                    <span className="text-sm text-secondary">Frais réduits</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--gold-metallic)]/25">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-display text-[var(--night)]">Frais annuels</span>
                    <span className="font-display text-[var(--gold-dark)]">0,40% - 0,60%</span>
                  </div>
                  <a href="#gestion-libre" className="inline-flex items-center justify-center btn-secondary font-display tracking-wide w-full">
                    Découvrir ce service
                  </a>
                </div>
              </div>

              {/* Gestion Assistée */}
              <div className="group relative overflow-hidden rounded-2xl border-2 border-[var(--gold-metallic)]/40 bg-[var(--pure-white)]/90 backdrop-blur-sm p-6 md:p-7 lg:p-8 transition-all card-hover shadow-lg">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />

                {/* Service Level Indicator */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium tracking-wider text-[var(--gold-dark)] bg-[var(--gold-light)]/30 px-3 py-1 rounded-full">
                    Niveau 2
                  </span>
                  <div className="text-xs text-secondary">À partir de 250K F CFA</div>
                </div>

                <div className="flex items-start gap-5 md:gap-6 mb-4">
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[var(--pure-white)] border border-[var(--gold-metallic)]/30 shadow-sm grid place-content-center">
                      <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[var(--white-smoke)]/80 border border-[var(--timberwolf)] grid place-content-center text-[var(--night)] text-xl md:text-2xl transition-transform duration-300 group-hover:scale-110">
                        <FiHeadphones />
                      </div>
                    </div>
                    <div className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[var(--gold-metallic-10)]" />
                  </div>
                  <div>
                    <div className="font-display text-lg md:text-xl mb-1">Gestion Assistée</div>
                    <p className="text-secondary text-sm md:text-base leading-relaxed">Parfait équilibre entre autonomie et conseils d'experts.</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <FiCheckCircle className="text-green-600 w-4 h-4 flex-shrink-0" />
                    <span className="text-sm text-secondary">Conseils personnalisés</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiCheckCircle className="text-green-600 w-4 h-4 flex-shrink-0" />
                    <span className="text-sm text-secondary">Analyses et recommandations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiCheckCircle className="text-green-600 w-4 h-4 flex-shrink-0" />
                    <span className="text-sm text-secondary">Décisions finales vôtres</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--gold-metallic)]/25">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-display text-[var(--night)]">Frais annuels</span>
                    <span className="font-display text-[var(--gold-dark)]">0,60% - 0,80%</span>
                  </div>
                  <a href="#gestion-assistee" className="inline-flex items-center justify-center btn-primary font-display tracking-wide w-full">
                    Service recommandé
                  </a>
                </div>
              </div>

              {/* Gestion Sous-Mandat */}
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/90 backdrop-blur-sm p-6 md:p-7 lg:p-8 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />

                {/* Service Level Indicator */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium tracking-wider text-[var(--night-80)]/80 bg-[var(--gold-light)]/20 px-3 py-1 rounded-full">
                    Niveau 3
                  </span>
                  <div className="text-xs text-secondary">À partir de 500K F CFA</div>
                </div>

                <div className="flex items-start gap-5 md:gap-6 mb-4">
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[var(--pure-white)] border border-[var(--gold-metallic)]/30 shadow-sm grid place-content-center">
                      <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[var(--white-smoke)]/80 border border-[var(--timberwolf)] grid place-content-center text-[var(--night)] text-xl md:text-2xl transition-transform duration-300 group-hover:scale-110">
                        <FiShield />
                      </div>
                    </div>
                    <div className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[var(--gold-metallic-10)]" />
                  </div>
                  <div>
                    <div className="font-display text-lg md:text-xl mb-1">Gestion Sous-Mandat</div>
                    <p className="text-secondary text-sm md:text-base leading-relaxed">Pour ceux qui préfèrent déléguer la gestion à nos experts.</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <FiCheckCircle className="text-green-600 w-4 h-4 flex-shrink-0" />
                    <span className="text-sm text-secondary">Gestion complète déléguée</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiCheckCircle className="text-green-600 w-4 h-4 flex-shrink-0" />
                    <span className="text-sm text-secondary">Reporting détaillé</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiCheckCircle className="text-green-600 w-4 h-4 flex-shrink-0" />
                    <span className="text-sm text-secondary">Suivi personnalisé</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--gold-metallic)]/25">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-display text-[var(--night)]">Frais annuels</span>
                    <span className="font-display text-[var(--gold-dark)]">0,80% - 1,20%</span>
                  </div>
                  <a href="#gestion-sous-mandat" className="inline-flex items-center justify-center btn-secondary font-display tracking-wide w-full">
                    En savoir plus
                  </a>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <div className="inline-flex items-center gap-4 px-8 py-4 bg-[var(--pure-white)]/60 backdrop-blur-sm rounded-xl border border-[var(--gold-metallic)]/25">
                <FiHelpCircle className="text-[var(--gold-dark)] w-5 h-5" />
                <div className="text-left">
                  <div className="font-display text-sm text-[var(--night)]">Besoin d'aide pour choisir ?</div>
                  <div className="text-xs text-secondary">Nos conseillers vous guident gratuitement</div>
                </div>
                <a href="#contact" className="btn-secondary font-display tracking-wide text-sm">
                  Être conseillé
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Service Comparison */}
        <div ref={comparisonRef}>
          <ServiceComparison />
        </div>

        {/* Testimonials */}
        <div ref={testimonialsRef}>
          <TestimonialsCarousel />
        </div>

        {/* Performance Comparison */}
        <div ref={performanceRef}>
          <PerformanceComparison />
        </div>

        {/* FAQ */}
        <div ref={faqRef}>
          <ServiceFAQ service="discretionary" />
        </div>
    </div>
  )
}
