import {test} from 'node:test';
import assert from 'node:assert/strict';
import {THUNDER_ORDER,THUNDER_KIT,thunderKit} from './thunder-kit.ts';
import {WIND_ORDER,WIND_KIT,windKit} from './wind-kit.ts';
import {getStyle,getFormMenu} from './data/breathing.ts';
import {sampleChoreography,POSE} from './technique-choreography.ts';
const kits=[['thunder',THUNDER_ORDER,THUNDER_KIT,thunderKit],['wind',WIND_ORDER,WIND_KIT,windKit]];
test('Thunder and Wind cover every numbered catalog form with stable ownership IDs',()=>{
 for(const[style,order,forms,kit]of kits){assert.deepEqual(order.map(id=>({id:kit.catalogId(id),name:forms[id].name})),getStyle(style).forms.map(f=>({id:f.id,name:f.name})));for(const id of order)assert.equal(kit.techniqueForCatalog(kit.catalogId(id)),id);assert.equal(kit.techniqueForCatalog('water-01'),null);assert.equal(getFormMenu(style,1).filter(f=>f.grantedOnStyleAcquisition).length,2);}
 assert.equal(THUNDER_ORDER.length,7);assert.equal(WIND_ORDER.length,9);
});
test('all sixteen forms have finite strike windows, no anticipation/recovery damage and affordable base Breath costs',()=>{
 for(const[,order,forms,kit]of kits)for(const id of order){const f=forms[id],end=f.windup+f.active+f.recovery;
 assert.ok(f.windup>0&&f.active>0&&f.recovery>0&&f.cooldown>=end,id);assert.ok(f.stamina>0&&f.stamina<=100,id);assert.equal(kit.window(id,0),-1);assert.equal(kit.window(id,end),-1);assert.equal(kit.phase(id,end+.01),'done');const seen=new Set();for(let t=0;t<end;t+=.001){const n=kit.window(id,t);if(n>=0){assert.ok(n<f.hits.length);seen.add(n);}}assert.equal(seen.size,f.hits.length,id);assert.equal(kit.castReason(id,f.stamina,0),'');assert.match(kit.castReason(id,f.stamina-1,0),/Breath/);assert.match(kit.castReason(id,100,1),/cooling/);}
});
test('motion is frame independent, active-only, finite, and backward flip really retreats',()=>{
 for(const[,order,forms,kit]of kits)for(const id of order){const f=forms[id],end=f.windup+f.active+f.recovery;assert.deepEqual(kit.motion(id,0,f.windup),{x:0,y:0});assert.deepEqual(kit.motion(id,end+1,end+2),{x:0,y:0});const full=kit.motion(id,0,end),sum={x:0,y:0};for(let i=0;i<300;i++){const d=kit.motion(id,end*i/300,end*(i+1)/300);sum.x+=d.x;sum.y+=d.y;}assert.ok(Math.abs(sum.x-full.x)<1e-7&&Math.abs(sum.y-full.y)<1e-7,id);assert.ok(Math.abs(full.x-f.advance)<1e-7,id);}
 assert.equal(windKit.motion('typhoon',0,3).x,-40);assert.ok(Math.abs(thunderKit.motion('swarm',0,3).x)<1e-7);assert.ok(Math.abs(thunderKit.motion('swarm',0,.7).y)>20);
});
test('directional strikes respect range, facing and timing; circular cuts surround, impact cuts lock to their center',()=>{
 for(const[,order,forms,kit]of kits)for(const id of order){const f=forms[id],p={x:0,y:0},t=f.windup+f.active*.9,center=kit.impact(p,0),target=f.geometry==='impact'?center:{x:30,y:0};assert.equal(kit.contact(id,0,p,0,target,center),false,id);assert.equal(kit.contact(id,t,p,0,target,center),true,id);assert.equal(kit.contact(id,t,p,0,{x:1000,y:1000},center),false,id);if(f.geometry==='fan'){assert.equal(kit.contact(id,t,p,0,{x:-30,y:0}),false,id);assert.equal(kit.contact(id,t,p,Math.PI/2,{x:0,y:30}),true,id);}if(f.geometry==='circle')assert.equal(kit.contact(id,t,p,0,{x:-30,y:0}),true,id);}
 const t=WIND_KIT.typhoon.windup+.7;assert.equal(windKit.contact('typhoon',t,{x:-40,y:0},Math.PI,{x:70,y:0},{x:70,y:0}),true);assert.equal(windKit.contact('typhoon',t,{x:-40,y:0},0,{x:-160,y:0},{x:70,y:0}),false);
});
test('Wind III guards nearby melee during its active sweeps only; aerial poses grant no blanket defense',()=>{
 const p={x:0,y:0},near={x:50,y:0};assert.equal(windKit.defends('tree',.4,p,near),true);assert.equal(windKit.defends('tree',.4,p,{x:-50,y:0}),true);assert.equal(windKit.defends('tree',.4,p,{x:150,y:0}),false);assert.equal(windKit.defends('tree',.1,p,near),false);assert.equal(windKit.defends('tree',1.1,p,near),false);
 for(const[,order,forms,kit]of kits)for(const id of order.filter(id=>id!=='tree'))assert.equal(kit.defends(id,forms[id].windup+.2,p,near),false,id);
 for(const id of ['gusts','typhoon']){const poses=new Set(Array.from({length:101},(_,i)=>sampleChoreography('wind',id,'active',i/100).pose));for(const pose of [POSE.tuck,POSE.inverted,POSE.landing])assert.ok(poses.has(pose));assert.ok(sampleChoreography('wind',id,'active',.5).lift>=27);}
 assert.equal(sampleChoreography('thunder','heat','windup',.9).pose,POSE.down);assert.equal(sampleChoreography('thunder','heat','active',.9).pose,POSE.rise);
});
test('every form can connect in the actual stationary practice clearing at common and slow frame rates',async()=>{
 const {forestWalkable,moveThroughForest}=await import('./forest.ts');
 for(const[,order,forms,kit]of kits)for(const id of order)for(const dt of [1/120,1/30,.04]){
  const f=forms[id],p={x:350,y:355},distance=Math.min(220,Math.max(55,f.advance*.65)),enemy={x:p.x+distance,y:p.y};assert.ok(forestWalkable(enemy.x,enemy.y,1));const desired=kit.impact(p,0);let impact={...p};for(let i=1;i<=14;i++){const next={x:p.x+(desired.x-p.x)*i/14,y:p.y+(desired.y-p.y)*i/14};if(!forestWalkable(next.x,next.y,1))break;impact=next;}
  let elapsed=0;const seen=new Set();while(kit.phase(id,elapsed)!=='done'){const old=elapsed;elapsed+=dt;const m=kit.motion(id,old,elapsed),steps=Math.max(1,Math.ceil(Math.hypot(m.x,m.y)/5));for(let i=1;i<=steps;i++){const a=old+(elapsed-old)*(i-1)/steps,b=old+(elapsed-old)*i/steps,v=kit.motion(id,a,b);moveThroughForest(p,v.x,v.y,1);const hit=kit.window(id,b);if(hit>=0&&kit.contact(id,b,p,0,enemy,impact))seen.add(hit);}}
  assert.ok(seen.size>0,id+' at '+dt+' must connect, not just animate');assert.ok(forestWalkable(p.x,p.y,1),id+' must stay in walkable terrain');assert.ok([...seen].reduce((total,i)=>total+f.hits[i],0)<=f.hits.reduce((a,b)=>a+b,0));
 }
});
