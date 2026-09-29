/** Tiny 2D canvas drawing kit for generated app screens and UI fragments. */

export const palette = {
  bg: '#090B11',
  bgTop: '#0E111A',
  surface: '#11141D',
  elevated: '#181C28',
  line: 'rgba(255,255,255,0.07)',
  fg: '#E6E8EE',
  muted: '#8A90A2',
  faint: '#3A3F4E',
  accent: '#5EEAD4',
  indigo: '#7C83FD',
  rose: '#F59CB2',
  amber: '#F5C77E',
};

export const SANS = '"Inter Variable", Inter, system-ui, sans-serif';
export const DISPLAY = '"Space Grotesk", system-ui, sans-serif';
export const MONO = '"JetBrains Mono Variable", ui-monospace, monospace';

export type Ctx = CanvasRenderingContext2D;

/** Deterministic PRNG so every screen looks the same on each load. */
export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createCanvas(w: number, h: number) {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;
  return { canvas, ctx };
}

interface BoxStyle {
  fill?: string | CanvasGradient;
  stroke?: string;
  lineWidth?: number;
}

export function box(ctx: Ctx, x: number, y: number, w: number, h: number, r: number, style: BoxStyle = {}) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  if (style.fill) {
    ctx.fillStyle = style.fill;
    ctx.fill();
  }
  if (style.stroke) {
    ctx.strokeStyle = style.stroke;
    ctx.lineWidth = style.lineWidth ?? 1.5;
    ctx.stroke();
  }
}

export function card(ctx: Ctx, x: number, y: number, w: number, h: number, r = 22) {
  box(ctx, x, y, w, h, r, { fill: palette.surface, stroke: palette.line });
}

interface TextStyle {
  size?: number;
  weight?: number;
  color?: string;
  align?: CanvasTextAlign;
  font?: string;
}

export function text(ctx: Ctx, str: string, x: number, y: number, s: TextStyle = {}) {
  ctx.font = `${s.weight ?? 400} ${s.size ?? 20}px ${s.font ?? SANS}`;
  ctx.fillStyle = s.color ?? palette.fg;
  ctx.textAlign = s.align ?? 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(str, x, y);
}

/** Skeleton line used in place of real copy. */
export function bar(ctx: Ctx, x: number, y: number, w: number, h = 12, color = palette.faint) {
  box(ctx, x, y, w, h, h / 2, { fill: color });
}

export function dot(ctx: Ctx, x: number, y: number, r: number, color: string) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

export function chip(ctx: Ctx, label: string, x: number, y: number, active = false) {
  ctx.font = `500 18px ${SANS}`;
  const w = ctx.measureText(label).width + 36;
  box(ctx, x, y, w, 40, 20, active ? { fill: palette.accent } : { fill: palette.elevated, stroke: palette.line });
  text(ctx, label, x + w / 2, y + 27, { size: 18, weight: 500, align: 'center', color: active ? palette.bg : palette.muted });
  return w;
}

export function button(ctx: Ctx, label: string, x: number, y: number, w: number, h = 64) {
  const g = ctx.createLinearGradient(x, y, x + w, y + h);
  g.addColorStop(0, palette.accent);
  g.addColorStop(1, '#8FF3E3');
  box(ctx, x, y, w, h, h / 2, { fill: g });
  text(ctx, label, x + w / 2, y + h / 2 + 7, { size: 20, weight: 600, align: 'center', color: palette.bg });
}

export function lineChart(
  ctx: Ctx,
  x: number,
  y: number,
  w: number,
  h: number,
  seed: number,
  color = palette.accent,
  points = 9,
) {
  const rand = rng(seed);
  const pts = Array.from({ length: points }, (_, i) => [
    x + (w / (points - 1)) * i,
    y + h * (0.2 + rand() * 0.6) - (i / points) * h * 0.25,
  ]);

  const fill = ctx.createLinearGradient(0, y, 0, y + h);
  fill.addColorStop(0, color + '55');
  fill.addColorStop(1, color + '00');

  const trace = () => {
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) {
      const [px, py] = pts[i - 1];
      const [cx, cy] = pts[i];
      const mx = (px + cx) / 2;
      ctx.bezierCurveTo(mx, py, mx, cy, cx, cy);
    }
  };

  trace();
  ctx.lineTo(x + w, y + h);
  ctx.lineTo(x, y + h);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();

  trace();
  ctx.strokeStyle = color;
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.stroke();

  const [lx, ly] = pts[pts.length - 1];
  dot(ctx, lx, ly, 9, color + '44');
  dot(ctx, lx, ly, 5, color);
}

export function barChart(ctx: Ctx, x: number, y: number, w: number, h: number, seed: number, count = 7) {
  const rand = rng(seed);
  const gap = 12;
  const bw = (w - gap * (count - 1)) / count;
  for (let i = 0; i < count; i++) {
    const bh = h * (0.25 + rand() * 0.75);
    const active = i === count - 2;
    box(ctx, x + i * (bw + gap), y + h - bh, bw, bh, Math.min(10, bw / 2), {
      fill: active ? palette.accent : palette.elevated,
    });
  }
}

export function donut(ctx: Ctx, cx: number, cy: number, r: number, parts: [number, string][]) {
  const total = parts.reduce((s, [v]) => s + v, 0);
  let start = -Math.PI / 2;
  ctx.lineWidth = r * 0.28;
  ctx.lineCap = 'round';
  for (const [v, color] of parts) {
    const end = start + (v / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(cx, cy, r, start + 0.06, end - 0.06);
    ctx.strokeStyle = color;
    ctx.stroke();
    start = end;
  }
}

export function toggle(ctx: Ctx, x: number, y: number, on: boolean, scale = 1) {
  const w = 64 * scale;
  const h = 36 * scale;
  box(ctx, x, y, w, h, h / 2, { fill: on ? palette.accent : palette.faint });
  dot(ctx, on ? x + w - h / 2 : x + h / 2, y + h / 2, h / 2 - 4 * scale, on ? palette.bg : palette.muted);
}

export function icon(ctx: Ctx, x: number, y: number, size: number, color: string) {
  box(ctx, x, y, size, size, size * 0.3, { fill: color + '22' });
  box(ctx, x + size * 0.3, y + size * 0.3, size * 0.4, size * 0.4, size * 0.12, { fill: color });
}
