import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScroll {
  lenis: Lenis | null;
  scrollTo: (target: string | HTMLElement | number) => void;
}

const SmoothScrollContext = createContext<SmoothScroll>({
  lenis: null,
  scrollTo: () => {},
});

/** Lenis smooth scroll driven by the GSAP ticker so ScrollTrigger stays in sync. */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (reducedMotion) return;

    const instance = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9 });
    instance.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    setLenis(instance);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
    };
  }, [reducedMotion]);

  const scrollTo = useCallback(
    (target: string | HTMLElement | number) => {
      if (lenis) {
        lenis.scrollTo(target, { duration: 1.4 });
        return;
      }
      if (typeof target === 'number') {
        window.scrollTo({ top: target });
        return;
      }
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      el?.scrollIntoView();
    },
    [lenis],
  );

  return (
    <SmoothScrollContext.Provider value={{ lenis, scrollTo }}>{children}</SmoothScrollContext.Provider>
  );
}

export const useSmoothScroll = () => useContext(SmoothScrollContext);
