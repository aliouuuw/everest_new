import { FiCompass, FiHeadphones, FiShield, FiArrowRight, FiArrowDown } from 'react-icons/fi'
import { EditableText } from '../cms'
import { ServiceComparison } from '../components/Sections/ServiceComparison'
import { TestimonialsCarousel } from '../components/Sections/TestimonialsCarousel'
import { PerformanceComparison } from '../components/Sections/PerformanceComparison'
import { ServiceFAQ } from '../components/Sections/ServiceFAQ'
import { useReveal } from '../components/Hooks/useReveal'

/** Matches À propos / Outils — hero & section titles max 50px. */
const sectionTitleStyle = { fontSize: 'clamp(2.375rem, 4.6vw + 1.2rem, 50px)' } as const

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
        <section ref={heroRef} className="relative min-h-[72vh] md:min-h-[76vh] flex items-end pb-12 pt-28 md:pb-14 md:pt-32 border-b border-black/10">
          <div className="absolute top-0 right-0 w-full h-[70vh] z-0 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80"
              alt="Services financiers"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--pure-white) 0%, var(--pure-white) 30%, rgba(250,246,239,0.6) 50%, transparent 100%)' }} />
          </div>
          <div className="absolute bottom-0 left-0 w-full h-[40vh] z-0" style={{ background: 'linear-gradient(to top, var(--pure-white) 60%, transparent 100%)' }} />
          
          <div className="relative z-10 w-full page-container">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 items-end">
              <div className="md:col-span-8">
                <div className="flex items-center gap-4 mb-5 md:mb-6">
                  <span className="px-4 py-1.5 rounded-full bg-[var(--mauve-10)] text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-[var(--night-80)]">
                    <EditableText id="offres.hero.badge">Services d'investissement</EditableText>
                  </span>
                </div>
                <h1
                  className="font-primary font-bold leading-[0.95] tracking-tight mb-4 text-[var(--night-80)]"
                  style={sectionTitleStyle}
                >
                  <EditableText id="offres.hero.title">Votre partenaire pour investir sur la BRVM.</EditableText>
                </h1>
              </div>
              
              <div className="md:col-span-4 pb-2">
                <p className="text-base md:text-lg leading-relaxed text-[rgba(10, 10, 10, 0.7)] font-light mb-6 border-l-2 border-[var(--mauve)] pl-6">
                  <EditableText id="offres.hero.subtitle">Découvrez nos trois approches d'investissement conçues pour s'adapter à votre style, votre expérience et vos objectifs financiers.</EditableText>
                </p>
                <a href="#services" className="btn-primary group inline-flex items-center justify-center gap-4 px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all mt-2 w-fit">
                  <span><EditableText id="offres.hero.ctaLabel">Explorer nos approches</EditableText></span>
                  <FiArrowDown className="text-lg group-hover:translate-y-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. Services Overview — Stark Grid ─── */}
        <section id="services" ref={servicesOverviewRef} className="reveal py-12 md:py-20 section-bg-light">
          <div className="page-container relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-4 min-w-0">
                <div className="sticky top-28 md:top-32">
                  <span className="px-4 py-1.5 rounded-full bg-[var(--jaune-or)]/15 text-[10px] font-bold tracking-[0.3em] text-[var(--jaune-or)] uppercase inline-block mb-4"><EditableText id="offres.overview.badge">Nos approches</EditableText></span>
                  <h2
                    className="font-primary font-bold leading-[0.95] tracking-tight mb-5 text-white whitespace-normal break-words"
                    style={{ hyphens: 'auto', wordBreak: 'break-word', ...sectionTitleStyle }}
                  >
                    <EditableText id="offres.overview.title">Choisissez votre niveau d'accompagnement.</EditableText>
                  </h2>
                  <p className="text-white/60 leading-relaxed font-light text-lg mb-8">
                    <EditableText id="offres.overview.intro">Que vous soyez novice ou expérimenté, nous avons la solution adaptée à votre profil d'investisseur.</EditableText>
                  </p>
                  
                  <div className="border border-white/10 p-6 flex items-center justify-between rounded-2xl">
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
                  <div className="group py-8 md:py-9 border-b border-white/10 flex flex-col lg:flex-row gap-6 lg:gap-10">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 shrink-0 flex items-center justify-center text-[var(--jaune-or)]">
                      <FiCompass className="text-3xl" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-primary font-bold text-3xl md:text-4xl text-white group-hover:text-[var(--jaune-or)] transition-colors">
                          <EditableText id="offres.libre.title">Gestion Libre</EditableText>
                        </h3>
                        <span className="text-xs font-bold tracking-[0.2em] text-[var(--jaune-or)] uppercase border border-[var(--jaune-or)] rounded-full px-4 py-1.5">Niveau 1</span>
                      </div>
                      <p className="text-white/60 leading-relaxed font-light text-lg md:text-xl mb-5">
                        <EditableText id="offres.libre.description">Idéal pour les investisseurs autonomes qui veulent garder le contrôle total.</EditableText>
                      </p>
                      <ul className="space-y-2.5 text-white/80 mb-6">
                        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[var(--jaune-or)]" /> Décisions 100% indépendantes</li>
                        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[var(--jaune-or)]" /> Exécution professionnelle</li>
                        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[var(--jaune-or)]" /> Frais réduits</li>
                      </ul>
                      <div className="flex items-center justify-between pt-5 border-t border-white/10">
                        <div className="font-primary font-bold text-lg text-white/50"><EditableText id="offres.libre.fees">Frais: 0,40% - 0,60%</EditableText></div>
                        <a href="/gestion-libre" className="text-[10px] font-bold tracking-[0.3em] text-[var(--jaune-or)] uppercase hover:text-white transition-colors flex items-center gap-2">
                          Découvrir <FiArrowRight />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Gestion Assistée */}
                  <div className="group py-8 md:py-9 border-b border-white/10 flex flex-col lg:flex-row gap-6 lg:gap-10 relative">
                    <div className="absolute -left-6 top-10 bottom-10 w-1 rounded-full bg-[var(--jaune-or)]" /> {/* Highlight for recommended */}
                    <div className="w-16 h-16 rounded-2xl bg-[var(--jaune-or)] shrink-0 flex items-center justify-center text-[var(--night)]">
                      <FiHeadphones className="text-3xl" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-primary font-bold text-3xl md:text-4xl text-white">
                          <EditableText id="offres.assistee.title">Gestion Assistée</EditableText>
                        </h3>
                        <span className="text-xs font-bold tracking-[0.2em] text-[var(--night)] bg-[var(--jaune-or)] rounded-full uppercase px-4 py-1.5">Recommandé</span>
                      </div>
                      <p className="text-white/60 leading-relaxed font-light text-lg md:text-xl mb-5">
                        <EditableText id="offres.assistee.description">Parfait équilibre entre autonomie et conseils d'experts.</EditableText>
                      </p>
                      <ul className="space-y-2.5 text-white/80 mb-6">
                        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[var(--jaune-or)]" /> Conseils personnalisés</li>
                        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[var(--jaune-or)]" /> Analyses et recommandations</li>
                        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[var(--jaune-or)]" /> Décisions finales vôtres</li>
                      </ul>
                      <div className="flex items-center justify-between pt-5 border-t border-white/10">
                        <div className="font-primary font-bold text-lg text-white/50"><EditableText id="offres.assistee.fees">Frais: 0,60% - 0,80%</EditableText></div>
                        <a href="/gestion-assistee" className="text-[10px] font-bold tracking-[0.3em] text-[var(--jaune-or)] uppercase hover:text-white transition-colors flex items-center gap-2">
                          Découvrir <FiArrowRight />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Gestion Sous-Mandat */}
                  <div className="group py-8 md:py-9 border-b border-white/10 flex flex-col lg:flex-row gap-6 lg:gap-10">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 shrink-0 flex items-center justify-center text-[var(--jaune-or)]">
                      <FiShield className="text-3xl" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-primary font-bold text-3xl md:text-4xl text-white group-hover:text-[var(--jaune-or)] transition-colors">
                          <EditableText id="offres.mandat.title">Gestion Sous-Mandat</EditableText>
                        </h3>
                        <span className="text-xs font-bold tracking-[0.2em] text-[var(--jaune-or)] uppercase border border-[var(--jaune-or)] rounded-full px-4 py-1.5">Niveau 3</span>
                      </div>
                      <p className="text-white/60 leading-relaxed font-light text-lg md:text-xl mb-5">
                        <EditableText id="offres.mandat.description">Pour ceux qui préfèrent déléguer la gestion à nos experts.</EditableText>
                      </p>
                      <ul className="space-y-2.5 text-white/80 mb-6">
                        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[var(--jaune-or)]" /> Gestion complète déléguée</li>
                        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[var(--jaune-or)]" /> Reporting détaillé</li>
                        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[var(--jaune-or)]" /> Suivi personnalisé</li>
                      </ul>
                      <div className="flex items-center justify-between pt-5 border-t border-white/10">
                        <div className="font-primary font-bold text-lg text-white/50"><EditableText id="offres.mandat.fees">Frais: 0,80% - 1,20%</EditableText></div>
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
