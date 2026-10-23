/** Home. Copy and block order follow referential V2.1, Part III, section 1.
 * Evidence is shown, not folded (I.6: la preuve précède l'affirmation). Only the four
 * expertise details stay behind a disclosure. The only drawing is the logo's summit line. */
import { Fragment } from 'react';
import { EditableText, useContent } from '../../cms';
import { frenchSpaces } from '../../cms/EditableText';
import { HOME_TEXT, type HomeTextId } from '../../content/home';
import { SITE_NAV } from '../siteNav';
import { PUBLICATION_FILES } from '../../data/publications';
import { ExpertiseIllustration } from './ExpertiseIllustrations';

const useHomeText = (id: HomeTextId) => frenchSpaces(useContent(id)?.value || HOME_TEXT[id]);

/** Turns a destination the referential names in passing into a real link, without changing a word. */
const withLink = (text: string, phrase: string, href: string) => {
  const at = text.lastIndexOf(phrase);
  if (at < 0) return text;
  return <>{text.slice(0, at)}<a className="home-inline-link" href={href}>{phrase}</a>{text.slice(at + phrase.length)}</>;
};

const Hidden = ({ children }: { children: string }) => (
  <span aria-hidden className="sr-only">{children}</span>
);

export const HomeArrow = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
    <path d="M6 18 18 6M8 6h10v10" />
  </svg>
);

const Copy = ({ id, as = 'p', className = 'home-body' }: { id: HomeTextId; as?: 'p' | 'h2'; className?: string }) => (
  <EditableText id={id} as={as} className={className}>{HOME_TEXT[id]}</EditableText>
);

/** The EVEREST summit, from the logo: foot, peak, notch, shoulder, long descent. Straight segments only. */
const SUMMIT = [[0, 1], [0.28, 0], [0.46, 0.45], [0.51, 0.36], [1, 1]] as const;
const summitPoints = (x: number, y: number, w: number, h: number) =>
  SUMMIT.map(([px, py]) => `${(x + px * w).toFixed(1)},${(y + py * h).toFixed(1)}`).join(' ');
const summitY = (x: number, w: number, h: number) => {
  for (let i = 1; i < SUMMIT.length; i++) {
    const [x0, y0] = SUMMIT[i - 1], [x1, y1] = SUMMIT[i];
    if (x / w <= x1) return (y0 + ((x / w - x0) / (x1 - x0)) * (y1 - y0)) * h;
  }
  return h;
};

/** Reads the chain out of the positioning N2 so the diagram labels stay the referential's words. */
const parseChain = (n2: string) => {
  const stations = n2.match(/\(([^)]+)\)/)?.[1].split(', ');
  const span = n2.match(/(de la [^,.]+?) (au [^,.]+?)\./);
  return stations?.length === 5 ? { stations, from: span?.[1], to: span?.[2] } : null;
};

const ROOF_W = 1200;
const ROOF_H = 132;
const ROOF_PEAK = 92;

/** Sous un même toit: five stations under the summit line, on a forest band. */
const ChainFigure = ({ stations, from, to }: { stations: string[]; from?: string; to?: string }) => (
  <figure className="home-chain" aria-hidden="true">
    <div className="home-container">
      <svg className="home-chain-roof" viewBox={`0 0 ${ROOF_W} ${ROOF_H}`} fill="none">
        <polyline className="home-line" points={summitPoints(0, 6, ROOF_W, ROOF_PEAK)} />
        {stations.map((station, i) => {
          const x = ((i + 0.5) / stations.length) * ROOF_W;
          return <line key={station} className="home-line home-line-drop" x1={x} x2={x} y1={6 + summitY(x, ROOF_W, ROOF_PEAK)} y2={ROOF_H} />;
        })}
      </svg>
      <ol className="home-chain-stations">
        {stations.map((station) => <li key={station}>{station}</li>)}
      </ol>
      {from && to && (
        <p className="home-chain-base"><span>{from}</span><span>{to}</span><span className="home-chain-track"><span className="home-chain-pulse" /></span></p>
      )}
    </div>
  </figure>
);

