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
  const [activeTab, setActiveTab] = useState<'signup' | 'signin'>('signin')

  // Form states
  const [signinForm, setSigninForm] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [signupForm, setSignupForm] = useState({
    prenom: '',
    nom: '',
    email: '',
    phone: '',
    pays: '',
    type: 'Particulier',
    message: '',
    acceptTerms: false
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

  // Handle signup form submission
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Mock successful signup (in real app, this would create account)
    alert('Inscription réussie ! Vous recevrez un email de confirmation.')
    setActiveTab('signin')

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

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined

    setSignupForm(prev => ({
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

        {/* Formulaire d'inscription */}
        <section id="signup" ref={formSectionRef} className="reveal pb-14 sm:pb-18">
          <div className="mx-auto max-w-6xl px-6">
            <div ref={formCardRef} className="reveal-stagger group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 sm:p-8">
              <div className="pointer-events-none absolute -top-16 -right-16 w-72 h-72 rounded-full bg-gradient-to-br from-[var(--gold-metallic)]/20 via-[var(--gold-metallic)]/12 to-[var(--gold-metallic)]/3 blur-3xl" />
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-display text-xl">Accéder à votre espace</div>
                  <p className="text-secondary text-sm mt-1">Créez un compte ou connectez-vous à votre portail client.</p>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-xs text-[var(--night-80)]/80">
                  <FiLock /> Sécurisé
                </div>
              </div>

              {/* Tabs */}
              <div role="tablist" aria-label="Choisir une action" className="mt-6 inline-flex rounded-lg border border-[var(--gold-metallic)]/25 bg-[var(--white-smoke)]/60 p-1">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'signin'}
                  aria-controls="panel-signin"
                  id="tab-signin"
                  onClick={() => setActiveTab('signin')}
                  className={`px-4 py-2 rounded-md font-display text-sm transition-all ${activeTab === 'signin' ? 'bg-[var(--gold-metallic)] text-white shadow-lg' : 'text-secondary hover:text-[var(--gold-dark)]'}`}
                >
                  Connexion
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'signup'}
                  aria-controls="panel-signup"
                  id="tab-signup"
                  onClick={() => setActiveTab('signup')}
                  className={`px-4 py-2 rounded-md font-display text-sm transition-all ${activeTab === 'signup' ? 'bg-[var(--gold-metallic)] text-white shadow-lg' : 'text-secondary hover:text-[var(--gold-dark)]'}`}
                >
                  Inscription
                </button>
              </div>

              {/* Panels */}
              {activeTab === 'signup' && (
                <form id="panel-signup" role="tabpanel" aria-labelledby="tab-signup" onSubmit={handleSignup} className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5" noValidate>
                  {error && (
                    <div className="sm:col-span-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                      {error}
                    </div>
                  )}
                  <div>
                    <label htmlFor="prenom" className="text-xs font-medium text-[var(--night-80)]/80">Prénom</label>
                    <input
                      id="prenom"
                      name="prenom"
                      value={signupForm.prenom}
                      onChange={handleSignupChange}
                      required
                      className="mt-1 w-full rounded-lg border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/90 px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--gold-metallic)]/30"
                    />
                  </div>
                  <div>
                    <label htmlFor="nom" className="text-xs font-medium text-[var(--night-80)]/80">Nom</label>
                    <input
                      id="nom"
                      name="nom"
                      value={signupForm.nom}
                      onChange={handleSignupChange}
                      required
                      className="mt-1 w-full rounded-lg border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/90 px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--gold-metallic)]/30"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-xs font-medium text-[var(--night-80)]/80">Email</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={signupForm.email}
                      onChange={handleSignupChange}
                      required
                      className="mt-1 w-full rounded-lg border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/90 px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--gold-metallic)]/30"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="text-xs font-medium text-[var(--night-80)]/80">Téléphone</label>
                    <input
                      id="phone"
                      name="phone"
                      inputMode="tel"
                      value={signupForm.phone}
                      onChange={handleSignupChange}
                      className="mt-1 w-full rounded-lg border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/90 px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--gold-metallic)]/30"
                    />
                  </div>
                  <div>
                    <label htmlFor="pays" className="text-xs font-medium text-[var(--night-80)]/80">Pays</label>
                    <input
                      id="pays"
                      name="pays"
                      value={signupForm.pays}
                      onChange={handleSignupChange}
                      className="mt-1 w-full rounded-lg border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/90 px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--gold-metallic)]/30"
                    />
                  </div>
                  <div>
                    <label htmlFor="type" className="text-xs font-medium text-[var(--night-80)]/80">Type de compte</label>
                    <select
                      id="type"
                      name="type"
                      value={signupForm.type}
                      onChange={handleSignupChange}
                      className="mt-1 w-full rounded-lg border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/90 px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--gold-metallic)]/30"
                    >
                      <option>Particulier</option>
                      <option>Entreprise</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="text-xs font-medium text-[var(--night-80)]/80">Message (optionnel)</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={signupForm.message}
                      onChange={handleSignupChange}
                      className="mt-1 w-full rounded-lg border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/90 px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--gold-metallic)]/30"
                    />
                  </div>
                  <div className="sm:col-span-2 flex items-center justify-between gap-3">
                    <label className="inline-flex items-center gap-2 text-xs text-[var(--night-80)]/80">
                      <input
                        type="checkbox"
                        name="acceptTerms"
                        checked={signupForm.acceptTerms}
                        onChange={handleSignupChange}
                        required
                        className="accent-[var(--gold-dark)]"
                      />
                      J'accepte les conditions et la politique de confidentialité
                    </label>
                    <button
                      type="submit"
                      disabled={isLoading || !signupForm.acceptTerms}
                      className="btn-primary font-display tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Création...' : 'Créer mon compte'}
                    </button>
                  </div>
                </form>
              )}

              {activeTab === 'signin' && (
                <form id="panel-signin" role="tabpanel" aria-labelledby="tab-signin" onSubmit={handleSignin} className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5" noValidate>
                  {error && (
                    <div className="sm:col-span-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                      {error}
                    </div>
                  )}
                  <div className="sm:col-span-2">
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
                  <div className="sm:col-span-2">
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
                  <div className="sm:col-span-2 flex items-center justify-between gap-3">
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
                  <div className="sm:col-span-2 text-xs text-[var(--night-80)]/80 mt-1 inline-flex items-center gap-2">
                    <FiMail className="opacity-70" />
                    <a className="underline hover:text-[var(--gold-metallic)]" href="#">Mot de passe oublié ?</a>
                  </div>
                </form>
              )}
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


