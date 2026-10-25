import {getFormMenu,getStyle} from './data/breathing.ts';
import type {Progression} from './progression.ts';
export const SKILL_POINTS_PER_LEVEL=3;
export const FORM_MAX_RANK=5;
export const RANK_LEVELS=[1,2,10,25,50] as const;
export const UPGRADE_COSTS=[1,2,3,4] as const;
export const FORM_PURCHASE_COST=2;
export const PLAYABLE_STYLES=['water','flame','thunder','wind'] as const;
export type FormState={version:1;style:string;ranks:Record<string,number>};
export type FormAction='purchase'|'upgrade';
const personal=new Set(['water-11','thunder-07']);
export function skillEarned(level:number){return (level-1)*SKILL_POINTS_PER_LEVEL;}
export function freshForms(style:string):FormState{if(!PLAYABLE_STYLES.includes(style as typeof PLAYABLE_STYLES[number]))throw Error('This style is not playable.');return {version:1,style,ranks:Object.fromEntries(getFormMenu(style,1).filter(f=>f.grantedOnStyleAcquisition).map(f=>[f.id,1]))};}
export function skillSpent(state:FormState){const starters=new Set(Object.keys(freshForms(state.style).ranks));return Object.entries(state.ranks).reduce((sum,[id,rank])=>sum+(starters.has(id)?0:FORM_PURCHASE_COST)+UPGRADE_COSTS.slice(0,rank-1).reduce((a,b)=>a+b,0),0);}
export function readForms(raw:unknown,level:number):FormState|null{
 const s=raw as FormState;if(!Number.isInteger(level)||level<1||level>50||!s||s.version!==1||!PLAYABLE_STYLES.includes(s.style as typeof PLAYABLE_STYLES[number])||!s.ranks||typeof s.ranks!=='object'||Array.isArray(s.ranks))return null;
 const menu=getFormMenu(s.style,level),starters=freshForms(s.style).ranks;
 if(Object.keys(starters).some(id=>!Object.hasOwn(s.ranks,id)))return null;
 for(const[id,rank]of Object.entries(s.ranks)){const form=menu.find(f=>f.id===id);if(!form||form.status==='unrevealed'||personal.has(id)||!form.levelEligible||!Number.isInteger(rank)||rank<1||rank>FORM_MAX_RANK||(id==='water-09'&&rank>1)||level<RANK_LEVELS[rank-1])return null;}
 const result:FormState={version:1,style:s.style,ranks:{...s.ranks}};return skillSpent(result)<=skillEarned(level)?result:null;
}
export function formsFor(p:Progression,style:string){if(!p.breathing)return freshForms(style);if(p.breathing.style!==style)throw Error('Saved breathing style does not match this recruit.');const state=readForms(p.breathing,p.level);if(!state)throw Error('Saved form progression is invalid.');return state;}
export function formRank(p:Progression,style:string,id:string){const ranks=formsFor(p,style).ranks;return Object.hasOwn(ranks,id)?ranks[id]:0;}
export function skillAvailable(p:Progression,style:string){return skillEarned(p.level)-skillSpent(formsFor(p,style));}
export function formMultiplier(p:Progression,style:string,id:string){return 1+Math.max(0,formRank(p,style,id)-1)*.08;}
export function formRows(p:Progression,style:string){const state=formsFor(p,style),points=skillAvailable(p,style);return getFormMenu(style,p.level).map(f=>{
 const rank=state.ranks[f.id]??0,cost=rank?UPGRADE_COSTS[rank-1]??0:FORM_PURCHASE_COST,required=rank?RANK_LEVELS[rank]:f.effectiveUnlockLevel;
 const reason=f.status==='unrevealed'?'Unrevealed form · unavailable':personal.has(f.id)?'Special mentor lesson required · not available yet':rank&&f.id==='water-09'?'Movement-form rank upgrades arrive in a later checkpoint':rank===FORM_MAX_RANK?'Maximum rank reached':!f.levelEligible?`Requires level ${f.effectiveUnlockLevel}`:rank&&required&&p.level<required?`Next rank requires level ${required}`:points<cost?`Needs ${cost} skill points`:'';
 return {...f,rank,cost,required,reason,action:(rank?'upgrade':'purchase') as FormAction,damageBonus:Math.max(0,rank-1)*8};
 });}
export function changeForm(p:Progression,style:string,id:string,action:FormAction):Progression{const row=formRows(p,style).find(f=>f.id===id);if(!row||row.action!==action)throw Error('Invalid or duplicate form action.');if(row.reason)throw Error(row.reason);const state=formsFor(p,style);return {...p,breathing:{...state,ranks:{...state.ranks,[id]:row.rank+1}}};}
/** Publish the new state to the caller only after the complete save transaction succeeds. */
export function commitFormAction(p:Progression,style:string,id:string,action:FormAction,persist:(next:Progression)=>void){let next:Progression;try{next=changeForm(p,style,id,action);}catch(e){return {ok:false,progress:p,message:e instanceof Error?e.message:'Invalid form action.'};}try{persist(next);}catch{return {ok:false,progress:p,message:'Could not save this change. Your skill points were not spent. Check browser storage and try again.'};}return {ok:true,progress:next,message:action==='purchase'?'Form purchased.':'Form upgraded.'};}
export function starterCatalogId(style:string,slot:'surface'|'wheel'){return getStyle(style).forms[slot==='surface'?0:1].id;}
