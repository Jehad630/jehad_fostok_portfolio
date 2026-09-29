import type { FragmentKind } from '../textures/fragments';

type Vec3 = [number, number, number];

export interface PhoneSlot {
  /** Index into `projects` from the data file. */
  project: number;
  /** Which of that project's screens to show. */
  screen: number;
  position: Vec3;
  rotation: Vec3;
  scale?: number;
  brightness?: number;
}

export interface FragmentSlot {
  kind: FragmentKind;
  position: Vec3;
  width: number;
  rotation?: Vec3;
}

/** Hero composition: a loose cluster to the right of the headline. */
export const desktopPhones: PhoneSlot[] = [
  { project: 0, screen: 0, position: [2.9, 0.1, 0.6], rotation: [0.04, -0.38, 0.05], scale: 1.05, brightness: 1.05 },
  { project: 1, screen: 0, position: [5.2, -0.8, -1.4], rotation: [0.08, -0.52, -0.07], brightness: 0.9 },
  { project: 2, screen: 0, position: [1.0, 1.9, -3.2], rotation: [-0.06, -0.22, 0.12], brightness: 0.8 },
  { project: 0, screen: 1, position: [6.6, 1.7, -4.4], rotation: [0.02, -0.6, 0.1], brightness: 0.7 },
  { project: 1, screen: 2, position: [-1.4, 3.6, -9], rotation: [0.12, 0.3, -0.1], brightness: 0.55 },
];

/** Portrait / mobile: fewer phones, pushed up and back so the headline stays readable. */
export const mobilePhones: PhoneSlot[] = [
  { project: 0, screen: 0, position: [0.1, 2.15, -1.5], rotation: [0.05, -0.28, 0.05], scale: 0.75, brightness: 1 },
  { project: 1, screen: 0, position: [-1.75, 1.95, -4], rotation: [0.05, 0.35, -0.06], scale: 0.75, brightness: 0.7 },
  { project: 2, screen: 0, position: [1.95, 1.75, -4.5], rotation: [0.02, -0.45, 0.08], scale: 0.75, brightness: 0.65 },
];

export const desktopFragments: FragmentSlot[] = [
  { kind: 'stat', position: [4.5, 1.55, 1.3], width: 1.35, rotation: [0, -0.3, 0.03] },
  { kind: 'toggle', position: [1.45, -1.25, 1.5], width: 1.05, rotation: [0, -0.2, -0.04] },
  { kind: 'chips', position: [4.1, -2.1, 1.0], width: 1.45, rotation: [0, -0.3, 0.02] },
  { kind: 'notification', position: [2.2, 2.25, -0.2], width: 1.45, rotation: [0, -0.25, -0.02] },
  { kind: 'fab', position: [4.0, -0.35, 1.9], width: 0.42 },
  { kind: 'chart', position: [6.9, -0.4, -0.6], width: 1.0, rotation: [0, -0.45, 0] },
  { kind: 'widget', position: [-0.2, 0.5, -2.2], width: 0.9, rotation: [0, 0.2, 0] },
  { kind: 'button', position: [6.0, -2.3, 0.3], width: 1.05, rotation: [0, -0.4, 0] },
];

export const mobileFragments: FragmentSlot[] = [
  { kind: 'stat', position: [1.2, 2.75, -0.5], width: 0.8, rotation: [0, -0.2, 0.03] },
  { kind: 'toggle', position: [-1.15, 2.55, -0.2], width: 0.72 },
  { kind: 'fab', position: [0.95, 1.2, 0.5], width: 0.3 },
  { kind: 'chips', position: [-0.9, 1.3, 0.2], width: 0.9 },
];
