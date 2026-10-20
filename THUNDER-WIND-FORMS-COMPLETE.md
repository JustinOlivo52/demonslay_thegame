# Thunder and Wind — full numbered practice kits

## What is playable

Developer sandbox now opens the full kit for the saved recruit's style. The style links let you test any kit without changing your recruit, XP, owned forms or tutorial save.

- Thunder: **7 numbered forms**, including Zenitsu's personal VII for sandbox testing only.
- Wind: **9 numbered forms**.
- Water: existing 11; Flame: existing 6 revealed forms (I–V, IX).
- Thunder's Sixfold, Eightfold and Godlike Speed are first-form variants, not additional numbered forms; they are outside this pass.

Direct routes: `?sandbox=1&style=thunder` and `?sandbox=1&style=wind`. Dedicated `?thunder-lab=1` / `?wind-lab=1` links also work. `?sandbox=1&legacy=1&style=thunder` (or wind) preserves the previous two-form scene for comparison.

## Technique review

| Thunder | Gameplay / visual intent |
| --- | --- |
| I · Thunderclap and Flash | Low preparation, straight rush, one draw-cut and lightning trail. |
| II · Rice Spirit | Five alternating arched strikes. |
| III · Thunder Swarm | Circling steps, surrounding cuts and short lightning traces. |
| IV · Distant Thunder | Forward commitment with clustered strikes. |
| V · Heat Lightning | Low guard into a rising sword arc. |
| VI · Rumble and Flash | Sustained six-cut sequence with lateral footwork. |
| VII · Honoikazuchi no Kami | A committed rush, single powerful cut and drawn lightning-dragon flourish. |

Thunder II–VI are adaptations for a human slayer. Their source demonstrations involve Kaigaku's Blood Demon Art; this build uses bounded sword contact rather than granting his damaging electricity. VII's campaign access requirement remains undecided.

| Wind | Gameplay / visual intent |
| --- | --- |
| I · Dust Whirlwind Cutter | Advancing whirlwind cut. |
| II · Claws-Purifying Wind | Four parallel claw traces, one shared impact. |
| III · Clean Storm Wind Tree | Surrounding cuts and temporary nearby melee defense. |
| IV · Rising Dust Storm | Three upward cuts. |
| V · Cold Mountain Wind | Elevated expanding arcs. |
| VI · Black Wind Mountain Mist | Turning uppercut. |
| VII · Gale, Sudden Gusts | Leaping inverted sweep. |
| VIII · Primary Gale Slash | Advancing aerial rings. |
| IX · Idaten Typhoon | Backflip with descending cuts at a locked forward area. |

Wind III is also translated **Clear Storm Wind Tree**; the existing catalog's stable display label and ownership ID are retained.

## Art and adaptation limits

The approved pixel style remains. The shared twelve-pose atlas is sequenced separately for each technique; Thunder/Wind recoloring covers idle, movement and technique sheets for both recruits. Procedural elemental traces follow the blade/footwork. No new external artwork or video-derived sprites are required.

These are top-down gameplay interpretations, not frame-exact reproductions. Strike counts, damage, Breath costs, cooldowns, movement distances and finite defense are balancing choices. Wind airtime never grants blanket invulnerability. IX's target center is fixed when cast and clipped to walkable terrain; it cannot home after an enemy. Visual trails do not independently deal damage. First-form variants and custom directional in-between art can be reviewed later. Sound remains off.

Reference summaries: [Thunder Breathing](https://kimetsu-no-yaiba.fandom.com/wiki/Thunder_Breathing), [Wind Breathing](https://kimetsu-no-yaiba.fandom.com/wiki/Wind_Breathing). Search-index descriptions were available; direct page retrieval was blocked during this pass. These are secondary reference summaries, not a fresh frame-by-frame manga/anime verification.

## Controls and today's playtest

1. Open a full sandbox link. Thunder casts with **1–7**; Wind with **1–9**. Or select a form card and press **Q** / Cast selected form.
2. Keep **Free forms** on for unlimited repetitions. **Auto-aim** and stationary target lineup help inspect the effect. Select **New round** between forms to restore resources and the target.
3. Use **Slow motion** to inspect anticipation, cuts and recovery, then compare at normal speed. Try both male and female recruits.
4. Enable **Fight demon** for moving-target combat. **J/click** strikes, **Space** dodges and **F** finishes a vulnerable demon. Restart with New round.
5. Disable Free forms to test costs and cooldowns. Refill restores resources. Test III Wind against nearby melee: preparation, distance and recovery remain vulnerable.
6. Check movement/focus after fullscreen and switching tabs. Report form number, browser and exact symptom for anything that looks wrong.

## Validation

Production build and all **21 test files** pass. Seven new storm-kit/effect cases cover catalog completeness, costs, finite strike windows, directional/circular/locked-area contact, frame-independent travel, temporary defense, aerial poses and finite effect geometry. A deterministic clearing simulation confirms all sixteen forms can connect using the real forest collision helper at 120 fps, 30 fps and the lab's 40 ms update cap. The extended choreography test covers all 33 techniques.

A fresh Chromium launch still fails inside this execution environment, including an attempt with crash reporting disabled. Therefore keyboard navigation, rendered colors, real-time feel and native fullscreen still need the browser playtest above. No new gameplay recording or successful browser run is claimed.

## Following this checkpoint

- Justin: visual/feel review of all forms and the existing fullscreen maintenance changes.
- Development: fix findings, then connect approved complete kits to the campaign's future purchase/upgrade UI. Campaign/tutorial combat still exposes its original two starters.
- Determine special acquisition rules for personal techniques before allowing campaign purchases.
