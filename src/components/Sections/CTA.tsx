import { useReveal } from "../Hooks/useReveal";

type CtaScheme = 'ivory' | 'ink' | 'sand' | 'metallic';

export const CTA: React.FC<{
  scheme?: CtaScheme;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}> = ({ scheme = 'ivory', primaryHref = '#contact', primaryLabel = 'Nous contacter', secondaryHref = '#offres', secondaryLabel = 'Découvrir nos offres' }) => {
  const sectionRef = useReveal<HTMLElement>();

  const schemes: Record<CtaScheme, {
    card: string;
    bar: string;
    title: string;
    body: string;
    primaryBtn: string;
    secondaryBtn: string;
    gridOpacity: number;
  }> = {
    ivory: {
      card: 'bg-[var(--pure-white)]/80 backdrop-blur-sm border border-[var(--gold-metallic)]/25 shadow-sm',
      bar: 'bg-[var(--gold-metallic)]',
      title: 'text-[var(--night)]',
      body: 'text-secondary',
      primaryBtn: 'px-7 py-3.5 bg-[var(--night)] text-[var(--pure-white)] font-medium text-sm tracking-wide transition-all duration-300 hover:bg-black hover:shadow-lg rounded-lg',
      secondaryBtn: 'px-7 py-3.5 border border-[var(--night)]/15 text-[var(--night)] font-medium text-sm tracking-wide transition-all duration-300 hover:border-[var(--night)]/30 bg-[var(--white-smoke)]/80 hover:bg-[var(--night)]/5 rounded-lg',
      gridOpacity: 0.12,
    },
    ink: {
      card: 'bg-[var(--night)] border border-[var(--night-20)] shadow-sm',
      bar: 'bg-[var(--gold-metallic)]',
      title: 'text-[var(--pure-white)]',
      body: 'text-[var(--pure-white)]/80',
      primaryBtn: 'px-7 py-3.5 bg-[var(--gold-metallic)] text-[var(--night)] font-medium text-sm tracking-wide transition-all duration-300 hover:bg-[var(--gold-light)] hover:shadow-lg rounded-lg border-0',
      secondaryBtn: 'px-7 py-3.5 bg-transparent border border-[var(--pure-white)]/30 text-[var(--pure-white)] font-medium text-sm tracking-wide transition-all duration-300 hover:bg-[var(--pure-white)]/10 hover:border-[var(--pure-white)]/50 rounded-lg',
      gridOpacity: 0.08,
    },
    sand: {
      card: 'bg-[var(--gold-light)]/35 border border-[var(--gold-metallic)]/30 shadow-sm',
      bar: 'bg-[var(--gold-dark)]',
      title: 'text-[var(--night)]',
      body: 'text-[var(--night)]/80',
      primaryBtn: 'px-7 py-3.5 bg-[var(--night)] text-[var(--pure-white)] font-medium text-sm tracking-wide transition-all duration-300 hover:bg-black hover:shadow-lg rounded-lg',
      secondaryBtn: 'px-7 py-3.5 border border-[var(--gold-dark)]/40 text-[var(--night)] font-medium text-sm tracking-wide transition-all duration-300 hover:border-[var(--gold-dark)]/60 bg-[var(--pure-white)]/60 hover:bg-[var(--pure-white)]/80 rounded-lg',
      gridOpacity: 0.10,
    },
    metallic: {
      card: 'relative bg-gradient-to-br from-[#ca942f] via-[#e9d89c] to-[#ca942f] border border-[#b8860b]/40 shadow-2xl shadow-[#d4af37]/30 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:animate-pulse',
      bar: 'bg-gradient-to-b from-[#ffd700] to-[#b8860b]',
      title: 'text-[#2c1810] drop-shadow-sm',
      body: 'text-[#2c1810]/90 drop-shadow-sm',
      primaryBtn: 'px-7 py-3.5 bg-gradient-to-r from-[#2c1810] to-[#1a0f08] text-[#f4e6b8] font-medium text-sm tracking-wide transition-all duration-300 hover:from-[#1a0f08] hover:to-[#0d0704] hover:shadow-lg hover:shadow-[#2c1810]/30 rounded-lg border border-[#b8860b]/30',
      secondaryBtn: 'px-7 py-3.5 border-2 border-[#b8860b]/50 text-[#2c1810] font-medium text-sm tracking-wide transition-all duration-300 hover:border-[#b8860b]/70 bg-[#f4e6b8]/20 hover:bg-[#f4e6b8]/40 rounded-lg backdrop-blur-sm',
      gridOpacity: 0.04,
    },
  };

  const s = schemes[scheme];

  return (
    <section ref={sectionRef} className="reveal py-24" id="contact">
      <div className="mx-auto max-w-6xl px-6 ">
        <div className={`rounded-2xl ${s.card} relative overflow-hidden p-10 sm:p-14 transition-all card-hover ${scheme === 'metallic' ? 'metallic-card' : ''}`}>
          {/* Metallic shine effect */}
          {scheme === 'metallic' && (
            <>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] animate-shine" />
              <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent" />
            </>
          )}

          {/* Decorative gold glow */}
          <div className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#var(--gold-light)] blur-3xl" />
          {/* left gold bar accent */}
          <div className={`absolute left-0 top-0 bottom-0 w-1 ${s.bar} ${scheme === 'metallic' ? 'metallic-bar' : ''}`} />
          {/* subtle grid pattern */}
          {/* <div className="absolute inset-0 pointer-events-none" style={{ opacity: s.gridOpacity }}>
            <div className="w-full h-full" style={{ backgroundImage: `linear-gradient(var(--night-10) 1px, transparent 1px), linear-gradient(90deg, var(--night-10) 1px, transparent 1px)`, backgroundSize: '48px 48px' }} />
          </div> */}

          <div className="relative z-10 text-left">
            <span className="kicker">Prise de contact</span>
            <h3 className={`heading-display ${s.title} text-2xl sm:text-3xl mt-3`}>Prêts à franchir un cap ?</h3>
            <p className={`${s.body} mt-3 max-w-2xl`}>Échangeons autour de vos objectifs d&apos;investissement et de la meilleure manière de les atteindre.</p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a href={primaryHref} className={`${s.primaryBtn} font-display`}>{primaryLabel}</a>
              {secondaryHref && (
                <a href={secondaryHref} className={`${s.secondaryBtn} font-display`}>{secondaryLabel}</a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
