import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface LenisOptions {
  duration?: number;
  easing?: (t: number) => number;
  direction?: 'vertical' | 'horizontal';
  gestureDirection?: 'vertical' | 'horizontal' | 'both';
  smooth?: boolean;
  mouseMultiplier?: number;
  smoothTouch?: boolean;
  touchMultiplier?: number;
  infinite?: boolean;
}

const defaultOptions: LenisOptions = {
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
};

export const useLenis = (options: Partial<LenisOptions> = {}) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with merged options
    const lenisOptions = { ...defaultOptions, ...options };
    lenisRef.current = new Lenis(lenisOptions);

    // Start the animation loop
    const raf = (time: number) => {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // Cleanup on unmount
    return () => {
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, [options]);

  return lenisRef.current;
};

export const useLenisScroll = () => {
  const lenis = useLenis();

  const scrollTo = (
    target: string | HTMLElement | number,
    options: { offset?: number; duration?: number; easing?: (t: number) => number } = {}
  ) => {
    if (lenis) {
      lenis.scrollTo(target, options);
    }
  };

  const scrollToTop = (duration: number = 1.2) => {
    scrollTo(0, { duration });
  };

  return {
    scrollTo,
    scrollToTop,
    lenis,
  };
};
