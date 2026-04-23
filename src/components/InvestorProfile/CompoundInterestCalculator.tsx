import { useState, useEffect, useCallback } from 'react'
import { FiCalendar } from 'react-icons/fi'

interface CompoundInputs {
  initialCapital: number
  monthlyContribution: number
  annualRate: number
  durationYears: number
  compoundingFrequency: 'monthly' | 'quarterly' | 'annually'
}

interface CompoundResults {
  totalInvested: number
  totalInterest: number
  finalValue: number
  effectiveRate: number
  yearlyBreakdown: { year: number; invested: number; interest: number; total: number }[]
}

const FREQUENCY_MAP = { monthly: 12, quarterly: 4, annually: 1 }

export const CompoundInterestCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<CompoundInputs>({
    initialCapital: 1_000_000,
    monthlyContribution: 50_000,
    annualRate: 8,
    durationYears: 10,
    compoundingFrequency: 'monthly',
  })

  const [results, setResults] = useState<CompoundResults | null>(null)

  const calculate = useCallback(() => {
    const { initialCapital, monthlyContribution, annualRate, durationYears, compoundingFrequency } = inputs
    const n = FREQUENCY_MAP[compoundingFrequency]
    const r = annualRate / 100
    const periodicRate = r / n

    const yearlyBreakdown: CompoundResults['yearlyBreakdown'] = []
    let currentValue = initialCapital
    let totalContributed = initialCapital

    for (let year = 1; year <= durationYears; year++) {
      for (let period = 0; period < n; period++) {
        currentValue *= (1 + periodicRate)
        // Add monthly contributions proportionally within each compounding period
        const monthsPerPeriod = 12 / n
        currentValue += monthlyContribution * monthsPerPeriod
        totalContributed += monthlyContribution * monthsPerPeriod
      }
      yearlyBreakdown.push({
        year,
        invested: totalContributed,
        interest: currentValue - totalContributed,
        total: currentValue,
      })
    }

    const totalInterest = currentValue - totalContributed
    const effectiveRate = totalContributed > 0 ? ((currentValue / totalContributed) - 1) * 100 : 0

    setResults({
      totalInvested: totalContributed,
      totalInterest,
      finalValue: currentValue,
      effectiveRate,
      yearlyBreakdown,
    })
  }, [inputs])

  useEffect(() => { calculate() }, [calculate])

  const formatCurrency = (v: number) =>
    new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(v)

  const handleChange = (field: keyof CompoundInputs, value: string | number) => {
    setInputs(prev => ({ ...prev, [field]: typeof value === 'string' ? parseFloat(value) || 0 : value }))
  }

  return (
    <div className="flex flex-col gap-8 h-full">
      {/* ── Inputs ── */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Capital initial */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-[var(--night-60)]" style={{ fontFamily: 'var(--font-primary)' }}>
              $ Capital initial (F CFA)
            </label>
            <input
              type="number"
              value={inputs.initialCapital}
              onChange={e => handleChange('initialCapital', e.target.value)}
              className="w-full px-4 py-3 border border-[var(--mauve-10)] bg-[var(--pure-white)] text-[var(--night)] focus:border-[var(--mauve)] focus:outline-none transition-colors rounded-xl font-medium"
            />
          </div>

          {/* Taux d'intérêt annuel */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-[var(--night-60)]" style={{ fontFamily: 'var(--font-primary)' }}>
                % Taux d'intérêt annuel
              </label>
              <span className="font-bold text-[var(--night)]" style={{ fontFamily: 'var(--font-primary)' }}>{inputs.annualRate}%</span>
            </div>
            <input
              type="range"
              min={1}
              max={25}
              value={inputs.annualRate}
              onChange={e => handleChange('annualRate', e.target.value)}
              className="w-full accent-[var(--mauve)] h-1.5 bg-[var(--mauve-10)] rounded-lg appearance-none cursor-pointer mt-3"
            />
          </div>

          {/* Versement mensuel */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-[var(--night-60)]" style={{ fontFamily: 'var(--font-primary)' }}>
              <FiCalendar className="inline mr-1.5 -mt-0.5" size={12} />Versement mensuel (F CFA)
            </label>
            <input
              type="number"
              value={inputs.monthlyContribution}
              onChange={e => handleChange('monthlyContribution', e.target.value)}
              className="w-full px-4 py-3 border border-[var(--mauve-10)] bg-[var(--pure-white)] text-[var(--night)] focus:border-[var(--mauve)] focus:outline-none transition-colors rounded-xl font-medium"
            />
          </div>

          {/* Durée d'investissement */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-[var(--night-60)]" style={{ fontFamily: 'var(--font-primary)' }}>
                Durée d'investissement
              </label>
              <span className="font-bold text-[var(--night)]" style={{ fontFamily: 'var(--font-primary)' }}>{inputs.durationYears} ans</span>
            </div>
            <input
              type="range"
              min={1}
              max={30}
              value={inputs.durationYears}
              onChange={e => handleChange('durationYears', e.target.value)}
              className="w-full accent-[var(--mauve)] h-1.5 bg-[var(--mauve-10)] rounded-lg appearance-none cursor-pointer mt-3"
            />
          </div>
        </div>

        {/* ── Results Bar ── */}
        {results && (
          <div className="pt-6 border-t border-[var(--mauve-10)] mt-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <span className="text-sm text-[var(--night-60)] block mb-1" style={{ fontFamily: 'var(--font-primary)' }}>Investissement initial</span>
                <span className="font-bold text-lg text-[var(--night)]" style={{ fontFamily: 'var(--font-primary)' }}>{formatCurrency(inputs.initialCapital)}</span>
              </div>
              <div>
                <span className="text-sm text-[var(--night-60)] block mb-1" style={{ fontFamily: 'var(--font-primary)' }}>Total des versements</span>
                <span className="font-bold text-lg text-[var(--night)]" style={{ fontFamily: 'var(--font-primary)' }}>{formatCurrency(results.totalInvested - inputs.initialCapital)}</span>
              </div>
              <div>
                <span className="text-sm text-[var(--night-60)] block mb-1" style={{ fontFamily: 'var(--font-primary)' }}>Intérêts gagnés</span>
                <span className="font-bold text-lg text-[#16a34a]" style={{ fontFamily: 'var(--font-primary)' }}>{formatCurrency(results.totalInterest)}</span>
              </div>
              <div>
                <span className="text-sm text-[var(--night-60)] block mb-1" style={{ fontFamily: 'var(--font-primary)' }}>Valeur future</span>
                <span className="font-bold text-xl text-[#dc2626]" style={{ fontFamily: 'var(--font-primary)' }}>{formatCurrency(results.finalValue)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
