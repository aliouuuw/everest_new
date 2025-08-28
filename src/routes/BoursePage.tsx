import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FiActivity, FiArrowDownRight, FiArrowUpRight, FiRefreshCw, FiTrendingDown, FiTrendingUp } from 'react-icons/fi'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { CTA } from '../components/Sections/CTA'
import { useReveal } from '../components/Hooks/useReveal'

// Types for better type safety
interface MarketIndex {
  name: string
  value: number
  change: number
  changePercent: number
  volume?: string
  average?: string
}

interface StockMovement {
  symbol: string
  name: string
  change: number
  changePercent: number
  volume?: number
  price?: number
}

interface MovementCategory {
  label: string
  type: 'gainers' | 'losers' | 'volume'
  items: Array<StockMovement>
  accent: string
}

// Constants for better maintainability
const MARKET_DATA_REFRESH_INTERVAL = 3*60*1000 // 3 minutes
const ANIMATION_DELAY = 100

// Mock data - in production, this would come from an API
const MOCK_MARKET_INDICES: Array<MarketIndex> = [
  {
    name: 'BRVM 10',
    value: 178.52,
    change: 1.48,
    changePercent: 0.84,
    volume: '1,8 Mds XOF',
    average: '1,5 Mds'
  },
  {
    name: 'BRVM Composite',
    value: 230.14,
    change: -0.48,
    changePercent: -0.21,
    volume: '2,2 Mds XOF',
    average: '2,0 Mds'
  },
  {
    name: 'Volume quotidien',
    value: 1800000000,
    change: 0,
    changePercent: 0,
    volume: '1,8 Mds XOF',
    average: '1,5 Mds'
  }
]

const MOCK_STOCK_MOVEMENTS: Array<MovementCategory> = [
  {
    label: 'Gagnants',
    type: 'gainers',
    accent: 'text-[var(--success-700)]',
    items: [
      { symbol: 'ETIT.PA', name: 'Ecobank', change: 7.2, changePercent: 7.2, volume: 420000000, price: 25.50 },
      { symbol: 'SNTS.PA', name: 'Sonatel', change: 5.4, changePercent: 5.4, volume: 310000000, price: 18.75 },
      { symbol: 'ORGT.PA', name: 'Orange CI', change: 3.1, changePercent: 3.1, volume: 260000000, price: 12.30 }
    ]
  },
  {
    label: 'Perdants',
    type: 'losers',
    accent: 'text-[var(--danger-700)]',
    items: [
      { symbol: 'BOAC.PA', name: 'BOA', change: -6.1, changePercent: -6.1, volume: 150000000, price: 8.90 },
      { symbol: 'SHEC.PA', name: 'SHELC', change: -4.8, changePercent: -4.8, volume: 98000000, price: 15.20 },
      { symbol: 'CABC.PA', name: 'CBAO', change: -3.2, changePercent: -3.2, volume: 75000000, price: 22.45 }
    ]
  },
  {
    label: 'Volumes',
    type: 'volume',
    accent: 'text-[var(--night-80)]/80',
    items: [
      { symbol: 'ETIT.PA', name: 'Ecobank', change: 0, changePercent: 0, volume: 420000000, price: 25.50 },
      { symbol: 'SNTS.PA', name: 'Sonatel', change: 0, changePercent: 0, volume: 310000000, price: 18.75 },
      { symbol: 'ORGT.PA', name: 'Orange CI', change: 0, changePercent: 0, volume: 260000000, price: 12.30 }
    ]
  }
]

