# Art direction

Nightfall is an original game inspired by Demon Slayer: Kimetsu no Yaiba. It borrows the visual language (Taisho-era Japan at night, corps uniforms with signature haori, coloured nichirin blades, human-looking demons, woodblock-print breathing effects). It never copies canon characters, patterns or names.

## Pipeline

1. Generate **one full-body illustration per character** with an AI image tool, using the prompts below.
2. The images go in `art/source/`. Each is cut into parts (head, torso, upper and lower arms, legs, haori, hair) and animated in code as a cutout rig, the way many 2D games animate. Because every frame comes from one image, the character stays consistent.
3. Weapons are separate images, so the sword can rotate with the mouse and change blade colour per breathing style.
4. Effects (sword trails, breathing forms, ash, blood, petals) stay code-drawn in a woodblock-print style.

## Image requirements (every character)

- PNG with a **transparent background** (or a flat pure-white background if transparency isn't available).
- **One character only**, full body, head to feet, nothing cropped, nothing overlapping the edges.
- **Three-quarter view facing right**, standing upright, feet slightly apart.
- **Arms held slightly away from the body** and not crossing the torso, so they can be cut out cleanly.
- Hands **empty** (weapons are separate images).
- At least **1024 px tall**.
- Same style keywords in every prompt so all characters match.

## Shared style block

Paste this at the start of every prompt:

> Japanese TV anime character art, cel-shaded, clean bold black ink outlines, two-tone cel shading with soft highlights, vivid saturated colours, sharp angular hair strands, large expressive eyes, realistic adult proportions about 7 heads tall, Taisho-era Japan (1910s), full-body character sheet, three-quarter view facing right, standing neutral pose, arms held slightly away from the body, hands empty, transparent background, no text, no weapon in hand

## Prompt 1: the player, slayer recruit

> [shared style block] A young demon-hunting swordsman recruit, about 17 years old, lean and athletic. Black high-collared military-style jacket with gold buttons, white belt, loose black hakama-style trousers tucked into white leg wraps, straw sandals. Over the uniform an open short haori coat in deep indigo fading to wisteria purple, with a pale lavender arrow-feather (yagasuri) pattern across its lower half. Dark navy-black hair with sharp spiky bangs, tied in a high ponytail with a red cord. Determined amber eyes, small scar on the left cheek. An empty black lacquered sword scabbard at the left hip.

## Prompt 2: lesser demon (level 1)

> [shared style block] A gaunt, menacing male demon in the style of Japanese folklore, tall and hunched forward. Pale grey-violet skin, dark purple veins spreading across the face, neck and forearms. Long tangled black hair. Two short curved ivory horns from the forehead. Glowing yellow eyes with thin slit pupils, a crimson mark on the forehead, sharp fangs in a cruel grin. Very long arms ending in long bone-white claws, held open and slightly forward. Tattered dark plum kimono with a torn hem and a blood-red sash, barefoot with clawed toes.

## Prompt 3: the nichirin katana

> [shared style block, but replace the character instructions with:] A single Japanese katana lying perfectly horizontal, pointing right, isolated, side view, the whole sword visible. Plain polished steel blade with a visible wavy temper line and a slight curve. Round black iron handguard (tsuba) with a subtle wisteria flower cut-out. Handle wrapped in black cord over white ray skin in a diamond pattern, small gold collar and end cap. No scabbard.

Generate the blade in plain steel. Breathing-style colours are applied in code.

## Tips for good results

- If the tool adds a background, ask: "same image, transparent background".
- If it crops the feet or hair, ask: "zoom out, full body with empty space around the character".
- If arms touch the body, ask: "same character, arms held further away from the body".
- Keep the image you like best and don't regenerate for small details. The cutout and code lighting can fix colour and minor issues.
- Avoid naming canon characters in prompts; it pulls designs toward copies and some tools refuse it.

## Later characters

Reuse the shared style block for mentors, Hashira, demon archetypes and bosses. Each slayer gets a unique haori pattern and tsuba; each demon type gets one unmistakable silhouette feature (extra arms, a mask, a cocoon of threads).
