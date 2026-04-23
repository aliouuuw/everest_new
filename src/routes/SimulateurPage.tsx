import { useState } from 'react'
import { FiArrowRight, FiTarget, FiTrendingUp, FiPercent, FiDollarSign, FiBookOpen, FiInfo, FiCheck } from 'react-icons/fi'
import { CompoundInterestCalculator } from '../components/InvestorProfile/CompoundInterestCalculator'
import { DividendCalculator } from '../components/InvestorProfile/DividendCalculator'
import { InvestorProfileInline } from '../components/InvestorProfile/InvestorProfileInline'

type ToolId = 'profil' | 'interets' | 'dividendes'

const TABS = [
  { id: 'profil' as ToolId, icon: <FiTarget size={18} />, label: "Profil d'Investisseur" },
  { id: 'interets' as ToolId, icon: <FiPercent size={18} />, label: 'Intérêts Composés' },
  { id: 'dividendes' as ToolId, icon: <FiDollarSign size={18} />, label: 'Calculateur Dividendes' },
] as const

const TOOL_META: Record<ToolId, { title: string; subtitle: string; icon: React.ReactNode }> = {
  profil: {
    title: "Détermination du Profil d'Investisseur",
    subtitle: "Identifiez votre profil d'investisseur pour des décisions adaptées à votre tolérance au risque",
    icon: <FiTarget size={20} />,
  },
  interets: {
    title: "Calculateur d'Intérêts Composés",
    subtitle: "Projettez la croissance de votre investissement grâce à la puissance des intérêts composés",
    icon: <FiTrendingUp size={20} />,
  },
  dividendes: {
    title: 'Calculateur de Dividendes',
    subtitle: 'Estimez vos revenus de dividendes et leur croissance potentielle',
    icon: <FiDollarSign size={20} />,
  },
}

const TOOL_TIPS: Record<ToolId, { title: string; items: string[] }> = {
  profil: {
    title: "Pourquoi connaître votre profil ?",
    items: [
      "Adaptez vos investissements à votre tolérance au risque",
      "Évitez les décisions émotionnelles en période de volatilité",
      "Construisez un portefeuille cohérent avec vos objectifs",
      "Facilitez le dialogue avec votre conseiller",
    ],
  },
  interets: {
    title: "Règle des 72",
    items: [
      "À un taux de 5.00%, votre investissement doublera en environ 14.4 ans",
      "Plus tôt vous commencez, plus l'effet de composition est puissant",
      "Les petits montants réguliers génèrent des résultats surprenants",
      "La patience est le meilleur allié de l'épargnant",
    ],
  },
  dividendes: {
    title: "Conseils sur les dividendes",
    items: [
      "Un rendement supérieur à 5% est considéré comme attractif sur la BRVM",
      "Privilégiez les entreprises avec un historique stable de versement",
      "Le réinvestissement des dividendes accélère la croissance du capital",
      "Vérifiez le ratio de distribution (payout ratio) avant d'investir",
    ],
  },
}

