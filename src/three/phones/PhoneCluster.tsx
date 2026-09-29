import { useMemo } from 'react';
import { projects } from '../../data/portfolio';
import { getScreenTexture } from '../textures/screens';
import { Phone } from './Phone';
import type { PhoneSlot } from './layout';

interface PhoneClusterProps {
  slots: PhoneSlot[];
  animate: boolean;
}

export function PhoneCluster({ slots, animate }: PhoneClusterProps) {
  const textures = useMemo(
    () => slots.map((s) => getScreenTexture(projects[s.project], s.screen)),
    [slots],
  );

  return (
    <group>
      {slots.map((slot, i) => (
        <Phone
          key={`${slot.project}-${slot.screen}-${i}`}
          texture={textures[i]}
          position={slot.position}
          rotation={slot.rotation}
          scale={slot.scale}
          brightness={slot.brightness}
          floatSpeed={1.1 + (i % 3) * 0.35}
          animate={animate}
        />
      ))}
    </group>
  );
}
