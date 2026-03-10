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
    <section
      ref={sectionRef}
      className="reveal relative overflow-hidden"
      style={{ background: 'var(--pure-white)', paddingTop: 'var(--section-gap)', paddingBottom: 'var(--section-gap)' }}
    >
      {/* Dual mauve-gold gradient atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 20% 30%, var(--mauve-05) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 85% 70%, var(--jaune-or-05) 0%, transparent 50%)',
        }}
      />
      {/* Gradient orb accent */}
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, var(--mauve-10) 0%, var(--jaune-or-05) 40%, transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-16 lg:px-24">
        {/* Header */}
        <div className="max-w-xl mb-14">
          <span
            className="inline-flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase mb-6"
            style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--mauve)' }}
          >
            <span className="inline-block w-5 h-[1px]" style={{ background: 'var(--mauve)', opacity: 0.4 }} />
            Outil de simulation
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.015em',
              color: 'var(--night)',
            }}
          >
            Calculez vos{' '}
            <em style={{ 
              fontWeight: 300, 
              fontStyle: 'italic', 
              color: 'var(--mauve)',
            }}>
              projections.
            </em>
          </h2>
        </div>

        {/* Tab Navigation */}
        {!calculatorOnly && (
          <div className="flex gap-6 mb-12 border-b border-black/[0.06]">
            <button
              onClick={() => setActiveTab('calculator')}
              className="pb-4 text-[11px] tracking-[0.15em] uppercase transition-all duration-300"
              style={{
                fontFamily: 'var(--font-primary)',
                fontWeight: activeTab === 'calculator' ? 500 : 300,
                color: activeTab === 'calculator' ? 'var(--jaune-or)' : 'var(--night-60)',
                borderBottom: activeTab === 'calculator' ? '1px solid var(--jaune-or)' : '1px solid transparent',
              }}
            >
              Calculateur
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className="pb-4 text-[11px] tracking-[0.15em] uppercase transition-all duration-300"
              style={{
                fontFamily: 'var(--font-primary)',
                fontWeight: activeTab === 'comparison' ? 500 : 300,
                color: activeTab === 'comparison' ? 'var(--jaune-or)' : 'var(--night-60)',
                borderBottom: activeTab === 'comparison' ? '1px solid var(--jaune-or)' : '1px solid transparent',
              }}
            >
              Comparaison
            </button>
          </div>
        )}

        {(calculatorOnly || activeTab === 'calculator') ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Calculator Inputs */}
            <div>
              <div className="p-8 border border-black/[0.06] bg-[var(--white-smoke)] rounded-2xl">
                <h3
                  className="mb-8"
                  style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 500, fontSize: '1.3rem', color: 'var(--night)' }}
                >
                  Paramètres d'investissement
                </h3>

                {/* Service Selection */}
                <div className="mb-8">
                  <label
                    className="block mb-4"
                    style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--night-60)' }}
                  >
                    Service de gestion
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {serviceComparison.map((service) => (
                      <button
                        key={service.service}
                        onClick={() => handleInputChange('service', service.service)}
                        className="p-4 text-left transition-all duration-300 rounded-xl"
                        style={{
                          border: inputs.service === service.service ? '1px solid var(--jaune-or)' : '1px solid var(--timberwolf)',
                          background: inputs.service === service.service ? 'var(--gold-pale)' : 'var(--pure-white)',
                        }}
                      >
                        <div style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 500, fontSize: '0.95rem', color: 'var(--night)', marginBottom: '0.25rem' }}>
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
                    <label
                      className="block mb-2"
                      style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--night-60)' }}
                    >
                      Investissement initial (F CFA)
                    </label>
                    <input
                      type="number"
                      value={inputs.initialAmount}
                      onChange={(e) => handleInputChange('initialAmount', e.target.value)}
                      className="w-full px-4 py-3 border border-black/[0.08] bg-[var(--pure-white)] text-[var(--night)] focus:border-[var(--jaune-or)] focus:outline-none transition-colors rounded-xl"
                      style={{ fontFamily: 'var(--font-primary)', fontWeight: 400, fontSize: '0.95rem' }}
                      min="100000"
                      step="50000"
                    />
                  </div>

                  <div>
                    <label
                      className="block mb-2"
                      style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--night-60)' }}
                    >
                      Versement mensuel (F CFA)
                    </label>
                    <input
                      type="number"
                      value={inputs.monthlyContribution}
                      onChange={(e) => handleInputChange('monthlyContribution', e.target.value)}
                      className="w-full px-4 py-3 border border-black/[0.08] bg-[var(--pure-white)] text-[var(--night)] focus:border-[var(--jaune-or)] focus:outline-none transition-colors rounded-xl"
                      style={{ fontFamily: 'var(--font-primary)', fontWeight: 400, fontSize: '0.95rem' }}
                      min="0"
                      step="5000"
                    />
                  </div>

                  <div>
                    <label
                      className="block mb-2"
                      style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--night-60)' }}
                    >
                      Horizon d'investissement (années)
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={inputs.timeHorizon}
                      onChange={(e) => handleInputChange('timeHorizon', e.target.value)}
                      className="w-full accent-[var(--jaune-or)]"
                    />
                    <div className="flex justify-between mt-2">
                      <span style={{ fontFamily: 'var(--font-primary)', fontWeight: 300, fontSize: '0.75rem', color: 'var(--night-60)' }}>1 an</span>
                      <span style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 500, fontSize: '1rem', color: 'var(--jaune-or)' }}>{inputs.timeHorizon} ans</span>
                      <span style={{ fontFamily: 'var(--font-primary)', fontWeight: 300, fontSize: '0.75rem', color: 'var(--night-60)' }}>20 ans</span>
                    </div>
                  </div>

                  <div>
                    <label
                      className="block mb-3"
                      style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--night-60)' }}
                    >
                      Rendement annuel attendu
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {Object.entries(expectedReturns).map(([key, value]) => (
                        <button
                          key={key}
                          onClick={() => handleInputChange('expectedReturn', value)}
                          className="p-3 text-center transition-all duration-300 rounded-xl"
                          style={{
                            border: inputs.expectedReturn === value ? '1px solid var(--jaune-or)' : '1px solid var(--timberwolf)',
                            background: inputs.expectedReturn === value ? 'var(--gold-pale)' : 'var(--pure-white)',
                          }}
                        >
                          <div style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, fontSize: '0.8rem', color: inputs.expectedReturn === value ? 'var(--jaune-or)' : 'var(--night-60)', marginBottom: '0.15rem' }}>
                            {key === 'conservative' && 'Conservateur'}
                            {key === 'moderate' && 'Modéré'}
                            {key === 'aggressive' && 'Dynamique'}
                          </div>
                          <div style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 400, fontSize: '1.1rem', color: inputs.expectedReturn === value ? 'var(--jaune-or)' : 'var(--night-80)' }}>
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
              <div className="p-8 border border-black/[0.06] bg-[var(--white-smoke)] rounded-2xl">
                <h3
                  className="mb-8"
                  style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 500, fontSize: '1.3rem', color: 'var(--night)' }}
                >
                  Projections estimées
                </h3>

                <div className="space-y-0">
                  <div className="flex justify-between items-center py-5" style={{ borderBottom: '1px solid var(--timberwolf)' }}>
                    <span style={{ fontFamily: 'var(--font-primary)', fontWeight: 400, fontSize: '0.875rem', color: 'var(--night-60)' }}>Total investi</span>
                    <span style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 500, fontSize: '1.2rem', color: 'var(--night)' }}>{totalInvestedCounter.value}</span>
                  </div>

                  <div className="flex justify-between items-center py-5" style={{ borderBottom: '1px solid var(--timberwolf)' }}>
                    <span style={{ fontFamily: 'var(--font-primary)', fontWeight: 400, fontSize: '0.875rem', color: 'var(--night-60)' }}>
                      Frais estimés ({serviceFees[inputs.service].min}%)
                    </span>
                    <span style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 500, fontSize: '1.2rem', color: '#ef4444' }}>-{totalFeesCounter.value}</span>
                  </div>

                  <div className="flex justify-between items-center py-5" style={{ borderBottom: '2px solid rgba(202,148,47,0.3)' }}>
                    <span style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, fontSize: '0.875rem', color: 'var(--night-80)' }}>Valeur projetée</span>
                    <span style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 600, fontSize: '1.5rem', color: '#10b981' }}>{projectedValueCounter.value}</span>
                  </div>

                  <div className="flex justify-between items-center py-5">
                    <span style={{ fontFamily: 'var(--font-primary)', fontWeight: 400, fontSize: '0.875rem', color: 'var(--night-60)' }}>Gain net estimé</span>
                    <span style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 500, fontSize: '1.2rem', color: results.netReturn >= 0 ? '#10b981' : '#ef4444' }}>
                      {netReturnCounter.value}
                    </span>
                  </div>
                </div>

                {/* Avg return highlight with gradient */}
                <div className="mt-8 p-6 rounded-xl relative overflow-hidden" style={{ background: 'var(--gold-pale)', border: '1px solid rgba(202,148,47,0.2)' }}>
                  <div 
                    className="absolute inset-0 opacity-30 pointer-events-none"
                    style={{ background: 'linear-gradient(135deg, var(--jaune-or-20) 0%, var(--mauve-10) 100%)' }}
                  />
                  <span
                    className="block mb-2 relative z-10"
                    style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'var(--jaune-or)' }}
                  >
                    Rendement annuel moyen estimé
                  </span>
                  <span style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 600, fontSize: '2.5rem', color: 'var(--jaune-or)' }}>
                    {avgReturnCounter.value}
                  </span>
                </div>
              </div>

              {/* Disclaimer + CTA */}
              <div className="mt-8">
                <p
                  className="mb-6"
                  style={{ fontFamily: 'var(--font-primary)', fontWeight: 300, fontSize: '0.75rem', lineHeight: 1.7, color: 'var(--night-60)' }}
                >
                  * Ces projections sont estimatives et ne constituent pas une garantie de performance.
                  Les marchés financiers comportent des risques.
                </p>
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-4"
                >
                  <span
                    className="relative overflow-hidden text-[11px] tracking-[0.2em] uppercase"
                    style={{ fontFamily: 'var(--font-primary)', fontWeight: 600, color: 'var(--jaune-or)' }}
                  >
                    Obtenir un conseil personnalisé
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--jaune-or)] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)]" />
                  </span>
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
                className="p-8 flex flex-col transition-colors duration-300 hover:border-[var(--jaune-or)] cursor-pointer rounded-2xl"
                onClick={() => {
                  handleInputChange('service', service.service);
                  setActiveTab('calculator');
                }}
                style={{
                  border: inputs.service === service.service ? '1px solid var(--jaune-or)' : '1px solid var(--timberwolf)',
                  background: inputs.service === service.service ? 'var(--gold-pale)' : 'var(--pure-white)',
                }}
              >
                <div style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 600, fontSize: '1.4rem', color: 'var(--night)', marginBottom: '0.75rem' }}>
                  {service.title}
                </div>
                <div style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 400, fontSize: '1.8rem', color: 'var(--jaune-or)', marginBottom: '1.5rem' }}>
                  {service.fee}
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--jaune-or)] flex-shrink-0" />
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
                    color: inputs.service === service.service ? 'var(--jaune-or)' : 'var(--night-60)',
                  }}
                >
                  {inputs.service === service.service ? 'Sélectionné' : 'Simuler →'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
