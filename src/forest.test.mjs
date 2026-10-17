import {test} from 'node:test';
import assert from 'node:assert/strict';
import {FOREST_ROUTE,FOREST_BRANCH,FOREST_SPAWN,FOREST_DEMON,FOREST_CLUES,forestWalkable,moveThroughForest} from './forest.ts';
test('main trail, clues, optional branch and demon clearing connect through walkable ground',()=>{
 for(const route of [FOREST_ROUTE,FOREST_BRANCH])for(let i=1;i<route.length;i++)for(let t=0;t<=1;t+=.02)assert.equal(forestWalkable(route[i-1].x+(route[i].x-route[i-1].x)*t,route[i-1].y+(route[i].y-route[i-1].y)*t),true);
 for(const p of [FOREST_SPAWN,FOREST_DEMON,...FOREST_CLUES])assert.equal(forestWalkable(p.x,p.y),true);
});
test('walk and dash cannot cross trees or leave map bounds',()=>{
 const p={...FOREST_SPAWN};moveThroughForest(p,-1000,-1000);assert.equal(forestWalkable(p.x,p.y),true);
 const q={x:350,y:295};moveThroughForest(q,0,-100);assert.equal(forestWalkable(q.x,q.y),true);assert.ok(q.y<220);
 assert.equal(forestWalkable(500,80),false);assert.equal(forestWalkable(-10,400),false);
});

test('every new region has a broad connected spawn-to-boss route and dodge space',async()=>{
 const {TRIAL_AREAS}=await import('./forest.ts');
 for(const [stage,area] of TRIAL_AREAS.entries()){
  assert.equal(forestWalkable(area.spawn.x,area.spawn.y,stage),true);assert.equal(forestWalkable(area.demon.x,area.demon.y,stage),true);
  if(stage===0)continue;
  for(let t=0;t<=1;t+=.02)assert.equal(forestWalkable(area.spawn.x+(area.demon.x-area.spawn.x)*t,area.spawn.y+(area.demon.y-area.spawn.y)*t,stage),true);
  for(const [dx,dy] of [[100,0],[-100,0],[0,90],[0,-90]])assert.equal(forestWalkable(650+dx,330+dy,stage),true);
  const p={...area.spawn};moveThroughForest(p,-2000,0,stage);assert.equal(forestWalkable(p.x,p.y,stage),true);
 }
});
