import { test } from 'node:test';
import assert from 'node:assert/strict';
import { inSwordArc, formUnlockLevels } from './combat.ts';
test('sword hits require reach and direction, including angles crossing π', () => {
  assert.equal(inSwordArc(0,0,0,60,0),true);
  assert.equal(inSwordArc(0,0,0,84,0),false);
  assert.equal(inSwordArc(0,0,0,-60,0),false);
  assert.equal(inSwordArc(0,0,0,0,60),false);
  assert.equal(inSwordArc(0,0,Math.PI-0.05,-60,-2),true);
});
test('styles start with two forms and distribute remaining unlocks through level 30', () => {
  for(const count of [9,11]) {
    const levels=formUnlockLevels(count);
    assert.equal(levels.length,count);assert.deepEqual(levels.slice(0,2),[1,1]);
    assert.equal(levels.at(-1),30);
    for(let i=2;i<levels.length;i++)assert.ok(levels[i]>levels[i-1]);
    const gaps=levels.slice(2).map((n,i)=>n-levels[i+1]);
    assert.ok(Math.max(...gaps)-Math.min(...gaps)<=1);
  }
  assert.throws(()=>formUnlockLevels(2));
});
