import { useState } from 'react';
import { useReveal } from "../Hooks/useReveal";
import { FiArrowRight } from "react-icons/fi";
import { InvestorProfileModal } from '../InvestorProfile';

type CtaScheme = 'ivory' | 'ink' | 'sand' | 'metallic';

export const CTA: React.FC<{
  scheme?: CtaScheme;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string | null;
}> = ({ primaryHref = '#contact', primaryLabel = 'Nous contacter', secondaryLabel = 'Découvrir nos offres' }) => {
  const sectionRef = useReveal<HTMLElement>();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
    <section
      ref={sectionRef}
      className="reveal relative py-24 md:py-32 overflow-hidden"
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
            <h2 className="luxury-heading mb-8">
              Prêts à franchir<br />
              <span style={{ color: 'var(--jaune-or)' }}>un cap ?</span>
            </h2>
            <p className="max-w-md font-primary text-base md:text-lg font-light leading-[1.75] text-[var(--night-60)]">
              Échangeons sur vos objectifs (rendement, horizon, contraintes réglementaires) et sur la formule la plus adaptée : courtage, conseil ou gestion sous mandat.
            </p>
          </div>

          {/* Right Side: Actions */}
          <div className="lg:w-2/5 flex flex-col items-start lg:items-end gap-6 w-full">
            {secondaryLabel && (
              <button
                type="button"
                onClick={() => setIsProfileOpen(true)}
                className="group btn-cta-pill btn-cta-pill--gold justify-between sm:justify-start"
              >
                <span className="btn-cta-pill__label">{secondaryLabel}</span>
                <span className="btn-cta-pill__trail" aria-hidden>
                  <FiArrowRight className="text-lg text-[var(--mauve)] transition-transform duration-500 group-hover:translate-x-px" />
                </span>
              </button>
            )}
            <a
              href={primaryHref}
              className="btn-cta-pill btn-cta-pill--mauve group justify-center sm:justify-start"
            >
              <span className="btn-cta-pill__label">{primaryLabel}</span>
              <span className="btn-cta-pill__trail" aria-hidden>
                <FiArrowRight className="text-lg text-[var(--mauve)] transition-transform duration-500 group-hover:translate-x-px" />
              </span>
            </a>

          </div>

        </div>
      </div>
    </section>

    <InvestorProfileModal
      isOpen={isProfileOpen}
      onClose={() => setIsProfileOpen(false)}
    />
    </>
  );
};
