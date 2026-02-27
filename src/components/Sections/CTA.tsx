import { useReveal } from "../Hooks/useReveal";
import { FiArrowRight } from "react-icons/fi";

type CtaScheme = 'ivory' | 'ink' | 'sand' | 'metallic';

export const CTA: React.FC<{
  scheme?: CtaScheme;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}> = ({ primaryHref = '#contact', primaryLabel = 'Nous contacter', secondaryHref = '#offres', secondaryLabel = 'Découvrir nos offres' }) => {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="reveal relative py-24 md:py-36 overflow-hidden section-bg-mauve"
      id="contact"
    >
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-16 lg:px-24">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 lg:gap-20">
          
          {/* Left Side: Oversized Editorial Text */}
          <div className="lg:w-3/5">
            <span
              className="block text-[10px] tracking-[0.35em] uppercase mb-8"
              style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--jaune-or)' }}
            >
              Prise de contact
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 300,
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: 'var(--pure-white)',
              }}
            >
              Prêts à franchir{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--jaune-or)' }}>
                un cap ?
              </em>
            </h2>
            <div
              className="h-[1px] w-24 mt-10 mb-8"
              style={{ background: 'linear-gradient(90deg, var(--jaune-or), transparent)' }}
            />
            <p
              className="max-w-md"
              style={{
                fontFamily: 'var(--font-primary)',
                fontWeight: 300,
                fontSize: '1.05rem',
                lineHeight: 1.75,
                color: 'rgba(255,255,255,0.7)',
              }}
            >
              Échangeons autour de vos objectifs d&apos;investissement et de la meilleure manière de les atteindre.
            </p>
          </div>

          {/* Right Side: Vertical Actions */}
          <div className="lg:w-2/5 flex flex-col items-start lg:items-end gap-6 w-full">
            <a
              href={primaryHref}
              className="group w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-8 px-8 py-5 border border-[var(--jaune-or)]/40 transition-all duration-500 hover:border-[var(--jaune-or)] hover:bg-[var(--jaune-or)]/10"
            >
              <span
                className="text-[12px] tracking-[0.2em] uppercase"
                style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--jaune-or)' }}
              >
                {primaryLabel}
              </span>
              <FiArrowRight className="text-lg text-[var(--jaune-or)] group-hover:translate-x-1 transition-transform duration-500" />
            </a>
            
            {secondaryHref && (
              <a
                href={secondaryHref}
                className="group inline-flex items-center gap-4 mt-2"
              >
                <span
                  className="relative overflow-hidden text-[11px] tracking-[0.2em] uppercase"
                  style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'rgba(255,255,255,0.5)' }}
                >
                  {secondaryLabel}
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--jaune-or)] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)]" />
                </span>
              </a>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
