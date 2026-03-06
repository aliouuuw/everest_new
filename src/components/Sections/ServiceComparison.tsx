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
        <FiCheck className="text-green-600 mx-auto" />
      ) : (
        <FiX className="text-red-400 mx-auto" />
      );
    }
    return (
      <span className={`text-sm font-medium ${
        currentService === service ? 'text-[var(--jaune-or)]' : 'text-[var(--night)]'
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
      <div className="mb-20">
        <span className="text-[10px] font-bold tracking-[0.3em] text-[var(--jaune-or)] uppercase block mb-8">Comparaison des services</span>
        <h2 className="font-display-aptos text-4xl md:text-6xl leading-[1.05] max-w-3xl">
          Choisissez le service qui vous convient.
        </h2>
      </div>

      {/* Mobile Cards View */}
      <div className="lg:hidden space-y-8">
        {['discretionary', 'mandate', 'assisted'].map((service) => (
          <div
            key={service}
            className={`border p-6 ${
              currentService === service
                ? 'border-[var(--jaune-or)] bg-[var(--jaune-or)]/5'
                : 'border-black/10'
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              {getServiceIcon(service)}
              <h3 className="font-display-aptos text-xl">{getServiceTitle(service)}</h3>
              {currentService === service && (
                <span className="ml-auto text-[10px] font-bold tracking-[0.2em] uppercase bg-[var(--night)] text-white px-3 py-1">
                  Actif
                </span>
              )}
            </div>

            <div className="space-y-4 border-t border-black/10 pt-4">
              {serviceFeatures.slice(0, 6).map((feature) => (
                <div key={feature.name} className="flex justify-between items-center py-2">
                  <span className="text-sm text-[rgba(10,10,10,0.6)]">{feature.name}</span>
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
      <div className="hidden lg:block">
        <div className="border-t border-black/10">
          {/* Table Header */}
          <div className="grid grid-cols-4 border-b border-black/10">
            <div className="p-6 font-display-aptos text-lg text-[var(--night)]">
              Fonctionnalités
            </div>
            {['discretionary', 'mandate', 'assisted'].map((service) => (
              <div
                key={service}
                className={`p-6 text-center ${
                  currentService === service ? 'bg-[var(--jaune-or)]/5' : ''
                }`}
              >
                <div className="flex flex-col items-center gap-3">
                  {getServiceIcon(service)}
                  <span className="font-display-aptos text-base">{getServiceTitle(service)}</span>
                  {currentService === service && (
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase bg-[var(--night)] text-white px-3 py-1">
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
              className="grid grid-cols-4 border-b border-black/10"
              style={{ background: index % 2 === 0 ? 'rgba(70,29,76,0.03)' : '' }}
            >
              <div className="p-6 font-medium text-[var(--night)]">
                {feature.name}
              </div>
              {['discretionary', 'mandate', 'assisted'].map((service) => (
                <div
                  key={service}
                  className={`p-6 text-center ${
                    currentService === service ? 'bg-[var(--jaune-or)]/5' : ''
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
      <div className="mt-12 p-6 border border-black/10" style={{ background: 'rgba(70,29,76,0.03)' }}>
        <div className="flex items-start gap-3">
          <FiInfo className="text-[var(--jaune-or)] mt-0.5 flex-shrink-0" />
          <div className="text-sm text-[rgba(10,10,10,0.8)]">
            <p className="font-display-aptos text-[var(--night)] mb-2">Note importante:</p>
            <p className="font-light">Les frais indiqués sont des fourchettes approximatives. Le montant exact dépend de votre profil d'investissement et du montant géré. Contactez-nous pour un devis personnalisé.</p>
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
          className="btn-secondary font-display-aptos tracking-wide flex items-center gap-2"
        >
          <FiInfo className="text-sm" />
          Comparer les services
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
              <div className="sticky top-0 flex items-center justify-between p-6 border-b border-[var(--jaune-or)]/25 bg-white/95 backdrop-blur-sm">
                <h3 className="font-display-aptos text-xl">Comparaison des services</h3>
                <button
                  onClick={handleModalToggle}
                  className="p-2 hover:bg-[var(--jaune-or-light)]/10 rounded-lg transition-colors"
                >
                  <FiX className="text-xl" />
                </button>
              </div>
              {content}
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <section ref={sectionRef} className="reveal py-24 md:py-40 bg-[var(--pure-white)]">
      {content}
    </section>
  );
};
