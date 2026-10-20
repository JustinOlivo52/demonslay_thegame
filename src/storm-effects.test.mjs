import {test} from 'node:test';import assert from 'node:assert/strict';
import {paintThunderTechnique,paintWindTechnique} from './storm-effects.ts';
import {THUNDER_ORDER,THUNDER_KIT} from './thunder-kit.ts';
import {WIND_ORDER,WIND_KIT} from './wind-kit.ts';
test('all storm effects draw finite geometry through every phase and stop drawing at completion',()=>{
 for(const[order,forms,paint]of [[THUNDER_ORDER,THUNDER_KIT,paintThunderTechnique],[WIND_ORDER,WIND_KIT,paintWindTechnique]]){
  const signatures=new Set();for(const id of order){let calls=[];const graphics=new Proxy({},{get:(_,method)=>(...values)=>{for(const v of values)if(typeof v==='number')assert.ok(Number.isFinite(v),id+' '+String(method));calls.push([method,...values]);}});const f=forms[id],p={x:350,y:355},cast={id,angle:.7,origin:p,impact:{x:400,y:400},path:[p,{x:380,y:380}],elapsed:0};
   for(const time of [f.windup*.5,f.windup+f.active*.2,f.windup+f.active*.5,f.windup+f.active*.8,f.windup+f.active+f.recovery*.5]){cast.elapsed=time;paint(graphics,graphics,cast,p,2);}
   assert.ok(calls.length>20,id+' has visible effects');signatures.add(JSON.stringify(calls));calls=[];cast.elapsed=f.windup+f.active+f.recovery+.1;paint(graphics,graphics,cast,p,2);assert.equal(calls.length,0,id+' effects stop after recovery');
  }assert.equal(signatures.size,order.length,'each form has a distinct effect sequence');
 }
});
