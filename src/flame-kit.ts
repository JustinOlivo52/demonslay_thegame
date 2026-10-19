import type {Point,TechniqueDefinition} from './technique-types';
export const FLAME_ORDER=['fire','sun','universe','undulation','tiger','rengoku'] as const;
export type FlameTechnique=typeof FLAME_ORDER[number];
/** VI–VIII have never been revealed; they are not fabricated or made purchasable. */
export const FLAME_UNREVEALED=[6,7,8] as const;
export const FLAME_KIT:Record<FlameTechnique,TechniqueDefinition>={
 fire:{number:1,name:'Unknowing Fire',windup:.18,active:.24,recovery:.27,stamina:28,cooldown:2,reach:80,halfArc:1,advance:155,hits:[38],geometry:'fan',note:'A committed straight rush and one forward cut. Flame follows the blade; no lingering burn or projectile.'},
 sun:{number:2,name:'Rising Scorching Sun',windup:.22,active:.3,recovery:.3,stamina:32,cooldown:2.6,reach:90,halfArc:.9,advance:25,hits:[44],geometry:'fan',note:'An upward sweeping cut with a rising flame arc. The visual lift does not grant invulnerability.'},
 universe:{number:3,name:'Blazing Universe',windup:.3,active:.24,recovery:.38,stamina:38,cooldown:3.2,reach:100,halfArc:1.1,advance:30,hits:[52],geometry:'fan',note:'A forceful descending cut and compact impact flare. Damage stays in the forward sword fan.'},
 undulation:{number:4,name:'Blooming Flame Undulation',windup:.18,active:.68,recovery:.35,stamina:42,cooldown:4.4,reach:100,halfArc:1.5,advance:0,hits:[12,12,12],geometry:'fan',note:'Three broad defensive sweeps. Neutralizes nearby frontal melee only while active; attacks from behind and recovery remain dangerous.'},
 tiger:{number:5,name:'Flame Tiger',windup:.3,active:.72,recovery:.4,stamina:52,cooldown:5.6,reach:115,halfArc:1.5,advance:90,hits:[24,24,20],geometry:'fan',note:'Two sweeping cuts and a closing cut form a tiger-shaped flame flourish. A three-strike gameplay adaptation, not a summoned creature.'},
 rengoku:{number:9,name:'Rengoku',windup:.55,active:.52,recovery:.55,stamina:72,cooldown:9,reach:100,halfArc:.7,advance:300,hits:[96],geometry:'fan',note:'A long, committed ultimate rush with one powerful forward strike. Expensive, vulnerable during preparation and recovery, and stopped by terrain.'},
};
export function flamePhase(id:FlameTechnique,t:number){const f=FLAME_KIT[id];return t<f.windup?'windup':t<f.windup+f.active?'active':t<f.windup+f.active+f.recovery?'recovery':'done';}
export function flameProgress(id:FlameTechnique,t:number){const f=FLAME_KIT[id];return Math.max(0,Math.min(1,(t-f.windup)/f.active));}
export function flameWindow(id:FlameTechnique,t:number){if(flamePhase(id,t)!=='active')return -1;const beats=id==='undulation'?[.12,.42,.72]:id==='tiger'?[.24,.53,.82]:[id==='universe'?.58:id==='sun'?.52:.38];const q=flameProgress(id,t);let index=-1;for(let i=0;i<beats.length;i++)if(q>=beats[i])index=i;return index;}
export function flameMotion(id:FlameTechnique,from:number,to:number){return {x:FLAME_KIT[id].advance*(flameProgress(id,to)-flameProgress(id,from)),y:0};}
export function flameImpact(p:Point,angle:number){return {x:p.x+Math.cos(angle)*70,y:p.y+Math.sin(angle)*70};}
function inFan(p:Point,angle:number,target:Point,reach:number,halfArc:number){const dx=target.x-p.x,dy=target.y-p.y,a=Math.atan2(dy,dx)-angle;return Math.hypot(dx,dy)<=reach&&Math.abs(Math.atan2(Math.sin(a),Math.cos(a)))<=halfArc;}
export function flameContact(id:FlameTechnique,t:number,p:Point,angle:number,target:Point){const f=FLAME_KIT[id];return flameWindow(id,t)>=0&&inFan(p,angle,target,f.reach,f.halfArc);}
export function flameDefends(id:FlameTechnique,t:number,p:Point,attacker:Point,angle=0){return id==='undulation'&&flamePhase(id,t)==='active'&&inFan(p,angle,attacker,110,1.5);}
export function flameCastReason(id:FlameTechnique,breath:number,cooldown:number){return cooldown>0?'This form is cooling down.':breath<FLAME_KIT[id].stamina?'Not enough Breath.':'';}
export function flameCatalogId(id:FlameTechnique){return 'flame-'+String(FLAME_KIT[id].number).padStart(2,'0');}
export function flameTechniqueForCatalog(id:string):FlameTechnique|null{return FLAME_ORDER.find(key=>flameCatalogId(key)===id)??null;}
