# Nightfall — DemonSlay

Personal Demon Slayer fan-game project built with TypeScript, Phaser and Vite. Pixel-art gameplay, browser first, single-player.

## Playtest the tutorial

Use Node.js 24. In Codespaces, select `codex/pixel-selection-checkpoints`, open a Codespace and run:

```sh
npm ci
npm run dev
```

Open port **5173** from the Ports tab. Create/save a recruit, choose Water or Flame and select **Enter Final Selection**. Existing recruits can enter directly at `/?selection=1`.

The condensed tutorial includes investigation, three lesser-demon encounters, a Hand Demon boss, healing, timed finishing and a passing/Kasugai-crow scene. Continue after each encounter. Progress saves between encounters; retry/reload restores the current checkpoint. The hub is the next development checkpoint.

See [tutorial controls and playtest notes](TUTORIAL-PLAYTEST.md).

## Controls

WASD move · mouse aim · click/J sword · 1/2 select form · Q cast · Space dodge · E investigate · H potion · F finish · Escape pause. Continue button/Enter advances after victory.

## Development entries

- `/`: character creation and saved recruit review.
- `/?selection=1`: player-controlled tutorial.
- `/?sandbox=1`: independent developer combat/technique sandbox.
- `/?selection=1&demo=1`: scripted tutorial demonstration; not normal player control.

```sh
npm test
npm run build
```

Build output is in `dist/`. Codespaces configuration installs dependencies and forwards port 5173. Phaser's lazy-loaded combat bundle currently emits a size warning.

## Current limits

The tutorial stages reuse one authored forest region/clearing; this is not a multi-region campaign or seven-night simulation. Backstories use local templates and enemy variety uses seeded rules; live AI services are not connected. No sound, accounts, cloud saves, hub, weapon upgrades, XP progression or blocking yet. Browser-local progress can be lost if site data is cleared. Several animations still need dedicated frames/directional cleanup.

See [team report](report.md), [roadmap](docs/ROADMAP.md), [art direction](docs/ART-DIRECTION.md), and [next tasks](TO-DO.md). Older checkpoint notes record the project's earlier state.

## Latest personal-playtest revision

See PLAYTEST-REVISION-01.md for faster movement, smaller actors, extra run/dodge poses, three-cut sword combos, visible form cards with Breath, distinct melee patterns and four tutorial regions. TUTORIAL-PLAYTEST.md has current controls.

## Playtest revision 02

Forms now cast directly from 1/2, numpad or their cards. The training route connects the four clearings through a scrolling world; no investigation is required. Victories save immediately and the next lesson begins after walking into its area. See PLAYTEST-REVISION-02.md.

## Playtest revision 03

Added a short controls introduction, vertical exploration loops with two finite potion caches, higher novice Breath costs, a two-phase Hand Demon, grounded hybrid run animation and a survivor ceremony before the crow. See PLAYTEST-REVISION-03.md.
