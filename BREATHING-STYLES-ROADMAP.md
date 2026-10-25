# Breathing styles — incremental visual and combat passes

The canon catalog contains 14 styles. A catalog entry does not make a style playable. Add and review one playable style at a time, preserving the character's one chosen active style. Sun and Moon remain level-30 special-mission paths, not starter choices.

## Current priority — connect the completed kits to progression

Water 11, Flame 6 revealed, Thunder 7 and Wind 9 are complete numbered developer kits. Normal recruits still have two starter forms; ownership, purchases, upgrades and campaign integration are the next checkpoint. See [the V1 completion checklist](TO-DO.md). The per-style notes below preserve the history of earlier first passes; they do not override current kit counts. Mist and other style expansion follow their own later review checkpoints.

## First-pass sequence

| Order | Style | Playable status |
| --- | --- | --- |
| 1 | Water | Two starting forms in normal play; all eleven functional prototypes in the Water lab |
| 2 | Flame | Two starting forms in normal play; all six revealed forms in the Flame lab |
| 3 | Thunder | Two starting forms in normal play; all seven numbered forms in the complete Thunder lab |
| 4 | Wind | Two starting forms in normal play; all nine numbered forms in the complete Wind lab |
| 5 | Mist | After completing the four existing style sets |
| 6 | Stone | Planned |
| 7 | Sound | Planned |
| 8 | Beast | Planned |
| 9 | Insect | Planned |
| 10 | Flower | Planned |
| 11 | Serpent | Planned |
| 12 | Love | Planned |
| 13–14 | Sun and Moon | Later special missions at level 30; never starter cards |

Each first pass delivers the two granted forms, character selection/save validation, outfit treatment, accurate instructor context, distinct attack behavior and visual effects, resource/cooldown tuning, and browser screenshots/video. Higher forms remain visible in the form catalog with their level requirements; they need the skill-purchase system and individual animation/combat passes before becoming usable. Do not unlock forms simply because their names exist in JSON.

## Per-style review gate

Check both recruit bodies, preview and playable outfit, windup/active/recovery readability, movement and collision, authoritative hit geometry, multi-hit rules, costs and cooldowns, stat scaling, save/reload and mentor text. Capture gameplay, identify shared/provisional poses honestly, collect owner feedback and polish before advancing to the next style. Existing styles must retain their functioning inputs and saves.

## Thunder checkpoint

- Thunderclap and Flash: grounded preparation, 260-unit straight active-time dash, narrow directional hit, gold lightning trail and selected-recruit afterimages. 45 base damage, 36 Breath, 2.4-second cooldown.
- Rice Spirit: five timed directional cuts, up to 9 base damage each, 48 Breath, 3.6-second cooldown. Each strike can hit once; it cannot apply damage every render frame. It has no automatic dash.
- Gold cloth variant uses the approved Water recruit frames via a runtime palette treatment. It is not a newly drawn Thunder animation sheet. Shared anticipation/strike poses and Rice's alternating poses remain provisional; no dedicated sheathing/iai frames or audio yet.
- Mentor: Jigoro Kuwajima, explicitly a former Thunder Hashira. Estate travel and training are not implemented.
- Form catalog lists all seven names, with eligibility levels 1, 1, 7, 13, 18, 24, 30. Only forms one and two are granted/castable. Rice Spirit's five-strike sequence is the gameplay adaptation, not a frame-exact anime reproduction.
- The independent Thunder lab is `?sandbox=1&style=thunder`. It uses the lab's shared palette-adjusted combat sprite; the tutorial uses the selected male/female recruit.

## Wind checkpoint

- Dust Whirlwind Cutter: 150-unit advancing, close-range circular strike; 40 base damage, 34 Breath, 2.1-second cooldown. Spiral gust arcs, dust/leaf flecks and a short travel trail distinguish it from Thunder's straight lightning burst. One damage event per target per cast.
- Claws-Purifying Wind: four forward claw-like cuts within a 125-unit fan; 48 base damage total, 44 Breath, 2.8-second cooldown. One damage event, no automatic dash and no lingering projectile. Visual multiplicity does not multiply its damage.
- Green runtime cloth treatment for the shared male/female recruit frames. Dedicated spinning/uppercut/sheathing frames remain future art; this is a choreography/VFX first pass.
- Sanemi Shinazugawa is the assigned Wind Hashira. Estate travel and mentor lessons remain future work.
- Nine reference forms list levels 1, 1, 5, 9, 13, 18, 22, 26, 30. Only the first two are owned/castable. The lab is `?sandbox=1&style=wind`.
- A shared starting-technique registry now supplies phase, active-time travel, hit geometry and strike-window indices. Water/Flame retain their existing timing adaptations; Thunder retains its five distinct Rice Spirit strike windows.

## Complete Water checkpoint

All eleven forms have distinct timing, movement/hit rules and water effects in `?water-lab=1`. Form V requires a yielding target; XI is Giyu’s developer-only timed melee defense. The lab has no save/progression writes. See [full rules and limits](WATER-FORMS-COMPLETE.md). Dedicated body choreography and progression integration remain future work. Next full-set pass: Thunder; Flame’s revealed set is now complete in its lab.

## Complete Flame checkpoint

All six revealed forms (I–V and IX) have distinct functional prototypes in `?flame-lab=1`: straight rush, rising cut, descending cut, frontal defensive sweeps, tiger-shaped three-cut flourish and Rengoku’s committed ultimate charge. VI–VIII are unavailable unrevealed canon slots, not invented techniques. A shared technique-lab scene now serves Water and Flame, with Water’s timing/behavior retained. Normal characters still own only two starter forms. See [Flame scope and limits](FLAME-FORMS-COMPLETE.md). Next full-set pass: Thunder, then Wind before Mist.

## Source-fidelity review before Thunder

The complete Water/Flame labs now use a 48-cell pose atlas and authored per-form sequences, with the source-led corrections in SOURCE-FIDELITY-01.md. Water IX is mobility rather than an invented attack combo. This is a description-led candidate for visual review, not frame-exact anime reproduction. Review and refine these candidates before resuming Thunder; tutorial animation stays unchanged until that integration checkpoint.
