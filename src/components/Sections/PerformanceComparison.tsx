import { useEffect, useState } from 'react';
import { FiTrendingUp } from 'react-icons/fi';
import { useReveal } from '../Hooks/useReveal';
import { useCounter } from '../Hooks/useCounter';

interface PerformanceData {
  period: string;
  discretionary: number;
  mandate: number;
  assisted: number;
  benchmark: number;
}

const performanceData: Array<PerformanceData> = [
  { period: '1 an', discretionary: 12.5, mandate: 14.2, assisted: 13.1, benchmark: 11.8 },
  { period: '2 ans', discretionary: 8.3, mandate: 9.7, assisted: 8.9, benchmark: 7.2 },
  { period: '3 ans', discretionary: 10.1, mandate: 11.5, assisted: 10.8, benchmark: 8.9 },
  { period: '5 ans', discretionary: 9.2, mandate: 10.8, assisted: 9.9, benchmark: 7.8 },
];

interface MetricCard {
  title: string;
  discretionary: string | number | { value: string };
  mandate: string | number | { value: string };
  assisted: string | number | { value: string };
  unit: string;
  higherIsBetter: boolean;
}

// Static metrics data (for non-animated values)
const staticMetricsData: Array<MetricCard> = [
  {
    title: 'Temps de réaction',
    discretionary: '< 1h',
    mandate: '< 30min',
    assisted: '< 2h',
    unit: '',
    higherIsBetter: true
  }
];

