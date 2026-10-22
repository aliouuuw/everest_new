/**
 * La société, referential V2.1 §2.1 to §2.6. §2.7 Références waits on Legal (§10).
 */
import type { ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import { TEXT, type TextId } from '../../content';
import { Block, Label, N1, Pair, Section, type Tone } from '../Referentiel';

const CHAPTERS: Array<{ anchor: string; title: TextId }> = [
  { anchor: 'histoire', title: 'about.histoire.heading' },
  { anchor: 'mission', title: 'about.mission.heading' },
  { anchor: 'adn', title: 'about.adn.heading' },
  { anchor: 'engagements', title: 'about.engagements.heading' },
  { anchor: 'vision-gouvernance', title: 'about.vision.heading' },
  { anchor: 'conformite', title: 'about.conformite.heading' },
];

const Chapter = ({ index, tone, children }: { index: number; tone: Tone; children: ReactNode }) => (
  <Section tone={tone} id={CHAPTERS[index].anchor}>
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-[calc(var(--site-chrome-sticky)+2.5rem)]">
          <Label id={CHAPTERS[index].title} tone={tone} />
        </div>
      </div>
      <div className="flex flex-col gap-14 md:gap-16 lg:col-span-8">{children}</div>
    </div>
  </Section>
);

const ENGAGEMENTS = [1, 2, 3, 4, 5, 6] as const;

export const SocietePage = () => (
  <div className="bg-[var(--pure-white)] text-[var(--night)]">
    <section className="bg-[var(--everest-green)] pt-[180px] pb-14 md:pb-20">
      <div className="page-container">
        <h1
          className="mb-10 font-bold leading-[0.95]! tracking-tight text-[var(--pure-white)] md:mb-14"
          style={{ fontSize: 'clamp(2.375rem, 4.6vw + 1.2rem, 50px)' }}
        >
          La société
        </h1>
        <nav aria-label="La société" className="flex flex-wrap gap-x-8 gap-y-3">
          {CHAPTERS.map((c) => (
            <Link
              key={c.anchor}
              to="/la-societe"
              hash={c.anchor}
              className="text-[0.95rem] font-semibold text-white/75 transition-colors duration-300 hover:text-[var(--or-clair)]"
            >
              {TEXT[c.title]}
            </Link>
          ))}
        </nav>
      </div>
    </section>

    <Chapter index={0} tone="light">
      <Pair n1="about.histoire.n1" n2="about.histoire.n2" tone="light" as="p" size="statement" />
    </Chapter>

    <Chapter index={1} tone="ivory">
      <Block label="about.mission.label" n1="about.mission.n1" n2="about.mission.n2" tone="ivory" />
      <Block label="about.nom.label" n1="about.nom.n1" n2="about.nom.n2" tone="ivory" />
    </Chapter>

    <Chapter index={2} tone="light">
      <N1 id="about.adn.n1" tone="light" as="p" size="statement" />
      {(['ancrage', 'cordee', 'exigence'] as const).map((k) => (
        <Block
          key={k}
          label={`about.adn.${k}.label` as TextId}
          n1={`about.adn.${k}.n1` as TextId}
          n2={`about.adn.${k}.n2` as TextId}
          tone="light"
          size="card"
        />
      ))}
    </Chapter>

    <Chapter index={3} tone="dark">
      <N1 id="about.engagements.n1" tone="dark" as="p" size="statement" />
      <div className="grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-2">
        {ENGAGEMENTS.map((n) => (
          <Block
            key={n}
            label={`about.engagement${n}.label` as TextId}
            n1={`about.engagement${n}.n1` as TextId}
            n2={`about.engagement${n}.n2` as TextId}
            tone="dark"
            size="card"
          />
        ))}
      </div>
    </Chapter>

    <Chapter index={4} tone="ivory">
      <Block label="about.vision.label" n1="about.vision.n1" n2="about.vision.n2" tone="ivory" />
      <Block label="about.gouvernance.label" n1="about.gouvernance.n1" n2="about.gouvernance.n2" tone="ivory" />
    </Chapter>

    <Chapter index={5} tone="light">
      <Pair n1="about.conformite.n1" n2="about.conformite.n2" tone="light" as="p" size="statement" />
    </Chapter>
  </div>
);
