import { useEffect, useRef, useState } from 'react';
import { FaCalendarAlt, FaChartLine, FaHandshake } from 'react-icons/fa';
import { useReveal } from '../Hooks/useReveal';

const STATS = [
  {
    prefix: '',
    value: 10,
    suffix: '+',
    unit: 'ans',
    label: "d'expérience au service des émetteurs et investisseurs institutionnels de l'UEMOA.",
    icon: FaCalendarAlt,
  },
  {
    prefix: '+',
    value: 500,
    suffix: '',
    unit: 'Mds F CFA',
    label: "levés par émissions d'obligations, titres de capital et fonds communs de titrisation.",
    icon: FaChartLine,
  },
  {
    prefix: '+',
    value: 200,
    suffix: '',
    unit: 'Mds F CFA',
    label: "de transactions intermédiées sur le marché financier régional.",
    icon: FaHandshake,
  },
];

function useCounter(target: number, duration = 1600, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (start === null) start = ts;
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

type StatRowProps = (typeof STATS)[number] & { delay?: number };

function AnimatedStatRow({ prefix, value, suffix, unit, label, icon: Icon, delay = 0 }: StatRowProps) {
  const ref = useRef<HTMLLIElement>(null);
  const [started, setStarted] = useState(false);
  const count = useCounter(value, 1600, started);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setStarted(true), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <li ref={ref} className="flex items-start gap-4 py-5 md:gap-5 md:py-6">
      <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--mauve-05)] text-[var(--mauve)]">
        <Icon className="text-base" aria-hidden />
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-baseline gap-2">
          <span className="font-primary text-3xl font-bold leading-none tracking-tight text-[var(--mauve)] numeric-tabular md:text-[2.25rem]">
            {prefix}
            {count}
            {suffix}
          </span>
          <span className="font-primary text-xs font-semibold uppercase tracking-[0.14em] text-[var(--mauve-60)] md:text-[13px]">
            {unit}
          </span>
        </div>
        <p className="font-primary text-sm font-light leading-relaxed text-[var(--night-60)]">
          {label}
        </p>
      </div>
    </li>
  );
}

export const ValueProps: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>();
  const contentRef = useReveal<HTMLDivElement>();

  return (
    <section
      ref={sectionRef}
      className="reveal relative overflow-hidden bg-[var(--pure-white)] py-16 md:py-20"
    >
      <div className="page-container">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-10">
          {/* Left — image */}
          <div className="relative min-h-[320px] overflow-hidden rounded-2xl border border-[var(--command-border)] bg-[var(--command-surface)] lg:col-span-5 lg:min-h-[460px]">
            <img
              src="/Assets_Website/Valueprops.png"
              alt="Everest Finance — engagement régional"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, transparent 55%, rgba(70,29,76,0.35) 100%)',
              }}
            />
          </div>

          {/* Right — heading + animated stats list */}
          <div
            ref={contentRef}
            className="reveal flex flex-col justify-center lg:col-span-7"
          >
            <h2 className="luxury-heading mb-4 max-w-xl">
              Exécution rigoureuse, <span style={{ color: 'var(--jaune-or)' }}>confiance durable.</span>
            </h2>
            <p className="mb-6 max-w-xl text-sm font-light leading-relaxed text-[var(--night-60)] md:text-base">
              SGI agréée AMF-UMOA (n° SGI/DA/2016/60), nous combinons ancrage régional, discipline
              d&apos;exécution et relations institutionnelles au service de nos mandats.
            </p>

            <ul className="divide-y divide-[var(--command-border)] border-y border-[var(--command-border)]">
              {STATS.map((s, i) => (
                <AnimatedStatRow key={s.label} {...s} delay={i * 180} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
