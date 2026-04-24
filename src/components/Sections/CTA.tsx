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
          className="relative flex flex-col items-start justify-between gap-10 overflow-hidden rounded-[var(--radius-card-lg)] border border-white/10 p-6 shadow-[0_8px_40px_rgba(0,0,0,0.12)] sm:gap-12 sm:p-8 md:p-10 lg:flex-row lg:items-center lg:gap-20"
          style={{ background: 'var(--mauve)' }}
        >
          <div className="relative z-10 lg:w-3/5">
            <div className="mb-6">
              <PillBadge>
                <EditableText id="home.cta.badge" as="span">
                  Prise de contact
                </EditableText>
              </PillBadge>
            </div>
            <h2 className="luxury-heading-dark mb-6">
              <EditableText id="home.cta.title" as="span">
                Accéder à une expertise
              </EditableText>{' '}
              <EditableText id="home.cta.titleAccent" as="span" style={{ color: 'var(--jaune-or)' }}>
                financière structurée.
              </EditableText>
            </h2>
            <EditableText
              id="home.cta.intro"
              as="p"
              className="max-w-md font-primary text-sm md:text-base font-light leading-[1.7] text-white/80"
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
                className="group btn-cta-pill btn-cta-pill--gold justify-between sm:justify-start"
              >
                <span className="btn-cta-pill__label">
                  <EditableText id="home.cta.secondary" as="span">{secondaryLabel}</EditableText>
                </span>
                <span className="btn-cta-pill__trail" aria-hidden>
                  <FiArrowRight className="text-lg text-[var(--mauve)] transition-transform duration-500 group-hover:translate-x-px" />
                </span>
              </button>
            )}
            <a
              href={primaryHref}
              className="group btn-cta-pill btn-cta-pill--outline-light justify-center sm:justify-start"
            >
              <span className="btn-cta-pill__label">
                <EditableText id="home.cta.primary" as="span">{primaryLabel}</EditableText>
              </span>
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
