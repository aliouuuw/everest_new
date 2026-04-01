import { useReveal } from "../Hooks/useReveal";
import { FiArrowRight } from "react-icons/fi";
import { useRef, useState } from "react";

export const CTA: React.FC<{
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}> = ({ primaryHref = '#contact', primaryLabel = 'Nous contacter', secondaryHref = '#offres', secondaryLabel = 'Découvrir nos offres' }) => {
  const sectionRef = useReveal<HTMLElement>();
  
  // Magnetic button state
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [buttonMousePosition, setButtonMousePosition] = useState({ x: 0, y: 0 });

  const handleButtonMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setButtonMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      ref={sectionRef}
      className="reveal-scale relative overflow-hidden"
      id="contact"
      style={{
        background: 'var(--mauve-solid)',
        paddingTop: 'var(--section-gap)',
        paddingBottom: 'var(--section-gap)',
      }}
    >
      {/* Subtle atmospheric accents on solid mauve */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[-20%] left-[10%] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(90,41,99,0.4) 0%, transparent 60%)', filter: 'blur(100px)' }}
        />
        <div
          className="absolute bottom-[-15%] right-[15%] w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(202,148,47,0.08) 0%, transparent 60%)', filter: 'blur(80px)' }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-16 lg:px-24">
        {/* Centered layout — modern */}
        <div className="text-center max-w-2xl mx-auto">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-[11px] tracking-[0.08em] uppercase font-medium transition-transform hover:scale-105 duration-300"
            style={{
              fontFamily: 'var(--font-primary)',
              color: 'var(--jaune-or)',
              background: 'rgba(202,148,47,0.08)',
              border: '1px solid rgba(202,148,47,0.15)',
            }}
          >
            Parlons de votre projet
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-primary)',
              fontWeight: 800,
              fontSize: 'clamp(2.4rem, 5.5vw, 4rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: 'var(--pure-white)',
            }}
          >
            Prêts à passer à{' '}
            <span style={{ color: 'var(--jaune-or)', textShadow: '0 0 40px rgba(202,148,47,0.3)' }}>l'action ?</span>
          </h2>
          <p
            className="mt-6 mx-auto"
            style={{
              fontFamily: 'var(--font-primary)',
              fontWeight: 400,
              fontSize: '1.05rem',
              lineHeight: 1.8,
              color: 'var(--mauve-on-solid-muted)',
              maxWidth: '28rem',
            }}
          >
            Partagez vos objectifs d'investissement — nous construisons la stratégie avec vous.
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              ref={buttonRef}
              href={primaryHref}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full transition-all duration-400 overflow-hidden"
              style={{
                fontFamily: 'var(--font-primary)',
                fontWeight: 600,
                fontSize: '0.9rem',
                color: 'var(--night)',
                background: 'var(--jaune-or)',
                transformStyle: 'preserve-3d',
              }}
              onMouseMove={handleButtonMouseMove}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(202,148,47,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Interactive Shine Effect */}
              <div
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 mix-blend-overlay"
                style={{
                  background: `radial-gradient(100px circle at ${buttonMousePosition.x}px ${buttonMousePosition.y}px, rgba(255,255,255,0.8), transparent 50%)`,
                }}
              />
              
              <span className="relative z-10">{primaryLabel}</span>
              <FiArrowRight className="relative z-10 text-base group-hover:translate-x-1 transition-transform duration-300" />
            </a>

            {secondaryHref && (
              <a
                href={secondaryHref}
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full transition-all duration-300"
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  color: 'rgba(255,255,255,0.7)',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
                  e.currentTarget.style.color = 'var(--pure-white)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {secondaryLabel}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
