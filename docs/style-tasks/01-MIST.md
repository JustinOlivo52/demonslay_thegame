# STYLE-01 — Mist Breathing

Status: **sandbox implementation; awaiting player visual review and campaign integration**.

Open `?sandbox=1&style=mist` (or `?mist-lab=1`). Select a form and Q, or number keys 1–7. Both recruit bodies use the existing pixel pose atlas with authored per-form sequences and new procedural mist trails. This is a first adaptation, not new bespoke frame-by-frame sprite art or a verified shot-for-shot reconstruction.

## Form designs

Source descriptions below are working paraphrases of the depicted techniques. English translations differ. They have not been freshly checked panel by panel; the reference catalogue is `src/data/breathing-catalog.json`. Damage, timings, ranges, concealment rules and costs are game adaptations.

| Form | Depicted technique | Current sandbox behavior |
| --- | --- | --- |
| I — Low Clouds, Distant Haze | Strong forward thrust | Narrow directional thrust, one contact, short advance |
| II — Eight-Layered Mist | Eight rapid cuts | Eight separate alternating contact windows; 60 total base damage |
| III — Scattering Mist Splash | Circular cut scatters projectiles | One circular hit; intercepts eligible practice bolts within 92 units only during the middle of the active sweep; no melee immunity |
| IV — Shifting Flow Slash | Sudden advance into a draw-cut | Low anticipation, terrain-limited dash, late contact |
| V — Sea of Clouds and Haze | Broad advancing series of cuts | Three connected sweeps on a winding path; fixed directional movement |
| VI — Lunar Dispersing Mist | Leap with downward cuts | Rising/descending body poses, three forward contacts, landing; no aerial invulnerability |
| VII — Obscuring Clouds | Muichiro's personal tempo-changing technique | Three brief bursts interrupt tracking: demon aims/chases the cast origin instead; existing strikes/bolts still hurt; no invulnerability |

## Review checklist

- [x] All seven catalog forms have separate movement, contact timing, body sequences and effects.
- [x] Sandbox navigation and keyboard casting.
- [x] III practice Blood Art bolt toggle, actual interception, finite damage outside the guard.
- [x] VII piecewise continuous speed changes and temporary tracking disruption.
- [x] Movement uses existing forest collision; casting does not recenter either actor.
- [ ] Justin reviews all seven at normal speed, both bodies, forest edges and one/group/boss encounters.
- [ ] Compare selected source footage/panels before final choreography approval.
- [ ] Add dedicated in-between poses where the shared atlas falls short.
- [ ] Decide VII special training acquisition.
- [ ] Campaign style choice, first two grants, purchases, equipment, upgrades, saves and migrations.
- [ ] Real mission Blood Art eligibility and projectile rules; this lab's bolts are a bounded test fixture.

This work adds a sandbox expansion. It does not silently unlock Mist on existing recruits or claim all remaining styles are V1 requirements. Sound remains off.
