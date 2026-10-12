export const RULES = { health: 100, stamina: 100, speed: 185, dodgeSpeed: 530, dodgeDuration: 0.19, dodgeCost: 28, dodgeCooldown: 0.65, staminaRegen: 24, swordDamage: 25, swordReach: 83, swordCooldown: 0.38, enemyHealth: 125, enemyDamage: 20, enemyReach: 94, windup: 0.7, recovery: 1.1 };
export function inSwordArc(px: number, py: number, angle: number, ex: number, ey: number): boolean {
  const dx = ex - px, dy = ey - py;
  const difference = Math.atan2(Math.sin(Math.atan2(dy, dx) - angle), Math.cos(Math.atan2(dy, dx) - angle));
  return Math.hypot(dx, dy) <= RULES.swordReach && Math.abs(difference) <= Math.PI / 2.6;
}
export function formUnlockLevels(count: number): number[] {
  if (!Number.isInteger(count) || count < 3 || count > 31) throw new Error('Expected 3–31 forms');
  return Array.from({length: count}, (_, i) => i < 2 ? 1 : Math.round(1 + (i - 1) * 29 / (count - 2)));
}
