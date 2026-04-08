import { useEffect, useRef, useState } from 'react';
import { FaCalendarAlt, FaChartLine, FaHandshake } from 'react-icons/fa';
import { useReveal } from "../Hooks/useReveal";
import { PillBadge } from '../ui';

const stats = [
  { prefix: '', value: 10,  suffix: '',  label: "ans d'existence",                                                                                                          icon: FaCalendarAlt },
  { prefix: '+', value: 500, suffix: '', label: "Mds F CFA de Levée de fonds par émission d'obligation, de titres de capital et fonds communs de titrisation",             icon: FaChartLine },
  { prefix: '+', value: 200, suffix: '', label: "Mds F CFA de transactions au marché financier",                                                                           icon: FaHandshake },
];

function useCounter(target: number, duration = 1600, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return count;
}

function AnimatedStat({ prefix, value, suffix, label, icon: Icon, delay = 0 }: typeof stats[0] & { delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const count = useCounter(value, 1600, started);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTimeout(() => setStarted(true), delay); obs.disconnect(); } },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className="group flex items-center gap-5">
      <div className="shrink-0 w-11 h-11 rounded-full bg-[var(--mauve-05)] border border-[var(--mauve-10)] flex items-center justify-center transition-all duration-500 group-hover:bg-[var(--mauve)] group-hover:border-[var(--mauve)]">
        <Icon className="text-base text-[var(--mauve)] transition-colors duration-500 group-hover:text-white" />
      </div>
      <div className="flex items-center gap-4 flex-1">
        <span className="font-primary font-bold text-[2.8rem] md:text-[3.2rem] leading-none tracking-tight text-[var(--mauve)] numeric-tabular transition-colors duration-500 group-hover:text-[var(--jaune-or)] shrink-0">
          {prefix}{count}{suffix}
        </span>
        <span className="font-primary font-light text-sm leading-snug text-[var(--night-60)]">
          {label}
        </span>
      </div>
    </div>
  );
}

export const ValueProps: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>();
  const contentRef = useReveal<HTMLDivElement>();

  return (
    <section
      ref={sectionRef}
      className="reveal relative overflow-hidden bg-[var(--pure-white)]"
    >
      {/* Full-bleed two-panel split */}
      <div className="flex flex-col lg:flex-row min-h-[80vh]">

        {/* LEFT PANEL — Hero Image */}
        <div className="relative lg:w-[45%] min-h-[50vh] lg:min-h-0 overflow-hidden">
          <img
            src="/VALUEPROPS.jpg"
            alt="Sommet montagneux — Everest Finance"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Mauve overlay for brand cohesion */}
          {/* <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'var(--gradient-image-overlay)' }}
          /> */}
          {/* Right edge fade into white for seamless transition */}
          {/* <div
            className="absolute inset-y-0 right-0 w-24 pointer-events-none hidden lg:block"
            style={{ background: 'linear-gradient(90deg, transparent 0%, var(--pure-white) 100%)' }}
          /> */}
          {/* Bottom credential strip over image */}
          {/* <div className="absolute bottom-0 left-0 right-0 px-8 md:px-12 py-6 z-10">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[var(--jaune-or)]" />
              <span className="kicker text-white/70">
                Agrément CREPMF · SGI/DA/2016/60
              </span>
            </div>
          </div> */}
        </div>

        {/* RIGHT PANEL — Content + Stats */}
        <div
          ref={contentRef}
          className="reveal lg:w-[55%] flex flex-col justify-center px-8 md:px-16 lg:px-20 py-10 lg:py-12 relative bg-[var(--pure-white)]"
        >
          {/* Subtle gradient orb */}
          <div
            className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full pointer-events-none opacity-[0.04] blur-[100px] translate-x-1/3 -translate-y-1/3"
            style={{ background: 'var(--mauve)' }}
          />

          <div className="relative z-10 max-w-2xl">
            {/* Pill badge */}
            <div className="mb-8">
              <PillBadge>Pourquoi Everest Finance</PillBadge>
            </div>

            {/* Heading */}
            <h2 className="luxury-heading mb-6">
              Exécution rigoureuse,<br />
              <span style={{ color: 'var(--jaune-or)' }}>
                confiance durable.
              </span>
            </h2>

            <p className="text-secondary text-base md:text-lg mb-12 max-w-xl">
              Nous allions discipline de marché, ingénierie financière
              et accompagnement client pour créer de la valeur sur le long terme —
              avec la rigueur d'une institution et la réactivité d'un partenaire dédié.
            </p>

            {/* Stats row */}
            <div className="flex flex-col pb-12">
              {stats.map((s, i) => (
                <div key={s.label} className={i < stats.length - 1 ? 'pb-6 mb-6 border-b border-[var(--mauve-10)]' : ''}>
                  <AnimatedStat {...s} delay={i * 180} />
                </div>
              ))}
            </div>

            {/* Three pillars */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10">
              {[
                { label: 'Sécurité', sub: 'Agrément CREPMF', icon: 'shield' },
                { label: 'Accompagnement', sub: 'Conseiller dédié', icon: 'users' },
                { label: 'Performance', sub: 'Recherche indépendante', icon: 'trending-up' },
              ].map((p) => (
                <div
                  key={p.label}
                  className="flex flex-col gap-3 group"
                >
                  <div className="w-10 h-10 rounded-full border border-[var(--mauve-20)] flex items-center justify-center bg-[var(--mauve-05)] transition-colors duration-300 group-hover:border-[var(--mauve)] group-hover:bg-[var(--mauve-10)]">
                    <span className="w-2 h-2 rounded-full bg-[var(--mauve)] transition-transform duration-300 group-hover:scale-150" />
                  </div>
                  <div>
                    <h4 className="font-primary font-semibold text-[var(--mauve)] text-base mb-1">
                      {p.label}
                    </h4>
                    <p className="font-primary font-light text-sm text-[var(--night-60)]">
                      {p.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};
