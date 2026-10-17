# Final Selection tutorial — playtest build

## Start in Codespaces

Use branch `codex/pixel-selection-checkpoints`. Run `npm ci` when dependencies need installing, then `npm run dev`. Open port 5173 in the browser. Create/save your recruit, choose Water or Flame, and select **Enter Final Selection**.

Existing recruit: review the saved recruit and enter the same route. Direct route is `/?selection=1`. Your browser stores profile and tutorial checkpoint locally; keep the same Codespace/forwarded origin to retain that browser save.

## Playable sequence

1. **Beyond the wisteria:** investigate two pieces of evidence and defeat the first lesser demon. Optional shrine lore remains available.
2. **Trust your breathing:** defeat a second, distinct lesser demon while practicing your two starting forms and stamina management.
3. **Survive the night:** a third lesser demon tests dodging and healing.
4. **Hand Demon:** a multi-armed boss alternates ordinary sweeps with longer-windup, harder-hitting attacks. It uses melee animation tells, not Blood Demon Art ground circles.
5. **Dawn and crow:** after the boss finisher, continue to the passing scene. A Kasugai crow is recorded as received. The story montage covers the rest of the seven-night event.

This is a condensed tutorial using the same forest clearing for staged encounters, not four distinct regions or a seven-night survival simulation. Three regular enemy appearances are drawn from the seeded pool and kept stable for retry.

## Controls

- WASD: move; mouse: aim.
- Click or J: basic sword attack.
- 1 / 2: select breathing form; Q: cast.
- Space: dodge using stamina.
- E: inspect nearby evidence or shrine.
- H: drink a healing potion (+45 vitality, capped at 100). No potion is consumed at full health. Start with two potions.
- F: finish a zero-health demon within four simulation seconds and 90 world units. If missed, the demon fully regenerates.
- Escape: pause/resume. Switching browser focus pauses play.
- Continue button or Enter: advance after an encounter's ash settles.

Before the boss, a rest checkpoint restores at least 75 vitality and at least one potion. Losing and retrying restores the current encounter's saved starting health and supplies. It does not restart all completed encounters. Reloading resumes from the current saved encounter, not the exact middle of an attack.

## Saving and replay

Progress saves when you continue between encounters, including the final passing/crow state. If you reload after winning but before continuing, replaying that encounter is expected. Completion is an idempotent state, with no repeatable currency or XP rewards yet. **Replay tutorial** on the ending resets tutorial progress and retains your recruit.

## Scope and known limits

- Pixel art, no sound yet.
- Live AI backstories/scenarios are not connected. Current origins are templates and encounter variants are seeded.
- Water/Flame choreography is a first-pass gameplay adaptation. Water Wheel lacks dedicated somersault frames. Some sprite frame alignment and directional views need polish.
- The Hand Demon uses its own generated four-pose sheet and alternating melee timings, not final boss production animation or Blood Demon Arts.
- Crow presentation is a simple pixel vignette and text.
- Corps hub, rooms, weapon upgrades, XP progression and post-selection missions are the next development checkpoints.
- Developer sandbox remains at `/?sandbox=1`; automated demonstration uses `?selection=1&demo=1`. Normal play does not run the scripted demo controls.

## Feedback requested

- Can you understand where to go and how each control works?
- Are the two forms useful and responsive for your chosen style?
- Do ordinary demon poses and the boss's longer windup provide enough warning?
- Is healing sufficient? Is the finish window fair?
- Does Continue/save/retry behave as expected?
- Does the crow scene feel like a satisfying end to the tutorial?

## Codespaces container recovery

The container image tag is `mcr.microsoft.com/devcontainers/javascript-node:24-bookworm`. The earlier `1-24-bookworm` tag does not exist and causes container creation to fail. After pulling the latest playtest branch, run **Codespaces: Rebuild Container** from the command palette. If the Codespace is in recovery mode, pull the branch in the recovery terminal first, then rebuild. Alternatively create a new Codespace from the playtest branch. Do not delete an existing Codespace that contains unsaved work.
