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

## Playtest revision 02 — direct forms and connected training

Number keys, numpad and numbered cards now cast directly; Q repeats the selected form. Physical keydown handling and action-edge buffering avoid missed short taps. A connected four-region scrolling training world replaces panel transitions, with automatic combat lessons and no mandatory investigation. Victories save immediately; cleared checkpoints resume travel and allow backtracking. Recruit/demon/boss sizes are 80/96/144. The approved creator and pixel-art direction are preserved.

Validation: build and 20 tests across nine files pass. Browser checks covered actual form damage and row/numpad/card inputs for Water and Flame, three keyboard-traversed links, backtracking, travel pause/resume and the crow ending. Route checks used cleared/downed fixtures. A separate full Water combat run completed every fight and transition without health shortcuts or page errors, saved its crow and passed healing, boss recovery and retry-supply checks. See PLAYTEST-REVISION-02.md.

## Playtest revision 03 — exploration, challenge, onboarding and ceremony

Added a three-panel controls introduction and a four-beat survivor ceremony before the crow award. Expanded the mountain to 4,960 × 1,400 with optional loops/overlooks, landmarks and two persistent medicine caches. New runs start with one potion and carry two. Removed the pre-boss refill; novice forms cost 32/46 Breath and regenerate more slowly. Hand Demon now has 430 vitality, varied pressure attacks and a faster second phase. Running uses distance-driven, planted procedural feet beneath approved torso art; demons no longer flip their facing every other walk pose. This is a hybrid motion pass, with dedicated directional/boss sprite animation still future work.

Validation: build and ten test files pass. Focused browser checks passed for intro, actual exploration/pickups, persistent caches, grounded gait stopping, real boss damage and frenzy, and ceremony award timing/reload/replay without page errors. A separate AI-driven full Water run explored, collected, fought all four encounters without health shortcuts and persisted its crow. Healing, retry supplies and boss full regeneration passed. See PLAYTEST-REVISION-03.md.

## Headquarters foundation — October 18

PR #6 is merged on main at `1c40e71b8f58c133f620f7e707c94dcafd0cdcae`. GitHub exposed no commit checks or deployment result for that revision; live Netlify deployment was not confirmed. Owner granted ongoing routine development/merge/deployment authorization.

Added `?hub=1`, accessible only with the matching recruit’s earned crow. Ceremony and returning-recruit links reach a walkable, code-painted pixel headquarters, five destination introductions, a personal room, explicit journal saving, a read-only starting-form rack and a practice-sandbox return link. Hub saves are separate, versioned, validated and identity-bound; existing tutorial saves remain compatible. Water/Flame mentors are Giyu/Rengoku. Dialogs pause movement and keep keyboard focus; storage errors are surfaced. The new map is a first visual blockout, with more detailed tiles and NPC animation still ahead.

No live mission generation, assignment launch, crafting, progression rewards, editable loadout or estate travel is claimed in this slice. See HEADQUARTERS-CHECKPOINT.md for owner playtest steps and remaining work.

Validation: TypeScript/Vite production build and all eleven test files pass. The browser walkthrough seeded a completed tutorial save (it did not re-fight the tutorial), followed the real ceremony link, then used actual keyboard movement/E interactions to visit all five destinations, save/reload the room, review granted forms, return through the sandbox, and verify Water/Flame mentor assignment and hub identity isolation. Modal movement blocking/Escape and forced localStorage failure passed with no page errors. A short video excerpt shows this browser-driven tour. The existing Phaser bundle-size warning remains.

## Headquarters artwork refinement 01

Refined the headquarters architecture, clustered foliage/wisteria, garden stonework/koi and room materials. Added a shared pixel crow painter for the courtyard perch and crow-award ceremony, with hooked bill, stepped feathers, eye highlight, talons and messenger band. Northern trees now paint behind buildings; the camera looks farther north to expose roof detail. Existing collision, interactions and local-save data are unchanged. See HEADQUARTERS-ART-01.md. The crow remains a static pixel illustration, with its existing CSS arrival transition in the ceremony.

