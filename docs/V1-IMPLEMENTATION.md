# V1 implementation work packages

Use this alongside the [V1 checklist](../TO-DO.md). The checklist tracks status; this document explains what each part needs. Everything below is planned unless the checklist explicitly marks it implemented. Proposed file names are implementation suggestions, not files already present.

## How to use each package

Complete a small working slice, run relevant checks, deploy it and collect Justin's playtest notes. Record blockers before adding more content. Keep the independent sandbox available. Routine development and publishing are authorized; major scope choices and the final release candidate still receive a concrete review.

Each feature needs its gameplay rules, saved data, UI, art/content, integration and failure handling. A menu mockup or a passing pure-function test alone does not complete a gameplay package. The latest gameplay baseline is PR #19; the first starter-upgrade slice is now implemented, with higher-form purchases/casts in an isolated preview. Full campaign equipment/casting and mastery remain pending. See [FORM-PROGRESSION-01.md](../FORM-PROGRESSION-01.md).

## Dependencies and order

| Package | Needs first | Enables |
| --- | --- | --- |
| 1 · Opening quality | Existing tutorial/sandbox | Stable first-time player experience |
| 2 · Forms and progression | Existing XP/stat saves and four full sandbox kits | Earned form ownership and real campaign use |
| 3 · First crow mission | Stable combat; basic reward/save contracts | Repeatable headquarters → mission → return loop |
| 4 · Regions/time/demons | One working mission and seeded encounter contracts | Investigation variety and Blood Demon Arts |
| 5 · Inventory/Swordsmith | Persistent reward receipts; minimal inventory contract | Useful materials, equipment and preparation |
| 6 · Training/mentor | Agreed form budget, mastery rules and benefit caps | Earned Breath improvements and lessons |
| 7 · Full adventure/trial | All preceding loops stable | Level 1–50 and an earned V1 ending |
| 8 · Release candidate | Complete critical path | Supported, recoverable published V1 |

Package numbers are review milestones, not a ban on shared groundwork. Define the minimal item/reward schema during package 3, then finish inventory/equipment UI in package 5. Define time/region boundaries during package 3, then expand them in package 4. Avoid implementing two incompatible save or combat systems.

## 1. Opening quality and first-boss retest

### Work to perform

- [ ] P1.1 Run the opening with Water, Flame, Thunder and Wind for male/female recruits. Cover tutorial input, consumables, dying/retrying, crow ceremony and headquarters entry.
- [ ] P1.2 Retest the balanced Hand Demon, including normal/frenzy tells, full twin-claw contact, missed attacks, recovery punish windows and the timed finish.
- [ ] P1.3 Test number/numpad/Q/click casting away from spawn, explicit reset versus repeat, tab blur/resume and enter/exit fullscreen.
- [ ] P1.4 Verify reload at each encounter checkpoint and after completion; old tutorial XP cannot be claimed twice.
- [ ] P1.5 Repair blockers in small focused changes and retain before/after reproduction steps.

### Existing integration points

`src/sandbox.ts`, `src/technique-lab.ts`, `src/tutorial.ts`, `src/encounters.ts`, `src/presentation.ts`, `src/hub.ts`. Preserve the newly published boss tuning and 滅 finish callout unless feedback warrants another adjustment.

### Evidence and owner review

Justin records browser/device, style/body, attempts, remaining HP/potions and exact failure steps. Development records the deployed build/commit, checks and unresolved limitations. Browser checks must distinguish real input/animation runs from prepared debug fixtures. Exit: all four opening paths work, and no known save/input/completion blocker remains.

## 2. Breathing ownership, purchases, upgrades and combat integration

### Decisions and data contract

- [ ] P2.1 Write a small balance table per supported style: stable catalog ID, eligibility level, grant/purchase status, rank cap, each rank's cost/requirements and effect.
- [ ] P2.2 Choose skill-point earnings independently of the existing three stat points per level. Calculate cumulative earned versus spent points at every level for all four kit sizes. Final intended upgrades must require 50 and be affordable by 50.
- [ ] P2.3 Define use-based mastery: what earns it, any training prerequisites, caps, whether a hit is required, and whether it gates or improves a purchased rank. Idle casting and free sandbox mode must not farm campaign progress.
- [ ] P2.4 Set personal-technique gates separately from level eligibility. Do not accidentally make Giyu's or Zenitsu's personal technique an automatic ordinary purchase while its acquisition rule is undecided.
- [ ] P2.5 Define versioned saved state for skill earnings/spending, owned forms, ranks, mastery and equipped slots. Use catalog IDs, not displayed names or list indices; Flame IX remains `flame-09`.
- [ ] P2.6 Migrate existing recruits exactly once: credit legitimate earned progression, grant the two starters, preserve stats/HP/tutorial receipts, and avoid crediting sandbox usage.

