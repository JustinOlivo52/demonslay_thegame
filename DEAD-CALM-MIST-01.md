# Dead Calm revision and Mist sandbox

## Dead Calm

Water XI now opens with a falling droplet and expanding ground water circle. After a 0.55-second opening it holds a planted **10-second** nearby-melee guard, followed by 0.4-second recovery. Cost: **75 Breath**, cooldown **28 seconds** from cast start. No damage or movement; attacks during opening and recovery can hit. This is a game adaptation of defensive swordsmanship, not a source claim of ten-second universal invulnerability.

Movement input, sword, dodge, another keyboard cast, or the End defensive stance button ends the active stance. The spent Breath/cooldown remain. Pause freezes its simulation timer. Nearby incoming melee produces a short blade response and parry feedback. Remote Blood Arts and environmental hazards are not covered by this revision. The normal campaign still gates personal techniques; this revision is available in the Water developer lab.

## Mist

See [STYLE-01](docs/style-tasks/01-MIST.md) for all seven descriptions, current adaptation rules and remaining review/integration work. Open `?sandbox=1&style=mist`, press 1–7 or select a form and Q. Practice Blood Art bolts exercises III; Fight demon exercises normal melee and VII tracking. Both practice actors retain their positions when forms are selected/cast.

## Validation

- TypeScript and Vite production build.
- Full Node test suite, including Mist contact/resource/movement/deflection/concealment boundaries, Dead Calm timing boundaries and choreography atlas coverage.
- Browser harness: `node scripts/test-mist-browser.cjs` requires Playwright, Chromium and a dev server on port 5173. Produces screenshots, recorded frames and a JSON check report in `/workspace/artifacts/mist-review`.

Player visual approval and actual mission/group/boss testing remain separate review gates. Sandbox access does not change campaign saves or grant progression.
