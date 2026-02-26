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
      className="reveal relative py-28 md:py-36 overflow-hidden"
      id="contact"
      style={{ background: 'var(--night)' }}
    >
      {/* Centered multi-color radial glow incorporating mauve and jaune-or */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, var(--mauve-10) 0%, rgba(202,148,47,0.05) 40%, transparent 80%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-16 lg:px-24">
        <div className="max-w-3xl mx-auto text-center">
          <span
            className="block text-[10px] tracking-[0.3em] uppercase mb-6"
            style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--jaune-or)' }}
          >
            Prise de contact
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-display-aptos)',
              fontWeight: 300,
              fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.01em',
              color: 'var(--pure-white)',
            }}
          >
            Prêts à franchir{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--jaune-or)' }}>
              un cap ?
            </em>
          </h2>

          {/* Dual-tone rule (mauve to jaune-or) */}
          <div
            className="h-[1px] w-24 mx-auto mt-8 mb-8"
            style={{ background: 'linear-gradient(90deg, transparent, var(--mauve), var(--jaune-or), transparent)' }}
          />

          <p
            className="max-w-xl mx-auto mb-12"
            style={{
              fontFamily: 'var(--font-primary)',
              fontWeight: 300,
              fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)',
              lineHeight: 1.75,
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            Échangeons autour de vos objectifs d&apos;investissement et de la meilleure manière de les atteindre.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
            <a
              href={primaryHref}
              className="group inline-flex items-center gap-3 px-7 py-3.5 border border-[var(--jaune-or)]/40 transition-all duration-500 hover:border-[var(--jaune-or)] hover:bg-[var(--jaune-or)]/10"
            >
              <span
                className="text-[11px] tracking-[0.15em] uppercase"
                style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--jaune-or)' }}
              >
                {primaryLabel}
              </span>
              <FiArrowRight className="text-sm text-[var(--jaune-or)] group-hover:translate-x-0.5 transition-transform duration-500" />
            </a>
            {secondaryHref && (
              <a
                href={secondaryHref}
                className="group inline-flex items-center gap-4"
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
