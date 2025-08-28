import { FiCheckCircle, FiGlobe, FiShield, FiTrendingUp, FiUsers } from 'react-icons/fi'
import { Header } from '../components/Header'
import { CTA } from '../components/Sections/CTA'

export const AboutPage = () => {
  const timelineItems = [
    { year: '2013', text: "Création d'Everest Finance SGI à Dakar." },
    { year: '2016', text: 'Licence CREPMF SGI/DA/2016/60 obtenue.' },
    { year: '2018', text: 'Premières opérations structurantes sur le marché primaire.' },
    { year: '2021', text: 'Plateforme client modernisée et renforcement de la recherche.' },
    { year: '2024', text: 'Consolidation du leadership régional sur la BRVM.' },
  ]

  const subNav = [
    { href: '#mission-vision', label: 'Mission & Vision' },
    { href: '#chiffres', label: 'Chiffres clés' },
    { href: '#histoire', label: 'Histoire' },
    { href: '#equipe', label: 'Équipe' },
    { href: '#conformite', label: 'Conformité' },
    { href: '#philosophie', label: 'Philosophie' },
  ]

  return (
    <div className="min-h-screen bg-[var(--pure-white)] text-[var(--night)]">
      <Header />
      <main className="pt-24 sm:pt-28">
        {/* Hero */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-5">
            <span className="kicker text-gradient-gold">À propos</span>
            <h1 className="heading-display text-3xl sm:text-4xl mt-3 max-w-3xl">Des idées et des valeurs au service de vos ambitions</h1>
            <p className="text-secondary mt-4 max-w-2xl">
              Everest Finance SGI accompagne investisseurs particuliers et institutionnels avec exigence, transparence et proximité sur la BRVM.
            </p>

            {/* Subnav */}
            <nav aria-label="Sous-navigation" className="mt-8 overflow-x-auto">
              <ul className="flex items-center gap-3 sm:gap-4 text-sm">
                {subNav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-[var(--night)]/10 bg-white px-3 py-2 hover:border-[var(--gold-dark)]/40 hover:text-[var(--gold-dark)] transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>

        {/* Mission & Vision */}
        <section id="mission-vision" className="py-12 sm:py-16 bg-[var(--white-smoke)]/60 border-y border-[var(--night)]/5">
          <div className="mx-auto max-w-6xl px-5 grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
            <div className="p-6 rounded-2xl bg-white border border-[var(--night)]/10">
              <div className="flex items-start gap-3">
                <FiTrendingUp className="text-[var(--gold-dark)] mt-1" />
                <div>
                  <h2 className="font-display text-2xl mb-2">Notre mission</h2>
                  <p className="text-secondary">Proposer des solutions d’investissement performantes et responsables, fondées sur la transparence, l’expertise et la proximité.</p>
                </div>
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-[var(--night)]/10">
              <div className="flex items-start gap-3">
                <FiGlobe className="text-[var(--gold-dark)] mt-1" />
                <div>
                  <h2 className="font-display text-2xl mb-2">Notre vision</h2>
                  <p className="text-secondary">Devenir un partenaire de référence en Afrique de l’Ouest pour la gestion de patrimoine et l’accès aux marchés financiers.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophie d'investissement */}
        <section id="philosophie" className="py-14 sm:py-18">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="font-display text-2xl mb-6">Philosophie d'investissement</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="p-6 rounded-xl border border-[var(--night)]/10 bg-white">
                <h3 className="font-display mb-3">Approche disciplinée</h3>
                <p className="text-secondary mb-4">Processus d'analyse rigoureux combinant analyse fondamentale et technique pour identifier les opportunités sur la BRVM.</p>
                <ul className="text-secondary text-sm space-y-1">
                  <li>• Due diligence approfondie des émetteurs</li>
                  <li>• Évaluation des fondamentaux sectoriels</li>
                  <li>• Analyse des conditions de marché</li>
                </ul>
              </div>
              <div className="p-6 rounded-xl border border-[var(--night)]/10 bg-white">
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

        {/* Chiffres clés */}
        <section id="chiffres" className="py-12 sm:py-16 bg-[var(--white-smoke)]/60 border-y border-[var(--night)]/5">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="font-display text-2xl mb-6">Chiffres clés</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-white border border-[var(--night)]/10">
                <div className="text-3xl font-display">11</div>
                <div className="text-secondary text-sm">ans d’existence</div>
              </div>
              <div className="p-6 rounded-xl bg-white border border-[var(--night)]/10">
                <div className="text-3xl font-display">500 Mds F CFA</div>
                <div className="text-secondary text-sm">Levée de fonds (obligations, titres de capital, FCT)</div>
              </div>
              <div className="p-6 rounded-xl bg-white border border-[var(--night)]/10">
                <div className="text-3xl font-display">200 Mds F CFA</div>
                <div className="text-secondary text-sm">Transactions au marché financier</div>
              </div>
            </div>
          </div>
        </section>

        {/* Histoire */}
        <section id="histoire" className="py-14 sm:py-18">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="font-display text-2xl mb-6">Notre histoire</h2>
            <div className="relative">
              <div className="absolute left-4 sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-px bg-[var(--night)]/10" />
              <ul className="space-y-8">
                {timelineItems.map((item, index) => (
                  <li key={item.year} className="relative">
                    <div className={`flex flex-col sm:flex-row ${index % 2 === 0 ? 'sm:flex-row-reverse' : ''} sm:items-start sm:justify-between gap-4`}>
                      <div className="sm:w-1/2 bg-white border border-[var(--night)]/10 rounded-xl p-5">
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
        <section id="equipe" className="py-14 sm:py-18">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="font-display text-2xl mb-6">Équipe dirigeante</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="p-6 rounded-xl border border-[var(--night)]/10 bg-white">
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
              <div className="p-6 rounded-xl border border-[var(--night)]/10 bg-white">
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
        <section id="conformite" className="py-12 sm:py-16 bg-[var(--white-smoke)]/60 border-y border-[var(--night)]/5">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="font-display text-2xl mb-6">Conformité & Réglementation</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="p-6 rounded-xl bg-white border border-[var(--night)]/10">
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
              <div className="p-6 rounded-xl bg-white border border-[var(--night)]/10">
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

        {/* CTA */}
        <CTA scheme="ivory" />
      </main>
    </div>
  )
}


