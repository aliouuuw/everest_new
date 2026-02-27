
import { FiArrowRight } from 'react-icons/fi'
import { useReveal } from '../components/Hooks/useReveal'

export const CEOMessagePage = () => {
  const heroRef = useReveal<HTMLElement>()

  return (
    <div className="bg-[var(--pure-white)] text-[var(--night)]">
        {/* ─── 1. Hero — Editorial & Asymmetrical ─── */}
        <section ref={heroRef} className="reveal relative min-h-[60vh] flex items-end pb-20 pt-40 border-b border-black/10">
          <div className="absolute top-0 right-0 w-full md:w-1/2 h-full z-0 overflow-hidden bg-[var(--white-smoke)]">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `linear-gradient(var(--night-10) 1px, transparent 1px), linear-gradient(90deg, var(--night-10) 1px, transparent 1px)`, backgroundSize: '64px 64px' }} />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--pure-white)] via-[var(--pure-white)]/80 to-transparent" />
          </div>

          <div className="relative z-10 w-full px-6 md:px-12 mx-auto max-w-[1600px]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-end">
              <div className="md:col-span-8">
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-12 h-px bg-[var(--jaune-or)]" />
                  <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-[var(--jaune-or)]">
                    Mot du Directeur Général
                  </span>
                </div>
                <h1 className="font-display-aptos text-5xl md:text-7xl lg:text-[6.5rem] leading-[0.95] tracking-tight mb-8">
                  Construire la confiance, créer la valeur.
                </h1>
              </div>
              
              <div className="md:col-span-4 pb-4">
                <p className="text-lg md:text-xl leading-relaxed text-[rgba(10, 10, 10, 0.8)] font-light mb-10 border-l border-[var(--jaune-or)] pl-6">
                  Lettre ouverte aux clients, partenaires et collaborateurs d'Everest Finance.
                </p>
                <a href="#message" className="btn-primary group inline-flex items-center justify-center gap-4 px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all mt-4 w-fit">
                  <span>Lire la lettre</span>
                  <FiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. Message — Editorial Layout ─── */}
        <section id="message" className="py-24 md:py-40">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              <div className="lg:col-span-4">
                <div className="sticky top-32 flex flex-col border-t border-black/10 pt-8">
                  <div className="relative w-48 h-48 mb-6 overflow-hidden grayscale contrast-125">
                    <img 
                      src="/Khady-diouf.png" 
                      alt="Khady Diouf - Directrice Générale" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-display-aptos text-2xl mb-2 text-[var(--night)]">Khady Diouf</h3>
                  <p className="text-[10px] font-bold tracking-[0.3em] text-[var(--jaune-or)] uppercase mb-8">Directrice Générale</p>
                  
                  <div className="space-y-4 pt-8 border-t border-black/10">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[rgba(10,10,10,0.6)]">Licence</span>
                      <span className="font-display-aptos">CREPMF SGI/DA/2016/60</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[rgba(10,10,10,0.6)]">Membre</span>
                      <span className="font-display-aptos">BRVM</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-8">
                <div className="prose prose-lg prose-neutral max-w-3xl">
                  <p className="text-2xl md:text-3xl leading-relaxed font-display-aptos text-[var(--night)] mb-12">
                    Chères clientes, chers clients, partenaires et collaboratrices/collaborateurs,
                  </p>
                  
                  <div className="space-y-8 text-lg font-light text-[rgba(10,10,10,0.8)] leading-relaxed">
                    <p>
                      Depuis 2013, Everest Finance SGI s'est construite autour d'une conviction simple: la confiance est le premier actif d'un investisseur. Notre rôle est de la mériter chaque jour par l'exigence, la transparence et l'exécution.
                    </p>
                    
                    <p>
                      Dans un environnement de marché exigeant, nous privilégions une approche disciplinée, des analyses rigoureuses et une proximité concrète avec chacun d'entre vous. Qu'il s'agisse de gestion libre, assistée ou sous mandat, notre engagement est constant: vous donner les moyens de décider avec clarté et d'investir avec sérénité.
                    </p>
                    
                    <p>
                      Nous croyons au potentiel durable des marchés de l'UEMOA et de la BRVM. En renforçant nos capacités technologiques, nos outils de recherche et notre gouvernance des risques, nous poursuivons un objectif: créer de la valeur utile, mesurable et responsable.
                    </p>
                    
                    <p>
                      Je remercie nos équipes pour leur professionnalisme et nos partenaires pour leur confiance. À nos clients, je réaffirme notre promesse: une qualité d'exécution irréprochable, un accompagnement attentif et la sécurité de vos actifs au cœur de nos priorités.
                    </p>
                    
                    <p className="text-[var(--night)] font-medium text-xl pt-8 border-t border-black/10">
                      Ensemble, continuons de bâtir une finance exigeante, utile et tournée vers l'avenir.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}


