# Water and Flame — description-led choreography pass 01

This supersedes the earlier shared-pose lab animations. It makes the complete Water and revealed Flame sets closer to the described swordsmanship, while retaining the approved pixel recruit designs. It is **not** a frame-for-frame reproduction, a finished directional animation set, or a claim that official footage was watched and measured during this pass.

## Reference basis

Technique descriptions were checked against the indexed [Water Breathing](https://kimetsu-no-yaiba.fandom.com/wiki/Water_Breathing) and [Flame Breathing](https://kimetsu-no-yaiba.fandom.com/wiki/Flame_Breathing) reference entries, with [Giyu’s technique descriptions](https://kimetsu-no-yaiba.fandom.com/wiki/Giyu_Tomioka) supporting the quiet stance/turning distinctions. These are secondary references. Direct wiki page retrieval was blocked; indexed text was available. Fanon pages and other games’ exclusive techniques were excluded.

The [official Episode 19 page](https://demonslayer-anime.com/risshihen/story/19.html) and [licensed episode listing](https://www.crunchyroll.com/watch/G7PU4W72N/hinokami) provide scene context, not a measured animation reference. Exact manga-panel and anime-shot comparison remains a later review task. No official manga panels, episode frames or copyrighted clip files are bundled with the game.

## What changed

A new generated atlas supplies **12 distinct body/sword poses in all four recruit variants**: 48 cells total. It includes low/high guards, horizontal/downward cuts, tucked/inverted/landing somersault poses, a rear turning view, a thrust, still drawn-blade posture, a rising cut and a low charge. Each of the 17 techniques has its own windup/active/recovery sequence using these poses. This is a reusable pose vocabulary, not seventeen individually drawn full animation sheets.

The original generated image remains intact. Runtime cell registration masks detached neighboring fragments, validates grid dimensions and registers exact 181-pixel cells. Small-scale pixel rendering and selected-body/style columns are preserved. Pose sampling and gameplay use simulation time; pausing holds both. A **Compare previous body poses** setting allows a body-animation comparison with the previous shared poses, while keeping the revised effects and mechanics. It does not restore the entire earlier build.

## Per-form review

The reference column is a short paraphrase of the linked descriptions. The changes column describes our implementation.

| Form | Reference cue | Current correction |
| --- | --- | --- |
| Water I | Horizontal cut | Low preparation, extended cut, recovery |
| Water II | Forward somersault; vertical cut | Tucked → inverted → landing art, visible jump, narrower forward hit lane |
| Water III | Winding body and blade | Turning views through an S-shaped advancing sequence |
| Water IV | Flowing consecutive cuts | Connected guard/cut/turn poses across four strike beats |
| Water V | Gentle merciful cut | Quiet preparation, measured stroke; yielding-target restriction retained |
| Water VI | Twisting cuts | Repeating torso pivots around the close-range swirl |
| Water VII | Precise thrust | Point-first extension; narrow aim and ripples retained |
| Water VIII | Descending vertical cut | High guard and lifted descent; damage begins at the downward stroke |
| Water IX | Light, adaptable footwork | Removes the invented four-cut combo; non-damaging zigzag steps and foot splashes |
| Water X | Momentum through rotations | Three connected turning cycles; growing strikes and dragon follow the same rotation count |
| Water XI | Stillness; rapid blade response | Drawn-blade still posture, restrained surface ripple, brief contact flashes instead of a permanent shield ring |
| Flame I | Rush; horizontal cut | Preparation, low burst, extended cut |
| Flame II | Rising vertical arc | Tail guard into an uppercut pose; aim-aware projected arc |
| Flame III | High guard; descending arc | High preparation into downward follow-through; delayed strike contact |
| Flame IV | Circular defensive cuts | Turning sweeps; finite frontal melee protection retained |
| Flame V | Dash, high guard, tiger | Charging/high-guard preparation into a series of cuts; flame shape wraps around the recruit |
| Flame IX | High stance; explosive rush | High preparation, committed charge and slash; enveloping flame-dragon motif |

Flame VI–VIII stay unavailable because they are unrevealed. Giyu’s personal eleventh Water form remains a developer preview, not an automatic normal-character grant.

## Gameplay limits deliberately retained

- Breath costs, cooldowns, damage totals and strike counts are balance choices. Three Flux rotations and three Tiger hits are bounded game adaptations, not asserted canon counts.
- Strike windows now begin at the appropriate cut/thrust/landing beat rather than immediately when active animation starts. A target can miss later forward cuts if the recruit travels past it. The prepared Flowing Dance check now lands two of its three cuts, illustrating that geometry still governs damage.
- Water Wheel uses a forward sword lane; the entire visible vertical water ring is not a 360-degree damage field. Its active animation lasts 0.56 seconds. Constant Flux uses 1.2 active seconds to show the turns.
- Water IX has no damage. Two brief evasive intervals are a gameplay limit, not permission to ignore collision or become permanently invulnerable.
- Dead Calm and Flame Undulation currently defend the lab’s melee opponent; Blood Demon Art/projectile interactions are not implemented. Drop Ripple Thrust’s broader defensive applications are also not simulated.
- Waterfall Basin’s impact location and visual lift are a top-down approximation. There is no true height system, swimming or terrain destruction. Rengoku does not carve permanent ground damage.
- Water V still follows the common zero-HP plus F finishing rule, rather than automatically executing a yielding demon at arbitrary health.
- Elemental motifs remain blade effects. No autonomous water/fire creatures or persistent elemental damage fields.

## Scope, review and remaining animation work

The new animation defaults apply to `?water-lab=1` and `?flame-lab=1`. Existing tutorial/normal character ownership, progression and starter animation are unchanged pending review of this candidate. Neither lab writes player saves or awards XP.

The generated poses were inspected before registration and again in Chromium. They provide genuine body changes, including an upside-down Water Wheel, rather than rotating one upright portrait. Nevertheless, frame spacing, subtle anatomy/cloth consistency, sword-edge cleanup, additional in-betweens, directional body art and exact shoulder/hip timing still need visual review. North/south aims retain the three-quarter recruit views while effects and hit geometry follow the actual aim. Sound remains deferred. Do not label this pass fully source-accurate or production-complete.

## Validation

Production build and 18 test files / 55 defined cases pass. Tests cover complete choreography assignments, atlas bounds, inverted Wheel poses, correct rising/descending guards, quiet Calm, Flux turns, non-damaging IX and runtime cell-fragment cleanup, alongside the existing combat/progression suites.

Chromium checks exercise all 17 techniques, exact prepared hit results, costs/cooldowns, terrain, frontal/rear/expired defense, pause and finishing without save mutation. Additional checks inspect both bodies/styles, nine key live poses, paused frame stability and the previous-pose comparison. New Water and Flame recordings demonstrate the candidate in prepared encounters; these are not full tutorial playthroughs.

Next: Justin reviews these candidates; apply specific visual corrections, then resume the complete Thunder set followed by Wind.
