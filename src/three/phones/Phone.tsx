import { useRef } from 'react';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { PHONE, getPhoneGeometries } from './geometry';

export interface PhoneProps {
  texture: THREE.Texture;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  /** Screen brightness multiplier (values > 1 feed the bloom pass). */
  brightness?: number;
  floatSpeed?: number;
  interactive?: boolean;
  animate?: boolean;
}

const HOVER_LIFT = 0.55;

export function Phone({
  texture,
  position,
  rotation = [0, 0, 0],
  scale = 1,
  brightness = 1,
  floatSpeed = 1.4,
  interactive = true,
  animate = true,
}: PhoneProps) {
  const geo = getPhoneGeometries();
  const lift = useRef<THREE.Group>(null);
  const screen = useRef<THREE.MeshBasicMaterial>(null);
  const hovered = useRef(false);

  useFrame((_, dt) => {
    if (!lift.current || !screen.current) return;
    const k = 1 - Math.exp(-dt * 7);
    const h = hovered.current;
    lift.current.position.z += ((h ? HOVER_LIFT : 0) - lift.current.position.z) * k;
    const s = lift.current.scale.x + ((h ? 1.04 : 1) - lift.current.scale.x) * k;
    lift.current.scale.setScalar(s);
    const c = screen.current.color;
    c.setScalar(c.r + ((h ? brightness * 1.45 : brightness) - c.r) * k);
  });

  const onOver = (e: ThreeEvent<PointerEvent>) => {
    if (!interactive) return;
    e.stopPropagation();
    hovered.current = true;
  };
  const onOut = () => {
    hovered.current = false;
  };

  const front = PHONE.depth / 2;

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <Float
        speed={animate ? floatSpeed : 0}
        rotationIntensity={animate ? 0.4 : 0}
        floatIntensity={animate ? 0.7 : 0}
        floatingRange={[-0.12, 0.12]}
      >
        <group ref={lift} onPointerOver={onOver} onPointerOut={onOut}>
          <mesh geometry={geo.body} dispose={null}>
            <meshStandardMaterial color="#141823" metalness={0.9} roughness={0.3} envMapIntensity={1.1} />
          </mesh>

          <mesh geometry={geo.screen} position={[0, 0, front + 0.002]} dispose={null}>
            <meshBasicMaterial ref={screen} map={texture} toneMapped={false} color={[brightness, brightness, brightness]} />
          </mesh>

          <mesh geometry={geo.island} position={[0, PHONE.height / 2 - 0.16, front + 0.004]} dispose={null}>
            <meshBasicMaterial color="#020203" />
          </mesh>

          <mesh
            geometry={geo.cameraBump}
            position={[-PHONE.width / 2 + 0.34, PHONE.height / 2 - 0.36, -front - 0.012]}
            rotation={[0, Math.PI, 0]}
            dispose={null}
          >
            <meshStandardMaterial color="#1B1F2B" metalness={0.8} roughness={0.35} side={THREE.DoubleSide} />
          </mesh>

          <mesh geometry={geo.button} position={[PHONE.width / 2 + 0.004, 0.45, 0]} dispose={null}>
            <meshStandardMaterial color="#1B1F2B" metalness={0.9} roughness={0.3} />
          </mesh>
          <mesh geometry={geo.button} position={[-PHONE.width / 2 - 0.004, 0.6, 0]} dispose={null}>
            <meshStandardMaterial color="#1B1F2B" metalness={0.9} roughness={0.3} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}
