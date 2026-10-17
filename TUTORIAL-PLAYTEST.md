# Final Selection tutorial — playtest build

## Start in Codespaces

Use branch `codex/pixel-selection-checkpoints`. Run `npm ci` when dependencies need installing, then `npm run dev`. Open port 5173 in the browser. Create/save your recruit, choose Water or Flame, and select **Enter Final Selection**.

Existing recruit: review the saved recruit and enter the same route. Direct route is `/?selection=1`. Your browser stores profile and tutorial checkpoint locally; keep the same Codespace/forwarded origin to retain that browser save.

## Playable sequence

1. **Beyond the wisteria:** walk to the open training clearing and defeat the first lesser demon. No investigation is required. Optional shrine lore remains available.
2. **Trust your breathing:** defeat a second, distinct lesser demon while practicing your two starting forms and Breath management.
3. **Survive the night:** a third lesser demon tests dodging and healing.
4. **Hand Demon:** a multi-armed boss alternates ordinary sweeps with longer-windup, harder-hitting attacks. It uses melee animation tells, not Blood Demon Art ground circles.
5. **Dawn and crow:** after the boss finisher, meet the other survivors and attendants through the ceremony, then receive your crow. The award saves when its panel appears. The story montage covers the rest of the seven-night event.

This is a condensed tutorial with four authored areas joined by continuous walkable lantern paths, not a seven-night survival simulation. The foothill trail leads into a bamboo basin, a ruined waystation and an ancient cedar boss grove. Three regular enemy appearances are drawn from the seeded pool and kept stable for retry.

## Controls

- WASD: move; mouse: aim.
- Click or J: three-cut sword combo. Tap during a cut to buffer the next; pause to reset. Dodge can cancel a basic cut.
- 1 / 2 (including numpad) or click a form card: select AND cast immediately. Q or Use selected form: repeat the selected form. Forms spend Breath (32 / 46), which regenerates between casts; dodges use stamina.
- Space: dodge using stamina.
- E: read the optional shrine; no investigation is required in training.
- H: drink a healing potion (+45 vitality, capped at 100). No potion is consumed at full health. Start with one potion. Two optional caches exist in the mountain; carry at most two.
- F: finish a zero-health demon within four simulation seconds and 90 world units. If missed, the demon fully regenerates.
- Escape: pause/resume. Switching browser focus pauses play.
- After a lesser demon's ash settles, walk east along the lantern path to the next clearing. After the boss, Greet the dawn or Enter completes the tutorial.

There is no automatic pre-boss refill. Explore optional side paths and conserve supplies. Losing and retrying restores the current encounter's saved starting health and supplies. It does not restart all completed encounters. Reloading resumes from the current saved encounter, not the exact middle of an attack.

## Saving and replay

Victory saves immediately. Reloading a cleared checkpoint resumes travel; walking into the next clearing saves its starting checkpoint. The final passing/crow state also persists. Completion is an idempotent state, with no repeatable currency or XP rewards yet. **Replay tutorial** on the ending resets tutorial progress and retains your recruit.

## Scope and known limits

- Pixel art, no sound yet.
- Live AI backstories/scenarios are not connected. Current origins are templates and encounter variants are seeded.
- Water/Flame choreography is a first-pass gameplay adaptation. Water Wheel lacks dedicated somersault frames. The revised run/dodge sheet adds poses; dedicated north/south views and full sword animation remain future art work.
- The Hand Demon uses its own generated four-pose sheet and alternating melee timings, not final boss production animation or Blood Demon Arts.
- Crow presentation is a simple pixel vignette and text.
- Corps hub, rooms, weapon upgrades, XP progression and post-selection missions are the next development checkpoints.
- Developer sandbox remains at `/?sandbox=1`; automated demonstration uses `?selection=1&demo=1`. Normal play does not run the scripted demo controls.

## Feedback requested

- Can you understand where to go and how each control works?
- Are the two forms useful and responsive for your chosen style?
- Do ordinary demon poses and the boss's longer windup provide enough warning?
- Is healing sufficient? Is the finish window fair?
- Do walking transitions, save/reload and retry behave as expected?
- Does the crow scene feel like a satisfying end to the tutorial?

## Codespaces container recovery

The container image tag is `mcr.microsoft.com/devcontainers/javascript-node:24-bookworm`. The earlier `1-24-bookworm` tag does not exist and causes container creation to fail. After pulling the latest playtest branch, run **Codespaces: Rebuild Container** from the command palette. If the Codespace is in recovery mode, pull the branch in the recovery terminal first, then rebuild. Alternatively create a new Codespace from the playtest branch. Do not delete an existing Codespace that contains unsaved work.

See PLAYTEST-REVISION-03.md for the introduction, expanded routes, balance, grounded animation and survivor ceremony. PLAYTEST-REVISION-02.md records direct form activation and connected travel. PLAYTEST-REVISION-01.md records the prior iteration.

First-time trials open a three-panel controls introduction. Use How to play to reopen it. E collects nearby medicine caches and reads optional landmarks. No clue is required to start a fight. The 1,400-unit-tall mountain supports northern and southern exploration loops around the connected main route.
