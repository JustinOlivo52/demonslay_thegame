# DemonSlay — current team report

## Owner decisions

- Pixel art is the approved gameplay direction for characters, animation and breathing effects. The illustrated version is historical reference; it is not the target animation pipeline.
- Justin approved the pixel mock's artwork and animation direction. This does not mean all animations are production-ready or the game has been fully playtested.
- Keep the canon Demon Slayer setting, breathing styles, Hashiras and major bosses. Original recruits, lesser demons and stories supplement that world.
- Ordinary demon melee attacks use character poses as tells, without red ground-circle warnings. Reserve area telegraphs for Blood Demon Arts; level 10+ demon abilities remain future work.
- Blocking for slayers and/or demons is a proposed future mechanic. Costs, mitigation, timing and animations are not decided or implemented.
- A demon must be finished before ash/victory. Missing its vulnerability window causes full recovery.
- Sound remains deferred.

## Implemented in this local branch

Pixel slayer/demon sprite sheets, Surface Slash poses and water effects, Water Wheel gameplay prototype, lab tools and scripted mock-combat controls.

Finisher first pass: zero HP enters a downed state. Within four simulation seconds and 90 world units, F triggers a slash effect, ash dissolution and victory. Missing the window restores full HP. Basic attacks and forms do not repeatedly damage the downed target. Pause freezes the timer. Lab reset clears the state. Demo controls attempt finishing automatically.

The zero-HP threshold, four-second window and 90-unit reach are provisional tuning choices; Justin requested a low-health finish opportunity and limited window, not these exact values.

Finisher presentation is an effect and text cue, not a completed sprite decapitation sequence. Sprite foot alignment, in-between frames, up/down views, arbitrary-aim matching and leftover effect alignment still need work. Water Wheel does not yet have somersault frames.

## Responsibilities

Justin: direction, feedback, checkpoint approval and eventual audio assets.
ChatGPT: art direction, candidate sprite/effect assets, gameplay design and bounded prototype implementation.
Claude: repository integration, gameplay architecture, builds and tests. Preserve newer work when integrating this local prototype.

## Next

1. Browser-test finisher success, out-of-range input, timeout/full regeneration, pause and reset.
2. Record the revised melee/finisher encounter for Justin.
3. Align sprite feet and improve attack transitions; create finishing poses.
4. Define blocking before implementation.
5. Continue the next approved gameplay checkpoint; retain the hub/crow/nighttime investigation mission plan.

## Delivery

Changes are local only, not pushed to GitHub. Original report is preserved in docs/REPORT-HISTORICAL.md; its old art restrictions, video-to-sprite pipeline and audio priorities are superseded by this report.

## Polished finisher verification

- Added frame-specific alpha-bound foot baselines to reduce sprite vertical jumps (effects baked into frames still limit perfect alignment).
- Added a short finishing strike and rendered head/body separation before the ash fade. Uses existing sprite poses/crops, not newly drawn execution frames.
- Added a small delay before demo controls finish the target so the countdown can be seen.
- Browser checks passed: out-of-range finisher refused; pause freezes countdown; timeout restores 125 HP; actual F input finishes nearby downed target; ash completes; reset clears vulnerability and restores health.
- Production build and all three test files pass. Blocking and dedicated Water Wheel poses remain outstanding.
- Debug state bridge is available only with ?finishTest=1 for browser verification. ?demo=1 enables scripted mock-combat controls.

## Main-game checkpoint 1: character creation

Justin approved preserving the development sandbox and the opening-chapter structure. Water and Flame are the two confirmed starting styles.

Implemented a separate main entry for character creation, male/female style-matched previews, name validation, editable offline origin templates, review and local profile saving. Saved records grant the correct first two style forms at level 1 and stop at selection-ready. Live AI backstories, playable appearance integration, the tutorial forest and hub remain future work. Sandbox is preserved at ?sandbox=1 and is lazy-loaded separately.

See CHECKPOINT-01.md for limits, files and verification. Seven automated tests and browser flow checks pass; Justin's checkpoint review is next. No GitHub push performed.

## First Final Selection forest slice

Implemented `?selection=1`, gated by a valid saved recruit. Added one bounded forest trail, two E-interaction clues and one activated demon encounter. Name/style/body choices carry into this scene; a limited shared motion sheet supplies the four recruit variants. Water/Flame starting forms use shared combat timing with style-dependent movement/effects. Existing sandbox remains separate and uses the same combat implementation.

No full trial, Hand Demon, crow or hub yet. Success saves only a first-encounter-clear record; no rewards or Corps promotion. See CHECKPOINT-02-FOREST.md for limits and review criteria.

## Lesser demon pool

Added five reusable pixel demon archetypes and a validated, seeded encounter descriptor for levels 1–5. Sandbox can choose archetype/level or roll an appearance. Forest tutorial uses a saved level-1 seed. Health bars, damage and regeneration use encounter stats. All five types currently share the same melee behaviour; Blood Demon Arts are absent. See DEMON-POOL.md for future validated AI-scenario integration and asset limitations. Browser pool checks pass with no page errors.

## GitHub synchronization

GitHub write access was restored. This source is prepared for branch `codex/pixel-selection-checkpoints`, targeting main through a review pull request. Earlier local-only delivery notes describe their historical handoffs. Latest scope: pixel sandbox, timed finisher, character creation, first Final Selection forest slice and seeded lesser-demon pool. Live AI services, the Hand Demon, full trial, crow and hub remain future work.

## Forest exploration redesign

Reworked the first forest slice into a winding route with an optional shrine branch, proximity-only evidence interactions, natural pixel canopies/props/light/mist and a compact gameplay HUD. Player, dodge, form advance and demon movement now respect the same path collision. The sandbox remains unchanged in function and retains its developer controls.

The browser tour walked the route, visited the shrine, inspected clues and completed combat/finishing without teleporting or page errors. Build and six test files pass. See FOREST-REDESIGN.md. Update targets the existing review branch and PR #2; main remains unmerged.

## Complete condensed tutorial for playtesting

Expanded Final Selection to three regular-demon encounters and the Hand Demon boss, with continuing checkpoints, two healing potions (H), checkpoint-aware retry/reload and a passing/crow vignette. A pre-boss rest grants at least 75 health and one potion. Boss attacks alternate sweep/heavy timing and remain melee tells without ground-circle warnings. Encounter staging uses the same authored forest/clearing; this is not a multi-region campaign. Final save records selection passed and crow received; the Corps hub remains next.

See TUTORIAL-PLAYTEST.md for play instructions, controls and limitations. Developer sandbox remains separate.

Validation: build and all seven test files pass. Automated browser playthroughs completed all four fights for Water and Flame with no page errors, then reloaded the saved crow ending. Separate checks verified H healing, checkpoint supplies on retry, and full boss recovery after a missed finishing window.

## First personal-playtest revision

See PLAYTEST-REVISION-01.md. Added smaller actors/wider movement space, faster movement, separate regional layouts, five melee patterns, a buffered three-cut sword chain, visible form navigation and independent Breath, plus a 28-frame generated run/dodge sheet. Training has a capacity hook but no playable progression yet. Character creator remains unchanged.

Validation: build and eight test files pass. Browser input checks verified combo damage, both form-navigation methods and independent Breath. Full Water and fixed-seed Flame playthroughs cleared all four fights, persisted crow completion and had no page errors. Healing, boss full recovery and checkpoint retry supplies passed. New run/dodge art rendered without page errors. Developer demo retreat was bounded after a double-strike encounter exposed an overly defensive demo policy.
