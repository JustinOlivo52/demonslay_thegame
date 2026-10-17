import {test} from 'node:test';
import assert from 'node:assert/strict';
import {canFinish,FINISHER} from './finisher.ts';
test('finish requires a downed demon, positive time and close range',()=>{
 assert.equal(canFinish(true,4,90),true);
 assert.equal(canFinish(true,0,20),false);
 assert.equal(canFinish(false,4,20),false);
 assert.equal(canFinish(true,1,91),false);
 assert.equal(FINISHER.window,4);
});
