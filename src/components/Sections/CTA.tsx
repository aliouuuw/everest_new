import { useState } from 'react';
import { useReveal } from '../Hooks/useReveal';
import { FiArrowRight } from 'react-icons/fi';
import { InvestorProfileModal } from '../InvestorProfile';
import { EditableText } from '../../cms';
import { PillBadge } from '../ui';

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
      <div className="page-container">
        <div
          className="relative flex flex-col items-start justify-between gap-10 overflow-hidden rounded-2xl border border-[var(--command-border)] bg-[var(--pure-white)] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-[var(--mauve-20)] hover:shadow-[var(--shadow-card-lift)] sm:gap-12 sm:p-8 md:p-10 lg:flex-row lg:items-center lg:gap-20"
        >
          <div className="relative z-10 lg:w-3/5">
            <div className="mb-6">
              <PillBadge>
                <EditableText id="home.cta.badge" as="span">
                  Prise de contact
                </EditableText>
              </PillBadge>
            </div>
            <h2 className="luxury-heading mb-6">
              <EditableText id="home.cta.title" as="span">
                Accéder à une expertise financière structurée.
              </EditableText>
            </h2>
            <EditableText
              id="home.cta.intro"
              as="p"
              className="max-w-md font-primary text-sm md:text-base font-light leading-[1.7] text-[var(--night-70)]"
            >
              Échangeons sur vos objectifs — rendement, horizon, contraintes réglementaires — et sur la formule
              la plus adaptée : courtage, conseil ou gestion sous mandat.
            </EditableText>
          </div>

          <div className="relative z-10 flex w-full flex-col items-start gap-6 lg:w-2/5 lg:items-end">
            {secondaryLabel && (
              <button
                type="button"
                onClick={() => setIsProfileOpen(true)}
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[var(--jaune-or)] px-6 py-3 text-sm font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-[#b07d24] hover:shadow-md sm:justify-start"
              >
                <EditableText id="home.cta.secondary" as="span">{secondaryLabel}</EditableText>
                <FiArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            )}
            <a
              href={primaryHref}
              className="group inline-flex items-center justify-center gap-3 rounded-full border-2 border-[var(--mauve)] px-6 py-3 text-sm font-bold uppercase tracking-[0.15em] text-[var(--mauve)] transition-all duration-300 hover:bg-[var(--mauve)] hover:text-white sm:justify-start"
            >
              <EditableText id="home.cta.primary" as="span">{primaryLabel}</EditableText>
              <FiArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-0.5" />
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
