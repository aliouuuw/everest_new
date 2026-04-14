import { useReveal } from "../Hooks/useReveal";
import { FiArrowRight, FiDownload } from "react-icons/fi";
import { SectionHeader } from '../ui';

/* ─── Types ─── */
type Frequency = 'hebdomadaire' | 'mensuelle' | 'semestrielle';

type Publication = {
  id: string;
  title: string;
  desc: string;
  frequency: Frequency;
  date: string;
  fileUrl: string;
  fileSize: string;
  pages?: number;
};

const FREQUENCY_LABELS: Record<Frequency, string> = {
  hebdomadaire: 'Hebdomadaire',
  mensuelle: 'Mensuelle',
  semestrielle: 'Semestrielle',
};

const FREQUENCY_COLORS: Record<Frequency, string> = {
  hebdomadaire: 'var(--jaune-or)',
  mensuelle: 'var(--jaune-or)',
  semestrielle: 'var(--mauve)',
};

/* ─── Static data (mirrors PublicationsPage catalogue) ─── */
const PUBLICATIONS: Publication[] = [
  {
    id: 'revue-hebdo-example',
    title: 'Revue Hebdomadaire — Marchés BRVM',
    desc: "Synthèse hebdomadaire des performances du marché boursier régional, tendances sectorielles et recommandations d'investissement.",
    frequency: 'hebdomadaire',
    date: '2025-04-04',
    fileUrl: '/publications/Revue-Hebdomadaire-example.pdf',
    fileSize: '13.2 MB',
    pages: 12,
  },
  {
    id: 'revue-semestrielle-sep-26',
    title: 'Revue Semestrielle — S1 2024',
    desc: "Bilan semestriel complet : analyse macro-économique UEMOA, performances des indices, faits marquants et perspectives.",
    frequency: 'semestrielle',
    date: '2024-09-26',
    fileUrl: '/publications/Revue-semestrielle-20.09.26-1.pdf',
    fileSize: '10.5 MB',
    pages: 28,
  },
];

export const Insights: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>();

  const featured = PUBLICATIONS[0];
  const secondary = PUBLICATIONS.slice(1, 3);

  return (
    <section
      ref={sectionRef}
      className="reveal relative overflow-hidden section-bg-light"
    >

      {/* Section header */}
      <div className="relative z-10 px-8 md:px-16 lg:px-24 pt-20 md:pt-28 pb-12 md:pb-16 border-b border-black/10">
        <SectionHeader
          badge="Publications"
          heading={<>Nos revues <span style={{ color: 'var(--jaune-or)' }}>&amp; analyses.</span></>}
          subtext="Découvrez nos revues hebdomadaires, mensuelles et semestrielles pour suivre l'évolution des marchés."
          align="left"
          dark={false}
          action={{
            label: 'Toutes les publications',
            href: '/publications',
            variant: 'primary'
          }}
        />
      </div>

      {/* Editorial split — featured left, secondary right */}
      <div className="relative z-10 flex flex-col lg:flex-row" style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>

        {/* FEATURED — left, large */}
        <div
          className="group lg:w-[58%] flex flex-col justify-between px-8 md:px-16 lg:px-24 py-16 md:py-20 transition-all duration-300 hover:bg-[var(--summit-warm)]"
          style={{ borderRight: '1px solid rgba(0,0,0,0.08)' }}
        >
          <div>
            {/* Frequency badge */}
            <span
              className="inline-block mb-10 px-4 py-1.5 kicker border rounded-full"
              style={{
                color: FREQUENCY_COLORS[featured.frequency],
                borderColor: `color-mix(in srgb, ${FREQUENCY_COLORS[featured.frequency]} 30%, transparent)`,
                background: `color-mix(in srgb, ${FREQUENCY_COLORS[featured.frequency]} 5%, transparent)`,
              }}
            >
              {FREQUENCY_LABELS[featured.frequency]}
            </span>

            {/* Large display title */}
            <h3 className="font-primary font-bold text-3xl md:text-5xl leading-[1.1] tracking-tight text-[var(--mauve)] mb-6">
              {featured.title}
            </h3>

            <p className="text-secondary-dark text-base md:text-lg mb-8 max-w-2xl">
              {featured.desc}
            </p>
          </div>

          {/* Bottom row — meta + actions */}
          <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-sm text-[var(--night-40)] font-primary font-light tracking-wider">
              <span>{new Date(featured.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              {featured.pages && <span>· {featured.pages} pages</span>}
              <span>· {featured.fileSize}</span>
            </div>
            <a
              href={featured.fileUrl}
              download
              className="btn-primary-dark inline-flex items-center gap-2"
            >
              <FiDownload size={14} />
              <span className="hidden sm:inline">Télécharger</span>
              <span className="sm:hidden">PDF</span>
            </a>
          </div>
        </div>

        {/* SECONDARY — right, stacked */}
        <div className="lg:w-[42%] flex flex-col">
          {secondary.map((it, i) => (
            <div
              key={it.id}
              className="group flex flex-col justify-between px-8 md:px-12 lg:px-16 py-12 flex-1 transition-all duration-300 hover:bg-[var(--summit-warm)]"
              style={{ borderTop: i === 0 ? 'none' : '1px solid rgba(0,0,0,0.08)' }}
            >
              <div>
                <span
                  className="inline-block mb-5 px-4 py-1.5 kicker border rounded-full"
                  style={{
                    color: FREQUENCY_COLORS[it.frequency],
                    borderColor: `color-mix(in srgb, ${FREQUENCY_COLORS[it.frequency]} 30%, transparent)`,
                    background: `color-mix(in srgb, ${FREQUENCY_COLORS[it.frequency]} 8%, transparent)`,
                  }}
                >
                  {FREQUENCY_LABELS[it.frequency]}
                </span>
                <h3 className="font-primary font-bold text-xl md:text-2xl text-[var(--mauve)] mb-4 leading-snug">
                  {it.title}
                </h3>
                <p className="text-secondary-dark text-sm md:text-base line-clamp-3">
                  {it.desc}
                </p>
              </div>
              <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-[var(--night-40)] font-primary font-light tracking-wider">
                  <span>{new Date(it.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  <span>· {it.fileSize}</span>
                </div>
                <a
                  href={it.fileUrl}
                  download
                  className="btn-primary-dark inline-flex items-center gap-2"
                >
                  <FiDownload size={13} />
                  <span className="hidden sm:inline">Télécharger</span>
                  <span className="sm:hidden">PDF</span>
                </a>
              </div>
            </div>
          ))}

          {/* View all — bottom of right column */}
          <a
            href="/publications"
            className="md:hidden flex items-center justify-between px-8 py-8 transition-colors duration-300 hover:bg-[var(--summit-warm)]"
            style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}
          >
            <span className="kicker text-[var(--mauve)]">Toutes les publications</span>
            <FiArrowRight className="text-lg text-[var(--mauve)] transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};
