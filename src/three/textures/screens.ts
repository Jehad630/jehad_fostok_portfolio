import * as THREE from 'three';
import type { Project } from '../../data/portfolio';
import {
  DISPLAY,
  bar,
  box,
  button,
  card,
  chip,
  createCanvas,
  donut,
  dot,
  icon,
  lineChart,
  palette,
  rng,
  text,
  toggle,
  type Ctx,
} from './draw';

/** Portrait phone texture size (≈ 9:19.5). Real screenshots are resized to this too. */
export const SCREEN_W = 480;
export const SCREEN_H = 1040;
const PAD = 28;

type Flavour = Project['placeholder'];

// ─── Shared chrome ──────────────────────────────────────────────────────────

function background(ctx: Ctx, glow: string) {
  const g = ctx.createLinearGradient(0, 0, 0, SCREEN_H);
  g.addColorStop(0, palette.bgTop);
  g.addColorStop(1, palette.bg);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, SCREEN_W, SCREEN_H);

  const r = ctx.createRadialGradient(SCREEN_W * 0.85, 60, 0, SCREEN_W * 0.85, 60, 420);
  r.addColorStop(0, glow + '30');
  r.addColorStop(1, glow + '00');
  ctx.fillStyle = r;
  ctx.fillRect(0, 0, SCREEN_W, SCREEN_H);
}

function statusBar(ctx: Ctx) {
  text(ctx, '9:41', PAD + 8, 48, { size: 18, weight: 600 });
  bar(ctx, SCREEN_W - PAD - 84, 36, 22, 12, palette.muted);
  bar(ctx, SCREEN_W - PAD - 54, 36, 18, 12, palette.muted);
  box(ctx, SCREEN_W - PAD - 30, 34, 30, 16, 5, { stroke: palette.muted, lineWidth: 1.5 });
  box(ctx, SCREEN_W - PAD - 27, 37, 20, 10, 3, { fill: palette.fg });
}

function header(ctx: Ctx, title: string, subtitle: string, rtl = false) {
  const x = rtl ? SCREEN_W - PAD : PAD;
  const align = rtl ? 'right' : 'left';
  text(ctx, subtitle, x, 112, { size: 18, color: palette.muted, align });
  text(ctx, title, x, 156, { size: 40, weight: 700, font: DISPLAY, align });
  const ax = rtl ? PAD + 24 : SCREEN_W - PAD - 24;
  dot(ctx, ax, 132, 24, palette.elevated);
  dot(ctx, ax, 132, 14, palette.indigo + 'AA');
}

function bottomNav(ctx: Ctx, active: number) {
  const y = SCREEN_H - 104;
  ctx.fillStyle = palette.bgTop;
  ctx.fillRect(0, y, SCREEN_W, 104);
  ctx.fillStyle = palette.line;
  ctx.fillRect(0, y, SCREEN_W, 1.5);
  const step = SCREEN_W / 4;
  for (let i = 0; i < 4; i++) {
    const cx = step * i + step / 2;
    if (i === active) box(ctx, cx - 34, y + 18, 68, 36, 18, { fill: palette.accent + '26' });
    box(ctx, cx - 11, y + 25, 22, 22, 7, { fill: i === active ? palette.accent : palette.faint });
    bar(ctx, cx - 16, y + 66, 32, 8, i === active ? palette.accent + '99' : palette.faint);
  }
  bar(ctx, SCREEN_W / 2 - 60, SCREEN_H - 14, 120, 6, palette.muted + '88');
}

// ─── TreKo: subscription & expense tracker ─────────────────────────────────

