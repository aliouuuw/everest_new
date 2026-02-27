import { FiArrowDown } from 'react-icons/fi'
import { ServiceComparison } from '../components/Sections/ServiceComparison'
import { TestimonialsCarousel } from '../components/Sections/TestimonialsCarousel'
import { PerformanceComparison } from '../components/Sections/PerformanceComparison'
import { InvestmentCalculator } from '../components/Sections/InvestmentCalculator'
import { ServiceFAQ } from '../components/Sections/ServiceFAQ'
import { useReveal } from '../components/Hooks/useReveal'

export const AssistedMgmtPage = () => {
  const heroRef = useReveal<HTMLElement>()
  const stepsSectionRef = useReveal<HTMLElement>()
  const toolsSectionRef = useReveal<HTMLElement>()
  const advisorsSectionRef = useReveal<HTMLElement>()

  return (
    <div className="bg-[var(--pure-white)] text-[var(--night)]">
        {/* ─── 1. Hero — Editorial & Asymmetrical ─── */}
        <section ref={heroRef} className="reveal relative min-h-screen flex items-end pb-20 pt-40 border-b border-black/10">
          <div className="absolute top-0 right-0 w-full md:w-2/3 h-[70vh] z-0 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1600&q=80"
              alt="Conseiller financier"
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--pure-white)] via-[var(--pure-white)]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--pure-white)] via-transparent to-transparent" />
          </div>
          
          <div className="relative z-10 w-full px-6 md:px-12 mx-auto max-w-[1600px]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-end">
              <div className="md:col-span-8">
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-12 h-px bg-[var(--jaune-or)]" />
                  <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-[var(--jaune-or)]">
                    Services — Gestion assistée
                  </span>
                </div>
                <h1 className="font-display-aptos text-5xl md:text-7xl lg:text-[6.5rem] leading-[0.95] tracking-tight mb-8">
                  Décider avec un conseiller à vos côtés.
                </h1>
              </div>
              
              <div className="md:col-span-4 pb-4">
                <p className="text-lg md:text-xl leading-relaxed text-[rgba(10, 10, 10, 0.8)] font-light mb-10 border-l border-[var(--jaune-or)] pl-6">
                  Vous gardez la main sur les décisions, nous apportons analyses, recommandations et suivi pour investir sereinement.
                </p>
                <a href="#marche" className="btn-primary group inline-flex items-center justify-center gap-4 px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all mt-4 w-fit">
                  <span>Comment ça marche</span>
                  <FiArrowDown className="text-lg group-hover:translate-y-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. Comment ça marche (Processus) — Editorial List ─── */}
        <section id="marche" ref={stepsSectionRef} className="reveal py-24 md:py-40 border-b border-black/10">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              <div className="lg:col-span-5">
                <span className="text-[10px] font-bold tracking-[0.3em] text-[var(--jaune-or)] uppercase block mb-8">Processus</span>
                <h2 className="font-display-aptos text-4xl md:text-6xl leading-[1.05] mb-8">
                  Un cadre clair.
                </h2>
                <p className="text-lg text-[rgba(10, 10, 10, 0.8)] leading-relaxed font-light">
                  Un processus simple, pensé pour vous conseiller sans vous déposséder de la décision.
                </p>
              </div>
              
              <div className="lg:col-span-7">
                <div className="border-t border-black/10">
                  <div className="group py-10 border-b border-black/10 flex flex-col md:flex-row gap-6 md:gap-12">
                    <div className="font-display-aptos text-2xl text-[var(--jaune-or)]/50 shrink-0">01.</div>
                    <div>
                      <h3 className="font-display-aptos text-2xl md:text-3xl mb-4 group-hover:text-[var(--jaune-or)] transition-colors">
                        Diagnostic initial
                      </h3>
                      <p className="text-[rgba(10, 10, 10, 0.8)] leading-relaxed text-lg font-light max-w-xl">
                        Besoins, objectifs, contraintes et horizon clarifiés.
                      </p>
                    </div>
                  </div>
                  <div className="group py-10 border-b border-black/10 flex flex-col md:flex-row gap-6 md:gap-12">
                    <div className="font-display-aptos text-2xl text-[var(--jaune-or)]/50 shrink-0">02.</div>
                    <div>
                      <h3 className="font-display-aptos text-2xl md:text-3xl mb-4 group-hover:text-[var(--jaune-or)] transition-colors">
                        Recommandations
                      </h3>
                      <p className="text-[rgba(10, 10, 10, 0.8)] leading-relaxed text-lg font-light max-w-xl">
                        Listes d'actions ou obligations avec rationales et niveaux.
                      </p>
                    </div>
                  </div>
                  <div className="group py-10 border-b border-black/10 flex flex-col md:flex-row gap-6 md:gap-12">
                    <div className="font-display-aptos text-2xl text-[var(--jaune-or)]/50 shrink-0">03.</div>
                    <div>
                      <h3 className="font-display-aptos text-2xl md:text-3xl mb-4 group-hover:text-[var(--jaune-or)] transition-colors">
                        Décision & suivi
                      </h3>
                      <p className="text-[rgba(10, 10, 10, 0.8)] leading-relaxed text-lg font-light max-w-xl">
                        Vous validez, nous exécutons et assurons le reporting.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. Outils & Avantages — Dark Grid ─── */}
        <section ref={toolsSectionRef} className="reveal py-24 md:py-40 bg-[var(--night)] text-white">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              <div className="lg:col-span-4">
                <div className="sticky top-32">
                  <span className="text-[10px] font-bold tracking-[0.3em] text-[var(--jaune-or)] uppercase block mb-8">Valeur ajoutée</span>
                  <h2 className="font-display-aptos text-4xl md:text-6xl leading-[1.05] mb-8">
                    Le meilleur des deux mondes.
                  </h2>
                  <p className="text-white/60 leading-relaxed font-light text-lg">
                    Gardez le contrôle de vos décisions tout en bénéficiant de l'expertise d'un conseiller.
                  </p>
                </div>
              </div>
              
              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
                  <div className="relative">
                    <div className="w-8 h-px bg-[var(--jaune-or)] mb-8" />
                    <h3 className="font-display-aptos text-2xl md:text-3xl mb-4 text-white">
                      Analyses & alertes
                    </h3>
                    <p className="text-white/60 leading-relaxed font-light text-lg mb-4">
                      Notes régulières, signaux de marché et alertes personnalisées pour ne rien manquer.
                    </p>
                  </div>
                  <div className="relative">
                    <div className="w-8 h-px bg-[var(--jaune-or)] mb-8" />
                    <h3 className="font-display-aptos text-2xl md:text-3xl mb-4 text-white">
                      Échanges avec un conseiller
                    </h3>
                    <p className="text-white/60 leading-relaxed font-light text-lg mb-4">
                      Points de marché, simulations et idées d'allocation en direct.
                    </p>
                  </div>
                  <div className="relative">
                    <div className="w-8 h-px bg-[var(--jaune-or)] mb-8" />
                    <h3 className="font-display-aptos text-2xl md:text-3xl mb-4 text-white">
                      Décisions souveraines
                    </h3>
                    <p className="text-white/60 leading-relaxed font-light text-lg mb-4">
                      Vous validez chaque recommandation avant exécution.
                    </p>
                  </div>
                  <div className="relative">
                    <div className="w-8 h-px bg-[var(--jaune-or)] mb-8" />
                    <h3 className="font-display-aptos text-2xl md:text-3xl mb-4 text-white">
                      Expertise accessible
                    </h3>
                    <p className="text-white/60 leading-relaxed font-light text-lg mb-4">
                      Conseils d'experts sans frais de gestion élevés.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 4. Équipe — List Layout ─── */}
        <section ref={advisorsSectionRef} className="reveal py-24 md:py-40 bg-[var(--white-smoke)] border-b border-black/10">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              <div className="lg:col-span-5">
                <span className="text-[10px] font-bold tracking-[0.3em] text-[var(--jaune-or)] uppercase block mb-8">Équipe</span>
                <h2 className="font-display-aptos text-4xl md:text-6xl leading-[1.05] mb-8">
                  Rencontrez nos conseillers.
                </h2>
                <p className="text-lg text-[rgba(10, 10, 10, 0.8)] leading-relaxed font-light">
                  Des experts passionnés à votre service pour vous accompagner dans vos décisions d'investissement.
                </p>
              </div>
              <div className="lg:col-span-7">
                <ul className="border-t border-black/10">
                  <li className="py-10 border-b border-black/10">
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="w-16 h-16 bg-[var(--night)] text-white flex items-center justify-center font-display-aptos text-xl shrink-0">MD</div>
                      <div>
                        <div className="font-display-aptos text-2xl mb-1 text-[var(--night)]">Marie-Louise Diop</div>
                        <div className="text-[10px] font-bold tracking-[0.2em] text-[var(--jaune-or)] uppercase mb-4">Conseillère Senior • 12 ans d'expérience</div>
                        <p className="text-[rgba(10, 10, 10, 0.8)] font-light leading-relaxed mb-4">Spécialiste des stratégies d'investissement à long terme pour les particuliers.</p>
                        <div className="flex gap-2 text-xs">
                          <span className="border border-black/20 px-2 py-1">Actions BRVM</span>
                          <span className="border border-black/20 px-2 py-1">Retraite</span>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="py-10 border-b border-black/10">
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="w-16 h-16 bg-[var(--night)] text-white flex items-center justify-center font-display-aptos text-xl shrink-0">AF</div>
                      <div>
                        <div className="font-display-aptos text-2xl mb-1 text-[var(--night)]">Amadou Faye</div>
                        <div className="text-[10px] font-bold tracking-[0.2em] text-[var(--jaune-or)] uppercase mb-4">Conseiller Principal • 15 ans d'expérience</div>
                        <p className="text-[rgba(10, 10, 10, 0.8)] font-light leading-relaxed mb-4">Expert en analyse de marché et en construction de portefeuilles équilibrés.</p>
                        <div className="flex gap-2 text-xs">
                          <span className="border border-black/20 px-2 py-1">Analyse technique</span>
                          <span className="border border-black/20 px-2 py-1">Diversification</span>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Other Components (We'll wrap them in borders to fit the theme for now) ─── */}
        <div className="border-b border-black/10">
          <ServiceComparison currentService="assisted" />
        </div>

        <div className="border-b border-black/10">
          <TestimonialsCarousel service="assisted" />
        </div>

        <div className="border-b border-black/10">
          <PerformanceComparison />
        </div>

        <div className="border-b border-black/10">
          <InvestmentCalculator />
        </div>

        <div>
          <ServiceFAQ service="assisted" />
        </div>
    </div>
  )
}


