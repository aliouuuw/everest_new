import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FiBarChart, FiEye, FiRefreshCw, FiStar, FiTrendingUp } from 'react-icons/fi'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
import { useReveal } from '../components/Hooks/useReveal'

// Types for better type safety
interface CryptoAsset {
  id: string
  symbol: string
  name: string
  price: number
  change24h: number
  changePercent24h: number
  volume24h: number
  marketCap: number
  rank: number
  high24h: number
  low24h: number
  priceChange24h: number
  isFavorite?: boolean
  sparkline?: Array<number>
}

interface MarketStats {
  totalMarketCap: number
  totalVolume: number
  btcDominance: number
  marketCapChange: number
}

interface TrendingAsset {
  symbol: string
  name: string
  price: number
  changePercent: number
  volume: number
}

// Constants for better maintainability
const MARKET_DATA_REFRESH_INTERVAL = 60*1000 // 60 seconds for BRVM-style real-time updates
const ANIMATION_DELAY = 100

// Mock data - BRVM stock market data from BRVMTicker
const MOCK_CRYPTO_ASSETS: Array<CryptoAsset> = [
  {
    id: 'sonatel',
    symbol: 'SONATEL',
    name: 'Sonatel',
    price: 12500,
    change24h: 150,
    changePercent24h: 1.21,
    volume24h: 850000000,
    marketCap: 2850000000000,
    rank: 1,
    high24h: 12650,
    low24h: 12350,
    priceChange24h: 150,
    sparkline: [12350, 12400, 12450, 12500, 12500]
  },
  {
    id: 'boa',
    symbol: 'BOA',
    name: 'Bank of Africa',
    price: 8500,
    change24h: -75,
    changePercent24h: -0.87,
    volume24h: 620000000,
    marketCap: 2450000000000,
    rank: 2,
    high24h: 8600,
    low24h: 8425,
    priceChange24h: -75,
    sparkline: [8575, 8550, 8525, 8500, 8500]
  },
  {
    id: 'sgbs',
    symbol: 'SGBS',
    name: 'SGBS',
    price: 9200,
    change24h: 200,
    changePercent24h: 2.22,
    volume24h: 480000000,
    marketCap: 1850000000000,
    rank: 3,
    high24h: 9300,
    low24h: 9000,
    priceChange24h: 200,
    sparkline: [9000, 9100, 9150, 9200, 9200]
  },
  {
    id: 'boad',
    symbol: 'BOAD',
    name: 'BOAD',
    price: 6800,
    change24h: 0,
    changePercent24h: 0,
    volume24h: 320000000,
    marketCap: 1250000000000,
    rank: 4,
    high24h: 6850,
    low24h: 6750,
    priceChange24h: 0,
    sparkline: [6800, 6800, 6800, 6800, 6800]
  },
  {
    id: 'nsia',
    symbol: 'NSIA',
    name: 'NSIA',
    price: 11500,
    change24h: -120,
    changePercent24h: -1.03,
    volume24h: 380000000,
    marketCap: 980000000000,
    rank: 5,
    high24h: 11620,
    low24h: 11380,
    priceChange24h: -120,
    sparkline: [11620, 11580, 11540, 11500, 11500]
  },
  {
    id: 'sicc',
    symbol: 'SICC',
    name: 'SICC',
    price: 4500,
    change24h: 50,
    changePercent24h: 1.12,
    volume24h: 180000000,
    marketCap: 750000000000,
    rank: 6,
    high24h: 4550,
    low24h: 4450,
    priceChange24h: 50,
    sparkline: [4450, 4475, 4488, 4500, 4500]
  },
  {
    id: 'cic',
    symbol: 'CIC',
    name: 'CIC',
    price: 7800,
    change24h: 180,
    changePercent24h: 2.36,
    volume24h: 290000000,
    marketCap: 680000000000,
    rank: 7,
    high24h: 7900,
    low24h: 7620,
    priceChange24h: 180,
    sparkline: [7620, 7700, 7750, 7800, 7800]
  },
  {
    id: 'sde',
    symbol: 'SDE',
    name: 'SDE',
    price: 3200,
    change24h: -25,
    changePercent24h: -0.77,
    volume24h: 95000000,
    marketCap: 420000000000,
    rank: 8,
    high24h: 3225,
    low24h: 3175,
    priceChange24h: -25,
    sparkline: [3225, 3213, 3206, 3200, 3200]
  }
]

