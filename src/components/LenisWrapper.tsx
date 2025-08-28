import React from 'react';
import { LenisProvider, useLenisContext } from './Hooks/useLenisContext.tsx';

interface LenisWrapperProps {
  children: React.ReactNode;
}

const LenisContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { lenis, isReady } = useLenisContext();

  // Handle anchor clicks for smooth scrolling
  const handleAnchorClick = (e: Event) => {
    const target = e.target as HTMLAnchorElement;
    if (target.tagName === 'A' && target.hash && target.hash.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(target.hash);
      if (element && lenis && isReady) {
        lenis.scrollTo(element as HTMLElement, { offset: -80 }); // Account for fixed header
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
