import { useRef, type ReactNode } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface RigProps {
  children: ReactNode;
  interactive: boolean;
}

/**
 * Tilts the whole composition toward the cursor (damped) and eases it
 * up/back as the hero scrolls away. Full scroll storytelling lands in Phase 4.
 */
export function Rig({ children, interactive }: RigProps) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ pointer }, dt) => {
    const g = group.current;
    if (!g) return;
    const k = 1 - Math.exp(-dt * 3);
    const tx = interactive ? pointer.x : 0;
    const ty = interactive ? pointer.y : 0;
    g.rotation.y += (tx * 0.14 - g.rotation.y) * k;
    g.rotation.x += (-ty * 0.08 - g.rotation.x) * k;

    const p = Math.min(window.scrollY / window.innerHeight, 1.5);
    g.position.y += (p * 2.4 - g.position.y) * k;
    g.position.z += (-p * 2.5 - g.position.z) * k;
  });

  return <group ref={group}>{children}</group>;
}
