import { FiStar, FiTrendingUp, FiZap } from 'react-icons/fi'
import { useReveal } from '../components/Hooks/useReveal'
import { SigninForm } from '../components/Auth/SigninForm'

export const AuthPage = () => {
  const heroRef = useReveal<HTMLElement>()
  const formSectionRef = useReveal<HTMLElement>()
  const benefitsSectionRef = useReveal<HTMLElement>()
  const benefitsGridRef = useReveal<HTMLDivElement>()
  // const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin')

  return (
    <div>
      {/* Hero — Compact Centered */}
      <section ref={heroRef} className="reveal pt-34 pb-8 sm:pt-28">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <span className="kicker text-gradient-gold">Accès Client</span>
          <h1 className="luxury-heading mt-3">
            {/* {authMode === 'signin' ? 'Connectez-vous à votre espace' : 'Créez votre compte en toute sécurité'} */}
            Connectez-vous à votre espace
          </h1>
          <p className="luxury-subheading mt-5 pt-5">
            {/* {authMode === 'signin' 
              ? 'Un accès simple et sécurisé à votre portefeuille et vos documents.' 
              : 'Rejoignez notre plateforme de gestion financière sécurisée.' */}
            Un accès simple et sécurisé à votre portefeuille et vos documents.
          </p>
        </div>
      </section>

      {/* Formulaire d'authentification */}
      <section id="auth" ref={formSectionRef} className="reveal pb-14 sm:pb-18">
        <div className="mx-auto max-w-2xl px-6">
          {/* Mode switcher */}
          {/* <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-lg border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-1">
              <button
                onClick={() => setAuthMode('signin')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  authMode === 'signin'
                    ? 'bg-[var(--gold-metallic)]/20 text-[var(--night)]'
                    : 'text-[var(--night-80)]/80 hover:text-[var(--night)]'
                }`}
              >
                Se connecter
              </button>
              <button
                onClick={() => setAuthMode('signup')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  authMode === 'signup'
                    ? 'bg-[var(--gold-metallic)]/20 text-[var(--night)]'
                    : 'text-[var(--night-80)]/80 hover:text-[var(--night)]'
                }`}
              >
                S'inscrire
              </button>
            </div>
          </div> */}

          {/* Auth form */}
          <SigninForm />
        </div>
      </section>

      {/* Avantages */}
      <section ref={benefitsSectionRef} className="reveal py-14 sm:py-18">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="kicker text-gradient-gold">Avantages</span>
            <h2 className="luxury-heading mt-3">Un portail pensé pour vous</h2>
          </div>
          <div ref={benefitsGridRef} className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
              <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
              <div className="flex items-start gap-5">
                <div className="icon-badge text-[var(--night)] text-xl"><FiTrendingUp /></div>
                <div>
                  <div className="font-display text-lg mb-1">Suivi en temps réel</div>
                  <p className="text-secondary text-sm">Positions, performance et mouvements à jour.</p>
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
              <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
              <div className="flex items-start gap-5">
                <div className="icon-badge text-[var(--night)] text-xl"><FiStar /></div>
                <div>
                  <div className="font-display text-lg mb-1">Documents centralisés</div>
                  <p className="text-secondary text-sm">Relevés, avis d'opérés et reporting en un endroit.</p>
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover">
              <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
              <div className="flex items-start gap-5">
                <div className="icon-badge text-[var(--night)] text-xl"><FiZap /></div>
                <div>
                  <div className="font-display text-lg mb-1">Alertes personnalisées</div>
                  <p className="text-secondary text-sm">Notifications sur seuils, opérations et échéances.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
