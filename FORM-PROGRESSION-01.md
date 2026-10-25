# Breathing progression 01 — first playable saved-upgrade loop

## Delivered scope

Normal Final Selection and headquarters now expose a breathing upgrade menu backed by the recruit's existing save. The two granted starter forms can be upgraded and their real tutorial damage includes the rank bonus alongside Focus. Existing character stat points remain separate.

The complete progression checkpoint is not finished: equipping/purchasing higher forms for normal campaign combat is still the next slice. The campaign menu deliberately prevents those purchases. A separate progression preview allows eligible ordinary forms to be purchased, upgraded and cast with the already implemented full kits without changing the recruit save.

## Rules for this first pass

| Rule | Value |
| --- | --- |
| Skill earnings | 3 SP per level after level 1; 147 total at 50 |
| Starting ownership | Exactly two chosen-style forms at rank 1, free |
| New ordinary form | 2 SP after the catalog's level requirement |
| Rank cap | 5 |
| Rank 2 | Level 2; 1 SP; +8% base form damage |
| Rank 3 | Level 10; 2 SP; +16% base form damage |
| Rank 4 | Level 25; 3 SP; +24% base form damage |
| Rank 5 | Level 50; 4 SP; +32% base form damage |

Rank bonuses multiply the form's base damage before final rounding, alongside the existing Focus multiplier. Costs/cooldowns/range are unchanged. Skill balance is derived from earned levels minus validated ownership/rank costs, so old saves receive earned credit without a repeated migration award. A paid form starts at rank 1 and upgrades from there. The budget is deliberately an initial, generous pass; different kit sizes leave different unused points and broader campaign pacing still needs balancing. Final rank requires level 50 rather than implying every point must be spent.

Water IX remains a mobility form: it can be purchased/cast in the preview, but rank upgrades are disabled until a real non-damage benefit is defined. Water XI and Thunder VII remain special-lesson gated, and Flame VI–VIII remain unavailable. No use-based mastery, mentor rewards or special-lesson grants are invented in this checkpoint.

## Normal recruit playtest

1. Refresh, create/continue a recruit and enter Final Selection.
2. Finish encounters normally. Existing tutorial XP reaches level 4; a level-2 recruit has 3 skill points, independent of stat points.
3. Open **Form catalog**. Check the skill balance, owned starters, rank/cost, and next level requirement.
4. Upgrade a starter to rank 2, close the dialog and use it against a demon. Its damage gains 8% before rounding/Focus scaling.
5. Reload the same checkpoint. Ownership/rank/skill balance should persist; health/potions/stat allocations should not be reset by the upgrade.
6. At headquarters, open **Breathing upgrades** to review the same saved state. Mission XP beyond the existing tutorial is future work; do not replay old receipts to farm levels.

Allocations are permanent in this build. A failed save reports that points were not spent. The current battle pauses while its modal is open and clears input on return.

## Isolated progression preview

Open `?progression-lab=1&style=water` (or flame/thunder/wind), also linked from the full sandbox's **Progression preview** link.

- A separate in-memory level-1 profile starts with only the two granted forms.
- Choose level 5, 10, 30, 49 or 50 to reset the preview to that level and its earned point budget. This intentionally discards prior preview purchases/ranks.
- Open **Form purchases and upgrades**, purchase an eligible ordinary form, then upgrade it within the level/point rules.
- Close the menu, choose its number/card + Q, and cast. Use **Place target ahead** between actions to help line up a stationary test.
- Free forms is disabled: Breath, cooldowns, ownership and upgrade damage apply. Refill and New round remain developer conveniences and do not grant skill points.
- Level 49 cannot buy rank 5; level 50 can. Personal gates, unrevealed slots and Water IX rank restrictions remain enforced.
- Refresh resets preview changes. No localStorage writes, earned campaign rewards or recruit modification occur in this mode. Ordinary free practice remains unchanged.

## Implementation and persistence

`src/form-progression.ts` owns grants, eligibility, costs, ranks, validation, derived skill budget and save-before-publish transactions. `Progression` adds optional versioned `breathing` state containing the chosen style and owned rank map. Old saves without that field retain all existing data and derive the two free starters. Reading rejects invalid ranks, early ownership/upgrades, wrong-style IDs, unavailable techniques and overspending; recruit-key/style consistency is checked by the tutorial loader.

The shared form menu exposes requirements, errors and benefits. Tutorial and headquarters save the complete run snapshot before adopting an upgraded state; a failed write leaves the previous state and points intact. The preview uses the same rules/menu and full lab mechanics with its own in-memory profile.

## Verification

Production TypeScript/Vite build and all **25 test files** pass. New cases cover legacy credit, stat/skill separation, one-time tutorial receipts, rising rank/level costs, budget affordability for supported ordinary damage forms, personal/unrevealed/mobility restrictions, corrupt saves, storage-failure atomicity and run reload. Actual tutorial cast methods were executed with a rendering-free harness for all four styles to verify Focus and rank damage are applied once to real contact. Actual menu methods were exercised with DOM stubs for spending, disabled campaign purchases, preview purchases and errors; the preview scene's actual cast path verifies ownership, resource costs and scaled full-kit damage without writes.

These are logic/DOM-stub checks, not rendered browser verification. Chromium still fails at launch with an OS permission error. Justin should test menu layout/focus, save/reload and feel in the deployed build. The existing bundle-size warning remains.

## Next slice

Campaign loadout slots and the complete-kit combat bridge; consistent higher-form poses/effects/defenses in normal encounters; approved personal-technique acquisition rules; use-based mastery/training; and mission XP beyond level 4. Retest first-slice storage/controls before broadening ownership/equipment behavior.
