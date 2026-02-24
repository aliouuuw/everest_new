import { FiTarget, FiArrowRight } from 'react-icons/fi'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { useState } from 'react'
import { useReveal } from '../Hooks/useReveal'
import type { Department } from '../../data/departments'

interface DepartmentPageProps {
  department: Department
}

export const DepartmentPage = ({ department }: DepartmentPageProps) => {
  const heroRef = useReveal<HTMLElement>()
  const metricsRef = useReveal<HTMLElement>()
  const aboutRef = useReveal<HTMLElement>()
  const missionsRef = useReveal<HTMLElement>()
  const operationsRef = useReveal<HTMLElement>()
  const solutionsRef = useReveal<HTMLElement>()
  const approachRef = useReveal<HTMLElement>()
  const ctaRef = useReveal<HTMLElement>()

  const {
    department_name,
    presentation,
    metrics,
    missions,
    operations_selected,
    expertise_solutions,
    approach_methodology,
    method_steps,
    hero_background,
  } = department

  // For interactive solutions (tabs)
  const [activeSolution, setActiveSolution] = useState(0)

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
              <div className="absolute inset-0 bg-gradient-to-b from-[var(--night)]/60 via-[var(--night)]/40 to-[var(--night)]/90" />
            </div>
            <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32 lg:py-40">
              <div className="text-center max-w-4xl mx-auto">
                <span className="kicker text-gradient-gold tracking-[0.2em] text-sm">
                  OFFRES — {department_name.toUpperCase()}
                </span>
                <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-white mt-6 leading-[1.1] drop-shadow-lg">
                  {positioningStatement}
                </h1>
                <div className="mt-12 flex justify-center">
                  <a href="#solutions" className="btn-primary overflow-hidden relative group">
                    <span className="relative z-10">Découvrir nos solutions</span>
                    <div className="absolute inset-0 bg-[var(--gold-light)] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                  </a>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-[var(--night)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--gold-metallic)]/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
            <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32 lg:py-40">
              <div className="text-center max-w-4xl mx-auto">
                <span className="kicker text-gradient-gold tracking-[0.2em] text-sm">
                  OFFRES — {department_name.toUpperCase()}
                </span>
                <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-white mt-6 leading-[1.1] drop-shadow-lg">
                  {positioningStatement}
                </h1>
                <div className="mt-12 flex justify-center">
                  <a href="#solutions" className="btn-primary overflow-hidden relative group">
                    <span className="relative z-10">Découvrir nos solutions</span>
                    <div className="absolute inset-0 bg-[var(--gold-light)] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ─── 2. Metrics Banner ─── */}
      {metrics && metrics.length > 0 && (
        <section ref={metricsRef} className="reveal -mt-16 relative z-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 bg-[var(--pure-white)]/95 backdrop-blur-2xl rounded-sm border border-[var(--gold-metallic)]/30 shadow-[0_30px_60px_-15px_rgba(10,15,28,0.1)]">
              {metrics.map((metric, i) => (
                <div key={i} className="group relative text-center py-10 px-6 md:border-r last:border-0 border-[var(--gold-metallic)]/20 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--gold-metallic)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative z-10 font-display text-4xl md:text-5xl text-[var(--gold-dark)] group-hover:scale-105 transition-transform duration-700 ease-out">
                    {metric.value}
                  </div>
                  <div className="relative z-10 text-xs font-bold tracking-[0.15em] text-[var(--night-80)] uppercase mt-4 group-hover:text-[var(--night)] transition-colors duration-500">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── 3. About the Department ─── */}
      {presentation && (
        <section
          ref={aboutRef}
          className="reveal py-20 sm:py-28 lg:py-32 relative"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-[var(--gold-metallic)]/50 to-transparent" />
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center">
              <span className="text-xs font-bold tracking-[0.2em] text-[var(--gold-dark)] uppercase">Présentation</span>
              <p className="font-display text-2xl md:text-3xl lg:text-4xl leading-relaxed text-[var(--night)] mt-10">
                {presentation}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ─── 4. Key Missions ─── */}
      {missions.length > 0 && (
        <section
          ref={missionsRef}
          className="reveal py-20 sm:py-28 lg:py-32 bg-[var(--white-smoke)] relative"
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl">
              <span className="text-xs font-bold tracking-[0.2em] text-[var(--gold-dark)] uppercase">Ce que nous faisons</span>
              <h2 className="font-display text-3xl md:text-5xl text-[var(--night)] mt-4">
                Nos missions
              </h2>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
              {missions.map((mission, i) => (
                <div
                  key={i}
                  className="group relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-[var(--gold-metallic)]/30 hover:before:bg-[var(--gold-dark)] transition-all duration-500"
                >
                  <div className="text-xs font-bold tracking-[0.15em] text-[var(--gold-dark)] mb-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                    0{i + 1}
                  </div>
                  <p className="text-lg md:text-xl leading-relaxed text-[var(--night-80)] group-hover:text-[var(--night)] transition-colors duration-500">
                    {mission}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── 5. Areas of Intervention (Interactive List) ─── */}
      {operations_selected.length > 0 && (
        <section
          ref={operationsRef}
          className="reveal py-14 sm:py-18 lg:py-24 relative overflow-hidden"
        >
          {/* Subtle background decoration */}
          <div className="absolute top-1/2 right-0 w-full h-[500px] bg-[var(--gold-metallic)]/5 blur-[120px] rounded-full -translate-y-1/2 pointer-events-none translate-x-1/4" />
          
          <div className="relative mx-auto max-w-4xl px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="kicker text-gradient-gold">
                Domaines d'intervention
              </span>
              <h2 className="luxury-heading mt-3">
                Nos opérations
              </h2>
            </div>
            
            {/* Interactive Vertical List layout */}
            <div className="flex flex-col border-t border-[var(--gold-metallic)]/20">
              {operations_selected.map((operation, i) => (
                <div
                  key={i}
                  className="group relative flex items-center gap-6 md:gap-10 py-8 border-b border-[var(--gold-metallic)]/20 transition-all duration-500 overflow-hidden"
                >
                  {/* Hover Background Layer */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--gold-light)]/0 via-[var(--gold-light)]/5 to-[var(--gold-light)]/0 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out" />
                  
                  {/* Index / Number */}
                  <div className="relative z-10 shrink-0 text-3xl md:text-5xl font-display text-[var(--gold-metallic)]/30 group-hover:text-[var(--gold-dark)] transition-colors duration-500 min-w-[3rem] md:min-w-[4rem]">
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  {/* Icon */}
                  <div className="relative z-10 shrink-0 hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-[var(--gold-metallic)]/20 text-[var(--gold-dark)] opacity-50 group-hover:opacity-100 group-hover:bg-[var(--gold-light)]/20 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    <FiTarget className="text-xl" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex-grow pr-8">
                    <h3 className="font-display text-xl md:text-2xl lg:text-3xl text-[var(--night)] group-hover:text-[var(--gold-dark)] transition-colors duration-500 leading-tight md:leading-snug">
                      {operation}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── 6. Our Solutions (Interactive Tabs) ─── */}
      {expertise_solutions.length > 0 && (
        <section
          id="solutions"
          ref={solutionsRef}
          className="reveal py-14 sm:py-18 lg:py-24 bg-[var(--night)] text-white relative overflow-hidden"
        >
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--gold-metallic)]/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[var(--gold-metallic)]/5 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/4" />

          <div className="relative mx-auto max-w-6xl px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="kicker text-gradient-gold">Nos solutions</span>
              <h2 className="luxury-heading-dark mt-3">
                Expertise sur mesure
              </h2>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
              {/* Tabs list */}
              <div className="lg:w-1/3 flex flex-col gap-4">
                {expertise_solutions.map((solution, i) => (
                  <button
                    key={solution.solution_number}
                    onClick={() => setActiveSolution(i)}
                    className={`group text-left px-8 py-6 rounded-2xl transition-all duration-500 border relative overflow-hidden ${
                      activeSolution === i
                        ? 'bg-[var(--gold-metallic)]/10 border-[var(--gold-metallic)]/50 shadow-[0_0_30px_rgba(198,168,124,0.15)]'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    {activeSolution === i && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--gold-light)] to-[var(--gold-dark)]" />
                    )}
                    <span className={`text-xs font-medium tracking-widest uppercase mb-2 block transition-colors duration-300 ${activeSolution === i ? 'text-[var(--gold-light)]' : 'text-white/50 group-hover:text-white/70'}`}>
                      Solution {String(solution.solution_number).padStart(2, '0')}
                    </span>
                    <h3 className={`font-display text-xl transition-colors duration-300 ${activeSolution === i ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>
                      {solution.name}
                    </h3>
                  </button>
                ))}
              </div>

              {/* Active Tab Content */}
              <div className="lg:w-2/3">
                <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-xl min-h-[450px] shadow-2xl relative overflow-hidden group">
                  <div className="absolute -top-32 -right-32 w-64 h-64 bg-[var(--gold-metallic)]/10 blur-[80px] rounded-full" />
                  
                  <h3 className="font-display text-3xl md:text-4xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[var(--gold-light)] to-[var(--gold-dark)]">
                    {expertise_solutions[activeSolution].name}
                  </h3>
                  <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-10 font-light">
                    {expertise_solutions[activeSolution].description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-8">
                      {expertise_solutions[activeSolution].client_problem && (
                        <div className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-[var(--gold-metallic)]/30">
                          <div className="text-xs font-bold tracking-widest text-[var(--gold-metallic)] uppercase mb-3">
                            Problématique client
                          </div>
                          <p className="text-sm md:text-base text-white/70 leading-relaxed">
                            {expertise_solutions[activeSolution].client_problem}
                          </p>
                        </div>
                      )}
                      
                      {expertise_solutions[activeSolution].value_proposition && (
                        <div className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-[var(--gold-light)] before:to-[var(--gold-dark)]">
                          <div className="text-xs font-bold tracking-widest text-[var(--gold-metallic)] uppercase mb-3">
                            Proposition de valeur
                          </div>
                          <p className="text-sm md:text-base text-white/90 leading-relaxed">
                            {expertise_solutions[activeSolution].value_proposition}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Chart / Allocation Data */}
                    {expertise_solutions[activeSolution].allocation && (
                      <div className="flex flex-col items-center justify-center bg-black/20 rounded-2xl p-6 border border-white/5">
                        <div className="text-xs font-bold tracking-widest text-[var(--gold-metallic)] uppercase mb-6 w-full text-center">
                          Allocation Cible
                        </div>
                        <div className="h-[220px] w-full group-hover:scale-105 transition-transform duration-700">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={expertise_solutions[activeSolution].allocation}
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={90}
                                paddingAngle={3}
                                dataKey="value"
                                stroke="none"
                              >
                                {expertise_solutions[activeSolution].allocation.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} className="hover:opacity-80 transition-opacity duration-300 cursor-pointer" />
                                ))}
                              </Pie>
                              <Tooltip 
                                formatter={(value: any) => [`${value}%`, 'Allocation']}
                                contentStyle={{ backgroundColor: 'rgba(10,15,28,0.95)', backdropFilter: 'blur(8px)', borderColor: 'var(--gold-metallic)', color: 'white', borderRadius: '8px', padding: '12px' }}
                                itemStyle={{ color: 'white', fontWeight: 500 }}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                        {/* Legend */}
                        <div className="flex flex-wrap justify-center gap-4 mt-6">
                          {expertise_solutions[activeSolution].allocation.map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs font-medium text-white/80">
                              <span className="w-3 h-3 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.2)]" style={{ backgroundColor: item.color }} />
                              {item.name} <span className="text-white/50">({item.value}%)</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── 7. Our Approach (Visual Timeline) ─── */}
      {(approach_methodology || method_steps) && (
        <section
          ref={approachRef}
          className="reveal py-14 sm:py-18 lg:py-24 bg-gradient-to-b from-transparent to-[var(--white-smoke)] relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--gold-metallic)]/20 to-transparent" />
          
          <div className="mx-auto max-w-6xl px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-20">
              <span className="kicker text-gradient-gold">
                Notre approche
              </span>
              <h2 className="luxury-heading mt-3">Méthodologie</h2>
              {approach_methodology && !method_steps && (
                 <p className="luxury-subheading mt-6 leading-relaxed">
                   {approach_methodology}
                 </p>
              )}
            </div>

            {/* Timeline */}
            {method_steps && (
              <div className="relative max-w-4xl mx-auto">
                <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--gold-metallic)]/50 via-[var(--gold-metallic)]/20 to-transparent -translate-x-1/2 hidden md:block" />
                
                <div className="space-y-16 relative">
                  {method_steps.map((step, i) => {
                    const isEven = i % 2 === 0
                    return (
                      <div key={i} className={`group flex flex-col md:flex-row items-center gap-8 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                        <div className="w-full md:w-1/2 flex justify-start md:justify-end">
                          <div className={`w-full md:w-5/6 bg-[var(--pure-white)]/90 backdrop-blur-md border border-[var(--gold-metallic)]/20 rounded-3xl p-8 shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2 group-hover:border-[var(--gold-metallic)]/50 ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                            <div className="text-xs font-bold tracking-widest text-[var(--gold-dark)] mb-3">
                              ÉTAPE 0{i + 1}
                            </div>
                            <h3 className="font-display text-xl md:text-2xl text-[var(--night)] mb-4 group-hover:text-[var(--gold-dark)] transition-colors duration-300">
                              {step.title}
                            </h3>
                            <p className="text-base text-[var(--night-80)] leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>
                        
                        <div className="absolute left-[20px] md:left-1/2 w-14 h-14 bg-[var(--pure-white)] border-4 border-[var(--gold-metallic)]/30 rounded-full flex items-center justify-center -translate-x-1/2 md:translate-x-[-50%] shadow-xl z-10 hidden md:flex group-hover:border-[var(--gold-metallic)] group-hover:scale-125 group-hover:bg-[var(--gold-light)]/10 transition-all duration-500 ease-out">
                          <span className="text-[var(--gold-dark)] font-bold text-lg">{i + 1}</span>
                        </div>
                        
                        <div className="w-full md:w-1/2" />
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ─── 8. CTA Section ─── */}
      <section ref={ctaRef} className="reveal py-16 bg-[var(--gold-light)]/10 border-t border-[var(--gold-metallic)]/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-[var(--night)] mb-6">
            Prêt à optimiser vos stratégies financières ?
          </h2>
          <p className="text-lg text-[var(--night-80)] mb-8 max-w-2xl mx-auto">
            Contactez nos experts pour une consultation personnalisée et découvrez comment nous pouvons vous accompagner dans la réalisation de vos objectifs.
          </p>
          <a href="/contact" className="btn-primary inline-flex items-center gap-2">
            Prendre rendez-vous <FiArrowRight />
          </a>
        </div>
      </section>
    </div>
  )
}
