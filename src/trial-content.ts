export const INTRO_PANELS=[
 {title:'Beyond the wisteria',text:'You have trained for this night. Enter Mount Fujikasane, survive its demons, and return at dawn to join the Demon Slayer Corps. The route branches: look beyond the main trail, but choose your battles carefully.'},
 {title:'Steel, Breath, and resolve',text:'WASD moves. Aim with the mouse; click or J chains three sword cuts. Space dodges using stamina. Press 1 / 2, numpad, or a form card to cast; Q repeats your last form. Your starting forms spend Breath; each form card shows its cost. Use ordinary cuts while recovering.'},
 {title:'Survive to see the dawn',text:'When a demon reaches zero vitality, approach and press F within four seconds to decapitate it. Otherwise it fully recovers. H drinks a potion; E collects nearby supplies. You start with one potion. Only two more are hidden on this mountain. Finished encounters grant XP. Leveling up restores health and grants three stat points plus three separate skill points; open Stats for attributes or Form catalog for breathing upgrades. Keep moving when the demon raises its claws.'},
] as const;
export const CEREMONY_PANELS=[
 {title:'The seventh dawn',text:'The nights become a blur of cold paths and drawn steel. When dawn finally reaches the wisteria, you return to the meeting ground. Other exhausted recruits emerge beside you. For a moment, nobody speaks.'},
 {title:'Those who returned',text:'Two young attendants bow to the survivors and welcome you into the Demon Slayer Corps. They explain the starting rank of Mizunoto, uniforms, and the ore from which each recruit’s Nichirin sword will be forged. You look at the others: your paths have only just begun.'},
 {title:'A promise carried forward',text:'Villages beyond this mountain still fear the night. Your breathing style will guide your training, but the choices on each hunt will be yours: prepare, explore, and stand beside those who need help. Today you survived. Tomorrow you begin protecting others.'},
 {title:'Your Kasugai crow',text:'A black crow swoops down through the wisteria and calls your name. Your first orders are to report to Corps headquarters. You are no longer waiting to become a Demon Slayer. Your story in this world has begun.'},
] as const;
export const POTION_PICKUPS=['foothill-cache','waystation-cache'] as const;
export function noviceBreathCost(form:'surface'|'wheel',trainingRank=0){const rank=Math.max(0,Math.min(6,Math.floor(Number.isFinite(trainingRank)?trainingRank:0)));return Math.max(form==='surface'?20:32,(form==='surface'?32:46)-rank*2);}
export function collectPotion(collected:readonly string[],potions:number,id:string){
 if(!POTION_PICKUPS.includes(id as typeof POTION_PICKUPS[number])||collected.includes(id)||potions>=2)return {collected:[...collected],potions,used:false};
 return {collected:[...collected,id],potions:potions+1,used:true};
}
/** A complete foot cycle advances only with distance travelled, never idle time. */
export function gaitFrame(distance:number,frames:number,stride=124){return Math.floor(((Math.max(0,distance)%stride)/stride)*frames)%frames;}
