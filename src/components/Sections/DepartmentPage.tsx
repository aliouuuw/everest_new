import { FiCheck, FiTarget } from 'react-icons/fi'
import { useReveal } from '../Hooks/useReveal'
import type { Department } from '../../data/departments'

interface DepartmentPageProps {
  department: Department
}

export const DepartmentPage = ({ department }: DepartmentPageProps) => {
  const heroRef = useReveal<HTMLElement>()
  const aboutRef = useReveal<HTMLElement>()
  const missionsRef = useReveal<HTMLElement>()
  const operationsRef = useReveal<HTMLElement>()
  const solutionsRef = useReveal<HTMLElement>()
  const approachRef = useReveal<HTMLElement>()

  const {
    department_name,
    presentation,
    missions,
    operations_selected,
    expertise_solutions,
    approach_methodology,
    hero_background,
  } = department

  // Derive a short positioning statement from the presentation (first sentence)
  const positioningStatement = presentation.split('.')[0] + '.'

  return (
    <div>
      {/* ─── 1. Hero Section ─── */}
      <section ref={heroRef} className="reveal relative overflow-hidden">
        {hero_background ? (
          <>
            <div className="absolute inset-0">
              <img
                src={hero_background}
                alt={department_name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold-dark)]/20 to-[var(--night)]/80" />
            </div>
            <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-24 lg:py-32">
              <div className="text-center max-w-3xl mx-auto">
                <span className="kicker text-gradient-gold">
                  Offres — {department_name}
                </span>
                <h1 className="luxury-heading-dark mt-3">
                  {positioningStatement}
                </h1>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-[var(--night)]">
            <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-24 lg:py-32">
              <div className="text-center max-w-3xl mx-auto">
                <span className="kicker text-gradient-gold">
                  Offres — {department_name}
                </span>
                <h1 className="luxury-heading-dark mt-3">
                  {positioningStatement}
                </h1>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ─── 2. About the Department ─── */}
      {presentation && (
        <section
          ref={aboutRef}
          className="reveal py-14 sm:py-18 lg:py-20"
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-3xl mx-auto text-center">
              <span className="kicker text-gradient-gold">Présentation</span>
              <h2 className="luxury-heading mt-3">
                À propos du département
              </h2>
              <p className="luxury-subheading mt-6 leading-relaxed">
                {presentation}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ─── 3. Key Missions ─── */}
      {missions.length > 0 && (
        <section
          ref={missionsRef}
          className="reveal py-14 sm:py-18 lg:py-20 bg-[var(--white-smoke)]"
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-2xl mx-auto">
              <span className="kicker text-gradient-gold">Nos missions</span>
              <h2 className="luxury-heading mt-3">
                Ce qui guide notre action
              </h2>
            </div>
            <div className="mt-12 max-w-3xl mx-auto space-y-4">
              {missions.map((mission, i) => (
                <div
                  key={i}
                  className="group flex items-start gap-4 rounded-xl border border-[var(--gold-metallic)]/15 bg-[var(--pure-white)]/80 backdrop-blur-sm p-5 transition-all card-hover"
                >
                  <div className="shrink-0 mt-0.5">
                    <div className="w-8 h-8 rounded-full bg-[var(--gold-light)]/30 border border-[var(--gold-metallic)]/20 grid place-content-center text-[var(--night)]">
                      <FiCheck className="text-sm" />
                    </div>
                  </div>
                  <p className="text-sm md:text-base leading-relaxed text-[var(--night-80)]">
                    {mission}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── 4. Areas of Intervention / Operations ─── */}
      {operations_selected.length > 0 && (
        <section
          ref={operationsRef}
          className="reveal py-14 sm:py-18 lg:py-20"
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-2xl mx-auto">
              <span className="kicker text-gradient-gold">
                Domaines d'intervention
              </span>
              <h2 className="luxury-heading mt-3">
                Nos opérations
              </h2>
            </div>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {operations_selected.map((operation, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/20 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover"
                >
                  <div className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />
                  <div className="flex items-start gap-4">
                    <div className="shrink-0">
                      <div className="w-10 h-10 rounded-full bg-[var(--gold-light)]/20 border border-[var(--gold-metallic)]/20 grid place-content-center">
                        <FiTarget className="text-sm text-[var(--night)]" />
                      </div>
                    </div>
                    <p className="text-sm md:text-base leading-relaxed text-[var(--night-80)]">
                      {operation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── 5. Our Solutions ─── */}
      {expertise_solutions.length > 0 && (
        <section
          ref={solutionsRef}
          className="reveal py-14 sm:py-18 lg:py-20 bg-[var(--white-smoke)]"
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center max-w-2xl mx-auto">
              <span className="kicker text-gradient-gold">Nos solutions</span>
              <h2 className="luxury-heading mt-3">
                Expertise & solutions
              </h2>
            </div>
            <div className="mt-12 space-y-8">
              {expertise_solutions.map((solution) => (
                <div
                  key={solution.solution_number}
                  className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 md:p-8 transition-all card-hover"
                >
                  <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />

                  {/* Solution header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-xs font-medium tracking-wider text-[var(--night-80)]/80">
                        Solution {String(solution.solution_number).padStart(2, '0')}
                      </span>
                      <h3 className="font-display text-lg md:text-xl mt-1">
                        {solution.name}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-secondary text-sm md:text-base leading-relaxed mb-6">
                    {solution.description}
                  </p>

                  {/* Details grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* Target audience */}
                    {solution.target_audience.length > 0 && (
                      <div className="rounded-xl bg-[var(--white-smoke)]/60 p-4">
                        <div className="text-xs font-medium tracking-wider text-[var(--gold-metallic)] uppercase mb-3">
                          Audience cible
                        </div>
                        <ul className="space-y-1.5">
                          {solution.target_audience.map((audience, j) => (
                            <li
                              key={j}
                              className="text-xs md:text-sm text-[var(--night-80)] flex items-start gap-2"
                            >
                              <span className="shrink-0 mt-1.5 w-1 h-1 rounded-full bg-[var(--gold-metallic)]" />
                              {audience}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Client problem */}
                    {solution.client_problem && (
                      <div className="rounded-xl bg-[var(--white-smoke)]/60 p-4">
                        <div className="text-xs font-medium tracking-wider text-[var(--gold-metallic)] uppercase mb-3">
                          Problématique client
                        </div>
                        <p className="text-xs md:text-sm text-[var(--night-80)] leading-relaxed">
                          {solution.client_problem}
                        </p>
                      </div>
                    )}

                    {/* Value proposition */}
                    {solution.value_proposition && (
                      <div className="rounded-xl bg-[var(--gold-light)]/10 border border-[var(--gold-metallic)]/15 p-4">
                        <div className="text-xs font-medium tracking-wider text-[var(--gold-metallic)] uppercase mb-3">
                          Proposition de valeur
                        </div>
                        <p className="text-xs md:text-sm text-[var(--night-80)] leading-relaxed">
                          {solution.value_proposition}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── 6. Our Approach ─── */}
      {approach_methodology && (
        <section
          ref={approachRef}
          className="reveal py-14 sm:py-18 lg:py-20"
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-3xl mx-auto text-center">
              <span className="kicker text-gradient-gold">
                Notre approche
              </span>
              <h2 className="luxury-heading mt-3">Méthodologie</h2>
              <p className="luxury-subheading mt-6 leading-relaxed">
                {approach_methodology}
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
