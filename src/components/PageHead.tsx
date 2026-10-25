import type { ReactNode } from 'react';
import { useReveal } from './Hooks/useReveal';

/**
 * The page head of the validated site (kicker pill, title left, intro right, on forest).
 * Referential pages fill it with their menu label, N1 and N2.
 */
export const PageHead = ({ badge, title, intro }: { badge: ReactNode; title: ReactNode; intro?: ReactNode }) => {
  const heroRef = useReveal<HTMLElement>();
  return (
    <section ref={heroRef} className="relative pt-[var(--site-chrome-top)] pb-12 md:pb-16 flex items-end bg-[var(--everest-green)]">
      <div className="relative z-10 w-full page-container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 md:items-start">
          <div className="md:col-span-7">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--jaune-or)]/15 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-[var(--jaune-or)] mb-6">
              {badge}
            </span>
            <h1 className="font-primary font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-5 text-white">{title}</h1>
          </div>
          {intro && (
            <div className="md:col-span-5 pb-2 md:pt-[3.75rem]">
              <div className="text-base md:text-lg leading-relaxed text-white/65 font-light mb-8">{intro}</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
