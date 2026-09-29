import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import { useDocumentVisible } from '../hooks/useDocumentVisible';
import { useIsMobile } from '../hooks/useIsMobile';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { CodeLayer } from './background/CodeLayer';
import { Particles } from './background/Particles';
import { Effects } from './Effects';
import { disposePhoneGeometries } from './phones/geometry';
import { desktopFragments, desktopPhones, mobileFragments, mobilePhones } from './phones/layout';
import { PhoneCluster } from './phones/PhoneCluster';
import { Rig } from './Rig';
import { disposeFragmentTextures } from './textures/fragments';
import { disposeScreenTextures } from './textures/screens';
import { Fragments } from './ui-fragments/Fragments';

interface SceneProps {
  onReady: () => void;
}

/** Fires once, after the first frame with everything (fonts, textures) resolved. */
function ReadySignal({ onReady }: SceneProps) {
  const fired = useRef(false);
  useFrame(() => {
    if (fired.current) return;
    fired.current = true;
    requestAnimationFrame(onReady);
  });
  return null;
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 6]} intensity={1.1} />
      <pointLight position={[3, 0, 3]} intensity={8} distance={9} color="#5EEAD4" />
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={2.2} color="#7C83FD" position={[-5, 3, -3]} scale={[6, 3, 1]} />
        <Lightformer form="rect" intensity={1.6} color="#5EEAD4" position={[6, -2, 3]} scale={[4, 2, 1]} />
        <Lightformer form="rect" intensity={1.2} color="#ffffff" position={[0, 6, 4]} scale={[10, 1, 1]} />
      </Environment>
    </>
  );
}

function Composition({ mobile, animate }: { mobile: boolean; animate: boolean }) {
  const portrait = useThree((s) => s.size.width < s.size.height);
  const compact = mobile || portrait;

  return (
    <Rig interactive={animate && !mobile}>
      <PhoneCluster slots={compact ? mobilePhones : desktopPhones} animate={animate} />
      <Fragments slots={compact ? mobileFragments : desktopFragments} animate={animate} />
      <CodeLayer count={compact ? 3 : 5} animate={animate} />
    </Rig>
  );
}

let mounted = 0;

export default function Scene({ onReady }: SceneProps) {
  const mobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  const visible = useDocumentVisible();
  const wrapper = useRef<HTMLDivElement>(null);
  const animate = !reducedMotion;

  // Fade the canvas back as the hero scrolls away (Phase 4 replaces this with full storytelling).
  useEffect(() => {
    const onScroll = () => {
      const p = Math.min(Math.max((window.scrollY / window.innerHeight - 0.15) / 0.9, 0), 1);
      if (wrapper.current) wrapper.current.style.opacity = String(1 - p * 0.78);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Release shared GPU resources when the scene really unmounts (not on StrictMode's re-mount).
  useEffect(() => {
    mounted++;
    return () => {
      mounted--;
      setTimeout(() => {
        if (mounted > 0) return;
        disposeScreenTextures();
        disposeFragmentTextures();
        disposePhoneGeometries();
      }, 500);
    };
  }, []);

  return (
    <div ref={wrapper} aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        eventSource={document.getElementById('root') ?? undefined}
        eventPrefix="client"
        dpr={[1, mobile ? 1.5 : 1.75]}
        camera={{ position: [0, 0, 12], fov: 32, near: 0.1, far: 60 }}
        gl={{ antialias: mobile, powerPreference: 'high-performance', stencil: false }}
        frameloop={visible ? 'always' : 'never'}
      >
        <color attach="background" args={['#07080C']} />
        <fog attach="fog" args={['#07080C', 20, 42]} />
        <Suspense fallback={null}>
          <Lighting />
          <Particles count={mobile ? 220 : 650} animate={animate} />
          <Composition mobile={mobile} animate={animate} />
          {!mobile && <Effects />}
          <ReadySignal onReady={onReady} />
        </Suspense>
      </Canvas>
    </div>
  );
}
