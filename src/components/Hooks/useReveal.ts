import { useEffect, useRef } from 'react';

export function useReveal<T extends HTMLElement>(options?: IntersectionObserverInit, activeClass: string = 'in') {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          node.classList.add(activeClass);
          observer.unobserve(entry.target);
        }
      }
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1, ...(options || {}) });

    observer.observe(node);
    return () => observer.disconnect();
  }, [options, activeClass]);

  return ref;
}


