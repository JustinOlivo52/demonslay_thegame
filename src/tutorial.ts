/** Condensed playable Final Selection, not a literal seven-night simulation. */
export const TUTORIAL_STAGES=[
 {id:'trail',title:'Beyond the wisteria',lesson:'Follow the signs. Read the demon’s pose, strike, then approach and press F to finish.',health:125,damage:16},
 {id:'breathing',title:'Trust your breathing',lesson:'Select forms with 1 / 2 and press Q. Watch stamina and cooldowns; recover between attacks.',health:145,damage:18},
 {id:'survival',title:'Survive the night',lesson:'Dodge with Space. Press H to drink a healing potion when hurt. You have two for the trial.',health:160,damage:20},
 {id:'hand-demon',title:'The Hand Demon',lesson:'Watch its arms. A longer windup precedes its heavy strike. Dodge, recover, and finish before it regenerates.',health:300,damage:24},
] as const;
export const RUN_KEY='nightfall.selection.run.v1';
export type TutorialRun={version:1;profileKey:string;stage:number;health:number;potions:number;passed:boolean;crow:boolean};
export function profileKey(profile:{name:string;body:string;style:string}){return JSON.stringify([profile.name,profile.body,profile.style]);}
export function newRun(key:string):TutorialRun{return {version:1,profileKey:key,stage:0,health:100,potions:2,passed:false,crow:false};}
export function readRun(raw:string|null,key:string):TutorialRun{
 try{const r=JSON.parse(raw||'null');if(r?.version===1&&r.profileKey===key&&Number.isInteger(r.stage)&&r.stage>=0&&r.stage<=4&&Number.isFinite(r.health)&&r.health>0&&r.health<=100&&Number.isInteger(r.potions)&&r.potions>=0&&r.potions<=2&&r.passed===(r.stage===4)&&r.crow===r.passed)return r;}catch{}
 return newRun(key);
}
export function heal(health:number,potions:number){return health>=100||potions<=0?{health,potions,used:false}:{health:Math.min(100,health+45),potions:potions-1,used:true};}
export function advanceRun(run:TutorialRun,health:number,potions:number):TutorialRun{
 if(run.passed)return run;
 const stage=run.stage+1,passed=stage===4;
 return {...run,stage,health:Math.max(stage===3?75:1,Math.min(100,health)),potions:stage===3?Math.max(1,potions):potions,passed,crow:passed};
}
