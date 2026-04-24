
import { FiArrowRight } from 'react-icons/fi'
import { useReveal } from '../components/Hooks/useReveal'

export const CEOMessagePage = () => {
  const heroRef = useReveal<HTMLElement>()

  return (
    <div className="bg-[var(--pure-white)] text-[var(--night)] font-primary">
        {/* ─── 1. Hero — Dark Image with Overlay ─── */}
        <section ref={heroRef} className="reveal relative min-h-[55vh] flex items-end pb-16 pt-24 overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/Assets_Website/dmc.png"
              alt="Leadership Everest Finance"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 w-full page-container">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-end">
              <div className="md:col-span-7">
                <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--jaune-or)]/15 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-[var(--jaune-or)] mb-6">
                  Mot du Directeur Général
                </span>
                <h1 className="font-primary font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-5 text-white">
                  Construire la confiance, créer la valeur.
                </h1>
              </div>

              <div className="md:col-span-5 pb-2">
                <p className="text-base md:text-lg leading-relaxed text-white/65 font-light mb-8">
                  Lettre ouverte aux clients, partenaires et collaborateurs d'Everest Finance.
                </p>
                <a
                  href="#message"
                  className="group inline-flex items-center justify-center gap-3 px-7 py-3 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:opacity-90"
                  style={{ background: 'var(--jaune-or)', color: 'var(--pure-white)' }}
                >
                  <span>Lire la lettre</span>
                  <FiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. Message — Editorial Layout ─── */}
        <section id="message" className="py-24 md:py-40">
          <div className="page-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              <div className="lg:col-span-4">
                <div className="sticky top-32 flex flex-col border-t border-black/10 pt-8">
                  <div className="relative w-48 h-48 mb-6 overflow-hidden rounded-2xl grayscale contrast-125">
                    <img 
                      src="/Khady-diouf.png" 
                      alt="Khady Diouf - Directrice Générale" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-primary font-bold text-2xl mb-2 text-[var(--night)]">Khady Diouf</h3>
                  <p className="text-[10px] font-bold tracking-[0.3em] text-[var(--mauve)] uppercase mb-8">Directrice Générale</p>
                  
                  <div className="space-y-4 pt-8 border-t border-black/10">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[rgba(10,10,10,0.6)]">Licence</span>
                      <span className="font-primary font-bold">AMF-UMOA SGI/DA/2016/60</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[rgba(10,10,10,0.6)]">Membre</span>
                      <span className="font-primary font-bold">BRVM</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-8">
                <div className="prose prose-lg prose-neutral max-w-3xl">
                  <p className="text-2xl md:text-3xl leading-relaxed font-primary font-bold text-[var(--night)] mb-12">
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


