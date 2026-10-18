# Headquarters art refinement 01

A visual pass on the first headquarters slice; existing saves, interactions and destination collision remain compatible.

- Japanese-style tiled roofs now have layered slopes, highlighted ridges and shaded eaves. Buildings gain shoji lattice, timber grain, plaster variation, veranda planks and stone steps.
- Wisteria has clustered foliage and individually shaded blossom strands. Northern trees render behind the buildings, rather than floating over windows.
- The pond gains an irregular stone border, reeds and two small koi. Path edging and sparse garden flowers add detail around the open walking space.
- The room gains woven tatami, stitched bedding, desk grain and journal details.
- `src/crow-art.ts` supplies one shared pixel crow for the courtyard perch and crow-award ceremony: hooked bill, feathered wing/tail, eye highlight, talons and a messenger band. Its ceremony canvas has a larger pixel-aligned display size.
- The courtyard camera looks farther north to show the architectural detail when entering the grounds.

This remains a code-painted pixel environment. Additional NPC art, directional animation, ambient movement and audio are separate future work. The crow is a static illustration with the existing ceremony arrival transition; this pass adds no new flight/idle animation.

## Review

Compare the grounds and room with the prior blockout. Check that the crow reads at its world size and in the ceremony, and that visual detail leaves interaction labels and approaches clear. No new gameplay systems or paid/live AI services are needed.

Production verification also exposed a pre-existing dependency on remote Google Fonts imports: a font request failure could reject the lazily loaded combat stylesheet and leave Final Selection blank. Those imports were removed; the existing local/system font fallbacks now work without that external dependency.
