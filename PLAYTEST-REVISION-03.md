# Tutorial playtest revision 03

## The first and last moments

A three-panel introduction covers the setting, movement, mouse aim, three-cut combos, dodging, direct form controls, novice Breath costs, finite supplies and the timed F finisher. Gameplay is paused while it is open. Returning players can reopen it with How to play. Replay tutorial resets the introduction and supply caches.

The ending now has four beats: the seventh dawn; surviving recruits gathered before the attendants; welcome into the Corps and the world ahead; then the Kasugai crow. A pixel survivor vignette uses the approved recruit art with small original attendant silhouettes. The crow award is saved only on reaching its panel. Existing completed saves reopen the final panel. Uniform/rank/ore references are narrative; this build does not grant an inventory item or implement the headquarters hub.

## Mountain exploration

The connected world is now 4,960 × 1,400 world units (previously 4,960 × 620), with vertical camera travel. Optional northern overlooks, a bamboo upper path/lower campsite loop, quarry routes, a lower medicine cache and the cedar approach branch from the main route and reconnect. The Hand Demon's clearing has more vertical room. Mandatory investigation remains absent; E interactions are optional supplies or environmental lore. Region progression still follows the four training encounters.

Two fixed potion caches exist in the entire tutorial: the northern foothill satchel and lower waystation chest. New runs start with one potion and carry at most two. Full inventory leaves a cache untouched. Discovered caches persist across reload and checkpoints; they do not respawn during the run. A pickup creates a consumable checkpoint using current health/inventory. Retry restores the current checkpoint allocation; this is practice-friendly checkpoint behavior rather than permadeath resource loss.

## Novice combat balance

- Level-one forms cost 32 / 46 Breath (previously 20 / 32), with 1.8 / 3.2 second cooldowns. Breath restores at 8/s moving and 14/s stationary between forms. Basic cuts and stamina-based dodges provide the alternative to constant form use.
- A bounded cost-reduction helper is ready for future training integration; playable training progression is not implemented yet.
- Removed the automatic pre-boss health/potion grant. Prepare with the supplies you retained or found.
- Hand Demon: 430 vitality, 28 base damage, plus heavy/frenzy modifiers. It mixes lunges, sweeps, double claws and heavy strikes. Below half health, it moves faster and recovers sooner, with a different sequence. It tracks early in its windup before committing, and tries to angle its chase. Leaving it more than 650 units away allows it to return home and recover health.
- Some ordinary claw demons occasionally lunge. Melee uses pose tells; there are no Blood Demon Art floor-circle warnings in these low-level fights.
- The four-second close-range finisher and full recovery when missed remain unchanged.

## Grounded movement

Retained the approved torso/haori/head art. Running now combines those torso poses with procedural pixel legs, alternating foot contacts, push-off, wraps/shoes and small contact dust. Foot phases advance with actual distance, so pushing against collision does not play a running loop. Removed the upward running bob and the demon's alternating facing flip. Demons use the same grounded stance logic in their own palettes; the Hand Demon uses a low crawl through its existing poses. This is a hybrid animation pass, not a new hand-animated full sprite sheet. Dedicated north/south torso views and a full boss crawl sheet remain future art work.

## Playtest focus

1. Is the short introduction enough to start without outside instructions?
2. Are optional loops worth exploring, and can you find the way back?
3. Do limited potions and higher Breath costs create decisions without making the boss unfair?
4. Can you distinguish the boss's commitment and frenzy, and respond to its different attacks?
5. Does running look planted while keeping the artwork you liked?
6. Does the survivor ceremony make joining the Corps feel earned?

Sound, live AI missions, XP progression, equipment and the Corps hub remain future work.

## Validation

Production build and ten test files pass. Browser checks covered the modal introduction, actual keyboard exploration to the northern cache, both unique caches and reload, novice costs, stopped gait phase when stationary, real sword damage moving the boss into frenzy, and an actual aggressive boss hit. Ceremony checks verified the survivors appear before the crow, the award saves only on its panel, completed saves reload there, and replay resets the introduction and supplies. Those focused boss/outro checks used encounter setup/downed fixtures.

A separate AI-driven Water run physically explored the northern branch, collected its cache, fought all four encounters without health shortcuts, walked between regions, and persisted completion without page errors. Healing, checkpoint supplies, and full boss recovery after a missed finisher also passed. Human playtesting is still needed to judge difficulty and the hybrid running look.
