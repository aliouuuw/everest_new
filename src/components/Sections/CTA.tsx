import { useReveal } from "../Hooks/useReveal";
import { FiArrowRight } from "react-icons/fi";
import { PillBadge } from '../ui';

type CtaScheme = 'ivory' | 'ink' | 'sand' | 'metallic';

export const CTA: React.FC<{
  scheme?: CtaScheme;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string | null;
}> = ({ primaryHref = '#contact', primaryLabel = 'Nous contacter', secondaryHref = '#offres', secondaryLabel = 'Découvrir nos offres' }) => {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="reveal relative py-24 md:py-36 overflow-hidden"
      id="contact"
      style={{ background: 'var(--pure-white)' }}
    >
      {/* Soft mauve orb — top left */}
      <div
        className="absolute top-0 left-0 w-[55%] h-[90%] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top left, rgba(70,29,76,0.06) 0%, rgba(203,152,36,0.04) 40%, transparent 65%)' }}
      />
      {/* Soft gold orb — bottom right */}
      <div
        className="absolute bottom-0 right-0 w-[45%] h-[70%] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom right, rgba(203,152,36,0.08) 0%, rgba(70,29,76,0.04) 45%, transparent 65%)' }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-16 lg:px-24">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 lg:gap-20">

          {/* Left Side */}
          <div className="lg:w-3/5">
            <div className="mb-8">
              <PillBadge>Prise de contact</PillBadge>
            </div>
            <h2
              className="mb-8"
              style={{
                fontFamily: 'var(--font-primary)',
                fontWeight: 700,
                fontSize: 'clamp(2.2rem, 5vw, 4rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: 'var(--mauve)',
              }}
            >
              Prêts à franchir<br />un cap ?
            </h2>
            <p
              className="max-w-md"
              style={{
                fontFamily: 'var(--font-primary)',
                fontWeight: 300,
                fontSize: '1.05rem',
                lineHeight: 1.75,
                color: 'var(--night-60)',
              }}
            >
              Échangeons autour de vos objectifs d&apos;investissement et de la meilleure manière de les atteindre.
            </p>
          </div>

          {/* Right Side: Actions */}
          <div className="lg:w-2/5 flex flex-col items-start lg:items-end gap-6 w-full">
            {secondaryHref && secondaryLabel && (
              <a
                href={secondaryHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-8 pl-4 pr-2 py-2 rounded-full border-2 border-[var(--jaune-or)] bg-[var(--jaune-or)] hover:bg-transparent hover:[&>span]:text-[var(--jaune-or)] transition-all duration-500"
              >
                <span
                  className="relative overflow-hidden text-[12px] tracking-[0.1em] font-extrabold text-[var(--pure-white)]"
                  style={{ fontFamily: 'var(--font-primary)', }}
                >
                  {secondaryLabel}
                </span>
                <span className="bg-[var(--pure-white)] rounded-full p-2 group-hover:translate-x-[2px] transition-all duration-500">
                  <FiArrowRight className="text-lg text-[var(--mauve)] group-hover:text-[var(--mauve)] group-hover:translate-x-[1px] transition-all duration-500" />
                </span>
              </a>
            )}
            <a
              href={primaryHref}
              className="group w-full sm:w-auto inline-flex items-center justify-center sm:justify-start gap-8 pl-4 pr-2 py-2 rounded-full border-2 border-[var(--mauve)] bg-[var(--mauve)] hover:bg-transparent transition-all duration-500"
            >
              <span
                className="text-[12px] tracking-[0.1em] text-white font-extrabold group-hover:text-[var(--mauve)] transition-colors duration-500"
                style={{ fontFamily: 'var(--font-primary)', }}
              >
                {primaryLabel}
              </span>
              <span className="bg-[var(--pure-white)] rounded-full p-2 group-hover:translate-x-[2px] transition-all duration-500">
                <FiArrowRight className="text-lg text-[var(--mauve)] group-hover:text-[var(--mauve)] group-hover:translate-x-[1px] transition-all duration-500" />
              </span>
            </a>

          </div>

        </div>
      </div>
    </section>
  );
};