function trackerHome(ctx: Ctx) {
  background(ctx, palette.indigo);
  statusBar(ctx);
  header(ctx, 'TreKo', 'Good evening');

  const x = PAD;
  const w = SCREEN_W - PAD * 2;
  const g = ctx.createLinearGradient(x, 190, x + w, 410);
  g.addColorStop(0, '#20244A');
  g.addColorStop(1, palette.surface);
  box(ctx, x, 190, w, 224, 28, { fill: g, stroke: palette.indigo + '44' });
  text(ctx, 'Spent this month', x + 24, 236, { size: 18, color: palette.muted });
  text(ctx, '$1,284.40', x + 24, 296, { size: 50, weight: 700, font: DISPLAY });
  lineChart(ctx, x + 24, 318, w - 48, 72, 7, palette.accent);

  let cx = x;
  cx += chip(ctx, 'All', cx, 444, true) + 10;
  cx += chip(ctx, 'Subscriptions', cx, 444) + 10;
  chip(ctx, 'Bills', cx, 444);

  text(ctx, 'Upcoming', x, 540, { size: 22, weight: 600 });
  text(ctx, 'See all', x + w, 540, { size: 18, color: palette.accent, align: 'right' });

  const rows: [string, string, string, string][] = [
    ['Streaming', 'Renews in 3 days', '$15.99', palette.rose],
    ['Cloud storage', 'Renews in 6 days', '$2.99', palette.indigo],
    ['Music', 'Renews in 12 days', '$10.99', palette.accent],
  ];
  rows.forEach(([name, sub, amount, color], i) => {
    const y = 564 + i * 100;
    card(ctx, x, y, w, 88);
    icon(ctx, x + 18, y + 18, 52, color);
    text(ctx, name, x + 88, y + 40, { size: 20, weight: 600 });
    text(ctx, sub, x + 88, y + 66, { size: 16, color: palette.muted });
    text(ctx, amount, x + w - 20, y + 52, { size: 20, weight: 600, align: 'right' });
  });

  bottomNav(ctx, 0);
}

function trackerInsights(ctx: Ctx) {
  background(ctx, palette.accent);
  statusBar(ctx);
  header(ctx, 'Insights', 'Where it goes');

  const x = PAD;
  const w = SCREEN_W - PAD * 2;
  box(ctx, x, 192, w, 52, 26, { fill: palette.surface, stroke: palette.line });
  box(ctx, x + w / 3 + 4, 196, w / 3 - 8, 44, 22, { fill: palette.elevated });
  ['Week', 'Month', 'Year'].forEach((l, i) =>
    text(ctx, l, x + (w / 3) * i + w / 6, 226, {
      size: 17,
      weight: 500,
      align: 'center',
      color: i === 1 ? palette.fg : palette.muted,
    }),
  );

  const parts: [number, string][] = [
    [42, palette.accent],
    [26, palette.indigo],
    [18, palette.rose],
    [14, palette.amber],
  ];
  donut(ctx, SCREEN_W / 2, 420, 118, parts);
  text(ctx, '$1.2k', SCREEN_W / 2, 424, { size: 42, weight: 700, font: DISPLAY, align: 'center' });
  text(ctx, 'this month', SCREEN_W / 2, 454, { size: 16, color: palette.muted, align: 'center' });

  const labels = ['Subscriptions', 'Food', 'Transport', 'Other'];
  parts.forEach(([v, color], i) => {
    const y = 600 + i * 76;
    dot(ctx, x + 10, y + 12, 7, color);
    text(ctx, labels[i], x + 30, y + 19, { size: 18, weight: 500 });
    text(ctx, `${v}%`, x + w, y + 19, { size: 18, color: palette.muted, align: 'right' });
    bar(ctx, x, y + 38, w, 10, palette.elevated);
    bar(ctx, x, y + 38, (w * v) / 50, 10, color);
  });

  bottomNav(ctx, 1);
}

