/** Ordinary melee patterns: pose tells only, never Blood Demon Art floor warnings. */
export const MELEE_PATTERNS={
 claw:{label:'Claw',windup:.48,active:.16,recovery:.72,reach:64,arc:.85,speed:142,lunge:0,hits:[.02]},
 lunge:{label:'Pouncing rake',windup:.72,active:.28,recovery:1.05,reach:48,arc:.75,speed:158,lunge:110,hits:[.02]},
 double:{label:'Twin claws',windup:.58,active:.42,recovery:1.1,reach:72,arc:.85,speed:150,lunge:0,hits:[.02,.25]},
 sweep:{label:'Wide sweep',windup:.86,active:.24,recovery:1.15,reach:106,arc:1.8,speed:114,lunge:0,hits:[.04]},
 heavy:{label:'Crushing arms',windup:1.1,active:.3,recovery:1.4,reach:120,arc:1.5,speed:100,lunge:32,hits:[.06]},
} as const;
export type MeleeId=keyof typeof MELEE_PATTERNS;
export function meleeFor(column:number,boss=false,attack=1,hpRatio=1):MeleeId{
 if(boss){const sequence:readonly MeleeId[]=hpRatio<=.5?['double','lunge','heavy','sweep','lunge']:['lunge','sweep','double','heavy'];return sequence[(Math.max(1,attack)-1)%sequence.length];}
 const base=(['heavy','lunge','claw','double','sweep'] as const)[column%5];return attack%4===0&&base==='claw'?'lunge':base;
}
export function bossPattern(id:MeleeId,hpRatio:number){const p=MELEE_PATTERNS[id],rage=hpRatio<=.5;return {...p,speed:p.speed*(rage?1.6:1.3),windup:p.windup*(rage?.86:1),recovery:p.recovery*(rage?.72:.88),lunge:id==='lunge'?190:id==='double'?45:id==='heavy'?65:p.lunge};}
export function meleeHits(pattern:MeleeId,origin:{x:number;y:number},angle:number,target:{x:number;y:number}){
 const p=MELEE_PATTERNS[pattern],dx=target.x-origin.x,dy=target.y-origin.y;
 return Math.hypot(dx,dy)<=p.reach&&Math.abs(Math.atan2(Math.sin(Math.atan2(dy,dx)-angle),Math.cos(Math.atan2(dy,dx)-angle)))<=p.arc;
}
