import { PillBadge } from './PillBadge';

type PillVariant = 'mauve' | 'gold';

interface SectionHeaderProps {
  badge: string;
  badgeVariant?: PillVariant;
  heading: React.ReactNode;
  subtext?: string;
  align?: 'left' | 'center';
  dark?: boolean;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  badgeVariant = 'mauve',
  heading,
  subtext,
  align = 'left',
  dark = false,
  className = '',
}) => {
  const centered = align === 'center';
  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`}>
      <div className={`mb-6 ${centered ? '' : ''}`}>
        <PillBadge variant={dark ? 'gold' : badgeVariant}>{badge}</PillBadge>
      </div>
      <h2 className={dark ? 'luxury-heading-dark' : 'luxury-heading'}>
        {heading}
      </h2>
      {subtext && (
        <p
          className={`mt-4 text-base md:text-lg ${centered ? 'max-w-xl mx-auto' : 'max-w-md'} ${
            dark ? 'text-secondary-dark' : 'text-secondary'
          }`}
        >
          {subtext}
        </p>
      )}
    </div>
  );
};
