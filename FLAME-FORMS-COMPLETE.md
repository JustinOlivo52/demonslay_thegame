# Flame Breathing — complete revealed-set prototype

Open `/?flame-lab=1`, or choose **Complete Flame forms** in the developer sandbox. All six revealed canon forms (I–V and IX) now have functional combat/VFX prototypes. **Forms VI–VIII have not been revealed in canon:** their numbered slots are visible but disabled, with no invented names, abilities or purchase options.

This is a personal-project gameplay adaptation using the approved pixel recruits and demon. Bespoke body animation and production balancing remain later passes.

## Controls and practice

Choose a form in the sidebar or press **1–5** / **9** to select by its canon number. **9 selects Ninth Form: Rengoku**, not a sixth invented form. Press **Q** or **Cast selected form** to use it. Keys 6–8, 0 and minus cannot select nonexistent Flame techniques.

WASD moves, mouse aims, J uses the sword, Space dodges, F finishes a vulnerable target and Escape pauses. These are practice controls; normal tutorial 1/2 casting remains unchanged. Enable **AI attacks** to test live melee defense. The enemy uses pose tells without red ground circles. Slow motion and hit geometry help review timing; male/female recruit selectors use the existing Flame outfit columns. The stationary target starts beyond melee reach: move closer to test the short forms.

**Reset practice** restores health/resources, positions, timers and cooldowns. **Reset target only** restores the demon and cancels the current technique while retaining player health/resources and cooldowns. Pause freezes movement, ability time and cooldowns.

## Complete known set

These are base lab values; normal character stat/novice scaling and higher-form progression integration are separate. Cooldowns begin on cast. Damage totals assume every strike lands before the target is downed. Each strike damages the target at most once, independent of rendering frame rate.

| # | Form | Breath | Cooldown | Base damage | Behavior |
| --- | --- | ---: | ---: | ---: | --- |
| I | Unknowing Fire | 28 | 2 s | 38 | Straight 155-unit rush and one forward cut |
| II | Rising Scorching Sun | 32 | 2.6 s | 44 | Upward cut with rising flame arc and small advancing step |
| III | Blazing Universe | 38 | 3.2 s | 52 | Descending strike with compact impact flare |
| IV | Blooming Flame Undulation | 42 | 4.4 s | 12 × 3 | Three broad forward sweeps and active-only frontal melee defense |
| V | Flame Tiger | 52 | 5.6 s | 24 + 24 + 20 | Three advancing cuts with a tiger-shaped flame flourish |
| VI–VIII | Unrevealed in canon | — | — | — | Unavailable; no fabricated mechanics |
| IX | Rengoku | 72 | 9 s | 96 | 300-unit committed ultimate rush with one powerful forward strike |

Each form has vulnerable windup and recovery. Forward sword fans determine hits, not the visible extent of every ember or ribbon. Travel is integrated over active time and clipped by actual forest collision. Rising/descending visual lifts do not grant invulnerability or bypass terrain.

Blooming Flame Undulation guards melee within 110 world units and its forward fan only while active (0.18–0.86 seconds after cast). Rear attacks, preparation and recovery remain dangerous. Its damage still requires its narrower 100-unit sword fan and a valid strike window. It is not a permanent or omnidirectional shield, and it does not introduce a general block action or tested Blood Demon Art projectile defense.

Flame Tiger's three strikes are a deliberate game adaptation. Its tiger is a sword-effect motif, not a summoned creature with separate AI. Rengoku is expensive and committed; the long charge grants no invulnerability and does not repeatedly damage the target every frame. Flame effects do not add autonomous fireballs, lingering burn damage or terrain fires.

Normal finishing remains mandatory: zero HP opens a four-second, 90-unit **F** opportunity, success produces ash, and timeout restores full enemy health. Forms do not skip this rule.

## Saves and later progression

The lab does not write profile/tutorial/progression saves, award XP or grant form ownership. Normal Flame recruits retain their two starting forms. Stable `flameCatalogId` / `flameTechniqueForCatalog` mappings preserve `flame-01`–`flame-05` and `flame-09`; unrevealed IDs return no technique. Existing catalog eligibility spaces the known forms through level 30 while unrevealed slots remain ineligible. Skill-point purchase and upgrade integration through level 50 is still future work.

Water and Flame share the independent practice-scene engine, with separate pure technique rules and renderers. The tutorial’s starter mechanics are unchanged by this checkpoint.

## Files

- `src/flame-kit.ts`: six definitions, canon mapping, timing, active travel, hit geometry, guard and resource validation.
- `src/flame-kit.test.mjs`: canon completeness/unrevealed restrictions, timing/window counts, costs, frame-independent travel, directional geometry and finite guard tests.
- `src/flame-effects.ts`: flame ribbons, rising/descending arcs, defensive sweeps, tiger silhouette and ultimate charge aura.
- `src/flame-lab.ts`: Flame scene configuration and warm recruit selection.
- `src/technique-lab.ts` / `.css`: shared interactive Water/Flame controls, UI, scene and practice combat loop.
- `src/technique-types.ts`: shared scene/kit value types.
- `src/water-lab.ts`: Water's unchanged ability configuration now supplied to the shared scene.

## Validation and limits

Production build and all 16 test files / 49 defined test cases pass. The existing large-chunk warning remains. Chromium checks exercised all six forms via actual Q input and verified exact damage/travel, Breath use, cooldown rejection, insufficient-Breath rejection after Rengoku, canon-number selection, unavailable unknown slots, live frontal AI deflection, damage from behind and after expiration, charge collision, pause, target/full reset behavior, finish timeout/full recovery and success, both body selectors and unchanged local storage, with no page errors. All eleven Water-form browser checks passed after extracting the shared practice scene.

The recorded preview uses prepared target positions, actual casts and hit calculations, a live melee guard and its expiration, and a real sword/form/F finish sequence. It is not a new full tutorial playthrough or a claim of final balance. Male and female Flame outfits are the existing approved sprite columns, not new hand-drawn per-form sheets. Dedicated uppercut, descending, defensive and ultimate body poses, directional attacks and sound remain art work. Review feel and readability with Justin before calling this production-complete animation.

Next full-set checkpoint: **Thunder**, then **Wind**, before adding Mist or the other remaining styles.
