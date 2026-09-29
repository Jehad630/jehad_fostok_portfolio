import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { rng } from '../textures/draw';

function dotTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const ctx = c.getContext('2d')!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.35, 'rgba(255,255,255,0.5)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

interface ParticlesProps {
  count: number;
  animate: boolean;
}

/** Soft light dust drifting through the scene for depth. */
export function Particles({ count, animate }: ParticlesProps) {
  const points = useRef<THREE.Points>(null);

  const { geometry, texture } = useMemo(() => {
    const rand = rng(42);
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rand() - 0.5) * 30;
      positions[i * 3 + 1] = (rand() - 0.5) * 18;
      positions[i * 3 + 2] = -16 + rand() * 20;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return { geometry: geo, texture: dotTexture() };
  }, [count]);

  useEffect(
    () => () => {
      geometry.dispose();
      texture.dispose();
    },
    [geometry, texture],
  );

  useFrame((_, dt) => {
    if (!animate || !points.current) return;
    points.current.rotation.y += dt * 0.012;
    points.current.position.y = Math.sin(performance.now() * 0.00008) * 0.4;
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        map={texture}
        size={0.07}
        sizeAttenuation
        color="#A9B1CC"
        transparent
        opacity={0.55}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
