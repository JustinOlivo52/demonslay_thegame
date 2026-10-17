# Checkpoint 2 — first Final Selection forest slice

## Play

Create or review a saved recruit at `/`, then choose **Enter Final Selection**. Direct entry: `/?selection=1`. No saved recruit gives a link back to creation.

1. Enter the forest and follow the marked trail.
2. Approach the broken wisteria cord and press E.
3. Follow the trail to the footprints and press E.
4. Face the lesser demon in the eastern clearing.
5. Use sword attacks, breathing, dodging and the timed F finish.

WASD movement, mouse aiming, click/J sword, Space dodge, 1/2 form selection, Q cast, E investigate, F finish, Escape pause. Retry returns to the trail entrance. The combat corridor is bounded; trees outside it are scenery, not a free-roaming world yet.

## Implemented

- Loads saved name, body choice, style and two starting forms.
- Male/female Water/Flame appearance variants with a limited motion sheet.
- One authored forest region, two ordered proximity-gated clues, one demon encounter.
- Demon is hidden and inactive until both clues are inspected.
- Shared combat scene and systems preserve the sandbox; no second independent damage/finisher engine.
- Water: existing slash/wheel mechanics. Flame: first-form advancing slash and second-form stationary sector attack using flame-colored ribbons. Both are provisional gameplay adaptations.
- Successful finishing saves a separate first-encounter-cleared record. Character creation data is preserved. No XP, items or promotion are awarded in this slice.
- Clear completion text says the next region and Hand Demon remain future work.

## Limits

- This is a first encounter slice, not the full trial or seven-night event.
- Boss, additional encounters, healing tutorial, passing ceremony, crow, Corps hub and travel remain pending.
- Art is generated and rough: two run poses, windup and strike, no full directional sets. Water Wheel still lacks dedicated somersault frames; Flame needs its own final choreography and pixel effects.
- Forest scenery is drawn in code. No live AI generation or audio.
- Reloading replays the region from its entrance. The completion record is retained but mid-encounter save/resume is not implemented.
- Browser capture demo uses scripted combat controls. It is not a human playtest. Query-gated test helpers teleport only for setup and checks.

## Verification

Build and automated tests pass. Browser tests exercised no-profile guard, male Water and female Flame identity loading, E proximity and clue order, combat activation, F completion saving and reset. A separate mock-combat recording completed the actual encounter after automated clue setup. The capture controller is suspended until both clues are inspected. Other character variants and player control feel need personal testing.

## Next checkpoint review

Review forest readability, clue discovery, selected character appearance, starting-form feel, encounter difficulty, and whether the ending clearly communicates that the trial continues. Then expand encounters/tutorial beats before the Hand Demon boss.

Changes are local only, not uploaded to GitHub.