export const HomePositioning = () => {
  const chain = parseChain(useHomeText('home.positioning.n2'));
  return (
    <section id="positionnement" className="home-section home-positioning">
      <div className="home-container">
        <div className="home-positioning-text">
          <Copy id="home.positioning.n1" className="home-statement" />
          <Copy id="home.positioning.n2" />
        </div>
      </div>
      {chain && <ChainFigure {...chain} />}
    </section>
  );
};

/** The verifiable fact opens each proof sentence; the rest of the sentence follows unchanged. */
const PROOFS = [
  ['proof1', "Dix ans"],
  ['proof2', "Agréée par l'AMF-UMOA"],
  ['proof3', 'La chaîne complète'],
  ['proof4', "Une équipe d'une vingtaine"],
] as const;

const Proof = ({ k, lead }: { k: (typeof PROOFS)[number][0]; lead: string }) => {
  const n1 = useHomeText(`home.${k}.n1`);
  const split = n1.startsWith(lead);
  return (
    <article className="home-proof">
      <h2 className="home-proof-n1" data-cms-id={`home.${k}.n1`}>
        {split ? (
          <>
            {/* Words never break inside (AMF-UMOA would split at its hyphen); the text is unchanged. */}
            <span className="home-proof-lead">
              {lead.split(' ').map((word, i) => <Fragment key={i}>{i ? ' ' : ''}<span>{word}</span></Fragment>)}
            </span>
            {n1.slice(lead.length)}
          </>
        ) : n1}
      </h2>
      <Copy id={`home.${k}.n2`} className="home-body home-body-small" />
    </article>
  );
};

export const HomeProofs = () => (
  <section id="preuves" className="home-section home-proofs">
    <div className="home-container home-proof-grid">
      {PROOFS.map(([k, lead]) => <Proof key={k} k={k} lead={lead} />)}
    </div>
  </section>
);

export const HomeEngagements = () => {
  const n2 = useHomeText('home.engagements.n2');
  const end = n2.indexOf('. ');
  const names = n2.slice(0, end).split(' · ');
  // An unexpected CMS format remains readable rather than losing any of its text.
  if (end < 0 || names.length !== 6) {
    return (
      <section id="engagements" className="home-section home-engagements">
        <div className="home-container"><Copy id="home.engagements.n1" as="h2" className="home-heading" /><Copy id="home.engagements.n2" /></div>
      </section>
    );
  }
  return (
    <section id="engagements" className="home-section home-engagements">
      <div className="home-container home-engagement-layout">
        <Copy id="home.engagements.n1" as="h2" className="home-heading" />
        <div data-cms-id="home.engagements.n2">
          <ul className="home-commitments">
            {names.map((name, i) => (
              <li key={name}>{name}<Hidden>{i < names.length - 1 ? ' · ' : '. '}</Hidden></li>
            ))}
          </ul>
          <p className="home-body">{withLink(n2.slice(end + 2), 'La société', '/la-societe')}</p>
        </div>
      </div>
    </section>
  );
};

