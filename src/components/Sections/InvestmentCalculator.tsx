import { useEffect, useState } from 'react';
import { FiTrendingUp } from 'react-icons/fi';
import { FaCalculator } from 'react-icons/fa';
import { useReveal } from '../Hooks/useReveal';
import { useCounter } from '../Hooks/useCounter';

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

interface InvestmentCalculatorProps {
  calculatorOnly?: boolean;
}

export const InvestmentCalculator: React.FC<InvestmentCalculatorProps> = ({ calculatorOnly = false }) => {
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
  const [countersTriggered, setCountersTriggered] = useState(false);

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

  // Counter animations for results
  const totalInvestedCounter = useCounter(formatCurrency(results.totalInvested), { startOnMount: false, trigger: countersTriggered });
  const totalFeesCounter = useCounter(formatCurrency(results.totalFees), { startOnMount: false, trigger: countersTriggered });
  const projectedValueCounter = useCounter(formatCurrency(results.projectedValue), { startOnMount: false, trigger: countersTriggered });
  const netReturnCounter = useCounter(formatCurrency(results.netReturn), { startOnMount: false, trigger: countersTriggered });
  const avgReturnCounter = useCounter(formatPercentage(results.totalInvested > 0 ? results.netReturn / results.totalInvested / inputs.timeHorizon : 0), { startOnMount: false, trigger: countersTriggered });

  // Trigger counters when results section is revealed
  useEffect(() => {
    if (sectionRef.current && !countersTriggered && results.totalInvested > 0) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setCountersTriggered(true);
            observer.disconnect();
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(sectionRef.current);
      return () => observer.disconnect();
    }
  }, [sectionRef, countersTriggered, results.totalInvested]);

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
    <section ref={sectionRef} className="reveal py-24 bg-[var(--night)] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(202,148,47,0.05)_0%,rgba(15,17,21,0)_70%)]" />
      
      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="kicker text-[var(--gold-metallic)] tracking-[0.3em] uppercase">Outil de simulation</span>
          <h2 className="luxury-heading-dark mt-4">Calculez vos projections</h2>
          <p className="luxury-subheading-dark mt-4">
            Estimez le potentiel de vos investissements avec nos différents services de gestion. Une vision claire pour des décisions éclairées.
          </p>
        </div>

        {/* Tab Navigation */}
        {!calculatorOnly && (
          <div className="flex justify-center mb-12">
            <div className="bg-[var(--night)] border border-white/10 rounded-full p-1.5 flex gap-2">
              <button
                onClick={() => setActiveTab('calculator')}
                className={`px-8 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                  activeTab === 'calculator'
                    ? 'bg-[var(--gold-metallic)] text-[var(--night)] shadow-[0_0_15px_rgba(202,148,47,0.3)]'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                Calculateur
              </button>
              <button
                onClick={() => setActiveTab('comparison')}
                className={`px-8 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                  activeTab === 'comparison'
                    ? 'bg-[var(--gold-metallic)] text-[var(--night)] shadow-[0_0_15px_rgba(202,148,47,0.3)]'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                Comparaison
              </button>
            </div>
          </div>
        )}

        {(calculatorOnly || activeTab === 'calculator') ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Calculator Inputs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="glass-card-dark bg-[var(--night)]/50 border-white/5 p-8 rounded-3xl relative overflow-hidden h-full">
                <div className="pointer-events-none absolute -top-20 -left-20 w-60 h-60 rounded-full bg-[var(--gold-metallic)]/5 blur-3xl" />

                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--night)] to-[#1a1d24] border border-[var(--gold-metallic)]/30 flex items-center justify-center shadow-inner">
                    <FaCalculator className="text-xl text-[var(--gold-metallic)]" />
                  </div>
                  <h3 className="font-display text-2xl text-white">Paramètres</h3>
                </div>

                {/* Service Selection */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-white/60 mb-4 tracking-wide">
                    SERVICE DE GESTION
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {serviceComparison.map((service) => (
                      <button
                        key={service.service}
                        onClick={() => handleInputChange('service', service.service)}
                        className={`p-4 rounded-2xl border transition-all duration-300 text-left relative overflow-hidden ${
                          inputs.service === service.service
                            ? 'border-[var(--gold-metallic)]/50 bg-[var(--gold-metallic)]/10 shadow-[0_0_15px_rgba(202,148,47,0.1)]'
                            : 'border-white/10 bg-white/5 hover:border-[var(--gold-metallic)]/30 hover:bg-white/10'
                        }`}
                      >
                        {inputs.service === service.service && (
                          <div className="absolute top-0 right-0 w-8 h-8 bg-[var(--gold-metallic)] rounded-bl-2xl -mt-2 -mr-2" />
                        )}
                        <div className={`font-display text-sm mb-1 ${inputs.service === service.service ? 'text-[var(--gold-metallic)]' : 'text-white'}`}>{service.title}</div>
                        <div className="text-xs text-white/50">{service.fee} frais/an</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Fields */}
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-white/60 mb-3 tracking-wide">
                        INVESTISSEMENT INITIAL
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={inputs.initialAmount}
                          onChange={(e) => handleInputChange('initialAmount', e.target.value)}
                          className="w-full px-4 py-3 bg-[var(--night)] border border-white/10 rounded-xl text-white focus:border-[var(--gold-metallic)]/50 focus:ring-1 focus:ring-[var(--gold-metallic)]/50 focus:outline-none transition-colors font-mono text-lg"
                          min="100000"
                          step="50000"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 text-sm font-medium">FCFA</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/60 mb-3 tracking-wide">
                        VERSEMENT MENSUEL
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={inputs.monthlyContribution}
                          onChange={(e) => handleInputChange('monthlyContribution', e.target.value)}
                          className="w-full px-4 py-3 bg-[var(--night)] border border-white/10 rounded-xl text-white focus:border-[var(--gold-metallic)]/50 focus:ring-1 focus:ring-[var(--gold-metallic)]/50 focus:outline-none transition-colors font-mono text-lg"
                          min="0"
                          step="5000"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 text-sm font-medium">FCFA</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-4 tracking-wide flex justify-between">
                      <span>HORIZON D'INVESTISSEMENT</span>
                      <span className="text-[var(--gold-metallic)] font-bold">{inputs.timeHorizon} ans</span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={inputs.timeHorizon}
                      onChange={(e) => handleInputChange('timeHorizon', e.target.value)}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[var(--gold-metallic)]"
                    />
                    <div className="flex justify-between text-xs text-white/40 mt-3 font-medium">
                      <span>1 an</span>
                      <span>20 ans</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-4 tracking-wide">
                      PROFIL DE RENDEMENT
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {Object.entries(expectedReturns).map(([key, value]) => (
                        <button
                          key={key}
                          onClick={() => handleInputChange('expectedReturn', value)}
                          className={`px-4 py-3 rounded-xl border transition-all duration-300 text-center ${
                            inputs.expectedReturn === value
                              ? 'border-[var(--gold-metallic)] bg-[var(--gold-metallic)]/10 text-[var(--gold-metallic)]'
                              : 'border-white/10 text-white/60 hover:border-[var(--gold-metallic)]/30 hover:text-white bg-white/5'
                          }`}
                        >
                          <div className="font-medium text-sm mb-1">
                            {key === 'conservative' && 'Conservateur'}
                            {key === 'moderate' && 'Modéré'}
                            {key === 'aggressive' && 'Dynamique'}
                          </div>
                          <div className={`text-xs font-mono ${inputs.expectedReturn === value ? 'text-[var(--gold-metallic)]' : 'text-white/40'}`}>
                            {formatPercentage(value)}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-5 space-y-6">
              <div className="glass-card-dark bg-gradient-to-br from-[var(--night)] to-[#14161c] border-[var(--gold-metallic)]/20 p-8 rounded-3xl relative overflow-hidden h-full flex flex-col">
                <div className="pointer-events-none absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[var(--gold-metallic)]/10 blur-3xl" />
                <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--gold-metallic)]/40 to-transparent" />

                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--gold-metallic)]/10 border border-[var(--gold-metallic)]/30 flex items-center justify-center">
                    <FiTrendingUp className="text-xl text-[var(--gold-metallic)]" />
                  </div>
                  <h3 className="font-display text-2xl text-white">Résultats</h3>
                </div>

                <div className="space-y-6 flex-grow">
                  {/* Highlighted Main Result */}
                  <div className="p-6 bg-[var(--night)] border border-[var(--gold-metallic)]/30 rounded-2xl shadow-[0_0_20px_rgba(202,148,47,0.05)] text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-[var(--gold-metallic)]/5 to-transparent pointer-events-none" />
                    <span className="block text-xs font-bold tracking-widest text-[var(--gold-metallic)] uppercase mb-2">Capital estimé</span>
                    <span className="block font-display text-4xl text-white tracking-tight">{projectedValueCounter.value}</span>
                  </div>

                  <div className="space-y-4 px-2">
                    <div className="flex justify-between items-center py-3 border-b border-white/5">
                      <span className="text-white/60 text-sm">Total investi</span>
                      <span className="font-mono font-medium text-white">{totalInvestedCounter.value}</span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b border-white/5">
                      <span className="text-white/60 text-sm flex items-center gap-2">
                        Frais estimés
                        <span className="px-2 py-0.5 rounded text-[10px] bg-white/5 text-white/40">{serviceFees[inputs.service].min}%/an</span>
                      </span>
                      <span className="font-mono font-medium text-white/50">-{totalFeesCounter.value}</span>
                    </div>

                    <div className="flex justify-between items-center py-3">
                      <span className="text-white/60 text-sm font-medium">Gain net projeté</span>
                      <span className={`font-mono font-bold ${
                        results.netReturn >= 0 ? 'text-[var(--gold-metallic)]' : 'text-red-400'
                      }`}>
                        +{netReturnCounter.value}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-t border-white/5 mt-2 pt-4">
                      <span className="text-white/60 text-sm">Rendement annuel moyen</span>
                      <span className="font-mono font-medium text-[var(--gold-light)]">{avgReturnCounter.value}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5">
                  <p className="text-[11px] text-white/40 leading-relaxed mb-6 text-justify">
                    * Les performances passées ne préjugent pas des performances futures. 
                    Ces projections sont données à titre purement indicatif et ne constituent pas un engagement contractuel.
                  </p>
                  <a
                    href="#contact"
                    className="btn-primary-dark w-full justify-center group"
                  >
                    Demander une étude personnalisée
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Comparison Tab */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {serviceComparison.map((service) => (
              <div
                key={service.service}
                className={`group relative overflow-hidden rounded-3xl border p-8 transition-all duration-500 flex flex-col ${
                  inputs.service === service.service
                    ? 'border-[var(--gold-metallic)]/50 bg-[var(--night)] shadow-[0_10px_30px_-15px_rgba(202,148,47,0.3)]'
                    : 'border-white/10 bg-[var(--night)] hover:border-[var(--gold-metallic)]/30'
                }`}
              >
                {inputs.service === service.service && (
                  <div className="absolute inset-0 bg-gradient-to-b from-[var(--gold-metallic)]/5 to-transparent pointer-events-none" />
                )}
                
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic)]/5 blur-3xl group-hover:bg-[var(--gold-metallic)]/10 transition-colors" />

                <div className="font-display text-2xl mb-4 text-white relative z-10">{service.title}</div>

                <div className="mb-8 relative z-10">
                  <div className="text-3xl font-display text-[var(--gold-metallic)] mb-1">
                    {service.fee}
                  </div>
                  <div className="text-xs text-white/50 uppercase tracking-widest">Frais annuels</div>
                </div>

                <ul className="space-y-4 mb-10 flex-grow relative z-10">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-white/70">
                      <svg className="w-5 h-5 text-[var(--gold-metallic)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="pt-0.5">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => {
                    handleInputChange('service', service.service);
                    setActiveTab('calculator');
                  }}
                  className={`w-full py-3 px-6 rounded-xl font-medium tracking-wide text-sm transition-all relative z-10 ${
                    inputs.service === service.service
                      ? 'bg-[var(--gold-metallic)] text-[var(--night)]'
                      : 'bg-white/5 text-white hover:bg-[var(--gold-metallic)]/20 hover:text-[var(--gold-metallic)]'
                  }`}
                >
                  {inputs.service === service.service ? 'Sélectionné' : 'Choisir ce service'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