function trackerForm(ctx: Ctx) {
  background(ctx, palette.indigo);
  statusBar(ctx);
  header(ctx, 'New expense', 'Step 2 of 3');

  const x = PAD;
  const w = SCREEN_W - PAD * 2;
  for (let i = 0; i < 3; i++) bar(ctx, x + i * ((w + 10) / 3), 188, (w - 20) / 3, 8, i < 2 ? palette.accent : palette.faint);

  text(ctx, 'Amount', x, 256, { size: 17, color: palette.muted });
  box(ctx, x, 272, w, 96, 22, { fill: palette.surface, stroke: palette.accent + '88', lineWidth: 2 });
  text(ctx, '$ 49.99', x + 24, 336, { size: 42, weight: 700, font: DISPLAY });

  text(ctx, 'Currency', x, 416, { size: 17, color: palette.muted });
  card(ctx, x, 432, w, 76);
  text(ctx, 'USD', x + 24, 480, { size: 22, weight: 600 });
  dot(ctx, x + w / 2, 470, 20, palette.elevated);
  text(ctx, '⇄', x + w / 2, 478, { size: 20, align: 'center', color: palette.accent });
  text(ctx, 'SAR', x + w - 24, 480, { size: 22, weight: 600, align: 'right' });
  text(ctx, '≈ 187.46 SAR', x, 540, { size: 16, color: palette.accent });

  text(ctx, 'Category', x, 596, { size: 17, color: palette.muted });
  let cx = x;
  cx += chip(ctx, 'Subscriptions', cx, 612, true) + 10;
  chip(ctx, 'Food', cx, 612);

  card(ctx, x, 690, w, 76);
  text(ctx, 'Repeat monthly', x + 24, 736, { size: 19, weight: 500 });
  toggle(ctx, x + w - 88, 710, true);

  button(ctx, 'Next step', x, 830, w, 68);
  bar(ctx, SCREEN_W / 2 - 60, SCREEN_H - 14, 120, 6, palette.muted + '88');
}

// ─── Wakeelek: classifieds ──────────────────────────────────────────────────

const LISTING_HUES = ['#2A3358', '#1E3B3A', '#3A2A44', '#3D3426', '#233246', '#2E2A4A'];

function listingImage(ctx: Ctx, x: number, y: number, w: number, h: number, seed: number, r = 18) {
  const rand = rng(seed);
  const hue = LISTING_HUES[Math.floor(rand() * LISTING_HUES.length)];
  const g = ctx.createLinearGradient(x, y, x + w, y + h);
  g.addColorStop(0, hue);
  g.addColorStop(1, palette.elevated);
  box(ctx, x, y, w, h, r, { fill: g });
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.clip();
  dot(ctx, x + w * (0.35 + rand() * 0.3), y + h * 0.55, Math.min(w, h) * 0.26, '#FFFFFF14');
  box(ctx, x + w * 0.2, y + h * 0.72, w * 0.6, h * 0.12, 8, { fill: '#FFFFFF10' });
  ctx.restore();
}

function classifiedsFeed(ctx: Ctx) {
  background(ctx, palette.accent);
  statusBar(ctx);
  header(ctx, 'Wakeelek', 'Find it. Sell it.');

  const x = PAD;
  const w = SCREEN_W - PAD * 2;
  box(ctx, x, 184, w, 62, 31, { fill: palette.surface, stroke: palette.line });
  ctx.beginPath();
  ctx.arc(x + 34, 213, 10, 0, Math.PI * 2);
  ctx.strokeStyle = palette.muted;
  ctx.lineWidth = 2.5;
  ctx.stroke();
  text(ctx, 'Search listings', x + 60, 222, { size: 18, color: palette.muted });

  let cx = x;
  cx += chip(ctx, 'All', cx, 268, true) + 10;
  cx += chip(ctx, 'Phones', cx, 268) + 10;
  cx += chip(ctx, 'Furniture', cx, 268) + 10;
  chip(ctx, 'Books', cx, 268);

  const cw = (w - 16) / 2;
  const items: [string, string][] = [
    ['Desk lamp', '$35'],
    ['Road bike', '$220'],
    ['Headphones', '$60'],
    ['Armchair', '$90'],
  ];
  items.forEach(([name, price], i) => {
    const cx2 = x + (i % 2) * (cw + 16);
    const cy = 336 + Math.floor(i / 2) * 272;
    card(ctx, cx2, cy, cw, 256, 22);
    listingImage(ctx, cx2 + 8, cy + 8, cw - 16, 158, i + 3, 16);
    text(ctx, name, cx2 + 16, cy + 200, { size: 18, weight: 600 });
    text(ctx, price, cx2 + 16, cy + 234, { size: 20, weight: 700, color: palette.accent });
    dot(ctx, cx2 + cw - 30, cy + 30, 16, '#07080CAA');
  });

  bottomNav(ctx, 0);
}

