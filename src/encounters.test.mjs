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
test('first boss gives a novice a reaction window and a full combo opening in both phases',async()=>{
 const {RULES,SWORD_COMBO}=await import('./combat.ts');const combo=SWORD_COMBO.reduce((s,f)=>s+f.windup+f.active+f.recovery,0);
 for(const hpRatio of [1,.5,.2])for(const id of ['lunge','sweep','double','heavy']){const p=bossPattern(id,hpRatio);assert.ok(p.windup>=.68,id);assert.ok(p.recovery>=1.05&&p.recovery>=combo,id);assert.ok(p.speed<RULES.speed,id+' remains escapable without infinite dodging');assert.ok(p.lunge<=145,id);}
 const normal=bossPattern('heavy',1),rage=bossPattern('heavy',.5);assert.ok(rage.speed>normal.speed);assert.ok(rage.recovery<normal.recovery);assert.ok(bossPattern('heavy',1).windup>bossPattern('lunge',1).windup);
});
test('first boss damage budget prevents double-claw burst from overwhelming a 100 HP recruit',async()=>{
 const {bossDamage}=await import('./encounters.ts');const {TUTORIAL_STAGES}=await import('./tutorial.ts');const {attributes,freshProgression}=await import('./progression.ts');const novice=attributes(freshProgression()),boss=TUTORIAL_STAGES[3];
 assert.equal(boss.health,330);assert.ok(boss.health>TUTORIAL_STAGES[2].health*2);assert.equal(boss.damage,20);
 assert.equal(bossDamage('double',1,boss.damage)*2,24);assert.equal(bossDamage('double',.5,boss.damage)*2,28);assert.equal(bossDamage('heavy',.5,boss.damage),26);
 assert.ok(bossDamage('double',.5,boss.damage)*2<novice.health*.3);assert.ok(bossDamage('heavy',.5,boss.damage)<novice.health*.3);
 // Several normal mistakes remain survivable without potions or spent stat points.
 assert.ok(novice.health-4*bossDamage('lunge',1,boss.damage)>0);
 assert.deepEqual(TUTORIAL_STAGES.slice(0,3).map(s=>[s.health,s.damage]),[[125,16],[145,18],[160,20]]);
});
