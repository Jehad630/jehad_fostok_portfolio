import { useRef, type PointerEvent, type ReactNode } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. */
  max?: number;
}

const spring = { stiffness: 180, damping: 18, mass: 0.6 };

/**
 * 3D tilt toward the cursor with a light-follow glare.
 * Children can use `[transform:translateZ(…)]` to pop out of the card.
 */
export function TiltCard({ children, className = '', max = 8 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const mobile = useIsMobile();
  const enabled = !reducedMotion && !mobile;

  const rx = useSpring(0, spring);
  const ry = useSpring(0, spring);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glare = useSpring(0, { stiffness: 120, damping: 20 });
  const glareBg = useMotionTemplate`radial-gradient(520px circle at ${gx}% ${gy}%, rgb(255 255 255 / 0.09), rgb(94 234 212 / 0.03) 30%, transparent 55%)`;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!enabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 2 * max);
    rx.set(-(py - 0.5) * 2 * max);
    gx.set(px * 100);
    gy.set(py * 100);
    glare.set(1);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
    glare.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={enabled ? { rotateX: rx, rotateY: ry, transformPerspective: 1000, transformStyle: 'preserve-3d' } : undefined}
      className={`relative ${className}`}
    >
      {/* Glass lives on its own layer: backdrop-filter would flatten preserve-3d on the card itself. */}
      <div aria-hidden className="glass absolute inset-0 rounded-[inherit]" />
      {children}
      {enabled && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: glareBg, opacity: glare }}
        />
      )}
    </motion.div>
  );
}
