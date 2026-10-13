# Nightfall: team report

A shared working document for everyone building this game: **Justin** (owner, director, playtester), **Claude Code** (code and integration), **ChatGPT** (design partner and character art), **ElevenLabs** (sound and music), and **Kling** (animation clips). Read this first, then add to it. Newest entries go at the top of the log.

Repository: https://github.com/JustinOlivo52/demonslay_thegame

## 1. Where the project stands

| Area | Status |
|---|---|
| Combat rules (Prototype 01) | Done and unchanged from the approved spec. Movement, mouse aim, sword attack, stamina dodge, telegraphed demon, pause, reset. |
| Character art | Done for the prototype. Original AI-illustrated slayer, demon and katana in `art/source/`. |
| Animation | Basic. The slayer's legs stride and his body leans and bobs; the demon animates through whole-body motion. No frame-by-frame animation yet. |
| Effects | Done in code: swing trail, hit sparks, damage numbers, strike telegraph, claw marks, dodge afterimages, ash dissolve. |
| Sound and music | Not started. |
| Human playtest | **Not done yet. This is the next gate.** Every check so far has been automated. |

Branch: `claude/new-session-pjdq69`, open as pull request #1 into `main`.

## 2. Who does what

| Member | Owns | Hands off |
|---|---|---|
| **Justin** | Final say on everything. Playtests. Runs ChatGPT, Kling and ElevenLabs. Uploads their output to Claude Code. | Decisions and feedback in this file; files via upload. |
| **Claude Code** | All code: gameplay, rendering, animation playback, audio playback, tests, builds, Git. Turns art, video clips and audio into game-ready assets. Keeps this report current. | Commits on the branch; a summary entry in the log. |
| **ChatGPT** | Story, characters, missions, balance ideas, art direction. Generates character and pose images. Reviews this report and challenges decisions. | Images and written proposals that Justin pastes or uploads. |
| **Kling** | Short video clips of the existing characters performing one action each. | MP4 clips (specs in section 4). |
| **ElevenLabs** | Sound effects and music. | Audio files (specs in section 5). |

**Ground rules**

- One source of truth: this file plus the repository. If it isn't written here or committed, it isn't decided.
- Justin approves each checkpoint before work moves to the next one: build, verify, playtest, feedback, fix blockers, approval, next checkpoint.
- Original designs only. Inspired by Demon Slayer, never copying canon characters, haori patterns, names or music. Don't name canon characters in prompts.
- This is a personal fan project and won't be sold. It is a portfolio piece, so keep a record of how each AI tool was used.

## 3. Art pipeline (ChatGPT → Claude Code)

Full rules and prompts live in [`docs/ART-DIRECTION.md`](docs/ART-DIRECTION.md). Summary:

1. Each character gets one full-body illustration: transparent PNG, three-quarter view facing right, arms held away from the body, hands empty, at least 1024 px tall.
2. Always reuse the **shared style block** from the art direction doc so every character matches.
3. Upload the image to Claude Code. It goes into `art/source/`, and `scripts/build_art.py` cuts it into game sprites.
4. New poses of an existing character: give ChatGPT the current image as the reference and ask for the same character in the new pose, with the same rules.

**Current cast**

| Asset | File | Notes |
|---|---|---|
| Slayer recruit (player) | `art/source/slayer.png` | Indigo-to-wisteria haori with an arrow-feather pattern, high ponytail with a red cord, amber eyes, cheek scar. |
| Lesser demon (level 1) | `art/source/demon.png` | Grey-violet skin with veins, ivory horns, yellow slit-pupil eyes, tattered plum kimono, red sash, long claws. |
| Katana | `art/source/katana.png` | Plain steel blade; it takes the breathing style's colour in code later. |

## 4. Animation pipeline (Kling → Claude Code)

Plan: Kling animates the existing illustration into a short clip, and Claude Code turns the clip into sprite frames (frame extraction, background removal, alignment, sprite sheet).

**Clip specs**

- Start from the current character image (image-to-video).
- **One action per clip**, 2 to 4 seconds.
- **Static camera**, no zoom or pan. Character fully in frame the whole time, head to feet.
- **Plain flat background** (solid white or green) so it can be removed cleanly.
- Character keeps facing right.
- For loops (walk, idle), ask for the clip to end in the same pose it starts in.
- Name files like `slayer-slash.mp4`, `demon-claw.mp4`.

**Animation wishlist, in priority order**

| # | Character | Action | Notes |
|---|---|---|---|
| 1 | Slayer | Horizontal katana slash | The move players see most. Start here to prove the pipeline. |
| 2 | Demon | Claw strike | Rears back, then a downward two-handed claw swipe. |
| 3 | Slayer | Run cycle | Loop. |
| 4 | Slayer | Dodge dash | Short, low forward lunge. |
| 5 | Demon | Walk / lurch | Loop. Hunched, unsettling. |
| 6 | Slayer | Hurt and fall | For the loss state. |

The slayer's katana is a separate sprite in the game. For the slash clip, generate him **holding** the katana; Claude Code will decide whether to use the drawn sword or the separate one.

