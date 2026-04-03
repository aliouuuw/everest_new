import { FiArrowDown } from 'react-icons/fi'
import { ServiceComparison } from '../components/Sections/ServiceComparison'
import { TestimonialsCarousel } from '../components/Sections/TestimonialsCarousel'
import { PerformanceComparison } from '../components/Sections/PerformanceComparison'
import { InvestmentCalculator } from '../components/Sections/InvestmentCalculator'
import { ServiceFAQ } from '../components/Sections/ServiceFAQ'
import { useReveal } from '../components/Hooks/useReveal'

export const DiscretionaryMgmtPage = () => {
  const heroRef = useReveal<HTMLElement>()
  const approachSectionRef = useReveal<HTMLElement>()
  const packsSectionRef = useReveal<HTMLElement>()
  const advantagesSectionRef = useReveal<HTMLElement>()
  const processSectionRef = useReveal<HTMLElement>()

  return (
    <div className="bg-[var(--pure-white)] text-[var(--night)] font-primary">
        {/* ─── 1. Hero — Editorial & Asymmetrical ─── */}
        <section ref={heroRef} className="reveal relative min-h-screen flex items-end pb-20 pt-40 border-b border-black/10 section-bg-mauve">
          <div className="absolute top-0 right-0 w-full md:w-2/3 h-[70vh] z-0 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&w=1600&q=80"
              alt="Gestion d'investissement"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0" style={{ background: 'var(--gradient-image-overlay-heavy)' }} />
          </div>
          
          <div className="relative z-10 w-full px-6 md:px-12 mx-auto max-w-[1600px]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-end">
              <div className="md:col-span-8">
                <div className="flex items-center gap-4 mb-12">
                  <span className="px-4 py-1.5 rounded-full bg-[var(--jaune-or)]/15 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-[var(--jaune-or)]">
                    Services — Gestion sous mandat
                  </span>
                </div>
                <h1 className="font-primary font-bold text-5xl md:text-7xl lg:text-[6.5rem] leading-[0.95] tracking-tight mb-8 text-[var(--pure-white)]">
                  Pilotez vos investissements en toute simplicité.
                </h1>
              </div>
              
              <div className="md:col-span-4 pb-4">
                <p className="text-lg md:text-xl leading-relaxed text-white/70 font-light mb-10 border-l-2 border-[var(--jaune-or)] pl-6">
                  Vous décidez de l'orientation et des limites. Nous exécutons avec rigueur sur la BRVM, dans un cadre clair et transparent.
                </p>
                <a href="#packs" className="btn-primary-dark group inline-flex items-center justify-center gap-4 px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all mt-4 w-fit">
                  <span>Découvrir les packs</span>
                  <FiArrowDown className="text-lg group-hover:translate-y-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. Approche & Univers — Editorial Grid ─── */}
        <section ref={approachSectionRef} className="reveal py-24 md:py-40 border-b border-black/10">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              <div className="lg:col-span-5">
                <span className="px-4 py-1.5 rounded-full bg-[var(--mauve-10)] text-[10px] font-bold tracking-[0.3em] text-[var(--mauve)] uppercase inline-block mb-8">Cadre</span>
                <h2 className="font-primary font-bold text-4xl md:text-6xl leading-[1.05] mb-8 text-[var(--mauve)]">
                  Approche et univers d'investissement.
                </h2>
                <p className="text-lg text-[rgba(10, 10, 10, 0.8)] leading-relaxed font-light">
                  Un cadre simple, des règles explicites, et un univers BRVM adapté à vos objectifs.
                </p>
              </div>
              
              <div className="lg:col-span-7">
                <div className="border-t border-black/10">
                  <div className="group py-10 border-b border-black/10">
                    <h3 className="font-primary font-bold text-2xl md:text-3xl mb-4 text-[var(--night)]">
                      Approche
                    </h3>
                    <p className="text-[rgba(10, 10, 10, 0.8)] leading-relaxed text-lg font-light mb-4">
                      Vous fixez les objectifs, contraintes et limites; nous assurons l'exécution et le suivi.
                    </p>
                    <ul className="text-[rgba(10,10,10,0.6)] space-y-2 text-sm">
                      <li>• Profil de risque défini dès l'ouverture</li>
                      <li>• Règles d'allocation simples et traçables</li>
                      <li>• Reporting périodique clair</li>
                    </ul>
                  </div>
                  <div className="group py-10 border-b border-black/10">
                    <h3 className="font-primary font-bold text-2xl md:text-3xl mb-4 text-[var(--night)]">
                      Univers d'investissement
                    </h3>
                    <p className="text-[rgba(10, 10, 10, 0.8)] leading-relaxed text-lg font-light mb-4">
                      Titres cotés BRVM et opérations primaires, avec filtres de qualité et liquidité.
                    </p>
                    <ul className="text-[rgba(10,10,10,0.6)] space-y-2 text-sm">
                      <li>• Actions principales de la cote</li>
                      <li>• Obligations souveraines et corporates</li>
                      <li>• Participations primaires éligibles</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. Packs — Stark Dark Table/Grid ─── */}
        <section id="packs" ref={packsSectionRef} className="reveal py-24 md:py-40 section-bg-mauve">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              <div className="lg:col-span-4">
                <div className="sticky top-32">
                  <span className="px-4 py-1.5 rounded-full bg-[var(--jaune-or)]/15 text-[10px] font-bold tracking-[0.3em] text-[var(--jaune-or)] uppercase inline-block mb-8">Packs</span>
                  <h2 className="font-primary font-bold text-4xl md:text-6xl leading-[1.05] mb-8 text-white">
                    Le niveau d'accompagnement.
                  </h2>
                  <p className="text-white/60 leading-relaxed font-light text-lg">
                    Frais transparents et outils adaptés à votre autonomie.
                  </p>
                </div>
              </div>
              
              <div className="lg:col-span-8">
                <div className="border-t border-white/10">
                  <div className="py-8 border-b border-white/10 flex flex-col md:flex-row gap-8 justify-between md:items-center group">
                    <div className="flex-1">
                      <h3 className="font-primary font-bold text-2xl md:text-3xl text-white mb-2">Essentiel</h3>
                      <p className="text-white/60 font-light">Exécution simple • Appli web</p>
                    </div>
                    <div className="flex-1 flex gap-8">
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1 font-bold">Frais dès</div>
                        <div className="font-primary font-bold text-xl text-white">0,60%</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1 font-bold">Minimum</div>
                        <div className="font-primary font-bold text-xl text-white">100 000 F CFA</div>
                      </div>
                    </div>
                  </div>

                  <div className="py-8 border-b border-white/10 flex flex-col md:flex-row gap-8 justify-between md:items-center group">
                    <div className="flex-1">
                      <h3 className="font-primary font-bold text-2xl md:text-3xl text-white mb-2">Confort</h3>
                      <p className="text-white/60 font-light">Support prioritaire • Appli web + alertes</p>
                    </div>
                    <div className="flex-1 flex gap-8">
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1 font-bold">Frais dès</div>
                        <div className="font-primary font-bold text-xl text-[var(--jaune-or)]">0,50%</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1 font-bold">Minimum</div>
                        <div className="font-primary font-bold text-xl text-[var(--jaune-or)]">250 000 F CFA</div>
                      </div>
                    </div>
                  </div>

                  <div className="py-8 border-b border-white/10 flex flex-col md:flex-row gap-8 justify-between md:items-center group">
                    <div className="flex-1">
                      <h3 className="font-primary font-bold text-2xl md:text-3xl text-white mb-2">Expert</h3>
                      <p className="text-white/60 font-light">Desk dédié • Outils avancés + flux</p>
                    </div>
                    <div className="flex-1 flex gap-8">
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1 font-bold">Frais dès</div>
                        <div className="font-primary font-bold text-xl text-white">0,40%</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1 font-bold">Minimum</div>
                        <div className="font-primary font-bold text-xl text-white">1 000 000 F CFA</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 4. Avantages — Stark List ─── */}
        <section ref={advantagesSectionRef} className="reveal py-24 md:py-40 border-b border-black/10">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              <div className="lg:col-span-5">
                <span className="px-4 py-1.5 rounded-full bg-[var(--mauve-10)] text-[10px] font-bold tracking-[0.3em] text-[var(--mauve)] uppercase inline-block mb-8">Avantages</span>
                <h2 className="font-primary font-bold text-4xl md:text-6xl leading-[1.05] mb-8 text-[var(--mauve)]">
                  Pourquoi choisir ce mandat ?
                </h2>
                <p className="text-lg text-[rgba(10, 10, 10, 0.8)] leading-relaxed font-light">
                  Une approche qui allie autonomie et expertise professionnelle.
                </p>
              </div>
              <div className="lg:col-span-7">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 border-t border-black/10 pt-10">
                  <div className="relative">
                    <div className="w-8 h-px bg-[var(--mauve)] mb-6" />
                    <h3 className="font-primary font-bold text-2xl mb-2 text-[var(--night)]">Contrôle total</h3>
                    <p className="text-[rgba(10, 10, 10, 0.8)] leading-relaxed font-light">Vous prenez toutes les décisions d'investissement selon vos critères.</p>
                  </div>
                  <div className="relative">
                    <div className="w-8 h-px bg-[var(--mauve)] mb-6" />
                    <h3 className="font-primary font-bold text-2xl mb-2 text-[var(--night)]">Réactivité</h3>
                    <p className="text-[rgba(10, 10, 10, 0.8)] leading-relaxed font-light">Exécution rapide de vos ordres sur la BRVM.</p>
                  </div>
                  <div className="relative">
                    <div className="w-8 h-px bg-[var(--mauve)] mb-6" />
                    <h3 className="font-primary font-bold text-2xl mb-2 text-[var(--night)]">Transparence</h3>
                    <p className="text-[rgba(10, 10, 10, 0.8)] leading-relaxed font-light">Frais clairs et reporting régulier de vos opérations.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 5. Processus — Engineered Sequence ─── */}
        <section ref={processSectionRef} className="reveal py-24 md:py-40 bg-[var(--white-smoke)] border-b border-black/10">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12">
            <div className="mb-20">
              <span className="px-4 py-1.5 rounded-full bg-[var(--mauve-10)] text-[10px] font-bold tracking-[0.3em] text-[var(--mauve)] uppercase inline-block mb-8">Processus</span>
              <h2 className="font-primary font-bold text-4xl md:text-6xl leading-[1.05] max-w-3xl text-[var(--mauve)]">
                Comment ça fonctionne.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              <div className="relative border-t border-[var(--mauve)] pt-8">
                <div className="font-primary font-bold text-4xl text-[var(--mauve)] mb-6">01.</div>
                <h3 className="font-primary font-bold text-xl mb-4 text-[var(--night)]">Ouverture compte</h3>
                <p className="text-[rgba(10, 10, 10, 0.8)] font-light leading-relaxed">Remplissez le formulaire en ligne et signez électroniquement.</p>
              </div>
              <div className="relative border-t border-[var(--mauve)] pt-8">
                <div className="font-primary font-bold text-4xl text-[var(--mauve)] mb-6">02.</div>
                <h3 className="font-primary font-bold text-xl mb-4 text-[var(--night)]">Définition profil</h3>
                <p className="text-[rgba(10, 10, 10, 0.8)] font-light leading-relaxed">Établissez vos objectifs, contraintes et niveau de risque.</p>
              </div>
              <div className="relative border-t border-[var(--mauve)] pt-8">
                <div className="font-primary font-bold text-4xl text-[var(--mauve)] mb-6">03.</div>
                <h3 className="font-primary font-bold text-xl mb-4 text-[var(--night)]">Premier dépôt</h3>
                <p className="text-[rgba(10, 10, 10, 0.8)] font-light leading-relaxed">Effectuez votre premier versement selon vos moyens.</p>
              </div>
              <div className="relative border-t border-[var(--mauve)] pt-8">
                <div className="font-primary font-bold text-4xl text-[var(--mauve)] mb-6">04.</div>
                <h3 className="font-primary font-bold text-xl mb-4 text-[var(--night)]">Prise de contrôle</h3>
                <p className="text-[rgba(10, 10, 10, 0.8)] font-light leading-relaxed">Commencez à passer vos ordres via notre plateforme.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Other Components ─── */}
        <div className="border-b border-black/10">
          <ServiceComparison currentService="discretionary" />
        </div>

        <div className="border-b border-black/10">
          <TestimonialsCarousel service="discretionary" />
        </div>

        <div className="border-b border-black/10">
          <PerformanceComparison />
        </div>

        <div className="border-b border-black/10">
          <InvestmentCalculator />
        </div>

        <div>
          <ServiceFAQ service="discretionary" />
        </div>
    </div>
  )
}


