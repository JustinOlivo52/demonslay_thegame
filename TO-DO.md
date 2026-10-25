# V1 completion checklist

This is the current source of truth for remaining V1 work. For the implementation breakdown, dependency order, data/UI/art needs and failure cases for every checkpoint, read [V1 implementation work packages](docs/V1-IMPLEMENTATION.md). Earlier task notes are archived in [docs/TO-DO-HISTORY.md](docs/TO-DO-HISTORY.md); individual checkpoint reports remain historical evidence, not current task status.

## What counts as V1

A small, complete single-player browser action RPG: create a recruit, survive Final Selection, enter Corps headquarters, explore connected regions, accept and complete crow missions, earn equipment/materials/XP, train and improve one chosen breathing style, save/resume, reach level 50 and pass the Hashira promotion trial. The trial is V1's completion milestone; reaching level 50 alone does not confer Hashira rank. The later Muzan campaign is not V1's ending.

Carry forward the four existing playable styles: Water, Flame, Thunder and Wind. Other styles may follow their own review checkpoints without blocking this first complete adventure. Names in the 14-style reference catalog do not imply playable content. One style per recruit; two starting forms free; other forms level-eligible through 30, purchased with skill points; increasingly expensive upgrades through 50. Special/personal-technique acquisition rules must be settled before campaign access is enabled.

**Status key:** checked means implemented, not automatically browser-verified. An unchecked playtest remains a release gate even when the related code exists. No percentage-complete or calendar deadline is assumed.

## Foundation already implemented

- [x] TypeScript/Phaser/Vite browser project, GitHub repository and Netlify deployment workflow.
- [x] Pixel-art direction, male/female recruits and style-based outfits.
- [x] Character creation, local backstory templates, chosen style and saved profile.
- [x] Connected Final Selection tutorial, three lesser-demon encounters and Hand Demon boss.
- [x] Intro/control lessons, limited healing supplies, passing ceremony, crow and headquarters handoff.
- [x] Basic movement, sword combos, stamina dodge, Breath, enemy melee patterns and timed finishing/ash.
- [x] Successful finish callout uses 滅.
- [x] Tutorial XP, level-up health restoration and three spendable character stat points per level.
- [x] Local checkpoint/progression migration and duplicate tutorial reward protection.
- [x] Explorable headquarters courtyard and room, save journal and destination introductions.
- [x] Separate developer sandbox with free casting, slow motion, combat/reset/refill, pause and optional fullscreen.
- [x] All 33 numbered/revealed techniques implemented in sandbox kits: Water 11, Flame 6 (I–V, IX), Thunder 7, Wind 9.
- [x] Sandbox casting/reset-position fixes published in PR #17; finish text/mobile roadmap in PR #18.
- [x] Novice Hand Demon rebalance published in PR #19: 330 HP, lower burst damage and clearer openings.

**Still missing:** a complete sandbox kit is not campaign ownership, training, purchases or a level-1–50 adventure. Destination introductions are not playable mission/training/crafting systems. The current tutorial reward path reaches level 4; the level-50 cap is a framework, not yet a full campaign.

## Checkpoint 1 — close tutorial and sandbox feedback

