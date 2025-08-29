import React from 'react'
import { FiCheckCircle, FiGlobe, FiShield, FiTrendingUp, FiUsers } from 'react-icons/fi'
import { CTA } from '../components/Sections/CTA'
import { useReveal } from '../components/Hooks/useReveal'
import { StatsSection } from '../components/Sections/StatsSection'

export const AboutPage = () => {
  const timelineItems = [
    { year: '2013', text: "Création d'Everest Finance SGI à Dakar." },
    { year: '2016', text: 'Licence CREPMF SGI/DA/2016/60 obtenue.' },
    { year: '2018', text: 'Premières opérations structurantes sur le marché primaire.' },
    { year: '2021', text: 'Plateforme client modernisée et renforcement de la recherche.' },
    { year: '2024', text: 'Consolidation du leadership régional sur la BRVM.' },
  ]

  // Sub-navigation removed from hero to create a cleaner, more distinctive intro

  // Reveal refs to align interactions with home
  const heroRef = useReveal<HTMLElement>()
  const missionVisionRef = useReveal<HTMLElement>()
  const missionVisionGridRef = useReveal<HTMLDivElement>()
  const philosophieRef = useReveal<HTMLElement>()
  const philosophieGridRef = useReveal<HTMLDivElement>()

  const histoireRef = useReveal<HTMLElement>()
  const histoireListRef = useReveal<HTMLUListElement>()
  const equipeRef = useReveal<HTMLElement>()
  const equipeGridRef = useReveal<HTMLDivElement>()
  const conformiteRef = useReveal<HTMLElement>()
  const conformiteGridRef = useReveal<HTMLDivElement>()



  return (
    <div>
        {/* Hero */}
        <section ref={heroRef} className="reveal relative overflow-hidden">
          {/* Background treatments */}
          <div className="absolute inset-0 gradient-gold-subtle" />
          <div className="absolute inset-0" style={{ opacity: 0.06 }}>
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `linear-gradient(var(--night-10) 1px, transparent 1px), linear-gradient(90deg, var(--night-10) 1px, transparent 1px)`,
                backgroundSize: '64px 64px'
              }}
            />
          </div>

          <div className="relative">
            <div className="mx-auto max-w-6xl px-6 py-34 md:py-32">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                {/* Left: Text */}
                <div>
                  <span className="kicker text-gradient-gold">À propos</span>
                  <h1 className="luxury-heading mt-3">Des idées et des valeurs au service de vos ambitions</h1>
                  <p className="luxury-subheading mt-5 pt-8">
                    Société de Gestion et d'Intermédiation licenciée CREPMF. Nous allions discipline de marché, ingénierie financière et proximité client pour créer de la valeur durable sur la BRVM.
                  </p>

                  <div className="mt-10 flex flex-col sm:flex-row gap-4">
                    <a href="#mission-vision" className="btn-primary font-display tracking-wide">Notre mission</a>
                    <a href="#histoire" className="btn-secondary font-display tracking-wide">Notre histoire</a>
                  </div>
                </div>

                {/* Right: Visual card */}
                <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6">
                  <div className="pointer-events-none absolute -top-12 -right-12 w-56 h-56 rounded-full bg-[var(--gold-metallic-10)] blur-3xl" />
                  <div className="relative w-full h-[280px] rounded-xl overflow-hidden border border-[var(--gold-metallic)]/25 bg-[var(--white-smoke)]/80">
                    <div
                      className="absolute inset-0"
                      style={{ backgroundImage: `linear-gradient(var(--night-10) 1px, transparent 1px), linear-gradient(90deg, var(--night-10) 1px, transparent 1px)`, backgroundSize: '24px 24px' }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-secondary">Everest Finance SGI — Dakar</div>
                  </div>
                  <div className="mt-5 grid grid-cols-3 gap-3 text-center text-xs">
                    <div className="rounded-lg bg-[var(--white-smoke)]/60 p-3">
                      <div className="font-display">2013</div>
                      <div className="text-secondary">Création</div>
                    </div>
                    <div className="rounded-lg bg-[var(--white-smoke)]/60 p-3">
                      <div className="font-display">CREPMF</div>
                      <div className="text-secondary">Licence</div>
                    </div>
                    <div className="rounded-lg bg-[var(--white-smoke)]/60 p-3">
                      <div className="font-display">BRVM</div>
                      <div className="text-secondary">Marchés</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section ref={missionVisionRef} id="mission-vision" className="reveal py-12 sm:py-16 bg-[var(--white-smoke)]/60 border-y border-[var(--night)]/5">
          <div className="mx-auto max-w-6xl px-6">
            <div ref={missionVisionGridRef} className="reveal-stagger grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="flex items-start gap-3">
                  <FiTrendingUp className="text-[var(--gold-dark)] mt-1" />
                  <div>
                    <h2 className="font-display text-xl mb-2">Notre mission</h2>
                    <p className="text-secondary">Proposer des solutions d’investissement performantes et responsables, fondées sur la transparence, l’expertise et la proximité.</p>
                  </div>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="flex items-start gap-3">
                  <FiGlobe className="text-[var(--gold-dark)] mt-1" />
                  <div>
                    <h2 className="font-display text-xl mb-2">Notre vision</h2>
                    <p className="text-secondary">Devenir un partenaire de référence en Afrique de l’Ouest pour la gestion de patrimoine et l’accès aux marchés financiers.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophie d'investissement */}
        <section ref={philosophieRef} id="philosophie" className="reveal py-14 sm:py-18">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="luxury-heading mb-6">Philosophie d'investissement</h2>
            <div ref={philosophieGridRef} className="reveal-stagger grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <h3 className="font-display mb-3">Approche disciplinée</h3>
                <p className="text-secondary mb-4">Processus d'analyse rigoureux combinant analyse fondamentale et technique pour identifier les opportunités sur la BRVM.</p>
                <ul className="text-secondary text-sm space-y-1">
                  <li>• Due diligence approfondie des émetteurs</li>
                  <li>• Évaluation des fondamentaux sectoriels</li>
                  <li>• Analyse des conditions de marché</li>
                </ul>
              </div>
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <h3 className="font-display mb-3">Gestion du risque</h3>
                <p className="text-secondary mb-4">Framework de gestion des risques adapté aux spécificités du marché UEMOA et aux profils de nos clients.</p>
                <ul className="text-secondary text-sm space-y-1">
                  <li>• Diversification sectorielle et géographique</li>
                  <li>• Limites de concentration par émetteur</li>
                  <li>• Stress tests et scénarios de marché</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <StatsSection
          id="chiffres"
          title="Chiffres clés"
          background="light"
          columns={3}
          stats={[
            { value: "11", label: "ans d'existence", animateWithUnits: false },
            { value: "500 Mds F CFA", label: "Levée de fonds (obligations, titres de capital, FCT)", animateWithUnits: true },
            { value: "200 Mds F CFA", label: "Transactions au marché financier", animateWithUnits: true }
          ]}
        />

        {/* Histoire */}
        <section ref={histoireRef} id="histoire" className="reveal py-14 sm:py-18">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="luxury-heading mb-6">Notre histoire</h2>
            <div className="relative">
              <div className="absolute left-4 sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-px bg-[var(--night)]/10" />
              <ul ref={histoireListRef} className="reveal-stagger space-y-8">
                {timelineItems.map((item, index) => (
                  <li key={item.year} className="relative">
                    <div className={`flex flex-col sm:flex-row ${index % 2 === 0 ? 'sm:flex-row-reverse' : ''} sm:items-start sm:justify-between gap-4`}>
                      <div className="sm:w-1/2 group relative overflow-hidden rounded-xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-5 transition-all card-hover">
                        <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                        <div className="font-display text-[var(--gold-dark)]">{item.year}</div>
                        <p className="text-secondary mt-1">{item.text}</p>
                      </div>
                      <div className="hidden sm:block sm:w-1/2" />
                    </div>
                    <span className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-5 inline-block h-3 w-3 rounded-full bg-[var(--gold-dark)] shadow" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Équipe dirigeante */}
        <section ref={equipeRef} id="equipe" className="reveal py-14 sm:py-18">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="luxury-heading mb-6">Équipe dirigeante</h2>
            <div ref={equipeGridRef} className="reveal-stagger grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
                <h3 className="font-display mb-3">Leadership expérimenté</h3>
                <p className="text-secondary mb-4">Plus de 30 ans d'expérience cumulée dans les marchés financiers africains et l'intermédiation financière.</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <FiUsers className="text-[var(--gold-dark)] mt-1" />
                    <div>
                      <div className="font-display text-sm">Direction Générale</div>
                      <p className="text-secondary text-xs">Vision stratégique et développement commercial</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FiTrendingUp className="text-[var(--gold-dark)] mt-1" />
                    <div>
                      <div className="font-display text-sm">Direction des Marchés</div>
                      <p className="text-secondary text-xs">Recherche, analyse et exécution</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FiShield className="text-[var(--gold-dark)] mt-1" />
                    <div>
                      <div className="font-display text-sm">Direction des Opérations</div>
                      <p className="text-secondary text-xs">Conformité, risques et middle office</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
                <h3 className="font-display mb-3">Expertise métier</h3>
                <p className="text-secondary mb-4">Spécialistes reconnus des marchés BRVM et des enjeux d'investissement en Afrique de l'Ouest.</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="text-center p-3 bg-[var(--white-smoke)]/60 rounded">
                    <div className="font-display">CFA</div>
                    <div className="text-secondary text-xs">Certifications</div>
                  </div>
                  <div className="text-center p-3 bg-[var(--white-smoke)]/60 rounded">
                    <div className="font-display">MBA</div>
                    <div className="text-secondary text-xs">Finance</div>
                  </div>
                  <div className="text-center p-3 bg-[var(--white-smoke)]/60 rounded">
                    <div className="font-display">15+</div>
                    <div className="text-secondary text-xs">Ans BRVM</div>
                  </div>
                  <div className="text-center p-3 bg-[var(--white-smoke)]/60 rounded">
                    <div className="font-display">Bilingue</div>
                    <div className="text-secondary text-xs">FR/EN</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Conformité & Réglementation */}
        <section ref={conformiteRef} id="conformite" className="reveal py-12 sm:py-16 bg-[var(--white-smoke)]/60 border-y border-[var(--night)]/5">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="luxury-heading mb-6">Conformité & Réglementation</h2>
            <div ref={conformiteGridRef} className="reveal-stagger grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="group relative overflow-hidden rounded-2xl bg-[var(--pure-white)]/80 backdrop-blur-sm border border-[var(--gold-metallic)]/25 p-6">
                <h3 className="font-display mb-3 flex items-center gap-2">
                  <FiCheckCircle className="text-[var(--gold-dark)]" />
                  Cadre réglementaire
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-[var(--night)]/5 pb-2">
                    <span className="text-secondary">Licence CREPMF</span>
                    <span className="font-display">SGI/DA/2016/60</span>
                  </div>
                  <div className="flex justify-between border-b border-[var(--night)]/5 pb-2">
                    <span className="text-secondary">Date d'obtention</span>
                    <span className="font-display">30 mars 2016</span>
                  </div>
                  <div className="flex justify-between border-b border-[var(--night)]/5 pb-2">
                    <span className="text-secondary">Juridiction</span>
                    <span className="font-display">UEMOA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Activités autorisées</span>
                    <span className="font-display text-xs">Gestion, Intermédiation</span>
                  </div>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-2xl bg-[var(--pure-white)]/80 backdrop-blur-sm border border-[var(--gold-metallic)]/25 p-6">
                <h3 className="font-display mb-3 flex items-center gap-2">
                  <FiShield className="text-[var(--gold-dark)]" />
                  Contrôles & Sécurité
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[var(--gold-dark)] mt-2"></div>
                    <div>
                      <div className="font-display text-sm">Ségrégation des actifs</div>
                      <p className="text-secondary text-xs">Comptes dédiés et dépositaire central BRVM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[var(--gold-dark)] mt-2"></div>
                    <div>
                      <div className="font-display text-sm">KYC/AML renforcé</div>
                      <p className="text-secondary text-xs">Procédures anti-blanchiment conformes CENTIF</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[var(--gold-dark)] mt-2"></div>
                    <div>
                      <div className="font-display text-sm">Reporting réglementaire</div>
                      <p className="text-secondary text-xs">Déclarations périodiques CREPMF et BCEAO</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}


