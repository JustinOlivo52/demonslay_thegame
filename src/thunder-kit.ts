import type {TechniqueDefinition} from './technique-types';
import {createStyleKit} from './style-kit.ts';
export const THUNDER_ORDER=['flash','rice','swarm','distant','heat','rumble','god'] as const;
export type ThunderTechnique=typeof THUNDER_ORDER[number];
/** II–VI are human sword adaptations: Kaigaku's damaging blood-art electricity is not granted. */
export const THUNDER_KIT:Record<ThunderTechnique,TechniqueDefinition>={
 flash:{number:1,name:'Thunderclap and Flash',windup:.28,active:.16,recovery:.35,stamina:36,cooldown:2.4,reach:85,halfArc:1,advance:230,hits:[45],geometry:'fan',note:'Low preparation, explosive straight draw-cut, then recovery. Terrain stops the rush. Sixfold/Eightfold/Godlike Speed are variants, not extra numbered forms.'},
 rice:{number:2,name:'Rice Spirit',windup:.18,active:.65,recovery:.32,stamina:42,cooldown:3.6,reach:108,halfArc:1.35,advance:0,hits:[10,10,10,10,10],geometry:'fan',note:'Five alternating arched cuts in one connected sequence. Five actual strike windows; each can hit only once.'},
 swarm:{number:3,name:'Thunder Swarm',windup:.23,active:.95,recovery:.36,stamina:46,cooldown:4.5,reach:118,halfArc:Math.PI,advance:0,hits:[13,13,13,13],geometry:'circle',note:'Circling footwork with four surrounding cuts and fading lightning traces. The loop is a top-down adaptation; no homing or teleporting through obstacles.'},
 distant:{number:4,name:'Distant Thunder',windup:.27,active:.32,recovery:.4,stamina:48,cooldown:4.8,reach:120,halfArc:1.05,advance:180,hits:[19,19,19],geometry:'fan',note:'Fast forward commitment with a clustered three-beat lightning slash. Sword reach stays bounded; no autonomous ranged bolt.'},
 heat:{number:5,name:'Heat Lightning',windup:.3,active:.36,recovery:.4,stamina:48,cooldown:4.8,reach:135,halfArc:.85,advance:30,hits:[62],geometry:'fan',note:'A planted low guard becomes a sharp upward cut. Human sword-range adaptation, not Kaigaku’s blood-art electrocution.'},
 rumble:{number:6,name:'Rumble and Flash',windup:.35,active:1.05,recovery:.48,stamina:62,cooldown:7,reach:140,halfArc:1.25,advance:85,hits:[14,14,14,14,14,14],geometry:'fan',note:'A sustained sequence of six forward lightning-edged cuts with short lateral steps. The ranged demon demonstration is adapted to human sword combat.'},
 god:{number:7,name:'Honoikazuchi no Kami',windup:.5,active:.3,recovery:.58,stamina:76,cooldown:9,reach:108,halfArc:.85,advance:300,hits:[102],geometry:'fan',note:'Zenitsu’s personal creation: low explosive rush, one decisive cut and a dragon-shaped lightning flourish. Sandbox access only; story acquisition remains undecided.'},
};
export const thunderKit=createStyleKit('thunder',THUNDER_ORDER,THUNDER_KIT,{path:(id,q)=>id==='swarm'?{x:Math.sin(q*Math.PI*2)*32,y:(1-Math.cos(q*Math.PI*2))*28}:{x:THUNDER_KIT[id].advance*q,y:id==='rumble'?Math.sin(q*Math.PI*6)*14:0},beats:{flash:[.5],god:[.5],heat:[.55]}});
