import React from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';
import { LenisProvider, useLenisContext } from './Hooks/useLenisContext.tsx';

gsap.registerPlugin(ScrollTrigger);

interface LenisWrapperProps {
  children: React.ReactNode;
}

const LenisContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { lenis, isReady } = useLenisContext();

  // ── Global Lenis → ScrollTrigger proxy ──────────────────────────────────
  // Without this, every ScrollTrigger reads native scroll while Lenis
  // intercepts it, causing pins and scrubs to break or never fire.
  React.useEffect(() => {
    if (!lenis || !isReady) return;

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          lenis.scrollTo(value as number, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
    });

    const onScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onScroll);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);

    return () => {
      lenis.off('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [lenis, isReady]);

  // Handle anchor clicks for smooth scrolling
  const handleAnchorClick = (e: Event) => {
    const target = e.target as HTMLAnchorElement;
    if (target.tagName === 'A' && target.hash && target.hash.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(target.hash);
      if (element && lenis && isReady) {
        lenis.scrollTo(element as HTMLElement, { offset: -80 });
      }
    }
  };

  React.useEffect(() => {
    if (isReady) {
      document.addEventListener('click', handleAnchorClick);
      return () => document.removeEventListener('click', handleAnchorClick);
    }
  }, [lenis, isReady]);

  return <>{children}</>;
};

export const LenisWrapper: React.FC<LenisWrapperProps> = ({ children }) => {
  return (
    <LenisProvider
      options={{
        duration: 1.4, // Longer duration for cinematic parallax feel
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 0.7, // Slightly slower for dramatic scroll effect
        smoothTouch: false, // Disable smooth touch for better mobile performance
        touchMultiplier: 1.5, // Reduced for better touch performance
        infinite: false,
      }}
    >
      <LenisContent>{children}</LenisContent>
    </LenisProvider>
  );
};
