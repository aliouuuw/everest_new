import { useReveal } from '../Hooks/useReveal'
import { useContent } from '../../cms'
import {
  DEFAULT_TRUST_PARTNERS,
  parseTrustPartners,
} from '../../content/trustPartners'

/**
 * Institutional partner logos row — centered caption + evenly spaced logo images.
 */
export const TrustStrip: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>()
  const partnersOverride = useContent('home.trust.partners')
  const partners =
    parseTrustPartners(partnersOverride?.value) ?? DEFAULT_TRUST_PARTNERS

  return (
    <section
      ref={sectionRef}
      className="reveal w-full border-b border-[var(--command-border)] bg-[var(--pure-white)] py-8 md:py-10"
      aria-label="Partenaires institutionnels"
    >
      <div className="page-container">
        <p className="mb-8 text-center font-primary text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--mauve-60)] md:mb-10">
          La confiance d&apos;émetteurs et investisseurs institutionnels
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {partners.map((partner, index) => (
            <li
              key={`${partner.name}-${index}`}
              className="flex items-center justify-center h-12 opacity-70 transition-opacity duration-300 hover:opacity-100"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-12 max-w-[140px] object-contain"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
