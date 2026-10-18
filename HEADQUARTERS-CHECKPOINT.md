# Corps headquarters — first playable slice

## How to enter

Complete Final Selection with your saved recruit and receive the crow. The final ceremony now offers **Enter Corps headquarters**. Returning players can use **Continue to Corps headquarters** on the character-creation page, or `/?hub=1`. A matching completed tutorial save is required; the URL alone cannot skip selection.

## What to try

- WASD or arrow keys: move. E or the interaction button: interact nearby. Esc: open/close the area guide.
- Use the destination list to mark a destination, then walk to it. Courtyard routes are broad; the garden pond and building footprints block movement.
- Enter **Your room**, approach **Your journal**, press E and reload. Headquarters resumes in your room. Walk to the southern exit to return outside.
- Review the equipment rack: it lists the two forms granted by your chosen style. This is a read-only starting-loadout view.
- Visit the crow, training grounds, Swordsmith route and Hashira estate gate. Water is assigned to Giyu Tomioka; Flame to Kyojuro Rengoku.
- Training opens the preserved developer sandbox. Use its **Return to headquarters** link afterward. Sandbox practice awards no XP or training stats.

## Save behavior

`nightfall.headquarters.v1` is a separate versioned, validated browser-local save, matched to the same name/body/style identity as the tutorial. Location, visited destinations and the welcome flag save after hub interactions and room transitions; the journal explicitly confirms writing the save. Resume uses a safe entrance position rather than arbitrary saved coordinates. Tutorial health, potions, pickups and completion are not changed by visiting headquarters. A different recruit starts a separate current hub state; this is not a multi-character save-slot system. Clearing browser site data removes saves. Storage failure is shown honestly rather than reporting success.

## Scope and next work

This is a walkable pixel-art headquarters blockout with the existing approved recruit sprites and hybrid movement. The initial environment uses code-painted buildings, wisteria, a pond, gates and furnishings; richer tiles, NPC sprites and directional animation remain art work. Sound is deferred. Morning is fixed in this safe area.

The crow introduces future assignments; it does not generate or launch missions yet. Swordsmith/estate gates provide introductions, with no travel, crafting, equipment economy or mentor progression. Room loadouts are read-only. No new XP, currency, healing rewards or rank progression is introduced here.

Next: owner playtest of navigation and scale, then the first crow-assigned mission loop with validated seeded mission descriptors, connected investigation areas, reward/save design and future AI-generated prose behind a backend. Training and upgrades follow their own progression budget. Live AI is not required for this checkpoint.

## Verification

Pure tests cover earned-crow access, identity isolation, corrupted saves, visit uniqueness, save snapshots, collision and approaches to all five destinations. Browser verification uses completed tutorial save fixtures to check the ceremony-to-hub handoff and actual keyboard movement/interactions; it does not re-fight the tutorial. See the current team report for the final verification results.

## Artwork update

The initial blockout has received its first visual refinement: tiled roof depth, shoji/timber detailing, clustered wisteria, pond stones/koi, room textures and a shared detailed Kasugai crow. See HEADQUARTERS-ART-01.md. Navigation and save behavior remain the same; the camera shows more northern architecture.
