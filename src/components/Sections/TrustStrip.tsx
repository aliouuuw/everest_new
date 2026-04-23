import { useReveal } from '../Hooks/useReveal';

const TRUST_NAMES = ['BRVM', 'UEMOA-Titres', 'AFRICA50', 'SFI', 'Proparco'] as const;

/**
 * Full-bleed band with institutional partner names, centered.
 * Sits between the hero and the first editorial section.
 */
export const TrustStrip: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="reveal w-full border-b border-[var(--mauve-10)]/60 bg-[var(--pure-white)]/80"
      aria-label="Écosystème & partenaires institutionnels"
    >
      <div className="mx-auto w-full max-w-[min(100%,1400px)] px-6 py-8 text-center md:px-16 md:py-10 lg:px-24">
        <div className="mb-5 flex w-full items-center justify-center gap-3">
          <span
            className="h-px w-6 shrink-0 sm:w-8"
            style={{ background: 'var(--mauve-20)' }}
            aria-hidden
          />
          <span className="kicker text-[10px] tracking-[0.25em] text-[var(--night-40)]">
            Écosystème &amp; partenaires institutionnels
          </span>
          <span
            className="h-px w-6 shrink-0 sm:w-8"
            style={{ background: 'var(--mauve-20)' }}
            aria-hidden
          />
        </div>
        <ul className="flex w-full flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:gap-x-10">
          {TRUST_NAMES.map((name) => (
            <li
              key={name}
              className="font-primary text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--night-40)] opacity-70 grayscale transition-opacity duration-500 hover:opacity-100"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
