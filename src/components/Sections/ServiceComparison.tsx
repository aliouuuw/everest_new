import { useState } from 'react';
import { FiCheck, FiHeadphones, FiInfo, FiShield, FiTrendingUp, FiX } from 'react-icons/fi';
import { useReveal } from '../Hooks/useReveal';

interface ServiceFeature {
  name: string;
  discretionary: boolean | string;
  mandate: boolean | string;
  assisted: boolean | string;
}

const serviceFeatures: Array<ServiceFeature> = [
  {
    name: 'Contrôle des décisions',
    discretionary: '100% vous',
    mandate: 'Délégation partielle',
    assisted: 'Vous avec conseils'
  },
  {
    name: 'Niveau d\'intervention',
    discretionary: 'Exécution uniquement',
    mandate: 'Gestion complète',
    assisted: 'Accompagnement'
  },
  {
    name: 'Horizon minimum',
    discretionary: 'Aucun',
    mandate: '1 an',
    assisted: 'Aucun'
  },
  {
    name: 'Frais de gestion',
    discretionary: '0,40% - 0,60%',
    mandate: '0,80% - 1,20%',
    assisted: '0,60% - 0,80%'
  },
  {
    name: 'Montant minimum',
    discretionary: '100 000 F CFA',
    mandate: '500 000 F CFA',
    assisted: '250 000 F CFA'
  },
  {
    name: 'Reporting',
    discretionary: 'Mensuel',
    mandate: 'Quotidien',
    assisted: 'Hebdomadaire'
  },
  {
    name: 'Conseiller dédié',
    discretionary: false,
    mandate: true,
    assisted: true
  },
  {
    name: 'Alertes personnalisées',
    discretionary: false,
    mandate: true,
    assisted: true
  },
  {
    name: 'Accès plateforme 24/7',
    discretionary: true,
    mandate: true,
    assisted: true
  },
  {
    name: 'Support téléphonique',
    discretionary: false,
    mandate: true,
    assisted: true
  }
];

interface ServiceComparisonProps {
  currentService?: 'discretionary' | 'mandate' | 'assisted';
  variant?: 'section' | 'modal';
  onClose?: () => void;
}

