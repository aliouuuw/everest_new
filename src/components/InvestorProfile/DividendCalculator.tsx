import { useState, useEffect, useCallback } from 'react'

interface DividendInputs {
  numberOfShares: number
  sharePrice: number
  annualDividendPerShare: number
  dividendGrowthRate: number
  projectionYears: number
  reinvestDividends: boolean
}

interface DividendResults {
  portfolioValue: number
  dividendYield: number
  annualDividendIncome: number
  monthlyDividendIncome: number
  yearlyProjection: {
    year: number
    shares: number
    dividendPerShare: number
    annualIncome: number
    portfolioValue: number
    cumulativeDividends: number
  }[]
  totalDividendsReceived: number
  finalPortfolioValue: number
}

export const DividendCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<DividendInputs>({
    numberOfShares: 100,
    sharePrice: 25_000,
    annualDividendPerShare: 1_500,
    dividendGrowthRate: 5,
    projectionYears: 10,
    reinvestDividends: false,
  })

  const [results, setResults] = useState<DividendResults | null>(null)

  const calculate = useCallback(() => {
    const { numberOfShares, sharePrice, annualDividendPerShare, dividendGrowthRate, projectionYears, reinvestDividends } = inputs

    const portfolioValue = numberOfShares * sharePrice
    const dividendYield = sharePrice > 0 ? (annualDividendPerShare / sharePrice) * 100 : 0
    const annualDividendIncome = numberOfShares * annualDividendPerShare
    const monthlyDividendIncome = annualDividendIncome / 12

    const yearlyProjection: DividendResults['yearlyProjection'] = []
    let currentShares = numberOfShares
    let currentDividendPerShare = annualDividendPerShare
    let currentSharePrice = sharePrice
    let cumulativeDividends = 0

    for (let year = 1; year <= projectionYears; year++) {
      // Apply dividend growth
      if (year > 1) {
        currentDividendPerShare *= (1 + dividendGrowthRate / 100)
        // Assume share price grows proportionally to dividend growth
        currentSharePrice *= (1 + dividendGrowthRate / 100)
      }

      const yearIncome = currentShares * currentDividendPerShare
      cumulativeDividends += yearIncome

      // If reinvesting, buy more shares with dividend income
      if (reinvestDividends && currentSharePrice > 0) {
        const newShares = yearIncome / currentSharePrice
        currentShares += newShares
      }

      yearlyProjection.push({
        year,
        shares: currentShares,
        dividendPerShare: currentDividendPerShare,
        annualIncome: yearIncome,
        portfolioValue: currentShares * currentSharePrice,
        cumulativeDividends,
      })
    }

    const lastYear = yearlyProjection[yearlyProjection.length - 1]

    setResults({
      portfolioValue,
      dividendYield,
      annualDividendIncome,
      monthlyDividendIncome,
      yearlyProjection,
      totalDividendsReceived: cumulativeDividends,
      finalPortfolioValue: lastYear?.portfolioValue ?? portfolioValue,
    })
  }, [inputs])

  useEffect(() => { calculate() }, [calculate])

  const formatCurrency = (v: number) =>
    new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(v)

  const handleChange = (field: keyof DividendInputs, value: string | number | boolean) => {
    setInputs(prev => ({
      ...prev,
      [field]: typeof value === 'string' ? parseFloat(value) || 0 : value,
    }))
  }

  return (
    <div className="flex flex-col gap-8 h-full">
      {/* ── Inputs ── */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Nombre d'actions */}
          <div>
            <label className="block mb-2 text-[10px] font-bold uppercase tracking-widest text-[var(--night-60)]" style={{ fontFamily: 'var(--font-primary)' }}>
              Nombre d'actions
            </label>
            <input
              type="number"
              value={inputs.numberOfShares}
              onChange={e => handleChange('numberOfShares', e.target.value)}
              className="w-full px-4 py-3 border border-[var(--mauve-10)] bg-[var(--pure-white)] text-[var(--night)] focus:border-[var(--mauve)] focus:outline-none transition-colors rounded-xl font-medium"
            />
          </div>

          {/* Prix par action */}
          <div>
            <label className="block mb-2 text-[10px] font-bold uppercase tracking-widest text-[var(--night-60)]" style={{ fontFamily: 'var(--font-primary)' }}>
              $ Prix par action (F CFA)
            </label>
            <input
              type="number"
              value={inputs.sharePrice}
              onChange={e => handleChange('sharePrice', e.target.value)}
              className="w-full px-4 py-3 border border-[var(--mauve-10)] bg-[var(--pure-white)] text-[var(--night)] focus:border-[var(--mauve)] focus:outline-none transition-colors rounded-xl font-medium"
            />
          </div>

          {/* Dividende annuel par action */}
          <div>
            <label className="block mb-2 text-[10px] font-bold uppercase tracking-widest text-[var(--night-60)]" style={{ fontFamily: 'var(--font-primary)' }}>
              Dividende annuel par action (F CFA)
            </label>
            <input
              type="number"
              value={inputs.annualDividendPerShare}
              onChange={e => handleChange('annualDividendPerShare', e.target.value)}
              className="w-full px-4 py-3 border border-[var(--mauve-10)] bg-[var(--pure-white)] text-[var(--night)] focus:border-[var(--mauve)] focus:outline-none transition-colors rounded-xl font-medium"
            />
          </div>

          {/* Croissance annuelle du dividende */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--night-60)]" style={{ fontFamily: 'var(--font-primary)' }}>
                Croissance annuelle du dividende
              </label>
              <span className="font-bold text-[var(--night)]" style={{ fontFamily: 'var(--font-primary)' }}>{inputs.dividendGrowthRate}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={20}
              value={inputs.dividendGrowthRate}
              onChange={e => handleChange('dividendGrowthRate', e.target.value)}
              className="w-full accent-[var(--mauve)] h-1.5 bg-[var(--mauve-10)] rounded-lg appearance-none cursor-pointer mt-3"
            />
          </div>

          {/* Horizon de projection */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--night-60)]" style={{ fontFamily: 'var(--font-primary)' }}>
                Horizon de projection
              </label>
              <span className="font-bold text-[var(--night)]" style={{ fontFamily: 'var(--font-primary)' }}>{inputs.projectionYears} ans</span>
            </div>
            <input
              type="range"
              min={1}
              max={30}
              value={inputs.projectionYears}
              onChange={e => handleChange('projectionYears', e.target.value)}
              className="w-full accent-[var(--mauve)] h-1.5 bg-[var(--mauve-10)] rounded-lg appearance-none cursor-pointer mt-3"
            />
          </div>
        </div>

        {/* ── Results Bar ── */}
        {results && (
          <div className="pt-6 border-t border-[var(--mauve-10)] mt-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[var(--night-60)] block mb-1" style={{ fontFamily: 'var(--font-primary)' }}>Rendement du dividende</span>
                <span className="font-bold text-lg text-[#16a34a]" style={{ fontFamily: 'var(--font-primary)' }}>{results.dividendYield.toFixed(2)}%</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[var(--night-60)] block mb-1" style={{ fontFamily: 'var(--font-primary)' }}>Revenu annuel</span>
                <span className="font-bold text-lg text-[var(--night)]" style={{ fontFamily: 'var(--font-primary)' }}>{formatCurrency(results.annualDividendIncome)}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[var(--night-60)] block mb-1" style={{ fontFamily: 'var(--font-primary)' }}>Revenu projeté ({inputs.projectionYears} ans)</span>
                <span className="font-bold text-xl text-[#dc2626]" style={{ fontFamily: 'var(--font-primary)' }}>{formatCurrency(results.yearlyProjection[results.yearlyProjection.length - 1].annualIncome)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
