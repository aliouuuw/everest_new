import { useEffect, useState } from 'react';
import { FiTrendingUp } from 'react-icons/fi';
import { FaCalculator, FaChartLine } from 'react-icons/fa';
import { useReveal } from '../Hooks/useReveal';

interface CalculatorInputs {
  initialAmount: number;
  monthlyContribution: number;
  timeHorizon: number;
  expectedReturn: number;
  service: 'discretionary' | 'mandate' | 'assisted';
}

interface CalculatorResults {
  totalInvested: number;
  totalFees: number;
  projectedValue: number;
  totalReturn: number;
  netReturn: number;
}

const serviceFees = {
  discretionary: { min: 0.40, max: 0.60 },
  mandate: { min: 0.80, max: 1.20 },
  assisted: { min: 0.60, max: 0.80 }
};

const expectedReturns = {
  conservative: 0.05, // 5%
  moderate: 0.08,     // 8%
  aggressive: 0.12    // 12%
};

export const InvestmentCalculator: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>();

  const [inputs, setInputs] = useState<CalculatorInputs>({
    initialAmount: 1000000, // 1M F CFA
    monthlyContribution: 50000, // 50K F CFA
    timeHorizon: 5, // 5 years
    expectedReturn: 0.08, // 8%
    service: 'discretionary'
  });

  const [results, setResults] = useState<CalculatorResults>({
    totalInvested: 0,
    totalFees: 0,
    projectedValue: 0,
    totalReturn: 0,
    netReturn: 0
  });

  const [activeTab, setActiveTab] = useState<'calculator' | 'comparison'>('calculator');

  // Calculate investment results
  useEffect(() => {
    const calculateResults = () => {
      const { initialAmount, monthlyContribution, timeHorizon, expectedReturn, service } = inputs;

      // Calculate total invested
      const totalInvested = initialAmount + (monthlyContribution * timeHorizon * 12);

      // Calculate projected value with compound interest
      const monthlyRate = expectedReturn / 12;
      const totalMonths = timeHorizon * 12;

      let projectedValue = initialAmount * Math.pow(1 + monthlyRate, totalMonths);

      // Add monthly contributions with compound interest
      for (let month = 1; month <= totalMonths; month++) {
        projectedValue += monthlyContribution * Math.pow(1 + monthlyRate, totalMonths - month);
      }

      // Calculate fees (annual fee on projected value)
      const avgYearlyValue = (initialAmount + projectedValue) / 2;
      const feeRate = serviceFees[service].min / 100; // Use minimum fee for calculation
      const totalFees = avgYearlyValue * feeRate * timeHorizon;

      const totalReturn = projectedValue - totalInvested;
      const netReturn = totalReturn - totalFees;

      setResults({
        totalInvested,
        totalFees,
        projectedValue,
        totalReturn,
        netReturn
      });
    };

    calculateResults();
  }, [inputs]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  const handleInputChange = (field: keyof CalculatorInputs, value: string | number) => {
    setInputs(prev => ({
      ...prev,
      [field]: typeof value === 'string' ? parseFloat(value) || 0 : value
    }));
  };

  const getServiceFeeRange = (service: string) => {
    const fee = serviceFees[service as keyof typeof serviceFees];
    return `${fee.min}% - ${fee.max}%`;
  };

  const serviceComparison = [
    {
      service: 'discretionary',
      title: 'Gestion Libre',
      fee: getServiceFeeRange('discretionary'),
      features: ['Contrôle total', 'Exécution uniquement', 'Frais compétitifs']
    },
    {
      service: 'mandate',
      title: 'Gestion Sous-Mandat',
      fee: getServiceFeeRange('mandate'),
      features: ['Gestion complète', 'Reporting quotidien', 'Conseiller dédié']
    },
    {
      service: 'assisted',
      title: 'Gestion Assistée',
      fee: getServiceFeeRange('assisted'),
      features: ['Conseils personnalisés', 'Décisions partagées', 'Accompagnement']
    }
  ];

  return (
    <section ref={sectionRef} className="reveal py-14 sm:py-18 bg-[var(--pure-white)]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="kicker text-gradient-gold">Outil de simulation</span>
          <h2 className="luxury-heading mt-3">Calculez vos projections</h2>
          <p className="luxury-subheading mt-5 pt-8">
            Estimez le potentiel de vos investissements avec nos différents services de gestion
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-[var(--white-smoke)]/80 backdrop-blur-sm border border-[var(--gold-metallic)]/25 rounded-xl p-1">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-6 py-2 rounded-lg font-display text-sm transition-all ${
                activeTab === 'calculator'
                  ? 'bg-[var(--gold-metallic)] text-white shadow-lg'
                  : 'text-secondary hover:text-[var(--gold-dark)]'
              }`}
            >
              Calculateur
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-6 py-2 rounded-lg font-display text-sm transition-all ${
                activeTab === 'comparison'
                  ? 'bg-[var(--gold-metallic)] text-white shadow-lg'
                  : 'text-secondary hover:text-[var(--gold-dark)]'
              }`}
            >
              Comparaison
            </button>
          </div>
        </div>

        {activeTab === 'calculator' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calculator Inputs */}
            <div className="space-y-6">
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--white-smoke)]/80 backdrop-blur-sm p-6">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />

                <div className="flex items-center gap-3 mb-6">
                  <FaCalculator className="text-xl text-[var(--gold-dark)]" />
                  <h3 className="font-display text-lg">Paramètres d'investissement</h3>
                </div>

                {/* Service Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-secondary mb-3">
                    Service de gestion
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {serviceComparison.map((service) => (
                      <button
                        key={service.service}
                        onClick={() => handleInputChange('service', service.service)}
                        className={`p-3 rounded-xl border-2 text-left transition-all ${
                          inputs.service === service.service
                            ? 'border-[var(--gold-metallic)] bg-[var(--gold-light)]/10'
                            : 'border-[var(--gold-metallic)]/25 hover:border-[var(--gold-metallic)]/50'
                        }`}
                      >
                        <div className="font-display text-sm mb-1">{service.title}</div>
                        <div className="text-xs text-secondary">{service.fee} frais/an</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">
                      Investissement initial (F CFA)
                    </label>
                    <input
                      type="number"
                      value={inputs.initialAmount}
                      onChange={(e) => handleInputChange('initialAmount', e.target.value)}
                      className="w-full px-3 py-2 border border-[var(--gold-metallic)]/25 rounded-lg focus:border-[var(--gold-metallic)] focus:outline-none"
                      min="100000"
                      step="50000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">
                      Versement mensuel (F CFA)
                    </label>
                    <input
                      type="number"
                      value={inputs.monthlyContribution}
                      onChange={(e) => handleInputChange('monthlyContribution', e.target.value)}
                      className="w-full px-3 py-2 border border-[var(--gold-metallic)]/25 rounded-lg focus:border-[var(--gold-metallic)] focus:outline-none"
                      min="0"
                      step="5000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">
                      Horizon d'investissement (années)
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={inputs.timeHorizon}
                      onChange={(e) => handleInputChange('timeHorizon', e.target.value)}
                      className="w-full accent-[var(--gold-metallic)]"
                    />
                    <div className="flex justify-between text-xs text-secondary mt-1">
                      <span>1 an</span>
                      <span className="font-medium">{inputs.timeHorizon} ans</span>
                      <span>20 ans</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">
                      Rendement annuel attendu
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {Object.entries(expectedReturns).map(([key, value]) => (
                        <button
                          key={key}
                          onClick={() => handleInputChange('expectedReturn', value)}
                          className={`px-3 py-2 rounded-lg border text-sm transition-all ${
                            inputs.expectedReturn === value
                              ? 'border-[var(--gold-metallic)] bg-[var(--gold-light)]/10 text-[var(--gold-dark)]'
                              : 'border-[var(--gold-metallic)]/25 hover:border-[var(--gold-metallic)]/50'
                          }`}
                        >
                          {key === 'conservative' && 'Conservateur'}
                          {key === 'moderate' && 'Modéré'}
                          {key === 'aggressive' && 'Dynamique'}
                          <br />
                          <span className="text-xs">{formatPercentage(value)}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--white-smoke)]/80 backdrop-blur-sm p-6">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />

                <div className="flex items-center gap-3 mb-6">
                  <FiTrendingUp className="text-xl text-[var(--gold-dark)]" />
                  <h3 className="font-display text-lg">Projections estimées</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-[var(--gold-metallic)]/25">
                    <span className="text-secondary">Total investi</span>
                    <span className="font-display text-lg">{formatCurrency(results.totalInvested)}</span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-[var(--gold-metallic)]/25">
                    <span className="text-secondary">Frais estimés ({serviceFees[inputs.service].min}%)</span>
                    <span className="font-display text-lg text-red-600">-{formatCurrency(results.totalFees)}</span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b-2 border-[var(--gold-metallic)]/25">
                    <span className="text-secondary">Valeur projetée</span>
                    <span className="font-display text-xl text-green-600">{formatCurrency(results.projectedValue)}</span>
                  </div>

                  <div className="flex justify-between items-center py-3">
                    <span className="text-secondary">Gain net estimé</span>
                    <span className={`font-display text-lg ${
                      results.netReturn >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {formatCurrency(results.netReturn)}
                    </span>
                  </div>

                  <div className="mt-6 p-4 bg-[var(--gold-light)]/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <FaChartLine className="text-[var(--gold-dark)]" />
                      <span className="font-display text-sm">Rendement annuel moyen estimé</span>
                    </div>
                    <div className="text-2xl font-display text-[var(--gold-dark)]">
                      {formatPercentage(results.totalInvested > 0 ? results.netReturn / results.totalInvested / inputs.timeHorizon : 0)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-xs text-secondary mb-4">
                  * Ces projections sont estimatives et ne constituent pas une garantie de performance.
                  Les marchés financiers comportent des risques.
                </p>
                <a
                  href="#contact"
                  className="btn-primary font-display tracking-wide"
                >
                  Obtenir un conseil personnalisé
                </a>
              </div>
            </div>
          </div>
        ) : (
          /* Comparison Tab */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {serviceComparison.map((service) => (
              <div
                key={service.service}
                className={`group relative overflow-hidden rounded-2xl border-2 p-6 transition-all ${
                  inputs.service === service.service
                    ? 'border-[var(--gold-metallic)] bg-[var(--gold-light)]/10'
                    : 'border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm'
                }`}
              >
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />

                <div className="font-display text-lg mb-3">{service.title}</div>

                <div className="text-2xl font-display text-[var(--gold-dark)] mb-4">
                  {service.fee}
                </div>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-secondary">
                      <div className="w-1.5 h-1.5 bg-[var(--gold-metallic)] rounded-full flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => {
                    handleInputChange('service', service.service);
                    setActiveTab('calculator');
                  }}
                  className={`w-full py-2 px-4 rounded-lg font-display text-sm transition-all ${
                    inputs.service === service.service
                      ? 'btn-primary'
                      : 'btn-secondary'
                  }`}
                >
                  {inputs.service === service.service ? 'Sélectionné' : 'Essayer'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