function classifiedsDetail(ctx: Ctx) {
  background(ctx, palette.indigo);
  listingImage(ctx, 0, 0, SCREEN_W, 480, 11, 0);
  statusBar(ctx);
  dot(ctx, PAD + 22, 100, 22, '#07080CAA');
  dot(ctx, SCREEN_W - PAD - 22, 100, 22, '#07080CAA');
  for (let i = 0; i < 4; i++) dot(ctx, SCREEN_W / 2 - 27 + i * 18, 450, 4, i === 0 ? palette.fg : palette.muted + '88');

  const x = PAD;
  const w = SCREEN_W - PAD * 2;
  text(ctx, 'Desk lamp', x, 540, { size: 34, weight: 700, font: DISPLAY });
  text(ctx, '$35', x + w, 540, { size: 32, weight: 700, font: DISPLAY, color: palette.accent, align: 'right' });
  text(ctx, 'Posted 2h ago · 1.2 km away', x, 576, { size: 16, color: palette.muted });

  card(ctx, x, 604, w, 88);
  dot(ctx, x + 44, 648, 26, palette.indigo + '88');
  text(ctx, 'Seller', x + 84, 640, { size: 19, weight: 600 });
  text(ctx, 'Verified · OTP', x + 84, 666, { size: 15, color: palette.accent });
  bar(ctx, x + w - 90, 642, 70, 12, palette.faint);

  bar(ctx, x, 724, w, 12);
  bar(ctx, x, 748, w * 0.92, 12);
  bar(ctx, x, 772, w * 0.66, 12);

  button(ctx, 'Chat with seller', x, 840, w - 84, 68);
  box(ctx, x + w - 68, 840, 68, 68, 34, { fill: palette.elevated, stroke: palette.line });
  dot(ctx, x + w - 34, 874, 10, palette.rose);
  bar(ctx, SCREEN_W / 2 - 60, SCREEN_H - 14, 120, 6, palette.muted + '88');
}

function classifiedsChat(ctx: Ctx) {
  background(ctx, palette.accent);
  statusBar(ctx);
  const x = PAD;
  const w = SCREEN_W - PAD * 2;

  dot(ctx, x + 26, 118, 26, palette.indigo + '88');
  dot(ctx, x + 44, 136, 7, palette.accent);
  text(ctx, 'Seller', x + 66, 112, { size: 22, weight: 600 });
  text(ctx, 'Online', x + 66, 138, { size: 15, color: palette.accent });

  card(ctx, x, 172, w, 84, 20);
  listingImage(ctx, x + 12, 184, 60, 60, 11, 12);
  text(ctx, 'Desk lamp', x + 88, 208, { size: 18, weight: 600 });
  text(ctx, '$35', x + 88, 236, { size: 17, color: palette.accent, weight: 600 });

  const bubble = (msg: string, y: number, mine: boolean) => {
    ctx.font = `400 18px ${'"Inter Variable", system-ui'}`;
    const bw = Math.min(ctx.measureText(msg).width + 40, w * 0.78);
    const bx = mine ? x + w - bw : x;
    box(ctx, bx, y, bw, 56, 22, mine ? { fill: palette.accent } : { fill: palette.elevated });
    text(ctx, msg, bx + 20, y + 35, { size: 18, color: mine ? palette.bg : palette.fg });
  };
  bubble('Hi! Is it still available?', 300, true);
  bubble('Yes — pick up today?', 372, false);
  bubble('Perfect, where?', 444, true);

  // Location bubble (maps)
  box(ctx, x, 516, w * 0.72, 200, 22, { fill: palette.elevated });
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x + 8, 524, w * 0.72 - 16, 144, 16);
  ctx.clip();
  ctx.fillStyle = '#10151F';
  ctx.fillRect(x, 516, w, 200);
  ctx.strokeStyle = '#FFFFFF12';
  ctx.lineWidth = 2;
  for (let i = 0; i < 8; i++) {
    ctx.beginPath();
    ctx.moveTo(x + i * 48, 516);
    ctx.lineTo(x + i * 48 - 60, 700);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, 530 + i * 26);
    ctx.lineTo(x + w, 540 + i * 22);
    ctx.stroke();
  }
  ctx.restore();
  dot(ctx, x + w * 0.36, 590, 18, palette.accent + '44');
  dot(ctx, x + w * 0.36, 590, 9, palette.accent);
  text(ctx, 'Shared location', x + 20, 700, { size: 16, color: palette.muted });

  box(ctx, x, SCREEN_H - 110, w - 76, 62, 31, { fill: palette.surface, stroke: palette.line });
  text(ctx, 'Message…', x + 24, SCREEN_H - 71, { size: 18, color: palette.muted });
  dot(ctx, x + w - 31, SCREEN_H - 79, 31, palette.accent);
  text(ctx, '➤', x + w - 31, SCREEN_H - 71, { size: 22, color: palette.bg, align: 'center' });
}

