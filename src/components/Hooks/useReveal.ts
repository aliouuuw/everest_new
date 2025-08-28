import { useEffect, useRef } from 'react';

interface RevealOptions extends IntersectionObserverInit {
  lenis?: any; // Lenis instance for enhanced scroll synchronization
  once?: boolean;
  triggerOffset?: number;
}

export function useReveal<T extends HTMLElement>(
  options: RevealOptions = {},
  activeClass: string = 'in'
) {
  const ref = useRef<T | null>(null);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const {
      lenis,
      once = true,
      triggerOffset = 0,
      rootMargin = '0px 0px -10% 0px',
      threshold = 0.1,
      ...observerOptions
    } = options;

    if (lenis) {
      // Enhanced Lenis-based scroll reveal
      const triggerReveal = () => {
        if (hasTriggeredRef.current && once) return;

        const rect = node.getBoundingClientRect();
        const elementTop = rect.top + triggerOffset;
        const elementBottom = rect.bottom + triggerOffset;
        const isInView = elementTop < window.innerHeight && elementBottom > 0;

        if (isInView) {
          node.classList.add(activeClass);
          hasTriggeredRef.current = true;

          if (once) {
            lenis.off('scroll', triggerReveal);
          }
        } else if (!once) {
          node.classList.remove(activeClass);
          hasTriggeredRef.current = false;
        }
      };

      // Check if lenis is ready before adding listeners
      if (typeof lenis.on === 'function') {
        lenis.on('scroll', triggerReveal);
        // Trigger once initially
        triggerReveal();

        return () => {
          if (typeof lenis.off === 'function') {
            lenis.off('scroll', triggerReveal);
          }
        };
      } else {
        // Fallback to Intersection Observer if lenis isn't ready
        const observer = new IntersectionObserver((entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              node.classList.add(activeClass);
              if (once) {
                observer.unobserve(entry.target);
              }
            } else if (!once) {
              node.classList.remove(activeClass);
            }
          }
        }, { rootMargin, threshold, ...observerOptions });

        observer.observe(node);
        return () => observer.disconnect();
      }
    } else {
      // Fallback to Intersection Observer
      const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            node.classList.add(activeClass);
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            node.classList.remove(activeClass);
          }
        }
      }, { rootMargin, threshold, ...observerOptions });

      observer.observe(node);
      return () => observer.disconnect();
    }
  }, [options, activeClass]);

  return ref;
}


