import * as THREE from 'three';

export const PHONE = {
  width: 1.3,
  height: 2.72,
  depth: 0.11,
  radius: 0.2,
  bezel: 0.045,
};

export function roundedRectShape(w: number, h: number, r: number): THREE.Shape {
  const x = -w / 2;
  const y = -h / 2;
  const s = new THREE.Shape();
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false);
  s.lineTo(x + w, y + h - r);
  s.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2, false);
  s.lineTo(x + r, y + h);
  s.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false);
  s.lineTo(x, y + r);
  s.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false);
  return s;
}

/** Flat rounded rectangle with UVs normalised to 0..1 (for screen textures). */
export function roundedPlane(w: number, h: number, r: number, segments = 10): THREE.ShapeGeometry {
  const geo = new THREE.ShapeGeometry(roundedRectShape(w, h, r), segments);
  const pos = geo.attributes.position;
  const uv = geo.attributes.uv;
  for (let i = 0; i < pos.count; i++) {
    uv.setXY(i, (pos.getX(i) + w / 2) / w, (pos.getY(i) + h / 2) / h);
  }
  uv.needsUpdate = true;
  return geo;
}

function phoneBody(): THREE.ExtrudeGeometry {
  const bevel = 0.03;
  const { width, height, depth, radius } = PHONE;
  const geo = new THREE.ExtrudeGeometry(
    roundedRectShape(width - bevel * 2, height - bevel * 2, radius - bevel),
    {
      depth: depth - bevel * 2,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 5,
      curveSegments: 20,
    },
  );
  geo.center();
  return geo;
}

interface PhoneGeometries {
  body: THREE.ExtrudeGeometry;
  screen: THREE.ShapeGeometry;
  island: THREE.ShapeGeometry;
  cameraBump: THREE.ShapeGeometry;
  button: THREE.BoxGeometry;
}

let shared: PhoneGeometries | null = null;

/** Geometries shared by every phone (created once, disposed with the scene). */
export function getPhoneGeometries(): PhoneGeometries {
  if (shared) return shared;
  const { width, height, radius, bezel } = PHONE;
  shared = {
    body: phoneBody(),
    screen: roundedPlane(width - bezel * 2, height - bezel * 2, radius - bezel * 0.9, 12),
    island: roundedPlane(0.34, 0.1, 0.05, 6),
    cameraBump: roundedPlane(0.44, 0.44, 0.12, 8),
    button: new THREE.BoxGeometry(0.02, 0.26, 0.05),
  };
  return shared;
}

export function disposePhoneGeometries() {
  if (!shared) return;
  Object.values(shared).forEach((g) => g.dispose());
  shared = null;
}
