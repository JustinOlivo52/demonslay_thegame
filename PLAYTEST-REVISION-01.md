# Tutorial playtest revision 01

## Feedback addressed

The approved character creator and pixel-art direction are retained. The first playtest found stiff movement, repetitive melee, hidden form controls, oversized characters and repeated arenas.

- Player speed: 185 → 245 world units/s; dodge speed: 530 → 610; dodge cooldown: 0.65 → 0.48s. Attacks allow movement; forms allow reduced movement. Dodge cancels a basic slash.
- Recruit size: 150 → 94; lesser demons: 168 → 112; Hand Demon: 235 → 165. Selection camera zoom: 1.3 → 1.0. The sandbox keeps its close view.
- Added a generated 28-frame sheet covering four appearances: five run poses and two dodge poses per appearance. A ping-pong run sequence, body lean, planted foot anchors, anticipation and dodge glide supplement the existing strike poses. This remains left/right animation; dedicated north/south sprites and more sword poses remain future work.
- Three-cut sword chain: opening cut (18), return cut (23), driving cut (32). Damage is checked during active frames. Tap J/click during the current cut to queue one follow-up. The chain expires after a short pause and resets after the third cut. Dodging cancels the chain.
- Independent Breath resource (100 initially), costs 20/32 for the two forms. Breath regenerates faster while stationary. Dodging still uses stamina. Clickable form cards show names, hotkeys, costs and cooldowns; Q or the cast button uses the selected form. A bounded capacity helper supports +10 per future training rank, but training progression is not implemented or awarded in this tutorial.
- Five ordinary melee patterns: claw, pouncing rake, twin claws, wide sweep, crushing arms. Each archetype has a fixed pattern; boss alternates sweep/heavy. Windup locks the direction; hits require actual reach/direction during active time. No ground-circle melee warnings or low-level Blood Demon Arts.
- Original demon names replace visual placeholder names while IDs/saves remain stable.
- Widened foothill route and clearing; subsequent lessons have separate authored layouts: bamboo basin with edge pond, ruined waystation with paving and broken structure, ancient cedar grove for the boss. These are connected by checkpoint transitions, not continuous travel. Collision matches each area's walkable ground.

## Playtest focus

1. Does moving/dodging feel responsive with enough space to flank?
2. Can you choose and cast either form without consulting documentation?
3. Can you chain all three cuts and cancel into a dodge?
4. Can you distinguish enemy patterns from their pose and timing?
5. Do the four regions feel different while preserving the artwork you liked?

## Limits

No new audio, live AI services, training activity, hub, multiplayer or inventory systems. Basic combo art reuses existing anticipation/strike poses with distinct timing, lean and slash trails; it is not a complete new hand-animated sword sheet. Generated run frames still need player review. Existing tutorial saves continue at the same encounter number in its new area.

## Verification

Production build and all eight test files pass. Browser input checks confirmed exact three-hit combo damage, mouse/keyboard form selection, independent Breath consumption, finisher and crow. Run/dodge rendering produced no page errors. A full Water playthrough cleared all four encounters and persisted completion. The first Flame demo stalled because its retreat policy kept it too far from a double-strike enemy; the developer-only demo now bounds its retreat distance. The fixed-seed Flame run then completed all four encounters and persisted its crow with no page errors. Checkpoint restore, H healing, boss full regeneration and retry supplies also passed.
