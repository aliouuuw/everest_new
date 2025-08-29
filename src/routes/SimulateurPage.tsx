import { InvestmentCalculator } from '../components/Sections/InvestmentCalculator';

export const SimulateurPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[var(--pure-white)]">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[var(--gold-light)]/20 via-[var(--pure-white)] to-[var(--gold-light)]/10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center max-w-3xl mx-auto">
            <span className="kicker text-gradient-gold">Outil de simulation</span>
            <h1 className="luxury-heading mt-3">
              Simulateur d'investissement
            </h1>
            <p className="luxury-subheading mt-5 pt-8">
              Calculez vos projections financières et explorez le potentiel de vos investissements 
              avec nos différents services de gestion de portefeuille.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <InvestmentCalculator />

      {/* Additional Information Section */}
      <section className="py-16 bg-[var(--white-smoke)]/50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="luxury-heading text-3xl mb-6">
                Pourquoi utiliser notre simulateur ?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[var(--gold-metallic)] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg mb-2">Projections réalistes</h3>
                    <p className="text-secondary">
                      Basées sur des données historiques et des modèles financiers éprouvés
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[var(--gold-metallic)] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg mb-2">Comparaison des services</h3>
                    <p className="text-secondary">
                      Évaluez les différents niveaux de service et leurs impacts sur vos rendements
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[var(--gold-metallic)] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg mb-2">Planification personnalisée</h3>
                    <p className="text-secondary">
                      Adaptez vos paramètres selon vos objectifs et votre profil de risque
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[var(--pure-white)] rounded-2xl p-8 border border-[var(--gold-metallic)]/25 flex flex-col">
              <div className="flex-1">
                <h3 className="font-display text-xl mb-4">Besoin d'un conseil personnalisé ?</h3>
                <p className="text-secondary mb-6">
                  Nos experts en gestion de portefeuille sont disponibles pour vous accompagner 
                  dans la définition de votre stratégie d'investissement.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[var(--gold-metallic)] rounded-full"></div>
                    <span className="text-sm">Analyse de votre profil de risque</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[var(--gold-metallic)] rounded-full"></div>
                    <span className="text-sm">Recommandations personnalisées</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[var(--gold-metallic)] rounded-full"></div>
                    <span className="text-sm">Accompagnement continu</span>
                  </div>
                </div>
              </div>
              <a
                href="#contact"
                className="btn-primary font-display tracking-wide w-full text-center"
              >
                Prendre rendez-vous
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
