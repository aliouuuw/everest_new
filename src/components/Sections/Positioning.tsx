import type { ReactNode } from 'react';
import { useReveal } from '../Hooks/useReveal';

export type Pillar = { icon: React.ElementType; title: ReactNode; desc?: ReactNode };

/** Heading, side text and a matrix of pillars. Text comes from the referential (see HomePage). */
export const Positioning: React.FC<{ heading: ReactNode; intro?: ReactNode; pillars: Pillar[]; footer?: ReactNode; columns?: 4 | 5; pillarsHidden?: boolean }> = ({ heading, intro, pillars, footer, columns = 4, pillarsHidden }) => {
  const sectionRef = useReveal<HTMLElement>();
  const gridRef = useReveal<HTMLDivElement>();

  return (
    <section
      ref={sectionRef}
      className="reveal relative overflow-hidden bg-[var(--pure-white)] py-16 md:py-32"
    >
      <div
        className="absolute left-0 top-0 h-[60%] w-[45%] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at top left, rgba(14,40,38,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-16 lg:px-24">
        {/* Header — tight full-width block */}
        <div className="mb-10 grid grid-cols-1 gap-6 lg:mb-20 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="luxury-heading">{heading}</h2>
          </div>
          {intro && (
            <div className="lg:col-span-5">
              <div className="text-secondary text-base md:text-lg leading-relaxed max-w-md lg:ml-auto">{intro}</div>
            </div>
          )}
        </div>

        {/* 4 pillars — softened matrix (rounded shell + inner hairlines, matches EditorialCard radius) */}
        <div
          className="overflow-hidden rounded-[1.25rem] border border-[rgba(14,40,38,0.1)] bg-[var(--pure-white)]"
          style={{
            boxShadow:
              '0 8px 32px -12px rgba(14,40,38,0.12), inset 0 1px 0 rgba(255,255,255,0.85)',
          }}
        >
          <div
            ref={gridRef}
            aria-hidden={pillarsHidden || undefined}
            className={`reveal-stagger grid grid-cols-1 sm:grid-cols-2 ${columns === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'}`}
          >
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className={[
                  'group relative z-0 flex flex-col border-[rgba(14,40,38,0.1)] bg-[var(--pure-white)] px-5 py-6 sm:px-6 sm:py-8 lg:px-8',
                  'transition-[background-color,box-shadow] duration-500',
                  'hover:z-10 hover:bg-[var(--everest-green)] hover:shadow-[0_20px_40px_-20px_rgba(14,40,38,0.35)]',
                  i > 0 ? 'border-t' : '',
                  i % 2 === 1 ? 'sm:border-l' : 'sm:border-l-0',
                  i >= 2 ? 'sm:border-t' : 'sm:border-t-0',
                  i > 0 ? 'lg:border-l' : 'lg:border-l-0',
                  'lg:border-t-0',
                ].join(' ')}
              >
                {/* Top accent — gold on light hover, lighter gold on mauve hover */}
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-[2px] w-0 transition-[width] duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:w-full"
                  style={{ background: 'linear-gradient(90deg, var(--jaune-or), transparent)' }}
                />

                <div className="mb-4 flex items-center gap-4 md:mb-10">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[rgba(14,40,38,0.1)] bg-[rgba(14,40,38,0.05)] text-[var(--everest-green)] transition-colors duration-500 group-hover:border-[rgba(182,138,62,0.25)] group-hover:bg-[rgba(182,138,62,0.12)] group-hover:text-[var(--jaune-or)]"
                  >
                    <Icon className="text-lg transition-transform duration-500 group-hover:-translate-y-0.5" aria-hidden />
                  </div>
                </div>

                <h3 className="font-primary text-xl md:text-2xl font-bold tracking-tight text-[var(--everest-green)] transition-colors duration-500 group-hover:text-white mb-3 leading-tight">
                  {p.title}
                </h3>
                {p.desc && (
                  <p className="font-primary text-sm font-light leading-relaxed text-[var(--night-60)] transition-colors duration-500 group-hover:text-white/75 max-w-xs">
                    {p.desc}
                  </p>
                )}
              </div>
            );
          })}
          </div>
        </div>
        {footer}
      </div>
    </section>
  );
};
