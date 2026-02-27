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
    <div className="bg-[var(--pure-white)] text-[var(--night)]">
        {/* ─── 1. Hero — Editorial & Asymmetrical ─── */}
        <section ref={heroRef} className="reveal relative min-h-screen flex items-end pb-20 pt-40 border-b border-black/10">
          <div className="absolute top-0 right-0 w-full md:w-2/3 h-[70vh] z-0 overflow-hidden">
            <img
              src="/value_props.jpg"
              alt="Everest Finance Bureau"
              className="w-full h-full object-cover opacity-60 contrast-125"
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
                    À propos
                  </span>
                </div>
                <h1 className="font-display-aptos text-5xl md:text-7xl lg:text-[6.5rem] leading-[0.95] tracking-tight mb-8">
                  Des idées et des valeurs au service de vos ambitions
                </h1>
              </div>
              
              <div className="md:col-span-4 pb-4">
                <p className="text-lg md:text-xl leading-relaxed text-[rgba(10, 10, 10, 0.8)] font-light mb-10 border-l border-[var(--jaune-or)] pl-6">
                  Société de Gestion et d'Intermédiation licenciée CREPMF. Nous allions discipline de marché, ingénierie financière et proximité client.
                </p>
                <a href="#mission" className="btn-primary group inline-flex items-center justify-center gap-4 px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all mt-4 w-fit">
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
                <span className="text-[10px] font-bold tracking-[0.3em] text-[var(--jaune-or)] uppercase block mb-8">Notre raison d'être</span>
                <h2 className="font-display-aptos text-4xl md:text-6xl leading-[1.05] mb-8">
                  Mission & Vision
                </h2>
              </div>
              
              <div className="lg:col-span-7">
                <div className="border-t border-black/10">
                  <div className="group py-10 border-b border-black/10">
                    <h3 className="font-display-aptos text-2xl md:text-3xl mb-4 group-hover:text-[var(--jaune-or)] transition-colors">
                      Notre mission
                    </h3>
                    <p className="text-[rgba(10, 10, 10, 0.8)] leading-relaxed text-lg font-light max-w-xl">
                      Proposer des solutions d'investissement performantes et responsables, fondées sur la transparence, l'expertise et la proximité.
                    </p>
                  </div>
                  <div className="group py-10 border-b border-black/10">
                    <h3 className="font-display-aptos text-2xl md:text-3xl mb-4 group-hover:text-[var(--jaune-or)] transition-colors">
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
        <section ref={philosophieRef} id="philosophie" className="reveal py-24 md:py-40 bg-[var(--night)] text-white">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              <div className="lg:col-span-4">
                <div className="sticky top-32">
                  <span className="text-[10px] font-bold tracking-[0.3em] text-[var(--jaune-or)] uppercase block mb-8">Philosophie</span>
                  <h2 className="font-display-aptos text-4xl md:text-6xl leading-[1.05]">
                    Notre approche d'investissement.
                  </h2>
                </div>
              </div>
              
              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
                  <div className="relative">
                    <div className="w-8 h-px bg-[var(--jaune-or)] mb-8" />
                    <h3 className="font-display-aptos text-2xl md:text-3xl mb-4 text-white">
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
                    <h3 className="font-display-aptos text-2xl md:text-3xl mb-4 text-white">
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
                  <div className="font-display-aptos text-6xl md:text-8xl tracking-tighter text-[var(--night)]">
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
                  <div className="font-display-aptos text-5xl md:text-6xl tracking-tighter text-[var(--night)]">
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
                  <div className="font-display-aptos text-5xl md:text-6xl tracking-tighter text-[var(--night)]">
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
            <span className="text-[10px] font-bold tracking-[0.3em] text-[var(--jaune-or)] uppercase block mb-8">Parcours</span>
            <h2 className="font-display-aptos text-4xl md:text-6xl leading-[1.05] max-w-3xl mb-20">
              Notre histoire
            </h2>

            <div className="border-t border-black/10">
              {timelineItems.map((item) => (
                <div key={item.year} className="group py-10 border-b border-black/10 flex flex-col md:flex-row gap-6 md:gap-12">
                  <div className="font-display-aptos text-2xl text-[var(--jaune-or)]/50 shrink-0">
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
                <span className="text-[10px] font-bold tracking-[0.3em] text-[var(--jaune-or)] uppercase block mb-8">Leadership</span>
                <h2 className="font-display-aptos text-4xl md:text-6xl leading-[1.05]">
                  Équipe dirigeante
                </h2>
              </div>
              <div className="lg:col-span-7">
                <ul className="border-t border-black/10">
                  <li className="py-8 border-b border-black/10">
                    <div className="font-display-aptos text-xl md:text-2xl mb-2">Direction Générale</div>
                    <p className="text-[rgba(10, 10, 10, 0.8)] font-light">Vision stratégique et développement commercial</p>
                  </li>
                  <li className="py-8 border-b border-black/10">
                    <div className="font-display-aptos text-xl md:text-2xl mb-2">Direction des Marchés</div>
                    <p className="text-[rgba(10, 10, 10, 0.8)] font-light">Recherche, analyse et exécution</p>
                  </li>
                  <li className="py-8 border-b border-black/10">
                    <div className="font-display-aptos text-xl md:text-2xl mb-2">Direction des Opérations</div>
                    <p className="text-[rgba(10, 10, 10, 0.8)] font-light">Conformité, risques et middle office</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 7. Conformité — Dark Section ─── */}
        <section ref={conformiteRef} id="conformite" className="reveal py-24 md:py-40 bg-[var(--night)] text-white">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              <div className="lg:col-span-4">
                <div className="sticky top-32">
                  <span className="text-[10px] font-bold tracking-[0.3em] text-[var(--jaune-or)] uppercase block mb-8">Réglementation</span>
                  <h2 className="font-display-aptos text-4xl md:text-6xl leading-[1.05]">
                    Conformité & Sécurité
                  </h2>
                </div>
              </div>
              
              <div className="lg:col-span-8">
                <div className="space-y-12">
                  <div>
                    <div className="w-8 h-px bg-[var(--jaune-or)] mb-8" />
                    <h3 className="font-display-aptos text-2xl md:text-3xl mb-6 text-white">
                      Cadre réglementaire
                    </h3>
                    <div className="space-y-4 text-white/60">
                      <div className="flex justify-between py-3 border-b border-white/10">
                        <span>Licence CREPMF</span>
                        <span className="font-display-aptos text-white">SGI/DA/2016/60</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-white/10">
                        <span>Date d'obtention</span>
                        <span className="font-display-aptos text-white">30 mars 2016</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-white/10">
                        <span>Juridiction</span>
                        <span className="font-display-aptos text-white">UEMOA</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="w-8 h-px bg-[var(--jaune-or)] mb-8" />
                    <h3 className="font-display-aptos text-2xl md:text-3xl mb-6 text-white">
                      Contrôles & Sécurité
                    </h3>
                    <ul className="space-y-4 text-white/60">
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