### Implementation slices

1. **Rules and save transactions:** introduce a proposed `src/form-progression.ts`; implement eligibility, purchase, rank-up, equip, point accounting and validation without depending on rendering.
2. **Playable menu:** extend `src/forms-menu.ts`/CSS with points available, locked reason, owned/rank status, costs, next benefit, purchase/upgrade/equip actions and save-error feedback. Keep descriptions understandable to a player.
3. **Combat bridge:** create a proposed `src/campaign-techniques.ts` backed by existing Water/Flame/Thunder/Wind kits. Connect campaign ownership/equipment to casting and the authored movement/contact/pose/effect system. Reuse tested mechanics; do not copy the full developer lab UI into the tutorial.
4. **Real upgrades:** apply approved rank/mastery effects to real damage/cost/cooldown values once, alongside existing character stat multipliers. Do not increase every property by default or fabricate a benefit that the code does not apply.
5. **Persistence and preview:** reload the same loadout and ranks; provide isolated development fixtures at levels 1, an intermediate unlock, 30, 49 and 50. Fixtures cannot change the saved campaign by default.

### Important edge cases

- Wrong style, insufficient points, locked level, unrevealed forms, personal-technique gate, duplicate purchase and upgrading above cap.
- Stale/double clicks, changing selected form during a cast, equipping while combat is paused, dying or reloading around a purchase.
- Corrupt/old saves and storage failure: spending is only confirmed after a successful validated write.
- Multi-hit casts, zero-damage movement/defense forms, one-hit-per-window rules, Breath shortage and cooldowns.

### Art/UI and review

Use the existing approved pixel poses/effects first. The menu needs readable rank/lock/equipped indicators; cast controls must remain visible with more than two owned forms. Verify both bodies and all four styles. Justin's gate: buy → equip → cast → upgrade → reload, with locked/failed purchases leaving the balance intact. Exit: a paid upgrade affects real campaign combat and survives reload.

## 3. First crow assignment from headquarters and back

### Minimal vertical slice

- [ ] P3.1 Add a real crow mission board to `src/hub.ts`: brief, destination, objective, demon level/danger, rewards, accept/decline and active-assignment status.
- [ ] P3.2 Introduce proposed `src/missions.ts` with a stable assignment ID, generator/version seed, region ID, objective state, discovered clues, encounter state and reward receipt.
- [ ] P3.3 Specify legal state transitions: offered → accepted → active → objective complete → return/claim → rewarded, plus failure/abandon/retry. Do not let a UI button skip authoritative completion.
- [ ] P3.4 Build one authored mission layout with connected exploration spaces and a clue trail to one demon. Start with deterministic content; a live AI call is not needed for this slice.
- [ ] P3.5 Transition from safe daytime headquarters to the nighttime mission and back; preserve recruit/loadout/resources under explicit preparation rules.
- [ ] P3.6 Reuse campaign combat, the existing finish timer/regeneration and the 滅/ash presentation.
- [ ] P3.7 Award XP and a useful material/item using a minimal inventory record and a single assignment reward receipt. Returning/reloading cannot claim it again.
- [ ] P3.8 Decide how defeat, withdrawal and abandonment affect assignment state, consumables and retry. Explain it before imposing a cost.

### Save and recovery

Save acceptance, meaningful investigation/combat checkpoints, completion and reward claim with defined recovery behavior. Define whether loading during combat resumes or restarts that encounter; never duplicate a finished target or silently lose a completed assignment. Tie saves to the recruit identity and schema/generator version. If storage fails, show a recoverable error and avoid a false success.

### Content/art needs

Crow board portrait/idle treatment, destination marker, mission briefing text, clue objects, one navigable region and an existing demon sprite variant. No new cinematic or runtime-generated sprite pipeline is required. Keep the mission objective and return route visible in a small journal/HUD.

### Owner test and exit

Accept, decline, investigate, withdraw, retry, complete, return and claim. Reload before departure, after a clue, after the finish and after payment. Test an exhausted inventory/loadout and failed storage write. Exit: the complete loop gives useful progression and has no duplicated reward.

## 4. Connected regions, time and generated encounters

### Region/content work

- [ ] P4.1 Author a second visually distinct outdoor region and reusable area modules with broad combat clearings, side routes, landmark/clue anchors, spawn/exit points and collision data.
- [ ] P4.2 Define region IDs and travel links for headquarters/main village, mission regions, chosen mentor destination and Swordsmith destination. Save a safe re-entry point, not an unchecked arbitrary coordinate.
- [ ] P4.3 Validate reachability from entry to every required clue, target and exit before offering a mission. Ensure pickups or scenery cannot seal a route.
- [ ] P4.4 Add bounded mission templates: investigate a lone demon, find/clear a small group, and a tougher boss assignment. Vary existing ingredients before adding new objective mechanics.