[Detailed work package 1](docs/V1-IMPLEMENTATION.md#1-opening-quality-and-first-boss-retest)

Development:

- [ ] Resolve any remaining bugs from the revised Hand Demon playtest, especially twin-claw damage, frenzy, recovery and potion pressure.
- [ ] Verify off-center casting, fight start, explicit target placement, pause/resume, fullscreen and reload in the deployed build.
- [ ] Confirm 滅 renders correctly on the tested browser/device.
- [ ] Ensure both recruit bodies and all four starter styles can complete Final Selection and reach headquarters.
- [ ] Keep development-only cheats, free forms and reward fixtures out of normal progression.

Justin's checkpoint: retry the balanced boss; record attempts, remaining health, potions used and troublesome attacks. Overall sandbox feedback was positive; the newly balanced boss still needs its own confirmation.

Done when: the opening can be completed and resumed without a blocking issue, with a challenging but fair first boss.

## Checkpoint 2 — breathing ownership, purchases and upgrades (next development task)

[Detailed work package 2](docs/V1-IMPLEMENTATION.md#2-breathing-ownership-purchases-upgrades-and-combat-integration)

Rules and saves:

- [ ] Define a skill-point award/budget separate from existing character stat points; show both clearly.
- [ ] Keep exactly two starting forms granted for the chosen style.
- [ ] Use the existing evenly spaced eligibility levels through 30. A level unlock alone must not grant ownership.
- [ ] Set purchase prices, upgrade ranks and increasing upgrade costs; make the full intended style affordable by 50 while requiring level 50 for final completion.
- [ ] Decide how use-based mastery and earned training interact with purchased ranks before adding either; do not silently substitute stat points or free sandbox practice.
- [ ] Define campaign access for personal techniques such as Dead Calm and Thunder VII; keep unavailable/unrevealed forms disabled.
- [ ] Persist ownership, rank, skill points and equipped forms; migrate existing recruits without deleting progress or duplicating points.
- [ ] Reject invalid/duplicate purchases, wrong-style ownership, insufficient points and out-of-range ranks.
- [ ] Commit saves before confirming spending; storage failure must leave points and ownership intact.

Menu and combat:

- [ ] Replace the reference-only catalog with level requirements, owned/locked states, costs, rank, benefits and purchase/upgrade actions.
- [ ] Let players equip owned forms and identify their cast controls without relying on sandbox links.
- [ ] Integrate approved complete technique mechanics, poses and elemental effects into campaign encounters for all four V1 styles.
- [ ] Apply rank benefits to actual combat and display the resulting values consistently.
- [ ] Pause combat/input while the form menu is open; restore focus cleanly on close.
- [ ] Provide an isolated progression test fixture for representative levels, including 30 and 50, without granting campaign rewards.

Justin's checkpoint: purchase an eligible form, equip/cast it, upgrade it, reload and confirm the same points/ownership/benefits; try locked and unaffordable actions.

Done when: earned progression changes usable campaign forms and survives save/reload; sandbox access remains independent.

Current state: authorized and inspected, **not implemented yet**. This checklist does not mark the pending progression work as complete.

## Checkpoint 3 — first complete crow mission loop

[Detailed work package 3](docs/V1-IMPLEMENTATION.md#3-first-crow-assignment-from-headquarters-and-back)

- [ ] Build a crow assignment UI with objective, destination, demon level/danger and expected rewards.
- [ ] Create a persistent assignment ID/seed with explicit accepted, active, completed, failed/abandoned and rewarded states.
- [ ] Launch one complete mission from headquarters into a connected nighttime region.
- [ ] Support investigation across connected spaces, leading to one demon or a small group; tutorial encounters remain investigation-free.
- [ ] Let the player escape/withdraw under clearly defined rules.
- [ ] Decide failure, retry, abandonment and death costs before adding penalties.
- [ ] Complete the timed finish, return to the crow and award XP plus at least one useful item/material reward.
- [ ] Prevent reload/repeated claims from duplicating a single assignment's rewards; new legitimate missions can award progression.
- [ ] Persist active mission, investigation, outcome and reward state across reloads.

Justin's checkpoint: accept → travel → investigate → fight/escape → finish → collect rewards → return; reload during the mission and after reward collection.

Done when: one ordinary mission can be completed from headquarters and back with useful, saved rewards.

## Checkpoint 4 — semi-open world, time and encounter variety

[Detailed work package 4](docs/V1-IMPLEMENTATION.md#4-connected-regions-time-and-generated-encounters)

- [ ] Make at least two distinct connected outdoor mission regions with room to explore, dodge and fight; avoid interchangeable single-panel corridors.
- [ ] Establish traversable links among headquarters/main village, mission departures, selected mentor area and Swordsmith destination.
- [ ] Add landmarks, branching routes, restrained pickups and readable boundaries/collision.
- [ ] Implement day/night transitions and settle cycle timing versus mission-driven time advancement before building the time system.
- [ ] Keep demons unavailable in daytime; determine sunrise/mission-ending behavior and communicate it to the player.
- [ ] Show demon levels/danger before commitment so fighting versus retreat is meaningful.
- [ ] Generate deterministic encounters from tested demon archetypes, levels, attack sets and existing sprite variants.
- [ ] Add a bounded group encounter and level-scaled mission rules that avoid unfair enemy combinations.
- [ ] Add at least one tested Blood Demon Art encounter for level-10+ demons; teach its tell/counterplay and reserve area warnings for those arts.
- [ ] Make the investigation objective, next route and escape destination understandable without exposing generator implementation details.

Justin's checkpoint: compare regions, investigate different scenarios, choose an escape, and learn one Blood Demon Art through readable feedback.

Done when: missions feel like exploring distinct places, with understandable time rules and more than one combat scenario.

## Checkpoint 5 — room, inventory and Swordsmith upgrades

[Detailed work package 5](docs/V1-IMPLEMENTATION.md#5-inventory-loadouts-and-swordsmith-village)

- [ ] Add persistent inventory, stack limits and safe item descriptions.
- [ ] Support usable healing items and an equipped mission loadout from the player's room.
- [ ] Add a small set of weapons/armor with clear stat effects and no accidental double-applied bonuses.
- [ ] Define material/currency rewards and at least one useful Swordsmith upgrade path.
- [ ] Make Swordsmith interaction playable: inspect upgrade, pay materials/currency, apply improvement and save.
- [ ] Show item/material requirements, insufficient-resource states and upgrade caps.
- [ ] Keep purchase/equip/crafting transactions atomic on save failure and prevent duplicate mission rewards.
- [ ] Balance supplies and equipment so preparation matters without trivializing breathing progression.

Justin's checkpoint: earn materials, upgrade a weapon, equip armor/potions, start a mission and reload to verify inventory/stat consistency.

Done when: mission rewards improve preparation and performance through a complete, saved equipment loop.

## Checkpoint 6 — earned training and mentor interaction

[Detailed work package 6](docs/V1-IMPLEMENTATION.md#6-earned-training-and-chosen-mentor)

- [ ] Turn the training destination into earned lessons/challenges distinct from the free developer sandbox.
- [ ] Let completed training improve Breath capacity/control within explicit caps and costs.
- [ ] Define mastery/use progress and repeat-reward rules in line with checkpoint 2's budget.
- [ ] Add a playable introduction/lesson at the chosen style's mentor destination; Thunder uses Jigoro as a former Hashira instructor.
- [ ] Gate lessons by level/progress and communicate why a lesson is unavailable.
- [ ] Decide whether a general block belongs in V1. Existing form-specific defenses must remain accurately described; do not present them as an implemented universal block.
- [ ] Verify saved training benefits affect real combat, without awarding progress in free sandbox mode.

Justin's checkpoint: complete a lesson, observe a real improvement, reload and confirm repeat practice cannot duplicate a one-time reward.

Done when: training and mentor visits produce clear, bounded progression rather than informational panels.

## Checkpoint 7 — a complete level-1–50 adventure and Hashira trial

[Detailed work package 7](docs/V1-IMPLEMENTATION.md#7-level-150-content-and-the-hashira-promotion-trial)

- [ ] Extend legitimate mission XP/rewards beyond the tutorial's level-4 endpoint.
- [ ] Define level bands and enough objective, region, enemy and boss variety to avoid one repeated grind through 50.
- [ ] Tune skill/stat earnings, equipment, Breath costs, encounter strength and healing across low, middle and high levels.
- [ ] Include difficult but fair boss assignments before promotion; existing Upper Rank story bosses are later content unless separately scoped.
- [ ] Build the level-50 Hashira trial with clear entry requirements, completion rules and retry behavior.
- [ ] Persist earned promotion only after passing, with a V1 completion scene/journal entry and a stable post-completion state.
- [ ] Keep later Muzan/story ambitions separate from V1 completion.

Justin's checkpoint: review prepared level-band fixtures, then complete the full earned path and promotion trial without bypassing reward rules.

Done when: a new recruit can earn level 50 and Hashira promotion through playable content, using the same saves and systems throughout.

## Checkpoint 8 — presentation, reliability and release candidate

[Detailed work package 8](docs/V1-IMPLEMENTATION.md#8-release-recovery-and-presentation-pass)

Gameplay presentation:

- [ ] Fix remaining floating/sliding, sprite alignment and unreadable attack timing from playtests; prioritize directional movement and frequently used form/weapon poses.
- [ ] Maintain consistent actor/environment scale and clear enemy silhouettes, hit reactions and elemental effects.
- [ ] Finish tutorial/HQ/mission/training/item explanations and ensure controls are discoverable.
- [ ] Provide essential combat cues visually. Audio is owner-deferred; silence must not prevent completing the game.

Saves and controls:

- [ ] Add versioned save export/import with validation and clear recovery/error states.
- [ ] Verify backward migration, checkpoint retry, refresh, duplicate reward prevention and storage failure across the full loop.
- [ ] Add settings for key remapping and supported display/effect options; keep optional fullscreen reliable.
- [ ] Check readable text/contrast, keyboard navigation, modal focus and supported viewport layouts.
- [ ] Keep development controls separate from normal play and document local-save limitations.

Release verification:

- [ ] Define supported desktop browsers and minimum test device/performance target, then measure representative exploration and heavy effects scenes.
- [ ] Run meaningful automated mechanics/save/transaction checks plus real deployed browser playtests; a passing build is not evidence of rendered gameplay quality.
- [ ] Verify both recruit bodies and all four supported styles through the critical path.
- [ ] Fix blockers: crashes, save loss, impossible progression, stuck input/collision, missing assets or repeatable reward exploits.
- [ ] Verify a clean clone/Codespaces setup, production build, deployed asset paths and the Netlify build.
- [ ] Update README, controls, release notes, known limitations and recovery instructions.
- [ ] Justin: complete the final V1 playtest checkpoint and approve the release candidate; publish/tag the reviewed V1 build.

Done when: the complete adventure is playable, recoverable and documented on the supported browsers, with known limitations stated honestly.

## Later-version queue — does not block V1

- Additional breathing styles/mentors beyond the existing four; never fabricate unrevealed source forms.
- Special style-change missions and level-30 Sun/Moon paths; transfer/acquisition rules are still undecided.
- Live AI backstory/mission prose, backend validation, safe API-key storage and fallbacks. Build the deterministic crow loop first; the current roadmap places live AI after the core adventure. No live provider is configured by this checklist.
- Hashira ally missions, world invasions/events and larger regional expansions.
- Upper Rank multi-phase fights, post-Hashira content and the eventual Muzan campaign.
- Multiplayer decision, accounts/database/cloud saves and Python backend engineering work.
- Mobile landscape: touch joystick/actions, equipped forms, target assist, contextual finishing, safe areas and real-phone performance review; prototype in the sandbox before campaign rollout. Optional PWA comes later.
- Desktop packaging and a separate educational Pygame port.
- Audio production and broader portfolio documentation after the playable core, unless Justin brings them forward.

## Ownership and working order

**Development:** implement each checkpoint, run appropriate checks, prepare a reviewable deployed build and fix reported blockers. Use bounded GitHub writes and verify the result; do not leave stalled uploads running indefinitely.

**Justin:** playtest the checkpoint, report browser/device + steps + expected/actual behavior, judge art/feel/difficulty and supply audio later when ready. Routine implementation, tests, pushes, merges and deployments are already authorized; keep progress checkpoints without repeatedly asking for routine permission.

**Next order:** boss feedback → breathing purchases/upgrades → first crow mission → equipment/world/training → full progression/Hashira trial → release checks. Independent preparation can continue while feedback is pending. This checklist consolidates scope; it does not itself implement the remaining systems.
