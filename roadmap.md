# Nightfall roadmap

## Agreed design

- Top-down 2D action RPG; TypeScript + Phaser; browser first.
- One active breathing style per character; choose from two starting styles in V1 (specific choices pending).
- Two forms granted at level 1. All remaining forms become eligible at evenly spaced levels through 30. Eligibility is not ownership: spend skill points to purchase them.
- Levels 31–50 emphasize increasingly expensive upgrades. A planned point budget and level-50 final upgrade requirement support maxing one style.
- Level 50 unlocks a Hashira promotion trial; promotion is earned.
- Future special missions can permit a style change. Upgrade transfer rules are undecided.
- Future Sun and Moon unlock paths require level 30 plus their special missions. Neither is a starting choice.
- Demons emerge at night. Demons level 10+ have Blood Demon Arts. Sunrise behaviour remains undecided.
- Later combat adds a timed, close-range decapitation input after enemy health reaches zero.
- Missions award XP, items, currency and equipment. Skill-point award rules must respect the progression budget.
- Procedural missions first; AI-generated narrative later with validated structured objectives.
- Muzan is the eventual final story boss, with Hashira allies and/or other players. Multiplayer is not yet committed.

## Workflow

At each checkpoint: implement, verify, player playtest, collect feedback, fix blockers, obtain checkpoint approval, then proceed. Initial development authorization covers foundation and prototype 01; stop for its playtest before prototype 02.

## V1 milestones

0. Foundation: project setup, documented rules, placeholder visuals. Resolve style choices before full ability implementation; mastery, sunrise and death rules before their respective systems.
1. Combat playground: one arena, movement, attack, stamina dodge, telegraphed enemy, pause, reset. Current implementation; awaiting player playtest.
2. Breathing and execution: one style, two starting forms, one test form, cooldowns, stamina costs, decapitation and recovery window.
3. Progression: XP, levels, skill menu, purchase/upgrade costs, point budget, first style's full form set, development level controls.
4. World: day/night clock, outdoor map, demon archetypes and visible levels, escape, level 10+ Blood Demon Arts, sunrise rules.
5. RPG loop: village, authored introduction, procedural missions, inventory, equipment, rewards, failure/retry.
6. Complete adventure: limited character creation, second style, mentors, two outdoor maps, full level 1–50 progression, boss arena, Hashira trial and ending.
7. Release candidate: local saves and export/import, settings, key remapping, onboarding, art/audio polish, browser/performance checks, corrupted-save handling.
8. Release: approved static browser build, release notes and known limitations.

V1 completion: create a character, complete missions, purchase and upgrade forms, save/resume, reach level 50 and pass the Hashira trial. This is a small complete adventure; it does not complete the eventual Muzan story.

## V2 direction

Additional styles and mentors; style-change missions; Sun/Moon special paths; regions; Blood Demon Arts; missions fighting alongside Hashiras. Then optional Python FastAPI backend, database, accounts/cloud saves and AI-assisted mission prose. Each is a separate playtest checkpoint.

## V3 and later direction

Upper Rank multi-phase bosses; post-Hashira challenges; progression toward Muzan; decide ally AI versus multiplayer based on tested gameplay and engineering scope. Desktop packaging through Electron or Tauri. Portfolio documentation, CI, meaningful tests, deployment workflow and demo. A small Pygame port can serve as a separate Python learning project.

Later versions are planning directions, not prerequisites or automatic additions to V1.
