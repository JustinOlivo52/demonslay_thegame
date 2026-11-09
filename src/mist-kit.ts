import {createStyleKit} from './style-kit.ts';
import type {TechniqueDefinition,Point} from './technique-types';
export const MIST_ORDER=['haze','layers','scatter','shift','sea','lunar','obscure'] as const;
export type MistTechnique=typeof MIST_ORDER[number];
export const MIST_KIT:Record<MistTechnique,TechniqueDefinition>={
 haze:{number:1,name:'Low Clouds, Distant Haze',windup:.24,active:.3,recovery:.3,stamina:26,cooldown:2,reach:120,halfArc:.17,advance:40,hits:[38],geometry:'fan',note:'Point-first forward thrust. A narrow grounded sword lane, not a mist projectile.'},
 layers:{number:2,name:'Eight-Layered Mist',windup:.26,active:1.28,recovery:.42,stamina:46,cooldown:5,reach:84,halfArc:1.05,advance:18,hits:[7,7,7,7,7,7,7,11],geometry:'fan',note:'Eight connected alternating cuts. Each visible strike can connect once; committed recovery.'},
 scatter:{number:3,name:'Scattering Mist Splash',windup:.2,active:.58,recovery:.32,stamina:35,cooldown:4,reach:92,halfArc:Math.PI,advance:0,hits:[23],geometry:'circle',note:'One turning cut scatters practice projectiles within sword reach during its sweep. No melee immunity or universal Blood Art cancellation.'},
 shift:{number:4,name:'Shifting Flow Slash',windup:.3,active:.35,recovery:.38,stamina:34,cooldown:3.8,reach:88,halfArc:1.05,advance:145,hits:[43],geometry:'fan',note:'Low preparation, sudden grounded advance, then a draw-cut. Terrain stops the dash.'},
 sea:{number:5,name:'Sea of Clouds and Haze',windup:.28,active:1.15,recovery:.38,stamina:49,cooldown:5.5,reach:94,halfArc:1.35,advance:170,hits:[16,16,22],geometry:'fan',note:'Three sweeping cuts along a winding advancing path. Limited by terrain, without invulnerability or free steering.'},
 lunar:{number:6,name:'Lunar Dispersing Mist',windup:.34,active:.95,recovery:.46,stamina:51,cooldown:6,reach:80,halfArc:1.1,advance:45,hits:[15,15,24],geometry:'fan',note:'Leap and repeated downward cuts into the forward sword area. The aerial animation does not grant invulnerability or remote projectile damage.'},
 obscure:{number:7,name:'Obscuring Clouds',windup:.35,active:3,recovery:.5,stamina:67,cooldown:12,reach:90,halfArc:1.05,advance:155,hits:[18,18,28],geometry:'fan',note:'Muichiro’s personal form: alternating slow steps and sudden bursts. Enemies briefly track the cast origin during bursts. Existing strikes remain dangerous. Sandbox access only; special training acquisition remains planned.'},
};
/** Piecewise continuous displacement: fast bursts never teleport through terrain. */
function obscureDistance(q:number){const keys=[[0,0],[.15,6],[.28,50],[.48,57],[.61,105],[.81,112],[1,155]];for(let i=1;i<keys.length;i++){const [b,y]=keys[i],[a,x]=keys[i-1];if(q<=b)return x+(y-x)*(q-a)/(b-a);}return 155;}
const core=createStyleKit('mist',MIST_ORDER,MIST_KIT,{path:(id,q)=>({x:id==='obscure'?obscureDistance(q):MIST_KIT[id].advance*q,y:id==='sea'?Math.sin(q*Math.PI*2)*23:id==='obscure'?Math.sin(q*Math.PI*4)*14:0}),beats:{haze:[.45],layers:[.08,.2,.32,.44,.56,.68,.8,.92],scatter:[.3],shift:[.65],sea:[.2,.52,.84],lunar:[.42,.63,.84],obscure:[.26,.6,.94]}});
export const mistPhase=core.phase,mistProgress=core.progress,mistWindow=core.window,mistMotion=core.motion,mistImpact=core.impact,mistContact=core.contact,mistCastReason=core.castReason,mistCatalogId=core.catalogId,mistTechniqueForCatalog=core.techniqueForCatalog;
export function mistDefends(){return false;}
export function mistDeflects(id:MistTechnique,t:number,p:Point,projectile:Point){const q=mistProgress(id,t);return id==='scatter'&&mistPhase(id,t)==='active'&&q>=.15&&q<=.85&&Math.hypot(projectile.x-p.x,projectile.y-p.y)<=MIST_KIT.scatter.reach;}
export function mistConceals(id:MistTechnique,t:number){if(id!=='obscure'||mistPhase(id,t)!=='active')return false;const q=mistProgress(id,t);return q>=.15&&q<=.28||q>=.48&&q<=.61||q>=.81&&q<=.96;}
