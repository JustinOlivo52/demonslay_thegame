# Maintenance 02 — cast in place and clarify Flame forms

## Report

Justin observed both player and demon returning to the center when testing techniques, and asked whether Flame forms were missing.

## Paths corrected

- Full lab: selecting a form (including every numeric-key cast) automatically repositioned the idle target. Removed that side effect; selection and casting preserve both positions. Optional **Place target ahead** now performs placement explicitly, uses current aim and refuses active actions/combat. It never moves the player.
- Full lab: **Fight demon** previously called the complete arena reset. It now starts combat at the current player/target positions, preserving health, resources and cooldowns. A finished demon or fallen player requires New round.
- Legacy arena: **Reset + demonstrate form** explicitly reset both combatants and forced the aim to zero. Replaced with **Repeat form · current position**, which calls the normal cast without reset or aim changes. Cast/repeat returns focus with scrolling suppressed.
- **New round / Reset encounter** still explicitly reset the scene. Normal technique dashes, flips and other authored movement remain intact.

These source paths explain target repositioning and explicit two-character resets. The exact route/button used in the reported session has not been captured in a browser, so this is not a claim that the symptom has been visually reproduced or fully verified.

## Flame menu

The implemented Flame kit contains six playable forms: I Unknowing Fire, II Rising Scorching Sun, III Blazing Universe, IV Blooming Flame Undulation, V Flame Tiger and IX Rengoku. Use keys **1–5 and 9**, or select a card and press Q.

Slots VI–VIII in the existing catalog are unrevealed placeholders, not implemented attacks. Their disabled labels now explicitly say the source technique is unavailable. The lab note lists all six playable names/keys. No invented replacement techniques have been added. The legacy/tutorial arena still exposes its two starter forms; use `?sandbox=1&style=flame` for the full set.

## Validation and retest

Production build and all 22 test files pass. Five new regression cases execute the actual full-scene methods with stubbed rendering/DOM, covering all 33 off-center selections, cast starts and first windup frames; explicit placement; in-place fight start; Flame menu completeness; and the legacy repeat handler. These checks do not replace rendered browser testing.

Chromium remains unavailable in the development environment. Justin's retest:

1. Open a full lab, walk away from the spawn, then cast via numbers, card + Q and Cast selected form. Player/target must not teleport; authored attack movement is expected.
2. Start Fight demon while away from center; combat should begin there.
3. Try Place target ahead between actions; only the target should move. It must refuse during AI combat, a cast or a downed finishing window.
4. Try legacy Repeat form; it should cast where you stand, respecting normal Breath/cooldowns. Only the explicit reset control should return both characters to their spawn points.
5. In the full Flame lab verify I–V and IX are playable; VI–VIII remain clearly disabled.
