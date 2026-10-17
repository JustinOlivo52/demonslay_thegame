# Reusable lesser-demon pool: levels 1–5

## Implemented

Five original visual archetypes: Ash-Fist, Thorn-Horn, Ember-Eye, Silver-Veil and Blue-Tusk. Each has an alert pose, two walking poses and a melee attack pose in a shared sprite sheet. Frame baselines reduce vertical jumps; one generated walk row faces the opposite direction and is normalized at runtime. Frame regions are cropped in texture metadata to avoid stray fragments from neighboring poses; source PNGs are preserved. This is a first-pass generated sheet; cropped extremities and pose consistency still need art cleanup.

All archetypes may occur at any level from 1 to 5. They share the existing melee AI for now. No Blood Demon Arts or archetype-specific abilities are implemented. Higher-level Blood Demon Art work remains level 10+ per the design.

`src/demon-roster.ts` returns a deterministic descriptor from seed, level and optional archetype ID. It validates its supported level range and keeps appearance independent from stats. Health is 125 + 20 per level above 1; damage is 20 + 3 per level above 1. These are provisional balancing values.

## Sandbox

Open `?sandbox=1`. Expand **Demon encounter pool · levels 1–5**. Choose Random appearance or an archetype and a level, then Generate new encounter. Reset/replay keeps the existing seed and enemy. Generate new encounter rolls a new one.

## Final Selection

The first tutorial encounter randomly selects an appearance but remains level 1. Its seed is saved against the recruit's identity so retry/reload does not reroll it. Scene combat, clues, finisher and regeneration are unchanged. Still one demon at a time in this slice.

## Future AI encounter generation

Every repeatable encounter can eventually use validated AI output to choose a roster ID, permitted level, objective, narrative and placement rules. Procedural generation builds the playable area from tested pieces. The game validates paths, difficulty and rewards and falls back when AI is unavailable. AI variation will respect tutorial teaching requirements and the fixed identities of named canon bosses.

Generate artwork offline and reuse it at runtime. Do not require a new image generation call per spawn. Persist the accepted descriptor/seed so reloading does not change the mission or duplicate rewards.

No live generative-AI service is connected. Current variation is seeded procedural selection, not AI-authored scenarios. Backend/provider configuration and costs are deferred.

## Verification

Tests cover seeded determinism, archetype availability across all five levels, scaling and absence of Blood Demon Arts. Browser checks cover all five archetype/level selections, health scaling and stable resets. A new forest fight recording exercises a seeded level-1 archetype through victory.

Local changes only, not pushed to GitHub.
