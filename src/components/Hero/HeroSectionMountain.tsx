import { useEffect, useId, useState } from 'react';
import { EditableText } from '../../cms';
import { HOME_TEXT } from '../../content/home';
import { HomeArrow } from '../Sections/HomeReferentiel';

/** The poster is the default. The short film only loads on motion-enabled desktop connections. */
export const HeroSectionMountain: React.FC = () => {
  const headingId = useId();
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    const media = window.matchMedia('(min-width: 768px) and (prefers-reduced-motion: no-preference)');
    const update = () => setPlayVideo(media.matches && !saveData);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return (
    <section id="hero" className="home-hero" aria-labelledby={headingId}>
      <div className="home-hero-media" aria-hidden="true">
        <img
          src="/hero/summit-1920.webp"
          srcSet="/hero/summit-1080.webp 1080w, /hero/summit-1920.webp 1920w"
          sizes="100vw"
          alt=""
          width={1920}
          height={1080}
          fetchPriority="high"
        />
        {playVideo && (
          <video autoPlay muted playsInline preload="metadata" poster="/hero/summit-1920.webp" disablePictureInPicture>
            <source src="/hero/summit.webm" type="video/webm" />
            <source src="/hero/summit.mp4" type="video/mp4" />
          </video>
        )}
      </div>
      <div className="home-container home-hero-content">
        <h1 id={headingId}><EditableText id="home.hero.title">{HOME_TEXT['home.hero.title']}</EditableText></h1>
        <div className="home-hero-foot">
          <div className="home-hero-actions">
            <a className="home-button" href="/contact">
              <EditableText id="home.hero.cta1">{HOME_TEXT['home.hero.cta1']}</EditableText><HomeArrow />
            </a>
            <a className="home-link" href="/opportunites">
              <EditableText id="home.hero.cta2">{HOME_TEXT['home.hero.cta2']}</EditableText><HomeArrow />
            </a>
          </div>
          <EditableText id="home.hero.n2" as="p" className="home-body">{HOME_TEXT['home.hero.n2']}</EditableText>
        </div>
      </div>
    </section>
  );
};
