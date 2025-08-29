/* eslint-disable import/order */
import { useEffect, useState } from "react";
import { useReveal } from "../Hooks/useReveal";
import { useCounter } from "../Hooks/useCounter";
import {
  FaBell,
  FaChartLine,
  FaCloudDownloadAlt,
  FaCog,
  FaFileInvoice,
  FaHome,
  FaListUl,
  FaSearch,
  FaUserShield,
} from "react-icons/fa";

// Lightweight inline sparkline (no external libs)
const Sparkline: React.FC<{ points: Array<number>; stroke?: string; fill?: string }> = ({ points, stroke = "#B68D40", fill = "rgba(182,141,64,0.15)" }) => {
  const width = 120;
  const height = 36;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = Math.max(1, max - min);
  const stepX = width / (points.length - 1);
  const normalized = points.map((p, i) => {
    const x = i * stepX;
    const y = height - ((p - min) / range) * height;
    return `${x},${y}`;
  });
  const polygon = `0,${height} ${normalized.join(" ")} ${width},${height}`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="block">
      <polyline points={normalized.join(" ")} fill="none" stroke={stroke} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <polygon points={polygon} fill={fill} />
    </svg>
  );
};

export const ClientPortalPreview: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>();
  const [countersTriggered, setCountersTriggered] = useState(false);

  // Counter animations for portal stats
  const cashBalanceCounter = useCounter("9 300 000 FCFA", { startOnMount: false, trigger: countersTriggered });
  const totalValueCounter = useCounter("124,5 M FCFA", { startOnMount: false, trigger: countersTriggered });
  const ytdPerfCounter = useCounter("+8,6%", { startOnMount: false, trigger: countersTriggered });
  const liquidityCounter = useCounter("9,3 M", { startOnMount: false, trigger: countersTriggered });

  // Position values counters
  const sonatelValueCounter = useCounter("2 430 000", { startOnMount: false, trigger: countersTriggered });
  const bicisValueCounter = useCounter("1 564 500", { startOnMount: false, trigger: countersTriggered });
  const palmciValueCounter = useCounter("1 800 000", { startOnMount: false, trigger: countersTriggered });
  const oatValueCounter = useCounter("4 160 000", { startOnMount: false, trigger: countersTriggered });

  // Performance counters
  const sonatelPerfCounter = useCounter("+6,4%", { startOnMount: false, trigger: countersTriggered });
  const bicisPerfCounter = useCounter("+2,1%", { startOnMount: false, trigger: countersTriggered });
  const palmciPerfCounter = useCounter("-1,2%", { startOnMount: false, trigger: countersTriggered });
  const oatPerfCounter = useCounter("+0,8%", { startOnMount: false, trigger: countersTriggered });

  // Allocation counters
  const stocksAllocCounter = useCounter("58%", { startOnMount: false, trigger: countersTriggered });
  const bondsAllocCounter = useCounter("34%", { startOnMount: false, trigger: countersTriggered });
  const cashAllocCounter = useCounter("8%", { startOnMount: false, trigger: countersTriggered });

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

  return (
    <section ref={sectionRef} id="portal-preview" className="reveal py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="kicker text-gradient-gold">Aperçu du portail client</span>
          <h2 className="luxury-heading mt-3">Un portail pensé pour la gestion patrimoniale</h2>
          <p className="luxury-subheading mt-5 pt-8">Démonstration réaliste d’interface. Les données ci‑dessous sont fictives mais représentatives.</p>
        </div>

        {/* App window */}
        <div className="mt-12 stat-card overflow-hidden p-0">
          {/* App chrome */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--night)]/10 bg-[var(--white-smoke)]/60">
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-300" />
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-yellow-300" />
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-300" />
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/70 border border-[var(--night)]/10">
                <FaSearch className="text-secondary" />
                <input aria-label="Rechercher" placeholder="Rechercher…" className="bg-transparent text-sm outline-none placeholder:text-secondary/70" />
              </div>
              <div className="text-xs text-secondary">client.everest-finance.sn</div>
              <img src="/logo-everest.png" alt="Everest" className="h-5" />
            </div>
          </div>

          <div className="grid grid-cols-12">
            {/* Sidebar */}
            <aside className="col-span-3 lg:col-span-2 border-r border-[var(--night)]/10 bg-[var(--white-smoke)]/50 p-3">
              <div className="font-display text-sm mb-3">Navigation</div>
              <nav className="space-y-1 text-sm">
                {[
                  { icon: <FaHome />, label: "Tableau de bord", active: true },
                  { icon: <FaChartLine />, label: "Positions" },
                  { icon: <FaListUl />, label: "Transactions" },
                  { icon: <FaFileInvoice />, label: "Relevés" },
                  { icon: <FaCloudDownloadAlt />, label: "Téléchargements" },
                  { icon: <FaUserShield />, label: "Sécurité" },
                  { icon: <FaCog />, label: "Préférences" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-default ${
                      item.active
                        ? 'bg-[var(--night)] text-[var(--pure-white)]'
                        : 'hover:bg-[var(--white-smoke)] text-secondary'
                    }`}
                  >
                    <span className="opacity-80">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </nav>

              <div className="mt-6 p-3 rounded-lg bg-white/70 border border-[var(--night)]/10">
                <div className="text-xs text-secondary">Solde espèces</div>
                {/* eslint-disable-next-line no-irregular-whitespace */}
                <div className="font-display text-lg">{cashBalanceCounter.value}</div>
              </div>
            </aside>

            {/* Content */}
            <div className="col-span-9 lg:col-span-10 p-4">
              {/* Header row */}
              <div className="flex items-center justify-between mb-4">
                <div className="font-display">Tableau de bord</div>
                <div className="flex items-center gap-3 text-xs text-secondary">
                  <div>Compte: 00012345</div>
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--white-smoke)] border border-[var(--night)]/10">
                    <FaBell className="opacity-70" />
                    <span>3</span>
                  </div>
                </div>
              </div>

              {/* KPI cards */}
              <div className="reveal-stagger grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "Valeur totale", counter: totalValueCounter, delta: "+1,2%", trend: [92, 95, 93, 98, 105, 110, 124] },
                  { label: "Perf. YTD", counter: ytdPerfCounter, delta: "+0,3%", trend: [2, 3, 2, 4, 5, 7, 8.6] },
                  { label: "Liquidités", counter: liquidityCounter, delta: "=", trend: [7, 7.5, 8, 8.6, 9, 9.3, 9.3] },
                  { label: "Risque", value: "Modéré", delta: "Stable", trend: [60, 58, 59, 57, 58, 58, 58] },
                ].map((k, i) => (
                  <div key={i} className="rounded-lg p-4 bg-[var(--white-smoke)] border border-[var(--night)]/10">
                    <div className="text-secondary text-xs">{k.label}</div>
                    <div className="flex items-end justify-between mt-1">
                      <div className="font-display text-lg">{k.counter ? k.counter.value : k.value}</div>
                      <div className="text-[10px] px-1.5 py-0.5 rounded bg-white/80 border border-[var(--night)]/10 text-secondary">{k.delta}</div>
                    </div>
                    <div className="mt-2 opacity-80">
                      <Sparkline points={k.trend} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Main grid */}
              <div className="mt-5 grid grid-cols-1 xl:grid-cols-3 gap-4">
                {/* Positions table */}
                <div className="xl:col-span-2 rounded-xl p-4 border border-[var(--night)]/10 bg-white/70">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-display">Positions</div>
                    <div className="text-xs text-secondary">Mise à jour: il y a 5 min</div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-secondary">
                          <th className="py-2">Titre</th>
                          <th className="py-2">Qté</th>
                          <th className="py-2">Prix moy.</th>
                          <th className="py-2">Valeur</th>
                          <th className="py-2">Perf.</th>
                          <th className="py-2">Alloc.</th>
                        </tr>
                      </thead>
                      <tbody className="align-top">
                        {[
                          { t: 'SONATEL', q: 120, pm: '20 100', valueCounter: sonatelValueCounter, perfCounter: sonatelPerfCounter, a: 34 },
                          { t: 'BICIS', q: 210, pm: '7 450', valueCounter: bicisValueCounter, perfCounter: bicisPerfCounter, a: 21 },
                          { t: 'PALMCI', q: 300, pm: '6 000', valueCounter: palmciValueCounter, perfCounter: palmciPerfCounter, a: 18 },
                          { t: 'OAT SN 2028 6.2%', q: 40, pm: '100 000', valueCounter: oatValueCounter, perfCounter: oatPerfCounter, a: 27 },
                        ].map((row, i) => (
                          <tr key={i} className="border-t border-[var(--night)]/10">
                            <td className="py-2 font-medium">{row.t}</td>
                            <td className="py-2">{row.q}</td>
                            <td className="py-2">{row.pm}</td>
                            <td className="py-2">{row.valueCounter.value} FCFA</td>
                            <td className={`py-2 ${row.perfCounter.value.startsWith('-') ? 'text-red-600' : 'text-emerald-600'}`}>{row.perfCounter.value}</td>
                            <td className="py-2">
                              <div className="w-20 h-1.5 rounded bg-[var(--white-smoke)]">
                                <div className="h-1.5 rounded" style={{ width: `${row.a}%`, background: 'var(--gold-metallic)' }} />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Allocation donut + activity */}
                <div className="rounded-xl p-4 border border-[var(--night)]/10 bg-white/70">
                  <div className="text-sm font-display mb-3">Répartition</div>
                  <div className="flex items-center gap-4">
                    <div className="relative w-28 h-28 shrink-0 rounded-full"
                         style={{
                           background: 'conic-gradient(var(--gold-metallic) 0 58%, rgba(182,141,64,0.25) 58% 92%, rgba(182,141,64,0.12) 92% 100%)',
                           mask: 'radial-gradient(circle 20px at center, transparent 20px, black 21px)'
                         }}
                    />
                    <div className="text-sm">
                      <div className="flex items-center gap-2 mb-1"><span className="inline-block w-3 h-3 rounded bg-[var(--gold-metallic)]" /> Actions: {stocksAllocCounter.value}</div>
                      <div className="flex items-center gap-2 mb-1"><span className="inline-block w-3 h-3 rounded bg-[var(--gold-metallic)]/40" /> Obligations: {bondsAllocCounter.value}</div>
                      <div className="flex items-center gap-2"><span className="inline-block w-3 h-3 rounded bg-[var(--gold-metallic)]/20" /> Monétaire: {cashAllocCounter.value}</div>
                    </div>
                  </div>
                  <div className="mt-4 text-xs text-secondary">Profil de risque: Modéré • Devise: FCFA</div>
                </div>
              </div>

              {/* Transactions */}
              <div className="mt-4 rounded-xl p-4 border border-[var(--night)]/10 bg-white/70">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-display">Dernières transactions</div>
                  <a href="#" className="text-xs text-secondary hover:underline">Voir tout</a>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-secondary">
                        <th className="py-2">Date</th>
                        <th className="py-2">Type</th>
                        <th className="py-2">Instrument</th>
                        <th className="py-2">Qté</th>
                        <th className="py-2">Prix / Montant</th>
                        <th className="py-2">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="align-top">
                      {[
                        { d: '12/07', ty: 'Achat', ins: 'SONATEL', q: 120, px: '20 500', st: 'Exécutée' },
                        { d: '10/07', ty: 'Vente', ins: 'PALMCI', q: 300, px: '6 250', st: 'Partielle' },
                        { d: '05/07', ty: 'Coupon', ins: 'OAT SN 6.2%', q: '-', px: '249 600', st: 'Réglée' },
                      ].map((t, i) => (
                        <tr key={i} className="border-t border-[var(--night)]/10">
                          <td className="py-2">{t.d}</td>
                          <td className="py-2">{t.ty}</td>
                          <td className="py-2">{t.ins}</td>
                          <td className="py-2">{t.q}</td>
                          <td className="py-2">{t.px} {t.ty === 'Coupon' ? 'FCFA' : ''}</td>
                          <td className="py-2">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] ${
                              t.st === 'Exécutée' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                              t.st === 'Partielle' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                              'bg-[var(--white-smoke)] text-secondary border-[var(--night)]/10'
                            }`}>
                              {t.st}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/portal" className="btn-primary font-display">Accès Client</a>
          <a href="#contact" className="btn-secondary font-display">Demander une démo</a>
        </div>
      </div>
    </section>
  );
};
