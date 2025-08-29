import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { FiLock, FiMail, FiStar, FiTrendingUp, FiZap } from 'react-icons/fi'

import { useReveal } from '../components/Hooks/useReveal'

export const PortalPage = () => {
  const navigate = useNavigate()
  const heroRef = useReveal<HTMLElement>()
  const formSectionRef = useReveal<HTMLElement>()
  const formCardRef = useReveal<HTMLDivElement>()
  const benefitsSectionRef = useReveal<HTMLElement>()
  const benefitsGridRef = useReveal<HTMLDivElement>()
  // Form states
  const [signinForm, setSigninForm] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Handle signin form submission
  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Mock authentication
    if (signinForm.email === 'adminclient' && signinForm.password === 'password') {
      sessionStorage.setItem('isAuthenticated', 'true')
      sessionStorage.setItem('userEmail', signinForm.email)
      navigate({ to: '/dashboard' })
    } else {
      setError('Email ou mot de passe incorrect')
    }

    setIsLoading(false)
  }

  // Handle input changes
  const handleSigninChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setSigninForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <div>
        {/* Hero — Compact Centered */}
        <section ref={heroRef} className="reveal py-34 sm:py-28">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <span className="kicker text-gradient-gold">Accès Client</span>
            <h1 className="luxury-heading mt-3">Créez votre compte en toute sécurité</h1>
            <p className="luxury-subheading mt-5 pt-5">Un accès simple et sécurisé à votre portefeuille et vos documents.</p>
          </div>
        </section>

        {/* Formulaire de connexion */}
        <section id="signin" ref={formSectionRef} className="reveal pb-14 sm:pb-18">
          <div className="mx-auto max-w-2xl px-6">
            <div ref={formCardRef} className="reveal-stagger group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 sm:p-8">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-display text-xl">Accéder à votre espace</div>
                  <p className="text-secondary text-sm mt-1">Connectez-vous à votre portail client.</p>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-xs text-[var(--night-80)]/80">
                  <FiLock /> Sécurisé
                </div>
              </div>

              {/* Formulaire de connexion */}
              <form onSubmit={handleSignin} className="mt-6 space-y-5" noValidate>
                {error && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                    {error}
                  </div>
                )}
                <div>
                  <label htmlFor="email-login" className="text-xs font-medium text-[var(--night-80)]/80">Email</label>
                  <input
                    id="email-login"
                    type="email"
                    name="email"
                    value={signinForm.email}
                    onChange={handleSigninChange}
                    required
                    className="mt-1 w-full rounded-lg border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/90 px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--gold-metallic)]/30"
                  />
                </div>
                <div>
                  <label htmlFor="password-login" className="text-xs font-medium text-[var(--night-80)]/80">Mot de passe</label>
                  <input
                    id="password-login"
                    type="password"
                    name="password"
                    value={signinForm.password}
                    onChange={handleSigninChange}
                    required
                    className="mt-1 w-full rounded-lg border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/90 px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--gold-metallic)]/30"
                  />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <label className="inline-flex items-center gap-2 text-xs text-[var(--night-80)]/80">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={signinForm.rememberMe}
                      onChange={handleSigninChange}
                      className="accent-[var(--gold-dark)]"
                    />
                    Se souvenir de moi
                  </label>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary font-display tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Connexion...' : 'Se connecter'}
                  </button>
                </div>
                <div className="text-xs text-[var(--night-80)]/80 inline-flex items-center gap-2">
                  <FiMail className="opacity-70" />
                  <a className="underline hover:text-[var(--gold-metallic)]" href="#">Mot de passe oublié ?</a>
                </div>
              </form>
            </div>
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
                    <p className="text-secondary text-sm">Relevés, avis d’opérés et reporting en un endroit.</p>
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


