import { useReveal } from '../Hooks/useReveal';
import { EditableImage } from '../../cms';

type Partner = {
  name: string;
  logo: string;
};

const PARTNER_NAME_TO_CMS: Record<string, string> = {
  'BRVM': 'home.trust.brvm',
  'BDK': 'home.trust.bdk',
  'État du Sénégal': 'home.trust.etatSenegal',
  'Kalia': 'home.trust.kalia',
  'BHS': 'home.trust.bhs',
  'Sunu Group': 'home.trust.sunuGroup',
  'BCI': 'home.trust.bci',
  'BNDE': 'home.trust.bnde',
  'BOAD': 'home.trust.boad',
  'Orabank': 'home.trust.orabank',
  'Pagena': 'home.trust.pagena',
  'CDE': 'home.trust.cde',
  'Ville de Dakar': 'home.trust.villeDakar',
};

const PARTNERS: Partner[] = [
  { name: 'BRVM', logo: '/partners/BRVM.jpg' },
  { name: 'BDK', logo: '/partners/BDK.jpg' },
  { name: 'État du Sénégal', logo: '/partners/etat-du-senegal.jpg' },
  { name: 'Kalia', logo: '/partners/kalia.jpg' },
  { name: 'BHS', logo: '/partners/bhs.jpg' },
  { name: 'Sunu Group', logo: '/partners/sunu-group.jpg' },
  { name: 'BCI', logo: '/partners/bci.jpg' },
  { name: 'BNDE', logo: '/partners/bnde.jpg' },
  { name: 'BOAD', logo: '/partners/boad.jpg' },
  { name: 'Orabank', logo: '/partners/Orabank.jpg' },
  { name: 'Pagena', logo: '/partners/Pagena.jpg' },
  { name: 'CDE', logo: '/partners/CDE-1.jpg' },
  { name: 'Ville de Dakar', logo: '/partners/ville-de-dakar.jpg' },
];

/**
 * Institutional partner logos row — centered caption + evenly spaced logo images.
 */
export const TrustStrip: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>();

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
          {PARTNERS.map((partner) => (
            <li
              key={partner.name}
              className="flex items-center justify-center h-12 opacity-70 transition-opacity duration-300 hover:opacity-100"
            >
              <EditableImage
                id={PARTNER_NAME_TO_CMS[partner.name] || ''}
                src={partner.logo}
                alt={partner.name}
                className="max-h-12 max-w-[140px] object-contain"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
