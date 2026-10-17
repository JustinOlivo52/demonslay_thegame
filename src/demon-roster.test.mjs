import {test} from 'node:test';
import assert from 'node:assert/strict';
import {DEMON_ARCHETYPES,rollDemonEncounter} from './demon-roster.ts';
test('seeded encounters repeat and every archetype supports levels 1–5 without Blood Demon Arts',()=>{
 for(const a of DEMON_ARCHETYPES)for(let level=1;level<=5;level++){
  const one=rollDemonEncounter(level,12345,a.id);assert.deepEqual(one,rollDemonEncounter(level,12345,a.id));assert.equal(one.archetype.id,a.id);assert.equal(one.bloodDemonArt,null);assert.ok(one.maxHealth>=125);
 }
 assert.ok(rollDemonEncounter(5,0).maxHealth>rollDemonEncounter(1,0).maxHealth);
 assert.equal(new Set(Array.from({length:100},(_,i)=>rollDemonEncounter(1,i*100000).archetype.id)).size,5);
 assert.throws(()=>rollDemonEncounter(10,1));assert.throws(()=>rollDemonEncounter(1,1,'missing'));
});