### Day/night and demon systems

- [ ] P4.5 Implement a proposed `src/world-time.ts` after choosing cycle versus mission-driven advancement, pauses, persistence, lighting readability and sunrise outcomes.
- [ ] P4.6 Use a proposed encounter specification with seed, level, archetype, sprite variant, attack loadout, stats and reward rules. Keep generation deterministic and constrained by region/player progression.
- [ ] P4.7 Display danger/level early enough to allow withdrawal. Define escape boundaries and prevent spawn-ins directly on the player or an exit.
- [ ] P4.8 Add one complete level-10+ Blood Demon Art: windup, visible area tell, active hazard/projectile, cooldown, damage, expiry and counterplay. Keep ordinary melee tells pose-based.
- [ ] P4.9 Set group-size and threat budgets. Mixed enemy attacks must leave viable movement/counterplay, and every group member must be able to reach the fight.

### Art/test requirements

At least two outdoor palettes/landmark sets, consistent ground shadows, readable night lighting and a distinct Blood Demon Art effect. Exercise a batch of fixed seeds for reachability, group caps, deterministic reloads, daytime restrictions and appropriate level/art assignment. Justin compares exploration routes and learns the new art through play. Exit: different missions feel like different places/scenarios without generating impossible layouts.

## 5. Inventory, loadouts and Swordsmith Village

### Data and transaction work

- [ ] P5.1 Introduce proposed `src/inventory.ts` with stable item IDs, quantities, stack caps, currencies/materials and equipment instances/upgrade levels where needed.
- [ ] P5.2 Define the starting item set: healing consumable, mission material, weapon and armor with explicit effects. Keep the first equipment set small enough to balance.
- [ ] P5.3 Define acquire/use/equip/unequip/upgrade operations, their legal locations and a versioned save migration.
- [ ] P5.4 Apply effective stats from base attributes + equipment + training + form effects in one consistent calculation; document additive versus multiplicative behavior and caps.
- [ ] P5.5 Make a reward claim and its inventory/currency effects one coherent saved transaction. A failed write or repeated request cannot consume materials twice or duplicate equipment.

### Room and smith UI

Room: inventory, item descriptions, equipped slots, potion preparation and save status. Swordsmith: a traversable destination/interactable, one material-backed upgrade path, current/next effect, affordability and confirmation/result feedback. Show full stacks, unavailable actions and capped upgrades clearly. Do not hide progression rules behind flavor text.

### Tests and owner gate

Test stack limits, unknown items, consuming only when useful, swapping gear, derived stat recalculation, insufficient materials, max upgrades and reload at transaction boundaries. Justin earns materials in a mission, returns, upgrades and compares the effect in a real fight. Exit: rewards feed back into useful preparation without invalidating the combat balance.

## 6. Earned training and chosen mentor

- [ ] P6.1 Define a short lesson/challenge per supported style using its real movement, timing or resource-management identity, rather than a universal reward button.
- [ ] P6.2 Store completed lesson IDs, repeat rules, Breath capacity/control benefits and mastery rewards within the agreed progression budget.
- [ ] P6.3 Connect a real mentor destination/lesson UI, level requirements and explanatory dialogue. Water/Flame/Wind mentors and Thunder's former-Hashira instructor must use accurate roles.
- [ ] P6.4 Separate campaign training from the developer sandbox: no earned XP, skill/mastery points or Breath rewards in free preview mode.
- [ ] P6.5 Define whether V1 adds a universal block. If retained for later, label current form-specific defenses accurately and test their active windows, range and direction.
- [ ] P6.6 Verify saved benefits affect capacity/control without granting unlimited Breath or changing potion/weapon values unexpectedly.

Art/content: a small mentor training area, instructor sprite/portrait/dialogue, objective/status indicators and success/failure feedback. Tests: locked lessons, failed attempts, one-time receipts, bounded repeat training and reload. Justin's gate: complete a lesson and observe the promised combat benefit. Exit: mentor/training visits are playable progression, not destination introductions.

## 7. Level-1–50 content and the Hashira promotion trial

### Proposed progression bands for content planning

| Band | Required purpose | Content/checks to prepare |
| --- | --- | --- |
| 1–4 | Learn the combat loop | Existing tutorial and revised Hand Demon |
| 5–9 | First independent assignments | Basic investigation/group variety, preparation and early form purchases |
| 10–19 | Read Blood Demon Arts | Introduce art counterplay, earned training and useful equipment progression |
| 20–29 | Combine the systems | Harder assignments, broader form access and resource tradeoffs |
| 30–49 | Refine a complete style | Upgrade/mastery goals, demanding boss missions and varied level-appropriate rewards |
| 50 | Earn promotion | Dedicated Hashira trial and saved completion state |

These bands specify pacing goals, not implemented mission counts or new unlock promises. Decide and test the required assignment variety and target session length before promising a fixed-length campaign.

