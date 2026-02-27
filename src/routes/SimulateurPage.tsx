import { FiArrowRight, FiArrowDown } from 'react-icons/fi';
import { InvestmentCalculator } from '../components/Sections/InvestmentCalculator';

export const SimulateurPage: React.FC = () => {
  return (
    <div className="bg-[var(--pure-white)] text-[var(--night)]">
      {/* ─── 1. Hero — Editorial & Asymmetrical ─── */}
      <section className="reveal relative flex items-end pb-20 pt-40 border-b border-black/10 min-h-[60vh]">
        <div className="absolute top-0 right-0 w-full md:w-2/3 h-[70vh] z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1600&q=80"
            alt="Calculs financiers"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--pure-white)] via-[var(--pure-white)]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--pure-white)] via-transparent to-transparent" />
        </div>
        <div className="relative z-10 w-full px-6 md:px-12 mx-auto max-w-[1600px]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-end">
            <div className="md:col-span-8">
              <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-px bg-[var(--jaune-or)]" />
                <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-[var(--jaune-or)]">
                  Outil de simulation
                </span>
              </div>
              <h1 className="font-display-aptos text-5xl md:text-7xl lg:text-[6.5rem] leading-[0.95] tracking-tight mb-8">
                Simulateur d'investissement.
              </h1>
            </div>
            
            <div className="md:col-span-4 pb-4">
              <p className="text-lg md:text-xl leading-relaxed text-[rgba(10, 10, 10, 0.8)] font-light mb-10 border-l border-[var(--jaune-or)] pl-6">
                Calculez vos projections financières et explorez le potentiel de vos investissements.
              </p>
              <a href="#simulateur" className="btn-primary group inline-flex items-center justify-center gap-4 px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all mt-4 w-fit">
                <span>Démarrer la simulation</span>
                <FiArrowDown className="text-lg group-hover:translate-y-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. Calculator Section ─── */}
      <div id="simulateur" className="border-b border-black/10">
        <InvestmentCalculator />
      </div>

      {/* ─── 3. Additional Information — Editorial Layout ─── */}
      <section className="py-24 md:py-40">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-5">
              <span className="text-[10px] font-bold tracking-[0.3em] text-[var(--jaune-or)] uppercase block mb-8">Avantages</span>
              <h2 className="font-display-aptos text-4xl md:text-6xl leading-[1.05] mb-8">
                Pourquoi utiliser notre simulateur ?
              </h2>
            </div>
            
            <div className="lg:col-span-7">
              <div className="border-t border-black/10">
                <div className="group py-10 border-b border-black/10 flex flex-col md:flex-row gap-6 md:gap-12">
                  <div className="font-display-aptos text-2xl text-[var(--jaune-or)]/50 shrink-0">01.</div>
                  <div>
                    <h3 className="font-display-aptos text-2xl md:text-3xl mb-4 group-hover:text-[var(--jaune-or)] transition-colors">
                      Projections réalistes
                    </h3>
                    <p className="text-[rgba(10, 10, 10, 0.8)] leading-relaxed text-lg font-light">
                      Basées sur des données historiques et des modèles financiers éprouvés.
                    </p>
                  </div>
                </div>
                
                <div className="group py-10 border-b border-black/10 flex flex-col md:flex-row gap-6 md:gap-12">
                  <div className="font-display-aptos text-2xl text-[var(--jaune-or)]/50 shrink-0">02.</div>
                  <div>
                    <h3 className="font-display-aptos text-2xl md:text-3xl mb-4 group-hover:text-[var(--jaune-or)] transition-colors">
                      Comparaison des services
                    </h3>
                    <p className="text-[rgba(10, 10, 10, 0.8)] leading-relaxed text-lg font-light">
                      Évaluez les différents niveaux de service et leurs impacts sur vos rendements.
                    </p>
                  </div>
                </div>
                
                <div className="group py-10 border-b border-black/10 flex flex-col md:flex-row gap-6 md:gap-12">
                  <div className="font-display-aptos text-2xl text-[var(--jaune-or)]/50 shrink-0">03.</div>
                  <div>
                    <h3 className="font-display-aptos text-2xl md:text-3xl mb-4 group-hover:text-[var(--jaune-or)] transition-colors">
                      Planification personnalisée
                    </h3>
                    <p className="text-[rgba(10, 10, 10, 0.8)] leading-relaxed text-lg font-light">
                      Adaptez vos paramètres selon vos objectifs et votre profil de risque.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. CTA — Editorial Footer Block ─── */}
      <section className="bg-[var(--night)] text-white py-24 md:py-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
            <div className="md:col-span-7">
              <h2 className="font-display-aptos text-5xl md:text-7xl leading-[1.05] mb-6">
                Besoin d'un conseil personnalisé ?
              </h2>
              <p className="text-xl md:text-2xl text-white/60 font-light max-w-2xl mb-8">
                Nos experts en gestion de portefeuille sont disponibles pour vous accompagner dans la définition de votre stratégie d'investissement.
              </p>
              <ul className="space-y-3 text-white/50">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[var(--jaune-or)] rounded-none" />
                  Analyse de votre profil de risque
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[var(--jaune-or)] rounded-none" />
                  Recommandations personnalisées
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[var(--jaune-or)] rounded-none" />
                  Accompagnement continu
                </li>
              </ul>
            </div>
            <div className="md:col-span-5 flex flex-col sm:flex-row gap-6 md:justify-end">
              <a href="/contact" className="btn-primary-dark inline-flex items-center justify-center gap-4 px-10 py-5 text-xs uppercase tracking-[0.2em] font-bold w-fit">
                Prendre rendez-vous <FiArrowRight className="text-lg" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
