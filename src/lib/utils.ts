import type { RigidBody } from '@dimforge/rapier3d-compat';

export function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export type Obstacle = { x: number; z: number; y: number };
export type PhysicalObstacle = Obstacle & { rigidBody?: RigidBody };
