import {test} from 'node:test';import assert from 'node:assert/strict';
import {collectPotion,noviceBreathCost} from './trial-content.ts';
import {newRun,advanceRun,readRun} from './tutorial.ts';
test('novice forms are expensive and future training is bounded',()=>{assert.equal(noviceBreathCost('surface'),32);assert.equal(noviceBreathCost('wheel'),46);assert.equal(noviceBreathCost('surface',6),20);assert.equal(noviceBreathCost('wheel',100),34);assert.equal(noviceBreathCost('surface',NaN),32);});
test('two unique caches never refill or disappear when the inventory is full',()=>{
 const first=collectPotion([],1,'foothill-cache');assert.equal(first.potions,2);assert.equal(first.used,true);
 assert.equal(collectPotion(first.collected,1,'foothill-cache').used,false);
 assert.equal(collectPotion(first.collected,2,'waystation-cache').used,false);
 const last=collectPotion(first.collected,1,'waystation-cache');assert.equal(last.collected.length,2);assert.equal(last.potions,2);
 assert.equal(collectPotion([],1,'invented').used,false);
});
test('boss preparation does not grant health or potions; discovered supplies persist across checkpoints',()=>{
 let r=newRun('test');assert.equal(r.potions,1);r={...r,stage:2,potions:0,health:30,pickups:['foothill-cache'],introSeen:true};
 const boss=advanceRun(r,30,0);assert.equal(boss.health,30);assert.equal(boss.potions,0);assert.deepEqual(readRun(JSON.stringify(boss),'test'),boss);
 assert.equal(readRun(JSON.stringify({...boss,pickups:['foothill-cache','foothill-cache']}),'test').stage,0);
});