const MOCK_MARKET_STATS: MarketStats = {
  totalMarketCap: 12500000000000, // 12.5 trillion XOF
  totalVolume: 1800000000000,  // 1.8 trillion XOF
  btcDominance: 0, // Not applicable for BRVM
  marketCapChange: 1.85
}

const MOCK_TRENDING_ASSETS: Array<TrendingAsset> = [
  { symbol: 'SONATEL', name: 'Sonatel', price: 12500, changePercent: 1.21, volume: 850000000 },
  { symbol: 'SGBS', name: 'SGBS', price: 9200, changePercent: 2.22, volume: 480000000 },
  { symbol: 'CIC', name: 'CIC', price: 7800, changePercent: 2.36, volume: 290000000 },
  { symbol: 'SICC', name: 'SICC', price: 4500, changePercent: 1.12, volume: 180000000 },
  { symbol: 'BOA', name: 'Bank of Africa', price: 8500, changePercent: -0.87, volume: 620000000 }
]

// Utility functions
const formatCurrency = (amount: number, currency: string = 'XOF'): string => {
  if (amount >= 1000000000000) {
    return `${(amount / 1000000000000).toFixed(1)} Bds ${currency}`
  } else if (amount >= 1000000000) {
    return `${(amount / 1000000000).toFixed(1)} Mds ${currency}`
  } else if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(0)} M ${currency}`
  }
  return `${amount.toLocaleString()} ${currency}`
}

const formatPrice = (price: number): string => {
  if (price >= 1000) {
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  } else if (price >= 1) {
    return price.toFixed(2)
  } else {
    return price.toFixed(6)
  }
}

const formatPercent = (percent: number): string => {
  return `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`
}

// Sub-components for better modularity
const MarketStatsCard: React.FC<{ stats: MarketStats; delay?: number }> = ({ stats, delay = 0 }) => {
  const cardRef = useReveal<HTMLDivElement>()

  return (
    <div
      ref={cardRef}
      className="glass-card-dark glass-card-hover p-6"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <div className="text-secondary-dark text-xs uppercase tracking-wide mb-2">Capitalisation</div>
          <div className="font-display text-xl text-[var(--pure-white)] font-bold">
            {formatCurrency(stats.totalMarketCap)}
          </div>
          <div className="text-emerald-400 text-sm mt-1">
            {formatPercent(stats.marketCapChange)}
          </div>
        </div>
        <div>
          <div className="text-secondary-dark text-xs uppercase tracking-wide mb-2">Volume 24h</div>
          <div className="font-display text-xl text-[var(--pure-white)] font-bold">
            {formatCurrency(stats.totalVolume)}
          </div>
        </div>
        <div>
          <div className="text-secondary-dark text-xs uppercase tracking-wide mb-2">Sociétés Cotées</div>
          <div className="font-display text-xl text-[var(--pure-white)] font-bold">
            47
          </div>
        </div>
        <div>
          <div className="text-secondary-dark text-xs uppercase tracking-wide mb-2">Indices BRVM</div>
          <div className="font-display text-xl text-[var(--pure-white)] font-bold">
            BRVM 10
          </div>
        </div>
      </div>
    </div>
  )
}

const CryptoAssetRow: React.FC<{ asset: CryptoAsset; delay?: number }> = ({ asset, delay = 0 }) => {
  const rowRef = useReveal<HTMLDivElement>()

  return (
    <div
      ref={rowRef}
      className="glass-card-dark glass-card-hover p-4 hover:bg-[var(--night-20)] transition-all duration-200 cursor-pointer"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="grid grid-cols-12 gap-4 items-center">
        {/* Rank & Favorite */}
        <div className="col-span-1 flex items-center gap-2">
          <button className="text-[var(--pure-white)] hover:text-[var(--gold-metallic)] transition-colors opacity-60 hover:opacity-100">
            <FiStar className="w-4 h-4" />
          </button>
          <span className="text-secondary-dark font-mono text-sm">#{asset.rank}</span>
        </div>

        {/* Name & Symbol */}
        <div className="col-span-3 flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-[var(--gold-metallic)] to-[var(--gold-light)] rounded-full flex items-center justify-center">
            <span className="text-[var(--night)] font-bold text-xs">{asset.symbol.slice(0, 3)}</span>
          </div>
          <div>
            <div className="font-display text-[var(--pure-white)] font-medium">{asset.name}</div>
            <div className="text-secondary-dark text-xs uppercase">{asset.symbol}</div>
          </div>
        </div>

        {/* Price */}
        <div className="col-span-2 text-right">
          <div className="font-display text-[var(--pure-white)] font-medium">
            {formatPrice(asset.price)}
          </div>
        </div>

        {/* 24h Change */}
        <div className="col-span-2 text-right">
          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-sm font-medium ${
            asset.changePercent24h >= 0
              ? 'text-emerald-400 bg-emerald-400/10'
              : 'text-red-400 bg-red-400/10'
          }`}>
            {asset.changePercent24h >= 0 ?
              <FaArrowUp className="w-3 h-3 text-emerald-400" /> :
              <FaArrowDown className="w-3 h-3 text-red-400" />
            }
            {formatPercent(asset.changePercent24h)}
          </div>
        </div>

        {/* 24h High/Low */}
        <div className="col-span-2 text-right">
          <div className="text-xs text-secondary-dark">
            <div>Max: {formatPrice(asset.high24h)}</div>
            <div>Min: {formatPrice(asset.low24h)}</div>
          </div>
        </div>

        {/* Market Cap */}
        <div className="col-span-2 text-right">
          <div className="font-display text-[var(--pure-white)] font-medium">
            {formatCurrency(asset.marketCap)}
          </div>
          <div className="text-secondary-dark text-xs">
            Vol: {formatCurrency(asset.volume24h)}
          </div>
        </div>
      </div>
    </div>
  )
}