## 5. Audio pipeline (ElevenLabs → Claude Code)

**File specs**

- Sound effects: **WAV**, short, with no silence at the start (they must fire on the frame the action happens).
- Music and ambience: **OGG or MP3**, made to **loop seamlessly**.
- Keep volumes roughly even across files; Claude Code balances them in the game.
- Name files like `sfx-sword-swing.wav`, `music-battle.ogg`.

**Sound list for Prototype 01**

| File | Moment in the game | Direction |
|---|---|---|
| `sfx-sword-swing.wav` | Every attack | Sharp katana whoosh, light and fast. Make 2 or 3 variations so it doesn't repeat. |
| `sfx-sword-hit.wav` | Sword connects with the demon | Clean blade slice with a heavy impact. |
| `sfx-dodge.wav` | Dodge | Quick cloth swish and footstep skid. |
| `sfx-demon-windup.wav` | Demon telegraph (0.7 s) | Low, rising growl that peaks at the strike. Must fit inside 0.7 s. |
| `sfx-demon-claw.wav` | Demon strike | Vicious claw swipe tearing the air. |
| `sfx-player-hurt.wav` | Player takes damage | Body impact plus a short pained grunt. |
| `sfx-evade.wav` | Strike misses during a dodge | Soft, satisfying whoosh-past. |
| `sfx-demon-death.wav` | Demon crumbles to ash | Dry, crackling disintegration fading into wind. |
| `sfx-ui-click.wav` | Buttons | Soft wooden click. |
| `sting-victory.ogg` | Encounter cleared | 3 to 5 s. Taiko hit with a shamisen phrase, triumphant but restrained. |
| `sting-defeat.ogg` | Player falls | 3 to 5 s. Low, somber flute. |
| `ambience-night.ogg` | Always, quietly | Night wind, insects, rustling wisteria leaves. Loop. |
| `music-battle.ogg` | During a fight | Tense Taisho-era Japanese action: taiko drums, shamisen, shakuhachi, with a modern orchestral pulse. Loop, about 1 to 2 minutes. Original composition, no imitation of the anime's soundtrack. |

## 6. Decisions

**Locked**

- TypeScript, Phaser 3 and Vite, browser first, single-player.
- Top-down action RPG; level cap 50; one active breathing style; Hashira trial at level 50 (see [`docs/ROADMAP.md`](docs/ROADMAP.md)).
- Art direction: AI illustrations animated in code, original designs, anime cel-shaded style.
- Combat tuning for Prototype 01 (health 100, stamina 100, speed 185, dodge 28 stamina, sword 25 damage and 83 reach, demon 125 health and 20 damage, 0.7 s warning, 1.1 s recovery).

**Still open** (don't decide these before their milestone)

- Which two starting breathing styles V1 offers.
- Whether repeated use (mastery) adds to skill-point upgrades.
- What happens to active demons at sunrise.
- Death penalties.
- Upgrade transfer when switching styles.
- Details of the Sun and Moon unlock missions.
- Multiplayer versus AI allies for the final encounter.

## 7. Next steps

1. **Justin:** playtest Prototype 01 in Codespaces using [`docs/PLAYTEST-01.md`](docs/PLAYTEST-01.md), then write feedback in the log below.
2. **Justin + Kling:** generate animation #1 (slayer katana slash) and upload it.
3. **Claude Code:** build the clip-to-sprite pipeline from that clip; fix any playtest blockers.
4. **Justin + ElevenLabs:** generate the Prototype 01 sound list (can run in parallel).
5. **Claude Code:** add audio playback with volume controls and a mute toggle.
6. After Justin approves Prototype 01: start Checkpoint 2 (breathing forms and decapitation).

**How to run it:** open the repository on GitHub, then **Code → Codespaces → Create codespace** on the branch above (or on `main` once PR #1 is merged). Wait for setup to finish, run `npm run dev`, and open port 5173 from the Ports tab.

## 8. Questions for ChatGPT

- What should the first two starting breathing styles be? Suggest original names, colour, and 6 to 8 forms each, without copying canon forms.
- Give the player character a name and short backstory that fits a Taisho-era recruit.
- Suggest 3 more demon archetypes with one unmistakable silhouette feature each, plus a Blood Demon Art idea for level 10+.
- Review the sound list in section 5. What's missing for the feel we want?

## 9. Log

Add entries at the top: date, who, what changed, and what's needed next.

### 2026-10-13: Claude Code
- Created this report.
- Status: Prototype 01 is playable with the illustrated characters. Tests pass (2/2), the production build succeeds, and automated browser checks pass. Human playtest still pending.
- Needed: Justin's playtest feedback, a Kling slash clip, and the ElevenLabs sound list.

### 2026-10-12: Claude Code
- Restored the missing `src/` code from the original zip and fixed the repo layout (Codespaces config, docs folder, README).
- Added the arena, combat effects and page styling.
- Researched the Demon Slayer visual language and moved to AI-illustrated characters (`docs/ART-DIRECTION.md`).
- Integrated Justin's slayer, demon and katana illustrations with a cutout rig and a following camera.
