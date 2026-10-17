# Checkpoint 1 — character creation

## Implemented

- Three steps: Your slayer, Your origin, Your resolve.
- Name validation (2–24 characters), male/female recruit previews, Water/Flame outfits, first-two-form summaries.
- Editable backstory, another-origin action, confirmation and local browser save.
- Saved-recruit review after reload; versioned validation rejects corrupted or incompatible records.
- Completion screen stops at readiness for Final Selection. No premature membership, crow or trial completion.
- Main entry now loads character creation. Combat sandbox remains at `?sandbox=1`. Existing `?demo=1` and query-gated browser test entry still load the sandbox.

## Important limits

- Backstories are offline templates, not live AI-generated prose. A provider/backend and credential setup are deferred.
- Four creation appearances are preview assets, not complete playable animation sheets. The sandbox still uses its existing Water slayer; selecting Flame/female does not silently change that developer sandbox. Character-aware gameplay and Flame combat are future integration work.
- Local storage is browser/origin-specific. No cloud save, account, export or multi-character slots yet. Saving a new recruit replaces the one local slot.
- Final Selection forest, Hand Demon, post-selection ceremony, crow and Corps hub are later checkpoints.
- No new combat, audio or balance rules.

## Files

- `src/main.ts`: onboarding entry and browser interactions.
- `src/character.ts`: profile validation, story fixtures, starter forms and versioned save parser.
- `src/character.test.mjs`: identity, starter loadout and malformed-save tests.
- `src/creation.css`: responsive presentation.
- `public/art/recruit-creation-sheet.png`: generated source sheet, four appearances. Preview renders at low resolution with nearest-neighbour scaling.
- `src/sandbox.ts`: previous combat entry, preserved separately.

## Run

Node.js 24. Run `npm ci`, `npm test`, `npm run build`, `npm run dev`. Open the printed Vite address. Codespaces: open forwarded port 5173. Character creation supports narrow browser layouts; combat still requires keyboard/mouse.

## Verification

Seven automated tests pass. Browser automation checks invalid-name validation, Water/Flame and male/female selections, backstory regeneration, confirmation/save, reload/resume, narrow-screen bounds and sandbox loading. No page runtime errors in that check. Human visual/flow approval remains outstanding. A source build passes; Phaser still produces a bundle-size warning in its lazy-loaded sandbox chunk.

## Review questions

- Do the four character appearances fit the selected pixel-art direction?
- Is choosing a style understandable, including the two granted forms?
- Does the welcome/training backstory set up Final Selection well?
- Should anything change before starting the forest tutorial?

Local work only. Not pushed to GitHub. Integrate on a branch while preserving any newer Claude changes; do not replace the repository blindly.
