/** Fixed soft radial glows behind everything (the 3D canvas sits above this later). */
export function BackgroundGlow() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg">
      <div className="absolute -top-[20%] left-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(124_131_253/0.10),transparent)]" />
      <div className="absolute -bottom-[25%] -right-[15%] h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(closest-side,rgb(94_234_212/0.06),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgb(7_8_12/0.85)_100%)]" />
    </div>
  );
}
