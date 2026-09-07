import { FiArrowRight } from 'react-icons/fi';

interface SectionHeaderAction {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
}

interface SectionHeaderProps {
  heading: React.ReactNode;
  subtext?: string;
  align?: 'left' | 'center';
  dark?: boolean;
  className?: string;
  action?: SectionHeaderAction;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  heading,
  subtext,
  align = 'left',
  dark = false,
  className = '',
  action,
}) => {
  const centered = align === 'center';
  return (
    <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 ${className}`}>
      <div className={`${centered ? 'text-center' : ''}`}>
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
      {action && (
        <a
          href={action.href}
          className={`hidden md:inline-flex items-center gap-3 group ${
            action.variant === 'secondary' ? 'btn-secondary' : 'btn-primary'
          }`}
        >
          <span>{action.label}</span>
          <FiArrowRight className="text-sm group-hover:translate-x-0.5 transition-transform" />
        </a>
      )}
    </div>
  );
};
