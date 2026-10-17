import {test} from 'node:test';
import assert from 'node:assert/strict';
import {newRun,readRun,advanceRun,heal,TUTORIAL_STAGES} from './tutorial.ts';
test('selection advances through four encounters and awards crow only after boss',()=>{let r=newRun('a');for(let i=0;i<4;i++){assert.equal(r.stage,i);assert.equal(r.crow,false);r=advanceRun(r,70,1);}assert.equal(r.passed,true);assert.equal(r.crow,true);assert.equal(r.stage,4);assert.deepEqual(advanceRun(r,10,0),r);assert.equal(TUTORIAL_STAGES.length,4);});
test('saves are scoped to recruit identity and reject corrupt or impossible progress',()=>{const r=advanceRun(newRun('a'),70,1);assert.deepEqual(readRun(JSON.stringify(r),'a'),r);assert.equal(readRun(JSON.stringify(r),'b').stage,0);assert.equal(readRun('{broken','a').stage,0);assert.equal(readRun(JSON.stringify({...r,stage:4,passed:false}),'a').stage,0);});
test('healing consumes a potion only when it restores health',()=>{assert.deepEqual(heal(40,2),{health:85,potions:1,used:true});assert.deepEqual(heal(90,1),{health:100,potions:0,used:true});assert.equal(heal(100,2).potions,2);assert.equal(heal(40,0).used,false);});
