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
      className="reveal relative overflow-hidden"
      id="contact"
      style={{
        background: 'linear-gradient(170deg, #12101a 0%, #1a1420 45%, #0f0d12 100%)',
        paddingTop: 'var(--section-gap)',
        paddingBottom: 'var(--section-gap)',
      }}
    >
      {/* Restrained atmospheric glow */}
      <div
        className="absolute top-0 left-0 w-[50%] h-[60%] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top left, rgba(70, 29, 76, 0.15) 0%, transparent 60%)' }}
      />
      <div
        className="absolute bottom-0 right-0 w-[40%] h-[50%] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom right, rgba(202, 148, 47, 0.06) 0%, transparent 50%)' }}
      />
      {/* Grain */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-16 lg:px-24">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 lg:gap-20">
          
          {/* Left */}
          <div className="lg:w-3/5">
            <span
              className="inline-flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase mb-8"
              style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--jaune-or)' }}
            >
              <span className="inline-block w-5 h-[1px]" style={{ background: 'var(--jaune-or)', opacity: 0.5 }} />
              Prise de contact
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 300,
                fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: 'var(--pure-white)',
              }}
            >
              Prêts à franchir{' '}
              <em style={{ 
                fontStyle: 'italic', 
                color: 'var(--jaune-or)',
              }}>
                un cap ?
              </em>
            </h2>
            <div
              className="h-[1px] w-24 mt-9 mb-7"
              style={{ background: 'linear-gradient(90deg, var(--jaune-or), transparent)' }}
            />
            <p
              className="max-w-md"
              style={{
                fontFamily: 'var(--font-primary)',
                fontWeight: 300,
                fontSize: '1rem',
                lineHeight: 1.8,
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              Échangeons autour de vos objectifs d&apos;investissement et de la meilleure manière de les atteindre.
            </p>
          </div>

          {/* Right */}
          <div className="lg:w-2/5 flex flex-col items-start lg:items-end gap-6 w-full">
            <a
              href={primaryHref}
              className="group w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-8 px-7 py-4 border transition-all duration-500"
              style={{ 
                borderColor: 'rgba(202, 148, 47, 0.25)',
                background: 'rgba(202, 148, 47, 0.05)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(202, 148, 47, 0.5)';
                e.currentTarget.style.background = 'rgba(202, 148, 47, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(202, 148, 47, 0.25)';
                e.currentTarget.style.background = 'rgba(202, 148, 47, 0.05)';
              }}
            >
              <span
                className="text-[11px] tracking-[0.2em] uppercase"
                style={{ fontFamily: 'var(--font-primary)', fontWeight: 500, color: 'var(--jaune-or)' }}
              >
                {primaryLabel}
              </span>
              <FiArrowRight className="text-base text-[var(--jaune-or)] group-hover:translate-x-1 transition-transform duration-500" />
            </a>
            
            {secondaryHref && (
              <a
                href={secondaryHref}
                className="group inline-flex items-center gap-4 mt-1"
              >
                <span
                  className="relative overflow-hidden text-[11px] tracking-[0.2em] uppercase"
                  style={{ fontFamily: 'var(--font-primary)', fontWeight: 400, color: 'rgba(255,255,255,0.4)' }}
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
