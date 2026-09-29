import { Float } from '@react-three/drei';
import * as THREE from 'three';
import type { FragmentSlot } from '../phones/layout';
import { getFragmentTexture } from '../textures/fragments';

const plane = new THREE.PlaneGeometry(1, 1);

interface FragmentsProps {
  slots: FragmentSlot[];
  animate: boolean;
}

/** Detached, glassy UI pieces floating around the phones — the app "exploded" into layers. */
export function Fragments({ slots, animate }: FragmentsProps) {
  return (
    <group>
      {slots.map((slot, i) => {
        const { texture, aspect } = getFragmentTexture(slot.kind);
        return (
          <Float
            key={`${slot.kind}-${i}`}
            speed={animate ? 1.6 + (i % 4) * 0.3 : 0}
            rotationIntensity={animate ? 0.5 : 0}
            floatIntensity={animate ? 0.9 : 0}
            floatingRange={[-0.1, 0.1]}
          >
            <mesh
              geometry={plane}
              position={slot.position}
              rotation={slot.rotation ?? [0, 0, 0]}
              scale={[slot.width, slot.width / aspect, 1]}
              dispose={null}
            >
              <meshBasicMaterial
                map={texture}
                transparent
                depthWrite={false}
                toneMapped={false}
                color={[1.08, 1.08, 1.08]}
                side={THREE.DoubleSide}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}