// Utility functions
const formatCurrency = (amount: number, currency: string = 'FCFA'): string => {
  if (amount >= 1000000000) {
    return `${(amount / 1000000000).toFixed(1)} Mds ${currency}`
  } else if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(0)} M ${currency}`
  }
  return `${amount.toLocaleString()} ${currency}`
}

const formatNumber = (num: number): string => {
  return num.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

// Sub-components for better modularity
const MarketIndexCard: React.FC<{ index: MarketIndex; delay?: number }> = ({ index, delay = 0 }) => {
  const cardRef = useReveal<HTMLDivElement>()

  return (
    <div
      ref={cardRef}
      className="stat-card rounded-2xl p-6 md:p-7 lg:p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-xs md:text-sm text-secondary uppercase tracking-wide">
        {index.name}
      </div>
      <div className="font-display text-2xl md:text-3xl mt-1 font-bold">
        {index.name === 'Volume quotidien' ? formatCurrency(index.value, 'XOF') : formatNumber(index.value)}
      </div>
      <div className="mt-2 inline-flex items-center gap-2 text-sm md:text-base">
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-medium border ${
          index.changePercent > 0
            ? 'text-green-700 bg-green-50 border-green-200'
            : index.changePercent < 0
            ? 'text-red-700 bg-red-50 border-red-200'
            : 'text-[var(--night-80)]/80 border-transparent'
        }`}>
          {index.changePercent > 0 ? <FiArrowUpRight className="w-4 h-4" /> :
           index.changePercent < 0 ? <FiArrowDownRight className="w-4 h-4" /> :
           <FiActivity className="w-4 h-4" />}
          {index.changePercent !== 0 && (
            <span>
              {index.changePercent > 0 ? '+' : ''}{index.changePercent.toFixed(2)}%
            </span>
          )}
          {index.changePercent === 0 && <span>Stable</span>}
        </span>
        {index.average && (
          <span className="text-[var(--night-80)]/60">
            Moy. 20j: {index.average}
          </span>
        )}
      </div>
    </div>
  )
}

