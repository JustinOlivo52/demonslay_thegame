# Character progression — first playable pass

## Rules

- XP is awarded on a successful timed finisher, not when a demon merely reaches zero HP. Each tutorial encounter rewards XP once per recruit: 40, 60, 125, 225.
- XP required for the next level starts at 100 and rises by 25 each level. The framework caps at level 50; level 50 does not automatically grant Hashira rank.
- Each level-up fully restores health to the current maximum and grants three stat points. It does not refill potions, Breath or stamina.
- A fresh recruit reaches level 2 after encounter two, level 3 after encounter three, and level 4 after finishing the Hand Demon. The tutorial cannot supply enough XP to reach level 50; missions must provide the later progression.
- Open **Stats** in the tutorial or **Character stats** in headquarters. Gameplay pauses while the dialog is open. Allocations are permanent in this first pass.

| Stat | Per point |
| --- | --- |
| Vitality | +10 maximum health |
| Endurance | +8 maximum stamina |
| Strength | +3% of base sword-combo damage |
| Focus | +2% of base breathing-form damage |

Each stat accepts at most 50 points. Damage bonuses apply to the base hit then round to the nearest integer. Increasing a resource cap adds only that cap increase to its current value, preserving missing health/stamina; spending a point does not trigger another full refill. Potions restore up to 45 HP, bounded by the upgraded health maximum.

Stat points are distinct from the future skill points for form purchases/upgrades. This pass does not award or spend that future currency, unlock additional casts, change the planned form-eligibility schedule through level 30, or implement Breath training. One selected style and two starting forms remain the current playable loadout.

## Saves and retries

Progression is stored inside the existing selection checkpoint, matched to recruit identity. XP, reward receipts, health and stats save together. Older saves without progression receive credit for previously completed encounters; if this grants levels, health is restored during migration. A save already containing progression is validated rather than granted the migration again. Spent/unspent points must match the earned level budget; invalid progression is rejected by the existing run reader.

Replay tutorial retains the recruit’s growth and one-time encounter receipts: replay is practice, with no extra XP or level-up heals for old encounters. Retry/reload retain checkpoint progression. The sandbox grants no progression. To test the fresh level-1 balance, create a recruit with a different name/body/style identity. This remains one current recruit rather than multiple save slots.

Stat allocation writes the new checkpoint before committing the runtime change. If storage fails, the stat and point budget remain unchanged and the dialog reports the error. Existing browser-storage limitations still apply to ordinary checkpoint writes; clearing site data removes saves.

## Verification

Pure tests cover early tutorial leveling, multiple-level XP awards, the level-50 boundary, point budgets, attribute effects, invalid allocations, legacy migration, upgraded health/potion caps and duplicate reward prevention. Browser tests use downed-encounter fixtures followed by real F inputs to verify XP/refills, real sword/form hits for damage bonuses, resource limits, paused dialog input, persistent upgrades, forced-save rollback, headquarters level display and replay deduplication. This is not a new full combat-difficulty playthrough; owner feedback should judge the level-3 boss pacing.
