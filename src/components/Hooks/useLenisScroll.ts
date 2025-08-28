import { useLenisContext } from './useLenisContext.tsx';

export const useLenisScroll = () => {
  const { lenis, scrollTo, isReady } = useLenisContext();

  const scrollToTop = (duration: number = 1.2) => {
    if (isReady) {
      scrollTo(0, { duration });
    }
  };

  const scrollToElement = (
    selector: string,
    options: { offset?: number; duration?: number } = {}
  ) => {
    if (isReady) {
      const element = document.querySelector(selector);
      if (element) {
        scrollTo(element as HTMLElement, {
          offset: options.offset ?? -80, // Account for fixed header
          duration: options.duration ?? 1.2,
        });
      }
    }
  };

  const scrollToPosition = (
    position: number,
    duration: number = 1.2
  ) => {
    if (isReady) {
      scrollTo(position, { duration });
    }
  };

  return {
    lenis: isReady ? lenis : null,
    scrollTo: isReady ? scrollTo : () => {},
    scrollToTop,
    scrollToElement,
    scrollToPosition,
    isReady,
  };
};