export const ServiceComparison: React.FC<ServiceComparisonProps> = ({
  currentService,
  variant = 'section',
  onClose
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useReveal<HTMLElement>();

  const handleModalToggle = () => {
    if (variant === 'modal') {
      setIsModalOpen(!isModalOpen);
      if (onClose) onClose();
    }
  };

  const renderFeatureValue = (value: boolean | string, service: string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <FiCheck className="text-green-600 mx-auto text-xl" />
      ) : (
        <FiX className="text-red-400 mx-auto text-xl" />
      );
    }
    return (
      <span className={`text-sm font-bold ${
        currentService === service ? 'text-[var(--mauve)]' : 'text-[var(--night)]'
      }`}>
        {value}
      </span>
    );
  };

  const getServiceIcon = (service: string) => {
    switch (service) {
      case 'discretionary':
        return <FiTrendingUp className="text-xl" />;
      case 'mandate':
        return <FiShield className="text-xl" />;
      case 'assisted':
        return <FiHeadphones className="text-xl" />;
      default:
        return null;
    }
  };

  const getServiceTitle = (service: string) => {
    switch (service) {
      case 'discretionary':
        return 'Gestion libre';
      case 'mandate':
        return 'Gestion sous-mandat';
      case 'assisted':
        return 'Gestion assistée';
      default:
        return '';
    }
  };

  const content = (
    <div className={`${variant === 'modal' ? 'p-6' : 'mx-auto max-w-[1600px] px-6 md:px-12'}`}>
      <div className="mb-20 text-center">
        <span className="px-4 py-1.5 rounded-full bg-[var(--mauve-10)] text-[10px] font-bold tracking-[0.3em] text-[var(--mauve)] uppercase inline-block mb-8">Comparaison des services</span>
        <h2 className="font-primary font-bold text-4xl md:text-6xl leading-[1.05] max-w-3xl mx-auto">
          Choisissez le service qui vous convient.
        </h2>
      </div>

      {/* Mobile Cards View */}
      <div className="lg:hidden space-y-8">
        {['discretionary', 'mandate', 'assisted'].map((service) => (
          <div
            key={service}
            className={`border rounded-2xl p-6 ${
              currentService === service
                ? 'border-[var(--mauve)] bg-[var(--mauve-10)]'
                : 'border-black/10 bg-white'
            }`}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${currentService === service ? 'bg-[var(--mauve)] text-white' : 'bg-[var(--white-smoke)] text-[var(--night)]'}`}>
                {getServiceIcon(service)}
              </div>
              <h3 className="font-primary font-bold text-xl">{getServiceTitle(service)}</h3>
              {currentService === service && (
                <span className="ml-auto text-[10px] font-bold tracking-[0.2em] uppercase bg-[var(--mauve)] text-white px-3 py-1 rounded-full">
                  Actif
                </span>
              )}
            </div>

            <div className="space-y-4 border-t border-black/10 pt-4">
              {serviceFeatures.slice(0, 6).map((feature) => (
                <div key={feature.name} className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-[rgba(10,10,10,0.6)]">{feature.name}</span>
                  <div className="flex items-center">
                    {renderFeatureValue((feature as any)[service], service)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-3xl border border-[var(--mauve)]/10 overflow-hidden shadow-sm">
        <div>
          {/* Table Header */}
          <div className="grid grid-cols-4 border-b border-[var(--mauve)]/10 bg-[var(--white-smoke)]/50">
            <div className="p-8 font-primary font-bold text-lg text-[var(--night)] flex items-end">
              Fonctionnalités
            </div>
            {['discretionary', 'mandate', 'assisted'].map((service) => (
              <div
                key={service}
                className={`p-8 text-center border-l border-[var(--mauve)]/5 relative ${
                  currentService === service ? 'bg-[var(--mauve)]/5' : ''
                }`}
              >
                {currentService === service && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--mauve)]" />
                )}
                <div className="flex flex-col items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${currentService === service ? 'bg-[var(--mauve)] text-white' : 'bg-[var(--white-smoke)] text-[var(--night)]'}`}>
                    {getServiceIcon(service)}
                  </div>
                  <span className="font-primary font-bold text-xl">{getServiceTitle(service)}</span>
                  {currentService === service && (
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase bg-[var(--mauve)] text-white px-4 py-1.5 rounded-full">
                      Actif
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Table Body */}
          {serviceFeatures.map((feature, index) => (
            <div
              key={feature.name}
              className={`grid grid-cols-4 border-b border-[var(--mauve)]/5 last:border-0 hover:bg-[var(--white-smoke)]/30 transition-colors ${
                index % 2 === 0 ? 'bg-[var(--white-smoke)]/10' : ''
              }`}
            >
              <div className="p-6 px-8 font-medium text-[var(--night-80)] flex items-center">
                {feature.name}
              </div>
              {['discretionary', 'mandate', 'assisted'].map((service) => (
                <div
                  key={service}
                  className={`p-6 border-l border-[var(--mauve)]/5 text-center flex items-center justify-center ${
                    currentService === service ? 'bg-[var(--mauve)]/5' : ''
                  }`}
                >
                  {renderFeatureValue((feature as any)[service], service)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-12 p-6 rounded-2xl border border-[var(--mauve)]/10 bg-[var(--white-smoke)]">
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 rounded-full bg-[var(--jaune-or)]/20 flex items-center justify-center shrink-0">
            <FiInfo className="text-[var(--jaune-or)] text-lg" />
          </div>
          <div className="text-sm text-[rgba(10,10,10,0.8)] pt-1.5">
            <p className="font-primary font-bold text-[var(--night)] mb-2">Note importante :</p>
            <p className="font-light leading-relaxed">Les frais indiqués sont des fourchettes approximatives. Le montant exact dépend de votre profil d'investissement et du montant géré. Contactez-nous pour un devis personnalisé.</p>
          </div>
        </div>
      </div>
    </div>
  );

  if (variant === 'modal') {
    return (
      <>
        <button
          onClick={handleModalToggle}
          className="btn-secondary font-primary font-bold tracking-wide flex items-center gap-2 rounded-full"
        >
          <FiInfo className="text-sm" />
          Comparer les services
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl">
              <div className="sticky top-0 flex items-center justify-between p-6 border-b border-[var(--mauve)]/10 bg-white/95 backdrop-blur-md z-20">
                <h3 className="font-primary font-bold text-xl">Comparaison des services</h3>
                <button
                  onClick={handleModalToggle}
                  className="p-2 hover:bg-[var(--mauve)]/10 hover:text-[var(--mauve)] rounded-full transition-colors"
                >
                  <FiX className="text-xl" />
                </button>
              </div>
              <div className="py-8">
                {content}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <section ref={sectionRef} className="reveal py-24 md:py-40 bg-[var(--pure-white)] font-primary">
      {content}
    </section>
  );
};
