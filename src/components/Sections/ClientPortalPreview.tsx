/* eslint-disable import/order */
import { useReveal } from "../Hooks/useReveal";
import { FaBell, FaCloudDownloadAlt, FaFileInvoice, FaListUl, FaTable, FaUserShield } from "react-icons/fa";

export const ClientPortalPreview: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>();
  const gridRef = useReveal<HTMLDivElement>();

  const features = [
    { icon: <FaTable />, title: "Positions", desc: "Portefeuille en temps quasi réel." },
    { icon: <FaListUl />, title: "Transactions", desc: "Historique clair et filtrable." },
    { icon: <FaFileInvoice />, title: "Relevés", desc: "Documents mensuels et annuels." },
    { icon: <FaBell />, title: "Alertes", desc: "Notifications prix et mouvements." },
    { icon: <FaCloudDownloadAlt />, title: "Téléchargements", desc: "Exports CSV/PDF instantanés." },
    { icon: <FaUserShield />, title: "Sécurité", desc: "Authentification forte et chiffrement." },
  ];

  return (
    <section ref={sectionRef} id="portal-preview" className="reveal py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="kicker text-gradient-gold">Aperçu du portail client</span>
          <h2 className="luxury-heading mt-3">Pilotez vos investissements en toute simplicité</h2>
          <p className="luxury-subheading mt-5 pt-8">Capture conceptuelle du tableau de bord. Interface finale susceptible d’évoluer.</p>
        </div>

        {/* Mocked dashboard */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 stat-card relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(var(--night-10) 1px, transparent 1px), linear-gradient(90deg, var(--night-10) 1px, transparent 1px)`, backgroundSize: '24px 24px', opacity: 0.35 }} />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="font-display">Tableau de bord</div>
                <div className="text-xs text-secondary">Compte: 00012345</div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[{ l: "Valeur totale", v: "124,5 M FCFA" }, { l: "Perf. YTD", v: "+8,6%" }, { l: "Liquidités", v: "9,3 M" }, { l: "Risque", v: "Modéré" }].map((k, i) => (
                  <div key={i} className="rounded-lg p-4 bg-[var(--white-smoke)] border border-[var(--night)]/10">
                    <div className="text-secondary text-xs">{k.l}</div>
                    <div className="font-display text-lg mt-1">{k.v}</div>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl p-4 border border-[var(--night)]/10">
                  <div className="text-sm font-display mb-2">Répartition</div>
                  <div className="flex items-end gap-2 h-28">
                    {[58,34,8].map((v, i) => (
                      <div key={i} className="flex-1 bg-[var(--white-smoke)] rounded-t">
                        <div className="w-full rounded-t" style={{ height: `${v}%`, background: 'var(--gold-metallic)' }} />
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 text-xs text-secondary">Actions / Obligations / Monétaire</div>
                </div>
                <div className="rounded-xl p-4 border border-[var(--night)]/10">
                  <div className="text-sm font-display mb-2">Activité récente</div>
                  <ul className="text-sm text-secondary space-y-1">
                    <li>Achat SONATEL x120 @ 20 500</li>
                    <li>Vente PALMCI x300 @ 6 250</li>
                    <li>Coupon OAT SN 6.2% reçu</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Feature list */}
          <div ref={gridRef} className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 gap-3">
            {features.map((f, i) => (
              <div key={i} className="stat-card card-hover">
                <div className="flex items-center gap-3 mb-1">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--white-smoke)] border border-gray-200 text-gray-700">{f.icon}</div>
                  <div className="font-display">{f.title}</div>
                </div>
                <div className="text-secondary text-sm">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/portal" className="px-7 py-3.5 bg-[var(--night)] text-[var(--pure-white)] font-medium text-sm tracking-wide transition-all duration-300 hover:bg-black hover:shadow-lg rounded-lg font-display">Accès Client</a>
          <a href="#contact" className="px-7 py-3.5 border border-[var(--night)]/15 text-[var(--night)] font-medium text-sm tracking-wide transition-all duration-300 hover:border-[var(--night)]/30 bg-[var(--white-smoke)]/80 hover:bg-[var(--night)]/5 rounded-lg font-display">Demander une démo</a>
        </div>
      </div>
    </section>
  );
};

 