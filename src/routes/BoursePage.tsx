import { FiActivity, FiArrowDownRight, FiArrowUpRight } from 'react-icons/fi'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { CTA } from '../components/Sections/CTA'
import { useReveal } from '../components/Hooks/useReveal'

export const BoursePage = () => {
  const heroRef = useReveal<HTMLElement>()
  const overviewSectionRef = useReveal<HTMLElement>()
  const overviewGridRef = useReveal<HTMLDivElement>()
  const movesSectionRef = useReveal<HTMLElement>()
  const movesGridRef = useReveal<HTMLDivElement>()

  return (
    <div className="min-h-screen bg-[var(--pure-white)] text-[var(--night)]">
      <Header />

      <main className="pt-24 sm:pt-28">
        {/* Hero — Compact Centered */}
        <section ref={heroRef} className="reveal py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <span className="kicker text-gradient-gold">BRVM — Marchés</span>
            <h1 className="luxury-heading mt-3">Indices et tendances de marché</h1>
            <p className="luxury-subheading mt-5">Aperçu des principaux indices et mouvements récents sur la BRVM.</p>
          </div>
        </section>

        {/* Market Overview */}
        <section ref={overviewSectionRef} className="reveal py-12 sm:py-16 bg-[var(--white-smoke)]/60 border-y border-[var(--night)]/5">
          <div className="mx-auto max-w-6xl px-6">
            <div ref={overviewGridRef} className="reveal-stagger grid grid-cols-1 sm:grid-cols-3 gap-6 numeric-tabular">
              <div className="stat-card rounded-2xl p-6">
                <div className="text-xs text-secondary">BRVM 10</div>
                <div className="font-display text-2xl mt-1">178,52</div>
                <div className="mt-2 inline-flex items-center gap-1 text-[var(--success-700)] text-sm">
                  <FiArrowUpRight /> +0,84%
                </div>
              </div>
              <div className="stat-card rounded-2xl p-6">
                <div className="text-xs text-secondary">BRVM Composite</div>
                <div className="font-display text-2xl mt-1">230,14</div>
                <div className="mt-2 inline-flex items-center gap-1 text-[var(--danger-700)] text-sm">
                  <FiArrowDownRight /> -0,21%
                </div>
              </div>
              <div className="stat-card rounded-2xl p-6">
                <div className="text-xs text-secondary">Volume quotidien</div>
                <div className="font-display text-2xl mt-1">1,8 Mds XOF</div>
                <div className="mt-2 inline-flex items-center gap-1 text-[var(--night-80)]/80 text-sm">
                  <FiActivity /> Moy. 20j: 1,5 Mds
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Latest movements */}
        <section ref={movesSectionRef} className="reveal py-14 sm:py-18">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-2xl mx-auto">
              <span className="kicker text-gradient-gold">Derniers mouvements</span>
              <h2 className="luxury-heading mt-3">Titres en vue</h2>
              <p className="luxury-subheading mt-5">Gagnants, perdants et volumes remarquables de la séance.</p>
            </div>
            <div ref={movesGridRef} className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[
                { label: 'Gagnants', list: ['Titre A +7,2%', 'Titre B +5,4%', 'Titre C +3,1%'], accent: 'text-[var(--success-700)]' },
                { label: 'Perdants', list: ['Titre D -6,1%', 'Titre E -4,8%', 'Titre F -3,2%'], accent: 'text-[var(--danger-700)]' },
                { label: 'Volumes', list: ['Titre G 420 M FCFA', 'Titre H 310 M FCFA', 'Titre I 260 M FCFA'], accent: 'text-[var(--night-80)]/80' },
              ].map((b) => (
                <div key={b.label} className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
                  <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                  <div className="font-display text-lg mb-1">{b.label}</div>
                  <ul className="text-sm mt-2 space-y-1">
                    {b.list.map((item) => (
                      <li key={item} className={b.accent}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <CTA scheme="ivory" primaryHref="/portal" primaryLabel="Ouvrir un compte" secondaryHref="/newsroom" secondaryLabel="Voir nos analyses" />
      </main>

      <Footer />
    </div>
  )
}


