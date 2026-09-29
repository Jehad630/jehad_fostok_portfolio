const NOISE_SVG =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>";

/** Subtle animated film grain over the whole page. */
export function GrainOverlay() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] overflow-hidden opacity-[0.06]">
      <div
        className="absolute -inset-[10%] motion-safe:animate-[grain_1.2s_steps(4)_infinite]"
        style={{ backgroundImage: `url("${NOISE_SVG}")`, backgroundSize: '180px 180px' }}
      />
    </div>
  );
}
