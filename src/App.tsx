import { Suspense, lazy, useCallback, useState } from 'react';
import { BackgroundGlow } from './components/BackgroundGlow';
import { GrainOverlay } from './components/GrainOverlay';
import { Nav } from './components/Nav';
import { Preloader } from './components/Preloader';
import { SceneBoundary } from './components/SceneBoundary';
import { BootContext } from './hooks/useBoot';
import { SmoothScrollProvider } from './hooks/useLenis';
import { About } from './sections/About';
import { Contact } from './sections/Contact';
import { Education } from './sections/Education';
import { Experience } from './sections/Experience';
import { Footer } from './sections/Footer';
import { Hero } from './sections/Hero';
import { Projects } from './sections/Projects';
import { Skills } from './sections/Skills';

const Scene = lazy(() => import('./three/Scene'));

export default function App() {
  const [sceneReady, setSceneReady] = useState(false);
  const [booted, setBooted] = useState(false);
  const markReady = useCallback(() => setSceneReady(true), []);
  const markBooted = useCallback(() => setBooted(true), []);

  return (
    <SmoothScrollProvider>
      <BootContext.Provider value={booted}>
        <BackgroundGlow />
        <SceneBoundary onError={markReady}>
          <Suspense fallback={null}>
            <Scene onReady={markReady} />
          </Suspense>
        </SceneBoundary>

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Education />
          <Contact />
        </main>
        <div className="relative z-10">
          <Footer />
        </div>
        <GrainOverlay />
        <Preloader ready={sceneReady} onDone={markBooted} />
      </BootContext.Provider>
    </SmoothScrollProvider>
  );
}
