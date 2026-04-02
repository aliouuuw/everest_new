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
      className="reveal relative py-24 md:py-36 overflow-hidden"
      id="contact"
      style={{ background: 'linear-gradient(170deg, #2a1435 0%, #1e1028 40%, #150e1c 100%)' }}
    >
      {/* Dramatic gold-mauve gradient orbs */}
      <div
        className="absolute top-0 left-0 w-[60%] h-[80%] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top left, var(--mauve-30) 0%, var(--jaune-or-10) 30%, transparent 60%)' }}
      />
      <div
        className="absolute bottom-0 right-0 w-[50%] h-[60%] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom right, var(--jaune-or-15) 0%, var(--mauve-10) 40%, transparent 60%)' }}
      />
      {/* Gradient noise texture overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />
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
                fontFamily: 'var(--font-primary)',
                fontWeight: 800,
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: 'var(--pure-white)',
              }}
            >
              Prêts à franchir{' '}
              <span style={{ color: 'var(--jaune-or)' }}>
                un cap ?
              </span>
            </h2>
            <div
              className="h-[2px] w-32 mt-10 mb-8"
              style={{ background: 'linear-gradient(90deg, var(--jaune-or), var(--mauve), transparent)' }}
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
              className="group w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-8 px-8 py-5 border transition-all duration-500 hover:shadow-[0_0_30px_rgba(202,148,47,0.3)]"
              style={{ 
                borderColor: 'rgba(202,148,47,0.4)',
                background: 'linear-gradient(135deg, rgba(202,148,47,0.1) 0%, transparent 100%)'
              }}
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