const StockMovementCard: React.FC<{ category: MovementCategory; delay?: number }> = ({ category, delay = 0 }) => {
  const cardRef = useReveal<HTMLDivElement>()

  const getIcon = () => {
    switch (category.type) {
      case 'gainers': return <FiTrendingUp className="w-5 h-5" />
      case 'losers': return <FiTrendingDown className="w-5 h-5" />
      default: return <FiActivity className="w-5 h-5" />
    }
  }

  

  return (
    <div
      ref={cardRef}
      className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 md:p-7 lg:p-8 transition-all duration-300 card-hover hover:shadow-xl"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
      <div className="flex items-center gap-2 font-display text-lg md:text-xl mb-3">
        <span className={category.accent}>{getIcon()}</span>
        <span>{category.label}</span>
      </div>
      <ul className="text-sm md:text-base space-y-2 leading-relaxed">
        {category.items.map((item, index) => (
          <li key={`${item.symbol}-${index}`} className="flex justify-between items-center py-1">
            <span className="font-medium text-[var(--night)]">{item.symbol}</span>
            {category.type === 'gainers' || category.type === 'losers' ? (
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs md:text-sm font-medium border ${
                (category.type === 'gainers' || item.changePercent > 0)
                  ? 'text-green-700 bg-green-50 border-green-200'
                  : 'text-red-700 bg-red-50 border-red-200'
              }`}>
                {item.changePercent > 0 ? <FiArrowUpRight className="w-4 h-4" /> : <FiArrowDownRight className="w-4 h-4" />}
                {item.changePercent > 0 ? '+' : ''}{item.changePercent.toFixed(1)}%
              </span>
            ) : (
              <span className="text-[var(--night-80)]/80">{formatCurrency(item.volume || 0, 'FCFA')}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center py-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--gold-metallic)]"></div>
  </div>
)

export const BoursePage: React.FC = () => {
  const [marketData, setMarketData] = useState<Array<MarketIndex>>(MOCK_MARKET_INDICES)
  const [stockMovements] = useState<Array<MovementCategory>>(MOCK_STOCK_MOVEMENTS)
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  // Animation refs
  const heroRef = useReveal<HTMLElement>()
  const overviewSectionRef = useReveal<HTMLElement>()
  const overviewGridRef = useReveal<HTMLDivElement>()
  const movesSectionRef = useReveal<HTMLElement>()
  const movesGridRef = useReveal<HTMLDivElement>()

  // Memoized calculations for performance
  const marketSummary = useMemo(() => {
    const totalVolume = marketData.reduce((sum, index) => sum + (index.value || 0), 0)
    const positiveIndices = marketData.filter(index => index.changePercent > 0).length
    const negativeIndices = marketData.filter(index => index.changePercent < 0).length

    return {
      totalVolume,
      positiveIndices,
      negativeIndices,
      neutralIndices: marketData.length - positiveIndices - negativeIndices
    }
  }, [marketData])

  // Simulate data refresh
  const refreshData = useCallback(async () => {
    setIsLoading(true)
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // In a real app, this would fetch from an API
    // For now, we'll simulate slight data changes
    const updatedIndices = marketData.map(index => ({
      ...index,
      value: index.value + (Math.random() - 0.5) * 2,
      changePercent: index.changePercent + (Math.random() - 0.5) * 0.5
    }))

    setMarketData(updatedIndices)
    setLastUpdated(new Date())
    setIsLoading(false)
  }, [marketData])

  // Auto-refresh data
  useEffect(() => {
    const interval = setInterval(refreshData, MARKET_DATA_REFRESH_INTERVAL)
    return () => clearInterval(interval)
  }, [refreshData])

  return (
    <div className="min-h-screen bg-[var(--pure-white)] text-[var(--night)]">
      <Header />

      <main className="pt-24 sm:pt-28 lg:pt-32">
        {/* Hero Section with enhanced interactivity */}
        <section ref={heroRef} className="reveal py-16 sm:py-20 lg:py-24 relative">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <span className="kicker text-gradient-gold">BRVM — Marchés</span>
            <h1 className="luxury-heading mt-3">Indices et tendances de marché</h1>
            <p className="luxury-subheading mt-5 leading-relaxed max-w-3xl mx-auto">
              Aperçu en temps réel des principaux indices et mouvements sur la BRVM.
              Données mises à jour automatiquement toutes les 3 minutes.
            </p>

            {/* Market Status Indicator */}
            <div className="flex items-center justify-center gap-6 mt-8 text-sm">
              <div className="relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200 shadow-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-40"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-600"></span>
                </span>
                <span className="text-green-700 font-semibold">Marché ouvert</span>
              </div>
              <div className="text-[var(--night-80)]/60">
                Dernière mise à jour: {lastUpdated.toLocaleTimeString('fr-FR')}
              </div>
              <button
                onClick={refreshData}
                disabled={isLoading}
                className="flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--gold-metallic)]/10 hover:bg-[var(--gold-metallic)]/20 transition-colors disabled:opacity-50"
                aria-label="Actualiser les données"
              >
                <FiRefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span className="text-xs font-medium">Actualiser</span>
              </button>
            </div>
          </div>
        </section>

        {/* Market Overview with enhanced cards */}
        <section ref={overviewSectionRef} className="reveal py-12 sm:py-16 lg:py-20 bg-[var(--white-smoke)]/60 border-y border-[var(--night)]/5">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-8">
              <h2 className="text-xl font-display font-semibold text-[var(--night)]">
                Résumé du marché
              </h2>
              <p className="text-[var(--night-80)]/80 mt-2">
                {marketSummary.positiveIndices} haussière{marketSummary.positiveIndices > 1 ? 's' : ''}, {' '}
                {marketSummary.negativeIndices} baissière{marketSummary.negativeIndices > 1 ? 's' : ''}, {' '}
                {marketSummary.neutralIndices} stable{marketSummary.neutralIndices > 1 ? 's' : ''}
              </p>
            </div>

            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <div ref={overviewGridRef} className="reveal-stagger grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 lg:gap-10 numeric-tabular">
                {marketData.map((index, indexPos) => (
                  <MarketIndexCard
                    key={index.name}
                    index={index}
                    delay={indexPos * ANIMATION_DELAY}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Latest movements with enhanced cards */}
        <section ref={movesSectionRef} className="reveal py-14 sm:py-18 lg:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-2xl mx-auto">
              <span className="kicker text-gradient-gold">Derniers mouvements</span>
              <h2 className="luxury-heading mt-3">Titres en vue</h2>
              <p className="luxury-subheading mt-5 leading-relaxed">
                Gagnants, perdants et volumes remarquables de la séance en temps réel.
              </p>
            </div>

            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <div ref={movesGridRef} className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 mt-12">
                {stockMovements.map((category, index) => (
                  <StockMovementCard
                    key={category.label}
                    category={category}
                    delay={index * ANIMATION_DELAY}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Enhanced CTA with more context */}
        <CTA
          scheme="ivory"
          primaryHref="/portal"
          primaryLabel="Ouvrir un compte"
          secondaryHref="/newsroom"
          secondaryLabel="Voir nos analyses"
        />
      </main>

      <Footer />
    </div>
  )
}


