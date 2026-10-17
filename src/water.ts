/** Gameplay adaptations, not frame-exact reproductions of anime choreography. */
export const WATER_FORMS = {
  surface: { name: 'Water Surface Slash', windup: 0.16, active: 0.22, recovery: 0.24, stamina: 20, cooldown: 1.4, damage: 35, reach: 95, halfArc: 1.15, advance: 0 },
  wheel: { name: 'Water Wheel', windup: 0.2, active: 0.38, recovery: 0.3, stamina: 32, cooldown: 2.5, damage: 45, reach: 70, halfArc: Math.PI, advance: 190 },
} as const;
export type WaterId = keyof typeof WATER_FORMS;
export function phaseAt(id: WaterId, elapsed: number) {
  const f = WATER_FORMS[id];
  return elapsed < f.windup ? 'windup' : elapsed < f.windup + f.active ? 'active' : elapsed < f.windup + f.active + f.recovery ? 'recovery' : 'done';
}
export function activeProgress(id: WaterId, elapsed: number) {
  const f = WATER_FORMS[id];
  return Math.max(0, Math.min(1, (elapsed - f.windup) / f.active));
}
/** Only distance actually travelled during active time contributes to wheel movement. */
export function advanceBetween(id: WaterId, from: number, to: number) {
  return WATER_FORMS[id].advance * Math.max(0, activeProgress(id, to) - activeProgress(id, from));
}
export function formHits(id: WaterId, elapsed: number, px: number, py: number, angle: number, ex: number, ey: number) {
  if (phaseAt(id, elapsed) !== 'active') return false;
  const f = WATER_FORMS[id], dx = ex - px, dy = ey - py;
  const difference = Math.atan2(Math.sin(Math.atan2(dy, dx) - angle), Math.cos(Math.atan2(dy, dx) - angle));
  return Math.hypot(dx, dy) <= f.reach && Math.abs(difference) <= f.halfArc;
}
