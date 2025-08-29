
import { useReveal } from '../components/Hooks/useReveal'

export const CEOMessagePage = () => {
  // Reveal for hero
  const heroRef = useReveal<HTMLElement>()

  return (
  <div>
      {/* Hero: Compact Centered */}
      <section ref={heroRef} className="reveal py-34 sm:py-28">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <span className="kicker text-gradient-gold">Mot du Directeur Général</span>
          <h1 className="luxury-heading mt-3">Construire la confiance, créer la valeur</h1>
          <p className="luxury-subheading mt-5 pt-8">Lettre ouverte aux clients, partenaires et collaborateurs.</p>
        </div>
      </section>

      {/* Lettre du DG */}
      <section id="message">
        <div className="mx-auto max-w-4xl px-6">
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-[var(--gold-metallic-10)] blur-3xl opacity-30" />
            <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-3xl opacity-20" />
            
            {/* Main content card */}
            <div className="relative bg-[var(--pure-white)]/80 backdrop-blur-sm border border-[var(--gold-metallic)]/25 rounded-2xl p-8 sm:p-12 shadow-sm">
              <article className="prose prose-neutral max-w-none">
                {/* Avatar */}
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <img 
                      src="/Khady-diouf.png" 
                      alt="Khady Diouf - Directrice Générale" 
                      className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-[var(--gold-metallic)]/20 shadow-lg"
                    />
                  </div>
                </div>

                {/* Salutation */}
                <p className="text-secondary leading-relaxed text-lg font-medium">
                  Chères clientes, chers clients, partenaires et collaboratrices/collaborateurs,
                </p>
                
                {/* Main content with better spacing */}
                <div className="mt-8 space-y-6">
                  <p className="text-secondary leading-relaxed text-base">
                    Depuis 2013, Everest Finance SGI s'est construite autour d'une conviction simple: la confiance est le premier actif d'un investisseur. Notre rôle est de la mériter chaque jour par l'exigence, la transparence et l'exécution.
                  </p>
                  
                  <p className="text-secondary leading-relaxed text-base">
                    Dans un environnement de marché exigeant, nous privilégions une approche disciplinée, des analyses rigoureuses et une proximité concrète avec chacun d'entre vous. Qu'il s'agisse de gestion libre, assistée ou sous mandat, notre engagement est constant: vous donner les moyens de décider avec clarté et d'investir avec sérénité.
                  </p>
                  
                  <p className="text-secondary leading-relaxed text-base">
                    Nous croyons au potentiel durable des marchés de l'UEMOA et de la BRVM. En renforçant nos capacités technologiques, nos outils de recherche et notre gouvernance des risques, nous poursuivons un objectif: créer de la valeur utile, mesurable et responsable.
                  </p>
                  
                  <p className="text-secondary leading-relaxed text-base">
                    Je remercie nos équipes pour leur professionnalisme et nos partenaires pour leur confiance. À nos clients, je réaffirme notre promesse: une qualité d'exécution irréprochable, un accompagnement attentif et la sécurité de vos actifs au cœur de nos priorités.
                  </p>
                  
                  <p className="text-secondary leading-relaxed text-base">
                    Ensemble, continuons de bâtir une finance exigeante, utile et tournée vers l'avenir.
                  </p>
                </div>
                
                {/* Signature section */}
                <div className="mt-12 pt-8 border-t border-[var(--gold-metallic)]/20">
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div>
                      <div className="font-display text-[var(--night)] text-lg">La Direction Générale</div>
                      <div className="text-secondary text-sm mt-1">Everest Finance SGI — Dakar</div>
                    </div>
                    <div className="text-xs text-secondary">
                      <div>Licence CREPMF SGI/DA/2016/60</div>
                      <div>Membre de la BRVM</div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
    </section>
  </div>
  )
}


