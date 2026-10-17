# Pixel-art animation comparison

Separate experiment; the illustrated version remains in /workspace/game-capture.

New AI-generated 4x4 sprite sheet: public/art/pixel-slayer-sheet.png. Generated as original assets, not a pixel filter over prior artwork. Rows: idle, running, basic attack, water attack. Frames are selected by the combat phase. Nearest-neighbour sampling. Surface water is baked into the attack frames.

Scope: player sprite and Surface Slash animation experiment. Demon, arena and most existing effects are retained for comparison. Wheel uses the same new attack frames plus its existing ring and advance; it is NOT a dedicated somersault animation. Only right/left orientations exist (left is mirrored), not four directional sets. Combat rules unchanged.

Known art issues: feet/scale vary between poses; run poses are too similar; only four attack keyframes; blade/water can approach cell boundaries. Effects are baked into sprites and do not yet support arbitrary aim rotation. Needs cleanup, foot alignment and in-betweens before choosing production animation. Do not treat pixel art alone as a guarantee of smooth motion.

Build and combat checks passed. Automated browser demonstration completed with no page errors and confirmed hits for both forms. Recordings are normal simulation speed; headless capture performance can affect smoothness. No human playtest completed.

Run with Node 24: npm ci, npm run dev. Open port 5173 (or the printed address). Use Reset + demonstrate form, and choose a form from the selector.

No GitHub upload performed. Integrate on a separate branch; preserve any newer repository work.

## Video 2: pixel combat

Added pixel-demon-sheet.png, with four walk poses and four attack poses. Demon visuals now use those frames while its existing combat state machine handles attacks. ?demo=1 enables scripted player controls for an actual rules-based encounter. This is not a human playtest or new enemy AI. The demo approaches, retreats, dodges and casts Surface Slash during recovery. Recorded a complete victory at 100 health, no browser page errors. Existing tests and production build pass. Sprite alignment, old effect placement, directional coverage and in-between frames still need refinement.
