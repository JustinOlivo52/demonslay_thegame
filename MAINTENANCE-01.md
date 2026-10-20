# Maintenance 01 — practice access, controls and fullscreen

## Problems found

The main `?sandbox=1` link opened the older arena, which contained only two starter forms. The complete Water/Flame scenes lived behind separate links, making the normal training entry look incomplete. The legacy form dropdown also kept focus after selection; its keyboard handler deliberately ignores select/input elements, so Q was ignored until focus returned to the arena.

The full technique scene had additional usability problems: numeric keys only selected rather than casting, the cast button sat below the long form list, the default target was outside many attacks' reach, the opponent was stationary unless an advanced setting was found, and a window blur paused the scene without a prominent resume overlay. Finishing or exhausting resources could appear to end practice without an obvious next action.

## Repairs

- Main sandbox entry opens the complete Water or Flame scene, using the recruit's saved style when available. Explicit `style=water` / `style=flame` overrides it. Thunder/Wind retain their existing two-form labs and are labeled accordingly.
- Water/Flame practice has visible style navigation, direct number/numpad casting, a nearby Q/cast control, mouse-click/J sword input, Fight demon, New round, refill and timed finishing controls.
- Free forms is on by default in these developer scenes: no Breath spending or form cooldowns. Disable it for normal resource tests. In stationary free-form practice, targets line up for the selected technique; combat mode does not reposition a moving opponent. Target lineup and auto-aim are developer conveniences, not changes to normal combat geometry.
- Auto-aim practice target defaults on and can be disabled for manual aim. Leaving the canvas no longer redirects aim toward the settings panel.
- A visible pause overlay explains window-blur pauses and provides Resume practice. Controls return focus without scrolling the page. New round restores the player, resources and target while retaining practice settings.
- The preserved two-form arena remains at `?sandbox=1&legacy=1`; its dropdown now returns keyboard focus correctly. Existing `finishTest`/demo entries remain available for developer tooling.

Water V still requires a yielding target, IX is non-damaging footwork and XI is defense. Flame VI–VIII remain unrevealed/unavailable. No saves, XP, owned forms, tutorial unlocks or progression are granted by practice.

## Fullscreen

A Fullscreen / Exit fullscreen button is available in technique labs, the preserved arena, Final Selection and headquarters. It uses the native browser API from a player click. Layout and Phaser scale refresh after the transition, and the game regains input focus. Escape is reserved for leaving fullscreen before ordinary game pause/guide handling resumes. Failed requests show a visible message and keep the control usable; unsupported browsers disable the control with an explanation. Embedded previews may require opening the game in its own tab.

This is optional fullscreen, not automatic entry. It does not change operating-system sleep settings or the chat client's execution/cancellation behavior.

## Validation and remaining owner check

`npm run build` passes. `npm test` passes all 19 test files / 58 defined cases, including three new fullscreen-control tests with a mocked DOM/native API. Those tests verify request/exit, control state/focus, Escape protection, rejection recovery and unsupported feedback; they are not proof of native rendering in a real browser.

Real Chromium checks were attempted but launch fails in the execution sandbox with `setsockopt: Operation not permitted`. Requests for extra network permissions repeatedly stalled/cancelled before execution. Therefore this maintenance pass has **not** been browser-verified here. The previous art/ability checkpoint's browser results do not count as validation of these UI changes. The existing bundle-size warning remains.

Justin's application checklist after deployment:

1. Enter Developer sandbox and confirm Water shows eleven entries / Flame six usable entries.
2. Cast several forms repeatedly using numbers, cards plus Q and the visible cast button; test numpad too.
3. For Water V enable Yielding target. For IX/XI expect movement/defense, not direct damage.
4. Start Fight demon, attack/dodge, finish with F, then use New round and repeat.
5. Disable Free forms and test Breath/cooldowns; refill and resume. Verify the recruit's saved progression stays unchanged.
6. Switch tabs and return: the pause overlay should resume cleanly.
7. Enter/exit fullscreen in practice, tutorial and headquarters; verify scale, mouse aim and keyboard focus. Try Escape and the exit button.
8. Report browser/device and the exact steps for any remaining issue.
