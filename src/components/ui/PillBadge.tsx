type PillBadgeVariant = 'mauve' | 'gold';

const variants: Record<PillBadgeVariant, { text: string; bg: string; border: string }> = {
  mauve: {
    text: 'var(--mauve)',
    bg: 'var(--mauve-10)',
    border: 'var(--mauve-20)',
  },
  gold: {
    text: 'var(--jaune-or)',
    bg: 'var(--jaune-or-10)',
    border: 'var(--jaune-or-20)',
  },
};

interface PillBadgeProps {
  children: React.ReactNode;
  variant?: PillBadgeVariant;
  className?: string;
}

export const PillBadge: React.FC<PillBadgeProps> = ({
  children,
  variant = 'mauve',
  className = '',
}) => {
  const v = variants[variant];
  return (
    <span
      className={`inline-block px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-[0.2em] ${className}`}
      style={{ color: v.text, background: v.bg, border: `1px solid ${v.border}` }}
    >
      {children}
    </span>
  );
};