export const SimulateurPage: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolId>('profil')

  const meta = TOOL_META[activeTool]
  const tips = TOOL_TIPS[activeTool]

  return (
    <div className="bg-[var(--pure-white)] text-[var(--night)] font-primary">
      {/* ─── 1. Hero — Mauve Banner (matches Bourse / Contact / Expertises) ─── */}
      <section className="relative pt-[88px] pb-12 md:pb-16 border-b border-black/10 bg-[var(--mauve)]">
        <div className="relative z-10 w-full px-6 md:px-12 mx-auto max-w-[1600px]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            <div className="md:col-span-8">
              <h1 className="font-primary font-bold leading-[0.95] tracking-tight text-[var(--pure-white)]" style={{ fontSize: 'clamp(2.375rem, 4.6vw + 1.2rem, 4.25rem)' }}>
                Outils Investisseurs.
              </h1>
            </div>

            <div className="md:col-span-4">
              <p className="text-base md:text-lg leading-relaxed text-white/70 font-light border-l-2 border-[var(--jaune-or)] pl-6">
                Utilisez nos outils pour optimiser vos décisions d'investissement sur la BRVM.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. Tab Navigation ─── */}
      <div id="outils" className="bg-[var(--pure-white)] border-b border-black/10 sticky top-[64px] z-30">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="flex justify-center overflow-x-auto no-scrollbar py-4 gap-2 md:gap-4">
            {TABS.map((tab) => {
              const isActive = tab.id === activeTool
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTool(tab.id)}
                  className={`group flex items-center gap-2 px-5 py-2.5 text-sm font-medium whitespace-nowrap rounded-md transition-all duration-200 ${
                    isActive
                      ? 'border border-[var(--night)] text-[var(--night)] shadow-sm'
                      : 'border border-transparent text-[var(--night-60)] hover:text-[var(--night)] hover:bg-[var(--mauve-05)]'
                  }`}
                  style={{ fontFamily: 'var(--font-primary)' }}
                >
                  <span className={isActive ? 'text-[var(--mauve)]' : 'text-[var(--night-40)] group-hover:text-[var(--night-60)]'}>
                    {tab.icon}
                  </span>
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ─── 3. Tool Content ─── */}
      <section className="py-6 md:py-8">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          {/* White card container */}
          <div className="bg-[var(--pure-white)] rounded-2xl border border-black/10 shadow-sm overflow-hidden">
            {/* Tool Header */}
            <div className="px-6 md:px-10 py-6 border-b border-black/10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--mauve-10)] flex items-center justify-center text-[var(--mauve)] shrink-0">
                  {meta.icon}
                </div>
                <div>
                  <h2 className="font-bold text-lg md:text-xl uppercase tracking-[0.08em] text-[var(--night)]" style={{ fontFamily: 'var(--font-primary)' }}>
                    {meta.title}
                  </h2>
                  <p className="text-base text-[var(--night-60)] mt-1" style={{ fontFamily: 'var(--font-primary)' }}>
                    {meta.subtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Tool Body */}
            <div className="p-6 md:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
                {/* Main tool area */}
                <div className="lg:col-span-2">
                  {activeTool === 'profil' && <InvestorProfileInline />}
                  {activeTool === 'interets' && <CompoundInterestCalculator />}
                  {activeTool === 'dividendes' && <DividendCalculator />}
                </div>

                {/* Sidebar tips */}
                <div className="lg:col-span-1">
                  <div className="bg-[var(--mauve-05)] rounded-xl p-6 border border-[var(--mauve-10)]">
                    <div className="flex items-center gap-2 mb-4">
                      <FiBookOpen size={18} className="text-[var(--mauve)]" />
                      <h3 className="font-bold text-base uppercase tracking-[0.08em] text-[var(--mauve)]" style={{ fontFamily: 'var(--font-primary)' }}>
                        {tips.title}
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {tips.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-base text-[var(--night-80)]" style={{ fontFamily: 'var(--font-primary)' }}>
                          <FiCheck size={14} className="text-[var(--jaune-or)] mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Help box */}
                  <div className="mt-4 bg-[var(--summit-ivory)] rounded-xl p-6 border border-[var(--mauve-10)]">
                    <div className="flex items-center gap-2 mb-3">
                      <FiInfo size={16} className="text-[var(--night-40)]" />
                      <span className="text-base font-semibold text-[var(--night-60)]" style={{ fontFamily: 'var(--font-primary)' }}>
                        Note importante
                      </span>
                    </div>
                    <p className="text-sm text-[var(--night-60)] leading-relaxed" style={{ fontFamily: 'var(--font-primary)' }}>
                      Ces outils sont fournis à titre indicatif. Les performances passées ne garantissent pas les performances futures. Consultez un conseiller pour des recommandations personnalisées.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. CTA — Light Section (matches services pages) ─── */}
      <section className="section-bg-light py-24 md:py-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
            <div className="md:col-span-7">
              <h2 className="font-primary font-bold text-5xl md:text-7xl leading-[1.05] mb-6 text-white">
                Besoin d'un accompagnement personnalisé ?
              </h2>
              <p className="text-xl md:text-2xl text-white/60 font-light max-w-2xl">
                Nos conseillers vous aident à construire une stratégie adaptée à votre profil et vos objectifs.
              </p>
            </div>
            <div className="md:col-span-5 flex flex-col sm:flex-row gap-6 md:justify-end">
              <a href="/contact" className="btn-primary-dark inline-flex items-center justify-center gap-4 px-10 py-5 text-xs uppercase tracking-[0.2em] font-bold w-fit">
                Prendre rendez-vous <FiArrowRight className="text-lg" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
