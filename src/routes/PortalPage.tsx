import { useState } from 'react'
import { FiLock, FiMail, FiStar, FiTrendingUp, FiZap } from 'react-icons/fi'

import { useReveal } from '../components/Hooks/useReveal'

export const PortalPage = () => {
  const heroRef = useReveal<HTMLElement>()
  const formSectionRef = useReveal<HTMLElement>()
  const formCardRef = useReveal<HTMLDivElement>()
  const benefitsSectionRef = useReveal<HTMLElement>()
  const benefitsGridRef = useReveal<HTMLDivElement>()
  const [activeTab, setActiveTab] = useState<'signup' | 'signin'>('signup')

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
              <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
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
                  aria-selected={activeTab === 'signup'}
                  aria-controls="panel-signup"
                  id="tab-signup"
                  onClick={() => setActiveTab('signup')}
                  className={`px-4 py-2 rounded-md font-display text-sm transition-colors ${activeTab === 'signup' ? 'bg-[var(--pure-white)] text-[var(--night)]' : 'text-[var(--night-80)]/80 hover:text-[var(--night)]'}`}
                >
                  Inscription
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'signin'}
                  aria-controls="panel-signin"
                  id="tab-signin"
                  onClick={() => setActiveTab('signin')}
                  className={`px-4 py-2 rounded-md font-display text-sm transition-colors ${activeTab === 'signin' ? 'bg-[var(--pure-white)] text-[var(--night)]' : 'text-[var(--night-80)]/80 hover:text-[var(--night)]'}`}
                >
                  Connexion
                </button>
              </div>

              {/* Panels */}
              {activeTab === 'signup' && (
                <form id="panel-signup" role="tabpanel" aria-labelledby="tab-signup" className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5" noValidate>
                  <div>
                    <label htmlFor="prenom" className="text-xs font-medium text-[var(--night-80)]/80">Prénom</label>
                    <input id="prenom" name="prenom" required className="mt-1 w-full rounded-lg border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/90 px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--gold-metallic)]/30" />
                  </div>
                  <div>
                    <label htmlFor="nom" className="text-xs font-medium text-[var(--night-80)]/80">Nom</label>
                    <input id="nom" name="nom" required className="mt-1 w-full rounded-lg border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/90 px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--gold-metallic)]/30" />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-xs font-medium text-[var(--night-80)]/80">Email</label>
                    <input id="email" type="email" name="email" required className="mt-1 w-full rounded-lg border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/90 px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--gold-metallic)]/30" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="text-xs font-medium text-[var(--night-80)]/80">Téléphone</label>
                    <input id="phone" name="phone" inputMode="tel" className="mt-1 w-full rounded-lg border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/90 px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--gold-metallic)]/30" />
                  </div>
                  <div>
                    <label htmlFor="pays" className="text-xs font-medium text-[var(--night-80)]/80">Pays</label>
                    <input id="pays" name="pays" className="mt-1 w-full rounded-lg border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/90 px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--gold-metallic)]/30" />
                  </div>
                  <div>
                    <label htmlFor="type" className="text-xs font-medium text-[var(--night-80)]/80">Type de compte</label>
                    <select id="type" name="type" className="mt-1 w-full rounded-lg border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/90 px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--gold-metallic)]/30">
                      <option>Particulier</option>
                      <option>Entreprise</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="text-xs font-medium text-[var(--night-80)]/80">Message (optionnel)</label>
                    <textarea id="message" name="message" rows={4} className="mt-1 w-full rounded-lg border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/90 px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--gold-metallic)]/30" />
                  </div>
                  <div className="sm:col-span-2 flex items-center justify-between gap-3">
                    <label className="inline-flex items-center gap-2 text-xs text-[var(--night-80)]/80">
                      <input type="checkbox" required className="accent-[var(--gold-dark)]" />
                      J’accepte les conditions et la politique de confidentialité
                    </label>
                    <button type="submit" className="btn-primary font-display tracking-wide">Créer mon compte</button>
                  </div>
                </form>
              )}

              {activeTab === 'signin' && (
                <form id="panel-signin" role="tabpanel" aria-labelledby="tab-signin" className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5" noValidate>
                  <div className="sm:col-span-2">
                    <label htmlFor="email-login" className="text-xs font-medium text-[var(--night-80)]/80">Email</label>
                    <input id="email-login" type="email" name="email" required className="mt-1 w-full rounded-lg border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/90 px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--gold-metallic)]/30" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="password-login" className="text-xs font-medium text-[var(--night-80)]/80">Mot de passe</label>
                    <input id="password-login" type="password" name="password" required className="mt-1 w-full rounded-lg border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/90 px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--gold-metallic)]/30" />
                  </div>
                  <div className="sm:col-span-2 flex items-center justify-between gap-3">
                    <label className="inline-flex items-center gap-2 text-xs text-[var(--night-80)]/80">
                      <input type="checkbox" className="accent-[var(--gold-dark)]" />
                      Se souvenir de moi
                    </label>
                    <button type="submit" className="btn-primary font-display tracking-wide">Se connecter</button>
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


