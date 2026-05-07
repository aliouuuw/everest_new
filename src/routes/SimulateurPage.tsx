import { useState } from 'react'
import { FiArrowRight, FiBookOpen, FiCheck, FiDollarSign, FiInfo, FiPercent, FiTarget, FiTrendingUp } from 'react-icons/fi'
import { CompoundInterestCalculator } from '../components/InvestorProfile/CompoundInterestCalculator'
import { DividendCalculator } from '../components/InvestorProfile/DividendCalculator'
import { InvestorProfileInline } from '../components/InvestorProfile/InvestorProfileInline'

type ToolId = 'profil' | 'interets' | 'dividendes'

const TABS = [
  { id: 'profil' as ToolId, icon: <FiTarget size={18} />, label: "Profil d'Investisseur" },
  { id: 'interets' as ToolId, icon: <FiPercent size={18} />, label: 'Simulateur' },
  { id: 'dividendes' as ToolId, icon: <FiDollarSign size={18} />, label: 'Calculateur Dividendes' },
] as const

const TOOL_META: Record<ToolId, { title: string; subtitle: string; icon: React.ReactNode }> = {
  profil: {
    title: "Détermination du Profil d'Investisseur",
    subtitle: "Identifiez votre profil d'investisseur pour des décisions adaptées à votre tolérance au risque",
    icon: <FiTarget size={20} />,
  },
  interets: {
    title: "Simulateur",
    subtitle: "Projettez la croissance de votre investissement grâce à la puissance des intérêts composés",
    icon: <FiTrendingUp size={20} />,
  },
  dividendes: {
    title: 'Calculateur de Dividendes',
    subtitle: 'Estimez vos revenus de dividendes et leur croissance potentielle',
    icon: <FiDollarSign size={20} />,
  },
}

const TOOL_TIPS: Record<ToolId, { title: string; items: Array<string> }> = {
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
      <section className="relative pt-[200px] pb-12 md:pb-16 border-b border-black/10 bg-[var(--everest-green)]">
        <div className="relative z-10 w-full page-container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            <div className="md:col-span-8">
              <h1 className="font-primary font-bold leading-[0.95] tracking-tight text-[var(--pure-white)]" style={{ fontSize: 'clamp(2.375rem, 4.6vw + 1.2rem, 50px)' }}>
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
        <div className="page-container">
          <div className="flex justify-center overflow-x-auto no-scrollbar py-4 gap-2 md:gap-4">
            {TABS.map((tab) => {
              const isActive = tab.id === activeTool
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTool(tab.id)}
                  className={`group flex items-center gap-2 px-5 py-2.5 outils-invest-label font-medium whitespace-nowrap rounded-md transition-all duration-200 ${
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
        <div className="page-container">
          {/* White card container */}
          <div className="bg-[var(--pure-white)] rounded-2xl border border-black/10 shadow-sm overflow-hidden">
            {/* Tool Header */}
            <div className="px-6 md:px-10 py-6 border-b border-black/10">
              <div className="flex items-start justify-center gap-4">
                <div>
                  <h2 className="font-bold text-lg md:text-xl tracking-[0.08em] text-[var(--night)] text-center" style={{ fontFamily: 'var(--font-primary)' }}>
                    {meta.title}
                  </h2>
                  <p className="text-base text-[var(--night-60)] mt-1 text-center" style={{ fontFamily: 'var(--font-primary)' }}>
                    {meta.subtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Tool Body */}
            <div className="p-6 md:p-10">
              <div>
                {/* Main tool area */}
                <div className="lg:col-span-2">
                  {activeTool === 'profil' && <InvestorProfileInline />}
                  {activeTool === 'interets' && <CompoundInterestCalculator />}
                  {activeTool === 'dividendes' && <DividendCalculator />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. CTA — Dark band (spacing matches FAQ / Expertises) ─── */}
      <section className="section-bg-light py-12 md:py-20">
        <div className="page-container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center">
            <div className="md:col-span-7">
              <h2
                className="font-primary font-bold leading-[0.95] tracking-tight mb-5 text-white"
                style={{ fontSize: 'clamp(2.375rem, 4.6vw + 1.2rem, 50px)' }}
              >
                Besoin d'un accompagnement personnalisé ?
              </h2>
              <p className="text-lg md:text-xl text-white/60 font-light max-w-2xl">
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
