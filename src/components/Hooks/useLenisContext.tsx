import { createContext, useContext, useEffect, useRef, ReactNode, useState } from 'react';
import Lenis from 'lenis';

interface LenisContextType {
  lenis: Lenis | null;
  scrollTo: (target: string | HTMLElement | number, options?: any) => void;
  isReady: boolean;
}

const LenisContext = createContext<LenisContextType | null>(null);

export const useLenisContext = () => {
  const context = useContext(LenisContext);
  if (!context) {
    throw new Error('useLenisContext must be used within a LenisProvider');
  }
  return context;
};

interface LenisProviderProps {
  children: ReactNode;
  options?: {
    duration?: number;
    easing?: (t: number) => number;
    direction?: 'vertical' | 'horizontal';
    gestureDirection?: 'vertical' | 'horizontal' | 'both';
    smooth?: boolean;
    mouseMultiplier?: number;
    smoothTouch?: boolean;
    touchMultiplier?: number;
    infinite?: boolean;
  };
}

export const LenisProvider: React.FC<LenisProviderProps> = ({
  children,
  options = {}
}) => {
  const lenisRef = useRef<Lenis | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const defaultOptions = {
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical' as const,
      gestureDirection: 'vertical' as const,
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    };

    const lenisOptions = { ...defaultOptions, ...options };

    lenisRef.current = new Lenis(lenisOptions);
    setIsReady(true);

    const raf = (time: number) => {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenisRef.current?.destroy();
      lenisRef.current = null;
      setIsReady(false);
    };
  }, [options]);

  const scrollTo = (target: string | HTMLElement | number, options: any = {}) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, options);
    }
  };

  const contextValue: LenisContextType = {
    lenis: lenisRef.current,
    scrollTo,
    isReady,
  };

  return (
    <LenisContext.Provider value={contextValue}>
      {children}
    </LenisContext.Provider>
  );
};
