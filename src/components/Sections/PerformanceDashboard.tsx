/* eslint-disable sort-imports */
import { useMemo, useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useReveal } from "../Hooks/useReveal";

type TimeRange = "YTD" | "1Y" | "3Y";

export const PerformanceDashboard: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>();
  const gridRef = useReveal<HTMLDivElement>();
  const [range, setRange] = useState<TimeRange>("YTD");

  const mockedData = useMemo(() => {
    // Very lightweight mocked series for portfolio vs benchmark
    const baseDates = Array.from({ length: 12 }, (_, i) => `M${i + 1}`);
    const ytd = baseDates.map((d, i) => ({
      date: d,
      portfolio: 100 + i * 1.8 + (i % 3 === 0 ? 0.8 : -0.3),
      benchmark: 100 + i * 1.2 + (i % 4 === 0 ? 0.5 : -0.2),
    }));
    const oneY = baseDates.map((d, i) => ({
      date: d,
      portfolio: 100 + i * 2.2 + (i % 2 === 0 ? 0.7 : -0.4),
      benchmark: 100 + i * 1.6 + (i % 3 === 0 ? 0.3 : -0.3),
    }));
    const threeY = baseDates.map((d, i) => ({
      date: d,
      portfolio: 100 + i * 2.4 + (i % 2 === 0 ? 1.4 : -0.6),
      benchmark: 100 + i * 1.7 + (i % 3 === 0 ? 0.9 : -0.5),
    }));
    return { YTD: ytd, "1Y": oneY, "3Y": threeY } as Record<TimeRange, Array<{ date: string; portfolio: number; benchmark: number }>>;
  }, []);

  const kpis = useMemo(() => {
    return [
      { label: "Rendement YTD", value: "+8.6%", positive: true },
      { label: "CAGR 1 an", value: "+12.4%", positive: true },
      { label: "Volatilité", value: "6.1%", positive: false },
      { label: "Sharpe (1Y)", value: "0.9", positive: true },
      { label: "AUM", value: "8,4 Mds FCFA", positive: true },
      { label: "Surperf. vs BRVM", value: "+2.3%", positive: true },
    ];
  }, []);

  const allocation = [
    { label: "Actions", value: 58 },
    { label: "Obligations", value: 34 },
    { label: "Monétaire", value: 8 },
  ];

  const topHoldings = [
    { name: "Sonatel", weight: 16.2 },
    { name: "BOA SN", weight: 10.5 },
    { name: "ETI", weight: 7.8 },
    { name: "Fonds Trésor", weight: 6.4 },
    { name: "Palmci", weight: 5.1 },
  ];

  const series = mockedData[range];
  const minVal = Math.min(
    ...series.flatMap((p) => [p.portfolio, p.benchmark])
  );
  const maxVal = Math.max(
    ...series.flatMap((p) => [p.portfolio, p.benchmark])
  );

  const yScale = (val: number) => {
    const padding = 12;
    return 160 - ((val - minVal) / (maxVal - minVal)) * (160 - padding * 2) - padding;
  };

  const xScale = (idx: number) => 24 + (idx * (520 - 48)) / (series.length - 1);

  const linePath = (key: "portfolio" | "benchmark") => {
    return series
      .map((p, i) => `${i === 0 ? "M" : "L"}${xScale(i)},${yScale(p[key])}`)
      .join(" ");
  };

  return (
    <section ref={sectionRef} id="performance" className="reveal py-24 bg-[var(--night)] transition-colors duration-500">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="kicker text-gradient-gold">Tableau de bord</span>
          <h2 className="luxury-heading-dark mt-3">Performance du portefeuille</h2>
          <p className="luxury-subheading-dark mt-5 pt-8">Données simulées à titre indicatif. Les performances passées ne préjugent pas des performances futures.</p>
        </div>

        <div ref={gridRef} className="reveal-stagger grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
          {/* KPIs */}
          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
            {kpis.map((k, i) => (
              <div key={i} className="glass-card-dark glass-card-hover">
                <div className="text-secondary-dark text-xs mb-2">{k.label}</div>
                <div className="font-display text-lg flex items-center gap-2">
                  {k.positive ? (
                    <FaArrowUp className="text-emerald-400" />
                  ) : (
                    <FaArrowDown className="text-amber-400" />
                  )}
                  <span className="text-[var(--pure-white)]">{k.value}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Allocation */}
          <div className="glass-card-dark">
            <div className="font-display text-[var(--pure-white)] mb-4">Allocation d'actifs</div>
            <div className="space-y-4">
              {allocation.map((a, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-28 h-2.5 rounded-full bg-[var(--night-20)] overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[var(--gold-metallic)] to-[var(--gold-light)] rounded-full"
                      style={{ width: `${a.value}%` }}
                    />
                  </div>
                  <div className="text-sm text-secondary-dark flex-1">{a.label}</div>
                  <div className="font-display text-sm text-[var(--pure-white)]">{a.value}%</div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <div className="text-xs text-secondary-dark mb-3">Principales lignes</div>
              <ul className="space-y-2">
                {topHoldings.map((h, i) => (
                  <li key={i} className="flex justify-between text-sm">
                    <span className="text-secondary-dark">{h.name}</span>
                    <span className="font-display text-[var(--pure-white)]">{h.weight}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="glass-card-dark lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div className="font-display text-[var(--pure-white)]">Portefeuille vs BRVM</div>
              <div className="flex gap-2">
                {["YTD", "1Y", "3Y"].map((r) => (
                  <button
                    key={r}
                    onClick={() => setRange(r as TimeRange)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      range === r
                        ? "bg-gradient-to-r from-[var(--gold-metallic)] to-[var(--gold-dark)] text-[var(--pure-white)] shadow-lg"
                        : "border border-[var(--gold-metallic-20)] text-[var(--pure-white)] hover:bg-[var(--night-20)] hover:border-[var(--gold-metallic)]"
                    }`}
                    aria-pressed={range === r}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div className="relative">
              <svg viewBox="0 0 540 180" className="w-full h-48">
                <defs>
                  <linearGradient id="gradPortfolioDark" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--gold-light)" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="var(--gold-metallic)" stopOpacity="0.4" />
                  </linearGradient>
                  <linearGradient id="gradBenchmarkDark" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#64748b" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.3" />
                  </linearGradient>
                </defs>

                {/* Grid */}
                <rect x="0" y="0" width="540" height="180" fill="transparent" />
                {[...Array(6)].map((_, i) => (
                  <line key={i} x1="0" x2="540" y1={i * 30} y2={i * 30} stroke="var(--gold-metallic-10)" />
                ))}

                {/* Benchmark */}
                <path d={linePath("benchmark")} fill="none" stroke="url(#gradBenchmarkDark)" strokeWidth="2" />
                {/* Portfolio */}
                <path d={linePath("portfolio")} fill="none" stroke="url(#gradPortfolioDark)" strokeWidth="3" />
              </svg>
            </div>
            <div className="mt-2 flex items-center gap-4 text-xs text-secondary-dark">
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-gradient-to-r from-[var(--gold-metallic)] to-[var(--gold-light)]" />
                <span className="text-[var(--pure-white)]">Portefeuille</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-slate-400" />
                <span className="text-[var(--pure-white)]">BRVM</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="glass-card-dark">
            <div className="font-display text-[var(--pure-white)] mb-4">Notes méthodologiques</div>
            <ul className="text-sm text-secondary-dark list-disc pl-5 space-y-3">
              <li className="text-[var(--pure-white)]/80">Données simulées pour démonstration visuelle uniquement.</li>
              <li className="text-[var(--pure-white)]/80">Benchmark utilisé: indice composite BRVM (approximation).</li>
              <li className="text-[var(--pure-white)]/80">Les rendements sont exprimés en %; base 100 au début de période.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

 