// ─── Borooa: artisan marketplace dashboard (bilingual, RTL) ────────────────

function dashboardHome(ctx: Ctx) {
  background(ctx, palette.accent);
  statusBar(ctx);
  ctx.direction = 'rtl';
  header(ctx, 'لوحة التحكم', 'مرحباً بعودتك', true);

  const x = PAD;
  const w = SCREEN_W - PAD * 2;
  const cw = (w - 14) / 2;
  const stats: [string, string, string][] = [
    ['الطلبات', '128', palette.accent],
    ['المبيعات', '24.6k', palette.indigo],
    ['المنتجات', '342', palette.amber],
    ['الحرفيون', '57', palette.rose],
  ];
  stats.forEach(([label, value, color], i) => {
    const sx = x + (i % 2 === 0 ? cw + 14 : 0);
    const sy = 192 + Math.floor(i / 2) * 136;
    card(ctx, sx, sy, cw, 122);
    icon(ctx, sx + cw - 58, sy + 18, 40, color);
    text(ctx, label, sx + cw - 18, sy + 104, { size: 17, color: palette.muted, align: 'right' });
    text(ctx, value, sx + 18, sy + 50, { size: 32, weight: 700, font: DISPLAY, align: 'left' });
  });

  card(ctx, x, 472, w, 230);
  text(ctx, 'المبيعات الأسبوعية', x + w - 22, 512, { size: 19, weight: 600, align: 'right' });
  lineChart(ctx, x + 22, 540, w - 44, 140, 21, palette.accent, 8);

  text(ctx, 'أحدث الطلبات', x + w, 752, { size: 20, weight: 600, align: 'right' });
  [0, 1].forEach((i) => {
    const y = 772 + i * 76;
    card(ctx, x, y, w, 64, 18);
    icon(ctx, x + w - 56, y + 12, 40, i ? palette.indigo : palette.accent);
    bar(ctx, x + w - 190, y + 26, 118, 12);
    box(ctx, x + 14, y + 16, 84, 32, 16, { fill: palette.accent + '22' });
    text(ctx, 'OTO', x + 56, y + 38, { size: 15, weight: 600, color: palette.accent, align: 'center' });
  });
  ctx.direction = 'ltr';
  bottomNav(ctx, 0);
}

function dashboardOrders(ctx: Ctx) {
  background(ctx, palette.indigo);
  statusBar(ctx);
  header(ctx, 'Orders', 'Borooa dashboard');

  const x = PAD;
  const w = SCREEN_W - PAD * 2;
  let cx = x;
  cx += chip(ctx, 'All', cx, 188, true) + 10;
  cx += chip(ctx, 'Pending', cx, 188) + 10;
  chip(ctx, 'Shipped', cx, 188);

  const orders: [string, string, boolean][] = [
    ['#1042', '$84.00', true],
    ['#1041', '$129.50', false],
    ['#1040', '$42.00', true],
    ['#1039', '$210.00', true],
    ['#1038', '$18.75', false],
    ['#1037', '$66.00', true],
  ];
  orders.forEach(([id, amount, shipped], i) => {
    const y = 256 + i * 100;
    card(ctx, x, y, w, 86);
    listingImage(ctx, x + 14, y + 14, 58, 58, 30 + i, 14);
    text(ctx, id, x + 88, y + 38, { size: 19, weight: 600 });
    text(ctx, amount, x + 88, y + 66, { size: 16, color: palette.muted });
    const color = shipped ? palette.accent : palette.amber;
    box(ctx, x + w - 118, y + 26, 100, 34, 17, { fill: color + '22' });
    text(ctx, shipped ? 'Shipped' : 'Pending', x + w - 68, y + 49, { size: 15, weight: 600, color, align: 'center' });
  });
  bottomNav(ctx, 1);
}