### Implementation/content work

- [ ] P7.1 Build XP/reward/difficulty tables for each band and calculate expected earned levels/points across the campaign. Replaying an old tutorial receipt cannot be the route to level 50.
- [ ] P7.2 Create repeatable legitimate mission assignment issuance with anti-duplicate per-assignment receipts, plus milestone/boss missions. Avoid making every stage a numerical copy of the same fight.
- [ ] P7.3 Balance empty/typical/strong loadouts across all four styles, both attack and defensive/mobility forms, consumables, retreat and failed finishing windows.
- [ ] P7.4 Author a Hashira trial brief, entry check, arena/objectives, boss/phase behavior, completion check and retry policy.
- [ ] P7.5 Persist promotion only after actual success; add the V1 completion scene/journal entry and a stable return-to-hub/continue state.
- [ ] P7.6 Test milestone fixtures and then the earned end-to-end path. Level 50 eligibility is not promotion itself.

Art/content: a trial arena, readable trial opponent/phase presentation and completion/crow/journal text. Reuse proven combat systems before adding a new final-boss engine. Exit: a new recruit earns the full V1 ending without developer overrides; Muzan/Upper Rank story scope stays in the later-version queue.

## 8. Release, recovery and presentation pass

### Save and settings

- [ ] P8.1 Version and migrate profile, tutorial, form, inventory, training, mission/time and promotion data as one documented save boundary; define supported older versions and safe recovery messages.
- [ ] P8.2 Add export/import with validation, recruit identity handling, corrupt/unsupported-file feedback and an intentional replace-save flow. A backup cannot silently become a reward duplication tool.
- [ ] P8.3 Add key remapping and effect/display settings with reset-to-default and saved preferences; clarify unsupported fullscreen environments.
- [ ] P8.4 Check keyboard focus, modal pausing, small supported desktop viewports, readable text/contrast, and essential visual combat cues. Audio remains owner-deferred.

### Verification matrix

Use real browsers on declared supported platforms. The primary playtest path is a clean recruit → tutorial → headquarters → purchase/equip/train → mission → rewards/upgrade → reload → level-band progression → trial → completed save.

For each release candidate, record: commit/build URL; OS/browser and device; body/style; test path; observed result; blocking issue; reproduction; fix verification. Include fresh saves and migrated saves. Separate prepared debug fixtures from earned full playthroughs. A build/test pass cannot substitute for game feel or rendering checks.

- [ ] P8.5 Test saves/reward transactions under reload, invalid input and storage failure; verify missing assets or unavailable services give useful feedback.
- [ ] P8.6 Measure representative travel, group combat and heavy elemental effects against an agreed minimum device/frame-rate target. Fix repeatable performance blockers and input/collision traps.
- [ ] P8.7 Run clean install, automated mechanics/transaction checks, production build and deployed asset-path checks. Keep a reproducible manual playtest checklist even when automation is unavailable.
- [ ] P8.8 Update setup/controls, release notes, known limitations, local-save guidance and recovery instructions. Verify the repository/Codespaces setup independently from this chat workspace.
- [ ] P8.9 Justin reviews the release candidate. Publish/tag that exact reviewed V1 build and retain a known-good source/build reference for rollback.

Exit: the critical path works for all supported styles/bodies and supported browsers, no known crash/save-loss/impossible-progression blocker remains, and the release has explicit limitations.

## Shared implementation rules

- Separate authored/catalog definitions, pure gameplay rules, persistent transactions, Phaser scenes and UI where it helps reuse/testing. Keep APIs small; do not add a backend just to store a local single-player state.
- Reuse stable form, region, item, lesson and assignment IDs. Version generators/saves so a changed seed algorithm does not corrupt an accepted mission.
- Maintain bounded resource/cost/damage rules and explain meaningful tradeoffs in the UI. Keep debug labels and generator internals out of player-facing mission flows.
- Add tests for real failure risks and rules; use playtests for animation/readability. Do not write large suites that only assert implementation details.
- Keep feature checkpoints reviewable with links to the deployed build. Bound GitHub write attempts and verify success before claiming publication.
- Live AI, mobile landscape, multiplayer, additional style expansion and the Muzan campaign retain their later-version status from the main checklist. None is silently implemented or required by this document.

## What Justin needs to provide

**At each checkpoint:** browser/device, what was tested, expected/actual behavior, reproducible steps, and feedback on visuals, controls and difficulty. Screenshots/recordings are helpful when a visual issue can be captured.

**For planning choices:** feedback on progression pace, personal-technique access, death/retry consequences and general-block scope when a concrete proposal is ready.

**Later assets:** sound/music when ready and any preferred visual references. Development handles the current pixel assets, procedural effects, code/content scaffolding and verification. Unprovided audio does not block silent V1 playtests.
