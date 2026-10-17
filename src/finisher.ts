/** Provisional tuning: zero HP opens a four-second finish window. */
export const FINISHER = { threshold: 0, window: 4, reach: 90 } as const;
export function canFinish(downed: boolean, remaining: number, distance: number): boolean {
  return downed && remaining > 0 && distance <= FINISHER.reach;
}
