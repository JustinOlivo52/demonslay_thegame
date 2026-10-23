# First boss balance — Hand Demon

Justin's playtest: the first boss was overwhelming and hit too hard for a new recruit. This pass reduces burst damage and improves counterattack/reaction windows while preserving the four attack patterns, halfway frenzy, scarce supplies and timed finishing mechanic.

| Parameter | Before | After |
| --- | --- | --- |
| Health | 430 | 330 |
| Ordinary single hit, normal/frenzy | 28 / 32 | 20 / 22 |
| Heavy single hit, normal/frenzy | 34 / 38 | 24 / 26 |
| Both twin-claw hits, normal/frenzy | 56 / 64 | 24 / 28 total |
| Chase multiplier, normal/frenzy | 1.30 / 1.60 | 1.08 / 1.18 |
| Windup multiplier, normal/frenzy | 1.00 / 0.86 | 1.10 / 1.00; at least 0.68 seconds |
| Recovery multiplier, normal/frenzy | 0.88 / 0.72 | 1.15 / 1.05; at least 1.05 seconds |
| Lunge travel | 190 | 145 |
| Double / heavy step | 45 / 65 | 25 / 45 |
| Locked aim before strike | last 0.38 seconds | last 0.55 seconds |

A 100 HP recruit with no allocated stats now survives four normal 20-damage hits. Each full double-claw sequence costs less than 30% of base health, rather than over half. Enraged pursuit stays below the player's normal 245 speed; committed lunges still require awareness. All attack recoveries allow the existing approximately 0.97-second three-cut combo, though approach/retreat time can require choosing fewer cuts.

No free heal, extra potion, weaker lesser demons, XP change or save reset is introduced. A returning player loads the new tuning on refresh while retaining their checkpoint/progression. The demon still fully regenerates when the existing finishing window expires. Existing save health and scarce supplies remain meaningful.

## Validation

Production TypeScript/Vite build and all 22 test files pass. Two new cases verify novice damage budgets in both phases, all-pattern reaction/recovery limits, escapable chase, bounded lunges, relative heavy tells and unchanged lesser-encounter stats. This is deterministic parameter/logic validation, not a simulated successful browser fight. Browser feel still needs Justin's retest.

## Playtest gate

1. Refresh the build and retry Final Selection with the existing recruit/checkpoint.
2. Check that a mistake leaves time to recover or use a potion, especially the double-claw combo.
3. Watch the heavy tell, dodge its committed direction and punish recovery.
4. Confirm halfway frenzy raises pressure without removing every opening.
5. Finish with F and check the 滅 callout/ash effect.

Record remaining HP, potions used, attempts and which attack caused trouble. If still overwhelming, tune the offending pattern before reducing every enemy. If trivial, increase pressure modestly rather than restoring the old burst damage.

## Next work agenda

1. Review the first-boss retest and address any remaining tutorial blockers.
2. Move the approved breathing-form kits toward campaign unlock/purchase/upgrade menus: two starting forms, remaining forms level-eligible by 30, upgrades through level 50, a skill-point budget separate from existing stat points. Personal technique acquisition rules still require a design decision.
3. Build the first crow mission loop from headquarters: accept, travel to a nighttime encounter, complete, receive rewards and return with saved progress.
4. Keep mobile landscape as a later sandbox-first control/layout prototype; audio remains future owner work.
