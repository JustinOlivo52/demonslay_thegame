import {test} from 'node:test';import assert from 'node:assert/strict';
import {MELEE_PATTERNS,meleeFor,meleeHits,bossPattern} from './encounters.ts';
test('roster includes five distinct melee patterns and alternating boss sweeps',()=>{
 assert.equal(new Set([0,1,2,3,4].map(n=>meleeFor(n))).size,5);
 assert.equal(new Set([1,2,3,4].map(n=>meleeFor(0,true,n,1))).size,4);assert.equal(meleeFor(0,true,1,.4),'double');
 const calm=bossPattern('lunge',1),rage=bossPattern('lunge',.4);assert.ok(rage.recovery<calm.recovery);assert.ok(rage.speed>calm.speed);assert.ok(calm.lunge>MELEE_PATTERNS.lunge.lunge);
 assert.equal(MELEE_PATTERNS.double.hits.length,2);assert.ok(MELEE_PATTERNS.lunge.lunge>0);
});
test('ordinary melee cannot hit behind the attacker or beyond actual reach',()=>{
 assert.equal(meleeHits('claw',{x:0,y:0},0,{x:50,y:0}),true);
 assert.equal(meleeHits('claw',{x:0,y:0},0,{x:-50,y:0}),false);
 assert.equal(meleeHits('claw',{x:0,y:0},0,{x:70,y:0}),false);
 assert.equal(meleeHits('claw',{x:0,y:0},Math.PI-.02,{x:-50,y:-1}),true);
});
