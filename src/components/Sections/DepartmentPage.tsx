import { FiArrowRight, FiArrowDown } from 'react-icons/fi'
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
  const personasRef = useReveal<HTMLElement>()
  const diffRef = useReveal<HTMLElement>()
  const solutionsRef = useReveal<HTMLElement>()
  const approachRef = useReveal<HTMLElement>()
  const operationsRef = useReveal<HTMLElement>()
  const ctaRef = useReveal<HTMLElement>()

  const {
    department_name,
    hero_headline,
    hero_subtitle,
    presentation,
    metrics,
    differentiators,
    target_personas,
    operations_selected,
    expertise_solutions,
    approach_methodology,
    method_steps,
    hero_background,
    cta_text,
    cta_subtitle,
  } = department

  const [activeSolution, setActiveSolution] = useState(0)

  return (
    <div className="bg-[var(--pure-white)] text-[var(--night)] font-primary selection:bg-[var(--gold-metallic)] selection:text-white">
      {/* ─── 1. Hero — Editorial & Asymmetrical ─── */}
      <section ref={heroRef} className="reveal relative min-h-screen flex items-end pb-20 pt-40 border-b border-black/10">
        {hero_background && (
          <div className="absolute top-0 right-0 w-full md:w-2/3 h-[70vh] z-0 overflow-hidden">
            <img
              src={hero_background}
              alt={department_name}
              className="w-full h-full object-cover opacity-60 contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--pure-white)] via-[var(--pure-white)]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--pure-white)] via-transparent to-transparent" />
          </div>
        )}
        
        <div className="relative z-10 w-full px-6 md:px-12 mx-auto max-w-[1600px]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-end">
            <div className="md:col-span-8">
              <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-px bg-[var(--gold-dark)]" />
                <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-[var(--gold-dark)]">
                  {department_name}
                </span>
              </div>
              <h1 className="font-display text-5xl md:text-7xl lg:text-[6.5rem] leading-[0.95] tracking-tight mb-8">
                {hero_headline}
              </h1>
            </div>
            
            <div className="md:col-span-4 pb-4">
              <p className="text-lg md:text-xl leading-relaxed text-[var(--night-80)] font-light mb-10 border-l border-[var(--gold-metallic)] pl-6">
                {hero_subtitle}
              </p>
              <a href="#solutions" className="group inline-flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase transition-all">
                <span className="border-b border-[var(--night)] pb-1 group-hover:border-[var(--gold-metallic)] group-hover:text-[var(--gold-dark)] transition-colors">Découvrir les solutions</span>
                <FiArrowDown className="text-lg group-hover:translate-y-1 transition-transform group-hover:text-[var(--gold-dark)]" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. Metrics — Stark & Engineered ─── */}
      {metrics && metrics.length > 0 && (
        <section ref={metricsRef} className="reveal border-b border-black/10">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3">
              {metrics.map((metric, i) => (
                <div key={i} className={`py-16 md:py-24 ${i < metrics.length - 1 ? 'border-b md:border-b-0 md:border-r border-black/10' : ''} ${i === 1 ? 'md:px-16' : i === 2 ? 'md:pl-16' : 'md:pr-16'}`}>
                  <div className="flex items-baseline gap-2 mb-4">
                    <div className="font-display text-6xl md:text-8xl tracking-tighter text-[var(--night)]">
                      {metric.value}
                    </div>
                    {metric.suffix && (
                      <div className="text-sm font-bold tracking-[0.2em] text-[var(--gold-dark)] uppercase">{metric.suffix}</div>
                    )}
                  </div>
                  <div className="text-[11px] font-bold tracking-[0.2em] text-[var(--night-80)] uppercase">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── 3. "Who is this for?" — Raw Editorial List ─── */}
      {target_personas.length > 0 && (
        <section ref={personasRef} className="reveal py-24 md:py-40 border-b border-black/10">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              <div className="lg:col-span-5">
                <span className="text-[10px] font-bold tracking-[0.3em] text-[var(--gold-dark)] uppercase block mb-8">Audience cible</span>
                <h2 className="font-display text-4xl md:text-6xl leading-[1.05] mb-8">
                  Conçu pour vos enjeux spécifiques.
                </h2>
                <p className="text-lg text-[var(--night-80)] leading-relaxed font-light">
                  {presentation}
                </p>
              </div>
              
              <div className="lg:col-span-7">
                <div className="border-t border-black/10">
                  {target_personas.map((persona, i) => (
                    <div key={i} className="group py-10 border-b border-black/10 flex flex-col md:flex-row gap-6 md:gap-12">
                      <div className="font-display text-2xl text-[var(--gold-metallic)]/50 shrink-0">
                        {String(i + 1).padStart(2, '0')}.
                      </div>
                      <div>
                        <h3 className="font-display text-2xl md:text-3xl mb-4 group-hover:text-[var(--gold-dark)] transition-colors">
                          {persona.label}
                        </h3>
                        <p className="text-[var(--night-80)] leading-relaxed text-lg font-light max-w-xl">
                          {persona.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── 4. "Why Everest" — Stark Grid ─── */}
      {differentiators.length > 0 && (
        <section ref={diffRef} className="reveal py-24 md:py-40 bg-[var(--night)] text-white">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              <div className="lg:col-span-4">
                <div className="sticky top-32">
                  <span className="text-[10px] font-bold tracking-[0.3em] text-[var(--gold-metallic)] uppercase block mb-8">La différence Everest</span>
                  <h2 className="font-display text-4xl md:text-6xl leading-[1.05]">
                    Notre engagement envers l'excellence.
                  </h2>
                </div>
              </div>
              
              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
                  {differentiators.map((diff, i) => (
                    <div key={i} className="relative">
                      <div className="w-8 h-px bg-[var(--gold-metallic)] mb-8" />
                      <h3 className="font-display text-2xl md:text-3xl mb-4 text-white">
                        {diff.title}
                      </h3>
                      <p className="text-white/60 leading-relaxed font-light text-lg">
                        {diff.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── 5. Solutions — Engineered Display ─── */}
      {expertise_solutions.length > 0 && (
        <section id="solutions" ref={solutionsRef} className="reveal py-24 md:py-40 border-b border-black/10">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12">
            <div className="mb-20 md:mb-32">
              <span className="text-[10px] font-bold tracking-[0.3em] text-[var(--gold-dark)] uppercase block mb-8">Nos solutions</span>
              <h2 className="font-display text-4xl md:text-6xl leading-[1.05] max-w-3xl">
                Une expertise financière sur mesure.
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
              {/* Sticky Editorial Sidebar */}
              <div className="lg:col-span-4">
                <div className="sticky top-32 flex flex-col border-t border-black/10">
                  {expertise_solutions.map((solution, i) => (
                    <button
                      key={solution.solution_number}
                      onClick={() => setActiveSolution(i)}
                      className={`text-left py-6 border-b border-black/10 transition-colors group flex items-baseline gap-4 ${
                        activeSolution === i ? 'text-[var(--night)]' : 'text-[var(--night-80)] hover:text-[var(--night)]'
                      }`}
                    >
                      <span className={`font-display text-sm ${activeSolution === i ? 'text-[var(--gold-dark)]' : 'text-black/30'}`}>
                        {String(solution.solution_number).padStart(2, '0')}
                      </span>
                      <h3 className="font-display text-xl md:text-2xl">
                        {solution.name}
                      </h3>
                    </button>
                  ))}
                </div>
              </div>

              {/* Stark Content Area */}
              <div className="lg:col-span-8">
                <div className="min-h-[600px] animate-fadeIn">
                  <h3 className="font-display text-4xl md:text-5xl mb-8">
                    {expertise_solutions[activeSolution].name}
                  </h3>
                  <p className="text-xl md:text-2xl leading-relaxed text-[var(--night-80)] font-light mb-16 max-w-3xl">
                    {expertise_solutions[activeSolution].description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-black/10 pt-16">
                    <div className="space-y-12">
                      {expertise_solutions[activeSolution].client_problem && (
                        <div>
                          <div className="text-[10px] font-bold tracking-[0.3em] text-[var(--gold-dark)] uppercase mb-4">
                            L'enjeu
                          </div>
                          <p className="text-[var(--night-80)] leading-relaxed text-lg font-light">
                            {expertise_solutions[activeSolution].client_problem}
                          </p>
                        </div>
                      )}
                      
                      {expertise_solutions[activeSolution].value_proposition && (
                        <div>
                          <div className="text-[10px] font-bold tracking-[0.3em] text-[var(--gold-dark)] uppercase mb-4">
                            Notre réponse
                          </div>
                          <p className="text-[var(--night)] leading-relaxed text-lg font-medium">
                            {expertise_solutions[activeSolution].value_proposition}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Minimalist Chart */}
                    {expertise_solutions[activeSolution].allocation && (
                      <div className="bg-[var(--white-smoke)] p-10 rounded-none border border-black/5">
                        <div className="text-[10px] font-bold tracking-[0.3em] text-[var(--night)] uppercase mb-8">
                          Allocation Cible
                        </div>
                        <div className="h-[240px] w-full mb-8">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={expertise_solutions[activeSolution].allocation}
                                cx="50%"
                                cy="50%"
                                innerRadius={80}
                                outerRadius={110}
                                paddingAngle={2}
                                dataKey="value"
                                stroke="none"
                              >
                                {expertise_solutions[activeSolution].allocation.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip 
                                formatter={(value: any) => [`${value}%`, 'Allocation']}
                                contentStyle={{ backgroundColor: 'var(--night)', border: 'none', color: 'white', borderRadius: '0', padding: '16px', fontSize: '14px', fontFamily: 'var(--font-primary)' }}
                                itemStyle={{ color: 'white', fontWeight: 500 }}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="space-y-3 border-t border-black/10 pt-6">
                          {expertise_solutions[activeSolution].allocation.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between text-sm font-medium text-[var(--night)]">
                              <div className="flex items-center gap-3">
                                <span className="w-3 h-3 block" style={{ backgroundColor: item.color }} />
                                {item.name}
                              </div>
                              <span className="font-display">{item.value}%</span>
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

      {/* ─── 6. Methodology — Brutalist Sequence ─── */}
      {(approach_methodology || method_steps) && (
        <section ref={approachRef} className="reveal py-24 md:py-40 border-b border-black/10">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              <div className="lg:col-span-5">
                <span className="text-[10px] font-bold tracking-[0.3em] text-[var(--gold-dark)] uppercase block mb-8">Méthodologie</span>
                <h2 className="font-display text-4xl md:text-6xl leading-[1.05] mb-8">
                  Un processus rigoureux.
                </h2>
                {approach_methodology && !method_steps && (
                  <p className="text-lg text-[var(--night-80)] leading-relaxed font-light">
                    {approach_methodology}
                  </p>
                )}
              </div>

              {method_steps && (
                <div className="lg:col-span-7">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                    {method_steps.map((step, i) => (
                      <div key={i} className="relative">
                        <div className="font-display text-4xl text-[var(--gold-metallic)] mb-6">
                          {String(i + 1).padStart(2, '0')}.
                        </div>
                        <h3 className="font-display text-2xl mb-4 text-[var(--night)]">
                          {step.title}
                        </h3>
                        <p className="text-[var(--night-80)] leading-relaxed font-light text-lg">
                          {step.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ─── 7. Operations — Minimalist Grid ─── */}
      {operations_selected.length > 0 && (
        <section ref={operationsRef} className="reveal py-24 md:py-40">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              <div className="lg:col-span-5">
                <span className="text-[10px] font-bold tracking-[0.3em] text-[var(--gold-dark)] uppercase block mb-8">Interventions</span>
                <h2 className="font-display text-4xl md:text-6xl leading-[1.05]">
                  Périmètre d'action.
                </h2>
              </div>
              <div className="lg:col-span-7">
                <ul className="border-t border-black/10">
                  {operations_selected.map((operation, i) => (
                    <li key={i} className="py-8 border-b border-black/10 text-xl md:text-2xl font-display text-[var(--night)] flex items-center gap-6 group hover:pl-4 transition-all duration-300">
                      <FiArrowRight className="text-[var(--gold-metallic)] opacity-0 group-hover:opacity-100 transition-opacity" />
                      {operation}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── 8. CTA — Editorial Footer Block ─── */}
      <section ref={ctaRef} className="reveal bg-[var(--night)] text-white py-24 md:py-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
            <div className="md:col-span-7">
              <h2 className="font-display text-5xl md:text-7xl leading-[1.05] mb-6">
                {cta_text}
              </h2>
              <p className="text-xl md:text-2xl text-white/60 font-light max-w-2xl">
                {cta_subtitle}
              </p>
            </div>
            <div className="md:col-span-5 flex flex-col sm:flex-row gap-6 md:justify-end">
              <a href="/contact" className="inline-flex items-center justify-center gap-4 bg-white text-[var(--night)] px-10 py-5 font-bold text-xs tracking-[0.2em] uppercase hover:bg-[var(--gold-light)] transition-colors">
                Prendre rendez-vous <FiArrowRight className="text-lg" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
