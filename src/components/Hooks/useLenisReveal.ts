import { useEffect, useRef } from 'react';

interface LenisRevealOptions {
  rootMargin?: string;
  threshold?: number;
  triggerOffset?: number;
  once?: boolean;
}

export function useLenisReveal<T extends HTMLElement>(
  options: LenisRevealOptions = {},
  activeClass: string = 'in'
) {
  const ref = useRef<T | null>(null);
  const lenisObserverRef = useRef<any>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const {
      rootMargin = '0px 0px -10% 0px',
      threshold = 0.1,
      triggerOffset = 0,
      once = true,
    } = options;

    // Create intersection observer for initial setup
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add the active class
            node.classList.add(activeClass);

            // If once is true, unobserve after triggering
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            // Remove the active class if not once
            node.classList.remove(activeClass);
          }
        });
      },
      { rootMargin, threshold }
    );

    observer.observe(node);

    // Store observer reference for cleanup
    lenisObserverRef.current = observer;

    return () => {
      if (lenisObserverRef.current) {
        lenisObserverRef.current.disconnect();
      }
    };
  }, [options, activeClass]);

  return ref;
}

// Enhanced version that works with Lenis scroll events
export function useLenisScrollReveal<T extends HTMLElement>(
  options: LenisRevealOptions & {
    lenis?: any; // Lenis instance
    scrollDirection?: 'vertical' | 'horizontal';
  } = {},
  activeClass: string = 'in'
) {
  const ref = useRef<T | null>(null);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const {
      rootMargin = '0px 0px -10% 0px',
      threshold = 0.1,
      triggerOffset = 0,
      once = true,
      lenis,
      scrollDirection = 'vertical',
    } = options;

    const triggerReveal = () => {
      if (hasTriggeredRef.current && once) return;

      const rect = node.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;

      let isInView = false;

      if (scrollDirection === 'vertical') {
        const elementTop = rect.top + triggerOffset;
        const elementBottom = rect.bottom + triggerOffset;
        isInView = elementTop < windowHeight && elementBottom > 0;
      } else {
        const elementLeft = rect.left + triggerOffset;
        const elementRight = rect.right + triggerOffset;
        isInView = elementLeft < windowWidth && elementRight > 0;
      }

      if (isInView) {
        node.classList.add(activeClass);
        hasTriggeredRef.current = true;

        if (once) {
          // Remove scroll listener if once is true
          if (lenis) {
            lenis.off('scroll', triggerReveal);
          } else {
            window.removeEventListener('scroll', triggerReveal);
          }
        }
      } else if (!once) {
        node.classList.remove(activeClass);
        hasTriggeredRef.current = false;
      }
    };

    // Use Lenis scroll events if available, fallback to native scroll
    if (lenis) {
      lenis.on('scroll', triggerReveal);
      // Trigger once initially
      triggerReveal();
    } else {
      // Fallback to intersection observer
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              node.classList.add(activeClass);
              if (once) {
                observer.unobserve(entry.target);
              }
            } else if (!once) {
              node.classList.remove(activeClass);
            }
          });
        },
        { rootMargin, threshold }
      );

      observer.observe(node);

      return () => observer.disconnect();
    }

    return () => {
      if (lenis) {
        lenis.off('scroll', triggerReveal);
      }
    };
  }, [options, activeClass]);

  return ref;
}
