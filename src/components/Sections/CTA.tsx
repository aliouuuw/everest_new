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
      className="reveal relative py-24 md:py-36 overflow-hidden bg-[var(--night)] border-t border-white/5"
      id="contact"
    >
      {/* Background Command Center Grid & Glows */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1h38v38H1V1z' fill='%23FFFFFF' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      />
      <div
        className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--jaune-or)]/30 to-transparent"
      />
      <div
        className="absolute -top-[20%] -left-[10%] w-[50%] h-[70%] pointer-events-none opacity-30"
        style={{ background: 'radial-gradient(ellipse at center, rgba(70,29,76,0.6) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 right-0 w-[40%] h-[60%] pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(ellipse at bottom right, rgba(202,148,47,0.3) 0%, transparent 70%)' }}
      />
      
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-16 lg:px-24">
        <div className="bg-white/5 border border-white/10 p-8 md:p-16 relative overflow-hidden backdrop-blur-sm">
          
          {/* Decorative Corner Markers */}
          <div className="absolute top-0 left-0 w-4 h-[1px] bg-white/30" />
          <div className="absolute top-0 left-0 w-[1px] h-4 bg-white/30" />
          <div className="absolute top-0 right-0 w-4 h-[1px] bg-white/30" />
          <div className="absolute top-0 right-0 w-[1px] h-4 bg-white/30" />
          <div className="absolute bottom-0 left-0 w-4 h-[1px] bg-white/30" />
          <div className="absolute bottom-0 left-0 w-[1px] h-4 bg-white/30" />
          <div className="absolute bottom-0 right-0 w-4 h-[1px] bg-white/30" />
          <div className="absolute bottom-0 right-0 w-[1px] h-4 bg-white/30" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 lg:gap-20">
            
            {/* Left Side: Oversized Editorial Text */}
            <div className="lg:w-3/5">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[1px] w-6 bg-[var(--jaune-or)]" />
                <span
                  className="text-[9px] tracking-[0.3em] uppercase font-mono text-[var(--jaune-or)]"
                >
                  Initiation de mandat
                </span>
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-display-aptos)',
                  fontWeight: 400,
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                  color: 'white',
                }}
              >
                Structurez votre{' '}
                <span className="block text-white/40 mt-1">
                  patrimoine avec nous.
                </span>
              </h2>
              
              <p
                className="max-w-md mt-8"
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontWeight: 300,
                  fontSize: '1.05rem',
                  lineHeight: 1.75,
                  color: 'rgba(255,255,255,0.6)',
                }}
              >
                Ouvrez un compte titres, initiez un mandat de gestion ou consultez nos experts pour l'ingénierie financière de vos projets.
              </p>
            </div>

            {/* Right Side: Vertical Actions */}
            <div className="lg:w-2/5 flex flex-col gap-4 w-full">
              <a
                href={primaryHref}
                className="group flex items-center justify-between bg-white text-[var(--night)] p-6 hover:bg-[var(--jaune-or)] transition-colors duration-300"
              >
                <div className="flex flex-col">
                  <span
                    className="text-[10px] tracking-widest uppercase mb-1 opacity-50"
                    style={{ fontFamily: 'var(--font-primary)', fontWeight: 600 }}
                  >
                    Action principale
                  </span>
                  <span
                    className="text-lg"
                    style={{ fontFamily: 'var(--font-display-aptos)', fontWeight: 500 }}
                  >
                    {primaryLabel}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <FiArrowRight className="w-5 h-5" />
                </div>
              </a>
              
              {secondaryHref && (
                <a
                  href={secondaryHref}
                  className="group flex items-center justify-between border border-white/10 text-white p-6 hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                >
                  <span
                    className="text-sm tracking-wide"
                    style={{ fontFamily: 'var(--font-primary)', fontWeight: 400 }}
                  >
                    {secondaryLabel}
                  </span>
                  <FiArrowRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
                </a>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
