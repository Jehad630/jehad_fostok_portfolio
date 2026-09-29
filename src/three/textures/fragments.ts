import * as THREE from 'three';
import {
  DISPLAY,
  MONO,
  bar,
  barChart,
  box,
  button,
  chip,
  createCanvas,
  dot,
  icon,
  lineChart,
  palette,
  text,
  toggle,
  type Ctx,
} from './draw';

export type FragmentKind = 'stat' | 'toggle' | 'chips' | 'chart' | 'button' | 'notification' | 'fab' | 'widget';

interface FragmentSpec {
  w: number;
  h: number;
  paint: (ctx: Ctx, w: number, h: number) => void;
}

/** Glassy panel background with a faint top highlight. */
function glass(ctx: Ctx, w: number, h: number, r = 28, tint = palette.accent) {
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, 'rgba(30,34,48,0.92)');
  g.addColorStop(1, 'rgba(16,18,26,0.88)');
  box(ctx, 3, 3, w - 6, h - 6, r, { fill: g, stroke: tint + '55', lineWidth: 2.5 });
  const hl = ctx.createLinearGradient(0, 0, w, 0);
  hl.addColorStop(0, 'rgba(255,255,255,0)');
  hl.addColorStop(0.5, 'rgba(255,255,255,0.18)');
  hl.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = hl;
  ctx.fillRect(r, 4, w - r * 2, 2);
}

const specs: Record<FragmentKind, FragmentSpec> = {
  stat: {
    w: 360,
    h: 200,
    paint: (ctx, w, h) => {
      glass(ctx, w, h);
      text(ctx, 'Monthly total', 28, 50, { size: 20, color: palette.muted });
      text(ctx, '$1,284', 28, 102, { size: 44, weight: 700, font: DISPLAY });
      lineChart(ctx, 28, 120, w - 56, 56, 4, palette.accent, 7);
    },
  },
  toggle: {
    w: 320,
    h: 110,
    paint: (ctx, w, h) => {
      glass(ctx, w, h, 30, palette.indigo);
      text(ctx, 'Dark mode', 28, 64, { size: 22, weight: 500 });
      toggle(ctx, w - 108, 34, true, 1.2);
    },
  },
  chips: {
    w: 420,
    h: 96,
    paint: (ctx, w, h) => {
      glass(ctx, w, h, 48, palette.indigo);
      let x = 24;
      x += chip(ctx, 'Flutter', x, 28, true) + 10;
      x += chip(ctx, 'Dart', x, 28) + 10;
      chip(ctx, 'BLoC', x, 28);
    },
  },
  chart: {
    w: 300,
    h: 240,
    paint: (ctx, w, h) => {
      glass(ctx, w, h, 28, palette.indigo);
      text(ctx, 'Weekly', 26, 48, { size: 19, color: palette.muted });
      barChart(ctx, 26, 72, w - 52, h - 100, 12, 7);
    },
  },
  button: {
    w: 300,
    h: 100,
    paint: (ctx, w) => {
      button(ctx, 'Get started', 10, 14, w - 20, 72);
    },
  },
  notification: {
    w: 420,
    h: 130,
    paint: (ctx, w, h) => {
      glass(ctx, w, h, 30);
      icon(ctx, 24, 32, 64, palette.accent);
      text(ctx, 'Build succeeded', 108, 60, { size: 21, weight: 600 });
      text(ctx, 'flutter build apk --release', 108, 94, { size: 16, color: palette.muted, font: MONO });
    },
  },
  fab: {
    w: 140,
    h: 140,
    paint: (ctx) => {
      dot(ctx, 70, 70, 62, palette.accent + '33');
      dot(ctx, 70, 70, 48, palette.accent);
      box(ctx, 68 - 18, 66, 40, 8, 4, { fill: palette.bg });
      box(ctx, 66, 68 - 18, 8, 40, 4, { fill: palette.bg });
    },
  },
  widget: {
    w: 260,
    h: 260,
    paint: (ctx, w, h) => {
      glass(ctx, w, h, 36, palette.indigo);
      text(ctx, 'Column(', 26, 50, { size: 18, color: palette.indigo, font: MONO });
      bar(ctx, 44, 76, w - 88, 30, palette.elevated);
      bar(ctx, 44, 118, w - 110, 30, palette.elevated);
      bar(ctx, 44, 160, w - 140, 30, palette.accent + '66');
      text(ctx, ')', 26, 226, { size: 18, color: palette.indigo, font: MONO });
    },
  },
};

export interface FragmentTexture {
  texture: THREE.CanvasTexture;
  aspect: number;
}

const cache = new Map<FragmentKind, FragmentTexture>();

export function getFragmentTexture(kind: FragmentKind): FragmentTexture {
  const cached = cache.get(kind);
  if (cached) return cached;

  const { w, h, paint } = specs[kind];
  const { canvas, ctx } = createCanvas(w, h);
  paint(ctx, w, h);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const entry = { texture, aspect: w / h };
  cache.set(kind, entry);

  document.fonts?.ready.then(() => {
    if (!cache.has(kind)) return;
    ctx.clearRect(0, 0, w, h);
    paint(ctx, w, h);
    texture.needsUpdate = true;
  });

  return entry;
}

export function disposeFragmentTextures() {
  cache.forEach(({ texture }) => texture.dispose());
  cache.clear();
}