Validation: production build passes. A recorded browser tour against the built `dist/` preview walked to the crow, entered the room, saved at the journal, and opened the completed selection/crow ceremony, with no page errors. The tour uses a completed-selection fixture; it is not a new combat playthrough. Screenshots verify the world crow, ceremony close-up, room and corrected tree/building order. Production verification exposed a pre-existing remote Google Fonts import failure that could reject the lazy combat stylesheet; external font imports were removed and existing local/system fallbacks now load without that dependency. Existing Phaser bundle-size warning remains. Gameplay/collision/save rules were not changed by this art pass.

## Character progression foundation

Replaced the playable tutorial’s fixed level-1 behavior with one-time finisher XP, a level-50 progression framework, full HP restoration on level-up and three spendable stat points per level. Vitality adds max HP, Endurance max stamina, Strength sword damage and Focus breathing-form damage. A paused stats dialog works in selection and headquarters; upgraded caps/damage are used by combat and potions. New recruits reach level 3 before the Hand Demon and level 4 afterward. Form skill currency/unlocks/training remain separate future work.

Progression lives in the existing identity-bound selection checkpoint with reward receipts and a validated point budget. Old checkpoints receive prior-clear XP credit once. Replay keeps growth/receipts, so it cannot farm rewards. Allocation commits only after a successful write. See PROGRESSION-01.md for permanent-allocation, replay and storage behavior.

Validation: production build and all 31 tests across twelve test files pass. Browser checks used downed fixtures and real finisher inputs to verify XP and HP restoration; actual sword and breathing hits verified damage bonuses. Stats dialog paused movement, resource caps and upgrades persisted across reload, a forced storage failure did not spend points, headquarters showed the earned level, and replay did not award old XP/heal again. No page errors. This was not a new full four-fight combat playthrough; boss balance needs owner playtest. Existing Phaser bundle-size warning remains.

## Incremental breathing styles — Thunder first pass

The 14-style canon catalog was already present. Thunder is now the third playable starter, preserving one chosen style/two granted forms and keeping Sun/Moon unavailable as starters. Added a gold runtime cloth variant for the approved male/female poses, Jigoro Kuwajima's former-Hashira introduction, a separate Thunder sandbox entry, and a chosen-style form catalog with level requirements. The catalog is reference/eligibility only; higher forms cannot be purchased/cast yet.

Thunderclap and Flash has a grounded charge, 260-unit active-time dash, directional/substepped hit detection, lightning trail and selected-recruit afterimages. Rice Spirit has five timed directional strikes (9 base damage each) rather than damage every frame. Thunder uses warm hit tint to keep the demon readable during repeated hits. Existing shared poses and palette treatment remain provisional; dedicated iai/sheathing and more complete five-cut body animation are future art work. See BREATHING-STYLES-ROADMAP.md for the remaining one-style-at-a-time queue.

Validation: production build and all thirteen test files pass. Browser checks created/saved a male Thunder recruit, verified actual dash/Rice Spirit damage, movement/collision, resource costs, seven-form catalog and paused input, reload and former-Hashira mentor, then exercised real Water/Flame casts. No page errors. A separate female Thunder visual tour checks both real form damages and records the updated tint/catalog. These are focused prepared-encounter checks, not a new full tutorial playthrough. Existing Phaser bundle-size warning remains.

## Incremental breathing styles — Wind first pass

Wind is the fourth playable starter, with two granted forms, a green runtime cloth treatment for approved recruit poses, Sanemi Shinazugawa's Wind Hashira introduction and a nine-form reference catalog. Dust Whirlwind Cutter advances 150 units through an active-time circular attack with spiral gusts and dust/leaf flecks. Claws-Purifying Wind renders four forward claw-like cuts but applies one damage event in its actual forward fan. Costs are 34/44 Breath; base damage is 40/48. The independent lab is `?sandbox=1&style=wind`.

Shared technique phase/travel/geometry/window logic now lives in `src/techniques.ts`, retaining Water/Flame adaptations and Thunder's five Rice Spirit windows. Unsupported styles are rejected by the registry; Sun/Moon remain special paths rather than starters. Existing save IDs and two-form ownership rules remain compatible. Green palette and shared body poses are first-pass art, not dedicated Wind animation sheets; higher forms, skill purchases and estate travel remain future work. Full Water, Flame, Thunder and Wind sets now precede Mist; see BREATHING-STYLES-ROADMAP.md.

