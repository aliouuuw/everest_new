import React, { useEffect, useState } from 'react'
import { useReveal } from '../Hooks/useReveal'
import { useCounter } from '../Hooks/useCounter'
import type { IconType } from 'react-icons'

export interface StatItem {
  value: string
  label: string
  icon?: IconType
  suffix?: string
  // If true, the value will be animated as-is (including any units)
  // If false, only the numeric part will be animated and suffix will be added separately
  animateWithUnits?: boolean
}

export interface StatsSectionProps {
  title: string
  subtitle?: string
  kicker?: string
  stats: Array<StatItem>
  background?: 'light' | 'gradient'
  columns?: 2 | 3 | 4
  id?: string
  showTestimonials?: boolean
}

export const StatsSection: React.FC<StatsSectionProps> = ({
  title,
  subtitle,
  kicker,
  stats,
  background = 'light',
  columns = 4,
  id,
  showTestimonials = false
}) => {
  const sectionRef = useReveal<HTMLElement>()
  const [countersTriggered, setCountersTriggered] = useState(false)

  // Helper function to parse stat value and extract numeric part
  const parseStatValue = (value: string) => {
    // Match numeric part at the beginning, including decimals and commas
    const numericMatch = value.match(/^([\d,]+(?:\.\d+)?)/)

    if (numericMatch) {
      const numericPart = numericMatch[1]
      const remainingPart = value.slice(numericMatch[0].length).trim()

      // Clean the numeric part (remove commas for animation)
      const cleanNumeric = numericPart.replace(/,/g, '')

      return {
        numericValue: cleanNumeric,
        unit: remainingPart
      }
    }

    // Fallback: treat entire value as numeric if no match
    return {
      numericValue: value,
      unit: ''
    }
  }

  // Create counter hooks for each stat
  const counters = stats.map((stat, index) => {
    if (stat.animateWithUnits) {
      // Animate the full value including units
      console.log(`Stat ${index} (${stat.label}): animating with units - "${stat.value}"`)
      return useCounter(stat.value, { startOnMount: false, trigger: countersTriggered })
    } else {
      // Extract only the numeric part for animation
      const { numericValue, unit } = parseStatValue(stat.value)
      console.log(`Stat ${index} (${stat.label}): animating number only - "${numericValue}" + unit "${unit}" + suffix "${stat.suffix || ''}"`)
      return useCounter(numericValue, { startOnMount: false, trigger: countersTriggered })
    }
  })

  // Trigger counters when section is revealed
  useEffect(() => {
    if (sectionRef.current && !countersTriggered) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setCountersTriggered(true)
            observer.disconnect()
          }
        },
        { threshold: 0.3 }
      )
      observer.observe(sectionRef.current)
      return () => observer.disconnect()
    }
  }, [sectionRef, countersTriggered])

  const backgroundClasses = {
    light: 'bg-[var(--white-smoke)]/60 border-y border-[var(--night)]/5',
    gradient: 'bg-gradient-to-br from-[var(--gold-light)]/5 to-transparent'
  }

  const gridClasses = {
    2: 'grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4'
  }

  const gapClasses = {
    2: 'gap-6 md:gap-8 lg:gap-10',
    3: 'gap-6',
    4: 'gap-6 md:gap-8 lg:gap-10'
  }

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`reveal py-12 sm:py-16 ${columns === 4 ? 'lg:py-20' : ''} ${backgroundClasses[background]}`}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-3xl mx-auto">
          {kicker && <span className="kicker text-gradient-gold">{kicker}</span>}
          <h2 className="luxury-heading mt-3">{title}</h2>
          {subtitle && <p className="luxury-subheading mt-5">{subtitle}</p>}
        </div>

        <div className={`grid ${gridClasses[columns]} ${gapClasses[columns]} mt-12`}>
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              {stat.icon && (
                <div className="relative inline-flex items-center justify-center mb-4">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[var(--pure-white)] border border-[var(--gold-metallic)]/30 shadow-sm grid place-content-center">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[var(--white-smoke)]/80 border border-[var(--timberwolf)] grid place-content-center text-[var(--night)] transition-transform duration-300 group-hover:scale-110">
                      <stat.icon className="text-base md:text-lg" />
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[var(--gold-metallic-10)]" />
                </div>
              )}

              <div className={`stat-card rounded-2xl p-6 ${!stat.icon ? 'text-center' : ''}`}>
                <div className="text-3xl font-display">
                  {(() => {
                    let displayValue: string

                    if (stat.animateWithUnits) {
                      // Animate the full value including units
                      displayValue = counters[index]?.value || stat.value
                    } else {
                      // Parse the original value to get unit, then combine with animated number
                      const { unit } = parseStatValue(stat.value)
                      const animatedNumber = counters[index]?.value || parseStatValue(stat.value).numericValue
                      displayValue = `${animatedNumber}${unit}${stat.suffix || ''}`
                    }

                    console.log(`Stat ${index} (${stat.label}) final display: "${displayValue}"`)
                    return displayValue
                  })()}
                </div>
                <div className="text-secondary text-sm">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {showTestimonials && (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonials content would go here */}
          </div>
        )}
      </div>
    </section>
  )
}
