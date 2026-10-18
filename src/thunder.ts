/** Thunder's first two forms: gameplay adaptations of the described choreography. */
export const THUNDER_FORMS={
 surface:{name:'Thunderclap and Flash',windup:.28,active:.13,recovery:.35,stamina:36,cooldown:2.4,damage:45,reach:76,halfArc:.48,advance:260},
 wheel:{name:'Rice Spirit',windup:.16,active:.48,recovery:.32,stamina:48,cooldown:3.6,damage:9,reach:100,halfArc:1.2,advance:0},
} as const;
export type ThunderSlot=keyof typeof THUNDER_FORMS;
export function thunderPhase(id:ThunderSlot,t:number){const f=THUNDER_FORMS[id];return t<f.windup?'windup':t<f.windup+f.active?'active':t<f.windup+f.active+f.recovery?'recovery':'done';}
export function thunderProgress(id:ThunderSlot,t:number){const f=THUNDER_FORMS[id];return Math.max(0,Math.min(1,(t-f.windup)/f.active));}
export function thunderAdvance(id:ThunderSlot,from:number,to:number){return THUNDER_FORMS[id].advance*Math.max(0,thunderProgress(id,to)-thunderProgress(id,from));}
export function thunderHitIndex(id:ThunderSlot,t:number){return thunderPhase(id,t)!=='active'?-1:id==='surface'?0:Math.min(4,Math.floor(thunderProgress(id,t)*5));}
export function thunderHits(id:ThunderSlot,t:number,px:number,py:number,angle:number,ex:number,ey:number){const f=THUNDER_FORMS[id],a=Math.atan2(ey-py,ex-px)-angle;return thunderPhase(id,t)==='active'&&Math.hypot(ex-px,ey-py)<=f.reach&&Math.abs(Math.atan2(Math.sin(a),Math.cos(a)))<=f.halfArc;}
