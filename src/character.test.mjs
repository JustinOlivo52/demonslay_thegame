import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createCharacter,makeBackstory,readCharacter,STARTERS} from './character.ts';
test('new recruits receive exactly two forms of their selected style',()=>{
 for(const style of ['water','flame','thunder'])for(const body of ['male','female']){
  const c=createCharacter('  Aki   Mori ',body,style,makeBackstory(style,0));
  assert.equal(c.name,'Aki Mori');assert.equal(c.level,1);assert.equal(c.checkpoint,'selection-ready');
  assert.deepEqual(c.ownedForms,[...STARTERS[style].ids]);assert.deepEqual(readCharacter(JSON.stringify(c)),c);
 }
});
test('invalid identities, stories and altered saves are rejected',()=>{
 assert.throws(()=>createCharacter('a','male','water',makeBackstory('water',0)));
 assert.throws(()=>createCharacter('<script>','male','water',makeBackstory('water',0)));
 assert.throws(()=>createCharacter('Aki','male','moon',makeBackstory('water',0)));
 assert.throws(()=>createCharacter('Aki','female','flame','too short'));
 assert.equal(readCharacter('{oops'),null);
 assert.equal(readCharacter(JSON.stringify({...createCharacter('Aki','male','water',makeBackstory('water',0)),ownedForms:['moon-01']})),null);
 assert.notEqual(makeBackstory('water',0),makeBackstory('water',1));
});
