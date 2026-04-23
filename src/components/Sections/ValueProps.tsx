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
        <span className="font-primary font-light text-sm leading-snug text-[var(--night-60)] max-w-xs">
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
      className="reveal relative overflow-hidden bg-[var(--pure-white)] border-t border-[var(--mauve-10)]"
    >
      {/* Full-bleed two-panel split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[80vh]">

        {/* LEFT PANEL — Hero Image */}
        <div className="relative lg:col-span-5 min-h-[40vh] lg:min-h-0 overflow-hidden">
          <img
            src="/Assets_Website/Valueprops.png"
            alt="Sommet montagneux — Everest Finance"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </div>

        {/* RIGHT PANEL — Content + Stats */}
        <div
          ref={contentRef}
          className="reveal lg:col-span-7 flex flex-col justify-center px-6 md:px-16 lg:px-24 py-16 lg:py-24 relative bg-[var(--pure-white)]"
        >
          {/* Subtle gradient orb */}
          <div
            className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full pointer-events-none opacity-[0.04] blur-[100px] translate-x-1/3 -translate-y-1/3"
            style={{ background: 'var(--mauve)' }}
          />

          <div className="relative z-10 max-w-2xl">
            {/* Pill badge */}
            <div className="mb-6">
              <PillBadge>Pourquoi Everest Finance</PillBadge>
            </div>

            {/* Heading */}
            <h2 className="luxury-heading mb-6">
              Exécution rigoureuse,<br />
              <span style={{ color: 'var(--jaune-or)' }}>
                confiance durable.
              </span>
            </h2>

            <p className="text-secondary text-base md:text-lg mb-16 max-w-xl font-light">
              SGI agréée CREPMF (n° SGI/DA/2016/60), nous appuyons nos équipes sur +500&nbsp;Mds F CFA levés et
              +200&nbsp;Mds F CFA traités en exécution de marché, avec un accompagnement sur mesure.
            </p>

            {/* Stats row */}
            <div className="flex flex-col">
              {stats.map((s, i) => (
                <div key={s.label} className={i < stats.length - 1 ? 'pb-8 mb-8 border-b border-[var(--mauve-10)]' : ''}>
                  <AnimatedStat {...s} delay={i * 180} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};