function dashboardProducts(ctx: Ctx) {
  background(ctx, palette.accent);
  statusBar(ctx);
  header(ctx, 'Products', 'Handmade catalog');

  const x = PAD;
  const w = SCREEN_W - PAD * 2;
  ctx.setLineDash([10, 8]);
  box(ctx, x, 186, w, 120, 22, { stroke: palette.accent + '99', lineWidth: 2 });
  ctx.setLineDash([]);
  dot(ctx, x + w / 2, 230, 20, palette.accent + '22');
  text(ctx, '+', x + w / 2, 239, { size: 26, color: palette.accent, align: 'center', weight: 600 });
  text(ctx, 'Upload product images', x + w / 2, 284, { size: 17, color: palette.muted, align: 'center' });

  const cw = (w - 16) / 2;
  for (let i = 0; i < 4; i++) {
    const cx = x + (i % 2) * (cw + 16);
    const cy = 330 + Math.floor(i / 2) * 272;
    card(ctx, cx, cy, cw, 256);
    listingImage(ctx, cx + 8, cy + 8, cw - 16, 150, 50 + i, 16);
    bar(ctx, cx + 16, cy + 180, cw * 0.7, 13, palette.faint);
    bar(ctx, cx + 16, cy + 208, cw * 0.4, 13, palette.accent + '99');
    toggle(ctx, cx + cw - 60, cy + 202, i !== 2, 0.7);
  }
  bottomNav(ctx, 2);
}

const painters: Record<Flavour, ((ctx: Ctx) => void)[]> = {
  tracker: [trackerHome, trackerInsights, trackerForm],
  classifieds: [classifiedsFeed, classifiedsDetail, classifiedsChat],
  dashboard: [dashboardHome, dashboardOrders, dashboardProducts],
};

export const placeholderCount = (flavour: Flavour) => painters[flavour].length;

// ─── Textures ──────────────────────────────────────────────────────────────

function drawCover(ctx: Ctx, img: HTMLImageElement) {
  const scale = Math.max(SCREEN_W / img.naturalWidth, SCREEN_H / img.naturalHeight);
  const w = img.naturalWidth * scale;
  const h = img.naturalHeight * scale;
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, SCREEN_W, SCREEN_H);
  ctx.drawImage(img, (SCREEN_W - w) / 2, (SCREEN_H - h) / 2, w, h);
}

const cache = new Map<string, THREE.CanvasTexture>();

/**
 * Screen texture for a project's nth screen. Starts as a generated placeholder;
 * if `project.screens[index]` loads, it is resized onto the same canvas.
 */
export function getScreenTexture(project: Project, index: number): THREE.CanvasTexture {
  const key = `${project.id}:${index}`;
  const cached = cache.get(key);
  if (cached) return cached;

  const { canvas, ctx } = createCanvas(SCREEN_W, SCREEN_H);
  const list = painters[project.placeholder];
  const paint = list[index % list.length];
  paint(ctx);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  cache.set(key, texture);

  let replaced = false;
  const src = project.screens[index];
  if (src) {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => {
      replaced = true;
      drawCover(ctx, img);
      texture.needsUpdate = true;
    };
    img.src = src;
  }

  // Repaint once web fonts are ready so placeholder text uses Inter / Space Grotesk.
  document.fonts?.ready.then(() => {
    if (replaced || !cache.has(key)) return;
    ctx.clearRect(0, 0, SCREEN_W, SCREEN_H);
    paint(ctx);
    texture.needsUpdate = true;
  });

  return texture;
}

export function disposeScreenTextures() {
  cache.forEach((t) => t.dispose());
  cache.clear();
}
