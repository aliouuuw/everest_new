import { useEffect, useState } from 'react';
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
  const sectionRef = useReveal<HTMLDivElement>();

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

  const calculatorContent = (
    <>
        {/* Tab Navigation */}

        {/* Navigation Tabs */}
        {!calculatorOnly && (
          <div className="flex items-center gap-8 mb-12 border-b border-[var(--mauve-10)]">
            <button
              onClick={() => setActiveTab('calculator')}
              className="pb-4 text-[11px] tracking-[0.15em] uppercase transition-all duration-300"
              style={{
                fontFamily: 'var(--font-primary)',
                fontWeight: activeTab === 'calculator' ? 600 : 300,
                color: activeTab === 'calculator' ? 'var(--mauve)' : 'var(--night-60)',
                borderBottom: activeTab === 'calculator' ? '2px solid var(--mauve)' : '2px solid transparent',
              }}
            >
              Calculateur
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className="pb-4 text-[11px] tracking-[0.15em] uppercase transition-all duration-300"
              style={{
                fontFamily: 'var(--font-primary)',
                fontWeight: activeTab === 'comparison' ? 600 : 300,
                color: activeTab === 'comparison' ? 'var(--mauve)' : 'var(--night-60)',
                borderBottom: activeTab === 'comparison' ? '2px solid var(--mauve)' : '2px solid transparent',
              }}
            >
              Comparaison
            </button>
          </div>
        )}

        {(calculatorOnly || activeTab === 'calculator') ? (
          <div className={calculatorOnly ? "grid grid-cols-1 lg:grid-cols-2 gap-10" : "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20"}>
            {/* Calculator Inputs */}
            <div>
              <div className={calculatorOnly ? "" : "p-8 border border-[var(--mauve-10)] bg-[var(--pure-white)] rounded-2xl"}>
                <h3
                  className={calculatorOnly ? "mb-6" : "mb-8"}
                  style={{ fontFamily: 'var(--font-primary)', fontWeight: 700, fontSize: calculatorOnly ? '1rem' : '1.1rem', letterSpacing: '-0.01em', color: 'var(--mauve)' }}
                >
                  Paramètres d'investissement
                </h3>

                {/* Service Selection */}
                <div className="mb-8">
                  <label className="block mb-2 text-[10px] font-bold uppercase tracking-widest text-[var(--night-60)]" style={{ fontFamily: 'var(--font-primary)' }}>
                    Service de gestion
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {serviceComparison.map((service) => (
                      <button
                        key={service.service}
                        onClick={() => handleInputChange('service', service.service)}
                        className="p-4 text-left transition-all duration-300 rounded-xl"
                        style={{
                          border: inputs.service === service.service ? '1px solid var(--mauve)' : '1px solid var(--mauve-10)',
                          background: inputs.service === service.service ? 'var(--mauve-05)' : 'var(--pure-white)',
                        }}
                      >
                        <div style={{ fontFamily: 'var(--font-primary)', fontWeight: 600, fontSize: '0.95rem', color: inputs.service === service.service ? 'var(--mauve)' : 'var(--night)', marginBottom: '0.25rem' }}>
                          {service.title}
                        </div>
                        <div style={{ fontFamily: 'var(--font-primary)', fontWeight: 300, fontSize: '0.75rem', color: 'var(--night-60)' }}>
                          {service.fee} /an
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Fields */}
                <div className="space-y-6">
                  <div>
                    <label className="block mb-2 text-[10px] font-bold uppercase tracking-widest text-[var(--night-60)]" style={{ fontFamily: 'var(--font-primary)' }}>
                      Investissement initial (F CFA)
                    </label>
                    <input
                      type="number"
                      value={inputs.initialAmount}
                      onChange={(e) => handleInputChange('initialAmount', e.target.value)}
                      className="w-full px-4 py-3 border border-[var(--mauve-10)] bg-[var(--pure-white)] text-[var(--night)] focus:border-[var(--mauve)] focus:outline-none transition-colors rounded-xl font-medium"
                      min="100000"
                      step="50000"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-[10px] font-bold uppercase tracking-widest text-[var(--night-60)]" style={{ fontFamily: 'var(--font-primary)' }}>
                      Versement mensuel (F CFA)
                    </label>
                    <input
                      type="number"
                      value={inputs.monthlyContribution}
                      onChange={(e) => handleInputChange('monthlyContribution', e.target.value)}
                      className="w-full px-4 py-3 border border-[var(--mauve-10)] bg-[var(--pure-white)] text-[var(--night)] focus:border-[var(--mauve)] focus:outline-none transition-colors rounded-xl font-medium"
                      min="0"
                      step="5000"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--night-60)]" style={{ fontFamily: 'var(--font-primary)' }}>
                        Horizon d'investissement
                      </label>
                      <span className="font-bold text-[var(--night)]" style={{ fontFamily: 'var(--font-primary)' }}>
                        {inputs.timeHorizon} ans
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={inputs.timeHorizon}
                      onChange={(e) => handleInputChange('timeHorizon', e.target.value)}
                      className="w-full accent-[var(--mauve)] h-1.5 bg-[var(--mauve-10)] rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between mt-1 text-[10px] font-medium text-[var(--night-40)]">
                      <span>1 an</span>
                      <span>20 ans</span>
                    </div>
                  </div>

                  <div>
                    <label className="block mb-3 text-[10px] font-bold uppercase tracking-widest text-[var(--night-60)]" style={{ fontFamily: 'var(--font-primary)' }}>
                      Rendement annuel attendu
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {Object.entries(expectedReturns).map(([key, value]) => (
                        <button
                          key={key}
                          onClick={() => handleInputChange('expectedReturn', value)}
                          className="p-3 text-center transition-all duration-300 rounded-xl"
                          style={{
                            border: inputs.expectedReturn === value ? '1px solid var(--mauve)' : '1px solid var(--mauve-10)',
                            background: inputs.expectedReturn === value ? 'var(--mauve-05)' : 'var(--pure-white)',
                          }}
                        >
                          <div style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, fontSize: '0.8rem', color: inputs.expectedReturn === value ? 'var(--mauve)' : 'var(--night-60)', marginBottom: '0.15rem' }}>
                            {key === 'conservative' && 'Conservateur'}
                            {key === 'moderate' && 'Modéré'}
                            {key === 'aggressive' && 'Dynamique'}
                          </div>
                          <div style={{ fontFamily: 'var(--font-primary)', fontWeight: 600, fontSize: '1.1rem', color: inputs.expectedReturn === value ? 'var(--mauve)' : 'var(--night-80)' }}>
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
            <div>
              <div className={calculatorOnly ? "" : "p-8 border border-[var(--mauve-10)] bg-[var(--pure-white)] rounded-2xl"}>
                <h3
                  className={calculatorOnly ? "mb-6" : "mb-8"}
                  style={{ fontFamily: 'var(--font-primary)', fontWeight: 700, fontSize: calculatorOnly ? '1rem' : '1.1rem', letterSpacing: '-0.01em', color: 'var(--mauve)' }}
                >
                  Projections estimées
                </h3>

                <div className="space-y-0">
                  <div className="flex justify-between items-center py-5" style={{ borderBottom: '1px solid var(--mauve-10)' }}>
                    <span style={{ fontFamily: 'var(--font-primary)', fontWeight: 400, fontSize: '0.875rem', color: 'var(--night-60)' }}>Total investi</span>
                    <span style={{ fontFamily: 'var(--font-primary)', fontWeight: 600, fontSize: '1.1rem', color: 'var(--night)' }}>{totalInvestedCounter.value}</span>
                  </div>

                  <div className="flex justify-between items-center py-5" style={{ borderBottom: '1px solid var(--mauve-10)' }}>
                    <span style={{ fontFamily: 'var(--font-primary)', fontWeight: 400, fontSize: '0.875rem', color: 'var(--night-60)' }}>
                      Frais estimés ({serviceFees[inputs.service].min}%)
                    </span>
                    <span style={{ fontFamily: 'var(--font-primary)', fontWeight: 600, fontSize: '1.1rem', color: 'var(--mauve-60)' }}>−{totalFeesCounter.value}</span>
                  </div>

                  {/* Hero result — projected value */}
                  <div className="py-6 mt-2 mb-2 rounded-xl px-5" style={{ background: 'var(--mauve-05)', border: '1px solid var(--mauve-15)' }}>
                    <span style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: 'var(--mauve-60)', display: 'block', marginBottom: '0.5rem' }}>
                      Valeur projetée
                    </span>
                    <span style={{ fontFamily: 'var(--font-primary)', fontWeight: 700, fontSize: '2.2rem', letterSpacing: '-0.02em', color: 'var(--mauve)' }}>
                      {projectedValueCounter.value}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-5">
                    <span style={{ fontFamily: 'var(--font-primary)', fontWeight: 400, fontSize: '0.875rem', color: 'var(--night-60)' }}>Gain net estimé</span>
                    <span style={{ fontFamily: 'var(--font-primary)', fontWeight: 600, fontSize: '1.1rem', color: results.netReturn >= 0 ? 'var(--jaune-or)' : 'var(--mauve)' }}>
                      {results.netReturn >= 0 ? '+' : ''}{netReturnCounter.value}
                    </span>
                  </div>
                </div>

                {/* Avg return — clean, no gradient noise */}
                <div className="mt-6 pt-6 flex items-baseline justify-between" style={{ borderTop: '1px solid var(--mauve-10)' }}>
                  <span style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'var(--night-60)' }}>
                    Rendement annuel moyen
                  </span>
                  <span style={{ fontFamily: 'var(--font-primary)', fontWeight: 700, fontSize: '2rem', letterSpacing: '-0.02em', color: 'var(--jaune-or)' }}>
                    {avgReturnCounter.value}
                  </span>
                </div>
              </div>

              {/* Disclaimer + CTA */}
              {!calculatorOnly && (
                <div className="mt-8">
                  <p
                    className="mb-6"
                    style={{ fontFamily: 'var(--font-primary)', fontWeight: 300, fontSize: '0.75rem', lineHeight: 1.7, color: 'var(--night-60)' }}
                  >
                    * Ces projections sont estimatives et ne constituent pas une garantie de performance.
                    Les marchés financiers comportent des risques.
                  </p>
                  <a
                    href="https://everest-account-opening.vercel.app/new-home"
                    className="btn-primary inline-flex items-center gap-3 text-[11px] tracking-[0.15em] uppercase"
                  >
                    Ouvrir un compte
                  </a>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Comparison Tab */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {serviceComparison.map((service) => (
              <div
                key={service.service}
                className="p-8 flex flex-col transition-colors duration-300 hover:border-[var(--mauve)] cursor-pointer rounded-2xl"
                onClick={() => {
                  handleInputChange('service', service.service);
                  setActiveTab('calculator');
                }}
                style={{
                  border: inputs.service === service.service ? '1px solid var(--mauve)' : '1px solid var(--mauve-10)',
                  background: inputs.service === service.service ? 'var(--mauve-05)' : 'var(--pure-white)',
                }}
              >
                <div style={{ fontFamily: 'var(--font-primary)', fontWeight: 700, fontSize: '1.4rem', color: inputs.service === service.service ? 'var(--mauve)' : 'var(--night)', marginBottom: '0.75rem' }}>
                  {service.title}
                </div>
                <div style={{ fontFamily: 'var(--font-primary)', fontWeight: 600, fontSize: '1.8rem', color: 'var(--mauve)', marginBottom: '1.5rem' }}>
                  {service.fee}
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--mauve)] flex-shrink-0" />
                      <span style={{ fontFamily: 'var(--font-primary)', fontWeight: 400, fontSize: '0.85rem', color: 'var(--night-80)' }}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <span
                  className="text-[11px] tracking-[0.15em] uppercase"
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontWeight: 600,
                    color: inputs.service === service.service ? 'var(--mauve)' : 'var(--night-60)',
                  }}
                >
                  {inputs.service === service.service ? 'Sélectionné' : 'Simuler →'}
                </span>
              </div>
            ))}
          </div>
        )}
    </>
  );

  if (calculatorOnly) {
    return <div ref={sectionRef}>{calculatorContent}</div>;
  }

  return (
    <section
      className="reveal relative py-28 md:py-36 overflow-hidden bg-[var(--summit-ivory)]"
      ref={sectionRef as React.RefObject<HTMLElement>}
    >
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-16 lg:px-24">
        {/* Header */}
        <div className="max-w-xl mb-14">
          <div className="mb-6">
            <span className="inline-block px-4 py-1.5 rounded-full text-[0.65rem] font-medium uppercase tracking-[0.2em] text-[var(--night-80)] bg-[var(--mauve-10)] border border-[var(--mauve-20)]">
              Outil de simulation
            </span>
          </div>
          <h2 className="luxury-heading" style={{ color: 'var(--night-80)' }}>
            Calculez vos projections.
          </h2>
        </div>
        {calculatorContent}
      </div>
    </section>
  );
};
