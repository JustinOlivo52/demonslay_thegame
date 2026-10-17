# Tutorial playtest revision 02

## Direct breathing-form activation

Previously 1/2 and the numbered cards selected a form; Q was a separate cast action. That mismatch made the forms appear broken. Number keys and cards now select and cast directly. Number/numpad input uses physical keydown events; other action taps are buffered until the next simulation frame so short taps are not dropped between frames. Q repeats the current form. Cards aim at the nearby active demon; number keys retain mouse aiming. Busy sword/dodge inputs have a short form buffer, and blocked casts report cooldown, insufficient Breath, or the current action. Forms can be practiced before combat without inspecting clues.

## Connected training route

Four authored regions now sit in one horizontal scrolling world, joined by broad lantern paths. Combat stays in the open clearings. Entering each clearing starts its lesson automatically; investigation is no longer required. The optional shrine is scenery/lore only.

After a lesser demon's finisher, its training gate opens. Walk east to the next area instead of selecting Continue. Camera movement and player position carry across the seam, and cleared areas remain available for backtracking. Victory saves immediately; reloading a cleared checkpoint resumes travel rather than respawning that demon. Region transitions retain health/supplies and the pre-boss rest. Final boss completion still leads to the crow vignette.

This is a connected authored tutorial, not the later semi-open-world mission-generation system. Backtracking does not respawn prior enemies. Reload restores an encounter/cleared checkpoint rather than an exact position in the world.

## Scale

Recruit display size is now 80 (previously 94), lesser demons 96 (112), Hand Demon 144 (165). Run, idle, attack and dodge use the same recruit scale reference. Pixel filtering and the approved character creator remain unchanged.

## Next playtest

- Can you cast both forms with 1/2 and by clicking their cards?
- Are cooldown and low-Breath messages clear?
- Does the smaller recruit feel appropriately scaled to trees, buildings and paths?
- Can you walk naturally between clearings and backtrack without feeling like the game changed panels?
- Does the tutorial remain focused on combat practice rather than investigation?

Investigation belongs in the later crow missions across connected regions. Training progression, dedicated north/south animation, full sword animation and the Corps hub remain future work.

## Verification

Production build and 20 tests across nine files pass. Browser checks verified number-row keys, numpad keys and clickable casts for Water and Flame, including actual form damage without clue interactions. Keyboard traversal crossed all three links, backtracked, paused/resumed and completed the crow ending without page errors; these route checks used cleared/downed encounter fixtures. A separate full Water run fought all four encounters and walked the route without enemy-health shortcuts, persisted its crow and reported no page errors. Healing, retry supplies and boss full recovery also passed.