Validation: production build and all fourteen test files pass. Browser checks created/saved a male Wind recruit, exercised both real casts for damage/movement/costs, tested terrain collision, catalog/modal input, reload and Sanemi's introduction. Water/Flame/Thunder real casts passed, including Thunder's five-hit Rice Spirit after the shared registry change. No page errors. These are focused prepared encounters, not a new full tutorial playthrough. A separate female Wind recording verifies the final visual pass. Existing Phaser bundle-size warning remains.

## Complete Water prototype — latest checkpoint

All eleven Water forms are implemented in a standalone `?water-lab=1` scene, reachable from the preserved sandbox. Rules live in `src/water-kit.ts`, rendering in `src/water-effects.ts`, and the scene/UI in `src/water-lab.ts`. Stable catalog ID mapping prepares later progression integration. Existing tutorial/character ownership remains two granted forms; the lab never writes saves or awards progression.

Distinct mechanics include S-path Flowing Dance, four-cut Striking Tide, yielding-only Blessed Rain, three-cut Whirlpool, narrow Drop Ripple Thrust, placed Waterfall Basin, zigzag/evasive Turbulent, escalating Constant Flux and finite melee-only Dead Calm. Dead Calm is a developer preview of Giyu’s personal form, not an automatic player grant. This does not introduce a general block action. Shared pixel body poses remain provisional; dedicated somersault/sheathing choreography, swimming, sound and higher-form progression integration remain future work. See WATER-FORMS-COMPLETE.md.

## Complete Flame prototype — latest checkpoint

Flame’s six revealed forms (I–V and IX) are implemented in `?flame-lab=1`, linked from the preserved sandbox. VI–VIII are explicitly disabled unrevealed slots; no canon forms or names have been fabricated. Stable catalog mappings preserve `flame-09` for Rengoku, not the sixth list index. Normal recruits still own two starter forms.

Mechanics: Unknowing Fire rushes 155 units for one forward cut; Rising Scorching Sun uses an upward arc; Blazing Universe uses a descending strike; Blooming Flame Undulation has three cuts and a finite frontal melee guard; Flame Tiger has a three-cut tiger-shaped flourish; Rengoku spends 72 base Breath on a 300-unit committed rush and one 96-damage strike. Fire effects are blade VFX, without summoned AI creatures, autonomous projectiles or damage-over-time fields. All travel respects terrain. Guard has vulnerable preparation/recovery and does not protect the rear.

The shared `src/technique-lab.ts`/`.css` scene now hosts both full Water and Flame previews, configured separately by each style’s wrapper. Pure mechanics/effects remain separate. This avoids copying the practice combat loop for every upcoming style. The old Water-only CSS is replaced by the shared stylesheet. Both male/female Flame recruits use the existing warm-outfit sprite columns. Dedicated per-form body animation, sound and higher-form skill-purchase/upgrade integration remain future work. No progression/save writes or XP awards occur in either lab.

Validation: production build and all 16 test files (49 defined cases) pass. Chromium verified exact damage/travel for all six Flame casts, hotkeys/disabled slots, cooldown and insufficient-Breath rejection, a live frontal AI deflection, rear damage and damage after expiration, pause, charge terrain collision, target/full reset behavior, finish timeout/full recovery and success, both body selectors, unchanged local storage and no page errors. All eleven Water browser checks also pass after the shared-scene extraction. Focused prepared encounters, not a new full tutorial playthrough. See FLAME-FORMS-COMPLETE.md. Next full-set pass: Thunder, followed by Wind before Mist.

## Latest checkpoint — description-led Water/Flame choreography candidate

SOURCE-FIDELITY-01.md supersedes the earlier shared-body-pose reports. All 17 revealed techniques now have authored sequences over a new 48-cell generated atlas, with proper tuck/inverted/landing, turning, thrust, still drawn-blade, low/high guard, rising/descending and charge poses for male/female Water/Flame recruits. The atlas is registered on a fixed 181-pixel grid with runtime masking of detached neighbor fragments. A lab setting compares the previous body poses under the revised mechanics/effects.

