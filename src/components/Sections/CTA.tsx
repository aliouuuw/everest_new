import { useState, type ComponentType } from 'react';
import { useReveal } from '../Hooks/useReveal';
import { FiArrowRight } from 'react-icons/fi';
import { EditableText } from '../../cms';
import { PillBadge } from '../ui';

type CtaScheme = 'ivory' | 'ink' | 'sand' | 'metallic';

type ProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const CTA: React.FC<{
  scheme?: CtaScheme;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string | null;
  ProfileModal?: ComponentType<ProfileModalProps>;
}> = ({
  primaryHref = '/contact',
  primaryLabel = 'Nous contacter',
  secondaryHref,
  secondaryLabel = 'Découvrir nos offres',
  ProfileModal,
}) => {
  const sectionRef = useReveal<HTMLElement>();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const ctaButtonClass =
    'group inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full font-bold uppercase leading-none text-white transition-all duration-300 max-lg:h-11 max-lg:gap-1.5 max-lg:px-2.5 max-lg:text-xs max-lg:tracking-normal sm:max-lg:px-4 sm:max-lg:tracking-[0.08em] lg:gap-3 lg:px-6 lg:py-3 lg:text-sm lg:tracking-[0.15em]';
  const mobileSecondaryLabel =
    secondaryLabel === "Évaluer mon profil d'investisseur" ? 'Évaluer mon profil' : secondaryLabel;

  return (
    <>
    <section
      ref={sectionRef}
      className="reveal relative py-16 md:py-20 bg-[var(--pure-white)]"
      id="contact"
    >
      <div className="page-container">
        <div
          className="relative flex flex-col items-start justify-between gap-10 overflow-hidden rounded-2xl border border-[var(--command-border)] bg-[var(--pure-white)] px-3 py-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-[var(--mauve-20)] hover:shadow-[var(--shadow-card-lift)] sm:gap-12 sm:p-8 md:p-10 lg:flex-row lg:items-center lg:gap-20"
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

          <div className="relative z-10 flex w-full flex-nowrap items-center gap-1.5 sm:gap-3 lg:w-2/5 lg:flex-col lg:items-end lg:gap-6">
            {secondaryLabel && (secondaryHref || ProfileModal) && (
              secondaryHref ? (
                <a
                  href={secondaryHref}
                  className={`${ctaButtonClass} bg-[var(--jaune-or)] hover:bg-[#b07d24] hover:shadow-md`}
                >
                  <span className="sm:hidden">{mobileSecondaryLabel}</span>
                  <EditableText id="home.cta.secondary" as="span" className="hidden sm:inline">{secondaryLabel}</EditableText>
                  <FiArrowRight className="hidden shrink-0 text-sm transition-transform duration-300 group-hover:translate-x-0.5 sm:block lg:text-lg" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsProfileOpen(true)}
                  className={`${ctaButtonClass} bg-[var(--jaune-or)] hover:bg-[#b07d24] hover:shadow-md`}
                >
                  <span className="sm:hidden">{mobileSecondaryLabel}</span>
                  <EditableText id="home.cta.secondary" as="span" className="hidden sm:inline">{secondaryLabel}</EditableText>
                  <FiArrowRight className="hidden shrink-0 text-sm transition-transform duration-300 group-hover:translate-x-0.5 sm:block lg:text-lg" />
                </button>
              )
            )}
            <a
              href={primaryHref}
              className={`${ctaButtonClass} bg-[#012d2a] hover:bg-[#014542] hover:shadow-lg`}
            >
              <EditableText id="home.cta.primary" as="span">{primaryLabel}</EditableText>
              <FiArrowRight className="hidden shrink-0 text-sm transition-transform duration-300 group-hover:translate-x-0.5 sm:block lg:text-lg" />
            </a>
          </div>

        </div>
      </div>
    </section>

    {ProfileModal && (
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    )}
    </>
  );
};
