import {WATER_FORMS,type WaterId} from './water.ts';
import {THUNDER_FORMS} from './thunder.ts';
import {WIND_FORMS} from './wind.ts';
/** Existing input slots are stable while each style supplies its own choreography. */
export function startingTechniques(style:string){if(style==='wind')return WIND_FORMS;if(style==='thunder')return THUNDER_FORMS;if(style==='water'||style==='flame')return WATER_FORMS;throw Error('Style is not playable yet: '+style);}
export function techniquePhase(style:string,id:WaterId,t:number){const f=startingTechniques(style)[id];return t<f.windup?'windup':t<f.windup+f.active?'active':t<f.windup+f.active+f.recovery?'recovery':'done';}
export function techniqueProgress(style:string,id:WaterId,t:number){const f=startingTechniques(style)[id];return Math.max(0,Math.min(1,(t-f.windup)/f.active));}
export function techniqueAdvance(style:string,id:WaterId,from:number,to:number){return startingTechniques(style)[id].advance*Math.max(0,techniqueProgress(style,id,to)-techniqueProgress(style,id,from));}
export function techniqueHitIndex(style:string,id:WaterId,t:number){if(techniquePhase(style,id,t)!=='active')return -1;return style==='thunder'&&id==='wheel'?Math.min(4,Math.floor(techniqueProgress(style,id,t)*5)):0;}
export function techniqueHits(style:string,id:WaterId,t:number,px:number,py:number,angle:number,ex:number,ey:number){const f=startingTechniques(style)[id],a=Math.atan2(ey-py,ex-px)-angle;return techniquePhase(style,id,t)==='active'&&Math.hypot(ex-px,ey-py)<=f.reach&&Math.abs(Math.atan2(Math.sin(a),Math.cos(a)))<=f.halfArc;}