Mechanic corrections: Water Wheel becomes a narrower forward sword lane with 0.56 active seconds; IX loses its invented four-hit combo and is non-damaging footwork; Flux has 1.2 active seconds and three matching body/effect turn cycles. Strike windows begin at cut/thrust/landing beats. Calm becomes visually quiet with brief blade contact flashes. Flame guards now distinguish rising/descending cuts, Tiger wraps the recruit and Rengoku gains an enveloping flame-dragon motif.

Source evidence is indexed secondary technique descriptions, not a measured official video/panel comparison. More directional views, in-betweens, anatomy/cloth consistency and precise shoulder/hip timing remain. Do not call this frame-exact or production-complete. Existing normal tutorial animation and ownership/progression remain unchanged; candidates are isolated in the full technique labs for review before integration. No save mutation, XP awards, elemental summons, terrain destruction, swimming or new audio.

Validation: production build and 18 test files / 55 defined cases pass; focused Chromium checks cover all 17 techniques, key new poses, all four recruit variants, finite defense, strike results, resources, terrain, pause, comparison, timed finishing and unchanged saves. New complete Water/Flame recordings show the candidate in prepared encounters, not a full tutorial playthrough. See SOURCE-FIDELITY-01.md before continuing Thunder/Wind.

Final visual refinement: `public/art/technique-motifs.png` contains three generated, inspected pixel heads (water dragon, flame tiger, flame dragon). The lab binds them to the corresponding blade trails; they have no independent movement, collision or damage. This replaces the earlier geometric placeholder faces.

## Latest maintenance — practice and fullscreen

The main sandbox link previously opened the old two-form arena; complete Water/Flame scenes were separate. Legacy dropdown focus caused Q to be ignored after selection. The new practice entry routes to full Water/Flame and labels Thunder/Wind as two-form previews. Legacy mode remains accessible with `legacy=1` and now restores keyboard focus.

Full labs add direct numeric/numpad casting, visible cast/Fight demon/New round/refill controls, free-form resource mode, optional auto-aim and stationary-target lineup, mouse-click sword input and an explicit blur-pause/resume overlay. No saved ownership, XP or normal progression changes. Optional native fullscreen is shared across labs, the legacy arena, tutorial and headquarters; focus/scale refresh, Escape handling and unsupported/denied feedback are implemented.

Validation: build and all 19 test files / 58 defined cases pass. New fullscreen tests use a mocked DOM/native API; they are not native-browser rendering tests. Chromium launch is blocked by sandbox socket restrictions and extra-permission requests stalled/cancelled, so these maintenance UI changes are not browser-verified. MAINTENANCE-01.md records causes, scope, limits and the application checklist. Do not reuse earlier animation browser results as proof for this pass.

## Full Thunder / Wind practice pass

The developer sandbox now routes all four starter styles to complete numbered kits: Water 11, Flame 6 revealed, Thunder 7 and Wind 9. Thunder/Wind receive distinct strike sequences, terrain-aware movement, authored pose timing and procedural elemental effects; their runtime palettes cover every recruit sheet. Wind III offers finite nearby-melee defense; IX locks its forward impact area. Thunder II–VI use bounded human sword adaptations rather than Kaigaku's Blood Demon Art. Tutorial ownership/purchases are unchanged.

Production build and 21 test files pass; Chromium still fails to launch, so no browser playtest or recording is claimed. [THUNDER-WIND-FORMS-COMPLETE.md](THUNDER-WIND-FORMS-COMPLETE.md) contains technique details, source-reference limitations and today's owner checklist.

## Sandbox cast-position repair

Removed automatic target repositioning on form selection and arena resets when starting a fight or repeating a legacy form. Optional Place target ahead moves only an idle target; normal casting stays in place apart from authored technique motion. Flame exposes six playable forms (I–V, IX), with VI–VIII explicitly disabled. See [MAINTENANCE-02.md](MAINTENANCE-02.md) for validation and the browser retest checklist.
