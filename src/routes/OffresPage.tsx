import { FiCompass, FiHeadphones, FiShield, FiArrowRight, FiArrowDown } from 'react-icons/fi'

import { ServiceComparison } from '../components/Sections/ServiceComparison'
import { TestimonialsCarousel } from '../components/Sections/TestimonialsCarousel'
import { PerformanceComparison } from '../components/Sections/PerformanceComparison'
import { ServiceFAQ } from '../components/Sections/ServiceFAQ'
import { useReveal } from '../components/Hooks/useReveal'

export const OffresPage = () => {
  const heroRef = useReveal<HTMLElement>()
  const servicesOverviewRef = useReveal<HTMLElement>()
  const comparisonRef = useReveal<HTMLDivElement>()
  const testimonialsRef = useReveal<HTMLDivElement>()
  const performanceRef = useReveal<HTMLDivElement>()
  const faqRef = useReveal<HTMLDivElement>()

  return (
    <div className="bg-[var(--pure-white)] text-[var(--night)] font-primary">
        {/* ─── 1. Hero — Editorial & Asymmetrical ─── */}
        <section ref={heroRef} className="relative min-h-screen flex items-end pb-20 pt-40 border-b border-black/10">
          <div className="absolute top-0 right-0 w-full md:w-2/3 h-[70vh] z-0 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80"
              alt="Services financiers"
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--pure-white)] via-[var(--pure-white)]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--pure-white)] via-transparent to-transparent" />
          </div>
          
          <div className="relative z-10 w-full px-6 md:px-12 mx-auto max-w-[1600px]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-end">
              <div className="md:col-span-8">
                <div className="flex items-center gap-4 mb-12">
                  <span className="px-4 py-1.5 rounded-full bg-[var(--mauve-10)] text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-[var(--mauve)]">
                    Services d'investissement
                  </span>
                </div>
                <h1 className="font-primary font-bold text-5xl md:text-7xl lg:text-[6.5rem] leading-[0.95] tracking-tight mb-8 text-[var(--mauve)]">
                  Votre partenaire pour investir sur la <span style={{ color: 'var(--jaune-or)' }}>BRVM.</span>
                </h1>
              </div>
              
              <div className="md:col-span-4 pb-4">
                <p className="text-lg md:text-xl leading-relaxed text-[rgba(10, 10, 10, 0.7)] font-light mb-10 border-l-2 border-[var(--mauve)] pl-6">
                  Découvrez nos trois approches d'investissement conçues pour s'adapter à votre style, votre expérience et vos objectifs financiers.
                </p>
                <a href="#services" className="btn-primary group inline-flex items-center justify-center gap-4 px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all mt-4 w-fit">
                  <span>Explorer nos approches</span>
                  <FiArrowDown className="text-lg group-hover:translate-y-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. Services Overview — Stark Grid ─── */}
        <section id="services" ref={servicesOverviewRef} className="reveal py-24 md:py-40 section-bg-light">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              <div className="lg:col-span-4 min-w-0">
                <div className="sticky top-32">
                  <span className="px-4 py-1.5 rounded-full bg-[var(--jaune-or)]/15 text-[10px] font-bold tracking-[0.3em] text-[var(--jaune-or)] uppercase inline-block mb-8">Nos approches</span>
                  <h2 className="font-primary font-bold text-4xl md:text-5xl leading-[1.05] mb-8 text-white whitespace-normal break-words" style={{ hyphens: 'auto', wordBreak: 'break-word' }}>
                    Choisissez votre niveau d'accompagnement.
                  </h2>
                  <p className="text-white/60 leading-relaxed font-light text-lg mb-12">
                    Que vous soyez novice ou expérimenté, nous avons la solution adaptée à votre profil d'investisseur.
                  </p>
                  
                  <div className="border border-white/10 p-8 flex items-center justify-between rounded-2xl">
                    <div>
                      <div className="text-[10px] font-bold tracking-[0.3em] text-white/50 uppercase mb-2">Besoin d'aide ?</div>
                      <div className="font-primary font-bold text-xl text-white">Nos conseillers vous guident</div>
                    </div>
                    <a href="#contact" className="w-12 h-12 rounded-full bg-[var(--jaune-or)] text-[var(--night)] flex items-center justify-center hover:bg-white transition-colors">
                      <FiArrowRight className="text-xl" />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-8">
                <div className="border-t border-white/10">
                  {/* Gestion Libre */}
                  <div className="group py-12 border-b border-white/10 flex flex-col lg:flex-row gap-8 lg:gap-16">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 shrink-0 flex items-center justify-center text-[var(--jaune-or)]">
                      <FiCompass className="text-3xl" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-primary font-bold text-3xl md:text-4xl text-white group-hover:text-[var(--jaune-or)] transition-colors">
                          Gestion Libre
                        </h3>
                        <span className="text-xs font-bold tracking-[0.2em] text-[var(--jaune-or)] uppercase border border-[var(--jaune-or)] rounded-full px-4 py-1.5">Niveau 1</span>
                      </div>
                      <p className="text-white/60 leading-relaxed font-light text-xl mb-8">
                        Idéal pour les investisseurs autonomes qui veulent garder le contrôle total.
                      </p>
                      <ul className="space-y-3 text-white/80 mb-8">
                        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[var(--jaune-or)]" /> Décisions 100% indépendantes</li>
                        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[var(--jaune-or)]" /> Exécution professionnelle</li>
                        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[var(--jaune-or)]" /> Frais réduits</li>
                      </ul>
                      <div className="flex items-center justify-between pt-6 border-t border-white/10">
                        <div className="font-primary font-bold text-lg text-white/50">Frais: 0,40% - 0,60%</div>
                        <a href="/gestion-libre" className="text-[10px] font-bold tracking-[0.3em] text-[var(--jaune-or)] uppercase hover:text-white transition-colors flex items-center gap-2">
                          Découvrir <FiArrowRight />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Gestion Assistée */}
                  <div className="group py-12 border-b border-white/10 flex flex-col lg:flex-row gap-8 lg:gap-16 relative">
                    <div className="absolute -left-6 top-12 bottom-12 w-1 rounded-full bg-[var(--jaune-or)]" /> {/* Highlight for recommended */}
                    <div className="w-16 h-16 rounded-2xl bg-[var(--jaune-or)] shrink-0 flex items-center justify-center text-[var(--night)]">
                      <FiHeadphones className="text-3xl" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-primary font-bold text-3xl md:text-4xl text-white">
                          Gestion Assistée
                        </h3>
                        <span className="text-xs font-bold tracking-[0.2em] text-[var(--night)] bg-[var(--jaune-or)] rounded-full uppercase px-4 py-1.5">Recommandé</span>
                      </div>
                      <p className="text-white/60 leading-relaxed font-light text-xl mb-8">
                        Parfait équilibre entre autonomie et conseils d'experts.
                      </p>
                      <ul className="space-y-3 text-white/80 mb-8">
                        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[var(--jaune-or)]" /> Conseils personnalisés</li>
                        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[var(--jaune-or)]" /> Analyses et recommandations</li>
                        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[var(--jaune-or)]" /> Décisions finales vôtres</li>
                      </ul>
                      <div className="flex items-center justify-between pt-6 border-t border-white/10">
                        <div className="font-primary font-bold text-lg text-white/50">Frais: 0,60% - 0,80%</div>
                        <a href="/gestion-assistee" className="text-[10px] font-bold tracking-[0.3em] text-[var(--jaune-or)] uppercase hover:text-white transition-colors flex items-center gap-2">
                          Découvrir <FiArrowRight />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Gestion Sous-Mandat */}
                  <div className="group py-12 border-b border-white/10 flex flex-col lg:flex-row gap-8 lg:gap-16">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 shrink-0 flex items-center justify-center text-[var(--jaune-or)]">
                      <FiShield className="text-3xl" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-primary font-bold text-3xl md:text-4xl text-white group-hover:text-[var(--jaune-or)] transition-colors">
                          Gestion Sous-Mandat
                        </h3>
                        <span className="text-xs font-bold tracking-[0.2em] text-[var(--jaune-or)] uppercase border border-[var(--jaune-or)] rounded-full px-4 py-1.5">Niveau 3</span>
                      </div>
                      <p className="text-white/60 leading-relaxed font-light text-xl mb-8">
                        Pour ceux qui préfèrent déléguer la gestion à nos experts.
                      </p>
                      <ul className="space-y-3 text-white/80 mb-8">
                        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[var(--jaune-or)]" /> Gestion complète déléguée</li>
                        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[var(--jaune-or)]" /> Reporting détaillé</li>
                        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[var(--jaune-or)]" /> Suivi personnalisé</li>
                      </ul>
                      <div className="flex items-center justify-between pt-6 border-t border-white/10">
                        <div className="font-primary font-bold text-lg text-white/50">Frais: 0,80% - 1,20%</div>
                        <a href="/gestion-sous-mandat" className="text-[10px] font-bold tracking-[0.3em] text-[var(--jaune-or)] uppercase hover:text-white transition-colors flex items-center gap-2">
                          Découvrir <FiArrowRight />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Other Components (To be updated later if needed) ─── */}
        <div ref={comparisonRef}>
          <ServiceComparison />
        </div>

        <div ref={testimonialsRef}>
          <TestimonialsCarousel />
        </div>

        <div ref={performanceRef}>
          <PerformanceComparison />
        </div>

        <div ref={faqRef}>
          <ServiceFAQ service="discretionary" />
        </div>
    </div>
  )
}
