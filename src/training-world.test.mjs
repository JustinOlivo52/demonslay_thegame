import {test} from 'node:test';import assert from 'node:assert/strict';
import {trainingWalkable,moveTraining,regionOffset,regionEntry,trainingDemon,trainingSpawn,BASE_Y,EXPLORATION_LOOPS,SUPPLIES} from './training-world.ts';
test('all three links can be walked end to end after unlocking the next clearing',()=>{
 for(let stage=0;stage<3;stage++){
  const p={x:regionOffset(stage)+805,y:350+BASE_Y};const goal=regionEntry(stage+1);
  for(let i=0;i<250;i++)moveTraining(p,4,0,stage+1);
  assert.ok(p.x>goal.x);assert.equal(trainingWalkable(p.x,p.y,stage+1),true);
  const blocked={x:regionOffset(stage)+900,y:350+BASE_Y};moveTraining(blocked,1000,0,stage);assert.ok(blocked.x<=regionOffset(stage)+940);
 }
});
test('travel supports backtracking and never tunnels beyond world geometry',()=>{
 for(let stage=0;stage<4;stage++){
  for(const p of [trainingSpawn(stage),trainingDemon(stage)])assert.equal(trainingWalkable(p.x,p.y,stage),true);
 }
 const p=regionEntry(1);moveTraining(p,-650,0,1);assert.ok(p.x<1000);assert.equal(trainingWalkable(p.x,p.y,1),true);
 moveTraining(p,0,-3000,1);assert.equal(trainingWalkable(p.x,p.y,1),true);
});

test('optional loops and both finite supply caches are connected to their regions',()=>{
 for(const [stage,path] of EXPLORATION_LOOPS.entries())for(let i=1;i<path.length;i++)for(let t=0;t<=1;t+=.04){const x=regionOffset(stage)+path[i-1].x+(path[i].x-path[i-1].x)*t,y=path[i-1].y+(path[i].y-path[i-1].y)*t;assert.equal(trainingWalkable(x,y,stage),true);}
 assert.equal(SUPPLIES.length,2);
 for(const item of SUPPLIES)assert.equal(trainingWalkable(regionOffset(item.stage)+item.x,item.y,item.stage),true);
});
