import { useEffect, useState } from 'react';
import { FiTarget, FiTrendingUp } from 'react-icons/fi';
import { FaChartLine } from 'react-icons/fa';
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
    <section ref={sectionRef} className="reveal py-14 sm:py-18 bg-[var(--night)]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="kicker text-gradient-gold">Performance</span>
          <h2 className="luxury-heading-dark mt-3">Comparaison des performances</h2>
          <p className="luxury-subheading-dark mt-5 pt-8">
            Découvrez les résultats historiques et les métriques clés de nos différents services de gestion.
          </p>
        </div>

        {/* Performance Chart */}
        <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--night)]/90 backdrop-blur-sm p-6 mb-12 glass-card-dark">
          <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />

          <div className="flex items-center gap-3 mb-6">
            <FaChartLine className="text-xl text-[var(--gold-light)]" />
            <h3 className="font-display text-lg text-[var(--pure-white)]">Évolution des performances</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-[var(--gold-metallic)]/25">
                  <th className="text-left p-3 font-display text-sm text-[var(--pure-white)]">Période</th>
                  <th className="text-center p-3 font-display text-sm text-[var(--pure-white)]">Gestion Libre</th>
                  <th className="text-center p-3 font-display text-sm text-[var(--pure-white)]">Gestion Sous-Mandat</th>
                  <th className="text-center p-3 font-display text-sm text-[var(--pure-white)]">Gestion Assistée</th>
                  <th className="text-center p-3 font-display text-sm text-secondary-dark">Benchmark*</th>
                </tr>
              </thead>
              <tbody>
                {performanceData.map((row, index) => (
                  <tr key={row.period} className={index % 2 === 0 ? 'bg-[var(--night-20)]/50' : ''}>
                    <td className="p-3 font-medium text-[var(--pure-white)]">{row.period}</td>
                    <td className="p-3 text-center">
                      <span className={`font-display text-sm ${
                        row.discretionary >= 0 ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        {row.discretionary >= 0 ? '+' : ''}{row.discretionary}%
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`font-display text-sm ${
                        row.mandate >= 0 ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        {row.mandate >= 0 ? '+' : ''}{row.mandate}%
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`font-display text-sm ${
                        row.assisted >= 0 ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        {row.assisted >= 0 ? '+' : ''}{row.assisted}%
                      </span>
                    </td>
                    <td className="p-3 text-center text-secondary-dark text-sm">
                      {row.benchmark >= 0 ? '+' : ''}{row.benchmark}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-xs text-secondary-dark">
            * Benchmark: Indice BRVM 10. Les performances passées ne préjugent pas des performances futures.
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {metricsData.map((metric) => {
            const bestIndex = getBestValue(metric);
            const bestService = getServiceName(bestIndex);

            return (
              <div
                key={metric.title}
                className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--night)]/90 backdrop-blur-sm p-6 transition-all glass-card-dark glass-card-hover"
              >
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />

                <div className="font-display text-sm text-secondary-dark mb-3">{metric.title}</div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-secondary-dark">Gestion Libre</span>
                    <span className={`font-display text-sm ${
                      bestService === 'discretionary' ? 'text-[var(--gold-light)] font-medium' : 'text-[var(--pure-white)]'
                    }`}>
                      {formatValue(metric.discretionary, metric.unit)}
                      {bestService === 'discretionary' && (
                        <FiTarget className="inline ml-1 text-[var(--gold-light)]" size={12} />
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-xs text-secondary-dark">Sous-Mandat</span>
                    <span className={`font-display text-sm ${
                      bestService === 'mandate' ? 'text-[var(--gold-light)] font-medium' : 'text-[var(--pure-white)]'
                    }`}>
                      {formatValue(metric.mandate, metric.unit)}
                      {bestService === 'mandate' && (
                        <FiTarget className="inline ml-1 text-[var(--gold-light)]" size={12} />
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-xs text-secondary-dark">Assistée</span>
                    <span className={`font-display text-sm ${
                      bestService === 'assisted' ? 'text-[var(--gold-light)] font-medium' : 'text-[var(--pure-white)]'
                    }`}>
                      {formatValue(metric.assisted, metric.unit)}
                      {bestService === 'assisted' && (
                        <FiTarget className="inline ml-1 text-[var(--gold-light)]" size={12} />
                      )}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--gold-metallic)]/25">
                  <div className="flex items-center gap-1 text-xs text-[var(--gold-light)]">
                    <FiTarget size={10} />
                    <span className="capitalize">{bestService === 'discretionary' ? 'Libre' :
                      bestService === 'mandate' ? 'Sous-mandat' : 'Assistée'} recommandé</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div className="mt-12 p-4 bg-[var(--night)]/90 rounded-xl border border-[var(--gold-metallic)]/25 glass-card-dark">
          <div className="flex items-start gap-3">
            <FiTrendingUp className="text-[var(--gold-light)] mt-0.5 flex-shrink-0" />
            <div className="text-sm text-secondary-dark">
              <p className="font-medium text-[var(--pure-white)] mb-1">Note importante:</p>
              <p>Les performances passées ne constituent pas une garantie de résultats futurs. L'investissement en bourse comporte des risques, y compris celui de perdre tout ou partie du capital investi. Ces données sont présentées à titre informatif.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
