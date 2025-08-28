import { FiHeadphones, FiHelpCircle, FiMessageCircle, FiSliders, FiUserCheck } from 'react-icons/fi'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { CTA } from '../components/Sections/CTA'
import { useReveal } from '../components/Hooks/useReveal'

export const AssistedMgmtPage = () => {
  const heroRef = useReveal<HTMLElement>()
  const stepsSectionRef = useReveal<HTMLElement>()
  const stepsGridRef = useReveal<HTMLDivElement>()
  const toolsSectionRef = useReveal<HTMLElement>()
  const toolsGridRef = useReveal<HTMLDivElement>()

  return (
    <div className="min-h-screen bg-[var(--pure-white)] text-[var(--night)]">
      <Header />

      <main className="pt-24 sm:pt-28">
        {/* Hero — Split pattern with advisor angle */}
        <section ref={heroRef} className="reveal relative overflow-hidden">
          <div className="absolute inset-0 gradient-gold-subtle" />
          <div className="absolute inset-0" style={{ opacity: 0.06 }}>
            <div className="w-full h-full" style={{ backgroundImage: `linear-gradient(var(--night-10) 1px, transparent 1px), linear-gradient(90deg, var(--night-10) 1px, transparent 1px)`, backgroundSize: '64px 64px' }} />
          </div>
          <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="kicker text-gradient-gold">Offres — Gestion assistée</span>
                <h1 className="luxury-heading mt-3">Décider avec un conseiller à vos côtés</h1>
                <p className="luxury-subheading mt-5">Vous gardez la main sur les décisions, nous apportons analyses, recommandations et suivi pour investir sereinement.</p>
                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <a href="#marche" className="btn-primary font-display tracking-wide">Comment ça marche</a>
                  <a href="#contact" className="btn-secondary font-display tracking-wide">Parler à un conseiller</a>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6">
                <div className="pointer-events-none absolute -top-12 -right-12 w-56 h-56 rounded-full bg-[var(--gold-metallic-10)] blur-3xl" />
                <div className="relative w-full h-[280px] rounded-xl overflow-hidden border border-[var(--gold-metallic)]/25 bg-[var(--white-smoke)]/80 grid place-content-center">
                  <div className="flex items-center gap-3 text-secondary">
                    <FiHeadphones className="text-2xl" />
                    <div className="font-display">Accompagnement personnalisé</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comment ça marche (3 steps) */}
        <section id="marche" ref={stepsSectionRef} className="reveal py-14 sm:py-18">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-2xl mx-auto">
              <span className="kicker text-gradient-gold">Processus</span>
              <h2 className="luxury-heading mt-3">Comment ça marche</h2>
              <p className="luxury-subheading mt-5">Un cadre simple, pensé pour vous conseiller sans vous déposséder de la décision.</p>
            </div>
            <div ref={stepsGridRef} className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[
                { step: '01', title: 'Diagnostic initial', desc: 'Besoins, objectifs, contraintes et horizon clarifiés.', icon: <FiHelpCircle /> },
                { step: '02', title: 'Recommandations', desc: 'Listes d’actions ou obligations avec rationales et niveaux.', icon: <FiSliders /> },
                { step: '03', title: 'Décision & suivi', desc: 'Vous validez, nous exécutons et assurons le reporting.', icon: <FiUserCheck /> },
              ].map((s) => (
                <div key={s.step} className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
                  <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-medium tracking-wider text-[var(--night-80)]/80">Étape</span>
                    <span className="numeric-tabular text-sm px-2 py-1 rounded-md border border-[var(--gold-metallic)]/25 bg-[var(--white-smoke)]/60">{s.step}</span>
                  </div>
                  <div className="flex items-start gap-4 mt-3">
                    <div className="icon-badge text-[var(--night)] text-xl">{s.icon}</div>
                    <div>
                      <div className="font-display text-lg mb-1">{s.title}</div>
                      <p className="text-secondary text-sm">{s.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Outils & accompagnement (2 cards) */}
        <section ref={toolsSectionRef} className="reveal py-14 sm:py-18 bg-[var(--white-smoke)]">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-2xl mx-auto">
              <span className="kicker text-gradient-gold">Outils & accompagnement</span>
              <h2 className="luxury-heading mt-3">Des moyens concrets pour décider</h2>
            </div>
            <div ref={toolsGridRef} className="reveal-stagger grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="font-display text-lg mb-1">Analyses & alertes</div>
                <p className="text-secondary text-sm">Notes régulières, signaux de marché et alertes personnalisées pour ne rien manquer.</p>
                <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-[var(--gold-metallic-10)] to-transparent" />
                <div className="mt-3 text-xs text-[var(--night-80)]/80">Accès aux publications et à un flux d’alertes</div>
              </div>
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                <div className="font-display text-lg mb-1">Échanges avec un conseiller</div>
                <p className="text-secondary text-sm">Points de marché, simulations et idées d’allocation en direct avec votre interlocuteur.</p>
                <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-[var(--gold-metallic-10)] to-transparent" />
                <div className="mt-3 text-xs text-[var(--night-80)]/80 flex items-center gap-2"><FiMessageCircle className="opacity-80" />Canaux: email, téléphone, visio</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA band */}
        <div id="contact" className="sr-only" />
        <CTA
          scheme="ivory"
          primaryHref="mailto:contact@everest-finance.sn"
          primaryLabel="Parler à un conseiller"
          secondaryHref="#marche"
          secondaryLabel="Voir le fonctionnement"
        />
      </main>

      <Footer />
    </div>
  )
}


