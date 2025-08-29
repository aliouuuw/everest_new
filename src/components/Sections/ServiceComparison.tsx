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
        currentService === service ? 'text-[var(--gold-dark)]' : 'text-[var(--night)]'
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
    <div className={`${variant === 'modal' ? 'p-6' : 'mx-auto max-w-6xl px-6'}`}>
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="kicker text-gradient-gold">Comparaison des services</span>
        <h2 className="luxury-heading mt-3">Choisissez le service qui vous convient</h2>
        <p className="luxury-subheading mt-5 pt-8">
          Comparez nos trois offres pour trouver celle qui correspond à votre style d'investissement et à vos besoins.
        </p>
      </div>

      {/* Mobile Cards View */}
      <div className="lg:hidden space-y-4">
        {['discretionary', 'mandate', 'assisted'].map((service) => (
          <div
            key={service}
            className={`relative overflow-hidden rounded-2xl border-2 p-6 transition-all ${
              currentService === service
                ? 'border-[var(--gold-metallic)] bg-[var(--gold-light)]/10'
                : 'border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              {getServiceIcon(service)}
              <h3 className="font-display text-lg">{getServiceTitle(service)}</h3>
              {currentService === service && (
                <span className="ml-auto text-xs bg-[var(--gold-metallic)] text-white px-2 py-1 rounded-full">
                  Votre choix
                </span>
              )}
            </div>

            <div className="space-y-3">
              {serviceFeatures.slice(0, 6).map((feature) => (
                <div key={feature.name} className="flex justify-between items-center py-2">
                  <span className="text-sm text-secondary">{feature.name}</span>
                  <div className="flex items-center">
                    {renderFeatureValue((feature as any)[service], service)}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--gold-metallic)]/25">
              <button
                className="btn-secondary font-display tracking-wide w-full text-center opacity-50 cursor-not-allowed"
                disabled
              >
                Service intégré
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left p-4 font-display text-lg border-b border-[var(--gold-metallic)]/25">
                Fonctionnalités
              </th>
              {['discretionary', 'mandate', 'assisted'].map((service) => (
                <th
                  key={service}
                  className={`p-4 text-center border-b border-[var(--gold-metallic)]/25 ${
                    currentService === service ? 'bg-[var(--gold-light)]/10' : ''
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    {getServiceIcon(service)}
                    <span className="font-display text-base">{getServiceTitle(service)}</span>
                    {currentService === service && (
                      <span className="text-xs bg-[var(--gold-metallic)] text-white px-2 py-1 rounded-full">
                        Votre choix
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {serviceFeatures.map((feature, index) => (
              <tr
                key={feature.name}
                className={index % 2 === 0 ? 'bg-[var(--white-smoke)]/50' : ''}
              >
                <td className="p-4 font-medium text-[var(--night)] border-b border-[var(--gold-metallic)]/10">
                  {feature.name}
                </td>
                {['discretionary', 'mandate', 'assisted'].map((service) => (
                  <td
                    key={service}
                    className={`p-4 text-center border-b border-[var(--gold-metallic)]/10 ${
                      currentService === service ? 'bg-[var(--gold-light)]/5' : ''
                    }`}
                  >
                    {renderFeatureValue((feature as any)[service], service)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Legend */}
      <div className="mt-8 p-4 bg-[var(--white-smoke)]/80 rounded-xl border border-[var(--gold-metallic)]/25">
        <div className="flex items-start gap-2">
          <FiInfo className="text-[var(--gold-dark)] mt-0.5 flex-shrink-0" />
          <div className="text-sm text-secondary">
            <p className="font-medium text-[var(--night)] mb-1">Note importante:</p>
            <p>Les frais indiqués sont des fourchettes approximatives. Le montant exact dépend de votre profil d'investissement et du montant géré. Contactez-nous pour un devis personnalisé.</p>
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
          className="btn-secondary font-display tracking-wide flex items-center gap-2"
        >
          <FiInfo className="text-sm" />
          Comparer les services
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
              <div className="sticky top-0 flex items-center justify-between p-6 border-b border-[var(--gold-metallic)]/25 bg-white/95 backdrop-blur-sm">
                <h3 className="font-display text-xl">Comparaison des services</h3>
                <button
                  onClick={handleModalToggle}
                  className="p-2 hover:bg-[var(--gold-light)]/10 rounded-lg transition-colors"
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
    <section ref={sectionRef} className="reveal py-14 sm:py-18 bg-[var(--pure-white)]">
      {content}
    </section>
  );
};
