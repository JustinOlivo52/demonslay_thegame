# Nightfall — DemonSlay

Personal Demon Slayer fan-game project built with TypeScript, Phaser and Vite. Pixel-art gameplay, browser first, single-player.

## Playtest the tutorial

Use Node.js 24. In Codespaces, select `main`, open a Codespace and run:

```sh
npm ci
npm run dev
```

Open port **5173** from the Ports tab. Create/save a recruit, choose Water, Flame, Thunder or Wind and select **Enter Final Selection**. Existing recruits can enter directly at `/?selection=1`.

The condensed tutorial includes connected forest exploration, three lesser-demon encounters, a Hand Demon boss, scarce healing, timed finishing and a survivor/Kasugai-crow ceremony. Progress saves between encounters. After receiving the crow, enter the walkable Corps headquarters. See [headquarters controls and scope](HEADQUARTERS-CHECKPOINT.md).

See [tutorial controls and playtest notes](TUTORIAL-PLAYTEST.md).

## Controls

WASD move · mouse aim · click/J sword · 1/2 cast form · Q repeat selected form · Space dodge · E interact · H potion · F finish · Escape pause. Continue button/Enter advances after victory.

## Development entries

- `/`: character creation and saved recruit review.
- `/?selection=1`: player-controlled tutorial.
- `/?sandbox=1`: full Water/Flame practice, choosing the saved recruit style where available.
- `/?sandbox=1&style=water` or `style=flame`: explicit complete practice style.
- `/?sandbox=1&legacy=1`: preserved two-form arena for older developer tools.
- `/?water-lab=1`: all eleven Water forms for independent testing; no character unlock/save changes.
- `/?flame-lab=1`: all six revealed Flame forms; VI–VIII stay unavailable canon slots.
- `/?hub=1`: headquarters, unlocked by the current recruit’s completed selection save.
- `/?selection=1&demo=1`: scripted tutorial demonstration; not normal player control.

```sh
npm test
npm run build
```

Build output is in `dist/`. Codespaces configuration installs dependencies and forwards port 5173. Phaser's lazy-loaded combat bundle currently emits a size warning.

## Current limits

The tutorial uses four connected authored forest regions with optional branches; it is not a full campaign or seven-night simulation. Headquarters has a walkable courtyard and room/save journal; crow assignments, estate/Swordsmith travel, crafting and loadout editing remain future work. Backstories use local templates and enemy variety uses seeded rules; live AI services are not connected. No sound, accounts, cloud saves, weapon upgrades or general blocking yet. Browser-local progress can be lost if site data is cleared. Several animations still need dedicated directional frames.

See [team report](report.md), [roadmap](docs/ROADMAP.md), [art direction](docs/ART-DIRECTION.md), and [next tasks](TO-DO.md). Older checkpoint notes record the project's earlier state.

## Latest personal-playtest revision

See PLAYTEST-REVISION-01.md for faster movement, smaller actors, extra run/dodge poses, three-cut sword combos, visible form cards with Breath, distinct melee patterns and four tutorial regions. TUTORIAL-PLAYTEST.md has current controls.

## Playtest revision 02

Forms now cast directly from 1/2, numpad or their cards. The training route connects the four clearings through a scrolling world; no investigation is required. Victories save immediately and the next lesson begins after walking into its area. See PLAYTEST-REVISION-02.md.

## Playtest revision 03

Added a short controls introduction, vertical exploration loops with two finite potion caches, higher novice Breath costs, a two-phase Hand Demon, grounded hybrid run animation and a survivor ceremony before the crow. See PLAYTEST-REVISION-03.md.

## Headquarters checkpoint

The crow ceremony now leads to headquarters: five destination introductions, a personal room/save journal, read-only starting forms and a practice-sandbox return path. See HEADQUARTERS-CHECKPOINT.md.

Headquarters artwork now includes tiled-roof/shoji detail, clustered wisteria, a stone-edged koi pond, textured room materials and a shared detailed Kasugai crow. See [art refinement notes](HEADQUARTERS-ART-01.md). Typography uses local/system fallbacks without remote font imports.

## Leveling and stats

