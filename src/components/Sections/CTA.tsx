import { useReveal } from "../Hooks/useReveal";

export const CTA: React.FC<{
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}> = ({ primaryHref = '#contact', primaryLabel = 'Nous contacter', secondaryHref = '#offres', secondaryLabel = 'Découvrir nos offres' }) => {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="reveal py-24 bg-[var(--night)] relative overflow-hidden" id="contact">
      {/* Background cinematic elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--gold-metallic)]/5 to-transparent pointer-events-none" />
      <div className="absolute -bottom-1/4 -right-1/4 w-3/4 h-3/4 bg-[var(--gold-metallic)]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <div className="rounded-3xl relative overflow-hidden p-10 sm:p-16 transition-all border border-[var(--gold-metallic)]/20 bg-gradient-to-br from-[var(--night)] to-[#14161c] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center justify-between gap-10">
          
          {/* Metallic shine effects */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-150%] animate-[shimmer_8s_infinite]" />
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gold-metallic)]/30 to-transparent" />
          
          {/* Decorative gold glow */}
          <div className="pointer-events-none absolute -top-20 -left-20 w-64 h-64 rounded-full bg-[var(--gold-metallic)]/10 blur-[80px]" />
          
          <div className="relative z-10 text-left max-w-xl">
            <span className="kicker text-[var(--gold-metallic)] tracking-[0.3em] uppercase">Prise de contact</span>
            <h3 className="font-display text-3xl sm:text-4xl mt-4 text-white leading-tight">
              Prêts à franchir un cap dans votre gestion patrimoniale ?
            </h3>
            <p className="text-white/60 mt-4 text-lg">
              Échangeons autour de vos objectifs d'investissement et découvrez comment notre expertise peut vous accompagner vers les sommets.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-4 shrink-0 w-full md:w-auto">
            <a href={primaryHref} className="btn-primary-dark font-display text-center justify-center w-full sm:w-auto">
              {primaryLabel}
            </a>
            {secondaryHref && (
              <a href={secondaryHref} className="btn-secondary-dark font-display text-center justify-center w-full sm:w-auto">
                {secondaryLabel}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
