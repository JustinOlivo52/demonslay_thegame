# Nightfall — DemonSlay

Personal Demon Slayer fan-game project. TypeScript + Phaser + Vite; pixel-art gameplay direction.

## Run in Codespaces or locally

Requires Node.js 24.

```sh
npm ci
npm test
npm run build
npm run dev
```

Open the printed Vite URL. In Codespaces, open port 5173 from the Ports tab.

- `/`: character creation (Checkpoint 1).
- `/?sandbox=1`: developer combat/Water technique sandbox.
- `/?demo=1`: scripted mock-combat demonstration.

## Current checkpoint

Create a named male/female recruit, choose Water or Flame, review/edit an origin and save locally. The completion screen prepares the profile for Final Selection; the forest and hub are not implemented. Backstories currently use local templates. Preview appearances are not yet fully animated playable variants. The sandbox keeps its existing test character.

See [checkpoint details](CHECKPOINT-01.md), [team report](report.md), [roadmap](docs/ROADMAP.md) and [art direction](docs/ART-DIRECTION.md).

Browser-local save only; no accounts, backend, live AI or audio. Clearing browser storage deletes the saved recruit. Combat requires keyboard/mouse. Generated character art requires further consistency/animation cleanup.

## First forest slice

After saving a recruit, choose **Enter Final Selection**, or open `/?selection=1`. Investigate two clues with E, fight one demon, and finish with F. This loads the saved recruit's appearance and Water/Flame style. See [forest checkpoint notes](CHECKPOINT-02-FOREST.md). The full trial, Hand Demon and hub remain future work.