Finished tutorial encounters now grant one-time XP. Level-ups restore health and grant three stat points for Vitality, Endurance, Strength or Focus. Open **Stats** in the tutorial or **Character stats** in headquarters. A new recruit reaches level 3 before the Hand Demon and level 4 after it. Replay retains growth without repeating XP rewards; older saves receive encounter credit. See [progression rules and playtest guidance](PROGRESSION-01.md). Form skill points and purchases remain future work.

## Incremental breathing styles

Thunder joins Water and Flame as a playable starter choice, with Thunderclap and Flash, five-strike Rice Spirit, gold cloth styling and Jigoro Kuwajima's former-Hashira introduction. Open **Form catalog** during selection to view the chosen style's remaining forms and level requirements; higher-form purchases/casts are not implemented. A separate Thunder lab is available at `/?sandbox=1&style=thunder`. See [style sequence and Thunder scope](BREATHING-STYLES-ROADMAP.md).

Wind is now the fourth starter: Dust Whirlwind Cutter and Claws-Purifying Wind, green recruit styling, Sanemi’s mentor introduction and nine-form reference list. Its independent lab is `/?sandbox=1&style=wind`. Complete Water, Flame, Thunder and Wind before resuming Mist.

## Complete Water prototype

Open `/?water-lab=1` directly, or use **All eleven Water forms** in the sandbox navigation. Choose a form in the sidebar, aim with the mouse and press Q. This lab uses 1–9 to select, 0 for X and minus for XI; J attacks, Space dodges and F finishes. Enable AI attacks to test defense, or Yielding target for form V. Normal character ownership remains unchanged. See [all eleven rules and remaining animation work](WATER-FORMS-COMPLETE.md).

## Complete Flame prototype

Open `/?flame-lab=1` directly, or use **Complete Flame forms** in sandbox navigation. All six revealed forms (I–V and IX) have distinct effects and combat behavior. VI–VIII are unrevealed in canon and remain unavailable. **1–5** select those forms, **9** selects Rengoku, and **Q** casts; movement, dodge and finishing match the Water lab. Enable AI attacks to test Blooming Flame Undulation’s frontal melee defense. No save/ownership changes or XP rewards. See [Flame rules and art limits](FLAME-FORMS-COMPLETE.md). Thunder’s complete set is next.

## Water/Flame choreography candidate

The complete technique labs now default to a new 48-cell body-pose atlas with somersault, turning, thrust, still guard, rising/descending and charge poses. A **Compare previous body poses** setting enables the old shared-body preview with the same revised mechanics/effects. Water IX is corrected to non-damaging footwork. This is a description-led candidate, not frame-exact anime choreography; normal tutorial animation remains unchanged pending review. See [reference review, corrections and limits](SOURCE-FIDELITY-01.md).

## Practice and fullscreen maintenance

The main sandbox now opens the full Water/Flame labs. Number/numpad keys cast directly; Q repeats the selected form. Use **Fight demon**, **New round**, refill and the visible pause/resume controls. **Free forms** defaults on for repeat testing; disable it to test costs/cooldowns. Stationary free-form targets line up for the selected technique. **Auto-aim practice target** can be disabled. Thunder/Wind remain two-form previews.

**Fullscreen** is optional in practice, Final Selection and headquarters. Use the exit button or Escape to leave; unsupported/blocked requests show feedback. See [maintenance notes and application checks](MAINTENANCE-01.md). Build/unit checks pass; this maintenance UI has not been browser-verified because the execution sandbox blocks Chromium.

## Complete Thunder and Wind practice kits

All seven numbered Thunder forms and all nine Wind forms are available in Developer sandbox. Use `?sandbox=1&style=thunder` or `?sandbox=1&style=wind`; cast with 1–7 / 1–9, or select a form and press Q. Free forms, slow motion, fight/reset, resource tests and fullscreen are shared across all four complete labs. Campaign unlocks remain unchanged. See [THUNDER-WIND-FORMS-COMPLETE.md](THUNDER-WIND-FORMS-COMPLETE.md) for controls, adaptation limits and the playtest checklist.

## Sandbox cast-position repair

Removed automatic target repositioning on form selection and arena resets when starting a fight or repeating a legacy form. Optional Place target ahead moves only an idle target; normal casting stays in place apart from authored technique motion. Flame exposes six playable forms (I–V, IX), with VI–VIII explicitly disabled. See [MAINTENANCE-02.md](MAINTENANCE-02.md) for validation and the browser retest checklist.
