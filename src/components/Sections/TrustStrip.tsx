import { useReveal } from '../Hooks/useReveal';

const TRUST_NAMES = ['BRVM', 'UEMOA-Titres', 'AFRICA50', 'SFI', 'Proparco', 'BOAD', 'BCEAO'];

/**
 * Full-bleed band with institutional partner names, centered.
 * Sits between the hero and the first editorial section.
 */
export const TrustStrip: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="reveal w-full border-y border-[var(--mauve-10)] bg-[var(--summit-ivory)] overflow-hidden"
      aria-label="Écosystème & partenaires institutionnels"
    >
      <div className="flex w-full items-center py-6 md:py-8 relative">
        {/* Gradients to fade the edges of the marquee */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--summit-ivory)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--summit-ivory)] to-transparent z-10 pointer-events-none" />

        <div className="flex whitespace-nowrap animate-scroll">
          {/* Duplicate the array twice for smooth infinite scrolling */}
          {[...TRUST_NAMES, ...TRUST_NAMES, ...TRUST_NAMES, ...TRUST_NAMES].map((name, i) => (
            <div key={`${name}-${i}`} className="flex items-center">
              <span
                className="mx-8 md:mx-12 font-primary text-sm md:text-base font-semibold uppercase tracking-[0.15em] text-[var(--night-40)] opacity-60 transition-opacity duration-500 hover:opacity-100 shrink-0"
              >
                {name}
              </span>
              <span className="w-1 h-1 rounded-full bg-[var(--mauve-20)]" aria-hidden />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};