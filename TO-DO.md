# Next tasks

## Justin

- [ ] Playtest character creation and the complete condensed Final Selection tutorial on the review branch.
- [ ] Review Water/Flame controls, healing, finishing, boss tells, difficulty, checkpoint retry/reload and the crow scene.
- [ ] Send browser/device, steps and expected/actual results for bugs.
- [ ] Review headquarters navigation, character scale, room save/resume and destination clarity. Hub foundation authorized on October 18; further content still follows playtest checkpoints.
- [ ] Audio assets later; sound remains deferred.

## Development after feedback

- [ ] Fix tutorial playtest blockers and tune difficulty.
- [ ] Improve sprite alignment, directional sets and dedicated Water Wheel/Flame/finisher animation.
- [x] Build the headquarters courtyard, room/save journal, destination introductions and sandbox practice link.
- [ ] Build playable crow assignments, earned training, editable loadouts and mentor/Swordsmith travel.
- [ ] Add XP, inventory and upgrade economy at their checkpoints.
- [ ] Define blocking rules before implementing them.
- [ ] Connect validated AI origins and mission scenarios through a backend, with fallback content and saved seeds.
- [ ] Retain the independent developer sandbox for testing.

Current handoff: TUTORIAL-PLAYTEST.md and report.md. No live AI service or audio is required to play this build.

## Second playtest

Review PLAYTEST-REVISION-01.md: movement, three-cut combos, readable melee patterns, Breath/form navigation and four regional layouts. Remaining art: north/south movement and dedicated sword combo poses. Future hub work: training that increases Breath capacity, plus progression/save design.

## Third personal playtest

Review direct form activation, smaller character scale, walking between training clearings and checkpoint reload. Investigation is reserved for later crow missions, not required in this training arc.

## Playtest revision 03

Next personal review: intro clarity, optional-route navigation, limited supplies, boss fairness, grounded recruit/demon running and the survivor ceremony. Remaining art: dedicated north/south poses, detailed attendant sprites and a full Hand Demon crawl sheet.

## Headquarters art and owner feedback

- [ ] Justin: judge the new courtyard/room scale and palette alongside the approved recruit sprites.
- [ ] Development: replace simple building/garden blockout art with richer consistent tiles and NPC sprites after layout feedback.
- [ ] Development: implement the first mission loop before adding live AI.

## Progression checkpoint

- [x] Tutorial XP, level-up health restore, three spendable stat points per level, character stats dialog, save migration and replay reward protection.
- [ ] Justin: playtest level-3 Hand Demon difficulty and different Vitality/Endurance versus damage allocations. Replay retains stats; a new recruit identity starts at level 1.
- [ ] Development: first mission XP/rewards, a separate breathing-form skill-point budget and purchases/upgrades. The level-50 framework is present; the playable tutorial currently ends at level 4.

## Breathing-style passes

- [x] Thunder: starter choice, two distinct techniques, gold runtime cloth palette, former-Hashira mentor, seven-form catalog.
- [ ] Justin: judge Thunder's dash readability, five-cut Rice Spirit timing and outfit/effects in screenshots/video and playtest.
- [ ] Development: apply Thunder feedback, complete the existing Water/Flame/Thunder/Wind sets before Mist. See BREATHING-STYLES-ROADMAP.md.
- [ ] Dedicated Thunder iai/sheathing frames and stronger five-cut body animation; current shared poses/palette are provisional.
- [ ] Higher-form skill purchases and individual technique passes; Sun/Moon special paths remain reserved.

## Wind style checkpoint

- [x] Wind starter, green male/female outfit treatment, two distinct techniques, nine-form reference catalog and Sanemi introduction.
- [ ] Justin: review vortex travel/clarity and four-claw attack readability in the next recording/playtest.
- [ ] Development: dedicated Wind body poses and tuning from feedback, finish the four existing style sets before Mist. Skill purchases remain separate work.

## Complete Water checkpoint

- [x] Eleven functional Water forms in a dedicated developer lab, with water VFX, finite hit windows, movement/terrain checks, Breath costs and cooldowns.
- [x] Conditional merciful cut, precise thrust, escalating Flux strikes and finite Dead Calm melee defense.
- [ ] Justin: compare each form’s feel and readability in `?water-lab=1`; review the recording.
- [ ] Dedicated somersault/sheathing and form-specific body frames; current poses are shared prototypes.
- [x] Complete all six revealed Flame forms in the developer lab.
- [ ] Next: complete Thunder and Wind before adding Mist.
- [ ] Wire higher forms into level eligibility, earned skill purchases and upgrades; lab access grants no saved ownership.

## Complete Flame checkpoint

- [x] Six revealed techniques, warm Flame outfits/effects, costs/cooldowns and canon-number hotkeys in `?flame-lab=1`.
- [x] Unrevealed VI–VIII remain disabled and cannot be selected or purchased.
- [x] Test all six real casts, front/rear/expired defense, charge collision, resource pressure, pause and finishing; regress all eleven Water forms after shared-scene extraction.
- [ ] Justin: review Flame Tiger, Rengoku and the frontal guard in the recording/lab.
- [ ] Dedicated upward/downward and defensive sword body frames; existing shared poses are provisional.
- [ ] Next: Thunder’s remaining forms, followed by Wind.

## Source-fidelity candidate — Water and Flame

- [x] Review all 17 revealed techniques against indexed reference descriptions and document deliberate adaptations.
- [x] Add 48-cell pose atlas, per-form sequences, strike-aligned contact, narrower Wheel contact and non-damaging ninth-form footwork.
- [x] Quiet Calm, turning Flux, rising/descending Flame guards, enveloping Tiger and Rengoku flame-dragon motif.
- [ ] Justin: review new Water/Flame videos and use **Compare previous body poses** for the body-only comparison.
- [ ] Refine in-betweens, directional body art, anatomy/cloth consistency and exact shoulder/hip timing against selected manga/anime shots.
- [ ] Carry reviewed candidates into normal tutorial/starter animation; current changes are isolated to technique labs.
- [ ] Apply feedback before resuming the full Thunder set, then Wind. See SOURCE-FIDELITY-01.md.

## Practice/fullscreen maintenance

- [x] Route the normal sandbox entry into complete Water/Flame practice; repair legacy form-dropdown focus.
- [x] Direct number/numpad casting, visible cast/fight/new-round/refill/pause controls and free-form practice.
- [x] Optional native fullscreen in practice, tutorial and headquarters, with unsupported/rejected feedback.
- [x] Production build and 19 test files pass.
- [ ] Justin: run the application checks in MAINTENANCE-01.md after deployment. Native browser testing remains blocked here; do not call these UI changes browser-verified.

## Thunder / Wind full-kit review

- [ ] Justin: test all 7 Thunder and 9 Wind forms, both recruit sprites, normal/slow motion and moving targets.
- [ ] Justin: report any visual, input or combat issues using the form number and browser.
- [ ] Development: resolve playtest feedback, then plan campaign purchase integration and personal-form acquisition rules.
- [ ] Later: audio and custom directional in-between poses.

Build/automated checks pass; real browser verification remains blocked in the development runtime. Full details: [THUNDER-WIND-FORMS-COMPLETE.md](THUNDER-WIND-FORMS-COMPLETE.md).

## Sandbox cast-position repair

Removed automatic target repositioning on form selection and arena resets when starting a fight or repeating a legacy form. Optional Place target ahead moves only an idle target; normal casting stays in place apart from authored technique motion. Flame exposes six playable forms (I–V, IX), with VI–VIII explicitly disabled. See [MAINTENANCE-02.md](MAINTENANCE-02.md) for validation and the browser retest checklist.
