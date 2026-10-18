# Water Breathing — complete functional prototype

All eleven forms are available in the independent developer lab at `/?water-lab=1`, linked from `/?sandbox=1`. This is a functional combat/VFX prototype using the approved pixel recruits and demon. It is not a finished set of bespoke body-animation sheets.

## Try it

Choose a sidebar form, aim with the mouse, then press **Q** or **Cast selected form**. WASD moves; J uses the basic sword; Space dodges; F finishes a vulnerable demon; Escape pauses. **1–9 select forms**, **0 selects X**, and **minus selects XI**. These selection keys are specific to this lab; the tutorial retains its existing direct-cast 1/2 controls.

Enable **AI attacks** for a hostile melee opponent. Enable **Yielding target** to test the conditional merciful form; this disables enemy attacks. Both male and female recruits are available. Slow motion and hit-geometry overlays help review timing. Reset practice restores everything; reset target only restores the opponent and cancels the current technique without restoring player resources or cooldowns.

The initial stationary target is deliberately out of melee range. Move/aim to line up each form. Use the sidebar to compare its reach, movement and resource demands.

## Forms

Costs are lab base Breath values. Cooldowns begin at cast time. Damage is maximum base damage if every strike connects with a surviving target; directional cuts can miss and travel can carry you past a target.

| # | Form | Breath | Cooldown | Base damage | Gameplay |
| --- | --- | ---: | ---: | ---: | --- |
| I | Water Surface Slash | 20 | 1.4 s | 35 | One horizontal forward cut |
| II | Water Wheel | 32 | 2.5 s | 45 | Advancing circular cut, 190-unit travel |
| III | Flowing Dance | 34 | 3 s | 16 × 3 | Three cuts along an advancing S path |
| IV | Striking Tide | 38 | 3.6 s | 14 × 4 | Four rhythmic forward cuts |
| V | Blessed Rain After the Drought | 28 | 3 s | 55 | Gentle cut; requires a yielding target |
| VI | Whirlpool | 42 | 4 s | 12 × 3 | Three close-range rotating cuts |
| VII | Drop Ripple Thrust | 26 | 2.2 s | 42 | Fast narrow thrust; reach 150, not a projectile |
| VIII | Waterfall Basin | 48 | 4.2 s | 60 | Downward splash centered 70 units ahead, clipped to terrain |
| IX | Splashing Water Flow, Turbulent | 42 | 5 s | 11 × 4 | Zigzag footwork with two brief evasive steps |
| X | Constant Flux | 52 | 5.8 s | 14 + 20 + 28 | Turning cuts build damage; water-dragon ribbon |
| XI | Dead Calm | 55 | 7 s | 0 | Timed nearby-melee defense; Giyu’s personal form |

Every ability has windup, active and recovery phases. Each offensive strike can hit the target once; render frames never repeatedly apply the same strike's damage. Active-time travel follows the actual forest collision rules. Effects remain visual descriptions of the sword techniques, not autonomous elemental projectiles.

Form V refuses a hostile target without spending Breath or starting cooldown. It does not bypass the normal finishing rule. Form VI is a grounded adaptation; no underwater combat exists yet. VIII's visual lift grants no invulnerability. IX's evasion covers active-progress intervals 12–28% and 58–74%, not the whole cast. X's damage ramp resets each cast. XI protects against nearby melee only during its 1.25-second active stance; its windup/recovery remain vulnerable. It neither damages the demon nor adds a general blocking action.

Zero target HP still requires F within four simulation seconds and 90 world units. Missing the window restores full enemy HP. Successful finishing retains the ash effect.

## Ownership and progression

The lab never writes character, tutorial or progression saves, awards XP, or grants form ownership. Normal Water recruits still start with two forms. Higher forms remain catalog entries until the level-eligibility, skill-point purchase and upgrade system is integrated. `waterCatalogId` and `waterTechniqueForCatalog` bridge these techniques to the existing `water-01`–`water-11` IDs. Dead Calm is previewable here for development; Giyu’s personal technique is not silently awarded to normal recruits.

## Files

- `src/water-kit.ts`: all eleven configurations, timing, hit geometry, movement, defensive windows and stable catalog mapping.
- `src/water-effects.ts`: layered water ribbons, foam, ripples, waterfall splash, water-dragon and calm stance effects.
- `src/water-lab.ts` / `.css`: independent interactive practice scene and controls.
- `src/water-kit.test.mjs`: catalog completeness, frame-independent movement, geometry, mercy conditions, finite defense and catalog mapping tests.

The original Water starter scene and shared tutorial technique registry remain intact. No other style's mechanics change in this checkpoint.

## Validation and remaining work

Production build and all 15 test files / 44 cases pass. Chromium checks exercised all ten damaging forms through real Q input, checking hit results, movement, costs and cooldowns. Additional checks covered hostile mercy rejection, rear-target thrust miss, live AI Dead Calm parry followed by damage after expiration, pause freezing, terrain bounds, missed/successful finishes, both body selectors, no save mutation and no page errors. These are focused prepared encounters, not a new full tutorial playthrough. The complete technique recording demonstrates prepared casts and a live-AI defensive stance.

The current effects use the shared pixel attack poses, active-time movement and existing run frames. Dedicated somersault, sheathing, thrust and other form-specific body frames remain a later art pass, along with directional choreography, water swimming and sound. Enemy AI here is an ordinary claw opponent; it does not test Blood Demon Art projectiles. Keep player review before calling this production-complete animation.

Next full-set checkpoint: Flame, then Thunder and Wind before resuming Mist. Normal level eligibility through 30 and increasingly expensive skill purchases/upgrades through 50 remain separate progression work.