/** The two latest weekly issues, captioned with their catalogue titles. The semestrial cover stays off the home. */
export const HomeAnalyses = () => (
  <section id="analyses" className="home-section home-analyses">
    <div className="home-container home-analysis-layout">
      <div className="home-analysis-intro">
        <Copy id="home.analyses.n1" as="h2" className="home-heading" />
        <Copy id="home.analyses.n2" />
        <a className="home-link" href="/analyses">Analyses &amp; Publications<HomeArrow /></a>
      </div>
      <ul className="home-publications">
        {PUBLICATION_FILES.filter((pub) => pub.frequency === 'hebdomadaire').map((pub) => (
          <li key={pub.id}>
            <a href="/analyses" className="home-publication">
              <img src={`/publications/covers/${pub.id}.webp`} alt="" width={1108} height={1568} loading="lazy" />
              <span className="home-publication-title">{pub.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

const EXPERTISE_KEYS = ['mtp', 'brvm', 'structuration', 'privateOffice'] as const;
const EXPERTISE_LINKS = SITE_NAV.find((item) => item.children)?.children ?? [];

const Chevron = () => (
  <svg aria-hidden="true" className="home-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const HomeExpertises = () => (
  <section id="expertises" className="home-section home-expertises">
    <div className="home-container">
      <Copy id="home.expertises.n1" as="h2" className="home-heading" />
      <div className="home-expertise-layout">
        {/* Pointer or focus on a row swaps the frame (CSS :has), so it works without hydration. */}
        <div className="home-expertise-media">
          {EXPERTISE_KEYS.map((key) => <ExpertiseIllustration key={key} expertise={key} />)}
        </div>
        <div className="home-expertise-list">
          {EXPERTISE_KEYS.map((key, i) => (
            <article key={key}>
              <h3 className="home-expertise-title">
                <a href={EXPERTISE_LINKS[i].to}>{EXPERTISE_LINKS[i].label}<HomeArrow /></a>
              </h3>
              {/* The page's one disclosure: N1 is the control, the N2 stays in the HTML. */}
              <details className="home-reading">
                <summary>
                  <EditableText id={`home.expertises.${key}.n1`} as="p">{HOME_TEXT[`home.expertises.${key}.n1`]}</EditableText>
                  <Chevron />
                </summary>
                <Copy id={`home.expertises.${key}.n2`} />
              </details>
            </article>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/** Four equal routes, one house. The name leads each sentence; nothing grows on hover. */
export const HomeSegments = () => {
  const n2 = useHomeText('home.segments.n2');
  const sentences = n2.split('. ');
  const close = sentences.pop()!;
  // Four audiences and a closing line, or the paragraph as written: a CMS edit never loses words.
  const split = sentences.length === 4 && sentences.every((s) => s.includes(', '));
  return (
    <section id="segments" className="home-section home-segments">
      <div className="home-container">
        <Copy id="home.segments.n1" as="h2" className="home-heading" />
        {split ? (
          <div data-cms-id="home.segments.n2">
            <div className="home-audiences">
              {sentences.map((sentence) => {
                const comma = sentence.indexOf(', ');
                return (
                  <p className="home-body" key={sentence}>
                    <span><strong>{sentence.slice(0, comma + 1)}</strong>{withLink(sentence.slice(comma + 1), 'Sama Naffa', '/sama-naffa')}.<Hidden> </Hidden></span>
                  </p>
                );
              })}
            </div>
            <p className="home-audience-close">{close}</p>
          </div>
        ) : <Copy id="home.segments.n2" />}
      </div>
    </section>
  );
};

export const HomeSamaNaffa = () => (
  <section id="sama-naffa" className="home-section home-sama">
    <div className="home-container home-sama-layout">
      <div className="home-sama-text">
        <Copy id="home.samaNaffa.n1" as="h2" className="home-heading" />
        <Copy id="home.samaNaffa.n2" />
        <a className="home-link" href="/sama-naffa">Découvrir Sama Naffa<span className="sr-only"> →</span><HomeArrow /></a>
      </div>
      <div className="home-sama-mark">
        <img src="/sama-naffa-logo.png" alt="Sama Naffa, par EVEREST Finance" width={410} height={230} loading="lazy" />
      </div>
    </div>
  </section>
);

/** The answer to the market's opacity (I.3), set as a ledger: one guarantee per line, words unchanged. */
const GovernanceLedger = () => {
  const n2 = useHomeText('home.governance.n2');
  const lines = n2.split('. ').map((line, i, all) => (i < all.length - 1 ? `${line}.` : line));
  if (lines.length < 3) return <Copy id="home.governance.n2" />;
  return (
    <ul className="home-ledger" data-cms-id="home.governance.n2">
      {lines.map((line, i) => <li key={i}>{line}{i < lines.length - 1 && <Hidden> </Hidden>}</li>)}
    </ul>
  );
};

export const HomeClosing = () => (
  <section id="gouvernance" className="home-section home-closing">
    <div className="home-container home-closing-layout">
      <Copy id="home.governance.n1" as="h2" className="home-heading home-heading-close" />
      <div>
        <GovernanceLedger />
        <div className="home-final-actions">
          <a href="/contact" className="home-button">
            <EditableText id="home.finalCta.cta1">{HOME_TEXT['home.finalCta.cta1']}</EditableText><HomeArrow />
          </a>
          <a href="/expertises" className="home-link">
            <EditableText id="home.finalCta.cta2">{HOME_TEXT['home.finalCta.cta2']}</EditableText><HomeArrow />
          </a>
        </div>
      </div>
    </div>
  </section>
);