export const PerformanceComparison: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>();
  const [countersTriggered, setCountersTriggered] = useState(false);

  // Counter animations for metrics
  const perfDiscretionaryCounter = useCounter("9.8%", { startOnMount: false, trigger: countersTriggered });
  const perfMandateCounter = useCounter("11.2%", { startOnMount: false, trigger: countersTriggered });
  const perfAssistedCounter = useCounter("10.5%", { startOnMount: false, trigger: countersTriggered });

  const volDiscretionaryCounter = useCounter("15.2%", { startOnMount: false, trigger: countersTriggered });
  const volMandateCounter = useCounter("12.8%", { startOnMount: false, trigger: countersTriggered });
  const volAssistedCounter = useCounter("14.1%", { startOnMount: false, trigger: countersTriggered });

  const sharpeDiscretionaryCounter = useCounter("0.64", { startOnMount: false, trigger: countersTriggered });
  const sharpeMandateCounter = useCounter("0.87", { startOnMount: false, trigger: countersTriggered });
  const sharpeAssistedCounter = useCounter("0.74", { startOnMount: false, trigger: countersTriggered });

  const feesDiscretionaryCounter = useCounter("0.40%", { startOnMount: false, trigger: countersTriggered });
  const feesMandateCounter = useCounter("0.95%", { startOnMount: false, trigger: countersTriggered });
  const feesAssistedCounter = useCounter("0.65%", { startOnMount: false, trigger: countersTriggered });

  const satDiscretionaryCounter = useCounter("4.6/5", { startOnMount: false, trigger: countersTriggered });
  const satMandateCounter = useCounter("4.8/5", { startOnMount: false, trigger: countersTriggered });
  const satAssistedCounter = useCounter("4.7/5", { startOnMount: false, trigger: countersTriggered });

  // Trigger counters when section is revealed
  useEffect(() => {
    if (sectionRef.current && !countersTriggered) {
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
  }, [sectionRef, countersTriggered]);

  // Create animated metrics data
  const metricsData = [
    {
      title: 'Performance annualisée',
      discretionary: perfDiscretionaryCounter,
      mandate: perfMandateCounter,
      assisted: perfAssistedCounter,
      unit: '%',
      higherIsBetter: true
    },
    {
      title: 'Volatilité annualisée',
      discretionary: volDiscretionaryCounter,
      mandate: volMandateCounter,
      assisted: volAssistedCounter,
      unit: '%',
      higherIsBetter: false
    },
    {
      title: 'Ratio Sharpe',
      discretionary: sharpeDiscretionaryCounter,
      mandate: sharpeMandateCounter,
      assisted: sharpeAssistedCounter,
      unit: '',
      higherIsBetter: true
    },
    ...staticMetricsData,
    {
      title: 'Frais totaux',
      discretionary: feesDiscretionaryCounter,
      mandate: feesMandateCounter,
      assisted: feesAssistedCounter,
      unit: '%',
      higherIsBetter: false
    },
    {
      title: 'Satisfaction client',
      discretionary: satDiscretionaryCounter,
      mandate: satMandateCounter,
      assisted: satAssistedCounter,
      unit: '/5',
      higherIsBetter: true
    }
  ];

  const formatValue = (value: string | number | { value: string }, unit: string) => {
    // Handle counter objects
    if (typeof value === 'object' && value && 'value' in value) {
      return value.value;
    }

    if (typeof value === 'string') {
      return value;
    }
    return unit === '%' ? `${value}${unit}` : value.toString();
  };

  const getBestValue = (card: MetricCard) => {
    const values = [card.discretionary, card.mandate, card.assisted];
    const numericValues = values.map(v => {
      // Handle counter objects
      if (typeof v === 'object' && v && 'value' in v) {
        return parseFloat(v.value.replace(/[^\d.-]/g, '')) || 0;
      }
      // Handle strings
      if (typeof v === 'string') {
        return parseFloat(v.replace(/[^\d.-]/g, '')) || 0;
      }
      // Handle numbers
      return v;
    });

    if (card.higherIsBetter) {
      const max = Math.max(...numericValues);
      return numericValues.indexOf(max);
    } else {
      const min = Math.min(...numericValues);
      return numericValues.indexOf(min);
    }
  };

  const getServiceName = (index: number) => {
    const names = ['discretionary', 'mandate', 'assisted'];
    return names[index];
  };

  return (
    <section ref={sectionRef} className="reveal py-24 md:py-40 bg-[var(--pure-white)]">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="mb-20">
          <span className="text-[10px] font-bold tracking-[0.3em] text-[var(--jaune-or)] uppercase block mb-8">Performance</span>
          <h2 className="font-display-aptos text-4xl md:text-6xl leading-[1.05] max-w-3xl mb-8">
            Comparaison des performances.
          </h2>
          <p className="text-lg text-[rgba(10, 10, 10, 0.8)] font-light max-w-2xl">
            Découvrez les résultats historiques et les métriques clés de nos différents services de gestion.
          </p>
        </div>

        {/* Performance Table */}
        <div className="border border-black/10 mb-20">
          <div className="p-6 border-b border-black/10">
            <h3 className="font-display-aptos text-xl text-[var(--night)]">Évolution des performances</h3>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              {/* Table Header */}
              <div className="grid grid-cols-5 border-b border-black/10" style={{ background: 'rgba(70,29,76,0.04)' }}>
                <div className="p-4 font-display-aptos text-sm text-[var(--night)]">Période</div>
                <div className="p-4 font-display-aptos text-sm text-center text-[var(--night)]">Gestion Libre</div>
                <div className="p-4 font-display-aptos text-sm text-center text-[var(--night)]">Gestion Sous-Mandat</div>
                <div className="p-4 font-display-aptos text-sm text-center text-[var(--night)]">Gestion Assistée</div>
                <div className="p-4 font-display-aptos text-sm text-center text-[rgba(10,10,10,0.5)]">Benchmark*</div>
              </div>

              {/* Table Body */}
              {performanceData.map((row, index) => (
                <div key={row.period} className="grid grid-cols-5 border-b border-black/10" style={{ background: index % 2 === 0 ? 'rgba(70,29,76,0.02)' : '' }}>
                  <div className="p-4 font-medium text-[var(--night)]">{row.period}</div>
                  <div className="p-4 text-center">
                    <span className={`font-display-aptos text-sm ${row.discretionary >= 0 ? 'text-green-700' : 'text-red-600'}`}>
                      {row.discretionary >= 0 ? '+' : ''}{row.discretionary}%
                    </span>
                  </div>
                  <div className="p-4 text-center">
                    <span className={`font-display-aptos text-sm ${row.mandate >= 0 ? 'text-green-700' : 'text-red-600'}`}>
                      {row.mandate >= 0 ? '+' : ''}{row.mandate}%
                    </span>
                  </div>
                  <div className="p-4 text-center">
                    <span className={`font-display-aptos text-sm ${row.assisted >= 0 ? 'text-green-700' : 'text-red-600'}`}>
                      {row.assisted >= 0 ? '+' : ''}{row.assisted}%
                    </span>
                  </div>
                  <div className="p-4 text-center text-[rgba(10,10,10,0.5)] text-sm">
                    {row.benchmark >= 0 ? '+' : ''}{row.benchmark}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 text-xs text-[rgba(10,10,10,0.5)] border-t border-black/10">
            * Benchmark: Indice BRVM 10. Les performances passées ne préjugent pas des performances futures.
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 border-t border-black/10 pt-16">
          {metricsData.map((metric) => {
            const bestIndex = getBestValue(metric);
            const bestService = getServiceName(bestIndex);

            return (
              <div
                key={metric.title}
                className="relative"
              >
                <div className="w-8 h-px bg-[var(--jaune-or)] mb-6" />
                <h4 className="font-display-aptos text-lg text-[rgba(10,10,10,0.6)] mb-6">{metric.title}</h4>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[rgba(10,10,10,0.8)]">Gestion Libre</span>
                    <span className={`font-display-aptos text-lg ${
                      bestService === 'discretionary' ? 'text-[var(--jaune-or)]' : 'text-[var(--night)]'
                    }`}>
                      {formatValue(metric.discretionary, metric.unit)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[rgba(10,10,10,0.8)]">Sous-Mandat</span>
                    <span className={`font-display-aptos text-lg ${
                      bestService === 'mandate' ? 'text-[var(--jaune-or)]' : 'text-[var(--night)]'
                    }`}>
                      {formatValue(metric.mandate, metric.unit)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[rgba(10,10,10,0.8)]">Assistée</span>
                    <span className={`font-display-aptos text-lg ${
                      bestService === 'assisted' ? 'text-[var(--jaune-or)]' : 'text-[var(--night)]'
                    }`}>
                      {formatValue(metric.assisted, metric.unit)}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-black/10">
                  <div className="text-xs text-[var(--jaune-or)] uppercase tracking-[0.2em]">
                    <span className="capitalize">{bestService === 'discretionary' ? 'Libre' : bestService === 'mandate' ? 'Sous-mandat' : 'Assistée'} recommandé</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div className="mt-20 p-6 border border-black/10" style={{ background: 'rgba(70,29,76,0.03)' }}>
          <div className="flex items-start gap-3">
            <FiTrendingUp className="text-[var(--jaune-or)] mt-0.5 flex-shrink-0" />
            <div className="text-sm text-[rgba(10,10,10,0.8)]">
              <p className="font-display-aptos text-[var(--night)] mb-2">Note importante:</p>
              <p className="font-light">Les performances passées ne constituent pas une garantie de résultats futurs. L'investissement en bourse comporte des risques, y compris celui de perdre tout ou partie du capital investi. Ces données sont présentées à titre informatif.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
