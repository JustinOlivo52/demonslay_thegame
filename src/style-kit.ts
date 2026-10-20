import type {Point,TechniqueDefinition} from './technique-types';
/** Deterministic sword timing shared by the full Thunder/Wind kits. Effects never apply damage. */
export function createStyleKit<Id extends string>(style:string,order:readonly Id[],forms:Record<Id,TechniqueDefinition>,options:{path?:(id:Id,q:number)=>Point;beats?:Partial<Record<Id,readonly number[]>>;guard?:Id}={}){
 const phase=(id:Id,t:number)=>{const f=forms[id];return t<f.windup?'windup':t<f.windup+f.active?'active':t<f.windup+f.active+f.recovery?'recovery':'done';};
 const progress=(id:Id,t:number)=>Math.max(0,Math.min(1,(t-forms[id].windup)/forms[id].active));
 const window=(id:Id,t:number)=>{const f=forms[id];if(phase(id,t)!=='active'||!f.hits.length)return -1;const beats=options.beats?.[id]??f.hits.map((_,i)=>f.hits.length===1?.42:.12+i*.72/(f.hits.length-1));let result=-1;for(let i=0;i<beats.length;i++)if(progress(id,t)>=beats[i])result=i;return result;};
 const path=(id:Id,q:number)=>options.path?.(id,q)??{x:forms[id].advance*q,y:0};
 const motion=(id:Id,from:number,to:number)=>{const a=path(id,progress(id,from)),b=path(id,progress(id,to));return {x:b.x-a.x,y:b.y-a.y};};
 const impact=(p:Point,angle:number)=>({x:p.x+Math.cos(angle)*70,y:p.y+Math.sin(angle)*70});
 const contains=(id:Id,p:Point,angle:number,target:Point)=>{const f=forms[id],dx=target.x-p.x,dy=target.y-p.y,a=Math.atan2(dy,dx)-angle;return Math.hypot(dx,dy)<=f.reach&&(f.geometry==='circle'||Math.abs(Math.atan2(Math.sin(a),Math.cos(a)))<=f.halfArc);};
 const contact=(id:Id,t:number,p:Point,angle:number,target:Point,landing=impact(p,angle))=>window(id,t)>=0&&(forms[id].geometry==='impact'?Math.hypot(target.x-landing.x,target.y-landing.y)<=forms[id].reach:contains(id,p,angle,target));
 const defends=(id:Id,t:number,p:Point,target:Point,angle=0)=>id===options.guard&&phase(id,t)==='active'&&contains(id,p,angle,target);
 const castReason=(id:Id,breath:number,cooldown:number)=>cooldown>0?'This form is cooling down.':breath<forms[id].stamina?'Not enough Breath.':'';
 const catalogId=(id:Id)=>style+'-'+String(forms[id].number).padStart(2,'0');
 const techniqueForCatalog=(id:string):Id|null=>order.find(key=>catalogId(key)===id)??null;
 return {phase,progress,window,motion,impact,contact,defends,castReason,catalogId,techniqueForCatalog};
}
