import {test} from 'node:test';import assert from 'node:assert/strict';
import {trainingWalkable,moveTraining,regionOffset,regionEntry,trainingDemon,trainingSpawn} from './training-world.ts';
test('all three links can be walked end to end after unlocking the next clearing',()=>{
 for(let stage=0;stage<3;stage++){
  const p={x:regionOffset(stage)+805,y:350};const goal=regionEntry(stage+1);
  for(let i=0;i<250;i++)moveTraining(p,4,0,stage+1);
  assert.ok(p.x>goal.x);assert.equal(trainingWalkable(p.x,p.y,stage+1),true);
  const blocked={x:regionOffset(stage)+900,y:350};moveTraining(blocked,1000,0,stage);assert.ok(blocked.x<=regionOffset(stage)+940);
 }
});
test('travel supports backtracking and never tunnels beyond world geometry',()=>{
 for(let stage=0;stage<4;stage++){
  for(const p of [trainingSpawn(stage),trainingDemon(stage)])assert.equal(trainingWalkable(p.x,p.y,stage),true);
 }
 const p=regionEntry(1);moveTraining(p,-650,0,1);assert.ok(p.x<1000);assert.equal(trainingWalkable(p.x,p.y,1),true);
 moveTraining(p,0,-3000,1);assert.equal(trainingWalkable(p.x,p.y,1),true);
});
