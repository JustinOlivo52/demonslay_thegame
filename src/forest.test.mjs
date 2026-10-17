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
