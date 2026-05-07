import { FiArrowRight } from 'react-icons/fi'
import { useReveal } from '../components/Hooks/useReveal'
import { EditableImage, EditableText } from '../cms'

/** Matches Outils / Expertises / Contact section hero typography (max 50px). */
const sectionTitleStyle = { fontSize: 'clamp(2.375rem, 4.6vw + 1.2rem, 50px)' } as const

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
    { year: '2016', text: 'Licence AMF-UMOA SGI/DA/2016/60 obtenue.' },
    { year: '2018', text: 'Premières opérations structurantes sur le marché primaire.' },
    { year: '2021', text: 'Plateforme client modernisée et renforcement de la recherche.' },
    { year: '2024', text: 'Consolidation du leadership régional sur la BRVM.' },
  ]

  return (
    <div className="bg-[var(--pure-white)] text-[var(--night)] font-primary">
        {/* ─── 1. Hero — Dark Image with Overlay ─── */}
        <section ref={heroRef} className="relative min-h-[46vh] md:min-h-[48vh] flex items-end pb-10 pt-16 md:pb-12 md:pt-20 overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <EditableImage
              id="about.hero.background"
              src="/Assets_Website/À-propos.png"
              alt="Everest Finance Bureau"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 w-full page-container">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 items-end">
              <div className="md:col-span-7">
                <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--jaune-or)]/15 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-[var(--jaune-or)] mb-3">
                  <EditableText id="about.hero.badge">À propos</EditableText>
                </span>
                <h1
                  className="font-primary font-bold leading-[0.95] tracking-tight mb-3 text-white"
                  style={sectionTitleStyle}
                >
                  <EditableText id="about.hero.title">Des idées et des valeurs au service de vos ambitions.</EditableText>
                </h1>
              </div>

              <div className="md:col-span-5 pb-2">
                <p className="text-base md:text-lg leading-relaxed text-white/65 font-light mb-5">
                  <EditableText id="about.hero.subtitle">Société de Gestion et d'Intermédiation agréée AMF-UMOA. Nous allions discipline de marché, ingénierie financière et proximité client.</EditableText>
                </p>
                <a
                  href="#gouvernance"
                  className="group inline-flex items-center justify-center gap-3 px-7 py-3 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:opacity-90"
                  style={{ background: 'var(--jaune-or)', color: 'var(--pure-white)' }}
                >
                  <span><EditableText id="about.hero.ctaLabel">Notre mission</EditableText></span>
                  <FiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. Mission & Vision — Editorial List ─── */}
        <section ref={missionRef} id="gouvernance" className="reveal py-12 md:py-20 border-b border-black/10">
          <div className="page-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-5">
                <span className="px-4 py-1.5 rounded-full bg-[var(--mauve-10)] text-[10px] font-bold tracking-[0.3em] text-[var(--mauve)] uppercase inline-block mb-4"><EditableText id="about.mission.badge">Notre raison d'être</EditableText></span>
                <h2
                  className="font-primary font-bold leading-[0.95] tracking-tight mb-0 text-[var(--mauve)]"
                  style={sectionTitleStyle}
                >
                  <EditableText id="about.mission.sectionTitle">Mission & Vision</EditableText>
                </h2>
              </div>
              
              <div className="lg:col-span-7">
                <div className="border-t border-black/10">
                  <div className="group py-5 md:py-6 border-b border-black/10">
                    <h3 className="font-primary font-bold text-2xl md:text-3xl mb-3 group-hover:text-[var(--mauve)] transition-colors text-[var(--mauve)]">
                      <EditableText id="about.mission.missionTitle">Notre mission</EditableText>
                    </h3>
                    <p className="text-[rgba(10, 10, 10, 0.8)] leading-relaxed text-lg font-light max-w-xl">
                      <EditableText id="about.mission.missionBody">Proposer des solutions d'investissement performantes et responsables, fondées sur la transparence, l'expertise et la proximité.</EditableText>
                    </p>
                  </div>
                  <div className="group py-5 md:py-6 border-b border-black/10">
                    <h3 className="font-primary font-bold text-2xl md:text-3xl mb-3 group-hover:text-[var(--mauve)] transition-colors text-[var(--mauve)]">
                      <EditableText id="about.mission.visionTitle">Notre vision</EditableText>
                    </h3>
                    <p className="text-[rgba(10, 10, 10, 0.8)] leading-relaxed text-lg font-light max-w-xl">
                      <EditableText id="about.mission.visionBody">Devenir un partenaire de référence en Afrique de l'Ouest pour la gestion de patrimoine et l'accès aux marchés financiers.</EditableText>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. Philosophie — Stark Grid ─── */}
        <section ref={philosophieRef} id="philosophie" className="reveal py-12 md:py-20 section-bg-light">
          <div className="page-container relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-4">
                <div className="sticky top-28 md:top-32">
                  <span className="px-4 py-1.5 rounded-full bg-[var(--jaune-or)]/15 text-[10px] font-bold tracking-[0.3em] text-[var(--jaune-or)] uppercase inline-block mb-4"><EditableText id="about.philosophie.badge">Philosophie</EditableText></span>
                  <h2
                    className="font-primary font-bold leading-[0.95] tracking-tight text-white"
                    style={sectionTitleStyle}
                  >
                    <EditableText id="about.philosophie.title">Notre approche d'investissement.</EditableText>
                  </h2>
                </div>
              </div>
              
              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 md:gap-x-8 gap-y-8 md:gap-y-10">
                  <div className="relative">
                    <div className="w-8 h-px bg-[var(--jaune-or)] mb-5" />
                    <h3 className="font-primary font-bold text-2xl md:text-3xl mb-3 text-white">
                      Approche disciplinée
                    </h3>
                    <p className="text-white/60 leading-relaxed font-light text-lg mb-3">
                      Processus d'analyse rigoureux combinant analyse fondamentale et technique.
                    </p>
                    <ul className="text-white/50 text-sm space-y-2">
                      <li>• Due diligence approfondie</li>
                      <li>• Évaluation sectorielle</li>
                      <li>• Analyse de marché</li>
                    </ul>
                  </div>
                  <div className="relative">
                    <div className="w-8 h-px bg-[var(--jaune-or)] mb-5" />
                    <h3 className="font-primary font-bold text-2xl md:text-3xl mb-3 text-white">
                      Gestion du risque
                    </h3>
                    <p className="text-white/60 leading-relaxed font-light text-lg mb-3">
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
          <div className="page-container">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="py-10 md:py-12 border-b md:border-b-0 md:border-r border-black/10 md:pr-10 lg:pr-12">
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
              <div className="py-10 md:py-12 border-b md:border-b-0 md:border-r border-black/10 md:px-10 lg:px-12">
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
              <div className="py-10 md:py-12 md:pl-10 lg:pl-12">
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
        <section ref={histoireRef} id="histoire" className="reveal py-12 md:py-20 border-b border-black/10">
          <div className="page-container">
            <span className="px-4 py-1.5 rounded-full bg-[var(--mauve-10)] text-[10px] font-bold tracking-[0.3em] text-[var(--mauve)] uppercase inline-block mb-4"><EditableText id="about.histoire.badge">Parcours</EditableText></span>
            <h2
              className="font-primary font-bold leading-[0.95] tracking-tight max-w-3xl mb-7 md:mb-8 text-[var(--mauve)]"
              style={sectionTitleStyle}
            >
              <EditableText id="about.histoire.title">Notre histoire</EditableText>
            </h2>

            <div className="border-t border-black/10">
              {timelineItems.map((item) => (
                <div key={item.year} className="group py-5 md:py-6 border-b border-black/10 flex flex-col md:flex-row gap-3 md:gap-8">
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
        <section ref={equipeRef} id="equipe" className="reveal py-12 md:py-20">
          <div className="page-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-5">
                <span className="px-4 py-1.5 rounded-full bg-[var(--mauve-10)] text-[10px] font-bold tracking-[0.3em] text-[var(--mauve)] uppercase inline-block mb-4"><EditableText id="about.equipe.badge">Leadership</EditableText></span>
                <h2
                  className="font-primary font-bold leading-[0.95] tracking-tight text-[var(--mauve)]"
                  style={sectionTitleStyle}
                >
                  <EditableText id="about.equipe.title">Équipe dirigeante</EditableText>
                </h2>
              </div>
              <div className="lg:col-span-7">
                <ul className="border-t border-black/10">
                  <li className="py-5 md:py-6 border-b border-black/10">
                    <div className="font-primary font-bold text-xl md:text-2xl mb-2">Direction Générale</div>
                    <p className="text-[rgba(10, 10, 10, 0.8)] font-light">Vision stratégique et développement commercial</p>
                  </li>
                  <li className="py-5 md:py-6 border-b border-black/10">
                    <div className="font-primary font-bold text-xl md:text-2xl mb-2">Direction des Marchés</div>
                    <p className="text-[rgba(10, 10, 10, 0.8)] font-light">Recherche, analyse et exécution</p>
                  </li>
                  <li className="py-5 md:py-6 border-b border-black/10">
                    <div className="font-primary font-bold text-xl md:text-2xl mb-2">Direction des Opérations</div>
                    <p className="text-[rgba(10, 10, 10, 0.8)] font-light">Conformité, risques et middle office</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 7. Conformité — Light Section with Soft Orbs ─── */}
        <section ref={conformiteRef} id="conformite" className="reveal relative py-12 md:py-20 overflow-hidden" style={{ background: 'var(--summit-ivory)' }}>
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

          <div className="page-container relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-4">
                <div className="sticky top-28 md:top-32">
                  <span className="px-4 py-1.5 rounded-full bg-[var(--mauve-10)] text-[10px] font-bold tracking-[0.3em] text-[var(--mauve)] uppercase inline-block mb-4"><EditableText id="about.conformite.badge">Réglementation</EditableText></span>
                  <h2
                    className="font-primary font-bold leading-[0.95] tracking-tight text-[var(--mauve)]"
                    style={sectionTitleStyle}
                  >
                    <EditableText id="about.conformite.title">Conformité & Sécurité</EditableText>
                  </h2>
                </div>
              </div>
              
              <div className="lg:col-span-8">
                <div className="space-y-6 md:space-y-8">
                  <div>
                    <div className="w-8 h-px bg-[var(--jaune-or)] mb-4 md:mb-5" />
                    <h3 className="font-primary font-bold text-2xl md:text-3xl mb-4 text-[var(--mauve)]">
                      Cadre réglementaire
                    </h3>
                    <div className="space-y-2 text-[rgba(10, 10, 10, 0.6)]">
                      <div className="flex justify-between py-2.5 border-b border-black/10">
                        <span>Licence AMF-UMOA</span>
                        <span className="font-primary font-bold text-[var(--mauve)]">SGI/DA/2016/60</span>
                      </div>
                      <div className="flex justify-between py-2.5 border-b border-black/10">
                        <span>Date d'obtention</span>
                        <span className="font-primary font-bold text-[var(--mauve)]">30 mars 2016</span>
                      </div>
                      <div className="flex justify-between py-2.5 border-b border-black/10">
                        <span>Juridiction</span>
                        <span className="font-primary font-bold text-[var(--mauve)]">UEMOA</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="w-8 h-px bg-[var(--jaune-or)] mb-4 md:mb-5" />
                    <h3 className="font-primary font-bold text-2xl md:text-3xl mb-4 text-[var(--mauve)]">
                      Contrôles & Sécurité
                    </h3>
                    <ul className="space-y-3 text-[rgba(10, 10, 10, 0.6)]">
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
                        <span>Reporting réglementaire — Déclarations AMF-UMOA et BCEAO</span>
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

