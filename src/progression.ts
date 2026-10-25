import {readForms,type FormState} from './form-progression.ts';
export const LEVEL_CAP=50;
export const STAT_RULES={vitality:{name:'Vitality',effect:'+10 maximum health'},endurance:{name:'Endurance',effect:'+8 maximum stamina'},strength:{name:'Strength',effect:'+3% sword damage'},focus:{name:'Focus',effect:'+2% breathing-form damage'}} as const;
export type Stat=keyof typeof STAT_RULES;
export type Progression={version:1;level:number;xp:number;points:number;stats:Record<Stat,number>;rewards:string[];breathing?:FormState};
export const TRIAL_XP=[40,60,125,225] as const;
export function freshProgression():Progression{return {version:1,level:1,xp:0,points:0,stats:{vitality:0,endurance:0,strength:0,focus:0},rewards:[]};}
export function nextLevelXP(level:number){return 100+25*(level-1);}
export function attributes(p:Progression){return {health:100+10*p.stats.vitality,stamina:100+8*p.stats.endurance,sword:1+.03*p.stats.strength,form:1+.02*p.stats.focus};}
export function readProgression(d:unknown):Progression|null{
 const p=d as Progression;if(!p||p.version!==1||!Number.isInteger(p.level)||p.level<1||p.level>LEVEL_CAP||!Number.isInteger(p.xp)||p.xp<0||(p.level===LEVEL_CAP?p.xp!==0:p.xp>=nextLevelXP(p.level))||!Number.isInteger(p.points)||p.points<0||!p.stats)return null;
 const stats=Object.keys(STAT_RULES) as Stat[];if(stats.some(s=>!Number.isInteger(p.stats[s])||p.stats[s]<0||p.stats[s]>50)||p.points+stats.reduce((sum,s)=>sum+p.stats[s],0)!==(p.level-1)*3)return null;
 if(!Array.isArray(p.rewards)||p.rewards.length>4||new Set(p.rewards).size!==p.rewards.length||p.rewards.some(id=>!/^selection-[0-3]$/.test(id)))return null;
 const breathing=p.breathing===undefined?undefined:readForms(p.breathing,p.level);if(p.breathing!==undefined&&!breathing)return null;
 return {...p,stats:{...p.stats},rewards:[...p.rewards],...(breathing?{breathing}: {})};
}
export function awardTrialXP(p:Progression,stage:number){
 if(!Number.isInteger(stage)||stage<0||stage>3)throw Error('Invalid selection reward');
 const id=`selection-${stage}`;if(p.rewards.includes(id))return {progress:p,gained:0,levels:0};
 const result=gainXP(p,TRIAL_XP[stage]);return {...result,progress:{...result.progress,rewards:[...p.rewards,id]},gained:TRIAL_XP[stage]};
}
export function gainXP(p:Progression,amount:number){
 if(!Number.isSafeInteger(amount)||amount<0||!Number.isSafeInteger(p.xp+amount))throw Error('Invalid XP amount');
 let next={...p,stats:{...p.stats},rewards:[...p.rewards],xp:p.xp+amount};const before=next.level;
 while(next.level<LEVEL_CAP&&next.xp>=nextLevelXP(next.level)){next.xp-=nextLevelXP(next.level);next.level++;next.points+=3;}
 if(next.level===LEVEL_CAP)next.xp=0;return {progress:next,levels:next.level-before};
}
export function spendStat(p:Progression,stat:Stat):Progression{
 if(!Object.hasOwn(STAT_RULES,stat)||p.points<1||p.stats[stat]>=50)throw Error('No point available for that stat');
 return {...p,stats:{...p.stats,[stat]:p.stats[stat]+1},points:p.points-1,rewards:[...p.rewards]};
}
export function migratedTrialProgress(stage:number,cleared=false){let p=freshProgression();for(let i=0;i<Math.min(4,stage+(cleared?1:0));i++)p=awardTrialXP(p,i).progress;return p;}
