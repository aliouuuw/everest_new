import React from 'react';
import { LenisProvider, useLenisContext } from './Hooks/useLenisContext.tsx';

interface LenisWrapperProps {
  children: React.ReactNode;
}

function chromeOffset() {
  const root = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
  const styles = getComputedStyle(document.documentElement);
  const px = (name: string) => {
    const raw = styles.getPropertyValue(name).trim();
    const n = parseFloat(raw);
    if (Number.isNaN(n)) return 0;
    return raw.endsWith('rem') ? n * root : n;
  };
  return px('--brvm-ticker-height') + px('--site-header-height') + 12;
}

function scrollToId(lenis: { scrollTo: (target: HTMLElement, options?: object) => void } | null, id: string, immediate = false) {
  const element = document.getElementById(id);
  if (!element || !lenis) return false;
  lenis.scrollTo(element, { offset: -chromeOffset(), immediate });
  return true;
}

const LenisContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { lenis, isReady } = useLenisContext();

  React.useEffect(() => {
    if (!isReady || !lenis) return;

    // Same-page hashes only. A link to /expertises#… from home must navigate.
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest('a');
      if (!target?.hash) return;
      const url = new URL(target.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) return;
      const id = decodeURIComponent(url.hash.slice(1));
      if (!scrollToId(lenis, id)) return;
      e.preventDefault();
      if (window.location.hash !== url.hash) {
        history.pushState(null, '', url.pathname + url.search + url.hash);
      }
    };

    const scrollFromLocation = (immediate = true) => {
      const id = decodeURIComponent(window.location.hash.replace(/^#/, ''));
      if (!id) return true;
      return scrollToId(lenis, id, immediate);
    };

    const onHashChange = () => scrollFromLocation(false);
    document.addEventListener('click', handleAnchorClick);
    window.addEventListener('hashchange', onHashChange);

    // Fragment scroll can run before the section exists, and again without the header offset.
    const retries = [0, 80, 400].map((ms) => window.setTimeout(() => scrollFromLocation(true), ms));

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('hashchange', onHashChange);
      retries.forEach((id) => window.clearTimeout(id));
    };
  }, [lenis, isReady]);

  return <>{children}</>;
};

export const LenisWrapper: React.FC<LenisWrapperProps> = ({ children }) => {
  return (
    <LenisProvider
      options={{
        duration: 0.8, // Reduced from 1.2 for better performance
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 0.8, // Reduced for less aggressive scrolling
        smoothTouch: false, // Disable smooth touch for better mobile performance
        touchMultiplier: 1.5, // Reduced for better touch performance
        infinite: false,
      }}
    >
      <LenisContent>{children}</LenisContent>
    </LenisProvider>
  );
};
