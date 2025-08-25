import { useReveal } from "../Hooks/useReveal";

type CtaScheme = 'ivory' | 'ink' | 'sand' | 'metallic';

export const CTA: React.FC<{ scheme?: CtaScheme }> = ({ scheme = 'ivory' }) => {
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
      card: 'bg-[var(--pure-white)] border border-[var(--night)]/10 shadow-sm',
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
      card: 'bg-gradient-to-br from-[var(--gold-light)] to-[var(--gold-metallic)] border border-[var(--gold-dark)]/30 shadow-lg shadow-[var(--gold-metallic)]/20',
      bar: 'bg-[var(--gold-dark)]',
      title: 'text-[var(--night)]',
      body: 'text-[var(--night)]/85',
      primaryBtn: 'px-7 py-3.5 bg-[var(--night)] text-[var(--pure-white)] font-medium text-sm tracking-wide transition-all duration-300 hover:bg-black hover:shadow-lg rounded-lg',
      secondaryBtn: 'px-7 py-3.5 border border-[var(--night)]/25 text-[var(--night)] font-medium text-sm tracking-wide transition-all duration-300 hover:border-[var(--night)]/40 bg-[var(--pure-white)]/80 hover:bg-[var(--pure-white)]/95 rounded-lg backdrop-blur-sm',
      gridOpacity: 0.06,
    },
  };

  const s = schemes[scheme];

  return (
    <section ref={sectionRef} className="reveal py-24 gradient-gold">
      <div className="mx-auto max-w-6xl px-6">
        <div className={`rounded-2xl ${s.card} relative overflow-hidden p-10 sm:p-14`}>
          {/* left gold bar accent */}
          <div className={`absolute left-0 top-0 bottom-0 w-1 ${s.bar}`} />
          {/* subtle grid pattern */}
          <div className="absolute inset-0 pointer-events-none" style={{ opacity: s.gridOpacity }}>
            <div className="w-full h-full" style={{ backgroundImage: `linear-gradient(var(--night-10) 1px, transparent 1px), linear-gradient(90deg, var(--night-10) 1px, transparent 1px)`, backgroundSize: '48px 48px' }} />
          </div>

          <div className="relative z-10 text-left">
            <span className="kicker text-gradient-gold">Prise de contact</span>
            <h3 className={`heading-display ${s.title} text-2xl sm:text-3xl mt-3`}>Prêts à franchir un cap ?</h3>
            <p className={`${s.body} mt-3 max-w-2xl`}>Échangeons autour de vos objectifs d’investissement et de la meilleure manière de les atteindre.</p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a href="#contact" className={`${s.primaryBtn} font-display`}>Nous contacter</a>
              <a href="#offres" className={`${s.secondaryBtn} font-display`}>Découvrir nos offres</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


