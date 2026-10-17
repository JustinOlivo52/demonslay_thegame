# Breathing catalog review — before animation

Included: Water, Flame, Thunder, Wind, Stone, Mist, Flower, Insect, Serpent, Love, Sound, Beast, Sun and Moon.

Files: src/data/breathing-catalog.json (labels and metadata), src/data/breathing.ts (menu eligibility).

This is a data catalog, not implemented combat abilities or a rendered skill menu. No animation changes are included. Import getFormMenu into the future skill-menu implementation. Purchase and upgrade costs remain null until balance is approved.

Canon accuracy notes:
- Flame is the canon label, rather than Fire.
- Unrevealed numbered slots are retained with null names, never invented or purchasable.
- First two *known* entries are granted when acquiring a style. For styles with missing early forms, this is not necessarily canon forms 1 and 2; confirm this game-design choice.
- Insect dances have no canon numbers. Flower's final form and Beast's improvised strike are not assigned invented canon numbers.
- Sun catalog ordering is a game ordering, not a claim that every named technique has an official number. The thirteenth requires the preceding twelve and represents their continuous sequence.
- Water 11, Thunder 7 and Mist 7 are personal techniques; additional access/training rules remain pending.
- Moon's depicted advanced techniques involve Kokushibo's demonic capabilities. Human-player adaptations require design review before combat implementation.
- Associated characters are references, not guarantees of a living or available Hashira mentor. Story timeline and alternative instructors remain pending.
- Form names vary across translations. This draft needs a naming/canon review before it becomes final content.

Progression:
- First two known entries: level 1 in ordinary styles.
- Remaining known entries: spread through level 30.
- Sun/Moon: style accessible only at level 30 plus special mission; first two granted on acquisition. All other forms become level-eligible at that point, but still need purchase and any later prerequisites.
- Level eligibility never means purchased, mastered or usable in combat.
- Final upgrade gate at level 50 is not implemented here; no upgrade economy exists yet.

Delivery: local files only, not uploaded to GitHub. Copy the src/data directory into the repository for Claude integration after review.
