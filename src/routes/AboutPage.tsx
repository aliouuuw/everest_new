import { FiArrowRight } from 'react-icons/fi'
import { useReveal } from '../components/Hooks/useReveal'

export const AboutPage = () => {
  const heroRef = useReveal<HTMLElement>()
  const missionRef = useReveal<HTMLElement>()
  const philosophieRef = useReveal<HTMLElement>()
  const metricsRef = useReveal<HTMLElement>()
  const histoireRef = useReveal<HTMLElement>()
  const equipeRef = useReveal<HTMLElement>()
  const conformiteRef = useReveal<HTMLElement>()

  const timelineItems = [
    { year: '2013', text: "Création d'Everest Finance SGI à Dakar." },
    { year: '2016', text: 'Licence CREPMF SGI/DA/2016/60 obtenue.' },
    { year: '2018', text: 'Premières opérations structurantes sur le marché primaire.' },
    { year: '2021', text: 'Plateforme client modernisée et renforcement de la recherche.' },
    { year: '2024', text: 'Consolidation du leadership régional sur la BRVM.' },
  ]

  return (
    <div className="bg-[var(--pure-white)] text-[var(--night)] font-primary">
        {/* ─── 1. Hero — Dark Image with Overlay ─── */}
        <section ref={heroRef} className="relative min-h-[55vh] flex items-end pb-16 pt-24 overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/Assets_Website/À-propos.png"
              alt="Everest Finance Bureau"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 w-full px-6 md:px-12 mx-auto max-w-[1600px]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-end">
              <div className="md:col-span-7">
                <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--jaune-or)]/15 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-[var(--jaune-or)] mb-6">
                  À propos
                </span>
                <h1 className="font-primary font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-5 text-white">
                  Des idées et des valeurs au service de vos{' '}
                  <span style={{ color: 'var(--jaune-or)' }}>ambitions.</span>
                </h1>
              </div>

              <div className="md:col-span-5 pb-2">
                <p className="text-base md:text-lg leading-relaxed text-white/65 font-light mb-8">
                  Société de Gestion et d'Intermédiation agréée CREPMF. < br/> Nous allions discipline de marché, ingénierie financière et proximité client.
                </p>
                <a
                  href="#mission"
                  className="group inline-flex items-center justify-center gap-3 px-7 py-3 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:opacity-90"
                  style={{ background: 'var(--jaune-or)', color: 'var(--pure-white)' }}
                >
                  <span>Notre mission</span>
                  <FiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. Mission & Vision — Editorial List ─── */}
        <section ref={missionRef} id="mission" className="reveal py-24 md:py-40 border-b border-black/10">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              <div className="lg:col-span-5">
                <span className="px-4 py-1.5 rounded-full bg-[var(--mauve-10)] text-[10px] font-bold tracking-[0.3em] text-[var(--mauve)] uppercase inline-block mb-8">Notre raison d'être</span>
                <h2 className="font-primary font-bold text-4xl md:text-6xl leading-[1.05] mb-8 text-[var(--mauve)]">
                  Mission & Vision
                </h2>
              </div>
              
              <div className="lg:col-span-7">
                <div className="border-t border-black/10">
                  <div className="group py-10 border-b border-black/10">
                    <h3 className="font-primary font-bold text-2xl md:text-3xl mb-4 group-hover:text-[var(--mauve)] transition-colors text-[var(--mauve)]">
                      Notre mission
                    </h3>
                    <p className="text-[rgba(10, 10, 10, 0.8)] leading-relaxed text-lg font-light max-w-xl">
                      Proposer des solutions d'investissement performantes et responsables, fondées sur la transparence, l'expertise et la proximité.
                    </p>
                  </div>
                  <div className="group py-10 border-b border-black/10">
                    <h3 className="font-primary font-bold text-2xl md:text-3xl mb-4 group-hover:text-[var(--mauve)] transition-colors text-[var(--mauve)]">
                      Notre vision
                    </h3>
                    <p className="text-[rgba(10, 10, 10, 0.8)] leading-relaxed text-lg font-light max-w-xl">
                      Devenir un partenaire de référence en Afrique de l'Ouest pour la gestion de patrimoine et l'accès aux marchés financiers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. Philosophie — Stark Grid ─── */}
        <section ref={philosophieRef} id="philosophie" className="reveal py-24 md:py-40 section-bg-mauve">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              <div className="lg:col-span-4">
                <div className="sticky top-32">
                  <span className="px-4 py-1.5 rounded-full bg-[var(--jaune-or)]/15 text-[10px] font-bold tracking-[0.3em] text-[var(--jaune-or)] uppercase inline-block mb-8">Philosophie</span>
                  <h2 className="font-primary font-bold text-4xl md:text-6xl leading-[1.05] text-white">
                    Notre approche d'investissement.
                  </h2>
                </div>
              </div>
              
              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
                  <div className="relative">
                    <div className="w-8 h-px bg-[var(--jaune-or)] mb-8" />
                    <h3 className="font-primary font-bold text-2xl md:text-3xl mb-4 text-white">
                      Approche disciplinée
                    </h3>
                    <p className="text-white/60 leading-relaxed font-light text-lg mb-4">
                      Processus d'analyse rigoureux combinant analyse fondamentale et technique.
                    </p>
                    <ul className="text-white/50 text-sm space-y-2">
                      <li>• Due diligence approfondie</li>
                      <li>• Évaluation sectorielle</li>
                      <li>• Analyse de marché</li>
                    </ul>
                  </div>
                  <div className="relative">
                    <div className="w-8 h-px bg-[var(--jaune-or)] mb-8" />
                    <h3 className="font-primary font-bold text-2xl md:text-3xl mb-4 text-white">
                      Gestion du risque
                    </h3>
                    <p className="text-white/60 leading-relaxed font-light text-lg mb-4">
                      Framework adapté aux spécificités du marché UEMOA.
                    </p>
                    <ul className="text-white/50 text-sm space-y-2">
                      <li>• Diversification sectorielle</li>
                      <li>• Limites de concentration</li>
                      <li>• Stress tests réguliers</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 4. Metrics — Stark & Engineered ─── */}
        <section ref={metricsRef} className="reveal border-b border-black/10">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="py-16 md:py-24 border-b md:border-b-0 md:border-r border-black/10 md:pr-16">
                <div className="flex items-baseline gap-2 mb-4">
                  <div className="font-primary font-bold text-6xl md:text-8xl tracking-tighter text-[var(--mauve)]">
                    11
                  </div>
                  <div className="text-sm font-bold tracking-[0.2em] text-[var(--jaune-or)] uppercase">ans</div>
                </div>
                <div className="text-[11px] font-bold tracking-[0.2em] text-[rgba(10, 10, 10, 0.8)] uppercase">
                  D'existence
                </div>
              </div>
              <div className="py-16 md:py-24 border-b md:border-b-0 md:border-r border-black/10 md:px-16">
                <div className="flex items-baseline gap-2 mb-4">
                  <div className="font-primary font-bold text-5xl md:text-6xl tracking-tighter text-[var(--mauve)]">
                    500
                  </div>
                  <div className="text-sm font-bold tracking-[0.2em] text-[var(--jaune-or)] uppercase">Mds</div>
                </div>
                <div className="text-[11px] font-bold tracking-[0.2em] text-[rgba(10, 10, 10, 0.8)] uppercase">
                  Levée de fonds
                </div>
              </div>
              <div className="py-16 md:py-24 md:pl-16">
                <div className="flex items-baseline gap-2 mb-4">
                  <div className="font-primary font-bold text-5xl md:text-6xl tracking-tighter text-[var(--mauve)]">
                    200
                  </div>
                  <div className="text-sm font-bold tracking-[0.2em] text-[var(--jaune-or)] uppercase">Mds</div>
                </div>
                <div className="text-[11px] font-bold tracking-[0.2em] text-[rgba(10, 10, 10, 0.8)] uppercase">
                  Transactions marché
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 5. Histoire — Timeline ─── */}
        <section ref={histoireRef} id="histoire" className="reveal py-24 md:py-40 border-b border-black/10">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12">
            <span className="px-4 py-1.5 rounded-full bg-[var(--mauve-10)] text-[10px] font-bold tracking-[0.3em] text-[var(--mauve)] uppercase inline-block mb-8">Parcours</span>
            <h2 className="font-primary font-bold text-4xl md:text-6xl leading-[1.05] max-w-3xl mb-20 text-[var(--mauve)]">
              Notre histoire
            </h2>

            <div className="border-t border-black/10">
              {timelineItems.map((item) => (
                <div key={item.year} className="group py-10 border-b border-black/10 flex flex-col md:flex-row gap-6 md:gap-12">
                  <div className="font-primary font-bold text-2xl text-[var(--mauve)]/50 shrink-0">
                    {item.year}
                  </div>
                  <p className="text-[rgba(10, 10, 10, 0.8)] leading-relaxed text-lg font-light max-w-2xl group-hover:text-[var(--night)] transition-colors">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 6. Équipe — Minimalist Grid ─── */}
        <section ref={equipeRef} id="equipe" className="reveal py-24 md:py-40">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              <div className="lg:col-span-5">
                <span className="px-4 py-1.5 rounded-full bg-[var(--mauve-10)] text-[10px] font-bold tracking-[0.3em] text-[var(--mauve)] uppercase inline-block mb-8">Leadership</span>
                <h2 className="font-primary font-bold text-4xl md:text-6xl leading-[1.05] text-[var(--mauve)]">
                  Équipe dirigeante
                </h2>
              </div>
              <div className="lg:col-span-7">
                <ul className="border-t border-black/10">
                  <li className="py-8 border-b border-black/10">
                    <div className="font-primary font-bold text-xl md:text-2xl mb-2">Direction Générale</div>
                    <p className="text-[rgba(10, 10, 10, 0.8)] font-light">Vision stratégique et développement commercial</p>
                  </li>
                  <li className="py-8 border-b border-black/10">
                    <div className="font-primary font-bold text-xl md:text-2xl mb-2">Direction des Marchés</div>
                    <p className="text-[rgba(10, 10, 10, 0.8)] font-light">Recherche, analyse et exécution</p>
                  </li>
                  <li className="py-8 border-b border-black/10">
                    <div className="font-primary font-bold text-xl md:text-2xl mb-2">Direction des Opérations</div>
                    <p className="text-[rgba(10, 10, 10, 0.8)] font-light">Conformité, risques et middle office</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 7. Conformité — Light Section with Soft Orbs ─── */}
        <section ref={conformiteRef} id="conformite" className="reveal relative py-24 md:py-40 overflow-hidden" style={{ background: 'var(--summit-ivory)' }}>
          {/* Soft mauve orb — top right */}
          <div
            className="absolute top-0 right-0 w-[50%] h-[80%] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at top right, rgba(70,29,76,0.07) 0%, rgba(203,152,36,0.03) 45%, transparent 65%)' }}
          />
          {/* Soft gold orb — bottom left */}
          <div
            className="absolute bottom-0 left-0 w-[45%] h-[75%] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at bottom left, rgba(203,152,36,0.08) 0%, rgba(70,29,76,0.04) 50%, transparent 70%)' }}
          />

          <div className="mx-auto max-w-[1600px] px-6 md:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              <div className="lg:col-span-4">
                <div className="sticky top-32">
                  <span className="px-4 py-1.5 rounded-full bg-[var(--mauve-10)] text-[10px] font-bold tracking-[0.3em] text-[var(--mauve)] uppercase inline-block mb-8">Réglementation</span>
                  <h2 className="font-primary font-bold text-4xl md:text-6xl leading-[1.05] text-[var(--mauve)]">
                    Conformité & Sécurité
                  </h2>
                </div>
              </div>
              
              <div className="lg:col-span-8">
                <div className="space-y-12">
                  <div>
                    <div className="w-8 h-px bg-[var(--jaune-or)] mb-8" />
                    <h3 className="font-primary font-bold text-2xl md:text-3xl mb-6 text-[var(--mauve)]">
                      Cadre réglementaire
                    </h3>
                    <div className="space-y-4 text-[rgba(10, 10, 10, 0.6)]">
                      <div className="flex justify-between py-3 border-b border-black/10">
                        <span>Licence CREPMF</span>
                        <span className="font-primary font-bold text-[var(--mauve)]">SGI/DA/2016/60</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-black/10">
                        <span>Date d'obtention</span>
                        <span className="font-primary font-bold text-[var(--mauve)]">30 mars 2016</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-black/10">
                        <span>Juridiction</span>
                        <span className="font-primary font-bold text-[var(--mauve)]">UEMOA</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="w-8 h-px bg-[var(--jaune-or)] mb-8" />
                    <h3 className="font-primary font-bold text-2xl md:text-3xl mb-6 text-[var(--mauve)]">
                      Contrôles & Sécurité
                    </h3>
                    <ul className="space-y-4 text-[rgba(10, 10, 10, 0.6)]">
                      <li className="flex items-start gap-4">
                        <FiArrowRight className="text-[var(--jaune-or)] mt-1 shrink-0" />
                        <span>Ségrégation des actifs — Comptes dédiés et dépositaire central BRVM</span>
                      </li>
                      <li className="flex items-start gap-4">
                        <FiArrowRight className="text-[var(--jaune-or)] mt-1 shrink-0" />
                        <span>KYC/AML renforcé — Procédures conformes CENTIF</span>
                      </li>
                      <li className="flex items-start gap-4">
                        <FiArrowRight className="text-[var(--jaune-or)] mt-1 shrink-0" />
                        <span>Reporting réglementaire — Déclarations CREPMF et BCEAO</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}


