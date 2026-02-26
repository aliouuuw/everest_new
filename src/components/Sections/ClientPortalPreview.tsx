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
const Sparkline: React.FC<{ points: Array<number>; stroke?: string; fill?: string }> = ({ points, stroke = "#CA942F", fill = "rgba(202,148,47,0.15)" }) => {
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
    <section ref={sectionRef} id="portal-preview" className="reveal py-24 bg-[var(--night)] relative overflow-hidden">
      {/* Background cinematic elements */}
      <div className="absolute top-1/4 right-0 w-1/3 h-1/2 bg-[var(--gold-metallic)]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <span className="kicker text-[var(--gold-metallic)] tracking-[0.3em] uppercase">Aperçu du portail client</span>
          <h2 className="luxury-heading-dark mt-4">Un portail pensé pour la gestion patrimoniale</h2>
          <p className="luxury-subheading-dark mt-5 pt-4">Démonstration réaliste d’interface. Les données ci‑dessous sont fictives mais représentatives de notre environnement sécurisé.</p>
        </div>

        {/* App window */}
        <div className="mt-16 rounded-2xl overflow-hidden border border-white/10 bg-[var(--night)]/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] shadow-[var(--gold-metallic)]/5">
          {/* App chrome */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-red-500/80 border border-red-500/50" />
              <span className="inline-block w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-500/50" />
              <span className="inline-block w-3 h-3 rounded-full bg-green-500/80 border border-green-500/50" />
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 border border-white/10">
                <FaSearch className="text-white/40 text-xs" />
                <input aria-label="Rechercher" placeholder="Rechercher…" className="bg-transparent text-sm text-white outline-none placeholder:text-white/40 w-48" />
              </div>
              <div className="text-xs text-white/40 font-mono">client.everest-finance.sn</div>
            </div>
          </div>

          <div className="grid grid-cols-12">
            {/* Sidebar */}
            <aside className="col-span-3 lg:col-span-2 border-r border-white/10 bg-black/20 p-4">
              <div className="font-display text-xs text-white/40 uppercase tracking-widest mb-4">Navigation</div>
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
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-default transition-colors ${
                      item.active
                        ? 'bg-[var(--gold-metallic)]/10 text-[var(--gold-metallic)] border border-[var(--gold-metallic)]/20'
                        : 'hover:bg-white/5 text-white/60 hover:text-white'
                    }`}
                  >
                    <span className={item.active ? 'opacity-100' : 'opacity-60'}>{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </div>
                ))}
              </nav>

              <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-[var(--gold-metallic)]/10 rounded-full blur-xl" />
                <div className="text-xs text-white/60 mb-1 relative z-10">Solde espèces</div>
                {/* eslint-disable-next-line no-irregular-whitespace */}
                <div className="font-mono text-lg text-white font-medium relative z-10">{cashBalanceCounter.value}</div>
              </div>
            </aside>

            {/* Content */}
            <div className="col-span-9 lg:col-span-10 p-6 bg-gradient-to-br from-transparent to-black/40">
              {/* Header row */}
              <div className="flex items-center justify-between mb-6">
                <div className="font-display text-xl text-white">Tableau de bord</div>
                <div className="flex items-center gap-4 text-sm text-white/60">
                  <div className="font-mono">Compte: 00012345</div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--gold-metallic)]/10 border border-[var(--gold-metallic)]/20 text-[var(--gold-light)]">
                    <FaBell className="text-xs" />
                    <span className="font-medium text-xs">3</span>
                  </div>
                </div>
              </div>

              {/* KPI cards */}
              <div className="reveal-stagger grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Valeur totale", counter: totalValueCounter, delta: "+1,2%", trend: [92, 95, 93, 98, 105, 110, 124] },
                  { label: "Perf. YTD", counter: ytdPerfCounter, delta: "+0,3%", trend: [2, 3, 2, 4, 5, 7, 8.6] },
                  { label: "Liquidités", counter: liquidityCounter, delta: "=", trend: [7, 7.5, 8, 8.6, 9, 9.3, 9.3] },
                  { label: "Risque", value: "Modéré", delta: "Stable", trend: [60, 58, 59, 57, 58, 58, 58] },
                ].map((k, i) => (
                  <div key={i} className="rounded-xl p-5 bg-white/5 border border-white/10 hover:border-[var(--gold-metallic)]/30 transition-colors group">
                    <div className="text-white/60 text-xs mb-1 uppercase tracking-wider">{k.label}</div>
                    <div className="flex items-end justify-between mt-1">
                      <div className="font-display text-2xl text-white group-hover:text-[var(--gold-light)] transition-colors">{k.counter ? k.counter.value : k.value}</div>
                      <div className={`text-[10px] px-2 py-0.5 rounded font-mono ${k.delta.startsWith('+') ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : k.delta === '=' ? 'bg-white/10 text-white/60 border border-white/20' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>{k.delta}</div>
                    </div>
                    <div className="mt-4 opacity-70 group-hover:opacity-100 transition-opacity">
                      <Sparkline points={k.trend} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Main grid */}
              <div className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Positions table */}
                <div className="xl:col-span-2 rounded-xl p-5 border border-white/10 bg-white/5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-base font-display text-white">Positions</div>
                    <div className="text-xs text-white/40">Mise à jour: il y a 5 min</div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-white/50 border-b border-white/10">
                          <th className="py-3 font-medium">Titre</th>
                          <th className="py-3 font-medium">Qté</th>
                          <th className="py-3 font-medium">Prix moy.</th>
                          <th className="py-3 font-medium">Valeur</th>
                          <th className="py-3 font-medium">Perf.</th>
                          <th className="py-3 font-medium">Alloc.</th>
                        </tr>
                      </thead>
                      <tbody className="align-top">
                        {[
                          { t: 'SONATEL', q: 120, pm: '20 100', valueCounter: sonatelValueCounter, perfCounter: sonatelPerfCounter, a: 34 },
                          { t: 'BICIS', q: 210, pm: '7 450', valueCounter: bicisValueCounter, perfCounter: bicisPerfCounter, a: 21 },
                          { t: 'PALMCI', q: 300, pm: '6 000', valueCounter: palmciValueCounter, perfCounter: palmciPerfCounter, a: 18 },
                          { t: 'OAT SN 2028 6.2%', q: 40, pm: '100 000', valueCounter: oatValueCounter, perfCounter: oatPerfCounter, a: 27 },
                        ].map((row, i) => (
                          <tr key={i} className="border-b border-white/5 last:border-0">
                            <td className="py-3 font-medium text-white">{row.t}</td>
                            <td className="py-3 text-white/80 font-mono">{row.q}</td>
                            <td className="py-3 text-white/80 font-mono">{row.pm}</td>
                            <td className="py-3 text-white font-mono">{row.valueCounter.value}</td>
                            <td className={`py-3 font-mono font-medium ${row.perfCounter.value.startsWith('-') ? 'text-red-400' : 'text-emerald-400'}`}>{row.perfCounter.value}</td>
                            <td className="py-3">
                              <div className="w-20 h-1.5 rounded-full bg-white/10 mt-2">
                                <div className="h-1.5 rounded-full" style={{ width: `${row.a}%`, background: 'var(--gold-metallic)' }} />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Allocation donut + activity */}
                <div className="rounded-xl p-5 border border-white/10 bg-white/5 flex flex-col">
                  <div className="text-base font-display text-white mb-6">Répartition</div>
                  <div className="flex flex-col items-center gap-6 flex-grow justify-center">
                    <div className="relative w-36 h-36 shrink-0 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(202,148,47,0.1)]"
                         style={{
                           background: 'conic-gradient(var(--gold-metallic) 0 58%, rgba(202,148,47,0.4) 58% 92%, rgba(202,148,47,0.15) 92% 100%)',
                           mask: 'radial-gradient(circle 50px at center, transparent 50px, black 51px)',
                           WebkitMask: 'radial-gradient(circle 50px at center, transparent 50px, black 51px)'
                         }}
                    >
                      <div className="absolute inset-0 rounded-full border-4 border-black/20" />
                    </div>
                    <div className="text-sm w-full space-y-3">
                      <div className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="inline-block w-3 h-3 rounded bg-[var(--gold-metallic)]" /> <span className="text-white/80">Actions</span></div> <span className="font-mono text-white">{stocksAllocCounter.value}</span></div>
                      <div className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="inline-block w-3 h-3 rounded bg-[var(--gold-metallic)]/40" /> <span className="text-white/80">Obligations</span></div> <span className="font-mono text-white">{bondsAllocCounter.value}</span></div>
                      <div className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="inline-block w-3 h-3 rounded bg-[var(--gold-metallic)]/15" /> <span className="text-white/80">Monétaire</span></div> <span className="font-mono text-white">{cashAllocCounter.value}</span></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transactions */}
              <div className="mt-6 rounded-xl p-5 border border-white/10 bg-white/5">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-base font-display text-white">Dernières transactions</div>
                  <a href="#" className="text-xs text-[var(--gold-metallic)] hover:text-[var(--gold-light)] uppercase tracking-wider font-medium flex items-center gap-1 group">
                    Voir tout <span className="transform transition-transform group-hover:translate-x-1">→</span>
                  </a>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-white/50 border-b border-white/10">
                        <th className="py-3 font-medium">Date</th>
                        <th className="py-3 font-medium">Type</th>
                        <th className="py-3 font-medium">Instrument</th>
                        <th className="py-3 font-medium">Qté</th>
                        <th className="py-3 font-medium">Prix / Montant</th>
                        <th className="py-3 font-medium">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="align-top">
                      {[
                        { d: '12/07', ty: 'Achat', ins: 'SONATEL', q: 120, px: '20 500', st: 'Exécutée' },
                        { d: '10/07', ty: 'Vente', ins: 'PALMCI', q: 300, px: '6 250', st: 'Partielle' },
                        { d: '05/07', ty: 'Coupon', ins: 'OAT SN 6.2%', q: '-', px: '249 600', st: 'Réglée' },
                      ].map((t, i) => (
                        <tr key={i} className="border-b border-white/5 last:border-0 text-white/80">
                          <td className="py-3 font-mono">{t.d}</td>
                          <td className="py-3 font-medium">{t.ty}</td>
                          <td className="py-3 text-white">{t.ins}</td>
                          <td className="py-3 font-mono">{t.q}</td>
                          <td className="py-3 font-mono">{t.px} {t.ty === 'Coupon' ? 'FCFA' : ''}</td>
                          <td className="py-3">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full border text-[10px] font-medium tracking-wide uppercase ${
                              t.st === 'Exécutée' || t.st === 'Réglée' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                              t.st === 'Partielle' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                              'bg-white/5 text-white/60 border-white/10'
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

        <div className="mt-12 flex flex-col sm:flex-row gap-5 justify-center">
          <a href="/auth" className="btn-primary-dark font-display px-8">Accès Espace Client</a>
          <a href="#contact" className="btn-secondary-dark font-display px-8">Demander une démo</a>
        </div>
      </div>
    </section>
  );
};
