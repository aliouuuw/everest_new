import { FaAward, FaChartLine, FaCheckCircle, FaFileSignature, FaHandshake, FaRocket, FaStar, FaUsers } from 'react-icons/fa'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { CTA } from '../components/Sections/CTA'
import { useReveal } from '../components/Hooks/useReveal'

export const CapitalMarketsPage = () => {
  const heroRef = useReveal<HTMLElement>()
  const servicesSectionRef = useReveal<HTMLElement>()
  const servicesGridRef = useReveal<HTMLDivElement>()
  const processSectionRef = useReveal<HTMLElement>()
  const processGridRef = useReveal<HTMLDivElement>()
  const casesSectionRef = useReveal<HTMLElement>()
  const casesGridRef = useReveal<HTMLDivElement>()

  return (
  <div className="min-h-screen bg-[var(--pure-white)] text-[var(--night)]">
    <Header />

      <main className="pt-24 sm:pt-28">
        {/* Hero — Split pattern */}
        <section ref={heroRef} className="reveal relative overflow-hidden">
          <div className="absolute inset-0 gradient-gold-subtle" />
          <div className="absolute inset-0" style={{ opacity: 0.06 }}>
            <div className="w-full h-full" style={{ backgroundImage: `linear-gradient(var(--night-10) 1px, transparent 1px), linear-gradient(90deg, var(--night-10) 1px, transparent 1px)`, backgroundSize: '64px 64px' }} />
          </div>
          <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="kicker text-gradient-gold">Offres — Marché des capitaux</span>
                <h1 className="luxury-heading mt-3">Votre partenaire privilégié pour réussir sur les marchés financiers</h1>
                <p className="luxury-subheading mt-5 pt-8">De l’ingénierie à l’exécution, nous accompagnons les émetteurs et investisseurs sur le primaire et le secondaire, avec exigence et transparence. Plus de 15 ans d'expérience sur la BRVM.</p>

                {/* Key Value Points */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <FaAward className="text-gold-metallic text-lg" />
                    <span className="text-sm font-medium">Expertise reconnue</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaUsers className="text-gold-metallic text-lg" />
                    <span className="text-sm font-medium">Réseau étendu</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaRocket className="text-gold-metallic text-lg" />
                    <span className="text-sm font-medium">Exécution rapide</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaStar className="text-gold-metallic text-lg" />
                    <span className="text-sm font-medium">Taux de succès 95%</span>
                  </div>
                </div>

                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <a href="#contact" className="btn-primary font-display tracking-wide">Demander une consultation gratuite</a>
                  <a href="#processus" className="btn-secondary font-display tracking-wide">Découvrir notre processus</a>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6">
                <div className="pointer-events-none absolute -top-12 -right-12 w-56 h-56 rounded-full bg-[var(--gold-metallic-10)] blur-3xl" />
                <div className="relative w-full h-[280px] rounded-xl overflow-hidden border border-[var(--gold-metallic)]/25 bg-[var(--white-smoke)]/80 grid place-content-center text-secondary">
                  <div className="flex flex-col items-center gap-3">
                    <FaChartLine className="text-3xl" />
                    <div className="font-display">Flux primaire & secondaire</div>
                    <div className="text-xs text-secondary">Obligations • Actions • Titres de créance</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Metrics & Social Proof */}
        <section className="py-14 sm:py-18 bg-gradient-to-br from-[var(--gold-light)]/5 to-transparent">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-3xl mx-auto">
              <span className="kicker text-gradient-gold">Notre impact</span>
              <h2 className="luxury-heading mt-3">Chiffres qui parlent d'eux-mêmes</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {[
                { value: '25+', label: 'Opérations réussies', icon: FaChartLine },
                { value: '15Mds', label: 'XOF levés', icon: FaHandshake },
                { value: '95%', label: 'Taux de succès', icon: FaCheckCircle },
                { value: '50+', label: 'Clients actifs', icon: FaUsers }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--gold-metallic-10)] mb-4 group-hover:bg-[var(--gold-metallic)] transition-colors">
                    <stat.icon className="text-2xl text-[var(--night)] group-hover:text-white transition-colors" />
                  </div>
                  <div className="numeric-tabular text-3xl font-display text-[var(--night)] mb-1">{stat.value}</div>
                  <div className="text-sm text-secondary">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Testimonials */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--gold-metallic)] to-[var(--gold-dark)] flex items-center justify-center text-white font-bold">S</div>
                  <div>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-gold-metallic text-sm" />
                      ))}
                    </div>
                    <p className="text-secondary text-sm italic mb-3">"Everest Finance nous a accompagnés dans notre introduction en bourse. Leur expertise et leur réseau ont été déterminants pour le succès de notre opération."</p>
                    <div className="font-medium text-sm">Directeur Financier</div>
                    <div className="text-secondary text-xs">Société cotée BRVM</div>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--gold-metallic)] to-[var(--gold-dark)] flex items-center justify-center text-white font-bold">F</div>
                  <div>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-gold-metallic text-sm" />
                      ))}
                    </div>
                    <p className="text-secondary text-sm italic mb-3">"Leur approche professionnelle et leur capacité à mobiliser les investisseurs institutionnels ont dépassé nos attentes. Un partenaire de confiance."</p>
                    <div className="font-medium text-sm">CEO</div>
                    <div className="text-secondary text-xs">Entreprise familiale</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services overview */}
        <section ref={servicesSectionRef} className="reveal py-14 sm:py-18">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-2xl mx-auto">
              <span className="kicker text-gradient-gold">Capacités</span>
              <h2 className="luxury-heading mt-3">Exécution et conseil sur le marché</h2>
              <p className="luxury-subheading mt-5">Couverture complète du cycle de financement: structuration, placement et suivi post-marché.</p>
            </div>

            <div ref={servicesGridRef} className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="flex items-start gap-5">
                  <div className="icon-badge text-[var(--night)] text-xl"><FaFileSignature /></div>
                  <div>
                    <div className="font-display text-lg mb-1">Structuration d'émissions</div>
                    <p className="text-secondary text-sm mb-3">Analyse approfondie, montage juridique et documentation complète pour dettes et actions. Optimisation fiscale et réglementaire.</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-[var(--gold-light)]/20 text-xs rounded-md">Obligations</span>
                      <span className="px-2 py-1 bg-[var(--gold-light)]/20 text-xs rounded-md">Actions</span>
                      <span className="px-2 py-1 bg-[var(--gold-light)]/20 text-xs rounded-md">Titres hybrides</span>
                    </div>
                  </div>
                </div>
                <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-[var(--gold-metallic-10)] to-transparent" />
                <a href="#processus" className="mt-3 text-xs text-[var(--night-80)]/80 hover:text-[var(--gold-metallic)] transition-colors duration-200 inline-flex items-center gap-1">Découvrir le processus <span>→</span></a>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="flex items-start gap-5">
                  <div className="icon-badge text-[var(--night)] text-xl"><FaHandshake /></div>
                  <div>
                    <div className="font-display text-lg mb-1">Placement & bookbuilding</div>
                    <p className="text-secondary text-sm mb-3">Accès privilégié aux investisseurs institutionnels, constitution du livre d'ordres, allocation disciplinée et pricing optimal.</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-[var(--gold-light)]/20 text-xs rounded-md">Institutionnels</span>
                      <span className="px-2 py-1 bg-[var(--gold-light)]/20 text-xs rounded-md">Family offices</span>
                      <span className="px-2 py-1 bg-[var(--gold-light)]/20 text-xs rounded-md">Retail</span>
                    </div>
                  </div>
                </div>
                <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-[var(--gold-metallic-10)] to-transparent" />
                <a href="#processus" className="mt-3 text-xs text-[var(--night-80)]/80 hover:text-[var(--gold-metallic)] transition-colors duration-200 inline-flex items-center gap-1">Voir les étapes <span>→</span></a>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="flex items-start gap-5">
                  <div className="icon-badge text-[var(--night)] text-xl"><FaCheckCircle /></div>
                  <div>
                    <div className="font-display text-lg mb-1">Suivi post-marché</div>
                    <p className="text-secondary text-sm mb-3">Reporting mensuel, facilitation de la liquidité secondaire, gestion de la relation investisseurs et communication corporate.</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-[var(--gold-light)]/20 text-xs rounded-md">Reporting</span>
                      <span className="px-2 py-1 bg-[var(--gold-light)]/20 text-xs rounded-md">IR</span>
                      <span className="px-2 py-1 bg-[var(--gold-light)]/20 text-xs rounded-md">Liquidité</span>
                    </div>
                  </div>
                </div>
                <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-[var(--gold-metallic-10)] to-transparent" />
                <a href="#contact" className="mt-3 text-xs text-[var(--night-80)]/80 hover:text-[var(--gold-metallic)] transition-colors duration-200 inline-flex items-center gap-1">Parler à un conseiller <span>→</span></a>
              </div>
            </div>
          </div>
        </section>

        {/* Primary issuance process */}
        <section id="processus" ref={processSectionRef} className="reveal py-14 sm:py-18 bg-[var(--white-smoke)]">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-2xl mx-auto">
              <span className="kicker text-gradient-gold">Processus d’émission</span>
              <h2 className="luxury-heading mt-3">Du diagnostic au règlement-livraison</h2>
            </div>
            <div ref={processGridRef} className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {[
                { step: '01', title: 'Diagnostic & structuration', desc: 'Cadrage des objectifs, termes et modalités de l’opération.' },
                { step: '02', title: 'Visa & documentation', desc: 'Préparation du prospectus et interactions régulateur.' },
                { step: '03', title: 'Placement & bookbuilding', desc: 'Commercialisation, collecte des intentions et fixation du prix.' },
                { step: '04', title: 'Règlement-livraison', desc: 'Allotissement, admission et suivi des engagements.' },
              ].map((s) => (
                <div key={s.step} className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
                  <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-medium tracking-wider text-[var(--night-80)]/80">Étape</span>
                    <span className="numeric-tabular text-sm px-2 py-1 rounded-md border border-[var(--gold-metallic)]/25 bg-[var(--white-smoke)]/60">{s.step}</span>
                  </div>
                  <div className="font-display text-lg mt-3">{s.title}</div>
                  <p className="text-secondary text-sm mt-2">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case highlights */}
        <section ref={casesSectionRef} className="reveal py-14 sm:py-18">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-2xl mx-auto">
              <span className="kicker text-gradient-gold">Études de cas</span>
              <h2 className="luxury-heading mt-3">Opérations récentes</h2>
            </div>
            <div ref={casesGridRef} className="reveal-stagger grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="font-display text-lg">Emprunt obligataire — Secteur Infra</div>
                <div className="mt-4 grid grid-cols-2 gap-4 numeric-tabular">
                  <div className="stat-card"><div className="text-xs text-secondary">Montant levé</div><div className="font-display text-xl">10,5 Mds XOF</div></div>
                  <div className="stat-card"><div className="text-xs text-secondary">Demande</div><div className="font-display text-xl">1,6×</div></div>
                </div>
                <div className="mt-4 text-secondary text-sm">Structuration, placement et admission réussie en moins de 6 semaines.</div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="font-display text-lg">Augmentation de capital — Services</div>
                <div className="mt-4 grid grid-cols-2 gap-4 numeric-tabular">
                  <div className="stat-card"><div className="text-xs text-secondary">Levée</div><div className="font-display text-xl">3,2 Mds XOF</div></div>
                  <div className="stat-card"><div className="text-xs text-secondary">Investisseurs</div><div className="font-display text-xl">45</div></div>
                </div>
                <div className="mt-4 text-secondary text-sm">Livre rapidement constitué auprès d’institutionnels et family offices.</div>
              </div>
            </div>
          </div>
        </section>

        <div id="contact" className="sr-only" />
        <CTA scheme="ivory" primaryHref="mailto:contact@everest-finance.sn" primaryLabel="Écrire à un conseiller" secondaryHref="#processus" secondaryLabel="Voir le processus" />
    </main>

    <Footer />
  </div>
)
}