const TrendingCard: React.FC<{ assets: Array<TrendingAsset>; delay?: number }> = ({ assets, delay = 0 }) => {
  const cardRef = useReveal<HTMLDivElement>()

  return (
    <div
      ref={cardRef}
      className="glass-card-dark p-6"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-2 mb-4">
        <FiTrendingUp className="text-[var(--gold-metallic)] w-5 h-5" />
        <h3 className="font-display text-[var(--pure-white)] text-lg">En Tendance</h3>
      </div>
      <div className="space-y-3">
        {assets.map((asset, index) => (
          <div key={asset.symbol} className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <span className="text-secondary-dark font-mono text-sm">#{index + 1}</span>
              <div>
                <div className="font-display text-[var(--pure-white)] text-sm font-medium">{asset.symbol}</div>
                <div className="text-secondary-dark text-xs">{formatPrice(asset.price)}</div>
              </div>
            </div>
            <div className={`text-sm font-medium ${
              asset.changePercent >= 0 ? 'text-emerald-400' : 'text-red-400'
            }`}>
              {formatPercent(asset.changePercent)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center py-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--gold-metallic)]"></div>
  </div>
)

export const BoursePage: React.FC = () => {
  const [cryptoAssets, setCryptoAssets] = useState<Array<CryptoAsset>>(MOCK_CRYPTO_ASSETS)
  const [marketStats, setMarketStats] = useState<MarketStats>(MOCK_MARKET_STATS)
  const [trendingAssets] = useState<Array<TrendingAsset>>(MOCK_TRENDING_ASSETS)
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [sortBy, _setSortBy] = useState<'rank' | 'price' | 'change' | 'marketCap'>('rank')
  const [filterBy, setFilterBy] = useState<'all' | 'gainers' | 'losers'>('all')

  // Animation refs
  const heroRef = useReveal<HTMLElement>()
  const statsSectionRef = useReveal<HTMLElement>()
  const assetsSectionRef = useReveal<HTMLDivElement>()
  const trendingSectionRef = useReveal<HTMLDivElement>()

  // Memoized filtered and sorted assets
  const filteredAssets = useMemo(() => {
    let filtered = [...cryptoAssets]

    // Apply filter
    if (filterBy === 'gainers') {
      filtered = filtered.filter(asset => asset.changePercent24h > 0)
    } else if (filterBy === 'losers') {
      filtered = filtered.filter(asset => asset.changePercent24h < 0)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return b.price - a.price
        case 'change':
          return b.changePercent24h - a.changePercent24h
        case 'marketCap':
          return b.marketCap - a.marketCap
        default:
          return a.rank - b.rank
      }
    })

    return filtered
  }, [cryptoAssets, sortBy, filterBy])

  // Simulate data refresh with BRVM-style updates
  const refreshData = useCallback(async () => {
    setIsLoading(true)
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800))

    // Simulate realistic BRVM price movements
    const updatedAssets = cryptoAssets.map(asset => ({
      ...asset,
      price: asset.price + (Math.random() - 0.5) * asset.price * 0.015, // ±1.5% movement
      changePercent24h: asset.changePercent24h + (Math.random() - 0.5) * 1.5,
      volume24h: asset.volume24h * (0.85 + Math.random() * 0.3) // ±15% volume change
    }))

    const updatedStats = {
      ...marketStats,
      totalMarketCap: marketStats.totalMarketCap + (Math.random() - 0.5) * marketStats.totalMarketCap * 0.008,
      totalVolume: marketStats.totalVolume + (Math.random() - 0.5) * marketStats.totalVolume * 0.03,
      marketCapChange: marketStats.marketCapChange + (Math.random() - 0.5) * 0.8
    }

    setCryptoAssets(updatedAssets)
    setMarketStats(updatedStats)
    setLastUpdated(new Date())
    setIsLoading(false)
  }, [cryptoAssets, marketStats])

  // Auto-refresh data
  useEffect(() => {
    const interval = setInterval(refreshData, MARKET_DATA_REFRESH_INTERVAL)
    return () => clearInterval(interval)
  }, [refreshData])

  return (
    <div className="bg-[var(--night)] min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="reveal py-24 lg:py-28 relative bg-gradient-to-b from-[var(--night)] to-[var(--night-20)]">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <span className="kicker text-gradient-gold">BRVM — Marché Actions</span>
          <h1 className="luxury-heading-dark mt-3">Cours Actions Temps Réel</h1>
          <p className="luxury-subheading-dark mt-5 leading-relaxed max-w-3xl mx-auto pt-8">
            Données de marché en temps réel, cours et volumes de transaction BRVM.
            Mise à jour toutes les 60 secondes avec les derniers mouvements.
          </p>

          {/* Market Status Indicator */}
          <div className="flex items-center justify-center gap-6 mt-8 text-sm">
            <div className="relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/20">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
              </span>
              <span className="text-emerald-400 font-semibold">Marché Ouvert</span>
            </div>
            <div className="text-secondary-dark">
              Dernière mise à jour: {lastUpdated.toLocaleTimeString('fr-FR')}
            </div>
            <button
              onClick={refreshData}
              disabled={isLoading}
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--gold-metallic)]/10 hover:bg-[var(--gold-metallic)]/20 transition-colors disabled:opacity-50 border border-[var(--gold-metallic)]/20"
              aria-label="Actualiser les données"
            >
              <FiRefreshCw className={`w-4 h-4 text-[var(--pure-white)] ${isLoading ? 'animate-spin' : ''}`} />
              <span className="text-xs font-medium text-[var(--pure-white)]">Actualiser</span>
            </button>
          </div>
        </div>
      </section>

      {/* Market Stats Overview */}
      <section ref={statsSectionRef} className="reveal py-12 bg-[var(--night-20)] border-y border-[var(--night-20)]">
        <div className="mx-auto max-w-6xl px-6">
          <MarketStatsCard stats={marketStats} />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Asset List */}
            <div className="lg:col-span-3">
              <div ref={assetsSectionRef} className="reveal">
                {/* Header with controls */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-display font-bold text-[var(--pure-white)]">Cours des Actions BRVM</h2>
                    <p className="text-secondary-dark mt-1">Données de marché temps réel pour les principales valeurs</p>
                  </div>

                  {/* Filter & Sort Controls */}
                  <div className="flex flex-wrap gap-2">
                    <div className="flex gap-1">
                      <button
                        onClick={() => setFilterBy('all')}
                        className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                          filterBy === 'all'
                            ? 'bg-[var(--gold-metallic)] text-[var(--night)]'
                            : 'bg-[var(--night-20)] text-secondary-dark hover:bg-[var(--night-10)]'
                        }`}
                      >
                        Toutes
                      </button>
                      <button
                        onClick={() => setFilterBy('gainers')}
                        className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                          filterBy === 'gainers'
                            ? 'bg-emerald-400/20 text-emerald-400 border border-emerald-400/30'
                            : 'bg-[var(--night-20)] text-secondary-dark hover:bg-[var(--night-10)]'
                        }`}
                      >
                        Gagnantes
                      </button>
                      <button
                        onClick={() => setFilterBy('losers')}
                        className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                          filterBy === 'losers'
                            ? 'bg-red-400/20 text-red-400 border border-red-400/30'
                            : 'bg-[var(--night-20)] text-secondary-dark hover:bg-[var(--night-10)]'
                        }`}
                      >
                        Perdantes
                      </button>
                    </div>
                  </div>
                </div>

                {/* Table Header */}
                <div className="glass-card-dark p-4 mb-2">
                  <div className="grid grid-cols-12 gap-4 text-xs font-medium text-secondary-dark uppercase tracking-wide">
                    <div className="col-span-1">#</div>
                    <div className="col-span-3">Société</div>
                    <div className="col-span-2 text-right">Cours</div>
                    <div className="col-span-2 text-right">Variation</div>
                    <div className="col-span-2 text-right">+/− Jour</div>
                    <div className="col-span-2 text-right">Capitalisation</div>
                  </div>
                </div>

                {/* Asset List */}
                {isLoading ? (
                  <LoadingSpinner />
                ) : (
                  <div className="space-y-1">
                    {filteredAssets.map((asset, index) => (
                      <CryptoAssetRow
                        key={asset.id}
                        asset={asset}
                        delay={index * ANIMATION_DELAY}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Trending */}
              <div ref={trendingSectionRef} className="reveal">
                <TrendingCard assets={trendingAssets} />
              </div>

              {/* Market Insights */}
              <div className="glass-card-dark p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FiBarChart className="text-[var(--gold-metallic)] w-5 h-5" />
                  <h3 className="font-display text-[var(--pure-white)] text-lg">Analyse Marché</h3>
                </div>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-secondary-dark">BRVM 10</span>
                    <span className="text-emerald-400 font-medium">+2.45%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-secondary-dark">Volume Moyen</span>
                    <span className="text-[var(--pure-white)]">1,8 Mds XOF</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-secondary-dark">Secteur Dominant</span>
                    <span className="text-emerald-400">Banques</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="glass-card-dark p-6">
                <h3 className="font-display text-[var(--pure-white)] text-lg mb-4">Actions Rapides</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[var(--gold-metallic)] hover:bg-[var(--gold-light)] text-[var(--night)] rounded-lg font-medium transition-colors">
                    <FiEye className="w-4 h-4 text-[var(--night)]" />
                    Liste de Surveillance
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[var(--night-20)] hover:bg-[var(--night-10)] text-[var(--pure-white)] rounded-lg font-medium transition-colors border border-[var(--gold-metallic)]/20">
                    <FiBarChart className="w-4 h-4 text-[var(--pure-white)]" />
                    Portefeuille
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


