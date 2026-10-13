# Nightfall — V1 combat prototype

Personal Demon Slayer-inspired fan-game project. TypeScript, Phaser 3 and Vite. Characters are original AI-generated illustrations animated in code; scenery and effects are drawn in code. See [art direction](docs/ART-DIRECTION.md).

## Run

Requires Node.js 24.

```sh
git clone https://github.com/JustinOlivo52/demonslay_thegame.git
cd demonslay_thegame
npm ci
npm run dev
```

Open the address Vite prints (normally http://localhost:5173). Desktop keyboard and mouse required. The layout adapts to smaller screens, but touch controls are not implemented.

```sh
npm test
npm run build
npm run preview
```

The production build is in `dist/`. It can be served by a static host. This prototype has no backend, accounts, generative AI, or persistent progress.

## Play

Click **Enter the arena**. WASD moves, mouse aims, click or J attacks, Space dodges, and Escape pauses. Losing browser focus pauses automatically. **Reset encounter** resets health and the enemy. Defeat five sword hits' worth of enemy health to clear the encounter. The session defeat counter is not saved.

The enemy marks its target for 0.7 seconds before striking, then recovers for 1.1 seconds. Dodge costs 28 stamina and provides brief invulnerability. Movement is normalized so diagonal movement is not faster. An attack must reach the enemy and point toward it.

See [roadmap](docs/ROADMAP.md) and [playtest guide](docs/PLAYTEST-01.md). Prototype 01 ends at the first personal playtest; further development follows feedback.

## GitHub Codespaces

Open the main branch in GitHub, choose **Code → Codespaces → Create codespace**. The dev container installs dependencies and forwards port 5173. Run `npm run dev` in the Codespaces terminal, then open port 5173 from the Ports tab. Keep the forwarded port private.
