import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FiBarChart, FiEye, FiRefreshCw, FiStar } from 'react-icons/fi'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
import { useReveal } from '../components/Hooks/useReveal'
import { LoadingSpinner } from '@/components/CMS/Shared'

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
      className="border border-black/10 p-8"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-[rgba(10,10,10,0.5)] mb-2">Capitalisation</div>
          <div className="font-display-aptos text-2xl text-[var(--night)]">
            {formatCurrency(stats.totalMarketCap)}
          </div>
          <div className="text-green-700 text-sm mt-1">
            {formatPercent(stats.marketCapChange)}
          </div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-[rgba(10,10,10,0.5)] mb-2">Volume 24h</div>
          <div className="font-display-aptos text-2xl text-[var(--night)]">
            {formatCurrency(stats.totalVolume)}
          </div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-[rgba(10,10,10,0.5)] mb-2">Sociétés Cotées</div>
          <div className="font-display-aptos text-2xl text-[var(--night)]">
            47
          </div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-[rgba(10,10,10,0.5)] mb-2">Indices BRVM</div>
          <div className="font-display-aptos text-2xl text-[var(--night)]">
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
      className="border-b border-black/10 py-4 hover:bg-[var(--white-smoke)]/30 transition-colors cursor-pointer"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="grid grid-cols-12 gap-4 items-center">
        {/* Rank & Favorite */}
        <div className="col-span-1 flex items-center gap-2">
          <button className="text-[var(--night)] hover:text-[var(--jaune-or)] transition-colors opacity-60 hover:opacity-100">
            <FiStar className="w-4 h-4" />
          </button>
          <span className="text-[rgba(10,10,10,0.5)] font-mono text-sm">#{asset.rank}</span>
        </div>

        {/* Name & Symbol */}
        <div className="col-span-3 flex items-center gap-3">
          <div className="w-8 h-8 bg-[var(--jaune-or)] flex items-center justify-center">
            <span className="text-[var(--night)] font-bold text-xs">{asset.symbol.slice(0, 3)}</span>
          </div>
          <div>
            <div className="font-display-aptos text-[var(--night)] font-medium">{asset.name}</div>
            <div className="text-[rgba(10,10,10,0.5)] text-xs uppercase">{asset.symbol}</div>
          </div>
        </div>

        {/* Price */}
        <div className="col-span-2 text-right">
          <div className="font-display-aptos text-[var(--night)] font-medium">
            {formatPrice(asset.price)}
          </div>
        </div>

        {/* 24h Change */}
        <div className="col-span-2 text-right">
          <div className={`inline-flex items-center gap-1 px-2 py-1 text-sm font-medium ${
            asset.changePercent24h >= 0
              ? 'text-green-700 bg-green-700/10'
              : 'text-red-600 bg-red-600/10'
          }`}>
            {asset.changePercent24h >= 0 ?
              <FaArrowUp className="w-3 h-3 text-green-700" /> :
              <FaArrowDown className="w-3 h-3 text-red-600" />
            }
            {formatPercent(asset.changePercent24h)}
          </div>
        </div>

        {/* 24h High/Low */}
        <div className="col-span-2 text-right">
          <div className="text-xs text-[rgba(10,10,10,0.5)]">
            <div>Max: {formatPrice(asset.high24h)}</div>
            <div>Min: {formatPrice(asset.low24h)}</div>
          </div>
        </div>

        {/* Market Cap */}
        <div className="col-span-2 text-right">
          <div className="font-display-aptos text-[var(--night)] font-medium">
            {formatCurrency(asset.marketCap)}
          </div>
          <div className="text-[rgba(10,10,10,0.5)] text-xs">
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
      className="border border-black/10 p-6"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-px bg-[var(--jaune-or)]" />
        <h3 className="font-display-aptos text-[var(--night)] text-lg">En Tendance</h3>
      </div>
      <div className="space-y-4">
        {assets.map((asset, index) => (
          <div key={asset.symbol} className="flex items-center justify-between py-2 border-b border-black/5 last:border-0">
            <div className="flex items-center gap-3">
              <span className="text-[rgba(10,10,10,0.5)] font-mono text-sm">#{index + 1}</span>
              <div>
                <div className="font-display-aptos text-[var(--night)] text-sm font-medium">{asset.symbol}</div>
                <div className="text-[rgba(10,10,10,0.5)] text-xs">{formatPrice(asset.price)}</div>
              </div>
            </div>
            <div className={`text-sm font-medium ${
              asset.changePercent >= 0 ? 'text-green-700' : 'text-red-600'
            }`}>
              {formatPercent(asset.changePercent)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


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
    <div className="bg-[var(--pure-white)] min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="reveal relative py-24 md:py-32 border-b border-black/10">
        <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80"
            alt="Marché BRVM"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--pure-white)] via-[var(--pure-white)]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--pure-white)] via-transparent to-transparent" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-px bg-[var(--jaune-or)]" />
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--jaune-or)]">
                  BRVM — Marché Actions
                </span>
              </div>
              <h1 className="font-display-aptos text-5xl md:text-7xl lg:text-[6.5rem] leading-[0.95] tracking-tight mb-8">
                Cours Actions Temps Réel.
              </h1>
            </div>
            <div className="lg:col-span-4 pb-4">
              <p className="text-lg md:text-xl leading-relaxed text-[rgba(10, 10, 10, 0.8)] font-light mb-8 border-l border-[var(--jaune-or)] pl-6">
                Données de marché en temps réel, cours et volumes de transaction BRVM.
              </p>
              {/* Market Status Indicator */}
              <div className="flex items-center gap-4 text-sm">
                <div className="relative inline-flex items-center gap-2 px-3 py-1.5 border border-green-700/20">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full bg-green-700 opacity-40"></span>
                    <span className="relative inline-flex h-2.5 w-2.5 bg-green-700"></span>
                  </span>
                  <span className="text-green-700 font-semibold">Marché Ouvert</span>
                </div>
                <span className="text-[rgba(10,10,10,0.5)]">
                  {lastUpdated.toLocaleTimeString('fr-FR')}
                </span>
                <button
                  onClick={refreshData}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-3 py-1 border border-black/10 hover:border-[var(--jaune-or)] transition-colors disabled:opacity-50"
                  aria-label="Actualiser les données"
                >
                  <FiRefreshCw className={`w-4 h-4 text-[var(--night)] ${isLoading ? 'animate-spin' : ''}`} />
                  <span className="text-xs font-medium text-[var(--night)]">Actualiser</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Stats Overview */}
      <section ref={statsSectionRef} className="reveal py-12 border-b border-black/10">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <MarketStatsCard stats={marketStats} />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 md:py-40">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Asset List */}
            <div className="lg:col-span-3">
              <div ref={assetsSectionRef} className="reveal">
                {/* Header with controls */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                  <div>
                    <h2 className="font-display-aptos text-2xl text-[var(--night)]">Cours des Actions BRVM</h2>
                    <p className="text-[rgba(10,10,10,0.5)] mt-1">Données de marché temps réel</p>
                  </div>

                  {/* Filter & Sort Controls */}
                  <div className="flex flex-wrap gap-2">
                    <div className="flex gap-1">
                      <button
                        onClick={() => setFilterBy('all')}
                        className={`px-3 py-1 text-sm font-medium transition-all border ${
                          filterBy === 'all'
                            ? 'bg-[var(--night)] text-white border-[var(--night)]'
                            : 'bg-transparent text-[var(--night)] border-black/10 hover:border-black/30'
                        }`}
                      >
                        Toutes
                      </button>
                      <button
                        onClick={() => setFilterBy('gainers')}
                        className={`px-3 py-1 text-sm font-medium transition-all border ${
                          filterBy === 'gainers'
                            ? 'bg-green-700/10 text-green-700 border-green-700/30'
                            : 'bg-transparent text-[var(--night)] border-black/10 hover:border-black/30'
                        }`}
                      >
                        Gagnantes
                      </button>
                      <button
                        onClick={() => setFilterBy('losers')}
                        className={`px-3 py-1 text-sm font-medium transition-all border ${
                          filterBy === 'losers'
                            ? 'bg-red-600/10 text-red-600 border-red-600/30'
                            : 'bg-transparent text-[var(--night)] border-black/10 hover:border-black/30'
                        }`}
                      >
                        Perdantes
                      </button>
                    </div>
                  </div>
                </div>

                {/* Table Header */}
                <div className="border-t border-black/10 py-4 mb-0">
                  <div className="grid grid-cols-12 gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[rgba(10,10,10,0.5)]">
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
                  <div className="border-t border-black/10">
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
            <div className="space-y-8">
              {/* Trending */}
              <div ref={trendingSectionRef} className="reveal">
                <TrendingCard assets={trendingAssets} />
              </div>

              {/* Market Insights */}
              <div className="border border-black/10 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-px bg-[var(--jaune-or)]" />
                  <h3 className="font-display-aptos text-[var(--night)] text-lg">Analyse Marché</h3>
                </div>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-black/5">
                    <span className="text-[rgba(10,10,10,0.6)]">BRVM 10</span>
                    <span className="text-green-700 font-medium">+2.45%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-black/5">
                    <span className="text-[rgba(10,10,10,0.6)]">Volume Moyen</span>
                    <span className="text-[var(--night)]">1,8 Mds XOF</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-[rgba(10,10,10,0.6)]">Secteur Dominant</span>
                    <span className="text-green-700">Banques</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="border border-black/10 p-6">
                <h3 className="font-display-aptos text-[var(--night)] text-lg mb-6">Actions Rapides</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[var(--jaune-or)] hover:bg-[var(--night)] text-[var(--night)] hover:text-white transition-colors font-medium">
                    <FiEye className="w-4 h-4" />
                    Liste de Surveillance
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-black/10 hover:border-[var(--jaune-or)] text-[var(--night)] transition-colors">
                    <FiBarChart className="w-4 h-4" />
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


