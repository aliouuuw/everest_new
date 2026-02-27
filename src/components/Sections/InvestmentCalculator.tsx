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
      className="reveal relative py-28 md:py-36 overflow-hidden"
      style={{ background: 'var(--night)' }}
    >
      {/* Dual radial glow (mauve + jaune-or) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 40% at 70% 0%, var(--mauve-20) 0%, rgba(202,148,47,0.06) 50%, transparent 80%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-16 lg:px-24">
        {/* Header */}
        <div className="max-w-xl mb-14">
          <span
            className="block text-[10px] tracking-[0.3em] uppercase mb-5"
            style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--jaune-or)' }}
          >
            Outil de simulation
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display-aptos)',
              fontWeight: 400,
              fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.01em',
              color: 'var(--pure-white)',
            }}
          >
            Calculez vos{' '}
            <em style={{ fontWeight: 300, fontStyle: 'italic', color: 'var(--jaune-or)' }}>
              projections.
            </em>
          </h2>
        </div>

        {/* Tab Navigation */}
        {!calculatorOnly && (
          <div className="flex gap-6 mb-12 border-b border-white/[0.06]">
            <button
              onClick={() => setActiveTab('calculator')}
              className="pb-4 text-[11px] tracking-[0.15em] uppercase transition-all duration-300"
              style={{
                fontFamily: 'var(--font-primary)',
                fontWeight: activeTab === 'calculator' ? 500 : 300,
                color: activeTab === 'calculator' ? 'var(--jaune-or)' : 'rgba(255,255,255,0.4)',
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
                color: activeTab === 'comparison' ? 'var(--jaune-or)' : 'rgba(255,255,255,0.4)',
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
              <div className="p-8 border border-white/[0.06] bg-white/[0.02]">
                <h3
                  className="mb-8"
                  style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 500, fontSize: '1.3rem', color: 'var(--pure-white)' }}
                >
                  Paramètres d'investissement
                </h3>

                {/* Service Selection */}
                <div className="mb-8">
                  <label
                    className="block mb-4"
                    style={{ fontFamily: 'var(--font-primary)', fontWeight: 400, fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.4)' }}
                  >
                    Service de gestion
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {serviceComparison.map((service) => (
                      <button
                        key={service.service}
                        onClick={() => handleInputChange('service', service.service)}
                        className="p-4 text-left transition-all duration-300"
                        style={{
                          border: inputs.service === service.service ? '1px solid var(--jaune-or)' : '1px solid rgba(255,255,255,0.06)',
                          background: inputs.service === service.service ? 'rgba(202,148,47,0.08)' : 'transparent',
                        }}
                      >
                        <div style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 500, fontSize: '0.95rem', color: 'var(--pure-white)', marginBottom: '0.25rem' }}>
                          {service.title}
                        </div>
                        <div style={{ fontFamily: 'var(--font-primary)', fontWeight: 300, fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
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
                      style={{ fontFamily: 'var(--font-primary)', fontWeight: 400, fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.4)' }}
                    >
                      Investissement initial (F CFA)
                    </label>
                    <input
                      type="number"
                      value={inputs.initialAmount}
                      onChange={(e) => handleInputChange('initialAmount', e.target.value)}
                      className="w-full px-4 py-3 border border-white/[0.08] bg-transparent text-white focus:border-[var(--jaune-or)] focus:outline-none transition-colors"
                      style={{ fontFamily: 'var(--font-primary)', fontWeight: 300, fontSize: '0.95rem' }}
                      min="100000"
                      step="50000"
                    />
                  </div>

                  <div>
                    <label
                      className="block mb-2"
                      style={{ fontFamily: 'var(--font-primary)', fontWeight: 400, fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.4)' }}
                    >
                      Versement mensuel (F CFA)
                    </label>
                    <input
                      type="number"
                      value={inputs.monthlyContribution}
                      onChange={(e) => handleInputChange('monthlyContribution', e.target.value)}
                      className="w-full px-4 py-3 border border-white/[0.08] bg-transparent text-white focus:border-[var(--jaune-or)] focus:outline-none transition-colors"
                      style={{ fontFamily: 'var(--font-primary)', fontWeight: 300, fontSize: '0.95rem' }}
                      min="0"
                      step="5000"
                    />
                  </div>

                  <div>
                    <label
                      className="block mb-2"
                      style={{ fontFamily: 'var(--font-primary)', fontWeight: 400, fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.4)' }}
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
                      <span style={{ fontFamily: 'var(--font-primary)', fontWeight: 300, fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>1 an</span>
                      <span style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 400, fontSize: '1rem', color: 'var(--jaune-or)' }}>{inputs.timeHorizon} ans</span>
                      <span style={{ fontFamily: 'var(--font-primary)', fontWeight: 300, fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>20 ans</span>
                    </div>
                  </div>

                  <div>
                    <label
                      className="block mb-3"
                      style={{ fontFamily: 'var(--font-primary)', fontWeight: 400, fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.4)' }}
                    >
                      Rendement annuel attendu
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {Object.entries(expectedReturns).map(([key, value]) => (
                        <button
                          key={key}
                          onClick={() => handleInputChange('expectedReturn', value)}
                          className="p-3 text-center transition-all duration-300"
                          style={{
                            border: inputs.expectedReturn === value ? '1px solid var(--jaune-or)' : '1px solid rgba(255,255,255,0.06)',
                            background: inputs.expectedReturn === value ? 'rgba(202,148,47,0.08)' : 'transparent',
                          }}
                        >
                          <div style={{ fontFamily: 'var(--font-primary)', fontWeight: 400, fontSize: '0.8rem', color: inputs.expectedReturn === value ? 'var(--jaune-or)' : 'rgba(255,255,255,0.6)', marginBottom: '0.15rem' }}>
                            {key === 'conservative' && 'Conservateur'}
                            {key === 'moderate' && 'Modéré'}
                            {key === 'aggressive' && 'Dynamique'}
                          </div>
                          <div style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 300, fontSize: '1.1rem', color: inputs.expectedReturn === value ? 'var(--jaune-or)' : 'rgba(255,255,255,0.4)' }}>
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
              <div className="p-8 border border-white/[0.06] bg-white/[0.02]">
                <h3
                  className="mb-8"
                  style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 500, fontSize: '1.3rem', color: 'var(--pure-white)' }}
                >
                  Projections estimées
                </h3>

                <div className="space-y-0">
                  <div className="flex justify-between items-center py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <span style={{ fontFamily: 'var(--font-primary)', fontWeight: 300, fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)' }}>Total investi</span>
                    <span style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 400, fontSize: '1.2rem', color: 'var(--pure-white)' }}>{totalInvestedCounter.value}</span>
                  </div>

                  <div className="flex justify-between items-center py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <span style={{ fontFamily: 'var(--font-primary)', fontWeight: 300, fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)' }}>
                      Frais estimés ({serviceFees[inputs.service].min}%)
                    </span>
                    <span style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 400, fontSize: '1.2rem', color: '#ef4444' }}>-{totalFeesCounter.value}</span>
                  </div>

                  <div className="flex justify-between items-center py-5" style={{ borderBottom: '2px solid rgba(202,148,47,0.2)' }}>
                    <span style={{ fontFamily: 'var(--font-primary)', fontWeight: 400, fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)' }}>Valeur projetée</span>
                    <span style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 400, fontSize: '1.5rem', color: '#34d399' }}>{projectedValueCounter.value}</span>
                  </div>

                  <div className="flex justify-between items-center py-5">
                    <span style={{ fontFamily: 'var(--font-primary)', fontWeight: 300, fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)' }}>Gain net estimé</span>
                    <span style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 400, fontSize: '1.2rem', color: results.netReturn >= 0 ? '#34d399' : '#ef4444' }}>
                      {netReturnCounter.value}
                    </span>
                  </div>
                </div>

                {/* Avg return highlight */}
                <div className="mt-8 p-6" style={{ background: 'var(--mauve-05)', border: '1px solid var(--mauve-20)', borderLeft: '3px solid var(--mauve)' }}>
                  <span
                    className="block mb-2"
                    style={{ fontFamily: 'var(--font-primary)', fontWeight: 400, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'var(--jaune-or)' }}
                  >
                    Rendement annuel moyen estimé
                  </span>
                  <span style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 300, fontSize: '2.5rem', color: 'var(--jaune-or)' }}>
                    {avgReturnCounter.value}
                  </span>
                </div>
              </div>

              {/* Disclaimer + CTA */}
              <div className="mt-8">
                <p
                  className="mb-6"
                  style={{ fontFamily: 'var(--font-primary)', fontWeight: 300, fontSize: '0.75rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.3)' }}
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
                    style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--jaune-or)' }}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {serviceComparison.map((service, i) => (
              <div
                key={service.service}
                className="p-8 flex flex-col transition-colors duration-300 hover:bg-white/[0.02] cursor-pointer"
                onClick={() => {
                  handleInputChange('service', service.service);
                  setActiveTab('calculator');
                }}
                style={{
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  borderRight: i < serviceComparison.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  background: inputs.service === service.service ? 'rgba(202,148,47,0.04)' : 'transparent',
                }}
              >
                <div style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 500, fontSize: '1.4rem', color: 'var(--pure-white)', marginBottom: '0.75rem' }}>
                  {service.title}
                </div>
                <div style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 300, fontSize: '1.8rem', color: 'var(--jaune-or)', marginBottom: '1.5rem' }}>
                  {service.fee}
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <span className="w-1 h-1 rounded-full bg-[var(--jaune-or)] flex-shrink-0" />
                      <span style={{ fontFamily: 'var(--font-primary)', fontWeight: 300, fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <span
                  className="text-[11px] tracking-[0.15em] uppercase"
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontWeight: 500,
                    color: inputs.service === service.service ? 'var(--jaune-or)' : 'rgba(255,255,255,0.4)',
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
