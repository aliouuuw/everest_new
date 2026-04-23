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
}> = ({ primaryHref = '/contact', primaryLabel = 'Nous contacter', secondaryLabel = 'Découvrir nos offres' }) => {
  const sectionRef = useReveal<HTMLElement>();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
    <section
      ref={sectionRef}
      className="reveal relative py-16 md:py-20 bg-[var(--pure-white)]"
      id="contact"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-10 lg:px-12">
        <div className="soft-panel flex flex-col items-start justify-between gap-10 p-6 sm:gap-12 sm:p-8 md:p-10 lg:flex-row lg:items-center lg:gap-20">

          {/* Left Side */}
          <div className="lg:w-3/5">
            <h2 className="luxury-heading mb-6">
              Accéder à une expertise <span style={{ color: 'var(--jaune-or)' }}>financière structurée.</span>
            </h2>
            <p className="max-w-md font-primary text-sm md:text-base font-light leading-[1.7] text-[var(--night-60)]">
              Échangeons sur vos objectifs — rendement, horizon, contraintes réglementaires — et sur la formule la plus adaptée : courtage, conseil ou gestion sous mandat.
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
