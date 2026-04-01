import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Stat = {
  value: string;
  label: string;
  suffix?: string;
};

const stats: Stat[] = [
  { value: '30', suffix: '+', label: "Années d'expertise" },
  { value: '150', suffix: 'Mds+', label: 'FCFA sous gestion' },
  { value: '500', suffix: '+', label: 'Clients institutionnels & privés' },
];

export const StatsBand: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  React.useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const triggers: ScrollTrigger[] = [];

    const items = gsap.utils.toArray('.stat-item');
    items.forEach((item: any, i: number) => {
      const tween = gsap.fromTo(item,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.8, delay: i * 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none reverse' }
        }
      );
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    return () => { triggers.forEach(t => t.kill()); };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: 'var(--mauve-solid)',
        paddingTop: 'clamp(3rem, 5vw, 4.5rem)',
        paddingBottom: 'clamp(3rem, 5vw, 4.5rem)',
      }}
    >
      {/* Subtle gold accent glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(202,148,47,0.1) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="stat-item text-center md:text-left flex flex-col items-center md:items-start"
              style={{
                borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                paddingLeft: i > 0 ? 'clamp(1.5rem, 3vw, 3rem)' : '0',
              }}
            >
              <div className="flex items-baseline gap-1">
                <span
                  className="numeric-tabular"
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontWeight: 800,
                    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                    color: 'var(--jaune-or)',
                  }}
                >
                  {stat.value}
                </span>
                {stat.suffix && (
                  <span
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontWeight: 700,
                      fontSize: 'clamp(1rem, 2vw, 1.4rem)',
                      color: 'var(--jaune-or)',
                    }}
                  >
                    {stat.suffix}
                  </span>
                )}
              </div>
              <span
                className="mt-2"
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontWeight: 400,
                  fontSize: '0.875rem',
                  color: 'var(--mauve-on-solid-muted)',
                  letterSpacing: '0.01em',
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
