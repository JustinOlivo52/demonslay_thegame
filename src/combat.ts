export const RULES = { health: 100, stamina: 100, speed: 245, dodgeSpeed: 610, dodgeDuration: 0.19, dodgeCost: 28, dodgeCooldown: 0.48, staminaRegen: 24, swordDamage: 25, swordReach: 83, swordCooldown: 0.38, enemyHealth: 125, enemyDamage: 20, enemyReach: 94, windup: 0.7, recovery: 1.1 };
export function inSwordArc(px: number, py: number, angle: number, ex: number, ey: number): boolean {
  const dx = ex - px, dy = ey - py;
  const difference = Math.atan2(Math.sin(Math.atan2(dy, dx) - angle), Math.cos(Math.atan2(dy, dx) - angle));
  return Math.hypot(dx, dy) <= RULES.swordReach && Math.abs(difference) <= Math.PI / 2.6;
}
export function formUnlockLevels(count: number): number[] {
  if (!Number.isInteger(count) || count < 3 || count > 31) throw new Error('Expected 3–31 forms');
  return Array.from({length: count}, (_, i) => i < 2 ? 1 : Math.round(1 + (i - 1) * 29 / (count - 2)));
}

/** Tap during a slash to buffer one follow-up. The third hit ends the chain. */
export const SWORD_COMBO=[
 {name:'Opening cut',windup:.055,active:.10,recovery:.11,damage:18,reach:70,arc:1.05,advance:10},
 {name:'Returning cut',windup:.045,active:.11,recovery:.12,damage:23,reach:77,arc:1.2,advance:12},
 {name:'Driving cut',windup:.08,active:.14,recovery:.21,damage:32,reach:88,arc:.85,advance:18},
] as const;
export function comboIndex(previous:number,timeLeft:number){return timeLeft>0?(previous+1)%3:0;}
export function breathCapacity(trainingRank=0){return 100+Math.max(0,Math.min(10,Math.floor(Number.isFinite(trainingRank)?trainingRank:0)))*10;}
