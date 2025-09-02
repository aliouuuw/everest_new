import { useEffect, useRef, useState } from 'react';

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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node || !isMounted) return;

    const {
      lenis,
      once = true,
      triggerOffset = 0,
      rootMargin = '0px 0px -10% 0px',
      threshold = 0.1,
      ...observerOptions
    } = options;

    // Reset the triggered state when the effect runs (e.g., on route change)
    hasTriggeredRef.current = false;

    if (lenis && typeof lenis.on === 'function') {
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

      lenis.on('scroll', triggerReveal);
      // Trigger once initially
      triggerReveal();

      return () => {
        if (typeof lenis.off === 'function') {
          lenis.off('scroll', triggerReveal);
        }
      };
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
  }, [options, activeClass, isMounted]);

  return ref;
}


