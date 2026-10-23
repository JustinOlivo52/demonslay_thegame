import {freshProgression,readProgression,migratedTrialProgress,attributes,type Progression} from './progression.ts';
import {POTION_PICKUPS} from './trial-content.ts';
/** Condensed playable Final Selection, not a literal seven-night simulation. */
export const TUTORIAL_STAGES=[
 {id:'trail',title:'Beyond the wisteria',lesson:'Follow the training path to the open clearing. Read the demon’s pose, strike, then press F to finish.',health:125,damage:16},
 {id:'breathing',title:'Trust your breathing',lesson:'Press 1 / 2 or click a form card to cast. Forms spend Breath; dodges spend stamina. Q repeats the selected form.',health:145,damage:18},
 {id:'survival',title:'Survive the night',lesson:'Dodge with Space. Press H to drink a healing potion when hurt. Explore the side routes for scarce supplies.',health:160,damage:20},
 {id:'hand-demon',title:'The Hand Demon',lesson:'Watch its arms. A longer windup precedes its heavy strike. Dodge, recover, and finish before it regenerates.',health:330,damage:20},
] as const;
export const RUN_KEY='nightfall.selection.run.v1';
export type TutorialRun={version:1;profileKey:string;stage:number;health:number;potions:number;passed:boolean;crow:boolean;cleared?:boolean;introSeen?:boolean;pickups?:string[];progress?:Progression};
export function profileKey(profile:{name:string;body:string;style:string}){return JSON.stringify([profile.name,profile.body,profile.style]);}
export function newRun(key:string,progress=freshProgression()):TutorialRun{return {version:1,profileKey:key,stage:0,health:attributes(progress).health,potions:1,passed:false,crow:false,progress};}
export function readRun(raw:string|null,key:string):TutorialRun{
 try{const r=JSON.parse(raw||'null');const progress=r?.progress===undefined?migratedTrialProgress(r?.stage||0,r?.cleared===true):readProgression(r.progress);if(r?.version===1&&r.profileKey===key&&Number.isInteger(r.stage)&&r.stage>=0&&r.stage<=4&&Number.isFinite(r.health)&&r.health>0&&progress&&r.health<=attributes(progress).health&&Number.isInteger(r.potions)&&r.potions>=0&&r.potions<=2&&r.passed===(r.stage===4)&&r.crow===r.passed&&(r.cleared===undefined||typeof r.cleared==='boolean')&&(r.introSeen===undefined||typeof r.introSeen==='boolean')&&(r.pickups===undefined||(Array.isArray(r.pickups)&&r.pickups.length<=2&&new Set(r.pickups).size===r.pickups.length&&r.pickups.every((id:unknown)=>typeof id==='string'&&POTION_PICKUPS.includes(id as typeof POTION_PICKUPS[number])))))return {...r,progress,health:r.progress===undefined&&progress.level>1?attributes(progress).health:r.health};}catch{}
 return newRun(key);
}
export function heal(health:number,potions:number,maxHealth=100){return health>=maxHealth||potions<=0?{health,potions,used:false}:{health:Math.min(maxHealth,health+45),potions:potions-1,used:true};}
export function advanceRun(run:TutorialRun,health:number,potions:number):TutorialRun{
 if(run.passed)return run;
 const stage=run.stage+1,passed=stage===4;
 return {...run,stage,health:Math.max(1,Math.min(attributes(run.progress||freshProgression()).health,health)),potions:Math.max(0,Math.min(2,potions)),passed,crow:passed,cleared:false};
}
