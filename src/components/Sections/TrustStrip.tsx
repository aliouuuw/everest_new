import { useReveal } from '../Hooks/useReveal';

const PARTNERS = ['BRVM', 'UEMOA-Titres', 'AFRICA50', 'SFI', 'Proparco'];

/**
 * Static institutional partner row — centered caption + evenly spaced logos.
 * Productized, no marquee, no decorative shell.
 */
export const TrustStrip: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="reveal w-full border-b border-[var(--command-border)] bg-[var(--pure-white)] py-8 md:py-10"
      aria-label="Partenaires institutionnels"
    >
      <div className="page-container">
        <p className="mb-6 text-center font-primary text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--mauve-60)] md:mb-7">
          La confiance d&apos;émetteurs et investisseurs institutionnels
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:gap-x-10 md:gap-x-14 lg:gap-x-16">
          {PARTNERS.map((name) => (
            <li
              key={name}
              className="font-primary text-sm font-semibold uppercase tracking-[0.15em] text-[var(--night-40)] opacity-70 transition-opacity duration-300 hover:opacity-100 md:text-[15px]"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
